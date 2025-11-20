'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type NavbarProps = {
  menuTrigger?: ReactNode;
};

export default function Navbar({ menuTrigger }: NavbarProps) {
  return (
    <nav className="relative w-full bg-accent-red text-primary-white flex items-center justify-between px-8 py-4" style={{ height: '80px' }}>
      <div className="absolute bottom-0 left-8 right-8 border-b border-accent-gray/50"></div>
      {/* Left Section - Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Asociación de Municipalidades Turísticas de Chile"
          width={280}
          height={60}
          className="object-contain h-auto"
          style={{ maxHeight: '60px' }}
          priority
          unoptimized
        />
      </div>

      {/* Center Section - Navigation Links */}
      <div className="hidden md:flex justify-center flex-1 space-x-10">
        <Link
          href="#inicio"
          className="text-sm font-bold uppercase tracking-wide hover:border-b-2 border-primary-white/70 transition-all pb-1"
        >
          Inicio
        </Link>
        <Link
          href="#que-somos"
          className="text-sm font-bold uppercase tracking-wide hover:border-b-2 border-primary-white/70 transition-all pb-1"
        >
          ¿Qué somos?
        </Link>
        <Link
          href="#macrozonas"
          className="text-sm font-bold uppercase tracking-wide hover:border-b-2 border-primary-white/70 transition-all pb-1"
        >
          Macrozonas
        </Link>
        <Link
          href="#socios"
          className="text-sm font-bold uppercase tracking-wide hover:border-b-2 border-primary-white/70 transition-all pb-1"
        >
          Socios
        </Link>
      </div>

      {/* Right Section - Hamburger Menu */}
      {menuTrigger ?? (
        <button
          className="flex items-center cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className="block w-6 h-[2px] bg-primary-white"></span>
            <span className="block w-6 h-[2px] bg-primary-white"></span>
            <span className="block w-6 h-[2px] bg-primary-white"></span>
          </div>
        </button>
      )}
    </nav>
  );
}
