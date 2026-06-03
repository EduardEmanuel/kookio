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

### Investigate before deleting "dead" files

Disk state is a snapshot, not history. A file at zero bytes on disk is
not proof that the contents are obsolete — it can be the residue of a
recent script that overwrote a real file (a build target chained on a
missing source, a failed migration, a botched generator). The same
applies to files that look like build artefacts: they may have started
as generated output but become hand-edited sources of truth later in
the project's life.

**Before deleting any file that looks dead, run:**

```bash
git log -p -- <file>
```

That surfaces every change ever made to the file. If the most recent
content is substantial and hand-edited (not a generator emission), the
file is probably not dead — the empty disk state has a different cause,
and that cause is what needs fixing.

**Why:** `apps/web/src/styles/kookio-material.css` was assumed dead
because it was 0 bytes on disk and its `_material-overrides.scss`
source had been removed deliberately in an earlier commit. The file
actually carried 158 lines of hand-edited Material overrides for the
warm orange palette (state-layer colors, icon-button centering,
checkbox tones), edited directly as the new source of truth after the
SCSS source was removed. The empty disk state came from a stray
`nx run ui:build-tokens` run whose dead second `cat` command
overwrote the real content with zero bytes. Acting on the disk state
alone destroyed working code and required a recovery commit.

**How to apply:** any time you are about to delete a file, an asset
folder, a generated output, or a build-target, run `git log -p -- <file>`
first and read the most recent diff. If the content is substantial
and hand-edited rather than a generator emission, stop and ask the
maintainer what role the file plays in the pipeline before removing
it. Outputs can become hand-edited sources of truth — a pipeline
step disappearing does not automatically mean its output should too.

### Multi-file commits need a raised Node heap

The lint-staged pre-commit hook runs `nx format:write --files=…` on every
staged source file. Past roughly five files in one commit, that step
exceeds Node's default ~2 GB heap and is killed with `SIGKILL`; lint-staged
then reverts the working tree to the pre-stash state and the commit
silently fails to land.

**Workaround** — raise the heap explicitly for the commit:

```bash
NODE_OPTIONS="--max-old-space-size=4096" git commit -m "..."
```

`4096` MB covers typical multi-file commits. The 6144 MB value
documented for the production Nitro bundle pass is stronger than needed
here — start at 4096 and only escalate if it still dies.

**Why:** `nx format:write` spins up the full Nx daemon plus Prettier and
holds the project's transitive AST + plugin loader graph in memory.
Identical root cause to the documented Nitro OOM, just a different
trigger surface (pre-commit instead of CI build).

**How to apply:** any commit that touches more than a handful of files
(realistically: ≥ 5) should be prefixed with the
`NODE_OPTIONS="--max-old-space-size=4096"` env var. Single-file commits
are fine on the default heap. **Never** reach for `--no-verify` to bypass
the hook — that loses the lint/format guarantees the project relies on.

### Never run `husky --version` to check the version

Husky v9 (the project is on `9.1.7` — there is **no v10** published yet,
despite the `WILL FAIL in v10.0.0` deprecation banner) has **no `--version`
flag**. Its CLI reads any argument as the **hooks install directory**. So
`npx husky --version` is interpreted as "install hooks into a directory
named `--version`": it creates `./--version/_/` and rewrites
`git config core.hooksPath` to `--version/_`.

Nothing breaks until the next hook fires — then git invokes
`--version/_/pre-commit`, husky's `_/h` wrapper runs `sh -e "$s"` with a path
beginning `--version`, `sh` reads it as a flag, and you get
`sh: --version/_/pre-commit: invalid option` followed by a bash usage dump,
with the commit (or push) aborted.

**How to check the version instead:** read the installed package —
`node -p "require('husky/package.json').version"` — or the `husky` line in
`package.json`. Never `husky --version`.

**Recovery if already corrupted:** `npx husky` (no args) reinstalls into
`.husky` and restores `core.hooksPath` to `.husky/_`; then
`rm -rf -- "--version"` removes the stray directory. Confirm with
`git config --get core.hooksPath` → `.husky/_`.

### The pre-push gate runs `build` in its own serial pass

`.husky/pre-push` runs `nx affected -t lint test` first, then — only on
`main` — a **separate** `nx affected -t build --parallel=1` pass. Do NOT fold
`build` back into the same `nx affected` invocation as `test`.

**Why:** the heavy Nitro/Angular bundle competing with the vitest workers for
cores and RAM starves them on a constrained machine. Millisecond unit tests
blow past the 5 s Vitest timeout and fail as flaky — not because the code is
wrong, but because the runner never got scheduled (a 13-minute spec run that
takes 463 ms in isolation is the signature). Same starvation root cause
documented for CI in `07_testing.md`. Splitting `build` into its own
`--parallel=1` pass removes the contention while keeping the full gate.

**Do NOT export the build's heap onto the push.** Prefixing the whole command
— `NODE_OPTIONS="--max-old-space-size=6144" git push` — leaks the 6 GB ceiling
into every vitest `vmThreads` worker the hook spawns; they then balloon and
swap-thrash, producing the same flaky timeouts. The `--max-old-space-size`
heap raise belongs to the build step alone (CI sets it on the Nitro pass; see
`17_analog-ssr-ssg.md`), never on the outer `git push`.

