"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { LoaderIcon } from "lucide-react"
import { AuthBrandPanel } from "@/components/auth/auth-brand-panel"

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    });

    setLoading(false);

    if (authError) {
      setError(authError.message ?? "Failed to create account");
      return;
    }

    if (data) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-svh">
      <AuthBrandPanel />
      <div className="flex w-full flex-col items-center justify-center bg-muted px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="flex flex-col gap-6">
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
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>
                    <Field className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={async () => {
                          await authClient.signIn.social({ provider: "apple" });
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Sign up with Apple</span>
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={async () => {
                          await authClient.signIn.social({ provider: "google" });
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Sign up with Google</span>
                      </Button>
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
        </div>
      </div>
    </div>
  );
}
