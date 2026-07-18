"use strict";

const GENEALOGY_INFLUENCES = {
  harm: {
    index: "01",
    name: "Harm sensitivity",
    short: "How strongly pain, fear, loss, or visible distress draws your attention.",
    example: "You may react quickly to suffering, remember it vividly, or give it priority even before you have stated a general rule.",
  },
  reciprocity: {
    index: "02",
    name: "Reciprocity",
    short: "Expectations about returning help, sharing burdens, and answering cooperation with cooperation.",
    example: "Repeated turn-taking, exchange, or dependence on others may shape what feels fair, owed, generous, or exploitative.",
  },
  loyalty: {
    index: "03",
    name: "Kinship and group loyalty",
    short: "Attachment to family, friends, teams, nations, or other groups that feel like “us.”",
    example: "A judgment may protect insiders, resist betrayal, or extend a family-like concern to a larger community.",
  },
  religion: {
    index: "04",
    name: "Religion",
    short: "Teachings, rituals, sacred stories, authorities, or communities connected with religious life.",
    example: "A religious source may supply a rule, a model of character, an account of human purpose, or a powerful emotional frame.",
  },
  upbringing: {
    index: "05",
    name: "Parents and community",
    short: "Approval, correction, examples, habits, and expectations learned from the people around you.",
    example: "Some lessons were stated directly; others may have been learned by seeing who was praised, trusted, punished, or ignored.",
  },
  status: {
    index: "06",
    name: "Status incentives",
    short: "Rewards or penalties involving reputation, belonging, promotion, attention, or social rank.",
    example: "A view may become easier to voice—or easier to believe—when it brings applause, safety, influence, or acceptance.",
  },
  institutions: {
    index: "07",
    name: "Historical institutions",
    short: "Laws, professions, markets, schools, technologies, or inherited systems that made some values feel normal.",
    example: "A present conviction may reflect an old arrangement whose original purpose, beneficiaries, or assumptions are no longer visible.",
  },
  experience: {
    index: "08",
    name: "Personal experience",
    short: "Events you lived through, witnessed, benefited from, feared, regretted, or helped cause.",
    example: "One event can reveal a neglected harm or create a vivid reaction that later spreads beyond cases that are genuinely similar.",
  },
  reflection: {
    index: "09",
    name: "Deliberate reflection",
    short: "Conscious comparison of reasons, evidence, counterexamples, principles, and other people’s perspectives.",
    example: "Reflection can revise an early reaction, but calling a process reflective does not guarantee that it was informed, fair, or reliable.",
  },
};

const GENEALOGY_INFLUENCE_ORDER = [
  "harm",
  "reciprocity",
  "loyalty",
  "religion",
  "upbringing",
  "status",
  "institutions",
  "experience",
  "reflection",
];

const GENEALOGY_INFLUENCE_LEVELS = {
  strong: { name: "Probably shaped it a lot", value: 2 },
  possible: { name: "May have shaped it", value: 1 },
  little: { name: "Probably little or no role", value: 0 },
  unknown: { name: "I do not know", value: null },
};

const GENEALOGY_CONVICTIONS = [
  {
    id: "digital",
    name: "Protecting a synthetic mind",
    text: "A conscious digital mind that can suffer should receive the same basic protections as a biological person.",
  },
  {
    id: "rescue",
    name: "Strangers before a crewmate",
    text: "During an evacuation, a rescue crew should save five unknown children before one injured member of its own crew.",
  },
  {
    id: "memory",
    name: "Control over painful memories",
    text: "A competent adult should be free to erase one painful year of memory, even when loved ones want the memories preserved.",
  },
  {
    id: "rank",
    name: "No inherited legal rank",
    text: "No citizen should receive greater legal rights merely because of the family into which that person was born.",
  },
  {
    id: "custom",
    name: "A conviction of my own",
    text: "Write one considered judgment you want to investigate.",
  },
];

const GENEALOGY_INFERENCES = {
  explain: {
    index: "01",
    name: "Causal explanation only",
    short: "The evidence helps explain why the conviction formed, but does not yet show a faulty process, remove its support, or count against its content.",
    next: "Record the influence, then ask whether it responded to relevant facts or reasons before deciding how much confidence the conviction deserves.",
  },
  distrust: {
    index: "02",
    name: "Reason to distrust the process",
    short: "The evidence shows a local process following an irrelevant cue, manipulation, or incentive rather than the features the judgment claims to track.",
    next: "Reduce reliance on that source, repeat the judgment under better conditions, and check whether independent support remains.",
  },
  against: {
    index: "03",
    name: "Argument against the belief",
    short: "The evidence bears on what the belief says, defeats a premise the person explicitly uses, or exposes a conflict inside the stated position.",
    next: "Revise or defend the content itself. Another argument may still support it, so defeating one basis need not settle every possible defense.",
  },
  burden: {
    index: "04",
    name: "Burden of proof shifts",
    short: "A broad, well-supported account shows that the same process would have produced the conviction whether it was true or false, so independent support is now needed.",
    next: "Withhold the benefit of the doubt and ask for support that survives the genealogy; do not silently replace ‘needs support’ with ‘proved false.’",
  },
};

const GENEALOGY_INFERENCE_ORDER = ["explain", "distrust", "against", "burden"];

const GENEALOGY_SKILLS = [
  {
    id: "explanation",
    name: "Origin without verdict",
    checks: ["scar", "storm"],
    note: "Recognize a causal account when no unreliable process, direct objection to the belief, or complete loss of support has been shown.",
  },
  {
    id: "reliability",
    name: "Process reliability",
    checks: ["badges", "applause"],
    note: "Notice when a judgment follows group labels or rewards instead of the facts and reasons it claims to follow.",
  },
  {
    id: "content",
    name: "Content-level criticism",
    checks: ["ledger", "mirror"],
    note: "Separate evidence against a stated premise or position from a story about the psychological source of belief.",
  },
  {
    id: "burden",
    name: "Burden, not falsity",
    checks: ["islands", "species"],
    note: "Treat a broad history produced without regard for moral truth as a demand for independent support, not as automatic proof that every moral claim is false.",
  },
];

