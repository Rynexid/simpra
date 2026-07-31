"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@simpra/ui/components/button"
import { Card, CardContent } from "@simpra/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@simpra/ui/components/field"
import { Input } from "@simpra/ui/components/input"
import { authClient } from "@/lib/auth-client"
import { LoaderIcon } from "lucide-react"
import { cn } from "@simpra/ui/lib/utils"
import { Turnstile } from "@/components/turnstile"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    const { data, error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
      fetchOptions: {
        headers: {
          "x-captcha-response": captchaToken,
        },
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message ?? "Failed to create account");
      return;
    }

    if (data) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create account</h1>
                <p className="text-balance text-muted-foreground">
                  Get started with Simpra
                </p>
              </div>
              {error && (
                <Field>
                  <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@simpra.io"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading && <LoaderIcon className="size-4 animate-spin" />}
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </Field>
              <Turnstile onVerify={(token) => setCaptchaToken(token)} />
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <button
                  type="button"
                  onClick={async () => {
                    await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
                  }}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border text-sm transition-colors hover:border-primary hover:text-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
