"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

class Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  opacity: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = Math.random() * 40 + 50;
    this.speed = Math.random() * 0.3 + 0.3;
    this.opacity = Math.random() * 0.25 + 0.15;

    const colors = [
      "255, 255, 255",   // white
      "254, 226, 226",   // red-100
      "252, 165, 165",   // red-300
      "248, 113, 113",   // red-400
      "239, 68, 68",     // red-500
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.radius += this.speed;
    this.opacity -= 0.002;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  isFinished() {
    return this.opacity <= 0 || this.radius >= this.maxRadius;
  }
}

export const BackgroundRipple = React.memo(
  ({
    className,
    containerClassName,
  }: {
    className?: string;
    containerClassName?: string;
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationFrameId: number;
      let ripples: Ripple[] = [];
      const maxRipples = 12;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const createRipple = () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ripples.push(new Ripple(x, y));
      };

      // Create initial ripples
      for (let i = 0; i < maxRipples; i++) {
        setTimeout(() => createRipple(), i * 1500);
      }

      const animate = () => {
        // Clear canvas with transparency instead of red overlay
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ripples = ripples.filter((ripple) => {
          ripple.update();
          ripple.draw(ctx);
          return !ripple.isFinished();
        });

        // Add new ripples periodically
        if (ripples.length < maxRipples && Math.random() < 0.015) {
          createRipple();
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);

    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", containerClassName)}>
        <canvas
          ref={canvasRef}
          className={cn("absolute inset-0 w-full h-full", className)}
        />
      </div>
    );
  }
);

BackgroundRipple.displayName = "BackgroundRipple";

export const BackgroundRippleDemo = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-accent-red">
      <BackgroundRipple />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          Ripple Effect
        </h1>
        <p className="mt-4 text-neutral-200">
          A beautiful animated ripple background effect
        </p>
      </div>
    </div>
  );
};
