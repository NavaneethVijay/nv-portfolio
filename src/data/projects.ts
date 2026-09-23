export type Tone = "ink" | "sand" | "blue";
export const TONES: Tone[] = ["ink", "sand", "blue"];

export interface CaseStudyPoint {
  title: string;
  detail: string;
}

// src is left unset until a real screenshot/diagram is supplied; the page
// renders a labeled placeholder box in its place until then.
export interface CaseStudyImage {
  src?: string;
  alt: string;
  label: string;
}

// Deep case-study content for a project's /projects/[slug] page, sourced
// from the actual product repo rather than the marketing description above.
// Optional, most projects only need the fields on Project itself.
export interface CaseStudy {
  problem: string;
  architecture: string[];
  designDecisions: CaseStudyPoint[];
  teamWorkspaces?: string[];
  constraints: CaseStudyPoint[];
  aiArchitecture?: string[];
  security: string[];
  deployment: string[];
  currentState: string;
  // Reflection is the author's voice, not something to derive from the
  // repo. Left unset until supplied directly.
  whatILearned?: string;
  images?: {
    hero?: CaseStudyImage;
    architecture?: CaseStudyImage;
  };
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  // The live product, when it's separate from (or in addition to) a public
  // repo, e.g. Flowmail has no public repo but is live at flowmail.in.
  websiteUrl?: string;
  // Conceptual system flow — what happens inside the system, derived from
  // the project description above, not the tech stack (see THEME4.md §15).
  flow: string[];
  // Short masthead category, derived from the description above.
  eyebrow: string;
  // Short caption for the visual panel, derived from the description above.
  caption: string;
  // When set, the project gets a /projects/[slug] case-study page and the
  // project card links there instead of only to githubUrl.
  slug?: string;
  // Deep case-study sections rendered below the flow diagram on the
  // project's case-study page. See CaseStudy above.
  caseStudy?: CaseStudy;
}

