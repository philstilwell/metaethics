"use strict";

const FINDER_LABS = {
  profile: { title: "Moral Profile", href: "profile.html", question: "Which kinds of reasons guide your choices?", copy: "Use unusual scenarios to map outcomes, rights, duties, care, character, fairness, loyalty, and authority." },
  meaning: { title: "What Do You Mean by Wrong?", href: "wrong.html", question: "What is a moral sentence saying or doing?", copy: "Separate fact claims, standards, commitments, constructions, errors, and useful fictions." },
  obligation: { title: "The Missing Ought", href: "obligation.html", question: "What could make a demand bind a dissenter?", copy: "Test the difference between pressure, agreement, punishment, commitment, and approval-independent authority." },
  after: { title: "After Moral Facts", href: "after.html", question: "What should moral practice become after error?", copy: "Compare retiring, preserving, fictionalizing, or openly revising ordinary moral language." },
  decoder: { title: "The Disagreement Decoder", href: "decoder.html", question: "What are two opponents actually disputing?", copy: "Separate evidence, definitions, interests, priorities, attitudes, rules, procedures, and alleged facts." },
  genealogy: { title: "The Value Genealogy Lab", href: "genealogy.html", question: "What shaped a conviction, and what follows?", copy: "Trace possible origins without turning a causal history into an automatic refutation." },
  builder: { title: "Build a Morality Without Moral Facts", href: "build.html", question: "What can support a human-built public code?", copy: "Design goals, protections, procedures, enforcement limits, membership, dissent, and revision." },
  criticize: { title: "Can You Criticize Your Own Society?", href: "criticize.html", question: "What supports reform when a society approves?", copy: "Compare majorities, subgroups, promises, internal criticism, harm, agreement, and alleged truth." },
  blame: { title: "The Blame Laboratory", href: "blame.html", question: "What remains when suffering is not deserved for its own sake?", copy: "Separate protection, deterrence, repair, rehabilitation, boundaries, trust, protest, and retribution." },
  reasons: { title: "What Gives You a Reason?", href: "reasons.html", question: "What can genuinely count in favor of acting?", copy: "Test desires, informed aims, commitments, fair terms, independent reasons, and reasons skepticism." },
  evidence: { title: "Why Follow the Evidence?", href: "evidence.html", question: "What can make evidence count in favor of belief?", copy: "Examine truth, inquiry, useful belief, social methods, and skepticism about epistemic oughts." },
  standing: { title: "Who Gets Counted?", href: "standing.html", question: "Which beings or systems count for their own sake, and why?", copy: "Test felt experience, agency, interests, relationships, membership, objective status, constructed inclusion, and exclusion." },
  tradeoffs: { title: "When Values Won’t Add Up", href: "tradeoffs.html", question: "How should unlike values be compared?", copy: "Explore common scales, priorities, limits, thresholds, plural judgment, procedures, and incomparability." },
  emotions: { title: "Moral Emotions After Moral Facts", href: "emotions.html", question: "What can guilt, resentment, and remorse still do?", copy: "Separate desert, harm recognition, damaged relationships, protest, repair, expression, and regulation." },
};

