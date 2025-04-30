'use client';
import { useEffect, useState } from 'react';
import HiddenBackground from './HiddenBackground';

export default function RevealGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <HiddenBackground />
      <div className="absolute inset-0 z-10 bg-black opacity-80" />
      <div
        className="absolute z-20 pointer-events-none mix-blend-difference"
        style={{
          width: 300,
          height: 300,
          borderRadius: '9999px',
          background: 'white',
          top: pos.y - 150,
          left: pos.x - 150,
          filter: 'blur(60px)',
        }}
      />
      <div className="relative z-30 text-white text-center pt-20 text-3xl font-bold">
        Hover to Reveal
      </div>
    </div>
  );
}
