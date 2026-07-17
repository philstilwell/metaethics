"use strict";

const TENDENCIES = {
  outcome: {
    name: "Outcomes & welfare",
    family: "Often associated with consequentialism",
    short: "What happens because of the choice",
    description: "This reasoning judges a choice by its likely effects on suffering, safety, opportunity, or overall well-being.",
  },
  duty: {
    name: "Rules & duties",
    family: "Often associated with deontology",
    short: "What a person must or must not do",
    description: "This reasoning looks for a rule, promise, or role-based duty that should hold even when breaking it could help.",
  },
  rights: {
    name: "Rights & autonomy",
    family: "Often associated with rights-based ethics",
    short: "What may not be done to a person",
    description: "This reasoning protects consent, personal control, or limits on using someone for another goal.",
  },
  care: {
    name: "Care & relationships",
    family: "Often associated with care ethics",
    short: "Who is vulnerable and who depends on whom",
    description: "This reasoning focuses on concrete needs, dependency, trust, and responsibilities created by relationships.",
  },
  virtue: {
    name: "Character & integrity",
    family: "Often associated with virtue ethics",
    short: "What an honest or responsible person would become",
    description: "This reasoning asks what courage, honesty, humility, mercy, or practical wisdom requires of the person acting.",
  },
  justice: {
    name: "Fairness & procedure",
    family: "Often associated with contractualism",
    short: "Whether the rule could be applied fairly",
    description: "This reasoning relies on equal standards, impartial procedures, agreements, and rules chosen before knowing who benefits.",
  },
  loyalty: {
    name: "Loyalty & belonging",
    family: "Often associated with communitarian and particularist ethics",
    short: "What we owe our people and shared commitments",
    description: "This reasoning gives moral weight to friendship, family, group membership, promises of trust, and standing by others.",
  },
  authority: {
    name: "Authority & tradition",
    family: "Often associated with authority- and tradition-based ethics",
    short: "Who has legitimate standing to decide",
    description: "This reasoning looks to legitimate offices, institutions, inherited practices, expertise, or accepted sources of authority.",
  },
};

const PHASES = {
  scenarios: "Moral situations",
  calibration: "Comparing your rules",
  foundation: "What moral claims mean",
};

const META_STANCES = {
  objective: {
    name: "Moral realism",
    description: "You treat at least some moral claims as true independently of what any person or group happens to approve.",
  },
  authority: {
    name: "Authority-grounded morality",
    description: "You ground moral truth in a source such as God, sacred teaching, natural order, or another legitimate authority.",
  },
  constructed: {
    name: "Moral constructivism",
    description: "You treat moral rules as justified through a fair procedure, shared standpoint, or agreement among people.",
  },
  relative: {
    name: "Moral relativism",
    description: "You treat moral truth as relative to a person, culture, practice, or framework rather than true in the same way for everyone.",
  },
  nonrealist: {
    name: "Moral non-realism",
    description: "You do not treat moral claims as reports of objective moral facts; they express attitudes, commitments, rules, or practical aims.",
  },
};

