"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "decoder.js"), "utf8");
const html = fs.readFileSync(path.join(root, "decoder.html"), "utf8");
const pureSource = source.slice(source.indexOf("const DECODER_LAYERS"), source.indexOf("const decoderEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     DECODER_LAYERS, DECODER_LAYER_ORDER, DECODER_CHECK_ORDER, DECODER_ZONES,
     DECODER_QUESTIONS, decoderState, decoderQuestion, decoderChoice,
     decoderSelectedAnswers, decoderDiagnostic, buildDecoderAIProbePrompt
   };`,
  context,
);

const {
  DECODER_LAYERS,
  DECODER_LAYER_ORDER,
  DECODER_CHECK_ORDER,
  DECODER_ZONES,
  DECODER_QUESTIONS,
  decoderDiagnostic,
  buildDecoderAIProbePrompt,
} = context.audit;

assert.deepEqual(
  Array.from(DECODER_LAYER_ORDER),
  ["scope", "evidence", "interests", "priority", "attitude", "coordination", "procedure", "moral"],
  "the lab must preserve the eight requested layers in its deliberate order",
);
assert.deepEqual(Array.from(DECODER_CHECK_ORDER), ["surface", ...Array.from(DECODER_LAYER_ORDER)]);
assert.equal(DECODER_QUESTIONS.length, 9, "the opening restraint check must precede the eight layers");
assert.deepEqual(Array.from(DECODER_QUESTIONS.map((question) => question.id)), Array.from(DECODER_CHECK_ORDER));
assert.equal(new Set(DECODER_QUESTIONS.map((question) => question.id)).size, 9);

const zonedLayers = DECODER_ZONES.flatMap((zone) => zone.layers);
assert.deepEqual(
  Array.from(zonedLayers),
  ["evidence", "scope", "interests", "priority", "attitude", "coordination", "procedure", "moral"],
  "each substantive layer must appear in exactly one resolution zone",
);
assert.equal(new Set(zonedLayers).size, 8);
assert.ok(DECODER_ZONES.every((zone) => zone.action.length >= 55 && zone.limit.length >= 95));
assert.match(DECODER_ZONES.find((zone) => zone.id === "evidence").limit, /may narrow uncertainty without removing it/i);
assert.match(DECODER_ZONES.find((zone) => zone.id === "procedure").limit, /leaving disagreement/i);
assert.match(DECODER_ZONES.find((zone) => zone.id === "metaethical").limit, /does not establish that objective moral facts exist/i);

for (const question of DECODER_QUESTIONS) {
  assert.equal(question.choices.length, 4, `${question.id} must offer four distinct classifications`);
  assert.equal(new Set(question.choices.map((choice) => choice.id)).size, 4, `${question.id} choice ids must be unique`);
  assert.ok(question.choices.some((choice) => choice.id === question.correct), `${question.id} must offer its best-matched layer`);
  assert.equal(question.dialogue.length, 2, `${question.id} must include both speakers`);
  assert.deepEqual(Array.from(question.dialogue.map((line) => line.speaker)), ["Lina", "Marcus"]);
  assert.ok(question.prompt.length >= 80, `${question.id} needs an explicit prompt`);
  assert.ok(question.context.length >= 180, `${question.id} needs complete context`);
  assert.ok(question.assumptions.length >= 120, `${question.id} must state fixed details`);
  assert.ok(question.scope.length >= 120, `${question.id} must define its scope`);
  assert.ok(question.guide.plain.length >= 80, `${question.id} needs a plain-language explanation`);
  assert.ok(question.guide.separate.length >= 95, `${question.id} must say what to keep separate`);
  assert.ok(question.guide.reveal.length >= 80, `${question.id} must explain what the answer tests`);
  for (const choice of question.choices) {
    assert.ok(DECODER_LAYERS[choice.kind], `${question.id}/${choice.id} must map to a named layer`);
    assert.ok(choice.label.length >= 75, `${question.id}/${choice.id} needs an unambiguous answer label`);
    assert.ok(choice.detail.length >= 120, `${question.id}/${choice.id} needs a complete explanation`);
  }
}

const surface = DECODER_QUESTIONS[0];
const empirical = DECODER_QUESTIONS.find((question) => question.id === "evidence");
const attitudes = DECODER_QUESTIONS.find((question) => question.id === "attitude");
const coordination = DECODER_QUESTIONS.find((question) => question.id === "coordination");
const procedure = DECODER_QUESTIONS.find((question) => question.id === "procedure");
const moral = DECODER_QUESTIONS.find((question) => question.id === "moral");
assert.equal(surface.correct, "surface");
assert.match(surface.context, /has yet defined|not yet/i);
assert.match(empirical.assumptions, /uncertain/i);
assert.match(empirical.scope, /Do not infer that evidence will settle/i);
assert.match(attitudes.scope, /disagreement in attitude from a factual disagreement about what attitudes/i);
assert.match(coordination.scope, /content of the rule with the separate procedure/i);
assert.match(procedure.scope, /Do not assume that a legitimate decision would create agreement or objective moral truth/i);
assert.match(moral.assumptions, /does not assume that objective moral facts exist or that they do not/i);

const allCorrect = Object.fromEntries(DECODER_QUESTIONS.map((question) => [question.id, question.correct]));
const correctDiagnosis = decoderDiagnostic(allCorrect);
assert.equal(correctDiagnosis.correctCount, 9);
assert.equal(correctDiagnosis.openCount, 0);
assert.equal(correctDiagnosis.evidenceCorrect, true);
assert.equal(correctDiagnosis.moralCorrect, true);
assert.match(correctDiagnosis.title, /all nine checkpoints/i);

const allWrong = Object.fromEntries(DECODER_QUESTIONS.map((question) => [
  question.id,
  question.choices.find((choice) => choice.id !== question.correct).id,
]));
const wrongDiagnosis = decoderDiagnostic(allWrong);
assert.equal(wrongDiagnosis.correctCount, 0);
assert.equal(wrongDiagnosis.openCount, 9);
assert.equal(wrongDiagnosis.evidenceCorrect, false);
assert.equal(wrongDiagnosis.moralCorrect, false);

// Audit every complete response path: 4^9 = 262,144.
let completePaths = 0;
const reachableScores = new Set();
function enumerate(index, answers, expectedCorrect) {
  if (index === DECODER_QUESTIONS.length) {
    const diagnosis = decoderDiagnostic(answers);
    assert.equal(diagnosis.answered, 9);
    assert.equal(diagnosis.correctCount, expectedCorrect);
    assert.equal(diagnosis.openCount, 9 - expectedCorrect);
    assert.equal(diagnosis.evidenceCorrect, answers.evidence === "evidence");
    assert.equal(diagnosis.moralCorrect, answers.moral === "moral");
    reachableScores.add(diagnosis.correctCount);
    completePaths += 1;
    return;
  }
  const question = DECODER_QUESTIONS[index];
  for (const choice of question.choices) {
    enumerate(
      index + 1,
      { ...answers, [question.id]: choice.id },
      expectedCorrect + (choice.id === question.correct ? 1 : 0),
    );
  }
}
enumerate(0, {}, 0);
assert.equal(completePaths, 4 ** 9);
assert.deepEqual(Array.from(reachableScores).sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

const prompt = buildDecoderAIProbePrompt(allCorrect);
assert.match(prompt, /Ask one focused question at a time/i);
assert.match(prompt, /Do not infer a hidden layer/i);
assert.match(prompt, /Never say evidence must fully resolve it/i);
assert.match(prompt, /Distinguish disagreement in attitude from disagreement about attitudes/i);
assert.match(prompt, /procedure does not by itself create objective moral truth/i);
assert.match(prompt, /Do not assume moral realism or moral non-realism/i);
assert.match(prompt, /table that lists each layer/i);
for (const question of DECODER_QUESTIONS) {
  assert.ok(prompt.includes(`Full context: ${question.context}`), `AI prompt must include the full ${question.id} context`);
  assert.ok(prompt.includes(`Fixed details: ${question.assumptions}`), `AI prompt must include the ${question.id} fixed details`);
  for (const line of question.dialogue) {
    assert.ok(prompt.includes(`${line.speaker}: “${line.text}”`), `AI prompt must include the ${question.id} dialogue`);
  }
}

const queriedIds = [...source.matchAll(/document\.querySelector\("#([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
for (const id of queriedIds) assert.match(html, new RegExp(`id=["']${id}["']`), `decoder.html must contain #${id}`);

assert.match(html, /class="skip-link"[^>]+href="#decoderLab"/);
assert.match(html, /id="decoderQuestionPrompt" tabindex="-1"/);
assert.match(html, /id="decoderResultTitle" tabindex="-1"/);
assert.match(html, /<fieldset[^>]+id="decoderChoices"/);
assert.match(source, /type="radio"/);
assert.match(html, /id="decoderNextButton"[^>]+disabled/);
assert.match(html, /role="progressbar"/);
assert.match(html, /id="decoderLiveStatus"[^>]+role="status"/);
assert.match(html, /id="resetDecoderButton"/);
assert.match(html, /id="restartDecoderButton"/);
assert.match(html, /id="decoderAIProbePrompt"/);
assert.match(html, /It does not score your position on assisted dying, intelligence, or moral character/i);
assert.match(html, /The invented dialogue does not take a side on assisted dying/i);
assert.match(source, /This count compares your classifications with the layer explicitly stated at each checkpoint/i);
assert.match(source, /decoderEls\.prompt\.focus/);
assert.match(source, /decoderResultTitle"\)\.focus/);

const selectionBody = source.slice(source.indexOf("function selectDecoderAnswer"), source.indexOf("function renderDecoderFinalMap"));
assert.doesNotMatch(selectionBody, /setTimeout/, "selecting an answer must not auto-advance");

const hub = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(hub, /href="decoder\.html"/, "the hub must link to the Decoder");
assert.match(hub, /Nine checkpoints that reveal eight distinct layers/i);

console.log(`Disagreement Decoder audit passed: ${completePaths.toLocaleString()} complete paths, nine exact checkpoints, eight resolution layers, full-context AI prompt, and managed keyboard focus verified.`);
