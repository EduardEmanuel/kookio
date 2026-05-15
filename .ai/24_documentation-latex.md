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
