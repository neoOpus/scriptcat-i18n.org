/**
 * Flags for the language picker, loaded from standalone SVG files.
 *
 * Each locale has a plain `.svg` file in `static/img/flags/<locale>.svg`
 * (all 3:2, flat, minimal, material-like). To tweak a flag, just edit or
 * replace the file — no code changes needed (the picker reads the file by
 * locale code). Unknown locales fall back to a neutral dot so the picker
 * never breaks.
 *
 * - League/community flags where the user chose them: ar -> Arab League,
 *   fr -> Francophonie (OIF).
 * - zh-Hant uses a neutral "文" glyph chip instead of a national flag
 *   (Taiwan/PRC would be politically sensitive and doesn't serve either
 *   side).
 */
import React, { type ReactNode } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

/** English display name shown as secondary text in the picker. */
export const ENGLISH_NAMES: Record<string, string> = {
  "zh-Hans": "Chinese (Simplified)",
  en: "English",
  ja: "Japanese",
  ru: "Russian",
  vi: "Vietnamese",
  de: "German",
  "zh-Hant": "Chinese (Traditional)",
  es: "Spanish",
  fr: "French",
  ar: "Arabic",
  it: "Italian",
  pt: "Portuguese",
  fa: "Persian",
  nl: "Dutch",
  bn: "Bengali",
  id: "Indonesian",
  hy: "Armenian",
  uk: "Ukrainian",
  tr: "Turkish",
  ko: "Korean",
};

/** Every configured locale has a flag file at static/img/flags/<locale>.svg. */
const FLAG_FILES = new Set(Object.keys(ENGLISH_NAMES));

/**
 * Renders the flag for a locale at 3:2 with rounded corners.
 * size: "md" (24px wide — picker rows), "sm" (18px — compact buttons).
 */
export function Flag({
  locale,
  size = "md",
}: {
  locale: string;
  size?: "sm" | "md";
}): ReactNode {
  const width = size === "md" ? 24 : 18;
  const height = size === "md" ? 16 : 12;
  const src = useBaseUrl(`/img/flags/${locale}.svg`);

  if (!FLAG_FILES.has(locale)) {
    // Unknown locale: fall back to a neutral dot so the picker never breaks.
    return (
      <span
        style={{
          width,
          height,
          borderRadius: 4,
          background: "#3b82f6",
          display: "inline-block",
        }}
      />
    );
  }

  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width,
        height,
        borderRadius: 4,
        overflow: "hidden",
        flex: "none",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12)",
      }}
    >
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        style={{ display: "block", width, height, objectFit: "cover" }}
      />
    </span>
  );
}
