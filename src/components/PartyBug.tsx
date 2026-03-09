'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

function fireFireworks() {
  const duration = 2000;
  const end = Date.now() + duration;

  const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0099ff', '#9900ff', '#ff00ff'];

  (function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function PartyBug() {
  const [partyMode, setPartyMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (partyMode) {
      html.classList.add('party-mode');
    } else {
      html.classList.remove('party-mode');
    }
    return () => html.classList.remove('party-mode');
  }, [partyMode]);

  const handleClick = useCallback(() => {
    if (!partyMode) {
      fireFireworks();
    }
    setPartyMode((p) => !p);
  }, [partyMode]);

  return (
    <div className="group relative">
      <button
        onClick={handleClick}
        aria-label={partyMode ? 'Disable party mode' : 'Enable party mode'}
        aria-pressed={partyMode}
        data-testid="party-bug"
        className={[
          'text-2xl cursor-pointer select-none',
          'transition-all duration-300',
          'opacity-25 hover:opacity-100',
          'translate-y-2 hover:translate-y-0',
          partyMode ? 'animate-bounce !opacity-100 !translate-y-0' : '',
        ].join(' ')}
      >
        🐛
      </button>

      {/* Tooltip — visible on hover, screen-reader hidden */}
      <span
        aria-hidden="true"
        className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-2 py-1 rounded text-xs
          bg-popover text-popover-foreground border border-border shadow-md
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          whitespace-nowrap pointer-events-none
        "
      >
        {partyMode ? '🎉 Party Mode ON!' : 'Click me!'}
      </span>
    </div>
  );
}
