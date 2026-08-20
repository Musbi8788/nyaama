"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown by the root layout itself, which is the one case
 * app/error.tsx cannot reach — it replaces the entire document, so it has
 * to supply its own html and body.
 *
 * Styles are inline on purpose. If the root layout failed, the stylesheet
 * and the fonts may be exactly what failed, and a fallback that depends on
 * them is not a fallback.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[nyaama] root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1.5rem",
          textAlign: "center",
          background: "#1c2142",
          color: "#f4f0e6",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
          We couldn&rsquo;t load this right now.
        </h1>
        <p style={{ margin: 0, color: "#a7a9b8", maxWidth: "28rem" }}>
          Something went wrong on our side. Your progress is saved.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            minHeight: 44,
            padding: "0 1.75rem",
            borderRadius: 12,
            border: "none",
            background: "#f6c447",
            color: "#1c2142",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
