'use client';

import { useEffect, useRef } from 'react';

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{
    x: number;
    y: number;
    size: number;
    alpha: number;
    vx: number;
    vy: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create multiple particles for a thicker trail
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: mouseX + (Math.random() - 0.5) * 20,
          y: mouseY + (Math.random() - 0.5) * 20,
          size: Math.random() * 60 + 40,
          alpha: 0.6,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }

      // Limit particles
      if (particles.current.length > 150) {
        particles.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(184, 50, 45, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        particle.alpha -= 0.008;
        particle.size -= 0.2;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.alpha <= 0 || particle.size <= 0) {
          return false;
        }

        // Create gradient for lighter effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );

        // Lighter shades derived from #B8322D
        gradient.addColorStop(0, `rgba(255, 120, 110, ${particle.alpha * 0.8})`);
        gradient.addColorStop(0.4, `rgba(220, 80, 70, ${particle.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(184, 50, 45, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'lighten' }}
    />
  );
}
