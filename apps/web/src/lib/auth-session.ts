import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001"}/api/v1/auth/get-session`,
      {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

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
