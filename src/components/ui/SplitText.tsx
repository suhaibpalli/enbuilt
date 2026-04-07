"use client";

import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  wordClassName?: string;
  /**
   * If true, wraps words in an extra span to prevent words from breaking across lines.
   * Default: true
   */
  preserveWords?: boolean;
}

/**
 * A reusable component that splits text into individual characters for GSAP animations.
 * Provides a similar outcome to GSAP's SplitText plugin without the paid requirement.
 * 
 * Target characters in GSAP using: .split-char or the provided charClassName.
 */
export default function SplitText({
  text,
  className,
  charClassName,
  wordClassName,
  preserveWords = true,
}: SplitTextProps) {
  if (!text) return null;

  if (preserveWords) {
    const words = text.split(" ");
    
    return (
      <span className={cn("split-text inline-block", className)} aria-label={text}>
        {words.map((word, wordIdx) => (
          <span 
            key={wordIdx} 
            className={cn("split-word inline-block whitespace-nowrap", wordClassName)}
          >
            {word.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className={cn("split-char inline-block", charClassName)}
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
            {/* Add space after word except for the last one */}
            {wordIdx < words.length - 1 && (
              <span className="inline-block" aria-hidden="true">
                &nbsp;
              </span>
            )}
          </span>
        ))}
      </span>
    );
  }

  // Simple character split (can cause words to break across lines if not careful)
  return (
    <span className={cn("split-text inline-block", className)} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={cn("split-char inline-block", charClassName)}
          aria-hidden={char === " " ? undefined : "true"}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
