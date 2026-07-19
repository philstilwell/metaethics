"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const pages = ["index.html", "find.html", "method.html", "book.html", "profile.html", "obligation.html", "wrong.html", "after.html", "decoder.html", "genealogy.html", "build.html", "criticize.html", "blame.html", "reasons.html", "evidence.html", "standing.html", "tradeoffs.html", "emotions.html", "map.html", "papers.html"];
const toolLinks = ["profile.html", "wrong.html", "obligation.html", "after.html", "decoder.html", "genealogy.html", "build.html", "criticize.html", "blame.html", "reasons.html", "evidence.html", "standing.html", "tradeoffs.html", "emotions.html"];
const faviconFiles = ["favicon-32.png", "favicon.png", "favicon.ico", "apple-touch-icon.png"];

assert.match(html, /Fourteen labs\. Fourteen ways to examine moral thought\./, "the hub must state its fourteen-lab architecture");
assert.match(html, /They take apart one familiar moral sentence\./, "the hub must explain how the tools interact");
assert.match(html, /Community-Code Simulator tests construction\./, "the hub must explain how the seventh tool extends the suite");
assert.match(html, /Social Criticism Lab tests reform\./, "the hub must explain how the eighth tool extends the suite");
assert.match(html, /Blame Laboratory tests response\./, "the hub must explain how the ninth tool extends the suite");
assert.match(html, /Reasons Lab tests the favoring relation\./, "the hub must explain how the tenth tool extends the suite");
assert.match(html, /Evidence Lab tests epistemic force\./, "the hub must explain how the eleventh tool extends the suite");
assert.match(html, /Standing Lab tests the boundary\./, "the hub must explain how the twelfth tool extends the suite");
assert.match(html, /Value Conflict Lab tests comparison\./, "the hub must explain how the thirteenth tool extends the suite");
assert.match(html, /Moral Emotions Lab tests the remainder\./, "the hub must explain how the fourteenth tool extends the suite");
assert.match(html, /There is no required order\./, "the hub must not present the tools as a forced sequence");
assert.match(html, /No account, tracking, or built-in AI/, "the hub must disclose its privacy model");
assert.match(html, /The complete project in one sustained argument/, "the hub must present the book as the comprehensive synthesis");
assert.match(html, /href="book\.html"/, "the hub must link to the dedicated book page");
assert.match(html, /the-objective-morality-project-with-cover\.pdf/, "the hub must link directly to the complete illustrated book");
assert.equal((html.match(/<h1\b/g) || []).length, 1, "the landing page must have one primary heading");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "the landing page must not reuse an element id");

const toolCards = html.match(/<article class="hub-tool-card hub-tool-(?!reserved)[^"]+">/g) || [];
const reservedCards = html.match(/<article class="hub-tool-card hub-tool-reserved"/g) || [];
assert.equal(toolCards.length, 14, "the landing page must present fourteen current tools");
assert.equal(reservedCards.length, 0, "all current grid positions must be live tools");
assert.match(css, /\.hub-tool-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s, "the wide hub must retain a scalable three-column grid");
assert.match(css, /\.hub-tool-emotions\s*\{[^}]*grid-column:\s*span\s*2/s, "the fourteenth card must complete the final wide-grid row deliberately");
assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.hub-tool-grid\s*\{[^}]*repeat\(2,/s, "the hub must collapse to two columns at medium widths");
assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.hub-tool-grid,[\s\S]*?grid-template-columns:\s*1fr/s, "the hub must collapse to one column on narrow screens");

for (const link of toolLinks) {
  assert.match(html, new RegExp(`href="${link.replace(".", "\\.")}"`), `the hub must link to ${link}`);
}

assert.doesNotMatch(html, /<script[^>]+app\.js/, "the central hub must not initialize the Moral Profile survey");
assert.match(
  fs.readFileSync(path.join(root, "profile.html"), "utf8"),
  /<script src="app\.js"><\/script>/,
  "the Moral Profile must retain its survey script after moving off the home route",
);

for (const page of pages) {
  const pageHtml = fs.readFileSync(path.join(root, page), "utf8");
  assert.match(pageHtml, /href="index\.html"[^>]*>Home<\/a>/, `${page} must link to the central home page`);
  assert.match(pageHtml, /href="find\.html"[^>]*>Find a lab<\/a>/, `${page} must link to the guided lab finder`);
  assert.match(pageHtml, /href="index\.html#toolkit"[^>]*>All labs<\/a>/, `${page} must use the scalable all-labs navigation link`);
  assert.match(pageHtml, /href="map\.html"[^>]*>My map<\/a>/, `${page} must link to the optional suite map`);
  assert.match(pageHtml, /href="method\.html"[^>]*>Method<\/a>/, `${page} must link to the public method page`);
  assert.match(pageHtml, /href="book\.html"[^>]*>Book<\/a>/, `${page} must link to the comprehensive book`);
  assert.match(pageHtml, /href="papers\.html"[^>]*>Papers<\/a>/, `${page} must link to the reading room`);
  for (const favicon of faviconFiles) {
    assert.match(pageHtml, new RegExp(`href="${favicon.replace(".", "\\.")}"`), `${page} must use ${favicon}`);
  }
  for (const href of [...pageHtml.matchAll(/href="([^"#][^"]*)"/g)].map((match) => match[1])) {
    if (/^(?:https?:|mailto:|data:)/.test(href)) continue;
    const target = href.split("#")[0];
    assert.ok(fs.existsSync(path.join(root, target)), `${page} links to missing local target ${target}`);
  }
}

for (const favicon of faviconFiles) {
  const faviconPath = path.join(root, favicon);
  assert.ok(fs.existsSync(faviconPath), `${favicon} must exist`);
  assert.ok(fs.statSync(faviconPath).size > 1000, `${favicon} must contain a real image asset`);
}

const currentMarkers = pages.map((page) => {
  const pageHtml = fs.readFileSync(path.join(root, page), "utf8");
  return [...pageHtml.matchAll(/aria-current="(?:page|location)"/g)].length;
});
assert.deepEqual(currentMarkers, new Array(pages.length).fill(1), "every main page must identify exactly one current navigation item");

console.log("Hub audit passed: fourteen live tools, comprehensive book, guided finder, method page, interaction guidance, suite map, scalable navigation, privacy copy, and local links verified.");
