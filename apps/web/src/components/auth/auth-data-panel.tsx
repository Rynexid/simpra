"use client";

import { useState, useEffect } from "react";

function JsonBlink({ value, delay = 0 }: { value: string; delay?: number }) {
  return (
    <span
      className="inline-block h-3 w-3 rounded-full bg-primary animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="sr-only">{value}</span>
    </span>
  );
}

const LINES = [
  '{',
  '  "organization": "PT Guna Jaya",',
  '  "warehouses": [',
  '    { "id": "wh-001", "name": "Jakarta", "status": "active" },',
  '    { "id": "wh-002", "name": "Bandung", "status": "active" }',
  '  ],',
  '  "inventory": {',
  '    "totalSKUs": 12847,',
  '    "inStock": "98.4%",',
  '    "lowStock": 23,',
  '    "pendingPO": 12,',
  '    "lastUpdated": "2026-07-31T05:56:00Z"',
  '  },',
  '  "recentActivity": [',
  '    { "type": "stock_in", "item": "SKU-001", "qty": 150 },',
  '    { "type": "transfer", "from": "JKT", "to": "BDG", "qty": 50 }',
  '  ]',
  '}',
];

function Token({ children, className }: { children: string; className?: string }) {
  return <span className={className}>{children}</span>;
}

export function AuthDataPanel() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let idx = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (idx < LINES.length) {
        setLines((prev) => [...prev, LINES[idx]]);
        idx += 1;
        setTimeout(tick, 100);
      }
    };

    setTimeout(tick, 100);

    return () => {
      cancelled = true;
    };
  }, []);

  const renderLine = (line: string) => {
    if (!line) return null;
    const trimmed = line.trim();

    if (trimmed === '{' || trimmed === '}' || trimmed === '},') {
      return <Token className="text-foreground">{line}</Token>;
    }
    if (trimmed.startsWith('"')) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > -1) {
        const key = line.slice(0, colonIdx);
        const value = line.slice(colonIdx + 1);
        return (
          <>
            <Token className="text-primary">{key}</Token>
            <Token className="text-muted-foreground">:</Token>
            <Token className="text-emerald-600 dark:text-emerald-400">{value}</Token>
          </>
        );
      }
    }
    if (trimmed.startsWith('[') || trimmed.startsWith(']')) {
      return <Token className="text-muted-foreground">{line}</Token>;
    }
    if (trimmed.startsWith('{')) {
      return <Token className="text-foreground/80">{line}</Token>;
    }

    return <Token className="text-foreground/80">{line}</Token>;
  };

  return (
    <div className="font-mono text-[11px] leading-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <JsonBlink value="●" delay={0} />
          <JsonBlink value="●" delay={300} />
          <JsonBlink value="●" delay={600} />
          <span className="ml-2 text-muted-foreground text-[10px]">live-inventory.json</span>
        </div>
        <span className="text-[10px] text-muted-foreground">UTF-8</span>
      </div>
      <div className="space-y-0">
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex hover:bg-muted/40 px-1 -mx-1"
          >
            <span className="text-muted-foreground/60 select-none mr-3 text-right w-4">{i + 1}</span>
            <span className="flex-1">{renderLine(line)}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
