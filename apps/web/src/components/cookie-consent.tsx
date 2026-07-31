"use client";

import { useState, useCallback } from "react";
import { Button } from "@simpra/ui/components/button";
import { cn } from "@simpra/ui/lib/utils";

type CookieConsent = "accepted" | "declined" | "custom";

export function CookieConsent() {
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return !localStorage.getItem("cookie-consent");
    } catch {
      return true;
    }
  });
  const [showCustom, setShowCustom] = useState(false);

  const handleAccept = useCallback(() => {
    localStorage.setItem("cookie-consent", "accepted");
    setOpen(false);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem("cookie-consent", "declined");
    setOpen(false);
  }, []);

  const handleCustomSave = useCallback(() => {
    localStorage.setItem("cookie-consent", "custom");
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[9999] md:left-auto md:right-4 md:max-w-md">
      <div className="rounded-lg border border-border bg-card p-4 shadow-lg">
        {!showCustom ? (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-semibold">Cookie Settings</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience and analyze site traffic.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={handleAccept} className="w-full">
                Accept All
              </Button>
              <Button onClick={handleDecline} variant="outline" className="w-full">
                Decline
              </Button>
              <Button onClick={() => setShowCustom(true)} variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                Customize
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-semibold">Customize Cookies</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose which cookies you want to accept.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <CookieToggle label="Necessary" description="Required for the website to function properly." defaultChecked disabled />
              <CookieToggle label="Analytics" description="Help us improve our website by collecting anonymous usage data." defaultChecked />
              <CookieToggle label="Marketing" description="Used to deliver relevant advertisements to you." />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowCustom(false)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button onClick={handleCustomSave} className="flex-1">
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CookieToggle({
  label,
  description,
  defaultChecked = false,
  disabled = false,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className={cn("text-sm font-medium", disabled && "text-muted-foreground")}>{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none disabled:cursor-not-allowed",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-background shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}