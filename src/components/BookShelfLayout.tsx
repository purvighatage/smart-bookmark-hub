'use client'

import { ReactNode } from 'react'

export default function BookShelfLayout({
    children,
    header,
    sidebar
}: {
    children: ReactNode
    header?: ReactNode
    sidebar?: ReactNode
}) {
    return (
        <div className="min-h-screen bg-wood-pattern flex items-center justify-center p-4 md:p-8">
            {/* The Book */}
            <div className="relative w-full max-w-6xl aspect-[1.4/1] min-h-[80vh] bg-paper shadow-2xl flex rounded-r-lg overflow-hidden perspective-1000">

                {/* Leather Cover (Left visible edge) */}
                <div className="hidden md:block w-4 h-full bg-leather absolute left-0 z-20 shadow-inner"></div>

                {/* Left Page (Sidebar/Navigation) */}
                <aside className="hidden md:flex w-1/3 flex-col border-r border-stone-200 bg-[#f8f5f0] p-8 md:p-12 relative">
                    {/* Page curve shadow */}
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/5 to-transparent pointer-events-none"></div>

                    <div className="relative z-10 h-full flex flex-col">
                        {sidebar}
                    </div>
                </aside>

                {/* Right Page (Content) */}
                <main className="flex-1 flex flex-col p-6 md:p-12 bg-paper relative overflow-y-auto">
                    {/* Center binding shadow */}
                    <div className="hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10"></div>

                    <div className="relative z-0 h-full flex flex-col">
                        {header && <div className="mb-8">{header}</div>}
                        <div className="flex-1">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
