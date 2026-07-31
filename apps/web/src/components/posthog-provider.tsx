"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { initPostHog } from "@/lib/posthog";
import { useCookieConsent } from "@/components/cookie-consent-provider";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();
  const { analyticsAllowed } = useCookieConsent();

  useEffect(() => {
    if (pathname && ph && analyticsAllowed) {
      let url = pathname;
      const params = searchParams?.toString();
      if (params) url += `?${params}`;
      ph.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, ph, analyticsAllowed]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { analyticsAllowed } = useCookieConsent();

  useEffect(() => {
    if (analyticsAllowed) {
      initPostHog();
    }
  }, [analyticsAllowed]);

  return (
    <PHProvider apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY!}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
