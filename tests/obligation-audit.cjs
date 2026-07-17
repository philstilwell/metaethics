"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "obligation.js"), "utf8");
const html = fs.readFileSync(path.join(root, "obligation.html"), "utf8");
const pureSource = source.slice(source.indexOf("const FORCE_LEVELS"), source.indexOf("const obligationEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     FORCE_LEVELS, OBLIGATION_QUESTIONS, obligationState, obligationQuestion,
     obligationChoice, forceCounts, answeredObligationCount,
     detectObligationGaps, obligationDiagnosis
   };`,
  context,
);

const {
  FORCE_LEVELS,
  OBLIGATION_QUESTIONS,
  obligationState,
  forceCounts,
  answeredObligationCount,
  detectObligationGaps,
  obligationDiagnosis,
} = context.audit;

const levelKeys = Object.keys(FORCE_LEVELS);

function reset(answers = {}) {
  obligationState.answers = { ...answers };
  obligationState.index = 0;
}

assert.equal(OBLIGATION_QUESTIONS.length, 7, "the obligation lab must use seven deliberate steps");
assert.equal(new Set(OBLIGATION_QUESTIONS.map((question) => question.id)).size, 7, "question ids must be unique");
assert.deepEqual(
  levelKeys,
  ["commitment", "social", "pressure", "sanction", "conditional", "bridge", "leap"],
  "the force map must distinguish human commitments, social forces, limited duties, bridges, and universal leaps",
);

for (const question of OBLIGATION_QUESTIONS) {
  assert.equal(question.choices.length, 5, `${question.id} must offer five clearly different answers`);
  assert.ok(question.context.length >= 180, `${question.id} needs enough case context to hold the comparison still`);
  assert.ok(question.assumptions.length >= 100, `${question.id} must state its fixed assumptions`);
  assert.ok(question.scope.length >= 90, `${question.id} must define the scope of the test`);
  assert.ok(question.guide.plain.length >= 55 && question.guide.separate.length >= 70 && question.guide.reveal.length >= 55, `${question.id} needs a full plain-language annotation`);
  assert.equal(new Set(question.choices.map((choice) => choice.id)).size, 5, `${question.id} choice ids must be unique`);
  for (const choice of question.choices) {
    assert.ok(levelKeys.includes(choice.level), `${question.id}/${choice.id} has an unknown force level`);
    assert.ok(choice.label.length >= 35, `${question.id}/${choice.id} must state an unambiguous answer`);
    assert.ok(choice.detail.length >= 75, `${question.id}/${choice.id} must explain exactly what the answer means`);
    assert.ok(choice.interpretation.length >= 80, `${question.id}/${choice.id} must disclose what the answer can establish`);
  }
}

const offeredLevels = new Set(OBLIGATION_QUESTIONS.flatMap((question) => question.choices.map((choice) => choice.level)));
assert.deepEqual([...offeredLevels].sort(), [...levelKeys].sort(), "every force-map category must be reachable through an answer");

const candidSocialPath = {
  meaning: "social",
  secret: "localViolation",
  towns: "localCodes",
  reformer: "wrongThen",
  outsider: "courtesyOnly",
  enforcer: "practicalOnly",
  finalSource: "socialCodeOnly",
};
reset(candidSocialPath);
assert.equal(answeredObligationCount(), 7, "a completed path must contain seven answers");
assert.equal(Object.values(forceCounts()).reduce((sum, count) => sum + count, 0), 7, "each answer must add exactly one force-map marker");
assert.equal(detectObligationGaps().length, 0, "a candid local-code path must not be mislabeled incoherent");
assert.equal(obligationDiagnosis().key, "social", "the final social-code answer must produce the candid social-code diagnostic");
assert.equal(obligationDiagnosis().universal, "Not claimed", "the social-code diagnostic must not invent a universal claim");

reset({ meaning: "universal", finalSource: "socialCodeOnly" });
assert.ok(detectObligationGaps().some((gap) => gap.id === "claim-outruns-source"), "a universal opening claim must not be supported by a merely social final source");

reset({ towns: "bothUniversal" });
assert.ok(detectObligationGaps().some((gap) => gap.id === "opposite-universals" && gap.severity === "high"), "opposite universal duties in matched cases must be flagged prominently");

reset({ enforcer: "forceMakesRight" });
assert.ok(detectObligationGaps().some((gap) => gap.id === "force-authority"), "perfect enforcement must not silently become moral authority");

reset({ reformer: "rightBeyond", finalSource: "socialCodeOnly" });
assert.ok(detectObligationGaps().some((gap) => gap.id === "reformer-source"), "a reformer justified beyond society must retain that source in the conclusion");

reset({ finalSource: "universalFromDisapproval" });
assert.equal(obligationDiagnosis().key, "leap", "social disapproval asserted as universal authority must produce the missing-ought diagnostic");
assert.ok(detectObligationGaps().some((gap) => gap.id === "missing-ought" && gap.severity === "high"), "the final is-to-ought jump must be identified directly");

reset({ finalSource: "conditionalMembers" });
assert.equal(obligationDiagnosis().key, "conditional", "membership and reciprocity must remain a conditional diagnostic");

reset({ finalSource: "practicalReasons" });
assert.equal(obligationDiagnosis().key, "pressure", "avoiding social cost must remain a practical-pressure diagnostic");

reset({ finalSource: "needBeyond" });
assert.equal(obligationDiagnosis().key, "bridge", "an extra-social foundation must be reported as a bridge still needing defense");

const queriedIds = [...source.matchAll(/document\.querySelector\("#([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
for (const id of queriedIds) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `obligation.html must contain #${id}`);
}

for (const page of ["index.html", "papers.html", "obligation.html"]) {
  const pageHtml = fs.readFileSync(path.join(root, page), "utf8");
  assert.match(pageHtml, /href="obligation\.html"/, `${page} must link to the obligation lab`);
}

console.log("Obligation audit passed: seven cases, explicit scopes, force categories, honest social codes, conditional duties, and exact missing-ought gaps verified.");
