// Small API helper: centralize the base URL so it can be changed via env var
// Use NEXT_PUBLIC_API_BASE_URL so it is available on the client.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

export function apiUrl(path: string) {
  if (!path.startsWith("/")) path = `/${path}`
  return `${API_BASE}${path}`
}

export default apiUrl
