"use strict";

const CASE_LAB_CONFIG = window.CASE_LAB_CONFIG;
if (!CASE_LAB_CONFIG) throw new Error("A case-lab configuration must load before case-lab.js");

const CASE_LAB_QUESTIONS = [
  { ...CASE_LAB_CONFIG.opening, id: "opening", kind: "stance", phase: "Your starting account" },
  ...CASE_LAB_CONFIG.cases.map((question) => ({ ...question, kind: "case" })),
  { ...CASE_LAB_CONFIG.final, id: "final", kind: "stance", phase: "Return to the account" },
];

const caseLabState = { index: 0, answers: {} };

function caseLabQuestion(index = caseLabState.index) { return CASE_LAB_QUESTIONS[index]; }
function caseLabFamily(familyId) { return CASE_LAB_CONFIG.families[familyId]; }
function caseLabBaseChoice(familyId) { return CASE_LAB_CONFIG.familyChoices.find((choice) => choice.family === familyId); }
function caseLabAnswer(questionOrId) {
  const question = typeof questionOrId === "string" ? CASE_LAB_QUESTIONS.find((item) => item.id === questionOrId) : questionOrId;
  const familyId = question ? caseLabState.answers[question.id] : null;
  const base = caseLabBaseChoice(familyId);
  if (!question || !base) return null;
  return { ...base, application: question.applications?.[familyId] || "" };
}
function caseLabAnsweredCount() { return CASE_LAB_QUESTIONS.filter((question) => caseLabAnswer(question)).length; }

function caseLabCounts() {
  const counts = Object.fromEntries(CASE_LAB_CONFIG.familyOrder.map((id) => [id, { hits: 0, opportunities: CASE_LAB_CONFIG.cases.length, cases: [], rate: 0 }]));
  CASE_LAB_CONFIG.cases.forEach((question) => {
    const answer = caseLabAnswer(question);
    if (answer) { counts[answer.family].hits += 1; counts[answer.family].cases.push(question.id); }
  });
  Object.values(counts).forEach((entry) => { entry.rate = Math.round((entry.hits / entry.opportunities) * 100); });
  return counts;
}

function caseLabLeaders(counts = caseLabCounts()) {
  const max = Math.max(...Object.values(counts).map((entry) => entry.hits));
  return CASE_LAB_CONFIG.familyOrder.filter((id) => max > 0 && counts[id].hits === max);
}

function caseLabSeams() {
  const seams = [];
  const opening = caseLabAnswer("opening");
  const final = caseLabAnswer("final");
  const counts = caseLabCounts();
  if (opening && final && opening.family !== final.family) seams.push({
    id: "account-shift",
    title: "Your general account changed",
    detail: `You began with ${caseLabFamily(opening.family).name.toLowerCase()} and ended with ${caseLabFamily(final.family).name.toLowerCase()}. A change can be learning; identify which case earned it.`,
  });
  const custom = CASE_LAB_CONFIG.detectSeams?.({
    answers: { ...caseLabState.answers }, counts, opening, final,
    selected: (questionId, familyId) => caseLabState.answers[questionId] === familyId,
    hits: (familyId) => counts[familyId]?.hits || 0,
  }) || [];
  const seen = new Set(seams.map((seam) => seam.id));
  custom.forEach((seam) => { if (!seen.has(seam.id)) { seams.push(seam); seen.add(seam.id); } });
  return seams;
}

