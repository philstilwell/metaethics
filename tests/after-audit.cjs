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
     AFTER_POLICIES, AFTER_POLICY_ORDER, AFTER_GROUPS, AFTER_QUESTIONS,
     afterState, afterChoice, selectedAfterAnswers, afterCounts,
     answeredAfterCount, afterOpeningFinalComparison, collectAfterCombinations,
     afterDiagnostic, buildAfterAIProbePrompt
   };`,
  context,
);

const {
  AFTER_POLICIES,
  AFTER_POLICY_ORDER,
  AFTER_GROUPS,
  AFTER_QUESTIONS,
  afterState,
  afterCounts,
  answeredAfterCount,
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
  "the lab must preserve the six post-error policies in a stable order",
);
assert.deepEqual(
  Array.from(AFTER_GROUPS.flatMap((group) => group.families)),
  Array.from(AFTER_POLICY_ORDER),
  "the chart groups must contain every policy exactly once",
);
assert.equal(AFTER_POLICIES.abolish.theory, "Moral abolitionism");
assert.equal(AFTER_POLICIES.fiction.theory, "Revolutionary moral fictionalism");
assert.equal(AFTER_POLICIES.conserve.theory, "Moral conservationism");
assert.equal(AFTER_POLICIES.express.theory, "Expressivist revision");
assert.equal(AFTER_POLICIES.construct.theory, "Constructivist revision");
assert.equal(AFTER_POLICIES.pragmatic.theory, "Ordinary-language pragmatism");
assert.match(AFTER_POLICIES.conserve.short, /belief/i, "conservationism must preserve ordinary belief, not merely familiar words");
assert.match(AFTER_POLICIES.fiction.short, /fiction/i, "fictionalism must disclose conscious fiction");
assert.match(AFTER_POLICIES.express.note, /broad revision strategy/i, "expressivist revision must be scoped as a broad strategy");
assert.match(AFTER_POLICIES.construct.note, /not every theory called constructivist/i, "constructivist revision must not stand in for every constructivism");
assert.match(AFTER_POLICIES.pragmatic.note, /project’s label/i, "ordinary-language pragmatism must not be presented as a single established doctrine");

assert.equal(AFTER_QUESTIONS.length, 9, "the lab must contain nine deliberate fixed-sequence questions");
assert.equal(new Set(AFTER_QUESTIONS.map((question) => question.id)).size, 9, "question ids must be unique");
assert.deepEqual(
  Array.from(AFTER_QUESTIONS.map((question) => question.id)),
  ["opening", "promise", "parenting", "friendship", "blame", "law", "reform", "persuasion", "final"],
  "the sequence must move from premise through private and public practice to a final policy",
);
assert.equal(
  AFTER_QUESTIONS[0].prompt,
  "Suppose there are no objective moral facts. What should we do with moral language?",
  "the lab must begin with the requested question verbatim",
);

for (const question of AFTER_QUESTIONS) {
  assert.equal(question.choices.length, 6, `${question.id} must offer all six policies`);
  assert.deepEqual(
    Array.from(question.choices.map((choice) => choice.policy)),
    Array.from(AFTER_POLICY_ORDER),
    `${question.id} must offer each policy once in the stable order`,
  );
  assert.ok(question.prompt.length >= 70, `${question.id} needs an explicit question`);
  assert.ok(question.context.length >= 180, `${question.id} needs a fully specified case`);
  assert.ok(question.assumptions.length >= 120, `${question.id} must state fixed assumptions`);
  assert.ok(question.scope.length >= 120, `${question.id} must define its scope`);
  assert.ok(question.guide.plain.length >= 80, `${question.id} needs a plain-language annotation`);
  assert.ok(question.guide.separate.length >= 100, `${question.id} must say what to keep separate`);
  assert.ok(question.guide.reveal.length >= 80, `${question.id} must explain what the answer reveals`);
  for (const choice of question.choices) {
    assert.equal(choice.id, choice.policy, `${question.id} choice id must equal its coded policy`);
    assert.ok(choice.label.length >= 65, `${question.id}/${choice.id} needs an unambiguous answer label`);
    assert.ok(choice.detail.length >= 110, `${question.id}/${choice.id} needs a complete definition`);
    assert.ok(choice.interpretation.length >= 160, `${question.id}/${choice.id} needs an informative result annotation`);
  }
}

assert.match(AFTER_QUESTIONS.find((question) => question.id === "blame").assumptions, /no objective moral desert/i);
assert.match(AFTER_QUESTIONS.find((question) => question.id === "law").scope, /legal guilt from moral guilt/i);
assert.match(AFTER_QUESTIONS.find((question) => question.id === "persuasion").scope, /effectiveness and honesty/i);
assert.match(AFTER_QUESTIONS.find((question) => question.id === "parenting").scope, /not choose a punishment/i);

for (const policy of AFTER_POLICY_ORDER) {
  const answers = uniformAnswers(policy);
  reset(answers);
  const counts = afterCounts();
  const diagnosis = afterDiagnostic();
  assert.equal(answeredAfterCount(), 9, `${policy} uniform path must have nine answers`);
  assert.equal(Object.values(counts).reduce((sum, count) => sum + count, 0), 9);
  assert.equal(counts[policy], 9);
  assert.deepEqual(Array.from(diagnosis.leaders), [policy]);
  assert.equal(diagnosis.max, 9);
  assert.equal(diagnosis.pattern, "9 of 9");
  assert.equal(diagnosis.comparison.stable, true);
  const prompt = buildAfterAIProbePrompt();
  assert.match(prompt, new RegExp(AFTER_POLICIES[policy].theory));
  assert.match(prompt, /Ask one focused question at a time/i);
  assert.match(prompt, /Do not call a mixed pattern incoherent/i);
  assert.match(prompt, /ordinary facts about harm, agreements, laws/i);
  assert.match(prompt, /MY NINE ANSWERS/i);
  assert.match(prompt, /FIVE SELECTED COMPARISONS/i);
}

for (const opening of AFTER_POLICY_ORDER) {
  for (const final of AFTER_POLICY_ORDER) {
    const comparison = afterOpeningFinalComparison({ opening, final });
    assert.equal(comparison.stable, opening === final, `${opening} to ${final} must report stability exactly`);
    assert.ok(comparison.title.includes(AFTER_POLICIES[opening].theory));
    if (opening !== final) assert.ok(comparison.title.includes(AFTER_POLICIES[final].theory));
  }
}

const conflictSamples = [
  ["abolish-conserve", { opening: "abolish", final: "conserve" }],
  ["abolish-fiction", { opening: "abolish", final: "fiction" }],
  ["fiction-express", { opening: "fiction", final: "express" }],
  ["conserve-revise", { opening: "conserve", final: "construct" }],
  ["construct-pragmatic", { opening: "construct", final: "pragmatic" }],
];
for (const [id, answers] of conflictSamples) {
  const combinations = collectAfterCombinations(afterCounts(answers));
  assert.ok(combinations.some((item) => item.id === id), `${id} must be detected when both policies are selected`);
}

// Audit every possible six-policy count distribution across nine answers: C(14, 5) = 2,002.
let distributions = 0;
function enumerateCounts(index, remaining, counts) {
  if (index === AFTER_POLICY_ORDER.length - 1) {
    const complete = [...counts, remaining];
    const answers = {};
    let cursor = 0;
    complete.forEach((count, policyIndex) => {
      for (let i = 0; i < count; i += 1) {
        answers[AFTER_QUESTIONS[cursor].id] = AFTER_POLICY_ORDER[policyIndex];
        cursor += 1;
      }
    });
    const diagnosis = afterDiagnostic(answers);
    const expectedMax = Math.max(...complete);
    const expectedLeaders = AFTER_POLICY_ORDER.filter((_, policyIndex) => complete[policyIndex] === expectedMax);
    assert.equal(Object.values(diagnosis.counts).reduce((sum, count) => sum + count, 0), 9);
    assert.equal(diagnosis.max, expectedMax);
    assert.deepEqual(Array.from(diagnosis.leaders), Array.from(expectedLeaders));
    assert.deepEqual(
      Array.from(AFTER_POLICY_ORDER.map((policy) => diagnosis.counts[policy])),
      Array.from(complete),
      "displayed counts must exactly reproduce the selected distribution",
    );
    distributions += 1;
    return;
  }
  for (let count = 0; count <= remaining; count += 1) enumerateCounts(index + 1, remaining - count, [...counts, count]);
}
enumerateCounts(0, 9, []);
assert.equal(distributions, 2002, "the audit must cover all 2,002 count distributions");

const queriedIds = [...source.matchAll(/document\.querySelector\("#([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
for (const id of queriedIds) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `after.html must contain #${id}`);
}

