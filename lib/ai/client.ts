import "server-only";
import OpenAI from "openai";
import type { z } from "zod";

/**
 * Every AI call in Nyaama goes through here, and every one of them has a
 * deterministic fallback at the call site. The contract:
 *
 *   1. hard timeout, so nothing can hang the UI
 *   2. structured JSON output, validated with zod
 *   3. one retry, then give up and let the caller fall back
 *
 * A schema violation is treated exactly like an outage — a malformed answer
 * is worse than no answer, because it reaches the learner looking real.
 */

export const MODELS = {
  /** Cheap and fast. Interview lead-ins and project review. */
  fast: "gpt-4o-mini",
  /** The answers that must feel intelligent: recommendation, translation. */
  strong: "gpt-4o",
} as const;

let cached: OpenAI | null = null;

function client(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;
  cached ??= new OpenAI({ apiKey, maxRetries: 0 });
  return cached;
}

export function aiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`ai timeout after ${ms}ms`)), ms),
  );
}

type StructuredArgs<T> = {
  model?: string;
  system: string;
  user: string;
  schema: z.ZodType<T>;
  /** JSON Schema handed to OpenAI for strict structured output. */
  jsonSchema: Record<string, unknown>;
  schemaName: string;
  timeoutMs?: number;
  temperature?: number;
};

/**
 * Returns null rather than throwing. Callers must supply a fallback, and a
 * null return is the signal to use it.
 */
export async function structured<T>({
  model = MODELS.fast,
  system,
  user,
  schema,
  jsonSchema,
  schemaName,
  timeoutMs = 12_000,
  temperature = 0.6,
}: StructuredArgs<T>): Promise<T | null> {
  const openai = client();
  if (!openai) return null;

  const attempt = async (): Promise<T> => {
    const completion = await openai.chat.completions.create({
      model,
      temperature,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: schemaName, strict: true, schema: jsonSchema },
      },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("empty completion");
    return schema.parse(JSON.parse(raw));
  };

  for (let tries = 0; tries < 2; tries++) {
    try {
      return await Promise.race([attempt(), timeout(timeoutMs)]);
    } catch (error) {
      const last = tries === 1;
      console.error(
        `[ai] ${schemaName} ${last ? "failed, falling back" : "retrying"}:`,
        error instanceof Error ? error.message : error,
      );
      if (last) return null;
    }
  }

  return null;
}

/** Plain text, same guarantees. Used where JSON adds nothing. */
export async function text({
  model = MODELS.fast,
  system,
  user,
  timeoutMs = 8_000,
  temperature = 0.7,
  maxTokens = 400,
}: {
  model?: string;
  system: string;
  user: string;
  timeoutMs?: number;
  temperature?: number;
  maxTokens?: number;
}): Promise<string | null> {
  const openai = client();
  if (!openai) return null;

  try {
    const completion = await Promise.race([
      openai.chat.completions.create({
        model,
        temperature,
        max_tokens: maxTokens,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
      timeout(timeoutMs),
    ]);

    return completion.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error(
      "[ai] text call failed, falling back:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}