function caseLabDiagnosis() {
  const counts = caseLabCounts();
  const leaders = caseLabLeaders(counts);
  const max = leaders.length ? counts[leaders[0]].hits : 0;
  const distinct = Object.values(counts).filter((entry) => entry.hits > 0).length;
  const seams = caseLabSeams();
  const primary = leaders.length > 1 ? `${leaders.length}-way case tie` : leaders.length ? caseLabFamily(leaders[0]).name : "No account recorded";
  const primaryCopy = leaders.length > 1
    ? `${leaders.map((id) => caseLabFamily(id).name).join(", ")} each appeared ${max} of ${CASE_LAB_CONFIG.cases.length} times. No tie-breaker was invented.`
    : leaders.length ? `${caseLabFamily(leaders[0]).short} Selected ${max} of ${CASE_LAB_CONFIG.cases.length} times.` : "No case answer was recorded.";
  const pattern = `${distinct} of ${CASE_LAB_CONFIG.familyOrder.length} accounts used`;
  const opening = caseLabAnswer("opening");
  const final = caseLabAnswer("final");
  let title = CASE_LAB_CONFIG.defaultResultTitle;
  if (leaders.length === 1 && max >= Math.ceil(CASE_LAB_CONFIG.cases.length / 2)) title = CASE_LAB_CONFIG.leadingTitle(leaders[0]);
  if (final?.family === CASE_LAB_CONFIG.skepticFamily) title = CASE_LAB_CONFIG.skepticTitle;
  return {
    counts, leaders, seams, primary, primaryCopy, pattern,
    openingFinal: `${opening ? caseLabFamily(opening.family).name : "Not answered"} → ${final ? caseLabFamily(final.family).name : "Not answered"}`,
    title,
    summary: `${CASE_LAB_CONFIG.cases.length} cases used ${distinct} of ${CASE_LAB_CONFIG.familyOrder.length} available accounts. ${seams.length ? `${seams.length} exact seam${seams.length === 1 ? "" : "s"} should be clarified.` : "No exact cross-answer seam was detected by the lab’s limited rules."}`,
  };
}

function buildCaseLabAIProbePrompt() {
  const diagnosis = caseLabDiagnosis();
  const opening = caseLabAnswer("opening");
  const final = caseLabAnswer("final");
  const cases = CASE_LAB_CONFIG.cases.map((question, index) => {
    const answer = caseLabAnswer(question);
    return [
      `${index + 1}. ${question.axis}`,
      `Full case: ${question.context}`,
      `Fixed details: ${question.assumptions}`,
      `Exact scope: ${question.scope}`,
      `My selected account: ${answer ? caseLabFamily(answer.family).name : "No answer"}.`,
      `General account: ${answer?.label || ""} ${answer?.detail || ""}`,
      `Application here: ${answer?.application || ""}`,
      `What this can establish: ${answer?.establishes || ""}`,
      `What remains open: ${answer?.limit || ""}`,
    ].join("\n");
  }).join("\n\n");
  const counts = CASE_LAB_CONFIG.familyOrder.map((id) => `- ${caseLabFamily(id).name}: selected ${diagnosis.counts[id].hits} of ${diagnosis.counts[id].opportunities} times offered.`).join("\n");
  const seams = diagnosis.seams.length ? diagnosis.seams.map((seam, index) => `${index + 1}. ${seam.title}: ${seam.detail}`).join("\n") : "No exact seam was flagged. This is not proof of complete coherence.";
  return `You are helping me examine my answers from The Moral Compass lab “${CASE_LAB_CONFIG.title}.” Act as a careful philosophical interviewer, not as a moral judge or advocate for one theory.

FIXED PREMISE AND QUESTION
${CASE_LAB_CONFIG.aiPremise}

OPENING AND FINAL ACCOUNTS
- Opening: ${opening?.label || "No answer"}. ${opening?.detail || ""}
- Final: ${final?.label || "No answer"}. ${final?.detail || ""}

MY CASES
${cases}

EXACT CASE COUNTS
${counts}
These are selected ÷ offered counts, not probabilities, grades, confidence levels, or evidence that an account is true.

EXACT SEAMS FLAGGED
${seams}

METHOD AND LIMITS
- Every case offered the same ${CASE_LAB_CONFIG.familyOrder.length} broad accounts in the same order.
- Using more than one account is not automatically incoherent; source, scope, strength, or context may differ.
- The lab records when I used an account. It does not establish that the account is true or complete.
- A flagged seam is a question for clarification, not an automatic contradiction.
${CASE_LAB_CONFIG.aiCautions.map((item) => `- ${item}`).join("\n")}

INTERVIEW INSTRUCTIONS
1. Begin with the strongest exact seam. If none exists, begin with the case whose selected account has the hardest stated limit.
2. Ask one focused question at a time.
3. Require me to state the source, scope, and limit of each claim before testing it.
4. Do not substitute a familiar moral verdict for the exact question this lab asks.
5. End with: (a) my clearest general account, (b) its strongest case, (c) its hardest case, (d) any deliberate exceptions, and (e) what remains unsettled.

Start with a two-sentence description of the central issue, then ask your first single question.`;
}