const GENEALOGY_QUESTIONS = [
  {
    id: "scar",
    phase: "Personal experience",
    axis: "Case 1 — the classroom scar",
    prompt: "What does Lea’s painful childhood experience establish about her present conviction, given only the information below?",
    file: "One witnessed harm · No reliability test · No counterevidence",
    context:
      "At age twelve, Lea watched a teacher publicly humiliate her brother for a small mistake. He became fearful of school for years. As an adult, Lea strongly believes that schools should never use public humiliation as punishment. A biographer confirms that this event first made the issue important to her.",
    assumptions:
      "The event happened as described. No evidence shows that Lea ignores relevant differences between cases, and no evidence in this file supports or opposes the school policy itself. Her later reasons have not yet been examined.",
    scope:
      "Choose the strongest conclusion supported by identifying this personal experience as an early cause. Do not assume that a vivid cause is automatically a bias, and do not invent later support for Lea.",
    correct: "explain",
    displayOrder: ["distrust", "against", "explain", "burden"],
    why: "A true belief and a false belief can both begin with a vivid event. The event explains salience, but this file does not yet assess Lea’s process or reasons.",
    guide: {
      plain: "You know why Lea began caring. You do not yet know whether that starting point helped her notice a real harm, pushed her into an overgeneralization, or was later replaced by better reasons.",
      separate: "A cause of attention is not automatically a source of distortion. To show distortion, the case would need evidence that Lea’s judgment stops responding to relevant differences or evidence.",
      reveal: "This answer tests whether you can record personal experience as part of a genealogy without making it carry a conclusion the evidence has not earned.",
    },
    details: {
      explain: "The event is evidence about when and why the conviction became important to Lea. Nothing supplied yet shows that her later judgment is unreliable, unsupported, or false.",
      distrust: "A painful event can distort judgment, but this file contains no comparison showing that Lea follows the memory when relevant facts change or that the experience is an unreliable guide.",
      against: "The biography does not conflict with the policy claim or any premise Lea has offered. Explaining her attention is not evidence that public humiliation is acceptable.",
      burden: "The file does not claim to explain all of Lea’s current support through a process that was indifferent to truth or relevant reasons. Her later evidence and reflection remain unexamined rather than defeated.",
    },
  },
  {
    id: "storm",
    phase: "Reciprocity",
    axis: "Case 2 — the rotating blackout",
    prompt: "A survival history explains why a settlement prizes emergency sharing. What follows from that genealogy by itself?",
    file: "Reciprocal practice · Survival benefit · Possible contact with relevant needs",
    context:
      "On the moon Oriel, dust storms randomly cut power to different homes. For generations, neighbors survived by taking turns sharing charged batteries. The settlement developed a strong conviction that keeping unused emergency power while another household freezes is wrong. Historians show that reciprocal sharing helped the community survive.",
    assumptions:
      "The history is accurate. It does not show that settlers would keep the same conviction under every possible fact, and it does not establish or deny objective moral truth. Sharing may have exposed people to facts about dependence and harm as well as producing a survival benefit.",
    scope:
      "Classify what the survival-and-reciprocity story establishes without assuming that a survival benefit automatically makes the belief a good guide or a bad one. Ask what additional connection would be needed.",
    correct: "explain",
    displayOrder: ["explain", "burden", "against", "distrust"],
    why: "Showing that a conviction helped survival explains its spread. More evidence is needed to show that the process ignored truth or relevant reasons, or that the conviction’s content is mistaken.",
    guide: {
      plain: "The belief had a practical history. That may be the whole story, part of a reliable learning process, or part of an unreliable one; the history supplied does not choose among those possibilities.",
      separate: "A trait can aid survival and still produce some true beliefs. It can also aid survival without tracking truth. Adaptiveness and reliability are questions that must be connected, not treated as synonyms.",
      reveal: "Your answer tests whether you demand a reliability argument instead of moving directly from evolutionary or cultural usefulness to disbelief.",
    },
    details: {
      explain: "The evidence explains how reciprocal conditions helped the conviction develop and persist. It does not yet show whether the process tracked relevant harms, needs, or any moral truth.",
      distrust: "Survival benefit alone does not show that the process followed an irrelevant cue. The same history may have repeatedly exposed settlers to genuine facts about dependence and preventable suffering.",
      against: "Nothing in the history conflicts with the claim about unused emergency power. A useful origin is not evidence that withholding power is acceptable.",
      burden: "The account is not stated to be complete, indifferent to relevant reasons, or the only support available. It therefore does not yet remove every basis for the conviction.",
    },
  },
  {
    id: "badges",
    phase: "Group loyalty",
    axis: "Case 3 — the reversible rescue badge",
    prompt: "What is established when an officer’s rescue judgment repeatedly changes with an irrelevant group badge?",
    file: "Identical case files · Hidden badge swap · Judgment follows in-group color",
    context:
      "Officer Sen says rescue priority should depend only on injury, distance, and survival chance. In twenty blinded simulations, researchers keep those facts identical but secretly swap blue and gold crew badges. Sen reliably favors blue—the badge of Sen’s own crew—even when the names and medical facts are reversed.",
    assumptions:
      "The experiment is well designed, repeatedly replicated, and the badge has no operational meaning in these cases. It tests this judgment process, not every belief Sen holds and not whether the selected person happened to be the better rescue in some unrelated case.",
    scope:
      "Identify what the badge experiment shows about the reliability of Sen’s stated decision process. Keep that local process finding separate from a universal claim that every loyalty-based judgment is false.",
    correct: "distrust",
    displayOrder: ["against", "explain", "burden", "distrust"],
    why: "The controlled swap shows Sen’s verdict tracking an irrelevant group marker while the stated reasons remain fixed. That is evidence against relying on this process.",
    guide: {
      plain: "When the badge changes, the answer changes—even though everything Sen says should matter stays the same. The process is not doing what Sen claims it does.",
      separate: "Distrusting this process is not the same as proving the opposite rescue verdict correct. A fresh decision still needs to use the relevant medical and operational facts.",
      reveal: "This answer tests whether you can identify a local reliability problem without inflating it into a total refutation of loyalty or morality.",
    },
    details: {
      explain: "The experiment certainly supplies a cause, but it does more: the controlled swap shows that this cause moves the judgment when every stated relevant feature stays fixed.",
      distrust: "Sen’s process tracks an in-group badge rather than the medical and operational facts Sen says determine priority. The cases should be reassessed under a process protected from that cue.",
      against: "The test does not establish which person should be rescued in a new case. It criticizes the mechanism producing Sen’s verdict, not the content of every possible rescue conclusion.",
      burden: "The evidence is strong but local: it tests one officer’s rescue judgments under a badge manipulation. It is not a complete genealogy of all current support for a whole moral domain.",
    },
  },
  {
    id: "applause",
    phase: "Status incentives",
    axis: "Case 4 — the invisible applause score",
    prompt: "A hidden reward changes Davi’s sincere convictions while reasons stay fixed. What is the best-supported conclusion?",
    file: "Random reward assignment · Repeated reversals · No new reasons",
    context:
      "Davi reviews proposals on a public debate platform. Without Davi’s knowledge, the platform randomly awards bright reputation points to either approving or rejecting each proposal. Over six months, Davi’s sincere judgments gradually reverse toward whichever position receives points, even when the evidence and written arguments are unchanged.",
    assumptions:
      "The randomized study rules out proposal quality as the cause of the reversals. Davi is not pretending for an audience; the rewarded position becomes easier for Davi to believe. The study does not test every independent reason Davi might later develop.",
    scope:
      "Classify what the experiment shows about this status-sensitive formation process. Do not confuse evidence that confidence should fall with proof that every rewarded conclusion is false.",
    correct: "distrust",
    displayOrder: ["burden", "distrust", "explain", "against"],
    why: "A randomized reward that reverses belief while reasons remain fixed is evidence that the process responds to status rather than the merits of the proposal.",
    guide: {
      plain: "Davi is not changing after discovering a better reason. The platform can steer belief merely by moving the applause signal.",
      separate: "An unreliable route can land on a true conclusion by accident. The experiment tells Davi not to trust this route; the proposal must still be evaluated on independent grounds.",
      reveal: "Your answer tests whether you treat status incentives as a reliability warning while preserving the separate question of what the proposal merits.",
    },
    details: {
      explain: "This is more than an origin story because randomizing the reward while holding reasons fixed reveals that the process follows a cue unrelated to the proposal’s merits.",
      distrust: "The controlled reversals give Davi a specific reason to discount convictions produced by the platform and to reconsider them without the reward signal.",
      against: "Some rewarded positions may still be correct. The experiment supplies no proposal-specific evidence against their content; it shows that Davi’s route to them was unreliable.",
      burden: "The study undermines one formation process, but it does not claim to explain every source of Davi’s present support across all moral judgments.",
    },
  },
  {
    id: "ledger",
    phase: "Historical institutions",
    axis: "Case 5 — the founder’s ledger",
    prompt: "New records directly contradict the reason used to defend inherited political rank. What kind of challenge is this?",
    file: "Explicit historical premise · Authenticated records · Premise contradicted",
    context:
      "The city of Vey gives permanent council seats to descendants of ten founding families. Its official defense says: “The arrangement is legitimate because every family freely signed the equal founding agreement.” An authenticated ledger and matching letters show that five signatures were forged and three families signed after threats.",
    assumptions:
      "The records are genuine, the official defense really depends on free and equal agreement, and no alternative defense has yet been offered. The evidence does not by itself settle every possible argument for or against inherited seats.",
    scope:
      "Identify what the documents do to the stated belief and its explicit supporting premise. This is not merely a psychological story about why present citizens feel respect for the council.",
    correct: "against",
    displayOrder: ["explain", "against", "distrust", "burden"],
    why: "The records bear directly on a factual premise used inside the official argument. They defeat that defense, although another defense of the institution could still be attempted.",
    guide: {
      plain: "The city says the rule is justified because everyone freely agreed. The documents show that this claimed event did not happen.",
      separate: "Evidence against a reason is stronger than a story about how people came to repeat it. It still need not prove that no other argument for the policy could ever work.",
      reveal: "Your answer tests whether you recognize a content-level objection when evidence contradicts a premise the belief openly uses.",
    },
    details: {
      explain: "The records may also help explain later myths, but their central force here is not causal: they contradict the historical premise stated in the council’s defense.",
      distrust: "Forgery gives reason to distrust the official record-keeping process, yet the question supplies something more direct: evidence against the premise on which this defense relies.",
      against: "If legitimacy is defended by a free and equal founding agreement, reliable evidence that the agreement was forged and coerced counts against that defense and the belief as stated.",
      burden: "The burden may also move after the defense fails, but the most specific conclusion is that the new documents directly undermine its explicit factual premise.",
    },
  },
  {
    id: "mirror",
    phase: "Deliberate consistency",
    axis: "Case 6 — the mirror-mind exception",
    prompt: "A board’s exception conflicts with its own stated rule under facts it accepts. What kind of criticism is now available?",
    file: "Shared capacity facts · Universal stated rule · Unsupported exception",
    context:
      "A research board adopts this rule: “Any being that can consciously feel pain must be protected from recreational harm.” It accepts conclusive tests showing that mirror-minds feel pain in the same relevant sense as biological people. The board then permits visitors to hurt mirror-minds for amusement solely because they are synthetic.",
    assumptions:
      "The board accepts the rule, the pain evidence, and that “synthetic” names no difference included in the rule. No genealogy of the board members’ attitudes has been supplied. The issue is the joint fit of their stated commitments.",
    scope:
      "Classify an objection based on the content and consistency of the board’s position. Do not search for an evolutionary, cultural, or emotional cause when none is part of the evidence.",
    correct: "against",
    displayOrder: ["burden", "explain", "distrust", "against"],
    why: "The accepted rule and accepted facts support protection, while the decision creates an exception the rule does not contain. That is an argument against holding the position as stated.",
    guide: {
      plain: "The board’s own rule covers every pain-capable being. Its own evidence says mirror-minds qualify. The exception does not fit those two commitments.",
      separate: "Not every criticism is genealogical. Reasons, evidence, and internal consistency can challenge a belief directly, regardless of how the belief formed.",
      reveal: "Your answer tests whether you can recognize a genuine content-level argument instead of treating every moral challenge as a story about origins.",
    },
    details: {
      explain: "No causal history has been offered, so a mere explanation of belief formation would miss the evidence actually present: the board’s accepted rule, accepted facts, and unsupported exception.",
      distrust: "The board may have a biased process, but no process experiment is supplied. The available criticism directly compares its rule, accepted facts, and exception.",
      against: "The three stated commitments cannot stand together without revising the universal rule, disputing the pain evidence, or adding and defending a relevant exception.",
      burden: "The board does owe an explanation, but the case supports more than a general request for support: it exposes a specific conflict within the position’s content.",
    },
  },
  {
    id: "islands",
    phase: "Upbringing and religion",
    axis: "Case 7 — the two cradle islands",
    prompt: "A complete upbringing model predicts opposite sacred convictions without tracking their truth. What follows most directly?",
    file: "Random birthplace · Opposite teachings · Complete current-support model",
    context:
      "Infants are randomly assigned between two isolated islands. On North Island, parents and temples teach that making a digital copy of the dead is strictly forbidden. On South Island, they teach that making the copy is strictly required. Researchers can predict the adult conviction from island assignment with 98 percent accuracy.",
    assumptions:
      "The teaching systems reward acceptance, block questions, and would produce their assigned conviction whether it were true or false. For the adults studied, researchers find no present support independent of those systems. The study does not establish which ritual claim, if either, is false.",
    scope:
      "Choose the strongest conclusion about how much confidence these adults should have. Distinguish losing the benefit of the doubt from obtaining evidence that the opposite ritual rule is true.",
    correct: "burden",
    displayOrder: ["burden", "distrust", "against", "explain"],
    why: "The genealogy explains the support currently offered through a process that would deliver either verdict by chance assignment. Independent support is now needed, but falsity has not been derived.",
    guide: {
      plain: "The adults would confidently hold the opposite rule if their cradles had gone to the other boat. Their confidence can no longer rest only on how natural the assigned teaching feels.",
      separate: "Showing that neither side currently has truth-sensitive support is not the same as showing that both claims are false. One could be true without these believers knowing it.",
      reveal: "Your answer tests the modest debunking conclusion: the genealogy can shift who owes support without deciding the ritual question by itself.",
    },
    details: {
      explain: "The model certainly explains the beliefs, but the stipulated completeness and indifference to truth also remove the only support these adults currently offer.",
      distrust: "The teaching process is locally unreliable, but the case goes further by stating that it explains all current support. The resulting issue is what independent support remains.",
      against: "The study never supplies a reason that digital copying is permitted, forbidden, or required. It challenges the adults’ justification, not the truth value directly.",
      burden: "The assigned teaching no longer deserves automatic trust. Each adult now needs reasons that do not depend on the same island process; until then, confidence should be withheld or reduced.",
    },
  },
  {
    id: "species",
    phase: "Evolutionary genealogy",
    axis: "Case 8 — the rival moral compasses",
    prompt: "Assume a broad history explains our core moral intuitions without aiming at moral truth. Does that alone prove that every ordinary moral claim is false?",
    file: "Fitness-shaped tendencies · Cultural development · No moral-truth aim",
    context:
      "Scientists produce a strongly confirmed account of how human tendencies toward kin protection, reciprocity, harm avoidance, and group defense aided reproduction, then combined with culture to shape core moral intuitions. A possible hive species would instead favor queens and treat outsiders as disposable while feeling equal certainty.",
    assumptions:
      "For this case, accept that the genealogy is broad and does not classify the original mechanism as tracking independent moral truth. Do not assume that deliberate reflection can or cannot later supply independent justification. Do not assume moral realism or moral non-realism at the start.",
    scope:
      "Identify the strongest conclusion supplied by the history itself. Keep a challenge to our reasons for confidence separate from the further philosophical claims needed to show that all moral judgments are false.",
    correct: "burden",
    displayOrder: ["against", "explain", "burden", "distrust"],
    why: "A history shaped without regard for moral truth can remove an automatic benefit of the doubt and demand independent support. Joyce argues that concluding every moral claim is false requires additional, disputed philosophical premises.",
    guide: {
      plain: "If our compass was built for survival rather than moral truth, we cannot simply trust its needle because it feels certain. We must still ask whether later reasoning gives us another reason to trust any result.",
      separate: "“Our present confidence is not yet justified” can be true even if some moral claims are true. Skepticism about knowledge and error theory about truth are different positions.",
      reveal: "Your answer tests whether you preserve the limited conclusion about confidence instead of turning an evolutionary explanation into an automatic proof that all moral claims are false.",
    },
    details: {
      explain: "The account does explain origins, but the case says that it is broad and that the process was not aimed at moral truth, so it also challenges the default support supplied by those intuitions.",
      distrust: "It is reasonable to distrust the original mechanism, yet the central global question is what support survives for the whole class of judgments after that account is accepted.",
      against: "The genealogy does not by itself show that moral facts are absent or that every moral judgment is false. That stronger conclusion requires bridging claims about truth, explanation, and moral facts.",
      burden: "The core intuitions lose their automatic authority and require an independent defense. Deliberate reflection might meet that burden, fail to meet it, or reproduce the same influences; the genealogy alone does not decide which.",
    },
  },
];

