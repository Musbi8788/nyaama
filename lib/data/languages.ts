/**
 * The language bar. Codes match the CHECK constraint on explanation_cache
 * (mode in simple|translate, lang in en|wo|mnk|ff), so adding one here means
 * a migration too — the database is the authority on what may be cached.
 */

export type Lang = "en" | "wo" | "mnk" | "ff";
export type Mode = "simple" | "translate";

export type LanguageOption = {
  /** Stable id used by the client and the API. */
  id: "simple" | Exclude<Lang, "en">;
  label: string;
  mode: Mode;
  lang: Lang;
  /** The name the model should write in. */
  language?: string;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: "simple", label: "Explain simply", mode: "simple", lang: "en" },
  { id: "wo", label: "Explain in Wolof", mode: "translate", lang: "wo", language: "Wolof" },
  {
    id: "mnk",
    label: "Explain in Mandinka",
    mode: "translate",
    lang: "mnk",
    language: "Mandinka",
  },
  { id: "ff", label: "Explain in Fula", mode: "translate", lang: "ff", language: "Fula" },
];

export function findOption(id: string): LanguageOption | undefined {
  return LANGUAGE_OPTIONS.find((o) => o.id === id);
}
