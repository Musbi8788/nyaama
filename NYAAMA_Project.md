# NYAAMA

## Find Your Way

### Hack4Gambia 2026

### Product, UX, Design System & Engineering Specification

---

# 1. PRODUCT OVERVIEW

## Product Name

**Nyaama**

### Tagline

**Find Your Way**

Nyaama is an AI-powered career discovery and skills development platform designed for students and graduates in The Gambia.

The platform helps young people who are uncertain about their future in technology discover a suitable career direction, understand what they need to learn, follow a focused roadmap, and begin proving their skills through real projects.

The core philosophy is:

> **Don't learn everything. Find your path, go deep, and build something real.**

---

# 2. THE PROBLEM

Many young Gambians are interested in technology but do not know where to begin.

A student may be interested in:

* Software Engineering
* Artificial Intelligence
* Cybersecurity
* Data Analytics
* Graphic Design
* Networking
* Product Design

The problem is not that there are too few opportunities.

The problem is that there are **too many directions and too little guidance**.

A learner may jump between different technologies, watch random tutorials, start several courses, and eventually finish none of them.

Graduates can also leave school without the practical skills employers expect.

Students who are still in school may not know what careers exist.

Young people who have left formal education may have no clear pathway at all.

Nyaama exists to help solve that gap.

---

# 3. THE CORE PROMISE

Nyaama takes a learner from:

> **"I don't know what to do."**

to:

> **"I know what path I'm pursuing, what I need to learn, and what I'm building next."**

The product journey is:

## Discover → Choose → Learn → Build → Prove

The future journey will become:

## Discover → Choose → Learn → Build → Prove → Earn → Grow

---

# 4. HACKATHON MVP

This is a Hack4Gambia project.

The MVP must remain intentionally small.

We are NOT attempting to build the complete future platform during the hackathon.

The hackathon version should prove one core hypothesis:

> **If a young person is given an AI-guided career discovery experience, a clear technology career recommendation, a roadmap, and a practical project, can we move them from uncertainty to action?**

---

# 5. PRIMARY TARGET USERS

The first users are:

## Students

Young people currently studying who:

* Are interested in technology
* Do not know which career to choose
* Want to understand their options
* Need guidance on where to start

## Graduates

Young people who:

* Have completed school or university
* Want to enter technology
* Do not know which skills employers need
* Have certificates but limited practical experience
* Need a structured path into a career

The product should feel welcoming to beginners.

Do not assume the user already knows technical terminology.

---

# 6. THE FIRST USER EXPERIENCE

The entire product should feel extremely simple.

A new user should be able to understand what to do without instructions.

## Flow

### Step 1

Landing page.

CTA:

**Find Your Way**

↓

### Step 2

Create account.

Fields:

* Name
* Email
* Password

↓

### Step 3

Welcome screen.

Message:

> **Let's find your path.**

↓

### Step 4

AI Career Coach interview.

The AI asks a small number of meaningful questions.

↓

### Step 5

Career recommendation.

Example:

# Software Engineering

The system explains why.

↓

### Step 6

Show roadmap.

Example:

**Software Engineering**

1. Foundations
2. Web Fundamentals
3. Programming
4. Build Applications
5. Real-World Projects

↓

### Step 7

Start learning.

The learner can ask the AI to explain concepts more simply or in a supported local language.

↓

### Step 8

Practical project.

The learner receives a real-world project challenge.

↓

### Step 9

Project submission / progress.

The learner begins creating evidence of their skills.

---

# 7. LANDING PAGE

The landing page should immediately communicate the problem and solution.

## Hero

Large headline:

> **Find Your Way.**

Supporting copy:

> You don't need to learn everything. Discover the technology path that fits you, follow a clear roadmap, and start building real skills.

Primary CTA:

**Discover Your Path**

Secondary CTA:

**How It Works**

---

## Hero visual

Use a clean product preview rather than excessive marketing graphics.

Show:

* AI career interview
* Career recommendation
* Roadmap
* Progress

The product itself should be the visual proof.

---

# 8. LANDING PAGE SECTIONS

## Section 1 — Hero

Headline:

**Find Your Way**

Supporting explanation.

CTA.

Product preview.

---

## Section 2 — The problem

Headline:

> **Too many paths. No clear direction.**

Explain that students often see many technology careers but do not know which one to choose or where to begin.

---

## Section 3 — How Nyaama works

Three or four simple steps:

### 01 — Discover

Meet your AI career coach.

### 02 — Choose