const genealogyState = {
  stage: "conviction",
  convictionId: "",
  customConviction: "",
  influences: {},
  index: 0,
  answers: {},
};

function genealogyConviction(id) {
  return GENEALOGY_CONVICTIONS.find((conviction) => conviction.id === id);
}

function genealogyConvictionText(state = genealogyState) {
  if (state.convictionId === "custom") return state.customConviction.trim();
  return genealogyConviction(state.convictionId)?.text || "";
}

function genealogyQuestion(id) {
  return GENEALOGY_QUESTIONS.find((question) => question.id === id);
}

function genealogyChoice(question, inferenceId) {
  return {
    id: inferenceId,
    ...GENEALOGY_INFERENCES[inferenceId],
    detail: question.details[inferenceId],
  };
}

function genealogyDisplayedChoices(question) {
  return question.displayOrder.map((inferenceId) => genealogyChoice(question, inferenceId));
}

function genealogySelectedAnswers(answers = genealogyState.answers) {
  return GENEALOGY_QUESTIONS.filter((question) => answers[question.id]).map((question) => ({
    question,
    choice: genealogyChoice(question, answers[question.id]),
    correct: answers[question.id] === question.correct,
  }));
}

function genealogyInfluenceSummary(influences = genealogyState.influences) {
  const counts = { strong: 0, possible: 0, little: 0, unknown: 0, unanswered: 0 };
  GENEALOGY_INFLUENCE_ORDER.forEach((id) => {
    const level = influences[id];
    if (GENEALOGY_INFLUENCE_LEVELS[level]) counts[level] += 1;
    else counts.unanswered += 1;
  });
  return {
    counts,
    answered: GENEALOGY_INFLUENCE_ORDER.length - counts.unanswered,
    suspected: counts.strong + counts.possible,
  };
}

