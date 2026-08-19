/**
 * Flat SVG flags for the language picker.
 *
 * - One style everywhere (flat, minimal, material-like), rounded 4px chips.
 * - League/community flags where the user chose them: ar -> Arab League,
 *   fr -> Francophonie (OIF).
 * - zh-Hant uses a neutral "文" glyph chip instead of a national flag
 *   (Taiwan/PRC would be politically sensitive and doesn't serve either side).
 *
 * All flags are 3:2. `<Flag locale>` is the only export used by callers.
 */
import React, { type CSSProperties, type ReactNode } from "react";

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

const FLAGS: Record<string, ReactNode> = {
  // zh-Hans — PRC (the project's default locale; standard in this context)
  "zh-Hans": (
    <>
      <rect width="3" height="2" fill="#DE2910" />
      <path d="M1.9 .55 L2.7 1 L1.9 1.45 L2.14 .7 L2.14 1.3" fill="#FFDE00" />
    </>
  ),
  // en — United Kingdom
  en: (
    <>
      <rect width="3" height="1.33" fill="#012169" />
      <rect y="1.33" width="3" height=".67" fill="#fff" />
      <rect y=".67" width="3" height=".67" fill="#C8102E" />
      <path d="M0 0h1.2v.8h1.8v.4H1.2V2H.8V1.2H0z" fill="#fff" />
      <path d="M0 0h.6v.4h2.4v.4H.6v1.2H0z" fill="#C8102E" opacity=".9" />
    </>
  ),
  ja: (
    <>
      <rect width="3" height="2" fill="#fff" />
      <circle cx="1.5" cy="1" r=".62" fill="#BC002D" />
    </>
  ),
  ru: (
    <>
      <rect width="3" height=".67" fill="#fff" />
      <rect y=".67" width="3" height=".67" fill="#0039A6" />
      <rect y="1.33" width="3" height=".67" fill="#D52B1E" />
    </>
  ),
  vi: (
    <>
      <rect width="3" height="2" fill="#DA251D" />
      <path
        d="M1.5 .4 L1.62 .72 L1.96 .73 L1.68 .93 L1.78 1.26 L1.5 1.06 L1.22 1.26 L1.32 .93 L1.04 .73 L1.38 .72 Z"
        fill="#FFFF00"
      />
    </>
  ),
  de: (
    <>
      <rect width="3" height=".67" fill="#000" />
      <rect y=".67" width="3" height=".67" fill="#DD0000" />
      <rect y="1.33" width="3" height=".67" fill="#FFCE00" />
    </>
  ),
  es: (
    <>
      <rect width="3" height=".67" fill="#AA151B" />
      <rect y=".67" width="3" height=".67" fill="#F1BF00" />
      <rect y="1.33" width="3" height=".67" fill="#AA151B" />
    </>
  ),
  // fr — Francophonie (OIF): blue field + gold-ring emblem
  fr: (
    <>
      <rect width="3" height="2" fill="#0055A4" />
      <circle
        cx="1.5"
        cy="1"
        r=".5"
        fill="none"
        stroke="#FDB913"
        strokeWidth=".1"
      />
      <circle cx="1.5" cy="1" r=".34" fill="#FDB913" />
      <circle cx="1.5" cy="1" r=".2" fill="#009E60" />
      <path d="M1.5 .78v.44M1.28 1h.44" stroke="#FDB913" strokeWidth=".07" />
    </>
  ),
  // ar — Arab League: green #006233 field + white emblem (ring, crescent
  // dome, text band, star), modelled on the reference the user provided.
  ar: (
    <>
      <rect width="3" height="2" fill="#006233" />
      <g fill="none" stroke="#fff">
        {/* wreath ring */}
        <circle cx="1.5" cy="1" r=".66" strokeWidth=".045" />
        {/* crescent dome: outer arc through top .77, inner arc through .90 */}
        <path
          d="M .99 1.21 A .516 .516 0 1 1 2.01 1.21 L 1.885 1.252 A .386 .386 0 1 0 1.115 1.252 L .99 1.21 Z"
          fill="#fff"
        />
      </g>
      {/* text band */}
      <rect
        x="1.16"
        y="1.245"
        width=".68"
        height=".095"
        rx=".04"
        fill="#fff"
      />
      {/* small star */}
      <path
        d="M1.5 1.375 L1.525 1.446 L1.6 1.448 L1.525 1.514 L1.562 1.565 L1.475 1.514 L1.438 1.565 L1.46 1.467 L1.4 1.448 L1.5 1.438 Z"
        fill="#fff"
      />
    </>
  ),
  it: (
    <>
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#CE2B37" />
    </>
  ),
  pt: (
    <>
      <rect width="1" height="2" fill="#046A38" />
      <rect x="1" width="2" height="2" fill="#DA291C" />
    </>
  ),
  fa: (
    <>
      <rect width="3" height=".67" fill="#239F40" />
      <rect y=".67" width="3" height=".67" fill="#fff" />
      <rect y="1.33" width="3" height=".67" fill="#DA0000" />
    </>
  ),
  nl: (
    <>
      <rect width="3" height="1" fill="#AE1C28" />
      <rect y="1" width="3" height="1" fill="#fff" />
      <rect y="1" width="3" height=".5" fill="#21468B" />
    </>
  ),
  bn: (
    <>
      <rect width="3" height="2" fill="#006A4E" />
      <circle cx="1.2" cy="1" r=".55" fill="#F42A41" />
    </>
  ),
  id: (
    <>
      <rect width="3" height="1" fill="#CE1126" />
      <rect y="1" width="3" height="1" fill="#fff" />
    </>
  ),
  hy: (
    <>
      <rect width="3" height=".67" fill="#D90012" />
      <rect y=".67" width="3" height=".67" fill="#0033A0" />
      <rect y="1.33" width="3" height=".67" fill="#F2A800" />
    </>
  ),
  uk: (
    <>
      <rect width="3" height="1" fill="#0057B7" />
      <rect y="1" width="3" height="1" fill="#FFD700" />
    </>
  ),
  tr: (
    <>
      <rect width="3" height="2" fill="#E30A17" />
      <path
        d="M1.4 .4 A .7 .7 0 1 0 1.4 1.6 A .6 .6 0 1 1 1.4 .4 Z"
        fill="#fff"
        transform="translate(.12 0)"
      />
      <path
        d="M1.85 .62 l.08 .18 .2 .02 -.15 .13 .05 .2 -.18 -.1 -.18 .1 .05 -.2 -.15 -.13 .2 -.02z"
        fill="#fff"
      />
    </>
  ),
  ko: (
    <>
      <rect width="3" height="2" fill="#fff" />
      <circle cx="1.35" cy="1" r=".4" fill="#CD2E3A" />
      <circle cx="1.65" cy="1" r=".4" fill="#0047A0" />
      <path d="M1.35 .78 A .22 .22 0 0 1 1.35 1.22 Z" fill="#fff" />
      <path d="M1.65 .78 A .22 .22 0 0 0 1.65 1.22 Z" fill="#fff" />
    </>
  ),
};

