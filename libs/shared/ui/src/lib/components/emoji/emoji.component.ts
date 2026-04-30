import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

const VARIATION_SELECTOR_16 = 0xfe0f;
const ZERO_WIDTH_JOINER = 0x200d;

// Match jdecked/twemoji's filename convention: hex-lowercase codepoints joined
// by `-`, with U+FE0F stripped unless the sequence contains a ZWJ (in which
// case all selectors are kept verbatim — required for joiner sequences like
// 👨‍👩‍👧). Mirrors the logic in scripts/build-twemoji.ts; the script keeps the
// SVG set on disk in sync with what this component requests at runtime.
const toTwemojiCodepoint = (emoji: string): string => {
  const codepoints = Array.from(emoji)
    .map((c) => c.codePointAt(0))
    .filter((cp): cp is number => cp !== undefined);
  const hasZWJ = codepoints.includes(ZERO_WIDTH_JOINER);
  const filtered = hasZWJ
    ? codepoints
    : codepoints.filter((cp) => cp !== VARIATION_SELECTOR_16);
  return filtered.map((cp) => cp.toString(16)).join('-');
};

@Component({
  selector: 'kookio-emoji',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './emoji.component.html',
  styleUrl: './emoji.component.scss',
})
export class KookioEmojiComponent {
  readonly char = input.required<string>();

  // Default to empty alt (decorative). Every current callsite renders the
  // emoji next to a label that already carries the meaning (e.g. "🌱 Vegan"),
  // so the emoji is purely illustrative. Pass a non-empty `alt` only when the
  // emoji is the sole carrier of meaning for screen-reader users.
  readonly alt = input('');
  readonly size = input(20);

  protected readonly src = computed(
    () => `/icons/twemoji/${toTwemojiCodepoint(this.char())}.svg`,
  );
}
