"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "method.html"), "utf8");
const cards = [...html.matchAll(/<article data-method-id="([^"]+)">([\s\S]*?)<\/article>/g)];
assert.equal(cards.length, 14, "the method register must document all fourteen labs");
assert.equal(new Set(cards.map((match) => match[1])).size, 14, "method ids must be unique");
for (const [match, id, body] of cards) {
  assert.match(body, /<dt>Measures<\/dt>/, `${id} must state what it measures`);
  assert.match(body, /<dt>Does not measure<\/dt>/, `${id} must state what it does not measure`);
  assert.match(body, /<dt>Flags only<\/dt>/, `${id} must limit its flags`);
  assert.ok(body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").length >= 250, `${id} needs a substantive public method note`);
}
assert.match(html, /selected ÷ offered/, "the method page must define the shared denominator");
assert.match(html, /not automatically a contradiction/, "the method page must limit tension language");
assert.match(html, /No hidden model or AI/, "the method page must disclose deterministic coding");
assert.match(html, /Passing an audit shows that the implementation matches its declared logic—not that the philosophical categories are complete or true/, "the page must distinguish software verification from philosophical proof");
assert.equal((html.match(/<h1\b/g) || []).length, 1, "the method page must have one primary heading");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "the method page must not reuse ids");
console.log("Method audit passed: fourteen lab claim registers, six shared rules, bounded terminology, privacy, and audit limits verified.");
