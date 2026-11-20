// Inspect the actual Cloudflare build, including the no-JavaScript fallback.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

for (const [page, count] of [["index.html", 6], ["cv.html", 20]]) {
  test(`built ${page} contains ${count} visible saved Credly cards`, () => {
    const html = readFileSync(new URL(`../.vercel/output/static/${page}`, import.meta.url), "utf8");
    const section = html.split('id="credly-badges"')[1]?.split("</section>")[0];
    assert.ok(section, "Credly gallery must appear in the published HTML");
    assert.equal((section.match(/class="credly-card"/g) || []).length, count);
    assert.ok(!section.includes("<details"), "Collection must remain visible");
    assert.ok(section.includes("https://www.credly.com/badges/"));
    assert.ok(section.includes("https://www.credly.com/users/sunil-sarolkar/badges"));
  });
}
