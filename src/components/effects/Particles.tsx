'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Particles = () => {
    // Generate random particles only on client to avoid hydration mismatch
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 20 + Math.random() * 30, // Slower, more ambient
            delay: Math.random() * 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-[2px] h-[2px] bg-amber-100 rounded-full opacity-30 blur-[0.5px]"
                    initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0 }}
                    animate={{
                        top: [`${p.y}%`, `${p.y - 20}%`], // Gently floating up
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
