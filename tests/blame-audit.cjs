"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "blame.js"), "utf8");
const html = fs.readFileSync(path.join(root, "blame.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const papersSource = fs.readFileSync(path.join(root, "papers.js"), "utf8");
const pureSource = source.slice(source.indexOf("const BLAME_RESPONSES"), source.indexOf("const blameEls"));
const context = {};

vm.createContext(context);
vm.runInContext(
  `${pureSource}
   globalThis.audit = {
     BLAME_RESPONSES, BLAME_RESPONSE_ORDER, BLAME_LANES, BLAME_POLICIES, BLAME_POLICY_ORDER,
     BLAME_CASES, BLAME_ZERO_CONTROL, BLAME_QUESTIONS, blameQuestionAt, blameSelectedId,
     blameChoice, blameResponseProfile, blamePolicyMismatches, blameDiagnostic, buildBlameAIProbePrompt
   };`,
  context,
);

const {
  BLAME_RESPONSES,
  BLAME_RESPONSE_ORDER,
  BLAME_LANES,
  BLAME_POLICIES,
  BLAME_POLICY_ORDER,
  BLAME_CASES,
  BLAME_ZERO_CONTROL,
  BLAME_QUESTIONS,
  blameChoice,
  blameResponseProfile,
  blamePolicyMismatches,
  blameDiagnostic,
  buildBlameAIProbePrompt,
} = context.audit;

assert.deepEqual(
  Array.from(BLAME_RESPONSE_ORDER),
  ["protection", "deterrence", "restitution", "rehabilitation", "boundary", "trust", "condemnation", "retribution"],
  "the diagnostic must contain exactly the eight requested response types",
);
assert.equal(Object.keys(BLAME_RESPONSES).length, 8);
assert.deepEqual(Object.keys(BLAME_LANES), ["future", "repair", "relationship", "meaning"]);
for (const id of BLAME_RESPONSE_ORDER) {
  const response = BLAME_RESPONSES[id];
  assert.ok(response.name.length >= 10, `${id} needs a plain-language name`);
  assert.ok(BLAME_LANES[response.lane], `${id} needs a valid non-ordinal lane`);
  assert.ok(response.short.length >= 105, `${id} needs a complete scope definition`);
  assert.ok(response.justifies.length >= 85, `${id} must state what it can justify`);
  assert.ok(response.safeguard.length >= 125, `${id} must have a concrete limit or stopping rule`);
}
assert.match(BLAME_RESPONSES.protection.safeguard, /least restrictive.+end it when the risk/i);
assert.match(BLAME_RESPONSES.deterrence.safeguard, /Do not assume severity deters/i);
assert.match(BLAME_RESPONSES.rehabilitation.safeguard, /route back to participation/i);
assert.match(BLAME_RESPONSES.trust.safeguard, /do not turn one failure into total permanent stigma/i);
assert.match(BLAME_RESPONSES.retribution.short, /apart from any further human purpose/i);

assert.deepEqual(Array.from(BLAME_POLICY_ORDER), ["nonadverse", "purpose", "protest", "desert"]);
assert.equal(Object.keys(BLAME_POLICIES).length, 4);
assert.deepEqual(Array.from(BLAME_POLICIES.nonadverse.allowed), ["protection", "boundary", "trust"]);
assert.deepEqual(Array.from(BLAME_POLICIES.purpose.allowed), Array.from(BLAME_RESPONSE_ORDER.filter((id) => id !== "retribution")));
assert.deepEqual(Array.from(BLAME_POLICIES.protest.allowed), Array.from(BLAME_RESPONSE_ORDER.filter((id) => id !== "retribution")));
assert.deepEqual(Array.from(BLAME_POLICIES.desert.allowed), Array.from(BLAME_RESPONSE_ORDER));
for (const id of BLAME_POLICY_ORDER) {
  const policy = BLAME_POLICIES[id];
  assert.ok(policy.label.length >= 130, `${id} needs an unambiguous policy`);
  assert.ok(policy.detail.length >= 130, `${id} needs a clear consequence`);
  assert.ok(policy.implication.length >= 110, `${id} must state its exact compatibility rule`);
}

assert.equal(BLAME_QUESTIONS.length, 9, "the lab must contain two policies, six cases, and one control");
assert.equal(BLAME_QUESTIONS[0].id, "opening");
assert.equal(BLAME_QUESTIONS.at(-1).id, "final");
assert.equal(BLAME_QUESTIONS.at(-2).id, "zero");
assert.equal(BLAME_QUESTIONS[0].prompt, BLAME_QUESTIONS.at(-1).prompt);
assert.deepEqual(
  Array.from(BLAME_QUESTIONS[0].choices, (choice) => choice.id),
  Array.from(BLAME_QUESTIONS.at(-1).choices, (choice) => choice.id),
  "the opening and final policy choices must be identical",
);

assert.deepEqual(
  Array.from(BLAME_CASES, (question) => question.id),
  ["airgarden", "memory", "rescuehoax", "pilot", "nurse", "quota"],
  "the lab must cover danger, betrayal, public fraud, reform, coercion, and institutional causation",
);
assert.equal(BLAME_CASES.length, 6);
for (const question of BLAME_CASES) {
  assert.equal(question.kind, "case");
  assert.equal(question.phase, "Test the response");
  assert.equal(question.file.length, 3, `${question.id} needs three case markers`);
  assert.ok(question.choices.length === 6 || question.choices.length === 7, `${question.id} must offer every relevant response without an excessive list`);
  assert.equal(new Set(question.choices.map((choice) => choice.id)).size, question.choices.length);
  assert.ok(question.prompt.length >= 80, `${question.id} needs a complete question`);
  assert.ok(question.context.length >= 390, `${question.id} needs a fully specified situation`);
  assert.ok(question.assumptions.length >= 290, `${question.id} needs fixed facts and safeguards`);
  assert.ok(question.scope.length >= 170, `${question.id} needs a bounded decision scope`);
  assert.ok(question.why.length >= 160, `${question.id} needs a complete pedagogical reason`);
  assert.ok(question.guide.plain.length >= 105, `${question.id} needs a plain-language explanation`);
  assert.ok(question.guide.separate.length >= 155, `${question.id} must separate neighboring responses`);
  assert.ok(question.guide.reveal.length >= 90, `${question.id} must explain what the answer shows`);
  for (const choice of question.choices) {
    assert.ok(BLAME_RESPONSES[choice.response], `${question.id}/${choice.id} needs a valid response type`);
    assert.equal(choice.id, choice.response, `${question.id}/${choice.id} must disclose one exact response without hidden weights`);
    assert.ok(choice.label.length >= 105, `${question.id}/${choice.id} needs an unambiguous action and purpose`);
    assert.ok(choice.detail.length >= 115, `${question.id}/${choice.id} needs a stated limit or consequence`);
  }
}

const opportunities = Object.fromEntries(BLAME_RESPONSE_ORDER.map((id) => [
  id,
  BLAME_CASES.filter((question) => question.choices.some((choice) => choice.response === id)).length,
]));
assert.deepEqual(opportunities, {
  protection: 4,
  deterrence: 3,
  restitution: 6,
  rehabilitation: 5,
  boundary: 4,
  trust: 5,
  condemnation: 6,
  retribution: 6,
});
assert.ok(Object.values(opportunities).every((count) => count >= 3));

assert.equal(BLAME_ZERO_CONTROL.kind, "control");
assert.equal(BLAME_ZERO_CONTROL.choices.length, 3);
assert.deepEqual(Array.from(BLAME_ZERO_CONTROL.choices, (choice) => choice.id), ["refuse", "desert", "uncertain"]);
assert.ok(BLAME_ZERO_CONTROL.context.length >= 390);
assert.ok(BLAME_ZERO_CONTROL.assumptions.length >= 285);
assert.match(BLAME_ZERO_CONTROL.assumptions, /cannot protect, deter, repair, rehabilitate, set a boundary, revise trust, communicate/i);
assert.match(BLAME_ZERO_CONTROL.scope, /basic-desert claim/i);
assert.match(BLAME_ZERO_CONTROL.why, /removes every purpose/i);

const firstAnswers = Object.fromEntries(BLAME_CASES.map((question) => [question.id, question.choices[0].id]));
const firstState = { index: 8, opening: "purpose", final: "purpose", zero: "refuse", answers: firstAnswers };
const firstProfile = blameResponseProfile(firstState);
for (const response of firstProfile) {
  const selected = BLAME_CASES.filter((question) => blameChoice(question, firstState.answers[question.id]).response === response.id).length;
  assert.equal(response.selected, selected, `${response.id} must count each selected answer exactly once`);
  assert.equal(response.offered, opportunities[response.id], `${response.id} must use its exact opportunity denominator`);
  assert.equal(response.rate, Math.round((selected / opportunities[response.id]) * 100));
}
assert.equal(firstProfile.reduce((sum, response) => sum + response.selected, 0), 6);

const allRetributionState = {
  index: 8,
  opening: "purpose",
  final: "purpose",
  zero: "desert",
  answers: Object.fromEntries(BLAME_CASES.map((question) => [question.id, "retribution"])),
};
const retributionDiagnostic = blameDiagnostic(allRetributionState);
assert.equal(retributionDiagnostic.retributionCount, 6);
assert.equal(retributionDiagnostic.purposeCount, 0);
assert.equal(retributionDiagnostic.desertReentries, 7);
assert.equal(retributionDiagnostic.mismatches.length, 7);
assert.equal(blamePolicyMismatches({ ...allRetributionState, final: "desert" }).length, 0);

let completePaths = 0;
let compatibilityChecks = 0;
function enumerateCases(index, answers) {
  if (index === BLAME_CASES.length) {
    for (const final of BLAME_POLICY_ORDER) {
      for (const zero of BLAME_ZERO_CONTROL.choices.map((choice) => choice.id)) {
        const state = { index: 8, opening: "purpose", final, zero, answers };
        const allowed = new Set(BLAME_POLICIES[final].allowed);
        const caseMismatches = BLAME_CASES.filter((question) => !allowed.has(blameChoice(question, answers[question.id]).response)).length;
        const controlMismatch = zero === "desert" && final !== "desert" ? 1 : 0;
        const diagnostic = blameDiagnostic(state);
        assert.equal(diagnostic.mismatches.length, caseMismatches + controlMismatch);
        assert.equal(diagnostic.profile.reduce((sum, response) => sum + response.selected, 0), 6);
        assert.ok(diagnostic.profile.every((response) => response.rate >= 0 && response.rate <= 100));
        compatibilityChecks += 1;
      }
    }
    completePaths += 1;
    return;
  }
  const question = BLAME_CASES[index];
  for (const choice of question.choices) enumerateCases(index + 1, { ...answers, [question.id]: choice.id });
}
enumerateCases(0, {});
assert.equal(completePaths, (7 ** 3) * (6 ** 3));
assert.equal(compatibilityChecks, (7 ** 3) * (6 ** 3) * 4 * 3);

const prompt = buildBlameAIProbePrompt(allRetributionState);
assert.match(prompt, /Ask one focused question at a time/i);
assert.match(prompt, /Do not assume that moral non-realism, determinism, free will skepticism, or skepticism about basic desert automatically implies any of the others/i);
assert.match(prompt, /Keep causal responsibility, intentional action, answerability, current dangerousness, repair duties, trust, public protest, and intrinsic desert separate/i);
assert.match(prompt, /What less harmful option could work\? When must it end\?/i);
assert.match(prompt, /Do not equate protection with punishment/i);
assert.match(prompt, /due process, proportionality, least-restrictive means, review/i);
assert.match(prompt, /For retribution, remove every other purpose/i);
for (const question of BLAME_CASES) {
  assert.ok(prompt.includes(question.context), `the AI prompt must include the full ${question.id} situation`);
  assert.ok(prompt.includes(question.assumptions), `the AI prompt must include the fixed ${question.id} facts`);
  assert.ok(prompt.includes(question.scope), `the AI prompt must include the ${question.id} scope`);
}
assert.ok(prompt.includes(BLAME_ZERO_CONTROL.context));
assert.ok(prompt.includes(BLAME_ZERO_CONTROL.assumptions));
for (const response of BLAME_RESPONSE_ORDER) assert.ok(prompt.includes(BLAME_RESPONSES[response].name));

assert.match(html, /Remove deserved suffering\. See what still <em>justifies a response\.<\/em>/i);
assert.match(html, /This is a conceptual lab, not a legal sentence, clinical assessment, or prediction/i);
assert.match(html, /What does “basic desert” mean\?/i);
assert.match(html, /Does moral non-realism automatically remove moral responsibility\?/i);
assert.match(html, /Is every painful consequence a punishment\?/i);
assert.match(html, /Does retribution always mean cruelty or revenge\?/i);
assert.match(html, /What will the result bars mean\?/i);
assert.match(html, /aria-valuemax="9"/);
assert.match(html, /id="resetBlameButton"/);
assert.match(html, /id="restartBlameButton"/);
assert.match(html, /id="blameQuestionPrompt" tabindex="-1"/);
assert.match(html, /id="blameResultTitle" tabindex="-1"/);
assert.match(html, /id="blameLivePurposes" role="img"/);
assert.match(html, /id="blameAIProbePrompt" rows="18" readonly spellcheck="false"/);
assert.match(html, /Nothing is sent by this site/i);
assert.match(html, /Moral Responsibility without Basic Desert/i);
assert.ok((css.match(/#blameAIProbePrompt/g) || []).length >= 2, "the prompt needs desktop and mobile sizing");
assert.match(css, /\.blame-question-card \.question-heading h2\s*\{[^}]*font-size:\s*clamp\(1\.38rem, 2\.5vw, 2\.4rem\)/s);
assert.match(css, /\.blame-conclusion\s*\{[^}]*color:\s*var\(--ink\)/s);
assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|EventSource/, "the lab must make no network or built-in AI call");
assert.match(source, /\.focus\(\{ preventScroll: true \}\)/, "question and result transitions must manage keyboard focus");
assert.match(papersSource, /id: "pereboom-without-desert"/);
assert.match(papersSource, /id: "pereboom-regret-protest"/);
assert.match(papersSource, /id: "caruso-quarantine"/);
assert.match(papersSource, /does not make proportionality, dignity, or due-process concerns disappear/i);

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "the page must not reuse an element id");
assert.equal((html.match(/<h1\b/g) || []).length, 2, "the page needs one hero heading and one results heading");

console.log("Blame Laboratory audit passed: 74,088 complete case paths, 889,056 policy/control compatibility checks, eight exact opportunity-normalized responses, pure-desert isolation, full safeguards, and full-context AI prompt verified.");