Find the path that fits you.

### 03 — Learn

Follow a focused roadmap.

### 04 — Build

Turn knowledge into real work.

---

## Section 4 — Career paths

Show the possible paths visually.

Initial paths:

* Software Engineering
* Artificial Intelligence
* Data Analytics
* Cybersecurity
* Graphic Design

Do not build full learning systems for all of these in the MVP.

They are primarily used during career discovery.

---

## Section 5 — Real projects

Explain the philosophy:

> **We don't want you to only learn theory. We want you to build.**

Show example projects.

For example:

**Software Engineering**

Build a website for a local business.

**Data Analytics**

Analyze a real dataset.

**Cybersecurity**

Complete a security challenge.

**AI**

Build a simple AI-powered tool.

**Design**

Create a real business identity or marketing asset.

---

## Section 6 — Local learning

Headline:

> **Learn in a way that makes sense to you.**

The platform should support AI-assisted explanations and, where technically reliable, local-language text/audio.

Example:

**Explain this in Wolof**

**Explain this in Mandinka**

**Explain this in Fula**

**Listen**

Do not overpromise language support in the MVP.

Only expose languages that the implementation can reliably support.

---

## Section 7 — Final CTA

Headline:

> **Your future needs a direction.**

CTA:

**Find Your Way**

---

# 9. AUTHENTICATION

Keep authentication simple.

Use Supabase Auth.

## Sign up

* Name
* Email
* Password

## Login

* Email
* Password

## Future

Potentially add:

* Google
* Apple
* Phone authentication

These are not required for the MVP.

---

# 10. MAIN APPLICATION NAVIGATION

The authenticated application should use a left sidebar on desktop.

The visual reference is the supplied Nyaama dashboard screenshot.

Navigation:

## Your Space

**Home**

**Discover**

**My Roadmap**

**Progress**

The currently selected page should use the warm yellow active-state pill.

---

# 11. SIDEBAR DESIGN

The sidebar should feel like part of the product identity.

Background:

Deep navy.

Logo:

### nyaama

Small tagline:

**FIND YOUR WAY**

Navigation labels should use a clean sans-serif.

Icons should be minimal line icons.

Recommended icon library:

**Lucide React**

Active navigation:

* Yellow background
* Dark navy text
* Rounded pill
* Small arrow on the right

Inactive navigation:

* Muted light text
* No background

---

# 12. STREAK CARD

At the bottom of the sidebar, show a compact progress/streak card.

Example:

### THIS WEEK

# 3 day streak

> Keep showing up. Your future is built in moments like this.

Display seven small day indicators.

Completed days:

Yellow.

Incomplete days:

Muted navy/gray.

This should feel motivational but not childish.

---

# 13. HOME DASHBOARD

The dashboard should answer:

> **What should I do next?**

Do not overload the dashboard.

## Header

Example:

> Good evening, Musa.

> Ready to keep building?

---

## Main recommendation

If the user has not completed discovery:

### Find your path

> Take a short conversation with your AI Career Coach and discover which technology direction may fit you.

CTA:

**Start Discovery**

---

If the user has completed discovery:

### Your path

**Software Engineering**

> You're building toward a career in software engineering.

CTA:

**Continue Roadmap**

---

## Continue learning

Show the current learning item.

Example:

**HTML Fundamentals**

Progress:

65%

CTA:

**Continue**

---

## Current project

Example:

### Build a restaurant landing page

Status:

**In progress**

CTA:

**Open Project**

---

# 14. DISCOVER EXPERIENCE

This is the heart of the hackathon demo.

The page should be called:

# Discover Your Skills

Intro:

> Let's figure out where you could go.

Then introduce the AI:

> **Meet your Career Coach**

> I'll ask you a few questions about what you enjoy, what you've tried, and what you want to achieve.

CTA:

**Start Conversation**

---

# 15. AI CAREER COACH

The AI interview should feel conversational.

Do not create a generic chatbot interface with a giant message history.

Make it feel like a guided interview.

Questions should explore:

### Background

* What are you currently studying or have you studied?
* What subjects do you enjoy?

### Interests

* What kinds of things do you enjoy doing?
* Do you prefer building, analyzing, designing, solving problems, or protecting systems?

### Experience

* Have you tried coding?
* Have you used design tools?
* Have you worked with data?
* Have you built anything before?

### Goals

* What would you like to be able to do in the next year?
* Would you prefer working for a company, freelancing, building a business, or are you not sure yet?

### Constraints

Keep questions short and friendly.

