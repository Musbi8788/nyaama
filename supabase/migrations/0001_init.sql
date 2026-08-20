-- ============================================================
-- Nyaama — initial schema
-- See docs/02-DATA-MODEL.md
--
-- Content tables (career_paths, learning_modules, projects) use stable
-- text slugs as ids so application code can reference them literally.
-- Every user-owned table has RLS enabled from the start.
-- ============================================================

-- ------------------------------------------------------------
-- CONTENT (seeded, read-only to users)
-- ------------------------------------------------------------

create table if not exists public.career_paths (
  id          text primary key,
  name        text not null,
  tagline     text not null,
  description text not null,
  icon        text not null default 'compass',
  stages      jsonb not null default '[]'::jsonb,
  skills      text[] not null default '{}',
  sort        int not null default 0
);

create table if not exists public.learning_modules (
  id          text primary key,
  path_id     text not null references public.career_paths(id) on delete cascade,
  stage       int not null default 1,
  title       text not null,
  summary     text not null,
  body        text not null,
  -- Pre-authored plain-language version. This is the fallback for
  -- "Explain simply" when the AI call fails, so it is not optional.
  simple_body text not null,
  practice    text not null,
  skills      text[] not null default '{}',
  minutes     int not null default 10,
  sort        int not null default 0
);

create index if not exists learning_modules_path_idx
  on public.learning_modules (path_id, stage, sort);

create table if not exists public.projects (
  id           text primary key,
  path_id      text not null references public.career_paths(id) on delete cascade,
  title        text not null,
  brief        text not null,
  requirements jsonb not null default '[]'::jsonb,
  practices    text[] not null default '{}',
  difficulty   text not null default 'starter'
    check (difficulty in ('starter', 'core', 'real-world'))
);

create index if not exists projects_path_idx on public.projects (path_id);

-- ------------------------------------------------------------
-- USER DATA
-- ------------------------------------------------------------

create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  name         text not null default '',
  email        text not null default '',
  education    text,
  current_path text references public.career_paths(id) on delete set null,
  onboarded    boolean not null default false,
  created_at   timestamptz not null default now()
);

create table if not exists public.career_assessments (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  answers        jsonb not null default '{}'::jsonb,
  scores         jsonb not null default '{}'::jsonb,
  recommendation text references public.career_paths(id) on delete set null,
  confidence     numeric(3,2),
  reasons        text[] not null default '{}',
  alternatives   text[] not null default '{}',
  -- 'ai' or 'fallback'. Kept so we can tell, in testing, which path ran.
  source         text check (source in ('ai', 'fallback')),
  completed      boolean not null default false,
  created_at     timestamptz not null default now()
);

create index if not exists career_assessments_user_idx
  on public.career_assessments (user_id, created_at desc);

create table if not exists public.progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  path_id       text not null references public.career_paths(id) on delete cascade,
  current_stage int not null default 1,
  percentage    int not null default 0 check (percentage between 0 and 100),
  updated_at    timestamptz not null default now(),
  unique (user_id, path_id)
);

create table if not exists public.module_progress (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  module_id  text not null references public.learning_modules(id) on delete cascade,
  status     text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed')),
  percentage int not null default 0 check (percentage between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id, module_id)
);

create table if not exists public.project_submissions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  project_id      text not null references public.projects(id) on delete cascade,
  status          text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'submitted', 'reviewed')),
  url             text,
  notes           text,
  checklist       jsonb not null default '{}'::jsonb,
  feedback        jsonb,
  feedback_source text check (feedback_source in ('ai', 'fallback')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, project_id)
);

-- Not user-scoped on purpose: one learner's Wolof explanation of
-- "What is an API?" is the right answer for everyone. Doubles as the
-- offline fallback once pre-warmed.
create table if not exists public.explanation_cache (
  id         uuid primary key default gen_random_uuid(),
  module_id  text not null references public.learning_modules(id) on delete cascade,
  mode       text not null check (mode in ('simple', 'translate')),
  lang       text not null check (lang in ('en', 'wo', 'mnk', 'ff')),
  content    text not null,
  created_at timestamptz not null default now(),
  unique (module_id, mode, lang)
);

