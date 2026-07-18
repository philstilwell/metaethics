"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "suite-map.js"), "utf8");
const mapHtml = fs.readFileSync(path.join(root, "map.html"), "utf8");
const labPages = ["profile.html", "wrong.html", "obligation.html", "after.html", "decoder.html", "genealogy.html", "build.html", "criticize.html", "blame.html", "reasons.html"];
const storage = new Map();
const context = {
  localStorage: {
    getItem: (key) => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  },
  document: {
    body: { dataset: {} },
    querySelector: () => null,
    addEventListener: () => {},
  },
  window: {},
  MutationObserver: function MutationObserver() {},
};

vm.createContext(context);
vm.runInContext(source, context);
const api = context.window.MoralCompassSuiteMap;

assert.ok(api, "the shared map API must be available");
assert.equal(Object.keys(api.LABS).length, 10, "the map must know all ten labs");
assert.equal(new Set(Object.values(api.LABS).map((lab) => lab.href)).size, 10, "each lab must have one unique route");
for (const [labId, lab] of Object.entries(api.LABS)) {
  const labHtml = fs.readFileSync(path.join(root, lab.href), "utf8");
  assert.equal(lab.metrics.length, 3, `${labId} must save exactly three transparent summary metrics`);
  for (const selector of [lab.resultSelector, lab.headlineSelector, lab.summarySelector, ...lab.metrics.map((metric) => metric[1])]) {
    assert.match(selector, /^#[A-Za-z0-9_-]+$/, `${labId} must use a stable id selector for ${selector}`);
    assert.match(labHtml, new RegExp(`id=["']${selector.slice(1)}["']`), `${lab.href} must contain ${selector}`);
  }
}

assert.equal(api.writeMap({ profile: { headline: "Test", summary: "Summary", metrics: [{ value: "A" }, { value: "B" }, { value: "C" }], savedAt: "2026-07-18T00:00:00.000Z" } }), true, "map writes must succeed when local storage is available");
assert.equal(api.readMap().profile.headline, "Test", "saved data must round-trip locally");
assert.deepEqual(Object.keys(api.sanitizeMap({ unknown: { metrics: [] }, profile: "broken" })), [], "unknown or malformed local records must be ignored safely");
assert.equal(api.removeResult("profile"), true, "one saved result must be removable");
assert.equal(api.readMap().profile, undefined, "removed results must disappear");
assert.equal(api.clearMap(), true, "the whole local map must be erasable");
assert.deepEqual(Object.keys(api.readMap()), [], "erasing must leave an empty map");

for (const page of labPages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  assert.match(html, /data-lab-id="[^"]+"/, `${page} must identify its suite-map record`);
  assert.match(html, /<script src="suite-map\.js"><\/script>/, `${page} must load the opt-in map controls`);
  assert.match(html, /href="map\.html">My map<\/a>/, `${page} must link to the map`);
}

assert.match(mapHtml, /No final moral score/, "the map must reject a misleading suite-wide score");
assert.match(mapHtml, /Saved only on this device/, "the map must disclose local-only storage");
assert.match(mapHtml, /id="eraseMapButton"/, "the map must provide an erase-all control");
assert.match(mapHtml, /id="downloadMapButton"/, "the map must provide an export control");
assert.match(source, /not your full answers or AI prompt/, "the opt-in control must disclose its limited payload");

console.log("Suite-map audit passed: ten opt-in summaries, three transparent metrics each, local round-trip, export/erase controls, and no global score verified.");