function genealogyDiagnostic(answers = genealogyState.answers) {
  const selected = genealogySelectedAnswers(answers);
  const correctCount = selected.filter((answer) => answer.correct).length;
  const answered = selected.length;
  const overreachCount = selected.filter(({ question, choice }) => choice.id === "against" && question.correct !== "against").length;
  const skills = GENEALOGY_SKILLS.map((skill) => ({
    ...skill,
    correct: skill.checks.filter((id) => answers[id] === genealogyQuestion(id).correct).length,
    total: skill.checks.length,
  }));
  let title = "Several causal stories became stronger conclusions than the evidence allowed.";
  let summary = "The answer review shows whether a case needed more skepticism, less skepticism, or a different kind of criticism.";
  if (correctCount === 8) {
    title = "You kept origin, reliability, content, and burden separate.";
    summary = "Across all eight cases, you matched the conclusion to the evidence without treating genealogy as either powerless or automatically refuting.";
  } else if (correctCount >= 6) {
    title = "You preserved most of the important boundaries.";
    summary = "Most classifications fit the evidence. The remaining cases show where an origin story was asked to do too much—or where a real challenge was understated.";
  } else if (correctCount >= 4) {
    title = "Part of the genealogy is under control.";
    summary = "You separated several findings correctly, while other cases still blended causal explanation, process reliability, content-level evidence, and burden of proof.";
  }
  return {
    selected,
    answered,
    correctCount,
    reviewCount: answered - correctCount,
    overreachCount,
    skills,
    title,
    summary,
  };
}

