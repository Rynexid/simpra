import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/auth/get-session`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.user ?? null;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}
