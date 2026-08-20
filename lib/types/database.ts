/** Hand-written to match supabase/migrations/0001_init.sql. */

export type PathId =
  | "software_engineering"
  | "artificial_intelligence"
  | "data_analytics"
  | "cybersecurity"
  | "graphic_design";

export type Lang = "en" | "wo" | "mnk" | "ff";

export type RoadmapStage = {
  n: number;
  title: string;
  summary: string;
  skills: string[];
  effort: string;
  moduleIds: string[];
};

export type CareerPath = {
  id: PathId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  stages: RoadmapStage[];
  skills: string[];
  sort: number;
};

export type LearningModule = {
  id: string;
  path_id: PathId;
  stage: number;
  title: string;
  summary: string;
  body: string;
  simple_body: string;
  practice: string;
  skills: string[];
  minutes: number;
  sort: number;
};

export type ProjectRequirement = { id: string; label: string };

export type Project = {
  id: string;
  path_id: PathId;
  title: string;
  brief: string;
  requirements: ProjectRequirement[];
  practices: string[];
  difficulty: "starter" | "core" | "real-world";
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  education: string | null;
  current_path: PathId | null;
  onboarded: boolean;
  created_at: string;
};

export type CareerAssessment = {
  id: string;
  user_id: string;
  answers: Record<string, unknown>;
  scores: Record<string, number>;
  recommendation: PathId | null;
  confidence: number | null;
  reasons: string[];
  alternatives: PathId[];
  source: "ai" | "fallback" | null;
  completed: boolean;
  created_at: string;
};

export type Progress = {
  id: string;
  user_id: string;
  path_id: PathId;
  current_stage: number;
  percentage: number;
  updated_at: string;
};

export type ModuleProgress = {
  id: string;
  user_id: string;
  module_id: string;
  status: "not_started" | "in_progress" | "completed";
  percentage: number;
  updated_at: string;
};

export type ProjectFeedback = {
  didWell: string[];
  improve: string[];
  skillsDemonstrated: string[];
};

export type ProjectSubmission = {
  id: string;
  user_id: string;
  project_id: string;
  status: "not_started" | "in_progress" | "submitted" | "reviewed";
  url: string | null;
  notes: string | null;
  checklist: Record<string, boolean>;
  feedback: ProjectFeedback | null;
  feedback_source: "ai" | "fallback" | null;
  created_at: string;
  updated_at: string;
};

export type ActivityLog = {
  id: string;
  user_id: string;
  day: string;
  events: number;
};