Do not turn this into a long psychological assessment.

Target:

**5–8 meaningful interactions.**

---

# 16. CAREER RECOMMENDATION

After the interview, show a strong result screen.

Example:

# We found your path.

## Software Engineering

> Based on what you told us, software engineering looks like a strong starting point for you.

Then:

### Why

* You enjoy building things.
* You are interested in technology.
* You enjoy solving problems.
* You have shown interest in programming.

Then:

### Other paths you may explore later

* Artificial Intelligence
* Data Analytics

Important:

The product should recommend **one primary direction**.

Do not overwhelm the learner again.

---

# 17. ROADMAP

Page title:

# My Roadmap

Show a visual path.

Example:

## Software Engineering

### Stage 01

**Foundations**

Learn how computers, the web, and software work.

### Stage 02

**Web Fundamentals**

HTML
CSS
JavaScript

### Stage 03

**Programming**

Variables
Functions
Logic
Data structures

### Stage 04

**Build**

Create real applications.

### Stage 05

**Real-World Work**

Build projects for real users and businesses.

Each stage should show:

* Status
* Progress
* Estimated effort
* Skills
* CTA

---

# 18. LEARNING EXPERIENCE

The learning page should not look like a traditional school LMS.

Keep it focused.

Example:

# What is an API?

Simple explanation.

Then:

### Try it yourself

Small practical exercise.

Then:

### Need help?

**Explain simply**

**Explain in Wolof**

**Explain in Mandinka**

**Explain in Fula**

**Listen**

Only expose language options that are implemented.

---

# 19. BUILD EXPERIENCE

This is a major product differentiator.

After learning a concept, the user should eventually be asked to build something.

Example:

# Your first project

## Build a website for a Gambian restaurant.

### What you need

* Business name
* Description
* Menu/services
* Contact information
* Location
* WhatsApp contact

### What you'll practice

* HTML
* CSS
* Layout
* Responsive design
* User experience

CTA:

**Start Building**

---

# 20. REAL-WORLD PROJECT PHILOSOPHY

Projects should eventually move beyond fictional exercises.

Future projects should involve:

* Local businesses
* NGOs
* Schools
* Clinics
* Community organizations
* Small entrepreneurs

The learner should eventually be able to say:

> **I built this for a real organization.**

That becomes evidence of practical capability.

---

# 21. PROGRESS PAGE

Page title:

# Your Progress

Show:

## Career

Software Engineering

## Overall progress

Example:

**18%**

Then:

### Skills

HTML
██████████ 90%

CSS
███████ 70%

JavaScript
███ 30%

---

## Projects

### Restaurant Website

**Completed**

### Business Landing Page

**In Progress**

---

## Real-world proof

Future feature:

Businesses/projects the learner has worked with.

---

# 22. AI PROJECT COACH

Future-facing MVP feature.

The AI can review a learner's project and provide:

### What you did well

* Clear structure
* Good navigation
* Responsive layout

### Improve this

* Improve spacing
* Improve accessibility
* Add clearer CTA

### Skills demonstrated

HTML
CSS
Responsive design

The goal is constructive coaching, not simply a score.

---

# 23. FUTURE EARN LAYER

Do not build this in the hackathon.

Eventually, Nyaama should help the learner answer:

> **How can I use this skill to create economic opportunity?**

For example:

Software Engineering:

* Build websites
* Build business tools
* Freelance development
* Internships
* Jobs

Design:

* Branding
* Social media graphics
* UI design
* Freelance work

Data:

* Reporting
* Dashboards
* Data cleaning
* Analytics

This eventually becomes:

# Learn → Build → Prove → Earn

---

# 24. FUTURE MENTORSHIP

Eventually introduce human mentors.

Learners could:

* Request mentorship
* Receive feedback
* Join learning groups
* Attend workshops
* Ask professionals questions

The AI should remain the first-line coach.

Human mentorship becomes an additional layer.

---

# 25. FUTURE JOB & OPPORTUNITY MATCHING

Eventually Nyaama can connect demonstrated skills to:

* Jobs
* Internships
* Freelance opportunities
* Apprenticeships
* Local projects
* Entrepreneurship opportunities

The important difference is that recommendations should be based on:

**Demonstrated skills**

not only:

**Certificates.**

---

# 26. FUTURE LOCAL-LANGUAGE LEARNING

Long-term ambition:

Make technology education accessible in languages Gambian learners understand.

Potential capabilities:

* Text translation
* Simplified explanations
* Audio lessons
* Voice interaction
* Local examples
* Local terminology