const caseLabEls = {
  workspace: document.querySelector("#caseLab"), phase: document.querySelector("#casePhase"), progressText: document.querySelector("#caseProgressText"), progress: document.querySelector("#caseProgress"), progressBar: document.querySelector("#caseProgressBar"), number: document.querySelector("#caseQuestionNumber"), axis: document.querySelector("#caseQuestionAxis"), prompt: document.querySelector("#caseQuestionPrompt"), context: document.querySelector("#caseQuestionContext"), facts: document.querySelector("#caseFacts"), assumptions: document.querySelector("#caseAssumptions"), scope: document.querySelector("#caseScope"), guide: document.querySelector("#caseGuide"), plain: document.querySelector("#casePlain"), separate: document.querySelector("#caseSeparate"), reveal: document.querySelector("#caseReveal"), choices: document.querySelector("#caseChoices"), back: document.querySelector("#caseBack"), next: document.querySelector("#caseNext"), why: document.querySelector("#caseWhy"), liveMap: document.querySelector("#caseLiveMap"), liveBasis: document.querySelector("#caseLiveBasis"), results: document.querySelector("#caseResults"), resultTitle: document.querySelector("#caseResultTitle"), resultSummary: document.querySelector("#caseResultSummary"), primary: document.querySelector("#casePrimary"), primaryCopy: document.querySelector("#casePrimaryCopy"), pattern: document.querySelector("#casePattern"), patternCopy: document.querySelector("#casePatternCopy"), openingFinal: document.querySelector("#caseOpeningFinal"), openingFinalCopy: document.querySelector("#caseOpeningFinalCopy"), ledger: document.querySelector("#caseLedger"), seams: document.querySelector("#caseSeams"), caseGrid: document.querySelector("#caseAuditGrid"), aiPrompt: document.querySelector("#caseAIProbePrompt"), copyStatus: document.querySelector("#casePromptStatus"), liveStatus: document.querySelector("#caseLiveStatus"),
};

function renderCaseFacts(question) {
  caseLabEls.facts.replaceChildren();
  if (!question.facts?.length) { caseLabEls.facts.classList.add("hidden"); return; }
  caseLabEls.facts.classList.remove("hidden");
  question.facts.forEach((fact) => { const span = document.createElement("span"); span.textContent = fact; caseLabEls.facts.append(span); });
}

function makeCaseLabChoice(question, base, selected) {
  const family = caseLabFamily(base.family);
  const label = document.createElement("label"); label.className = `case-lab-choice${selected ? " selected" : ""}`;
  const input = document.createElement("input"); input.type = "radio"; input.name = `case-${question.id}`; input.value = base.family; input.checked = selected;
  const body = document.createElement("span");
  const marker = document.createElement("small"); marker.textContent = family.name;
  const title = document.createElement("strong"); title.textContent = base.label;
  const detail = document.createElement("em"); detail.textContent = question.applications?.[base.family] ? `${base.detail} Here: ${question.applications[base.family]}` : base.detail;
  body.append(marker, title, detail); label.append(input, body);
  input.addEventListener("change", () => { caseLabState.answers[question.id] = base.family; renderCaseLabQuestion(); caseLabEls.liveStatus.textContent = `${family.name} selected. Choose Next when ready.`; });
  return label;
}

function renderCaseLabMap() {
  const counts = caseLabCounts();
  const answered = CASE_LAB_CONFIG.cases.filter((question) => caseLabAnswer(question)).length;
  caseLabEls.liveBasis.textContent = `${answered} of ${CASE_LAB_CONFIG.cases.length} cases classified`;
  caseLabEls.liveMap.replaceChildren();
  CASE_LAB_CONFIG.familyOrder.forEach((id) => {
    const row = document.createElement("div"); row.className = "case-lab-map-row";
    const top = document.createElement("div"); const name = document.createElement("strong"); name.textContent = caseLabFamily(id).name; const score = document.createElement("span"); score.textContent = `${counts[id].hits}/${counts[id].opportunities}`; top.append(name, score);
    const bar = document.createElement("i"); const fill = document.createElement("span"); fill.style.width = `${counts[id].rate}%`; bar.append(fill); row.append(top, bar); caseLabEls.liveMap.append(row);
  });
}

