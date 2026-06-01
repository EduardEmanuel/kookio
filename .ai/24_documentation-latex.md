# LaTeX Documentation Guidelines

> **Status: Active** — Applies to the `thesis/` submodule. LaTeX sources live under `thesis/ro/`, compiled with LuaLaTeX via `npx tsx thesis/build.ts ro`. The conventions below encode hard-won lessons from getting an academic thesis through university format compliance without typographic surprises.

## Stack

| Component                | Role                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- |
| LuaLaTeX (TeX Live 2025) | Compilation engine — required for `fontspec` system-font loading and unicode handling |
| `polyglossia`            | Multilingual support; `\setmainlanguage{romanian}` for diacritics                     |
| `fontspec`               | OpenType font loading (system fonts)                                                  |
| TeX Gyre Termes          | Body font — metrically equivalent open-source clone of Times New Roman                |
| `setspace`               | Line spacing control (`\onehalfspacing`, `\singlespacing`)                            |
| `geometry`               | Margins and page geometry                                                             |
| `fancyhdr`               | Custom header/footer page styles                                                      |
| `biblatex` + `biber`     | Bibliography (numeric style)                                                          |
| `glossaries-extra`       | Glossary and acronym management                                                       |
| `appendix`               | Appendix numbering with letter labels (A, B, …)                                       |
| `microtype`              | Subtle typographic refinements                                                        |

## File structure

```text
thesis/
├── ro/
│   ├── kookio_thesis.tex   # master file — preamble, package loads, structure
│   ├── 0-title.tex         # title page (manual; see below)
│   ├── 0-abstract.tex      # abstract / Rezumat
│   ├── 1-introducere.tex   # Introducere
│   ├── 2-preliminarii.tex  # Preliminarii (theoretical context)
│   ├── 1-implementare.tex  # main contribution chapter
│   ├── 3-concluzii.tex     # Concluzii + future directions
│   ├── 4-anexe.tex         # appendices
│   ├── 5-glosar.tex        # glossary entries
│   ├── bibliography.bib    # BibLaTeX sources
│   └── images/             # figures
├── build.ts                # compile wrapper (TypeScript)
└── dist/                   # output PDFs (with timestamped backups)
```

## Document class and format requirements

Most university computer-science thesis guidelines converge on the following format. Pick the document class and settings to match:

- **`\documentclass[12pt]{article}`** — not `report`. The faculty rule "chapters do not start on new pages" is incompatible with `report`'s `\chapter` which forces page breaks. In `article`, top-level structure uses `\section` instead.
- **Hierarchy mapping**: `\section` = numbered chapter (e.g., "1 Introducere"); `\subsection` = sub-chapter ("3.2 Implementarea aplicației"); `\subsubsection` = detail ("3.2.6 Randare server-side"). Never use `\chapter`.
- **Body font**: `\setmainfont{TeX Gyre Termes}` — open-source clone of Times New Roman. Faculty guidelines typically specify Times New Roman 12pt; Termes is metrically equivalent and ships with every modern TeX distribution.
- **Line spacing**: `\onehalfspacing` from `setspace`. The 1.5-line rule applies to body text only.
- **Margins**: `\usepackage[a4paper, margin=2.5cm]{geometry}`.
- **Page numbering**: roman numerals for front-matter (abstract, TOC), arabic from the first body chapter onward. Switch via `\pagenumbering{roman}` → content → `\pagenumbering{arabic}\setcounter{page}{1}`.

## Format compliance checklist

Cross-check against the specific university's guidelines, but these are common requirements:

- **Body page count**: typically 20 pages for bachelor's, 30 for master's. Excluded from count: covers, abstract, table of contents, bibliography, appendices, glossary. Justification for overage goes in supervisor's report.
- **Bilingual abstract**: usually required in both Romanian and English.
- **Numbered hierarchical sections**: `1`, `1.1`, `1.1.1` style.
- **Single citation style** consistent throughout (e.g., biblatex `numeric`).
- **Each figure and table** has a number, title, and caption (`Figura X.Y`, `Tabel X.Y`).
- **Web sources** in bibliography require authors, title, URL, and access date.
- **No author-less references** except official documentation.
- **Diacritics** must use proper Romanian forms (ă, â, î, ș, ț with comma-below, not cedilla). `polyglossia` + LuaLaTeX handle this natively.

