"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@simpra/ui/components/button";
import { Card, CardContent } from "@simpra/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@simpra/ui/components/field";
import { Input } from "@simpra/ui/components/input";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@simpra/ui/components/combobox";
import { InputGroupAddon } from "@simpra/ui/components/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@simpra/ui/components/select";
import { cn } from "@simpra/ui/lib/utils";
import { GlobeIcon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface TimezoneGroup {
  value: string;
  items: Option[];
}

const COMPANY_SIZE_OPTIONS: Option[] = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const INDUSTRY_OPTIONS: Option[] = [
  "Retail",
  "Manufacturing",
  "Food & Beverage",
  "Logistics & Distribution",
  "E-commerce",
  "Healthcare",
  "Construction",
  "Other",
].map((industry) => ({ value: industry, label: industry }));

const currencyNames = new Intl.DisplayNames("en", { type: "currency" });

const CURRENCY_OPTIONS: Option[] = Intl.supportedValuesOf("currency")
  .map((code) => ({ value: code, label: `${code} — ${currencyNames.of(code)}` }))
  .sort((a, b) => a.label.localeCompare(b.label));

const INDONESIA_TIMEZONES = ["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura"];

function formatGmtOffset(tz: string): string {
  try {
    const parts = new Intl.DateTimeFormat("en", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    }).formatToParts(new Date(2026, 0, 15, 12));
    return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
  } catch {
    return "";
  }
}

const TIMEZONE_GROUPS: TimezoneGroup[] = (() => {
  const buckets: Record<string, Option[]> = {};
  const add = (region: string, tz: string) => {
    const offset = formatGmtOffset(tz);
    (buckets[region] ??= []).push({
      value: tz,
      label: `${offset ? `(${offset}) ` : ""}${tz.replace(/_/g, " ")}`,
    });
  };
  for (const tz of Intl.supportedValuesOf("timeZone")) {
    if (tz === "UTC" || tz === "GMT" || tz.startsWith("Etc/")) continue;
    if (INDONESIA_TIMEZONES.includes(tz)) add("Indonesia", tz);
    else if (tz.startsWith("Asia/")) add("Asia", tz);
    else if (tz.startsWith("Europe/")) add("Europe", tz);
    else if (tz.startsWith("America/")) add("America", tz);
    else if (tz.startsWith("Africa/")) add("Africa", tz);
    else if (tz.startsWith("Australia/") || tz.startsWith("Pacific/"))
      add("Australia & Pacific", tz);
    else add("Other", tz);
  }
  const order = [
    "Indonesia",
    "Asia",
    "Europe",
    "America",
    "Africa",
    "Australia & Pacific",
    "Other",
  ];
  return order
    .filter((name) => buckets[name]?.length)
    .map((name) => ({
      value: name,
      items: buckets[name].sort((a, b) => a.label.localeCompare(b.label)),
    }));
})();

const DEFAULT_TIMEZONE: Option | null =
  TIMEZONE_GROUPS.flatMap((group) => group.items).find(
    (tz) => tz.value === "Asia/Jakarta"
  ) ?? null;

const DEFAULT_CURRENCY: Option | null =
  CURRENCY_OPTIONS.find((c) => c.value === "IDR") ?? null;

const INVITE_ROLES = [
  { value: "member", label: "Member" },
  { value: "admin", label: "Admin" },
] as const;

interface Invite {
  email: string;
  role: "member" | "admin";
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full gap-1.5">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              step >= s ? "bg-primary" : "bg-border"
            )}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-muted-foreground">
        Step {step} of 2
      </p>
    </div>
  );
}

