export type Locale = "en" | "he";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALES: Locale[] = ["en", "he"];

export const localeMeta = {
  en: {
    label: "English",
    shortLabel: "EN",
    lang: "en",
    dir: "ltr",
  },
  he: {
    label: "עברית",
    shortLabel: "עב",
    lang: "he",
    dir: "rtl",
  },
} as const;

export function getLocale(pathname: string): Locale {
  return pathname === "/he" || pathname.startsWith("/he/") ? "he" : DEFAULT_LOCALE;
}

export function stripLocale(pathname: string) {
  if (pathname === "/he") return "/";
  if (pathname.startsWith("/he/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizedPath(pathname: string, locale: Locale) {
  const stripped = stripLocale(pathname);
  if (locale === DEFAULT_LOCALE) return stripped;
  return stripped === "/" ? "/he" : `/he${stripped}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "he" ? "en" : "he";
}

export function alternateLocalePath(pathname: string) {
  return localizedPath(pathname, alternateLocale(getLocale(pathname)));
}
