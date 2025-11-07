'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import MouseTrail from '@/components/MouseTrail';
import CustomCursor from '@/components/CustomCursor';

// Dynamically import the 3D component with no SSR
const Logo3D = dynamic(() => import('@/components/Logo3D'), {
  ssr: false,
  loading: () => (
    <div className="w-[400px] h-[300px] md:w-[500px] md:h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-primary-white text-xl font-bold">Loading...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-accent-red">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Mouse Trail Effect */}
      <MouseTrail />

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Main Content - Centered Animation */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        {/* 3D Logo Animation */}
        <div className="mb-12">
          <Logo3D />
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-16">
          <button className="bg-primary-white/15 hover:bg-primary-white/25 text-primary-white font-bold uppercase tracking-wider px-10 py-4 rounded-full transition-all duration-300 border border-primary-white/40 shadow-xl min-w-[300px] text-sm">
            Descargar Manual de Marca
          </button>
          <button className="bg-primary-white/15 hover:bg-primary-white/25 text-primary-white font-bold uppercase tracking-wider px-10 py-4 rounded-full transition-all duration-300 border border-primary-white/40 shadow-xl min-w-[300px] text-sm">
            Descargar Assets
          </button>
        </div>
      </main>
    </div>
  );
}
