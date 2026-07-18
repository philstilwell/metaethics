"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "after.js"), "utf8");
const html = fs.readFileSync(path.join(root, "after.html"), "utf8");
const pureSource = source.slice(source.indexOf("const AFTER_POLICIES"), source.indexOf("const afterEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     AFTER_POLICIES, AFTER_POLICY_ORDER, AFTER_CASE_IDS, AFTER_POLICY_CHECK_IDS,
     AFTER_GROUPS, AFTER_QUESTIONS, afterState, afterChoice, selectedAfterAnswers,
     countAfterPolicies, afterAllCounts, afterCaseCounts, answeredAfterCount,
     answeredCaseCount, afterOpeningFinalComparison, formatAfterContexts,
     collectAfterCombinations, afterDiagnostic, buildAfterAIProbePrompt
   };`,
  context,
);

const {
  AFTER_POLICIES,
  AFTER_POLICY_ORDER,
  AFTER_CASE_IDS,
  AFTER_POLICY_CHECK_IDS,
  AFTER_GROUPS,
  AFTER_QUESTIONS,
  afterState,
  afterAllCounts,
  afterCaseCounts,
  answeredAfterCount,
  answeredCaseCount,
  afterOpeningFinalComparison,
  collectAfterCombinations,
  afterDiagnostic,
  buildAfterAIProbePrompt,
} = context.audit;

function reset(answers = {}) {
  afterState.answers = { ...answers };
  afterState.index = 0;
}

function uniformAnswers(policy) {
  return Object.fromEntries(AFTER_QUESTIONS.map((question) => [question.id, policy]));
}

assert.deepEqual(
  Array.from(AFTER_POLICY_ORDER),
  ["abolish", "fiction", "conserve", "express", "construct", "pragmatic"],
  "the lab must preserve the six response strategies in a stable order",
);
assert.deepEqual(
  Array.from(AFTER_CASE_IDS),
  ["promise", "parenting", "friendship", "blame", "law", "reform", "persuasion"],
  "only the seven practical cases may feed the case profile",
);
assert.deepEqual(Array.from(AFTER_POLICY_CHECK_IDS), ["opening", "final"]);
assert.deepEqual(
  Array.from(AFTER_GROUPS.flatMap((group) => group.families)),
  Array.from(AFTER_POLICY_ORDER),
  "the chart hierarchy must contain every strategy exactly once",
);
assert.deepEqual(
  Array.from(AFTER_POLICY_ORDER.map((policy) => AFTER_POLICIES[policy].level)),
  ["classic", "classic", "classic", "replacement", "replacement", "replacement"],
  "the taxonomy must distinguish classic post-error responses from broader replacements",
);
assert.equal(AFTER_POLICIES.abolish.theory, "Moral abolitionism");
assert.equal(AFTER_POLICIES.fiction.theory, "Revolutionary moral fictionalism");
assert.equal(AFTER_POLICIES.conserve.theory, "Moral conservationism");
assert.equal(AFTER_POLICIES.express.theory, "Expressivist revision");
assert.equal(AFTER_POLICIES.construct.theory, "Constructivist revision");
assert.equal(AFTER_POLICIES.pragmatic.theory, "Ordinary-language pragmatism");
assert.match(AFTER_POLICIES.conserve.short, /belief/i);
assert.match(AFTER_POLICIES.fiction.short, /fiction/i);
assert.match(AFTER_POLICIES.express.note, /broad replacement strategy/i);
assert.match(AFTER_POLICIES.construct.note, /Many constructivists accept moral truths/i);
assert.match(AFTER_POLICIES.pragmatic.note, /project’s label/i);

assert.equal(AFTER_QUESTIONS.length, 9);
assert.equal(new Set(AFTER_QUESTIONS.map((question) => question.id)).size, 9);
assert.deepEqual(
  Array.from(AFTER_QUESTIONS.map((question) => question.id)),
  ["opening", ...Array.from(AFTER_CASE_IDS), "final"],
  "the sequence must move from a general check through seven cases to a final check",
);
assert.equal(
  AFTER_QUESTIONS[0].prompt,
  "Suppose there are no objective moral facts. What should we do with moral language?",
);

for (const question of AFTER_QUESTIONS) {
  assert.equal(question.choices.length, 6, `${question.id} must offer all six strategies`);
  assert.deepEqual(
    Array.from(question.choices.map((choice) => choice.policy)),
    Array.from(AFTER_POLICY_ORDER),
    `${question.id} must offer each strategy once in the stable pedagogical order`,
  );
  assert.ok(question.prompt.length >= 70, `${question.id} needs an explicit question`);
  assert.ok(question.context.length >= 180, `${question.id} needs a fully specified situation`);
  assert.ok(question.assumptions.length >= 120, `${question.id} must state fixed assumptions`);
  assert.ok(question.scope.length >= 120, `${question.id} must define its scope`);
  assert.ok(question.guide.plain.length >= 80, `${question.id} needs a plain-language annotation`);
  assert.ok(question.guide.separate.length >= 100, `${question.id} must say what to keep separate`);
  assert.ok(question.guide.reveal.length >= 80, `${question.id} must explain what the answer reveals`);
  for (const choice of question.choices) {
    assert.equal(choice.id, choice.policy);
    assert.ok(choice.label.length >= 60, `${question.id}/${choice.id} needs an unambiguous answer label`);
    assert.ok(choice.detail.length >= 110, `${question.id}/${choice.id} needs a complete definition`);
    assert.ok(choice.interpretation.length >= 155, `${question.id}/${choice.id} needs an informative result annotation`);
  }
}

const parenting = AFTER_QUESTIONS.find((question) => question.id === "parenting");
const reform = AFTER_QUESTIONS.find((question) => question.id === "reform");
const persuasion = AFTER_QUESTIONS.find((question) => question.id === "persuasion");
const law = AFTER_QUESTIONS.find((question) => question.id === "law");
assert.match(parenting.choices.find((choice) => choice.policy === "construct").detail, /what information|facts/i);
assert.doesNotMatch(parenting.choices.find((choice) => choice.policy === "construct").detail, /fair|equal weight/i);
assert.match(reform.choices.find((choice) => choice.policy === "construct").detail, /future wealth/i);
assert.doesNotMatch(reform.choices.find((choice) => choice.policy === "construct").label, /fair|equal standing/i);
assert.equal(persuasion.axis, "Case — the emergency broadcast");
assert.doesNotMatch(persuasion.prompt, /false-sounding/i, "the emergency case must not label one option before the choice");
assert.doesNotMatch(
  persuasion.choices.find((choice) => choice.policy === "fiction").detail,
  /false-surfaced/i,
  "the fictionalist option must describe the speaker's belief plainly"
);
assert.match(law.scope, /legal guilt from moral guilt/i);

for (const policy of AFTER_POLICY_ORDER) {
  const answers = uniformAnswers(policy);
  reset(answers);
  const caseCounts = afterCaseCounts();
  const allCounts = afterAllCounts();
  const diagnosis = afterDiagnostic();
  assert.equal(answeredAfterCount(), 9);
  assert.equal(answeredCaseCount(), 7);
  assert.equal(caseCounts[policy], 7);
  assert.equal(allCounts[policy], 9);
  assert.deepEqual(Array.from(diagnosis.leaders), [policy]);
  assert.equal(diagnosis.max, 7);
  assert.equal(diagnosis.pattern, "7 of 7 cases");
  assert.equal(diagnosis.comparison.stable, true);
  const prompt = buildAfterAIProbePrompt();
  assert.match(prompt, new RegExp(AFTER_POLICIES[policy].theory));
  assert.match(prompt, /Ask one focused question at a time/i);
  assert.match(prompt, /Do not call a mixed pattern incoherent/i);
  assert.match(prompt, /classic post-error responses/i);
  assert.match(prompt, /broader replacement or reinterpretation strategies/i);
  assert.match(prompt, /MY EXACT PRACTICAL-CASE COUNTS/i);
  for (const question of AFTER_QUESTIONS) {
    assert.ok(prompt.includes(`Full situation: ${question.context}`), `AI prompt must include the full ${question.id} situation`);
    assert.ok(prompt.includes(`What the question is testing: ${question.scope}`), `AI prompt must include the ${question.id} scope`);
  }
}

// The repeated general-policy checks must never change the seven-case leader.
const separatedAnswers = Object.fromEntries(AFTER_CASE_IDS.map((id) => [id, "express"]));
separatedAnswers.opening = "abolish";
separatedAnswers.final = "abolish";
const separatedDiagnosis = afterDiagnostic(separatedAnswers);
assert.equal(separatedDiagnosis.counts.express, 7);
assert.equal(separatedDiagnosis.counts.abolish, 0);
assert.equal(separatedDiagnosis.allCounts.abolish, 2);
assert.deepEqual(Array.from(separatedDiagnosis.leaders), ["express"]);

for (const opening of AFTER_POLICY_ORDER) {
  for (const final of AFTER_POLICY_ORDER) {
    const comparison = afterOpeningFinalComparison({ opening, final });
    assert.equal(comparison.stable, opening === final);
    assert.ok(comparison.title.includes(AFTER_POLICIES[opening].theory));
    if (opening !== final) assert.ok(comparison.title.includes(AFTER_POLICIES[final].theory));
  }
}

const comparisonSamples = [
  ["retire-retain", { opening: "abolish", final: "express" }],
  ["conserve-fiction", { opening: "conserve", final: "fiction" }],
  ["fiction-revision", { opening: "fiction", final: "pragmatic" }],
  ["conserve-revise", { opening: "conserve", final: "express" }],
  ["procedure-other-revision", { opening: "construct", final: "pragmatic" }],
];
for (const [id, answers] of comparisonSamples) {
  const combinations = collectAfterCombinations(answers);
  assert.ok(combinations.some((item) => item.id === id), `${id} must be detected when both strategies are selected`);
  assert.ok(combinations.every((item) => /opening policy|final policy| and |,/.test(item.detail)), "comparison details must identify settings");
}

// Audit every possible six-strategy distribution across the seven practical cases: C(12, 5) = 792.
let distributions = 0;
function enumerateCounts(index, remaining, counts) {
  if (index === AFTER_POLICY_ORDER.length - 1) {
    const complete = [...counts, remaining];
    const answers = {};
    let cursor = 0;
    complete.forEach((count, policyIndex) => {
      for (let i = 0; i < count; i += 1) {
        answers[AFTER_CASE_IDS[cursor]] = AFTER_POLICY_ORDER[policyIndex];
        cursor += 1;
      }
    });
    const diagnosis = afterDiagnostic(answers);
    const expectedMax = Math.max(...complete);
    const expectedLeaders = AFTER_POLICY_ORDER.filter((_, policyIndex) => complete[policyIndex] === expectedMax);
    assert.equal(Object.values(diagnosis.counts).reduce((sum, count) => sum + count, 0), 7);
    assert.equal(diagnosis.max, expectedMax);
    assert.deepEqual(Array.from(diagnosis.leaders), Array.from(expectedLeaders));
    assert.deepEqual(Array.from(AFTER_POLICY_ORDER.map((policy) => diagnosis.counts[policy])), Array.from(complete));
    distributions += 1;
    return;
  }
  for (let count = 0; count <= remaining; count += 1) enumerateCounts(index + 1, remaining - count, [...counts, count]);
}
enumerateCounts(0, 7, []);
assert.equal(distributions, 792);

const queriedIds = [...source.matchAll(/document\.querySelector\("#([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
for (const id of queriedIds) assert.match(html, new RegExp(`id=["']${id}["']`), `after.html must contain #${id}`);

assert.match(html, /class="skip-link"[^>]+href="#afterLab"/, "keyboard users need a skip link");
assert.match(html, /id="afterQuestionPrompt" tabindex="-1"/, "the changing question heading must accept managed focus");
assert.match(html, /id="afterResultTitle" tabindex="-1"/, "the result heading must accept managed focus");
assert.match(html, /<fieldset[^>]+id="afterChoices"/);
assert.match(source, /type="radio"/);
assert.match(html, /id="afterNextButton"[^>]+disabled/);
assert.match(html, /role="progressbar"/);
assert.match(html, /id="afterLiveStatus"[^>]+role="status"/);
assert.match(html, /id="afterAIProbePrompt"/);
assert.match(html, /0 of 7 practical cases classified/);
assert.match(source, /answered === 7 \? "Your seven practical choices"/);
assert.match(source, /afterEls\.prompt\.focus/);
assert.match(source, /afterResultTitle"\)\.focus/);
assert.match(source, /A combination is a question to explain, not an automatic contradiction/);

const selectionBody = source.slice(source.indexOf("function selectAfterAnswer"), source.indexOf("function renderAfterShiftReport"));
assert.doesNotMatch(selectionBody, /setTimeout/, "selecting an answer must not auto-advance");

assert.match(fs.readFileSync(path.join(root, "index.html"), "utf8"), /href="after\.html"/, "the hub must link to the After Moral Facts lab");

console.log(`After Moral Facts audit passed: ${distributions.toLocaleString()} seven-case distributions, 36 opening/final comparisons, hierarchical taxonomy, full-context AI prompt, and managed keyboard focus verified.`);