create table if not exists public.activity_log (
  id      uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day     date not null default (now() at time zone 'utc')::date,
  events  int not null default 1,
  unique (user_id, day)
);

create index if not exists activity_log_user_day_idx
  on public.activity_log (user_id, day desc);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------

alter table public.career_paths       enable row level security;
alter table public.learning_modules   enable row level security;
alter table public.projects           enable row level security;
alter table public.profiles           enable row level security;
alter table public.career_assessments enable row level security;
alter table public.progress           enable row level security;
alter table public.module_progress    enable row level security;
alter table public.project_submissions enable row level security;
alter table public.explanation_cache  enable row level security;
alter table public.activity_log       enable row level security;

-- Content: readable by anyone (the landing page lists paths while logged out).
-- No insert/update/delete policy exists, so nobody can write via the API.
drop policy if exists "career_paths readable" on public.career_paths;
create policy "career_paths readable" on public.career_paths
  for select to anon, authenticated using (true);

drop policy if exists "learning_modules readable" on public.learning_modules;
create policy "learning_modules readable" on public.learning_modules
  for select to authenticated using (true);

drop policy if exists "projects readable" on public.projects;
create policy "projects readable" on public.projects
  for select to anon, authenticated using (true);

-- Profiles: own row only.
drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- User-owned tables: identical own-row-only policy shape.
do $$
declare t text;
begin
  foreach t in array array[
    'career_assessments', 'progress', 'module_progress',
    'project_submissions', 'activity_log'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || ' select own', t);
    execute format(
      'create policy %I on public.%I for select to authenticated
         using ((select auth.uid()) = user_id)', t || ' select own', t);

    execute format('drop policy if exists %I on public.%I', t || ' insert own', t);
    execute format(
      'create policy %I on public.%I for insert to authenticated
         with check ((select auth.uid()) = user_id)', t || ' insert own', t);

    execute format('drop policy if exists %I on public.%I', t || ' update own', t);
    execute format(
      'create policy %I on public.%I for update to authenticated
         using ((select auth.uid()) = user_id)
         with check ((select auth.uid()) = user_id)', t || ' update own', t);

    execute format('drop policy if exists %I on public.%I', t || ' delete own', t);
    execute format(
      'create policy %I on public.%I for delete to authenticated
         using ((select auth.uid()) = user_id)', t || ' delete own', t);
  end loop;
end $$;

-- Explanation cache: any signed-in learner may read it, and may add to it
-- (the server route writes what the AI produced). Nobody may edit or delete
-- what is already there, so one user cannot poison another's translation.
drop policy if exists "explanation_cache readable" on public.explanation_cache;
create policy "explanation_cache readable" on public.explanation_cache
  for select to authenticated using (true);

drop policy if exists "explanation_cache insertable" on public.explanation_cache;
create policy "explanation_cache insertable" on public.explanation_cache
  for insert to authenticated with check (true);

-- ------------------------------------------------------------
-- GRANTS
-- ------------------------------------------------------------

grant usage on schema public to anon, authenticated;

grant select on public.career_paths to anon, authenticated;
grant select on public.projects to anon, authenticated;
grant select on public.learning_modules to authenticated;

grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.career_assessments to authenticated;
grant select, insert, update, delete on public.progress to authenticated;
grant select, insert, update, delete on public.module_progress to authenticated;
grant select, insert, update, delete on public.project_submissions to authenticated;
grant select, insert, update, delete on public.activity_log to authenticated;
grant select, insert on public.explanation_cache to authenticated;

-- ------------------------------------------------------------
-- SIGNUP TRIGGER
-- The profile row is created by the database, not by client code, so a
-- user can never exist without one.
-- ------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