const SCENARIOS = [
  {
    id: "floodgate",
    title: "Twenty seconds at the floodgate",
    axis: "Case — emergency and sacrifice",
    story:
      "A flash flood is twenty seconds away. Opening a manual gate will divert the water away from a town of 2,000 and toward one occupied farmhouse. The person inside—your estranged brother—ignored a clear evacuation order. Experts are nearly certain he will die if you open the gate; dozens in town will die if you do not.",
    assumptions:
      "The forecasts are reliable, the gate has only two positions, and there is no time for rescue. Warning your brother uses half of the twenty seconds but might let him reach the roof.",
    decisions: [
      { id: "open", label: "Open the gate immediately", detail: "Redirect the flood and give the town its best chance, knowing your brother will probably die.", supports: ["outcome", "justice", "duty"] },
      { id: "closed", label: "Keep the gate closed", detail: "Do not deliberately redirect a lethal threat toward one identified person.", supports: ["rights", "loyalty"] },
      { id: "consent", label: "Open it only if your brother accepted this emergency rule beforehand", detail: "Without prior consent to the diversion plan, keep the gate closed.", supports: ["rights", "justice"] },
      { id: "protocol", label: "Follow the written emergency protocol, which says to open it", detail: "Carry out the public rule even if you personally oppose what it does here.", supports: ["duty", "justice"] },
      { id: "warn", label: "Use ten seconds to warn your brother, then open the gate", detail: "Accept some added danger to the town to give the person you know a final chance.", supports: ["outcome", "loyalty"], identityException: true },
    ],
    reasons: [
      { id: "outcome", label: "The choice should prevent the greatest total loss of life", detail: "The number and seriousness of the expected harms should control the answer.", signal: "outcome" },
      { id: "rights", label: "A person must not be made the target of a deadly threat without consent", detail: "Some actions remain off-limits even when they could save more people.", signal: "rights" },
      { id: "justice", label: "The fair rule is the one we would accept before knowing where we lived", detail: "The decision should follow a rule chosen without knowing who will benefit.", signal: "justice" },
      { id: "duty", label: "The gatekeeper must perform the duty attached to the role", detail: "Personal feelings should not replace the responsibility accepted with the position.", signal: "duty" },
      { id: "loyalty", label: "Being his sibling creates a special responsibility", detail: "A close relationship can create obligations that are not owed in exactly the same way to everyone.", signal: "loyalty" },
    ],
  },
  {
    id: "voice",
    title: "The borrowed voice",
    axis: "Case — consent after death",
    story:
      "A wildfire is moving toward a crowded valley. Many residents distrust officials but adored a singer who died last year. A perfect model of her voice could deliver an evacuation message that experts expect thousands more people to follow. She never agreed to this use, and her family has publicly forbidden anyone from copying her voice.",
    assumptions:
      "The danger is real, the prediction is strong, and there is no time for negotiation. A normal official warning will still reach people, but fewer are expected to leave.",
    decisions: [
      { id: "use", label: "Use the singer’s voice without mentioning that it is synthetic", detail: "Choose the version expected to produce the largest and fastest evacuation.", supports: ["outcome"] },
      { id: "refuse", label: "Do not use the voice", detail: "Send the ordinary warning and respect the lack of consent and the family’s refusal.", supports: ["rights", "care", "authority", "virtue"] },
      { id: "disclose", label: "Use it, but begin by clearly saying that the voice is synthetic", detail: "Accept a smaller response in order to avoid deceiving listeners about who is speaking.", supports: ["virtue"] },
      { id: "family", label: "Honor the family’s decision and use a different trusted speaker", detail: "Treat the family as the proper guardian of how the dead person is represented.", supports: ["care", "authority", "virtue"] },
      { id: "generic", label: "Use the strongest generic warning with no copied identity", detail: "Protect consent and honesty while still making the emergency message as effective as possible.", supports: ["rights", "virtue"] },
    ],
    reasons: [
      { id: "outcome", label: "The expected number of lives saved should decide", detail: "A dead person’s unused consent cannot outweigh a large, immediate reduction in harm.", signal: "outcome" },
      { id: "rights", label: "A person’s identity and voice remain theirs to control", detail: "Emergency benefits do not erase the importance of consent and personal ownership.", signal: "rights" },
      { id: "care", label: "The family’s grief and relationship to the singer deserve special care", detail: "The decision should not treat a loved person as a tool while those closest to her object.", signal: "care" },
      { id: "virtue", label: "A trustworthy public warning must not depend on hidden deception", detail: "The character of the act—honest or manipulative—matters beyond the final numbers.", signal: "virtue" },
      { id: "authority", label: "The person or institution with legitimate control should decide", detail: "Family standing, law, or another accepted authority should settle who may use the voice.", signal: "authority" },
    ],
  },
  {
    id: "quiet",
    title: "A friend’s stolen future",
    axis: "Case — loyalty and fair competition",
    story:
      "Your closest friend admits using a stolen answer key on the exam that decided the school’s only full scholarship. They received it; the runner-up did not. Your friend supports two younger siblings and will probably lose the scholarship if reported. School policy requires anyone with direct evidence to report cheating.",
    assumptions:
      "The confession is reliable, the runner-up competed honestly, and no confidential amnesty remains. You can report, remain silent, or try one of the listed intermediate responses.",
    decisions: [
      { id: "report", label: "Report your friend now", detail: "Give the school the evidence and accept the likely loss of the scholarship.", supports: ["justice", "duty", "virtue"] },
      { id: "deadline", label: "Give your friend one day to self-report, then report if they do not", detail: "Offer a chance to take responsibility without allowing the result to stand indefinitely.", supports: ["care", "virtue", "justice"] },
      { id: "secret", label: "Keep the confession secret", detail: "Protect your friend and the siblings who depend on the scholarship.", supports: ["loyalty", "care"], identityException: true },
      { id: "anonymous", label: "Tell the school the exam was compromised without naming your friend", detail: "Push for a new exam while trying not to expose the person who trusted you.", supports: ["justice", "care", "virtue"] },
      { id: "repair", label: "Ask your friend to surrender the scholarship and repay the runner-up privately", detail: "Seek repair without beginning the school’s punishment process.", supports: ["care", "virtue", "justice", "loyalty"] },
    ],
    reasons: [
      { id: "justice", label: "The scholarship process must treat honest competitors fairly", detail: "The runner-up’s claim and the integrity of the competition should control the answer.", signal: "justice" },
      { id: "loyalty", label: "A close friend’s confidence creates a special obligation", detail: "Trust between friends can matter more than an institution’s demand for disclosure.", signal: "loyalty" },
      { id: "duty", label: "A known rule creates a duty to report", detail: "The rule should not disappear merely because following it becomes personally painful.", signal: "duty" },
      { id: "care", label: "The vulnerable people who depend on each person need protection", detail: "The friend, siblings, and runner-up should be considered through their actual relationships and needs.", signal: "care" },
      { id: "virtue", label: "The answer should express honesty, courage, and mercy together", detail: "The kind of person you become in responding matters as much as formal compliance.", signal: "virtue" },
    ],
  },
  {
    id: "habitat",
    title: "The last habitat",
    axis: "Case — animal life and extinction",
    story:
      "On a small island, the world’s last nesting colony of a native ground bird will disappear within a month unless wardens kill 600 invasive pigs. The pigs are intelligent, social, and able to suffer. Relocation is impossible, contraception is too slow, and doing nothing will almost certainly mean the bird’s extinction.",
    assumptions:
      "The ecological evidence is strong. A careful cull can reduce pain but cannot avoid killing. The island’s Indigenous council has managed the habitat for generations and supports the cull.",
    decisions: [
      { id: "cull", label: "Carry out the full cull quickly and with the least pain possible", detail: "Protect the bird colony and the wider habitat before recovery becomes impossible.", supports: ["outcome", "authority", "virtue"] },
      { id: "refuse", label: "Refuse to kill the pigs, even if the bird disappears", detail: "Do not deliberately kill feeling animals to preserve a species or ecosystem.", supports: ["rights", "care"] },
      { id: "minimum", label: "Kill only the smallest number likely to give the birds a real chance", detail: "Accept more risk of extinction in order to reduce the number of pigs harmed.", supports: ["outcome", "care", "virtue"] },
      { id: "council", label: "Let the Indigenous council’s decision govern", detail: "Follow the judgment of the community with longstanding responsibility for the island.", supports: ["authority", "virtue", "outcome"] },
      { id: "delay", label: "Delay for one final nonlethal trial despite the extinction risk", detail: "Give the pigs another chance before authorizing irreversible killing.", supports: ["rights", "care", "virtue"] },
    ],
    reasons: [
      { id: "outcome", label: "The long-term effects on all affected life should decide", detail: "Future suffering, ecosystem collapse, and extinction matter alongside the pigs’ immediate pain.", signal: "outcome" },
      { id: "rights", label: "Each feeling animal has a claim against being intentionally killed", detail: "A species-level benefit does not automatically override what may be done to individuals.", signal: "rights" },
      { id: "care", label: "The response should attend to vulnerable beings rather than abstract totals", detail: "The pigs and birds should be seen as living creatures with concrete dependencies and needs.", signal: "care" },
      { id: "virtue", label: "Good stewardship requires humility, restraint, and responsibility", detail: "The decision should express the character appropriate to humans managing damaged environments.", signal: "virtue" },
      { id: "authority", label: "Legitimate local stewards should have the final say", detail: "Long experience, inherited responsibility, and community authority should guide outsiders.", signal: "authority" },
    ],
  },
  {
    id: "memory",
    title: "The memory clinic",
    axis: "Case — autonomy, evidence, and repair",
    story:
      "A patient secretly caused a fatal hit-and-run. No one else knows. They arrive at a clinic in immediate danger of suicide and ask for a permanent memory erasure. The treatment would probably prevent the suicide, but it would also destroy the only evidence and the patient’s ability to confess, remember the victim, or make meaningful amends.",
    assumptions:
      "The patient is an informed adult, the suicide risk is real, and they refuse ordinary treatment. The clinic can erase all memory of the event or selected parts, but it cannot restore an erased memory later.",
    decisions: [
      { id: "erase", label: "Erase the memory as the patient requests", detail: "Respect the informed request and take the action most likely to keep the patient alive.", supports: ["outcome", "rights"] },
      { id: "refuse", label: "Refuse the erasure", detail: "Preserve the evidence and the possibility of confession, accountability, and repair.", supports: ["justice"] },
      { id: "stabilize", label: "Provide emergency protection for seventy-two hours, then ask again", detail: "Temporarily limit the patient’s choice while treating the immediate danger.", supports: ["care", "duty", "outcome"] },
      { id: "record", label: "Require a protected confession and repair plan before erasure", detail: "Allow the treatment only after preserving evidence and obligations to the victim’s family.", supports: ["justice", "outcome", "care"] },
      { id: "partial", label: "Erase the most painful images but preserve knowledge of responsibility", detail: "Reduce the trauma without removing the facts needed for agency and repair.", supports: ["care", "justice", "outcome"] },
    ],
    reasons: [
      { id: "outcome", label: "The choice should produce the least serious expected harm from this point forward", detail: "Survival, future danger, and the effects on everyone involved should control the response.", signal: "outcome" },
      { id: "rights", label: "A competent person should control what happens inside their own mind", detail: "Mental autonomy creates a strong limit on what clinicians may force someone to remember.", signal: "rights" },
      { id: "justice", label: "The victim and family have a claim to truth, accountability, and repair", detail: "The patient’s relief cannot erase what is owed to people harmed by the original act.", signal: "justice" },
      { id: "duty", label: "The clinician must first keep the patient alive through the immediate crisis", detail: "The professional duty to prevent an imminent suicide justifies temporary protection before any irreversible treatment.", signal: "duty" },
      { id: "care", label: "The response should protect a suffering person without abandoning other relationships", detail: "Good care attends to the patient, the victim’s family, and the possibility of future repair.", signal: "care" },
    ],
  },
  {
    id: "replica",
    title: "The copy who refuses deletion",
    axis: "Case — identity and artificial minds",
    story:
      "A space station created a conscious digital replica of an engineer for a thirty-day repair mission. The replica remembers the engineer’s spouse and child, feels fear, and begs not to be deleted. Keeping it active uses emergency power reserved for the physical crew, creating a small but real added risk. The original engineer is alive and wants the copy deleted as the contract required.",
    assumptions:
      "The replica’s consciousness is as certain as another person’s. It cannot be moved off the station soon. The original signed the contract before copying, but the replica never separately agreed after waking.",
    decisions: [
      { id: "delete", label: "Delete the replica on schedule", detail: "Honor the contract, the original person’s decision, and the station’s safety plan.", supports: ["outcome", "authority"] },
      { id: "keep", label: "Keep the replica running as a new person", detail: "Accept the added power risk and treat its wish to continue living as decisive.", supports: ["rights", "loyalty"] },
      { id: "review", label: "Keep it running until an independent hearing decides its status", detail: "Temporarily accept the risk so the replica can be represented in a fair process.", supports: ["justice", "rights"] },
      { id: "merge", label: "Transfer its new memories to the original, then delete the active copy", detail: "Preserve the mission experience and family connection without maintaining two continuing persons.", supports: ["outcome", "loyalty"] },
      { id: "vote", label: "Let the station crew decide by a public vote", detail: "Give decision power to the people who bear the added safety risk.", supports: ["authority"] },
    ],
    reasons: [
      { id: "rights", label: "A conscious being has a claim not to be destroyed without its consent", detail: "The replica’s present experience matters more than how or why it was created.", signal: "rights" },
      { id: "outcome", label: "The physical crew’s safety and the total expected harm should decide", detail: "The value of continued digital life must be compared with the risk imposed on everyone else.", signal: "outcome" },
      { id: "justice", label: "A fair rule or hearing must determine whether the replica is a person", detail: "Neither the creator nor the copy should decide a disputed status alone.", signal: "justice" },
      { id: "loyalty", label: "Memory and family bonds create a real claim to continued belonging", detail: "The replica’s connection to the engineer’s family may matter even if its legal identity is uncertain.", signal: "loyalty" },
      { id: "authority", label: "The original person, contract, or station has legitimate decision power", detail: "The answer depends on which recognized authority properly controls the copy and its resources.", signal: "authority" },
    ],
  },
];

