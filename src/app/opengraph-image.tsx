import { ImageResponse } from "next/og";

// Image metadata
export const alt = "ENBUILT | Spatial & Structural Design";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Matches src/app/globals.css design tokens (dark theme).
const BG_PRIMARY = "#11131A";
const TEXT_PRIMARY = "#F0F2F5";
const TEXT_SECONDARY = "#8A8FA8";
const ACCENT = "#FF3B3B";
const GRID_LINE = "rgba(240, 242, 245, 0.06)";

async function loadBebasNeue(): Promise<ArrayBuffer | null> {
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&text=ENBUILT"
    );
    const css = await cssRes.text();
    const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
    if (!fontUrl) return null;

    const fontRes = await fetch(fontUrl);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    // Network failure at build/request time must not fail the build —
    // fall back to Satori's built-in sans-serif.
    return null;
  }
}

export default async function Image() {
  const bebasNeue = await loadBebasNeue();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BG_PRIMARY,
          backgroundImage: `linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          position: "relative",
        }}
      >
        {/* Architectural corner marks, echoing the site's section corners */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 48,
            width: 40,
            height: 40,
            borderLeft: `2px solid ${ACCENT}`,
            borderTop: `2px solid ${ACCENT}`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 48,
            width: 40,
            height: 40,
            borderRight: `2px solid ${ACCENT}`,
            borderBottom: `2px solid ${ACCENT}`,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: 24,
          }}
        >
          Est. 2012 / Chennai
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 180,
            lineHeight: 0.9,
            letterSpacing: 4,
            color: TEXT_PRIMARY,
            fontFamily: bebasNeue ? "Bebas Neue" : undefined,
            textTransform: "uppercase",
          }}
        >
          ENBUILT
        </div>

        <div
          style={{
            display: "flex",
            width: 160,
            height: 3,
            backgroundColor: ACCENT,
            marginTop: 28,
            marginBottom: 28,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: TEXT_SECONDARY,
          }}
        >
          Spatial &amp; Structural Design
        </div>
      </div>
    ),
    {
      ...size,
      fonts: bebasNeue
        ? [{ name: "Bebas Neue", data: bebasNeue, style: "normal", weight: 400 }]
        : undefined,
    }
  );
}
