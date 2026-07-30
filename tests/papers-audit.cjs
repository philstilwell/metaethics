"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "papers.js"), "utf8");
const html = fs.readFileSync(path.join(root, "papers.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const context = {};

vm.createContext(context);
vm.runInContext(
  `${source.slice(0, source.indexOf("const state"))}
   globalThis.audit = { LAB_NAMES, LAB_SUPPORT, CURATED_PAPERS };`,
  context,
);

const { LAB_NAMES, LAB_SUPPORT, CURATED_PAPERS } = context.audit;
const labIds = Object.keys(LAB_NAMES);
const intuitionPdf = path.join(root, "output", "pdf", "moral-intuitions-without-a-moral-realm.pdf");
assert.equal(labIds.length, 14, "the reading room must know all fourteen labs");
assert.equal(new Set(CURATED_PAPERS.map((paper) => paper.id)).size, CURATED_PAPERS.length, "curated source ids must be unique");

for (const paper of CURATED_PAPERS) {
  assert.match(paper.url, /^https:\/\//, `${paper.id} must use a secure source URL`);
  assert.ok(paper.title.length >= 8, `${paper.id} needs a real title`);
  assert.ok(paper.author.length >= 3, `${paper.id} needs an author or reference source`);
  assert.ok(paper.note.length >= 120, `${paper.id} needs an informative annotation`);
  const support = paper.labs || LAB_SUPPORT[paper.id] || [];
  assert.ok(support.length >= 1, `${paper.id} must identify at least one supported lab`);
  support.forEach((labId) => assert.ok(LAB_NAMES[labId], `${paper.id} has unknown lab tag ${labId}`));
}

const intuitionPaper = CURATED_PAPERS.find((paper) => paper.id === "moral-intuitions-realm");
assert.ok(intuitionPaper?.core, "the new moral-intuitions paper must be a core project source");
assert.deepEqual(
  Array.from(LAB_SUPPORT["moral-intuitions-realm"]),
  ["meaning", "obligation", "after", "genealogy", "evidence", "emotions"],
  "the paper must be connected only to the six labs its central argument directly supports",
);
assert.ok(fs.existsSync(intuitionPdf) && fs.statSync(intuitionPdf).size > 1_000_000, "the complete project PDF must ship with the site");
assert.match(html, /id="intuitionPaperHeading"/, "the reading room must explain the new paper before the bibliography");
assert.match(html, /One argument, six connected questions/, "the reading room must show how the paper enters the suite");
assert.match(html, /output\/pdf\/moral-intuitions-without-a-moral-realm\.pdf/, "the reading room must link to the hosted PDF");
for (const href of ["genealogy.html", "obligation.html", "evidence.html", "wrong.html", "after.html", "emotions.html"]) {
  assert.match(html, new RegExp(`href="${href.replace(".", "\\.")}"`), `the paper constellation must link to ${href}`);
}
assert.match(css, /\.paper-feature\s*\{[^}]*grid-template-columns:/s, "the featured paper needs a deliberate wide layout");
assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.paper-feature,[\s\S]*?grid-template-columns:\s*1fr/s, "the paper feature must collapse on narrow screens");

const reasonSources = [
  "sep-reasons-roles",
  "sep-internal-external",
  "williams-internal-external",
  "street-constructivism-reasons",
  "schroeder-slaves-passions",
  "joyce-myth-morality",
];
for (const id of reasonSources) {
  const paper = CURATED_PAPERS.find((item) => item.id === id);
  assert.ok(paper, `${id} must be in the curated reading room`);
  assert.ok((paper.labs || []).includes("reasons"), `${id} must be tagged for the Reasons Lab`);
}

const newLabSources = {
  evidence: ["callahan-epistemic-normative", "kiesewetter-epistemic-reasons", "joyce-companions-guilt"],
  standing: ["sep-grounds-moral-status"],
  tradeoffs: ["sep-weighing-reasons", "sep-incommensurable-values"],
  emotions: ["sep-blame", "sep-moral-responsibility"],
};
for (const [labId, ids] of Object.entries(newLabSources)) {
  ids.forEach((id) => {
    const paper = CURATED_PAPERS.find((item) => item.id === id);
    assert.ok(paper, `${id} must be in the curated reading room`);
    assert.ok((paper.labs || LAB_SUPPORT[id] || []).includes(labId), `${id} must be tagged for ${labId}`);
  });
}

assert.match(html, /id="paperLabFilter"/, "the reading room must be filterable by lab");
assert.equal((html.match(/<option value="(?:profile|meaning|obligation|after|decoder|genealogy|builder|criticize|blame|reasons|evidence|standing|tradeoffs|emotions)">/g) || []).length, 14, "the public filter must list all fourteen labs exactly once");
assert.match(source, /paper\.labs\.includes\(state\.labFilter\)/, "lab filtering must use explicit source tags");
assert.match(source, /className = "paper-lab-use"/, "cards must disclose which labs use a source");
assert.doesNotMatch(html, /Add a paper|paperForm|add-paper-panel|paper-form/, "the reading room must not expose a paper-submission feature");
assert.doesNotMatch(source, /localStorage|userPapers|FormData|saveUserPapers|loadUserPapers/, "paper-submission storage and form behavior must be fully removed");

console.log(`Papers audit passed: ${CURATED_PAPERS.length} curated sources, fourteen lab filters, complete source tagging, no paper-submission feature, and dedicated foundations for all new labs verified.`);