This should be implemented carefully.

Accuracy matters more than supporting many languages badly.

---

# 27. FUTURE PLATFORM JOURNEY

The long-term Nyaama journey is:

## 01 — DISCOVER

Understand yourself.

↓

## 02 — CHOOSE

Pick a direction.

↓

## 03 — LEARN

Follow the roadmap.

↓

## 04 — BUILD

Create real things.

↓

## 05 — PROVE

Demonstrate your ability.

↓

## 06 — EARN

Turn skills into opportunity.

↓

## 07 — GROW

Keep developing as the market changes.

---

# 28. TECHNOLOGY STACK

## Frontend + Backend

**Next.js**

Use Next.js as the full-stack application.

Do not create a separate FastAPI backend for the hackathon.

---

## Language

**TypeScript**

Use TypeScript throughout the application.

---

## Styling

**Tailwind CSS**

---

## Components

**shadcn/ui**

Use components where they accelerate development.

Customize them heavily enough that the application feels like Nyaama rather than a default shadcn project.

---

## Icons

**Lucide React**

Use clean outline icons.

---

## Database

**Supabase PostgreSQL**

---

## Authentication

**Supabase Auth**

---

## Storage

**Supabase Storage**

Use for future:

* CVs
* Project files
* Profile images
* Portfolio assets

---

## AI

**OpenAI API**

Use AI for:

* Career interview
* Career recommendation
* Roadmap personalization
* Learning explanations
* Local-language explanations
* Project feedback
* AI career coaching

---

## Deployment

**Vercel**

---

## Source Control

**GitHub**

---

# 29. AI ARCHITECTURE

Do not expose the OpenAI API key to the browser.

Use:

Browser

↓

Next.js Server Action / Route Handler

↓

OpenAI API

↓

Structured response

↓

Supabase

↓

UI

AI operations must run server-side.

---

# 30. AI RESPONSE FORMAT

AI should return structured data whenever possible.

Example:

```json
{
  "recommendedCareer": "software_engineering",
  "confidence": 0.84,
  "reasons": [
    "Enjoys building things",
    "Interested in technology",
    "Enjoys problem solving"
  ],
  "alternativePaths": [
    "artificial_intelligence",
    "data_analytics"
  ]
}
```

Never depend on parsing arbitrary AI-generated paragraphs when structured output can be used.

---

# 31. CAREER PATH DATA

Career paths should initially be predefined.

Initial paths:

* Software Engineering
* Artificial Intelligence
* Data Analytics
* Cybersecurity
* Graphic Design

The AI recommends among these.

Do not dynamically invent completely new careers in the MVP.

This keeps the system predictable and demo-safe.

---

# 32. MVP DATABASE

Keep the database simple.

Suggested tables:

## profiles

* id
* name
* email
* education
* interests
* goals
* created_at

## career_assessments

* id
* user_id
* answers
* recommendation
* reasoning
* created_at

## career_paths

* id
* name
* description
* roadmap
* skills

## progress

* id
* user_id
* career_path_id
* current_stage
* percentage
* updated_at

## projects

* id
* career_path_id
* title
* description
* requirements

## project_submissions

* id
* user_id
* project_id
* submission
* feedback
* status

Keep the schema minimal.

---

# 33. VISUAL DESIGN DIRECTION

The supplied screenshot is the primary visual reference.

The design should feel:

* Premium
* Calm
* Intelligent
* Youthful
* Focused
* Editorial
* Modern
* African without relying on stereotypical visual motifs

Avoid:

* Generic startup gradients
* Excessive glassmorphism
* Neon colors
* Excessive animations
* Cartoon illustrations
* Generic AI robot graphics
* Overly corporate dashboards

---

# 34. COLOR SYSTEM

The screenshot establishes the main color direction.

## Primary Background

### Deep Navy

**#1C2142**

Use for:

* Sidebar
* Main dark backgrounds
* Hero sections
* Major brand surfaces

---

## Primary Accent

### Warm Yellow

**#F6C447**

Use for:

* Primary CTA
* Active navigation
* Highlights
* Progress indicators
* Important actions
* Brand mark

This is the most important accent.

Do not replace it with a generic bright yellow.

---

## Secondary Navy

### Elevated Navy

**#252B4C**

Use for:

* Cards
* Dashboard panels
* Secondary surfaces
* Streak cards
* Inputs on dark backgrounds

---

## Primary Light Text

### Warm Off-White

**#F4F0E6**