// Order matters: the homepage "Selected work" section takes the first four
// as the main, flow-diagrammed showcase, and a couple more after that
// without a flow diagram. The /projects page renders the full list.
export const projects: Project[] = [
  {
    title: "Flowmail",
    description:
      "An AI email productivity platform on Cloud Run with Supabase, integrating Gmail via OAuth. A Gemini-powered feature suggests board organization and automated rules with a human-in-the-loop accept/reject workflow.",
    techStack: ["Next.js", "Node.js", "Supabase", "Gemini API"],
    websiteUrl: "https://www.flowmail.in/",
    flow: ["Gmail (OAuth)", "Ingestion", "Gemini Suggestion", "Human Review", "Board"],
    eyebrow: "AI / Productivity",
    caption: "Human-in-the-loop AI",
    slug: "flowmail",
    caseStudy: {
      problem:
        "Gmail works fine as a mailbox. It falls apart as a workflow tool once inbound email is also where work gets assigned, tracked, and followed up on: folders and labels can't tell you which message still needs an answer and which one is already handled. I built Flowmail to keep Gmail as the source of truth and add a board on top of it. A rules engine and a review-before-apply AI layer route messages into project-specific Kanban boards, and a workspace layer lets an owner bring teammates onto specific boards without handing over the whole inbox.",
      architecture: [
        "I built the backend as a single Hono service on Node and TypeScript, with routes for auth, emails, projects, todos, waitlist, AI, workspaces, and invitations, plus an internal sync endpoint that pulls new mail.",
        "I put Gmail access behind a GoogleProvider and a ProviderFactory instead of calling the Gmail API directly. It's a seam I added so a second mail provider wouldn't mean rewriting the ingestion path, even though Gmail is the only one I've implemented so far.",
        "I kept a consistent repository/service split across boards, rules, AI suggestions, workspaces, and todos: repositories own data access, services own the business logic on top of it.",
        "I run Supabase Postgres as the store and treat Row-Level Security as a real access boundary, not a formality. Tables holding encryption keys and OAuth exchange codes have RLS turned on with no policy at all, so only the service role can touch them.",
        "The Next.js frontend deploys separately on Vercel and talks to the backend through its own API routes.",
      ],
      designDecisions: [
        {
          title: "Provider abstraction for mail",
          detail:
            "I wrapped Gmail access in a GoogleProvider behind a ProviderFactory before I needed a second provider, because the ingestion path is the part I didn't want to have to touch again later.",
        },
        {
          title: "Deterministic rule resolution",
          detail:
            "When more than one board's rules match the same email, the highest-priority board wins, with ties breaking on the lowest board ID. I wanted classification to be predictable to the person who wrote the rule, so I made it a hard requirement instead of leaving the outcome to whatever order the code happened to check things in.",
        },
        {
          title: "AI suggestions reuse the human write path",
          detail:
            "The board and rule suggestion services never create anything directly. They produce a pending suggestion with the specific emails that justified it attached as evidence, and accepting one calls the same create-board or create-rule code a manual action would. I didn't want a second, less-audited write path just because a suggestion came from Gemini instead of a person.",
        },
        {
          title: "Authorization failures look like 404s",
          detail:
            "I made board and workspace access checks return \"not found\" instead of \"forbidden\" when a user lacks access, so a failed authorization check can't be used to figure out which boards or workspaces exist in the first place.",
        },
        {
          title: "Ownership is structurally singular",
          detail:
            "A workspace has exactly one owner, and I didn't build a promote or transfer-ownership path. That was a scope call I made when I shipped workspaces, not something I ran out of time for.",
        },
      ],
      teamWorkspaces: [
        "Only the workspace owner connects Gmail. Invited teammates work the boards that result and never connect an inbox of their own.",
        "Invite links name specific board IDs, not the whole workspace, and are locked to one target email. If someone accepts with a different signed-in account, I reject it and tell them which account it's expecting. Links expire after 7 days.",
        "I went through every ownership check that used to be a hardcoded user-id foreign key and converted it into a membership check, split by whether the action needs the owner role or just membership.",
        "An owner can revoke one member's access to a single project without touching the rest of their access, or revoke the invitation outright.",
      ],
      constraints: [
        {
          title: "OAuth exchange codes broke under autoscaling",
          detail:
            "I'd cached the one-time OAuth handoff code in an in-memory Map. That held up fine on a single process and broke the moment Cloud Run scaled past one instance, because the code could get written on one instance and read on another. I moved it to a Postgres table and consumed it with an atomic delete-and-return query so it can only ever be used once.",
        },
        {
          title: "Google's account chooser was silently skipped",
          detail:
            "I hadn't set a prompt parameter on the auth URL, so Google was reusing a cached browser session instead of showing the account picker. Users landed on a waitlist-rejection page with nothing telling them Google had even been involved. I fixed it by forcing the account chooser on every login, and forcing re-consent on reconnect.",
        },
        {
          title: "Encryption keys were derivable, not random",
          detail:
            "My original scheme derived a user's encryption key from a hardcoded master-key literal in source plus their email. Anyone with repo access could derive any user's key. I replaced it with envelope encryption: a random key per user, generated once and wrapped under a master key that lives only in an environment variable.",
        },
        {
          title: "Rate limiting is still per-process",
          detail:
            "Rate limiting is still in-memory and scoped to a single process, the same assumption that broke the OAuth exchange codes. It hasn't caused a real incident yet, but I've flagged it as the next thing to fix before it does.",
        },
        {
          title: "Migrations aren't in git",
          detail:
            "I apply database migrations straight to the live Supabase project from the CLI, and they aren't tracked in version control or run through CI. It's a real gap. I haven't automated it yet.",
        },
      ],
      aiArchitecture: [
        "I use two Gemini call shapes: a freeform summary call for thread summaries and action items, and a structured JSON-mode call with a response schema for anything the app needs to parse. I still re-validate the parsed JSON myself, since Gemini only guarantees shape, not correctness.",
        "Board and rule suggestions are built from up to 10 user-selected emails, reduced to sender domain, subject, and labels before they ever reach Gemini. Full email bodies don't get sent.",
        "Every suggestion is stored as pending with the exact emails that justified it attached as evidence. Nothing gets created until a human accepts it.",
        "Identical trigger emails and prompt version return the suggestion I already generated instead of calling Gemini again.",
        "I put a daily AI usage quota per user in place, and I bypass it for anyone using their own Gemini key. That's their cost to spend, not a shared budget I need to protect.",
      ],
      security: [
        "I use envelope encryption: a random 32-byte key per user, and separately per workspace, wrapped with AES-256-GCM under a master key that only ever lives in an environment variable, never in the database.",
        "OAuth tokens and cached email fields like subject, sender, recipient, and snippet are encrypted at rest. The metadata the rules engine matches against lives in a separate, unencrypted table so classification never has to decrypt anything.",
        "Tables holding encryption keys and OAuth exchange codes have Row-Level Security turned on with no policy defined at all. Not even the owning user can read them through a client. Only the service role can.",
        "When I shipped workspaces, I moved board email content to a workspace-scoped key so a shared board doesn't require re-encrypting content per member. OAuth tokens and bring-your-own Gemini keys stay per-user, since only the workspace owner's Gmail is ever connected.",
      ],
      deployment: [
        "The backend runs on Google Cloud Run in asia-south1, built from a Docker image. I put the API's custom domain behind Firebase Hosting instead of a Cloud Run domain mapping, because Firebase only needs a DNS A record and Cloud Run's own mapping needs Search Console verification.",
        "GitHub Actions runs typecheck and tests on every push to main, then builds, pushes, and deploys the image to Cloud Run with no manual approval gate. GCP auth goes through Workload Identity Federation, so there's no service-account key sitting in GitHub Secrets.",
        "One gotcha I hit for real: adding a required env var doesn't update the live Cloud Run service, because the deploy step only swaps the image. The container crash-loops on boot with a generic \"failed to listen on port\" error instead of a clear missing-variable message. It happened when I added a new internal sync secret.",
        "The frontend deploys separately on Vercel.",
      ],
      currentState:
        "Flowmail is live and still gated behind an approved waitlist while it's in early access. Most of my recent work has gone into fixing rule-matching, sync, and login reliability under real usage rather than adding new surface area.",
      images: {
        hero: {
          src: "/projects/flowmail/flowmail-hero.png",
          alt: "Flowmail product screenshot",
          label: "Product screenshot",
        },
        architecture: {
          src: "/projects/flowmail/flowmail-architecture.png",
          alt: "Flowmail system architecture",
          label: "Architecture diagram",
        },
      },
    },
  },
  {
    title: "Drupal Copilot",
    description:
      "A working prototype of an LLM tool-calling agent that answers natural-language questions about a Drupal site's content and configuration, backed by a crawler that builds a searchable SQLite knowledge graph.",
    techStack: ["Next.js", "OpenRouter", "SQLite"],
    flow: ["Question", "Site Crawler", "SQLite Knowledge Graph", "Tool-calling Agent", "Answer"],
    eyebrow: "AI / Enterprise",
    caption: "RAG · tool calling",
    slug: "drupal-copilot",
    caseStudy: {
      problem:
        "Anyone who works with a large Drupal site ends up asking the same questions over and over: what pages exist about a topic, where a specific component is used, what the current menu or theme configuration is. Answering that means knowing exactly where to look in the Drupal admin. I built Drupal Copilot to answer those questions in plain language instead: a crawler turns a Drupal site's JSON:API into a queryable knowledge graph, and a tool-calling agent sits on top of it so a question gets answered by looking something up, not by guessing.",
      architecture: [
        "It's a monorepo with two pieces: a Next.js chat app at the root, and a Knowledge Builder package (Express, SQLite, Drizzle) that owns crawling and storage. The chat app never talks to Drupal directly. Every answer comes from the knowledge graph the crawler built.",
        "A chat message goes through an API route into an agent loop that calls tools against the Knowledge Builder's REST API, which reads from a SQLite database the crawler populated ahead of time.",
        "The crawler talks to Drupal's JSON:API, not the database. It discovers the site's actual content types from the API's own index instead of assuming a fixed list, so it adapts to whatever content model a given site exposes.",
        "The knowledge graph is a real graph: an entities table and a relationships table with typed edges (component, media, taxonomy, menu, reference), not just a flat search index. A separate FTS5 virtual table stays in sync for full-text search.",
        "The Knowledge Builder exposes two storage implementations behind the same interface: a SQLite-backed one for real use and an in-memory one for tests.",
      ],
      designDecisions: [
        {
          title: "Self-discovering content types",
          detail:
            "I built the crawler to read the JSON:API root's own links and classify every endpoint it finds by naming pattern instead of hardcoding the content types I happened to be building against. It's the one decision in this codebase that would let the same crawler point at a different Drupal site's content model without a code change.",
        },
        {
          title: "A tool-calling agent with a hard step cap",
          detail:
            "The agent gets nine tools (search, get entity, find related entities, aggregate, page structure, site settings, and a couple of graph-inspection tools) and a 10-step cap. The first step forces a tool call, so the model has to look something up before it answers; later steps let it decide when it has enough. If it hits the cap, I show an explicit message instead of letting it fail silently.",
        },
        {
          title: "A grounding heuristic for citations, not embeddings",
          detail:
            "Sources are capped at 3 per tool call by a structural score, then re-ranked at the end of the turn by whether the entity's title or path actually shows up as a substring in the generated answer, capped again to 8 for display. It's a cheap heuristic, not semantic matching. I chose it over adding an embeddings step because it's good enough for grounding citations without a second model call.",
        },
        {
          title: "A CMS-provider interface, used for real",
          detail:
            "Crawling and relationship-resolving go through a provider interface with a single Drupal implementation today. The crawler and graph code depend on that interface, not the Drupal-specific class directly, so a second CMS would slot in at that seam instead of needing a rewrite.",
        },
        {
          title: "Bulk-write mode for the crawl",
          detail:
            "A full crawl defers the FTS index sync until the end instead of updating it after every single entity write, then rebuilds it once. Syncing on every write was the obvious way to build it. It just doesn't scale to a full site crawl.",
        },
      ],
      constraints: [
        {
          title: "Concurrent writes during a crawl",
          detail:
            "The SQLite driver I'm using is synchronous under the hood and my ORM wraps it asynchronously, so concurrent writes during a crawl could race. I added a write queue that serializes them instead of trying to make SQLite handle concurrency it isn't built for.",
        },
        {
          title: "No auth on the API or the chat app",
          detail:
            "The Knowledge Builder's API and the chat app itself have no authentication. The only real boundary is CORS locked to localhost, which is a fine boundary for a single-operator local tool and not one for a multi-tenant product. If this needs to serve more than one person, that's the first thing I'd add, not an afterthought.",
        },
        {
          title: "The embed widget has no origin restriction",
          detail:
            "The embed script drops a chat widget into any page that includes it, iframed against the app's own embed route. There's no sandbox attribute, no postMessage origin check, and no allowlist on that route. Any site can embed it today. I know exactly what's missing here. I haven't built it yet.",
        },
        {
          title: "The agent loop itself is untested",
          detail:
            "Test coverage is real and concentrated in the Knowledge Builder's pure logic: relationship building, pagination, discovery, normalization, the query engine. The agent loop and the LLM service, the most stateful and complex part of the system, have no tests yet.",
        },
        {
          title: "Rate limits are handled outbound, not inbound",
          detail:
            "The crawler retries against Drupal with backoff and a configurable rate-limit delay, and it specifically detects the case where an expired session returns an HTML login page instead of JSON, surfacing that as a clear hint instead of a raw parse error. None of that protection exists on the app's own API surface yet.",
        },
      ],
      aiArchitecture: [
        "The agent gets nine tools as OpenAI-style function schemas: search, get entity, find related entities, aggregate, page structure, site settings, and graph inspection. The model decides which to call and in what order.",
        "A regex-based classifier catches site-configuration questions before the model does and injects a pre-fetched settings snapshot straight into the system prompt, skipping the tool round-trip entirely for that class of question.",
        "Switching between OpenAI and OpenRouter is a config change, not a code change, since OpenRouter is OpenAI-API-compatible. It's provider switching through a base URL and headers, not a multi-implementation interface the way the CMS side is.",
        "Streaming is structured, not token-by-token. Every trace event, an LLM call starting, a tool call resolving, the answer forming, is encoded as its own line as it happens, so the client sees the agent's reasoning steps live instead of just watching text appear.",
        "Trace data lives in memory for the life of one request. Nothing about how the agent reasoned is persisted after the response finishes.",
      ],
      security: [
        "Drupal auth supports either a static API token or a full OAuth2 client-credentials flow with a cached token, refreshed shortly before it actually expires.",
        "The Knowledge Builder API is locked to localhost by CORS, and that's the only access control it has. There's no per-request auth on top of it.",
        "The chat app itself has no login or session layer. It's built to be run by one person against their own Knowledge Builder instance, not served to multiple untrusted users.",
        "Auth on the app's own API, an origin allowlist for the embed widget, and inbound rate limiting are the non-negotiable list before I'd point this at a site I don't fully control.",
      ],
      deployment: [
        "This runs locally today. The chat app and the Knowledge Builder API run as two separate processes (npm run dev and a second dev command), with SQLite as a single file on disk.",
        "There's no Dockerfile, no CI, and no hosting config anywhere in the repo. Getting the crawl-to-answer pipeline right has been the goal so far, not deploying it anywhere beyond my own machine.",
      ],
      currentState:
        "Drupal Copilot is Phase 1 of a two-phase plan. It can answer questions about content, structure, and site configuration, and I've written down exactly what it can't do yet rather than leaving that implicit. It's a local, single-operator tool right now, built in a focused implementation push rather than iterated over a long commit history, so I treat it as a working prototype that proves the architecture end to end, not a system that's carried real production usage yet.",
      images: {
        hero: { alt: "Drupal Copilot chat interface", label: "Product screenshot" },
        architecture: {   src: "/projects/drupal/drupal-copilot.png",alt: "Drupal Copilot system architecture", label: "Architecture diagram" },
      },
    },
  },
  {
    title: "Rynto",
    description:
      "A live property management app in daily production, designed and shipped solo. A double-entry ledger tracks balances, with tenant KYC verification and row-level-security private storage.",
    techStack: ["Expo / React Native", "TypeScript", "Supabase", "PostgreSQL"],
    flow: ["Tenant Action", "Ledger Engine", "KYC Verification", "RLS Storage", "Balance"],
    eyebrow: "Product / Solo Build",
    caption: "Solo build, in production",
    slug: "rynto",
    caseStudy: {
      problem:
        "Small property owners run their buildings over WhatsApp threads and spreadsheets: who owes what, whose KYC is on file, who moved out last month. None of that scales past a handful of units, and none of it gives a tenant a real way to see their own balance or pay rent without asking. I designed and built Rynto solo to replace that with a real app: owners manage properties, houses, and tenants; tenants see their balance and pay rent; every bill, payment, and KYC document has an actual record behind it instead of a chat history.",
      architecture: [
        "It's a three-tier structure: the Expo/React Native UI calls thin api/ wrappers, which call a repository layer that's the only code in the app allowed to talk to Supabase directly, which talks to Postgres, Row-Level Security, Storage, and Edge Functions. There's no custom backend server. Supabase is the entire backend.",
        "Global state runs on Legend State, hydrated once at launch, alongside eight React Contexts for feature-scoped state like auth, permissions, and notifications.",
        "Eight Edge Functions carry the async and scheduled work: generating invites, generating rent bills, delivering push notifications, sending reminders on a cron, account deletion, and a couple of reporting/webhook functions.",
        "Every database change is a tracked, timestamped migration file applied through the Supabase CLI. Nothing gets hand-edited on the live database.",
        "Transactions are an append-only log, never updated or deleted. A Postgres function recomputes a house's running balance from that log whenever a bill or payment changes.",
      ],
      designDecisions: [
        {
          title: "KYC documents as append-only history",
          detail:
            "I treat every KYC upload as a new row instead of overwriting the last one, then resolve which one is currently valid at read time. A tenant re-uploading a document while an earlier one is still under review doesn't hide the already-approved version behind a pending one.",
        },
        {
          title: "Security-definer RPCs to break RLS recursion",
          detail:
            "The first cross-table RLS policy I wrote checked houses from a properties policy and properties from a houses policy, and Postgres re-evaluated both recursively until access to both tables broke entirely. I fixed it by wrapping the check in a security-definer function, then made that the standing pattern for every cross-table RLS check since, instead of solving it once and moving on.",
        },
        {
          title: "Fire-and-forget push delivery",
          detail:
            "A bill or house mutation writes its notification row synchronously, then invokes the push-delivery function without waiting on it. A slow or failing push provider never blocks the action the user is actually waiting on.",
        },
        {
          title: "An append-only ledger instead of a literal double-entry one",
          detail:
            "Transactions are only ever inserted, never updated or deleted, and a house's balance is a running total recomputed from that log by a Postgres function whenever a bill or payment changes. That gives me an auditable history and a balance I can always rebuild from source, without maintaining matched debit and credit entries for a level of bookkeeping formality this app doesn't need yet.",
        },
        {
          title: "Fixing storage before finishing the RLS pass",
          detail:
            "I'd planned to work through tables in a set order during a security audit, but recon showed the KYC document bucket was open to anyone with no ownership check. I patched that first as an emergency fix, out of the planned order, then continued the rest of the pass on schedule.",
        },
      ],
      constraints: [
        {
          title: "Most tables shipped with RLS off",
          detail:
            "A pre-release security audit found that core tables (profiles, properties, houses, bills, transactions, roles) had Row-Level Security disabled, with Supabase's default anon grant still active. The anon key ships in every app build, so this wasn't a logged-in user having too much access, it was open read and write on the tables that mattered most. I enabled RLS across every sensitive table and locked storage down to ownership-scoped policies.",
        },
        {
          title: "A public storage bucket held KYC documents",
          detail:
            "The KYC bucket had storage policies granting anyone access with no ownership check, and the bucket itself was set public, which bypasses storage RLS for reads entirely. That was the single most severe finding in the audit and the first thing I fixed.",
        },
        {
          title: "The tenant invite flow trusted the request, not the requester",
          detail:
            "The original invite acceptance ran as a public, unauthenticated function that assigned a tenant to a house on a bare request, trusting whatever phone number was encoded in the token rather than checking who was actually making the request. It also had no guard against two people accepting the same invite at once. I rebuilt it around a tracked invites table, a deep link into a native in-app screen, and a security-definer function that requires the caller to be authenticated and phone-matched before the assignment happens, with an atomic guard closing the race.",
        },
        {
          title: "Every Postgres function was callable by anon by default",
          detail:
            "Independent of what any individual migration granted, Supabase's schema-level default lets the anon role execute every function unless a migration explicitly revokes it. I fixed this function by function as I found them. A broader platform-level default fix is still on my list, not done yet.",
        },
        {
          title: "The UI still shows actions RLS already blocks",
          detail:
            "Tenants still see add-bill and delete-bill buttons that RLS now correctly rejects server-side. It's not a security hole anymore, just an interface that hasn't caught up to the access model yet.",
        },
      ],
      security: [
        "Every sensitive table has Row-Level Security enabled, scoped by ownership between owner, tenant, and house or property, verified table by table in a documented audit rather than assumed from the migration history.",
        "Role changes go through a security-definer RPC scoped to the caller's own account, with a trigger blocking any direct update to a profile's role column. Nobody can promote themselves by writing to the row directly.",
        "KYC documents and rental agreements are served through signed URLs from private storage buckets, not public bucket URLs, with ownership-scoped storage policies.",
        "Phone sign-in uses Supabase's own OTP flow end to end today. My own project docs still describe this as a stubbed, hardcoded test path, which was true at some point but isn't what the current code does. I need to go back and update that.",
      ],
      deployment: [
        "Builds go through EAS with five profiles: a preview APK, a Gradle preview release, two internal-distribution dev builds, and the production store build. A GitHub Actions workflow builds a preview APK on demand.",
        "Every database change is a tracked, timestamped migration file applied through the Supabase CLI, with a documented rollback path.",
        "There's no custom backend to deploy. Supabase is the entire server side: Postgres, the Edge Functions, Storage, and Auth.",
      ],
      currentState:
        "Rynto is live in production, in daily use by real property owners and tenants, at version 1.0.0 across both stores. It's been through a real security audit and a full invite-flow rework since it first shipped, and I'm still actively maintaining it, not treating it as done.",
      images: {
        hero: { alt: "Rynto tenant and owner dashboard", label: "Product screenshot" },
        architecture: {  src: "/projects/rynto/rynto-architecture.png", alt: "Rynto system architecture", label: "Architecture diagram" },
      },
    },
  },
  {
    title: "gitbar",
    description:
      "A native macOS menu bar app for git hosts: pin repos, see at a glance which ones need you, and drill into pull requests, reviewing, checking CI, and opening new PRs, without leaving the menu bar. Built on a provider-neutral core with GitHub (cloud and Enterprise Server) as the first module, background refresh that rides on ETag 304s so unchanged data costs no rate limit, and a notifications inbox with native macOS alerts.",
    techStack: ["Swift", "SwiftUI", "AppKit", "GitHub REST + GraphQL"],
    githubUrl: "https://github.com/NavaneethVijay/gitbar",
    flow: ["Pinned Repos", "Provider Module", "ETag-cached Polling", "Status Ring + Inbox", "PR Review"],
    eyebrow: "Developer Tooling / Desktop",
    caption: "Git hosts in the menu bar",
  },
  {
    title: "Overwatch Node",
    description:
      "A native macOS menu bar app in Swift that exposes running apps and system state over a local WebSocket server, paired with a React Native companion app for real-time switching over the local network.",
    techStack: ["Swift", "React Native (Expo)", "WebSocket"],
    githubUrl: "https://github.com/NavaneethVijay/Overwatch-Node",
    flow: ["macOS App State", "WebSocket Server", "Local Network", "RN Companion App"],
    eyebrow: "Systems / Desktop",
    caption: "Native menu bar app",
  },
  {
    title: "Roost",
    description:
      "A local-first desktop app for developers with hundreds of repos on disk: it scans your machine, gives every project a landing page with git status and README, tracks how much space node_modules and build/target folders are wasting, and cleans them safely through the OS trash. A cross-platform Tauri rewrite of a native macOS app I built first in Swift.",
    techStack: ["Tauri", "Rust", "React", "TypeScript"],
    flow: ["Filesystem Scan", "Signature Detection", "SQLite Index", "Git + Disk Enrichment", "Project Page"],
    eyebrow: "Developer Tooling / Desktop",
    caption: "A local GitHub for your machine",
  },
  {
    title: "Finance Analyst",
    description:
      "A fully on-device personal finance app for Android that reconciles two capture paths, real-time SMS parsing and a one-tap quick-entry prompt, against a monthly bank PDF or CSV statement parsed natively on the phone. Every parser, the database, and the reconciliation engine run locally; no server, no cloud sync, financial data never leaves the device.",
    techStack: ["Expo / React Native", "TypeScript", "SQLite", "Native Modules"],
    flow: ["SMS / Quick-Entry", "PDF Statement Import", "On-device Parsing", "Reconciliation Engine", "Local SQLite"],
    eyebrow: "Finance / On-device",
    caption: "Offline-first, by design",
  },
  {
    title: "BackstopJS-UI",
    description:
      "A self-hosted visual regression testing tool built on top of BackstopJS, with a GitHub Actions pipeline that crawls a sitemap and deploys reference/test screenshots to Vercel. Built to catch visual regressions before they ship. This kind of automated gate is what let my teams push deployment velocity up 40% without trading away release confidence.",
    techStack: ["Vite", "React", "Playwright", "BackstopJS"],
    githubUrl: "https://github.com/NavaneethVijay/backstopjs-visual-testing",
    flow: ["Sitemap Crawl", "BackstopJS Diff", "GitHub Actions", "Vercel Deploy"],
    eyebrow: "Testing / Tooling",
    caption: "Visual regression testing",
  },
];
