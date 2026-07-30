export interface Logger {
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
}

export interface Metrics {
  increment: (counter: string, labels?: Record<string, string>) => void;
  histogram: (name: string, value: number, labels?: Record<string, string>) => void;
}