function buildGenealogyAIProbePrompt(state = genealogyState) {
  const diagnosis = genealogyDiagnostic(state.answers);
  const conviction = genealogyConvictionText(state);
  const influenceLines = GENEALOGY_INFLUENCE_ORDER.map((id) => {
    const influence = GENEALOGY_INFLUENCES[id];
    const level = GENEALOGY_INFLUENCE_LEVELS[state.influences[id]];
    return `- ${influence.name}: ${level ? level.name : "Not rated"}. My estimate only; not a cause established by the site.`;
  }).join("\n");
  const skillLines = diagnosis.skills.map((skill) => `- ${skill.name}: ${skill.correct}/${skill.total}. ${skill.note}`).join("\n");
  const answerLines = diagnosis.selected.map(({ question, choice, correct }, index) => {
    const intended = GENEALOGY_INFERENCES[question.correct];
    return [
      `${index + 1}. ${question.axis}`,
      `Question: ${question.prompt}`,
      `Case: ${question.context}`,
      `Fixed details: ${question.assumptions}`,
      `Scope: ${question.scope}`,
      `My classification: ${choice.name}`,
      `What my choice means here: ${choice.detail}`,
      `Best-supported classification in the written case: ${intended.name}`,
      `Why that classification fits: ${question.why}`,
      `Match: ${correct ? "yes" : "no — inspect the inference boundary"}`,
    ].join("\n");
  }).join("\n\n");

  return `You are helping me investigate the genealogy of one moral conviction. Act as a careful epistemic interviewer, not as a therapist and not as a judge announcing whether my conviction is morally correct.

THE CONVICTION I CHOSE
${conviction}

MY TENTATIVE INFLUENCE MAP
${influenceLines}

Important: these ratings are my guesses. Do not treat them as established causes. Ask for evidence.

MY CLASSIFICATION RESULT
I matched ${diagnosis.correctCount} of 8 written cases. This measures whether I distinguished four kinds of conclusion; it does not measure whether my chosen conviction is true.

MY FOUR SKILL GROUPS
${skillLines}

MY COMPLETE CASE ANSWERS
${answerLines}

THE FOUR CONCLUSIONS TO KEEP SEPARATE
1. Causal explanation: an account of how a belief or attitude formed. Origin alone does not establish falsity or lack of justification.
2. Reason to distrust a process: evidence that a source followed an irrelevant cue, manipulation, faulty factual belief, or incentive rather than the features it claimed to track. This can lower confidence without proving the output false.
3. Argument against the belief: evidence bearing on the proposition, a premise explicitly supporting it, or the internal consistency of the stated position. Defeating one argument need not defeat every possible defense.
4. Burden-of-proof shift: a broad, well-supported, non-truth-tracking genealogy explains the support currently on offer, so independent support is required. This is an epistemological conclusion, not by itself moral error theory.

INTERVIEW INSTRUCTIONS
1. Ask one focused question at a time and wait for my answer.
2. Begin by asking me to state the conviction precisely: its subject, scope, exceptions, and whether I understand it as a belief, commitment, rule, constructed conclusion, or useful way of speaking.
3. For each of the nine possible influences, ask what actual evidence supports its presence. Mark unsupported possibilities “unknown”; do not invent a childhood, religion, motive, trauma, or social reward for me.
4. Build a timeline. Separate what first made the issue noticeable, what first produced the judgment, what later reinforced it, and what currently supports it.
5. For every proposed cause, ask whether the process responded to relevant facts or reasons, to an irrelevant cue, or to both. A causal influence can be truth-conducive, truth-indifferent, distorting, or still unassessed.
6. Separate a local challenge to one judgment from a global challenge to a whole moral faculty. Require broader evidence for broader conclusions.
7. When a process looks unreliable, ask whether my current confidence still depends on it and whether independent evidence or deliberate reflection survives.
8. Do not call a genealogy a genuine argument against the conviction unless evidence bears on its content, defeats an explicit premise, or exposes an inconsistency. State exactly which claim is challenged.
9. Do not infer falsity merely from dependence on evolution, culture, parents, religion, status, personal experience, or reflection. State the additional bridge premise whenever a stronger conclusion is proposed.
10. If a complete non-truth-tracking genealogy appears plausible, explain what benefit of the doubt is lost and what independent burden remains. Keep “unjustified,” “unknown,” and “false” separate.
11. Do not assume moral realism or moral non-realism. Explain how a realist, constructivist, expressivist, and error theorist might interpret the same genealogy, but only after the causal evidence is mapped.
12. If I treat the conviction mainly as an attitude or commitment rather than a truth-apt belief, assess whether its causes rely on false beliefs, irrelevant manipulation, or consequences I reject. Do not call a non-truth-apt attitude false.
13. Give deliberate reflection no automatic exemption. Ask what information, counterexamples, comparison rules, and safeguards made it more reliable than the earlier process.
14. End with a table listing each proposed influence, evidence for it, confidence in the causal claim, its relation to relevant reasons, the strongest warranted conclusion, what remains unknown, and what independent support survives.
15. Finish with two short sections: “What this genealogy changes” and “What this genealogy does not establish.”

Begin by asking me to restate the conviction in the most precise form I can.`;
}

const genealogyEls = {
  workspace: document.querySelector("#genealogyLab"),
  results: document.querySelector("#genealogyResults"),
  liveStatus: document.querySelector("#genealogyLiveStatus"),
  phase: document.querySelector("#genealogyPhase"),
  progress: document.querySelector("#genealogyProgress"),
  progressTrack: document.querySelector("#genealogyProgressTrack"),
  progressBar: document.querySelector("#genealogyProgressBar"),
  convictionStep: document.querySelector("#genealogyConvictionStep"),
  convictionChoices: document.querySelector("#genealogyConvictionChoices"),
  customWrap: document.querySelector("#genealogyCustomWrap"),
  customInput: document.querySelector("#genealogyCustomConviction"),
  saveConviction: document.querySelector("#saveGenealogyConvictionButton"),
  influenceStep: document.querySelector("#genealogyInfluenceStep"),
  influenceForm: document.querySelector("#genealogyInfluenceForm"),
  influenceFields: document.querySelector("#genealogyInfluenceFields"),
  influenceCompletion: document.querySelector("#genealogyInfluenceCompletion"),
  saveInfluences: document.querySelector("#saveGenealogyInfluencesButton"),
  questionCard: document.querySelector("#genealogyQuestionCard"),
  questionNumber: document.querySelector("#genealogyQuestionNumber"),
  questionAxis: document.querySelector("#genealogyQuestionAxis"),
  questionPrompt: document.querySelector("#genealogyQuestionPrompt"),
  caseFile: document.querySelector("#genealogyCaseFile"),
  questionContext: document.querySelector("#genealogyQuestionContext"),
  assumptions: document.querySelector("#genealogyAssumptions"),
  scope: document.querySelector("#genealogyScope"),
  explanation: document.querySelector("#genealogyExplanation"),
  plain: document.querySelector("#genealogyPlain"),
  separate: document.querySelector("#genealogySeparate"),
  reveal: document.querySelector("#genealogyReveal"),
  choices: document.querySelector("#genealogyChoices"),
  back: document.querySelector("#genealogyBackButton"),
  next: document.querySelector("#genealogyNextButton"),
  why: document.querySelector("#genealogyWhy"),
  mapKicker: document.querySelector("#genealogyMapKicker"),
  liveConviction: document.querySelector("#genealogyLiveConviction"),
  mapBasis: document.querySelector("#genealogyMapBasis"),
  liveOrigin: document.querySelector("#genealogyLiveOrigin"),
  matchedCount: document.querySelector("#genealogyMatchedCount"),
  reviewCount: document.querySelector("#genealogyReviewCount"),
  liveMeter: document.querySelector("#genealogyLiveMeter"),
  liveMeterBar: document.querySelector("#genealogyLiveMeterBar"),
};

