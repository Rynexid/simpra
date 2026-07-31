"use client";

import { useEffect, useState } from "react";
import { TooltipProvider } from "@simpra/ui/components/tooltip";
import { Toaster } from "@simpra/ui/components/sonner";
import { PostHogProvider } from "@/components/posthog-provider";
import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/cookie-consent-provider";

export function RootLayoutInner({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);
  const { analyticsAllowed } = useCookieConsent();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      <PostHogProvider>
        <TooltipProvider delay={150}>
          {children}
        </TooltipProvider>
      </PostHogProvider>
      <Toaster
        position="top-right"
        richColors
        closeButton
      />
      {mounted && analyticsAllowed && <Analytics />}
    </>
  );
}
