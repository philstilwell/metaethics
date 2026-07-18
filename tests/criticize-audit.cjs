"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "criticize.js"), "utf8");
const html = fs.readFileSync(path.join(root, "criticize.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const papersSource = fs.readFileSync(path.join(root, "papers.js"), "utf8");
const pureSource = source.slice(source.indexOf("const CRITICISM_BASES"), source.indexOf("const criticizeEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     CRITICISM_BASES, CRITICISM_BASE_ORDER, CRITICISM_LANES, CRITICISM_STANCES,
     CRITICISM_STANCE_ORDER, CRITICISM_CASES, CRITICISM_QUESTIONS,
     criticismQuestionAt, criticismSelectedId, criticismChoice, criticismBasisProfile,
     criticismDefinitionMismatches, criticismDiagnostic, buildCriticismAIProbePrompt
   };`,
  context,
);

const {
  CRITICISM_BASES,
  CRITICISM_BASE_ORDER,
  CRITICISM_LANES,
  CRITICISM_STANCES,
  CRITICISM_STANCE_ORDER,
  CRITICISM_CASES,
  CRITICISM_QUESTIONS,
  criticismChoice,
  criticismBasisProfile,
  criticismDefinitionMismatches,
  criticismDiagnostic,
  buildCriticismAIProbePrompt,
} = context.audit;

assert.deepEqual(
  Array.from(CRITICISM_BASE_ORDER),
  ["majority", "subcommunity", "inconsistency", "promise", "personal", "harm", "ideal", "truth"],
  "the diagnostic must use exactly the eight requested grounds",
);
assert.equal(Object.keys(CRITICISM_BASES).length, 8);
assert.deepEqual(Object.keys(CRITICISM_LANES), ["actual", "internal", "human", "truth"]);
for (const id of CRITICISM_BASE_ORDER) {
  const basis = CRITICISM_BASES[id];
  assert.ok(basis.name.length >= 15, `${id} needs a plain name`);
  assert.ok(CRITICISM_LANES[basis.lane], `${id} needs a valid non-ordinal lane`);
  assert.ok(basis.short.length >= 95, `${id} needs a precise scope definition`);
  assert.ok(basis.establishes.length >= 95, `${id} must state what it establishes`);
  assert.ok(basis.limit.length >= 105, `${id} must state what it leaves open`);
}
assert.match(CRITICISM_BASES.majority.limit, /does not by itself show.+objectively true/i);
assert.match(CRITICISM_BASES.harm.limit, /cannot by itself supply the value bridge/i);
assert.match(CRITICISM_BASES.truth.short, /regardless of every actual or imagined person’s approval/i);

assert.deepEqual(Array.from(CRITICISM_STANCE_ORDER), ["majority", "relative", "practical", "realist"]);
assert.equal(Object.keys(CRITICISM_STANCES).length, 4);
assert.deepEqual(Array.from(CRITICISM_STANCES.majority.allowed), ["majority"]);
assert.deepEqual(Array.from(CRITICISM_STANCES.relative.allowed), ["majority", "subcommunity", "inconsistency", "promise"]);
assert.deepEqual(Array.from(CRITICISM_STANCES.practical.allowed), ["majority", "subcommunity", "inconsistency", "promise", "personal", "harm", "ideal"]);
assert.deepEqual(Array.from(CRITICISM_STANCES.realist.allowed), Array.from(CRITICISM_BASE_ORDER));
for (const id of CRITICISM_STANCE_ORDER) {
  const stance = CRITICISM_STANCES[id];
  assert.ok(stance.label.length >= 90, `${id} needs an unambiguous general definition`);
  assert.ok(stance.detail.length >= 135, `${id} needs a clear consequence`);
  assert.ok(stance.implication.length >= 90, `${id} must state its compatibility rule`);
}

assert.equal(CRITICISM_QUESTIONS.length, 8, "the lab must contain two definitions and six cases");
assert.equal(CRITICISM_QUESTIONS[0].id, "opening");
assert.equal(CRITICISM_QUESTIONS.at(-1).id, "final");
assert.deepEqual(
  Array.from(CRITICISM_QUESTIONS[0].choices, (choice) => choice.id),
  Array.from(CRITICISM_QUESTIONS.at(-1).choices, (choice) => choice.id),
  "the opening and final definitions must offer the same choices",
);
assert.equal(CRITICISM_QUESTIONS[0].prompt, CRITICISM_QUESTIONS.at(-1).prompt);

assert.deepEqual(
  Array.from(CRITICISM_CASES, (question) => question.id),
  ["birthmark", "whistle", "future", "overlap", "gate", "conquest"],
  "the cases must cover caste, whistleblowing, future judgment, overlapping groups, professed values, and radical reform",
);
assert.equal(CRITICISM_CASES.length, 6);
for (const question of CRITICISM_CASES) {
  assert.equal(question.kind, "case");
  assert.equal(question.phase, "Test the boundary");
  assert.equal(question.file.length, 3, `${question.id} needs three case markers`);
  const expectedChoiceCount = question.id === "overlap" ? 7 : 6;
  assert.equal(question.choices.length, expectedChoiceCount, `${question.id} must offer every ground that its facts make available`);
  assert.equal(new Set(question.choices.map((choice) => choice.id)).size, expectedChoiceCount);
  assert.ok(question.prompt.length >= 85, `${question.id} needs a complete question`);
  assert.ok(question.context.length >= 360, `${question.id} needs a full scenario`);
  assert.ok(question.assumptions.length >= 230, `${question.id} needs fixed facts`);
  assert.ok(question.scope.length >= 150, `${question.id} needs a bounded scope`);
  assert.ok(question.why.length >= 125, `${question.id} needs a pedagogical explanation`);
  assert.ok(question.guide.plain.length >= 105, `${question.id} needs plain-language guidance`);
  assert.ok(question.guide.separate.length >= 145, `${question.id} must name distinct claims`);
  assert.ok(question.guide.reveal.length >= 105, `${question.id} must explain what the answer shows`);
  for (const choice of question.choices) {
    assert.ok(CRITICISM_BASES[choice.basis], `${question.id}/${choice.id} needs a valid ground`);
    assert.ok(choice.label.length >= 105, `${question.id}/${choice.id} needs an unambiguous claim`);
    assert.ok(choice.detail.length >= 100, `${question.id}/${choice.id} needs an exact consequence`);
    assert.equal(choice.id, choice.basis, `${question.id}/${choice.id} must disclose its one exact ground without a hidden mapping`);
  }
}

const opportunities = Object.fromEntries(CRITICISM_BASE_ORDER.map((id) => [
  id,
  CRITICISM_CASES.filter((question) => question.choices.some((choice) => choice.basis === id)).length,
]));
assert.deepEqual(opportunities, {
  majority: 6,
  subcommunity: 4,
  inconsistency: 3,
  promise: 3,
  personal: 4,
  harm: 5,
  ideal: 6,
  truth: 6,
});
assert.ok(Object.values(opportunities).every((count) => count >= 3), "every ground must appear in at least three cases");

assert.doesNotMatch(CRITICISM_CASES.find((question) => question.id === "birthmark").choices.map((choice) => choice.basis).join(" "), /inconsistency|promise/);
assert.doesNotMatch(CRITICISM_CASES.find((question) => question.id === "conquest").choices.map((choice) => choice.basis).join(" "), /inconsistency|promise/);
assert.match(CRITICISM_CASES.find((question) => question.id === "overlap").why, /one culture/i);
assert.match(CRITICISM_CASES.find((question) => question.id === "future").why, /not automatically an objective court of appeal/i);

const firstAnswers = Object.fromEntries(CRITICISM_CASES.map((question) => [question.id, question.choices[0].id]));
const firstState = { index: 7, opening: "majority", final: "majority", answers: firstAnswers };
const firstProfile = criticismBasisProfile(firstState);
for (const basis of firstProfile) {
  const selected = CRITICISM_CASES.filter((question) => criticismChoice(question, firstState.answers[question.id]).basis === basis.id).length;
  assert.equal(basis.selected, selected, `${basis.id} must count selected answers exactly once`);
  assert.equal(basis.offered, opportunities[basis.id], `${basis.id} must use the exact opportunity denominator`);
  assert.equal(basis.rate, Math.round((selected / opportunities[basis.id]) * 100));
}
assert.equal(firstProfile.reduce((sum, basis) => sum + basis.selected, 0), 6, "every completed case must add exactly one selected ground");

const allTruthState = {
  index: 7,
  opening: "practical",
  final: "practical",
  answers: Object.fromEntries(CRITICISM_CASES.map((question) => [question.id, "truth"])),
};
assert.equal(criticismDefinitionMismatches(allTruthState).length, 6);
assert.equal(criticismDiagnostic(allTruthState).beyond, 6);
assert.equal(criticismBasisProfile(allTruthState).find((basis) => basis.id === "truth").rate, 100);
assert.equal(criticismDefinitionMismatches({ ...allTruthState, final: "realist" }).length, 0);

let completePaths = 0;
let stanceAudits = 0;
function enumerateCases(index, answers) {
  if (index === CRITICISM_CASES.length) {
    for (const final of CRITICISM_STANCE_ORDER) {
      const state = { index: 7, opening: "practical", final, answers };
      const allowed = new Set(CRITICISM_STANCES[final].allowed);
      const expected = CRITICISM_CASES.filter((question) => !allowed.has(criticismChoice(question, answers[question.id]).basis)).length;
      const profile = criticismBasisProfile(state);
      const diagnostic = criticismDiagnostic(state);
      assert.equal(diagnostic.mismatches.length, expected);
      assert.equal(profile.reduce((sum, basis) => sum + basis.selected, 0), 6);
      assert.ok(profile.every((basis) => basis.rate >= 0 && basis.rate <= 100));
      stanceAudits += 1;
    }
    completePaths += 1;
    return;
  }
  const question = CRITICISM_CASES[index];
  for (const choice of question.choices) enumerateCases(index + 1, { ...answers, [question.id]: choice.id });
}
enumerateCases(0, {});
assert.equal(completePaths, (6 ** 5) * 7);
assert.equal(stanceAudits, (6 ** 5) * 7 * 4);

const prompt = buildCriticismAIProbePrompt({ ...allTruthState, opening: "majority", final: "practical" });
assert.match(prompt, /Ask one focused question at a time/i);
assert.match(prompt, /Do not assume moral realism or moral non-realism/i);
assert.match(prompt, /Do not reduce every form of cultural relativism to simple majority rule/i);
assert.match(prompt, /Do not move from a factual claim about harm to a duty/i);
assert.match(prompt, /Do not infer approval-independent obligation from agreement, law, social approval/i);
assert.match(prompt, /Do not call the use of several grounds incoherent by itself/i);
for (const question of CRITICISM_CASES) {
  assert.ok(prompt.includes(question.context), `the prompt must include the full ${question.id} case`);
  assert.ok(prompt.includes(question.assumptions), `the prompt must include the fixed ${question.id} facts`);
  assert.ok(prompt.includes(question.scope), `the prompt must include the ${question.id} scope`);
}
for (const basis of CRITICISM_BASE_ORDER) assert.ok(prompt.includes(CRITICISM_BASES[basis].name));

assert.match(html, /What makes your criticism more than <em>unpopular\?<\/em>/i);
assert.match(html, /does not assume that criticism needs objective moral facts/i);
assert.match(html, /Does cultural relativism simply mean “the majority is always right”\?/i);
assert.match(html, /Can a non-realist criticize a whole society\?/i);
assert.match(html, /What will the result bars mean\?/i);
assert.match(html, /aria-valuemax="8"/);
assert.match(html, /id="resetCriticizeButton"/);
assert.match(html, /id="restartCriticizeButton"/);
assert.match(html, /id="criticizeQuestionPrompt" tabindex="-1"/);
assert.match(html, /id="criticizeResultTitle" tabindex="-1"/);
assert.match(html, /id="criticizeLiveBases" role="img"/);
assert.match(html, /id="criticizeAIProbePrompt" rows="18" readonly spellcheck="false"/);
assert.match(html, /Nothing is sent by this site/i);
assert.match(html, /Stanford Encyclopedia of Philosophy on moral relativism/i);
assert.ok((css.match(/#criticizeAIProbePrompt/g) || []).length >= 2, "the prompt needs desktop and mobile sizing");
assert.match(css, /\.criticize-question-card \.question-heading h2\s*\{[^}]*font-size:\s*clamp\(1\.4rem, 2\.55vw, 2\.45rem\)/s);
assert.match(css, /\.criticize-conclusion\s*\{[^}]*color:\s*var\(--ink\)/s);
assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|EventSource/, "the lab must make no network or built-in AI call");
assert.match(source, /\.focus\(\{ preventScroll: true \}\)/, "question and result transitions must manage keyboard focus");
assert.match(papersSource, /id: "harman-relativism"/);
assert.match(papersSource, /current majority approval as the only possible social standard/i);
assert.match(papersSource, /id: "williams-truth-relativism"/);

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "the page must not reuse an element id");
assert.equal((html.match(/<h1\b/g) || []).length, 2, "the page needs one hero heading and one results heading");

console.log("Social-criticism audit passed: 54,432 complete case paths, 217,728 stance compatibility checks, eight exact opportunity-normalized grounds, full case limits, society-boundary logic, and full-context AI prompt verified.");