Use for:

* Main headings
* Important text
* Large hero typography

Avoid pure white everywhere.

---

## Secondary Text

### Muted Lavender Gray

**#A7A9B8**

Use for:

* Descriptions
* Metadata
* Secondary navigation
* Supporting information

---

## Borders

Use subtle navy/lavender borders.

Example:

**rgba(255,255,255,0.08)**

Do not use heavy borders.

---

# 35. COLOR TOKENS

Create design tokens rather than hardcoding colors throughout components.

Example:

```css
:root {
  --nyaama-navy: #1C2142;
  --nyaama-yellow: #F6C447;
  --nyaama-surface: #252B4C;
  --nyaama-text: #F4F0E6;
  --nyaama-muted: #A7A9B8;
}
```

Use semantic tokens wherever possible.

---

# 36. TYPOGRAPHY

The screenshot uses an editorial serif for major branding/headlines and a clean sans-serif for interface elements.

Use:

## Display / Brand

A refined serif such as:

**DM Serif Display**
or
**Playfair Display**

The logo wordmark should feel editorial and distinctive.

---

## Interface

Use:

**Inter**

or another highly readable modern sans-serif.

Use the sans-serif for:

* Navigation
* Buttons
* Body text
* Forms
* Labels
* Dashboard information

---

# 37. TYPOGRAPHIC HIERARCHY

Large headings should feel confident.

Example:

# Find Your Way.

Use generous line-height.

Do not make every element bold.

The product should feel spacious.

---

# 38. BRAND WORDMARK

The screenshot shows:

# nyaama

with:

**FIND YOUR WAY**

The wordmark should be lowercase.

Use serif typography.

The brand should feel human and thoughtful rather than corporate.

---

# 39. LOGO MARK

The visual reference uses a yellow rounded-square mark with a simple circular symbol.

Preserve this design language.

Use:

* Rounded square
* Warm yellow
* Deep navy symbol

Do not introduce a complicated logo.

The logo should work:

* In sidebar
* On landing page
* As favicon
* On mobile
* Inside authentication pages

---

# 40. COMPONENT STYLE

Use generous rounded corners.

Cards:

* Rounded
* Dark navy/surface
* Subtle border
* Minimal shadow

Buttons:

Primary:

**Yellow background + navy text**

Secondary:

**Transparent/dark surface + light text**

Avoid excessive pill-shaped UI.

Use pills primarily for:

* Status
* Tags
* Filters
* Navigation states

---

# 41. ANIMATION

Keep animation subtle.

Use:

* Fade
* Slide
* Progress animation
* Hover states
* Page transitions

Avoid:

* Excessive bouncing
* Large parallax effects
* Distracting animations

The product should feel calm.

---

# 42. RESPONSIVE DESIGN

The application must work well on:

* Desktop
* Tablet
* Mobile

The product is expected to be accessible to users who may primarily use phones.

On mobile:

* Sidebar becomes bottom navigation or collapsible navigation.
* Cards become single-column.
* Roadmap becomes vertical.
* AI interview remains easy to use.
* Buttons must be thumb-friendly.

---

# 43. ACCESSIBILITY

Use:

* Semantic HTML
* Keyboard navigation
* Proper labels
* Sufficient contrast
* Visible focus states
* Accessible buttons
* Alt text
* Screen-reader-friendly navigation

The platform is specifically designed for young learners, so accessibility should not be treated as an afterthought.

---

# 44. ERROR STATES

Every important interaction needs a useful error state.

Examples:

AI unavailable:

> **Your coach is taking a moment.**

> Try again in a few seconds.

Network error:

> **We couldn't load this right now.**

Form validation:

Explain exactly what needs to be fixed.

Never show raw technical errors to learners.

---

# 45. EMPTY STATES

Examples:

No roadmap yet:

> **Your path starts here.**

> Complete your discovery interview to build your roadmap.

No projects:

> **Your first project is waiting.**

No progress:

> **Start building to see your progress.**

---

# 46. PROJECT DEVELOPMENT ORDER

Build in this order.

## Phase 1 — Foundation

* Initialize Next.js
* TypeScript
* Tailwind
* shadcn/ui
* Supabase
* Auth
* Global design tokens
* Layout
* Navigation

↓

## Phase 2 — Landing Page

* Hero
* Problem
* How it works
* Career paths
* Projects
* Local-language section
* CTA

↓

## Phase 3 — Authentication

* Sign up
* Login
* Session handling
* Protected routes

↓

