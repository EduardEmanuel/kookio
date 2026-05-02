# Git Guidelines

> **Status: Active** — `main` / `test` / `dev` branch flow, Conventional Commits, and the AI-free commit-message rule are all enforced. The "no AI co-authorship in commits" rule is also pinned in memory (`feedback_no-co-authored-by.md`).

## Branching Strategy: GitHub Flow + Long-lived Preview Branches

### Branch Overview

| Branch                 | Purpose                                                      | Vercel Environment   |
| ---------------------- | ------------------------------------------------------------ | -------------------- |
| `main`                 | Production — always stable and deployable                    | Production           |
| `test`                 | E2E preview — Playwright testing before merging to main      | Preview (E2E)        |
| `dev`                  | Development preview — quick visualization of ongoing changes | Preview (Dev)        |
| `feat/*`, `fix/*` etc. | Feature branches — active development                        | Preview (per branch) |

### General Flow

feat/my-feature
↓ merge
dev ← visualize on Vercel Preview
↓ merge
test ← run E2E on Vercel Preview
↓ PR + merge commit
main ← Vercel Production

### Rules for `dev`

- Merge feature branches directly into `dev` for quick preview
- `dev` may be unstable — it is a visualization sandbox
- Never open a PR from `dev` directly to `main`
- Periodically reset `dev` to `main` if it accumulates too many diverging changes:

```bash
  git switch dev
  git reset --hard origin/main
  git push origin dev --force-with-lease
```

### Rules for `test`

- Only merge into `test` what is considered ready for E2E validation
- `test` must be more stable than `dev` — do not experiment here
- E2E tests run automatically on the Vercel Preview from `test`
- If E2E tests pass on `test`, open a PR to `main`
- Reset `test` to `main` after merge, same as `dev`

### Rules for `main`

- Always deployable to production
- Never push directly — only via approved PR from `test`
- All CI checks must pass before merge

### Branch Naming

- Use the format: `type/short-description`
- Keep descriptions short, lowercase, hyphen-separated:
  feat/user-profile-page
  fix/login-redirect-loop
  chore/update-angular-v20
  refactor/users-store-signals
  docs/setup-ai-guidelines
- Mirror the Conventional Commits type in the branch name
- Never work directly on `main`, `dev`, or `test`

## Commit Messages: Conventional Commits

### Format

type(scope): short description
[optional body]
[optional footer]

### Types

| Type       | When to use                              |
| ---------- | ---------------------------------------- |
| `feat`     | New feature visible to the user          |
| `fix`      | Bug fix                                  |
| `chore`    | Maintenance, dependencies, tooling       |
| `refactor` | Code change with no behavior change      |
| `perf`     | Performance improvement                  |
| `test`     | Adding or fixing tests                   |
| `docs`     | Documentation only                       |
| `style`    | Formatting, whitespace (no logic change) |
| `ci`       | CI/CD configuration                      |
| `build`    | Build system changes                     |

### Rules

- Subject line: imperative mood, lowercase, no period, max 72 chars:
  / ✅ correct
  feat(auth): add OAuth2 login flow
  fix(users): prevent duplicate user entries on rapid click
  // ❌ avoid
  Added OAuth2 login
  Fixed the bug.
  FEAT: AUTH
- Scope is optional but recommended — use the feature or module name:
  feat(users): add pagination to users list
  fix(store): correct loading state reset after error
  chore(deps): upgrade Angular to v20.1
- Body is optional — use it to explain _why_, not _what_:
  refactor(auth-store): split sign-in flow into a dedicated rxMethod
  Keeps the store surface focused and makes the cancellation
  semantics explicit. No behavior changes.
- Breaking changes go in the footer with `BREAKING CHANGE:`:
  feat(api): change users endpoint response shape
  BREAKING CHANGE: users array is now nested under data key.
  Update all consumers of UsersService.getAll().

## Pull Requests

### Creating a PR

- PR title follows Conventional Commits format — it becomes the merge commit message:
  feat(users): add search and filter to users list
- PR description must include:
  - **What** changed and **why**
  - Screenshots or recordings for UI changes
  - Notes on testing approach
  - Any breaking changes or migration steps
- Keep PRs small and focused — one concern per PR
- Draft PRs are allowed for early feedback — mark as ready when tests pass

### Merge Strategy: Merge Commit

- Always merge via merge commit — do NOT squash or rebase in GitHub UI
- This preserves full commit history on feature branches
- Ensure commit history on the branch is clean before merging:
  - Squash WIP commits locally before opening PR
  - Use `git rebase -i origin/main` to clean up

### Review

- At least one approval required before merge
- All CI checks must pass before merge
- Resolve all comments before merging — do not leave open threads
- Reviewer approves the behavior, not just the code style

## Local Workflow

### Daily Flow

