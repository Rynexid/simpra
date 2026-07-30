import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh">
      <AuthBrandPanel />
      <div className="flex w-full flex-col items-center justify-center bg-muted px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2">
        <div className="w-full max-w-sm sm:max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
