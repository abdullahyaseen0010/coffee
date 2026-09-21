type LogLevel = "info" | "warn" | "error";

function emit(level: LogLevel, message: string, meta: Record<string, unknown> = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  if (level === "error") {
    console.error(JSON.stringify(entry));
    return;
  }

  if (level === "warn") {
    console.warn(JSON.stringify(entry));
    return;
  }

  console.log(JSON.stringify(entry));
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => emit("info", message, meta ?? {}),
  warn: (message: string, meta?: Record<string, unknown>) => emit("warn", message, meta ?? {}),
  error: (message: string, meta?: Record<string, unknown>) => emit("error", message, meta ?? {}),
};
