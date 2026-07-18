"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const pages = ["index.html", "profile.html", "obligation.html", "wrong.html", "after.html", "papers.html"];
const toolLinks = ["profile.html", "wrong.html", "obligation.html", "after.html"];

assert.match(html, /Four labs\. Four layers of moral thought\./, "the hub must state its four-layer architecture");
assert.match(html, /They take apart one familiar moral sentence\./, "the hub must explain how the tools interact");
assert.match(html, /There is no required order\./, "the hub must not present the tools as a forced sequence");
assert.match(html, /No account, tracking, or built-in AI/, "the hub must disclose its privacy model");
assert.equal((html.match(/<h1\b/g) || []).length, 1, "the landing page must have one primary heading");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "the landing page must not reuse an element id");

const toolCards = html.match(/<article class="hub-tool-card hub-tool-(?!reserved)[^"]+">/g) || [];
const reservedCards = html.match(/<article class="hub-tool-card hub-tool-reserved"/g) || [];
assert.equal(toolCards.length, 4, "the landing page must present four current tools");
assert.equal(reservedCards.length, 2, "the six-part grid must retain exactly two future module spaces");
assert.match(css, /\.hub-tool-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s, "the wide hub must use a balanced three-column six-card grid");
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
  assert.match(pageHtml, /href="profile\.html"/, `${page} must link to the relocated Moral Profile`);
  for (const href of [...pageHtml.matchAll(/href="([^"#][^"]*)"/g)].map((match) => match[1])) {
    if (/^(?:https?:|mailto:|data:)/.test(href)) continue;
    const target = href.split("#")[0];
    assert.ok(fs.existsSync(path.join(root, target)), `${page} links to missing local target ${target}`);
  }
}

const currentMarkers = pages.map((page) => {
  const pageHtml = fs.readFileSync(path.join(root, page), "utf8");
  return [...pageHtml.matchAll(/aria-current="page"/g)].length;
});
assert.deepEqual(currentMarkers, [1, 1, 1, 1, 1, 1], "every main page must identify exactly one current navigation item");

console.log("Hub audit passed: four live tools, two reserved modules, interaction guidance, relocated profile, navigation, privacy copy, and local links verified.");