export function OnboardingForm({
  createOrg,
}: {
  createOrg: (formData: FormData) => Promise<void>;
}) {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [timezone, setTimezone] = useState<Option | null>(DEFAULT_TIMEZONE);
  const [currency, setCurrency] = useState<Option | null>(DEFAULT_CURRENCY);
  const [industry, setIndustry] = useState<Option | null>(null);
  const [companySize, setCompanySize] = useState<Option | null>(null);
  const [invites, setInvites] = useState<Invite[]>([{ email: "", role: "member" }]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function updateInvite(index: number, patch: Partial<Invite>) {
    setInvites((prev) =>
      prev.map((inv, i) => (i === index ? { ...inv, ...patch } : inv))
    );
  }

  function removeInvite(index: number) {
    setInvites((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (!companyName.trim()) {
        setError("Company name is required");
        return;
      }
      setStep(2);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("companyName", companyName);
      formData.set("timezone", timezone?.value ?? "Asia/Jakarta");
      formData.set("currency", currency?.value ?? "IDR");
      formData.set("industry", industry?.value ?? "");
      formData.set("companySize", companySize?.value ?? "");
      invites.forEach((inv, i) => {
        if (inv.email.trim()) {
          formData.set(`invite-email-${i}`, inv.email.trim());
          formData.set(`invite-role-${i}`, inv.role);
        }
      });
      await createOrg(formData);
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Failed to create organization. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-lg overflow-hidden p-0">
        <CardContent className="p-6 md:p-8">
          <StepIndicator step={step} />
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                  {step === 1 ? "Set up your company" : "Invite your team"}
                </h1>
                <p className="text-balance text-muted-foreground">
                  {step === 1
                    ? "Tell us about your company to get started."
                    : "Add teammates to collaborate on inventory. You can skip this for now."}
                </p>
              </div>

              {error && (
                <Field>
                  <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                </Field>
              )}

              {step === 1 ? (
                <>
                  <Field>
                    <FieldLabel htmlFor="companyName">
                      Company Name
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Simpra Inc."
                      required
                    />
                    <FieldDescription>
                      Your company or business entity name.
                    </FieldDescription>
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="companySize">Company Size</FieldLabel>
                      <Combobox
                        items={COMPANY_SIZE_OPTIONS}
                        value={companySize}
                        onValueChange={(value) => {
                          if (!Array.isArray(value)) setCompanySize(value);
                        }}
                        itemToStringValue={(size) => size.label}
                      >
                        <ComboboxInput
                          id="companySize"
                          className="w-full"
                          placeholder="Select company size"
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No size found.</ComboboxEmpty>
                          <ComboboxList>
                            {(size) => (
                              <ComboboxItem key={size.value} value={size}>
                                {size.label}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="currency">Currency</FieldLabel>
                      <Combobox
                        items={CURRENCY_OPTIONS}
                        value={currency}
                        onValueChange={(value) => {
                          if (!Array.isArray(value)) setCurrency(value);
                        }}
                        itemToStringValue={(c) => c.label}
                      >
                        <ComboboxInput
                          id="currency"
                          className="w-full"
                          placeholder="Search currency..."
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No currency found.</ComboboxEmpty>
                          <ComboboxList>
                            {(c) => (
                              <ComboboxItem key={c.value} value={c}>
                                {c.label}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
                      <Combobox
                        items={TIMEZONE_GROUPS}
                        value={timezone}
                        onValueChange={(value) => {
                          if (!Array.isArray(value)) setTimezone(value);
                        }}
                        itemToStringValue={(tz) => tz.label}
                      >
                        <ComboboxInput
                          id="timezone"
                          className="w-full"
                          placeholder="Search timezone..."
                        >
                          <InputGroupAddon>
                            <GlobeIcon />
                          </InputGroupAddon>
                        </ComboboxInput>
                        <ComboboxContent alignOffset={-28} className="w-60">
                          <ComboboxEmpty>No timezone found.</ComboboxEmpty>
                          <ComboboxList>
                            {(group) => (
                              <ComboboxGroup key={group.value} items={group.items}>
                                <ComboboxLabel>{group.value}</ComboboxLabel>
                                <ComboboxCollection>
                                  {(tz) => (
                                    <ComboboxItem key={tz.value} value={tz}>
                                      {tz.label}
                                    </ComboboxItem>
                                  )}
                                </ComboboxCollection>
                              </ComboboxGroup>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                      <FieldDescription>
                        Used for stock dates and reports.
                      </FieldDescription>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="industry">Industry</FieldLabel>
                      <Combobox
                        items={INDUSTRY_OPTIONS}
                        value={industry}
                        onValueChange={(value) => {
                          if (!Array.isArray(value)) setIndustry(value);
                        }}
                        itemToStringValue={(item) => item.label}
                      >
                        <ComboboxInput
                          id="industry"
                          className="w-full"
                          placeholder="Select industry"
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No industry found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item.value} value={item}>
                                {item.label}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </Field>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  {invites.map((invite, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 rounded-lg border border-border p-3"
                    >
                      <Field className="flex-1">
                        <FieldLabel
                          htmlFor={`invite-email-${index}`}
                          className="sr-only"
                        >
                          Invite email
                        </FieldLabel>
                        <Input
                          id={`invite-email-${index}`}
                          type="email"
                          value={invite.email}
                          onChange={(e) =>
                            updateInvite(index, { email: e.target.value })
                          }
                          placeholder="teammate@company.com"
                        />
                      </Field>
                      <Field>
                        <FieldLabel
                          htmlFor={`invite-role-${index}`}
                          className="sr-only"
                        >
                          Invite role
                        </FieldLabel>
                        <Select
                          value={invite.role}
                          onValueChange={(role) =>
                            updateInvite(index, { role: role as "member" | "admin" })
                          }
                        >
                          <SelectTrigger
                            id={`invite-role-${index}`}
                            className="w-28"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {INVITE_ROLES.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      {invites.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeInvite(index)}
                          className="mt-0.5 size-8 shrink-0"
                          aria-label="Remove invite"
                        >
                          <XIcon className="size-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInvites((prev) => [...prev, { email: "", role: "member" }])
                    }
                  >
                    <PlusIcon className="size-4" />
                    Add another
                  </Button>
                  <FieldDescription>
                    Invitations are saved and sent once your workspace is ready.
                  </FieldDescription>
                </div>
              )}

              <div className="flex gap-3">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setError("");
                      setStep(1);
                    }}
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <LoaderIcon className="size-4 animate-spin" />}
                  {loading
                    ? "Creating..."
                    : step === 1
                      ? "Continue"
                      : "Create Workspace"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
