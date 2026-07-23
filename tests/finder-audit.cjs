"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "find.js"), "utf8");
const html = fs.readFileSync(path.join(root, "find.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(`${source.slice(0, source.indexOf("const finderState"))};globalThis.audit={FINDER_LABS,FINDER_QUESTIONS};`, context);
const { FINDER_LABS, FINDER_QUESTIONS } = context.audit;
assert.equal(Object.keys(FINDER_LABS).length, 14, "the finder must route across all fourteen labs");
assert.equal(FINDER_QUESTIONS.length, 4, "the finder must remain a four-question, roughly sixty-second route");
assert.equal(new Set(FINDER_QUESTIONS.map((question) => question.id)).size, 4, "finder question ids must be unique");
for (const question of FINDER_QUESTIONS) {
  assert.ok(question.prompt.length >= 45, `${question.id} needs a clear prompt`);
  assert.ok(question.context.length >= 75, `${question.id} needs scope context`);
  assert.ok(question.choices.length >= 5, `${question.id} needs broad but manageable choices`);
  for (const choice of question.choices) {
    assert.ok(choice.label.length >= 50, `${question.id}/${choice.id} needs a self-contained label`);
    assert.ok(Object.keys(choice.weights).length >= 2, `${question.id}/${choice.id} must support more than one possible route`);
    Object.keys(choice.weights).forEach((labId) => assert.ok(FINDER_LABS[labId], `${question.id}/${choice.id} points to unknown ${labId}`));
  }
}
for (const [labId, lab] of Object.entries(FINDER_LABS)) {
  assert.match(lab.href, /\.html$/, `${labId} needs a local route`);
  assert.ok(lab.question.length >= 35 && lab.copy.length >= 80, `${labId} needs a useful result explanation`);
  const reachable = FINDER_QUESTIONS.some((question) => question.choices.some((choice) => choice.weights[labId]));
  assert.equal(reachable, true, `${labId} must be reachable from at least one answer`);
}
let paths = 0;
function exhaust(index, scores = Object.fromEntries(Object.keys(FINDER_LABS).map((id) => [id, 0]))) {
  if (index === FINDER_QUESTIONS.length) {
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1] || Object.keys(FINDER_LABS).indexOf(a[0]) - Object.keys(FINDER_LABS).indexOf(b[0]));
    assert.equal(ranked.length, 14); assert.ok(ranked[0][1] > 0, "each completed path needs a positive recommendation"); paths += 1; return;
  }
  FINDER_QUESTIONS[index].choices.forEach((choice) => {
    const next = { ...scores }; Object.entries(choice.weights).forEach(([labId, points]) => { next[labId] += points; }); exhaust(index + 1, next);
  });
}
exhaust(0);
assert.equal(paths, FINDER_QUESTIONS.reduce((total, question) => total * question.choices.length, 1), "every finder path must be audited");
assert.match(html, /This is routing—not a personality test or diagnosis/, "the finder must state its limit");
assert.match(html, /<fieldset id="finderChoices"/, "the finder must use native grouped choices");
assert.match(html, /id="finderNext"[^>]+disabled/, "the finder must require an explicit next action");
assert.match(html, /role="progressbar"/, "finder progress must be accessible");
assert.match(css, /\.finder-results-hero\s*\{[^}]*padding:[^;]*clamp\(26px,\s*6vw,\s*96px\)/s, "finder results must retain a responsive left and right margin");
assert.match(css, /\.finder-results-hero h1\s*\{[^}]*max-width:\s*1050px/s, "the finder result heading must stay within a readable measure");
console.log(`Finder audit passed: ${paths} complete routes, fourteen reachable labs, native controls, deterministic ranking, and non-diagnostic framing verified.`);
