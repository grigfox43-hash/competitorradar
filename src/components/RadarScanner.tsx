'use client';

import React from 'react';

interface Blip {
  name: string;
  type: string;
  top: string;
  left: string;
  delay: string;
  color: string;
}

export function RadarScanner({ size = 480 }: { size?: number }) {
  const blips: Blip[] = [
    { name: 'Stripe: -15% на API', type: 'price', top: '28%', left: '68%', delay: '0.4s', color: '#FF5C5C' },
    { name: 'Linear: Новая фича', type: 'feature', top: '65%', left: '72%', delay: '1.2s', color: '#4C8CFF' },
    { name: 'Vercel: Новый оффер', type: 'offer', top: '35%', left: '26%', delay: '2.1s', color: '#3DFFB0' },
    { name: 'Figma: Смена CTA', type: 'content', top: '75%', left: '38%', delay: '3.0s', color: '#F5A623' },
  ];

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: '100%' }}
    >
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-radar-accent/5 blur-2xl" />

      {/* Outer border ring */}
      <div className="absolute inset-0 rounded-full border border-radar-border/80" />

      {/* Middle concentric rings */}
      <div className="absolute inset-[15%] rounded-full border border-radar-border/60" />
      <div className="absolute inset-[32%] rounded-full border border-radar-border/40" />
      <div className="absolute inset-[50%] rounded-full border border-radar-border/30" />
      <div className="absolute inset-[68%] rounded-full border border-radar-accent/20" />

      {/* Axis crosshair lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-radar-border/40" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-px bg-radar-border/40" />
      </div>

      {/* Diagonal grid lines */}
      <div className="absolute inset-0 flex items-center justify-center rotate-45">
        <div className="w-full h-px bg-radar-border/20" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center -rotate-45">
        <div className="w-full h-px bg-radar-border/20" />
      </div>

      {/* Rotating Radar Sweep Cone */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="w-full h-full rounded-full radar-sweep" />
      </div>

      {/* Center Radar Origin Beacon */}
      <div className="relative z-10 w-5 h-5 rounded-full bg-radar-accent flex items-center justify-center shadow-[0_0_15px_#3DFFB0]">
        <div className="w-2 h-2 rounded-full bg-black animate-ping" />
      </div>

      {/* Monitored Competitor Blips on the Radar */}
      {blips.map((b, idx) => (
        <div
          key={idx}
          className="group absolute z-20 cursor-pointer"
          style={{ top: b.top, left: b.left }}
        >
          {/* Pulsing ring */}
          <div
            className="w-3.5 h-3.5 rounded-full animate-ping opacity-75"
            style={{ backgroundColor: b.color, animationDelay: b.delay }}
          />
          {/* Target core dot */}
          <div
            className="absolute inset-0 w-3.5 h-3.5 rounded-full border-2 border-radar-bg"
            style={{ backgroundColor: b.color, boxShadow: `0 0 10px ${b.color}` }}
          />
          {/* Floating radar label */}
          <div className="absolute left-5 -top-2 px-2.5 py-1 rounded bg-radar-card/95 border border-radar-border text-xs whitespace-nowrap text-radar-text shadow-xl backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: b.color }} />
            {b.name}
          </div>
        </div>
      ))}
    </div>
  );
}