assert.match(html, /<fieldset[^>]+id="afterChoices"/, "answers must use a native fieldset");
assert.match(source, /type="radio"/, "answers must use native radio inputs");
assert.match(html, /id="afterNextButton"[^>]+disabled/, "the lab must require an explicit Next action");
assert.match(html, /role="progressbar"/, "progress must be exposed to assistive technology");
assert.match(html, /id="afterLiveStatus"[^>]+role="status"/, "question changes must have a live announcement");
assert.match(html, /id="afterAIProbePrompt"/, "results must include the full AI follow-up prompt");
assert.match(html, /id="afterMapKicker">Your answers so far/, "the live chart must explain that it reflects completed answers");
assert.match(source, /answered === 9 \? "Your nine answers"/, "the chart heading must become final after nine answers");
assert.match(source, /Counts show how often you chose each policy|exact count/i, "the chart or diagnostic must reject score-like interpretation");
assert.match(source, /A combination is a question to explain, not an automatic contradiction/, "results must not automatically label mixed policies incoherent");

const selectionBody = source.slice(source.indexOf("function selectAfterAnswer"), source.indexOf("function renderAfterShiftReport"));
assert.doesNotMatch(selectionBody, /setTimeout/, "selecting an answer must not auto-advance");

for (const page of ["index.html", "obligation.html", "wrong.html", "after.html", "papers.html"]) {
  const pageHtml = fs.readFileSync(path.join(root, page), "utf8");
  assert.match(pageHtml, /href="after\.html"/, `${page} must link to the After Moral Facts lab`);
}

console.log(`After Moral Facts audit passed: ${distributions.toLocaleString()} count distributions, 36 opening/final comparisons, nine fully specified questions, six distinct post-error policies, native controls, exact counts, and full AI context verified.`);
