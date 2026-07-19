"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "book.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const assets = [
  "output/cover/the-objective-morality-project-front-cover.jpg",
  "output/pdf/the-objective-morality-project-with-cover.pdf",
  "output/pdf/the-objective-morality-project.pdf",
  "output/ebook/the-objective-morality-project.epub",
  "output/pdf/the-objective-morality-project-companion-workbook.pdf",
];

assert.equal((html.match(/<h1\b/g) || []).length, 1, "the book page must have one primary heading");
assert.match(html, /The comprehensive synthesis/, "the page must identify the book's role in the project");
assert.match(html, /The labs isolate the questions\. The book makes the whole journey\./, "the page must distinguish focused labs from the cumulative book");
assert.match(html, /No candidate returns with the full specification intact\./, "the page must state the cumulative result");
assert.match(html, /not a deductive proof that every logically possible objective moral fact is[\s\S]*?impossible/, "the page must preserve the conclusion's limit");
assert.match(html, /common or mutually legible emotions and values/, "the page must state the post-search public method");
assert.match(html, /528 pages/, "the page must state the current print length");
assert.match(html, /Prologue \+ 41 chapters/, "the page must state the complete narrative structure");
assert.equal((html.match(/<li class="book-part-card">/g) || []).length, 7, "the page must present all seven parts");
assert.equal((html.match(/<article class="book-edition-card(?: [^"]+)?">/g) || []).length, 4, "the page must offer four publication formats");
assert.doesNotMatch(html, /<script\b/, "the book page must remain a static, no-tracking document");
assert.match(html, /styles\.css\?v=20260719-book-margin/, "the book page must bypass stale pre-book stylesheets");

const cover = html.match(/<img[\s\S]*?front-cover\.jpg[\s\S]*?>/);
assert.ok(cover, "the finished cover must appear on the book page");
assert.match(cover[0], /alt="[^"]+"/, "the cover must have meaningful alternative text");

for (const asset of assets) {
  const assetPath = path.join(root, asset);
  assert.match(html, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `the page must link to ${asset}`);
  assert.ok(fs.existsSync(assetPath), `${asset} must exist`);
  assert.ok(fs.statSync(assetPath).size > 100000, `${asset} must contain a complete publication artifact`);
}

for (const href of [...html.matchAll(/href="([^"#][^"]*)"/g)].map((match) => match[1])) {
  if (/^(?:https?:|mailto:|data:)/.test(href)) continue;
  const target = href.split(/[?#]/)[0];
  assert.ok(fs.existsSync(path.join(root, target)), `book.html links to missing local target ${target}`);
}

assert.match(css, /\.book-hero\s*\{[^}]*grid-template-columns:/s, "the book page must have a deliberate wide hero");
assert.match(css, /\.book-page main\s*\{[^}]*margin:\s*var\(--book-page-gutter\)/s, "the book page must retain an explicit outer frame");
assert.match(css, /\.book-part-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s, "the seven-part journey must use a wide grid");
assert.match(css, /\.book-edition-grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,/s, "the edition choices must use a wide grid");
assert.match(css, /@media \(max-width: 700px\)[\s\S]*?\.book-part-grid,[\s\S]*?grid-template-columns:\s*1fr/s, "the journey must collapse to one column on narrow screens");

console.log("Book audit passed: comprehensive role, bounded conclusion, seven-part journey, four complete formats, cover accessibility, responsive layout, and local publication links verified.");
