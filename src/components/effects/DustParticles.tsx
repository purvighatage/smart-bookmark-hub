'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const DustParticles = () => {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

    useEffect(() => {
        // Create more, smaller particles for a "dusty" feel
        const newParticles = Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1, // 1px to 3px
            duration: 25 + Math.random() * 40, // Very slow floating
            delay: Math.random() * -20, // Start at different times, negative to pre-seed
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-amber-100/40 rounded-full blur-[1px]"
                    style={{
                        width: p.size,
                        height: p.size,
                    }}
                    initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0 }}
                    animate={{
                        top: [`${p.y}%`, `${p.y - 15 + Math.random() * 10}%`], // Drift up and slightly random
                        left: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`], // Drift sideways
                        opacity: [0, 0.3, 0.5, 0.3, 0], // Twinkle/fade in out
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};