## Known quirks and fixes

### `titlepage` env + `\restoregeometry` leakage

The `titlepage` environment in `article` class sets `\thispagestyle{empty}` for the title page. When `\restoregeometry` (from the `geometry` package) is called inside the env to revert margin changes, its internal `\clearpage` triggers page output and, via interaction with the env's mechanism, leaks the `empty` page style onto the **next** page — the one that should show the first numbered front-matter (roman "i").

**Symptom**: the page after the title (abstract at "i") shows no footer number, while subsequent pages ("ii" onward) render correctly. Inconsistent numbering visible to the reader.

**Fix**: bypass the `titlepage` environment with explicit manual handling:

```latex
% 0-title.tex — do NOT use \begin{titlepage}...\end{titlepage}
\thispagestyle{empty}
\newgeometry{left=2cm,right=2cm,top=1cm,bottom=1cm}
% [title content: logos, headings, author, supervisor, date]
\clearpage
\restoregeometry
```

The explicit `\clearpage` before `\restoregeometry` ships the title page with the correct `empty` style; the next page picks up the global `\pagestyle{fancy}` for proper numbering.

### TOC clipping when body uses `\onehalfspacing`

`\onehalfspacing` applied globally for the 1.5-line body rule also affects the TOC. With many entries, TOC lines pack against the bottom margin and the last line on a page can overflow `\textheight`, clipping the descenders.

**Fix**: wrap reference apparatus (TOC, glossary, bibliography) in a group with `\singlespacing` and zero `\parskip`:

```latex
\begingroup
\singlespacing
\setlength{\parskip}{0pt}
\tableofcontents
\endgroup
```

The 1.5-line rule applies to body text. Reference apparatus is conventionally tighter — universities don't expect TOCs typeset at 1.5-line spacing.

### `\flushbottom` overflow on TOC and back-matter

Default `\flushbottom` stretches glue to fill each page to `\textheight`. When content nearly fills a page, LaTeX may accept a small overflow rather than break earlier, causing descenders to be clipped at the bottom margin.

**Fix**: `\raggedbottom` for TOC, glossary, bibliography. Body keeps `\flushbottom`:

```latex
\raggedbottom
\begingroup
\singlespacing
\setlength{\parskip}{0pt}
\tableofcontents
\endgroup
\flushbottom  % body text uses standard page filling
```

`\raggedbottom` makes LaTeX break earlier and leave white space at the bottom — visually clean and prevents clipping.

### TOC depth — section + subsection only

Set `\setcounter{tocdepth}{2}` to limit TOC to section + subsection (chapter + sub-chapter in our mapping). University guidelines typically require the table of contents to list "chapter and sub-chapter titles" — `\subsubsection` is detail level, not expected in TOC. Including all levels also creates layout pressure that compounds the clipping issues above.

### Abstract and Cuprins on separate pages

Force a page break between abstract and TOC so each gets a clean page:

```latex
\input{0-abstract.tex}
\clearpage  % Rezumat on page i, Cuprins on page ii
\setcounter{tocdepth}{2}
\raggedbottom
\begingroup
\singlespacing
\setlength{\parskip}{0pt}
\tableofcontents
\endgroup
\flushbottom
```

Without `\clearpage`, both compete for the same page and layout fights ensue (TOC entries land at page boundaries, get clipped, etc.).

### Appendix headers as "Anexa A:" instead of bare letter

The `appendix` package by default labels appendix sections with a bare letter (A, B, …). To get the "Anexa A:" prefix in body headings and TOC, use the `title` and `titletoc` options and override the relevant strings:

