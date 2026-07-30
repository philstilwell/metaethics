"use strict";

const FINDER_LABS = {
  profile: { title: "Moral Profile", href: "profile.html", question: "Which kinds of reasons guide your choices?", copy: "Use unusual scenarios to map outcomes, rights, duties, care, character, fairness, loyalty, and authority." },
  meaning: { title: "What Do You Mean by Wrong?", href: "wrong.html", question: "What is a moral sentence saying or doing?", copy: "Separate fact claims, standards, commitments, constructions, errors, and useful fictions." },
  obligation: { title: "The Missing Ought", href: "obligation.html", question: "Why should a rule apply to someone who rejects it?", copy: "Separate social pressure, agreement, punishment, and personal commitment from a rule claimed to apply even without approval." },
  after: { title: "After Moral Facts", href: "after.html", question: "What should moral practice become after error?", copy: "Compare retiring, preserving, fictionalizing, or openly revising ordinary moral language." },
  decoder: { title: "The Disagreement Decoder", href: "decoder.html", question: "What are two opponents actually disputing?", copy: "Separate evidence, definitions, interests, priorities, attitudes, rules, procedures, and alleged facts." },
  genealogy: { title: "The Value Genealogy Lab", href: "genealogy.html", question: "What shaped a belief, and what does that history show?", copy: "Trace possible origins without treating the history as automatic proof that the belief is false." },
  builder: { title: "Build a Morality Without Moral Facts", href: "build.html", question: "What can support a human-built public code?", copy: "Design goals, protections, procedures, enforcement limits, membership, dissent, and revision." },
  criticize: { title: "Can You Criticize Your Own Society?", href: "criticize.html", question: "What supports reform when a society approves?", copy: "Compare majorities, subgroups, promises, internal criticism, harm, agreement, and alleged truth." },
  blame: { title: "The Blame Laboratory", href: "blame.html", question: "Which responses remain if suffering is never the goal?", copy: "Separate protection, prevention, repair, behavior change, boundaries, trust, protest, and suffering used as deserved payback." },
  reasons: { title: "What Gives You a Reason?", href: "reasons.html", question: "What can genuinely count in favor of acting?", copy: "Test desires, informed aims, commitments, fair terms, independent reasons, and reasons skepticism." },
  evidence: { title: "Why Follow the Evidence?", href: "evidence.html", question: "What can make evidence support a belief?", copy: "Examine truth, careful investigation, useful belief, public methods, and the view that evidence creates no literal “should.”" },
  standing: { title: "Who Gets Counted?", href: "standing.html", question: "Which beings or systems matter for their own sake, and why?", copy: "Test conscious experience, the ability to choose, interests, relationships, membership, objective moral status, human-built inclusion rules, and exclusion." },
  tradeoffs: { title: "When Values Won’t Add Up", href: "tradeoffs.html", question: "How should unlike values be compared?", copy: "Explore common scales, priorities, limits, thresholds, plural judgment, procedures, and incomparability." },
  emotions: { title: "Moral Emotions After Moral Facts", href: "emotions.html", question: "What can guilt, anger, and remorse still do?", copy: "Separate deserved pain or praise from recognizing harm, protecting relationships, protesting, repairing, expressing commitments, and managing behavior." },
};

