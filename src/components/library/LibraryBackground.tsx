'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export const LibraryBackground = ({ children }: { children: React.ReactNode }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[var(--color-walnut)] text-[var(--color-parchment)]">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Fireplace Glow */}
                <div className="absolute bottom-0 right-20 w-96 h-96 bg-[var(--color-gold)] opacity-5 blur-[100px] animate-pulse" />

                {/* Parallax Shelves Background (Abstract representation) */}
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{ x: mousePosition.x, y: mousePosition.y }}
                >
                    <div className="w-full h-full texture-wood" />
                </motion.div>

                {/* Floating Dust Particles/Autumn Leaves */}
                <Particles />
            </div>

            {/* Main Content Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

const Particles = () => {
    // Generate random particles only on client to avoid hydration mismatch
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 10 + Math.random() * 20,
            delay: Math.random() * 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 bg-[var(--color-gold)] rounded-full opacity-30"
                    initial={{ left: `${p.x}%`, top: `-10%` }}
                    animate={{
                        top: ['-10%', '110%'],
                        left: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};