## Phase 4 — Dashboard

* Home
* Sidebar
* Streak
* Current path
* Progress
* Continue learning

↓

## Phase 5 — Discovery

* AI interview
* Questions
* Loading states
* Career recommendation
* Recommendation result

↓

## Phase 6 — Roadmap

* Career path
* Stages
* Skills
* Progress

↓

## Phase 7 — Learning

* Learning module
* AI explanation
* Language assistance
* Audio if feasible

↓

## Phase 8 — Project

* Project brief
* Requirements
* Submission
* Feedback

↓

## Phase 9 — Progress

* Skills
* Projects
* Progress
* Evidence

↓

## Phase 10 — Polish

* Responsive design
* Animations
* Empty states
* Error states
* Loading states
* Accessibility
* Demo data
* Final testing

---

# 47. HACKATHON DEMO FLOW

The final demo should take approximately 3–5 minutes.

## Demo

### 1

Open Nyaama.

> **Find Your Way.**

### 2

Register.

### 3

Enter:

> **Discover Your Skills**

### 4

Start AI interview.

Answer a few questions.

### 5

AI produces:

> **Your path: Software Engineering**

### 6

Show reasoning.

### 7

Open roadmap.

### 8

Open first learning module.

### 9

Ask:

> Explain this in a local language.

### 10

Start project.

### 11

Show project progress.

### 12

Show:

> **Skills demonstrated**

Finish with:

> **Nyaama doesn't just tell you what to learn. It helps you find your path and start building it.**

---

# 48. WHAT NOT TO BUILD

During the hackathon, do NOT expand scope into:

* Full job marketplace
* Payments
* Human mentor marketplace
* Social network
* Chat between learners
* Complete LMS
* Hundreds of courses
* Full certification platform
* Complex recommendation engine
* Mobile application
* Native desktop application
* Microservices
* Separate Python backend
* Vector database
* Complex RAG pipeline
* Kubernetes
* Advanced analytics

If a feature does not directly support:

**Discover → Choose → Learn → Build → Prove**

it should probably wait.

---

# 49. ENGINEERING PRINCIPLE

The project should follow:

> **Simple architecture. Excellent experience.**

Use a modular Next.js monolith.

Do not create unnecessary services.

Do not optimize for millions of users.

Optimize for:

* Fast development
* Reliability
* Clean code
* Strong demo
* Easy iteration

---

# 50. DEFINITION OF DONE

The MVP is complete when a new user can:

* Register
* Enter the platform
* Start the AI career interview
* Complete the interview
* Receive a career recommendation
* Understand why that career was recommended
* See a roadmap
* Open a learning module
* Request a simplified/local-language explanation
* Start a practical project
* Submit or record project progress
* See demonstrated skills/progress

And the entire experience feels like **one coherent product**.

---

# 51. FINAL PRODUCT VISION

Nyaama is not simply another career chatbot.

It is the beginning of a system that helps young people move from:

> **Uncertainty**

to:

> **Direction**

to:

> **Skills**

to:

> **Real work**

to:

> **Economic opportunity**

The long-term vision is:

# Discover.

# Choose.

# Learn.

# Build.

# Prove.

# Earn.

# Grow.

---

# 52. FINAL INSTRUCTION TO THE CODING AGENT

Build Nyaama as a polished, production-quality hackathon MVP.

Prioritize the learner experience over technical complexity.

Use the supplied visual reference as the primary design inspiration.

The product must feel:

**calm, premium, intelligent, focused, human, modern, and accessible.**

Use the exact Nyaama visual language:

* Deep navy
* Warm yellow
* Editorial serif branding
* Clean sans-serif interface
* Rounded cards
* Generous whitespace
* Minimal line icons
* Strong typography
* Subtle animation

Do not create a generic AI dashboard.

Do not create a generic SaaS template.

Do not overbuild.

Every screen should have a clear purpose.

Every interaction should move the learner toward finding a career direction, learning the right skills, building something real, or proving what they can do.

The final application should make the following experience immediately understandable:

> **I don't know what technology career I should choose.**
>
> ↓
>
> **Nyaama talks to me.**
>
> ↓
>
> **Nyaama helps me choose a direction.**
>
> ↓
>
> **Nyaama gives me a roadmap.**
>
> ↓
>
> **I start learning.**
>
> ↓
>
> **I build something real.**
>
> ↓
>
> **I can prove what I know.**

## Build the first version beautifully.

## Keep the architecture simple.

## Make the product feel real.

## Find Your Way.
