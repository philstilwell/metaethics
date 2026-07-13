"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const dataSource = source.slice(source.indexOf("const DIMENSIONS"), source.indexOf("const state ="));
const logicSource = source.slice(source.indexOf("function buildPath()"), source.indexOf("function renderAxisGrid()"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${dataSource}
   const state = { systemName: "", systemType: "", scenario: "truth", answers: {}, path: [], index: 0 };
   ${logicSource}
   globalThis.audit = {
     DIMENSIONS, QUESTIONS, PROFILE_FIELDS, state,
     buildPath, calculateScores, detectTensions, calculateBaseScore,
     calculateTensionPenalty, calculateProfilePenalty, calculateOverall
   };`,
  context,
);

const {
  DIMENSIONS,
  QUESTIONS,
  PROFILE_FIELDS,
  state,
  buildPath,
  calculateScores,
  detectTensions,
  calculateBaseScore,
  calculateTensionPenalty,
  calculateProfilePenalty,
  calculateOverall,
} = context.audit;

function setState(answers, scenario = "truth") {
  state.answers = { ...answers };
  state.scenario = scenario;
  state.index = 0;
  buildPath();
}

assert.equal(QUESTIONS.length, 24, "survey question count changed unexpectedly");
assert.equal(Object.keys(DIMENSIONS).length, 13, "result dimension count changed unexpectedly");

for (const question of QUESTIONS) {
  assert.equal(question.choices.length, 5, `${question.id} must have five answers`);
  assert.equal(question.choices[4].id, "nonrealist", `${question.id} must put the non-realist answer in position E`);
  for (const choice of question.choices) {
    assert.deepEqual(
      Object.keys(choice.scores || {}).sort(),
      [...question.dimensions].sort(),
      `${question.id}/${choice.id} must score exactly the dimensions named by its question`,
    );
  }
}

assert.deepEqual(
  Array.from(QUESTIONS).filter((question) => question.kind === "profile").map((question) => question.id),
  ["stance", "scope", "valueCenter"],
  "only the three descriptive profile questions should be unscored",
);
assert.ok(
  PROFILE_FIELDS.every(({ id }) => QUESTIONS.find((question) => question.id === id)?.kind === "profile"),
  "every displayed profile field must come from an unscored profile question",
);

for (const stance of ["objective", "authority", "constructed", "indexed", "nonrealist"]) {
  for (const scenario of ["truth", "scarcity", "loyalty"]) {
    setState({ stance }, scenario);
    const coveredDimensions = new Set(Array.from(state.path).flatMap((question) => Array.from(question.dimensions)));
    assert.deepEqual(
      [...coveredDimensions].sort(),
      Object.keys(DIMENSIONS).sort(),
      `${stance}/${scenario} must measure every result dimension`,
    );
    assert.equal(
      state.path.filter((question) => question.id.startsWith("scenario")).length,
      1,
      `${stance}/${scenario} must contain exactly one pressure case`,
    );
  }
}

setState({ stance: "objective", groundSource: "argument", authorityAccess: "defeaters" });
assert.ok("groundSource" in state.answers && "authorityAccess" in state.answers, "objective branch answers should be active");
state.answers.stance = "nonrealist";
buildPath();
assert.ok(!("groundSource" in state.answers) && !("authorityAccess" in state.answers), "answers from an abandoned branch must be removed");

setState({
  stance: "indexed",
  indexDiscipline: "always",
  scope: "tribe",
  boundary: "criteria",
  objectFocus: "shifts",
  valueCenter: "agency",
  valueRole: "maximize",
  termStability: "elastic",
  statusGrammar: "binary",
  bridge: "automatic",
  reasonOffer: "authority",
  similarCases: "intuition",
  conflictMethod: "judgment",
  scenarioTruth: "refuse",
  facts: "conviction",
  finiteAgent: "ideal",
  genealogy: "sacred",
  challenge: "closed",
  repair: "apology",
});
assert.equal(detectTensions().length, 0, "standalone weaknesses must not be mislabeled as cross-answer conflicts");

setState({ stance: "objective", groundSource: "nonrealist" });
assert.equal(detectTensions()[0]?.id, "foundation-reversal", "withdrawing an objective starting claim must be detected");
assert.equal(calculateTensionPenalty(detectTensions()), 4, "a strong cross-answer conflict should apply the disclosed four-point adjustment");

setState({ stance: "nonrealist" });
for (const question of state.path) state.answers[question.id] = "nonrealist";
buildPath();
assert.equal(calculateBaseScore(calculateScores()), 100, "the fully explicit non-realist path should have full base clarity");
assert.equal(calculateProfilePenalty(), 10, "two explicitly unspecified profile fields should be visible in the formula");
assert.equal(calculateOverall(calculateScores(), detectTensions()), 90, "profile gaps should reduce clarity without treating non-realism itself as a flaw");

state.answers.scope = "sentient";
state.answers.valueCenter = "plural";
assert.equal(calculateProfilePenalty(), 0, "a non-realist may specify substantive scope and values without penalty");
assert.equal(calculateOverall(calculateScores(), detectTensions()), 100, "a fully specified, internally aligned non-realist path should be able to score 100");

state.answers.scope = "tribe";
state.answers.valueCenter = "agency";
assert.equal(calculateOverall(calculateScores(), detectTensions()), 100, "narrower scope or different leading content must not be treated as lower coherence by itself");

console.log("Logic audit passed: profile neutrality, branch coverage, score mappings, pruning, conflicts, and formula behavior verified.");
