'use client';

import { forwardRef, useMemo, useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function useMousePosition(ref: React.RefObject<HTMLElement | null>) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // If ref is provided, calculate relative to it, otherwise window
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            } else {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [ref, mouseX, mouseY]);

    return { mouseX, mouseY };
}

interface VariableProximityProps {
    label: string;
    fromFontVariationSettings?: string;
    toFontVariationSettings?: string;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Letter = ({
    letter,
    index,
    mouseX,
    mouseY,
    containerRef,
    radius = 200,
    falloff = 'linear',
    fromSettings = "'wght' 400",
    toSettings = "'wght' 900",
}: {
    letter: string;
    index: number;
    mouseX: any;
    mouseY: any;
    containerRef: React.RefObject<HTMLElement | null>;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
    fromSettings?: string;
    toSettings?: string;
}) => {
    const letterRef = useRef<HTMLSpanElement>(null);

    // Parse simple settings: assume format "'wght' VALUE" for now to interpolate
    // Or just map distance to a weight value directly.
    // Implementing full font-variation-settings interpolation is complex.
    // Let's assume we are interpolating WEIGHT for Inter.

    const distance = useTransform([mouseX, mouseY], ([x, y]) => {
        if (!letterRef.current || !containerRef.current) return radius;

        // We need global coordinates or relative to the same container
        // Since mouseX/Y are relative to containerRef, let's get letter position relative to container
        const letterRect = letterRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const letterX = letterRect.left - containerRect.left + letterRect.width / 2;
        const letterY = letterRect.top - containerRect.top + letterRect.height / 2;

        const dx = (x as number) - letterX;
        const dy = (y as number) - letterY;
        return Math.sqrt(dx * dx + dy * dy);
    });

    // Map distance to weight
    // Distance 0 -> Weight 900 (Bold)
    // Distance radius -> Weight 100 (Thin)
    const weight = useTransform(distance, [0, radius], [900, 100]); // Inverse: closer = heavier

    // Smooth it
    const smoothWeight = useSpring(weight, { stiffness: 200, damping: 20 });

    return (
        <motion.span
            ref={letterRef}
            style={{
                fontWeight: smoothWeight,
                display: 'inline-block',
            }}
        >
            {letter}
        </motion.span>
    );
};

const VariableProximity = forwardRef<HTMLHeadingElement, VariableProximityProps>(
    (
        {
            label,
            fromFontVariationSettings,
            toFontVariationSettings,
            radius = 300,
            falloff = 'linear',
            className,
            onClick,
            style,
            ...props
        },
        ref
    ) => {
        const containerRef = useRef<HTMLHeadingElement>(null);
        const { mouseX, mouseY } = useMousePosition(containerRef);

        const words = label.split(' ');

        return (
            <h2
                ref={containerRef}
                className={className}
                onClick={onClick}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    ...style,
                    cursor: 'default' // Or none/custom
                }}
                {...props}
            >
                {words.map((word, wordIndex) => (
                    <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                        {word.split('').map((letter, letterIndex) => (
                            <Letter
                                key={`${wordIndex}-${letterIndex}`}
                                letter={letter}
                                index={letterIndex}
                                mouseX={mouseX}
                                mouseY={mouseY}
                                containerRef={containerRef}
                                radius={radius}
                            />
                        ))}
                        {/* Add space after word if not last */}
                        {wordIndex < words.length - 1 && (
                            <span style={{ display: 'inline-block' }}>&nbsp;</span>
                        )}
                    </span>
                ))}
            </h2>
        );
    }
);

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
