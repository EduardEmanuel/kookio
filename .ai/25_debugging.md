# Debugging & Verification Discipline

> **Status: Active** — Technology-agnostic debugging and fact-checking
> conventions distilled from real sessions on this repo (a thesis-LaTeX
> overfull hunt, an Angular-21 refactor, a multi-agent verification run).
> These rules cross-cut the stack: they apply equally to a front-end bug, a
> build-system failure, a test regression, or a LaTeX layout issue. The
> per-technology chapters carry the concrete instances; this chapter carries
> the method.

## When a metric is invariant across changes, you're pulling the wrong lever

If a numeric symptom stays **identical to the last digit** after several
different attempts to fix it, that invariance is itself the diagnostic
signal: the thing you are editing is **not on the causal path**. Stop
generating more hypotheses of the same kind ("try a bigger dose") and switch
to a tool that _localizes_ the cause.

**Concrete instance.** Chasing a LaTeX `Overfull \hbox (256.75589pt too
wide)`, the assumption was "a long bibliography URL". Five preamble changes
followed — `biburl*penalty` 9000 → 100 → 3000, adding digits/letters to
`\UrlBreaks`, moving the setup top-level vs into `\biburlsetup`. The box
stayed **256.75589pt every single time**. That byte-for-byte constancy was
the tell: none of those settings touched the real box. The actual cause was
`\let\clearpage\relax` at `\end{document}` (an author hack to suppress a
trailing blank page) emitting a phantom `[][][]` box during the final flush
that **never rendered on any page**. Removing the hack fixed it in one edit.

**How to apply:**

- Treat "no change at all" as **positive evidence you're in the wrong
  place**, not as a reason to escalate the same fix.
- Localize before tuning. Reach for a tool that points at the offending
  element rather than one that nudges a global parameter:
  - LaTeX overfull box → `\overfullrule=5mm` and find which page carries the
    black bar; if **none** does, the box is a flush/teardown artifact, not
    page content (read the `.log` position — a box reported at the master
    file's `\end{document}` line, after `(./*.aux)` is re-read, is end-of-run,
    not a paragraph).
  - Front-end / build → bisect the input (`git bisect`, comment out half),
    add a breakpoint or a `logger` line at the suspected site, or diff a
    known-good vs current artifact — anything that _narrows location_.
- An invisible symptom that's immune to every input is usually a **side
  effect of teardown/cleanup code**, not of the feature you're tuning.

This generalizes the specific build-failure notes elsewhere: the
`manualChunks` / `ssr.external` crash in `17_analog-ssr-ssg.md` and the
Nitro OOM heap fix are all cases where the obvious lever (bundle config) was
not the real cause — the same "localize, don't keep tuning" instinct applies.

## Trust the source, not the summary

A summary — a sub-agent's report, a tool's warning, a memory note, your own
recollection — is a lossy compression of the real artifact. Before acting on
a claim that something _is_ a certain way in a file, **open the file and look
at the bytes**. Summaries are for deciding _where_ to look, not _what is
true_.

**Concrete instances from a multi-agent verification run:**

- An agent reported "the grams pipeline is not documented in this chapter."
  True of the file _on disk_ — but the artifact under review was an _unapplied
  proposal_ whose whole point was to add it. The agent had read the wrong
  state.
- An agent reported four acronyms "undefined — will not compile." They were
  defined — the multi-line `\newacronym[longplural=…]\n {key}{…}{…}` form is
  invisible to a single-line `grep`. The tool's shape, not the file, produced
  the false positive.

**How to apply:**

- Separate **claims about code/state that you can verify** (paths, signatures,
  schema constraints, values, git history) from **claims that depend on which
  version of an artifact was read**. Re-read the live file for the former;
  re-establish "which state?" for the latter.
- When a grep/scan says "absent", confirm with a second method before
  asserting it (a multi-line construct, an alias, a generated file, or a
  re-export can all hide a real definition).
- Sub-agents and workflows are force multipliers for _coverage_, not oracles
  for _truth_. Spot-check their highest-stakes findings against the source —
  especially any "X is missing / broken / will fail" claim.

## Verify empirically, not just "green compiler / green tests"

An exit-0 build and a passing unit suite confirm the absence of the failures
those tools _check for_ — not the absence of the problem you care about. When
the outcome is something a human looks at or a system does at runtime,
**observe that outcome directly**.

**Instances already codified, unified here as one habit:**

- A LaTeX compile returned exit 0 while a page had a large whitespace hole
  (a `[H]` float that couldn't fit) and carried a phantom overfull box.
  Rendering the page to PNG was the only thing that surfaced both — see
  `24_documentation-latex.md` ("render the affected page before proposing the
  next fix").
- Green typecheck + green Vitest do **not** imply green E2E: SSR cold-start
  cost from `app.config.ts` barrel imports only shows up at runtime under
  Playwright — see `08_e2e.md` ("Treat SSR cold-start as a first-class test").
- A widget refactor's own lib tests passed while consumer specs broke with
  `NullInjectorError` — only `nx affected -t test` across consumers caught it
  (`07_testing.md`).

**How to apply:** after a change whose effect is visual, runtime, or
cross-project, run the thing and look — render the page, start the app, hit
the route, run the affected consumers. Don't let a green checkmark on a
narrow gate stand in for the outcome the user will actually experience.

## Verify claims before asserting them as fact

When writing something that will be read as authoritative — documentation, a
thesis sentence, a table of "what changed", a code comment explaining _why_ —
each factual claim must be checked against the primary source (the code, the
schema, `git log`), not reproduced from a draft or from memory.

**Concrete instance.** A proposed thesis table of "8 architectural
decisions" was checked decision-by-decision against `git log`: WebAuthn
removal (`89e46da`), role infrastructure (`9915d75`), MealPlan flattening
(`07675ea`), the FAB→topbar and quick-actions changes — all confirmed. One
claim was **wrong** ("models went 20 → 19"; the schema has 20 now because a
model was added later) and was corrected to a verifiable phrasing rather than
copied through. A seed value asserted as `egg: 50` was actually `60` in
`catalog.json`.

**How to apply:**

- For every "we did X / the value is Y / this was removed" claim, open the
  authority (`git show <sha>`, the schema, the config) and confirm before it
  ships. A plausible number copied from a draft is still a fabrication if it's
  wrong.
- Prefer phrasings that stay true under future change ("reduced the model
  count by one") over brittle absolutes ("from 20 to 19") when the absolute
  isn't load-bearing.
- The LaTeX-specific facets of this rule (academic-integrity authorship,
  the thesis verification workflow) live in `24_documentation-latex.md`.

## Related

- `24_documentation-latex.md` — LaTeX/thesis instances: render-to-verify,
  overfull localization, proposal-vs-disk pitfalls, dist/ build output.
- `08_e2e.md` — SSR cold-start as a first-class test; green-unit ≠ green-e2e.
- `17_analog-ssr-ssg.md` — build-config crashes where the obvious lever isn't
  the cause.
- `09_git.md` — "Investigate before deleting" (`git log -p -- <file>`): the
  same source-over-assumption discipline applied to file deletion.
