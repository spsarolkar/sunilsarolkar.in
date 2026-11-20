import test from "node:test";
import assert from "node:assert/strict";
import { normaliseBadges, loadCredlyBadges, CREDLY_FEED_URL } from "../app/components/credlyData.ts";

const record = {
  name: "Build with Gemini", issuer: "Google Cloud",
  url: "https://www.credly.com/badges/6588b112-2abc-49fe-a0b5-1cfc25958b33",
  image: "https://images.credly.com/images/test/image.png", issued: "",
};

test("a newly earned badge is loaded from the maintained feed", async () => {
  let request;
  const fresh = { ...record, name: "Newly earned badge" };
  const badges = await loadCredlyBadges(async (url, options) => {
    request = { url, options };
    return new Response(JSON.stringify([fresh]));
  });
  assert.equal(badges[0].name, fresh.name);
  assert.equal(request.url, CREDLY_FEED_URL);
  assert.equal(request.options.cache, "no-store");
  assert.equal(request.options.credentials, "omit");
});

test("empty or malformed feeds cannot replace the saved gallery", async () => {
  for (const value of [[], {}, null, [{ name: "incomplete" }], [record, { name: "incomplete" }]]) {
    await assert.rejects(loadCredlyBadges(async () => new Response(JSON.stringify(value))));
  }
  await assert.rejects(loadCredlyBadges(async () => new Response("unavailable", { status: 503 })));
  await assert.rejects(loadCredlyBadges(async () => { throw new Error("Offline"); }));
});

test("unsafe credential and image URLs are rejected", () => {
  for (const bad of ["javascript:alert(1)", "https://example.com/badges/test", "https://www.credly.com.evil.test/badges/test"]) {
    assert.equal(normaliseBadges([{ ...record, url: bad }]).length, 0);
  }
  assert.equal(normaliseBadges([{ ...record, image: "data:image/svg+xml,<svg/>" }]).length, 0);
});

test("root artwork resolves to the professional site and duplicate records collapse", () => {
  const badge = { ...record, image340: "/assets/badges/official.png", issued: "2025-08-03", issuedLabel: "3 August 2025" };
  const result = normaliseBadges([badge, { ...badge, url: badge.url + "/public_url" }]);
  assert.equal(result.length, 1);
  assert.equal(result[0].image, "https://spsarolkar.github.io/assets/badges/official.png");
  assert.equal(result[0].issuedLabel, "3 August 2025");
});
