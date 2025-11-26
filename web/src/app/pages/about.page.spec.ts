import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import AboutPage from './about.page';

describe('AboutPage', () => {
    let fixture: ComponentFixture<AboutPage>;
    let component: AboutPage;
    let el: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AboutPage],
        }).compileComponents();

        fixture = TestBed.createComponent(AboutPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
        el = fixture.nativeElement as HTMLElement;
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('creates the component instance', () => {
        expect(component).toBeTruthy();
    });

    it('renders the expected heading and paragraph', () => {
        const h1 = el.querySelector('h1');
        const p = el.querySelector('p');

        expect(h1).not.toBeNull();
        expect(h1?.textContent?.trim()).toBe('About Kookio');

        expect(p).not.toBeNull();
        expect(p?.textContent?.trim()).toBe('Minimal SSG page prerendered by Analog.');
    });
});