const FINDER_QUESTIONS = [
  {
    id: "starting",
    axis: "Your starting point",
    prompt: "Which sentence comes closest to the question already in your mind?",
    context: "Choose the closest fit, even if none is exact. Later answers will refine the route.",
    choices: [
      { id: "self", label: "I want to understand my own choices, values, or reactions", weights: { profile: 5, genealogy: 4, tradeoffs: 3, emotions: 3 }, reason: "You started with your own pattern of judgment." },
      { id: "language", label: "I want to know what moral words or claims really amount to", weights: { meaning: 5, after: 4, obligation: 3, evidence: 2 }, reason: "You started with the meaning and use of normative claims." },
      { id: "skeptic", label: "I doubt objective moral facts and want to know what could remain", weights: { reasons: 5, after: 4, evidence: 4, builder: 3 }, reason: "You started from moral skepticism and its practical consequences." },
      { id: "conflict", label: "I want to understand an argument, disagreement, or failed reform", weights: { decoder: 5, criticize: 4, tradeoffs: 3, builder: 2 }, reason: "You started with conflict between people or standards." },
      { id: "response", label: "I am thinking about responsibility, emotional reactions, or who deserves consideration", weights: { blame: 5, emotions: 5, standing: 4, profile: 2 }, reason: "You started with treatment, accountability, or inclusion." },
    ],
  },
  {
    id: "scale",
    axis: "Where the problem lives",
    prompt: "At what level does the problem you most want to understand mainly live?",
    context: "The same moral sentence can hide a personal, interpersonal, institutional, or philosophical problem.",
    choices: [
      { id: "personal", label: "Inside one person’s choices, identity, beliefs, or emotions", weights: { profile: 4, genealogy: 4, reasons: 3, evidence: 3, emotions: 4, tradeoffs: 2 }, reason: "You located the problem mainly within one person’s practical outlook." },
      { id: "relationship", label: "Between people who can trust, promise, blame, help, or hurt one another", weights: { blame: 4, emotions: 4, obligation: 3, standing: 3, reasons: 2 }, reason: "You located the problem in an interpersonal relationship." },
      { id: "public", label: "In a community, institution, law, or political movement", weights: { builder: 5, criticize: 5, decoder: 3, after: 3, standing: 3 }, reason: "You want a public or institutional answer." },
      { id: "belief", label: "In evidence, truth, argument, or the standards for believing", weights: { evidence: 6, decoder: 3, genealogy: 2, reasons: 2 }, reason: "You located the problem in belief and evidence." },
      { id: "meta", label: "In what moral facts, reasons, meanings, or obligations could possibly be", weights: { meaning: 5, obligation: 5, reasons: 5, evidence: 3, after: 2 }, reason: "You want the underlying philosophical structure made explicit." },
    ],
  },
  {
    id: "task",
    axis: "What you want the lab to do",
    prompt: "What kind of result would be most useful right now?",
    context: "Some labs map a pattern; others test a boundary, unpack an argument, or help construct a practice.",
    choices: [
      { id: "map", label: "Show me the pattern across my own answers instead of giving one verdict", weights: { profile: 5, genealogy: 4, tradeoffs: 4, emotions: 3, reasons: 3 }, reason: "You asked for a personal pattern rather than one verdict." },
      { id: "clarify", label: "Help me separate ideas people often blend together", weights: { decoder: 5, meaning: 5, reasons: 4, evidence: 4, blame: 3 }, reason: "You want nearby concepts kept apart." },
      { id: "stress", label: "Test whether a claim reaches farther than its support", weights: { obligation: 5, genealogy: 4, evidence: 4, criticize: 3, standing: 3 }, reason: "You want an inference or boundary stress-tested." },
      { id: "build", label: "Help me decide what practice, rule, or response should remain", weights: { builder: 5, after: 5, blame: 4, emotions: 3, tradeoffs: 3 }, reason: "You want to construct or revise a practice." },
      { id: "include", label: "Make me state whose interests or values enter the decision", weights: { standing: 6, tradeoffs: 5, profile: 2, criticize: 2 }, reason: "You want inclusion and priority made explicit." },
    ],
  },
  {
    id: "scene",
    axis: "The scene that pulls you in",
    prompt: "Which scene would you most willingly investigate for ten minutes?",
    context: "Choose by curiosity. The scene is a final routing signal, not a hidden moral test.",
    choices: [
      { id: "copy", label: "A conscious digital copy reaches the end of its contract and refuses deletion", weights: { standing: 5, profile: 4, obligation: 2 }, reason: "You chose a case about identity and who receives consideration." },
      { id: "evidence", label: "Strong evidence supports a truth that nobody wants and that helps no practical goal", weights: { evidence: 6, reasons: 3 }, reason: "You chose a case about truth and epistemic force." },
      { id: "values", label: "Two important values conflict, but no honest common measuring scale seems available", weights: { tradeoffs: 6, profile: 3, builder: 2 }, reason: "You chose a case about comparing unlike values." },
      { id: "remorse", label: "Someone feels deep remorse even though they reject objective wrongdoing and deserved suffering", weights: { emotions: 6, blame: 4, after: 2 }, reason: "You chose a case about moral emotion after moral facts." },
      { id: "argument", label: "Two people shout opposite moral verdicts while disagreeing about several different things", weights: { decoder: 6, meaning: 4 }, reason: "You chose a layered disagreement." },
      { id: "reformer", label: "A society approves a cruel hierarchy and condemns the one person trying to end it", weights: { criticize: 6, obligation: 3, standing: 3 }, reason: "You chose a case about criticism and social authority." },
      { id: "city", label: "A new settlement must build rules without claiming that objective morality wrote them", weights: { builder: 6, after: 3, reasons: 2 }, reason: "You chose a constructive non-realist problem." },
    ],
  },
];

const finderState = { index: 0, answers: {} };
const finderEls = {
  survey: document.querySelector("#finderSurvey"), results: document.querySelector("#finderResults"), step: document.querySelector("#finderStep"), progress: document.querySelector("#finderProgress"), bar: document.querySelector("#finderProgressBar"), axis: document.querySelector("#finderAxis"), question: document.querySelector("#finderQuestion"), context: document.querySelector("#finderContext"), choices: document.querySelector("#finderChoices"), back: document.querySelector("#finderBack"), next: document.querySelector("#finderNext"), grid: document.querySelector("#finderResultGrid"), resultTitle: document.querySelector("#finderResultTitle"),
};

