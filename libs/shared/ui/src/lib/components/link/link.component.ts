import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kookio-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
})
export class KookioLinkComponent {
  // optional: SSR/SSG paths may render without an injected router.
  private readonly router = inject(Router, { optional: true });

  readonly to = input.required<string>();

  protected readonly isRoute = computed<boolean>(() =>
    this.to().startsWith('/'),
  );

  protected readonly isExternal = computed<boolean>(() =>
    /^https?:\/\//i.test(this.to()),
  );

  protected readonly targetAttr = computed<string | null>(() =>
    this.isExternal() ? '_blank' : null,
  );

  protected readonly relAttr = computed<string | null>(() =>
    this.isExternal() ? 'noopener noreferrer' : null,
  );

  protected readonly onClick = (event: MouseEvent): void => {
    if (!this.isRoute()) return;
    // Honour cmd/ctrl/shift/alt click — let the browser open in a new tab.
    if (event.button !== 0) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    if (!this.router) return;
    event.preventDefault();
    void this.router.navigateByUrl(this.to());
  };
}
