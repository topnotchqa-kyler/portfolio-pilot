'use client';

import { useState, useEffect } from 'react';

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

  return (
    <div className="group relative">
      <button
        onClick={() => setPartyMode((p) => !p)}
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
