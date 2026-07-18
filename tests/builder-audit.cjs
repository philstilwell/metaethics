"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "build.js"), "utf8");
const html = fs.readFileSync(path.join(root, "build.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const papersSource = fs.readFileSync(path.join(root, "papers.js"), "utf8");
const pureSource = source.slice(source.indexOf("const BUILDER_FOUNDATIONS"), source.indexOf("const builderEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     BUILDER_FOUNDATIONS, BUILDER_FOUNDATION_ORDER, BUILDER_DESIGN_QUESTIONS, BUILDER_STRESS_QUESTIONS,
     BUILDER_TENSION_RULES, builderState, builderChoice, builderQuestionAt, builderSelectedChoice,
     builderFoundationProfile, builderArchitectureTensions, builderStressAssessment, builderDiagnostic,
     buildBuilderAIProbePrompt
   };`,
  context,
);

const {
  BUILDER_FOUNDATIONS,
  BUILDER_FOUNDATION_ORDER,
  BUILDER_DESIGN_QUESTIONS,
  BUILDER_STRESS_QUESTIONS,
  BUILDER_TENSION_RULES,
  builderFoundationProfile,
  builderArchitectureTensions,
  builderStressAssessment,
  builderDiagnostic,
  buildBuilderAIProbePrompt,
} = context.audit;

assert.deepEqual(
  Array.from(BUILDER_FOUNDATION_ORDER),
  ["mutual", "fair", "commitments", "ideal", "harm", "democracy", "stability", "power"],
  "the diagnostic must contain exactly the eight requested bases",
);
assert.equal(Object.keys(BUILDER_FOUNDATIONS).length, 8);
for (const id of BUILDER_FOUNDATION_ORDER) {
  const foundation = BUILDER_FOUNDATIONS[id];
  assert.ok(foundation.name.length >= 13, `${id} needs a plain-language name`);
  assert.ok(foundation.short.length >= 90, `${id} needs a complete scope definition`);
  assert.ok(foundation.caution.length >= 85, `${id} needs a precise limit`);
}

assert.deepEqual(
  Array.from(BUILDER_DESIGN_QUESTIONS, (question) => question.id),
  ["goal", "interests", "decisions", "dissent", "membership", "enforcement", "revision", "outsiders", "majority"],
  "the charter must contain all nine requested design dimensions",
);
assert.equal(BUILDER_DESIGN_QUESTIONS.length, 9);

for (const question of BUILDER_DESIGN_QUESTIONS) {
  assert.equal(question.phase, "Draft the code");
  assert.equal(question.choices.length, 4, `${question.id} must offer four explicit code designs`);
  assert.equal(new Set(question.choices.map((choice) => choice.id)).size, 4);
  assert.ok(question.prompt.length >= 70, `${question.id} needs a complete question`);
  assert.ok(question.context.length >= 160, `${question.id} needs full decision context`);
  assert.ok(question.assumptions.length >= 145, `${question.id} needs fixed assumptions`);
  assert.ok(question.scope.length >= 100, `${question.id} needs a bounded scope`);
  assert.ok(question.guide.plain.length >= 70, `${question.id} needs a plain explanation`);
  assert.ok(question.guide.separate.length >= 100, `${question.id} must identify a distinction`);
  assert.ok(question.guide.reveal.length >= 60, `${question.id} must explain the diagnostic use`);
  for (const choice of question.choices) {
    assert.ok(choice.label.length >= 45, `${question.id}/${choice.id} needs an unambiguous label`);
    assert.ok(choice.detail.length >= 90, `${question.id}/${choice.id} needs an exact rule definition`);
    assert.ok(choice.consequence.length >= 80, `${question.id}/${choice.id} needs a stated consequence`);
    assert.ok(choice.charter.length >= 58, `${question.id}/${choice.id} needs a charter sentence`);
    assert.ok(Object.keys(choice.foundations).length >= 2, `${question.id}/${choice.id} must disclose at least two bases`);
    for (const [foundationId, weight] of Object.entries(choice.foundations)) {
      assert.ok(BUILDER_FOUNDATIONS[foundationId], `${question.id}/${choice.id} uses unknown basis ${foundationId}`);
      assert.equal(weight, 1, `${question.id}/${choice.id}/${foundationId} must be a transparent one-use marker, not a hidden weight`);
    }
  }
}

assert.deepEqual(
  Array.from(BUILDER_STRESS_QUESTIONS, (question) => question.id),
  ["garden", "unsigned", "shuttle", "algae", "lock", "newmind"],
  "the pressure test must contain six distinct unusual cases",
);
assert.equal(BUILDER_STRESS_QUESTIONS.length, 6);

for (const question of BUILDER_STRESS_QUESTIONS) {
  assert.equal(question.phase, "Pressure-test the code");
  assert.equal(question.choices.length, 4, `${question.id} must offer four concrete responses`);
  assert.equal(new Set(question.choices.map((choice) => choice.id)).size, 4);
  assert.ok(question.file.length === 3, `${question.id} needs three case markers`);
  assert.ok(question.prompt.length >= 75, `${question.id} needs a complete question`);
  assert.ok(question.context.length >= 325, `${question.id} needs a fully specified scenario`);
  assert.ok(question.assumptions.length >= 180, `${question.id} needs fixed facts`);
  assert.ok(question.scope.length >= 135, `${question.id} needs a precise application scope`);
  assert.ok(question.relevant.length >= 2 && question.relevant.length <= 3, `${question.id} must name the exact charter rules it tests`);
  for (const dimension of question.relevant) {
    const designQuestion = BUILDER_DESIGN_QUESTIONS.find((item) => item.id === dimension);
    assert.ok(designQuestion, `${question.id} refers to unknown charter dimension ${dimension}`);
    const represented = new Set(question.choices.flatMap((choice) => choice.aligns[dimension] || []));
    assert.deepEqual(
      Array.from(represented).sort(),
      Array.from(designQuestion.choices, (choice) => choice.id).sort(),
      `${question.id} must give every ${dimension} option at least one visible application route`,
    );
  }
  for (const choice of question.choices) {
    assert.ok(choice.label.length >= 55, `${question.id}/${choice.id} needs an unambiguous action`);
    assert.ok(choice.detail.length >= 90, `${question.id}/${choice.id} needs implementation detail`);
    assert.ok(choice.consequence.length >= 80, `${question.id}/${choice.id} needs a concrete consequence`);
    assert.deepEqual(Object.keys(choice.aligns).sort(), Array.from(question.relevant).sort(), `${question.id}/${choice.id} must disclose alignment on every tested rule`);
    for (const dimension of question.relevant) {
      const validIds = new Set(BUILDER_DESIGN_QUESTIONS.find((item) => item.id === dimension).choices.map((item) => item.id));
      assert.ok(choice.aligns[dimension].length >= 1);
      assert.ok(choice.aligns[dimension].every((id) => validIds.has(id)), `${question.id}/${choice.id} has an invalid ${dimension} alignment`);
    }
    assert.ok(Object.keys(choice.foundations).length >= 2, `${question.id}/${choice.id} must disclose at least two bases`);
    for (const [foundationId, weight] of Object.entries(choice.foundations)) {
      assert.ok(BUILDER_FOUNDATIONS[foundationId], `${question.id}/${choice.id} uses unknown basis ${foundationId}`);
      assert.equal(weight, 1, `${question.id}/${choice.id}/${foundationId} must be a transparent one-use marker, not a hidden weight`);
    }
  }
}

const firstState = {
  index: 0,
  design: Object.fromEntries(BUILDER_DESIGN_QUESTIONS.map((question) => [question.id, question.choices[0].id])),
  stress: Object.fromEntries(BUILDER_STRESS_QUESTIONS.map((question) => [question.id, question.choices[0].id])),
};
const firstDiagnostic = builderDiagnostic(firstState);
assert.equal(firstDiagnostic.assessments.length, 6);
assert.equal(firstDiagnostic.fitCount, firstDiagnostic.assessments.filter((assessment) => !assessment.departure).length);
assert.equal(firstDiagnostic.departureCount, 6 - firstDiagnostic.fitCount);
assert.ok(firstDiagnostic.foundations.every((foundation) => foundation.cap > 0));
assert.ok(firstDiagnostic.foundations.every((foundation) => foundation.score >= 0 && foundation.score <= 100));
assert.match(firstDiagnostic.summary, /Neither result establishes objective moral truth or an approval-independent duty to obey/i);
for (const foundation of firstDiagnostic.foundations) {
  const allQuestions = [...BUILDER_DESIGN_QUESTIONS, ...BUILDER_STRESS_QUESTIONS];
  const selectedUses = allQuestions.filter((question) => {
    const selectedId = question.phase === "Draft the code" ? firstState.design[question.id] : firstState.stress[question.id];
    return Boolean(question.choices.find((choice) => choice.id === selectedId).foundations[foundation.id]);
  }).length;
  const availableUses = allQuestions.filter((question) => question.choices.some((choice) => choice.foundations[foundation.id])).length;
  assert.equal(foundation.raw, selectedUses, `${foundation.id} must count one use per selected answer without hidden weighting`);
  assert.equal(foundation.cap, availableUses, `${foundation.id} must normalize only across questions where it was available`);
  assert.equal(foundation.score, Math.round((selectedUses / availableUses) * 100));
}

for (const foundationId of BUILDER_FOUNDATION_ORDER) {
  assert.ok(
    [...BUILDER_DESIGN_QUESTIONS, ...BUILDER_STRESS_QUESTIONS].some((question) => question.choices.some((choice) => choice.foundations[foundationId])),
    `${foundationId} must be reachable through at least one answer`,
  );
}

const directConflictState = {
  interests: "equal",
  majority: "final",
  enforcement: "emergency",
  decisions: "consensus",
  dissent: "suppress",
};
const directConflicts = builderArchitectureTensions(directConflictState);
assert.ok(directConflicts.some((tension) => tension.id === "equal-final"));
assert.ok(directConflicts.some((tension) => tension.id === "consensus-suppression"));
assert.ok(BUILDER_TENSION_RULES.every((tension) => tension.text.length >= 170));

// Audit every charter architecture (4^9 = 262,144) and every offered pressure response against it.
let charterPaths = 0;
let assessmentChecks = 0;
function enumerateCharters(index, design) {
  if (index === BUILDER_DESIGN_QUESTIONS.length) {
    const tensions = builderArchitectureTensions(design);
    assert.ok(tensions.every((tension) => BUILDER_TENSION_RULES.some((rule) => rule.id === tension.id)));
    for (const question of BUILDER_STRESS_QUESTIONS) {
      for (const choice of question.choices) {
        const assessment = builderStressAssessment(question, choice.id, design);
        assert.equal(assessment.relevantCount, question.relevant.length);
        assert.ok(assessment.chosenScore >= 0 && assessment.chosenScore <= assessment.relevantCount);
        assert.ok(assessment.bestScore >= assessment.chosenScore && assessment.bestScore <= assessment.relevantCount);
        assert.ok(assessment.bestIds.length >= 1);
        assert.equal(assessment.departure, assessment.chosenScore < assessment.bestScore);
        assert.equal(assessment.status === "departure", assessment.departure);
        assessmentChecks += 1;
      }
    }
    charterPaths += 1;
    return;
  }
  const question = BUILDER_DESIGN_QUESTIONS[index];
  for (const choice of question.choices) enumerateCharters(index + 1, { ...design, [question.id]: choice.id });
}
enumerateCharters(0, {});
assert.equal(charterPaths, 4 ** 9);
assert.equal(assessmentChecks, (4 ** 9) * 6 * 4);

// Audit all 4^6 completed pressure-response combinations for one fully specified charter.
let pressurePaths = 0;
function enumeratePressure(index, stress) {
  if (index === BUILDER_STRESS_QUESTIONS.length) {
    const diagnosis = builderDiagnostic({ index: 14, design: firstState.design, stress });
    assert.equal(diagnosis.assessments.length, 6);
    assert.equal(diagnosis.fitCount + diagnosis.departureCount, 6);
    assert.ok(diagnosis.fullFitCount <= diagnosis.fitCount);
    pressurePaths += 1;
    return;
  }
  const question = BUILDER_STRESS_QUESTIONS[index];
  for (const choice of question.choices) enumeratePressure(index + 1, { ...stress, [question.id]: choice.id });
}
enumeratePressure(0, {});
assert.equal(pressurePaths, 4 ** 6);

const prompt = buildBuilderAIProbePrompt(firstState);
assert.match(prompt, /Ask one focused question at a time/i);
assert.match(prompt, /Do not argue the participant into moral realism or moral non-realism/i);
assert.match(prompt, /distinguish factual workability, internal consistency, fair justification, motivation, democratic authorization, coercive capacity, and approval-independent obligation/i);
assert.match(prompt, /Do not equate effectiveness with legitimacy/i);
assert.match(prompt, /Do not call overlap among bases an incoherence by itself/i);
for (const question of BUILDER_DESIGN_QUESTIONS) {
  const choice = question.choices[0];
  assert.ok(prompt.includes(choice.charter), `the AI prompt must include the selected ${question.id} rule`);
  assert.ok(prompt.includes(choice.consequence), `the AI prompt must include the consequence of ${question.id}`);
}
for (const question of BUILDER_STRESS_QUESTIONS) {
  assert.ok(prompt.includes(question.context), `the AI prompt must include the full ${question.id} case`);
  assert.ok(prompt.includes(question.assumptions), `the AI prompt must include the fixed ${question.id} facts`);
  assert.ok(prompt.includes(question.scope), `the AI prompt must include the ${question.id} scope`);
}

assert.match(html, /No cosmic rulebook\. Real people still have to live together\./i);
assert.match(html, /This is a design lab, not a proof that your code is objectively true/i);
assert.match(html, /Does “without moral facts” mean that anything goes\?/i);
assert.match(html, /Is every constructed code a form of metaethical constructivism\?/i);
assert.match(html, /What will the final bars mean\?/i);
assert.match(html, /aria-valuemax="15"/);
assert.match(html, /id="resetBuilderButton"/);
assert.match(html, /id="restartBuilderButton"/);
assert.match(html, /id="builderQuestionPrompt" tabindex="-1"/);
assert.match(html, /id="builderResultTitle" tabindex="-1"/);
assert.match(html, /id="builderFoundationGrid" role="group"/);
assert.match(html, /id="builderAIProbePrompt" rows="18" readonly spellcheck="false"/);
assert.match(html, /Nothing is sent by this site/i);
assert.match(html, /constructivism in metaethics/i);
assert.ok((css.match(/#builderAIProbePrompt/g) || []).length >= 2, "the builder prompt needs desktop and mobile sizing");
assert.match(css, /\.builder-conclusion\s*\{[^}]*color:\s*var\(--ink\)/s);
assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|EventSource/, "the lab must make no network or built-in AI call");
assert.match(source, /\.focus\(\{ preventScroll: true \}\)/, "question and result transitions must manage keyboard focus");
assert.match(source, /changed && Object\.keys\(builderState\.stress\)\.length[\s\S]*?builderState\.stress = \{\}/, "changing the written charter must clear pressure answers made under the old code");
assert.match(papersSource, /id: "street-constructivism"/, "the reading room must contain the constructivist foundation paper");
assert.match(papersSource, /rather than on independent moral facts/i, "the constructivist source note must state its non-realist relevance");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "the page must not reuse an element id");
assert.equal((html.match(/<h1\b/g) || []).length, 2, "the page needs one hero heading and one hidden-until-results diagnostic heading");

console.log("Community-code audit passed: 262,144 complete charters, 6,291,456 charter–case response checks, 4,096 complete pressure paths, eight exact bases, bounded seam logic, full-context AI prompt, and native controls verified.");
