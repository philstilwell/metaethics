"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "papers.js"), "utf8");
const html = fs.readFileSync(path.join(root, "papers.html"), "utf8");
const context = {};

vm.createContext(context);
vm.runInContext(
  `${source.slice(0, source.indexOf("const state"))}
   globalThis.audit = { LAB_NAMES, LAB_SUPPORT, CURATED_PAPERS };`,
  context,
);

const { LAB_NAMES, LAB_SUPPORT, CURATED_PAPERS } = context.audit;
const labIds = Object.keys(LAB_NAMES);
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
assert.equal((html.match(/<option value="(?:profile|meaning|obligation|after|decoder|genealogy|builder|criticize|blame|reasons|evidence|standing|tradeoffs|emotions)">/g) || []).length, 28, "both the public filter and private-paper form must list all fourteen labs");
assert.match(source, /paper\.labs\.includes\(state\.labFilter\)/, "lab filtering must use explicit source tags");
assert.match(source, /className = "paper-lab-use"/, "cards must disclose which labs use a source");

console.log(`Papers audit passed: ${CURATED_PAPERS.length} curated sources, fourteen lab filters, complete source tagging, and dedicated foundations for all new labs verified.`);
