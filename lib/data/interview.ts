import type { PathId } from "@/lib/types/database";

/**
 * The interview is a fixed six-slot state machine, not a chatbot.
 *
 * Every option carries weights toward the five career paths. That is what
 * makes the interview unbreakable: if the AI is slow, rate-limited or wrong,
 * the weights alone still produce a real recommendation with real reasons.
 * The AI's only job here is to write a warm lead-in line for the next
 * question based on what the learner just said.
 *
 * `reason` is written in the learner's voice ("You enjoy…") because it gets
 * quoted straight back to them on the result screen.
 */

export type Weights = Partial<Record<PathId, number>>;

export type Option = {
  id: string;
  label: string;
  weights: Weights;
  reason?: string;
};

export type Slot = {
  id: string;
  /** Static lead-in. Used verbatim whenever the AI call fails. */
  coachLine: string;
  question: string;
  type: "single" | "multi";
  options: Option[];
  freeText?: string;
};

export const SLOTS: Slot[] = [
  {
    id: "background",
    coachLine: "Let's start with where you are right now.",
    question: "What are you studying, or what did you study?",
    type: "single",
    freeText: "Something else — tell us briefly",
    options: [
      {
        id: "science_maths",
        label: "Science or Maths",
        weights: { artificial_intelligence: 3, data_analytics: 3, software_engineering: 2, cybersecurity: 2 },
        reason: "You come from a science and maths background",
      },
      {
        id: "ict",
        label: "ICT or Computing",
        weights: { software_engineering: 3, cybersecurity: 3, artificial_intelligence: 2, data_analytics: 2 },
        reason: "You've already studied computing",
      },
      {
        id: "business",
        label: "Business or Economics",
        weights: { data_analytics: 3, graphic_design: 2, software_engineering: 1 },
        reason: "You have a business and economics background",
      },
      {
        id: "arts",
        label: "Arts or Humanities",
        weights: { graphic_design: 3, software_engineering: 1, data_analytics: 1 },
        reason: "You come from an arts background",
      },
      {
        id: "not_studying",
        label: "I'm not in school right now",
        weights: { software_engineering: 1, graphic_design: 2 },
        reason: "You're building your path outside formal education",
      },
    ],
  },
  {
    id: "interests",
    coachLine: "Good. Now the part that matters most — what actually holds your attention.",
    question: "What do you enjoy doing? Choose as many as fit.",
    type: "multi",
    options: [
      {
        id: "making",
        label: "Making things people can use",
        weights: { software_engineering: 4, graphic_design: 2, artificial_intelligence: 1 },
        reason: "You enjoy building things people can actually use",
      },
      {
        id: "puzzles",
        label: "Solving puzzles and problems",
        weights: { software_engineering: 3, cybersecurity: 3, artificial_intelligence: 2, data_analytics: 2 },
        reason: "You enjoy solving problems",
      },
      {
        id: "patterns",
        label: "Finding patterns in information",
        weights: { data_analytics: 4, artificial_intelligence: 3 },
        reason: "You're drawn to finding patterns in information",
      },
      {
        id: "visual",
        label: "Making things look good",
        weights: { graphic_design: 4, software_engineering: 1 },
        reason: "You care about how things look",
      },
      {
        id: "protecting",
        label: "Understanding how things can be broken",
        weights: { cybersecurity: 4 },
        reason: "You're curious about how systems can be broken and defended",
      },
      {
        id: "explaining",
        label: "Explaining things to other people",
        weights: { data_analytics: 2, graphic_design: 1, software_engineering: 1 },
        reason: "You're good at explaining things to others",
      },
    ],
  },
  {
    id: "workstyle",
    coachLine: "That tells me a lot.",
    question: "If you had to pick one, which sounds most like you?",
    type: "single",
    options: [
      {
        id: "builder",
        label: "I want to build things",
        weights: { software_engineering: 5, artificial_intelligence: 2 },
        reason: "You want to build",
      },
      {
        id: "analyst",
        label: "I want to understand things",
        weights: { data_analytics: 5, artificial_intelligence: 3 },
        reason: "You want to understand how things really work",
      },
      {
        id: "designer",
        label: "I want to design things",
        weights: { graphic_design: 5 },
        reason: "You want to design",
      },
      {
        id: "protector",
        label: "I want to protect things",
        weights: { cybersecurity: 5 },
        reason: "You want to protect the systems people rely on",
      },
      {
        id: "automator",
        label: "I want to make machines do the work",
        weights: { artificial_intelligence: 5, software_engineering: 2 },
        reason: "You want to make machines do the hard work",
      },
    ],
  },
  {
    id: "experience",
    coachLine: "Now let's see what you've already touched.",
    question: "Have you tried any of these before? Be honest — starting from zero is completely fine.",
    type: "multi",
    options: [
      {
        id: "code",
        label: "Written some code",
        weights: { software_engineering: 3, artificial_intelligence: 2, cybersecurity: 1 },
        reason: "You've already tried programming",
      },
      {
        id: "website",
        label: "Built a website",
        weights: { software_engineering: 4 },
        reason: "You've built a website before",
      },
      {
        id: "design_tools",
        label: "Used design tools like Canva or Photoshop",
        weights: { graphic_design: 4 },
        reason: "You've used design tools",
      },
      {
        id: "spreadsheets",
        label: "Worked with spreadsheets or data",
        weights: { data_analytics: 4, artificial_intelligence: 1 },
        reason: "You've worked with data before",
      },
      {
        id: "networks",
        label: "Set up networks, or taken a computer apart",
        weights: { cybersecurity: 4 },
        reason: "You've worked hands-on with computers and networks",
      },
      {
        id: "nothing",
        label: "None of these yet",
        weights: {},
        reason: "You're starting fresh, which is exactly what this is built for",
      },
    ],
  },
  {
    id: "goal",
    coachLine: "Almost done. Let's talk about where this is going.",
    question: "What would you like to be able to do a year from now?",
    type: "single",
    freeText: "Something else — describe it in your own words",
    options: [
      {
        id: "build_product",
        label: "Build a website or app that people use",
        weights: { software_engineering: 5 },
        reason: "You want to build something real within a year",
      },
      {
        id: "get_job",
        label: "Get a job in technology",
        weights: { software_engineering: 3, data_analytics: 2, cybersecurity: 2 },
        reason: "You're aiming for a job in technology",
      },
      {
        id: "earn_freelance",
        label: "Earn money from my own skills",
        weights: { graphic_design: 4, software_engineering: 2 },
        reason: "You want your skills to earn for you",
      },
      {
        id: "understand_ai",
        label: "Build something with AI",
        weights: { artificial_intelligence: 5 },
        reason: "You want to build with AI",
      },
      {
        id: "protect_systems",
        label: "Protect systems from attacks",
        weights: { cybersecurity: 5 },
        reason: "You want to work in security",
      },
      {
        id: "make_sense_data",
        label: "Make sense of data for organisations",
        weights: { data_analytics: 5 },
        reason: "You want to turn data into decisions",
      },
    ],
  },
  {
    id: "direction",
    coachLine: "Last one.",
    question: "How would you most like to work?",
    type: "single",
    options: [
      {
        id: "company",
        label: "For a company",
        weights: { software_engineering: 2, data_analytics: 2, cybersecurity: 2 },
        reason: "You'd like to work within an organisation",
      },
      {
        id: "freelance",
        label: "Freelance, for different clients",
        weights: { graphic_design: 3, software_engineering: 2 },
        reason: "You'd like the independence of freelancing",
      },
      {
        id: "own_business",
        label: "Build my own business",
        weights: { software_engineering: 3, graphic_design: 2, artificial_intelligence: 1 },
        reason: "You want to build something of your own",
      },
      {
        id: "unsure",
        label: "I'm not sure yet",
        weights: {},
        reason: "You're keeping your options open, which is sensible this early",
      },
    ],
  },
];

export type Answers = Record<string, { options: string[]; text?: string }>;

export function slotById(id: string): Slot | undefined {
  return SLOTS.find((s) => s.id === id);
}

export function optionById(slotId: string, optionId: string): Option | undefined {
  return slotById(slotId)?.options.find((o) => o.id === optionId);
}
