"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");

function auditCaseLab({ configFile, htmlFile, expectedId, expectedFamilies, exhaustive = true }) {
  const configSource = fs.readFileSync(path.join(root, configFile), "utf8");
  const engineSource = fs.readFileSync(path.join(root, "case-lab.js"), "utf8");
  const html = fs.readFileSync(path.join(root, htmlFile), "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(configSource, context);
  vm.runInContext(
    `${engineSource.slice(0, engineSource.indexOf("const caseLabEls"))}
     globalThis.audit={CASE_LAB_CONFIG,CASE_LAB_QUESTIONS,caseLabState,caseLabAnswer,caseLabAnsweredCount,caseLabCounts,caseLabLeaders,caseLabSeams,caseLabDiagnosis,buildCaseLabAIProbePrompt};`,
    context,
  );
  const api = context.audit;
  const config = api.CASE_LAB_CONFIG;
  const families = Array.from(config.familyOrder);
  const reset = (answers = {}) => { api.caseLabState.answers = { ...answers }; api.caseLabState.index = 0; };

  assert.equal(config.id, expectedId, `${configFile} must identify ${expectedId}`);
  assert.equal(families.length, expectedFamilies, `${expectedId} must retain ${expectedFamilies} distinct accounts`);
  assert.equal(new Set(families).size, families.length, `${expectedId} family ids must be unique`);
  assert.equal(config.cases.length, 7, `${expectedId} must use seven pressure cases`);
  assert.equal(api.CASE_LAB_QUESTIONS.length, 9, `${expectedId} must use opening + seven cases + final`);
  assert.deepEqual(Array.from(config.familyChoices.map((choice) => choice.family)), families, `${expectedId} choices must follow the stable family order`);

  for (const familyId of families) {
    const family = config.families[familyId];
    const choice = config.familyChoices.find((item) => item.family === familyId);
    assert.ok(family && choice, `${expectedId}/${familyId} needs metadata and a choice`);
    assert.ok(family.short.length >= 60 && family.note.length >= 150, `${expectedId}/${familyId} needs a substantive public explanation`);
    assert.ok(choice.label.length >= 75, `${expectedId}/${familyId} needs an unambiguous answer label`);
    assert.ok(choice.detail.length >= 100, `${expectedId}/${familyId} needs a precise definition`);
    assert.ok(choice.establishes.length >= 75, `${expectedId}/${familyId} must state what follows`);
    assert.ok(choice.limit.length >= 95, `${expectedId}/${familyId} must state what remains open`);
  }

  for (const question of [config.opening, config.final]) {
    assert.ok(question.prompt.length >= 70 && question.context.length >= 100, `${expectedId} stance questions need full scope`);
    assert.ok(question.assumptions.length >= 120 && question.scope.length >= 100, `${expectedId} stance questions need fixed assumptions and limits`);
  }
  for (const question of config.cases) {
    assert.ok(question.context.length >= 250, `${expectedId}/${question.id} needs a fully specified case`);
    assert.ok(question.assumptions.length >= 130, `${expectedId}/${question.id} must state fixed facts`);
    assert.ok(question.scope.length >= 100, `${expectedId}/${question.id} must define the exact scope`);
    assert.equal(question.facts.length, 4, `${expectedId}/${question.id} needs a four-item case file`);
    assert.deepEqual(Object.keys(question.applications), families, `${expectedId}/${question.id} must apply every account in stable order`);
    for (const application of Object.values(question.applications)) assert.ok(application.length >= 60, `${expectedId}/${question.id} needs clear case-specific applications`);
  }

  for (const familyId of families) {
    const answers = { opening: familyId, final: familyId };
    config.cases.forEach((question) => { answers[question.id] = familyId; });
    reset(answers);
    const counts = api.caseLabCounts();
    assert.equal(api.caseLabAnsweredCount(), 9, `${expectedId}/${familyId} uniform path must be complete`);
    assert.equal(Object.values(counts).reduce((sum, entry) => sum + entry.hits, 0), 7, `${expectedId} must count one selected account per case`);
    assert.equal(Object.values(counts).reduce((sum, entry) => sum + entry.opportunities, 0), families.length * 7, `${expectedId} denominator must reflect all offered accounts`);
    assert.equal(counts[familyId].hits, 7, `${expectedId}/${familyId} must receive every uniform hit`);
    assert.deepEqual(Array.from(api.caseLabLeaders(counts)), [familyId], `${expectedId}/${familyId} must be the sole leader`);
    const prompt = api.buildCaseLabAIProbePrompt();
    assert.match(prompt, /selected ÷ offered counts/, `${expectedId} AI prompt must explain its denominator`);
    assert.match(prompt, /Ask one focused question at a time/, `${expectedId} AI prompt must require a paced interview`);
  }

  let profiles = 0;
  if (exhaustive) {
    function exhaust(index, answers) {
      if (index === config.cases.length) {
        reset({ opening: families[0], final: families[0], ...answers });
        const counts = api.caseLabCounts();
        assert.equal(Object.values(counts).reduce((sum, entry) => sum + entry.hits, 0), 7);
        const max = Math.max(...Object.values(counts).map((entry) => entry.hits));
        assert.ok(api.caseLabLeaders(counts).every((id) => counts[id].hits === max));
        profiles += 1; return;
      }
      const question = config.cases[index];
      families.forEach((familyId) => exhaust(index + 1, { ...answers, [question.id]: familyId }));
    }
    exhaust(0, {});
    assert.equal(profiles, families.length ** 7, `${expectedId} must exhaust every seven-case profile`);
  }

  const queriedIds = [...engineSource.matchAll(/document\.querySelector\("#([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
  for (const id of queriedIds) assert.match(html, new RegExp(`id=["']${id}["']`), `${htmlFile} must contain #${id}`);
  assert.match(html, new RegExp(`data-lab-id=["']${expectedId}["']`), `${htmlFile} must identify its suite-map id`);
  assert.match(html, /<fieldset class="case-lab-choices"/, `${htmlFile} must use a native fieldset`);
  assert.match(html, /id="caseNext"[^>]+disabled/, `${htmlFile} must require explicit navigation`);
  assert.match(html, /role="progressbar"/, `${htmlFile} must expose progress`);
  assert.match(html, /id="caseAIProbePrompt"/, `${htmlFile} must contain a full optional AI prompt`);
  assert.match(html, /Counts reflect only the seven cases/, `${htmlFile} must define the live denominator`);
  return { api, config, html, reset, profiles };
}

module.exports = { auditCaseLab };
