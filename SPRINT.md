# SPRINT — Content apps on TAQAT Hosting: (A) Trainee end-to-end guide + (B) the AI book ("Recipe Book"), production-ready

## ⛔ EXECUTE MODE — READ FIRST
STOP PLANNING. Headless — nobody answers. Ambiguity → sensible default, implement, FLAG. NEVER stop to ask.
**Commit small, push incrementally, per app** (a previous fleet sprint died at an output cap with 0 commits).

## Repo / context
- You are in a worktree of `AQaddora/taqat-trainee-guide` (remote `gh`), branch `feat/guide-and-book`, base `main` — app A lives here; auto-merge to this repo's main on green is fine. App B gets its own NEW private→public repo `AQaddora/taqat-ai-recipes-book` which you create with `gh` (authed as AQaddora) — make it **private** (it's paid content).
- **TAQAT Academy Hosting** (deploy target): Dokku box `taqat-apps` (root ssh alias configured); apps at `https://<slug>.apps.taqat.academy`; agent `/opt/taqat/deploy-agent/agent.sh` (read it; actions `create_app`/`set_repo`/`deploy`; as root pipe JSON: `echo '<json>' | ssh taqat-apps /opt/taqat/deploy-agent/agent.sh`). NOTE for app B (private repo): `create_app` returns a deploy PUBLIC key — add it to the repo as a read-only Deploy Key (`gh repo deploy-key add`) and deploy via the SSH url (`git@github.com:AQaddora/taqat-ai-recipes-book.git`).
- Academy platform: https://taqat.academy, checkout at `~/Work/taqat-academy` (reference `gh/main`: `HANDOFF.md`, `docs/`, hosting guide copy in `components/projects/workroom-hosting-tab.tsx`, design tokens). Design language: TAQAT energy/amber; bilingual en+ar with correct RTL.
- Source content for app B: `~/Work/ai-mastery-for-students` (Ahmed's AI book/program: 7 sessions, outline, resources incl. prompting cheat-sheet, examples). **FLAG PROMINENTLY:** Ahmed called this "my ai book … the recipe book"; no other recipe-book source exists on this machine, so the AI Mastery content IS the book. If he meant a different draft, the shell is reusable — say so in the report.

## 🚧 HARD CONSTRAINTS
- On `taqat-apps`: only create the NEW dokku apps `academy-guide` and `ai-recipes`; never touch existing apps/nginx/ssh-appssh. No secrets committed anywhere. Never touch taqat-academy branches or prod DB schema (workroom registration is the showroom sibling sprint's job; publish/paid links are the academy sibling sprint's job — don't duplicate).

## App A — `academy-guide`: the trainee tutorial, end to end (this repo)
A beautiful static-friendly Next.js (or Vite+React) docs-style site: **"How to use TAQAT Academy — from zero to hosted project"**. Ground every step in the REAL product (read the academy code/docs on gh/main — do not invent UI that doesn't exist):
1. Sign up / sign in with TAQAT SSO; profile.
2. Enroll in a course; videos + quiz-after-video; attendance; certificates (mention).
3. Join a group; the workroom: tasks board, sprints, files & comments, repos.
4. **Hosting, in depth** (the star): connect your GitHub repo (deploy key), pick nothing — stack auto-detect (all 6 stacks), env vars + .env import, add PostgreSQL/MySQL, deploys & logs, the in-browser terminal (TAB completion), native SSH from your laptop (port 2222, key registration, Windows instructions exist in-product), custom domains, and **publishing your app's URL to the projects gallery with your own title** (feature shipping in a sibling sprint — describe it as the way to show your work).
5. FAQ + troubleshooting (build failed, app not binding $PORT, Laravel zero-config, etc. — mine the hosting tab guide copy).
Sidebar navigation, search-friendly headings, en+ar, screenshots optional (skip real screenshots — use clean illustrative UI mock blocks, no fabricated pixel screenshots). Deploy as dokku app `academy-guide` → LIVE 200 at https://academy-guide.apps.taqat.academy.

## App B — `ai-recipes` (new private repo): the book, production end-to-end
Transform `~/Work/ai-mastery-for-students` into a REFINED, production-ready web book — **"AI Mastery — The Recipe Book"** by Ahmed Qaddoura:
- Restructure the 7 sessions + resources into polished book chapters ("recipes": each a practical, self-contained how-to with goal → steps → prompts → pitfalls). REMOVE every placeholder/TODO/school-proposal artifact (PROPOSAL.md pricing, CV, "for the school" fragments do NOT ship); rewrite fragments into finished prose. Keep Ahmed's voice: practical, direct, safety-and-ethics aware.
- Reading experience: cover page, TOC, chapter navigation (prev/next), progress indicator, mobile-perfect typography, dark-mode-friendly, en primary (Arabic UI chrome ok; don't machine-translate the whole book — FLAG as follow-up).
- This book will be published via the academy as a **limited-time then PAID subscription** link (the academy sprint seeds the paid gate at `taqat.academy/l/…`). The book app itself: add a small config-driven notice bar ("Available free for a limited time — get it on TAQAT Academy") linking https://taqat.academy. No paywall logic inside the book app (v1 gating is at the academy layer).
- Deploy as dokku app `ai-recipes` (private repo → deploy key flow above) → LIVE 200 at https://ai-recipes.apps.taqat.academy.

## Acceptance
- Both apps LIVE: `curl -s -o /dev/null -w '%{http_code}'` = 200 for https://academy-guide.apps.taqat.academy and https://ai-recipes.apps.taqat.academy.
- Guide covers the full end-to-end journey incl. the deep hosting chapter; zero invented features (everything cross-checked against the codebase); en+ar.
- Book: zero placeholders/TODO/proposal artifacts (grep the built site for "TODO", "placeholder", "lorem", "XXX", school-pricing strings → all clean); all 7 sessions represented as finished chapters; nav/TOC works.
- App A PR merged to this repo's main; App B repo pushed (private) with its own main.
- Nothing else touched on the box.

## Final report (END only)
Both live URLs + codes, repo URLs, deploy fixes, content-refinement summary (what was cut/rewritten), the recipe-book interpretation FLAG, other defaults + FLAGs. Then stop.