function scrollToGenealogyElement(element, offset = 72) {
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function genealogyProgressNumber() {
  if (genealogyState.stage === "conviction") return 1;
  if (genealogyState.stage === "influences") return 2;
  if (genealogyState.stage === "questions") return genealogyState.index + 3;
  return 10;
}

function renderGenealogyProgress() {
  const number = genealogyProgressNumber();
  const phase = genealogyState.stage === "conviction"
    ? "Choose a conviction"
    : genealogyState.stage === "influences"
      ? "Trace possible influences"
      : genealogyState.stage === "results"
        ? "Diagnostic complete"
        : GENEALOGY_QUESTIONS[genealogyState.index].phase;
  genealogyEls.phase.textContent = phase;
  genealogyEls.progress.textContent = `${number} / 10`;
  genealogyEls.progressTrack.setAttribute("aria-valuenow", String(number));
  genealogyEls.progressBar.style.width = `${(number / 10) * 100}%`;
}

function canSaveGenealogyConviction() {
  return Boolean(genealogyState.convictionId) && (
    genealogyState.convictionId !== "custom" || genealogyState.customConviction.trim().length >= 8
  );
}

function renderGenealogyConvictions() {
  genealogyEls.convictionChoices.innerHTML = GENEALOGY_CONVICTIONS.map((conviction, index) => `
    <label class="choice-button obligation-choice meaning-choice genealogy-conviction-choice ${genealogyState.convictionId === conviction.id ? "selected" : ""}" for="genealogy-conviction-${conviction.id}">
      <input class="choice-radio" type="radio" name="genealogy-conviction" id="genealogy-conviction-${conviction.id}" value="${conviction.id}" ${genealogyState.convictionId === conviction.id ? "checked" : ""}>
      <span class="choice-key">${String.fromCharCode(65 + index)}</span>
      <span><strong>${conviction.name}</strong><small>${conviction.text}</small></span>
    </label>
  `).join("");
  genealogyEls.customWrap.classList.toggle("hidden", genealogyState.convictionId !== "custom");
  genealogyEls.customInput.value = genealogyState.customConviction;
  genealogyEls.saveConviction.disabled = !canSaveGenealogyConviction();
}

function renderGenealogyInfluenceFields() {
  genealogyEls.influenceFields.innerHTML = GENEALOGY_INFLUENCE_ORDER.map((id) => {
    const influence = GENEALOGY_INFLUENCES[id];
    const selected = genealogyState.influences[id] || "";
    return `<fieldset class="genealogy-influence-field">
      <legend><span>${influence.index}</span>${influence.name}</legend>
      <p>${influence.short}</p>
      <label for="genealogy-influence-${id}">Your current estimate</label>
      <select id="genealogy-influence-${id}" name="${id}" required>
        <option value="" ${!selected ? "selected" : ""} disabled>Choose one…</option>
        ${Object.entries(GENEALOGY_INFLUENCE_LEVELS).map(([levelId, level]) => `<option value="${levelId}" ${selected === levelId ? "selected" : ""}>${level.name}</option>`).join("")}
      </select>
      <details><summary>How this might show up</summary><p>${influence.example}</p></details>
    </fieldset>`;
  }).join("");
  updateGenealogyInfluenceCompletion();
}

function updateGenealogyInfluenceCompletion() {
  const summary = genealogyInfluenceSummary();
  genealogyEls.influenceCompletion.textContent = `${summary.answered} of 9 influences considered${summary.answered === 9 ? " · map ready" : ""}`;
  genealogyEls.saveInfluences.disabled = summary.answered !== 9;
  renderGenealogyLivePanel();
}

function genealogyInfluenceBar(id, levelId, compact = false) {
  const influence = GENEALOGY_INFLUENCES[id];
  const level = GENEALOGY_INFLUENCE_LEVELS[levelId];
  const width = !level || level.value === null ? 0 : level.value === 2 ? 100 : level.value === 1 ? 55 : 10;
  const label = level ? level.name : "Not rated";
  return `<div class="genealogy-origin-row ${levelId === "unknown" || !levelId ? "unknown" : ""} ${compact ? "compact" : ""}">
    <div><span>${influence.index}</span><strong>${influence.name}</strong><b>${label}</b></div>
    <i aria-hidden="true"><u style="width:${width}%"></u></i>
  </div>`;
}

function renderGenealogyLivePanel() {
  const conviction = genealogyConvictionText();
  const influenceSummary = genealogyInfluenceSummary();
  const diagnosis = genealogyDiagnostic();
  genealogyEls.liveConviction.textContent = conviction || "Not chosen yet";
  genealogyEls.mapBasis.textContent = !conviction
    ? "Choose a conviction to begin."
    : influenceSummary.answered < 9
      ? `${influenceSummary.answered} of 9 possible influences rated`
      : `${influenceSummary.suspected} of 9 marked as possible or strong influences`;
  genealogyEls.liveOrigin.innerHTML = GENEALOGY_INFLUENCE_ORDER.map((id) => genealogyInfluenceBar(id, genealogyState.influences[id], true)).join("");
  genealogyEls.liveOrigin.setAttribute(
    "aria-label",
    influenceSummary.answered
      ? GENEALOGY_INFLUENCE_ORDER.map((id) => `${GENEALOGY_INFLUENCES[id].name}: ${GENEALOGY_INFLUENCE_LEVELS[genealogyState.influences[id]]?.name || "not rated"}`).join("; ")
      : "No possible influences rated yet",
  );
  genealogyEls.matchedCount.textContent = diagnosis.correctCount;
  genealogyEls.reviewCount.textContent = diagnosis.reviewCount;
  const percent = diagnosis.answered ? (diagnosis.correctCount / diagnosis.answered) * 100 : 0;
  genealogyEls.liveMeterBar.style.width = `${percent}%`;
  genealogyEls.liveMeter.setAttribute(
    "aria-label",
    diagnosis.answered
      ? `${diagnosis.correctCount} of ${diagnosis.answered} written cases matched the best-supported inference so far`
      : "No reasoning cases classified yet",
  );
  genealogyEls.mapKicker.textContent = diagnosis.answered === 8 ? "Your completed investigation" : "Your investigation so far";
}

function showGenealogyStage(stage, { scroll = true } = {}) {
  genealogyState.stage = stage;
  genealogyEls.convictionStep.classList.toggle("hidden", stage !== "conviction");
  genealogyEls.influenceStep.classList.toggle("hidden", stage !== "influences");
  genealogyEls.questionCard.classList.toggle("hidden", stage !== "questions");
  renderGenealogyProgress();
  renderGenealogyLivePanel();
  if (scroll) scrollToGenealogyElement(genealogyEls.workspace, 72);
}

function renderGenealogyQuestion({ scroll = false, announce = true } = {}) {
  const question = GENEALOGY_QUESTIONS[genealogyState.index];
  const selectedId = genealogyState.answers[question.id];
  genealogyEls.questionNumber.textContent = String(genealogyState.index + 3).padStart(2, "0");
  genealogyEls.questionAxis.textContent = question.axis;
  genealogyEls.questionPrompt.textContent = question.prompt;
  genealogyEls.caseFile.innerHTML = question.file.split(" · ").map((item) => `<span>${item}</span>`).join("");
  genealogyEls.questionContext.textContent = question.context;
  genealogyEls.assumptions.textContent = question.assumptions;
  genealogyEls.scope.textContent = question.scope;
  genealogyEls.plain.textContent = question.guide.plain;
  genealogyEls.separate.textContent = question.guide.separate;
  genealogyEls.reveal.textContent = question.guide.reveal;
  genealogyEls.explanation.open = false;
  genealogyEls.why.textContent = question.why;
  genealogyEls.next.disabled = !selectedId;
  genealogyEls.next.textContent = genealogyState.index === GENEALOGY_QUESTIONS.length - 1 ? "See the full diagnostic →" : "Next case →";
  genealogyEls.choices.innerHTML = genealogyDisplayedChoices(question).map((choice, index) => `
    <label class="choice-button obligation-choice meaning-choice genealogy-choice ${selectedId === choice.id ? "selected" : ""}" for="genealogy-${question.id}-${choice.id}">
      <input class="choice-radio" type="radio" name="genealogy-${question.id}" id="genealogy-${question.id}-${choice.id}" value="${choice.id}" ${selectedId === choice.id ? "checked" : ""}>
      <span class="choice-key">${String.fromCharCode(65 + index)}</span>
      <span><strong>${choice.name}</strong><small>${choice.short}</small><em>${choice.detail}</em></span>
    </label>
  `).join("");
  showGenealogyStage("questions", { scroll });
  if (announce) genealogyEls.liveStatus.textContent = `Case ${genealogyState.index + 1} of 8: ${question.axis}.`;
}

function renderGenealogySkills(diagnosis) {
  const grid = document.querySelector("#genealogySkillGrid");
  grid.innerHTML = diagnosis.skills.map((skill) => `<article>
    <div><strong>${skill.name}</strong><b>${skill.correct} / ${skill.total}</b></div>
    <span aria-hidden="true"><i style="width:${(skill.correct / skill.total) * 100}%"></i></span>
    <p>${skill.note}</p>
  </article>`).join("");
  grid.setAttribute("aria-label", diagnosis.skills.map((skill) => `${skill.name}: ${skill.correct} of ${skill.total}`).join("; "));
}

function renderGenealogyOrigins() {
  const conviction = genealogyConvictionText();
  document.querySelector("#genealogyOriginConviction").textContent = `Conviction traced: “${conviction}”`;
  document.querySelector("#genealogyOriginGrid").innerHTML = GENEALOGY_INFLUENCE_ORDER.map((id) => {
    const influence = GENEALOGY_INFLUENCES[id];
    const levelId = genealogyState.influences[id];
    return `<article>
      ${genealogyInfluenceBar(id, levelId)}
      <p>${influence.short}</p>
    </article>`;
  }).join("");
}

function renderGenealogyFramework() {
  document.querySelector("#genealogyFrameworkGrid").innerHTML = GENEALOGY_INFERENCE_ORDER.map((id) => {
    const inference = GENEALOGY_INFERENCES[id];
    return `<article>
      <span>${inference.index}</span>
      <h3>${inference.name}</h3>
      <p>${inference.short}</p>
      <strong>Next move</strong>
      <p>${inference.next}</p>
    </article>`;
  }).join("");
}

function renderGenealogyAnswers(diagnosis) {
  document.querySelector("#genealogyAnswerGrid").innerHTML = diagnosis.selected.map(({ question, choice, correct }, index) => {
    const intended = GENEALOGY_INFERENCES[question.correct];
    return `<article class="meaning-answer-card genealogy-answer-card ${correct ? "matched" : "revisit"}">
      <span>${String(index + 1).padStart(2, "0")} · ${question.phase}</span>
      <h3>${correct ? "Inference matched" : "Inference boundary to revisit"}</h3>
      <strong>You chose: ${choice.name}</strong>
      <p>${choice.detail}</p>
      <div class="decoder-answer-correction">
        <b>Best-supported conclusion: ${intended.name}</b>
        <p>${question.why}</p>
      </div>
    </article>`;
  }).join("");
}

function showGenealogyResults() {
  const diagnosis = genealogyDiagnostic();
  const influenceSummary = genealogyInfluenceSummary();
  genealogyState.stage = "results";
  renderGenealogyProgress();
  renderGenealogyLivePanel();
  genealogyEls.workspace.classList.add("hidden");
  genealogyEls.results.classList.remove("hidden");
  document.querySelector("#genealogyResultTitle").textContent = diagnosis.title;
  document.querySelector("#genealogyResultSummary").textContent = diagnosis.summary;
  document.querySelector("#genealogyScore").textContent = `${diagnosis.correctCount} / 8`;
  document.querySelector("#genealogyScoreCopy").textContent = "This compares your classifications with the conclusion supported by each deliberately bounded case. It does not score your conviction.";
  document.querySelector("#genealogyOverreach").textContent = String(diagnosis.overreachCount);
  document.querySelector("#genealogyOverreachCopy").textContent = diagnosis.overreachCount
    ? `In ${diagnosis.overreachCount} case${diagnosis.overreachCount === 1 ? "" : "s"}, an origin or process finding was treated as a content-level argument when the case did not supply one.`
    : "You never treated an origin or process finding as a content-level argument without the required bridge.";
  document.querySelector("#genealogyInfluenceSummary").textContent = `${influenceSummary.suspected} possible / strong`;
  document.querySelector("#genealogyInfluenceSummaryCopy").textContent = `${influenceSummary.counts.strong} marked strong, ${influenceSummary.counts.possible} possible, ${influenceSummary.counts.little} little or none, and ${influenceSummary.counts.unknown} unknown. These are your estimates, not detected causes.`;
  renderGenealogySkills(diagnosis);
  renderGenealogyOrigins();
  renderGenealogyFramework();
  renderGenealogyAnswers(diagnosis);
  document.querySelector("#genealogyAIProbePrompt").value = buildGenealogyAIProbePrompt();
  document.querySelector("#genealogyResultTitle").focus({ preventScroll: true });
  scrollToGenealogyElement(genealogyEls.results, 72);
  genealogyEls.liveStatus.textContent = `Value genealogy diagnostic ready. ${diagnosis.correctCount} of 8 inference classifications matched.`;
}

function resetGenealogyLab() {
  genealogyState.stage = "conviction";
  genealogyState.convictionId = "";
  genealogyState.customConviction = "";
  genealogyState.influences = {};
  genealogyState.index = 0;
  genealogyState.answers = {};
  genealogyEls.results.classList.add("hidden");
  genealogyEls.workspace.classList.remove("hidden");
  document.querySelector("#genealogyPromptCopyStatus").textContent = "The prompt contains your answers but no account information.";
  renderGenealogyConvictions();
  renderGenealogyInfluenceFields();
  showGenealogyStage("conviction", { scroll: true });
  genealogyEls.liveStatus.textContent = "The Value Genealogy Lab has been reset.";
  const firstChoice = genealogyEls.convictionChoices.querySelector("input");
  if (firstChoice) firstChoice.focus({ preventScroll: true });
}

async function copyGenealogyPrompt(event) {
  const button = event.currentTarget;
  const prompt = document.querySelector("#genealogyAIProbePrompt");
  const status = document.querySelector("#genealogyPromptCopyStatus");
  try {
    await navigator.clipboard.writeText(prompt.value);
    button.textContent = "AI prompt copied";
    status.textContent = "Ready to paste into the AI service you choose. Nothing was sent by this site.";
  } catch {
    prompt.focus();
    prompt.select();
    button.textContent = "Select and copy";
    status.textContent = "Automatic copying is unavailable. The full prompt is selected for manual copying.";
  }
  window.setTimeout(() => {
    button.textContent = "Copy AI prompt";
    status.textContent = "The prompt contains your answers but no account information.";
  }, 2400);
}

function clearGenealogyDownstream() {
  genealogyState.influences = {};
  genealogyState.index = 0;
  genealogyState.answers = {};
}

genealogyEls.convictionChoices.addEventListener("change", (event) => {
  const input = event.target.closest('input[name="genealogy-conviction"]');
  if (!input) return;
  const convictionChanged = Boolean(genealogyState.convictionId) && genealogyState.convictionId !== input.value;
  if (convictionChanged) clearGenealogyDownstream();
  genealogyState.convictionId = input.value;
  genealogyEls.convictionChoices.querySelectorAll(".genealogy-conviction-choice").forEach((label) => {
    label.classList.toggle("selected", label.querySelector("input").checked);
  });
  genealogyEls.customWrap.classList.toggle("hidden", input.value !== "custom");
  genealogyEls.saveConviction.disabled = !canSaveGenealogyConviction();
  renderGenealogyLivePanel();
  if (input.value === "custom") genealogyEls.customInput.focus();
});

genealogyEls.customInput.addEventListener("input", () => {
  const convictionChanged = genealogyState.customConviction !== genealogyEls.customInput.value;
  if (convictionChanged && (Object.keys(genealogyState.influences).length || Object.keys(genealogyState.answers).length)) {
    clearGenealogyDownstream();
  }
  genealogyState.customConviction = genealogyEls.customInput.value;
  genealogyEls.saveConviction.disabled = !canSaveGenealogyConviction();
  renderGenealogyLivePanel();
});

genealogyEls.saveConviction.addEventListener("click", () => {
  if (!canSaveGenealogyConviction()) return;
  renderGenealogyInfluenceFields();
  showGenealogyStage("influences");
  document.querySelector("#genealogyInfluenceHeading").focus({ preventScroll: true });
  genealogyEls.liveStatus.textContent = "Conviction selected. Consider all nine possible influences.";
});

document.querySelector("#backToGenealogyConvictionButton").addEventListener("click", () => {
  showGenealogyStage("conviction");
  const selected = genealogyEls.convictionChoices.querySelector("input:checked");
  if (selected) selected.focus({ preventScroll: true });
});

genealogyEls.influenceForm.addEventListener("change", (event) => {
  const select = event.target.closest("select[name]");
  if (!select) return;
  genealogyState.influences[select.name] = select.value;
  updateGenealogyInfluenceCompletion();
});

genealogyEls.influenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (genealogyInfluenceSummary().answered !== 9) return;
  genealogyState.index = 0;
  renderGenealogyQuestion({ scroll: true });
  genealogyEls.questionPrompt.focus({ preventScroll: true });
});

