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
     obligationChoice, selectedObligationAnswers, forceCounts, answeredObligationCount,
     collectDirectGaps, collectBridgeInvocations, detectPathChanges,
     obligationDiagnosis, buildObligationAIProbePrompt
   };`,
  context,
);

const {
  FORCE_LEVELS,
  OBLIGATION_QUESTIONS,
  obligationState,
  forceCounts,
  answeredObligationCount,
  collectDirectGaps,
  collectBridgeInvocations,
  detectPathChanges,
  obligationDiagnosis,
  buildObligationAIProbePrompt,
} = context.audit;

const levelKeys = Object.keys(FORCE_LEVELS);

function reset(answers = {}) {
  obligationState.answers = { ...answers };
  obligationState.index = 0;
}

function answerCountBy(predicate) {
  return OBLIGATION_QUESTIONS.reduce((count, question) => {
    const choice = question.choices.find((candidate) => candidate.id === obligationState.answers[question.id]);
    return count + (choice && predicate(choice) ? 1 : 0);
  }, 0);
}

assert.equal(OBLIGATION_QUESTIONS.length, 7, "the obligation lab must use seven deliberate steps");
assert.equal(new Set(OBLIGATION_QUESTIONS.map((question) => question.id)).size, 7, "question ids must be unique");
assert.deepEqual(
  Array.from(levelKeys),
  ["commitment", "social", "pressure", "sanction", "conditional", "bridge", "universal"],
  "the basis map must distinguish peer human sources, added foundations, and approval-independent claims",
);

const directGapChoices = [];
for (const question of OBLIGATION_QUESTIONS) {
  assert.equal(question.choices.length, 5, `${question.id} must offer five clearly different answers`);
  assert.ok(question.context.length >= 180, `${question.id} needs enough case context to hold the comparison still`);
  assert.ok(question.assumptions.length >= 100, `${question.id} must state its fixed assumptions`);
  assert.ok(question.scope.length >= 90, `${question.id} must define the scope of the test`);
  assert.ok(
    question.guide.plain.length >= 55 && question.guide.separate.length >= 70 && question.guide.reveal.length >= 55,
    `${question.id} needs a full plain-language annotation`,
  );
  assert.equal(new Set(question.choices.map((choice) => choice.id)).size, 5, `${question.id} choice ids must be unique`);
  for (const choice of question.choices) {
    assert.ok(levelKeys.includes(choice.level), `${question.id}/${choice.id} has an unknown basis category`);
    assert.ok(choice.label.length >= 35, `${question.id}/${choice.id} must state an unambiguous answer`);
    assert.ok(choice.detail.length >= 75, `${question.id}/${choice.id} must explain exactly what the answer means`);
    assert.ok(choice.interpretation.length >= 80, `${question.id}/${choice.id} must disclose what the answer can establish`);
    if (choice.directGap) {
      directGapChoices.push({ question, choice });
      assert.match(choice.directGap.id, /^[a-z0-9-]+$/, `${question.id}/${choice.id} needs a stable gap id`);
      assert.ok(choice.directGap.title.length >= 30, `${question.id}/${choice.id} needs a precise gap title`);
      assert.ok(choice.directGap.detail.length >= 110, `${question.id}/${choice.id} needs a full missing-premise explanation`);
      assert.ok(["medium", "high"].includes(choice.directGap.severity), `${question.id}/${choice.id} needs a valid severity`);
    }
  }
}

assert.equal(directGapChoices.length, 6, "six scenario/final answers should encode a direct inference gap");
assert.equal(
  new Set(directGapChoices.map(({ choice }) => choice.directGap.id)).size,
  directGapChoices.length,
  "every direct inference gap must have a unique id",
);
assert.equal(
  OBLIGATION_QUESTIONS[0].choices.some((choice) => choice.directGap),
  false,
  "the opening question defines a claim and must not prejudge that claim as an unsupported inference",
);

const offeredLevels = new Set(OBLIGATION_QUESTIONS.flatMap((question) => question.choices.map((choice) => choice.level)));
assert.deepEqual(
  Array.from(offeredLevels).sort(),
  Array.from(levelKeys).sort(),
  "every basis-map category must be reachable through an answer",
);

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
assert.equal(Object.values(forceCounts()).reduce((sum, count) => sum + count, 0), 7, "each answer must add exactly one basis-map marker");
assert.equal(collectDirectGaps().length, 0, "a clear local-code path must not be mislabeled incoherent");
assert.equal(collectBridgeInvocations().length, 0, "the clear local-code path must not invent an added foundation");
assert.equal(obligationDiagnosis().key, "social", "the final social-code answer must produce the social-code diagnostic");
assert.equal(obligationDiagnosis().universal, "Follows within scope", "the social-code result must assess only the stated social claim");

reset({ meaning: "universal", finalSource: "socialCodeOnly" });
assert.equal(collectDirectGaps().length, 0, "an opening claim is not itself a direct inference gap");
assert.ok(detectPathChanges().some((change) => change.id === "scope-narrowed"), "a narrower final answer must be reported as a possible revision");

reset({ meaning: "social", finalSource: "universalFromDisapproval" });
assert.ok(detectPathChanges().some((change) => change.id === "scope-broadened"), "a broader final answer must be reported as a scope change");

reset({ meaning: "universal", finalSource: "needBeyond" });
assert.equal(collectDirectGaps().length, 0, "claiming a wide duty while admitting that its foundation remains open is not a direct inference gap");
assert.equal(detectPathChanges().length, 0, "retaining a wide claim while naming an open foundation is not a scope change");

const allDirectGapPath = {
  meaning: "universal",
  secret: "communityMakesWrong",
  towns: "bothUniversal",
  reformer: "futureProof",
  outsider: "disapprovalBinds",
  enforcer: "forceMakesRight",
  finalSource: "universalFromDisapproval",
};
reset(allDirectGapPath);
assert.equal(collectDirectGaps().length, 6, "every explicit social-fact-to-duty inference must be reported exactly once");
assert.equal(obligationDiagnosis().directGapCount, 6, "the displayed direct-gap count must match the exact report");
assert.equal(obligationDiagnosis().key, "universal", "the final approval-independent claim must produce the missing-ought diagnostic");
assert.ok(collectDirectGaps().some((gap) => gap.id === "location-authority"), "the two-towns case must flag authority from location, not a fake logical contradiction");
assert.ok(collectDirectGaps().some((gap) => gap.id === "force-authority"), "perfect enforcement must not silently become moral authority");

reset({ reformer: "rightBeyond", finalSource: "socialCodeOnly" });
assert.equal(collectDirectGaps().length, 0, "using equality in one case and then assessing disapproval alone must not be falsely marked inconsistent");
assert.equal(collectBridgeInvocations().length, 1, "the equality answer must be recorded as an added foundation to examine");

const bridgePath = {
  meaning: "universal",
  secret: "unjustRule",
  towns: "outsideStandard",
  reformer: "rightBeyond",
  outsider: "dignityLimit",
  enforcer: "autonomyLimit",
  finalSource: "needBeyond",
};
reset(bridgePath);
assert.equal(collectBridgeInvocations().length, 6, "every explicitly added foundation must appear in the bridge report");
assert.equal(collectDirectGaps().length, 0, "openly adding a foundation must not be called a direct inference gap");

reset({ finalSource: "conditionalMembers" });
assert.equal(obligationDiagnosis().key, "conditional", "membership and reciprocity must remain a conditional diagnostic");
assert.equal(obligationDiagnosis().universal, "Depends on added conditions", "the conditional result must disclose that its conditions were added");

reset({ finalSource: "practicalReasons" });
assert.equal(obligationDiagnosis().key, "pressure", "avoiding social cost must remain a practical-pressure diagnostic");

reset({ finalSource: "needBeyond" });
assert.equal(obligationDiagnosis().key, "bridge", "an extra foundation must be reported as an open bridge, not as proof");

// Exhaust every possible completed path so counts and report items cannot drift apart.
let completedPaths = 0;
function exhaust(questionIndex, answers) {
  if (questionIndex === OBLIGATION_QUESTIONS.length) {
    reset(answers);
    const diagnosis = obligationDiagnosis();
    assert.equal(answeredObligationCount(), 7);
    assert.equal(Object.values(forceCounts()).reduce((sum, count) => sum + count, 0), 7);
    assert.equal(diagnosis.directGapCount, answerCountBy((choice) => Boolean(choice.directGap)));
    assert.equal(diagnosis.bridges.length, answerCountBy((choice) => choice.level === "bridge"));
    assert.equal(diagnosis.key, OBLIGATION_QUESTIONS.at(-1).choices.find((choice) => choice.id === answers.finalSource).level);
    completedPaths += 1;
    return;
  }
  const question = OBLIGATION_QUESTIONS[questionIndex];
  for (const choice of question.choices) exhaust(questionIndex + 1, { ...answers, [question.id]: choice.id });
}
exhaust(0, {});
assert.equal(completedPaths, 5 ** 7, "the audit must cover all 78,125 completed answer paths");

reset(candidSocialPath);
const aiPrompt = buildObligationAIProbePrompt();
for (const question of OBLIGATION_QUESTIONS) {
  assert.match(aiPrompt, new RegExp(question.axis.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `the AI prompt must include ${question.id}`);
}
assert.match(aiPrompt, /not a ranking/i, "the AI prompt must explain that basis categories are not ordinal");
assert.match(aiPrompt, /one question at a time/i, "the AI prompt must require a paced interview");
assert.match(aiPrompt, /universal, objective, stance-independent, mind-independent, and approval-independent/i, "the AI prompt must preserve the central distinctions");

const queriedIds = [...source.matchAll(/document\.querySelector\("#([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
for (const id of queriedIds) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `obligation.html must contain #${id}`);
}

