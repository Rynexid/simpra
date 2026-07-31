

interface RequestConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

let config: RequestConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
};

export function configureApi(newConfig: Partial<RequestConfig>) {
  config = { ...config, ...newConfig };
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${config.baseUrl}/api/v1${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.error?.message ?? `Request failed: ${response.status}`,
    );
  }

  return response.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
