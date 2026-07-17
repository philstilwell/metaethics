"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const dataSource = source.slice(source.indexOf("const TENDENCIES"), source.indexOf("const state ="));
const logicSource = source.slice(source.indexOf("function resolve"), source.indexOf("function renderTendencyGrid"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${dataSource}
   const state = { opener: "quiet", answers: {}, path: [], index: 0 };
   ${logicSource}
   globalThis.audit = {
     TENDENCIES, META_STANCES, SCENARIOS, CALIBRATION_QUESTIONS, ROUTES,
     QUESTION_BANK, state, buildPath, computeSignals, rankSignals, leadingSignals,
     answeredSignalQuestionCount, detectTensions, profileShape
   };`,
  context,
);

const {
  TENDENCIES,
  META_STANCES,
  SCENARIOS,
  CALIBRATION_QUESTIONS,
  ROUTES,
  QUESTION_BANK,
  state,
  buildPath,
  computeSignals,
  rankSignals,
  leadingSignals,
  answeredSignalQuestionCount,
  detectTensions,
  profileShape,
} = context.audit;

const tendencyKeys = Object.keys(TENDENCIES);

function reset(answers = {}, opener = "quiet") {
  state.opener = opener;
  state.answers = { ...answers };
  state.index = 0;
  buildPath();
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

assert.equal(SCENARIOS.length, 6, "the profile must use six moral scenarios");
assert.equal(tendencyKeys.length, 8, "the result must distinguish eight reasoning tendencies");
assert.equal(Object.keys(META_STANCES).length, 5, "the separate metaethical result must offer five stances");

const scenarioIds = SCENARIOS.map((scenario) => scenario.id);
assert.equal(new Set(scenarioIds).size, SCENARIOS.length, "scenario ids must be unique");
assert.equal(new Set(SCENARIOS.map((scenario) => scenario.title)).size, SCENARIOS.length, "scenario titles must be unique");

for (const scenario of SCENARIOS) {
  assert.equal(scenario.decisions.length, 5, `${scenario.id} must offer five concrete actions`);
  assert.equal(scenario.reasons.length, 5, `${scenario.id} must offer five controlling reasons`);
  assert.ok(scenario.story.length >= 220, `${scenario.id} needs enough detail to make the stakes clear`);
  assert.ok(scenario.assumptions.length >= 100, `${scenario.id} must state its fixed assumptions`);

  const offeredSignals = scenario.reasons.map((reason) => reason.signal);
  assert.equal(new Set(offeredSignals).size, 5, `${scenario.id} reason signals must not repeat`);
  for (const reason of scenario.reasons) {
    assert.ok(tendencyKeys.includes(reason.signal), `${scenario.id}/${reason.id} has an unknown reasoning signal`);
    assert.ok(reason.label.length >= 24 && reason.detail.length >= 55, `${scenario.id}/${reason.id} must explain the reason clearly`);
  }
  for (const decision of scenario.decisions) {
    assert.ok(decision.label.length >= 12 && decision.detail.length >= 45, `${scenario.id}/${decision.id} must define the action clearly`);
    assert.ok(decision.supports.length > 0, `${scenario.id}/${decision.id} needs at least one direct explanatory bridge`);
    for (const signal of decision.supports) {
      assert.ok(offeredSignals.includes(signal), `${scenario.id}/${decision.id} cannot be supported by a reason the user was not offered`);
    }
  }
}

assert.equal(CALIBRATION_QUESTIONS.length, 3, "two comparison questions and one metaethical question are required");
for (const question of CALIBRATION_QUESTIONS) {
  assert.equal(question.choices.length, 5, `${question.id} must offer five unambiguous answers`);
  assert.ok(question.definition.length >= 80, `${question.id} must define its central terms`);
  assert.ok(question.scope.length >= 80, `${question.id} must state what is and is not being asked`);
}

const metaQuestion = CALIBRATION_QUESTIONS.find((question) => question.id === "metaStance");
assert.ok(metaQuestion, "a separate metaethical question is required");
assert.ok(metaQuestion.choices.some((choice) => choice.meta === "nonrealist"), "moral non-realism must be available");
assert.ok(metaQuestion.choices.every((choice) => choice.meta && !choice.signal), "metaethics must not change the scenario profile");

for (const [opener, route] of Object.entries(ROUTES)) {
  assert.deepEqual([...new Set(Array.from(route))].sort(), [...scenarioIds].sort(), `${opener} must include every scenario exactly once`);
  assert.equal(route[0], opener, `${opener} must actually open with the selected scenario`);
  reset({}, opener);
  assert.equal(state.path.length, 15, `${opener} route must contain twelve scenario prompts and three final prompts`);
  assert.deepEqual(
    plain(state.path.slice(0, 12).map((question) => [question.scenarioId, question.kind])),
    plain(route.flatMap((scenarioId) => [[scenarioId, "decision"], [scenarioId, "reason"]])),
    `${opener} route must ask each decision immediately before its reason`,
  );
  assert.deepEqual(
    plain(state.path.slice(-3).map((question) => question.id)),
    ["ruleConflict", "impartiality", "metaStance"],
    `${opener} route must finish with the two comparisons and the separate metaethical question`,
  );
}

reset();
const opportunities = plain(computeSignals());
for (const [key, entry] of Object.entries(opportunities)) {
  assert.ok(entry.opportunities >= 4, `${key} needs at least four chances to be selected`);
  assert.ok(entry.opportunities <= 7, `${key} is offered too often relative to the other tendencies`);
}

const mixedCompatible = {
  floodgateDecision: "open",
  floodgateReason: "outcome",
  voiceDecision: "generic",
  voiceReason: "rights",
  quietDecision: "report",
  quietReason: "justice",
  habitatDecision: "council",
  habitatReason: "authority",
  memoryDecision: "stabilize",
  memoryReason: "duty",
  replicaDecision: "keep",
  replicaReason: "loyalty",
  ruleConflict: "judgment",
  impartiality: "role",
  metaStance: "nonrealist",
};
reset(mixedCompatible);
assert.equal(answeredSignalQuestionCount(), 8, "six reasons plus two comparison answers must form the profile");
assert.equal(detectTensions().length, 0, "using several compatible moral traditions must not be labeled incoherent");
assert.equal(
  Object.values(computeSignals()).reduce((sum, entry) => sum + entry.hits, 0),
  8,
  "each reason-bearing question must add exactly one signal",
);

const beforeMetaChange = plain(computeSignals());
state.answers.metaStance = "objective";
assert.deepEqual(plain(computeSignals()), beforeMetaChange, "changing metaethical stance must not change the reasoning profile");

reset({ voiceDecision: "use", voiceReason: "rights" });
assert.equal(detectTensions()[0]?.id, "voice-reason-gap", "an explanation that points away from the selected action must be flagged");
assert.equal(detectTensions()[0]?.severity, "medium", "an action–reason gap asks for explanation rather than declaring incoherence");

reset({ quietDecision: "secret", quietReason: "loyalty", impartiality: "same" });
assert.equal(detectTensions().filter((tension) => tension.id === "identity-swap").length, 1, "loyalty alone must conflict with a later identity-neutral rule");
assert.equal(detectTensions().find((tension) => tension.id === "identity-swap")?.severity, "high", "a direct cross-answer rule conflict must be prominent");

reset({ quietDecision: "secret", quietReason: "care", impartiality: "same" });
assert.equal(detectTensions().length, 0, "care for named vulnerabilities must not be mistaken for identity alone");

const syntheticProfile = Object.fromEntries(tendencyKeys.map((key) => [key, { hits: 0, opportunities: 4, rate: 0, questions: [] }]));
syntheticProfile.outcome = { hits: 3, opportunities: 4, rate: 75, questions: [] };
syntheticProfile.rights = { hits: 3, opportunities: 4, rate: 75, questions: [] };
assert.equal(profileShape(syntheticProfile).label, "Blended", "two strong recurring signals must produce a blended profile");
assert.equal(rankSignals(syntheticProfile)[0][1].rate, 75, "signal ranking must use the disclosed selection rate");
assert.equal(leadingSignals(syntheticProfile).length, 2, "equal leading rates and counts must be reported as a tie");

console.log("Logic audit passed: scenario coverage, exact action–reason bridges, balanced opportunities, pluralism, metaethical neutrality, and direct tensions verified.");
