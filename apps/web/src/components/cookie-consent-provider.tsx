"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

type CookieConsent = "accepted" | "declined" | "custom";

interface CookieConsentContextValue {
  consent: CookieConsent | null;
  analyticsAllowed: boolean;
  marketingAllowed: boolean;
  acceptAll: () => void;
  decline: () => void;
  saveCustom: (analytics: boolean, marketing: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    return {
      consent: null,
      analyticsAllowed: false,
      marketingAllowed: false,
      acceptAll: () => {},
      decline: () => {},
      saveCustom: () => {},
    } as CookieConsentContextValue;
  }
  return context;
}

function getSavedConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("cookie-consent") as CookieConsent | null;
  } catch {
    return null;
  }
}

function getCustomSettings() {
  if (typeof window === "undefined") return { analytics: false, marketing: false };
  try {
    const saved = localStorage.getItem("cookie-consent");
    if (saved && saved !== "accepted" && saved !== "declined") {
      return JSON.parse(saved) as { analytics: boolean; marketing: boolean };
    }
  } catch {
    // ignore
  }
  return { analytics: false, marketing: false };
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const saved = getSavedConsent();
    const customSettings = getCustomSettings();

    switch (saved) {
      case "accepted":
        setConsent("accepted");
        setAnalyticsAllowed(true);
        setMarketingAllowed(true);
        break;
      case "declined":
        setConsent("declined");
        setAnalyticsAllowed(false);
        setMarketingAllowed(false);
        break;
      case "custom":
        setConsent("custom");
        setAnalyticsAllowed(customSettings.analytics);
        setMarketingAllowed(customSettings.marketing);
        break;
      default:
        setPopupOpen(true);
        break;
    }
  }, []);

  const acceptAll = useCallback(() => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setAnalyticsAllowed(true);
    setMarketingAllowed(true);
    setPopupOpen(false);
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent("declined");
    setAnalyticsAllowed(false);
    setMarketingAllowed(false);
    setPopupOpen(false);
  }, []);

  const saveCustom = useCallback((analytics: boolean, marketing: boolean) => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics, marketing }));
    setConsent("custom");
    setAnalyticsAllowed(analytics);
    setMarketingAllowed(marketing);
    setPopupOpen(false);
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, analyticsAllowed, marketingAllowed, acceptAll, decline, saveCustom }}>
      {children}
      {popupOpen && <CookieConsentPopup acceptAll={acceptAll} decline={decline} onSaveCustom={saveCustom} />}
    </CookieConsentContext.Provider>
  );
}

function CookieConsentPopup({
  acceptAll,
  decline,
  onSaveCustom,
}: {
  acceptAll: () => void;
  decline: () => void;
  onSaveCustom: (analytics: boolean, marketing: boolean) => void;
}) {
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  if (showCustom) {
    return (
      <div className="fixed bottom-6 left-4 right-4 z-[9999] md:left-auto md:right-4 md:max-w-md rounded-lg border border-border bg-card p-4 shadow-lg">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold">Customize Cookies</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose which cookies you want to accept.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CookieToggle label="Necessary" description="Required for the website to function properly." checked={true} disabled />
            <CookieToggle label="Analytics" description="Help us improve our website by collecting anonymous usage data." checked={analytics} onChange={setAnalytics} />
            <CookieToggle label="Marketing" description="Used to deliver relevant advertisements to you." checked={marketing} onChange={setMarketing} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowCustom(false)} className="flex-1 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent">
              Back
            </button>
            <button onClick={() => onSaveCustom(analytics, marketing)} className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[9999] md:left-auto md:right-4 md:max-w-md rounded-lg border border-border bg-card p-4 shadow-lg">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-semibold">Cookie Settings</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We use cookies to enhance your browsing experience and analyze site traffic.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={acceptAll} className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Accept All
          </button>
          <button onClick={decline} className="w-full rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent">
            Decline
          </button>
          <button onClick={() => setShowCustom(true)} className="w-full rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}

function CookieToggle({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
}: {
  label: string;
  description: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className={["text-sm font-medium", disabled ? "text-muted-foreground" : ""].join(" ")}>{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={[
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none",
          checked ? "bg-primary" : "bg-muted",
          disabled ? "cursor-not-allowed opacity-70" : "",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-5 w-5 rounded-full bg-background shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