/** Neutral Traditional-Chinese glyph chip (no national flag). */
function ChineseGlyph({ style }: { style: CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        background: "linear-gradient(135deg,#475569,#334155)",
        color: "#f1f5f9",
        fontWeight: 600,
        fontFamily:
          '"PingFang TC","Noto Sans TC","Microsoft JhengHei",serif',
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      文
    </span>
  );
}

/**
 * Renders the flag for a locale at 3:2 with rounded corners.
 * size: "md" (32px wide — picker rows), "sm" (18px — compact buttons).
 */
export function Flag({
  locale,
  size = "md",
}: {
  locale: string;
  size?: "sm" | "md";
}): ReactNode {
  const width = size === "md" ? 32 : 18;
  const height = size === "md" ? 22 : 12;

  if (locale === "zh-Hant") {
    return <ChineseGlyph style={{ width, height, fontSize: size === "md" ? 15 : 9 }} />;
  }

  const body = FLAGS[locale];
  if (!body) {
    // Unknown locale: fall back to a neutral dot so the picker never breaks.
    return <span style={{ width, height, borderRadius: 4, background: "#3b82f6", display: "inline-block" }} />;
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
      <svg viewBox="0 0 3 2" width={width} height={height} style={{ display: "block" }}>
        {body}
      </svg>
    </span>
  );
}