**The affected base must be a real ref.** Fetch `origin main`, not
`origin origin/main` — the latter names a branch that does not exist on the
remote, fails silently under `|| true`, and leaves `nx affected` diffing
against a stale tracking ref (the visible symptom is
`fatal: couldn't find remote ref origin/main`).

**If the hook hangs with no task output at ~0 % CPU, it's an Nx daemon
deadlock, not a slow build** — a real build shows a high-CPU rollup/esbuild
process and real memory use. Kill the wedged `nx affected` process and run
`npx nx reset` before retrying. A genuine flaky-timeout failure is the
opposite and is verifiable: re-run the affected projects in isolation
(`nx run-many -t test -p … --parallel=1`) and confirm they pass in seconds
before treating a red pre-push as a real regression.

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

#### Exception: `npm install` changes nothing but `npm ci` still fails

The procedure above fixes the **common** desync, where local and CI npm
resolve the same tree. There is a distinct, rarer case where it does not — and
the symptom tells them apart: **`npm install` produces no change to
`package-lock.json`, yet CI's `npm ci` still reports the same packages
"Missing from lock file".**

Only then is it a genuine **platform-dependent resolution divergence** — the
one situation where the "don't investigate cross-platform" warning above
doesn't apply. It happens when a transitive **optional peer** resolves on the
Linux CI runner but not on macOS. Concrete instance: Prisma 7's CLI bundles
`@prisma/studio-core`, whose `@radix-ui/*` UI deps peer-depend on React; Linux
npm pulls `react` / `react-dom` / `react-refresh` / `scheduler` /
`@types/react` / `csstype`, macOS npm does not, so a lockfile generated on
macOS is missing them and even a from-scratch `npm install` won't add them.

**Fix:** declare the missing cluster explicitly (as `devDependencies` if it's
a dev-only tool like Prisma Studio) so the lockfile carries it on every
platform. Verify with `npm ci --dry-run` locally, and keep the diff minimal —
restore the committed lock and add only the missing packages incrementally,
rather than committing a full from-scratch regeneration.

**How to tell which case you're in:** run `npm install`. If the lockfile
changes, it was the common desync — commit it, done. If it does **not** change
and CI still fails, it's this platform-divergence case.

### Peer-dependency ERESOLVE on the Vercel build — strict-validate dep bumps

Distinct from the lockfile desync above. Here the Vercel build fails at
`Installing dependencies...` with `npm error code ERESOLVE` /
`Conflicting peer dependency`, even though the same `npm install` passed
locally. The cause is **lenient local resolution masking a real peer
conflict** that Vercel's stricter install rejects.

**Why local passes but Vercel fails:** the local/shell environment carries
`npm_config_legacy_peer_deps=true` (confirm with `npm config get
legacy-peer-deps` → look for "overridden by env"; it is **not** in any
`~/.npmrc`). With legacy-peer-deps on, npm ignores peer-dependency
conflicts, so an incompatible bump resolves and gets committed into the
lockfile. Vercel installs with the default strict resolution and errors.
Worse, it errors **one conflict at a time** — each redeploy surfaces the
next (the June 2026 incident walked sharp → esbuild → vite across three
deploys before the root cause was found).

**Reproduce Vercel locally and find ALL conflicts at once** — force strict
resolution, lockfile-only (does not touch `node_modules`):

```bash
npm_config_legacy_peer_deps=false npm install --package-lock-only \
  --strict-peer-deps --no-audit --no-fund
```

A clean exit means Vercel's install will resolve. An ERESOLVE names the
real conflict — read the `peer ... from <pkg>` line to see which package
imposes the ceiling, then pin the offending direct dep back into range.
The conflict is almost always an over-eager "upgrade to latest" past an
AnalogJS/Angular peer gate (this session pinned vite ≤ 7, sharp 0.33.x;
tRPC 10, marked 15, TS 5.9 are gated the same way). **Do this before
committing any dependency bump** — a green local `npm install` proves
nothing while legacy-peer-deps is masking the graph.

**NEVER regenerate the lockfile from scratch on macOS to fix it**
(`rm package-lock.json && npm install`). A from-scratch resolve on a Mac
**drops the Linux-only optional binaries Vercel needs** —
`@rollup/rollup-linux-x64-gnu`, `@img/sharp-linux-x64`, and
`@img/sharp-linuxmusl-x64` all vanished in the incident (esbuild's linux
entries happened to survive; rollup's and sharp's did not). Committing
that trades the ERESOLVE for a "missing linux binary" build failure.

Instead, **update incrementally** so the cross-platform entries persist:

```bash
git checkout -- package-lock.json     # restore the all-platform lock
# bump the offending version in package.json, then (NO rm):
npm install --package-lock-only --no-audit --no-fund
```

Verify both that the conflict is gone (strict resolve above) and that the
platform binaries survived:

```bash
for p in '@rollup/rollup-linux-x64-gnu' '@img/sharp-linux-x64' \
         '@img/sharp-linuxmusl-x64'; do
  echo "$p: $(grep -c "node_modules/$p\"" package-lock.json)"   # each ≥ 1
done
```

The incremental diff stays small (hundreds of lines, scoped to the changed
subtree) instead of a 15k-line rewrite — a small diff is itself the signal
that parity was preserved. Same minimal-diff discipline as the
platform-divergence case above.

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
