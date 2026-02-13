import { MythicFrame } from '@/components/ui/MythicFrame';
import { DustParticles } from '@/components/effects/DustParticles';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SigninPage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect('/dashboard');
    }

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-auto bg-[#0F0A06] text-[#EBE5CE]">

            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                {/* Dark Leather Base */}
                <div className="absolute inset-0 bg-[#0F0A06]" />

                {/* Subtle Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />

                {/* Center Spotlight Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.08)_0%,transparent_60%)]" />

                {/* Dust */}
                <DustParticles />
            </div>

            {/* Content */}
            <div className="relative z-10 p-4 w-full flex justify-center">
                <MythicFrame />
            </div>

        </main>
    );
}