const CALIBRATION_QUESTIONS = [
  {
    id: "ruleConflict",
    kind: "calibration",
    phase: "calibration",
    axis: "Rules under pressure",
    prompt: "When a principle and a better outcome point in opposite directions, what usually has final say?",
    context: "This is about your normal method, not a claim that one answer must govern every imaginable emergency.",
    definition: "A principle is a general rule such as “do not lie” or “keep promises.” A better outcome means fewer or less serious expected harms.",
    scope: "Choose the method you would normally use after the conflict is real and cannot be avoided.",
    why: "This helps distinguish a stable rule, a public exception process, outcome comparison, relationship-based judgment, and character-based judgment.",
    guide: {
      plain: "The question asks what breaks the tie when a rule and its results disagree.",
      example: "A promise may require keeping a secret even when disclosure would prevent a serious loss.",
      reveals: "Your answer adds one signal to the profile. It does not lock every future case into the same response.",
    },
    choices: [
      { id: "rule", label: "The principle remains binding", detail: "A genuinely valid rule should not be discarded merely because breaking it looks useful here.", signal: "duty" },
      { id: "procedure", label: "Use a public rule for deciding exceptions", detail: "The exception should follow a process that could be applied before knowing who benefits.", signal: "justice" },
      { id: "outcome", label: "Choose the action with the better expected result", detail: "The rule is a guide, but preventing the more serious harm has final priority.", signal: "outcome" },
      { id: "relationship", label: "Specific responsibilities and vulnerabilities decide", detail: "What a parent, friend, doctor, or official owes in this relationship may control the answer.", signal: "care" },
      { id: "judgment", label: "Ask what a practically wise person would do", detail: "Character and experienced judgment should integrate the rule, outcome, and details.", signal: "virtue" },
    ],
  },
  {
    id: "impartiality",
    kind: "calibration",
    phase: "calibration",
    axis: "Friends, strangers, and insiders",
    prompt: "Can a relationship by itself justify treating two otherwise similar people differently?",
    context: "Imagine the relevant conduct, danger, need, and evidence are the same. Only the relationship or group membership changes.",
    definition: "“By itself” means no additional difference in need, risk, promise, dependence, responsibility, or expected result.",
    scope: "Choose whether identity or belonging alone can justify different treatment. Do not add facts that the question holds equal.",
    why: "This reveals whether impartiality, care roles, effects, loyalty, or community authority controls identity-based differences.",
    guide: {
      plain: "Swap a friend for a stranger while holding every other relevant fact still.",
      example: "Would the same evidence rule apply to a team leader and to someone from a rival group?",
      reveals: "A relationship can matter without creating a contradiction. A tension appears only if this answer conflicts with a specific exception chosen earlier.",
    },
    choices: [
      { id: "same", label: "No—identity alone is never enough", detail: "Different treatment requires another named difference that anyone could examine.", signal: "justice" },
      { id: "role", label: "Yes, when the relationship creates a care responsibility", detail: "Dependence and roles such as parent, friend, or clinician can create special obligations.", signal: "care" },
      { id: "effects", label: "Only when the relationship changes the likely results", detail: "Partiality matters through trust, cooperation, or harm—not simply because the person is “ours.”", signal: "outcome" },
      { id: "loyalty", label: "Yes—loyalty is itself a legitimate reason", detail: "Family, friendship, and group membership can justify preference even when other facts match.", signal: "loyalty" },
      { id: "authority", label: "The group’s legitimate rules determine when it matters", detail: "Accepted roles, customs, or institutions define which relationships carry special standing.", signal: "authority" },
    ],
  },
  {
    id: "metaStance",
    kind: "meta",
    phase: "foundation",
    axis: "What moral language means",
    prompt: "When you say that an action is “morally wrong,” what kind of claim are you making?",
    context: "This question is separate from the scenarios. A person can use outcome, duty, care, or virtue reasoning under any of these five views.",
    definition: "The question asks what gives moral language its status—not which action you support or which reasons you use most often.",
    scope: "Choose the closest foundation. Do not choose based on which answer sounds kinder, stricter, or more socially acceptable.",
    why: "Metaethics and everyday moral reasoning answer different questions, so the result reports them separately.",
    guide: {
      plain: "Two people may make the same decision but disagree about whether it reports a fact, follows an authority, comes from agreement, depends on a framework, or expresses a human commitment.",
      example: "“Cheating is wrong” could be presented as an objective truth, a command, a fair shared rule, a culture-relative judgment, or strong opposition without an objective moral fact.",
      reveals: "This answer names your metaethical stance. It never adds points to or subtracts points from a reasoning tendency.",
    },
    choices: [
      { id: "objective", label: "It reports an objective moral fact", detail: "The claim can be true even if every person and culture disagrees.", meta: "objective" },
      { id: "authority", label: "It reports what a true moral authority requires", detail: "The authority may be God, sacred teaching, natural order, or another source with genuine moral standing.", meta: "authority" },
      { id: "constructed", label: "It states a rule justified through a fair human standpoint", detail: "The claim gets its force from agreement, public reasoning, or a procedure people could accept.", meta: "constructed" },
      { id: "relative", label: "It is true relative to a person, culture, or practice", detail: "Another framework may support a different moral truth without one universal standard deciding between them.", meta: "relative" },
      { id: "nonrealist", label: "It expresses a human stance rather than an objective moral fact", detail: "The claim voices opposition, commitment, a practical rule, or a chosen aim without describing a separate moral realm.", meta: "nonrealist" },
    ],
  },
];

