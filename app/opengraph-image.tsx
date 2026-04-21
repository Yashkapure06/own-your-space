import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Own Your Space - Free Growth Audit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Open Graph image.
 * Uses Next.js Edge runtime + ImageResponse for zero-overhead generation.
 *
 * Visible whenever the page is shared on social platforms (Twitter, LinkedIn,
 * Slack, etc.)
 */
export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#faf9f6",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          color: "#626260",
          fontSize: "22px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "999px",
            backgroundColor: "#ff5600",
          }}
        />
        Free · 48-hour turnaround
      </div>

      {/* Center: headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "#111111",
          fontSize: "92px",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          fontWeight: 500,
        }}
      >
        <div>Find the growth gaps</div>
        <div>your website is hiding.</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#111111",
          fontSize: "28px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              backgroundColor: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#faf9f6",
              fontSize: "20px",
            }}
          >
            O
          </div>
          Own Your Space
        </div>
        <div
          style={{
            color: "#626260",
            fontSize: "22px",
            letterSpacing: "-0.01em",
          }}
        >
          A 12-point report, delivered in 48 hours.
        </div>
      </div>
    </div>,
    { ...size },
  );
}