function renderCaseLabQuestion({ focus = false, scroll = false } = {}) {
  const question = caseLabQuestion(); const selected = caseLabAnswer(question); const number = caseLabState.index + 1;
  caseLabEls.phase.textContent = question.phase || question.axis; caseLabEls.progressText.textContent = `${number} / ${CASE_LAB_QUESTIONS.length}`; caseLabEls.progress.setAttribute("aria-valuenow", String(number)); caseLabEls.progress.setAttribute("aria-valuetext", `Question ${number} of ${CASE_LAB_QUESTIONS.length}`); caseLabEls.progressBar.style.width = `${(number / CASE_LAB_QUESTIONS.length) * 100}%`;
  caseLabEls.number.textContent = String(number).padStart(2, "0"); caseLabEls.axis.textContent = question.axis; caseLabEls.prompt.textContent = question.prompt; caseLabEls.context.textContent = question.context; caseLabEls.assumptions.textContent = question.assumptions; caseLabEls.scope.textContent = question.scope; caseLabEls.plain.textContent = question.guide.plain; caseLabEls.separate.textContent = question.guide.separate; caseLabEls.reveal.textContent = question.guide.reveal; caseLabEls.why.textContent = question.why; caseLabEls.guide.open = false; renderCaseFacts(question);
  caseLabEls.choices.replaceChildren(); const legend = document.createElement("legend"); legend.className = "visually-hidden"; legend.textContent = `Choose one answer for question ${number}`; caseLabEls.choices.append(legend);
  CASE_LAB_CONFIG.familyChoices.forEach((base) => caseLabEls.choices.append(makeCaseLabChoice(question, base, selected?.family === base.family)));
  caseLabEls.back.disabled = caseLabState.index === 0; caseLabEls.back.classList.toggle("invisible-control", caseLabState.index === 0); caseLabEls.next.disabled = !selected; caseLabEls.next.textContent = number === CASE_LAB_QUESTIONS.length ? "See my diagnostic →" : "Next question →"; renderCaseLabMap();
  if (scroll) window.scrollTo({ top: Math.max(0, caseLabEls.workspace.offsetTop - 76), behavior: "smooth" }); if (focus) caseLabEls.prompt.focus({ preventScroll: true });
}

