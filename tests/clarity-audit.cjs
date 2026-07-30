"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const labs = [
  "profile.html",
  "wrong.html",
  "obligation.html",
  "after.html",
  "decoder.html",
  "genealogy.html",
  "build.html",
  "criticize.html",
  "blame.html",
  "reasons.html",
  "evidence.html",
  "standing.html",
  "tradeoffs.html",
  "emotions.html",
];
const sharedPages = ["index.html", "find.html", "map.html", "method.html", "papers.html", "book.html"];
const readerFiles = [
  ...labs,
  ...sharedPages,
  "app.js",
  "wrong.js",
  "obligation.js",
  "after.js",
  "decoder.js",
  "genealogy.js",
  "build.js",
  "criticize.js",
  "blame.js",
  "reasons.js",
  "evidence-config.js",
  "standing-config.js",
  "tradeoffs-config.js",
  "emotions-config.js",
  "case-lab.js",
  "find.js",
  "map.js",
  "suite-map.js",
  "papers.js",
];

const combined = readerFiles
  .map((file) => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n");

const unexplainedPhrases = [
  "metaethical stance",
  "epistemic force",
  "normative force",
  "favoring relation",
  "exact seam",
  "design seams",
  "structural seam",
  "categorical property",
  "whole architecture",
  "metaethical map",
  "reason-giving force",
  "objective moral desert",
  "epistemological burden shift",
  "explains salience",
];

for (const phrase of unexplainedPhrases) {
  assert.ok(
    !combined.toLowerCase().includes(phrase),
    `reader-facing copy must replace or immediately unpack “${phrase}”`,
  );
}

for (const file of labs) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  assert.match(
    html,
    /<details|plain-explanation|question-explanation|meaning-definition/,
    `${file} must provide optional plain-language explanation`,
  );
  assert.match(
    html,
    /<script src="[^"]+\.js\?v=20260730-plain-language"/,
    `${file} must load the reviewed interactive copy with a cache-busting version`,
  );
}

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(home, /A claim meant to remain true even when the speaker, the audience, or an entire community rejects it/, "the home glossary must explain independence from approval in ordinary language");
assert.match(home, /A fact or consideration that supports believing something/, "the home glossary must explain reasons for belief before naming the technical term");
assert.match(home, /its own interests matter—not only its usefulness/, "the home glossary must explain what counting for one’s own sake means");

const method = fs.readFileSync(path.join(root, "method.html"), "utf8");
assert.equal((method.match(/<dt>Shows<\/dt>/g) || []).length, 14, "every method card must say what the lab shows");
assert.equal((method.match(/<dt>Does not show<\/dt>/g) || []).length, 14, "every method card must state its limit");
assert.equal((method.match(/<dt>Compares only<\/dt>/g) || []).length, 14, "every method card must state the exact comparisons it makes");

console.log("Clarity audit passed: all fourteen labs provide explanations, shared pages define key terms plainly, and obsolete jargon has been removed.");
