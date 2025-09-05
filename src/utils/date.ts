const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * Format an input date to "Month D, YYYY" for display.
 * If the input cannot be parsed, return it as-is (non-destructive).
 */
export function formatDisplayDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  // Fallback: return original string (do not mutate unknown formats)
  return typeof input === "string" ? input : "";
}

/**
 * Parse common date inputs to an ISO YYYY-MM-DD string.
 * Returns null when parsing fails.
 */
export function parseToISO(input: string): string | null {
  if (typeof input !== "string" || !input.trim()) return null;

  // 1) Native parsing first
  const d1 = new Date(input);
  if (!isNaN(d1.getTime())) return d1.toISOString().slice(0, 10);

  // 2) Explicit "Month D, YYYY"
  const m = input.trim().match(/^(\w+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return null;
  const mi = MONTHS.indexOf(m[1].toLowerCase());
  if (mi === -1) return null;
  const day = Number(m[2]);
  const year = Number(m[3]);
  const d = new Date(Date.UTC(year, mi, day));
  return !isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : null;
}

/**
 * Ensure a 4-digit year is present purely for display purposes.
 * - If a year already exists, return the string unchanged.
 * - If missing and parseable, append the current year and return a formatted display date.
 * - If not parseable, return the original string.
 */
export function ensureYear(display: string): string {
  if (typeof display !== "string") return display as any;
  if (/\d{4}/.test(display)) return display; // already contains a year

  // If it looks like "Month D" (no year), add current year
  const md = display.trim().match(/^(\w+)\s+(\d{1,2})$/);
  const currentYear = new Date().getFullYear();
  if (md) {
    const mi = MONTHS.indexOf(md[1].toLowerCase());
    const day = Number(md[2]);
    if (mi > -1 && day >= 1 && day <= 31) {
      const d = new Date(currentYear, mi, day);
      return formatDisplayDate(d);
    }
  }

  // Try native Date as a last resort and format
  const d2 = new Date(display);
  if (!isNaN(d2.getTime())) return formatDisplayDate(d2);

  return display;
}