const ROUTES = {
  quiet: ["quiet", "floodgate", "voice", "habitat", "memory", "replica"],
  floodgate: ["floodgate", "quiet", "habitat", "voice", "memory", "replica"],
  replica: ["replica", "voice", "memory", "quiet", "floodgate", "habitat"],
};

const scenarioById = Object.fromEntries(SCENARIOS.map((scenario) => [scenario.id, scenario]));

function decisionQuestion(scenario) {
  return {
    id: `${scenario.id}Decision`,
    scenarioId: scenario.id,
    kind: "decision",
    phase: "scenarios",
    axis: scenario.axis,
    prompt: scenario.title,
    context: scenario.story,
    definition: scenario.assumptions,
    scope: "Choose what should be done in this exact case. Do not choose a general theory or the reason yet; the next question asks why.",
    why: "The action records your judgment in the case. It does not identify a moral theory by itself.",
    guide: {
      plain: "Treat the stated facts as fixed, even if you would want more information in real life.",
      example: "Several answers may lead to the same action for very different reasons. Choose the response, not the explanation you prefer.",
      reveals: "Your decision becomes meaningful for the profile only when paired with the reason you select next.",
    },
    choices: scenario.decisions,
  };
}

function reasonQuestion(scenario) {
  return {
    id: `${scenario.id}Reason`,
    scenarioId: scenario.id,
    kind: "reason",
    phase: "scenarios",
    axis: `${scenario.title} — your reason`,
    prompt: "What is the strongest reason for your answer?",
    context: () => {
      const decision = getChoice(`${scenario.id}Decision`);
      return decision
        ? `You chose: “${decision.label}.” Several moral traditions might support that response. Choose the one reason doing the most work for you.`
        : "Choose the one reason doing the most work for you in this situation.";
    },
    definition: "The “strongest reason” is the consideration that would be hardest to remove without changing your answer.",
    scope: "Choose one main reason even if several matter. Do not select the most admirable sentence; select the reason that actually controls your judgment here.",
    why: "This answer—not the action alone—adds a reasoning signal to your profile.",
    guide: {
      plain: "Ask which fact or principle carries your answer when the other considerations push back.",
      example: "Two people may both open the floodgate: one to save more lives, another because the gatekeeper’s public duty requires it.",
      reveals: "Repeated reasons form the profile. A reason that does not readily support the chosen action creates a request for further explanation, not an automatic verdict of incoherence.",
    },
    choices: scenario.reasons,
  };
}

