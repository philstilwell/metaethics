"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "wrong.js"), "utf8");
const html = fs.readFileSync(path.join(root, "wrong.html"), "utf8");
const pureSource = source.slice(source.indexOf("const MEANING_FAMILIES"), source.indexOf("const meaningEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     MEANING_FAMILIES, MEANING_FAMILY_ORDER, MEANING_GROUPS,
     OPENING_QUESTION, VALUE_CHANGE_QUESTION, CLAIM_ROUTE_QUESTIONS,
     COMMITMENT_ROUTE_QUESTIONS, STANDARDS_ROUTE_QUESTIONS, TOOL_ROUTE_QUESTIONS,
     DISAGREEMENT_QUESTION, CORRECTION_QUESTION, FINAL_QUESTION, ROUTES,
     meaningState, routeKeyForFamily, meaningRouteKey, activeMeaningQuestions,
     meaningChoice, pruneInactiveMeaningAnswers, selectedMeaningAnswers,
     meaningCounts, answeredMeaningCount, openingFinalComparison,
     collectMeaningCombinations, meaningDiagnostic, buildMeaningAIProbePrompt
   };`,
  context,
);

const {
  MEANING_FAMILIES,
  MEANING_FAMILY_ORDER,
  MEANING_GROUPS,
  OPENING_QUESTION,
  VALUE_CHANGE_QUESTION,
  CLAIM_ROUTE_QUESTIONS,
  COMMITMENT_ROUTE_QUESTIONS,
  STANDARDS_ROUTE_QUESTIONS,
  TOOL_ROUTE_QUESTIONS,
  DISAGREEMENT_QUESTION,
  CORRECTION_QUESTION,
  FINAL_QUESTION,
  ROUTES,
  meaningState,
  routeKeyForFamily,
  meaningRouteKey,
  activeMeaningQuestions,
  pruneInactiveMeaningAnswers,
  meaningCounts,
  answeredMeaningCount,
  openingFinalComparison,
  collectMeaningCombinations,
  meaningDiagnostic,
  buildMeaningAIProbePrompt,
} = context.audit;

function reset(answers = {}) {
  meaningState.answers = { ...answers };
  meaningState.index = 0;
}

function fillActive(family) {
  const answers = {};
  answers.opening = family;
  reset(answers);
  for (const question of activeMeaningQuestions()) answers[question.id] = family;
  reset(answers);
  return answers;
}

assert.deepEqual(
  Array.from(MEANING_FAMILY_ORDER),
  ["realism", "error", "express", "relative", "construct", "fiction"],
  "the lab must preserve six separate semantic families",
);
assert.equal(MEANING_FAMILIES.realism.theory, "Robust moral realism", "the realist label must match the objective version being tested");
assert.equal(MEANING_FAMILIES.express.theory, "Plan/norm expressivism", "the expressivist label must match the plan-and-norm options");
assert.equal(MEANING_FAMILIES.construct.theory, "Idealized-procedure constructivism", "the constructivist label must disclose the narrow procedural model");
assert.equal(MEANING_FAMILIES.fiction.theory, "Revolutionary moral fictionalism", "the fictionalist label must disclose deliberate rather than hermeneutic fiction");
assert.deepEqual(
  Array.from(MEANING_GROUPS.flatMap((group) => group.families)),
  Array.from(MEANING_FAMILY_ORDER),
  "the graphical groups must contain every family exactly once",
);

const routeExpectations = {
  realism: "claim",
  error: "claim",
  express: "commitment",
  relative: "standards",
  construct: "standards",
  fiction: "tool",
};

for (const family of MEANING_FAMILY_ORDER) {
  assert.equal(routeKeyForFamily(family), routeExpectations[family], `${family} must select the intended deeper route`);
  reset({ opening: family });
  assert.equal(meaningRouteKey(), routeExpectations[family]);
  const questions = activeMeaningQuestions();
  assert.equal(questions.length, 7, `${family} route must contain seven questions`);
  assert.equal(new Set(questions.map((question) => question.id)).size, 7, `${family} route question ids must be unique`);
  assert.equal(questions[0].id, "opening");
  assert.equal(questions.at(-1).id, "final");
  assert.deepEqual(
    Array.from(questions.slice(2, 4).map((question) => question.id)),
    Array.from(ROUTES[routeExpectations[family]].questions.map((question) => question.id)),
    `${family} must receive the correct two route-specific cases`,
  );
}

const everyQuestion = [
  OPENING_QUESTION,
  VALUE_CHANGE_QUESTION,
  ...CLAIM_ROUTE_QUESTIONS,
  ...COMMITMENT_ROUTE_QUESTIONS,
  ...STANDARDS_ROUTE_QUESTIONS,
  ...TOOL_ROUTE_QUESTIONS,
  DISAGREEMENT_QUESTION,
  CORRECTION_QUESTION,
  FINAL_QUESTION,
];

assert.match(VALUE_CHANGE_QUESTION.context, /morally permissible/i, "the reversal must use a positive permission claim");
assert.doesNotMatch(VALUE_CHANGE_QUESTION.context, /not morally wrong/i, "the reversal must not equate negated wrongness with permission");
const translationQuestion = COMMITMENT_ROUTE_QUESTIONS.find((question) => question.id === "translation");
const translationRealism = translationQuestion.choices.find((choice) => choice.family === "realism");
assert.doesNotMatch(translationRealism.label, /condemnable/i, "the no-moral-label translation must not smuggle in condemnability");
assert.match(translationRealism.label, /independent of anyone’s rules or approval/i, "the translation must preserve the robust realist claim");
const broadcastQuestion = TOOL_ROUTE_QUESTIONS.find((question) => question.id === "broadcast");
assert.match(broadcastQuestion.prompt, /what is that sentence doing/i, "the broadcast case must ask about sentence function rather than permissibility");
assert.match(broadcastQuestion.scope, /Keep that separate.*acceptable/i, "the broadcast case must separate meaning from permission to use it");

assert.equal(new Set(everyQuestion.map((question) => question.id)).size, everyQuestion.length, "all question-bank ids must be unique");

for (const question of everyQuestion) {
  assert.equal(question.choices.length, 6, `${question.id} must offer all six interpretations`);
  assert.deepEqual(
    Array.from(question.choices.map((choice) => choice.family)),
    Array.from(MEANING_FAMILY_ORDER),
    `${question.id} must offer each family once in the stable order`,
  );
  assert.ok(question.context.length >= 180, `${question.id} needs a fully specified case`);
  assert.ok(question.assumptions.length >= 120, `${question.id} must state its fixed assumptions`);
  assert.ok(question.scope.length >= 120, `${question.id} must define the semantic scope`);
  assert.ok(question.guide.plain.length >= 70, `${question.id} needs a plain-language annotation`);
  assert.ok(question.guide.separate.length >= 100, `${question.id} must state what to keep separate`);
  assert.ok(question.guide.reveal.length >= 80, `${question.id} must explain what the answer reveals`);
  for (const choice of question.choices) {
    assert.equal(choice.id, choice.family, `${question.id} choice id must equal its coded family`);
    assert.ok(choice.label.length >= 70, `${question.id}/${choice.id} needs an unambiguous answer label`);
    assert.ok(choice.detail.length >= 110, `${question.id}/${choice.id} needs a full plain-language definition`);
    assert.ok(choice.interpretation.length >= 110, `${question.id}/${choice.id} needs a precise diagnostic interpretation`);
  }
}

// Changing the opening route must remove stale answers from the old branch.
reset({ opening: "realism", catalog: "realism", lastMind: "error", valueChange: "express" });
meaningState.answers.opening = "fiction";
pruneInactiveMeaningAnswers();
assert.equal(meaningState.answers.catalog, undefined, "a stale fact-route answer must be removed");
assert.equal(meaningState.answers.lastMind, undefined, "every stale fact-route answer must be removed");
assert.equal(meaningState.answers.valueChange, "express", "a shared answer must survive a route change");

for (const family of MEANING_FAMILY_ORDER) {
  fillActive(family);
  const diagnosis = meaningDiagnostic();
  assert.equal(answeredMeaningCount(), 7, `${family} path must contain seven selected answers`);
  assert.equal(Object.values(meaningCounts()).reduce((sum, count) => sum + count, 0), 7, `${family} counts must total seven`);
  assert.equal(diagnosis.leaders.length, 1, `${family} uniform path must have one leader`);
  assert.equal(diagnosis.leaders[0], family, `${family} uniform path must lead with itself`);
  assert.equal(diagnosis.maximum, 7, `${family} uniform path must record seven uses`);
  assert.equal(diagnosis.pattern, "7 of 7 used one leading interpretation", `${family} uniform path must report the exact count without an inferred stability label`);
  assert.equal(openingFinalComparison().stable, true, `${family} uniform path must have a stable opening/final definition`);
  const prompt = buildMeaningAIProbePrompt();
  assert.match(prompt, new RegExp(MEANING_FAMILIES[family].theory), `${family} AI context must name the associated family`);
  assert.match(prompt, /Ask one focused question at a time/i, "the AI prompt must require a paced interview");
  assert.match(prompt, /relativism is not automatically anti-realism/i, "the prompt must preserve the relativism distinction");
  assert.match(prompt, /classification of constructivism is disputed/i, "the prompt must preserve the constructivism caveat");
  assert.match(prompt, /only four selected cross-family comparisons/i, "the prompt must disclose that its comparison set is not exhaustive");
}

reset({ opening: "realism", final: "express" });
assert.equal(openingFinalComparison().stable, false, "different opening and final definitions must be disclosed");

reset({ opening: "realism", valueChange: "error", final: "realism" });
assert.ok(collectMeaningCombinations().some((item) => item.id === "realism-error"), "realism/error truth-status shift must be reported");

reset({ opening: "relative", valueChange: "construct", final: "relative" });
assert.ok(collectMeaningCombinations().some((item) => item.id === "relative-construct"), "actual/ideal standard shift must be reported");

reset({ opening: "error", valueChange: "fiction", final: "error" });
assert.ok(collectMeaningCombinations().some((item) => item.id === "error-fiction"), "error-theory/fictionalism policy shift must be reported");

// Exhaust every reachable completed path: six openings, then six choices in each of the remaining six questions.
let completedPaths = 0;
for (const openingFamily of MEANING_FAMILY_ORDER) {
  reset({ opening: openingFamily });
  const questions = activeMeaningQuestions();
  function exhaust(index, answers) {
    if (index === questions.length) {
      reset(answers);
      const counts = meaningCounts();
      const diagnosis = meaningDiagnostic();
      assert.equal(answeredMeaningCount(), 7);
      assert.equal(Object.values(counts).reduce((sum, count) => sum + count, 0), 7);
      assert.equal(diagnosis.maximum, Math.max(...Object.values(counts)));
      assert.deepEqual(
        Array.from(diagnosis.leaders),
        Array.from(MEANING_FAMILY_ORDER.filter((family) => counts[family] === diagnosis.maximum)),
        "displayed leaders must exactly match the maximum count",
      );
      assert.equal(diagnosis.comparison.stable, answers.opening === answers.final);
      completedPaths += 1;
      return;
    }
    const question = questions[index];
    for (const family of MEANING_FAMILY_ORDER) exhaust(index + 1, { ...answers, [question.id]: family });
  }
  exhaust(1, { opening: openingFamily });
}
assert.equal(completedPaths, 6 ** 7, "the audit must cover all 279,936 reachable completed paths");

const queriedIds = [...source.matchAll(/document\.querySelector\("#([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
for (const id of queriedIds) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `wrong.html must contain #${id}`);
}

