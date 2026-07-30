import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:py-16">
      <div className="w-full max-w-sm sm:max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