```latex
\usepackage[toc,title,titletoc]{appendix}
\renewcommand{\appendixname}{Anexa}
\renewcommand{\appendixtocname}{Anexe}    % section header in TOC
\renewcommand{\appendixpagename}{Anexe}   % if \appendixpage is used
```

In-text cross-references like `Anexa~\ref{ch:appendix-manifest}` produce "Anexa B" correctly because `\ref` returns just the counter letter; the "Anexa" prefix in body headings comes from the package's title formatting.

### Inflexible `\gls{}` boxes causing `Underfull \hbox` warnings

`\gls{...}` from `glossaries-extra` produces hyperlinked boxes that cannot be hyphenated or broken across lines. Packing three or more such boxes in a single sentence commonly produces `Underfull \hbox` warnings — cosmetically, slight spacing irregularities in justified paragraphs.

**Fix**: reword the affected paragraph to space the `\gls{}` boxes apart, or add commas and clause boundaries that give LaTeX flexible break points between them. Avoid `\texttt{}` on words that are also `\gls`-defined — both produce inflexible boxes; combining them compounds the problem.

### Page numbering switch sequence

`\pagenumbering{roman}` and `\pagenumbering{arabic}` reset the page counter to 1. Place these between input blocks for clean section boundaries:

```latex
\begin{document}
\input{0-title.tex}      % no page number

\pagenumbering{roman}    % counter reset to 1, displayed as "i"
\setcounter{page}{1}     % redundant but explicit
\pagestyle{fancy}        % default style for following pages

\input{0-abstract.tex}
\clearpage
% [TOC, glossary, …]

\clearpage
\pagenumbering{arabic}   % counter reset, displayed as "1"
\setcounter{page}{1}
\input{1-introducere.tex}
\input{2-preliminarii.tex}
% [rest of body]
```

## Writing workflow

Academic integrity requires the thesis text to be the student's own work. Tooling for spell-check, grammar correction, formatting helpers, search, and similarity checks is permitted by most university plagiarism procedures. Text generated wholesale by external tools and presented as the student's own work counts as plagiarism.

Pattern to follow:

1. Write a draft of each section in your own words first, even if rough.
2. Apply tools for grammar, phrasing suggestions, structural feedback, citation lookup.
3. Review, reject, or rewrite the suggestions yourself.
4. The final text reflects authentic authorship with polish.

**Similarity check (Turnitin and equivalents)**: most universities require submission below a similarity threshold (commonly 30%); above-threshold cases need supervisor justification and committee approval. Heavy paraphrase of official documentation (framework docs, package READMEs) is a common false-positive trigger. Cite sources properly; the bibliography is typically excluded from similarity calculation.

## Build commands

The thesis subproject compiles via a TypeScript wrapper around LuaLaTeX:

```bash
# From thesis/ directory:

# Full compile with bibliography + glossaries (default)
npx tsx build.ts ro

# Faster compile, skip bibliography (drafts only)
npx tsx build.ts ro --draft

# Delete auxiliary files only
npx tsx build.ts ro --delete
```

The script runs `lualatex` once, then `makeglossaries` + `biber`, then `lualatex` again. Cross-references and bibliography typically stabilize after 2–3 passes; if labels remain undefined or pagination shifts on rebuild, run `lualatex` manually once more or just rerun the build.

**Output**: `thesis/dist/kookio_thesis_ro.pdf`. The existing PDF is backed up with a timestamp before being overwritten.

## File responsibilities

| File                 | Purpose                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `kookio_thesis.tex`  | Master — preamble, packages, font setup, page styles, `\input` structure                  |
| `0-title.tex`        | Title page (manual `\thispagestyle{empty}` + content + `\clearpage` + `\restoregeometry`) |
| `0-abstract.tex`     | Abstract (Rezumat) — keep concise, bilingual when required                                |
| `1-introducere.tex`  | Introducere — motivation, scope, contribution summary                                     |
| `2-preliminarii.tex` | Preliminarii — theoretical/technical context                                              |
| `1-implementare.tex` | Main contribution — implementation, evaluation, results                                   |
| `3-concluzii.tex`    | Concluzii — summary, future directions                                                    |
| `4-anexe.tex`        | Appendices (inside `\begin{appendices}` block in master)                                  |
| `5-glosar.tex`       | Glossary entries (`\newglossaryentry`)                                                    |
| `bibliography.bib`   | BibLaTeX sources                                                                          |