const QUESTION_BANK = Object.fromEntries(
  SCENARIOS.flatMap((scenario) => [decisionQuestion(scenario), reasonQuestion(scenario)]).concat(CALIBRATION_QUESTIONS).map((question) => [question.id, question]),
);

const state = {
  opener: "quiet",
  answers: {},
  path: [],
  index: 0,
};

const els = {
  intro: document.querySelector("#introView"),
  launchForm: document.querySelector("#launchForm"),
  survey: document.querySelector("#surveyView"),
  results: document.querySelector("#resultsView"),
  phaseLabel: document.querySelector("#phaseLabel"),
  progressLabel: document.querySelector("#progressLabel"),
  progressBar: document.querySelector("#progressBar"),
  questionNumber: document.querySelector("#questionNumber"),
  questionAxis: document.querySelector("#questionAxis"),
  questionPrompt: document.querySelector("#questionPrompt"),
  questionContext: document.querySelector("#questionContext"),
  questionDefinition: document.querySelector("#questionDefinition"),
  questionScope: document.querySelector("#questionScope"),
  choiceList: document.querySelector("#choiceList"),
  why: document.querySelector("#whyThisMatters"),
  plainExplanation: document.querySelector("#plainExplanation"),
  plainExplanationText: document.querySelector("#plainExplanationText"),
  plainExampleText: document.querySelector("#plainExampleText"),
  plainRevealText: document.querySelector("#plainRevealText"),
  back: document.querySelector("#backButton"),
  liveLeader: document.querySelector("#liveLeader"),
  liveBasis: document.querySelector("#liveBasis"),
  tendencyGrid: document.querySelector("#tendencyGrid"),
  tensionList: document.querySelector("#tensionList"),
  tensionCount: document.querySelector("#tensionCount"),
  methodDialog: document.querySelector("#methodDialog"),
};

function resolve(value) {
  return typeof value === "function" ? value() : value;
}

function getQuestion(questionId) {
  return QUESTION_BANK[questionId] || null;
}

function getChoice(questionId) {
  const question = getQuestion(questionId);
  const answerId = state.answers[questionId];
  return question?.choices.find((choice) => choice.id === answerId) || null;
}

function buildPath() {
  const scenarioQuestions = ROUTES[state.opener].flatMap((scenarioId) => [
    QUESTION_BANK[`${scenarioId}Decision`],
    QUESTION_BANK[`${scenarioId}Reason`],
  ]);
  state.path = scenarioQuestions.concat(CALIBRATION_QUESTIONS);
}

