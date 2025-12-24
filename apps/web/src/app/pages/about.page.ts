import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kookio-about-page',
  template: `
    <section class="prose mx-auto p-6">
      <h1>About Kookio</h1>
      <p>Minimal SSG page prerendered by Analog.</p>
    </section>
  `,
})
export default class AboutPage {}