## General rules

- **Hierarchy consistency**: `\section` = top-level chapter, `\subsection` = sub-chapter, `\subsubsection` = detail. Never use `\chapter` in `article` class.
- **Cross-references**: use `\ref{label}` plus contextual word (e.g., `secțiunea~\ref{ch:impl}`). The label name is arbitrary; LaTeX produces the counter value.
- **Single source of truth for metadata**: define `\newcommand` in the preamble for author, supervisor, title, date — reference everywhere.
- **Romanian diacritics**: ensure proper characters (ă, â, î, ș, ț with comma-below, not cedilla). Wrong forms break `polyglossia` hyphenation and look unprofessional.
- **After package upgrades or build-chain changes**: full clean rebuild via `npx tsx build.ts ro --delete` then `npx tsx build.ts ro`.
- **Reference apparatus stays compact**: TOC, glossary, bibliography use `\singlespacing` + `\raggedbottom`. Body uses `\onehalfspacing` + `\flushbottom`.
- **Voice and person**: first-person Romanian ("am ales", "mi-am propus", "am organizat") is reserved for paragraphs that _motivate a decision or narrate the author's reasoning path_ — typically chapter openings, thematic-lead paragraphs, or motivation sections. Roughly four out of seven body paragraphs is a healthy ceiling; more than that overdoes the voice and weakens the academic register. Descriptive technical content — what a library does, how a mechanism behaves, what a configuration option means — uses impersonal or passive voice ("aplicația folosește", "configurarea se face", "rutele sunt definite"). Mixing voices within a single paragraph is acceptable when the paragraph itself opens with motivation and continues into technical elaboration; flipping mid-paragraph for no rhetorical reason is not. Concrete heuristic for technical subsections (e.g., "Persistență: Prisma și CockroachDB"): if the paragraph describes _what the technology does in the project_, write it impersonally; if it explains _why I picked it_, first person is appropriate.
- **Long `\texttt{}` blocks need explicit break opportunities**: monospaced content inside `\texttt{}` has no automatic line-break points — LaTeX treats the whole block as one indivisible token. When the block is long enough to overflow the right margin (typically 30+ characters with body line width), the line extends past the margin instead of wrapping. Add `\allowbreak` at logical boundaries inside the block: after each `/` in file paths, after each `(` in compound function names, after `.` in dotted identifiers. The macro is invisible — it doesn't force a break, it only tells LaTeX one is acceptable here if needed. Triggers: file paths with three or more segments (e.g., `\texttt{apps/\allowbreak web/\allowbreak src/\allowbreak app/\allowbreak pages/}`); nested or compound function calls (e.g., `\texttt{provideClientHydration(\allowbreak withEventReplay())}`); dotted attribute chains over ~25 characters. Apply when overflow is observed during a render pass, not preventively across every `\texttt{}` in the source — short paths and identifiers don't need the macro and the source noise outweighs the benefit. After applying, re-render the affected page to confirm LaTeX actually used one of the offered break points.

## Diagnosing layout issues — render, localize, don't tune blind

