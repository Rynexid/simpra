"use client";

import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

export function PostHogIdentify({
  user,
}: {
  user: { id: string; email: string; name: string; image?: string | null };
}) {
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog && user) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
      });
    }
  }, [posthog, user]);

  return null;
}
