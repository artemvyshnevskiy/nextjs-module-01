export function parseExpand(searchParams: URLSearchParams, allowed: string[]): string[] {
  const raw = searchParams.get("expand")
  if (!raw) return []

  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => allowed.includes(s))
}
