// Minimal JWT decode utility (no dependencies)
export function decodeJwt(token: string): any {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}
