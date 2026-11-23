import React, { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate 16 gentle floating heart elements with varied positions and delays
    const items = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 18) + 12,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.15,
      symbol: ['❤️', '💖', '💕', '✨', '🌸'][Math.floor(Math.random() * 5)],
    }));
    setHearts(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
          className="absolute bottom-0 animate-float-slow select-none transition-all"
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}
