export function getStringFromForm(
  formData: FormData,
  key: string,
  defaultValue = ""
): string {
  const val = formData.get(key);
  if (val == null) return defaultValue;
  if (typeof val === "string") return val;

  return defaultValue;
}

export function getNumberFromForm(
  formData: FormData,
  key: string,
  defaultValue = 0
): number {
  const str = getStringFromForm(formData, key, "").trim();
  if (str === "") return defaultValue;
  const n = Number(str);
  return Number.isFinite(n) ? n : defaultValue;
}

export function decodeJWT(
  token?: string
): { exp?: number; iat?: number } | null {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload.replace(/_/g, "/").replace(/-/g, "+")));
  } catch {
    return null;
  }
}

export function isTokenExpired(token?: string): boolean {
  if (!token) return true;

  const payload = decodeJWT(token);
  if (!payload?.exp) return false; // if no exp, assume valid (or treat as expired)

  // Add 30-second buffer to avoid edge cases
  const expiry = payload.exp * 1000;
  return Date.now() >= expiry - 30_000;
}
