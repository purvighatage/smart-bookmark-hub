'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Particles = () => {
    // Generate random particles only on client to avoid hydration mismatch
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 15 + Math.random() * 20,
            delay: Math.random() * 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 bg-[var(--color-gold)] rounded-full opacity-40 blur-[1px]"
                    initial={{ left: `${p.x}%`, top: `-10%` }}
                    animate={{
                        top: ['-10%', '110%'],
                        left: [`${p.x}%`, `${p.x + (Math.random() * 20 - 10)}%`],
                        opacity: [0, 0.6, 0],
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