genealogyEls.choices.addEventListener("change", (event) => {
  const input = event.target.closest('input[type="radio"]');
  if (!input) return;
  const question = GENEALOGY_QUESTIONS[genealogyState.index];
  genealogyState.answers[question.id] = input.value;
  genealogyEls.choices.querySelectorAll(".genealogy-choice").forEach((label) => {
    label.classList.toggle("selected", label.querySelector("input").checked);
  });
  genealogyEls.next.disabled = false;
  renderGenealogyLivePanel();
  genealogyEls.liveStatus.textContent = `Answer selected for case ${genealogyState.index + 1}. Choose Next when ready.`;
});

genealogyEls.back.addEventListener("click", () => {
  if (genealogyState.index === 0) {
    renderGenealogyInfluenceFields();
    showGenealogyStage("influences");
    document.querySelector("#genealogyInfluenceHeading").focus({ preventScroll: true });
    return;
  }
  genealogyState.index -= 1;
  renderGenealogyQuestion({ scroll: true });
  genealogyEls.questionPrompt.focus({ preventScroll: true });
});

genealogyEls.next.addEventListener("click", () => {
  const question = GENEALOGY_QUESTIONS[genealogyState.index];
  if (!genealogyState.answers[question.id]) return;
  if (genealogyState.index === GENEALOGY_QUESTIONS.length - 1) {
    showGenealogyResults();
    return;
  }
  genealogyState.index += 1;
  renderGenealogyQuestion({ scroll: true });
  genealogyEls.questionPrompt.focus({ preventScroll: true });
});

document.querySelector("#resetGenealogyButton").addEventListener("click", () => {
  const started = genealogyState.convictionId || Object.keys(genealogyState.answers).length;
  if (!started || window.confirm("Reset the conviction, influence map, and all eight case answers?")) resetGenealogyLab();
});

document.querySelector("#restartGenealogyButton").addEventListener("click", resetGenealogyLab);
document.querySelector("#copyGenealogyPromptButton").addEventListener("click", copyGenealogyPrompt);

renderGenealogyConvictions();
renderGenealogyInfluenceFields();
renderGenealogyProgress();
renderGenealogyLivePanel();