assert.match(html, /<fieldset[^>]+id="meaningChoices"/, "answers must use a native fieldset");
assert.match(source, /type="radio"/, "answers must use native radio inputs");
assert.match(html, /id="meaningNextButton"[^>]+disabled/, "the lab must require an explicit Next action");
assert.match(html, /role="progressbar"/, "progress must be exposed to assistive technology");
assert.match(html, /id="meaningLiveStatus"[^>]+role="status"/, "question changes must have a live announcement");
assert.match(html, /id="meaningAIProbePrompt"/, "results must include the full AI follow-up prompt");
assert.match(html, /id="meaningMapKicker">Your answers so far/, "the live map must say what its changing counts reflect");
assert.doesNotMatch(html, /Your uses so far/, "the completed map must not retain an indefinite 'so far' label");
assert.match(source, /answered === 7 \? "Your seven answers"/, "the map heading must become final when all seven answers are present");
assert.match(source, /This lab checks four selected contrasts/, "results must identify the selected comparison set as non-exhaustive");

const selectionBody = source.slice(source.indexOf("function selectMeaningAnswer"), source.indexOf("function renderMeaningShiftReport"));
assert.doesNotMatch(selectionBody, /setTimeout/, "selecting an answer must not auto-advance");

for (const page of ["index.html", "obligation.html", "wrong.html", "papers.html"]) {
  const pageHtml = fs.readFileSync(path.join(root, page), "utf8");
  assert.match(pageHtml, /href="wrong\.html"/, `${page} must link to the meaning lab`);
}

console.log(`Meaning audit passed: ${completedPaths.toLocaleString()} reachable paths, four branches, six precisely labeled interpretations, exact descriptive counts, native controls, and full AI context verified.`);
