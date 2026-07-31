"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export function Turnstile({ onVerify }: { onVerify: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      console.error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
      return;
    }

    const renderTurnstile = () => {
      if (!containerRef.current || !window.turnstile) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onVerify(token);
        },
      });
    };

    if (window.turnstile) {
      renderTurnstile();
    } else {
      const script = document.querySelector('script[src*="turnstile"]');
      if (script) {
        script.addEventListener("load", renderTurnstile);
      }
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    };
  }, [onVerify]);

  return <div ref={containerRef} />;
}