function renderCaseLabResults() {
  const diagnosis = caseLabDiagnosis();
  caseLabEls.resultTitle.textContent = diagnosis.title; caseLabEls.resultSummary.textContent = diagnosis.summary; caseLabEls.primary.textContent = diagnosis.primary; caseLabEls.primaryCopy.textContent = diagnosis.primaryCopy; caseLabEls.pattern.textContent = diagnosis.pattern; caseLabEls.patternCopy.textContent = `The seven case answers used ${diagnosis.pattern.toLowerCase()}. Multiple accounts may be deliberate.`; caseLabEls.openingFinal.textContent = diagnosis.openingFinal; caseLabEls.openingFinalCopy.textContent = caseLabAnswer("opening")?.family === caseLabAnswer("final")?.family ? "Your general account stayed the same; case-level exceptions may still matter." : "A changed answer can be revision rather than inconsistency; identify what changed it.";
  caseLabEls.ledger.replaceChildren(); CASE_LAB_CONFIG.familyOrder.forEach((id) => { const family = caseLabFamily(id), entry = diagnosis.counts[id], row = document.createElement("article"); row.className = "case-lab-ledger-row"; const index = document.createElement("span"); index.textContent = family.index; const copy = document.createElement("div"); const title = document.createElement("strong"); title.textContent = family.name; const theory = document.createElement("small"); theory.textContent = family.theory; const note = document.createElement("p"); note.textContent = family.note; copy.append(title, theory, note); const graph = document.createElement("div"); const score = document.createElement("b"); score.textContent = `${entry.hits} / ${entry.opportunities}`; const bar = document.createElement("i"); const fill = document.createElement("span"); fill.style.width = `${entry.rate}%`; bar.append(fill); graph.append(score, bar); row.append(index, copy, graph); caseLabEls.ledger.append(row); });
  caseLabEls.seams.replaceChildren(); if (diagnosis.seams.length) diagnosis.seams.forEach((seam) => { const article = document.createElement("article"); const heading = document.createElement("h3"); heading.textContent = seam.title; const copy = document.createElement("p"); copy.textContent = seam.detail; article.append(heading, copy); caseLabEls.seams.append(article); }); else { const clear = document.createElement("p"); clear.className = "no-final-tensions"; clear.textContent = "No exact seam was detected by this lab’s limited comparison rules. This is not proof that every answer has been fully explained."; caseLabEls.seams.append(clear); }
  caseLabEls.caseGrid.replaceChildren(); CASE_LAB_CONFIG.cases.forEach((question, index) => { const answer = caseLabAnswer(question); const article = document.createElement("article"); const meta = document.createElement("span"); meta.textContent = `${String(index + 1).padStart(2, "0")} · ${caseLabFamily(answer.family).name}`; const heading = document.createElement("h3"); heading.textContent = question.axis.replace(/^Case — /, ""); const selected = document.createElement("strong"); selected.textContent = answer.application || answer.label; const establishes = document.createElement("p"); const eLabel = document.createElement("b"); eLabel.textContent = "What it establishes: "; establishes.append(eLabel, answer.establishes); const limit = document.createElement("p"); const lLabel = document.createElement("b"); lLabel.textContent = "What remains open: "; limit.append(lLabel, answer.limit); article.append(meta, heading, selected, establishes, limit); caseLabEls.caseGrid.append(article); });
  caseLabEls.aiPrompt.value = buildCaseLabAIProbePrompt(); caseLabEls.workspace.classList.add("hidden"); caseLabEls.results.classList.remove("hidden"); caseLabEls.liveStatus.textContent = `Diagnostic ready: ${diagnosis.title}`; window.scrollTo({ top: 0, behavior: "smooth" }); caseLabEls.resultTitle.focus({ preventScroll: true });
}

function resetCaseLab() { caseLabState.index = 0; caseLabState.answers = {}; caseLabEls.results.classList.add("hidden"); caseLabEls.workspace.classList.remove("hidden"); renderCaseLabQuestion({ focus: true, scroll: true }); }
caseLabEls.back.addEventListener("click", () => { if (caseLabState.index > 0) { caseLabState.index -= 1; renderCaseLabQuestion({ focus: true, scroll: true }); } });
caseLabEls.next.addEventListener("click", () => { if (!caseLabAnswer(caseLabQuestion())) return; if (caseLabState.index === CASE_LAB_QUESTIONS.length - 1) renderCaseLabResults(); else { caseLabState.index += 1; renderCaseLabQuestion({ focus: true, scroll: true }); } });
document.querySelector("#caseReset").addEventListener("click", () => { if (!caseLabAnsweredCount() || window.confirm(`Reset every answer in ${CASE_LAB_CONFIG.title}?`)) resetCaseLab(); });
document.querySelector("#caseRestart").addEventListener("click", resetCaseLab);
document.querySelector("#caseCopyPrompt").addEventListener("click", async (event) => { const button = event.currentTarget; try { await navigator.clipboard.writeText(caseLabEls.aiPrompt.value); button.textContent = "AI prompt copied"; caseLabEls.copyStatus.textContent = "Ready to paste into the AI service you choose."; } catch { caseLabEls.aiPrompt.focus(); caseLabEls.aiPrompt.select(); button.textContent = "Select and copy"; caseLabEls.copyStatus.textContent = "Automatic copying was blocked. The complete prompt is selected."; } window.setTimeout(() => { button.textContent = "Copy AI prompt"; caseLabEls.copyStatus.textContent = "The prompt contains your answers but no account information."; }, 2400); });
renderCaseLabQuestion();