const FINDER_QUESTIONS = [
  {
    id: "starting",
    axis: "What brought you here",
    prompt: "Which sentence comes closest to the question you want help with?",
    context: "Choose the closest match. It does not need to describe your whole view; the next three questions will narrow the suggestions.",
    choices: [
      { id: "self", label: "I want to understand the reasons, values, or feelings behind my own choices", weights: { profile: 5, genealogy: 4, tradeoffs: 3, emotions: 3 }, reason: "You began with the pattern behind your own choices, values, or feelings." },
      { id: "language", label: "I want to understand what people mean or do when they call something “right,” “wrong,” or “required”", weights: { meaning: 5, after: 4, obligation: 3, evidence: 2 }, reason: "You began with what moral words such as “right” and “wrong” mean and do." },
      { id: "skeptic", label: "I doubt that right and wrong exist as facts independent of people, and I want to know what can still guide our choices", weights: { reasons: 5, after: 4, evidence: 4, builder: 3 }, reason: "You began by doubting that morality exists as facts apart from people and asking what can remain." },
      { id: "conflict", label: "I want to understand why people disagree, or why an attempt to change a law, rule, or social practice did not win support", weights: { decoder: 5, criticize: 4, tradeoffs: 3, builder: 2 }, reason: "You began with disagreement or resistance to changing a shared rule." },
      { id: "response", label: "I want to think about blame and responsibility, feelings such as guilt or anger, or which beings should count in our decisions", weights: { blame: 5, emotions: 5, standing: 4, profile: 2 }, reason: "You began with blame, moral feelings, or the question of whose interests count." },
    ],
  },
  {
    id: "scale",
    axis: "Where the main problem appears",
    prompt: "Where is the main problem you want to understand?",
    context: "A moral issue can involve several levels. Choose the one you most want a lab to focus on; later answers can still point to connected levels.",
    choices: [
      { id: "personal", label: "Mainly inside one person: their choices, identity, beliefs, values, or emotions", weights: { profile: 4, genealogy: 4, reasons: 3, evidence: 3, emotions: 4, tradeoffs: 2 }, reason: "You placed the problem mainly in one person’s choices, beliefs, values, or emotions." },
      { id: "relationship", label: "Mainly between people: trust, promises, blame, help, harm, or responsibility", weights: { blame: 4, emotions: 4, obligation: 3, standing: 3, reasons: 2 }, reason: "You placed the problem in trust, promises, harm, or responsibility between people." },
      { id: "public", label: "Mainly in a community or institution: its laws, policies, customs, or political efforts", weights: { builder: 5, criticize: 5, decoder: 3, after: 3, standing: 3 }, reason: "You placed the problem in a community, law, institution, or political effort." },
      { id: "belief", label: "Mainly in deciding what is true: what counts as evidence, a good argument, or a reasonable belief", weights: { evidence: 6, decoder: 3, genealogy: 2, reasons: 2 }, reason: "You placed the problem in evidence, arguments, and deciding what to believe." },
      { id: "meta", label: "Mainly in the deeper questions: whether moral facts exist, what can count in favor of a choice, what moral words mean, or what could make an obligation bind someone", weights: { meaning: 5, obligation: 5, reasons: 5, evidence: 3, after: 2 }, reason: "You want the deeper questions about moral facts, reasons, meaning, or binding obligations made explicit." },
    ],
  },
  {
    id: "task",
    axis: "What you want from the lab",
    prompt: "What would you most like the lab to help you do?",
    context: "Choose the kind of help you want. A lab may map your answers, clarify confusing ideas, test a conclusion, help redesign a practice, or identify who and what counts.",
    choices: [
      { id: "map", label: "Show me the pattern across my answers without reducing everything to one right-or-wrong verdict", weights: { profile: 5, genealogy: 4, tradeoffs: 4, emotions: 3, reasons: 3 }, reason: "You asked for a pattern across your answers rather than one final verdict." },
      { id: "clarify", label: "Separate ideas that sound similar but may be doing different jobs", weights: { decoder: 5, meaning: 5, reasons: 4, evidence: 4, blame: 3 }, reason: "You asked for ideas that people often blend together to be separated." },
      { id: "stress", label: "Check whether a conclusion claims more than its evidence or supporting reasons can justify", weights: { obligation: 5, genealogy: 4, evidence: 4, criticize: 3, standing: 3 }, reason: "You asked to check whether a conclusion goes beyond its support." },
      { id: "build", label: "Help me decide which practice, public rule, or response to keep, revise, or replace", weights: { builder: 5, after: 5, blame: 4, emotions: 3, tradeoffs: 3 }, reason: "You asked for help keeping, changing, or replacing a practice." },
      { id: "include", label: "Help me identify whose interests count and how competing values should be compared", weights: { standing: 6, tradeoffs: 5, profile: 2, criticize: 2 }, reason: "You asked who or what counts and how competing claims should be weighed." },
    ],
  },
  {
    id: "scene",
    axis: "What catches your interest",
    prompt: "Which situation would you be most curious to explore for about ten minutes?",
    context: "Choose the situation that most catches your interest. It only helps select a starting lab; it is not a hidden test of whether your answer is morally good.",
    choices: [
      { id: "copy", label: "A conscious digital copy of a person reaches the end of its contract and refuses to be deleted", weights: { standing: 5, profile: 4, obligation: 2 }, reason: "You chose a case about identity and whose interests should count." },
      { id: "evidence", label: "Strong evidence supports a truth that nobody wants to hear and that would help no practical goal", weights: { evidence: 6, reasons: 3 }, reason: "You chose a case about truth and why evidence should influence belief." },
      { id: "values", label: "Two important values conflict, and there is no obvious or agreed way to measure both on one scale", weights: { tradeoffs: 6, profile: 3, builder: 2 }, reason: "You chose a case about comparing two important but unlike values." },
      { id: "remorse", label: "Someone deeply regrets betraying a friend but no longer believes that actions can be wrong as facts independent of people or that wrongdoers deserve suffering", weights: { emotions: 6, blame: 4, after: 2 }, reason: "You chose a case about regret, accountability, and repair after rejecting right and wrong as facts independent of people and rejecting deserved suffering." },
      { id: "argument", label: "Two people give opposite answers about assisted dying, but they also disagree about evidence, word meanings, priorities, and public rules", weights: { decoder: 6, meaning: 4 }, reason: "You chose a disagreement made of several distinct disputes." },
      { id: "reformer", label: "An entire society accepts a cruel hierarchy and condemns the one person trying to end it", weights: { criticize: 6, obligation: 3, standing: 3 }, reason: "You chose a case about criticizing an accepted social practice." },
      { id: "city", label: "A new settlement must create laws and protections without claiming that any answer is morally correct independent of what people value", weights: { builder: 6, after: 3, reasons: 2 }, reason: "You chose a case about building public rules without claiming that one moral code is correct independent of what people value." },
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
