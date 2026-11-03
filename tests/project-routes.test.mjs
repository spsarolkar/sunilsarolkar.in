// Run after npm run pages:build; these assertions inspect the actual build output.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../.next/prerender-manifest.json', import.meta.url)));
const dedicated = [
  ['vehicle-telemetry', ['id="demo"', 'https://www.youtube.com/embed/X3aA26rKwIs', 'id="architecture"']],
  ['ISL-IndianSignLanguageTranslation', ['id="visuals"', 'Loading the expression-count snapshot', 'id="videos"']],
];

for (const [slug, markers] of dedicated) {
  test(`built ${slug} keeps its dedicated page and media`, () => {
    const route = `/projects/${slug}`;
    assert.equal(manifest.routes[route]?.srcRoute, route, 'The generic project route must not overwrite a dedicated page');
    const html = readFileSync(new URL(`../.next/server/app/projects/${slug}.html`, import.meta.url), 'utf8');
    for (const marker of markers) assert.ok(html.includes(marker), `Missing dedicated content: ${marker}`);
  });
}
