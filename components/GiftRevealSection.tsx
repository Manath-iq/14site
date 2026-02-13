'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GiftRevealSectionProps {
    onReveal: () => void;
}

export default function GiftRevealSection({ onReveal }: GiftRevealSectionProps) {
    return (
        <section style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#fff',
            color: '#202124',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            padding: '20px',
            textAlign: 'left'
        }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
                {/* Sad Folder Icon */}
                <div style={{ marginBottom: '24px' }}>
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Sad Face */}
                        <path d="M8.5 13.5C8.5 13.5 9.5 12.5 10.5 13.5" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" />
                        <path d="M13.5 13.5C13.5 13.5 14.5 12.5 15.5 13.5" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" />
                        <path d="M9 16.5C9 16.5 10.5 15.5 15 16.5" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 500,
                    marginBottom: '16px',
                    color: '#202124'
                }}>
                    Опаньки...
                </h1>

                <p style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    marginBottom: '24px',
                    color: '#5f6368'
                }}>
                    Не удается отобразить этот сайт на текущем устройстве. Обнаружена критическая ошибка масштабирования: объем моей любви и стараний, вложенных в этот проект, физически не помещается в 13 дюймов этого экрана. Контент «выливается» за края.
                </p>

                <p style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    marginBottom: '12px',
                    color: '#5f6368',
                    fontWeight: 500
                }}>
                    Попробуйте следующее:
                </p>

                <ul style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    marginBottom: '32px',
                    color: '#5f6368',
                    paddingLeft: '20px',
                    listStyleType: 'disc'
                }}>
                    <li style={{ marginBottom: '8px' }}>Улыбнуться и посмотреть на своего парня.</li>
                    <li style={{ marginBottom: '8px' }}>Приготовиться к серьезному расширению горизонтов.</li>
                    <li>Подключить внешнее устройство, достойное этой красоты.</li>
                </ul>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onReveal}
                    style={{
                        backgroundColor: '#1a73e8',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 24px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        outline: 'none'
                    }}
                >
                    Исправить проблему масштаба
                </motion.button>

                <div style={{
                    marginTop: '40px',
                    fontSize: '12px',
                    color: '#5f6368',
                    fontFamily: 'monospace'
                }}>
                    Код ошибки: ERR_TOO_MUCH_LOVE_FOR_SMALL_SCREEN
                </div>
            </div>
        </section>
    );
}
