import type { ReactNode } from "react";

/**
 * A deliberately small markdown renderer for lesson bodies.
 *
 * It produces React nodes, never HTML strings. That is the whole reason it
 * exists: translated bodies come back from a language model, and anything
 * built on dangerouslySetInnerHTML would make the model's output executable
 * in the learner's browser. Here the worst a bad response can do is look
 * untidy.
 *
 * Supported, because it is what the lessons actually use: blank-line
 * paragraphs, ``` fences, `inline code`, **bold**, *italic*, # headings,
 * and - / 1. lists. Anything else renders as plain text rather than
 * disappearing.
 */

/**
 * Splits on **bold**, *italic* and `code`, leaving the rest as text.
 *
 * Bold comes first in the alternation so that **x** is never mistaken for
 * an italic run, and an italic opener must be followed by a non-space so
 * that arithmetic and stray asterisks stay literal.
 */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let n = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b${n}`} className="font-semibold text-text">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={`${keyPrefix}-i${n}`} className="italic text-text/90">
          {token.slice(1, -1)}
        </em>,
      );
    } else {
      nodes.push(
        <code
          key={`${keyPrefix}-c${n}`}
          className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.875em] text-text"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }

    last = match.index + token.length;
    n++;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const BULLET = /^\s*[-*]\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;

export function Markdown({ children }: { children: string }) {
  const lines = children.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];

  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let key = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    paragraph = [];
    if (!text) return;
    blocks.push(
      <p key={`p${key++}`} className="leading-[1.75] text-muted">
        {inline(text, `p${key}`)}
      </p>,
    );
  };

  const flushList = () => {
    if (!list) return;
    const { ordered, items } = list;
    list = null;
    const Tag = ordered ? "ol" : "ul";
    blocks.push(
      <Tag
        key={`l${key++}`}
        className={
          ordered
            ? "list-decimal space-y-2 pl-5 leading-[1.75] text-muted marker:text-yellow"
            : "list-disc space-y-2 pl-5 leading-[1.75] text-muted marker:text-yellow"
        }
      >
        {items.map((item, i) => (
          <li key={i}>{inline(item, `l${key}-${i}`)}</li>
        ))}
      </Tag>,
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced code. Runs to the closing fence, or to the end if the model
    // forgot to close it — an unterminated fence must not swallow silently.
    if (line.trimStart().startsWith("```")) {
      flushParagraph();
      flushList();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      blocks.push(
        <pre
          key={`f${key++}`}
          className="overflow-x-auto rounded-xl border border-line bg-surface-2 p-4 text-sm leading-relaxed text-text"
        >
          <code className="font-mono">{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const bullet = BULLET.test(line);
    const numbered = !bullet && NUMBERED.test(line);

    if (bullet || numbered) {
      flushParagraph();
      const ordered = numbered;
      if (list && list.ordered !== ordered) flushList();
      list ??= { ordered, items: [] };
      list.items.push(line.replace(bullet ? BULLET : NUMBERED, ""));
      continue;
    }

    flushList();

    if (line.startsWith("#")) {
      flushParagraph();
      blocks.push(
        <h2 key={`h${key++}`} className="font-display text-2xl text-text">
          {inline(line.replace(/^#+\s*/, ""), `h${key}`)}
        </h2>,
      );
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return <div className="space-y-5">{blocks}</div>;
}
