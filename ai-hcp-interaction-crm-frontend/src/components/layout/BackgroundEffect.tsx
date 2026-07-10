import React from "react";
import { motion } from "motion/react";

export function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-bg-base select-none pointer-events-none">
      {/* Cinematic Aurora Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-primary/15 blur-[120px] animate-aurora" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[70%] h-[70%] rounded-full bg-brand-accent/15 blur-[150px] animate-aurora-reverse" />
      <div className="absolute top-[30%] left-[40%] w-[50%] h-[50%] rounded-full bg-brand-success/5 blur-[140px] animate-aurora" />

      {/* Radial Glow Pool in the Center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,20,30,0)_0%,rgba(8,11,18,0.9)_100%)]" />

      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Floating Low-Opacity Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 20 + 20;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-brand-primary/10 blur-[1px]"
              style={{
                width: size,
                height: size,
                left: `${initialX}%`,
                top: `${initialY}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Decorative Pseudo-3D / Holographic Medical Elements in Negative Space */}
      <div className="absolute inset-0 z-0">
        {/* Holographic Healthcare Cross */}
        <motion.div
          className="absolute top-[15%] left-[5%] opacity-[0.06] text-brand-primary pointer-events-none"
          animate={{
            rotateY: [0, 360],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20" />
            <rect x="9" y="9" width="6" height="6" rx="1" strokeWidth="0.5" fill="rgba(91, 140, 255, 0.1)" />
          </svg>
        </motion.div>

        {/* Floating DNA Helix in bottom left */}
        <motion.div
          className="absolute bottom-[10%] left-[8%] opacity-[0.04] text-brand-accent pointer-events-none"
          animate={{
            rotate: [15, -15, 15],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="160" height="240" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1">
            {[...Array(12)].map((_, i) => {
              const y = 15 + i * 15;
              const angle = i * 0.5;
              return (
                <g key={i}>
                  <line x1={50 - Math.sin(angle) * 35} y1={y} x2={50 + Math.sin(angle) * 35} y2={y} strokeDasharray="2,2" />
                  <circle cx={50 - Math.sin(angle) * 35} cy={y} r="3" fill="currentColor" />
                  <circle cx={50 + Math.sin(angle) * 35} cy={y} r="3" fill="currentColor" />
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Faint Data Visualization Hologram in bottom right negative space */}
        <motion.div
          className="absolute bottom-[12%] right-[5%] opacity-[0.05] text-brand-primary pointer-events-none"
          animate={{
            scale: [1, 1.05, 1],
            rotateX: [10, 20, 10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="180" height="180" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.75">
            <circle cx="60" cy="60" r="50" strokeDasharray="4 4" />
            <circle cx="60" cy="60" r="35" />
            <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="0.5" />
            <line x1="60" y1="10" x2="60" y2="110" strokeDasharray="2 2" />
            <line x1="10" y1="60" x2="110" y2="60" strokeDasharray="2 2" />
            <path d="M 60 25 L 90 60 L 60 95 L 35 60 Z" fill="rgba(91, 140, 255, 0.05)" />
          </svg>
        </motion.div>

        {/* Faint Neural Sphere Top Right */}
        <motion.div
          className="absolute top-[10%] right-[10%] opacity-[0.05] text-brand-accent pointer-events-none"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="50" cy="50" r="40" strokeDasharray="1 5" />
            <circle cx="50" cy="50" r="30" />
            {[...Array(6)].map((_, i) => {
              const angle = (i * Math.PI) / 3;
              const x = 50 + Math.cos(angle) * 30;
              const y = 50 + Math.sin(angle) * 30;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="3.5" fill="currentColor" />
                  <line x1="50" y1="50" x2={x} y2={y} />
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
