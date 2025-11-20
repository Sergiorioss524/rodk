"use client";

import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export default function BackgroundBoxesDemo() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg bg-accent-red text-white">
      <Boxes className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.15] opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-red/70 via-accent-red/80 to-accent-red" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className={cn("text-xl md:text-4xl font-semibold tracking-tight")}>
          Tailwind is Awesome
        </h1>
        <p className="mt-2 text-base text-primary-white/80">
          Framer Motion is the best animation library ngl
        </p>
      </div>
    </div>
  );
}
