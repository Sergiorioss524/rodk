'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import { BackgroundRipple } from '@/components/ui/background-ripple-effect';
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from '@/components/ui/animated-modal';

// Dynamically import the 3D component with no SSR
const Logo3D = dynamic(() => import('@/components/Logo3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[240px] w-[290px] items-center justify-center md:h-[320px] md:w-[390px]">
      <div className="animate-pulse text-primary-white text-xl font-bold">Loading...</div>
    </div>
  ),
});

const downloads = [
  {
    label: 'Acerca de',
    description: 'Lineamientos de identidad, paleta y usos correctos del logo.',
  },
  {
    label: 'Redes Sociales',
    description: 'Pack con renders, texturas y tipografias listas para usar.',
  },
];

export default function Home() {
  return (
    <Modal>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-accent-red text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <BackgroundRipple className="opacity-25" />
        </div>

        {/* Header Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <Navbar
            menuTrigger={
              <ModalTrigger
                className="flex cursor-pointer items-center px-2 py-1"
                aria-label="Abrir modal de recursos"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="block h-[2px] w-6 bg-primary-white" />
                  <span className="block h-[2px] w-6 bg-primary-white" />
                  <span className="block h-[2px] w-6 bg-primary-white" />
                </div>
              </ModalTrigger>
            }
          />
        </header>

        {/* Main Content */}
        <main className="flex min-h-[calc(100vh-5rem)] w-full flex-1 flex-col items-center justify-center gap-8 px-6 pb-10 pt-24 text-center md:pt-28">
          <div className="flex items-center justify-center">
            <Logo3D />
          </div>

          <div className="flex flex-col items-center justify-center">
            <button className="rounded-full bg-primary-white px-6 py-2 text-xs font-black uppercase tracking-[0.28em] text-accent-red shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]">
              Manual de Marca
            </button>
          </div>
        </main>
      </div>

      <ModalBody className="max-w-md border-none bg-transparent shadow-none">
        <ModalContent className="rounded-3xl border border-white/15 bg-[#1c0407] p-7 text-primary-white shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
          <div className="space-y-5">
            {downloads.map(item => (
              <button
                key={item.label}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-left transition hover:bg-white/10"
              >
                <div className="space-y-1.5">
                  <div className="text-sm font-semibold uppercase tracking-[0.32em]">
                    {item.label}
                  </div>
                  <p className="text-xs text-white/70">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