```bash
# Start new work
git switch main
git pull origin main
git switch -c feat/my-feature

# Work, commit often
git add -p                          # stage hunks, not whole files
git commit -m "feat(scope): description"

# Keep branch up to date
git fetch origin
git rebase origin/main              # rebase locally, never force-push to shared branches

# Push and open PR
git push origin feat/my-feature
```

### Keeping History Clean

- Commit early and often locally — clean up before pushing with `git rebase -i`
- Stage changes in hunks with `git add -p` — avoid `git add .`
- Never force-push to branches others are reviewing
- Never rewrite history on `main`

## Responding to CI Failures

When CI fails, the error message usually contains the fix verbatim. Read it carefully before reaching for hypotheses about the underlying cause.

### Lockfile desync (`npm ci`)

When CI fails on `npm ci` with messages like `Missing: <pkg> from lock file` or `package.json and package-lock.json are out of sync`, the fix is the three lines npm itself prints:

```bash
npm install
git add package-lock.json   # plus package.json if it actually changed
git commit -m "chore(deps): refresh lockfile"
git push
```

CI then re-runs `npm ci` against the synced lock and passes.

**Why it works:** `npm ci` validates that the lockfile is a deterministic snapshot of what package.json declares. Any local edit to package.json (adding a dep, bumping a version) requires regenerating the lock. `npm install` is the only command that does that.

**Anti-patterns to avoid:**

- Investigating cross-platform peer-dep divergence between local npm and the CI runner's npm.
- Trying `--package-lock-only`, `--include=peer`, `--legacy-peer-deps` flag permutations to "preserve" entries that npm prunes on regeneration.
- Proposing to switch the CI action from `npm ci` to `npm install` — `npm ci` is the right command for CI, it just needs a synced lockfile.

All of the above solve a problem that is not the actual problem. The npm error message ends with the literal sentence `Please update your lock file with npm install before continuing.` — treat that as the entire diagnostic procedure.

## AI-Assisted Development

This project is developed with the help of AI coding assistants (Claude, ChatGPT, Gemini, GitHub Copilot, or similar tools).

### Commit Messages Must Be AI-Free

Commit messages on this repo must contain **no trace** that an AI assistant
was involved. This is broader than just attribution trailers — it covers
the entire message, subject and body.

**1. Never add co-authorship trailers:**

```text
# ❌ never add any of these
Co-Authored-By: Claude Sonnet <noreply@anthropic.com>
Co-Authored-By: GitHub Copilot <copilot@github.com>
Co-Authored-By: ChatGPT <noreply@openai.com>
```

**2. Never reference AI-guideline files in the message body:**

```text
# ❌ avoid — reveals an AI workflow
- "per CLAUDE.md i18n guidelines"
- "as documented in AGENTS.md"
- "following GEMINI.md conventions"
- "per .ai/ instructions"

# ✅ rephrase using neutral project terms
- "per project i18n guidelines"
- "matching the team conventions in README"
- "following the project's standard refactor pattern"
- (or just drop the justification — the diff speaks for itself)
```

**3. Never name AI products or assistants in the message:**

```text
# ❌ avoid
- "debugged together with Claude"
- "Cursor flagged this issue"
- "Copilot suggested this approach"

# ✅ instead, justify through technical reasoning or project conventions
- "fixes the race in the test runner"
- "aligns with the existing repository pattern"
```

**4. Never embed tool-call output or AI-style phrasing** that betrays an
AI workflow:

```text
# ❌ avoid
- "the agent reported that ..."
- "based on the analysis above ..."
- "after reviewing the codebase ..."

# ✅ write it as a human-authored note
- "the test failed because ..."
- "the relevant constraint is ..."
- (or just remove — most explanations are noise anyway)
```

- The human author is solely responsible for every commit — AI tools are instruments, not collaborators
- This applies regardless of how much of the code was suggested by the AI
- When justifying a decision in the body, cite project files that are not AI-specific (README, RUNBOOK, individual source files), or describe the reasoning in plain technical terms

**Why:** This is an academic project. The boundary between using a specialized tool and academic dishonesty depends on authorship transparency. AI references in git history — even subtle ones like citing an AI-guideline file — create ambiguity about the origin of decisions that could be misinterpreted during evaluation. Every commit is part of the evaluable production, and the declared author is the singular author of the decision. AI assistants are treated as tools (like a linter, a compiler, or Stack Overflow) — not as co-authors, and not as cited sources.

**How to apply:** Before running `git commit`, read the message as if a
reviewer who knows nothing about your tooling were reading it. If anything
in the message would tip them off that an AI was involved, rewrite it.

## General Rules

- Never commit without explicit confirmation — always present the diff/summary of changes and wait for approval before running `git commit`
- Never commit secrets, credentials, or `.env` files — use `.gitignore`
- Never commit generated files (`dist/`, `.ai/guidelines.md`) — use `.gitignore`
- Tag releases on `main` with semantic versioning: `v1.2.3`
- Use `git bisect` to find regressions — keep commits atomic to make this effective