assert.match(html, /<fieldset[^>]+id="obligationChoices"/, "answers must use a native fieldset");
assert.match(source, /type="radio"/, "answers must use native radio inputs");
assert.match(html, /id="obligationNextButton"[^>]+disabled/, "the survey must require an explicit Next action after selection");
assert.match(html, /role="progressbar"/, "question progress must be exposed to assistive technology");
assert.match(html, /id="obligationLiveStatus"[^>]+role="status"/, "question changes must have a concise live announcement");
assert.match(html, /id="obligationAIProbePrompt"/, "the result must include a fully contextual AI interview prompt");

const selectionBody = source.slice(source.indexOf("function selectObligationAnswer"), source.indexOf("function renderBridgeReport"));
assert.doesNotMatch(selectionBody, /setTimeout/, "selecting an answer must not auto-advance before the user can review it");

for (const page of ["index.html", "papers.html", "obligation.html"]) {
  const pageHtml = fs.readFileSync(path.join(root, page), "utf8");
  assert.match(pageHtml, /href="obligation\.html"/, `${page} must link to the obligation lab`);
}

console.log(`Obligation audit passed: ${completedPaths.toLocaleString()} complete paths, exact direct-gap accounting, non-ordinal categories, bridge tracking, native controls, and full AI context verified.`);
