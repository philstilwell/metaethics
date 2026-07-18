"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "genealogy.js"), "utf8");
const html = fs.readFileSync(path.join(root, "genealogy.html"), "utf8");
const papersSource = fs.readFileSync(path.join(root, "papers.js"), "utf8");
const pureSource = source.slice(source.indexOf("const GENEALOGY_INFLUENCES"), source.indexOf("const genealogyEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     GENEALOGY_INFLUENCES, GENEALOGY_INFLUENCE_ORDER, GENEALOGY_INFLUENCE_LEVELS,
     GENEALOGY_CONVICTIONS, GENEALOGY_INFERENCES, GENEALOGY_INFERENCE_ORDER,
     GENEALOGY_SKILLS, GENEALOGY_QUESTIONS, genealogyState, genealogyConviction,
     genealogyConvictionText, genealogyQuestion, genealogyChoice, genealogyDisplayedChoices,
     genealogySelectedAnswers, genealogyInfluenceSummary, genealogyDiagnostic,
     buildGenealogyAIProbePrompt
   };`,
  context,
);

const {
  GENEALOGY_INFLUENCES,
  GENEALOGY_INFLUENCE_ORDER,
  GENEALOGY_INFLUENCE_LEVELS,
  GENEALOGY_CONVICTIONS,
  GENEALOGY_INFERENCES,
  GENEALOGY_INFERENCE_ORDER,
  GENEALOGY_SKILLS,
  GENEALOGY_QUESTIONS,
  genealogyInfluenceSummary,
  genealogyDiagnostic,
  buildGenealogyAIProbePrompt,
} = context.audit;

assert.deepEqual(
  Array.from(GENEALOGY_INFLUENCE_ORDER),
  ["harm", "reciprocity", "loyalty", "religion", "upbringing", "status", "institutions", "experience", "reflection"],
  "the origin map must contain all nine requested influence families",
);
assert.equal(Object.keys(GENEALOGY_INFLUENCES).length, 9);
assert.equal(new Set(GENEALOGY_INFLUENCE_ORDER).size, 9);
for (const id of GENEALOGY_INFLUENCE_ORDER) {
  const influence = GENEALOGY_INFLUENCES[id];
  assert.ok(influence, `${id} must have an influence definition`);
  assert.ok(influence.name.length >= 8);
  assert.ok(influence.short.length >= 65, `${id} needs a plain scope definition`);
  assert.ok(influence.example.length >= 100, `${id} needs a concrete accordion explanation`);
}

assert.deepEqual(Object.keys(GENEALOGY_INFLUENCE_LEVELS), ["strong", "possible", "little", "unknown"]);
assert.equal(GENEALOGY_INFLUENCE_LEVELS.strong.value, 2);
assert.equal(GENEALOGY_INFLUENCE_LEVELS.possible.value, 1);
assert.equal(GENEALOGY_INFLUENCE_LEVELS.little.value, 0);
assert.equal(GENEALOGY_INFLUENCE_LEVELS.unknown.value, null, "uncertainty must not be converted to a zero influence score");

assert.equal(GENEALOGY_CONVICTIONS.length, 5, "users need four supplied convictions and a custom route");
assert.equal(GENEALOGY_CONVICTIONS.at(-1).id, "custom");
assert.equal(new Set(GENEALOGY_CONVICTIONS.map((conviction) => conviction.id)).size, 5);
assert.ok(GENEALOGY_CONVICTIONS.slice(0, -1).every((conviction) => conviction.text.length >= 90));

assert.deepEqual(Array.from(GENEALOGY_INFERENCE_ORDER), ["explain", "distrust", "against", "burden"]);
assert.equal(Object.keys(GENEALOGY_INFERENCES).length, 4);
for (const id of GENEALOGY_INFERENCE_ORDER) {
  const inference = GENEALOGY_INFERENCES[id];
  assert.ok(inference.short.length >= 125, `${id} needs a precise definition`);
  assert.ok(inference.next.length >= 110, `${id} needs a bounded next move`);
}
assert.match(GENEALOGY_INFERENCES.explain.short, /does not yet show/i);
assert.match(GENEALOGY_INFERENCES.distrust.short, /local process/i);
assert.match(GENEALOGY_INFERENCES.against.short, /what the belief says|premise/i);
assert.match(GENEALOGY_INFERENCES.burden.short, /whether it was true or false.+independent support/i);

assert.equal(GENEALOGY_QUESTIONS.length, 8, "the reasoning diagnostic must contain eight bounded cases");
assert.deepEqual(
  Array.from(GENEALOGY_QUESTIONS.map((question) => question.id)),
  ["scar", "storm", "badges", "applause", "ledger", "mirror", "islands", "species"],
);
assert.deepEqual(
  Array.from(GENEALOGY_INFERENCE_ORDER, (id) => GENEALOGY_QUESTIONS.filter((question) => question.correct === id).length),
  [2, 2, 2, 2],
  "each conclusion must be isolated by exactly two cases",
);

for (const question of GENEALOGY_QUESTIONS) {
  assert.ok(GENEALOGY_INFERENCES[question.correct], `${question.id} must have a valid intended conclusion`);
  assert.equal(question.displayOrder.length, 4, `${question.id} must display all four conclusions`);
  assert.deepEqual(Array.from(question.displayOrder).sort(), Array.from(GENEALOGY_INFERENCE_ORDER).sort());
  assert.equal(new Set(question.displayOrder).size, 4);
  assert.ok(question.prompt.length >= 95, `${question.id} needs an explicit question`);
  assert.ok(question.file.split(" · ").length === 3, `${question.id} needs three concise evidence markers`);
  assert.ok(question.context.length >= 230, `${question.id} needs a complete case`);
  assert.ok(question.assumptions.length >= 180, `${question.id} needs fixed details and limits`);
  assert.ok(question.scope.length >= 160, `${question.id} needs a precise inference scope`);
  assert.ok(question.why.length >= 150, `${question.id} needs a full best-match explanation`);
  assert.ok(question.guide.plain.length >= 120, `${question.id} needs a plain-language explanation`);
  assert.ok(question.guide.separate.length >= 130, `${question.id} must state what to keep separate`);
  assert.ok(question.guide.reveal.length >= 105, `${question.id} must explain what the answer tests`);
  assert.deepEqual(Object.keys(question.details).sort(), Array.from(GENEALOGY_INFERENCE_ORDER).sort());
  for (const id of GENEALOGY_INFERENCE_ORDER) {
    assert.ok(question.details[id].length >= 140, `${question.id}/${id} needs an unambiguous scenario-specific consequence`);
  }
}

const correctPositions = Array.from(GENEALOGY_QUESTIONS, (question) => question.displayOrder.indexOf(question.correct));
assert.deepEqual(correctPositions, [2, 0, 3, 1, 1, 3, 0, 2]);
assert.deepEqual(
  [0, 1, 2, 3].map((position) => correctPositions.filter((value) => value === position).length),
  [2, 2, 2, 2],
  "best-supported answers must be balanced across A–D",
);
assert.match(source, /genealogyDisplayedChoices\(question\)\.map/, "the visible order must use the audited display order");

const scar = GENEALOGY_QUESTIONS.find((question) => question.id === "scar");
const storm = GENEALOGY_QUESTIONS.find((question) => question.id === "storm");
const badges = GENEALOGY_QUESTIONS.find((question) => question.id === "badges");
const applause = GENEALOGY_QUESTIONS.find((question) => question.id === "applause");
const ledger = GENEALOGY_QUESTIONS.find((question) => question.id === "ledger");
const mirror = GENEALOGY_QUESTIONS.find((question) => question.id === "mirror");
const islands = GENEALOGY_QUESTIONS.find((question) => question.id === "islands");
const species = GENEALOGY_QUESTIONS.find((question) => question.id === "species");
assert.match(scar.assumptions, /No evidence shows.+ignores relevant differences/i);
assert.match(storm.scope, /survival benefit automatically makes the belief a good guide or a bad one/i);
assert.match(badges.context, /keep those facts identical.+swap/i);
assert.match(applause.assumptions, /randomized study rules out proposal quality/i);
assert.match(ledger.scope, /explicit supporting premise/i);
assert.match(mirror.assumptions, /No genealogy.+supplied/i);
assert.match(islands.assumptions, /no present support independent.+does not establish.+false/i);
assert.match(species.scope, /challenge to our reasons for confidence.+further philosophical claims/i);

const skillChecks = GENEALOGY_SKILLS.flatMap((skill) => skill.checks);
assert.equal(GENEALOGY_SKILLS.length, 4);
assert.deepEqual(Array.from(skillChecks).sort(), Array.from(GENEALOGY_QUESTIONS.map((question) => question.id)).sort());
assert.equal(new Set(skillChecks).size, 8, "each reasoning case must feed exactly one visible skill result");

const allCorrect = Object.fromEntries(GENEALOGY_QUESTIONS.map((question) => [question.id, question.correct]));
const correctDiagnosis = genealogyDiagnostic(allCorrect);
assert.equal(correctDiagnosis.answered, 8);
assert.equal(correctDiagnosis.correctCount, 8);
assert.equal(correctDiagnosis.reviewCount, 0);
assert.equal(correctDiagnosis.overreachCount, 0);
assert.deepEqual(Array.from(correctDiagnosis.skills.map((skill) => skill.correct)), [2, 2, 2, 2]);
assert.match(correctDiagnosis.title, /origin, reliability, content, and burden separate/i);

const allWrong = Object.fromEntries(GENEALOGY_QUESTIONS.map((question) => [
  question.id,
  question.displayOrder.find((id) => id !== question.correct),
]));
const wrongDiagnosis = genealogyDiagnostic(allWrong);
assert.equal(wrongDiagnosis.correctCount, 0);
assert.equal(wrongDiagnosis.reviewCount, 8);

const allAgainst = Object.fromEntries(GENEALOGY_QUESTIONS.map((question) => [question.id, "against"]));
assert.equal(genealogyDiagnostic(allAgainst).overreachCount, 6, "content-level criticism must be flagged when six non-content cases do not support it");

// Audit every complete case path: 4^8 = 65,536.
let completePaths = 0;
const reachableScores = new Set();
function enumerate(index, answers, expectedCorrect) {
  if (index === GENEALOGY_QUESTIONS.length) {
    const diagnosis = genealogyDiagnostic(answers);
    assert.equal(diagnosis.answered, 8);
    assert.equal(diagnosis.correctCount, expectedCorrect);
    assert.equal(diagnosis.reviewCount, 8 - expectedCorrect);
    assert.equal(diagnosis.skills.reduce((sum, skill) => sum + skill.correct, 0), expectedCorrect);
    reachableScores.add(expectedCorrect);
    completePaths += 1;
    return;
  }
  const question = GENEALOGY_QUESTIONS[index];
  for (const inferenceId of GENEALOGY_INFERENCE_ORDER) {
    enumerate(
      index + 1,
      { ...answers, [question.id]: inferenceId },
      expectedCorrect + Number(inferenceId === question.correct),
    );
  }
}
enumerate(0, {}, 0);
assert.equal(completePaths, 4 ** 8);
assert.deepEqual(Array.from(reachableScores).sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8]);

const influenceFixture = {
  harm: "strong",
  reciprocity: "possible",
  loyalty: "little",
  religion: "unknown",
  upbringing: "strong",
  status: "possible",
  institutions: "little",
  experience: "strong",
  reflection: "unknown",
};
const influenceSummary = genealogyInfluenceSummary(influenceFixture);
assert.equal(influenceSummary.answered, 9);
assert.equal(influenceSummary.suspected, 5);
assert.deepEqual({ ...influenceSummary.counts }, { strong: 3, possible: 2, little: 2, unknown: 2, unanswered: 0 });
assert.equal(genealogyInfluenceSummary({}).counts.unanswered, 9);

const promptState = {
  convictionId: "custom",
  customConviction: "A community should protect minds that can consciously suffer.",
  influences: influenceFixture,
  answers: allCorrect,
};
const prompt = buildGenealogyAIProbePrompt(promptState);
assert.match(prompt, /A community should protect minds that can consciously suffer/);
for (const id of GENEALOGY_INFLUENCE_ORDER) assert.match(prompt, new RegExp(GENEALOGY_INFLUENCES[id].name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
assert.match(prompt, /Ask one focused question at a time/i);
assert.match(prompt, /Do not treat them as established causes/i);
assert.match(prompt, /Do not infer falsity merely from dependence on evolution, culture, parents, religion, status, personal experience, or reflection/i);
assert.match(prompt, /Do not assume moral realism or moral non-realism/i);
assert.match(prompt, /Do not call a non-truth-apt attitude false/i);
assert.match(prompt, /Deliberate reflection no automatic exemption/i);
assert.match(prompt, /What this genealogy does not establish/i);
for (const question of GENEALOGY_QUESTIONS) {
  assert.ok(prompt.includes(question.context), `the AI prompt must include the full ${question.id} case`);
  assert.ok(prompt.includes(question.assumptions), `the AI prompt must include the fixed ${question.id} details`);
  assert.ok(prompt.includes(question.scope), `the AI prompt must include the ${question.id} scope`);
}

assert.match(html, /This lab examines reasoning, not your childhood or character/i);
assert.match(html, /does not automatically prove the conviction false/i);
assert.match(html, /Can a moral non-realist use this lab\?/i);
assert.match(html, /An attitude is not false in the way a belief can be false/i);
assert.match(html, /aria-valuemax="10"/);
assert.match(html, /id="resetGenealogyButton"/);
assert.match(html, /id="restartGenealogyButton"/);
assert.match(html, /id="genealogyInfluenceForm"/);
assert.match(html, /id="genealogyCustomConviction"[^>]*maxlength="240"/);
assert.match(html, /I do not know.+complete and responsible answer/is);
assert.match(html, /The origin bars show only your own influence estimates/i);
assert.match(html, /role="status" aria-live="polite"/);
assert.match(html, /id="genealogyQuestionPrompt" tabindex="-1"/);
assert.match(html, /id="genealogyResultTitle" tabindex="-1"/);
assert.match(html, /id="genealogySkillGrid" role="group"/);
assert.match(html, /id="genealogyAIProbePrompt" readonly/);
assert.match(html, /This site sends nothing/i);
assert.match(html, /Richard Joyce.+Irrealism and the Genealogy of Morals/is);
assert.match(papersSource, /id: "joyce-irrealism-genealogy"/);
assert.match(papersSource, /comparatively modest.+epistemic burden/is);
assert.match(source, /document\.querySelector\("#genealogyOriginConviction"\)\.textContent/, "custom conviction text must be inserted as text, not HTML");
assert.match(source, /genealogyEls\.liveConviction\.textContent/, "live custom text must be inserted safely");
assert.match(source, /function clearGenealogyDownstream\(\)[\s\S]*?influences = \{\}[\s\S]*?answers = \{\}/, "changing the traced conviction must clear its old influence map and case answers");
assert.match(source, /\.focus\(\{ preventScroll: true \}\)/, "step and result transitions must manage keyboard focus");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "the page must not reuse an element id");
assert.equal((html.match(/<h1\b/g) || []).length, 2, "the page needs one hero heading and one hidden-until-results diagnostic heading");

console.log("Value Genealogy audit passed: nine influence estimates, 65,536 complete case paths, four exact inference skills, full-context AI prompt, native controls, safe custom text, and managed keyboard focus verified.");
