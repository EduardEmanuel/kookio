# Twemoji Graphics

The SVG files in this directory are sourced from [jdecked/twemoji](https://github.com/jdecked/twemoji) (the community-maintained fork of the original Twitter Twemoji project, which is now archived).

## License

Graphics are licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/). See `LICENSE-CC-BY-4.0` in this directory for the full license text.

## Attribution

> Copyright 2020 Twitter, Inc and other contributors
> Code licensed under the MIT License: https://opensource.org/licenses/MIT
> Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/

## How files get here

This directory is managed by `scripts/build-twemoji.ts`. The script scans the codebase for emoji usage (template literals in `*.html`, `emoji:` keys in fixtures, `<kookio-emoji char="...">` references), maps each to the Twemoji filename convention (`hex-codepoints.svg` with `U+FE0F` stripped unless the sequence contains a ZWJ), and downloads any missing SVGs from `cdn.jsdelivr.net/gh/jdecked/twemoji@<version>`.

Run `npm run build:twemoji` after adding or removing an emoji anywhere in the app. CI runs `npm run build:twemoji:check` and fails if the on-disk set drifts from what the codebase needs.

## In-app attribution

The CC-BY 4.0 license requires user-visible attribution. The site footer must include a link to jdecked/twemoji and the license URL.