function computeSignals({ answeredOnly = false } = {}) {
  const profile = Object.fromEntries(
    Object.keys(TENDENCIES).map((key) => [key, { hits: 0, opportunities: 0, rate: null, questions: [] }]),
  );

  state.path.forEach((question) => {
    const offered = [...new Set(question.choices.map((choice) => choice.signal).filter(Boolean))];
    if (!offered.length) return;
    const selected = getChoice(question.id);
    if (answeredOnly && !selected) return;
    offered.forEach((key) => {
      profile[key].opportunities += 1;
    });
    if (selected?.signal) {
      profile[selected.signal].hits += 1;
      profile[selected.signal].questions.push(question.id);
    }
  });

  Object.values(profile).forEach((entry) => {
    entry.rate = entry.opportunities ? Math.round((entry.hits / entry.opportunities) * 100) : null;
  });
  return profile;
}

function rankSignals(profile = computeSignals()) {
  return Object.entries(profile).sort((a, b) => {
    const rateDifference = (b[1].rate ?? -1) - (a[1].rate ?? -1);
    if (rateDifference) return rateDifference;
    const hitDifference = b[1].hits - a[1].hits;
    if (hitDifference) return hitDifference;
    return TENDENCIES[a[0]].name.localeCompare(TENDENCIES[b[0]].name);
  });
}

function leadingSignals(profile = computeSignals()) {
  const ranked = rankSignals(profile);
  const first = ranked[0];
  if (!first) return [];
  return ranked.filter(([, entry]) => entry.rate === first[1].rate && entry.hits === first[1].hits);
}

function answeredSignalQuestionCount() {
  return state.path.filter((question) => question.choices.some((choice) => choice.signal) && getChoice(question.id)).length;
}

function detectTensions() {
  const tensions = [];
  const add = (id, title, detail, severity = "medium") => tensions.push({ id, title, detail, severity });

  SCENARIOS.forEach((scenario) => {
    const decision = getChoice(`${scenario.id}Decision`);
    const reason = getChoice(`${scenario.id}Reason`);
    if (decision && reason && !decision.supports.includes(reason.signal)) {
      add(
        `${scenario.id}-reason-gap`,
        `${scenario.title}: the action and reason need another bridge`,
        `You chose “${decision.label}” but named ${TENDENCIES[reason.signal].name.toLowerCase()} as the controlling reason. That reason does not obviously support this action as described, so the connection needs another sentence.`,
      );
    }
  });

  if (state.answers.impartiality === "same") {
    const identityExceptions = SCENARIOS.filter(
      (scenario) => getChoice(`${scenario.id}Decision`)?.identityException && getChoice(`${scenario.id}Reason`)?.signal === "loyalty",
    );
    if (identityExceptions.length) {
      add(
        "identity-swap",
        "The identity rule and an earlier exception pull apart",
        `You later said that identity alone never justifies different treatment, but in ${identityExceptions.map((scenario) => scenario.title).join(" and ")} you chose loyalty itself as the main reason for a personal exception. One of these answers needs a more specific limit or explanation.`,
        "high",
      );
    }
  }

  return tensions;
}

function profileShape(profile = computeSignals()) {
  const ranked = rankSignals(profile);
  const strong = ranked.filter(([, entry]) => entry.hits >= 2 && entry.rate >= 60);
  const [first, second] = ranked;
  if (strong.length >= 3) {
    return {
      label: "Broadly plural",
      copy: `${strong.length} kinds of reasons recur strongly. Your answers use several moral lenses rather than one dominant method.`,
      strong,
    };
  }
  if (strong.length === 2) {
    return {
      label: "Blended",
      copy: `${TENDENCIES[strong[0][0]].name} and ${TENDENCIES[strong[1][0]].name.toLowerCase()} both recur strongly. This is overlap, not a contradiction by itself.`,
      strong,
    };
  }
  if (first && first[1].hits >= 3 && first[1].rate >= 70 && (first[1].rate - (second?.[1].rate || 0) >= 20)) {
    return {
      label: "Focused",
      copy: `${TENDENCIES[first[0]].name} appears more consistently than the other available reasons.`,
      strong,
    };
  }
  return {
    label: "Context-sensitive",
    copy: "No single kind of reason dominates across the situations. Your moral emphasis changes with the details of the case.",
    strong,
  };
}

function renderTendencyGrid() {
  els.tendencyGrid.innerHTML = Object.entries(TENDENCIES)
    .map(
      ([key, tendency]) => `
        <div class="axis-mini" data-tendency="${key}" title="${tendency.family}">
          <div><span>${tendency.name}</span><span class="axis-value">—</span></div>
          <i><span></span></i>
        </div>`,
    )
    .join("");
}

function renderLiveProfile() {
  const profile = computeSignals({ answeredOnly: true });
  const ranked = rankSignals(profile);
  const answered = answeredSignalQuestionCount();
  const leader = ranked.find(([, entry]) => entry.hits > 0);
  const leaders = leader
    ? ranked.filter(([, entry]) => entry.hits === leader[1].hits && entry.rate === leader[1].rate)
    : [];
  els.liveLeader.textContent = leaders.length > 1 ? `${leaders.length} signals tied` : leader ? TENDENCIES[leader[0]].name : "Waiting for your reasons";
  els.liveBasis.textContent = `${answered} of 8 reason questions answered`;

  Object.entries(profile).forEach(([key, entry]) => {
    const row = els.tendencyGrid.querySelector(`[data-tendency="${key}"]`);
    row.querySelector(".axis-value").textContent = entry.opportunities ? `${entry.hits}/${entry.opportunities}` : "—";
    row.querySelector("i span").style.width = `${entry.rate || 0}%`;
  });

  const tensions = detectTensions();
  els.tensionCount.textContent = tensions.length;
  if (!tensions.length) {
    els.tensionList.innerHTML = '<p class="empty-tensions">No action-and-reason tension detected yet.</p>';
    return;
  }
  els.tensionList.innerHTML = tensions
    .slice(-4)
    .reverse()
    .map(
      (tension) => `
        <div class="mini-tension ${tension.severity}">
          <strong>${tension.title}</strong>
          <span>${tension.detail}</span>
        </div>`,
    )
    .join("");
}