The general method is in `25_debugging.md` ("when a metric is invariant
across changes, you're pulling the wrong lever" + "verify empirically, not
just green-compiler"). The LaTeX-specific tooling and traps:

- **A green compile (exit 0) proves nothing about layout.** `lualatex`
  returns 0 with whitespace holes, phantom overfull boxes, and clipped
  descenders all present. Render the affected page to PNG and inspect it
  before proposing the next fix (see "Visually verify LaTeX layout" above and
  the `gs` recipe in memory). A `\thispagestyle` leak, a `[H]` float that
  bumped to the next page leaving a hole, and an unbreakable box all look
  identical to the compiler: fine.

- **Locate an overfull box with `\overfullrule=5mm`** (set just before
  `\begin{document}`). The offending box gets a black bar in the PDF; find
  the page that carries it. **If no page carries it, the box is an
  end-of-run / teardown artifact, not page content.** Read the `.log`: an
  `Overfull \hbox` reported "at lines N--N" where N is the master file's
  `\end{document}` line, appearing _after_ `(./kookio_thesis.aux)` is re-read,
  is emitted by the final flush — not by any paragraph. Real instance — a
  256.75589pt box that stayed byte-identical across five `biburl`-penalty /
  `\UrlBreaks` changes turned out to be `\let\clearpage\relax` at
  `\end{document}` neutering the final flush. Removing the hack (and the now
  redundant trailing `\clearpage`) cleared the box _and_ dropped a trailing
  blank page — `\end{document}`'s own flush ships the last page cleanly
  without either workaround.

- **`[H]` float that doesn't fit → page-bottom hole.** A `table[H]` too tall
  to fit under the preceding text is forced to the next page, leaving the
  current page mostly empty with the heading and intro stranded at the top.
  Switch to `[htbp]` so the float moves naturally and following text fills the
  gap. `[H]` is right only for floats that must sit exactly inline _and_ fit;
  it is the wrong tool for a tall table near a page boundary.

## Verifying a pasted chapter proposal against the codebase

When fact-checking a pasted `.tex` proposal (a rewrite/expansion drafted with
AI help) against the kookio repo, the general "trust the source, not the
summary" and "verify claims before asserting" rules in `25_debugging.md`
apply. LaTeX/thesis-specific pitfalls that cost real time:

- **Separate claims about the code from claims about the document's current
  state.** Code claims (paths, signatures, schema constraints, seed values,
  `git log` history) are real — verify them. Doc-state claims (a label is
  dangling, a section is "not documented", a macro is "undefined") are often
  **false positives**: the proposal is an _unapplied_ expansion, so an agent
  reading the on-disk `.tex` reports the old state. Read the live file before
  trusting either side.
- **`\newacronym` multi-line definitions are invisible to single-line grep.**
  The `\newacronym[longplural=…]\n  {key}{…}{…}` form makes a naive
  `grep '\newacronym{key}'` report the acronym as undefined when it is in fact
  defined. Confirm with a form-tolerant search before claiming "missing".
- **The build moves the PDF.** `npx tsx thesis/build.ts ro` runs
  lualatex → makeglossaries → biber → lualatex×2 and writes the result to
  **`thesis/dist/kookio_thesis_ro.pdf`** (timestamped backup first). A manual
  `lualatex` in `thesis/ro/` leaves its PDF _there_ — so the file the user is
  viewing (the `dist/` one) is stale until you copy it over. Render from, and
  copy to, `dist/` to match what the user sees.
- **`tsx` may not be on PATH;** when iterating, run the toolchain directly
  with `export PATH="/Library/TeX/texbin:$PATH"` and call `lualatex` /
  `makeglossaries` / `biber` by hand.
- **The conclusions chapter is `4-concluzii.tex`** (it carries
  `\label{cap:concluzii}` and is the one `\input` by the master). A paste
  headed `% 3-concluzii.tex` is a misnomer — writing to that name creates an
  orphan nothing includes.
- **PDF page vs printed folio offset ≈ 2** (roman-numbered front matter), so
  add ~2 when targeting a folio with `gs -dFirstPage`.
- **Academic integrity:** the thesis is the student's own work and neither its
  text nor its commit history may carry any trace of AI involvement (same rule
  as commit messages in `09_git.md`). Verify every "we did X" claim against
  `git log` / the schema rather than copying a drafted number — one proposal
  asserted "models 20 → 19" (wrong — 20 now, a model was added later) and
  `egg: 50` (actually `60` in `catalog.json`).
