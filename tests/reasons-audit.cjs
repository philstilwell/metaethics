"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "reasons.js"), "utf8");
const html = fs.readFileSync(path.join(root, "reasons.html"), "utf8");
const pureSource = source.slice(0, source.indexOf("const reasonsEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     REASON_SOURCES, STANCE_CHOICES, REASON_CASES, ROLE_QUESTION,
     MOTIVATION_QUESTION, SCOPE_QUESTION, REASON_QUESTIONS, reasonsState,
     answeredReasonsCount, reasonSourceCounts, leadingReasonSources,
     roleMatched, reasonSeams, reasonsDiagnosis, buildReasonsAIProbePrompt
   };`,
  context,
);

const {
  REASON_SOURCES,
  STANCE_CHOICES,
  REASON_CASES,
  ROLE_QUESTION,
  MOTIVATION_QUESTION,
  SCOPE_QUESTION,
  REASON_QUESTIONS,
  reasonsState,
  answeredReasonsCount,
  reasonSourceCounts,
  leadingReasonSources,
  roleMatched,
  reasonSeams,
  reasonsDiagnosis,
  buildReasonsAIProbePrompt,
} = context.audit;

const sourceIds = Object.keys(REASON_SOURCES);

function reset(answers = {}) {
  reasonsState.answers = { ...answers };
  reasonsState.index = 0;
}

assert.deepEqual(
  Array.from(sourceIds),
  ["current", "informed", "commitment", "fair", "external", "none"],
  "the source map must retain six distinct, non-ordinal accounts",
);
assert.equal(REASON_CASES.length, 7, "the lab must use seven pressure cases");
assert.equal(REASON_QUESTIONS.length, 12, "the lab must separate two definitions, one role control, seven cases, motivation, and scope");
assert.equal(new Set(REASON_QUESTIONS.map((question) => question.id)).size, 12, "question ids must be unique");
assert.equal(STANCE_CHOICES.length, 6, "the opening and final definitions must offer every source account");

for (const question of REASON_CASES) {
  assert.equal(question.choices.length, 6, `${question.id} must offer all six source accounts`);
  assert.deepEqual(
    Array.from(question.choices.map((choice) => choice.source)),
    Array.from(sourceIds),
    `${question.id} must offer each source exactly once in the stable order`,
  );
  assert.ok(question.context.length >= 180, `${question.id} needs a fully specified case`);
  assert.ok(question.assumptions.length >= 100, `${question.id} must state fixed assumptions`);
  assert.ok(question.scope.length >= 100, `${question.id} must define the exact question scope`);
  assert.ok(question.guide.plain.length >= 65, `${question.id} needs a plain-language annotation`);
  assert.ok(question.guide.separate.length >= 70, `${question.id} must identify a nearby idea to keep separate`);
  assert.ok(question.guide.reveal.length >= 65, `${question.id} must say what the answer can reveal`);
  for (const choice of question.choices) {
    assert.ok(choice.label.length >= 45, `${question.id}/${choice.id} needs an unambiguous label`);
    assert.ok(choice.detail.length >= 85, `${question.id}/${choice.id} needs a precise definition`);
    assert.ok(choice.establishes.length >= 45, `${question.id}/${choice.id} must state what follows`);
    assert.ok(choice.limit.length >= 75, `${question.id}/${choice.id} must state what remains open`);
  }
}

assert.equal(ROLE_QUESTION.choices.length, 5, "the role control must offer five classifications");
assert.equal(ROLE_QUESTION.choices.filter((choice) => choice.correct).length, 1, "the role control must have one exact classification answer");
assert.match(ROLE_QUESTION.why, /roles can overlap/i, "the role control must not imply that explanation and motivation are mutually exclusive");
assert.equal(MOTIVATION_QUESTION.choices.length, 6, "reason and motivation must retain six distinct relations");
assert.equal(SCOPE_QUESTION.choices.length, 5, "scope must distinguish moral-only, agent-grounded, global, practical-realist, and agnostic positions");

for (const sourceId of sourceIds) {
  const answers = {
    opening: sourceId,
    roles: "separate",
    motivation: sourceId === "none" ? "none" : "counterfactual",
    scope: sourceId === "none" ? "global" : "moralOnly",
    final: sourceId,
  };
  REASON_CASES.forEach((question) => { answers[question.id] = sourceId; });
  reset(answers);
  const counts = reasonSourceCounts();
  const diagnosis = reasonsDiagnosis();
  assert.equal(answeredReasonsCount(), 12, `${sourceId} uniform path must be complete`);
  assert.equal(Object.values(counts).reduce((sum, entry) => sum + entry.hits, 0), 7, "each case must contribute one hit");
  assert.equal(Object.values(counts).reduce((sum, entry) => sum + entry.opportunities, 0), 42, "all six accounts must be offered in all seven cases");
  assert.equal(counts[sourceId].hits, 7, `${sourceId} must receive all seven selected hits`);
  assert.equal(leadingReasonSources(counts)[0][0], sourceId, `${sourceId} must be the exact leader`);
  assert.equal(roleMatched(), true, "the correct role answer must be recognized independently of stance");
  assert.match(diagnosis.summary, /Seven cases/, "the summary must disclose its seven-case denominator");
  const prompt = buildReasonsAIProbePrompt();
  assert.match(prompt, /KEEP THREE ROLES SEPARATE/, "the AI prompt must preserve the role distinction");
  assert.match(prompt, /Ask one question at a time/, "the AI prompt must require a paced interview");
  assert.match(prompt, /Moral non-realism does not automatically entail/, "the AI prompt must prevent an invalid implication from moral non-realism");
}

reset({
  opening: "current",
  roles: "separate",
  motivation: "actual",
  scope: "internalOnly",
  final: "current",
  ...Object.fromEntries(REASON_CASES.map((question, index) => [question.id, index < 3 ? "external" : "current"])),
});
assert.ok(reasonSeams().some((seam) => seam.id === "motivation-external"), "actual-motivation and aim-independent answers must be compared");
assert.ok(reasonSeams().some((seam) => seam.id === "external-scope"), "the stated scope must be compared with aim-independent cases");
assert.ok(reasonSeams().some((seam) => seam.id === "current-external"), "the final current-aim rule must be compared with repeated external answers");

reset({
  opening: "none",
  roles: "separate",
  motivation: "none",
  scope: "global",
  final: "none",
  ...Object.fromEntries(REASON_CASES.map((question) => [question.id, "none"])),
});
assert.equal(reasonSeams().length, 0, "a fully skeptical path must not receive an invented contradiction");

let completedCaseProfiles = 0;
function exhaustCases(index, answers) {
  if (index === REASON_CASES.length) {
    reset({ opening: "informed", roles: "separate", motivation: "counterfactual", scope: "moralOnly", final: "informed", ...answers });
    const counts = reasonSourceCounts();
    assert.equal(Object.values(counts).reduce((sum, entry) => sum + entry.hits, 0), 7);
    assert.equal(Object.values(counts).reduce((sum, entry) => sum + entry.opportunities, 0), 42);
    assert.equal(leadingReasonSources(counts)[0][1].hits, Math.max(...Object.values(counts).map((entry) => entry.hits)));
    completedCaseProfiles += 1;
    return;
  }
  const question = REASON_CASES[index];
  for (const sourceId of sourceIds) exhaustCases(index + 1, { ...answers, [question.id]: sourceId });
}
exhaustCases(0, {});
assert.equal(completedCaseProfiles, 6 ** 7, "the audit must cover all 279,936 seven-case source profiles");

const queriedIds = [...source.matchAll(/document\.querySelector\("#([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
for (const id of queriedIds) assert.match(html, new RegExp(`id=["']${id}["']`), `reasons.html must contain #${id}`);
assert.match(html, /Suppose there are no objective moral facts\. What, if anything, can still count in favor/, "the requested opening question must appear verbatim");
assert.match(html, /<fieldset[^>]+id="reasonsChoices"/, "answers must use a native fieldset");
assert.match(source, /type = "radio"/, "answers must use native radio inputs");
assert.match(html, /id="reasonsNextButton"[^>]+disabled/, "the lab must require an explicit Next action");
assert.match(html, /role="progressbar"/, "progress must be exposed to assistive technology");
assert.match(html, /id="reasonsAIProbePrompt"/, "results must include the full optional AI prompt");
assert.match(html, /Counts reflect only the seven cases/, "the live graph must say exactly what it counts");

console.log(`Reasons audit passed: ${completedCaseProfiles.toLocaleString()} case profiles, six exact sources, role separation, scope controls, seam accounting, and full AI context verified.`);
