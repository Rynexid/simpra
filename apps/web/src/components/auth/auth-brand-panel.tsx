import Link from "next/link";
import Image from "next/image";
import { AuthDataPanel } from "@/components/auth/auth-data-panel"

export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-background border-r border-border">
      <div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="brand-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brand-grid)" />
        </svg>
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>

      <div className="flex flex-col justify-between w-full p-12">
        <div>
          <Link href="/" className="flex items-center">
            <Image src="/simpraLogo.webp" alt="Simpra" width={120} height={40} className="h-10 w-auto" />
            <span className="ml-3 text-xl font-semibold">Simpra</span>
          </Link>
        </div>

        <div className="w-full">
          <div className="rounded-lg border border-border bg-background/50 p-4">
            <AuthDataPanel />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Built with Next.js, Hono, and Bun</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span>v1.0 Beta</span>
        </div>
      </div>
    </div>
  )
}