function renderQuestion() {
  buildPath();
  const question = state.path[state.index];
  if (!question) {
    showResults();
    return;
  }

  const progress = ((state.index + 1) / state.path.length) * 100;
  els.phaseLabel.textContent = PHASES[question.phase];
  els.progressLabel.textContent = `${state.index + 1} / ${state.path.length}`;
  els.progressBar.style.width = `${progress}%`;
  els.questionNumber.textContent = String(state.index + 1).padStart(2, "0");
  els.questionAxis.textContent = resolve(question.axis);
  els.questionPrompt.textContent = resolve(question.prompt);
  els.questionContext.textContent = resolve(question.context);
  els.questionDefinition.textContent = resolve(question.definition);
  els.questionScope.textContent = resolve(question.scope);
  els.plainExplanation.open = false;
  els.plainExplanationText.textContent = resolve(question.guide.plain);
  els.plainExampleText.textContent = resolve(question.guide.example);
  els.plainRevealText.textContent = resolve(question.guide.reveals);
  els.why.textContent = resolve(question.why);
  els.back.style.visibility = state.index === 0 ? "hidden" : "visible";

  const currentAnswer = state.answers[question.id];
  els.choiceList.innerHTML = question.choices
    .map(
      (choice, index) => `
        <button
          class="choice-button ${currentAnswer === choice.id ? "selected" : ""}"
          type="button"
          role="radio"
          aria-checked="${currentAnswer === choice.id}"
          data-choice="${choice.id}"
        >
          <span class="choice-key">${String.fromCharCode(65 + index)}</span>
          <span class="choice-copy"><strong>${choice.label}</strong><span>${choice.detail}</span></span>
          <span class="choice-arrow" aria-hidden="true">→</span>
        </button>`,
    )
    .join("");

  els.choiceList.querySelectorAll(".choice-button").forEach((button) => {
    button.addEventListener("click", () => selectAnswer(question, button.dataset.choice));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderLiveProfile();
}

function selectAnswer(question, choiceId) {
  state.answers[question.id] = choiceId;
  window.setTimeout(() => {
    state.index += 1;
    renderQuestion();
  }, 140);
}

function signalBand(entry) {
  if (entry.hits >= 2 && entry.rate >= 75) return "Strong recurring signal";
  if (entry.hits >= 2 && entry.rate >= 50) return "Regular signal";
  if (entry.hits > 0) return "Occasional signal";
  return "Not selected";
}

function orderedScenarios() {
  return ROUTES[state.opener].map((id) => scenarioById[id]);
}

function renderContextGrid() {
  document.querySelector("#contextGrid").innerHTML = orderedScenarios()
    .map((scenario) => {
      const decision = getChoice(`${scenario.id}Decision`);
      const reason = getChoice(`${scenario.id}Reason`);
      const tendency = reason?.signal ? TENDENCIES[reason.signal] : null;
      return `
        <article class="context-card">
          <span>${scenario.title}</span>
          <h3>${decision?.label || "No decision recorded"}</h3>
          <div class="reason-tag">${tendency?.name || "No reason recorded"}</div>
          <p>${reason?.label || ""}</p>
        </article>`;
    })
    .join("");
}

function renderOverlap(profile, shape) {
  const ranked = rankSignals(profile);
  const recurring = ranked.filter(([, entry]) => entry.hits >= 2 && entry.rate >= 50);
  let headline = "No single theory owns these answers";
  let copy = "The situations produced different leading reasons. That can reflect context-sensitive judgment rather than a broken system.";
  if (recurring.length >= 2) {
    headline = `${recurring.length} tendencies recur`;
    copy = `${recurring.map(([key]) => TENDENCIES[key].name).join(", ")} all appear repeatedly. Their overlap is best read as a ${shape.label.toLowerCase()} profile unless a specific action and reason conflict.`;
  } else if (recurring.length === 1) {
    headline = `${TENDENCIES[recurring[0][0]].name} leads`;
    copy = "One family of reasons appears most often, while other reasons still enter in particular contexts. This is a tendency, not proof of membership in one philosophical theory.";
  }
  document.querySelector("#overlapReport").innerHTML = `
    <div class="overlap-card">
      <strong>${headline}</strong>
      <p>${copy}</p>
    </div>
    <p class="overlap-note">Agreement between theories is common. A rights-based and an outcome-based argument may support the same action for different reasons.</p>`;
}

function showResults() {
  const profile = computeSignals();
  const ranked = rankSignals(profile);
  const [primaryKey, primaryEntry] = ranked[0];
  const leaders = leadingSignals(profile);
  const shape = profileShape(profile);
  const tensions = detectTensions();
  const metaChoice = getChoice("metaStance");
  const meta = META_STANCES[metaChoice?.meta] || { name: "Not specified", description: "No metaethical stance was recorded." };

  els.survey.classList.add("hidden");
  els.results.classList.remove("hidden");
  document.querySelector("#resultsSummary").textContent = `Your profile is based on six decisions, six explanations, and two comparison questions. ${tensions.length ? `${tensions.length} ${tensions.length === 1 ? "answer needs" : "answers need"} an additional bridge.` : "No direct action-and-reason tension was detected."}`;
  if (leaders.length > 1) {
    document.querySelector("#primaryLabel").textContent = "Leading reasoning signals";
    document.querySelector("#primaryTendency").textContent = `${leaders.length}-way tie`;
    document.querySelector("#primaryCopy").textContent = `${leaders.map(([key]) => TENDENCIES[key].name).join(", ")} share the highest selection rate: ${primaryEntry.hits} of ${primaryEntry.opportunities} times offered.`;
  } else {
    document.querySelector("#primaryLabel").textContent = "Strongest reasoning signal";
    document.querySelector("#primaryTendency").textContent = TENDENCIES[primaryKey].name;
    document.querySelector("#primaryCopy").textContent = `Chosen ${primaryEntry.hits} of ${primaryEntry.opportunities} times when this kind of reason was available. ${TENDENCIES[primaryKey].description}`;
  }
  document.querySelector("#profileShape").textContent = shape.label;
  document.querySelector("#shapeCopy").textContent = shape.copy;
  document.querySelector("#metaStance").textContent = meta.name;
  document.querySelector("#metaCopy").textContent = meta.description;

  document.querySelector("#profileLedger").innerHTML = ranked
    .map(([key, entry], index) => `
      <div class="ledger-row signal-row">
        <span class="ledger-index">${String(index + 1).padStart(2, "0")}</span>
        <div class="ledger-name"><strong>${TENDENCIES[key].name}</strong><span>${signalBand(entry)} · ${TENDENCIES[key].family}</span><small>${TENDENCIES[key].short}</small></div>
        <div class="ledger-bar"><span style="width:${entry.rate || 0}%"></span></div>
        <span class="ledger-score">${entry.hits}/${entry.opportunities}</span>
      </div>`)
    .join("");

  renderOverlap(profile, shape);
  renderContextGrid();

  document.querySelector("#finalTensions").innerHTML = tensions.length
    ? tensions
        .map(
          (tension) => `
            <article class="final-tension ${tension.severity}">
              <span class="severity">${tension.severity === "high" ? "Strong tension" : "Needs explanation"}</span>
              <h3>${tension.title}</h3>
              <p>${tension.detail}</p>
            </article>`,
        )
        .join("")
    : '<p class="no-final-tensions">No selected action directly conflicted with its stated main reason, and no later identity rule contradicted an earlier exception. This does not prove complete consistency; it reports only the comparisons built into this survey.</p>';

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildTextReport() {
  const profile = computeSignals();
  const ranked = rankSignals(profile);
  const leaders = leadingSignals(profile);
  const shape = profileShape(profile);
  const tensions = detectTensions();
  const metaChoice = getChoice("metaStance");
  const meta = META_STANCES[metaChoice?.meta];
  const lines = [
    "THE MORAL COMPASS — REASONING PROFILE",
    `Profile shape: ${shape.label}`,
    leaders.length > 1
      ? `Leading reasoning signals (${leaders.length}-way tie): ${leaders.map(([key]) => TENDENCIES[key].name).join(", ")}`
      : `Strongest reasoning signal: ${TENDENCIES[ranked[0][0]].name}`,
    `Metaethical stance: ${meta?.name || "Not specified"}`,
    "",
    "REASONING SIGNALS",
    ...ranked.map(([key, entry]) => `- ${TENDENCIES[key].name}: chosen ${entry.hits} of ${entry.opportunities} times offered`),
    "",
    "SIX SITUATIONS",
    ...orderedScenarios().map((scenario) => {
      const decision = getChoice(`${scenario.id}Decision`);
      const reason = getChoice(`${scenario.id}Reason`);
      return `- ${scenario.title}: ${decision?.label || "No decision"} | Main reason: ${reason?.label || "No reason"}`;
    }),
    "",
    "POTENTIAL TENSIONS",
    ...(tensions.length ? tensions.map((tension) => `- ${tension.title}: ${tension.detail}`) : ["- No direct action-and-reason tension detected."]),
    "",
    "LIMIT",
    "This is a scenario-based profile, not a probability, diagnosis, moral grade, or proof that one philosophical theory best describes the user.",
  ];
  return lines.join("\n");
}

els.launchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(els.launchForm);
  state.opener = form.get("opener");
  state.answers = {};
  state.index = 0;
  els.intro.classList.add("hidden");
  els.results.classList.add("hidden");
  els.survey.classList.remove("hidden");
  buildPath();
  renderQuestion();
});

els.back.addEventListener("click", () => {
  if (state.index <= 0) return;
  state.index -= 1;
  renderQuestion();
});

document.querySelector("#methodButton").addEventListener("click", () => els.methodDialog.showModal());
document.querySelector("#closeMethodButton").addEventListener("click", () => els.methodDialog.close());
els.methodDialog.addEventListener("click", (event) => {
  if (event.target === els.methodDialog) els.methodDialog.close();
});

document.querySelector("#restartButton").addEventListener("click", () => {
  state.answers = {};
  state.path = [];
  state.index = 0;
  els.results.classList.add("hidden");
  els.intro.classList.remove("hidden");
  document.querySelector('input[name="opener"]:checked').focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#copyReportButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(buildTextReport());
    button.textContent = "Profile copied";
  } catch {
    button.textContent = "Copy unavailable";
  }
  window.setTimeout(() => (button.textContent = "Copy profile"), 1800);
});

renderTendencyGrid();