function finderQuestion() { return FINDER_QUESTIONS[finderState.index]; }

function finderRanking() {
  const scores = Object.fromEntries(Object.keys(FINDER_LABS).map((id) => [id, { score: 0, reasons: [] }]));
  FINDER_QUESTIONS.forEach((question) => {
    const choice = question.choices.find((item) => item.id === finderState.answers[question.id]);
    if (!choice) return;
    Object.entries(choice.weights).forEach(([labId, points]) => {
      scores[labId].score += points;
      scores[labId].reasons.push(choice.reason);
    });
  });
  return Object.entries(scores).sort((a, b) => b[1].score - a[1].score || Object.keys(FINDER_LABS).indexOf(a[0]) - Object.keys(FINDER_LABS).indexOf(b[0]));
}

function renderFinderQuestion({ focus = false } = {}) {
  const question = finderQuestion();
  const number = finderState.index + 1;
  finderEls.step.textContent = `${number} / ${FINDER_QUESTIONS.length}`;
  finderEls.progress.setAttribute("aria-valuenow", String(number));
  finderEls.progress.setAttribute("aria-valuetext", `Question ${number} of ${FINDER_QUESTIONS.length}`);
  finderEls.bar.style.width = `${(number / FINDER_QUESTIONS.length) * 100}%`;
  finderEls.axis.textContent = question.axis;
  finderEls.question.textContent = question.prompt;
  finderEls.context.textContent = question.context;
  finderEls.choices.replaceChildren();
  const legend = document.createElement("legend"); legend.className = "visually-hidden"; legend.textContent = `Choose one answer for question ${number}`; finderEls.choices.append(legend);
  question.choices.forEach((choice, index) => {
    const label = document.createElement("label"); label.className = `finder-choice${finderState.answers[question.id] === choice.id ? " selected" : ""}`;
    const input = document.createElement("input"); input.type = "radio"; input.name = question.id; input.value = choice.id; input.checked = finderState.answers[question.id] === choice.id;
    const marker = document.createElement("span"); marker.textContent = String.fromCharCode(65 + index);
    const copy = document.createElement("strong"); copy.textContent = choice.label;
    label.append(input, marker, copy);
    input.addEventListener("change", () => { finderState.answers[question.id] = choice.id; renderFinderQuestion(); });
    finderEls.choices.append(label);
  });
  finderEls.back.disabled = finderState.index === 0;
  finderEls.next.disabled = !finderState.answers[question.id];
  finderEls.next.textContent = number === FINDER_QUESTIONS.length ? "Show my route →" : "Next question →";
  if (focus) finderEls.question.focus({ preventScroll: true });
}

function showFinderResults() {
  finderEls.grid.replaceChildren();
  finderRanking().slice(0, 3).forEach(([labId, result], index) => {
    const lab = FINDER_LABS[labId];
    const article = document.createElement("article");
    const rank = document.createElement("span"); rank.textContent = index === 0 ? "Closest match" : `Suggestion ${index + 1}`;
    const heading = document.createElement("h2"); heading.textContent = lab.title;
    const question = document.createElement("strong"); question.textContent = lab.question;
    const copy = document.createElement("p"); copy.textContent = lab.copy;
    const why = document.createElement("ul");
    [...new Set(result.reasons)].slice(0, 3).forEach((reason) => { const item = document.createElement("li"); item.textContent = reason; why.append(item); });
    const link = document.createElement("a"); link.href = lab.href; link.textContent = `Open ${lab.title} →`;
    article.append(rank, heading, question, copy, why, link); finderEls.grid.append(article);
  });
  finderEls.survey.classList.add("hidden"); finderEls.results.classList.remove("hidden"); window.scrollTo({ top: 0, behavior: "smooth" }); finderEls.resultTitle.focus({ preventScroll: true });
}

function resetFinder() { finderState.index = 0; finderState.answers = {}; finderEls.results.classList.add("hidden"); finderEls.survey.classList.remove("hidden"); renderFinderQuestion({ focus: true }); }
finderEls.back.addEventListener("click", () => { if (finderState.index > 0) { finderState.index -= 1; renderFinderQuestion({ focus: true }); } });
finderEls.next.addEventListener("click", () => { if (!finderState.answers[finderQuestion().id]) return; if (finderState.index === FINDER_QUESTIONS.length - 1) showFinderResults(); else { finderState.index += 1; renderFinderQuestion({ focus: true }); } });
document.querySelector("#finderReset").addEventListener("click", resetFinder);
document.querySelector("#finderAgain").addEventListener("click", resetFinder);
renderFinderQuestion();
