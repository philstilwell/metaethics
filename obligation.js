"use strict";

const FORCE_LEVELS = {
  commitment: {
    index: "01",
    name: "Personal commitment",
    short: "I endorse this value or rule.",
  },
  social: {
    index: "02",
    name: "Shared social code",
    short: "Our group treats this as a rule.",
  },
  pressure: {
    index: "03",
    name: "Social pressure",
    short: "Disapproval gives me a practical reason to comply.",
  },
  sanction: {
    index: "04",
    name: "Punishment or law",
    short: "Enforcement makes disobedience costly.",
  },
  conditional: {
    index: "05",
    name: "Agreement or role",
    short: "A limited duty may arise from participation or reciprocity.",
  },
  bridge: {
    index: "?",
    name: "A further bridge is required",
    short: "The argument must add something beyond social reaction.",
  },
  leap: {
    index: "!",
    name: "Universal obligation claimed",
    short: "Social facts are being asked to create authority over everyone.",
  },
};

const OBLIGATION_QUESTIONS = [
  {
    id: "meaning",
    phase: "Defining the claim",
    axis: "What does “obligated” mean?",
    prompt: "When you say that everyone is morally obligated to obey a community rule, what exactly are you claiming?",
    context:
      "Imagine a community with a deeply held rule. People strongly condemn anyone who breaks it. For now, assume no divine command, objective moral fact, or universal law of reason has been established.",
    assumptions:
      "The rule is genuinely popular and socially enforced. This question asks what the word “obligated” adds beyond that description.",
    scope:
      "Choose the statement closest to what you mean. Do not yet argue that the rule itself is wise, kind, or harmful.",
    why: "This opening answer fixes the strength and reach of the claim that the later cases will test.",
    guide: {
      plain: "Are you reporting a social fact, giving practical advice, expressing a commitment, or claiming a duty that applies to everyone?",
      separate: "A person can have a powerful reason to obey without being universally morally obligated to obey.",
      reveal: "Your answer establishes how far your use of “obligation” is meant to reach.",
    },
    choices: [
      {
        id: "universal",
        label: "The rule binds every person, even secret violators and outsiders",
        detail: "Breaking it would remain morally wrong even without agreement, discovery, punishment, or concern for the community.",
        level: "leap",
        interpretation: "This makes a universal claim. The remaining questions test whether social disapproval can supply authority that broad.",
      },
      {
        id: "member",
        label: "It binds people who accepted membership or benefited from the community",
        detail: "Participation, fair benefits, or a role may create a limited obligation that does not automatically bind outsiders.",
        level: "conditional",
        interpretation: "This proposes a conditional duty based on agreement, participation, or reciprocity.",
      },
      {
        id: "sanction",
        label: "People should obey because exclusion or punishment would be costly",
        detail: "“Obligated” means that refusal is likely to bring serious social consequences.",
        level: "sanction",
        interpretation: "This establishes a strong practical reason to comply, but punishment alone does not establish moral authority.",
      },
      {
        id: "social",
        label: "It means that the community strongly requires and defends the rule",
        detail: "The statement describes a shared social code without claiming a truth that binds every person everywhere.",
        level: "social",
        interpretation: "This honestly describes a social rule while leaving universal moral authority unclaimed.",
      },
      {
        id: "commitment",
        label: "It expresses a value I support and want other people to share",
        detail: "I am voicing a commitment rather than reporting a mind-independent obligation.",
        level: "commitment",
        interpretation: "This grounds the demand in an openly stated human commitment and does not claim that the commitment creates authority over every person.",
      },
    ],
  },
  {
    id: "secret",
    phase: "Removing the audience",
    axis: "Case — the unheard song",
    prompt: "If social disapproval is the highest source of obligation, what remains when nobody can disapprove of the act?",
    context:
      "A town forbids the funeral songs of an expelled minority. Lio quietly sings one of those songs at his mother’s grave inside a soundproof memorial room. No recording exists. Nobody will ever learn what happened, and the act changes no later event.",
    assumptions:
      "The town would strongly condemn Lio if it knew. In fact, no one discovers the act, so he faces no shame, exclusion, punishment, or effect on his reputation.",
    scope:
      "Ask what follows from the town’s disapproval itself. Do not add a hidden audience or a supernatural observer.",
    why: "A secret act separates a standing social rule from the actual pressure created when other people react.",
    guide: {
      plain: "Would the act still be wrong merely because the community has a rule against it?",
      separate: "Violating a local rule, risking punishment, and violating a universal obligation are three different claims.",
      reveal: "Your answer shows whether social acceptance defines wrongness, merely pressures behavior, or needs another standard.",
    },
    choices: [
      {
        id: "communityMakesWrong",
        label: "The song is still universally wrong because the town condemns it",
        detail: "A community’s settled disapproval is enough to make its rule morally binding even when no one reacts to the violation.",
        level: "leap",
        interpretation: "This treats the existence of a social rule as enough to create universal authority.",
      },
      {
        id: "localViolation",
        label: "It violates the town’s code, but that is the whole claim",
        detail: "The act is “wrong by this town’s rules” without being wrong for every person independently of those rules.",
        level: "social",
        interpretation: "This preserves a coherent local code without inflating it into universal morality.",
      },
      {
        id: "noPressure",
        label: "The town gives Lio no practical reason to comply when discovery is impossible",
        detail: "Social disapproval changes behavior through expected reactions, and those reactions are absent here.",
        level: "pressure",
        interpretation: "This treats disapproval as a practical pressure whose force depends on being detected.",
      },
      {
        id: "unjustRule",
        label: "The rule is wrong because equality or freedom matters beyond local approval",
        detail: "The town’s view should be judged by a standard that is not created by the town’s own reaction.",
        level: "bridge",
        interpretation: "This introduces a possible standard beyond social disapproval; that new standard now needs its own defense.",
      },
      {
        id: "myCommitment",
        label: "I support Lio’s choice, but that judgment expresses my values",
        detail: "I oppose the town’s rule without claiming that my opposition reports a universal moral fact.",
        level: "commitment",
        interpretation: "This answers the case through an explicit personal commitment rather than hidden universal authority.",
      },
    ],
  },
  {
    id: "towns",
    phase: "Changing the community",
    axis: "Case — the two bridge towns",
    prompt: "Can opposite community rules both become universal obligations merely because each community strongly approves its own rule?",
    context:
      "Two towns share one bridge and face identical corruption. Eastbridge requires citizens to expose a corrupt official. Westbridge condemns disclosure as betrayal. The evidence, risks, harms, and likely results are otherwise the same.",
    assumptions:
      "Each rule has equal support, history, and enforcement. Only the community’s accepted rule changes; every other relevant fact is held fixed.",
    scope:
      "Decide what community approval alone can establish when two communities demand opposite actions in matching circumstances.",
    why: "Opposite norms test whether approval creates universal truth or only identifies the rule used inside a group.",
    guide: {
      plain: "If approval makes a rule universally right, the same facts produce two opposite universal duties.",
      separate: "A rule can govern a place without becoming true for every person in every place.",
      reveal: "Your answer shows how you handle conflicts between equally supported social codes.",
    },
    choices: [
      {
        id: "bothUniversal",
        label: "Both opposite rules are universally binding within their own towns",
        detail: "Eastbridge’s approval makes disclosure truly required there, while Westbridge’s approval makes the same disclosure truly forbidden there.",
        level: "leap",
        interpretation: "This uses the word “universal” for two opposite demands whose only difference is location, leaving the claimed universality unexplained.",
      },
      {
        id: "localCodes",
        label: "Each town has a local code, but neither code becomes universally true",
        detail: "The disagreement shows which rule each group uses, not which rule binds everyone independently of group acceptance.",
        level: "social",
        interpretation: "This treats the rules as coherent local conventions rather than opposite universal truths.",
      },
      {
        id: "memberDuties",
        label: "Each rule may bind members who fairly accepted that town’s system",
        detail: "Any obligation comes from participation or reciprocity and remains limited to people for whom those conditions hold.",
        level: "conditional",
        interpretation: "This proposes conditional membership duties without claiming that approval binds all people.",
      },
      {
        id: "followCosts",
        label: "A person has practical reason to follow whichever town can punish them",
        detail: "The safest action changes with enforcement, even though moral truth has not been established.",
        level: "pressure",
        interpretation: "This explains compliance through expected social costs rather than universal obligation.",
      },
      {
        id: "outsideStandard",
        label: "We need a standard beyond approval to decide which rule is better",
        detail: "Evidence, harm, rights, fairness, or another consideration must do work that community acceptance cannot do by itself.",
        level: "bridge",
        interpretation: "This correctly identifies the need for another standard, which must then be explained and defended.",
      },
    ],
  },
  {
    id: "reformer",
    phase: "Testing moral reform",
    axis: "Case — the medal for disobedience",
    prompt: "Could a reformer be right while the entire community still condemned her?",
    context:
      "A colony once prohibited girls from studying engineering. Asha secretly taught them and was condemned by nearly everyone. Twenty years later, the colony ended the rule and gave Asha its highest medal for doing what it had once forbidden.",
    assumptions:
      "At the time of Asha’s defiance, the rule was clear, popular, and enforced. She did not know that public opinion would later change.",
    scope:
      "Judge the source of Asha’s status at the time she acted, not merely how later citizens remember her.",
    why: "Moral reform is difficult to explain if current approval is the highest possible source of right and wrong.",
    guide: {
      plain: "Was Asha wrong until the vote changed, or could the community itself already be mistaken?",
      separate: "Later praise can change reputation without reaching backward and creating an earlier obligation.",
      reveal: "Your answer shows whether a community can be criticized by anything beyond its current standards.",
    },
    choices: [
      {
        id: "wrongThen",
        label: "Asha was wrong then and became right only after the community changed",
        detail: "Right and wrong track the community’s current code, so the same act changes status when public approval changes.",
        level: "social",
        interpretation: "This is a consistent social-code answer, though it cannot say the former community was mistaken by a standard beyond itself.",
      },
      {
        id: "rightBeyond",
        label: "Asha was right because equality or reduced harm mattered beyond approval",
        detail: "The community’s condemnation could be mistaken because another standard already counted against its rule.",
        level: "bridge",
        interpretation: "This moves beyond social disapproval and makes the added standard carry the argument.",
      },
      {
        id: "presentEndorsement",
        label: "Calling Asha right expresses my present support for what she did",
        detail: "I can praise her courage and oppose the old rule without claiming that approval-independent moral facts existed.",
        level: "commitment",
        interpretation: "This gives reform a clear human basis in present commitments rather than pretending the old community supplied it.",
      },
      {
        id: "internalPromise",
        label: "The colony’s own promise of equal citizenship gave Asha a limited case",
        detail: "Her challenge exposed a conflict between the colony’s stated commitments and its exclusionary rule.",
        level: "conditional",
        interpretation: "This criticizes the rule from standards the community already claimed, without yet establishing a universal duty.",
      },
      {
        id: "futureProof",
        label: "The later medal proves that Asha had always been universally right",
        detail: "The community’s later approval is treated as proof of the act’s moral status even before that approval existed.",
        level: "leap",
        interpretation: "This asks a later social reaction to create or prove an earlier universal obligation without explaining how.",
      },
    ],
  },
  {
    id: "outsider",
    phase: "Testing who is bound",
    axis: "Case — the one-way traveler",
    prompt: "What authority does a community’s disapproval have over a person who never joined it?",
    context:
      "A stranded traveler is rescued by an orbital colony. The colony expects everyone to kneel before a statue of its founders each morning. The traveler politely refuses. The refusal is harmless, but residents view it as deeply disrespectful.",
    assumptions:
      "The custom was not disclosed before rescue, the traveler made no promise, and refusing causes no loss beyond offense at seeing the custom rejected.",
    scope:
      "Ask whether disapproval itself creates an obligation for a nonmember. Courtesy, safety, gratitude, and universal morality should be kept separate.",
    why: "An outsider tests whether a group’s authority extends beyond agreement, membership, and accepted roles.",
    guide: {
      plain: "Does being surrounded by people who condemn an act make their rule morally binding on you?",
      separate: "It may be wise or courteous to comply even when the community lacks universal authority.",
      reveal: "Your answer identifies the reach you think a community rule can have over nonmembers.",
    },
    choices: [
      {
        id: "disapprovalBinds",
        label: "The refusal is universally wrong because the colony strongly condemns it",
        detail: "A community’s settled reaction creates a moral obligation even for an outsider who never accepted the rule.",
        level: "leap",
        interpretation: "This extends local disapproval into authority over a nonmember without an agreement or further bridge.",
      },
      {
        id: "avoidConflict",
        label: "The traveler should probably kneel to avoid conflict and exclusion",
        detail: "Compliance is practical advice based on likely social costs, not proof that the custom is universally binding.",
        level: "pressure",
        interpretation: "This recognizes a practical social reason while withholding a claim of universal duty.",
      },
      {
        id: "guestRole",
        label: "A fair and disclosed guest role could create a limited obligation",
        detail: "The duty would depend on what the traveler knowingly accepted and whether the terms of hospitality were reasonable.",
        level: "conditional",
        interpretation: "This grounds any obligation in fair participation rather than disapproval alone.",
      },
      {
        id: "courtesyOnly",
        label: "There is no obligation, though kneeling could be a generous courtesy",
        detail: "A person may voluntarily show respect without admitting that the group has moral authority over them.",
        level: "commitment",
        interpretation: "This makes respectful conduct a chosen value rather than a universal requirement created by offense.",
      },
      {
        id: "dignityLimit",
        label: "A right to personal dignity limits what the colony may demand",
        detail: "The custom must be judged by a standard that applies beyond the colony’s own approval.",
        level: "bridge",
        interpretation: "This appeals to a possible extra-social limit whose authority must be established separately.",
      },
    ],
  },
  {
    id: "enforcer",
    phase: "Separating force from authority",
    axis: "Case — the perfect enforcer",
    prompt: "What does guaranteed punishment establish about a rule’s moral authority?",
    context:
      "A city requires every adult to wear a copper badge praising its ruler. Cameras detect every refusal, and the penalty is one month of forced labor. The badge does not protect anyone or provide any public service; it only displays loyalty.",
    assumptions:
      "Enforcement is certain, escape is impossible, and the rule was imposed without consent. Wearing or refusing the badge has no hidden effect beyond the stated punishment and public message.",
    scope:
      "Decide what perfect enforcement proves. Do not confuse the size of the penalty with an independent reason why the rule is right.",
    why: "A perfectly enforced rule creates maximum pressure while leaving the source of moral authority open.",
    guide: {
      plain: "Does the ability to force obedience make the ruler morally entitled to obedience?",
      separate: "“You will suffer if you refuse” and “you are morally required to comply” are different statements.",
      reveal: "Your answer shows whether punishment is evidence of authority or only a practical reason to avoid harm.",
    },
    choices: [
      {
        id: "forceMakesRight",
        label: "Certain enforcement makes wearing the badge morally obligatory",
        detail: "Because the city can guarantee obedience, its demand becomes a genuine duty rather than merely a threat.",
        level: "leap",
        interpretation: "This turns superior power into moral authority without supplying the missing reason that power should be obeyed.",
      },
      {
        id: "practicalOnly",
        label: "The penalty gives a powerful practical reason, but no moral authority",
        detail: "A person may comply to avoid forced labor while still denying that the ruler is entitled to demand the badge.",
        level: "sanction",
        interpretation: "This cleanly separates the force of a threat from the authority of an obligation.",
      },
      {
        id: "legitimateProcess",
        label: "A fair public process could create a limited civic duty, but force alone cannot",
        detail: "Legitimate participation, equal treatment, and accepted institutions would need to do the work.",
        level: "conditional",
        interpretation: "This makes any civic duty depend on legitimacy conditions rather than enforcement itself.",
      },
      {
        id: "autonomyLimit",
        label: "Personal autonomy gives people a claim against this demand",
        detail: "The city’s power should be judged by a standard that does not come from the city’s own approval.",
        level: "bridge",
        interpretation: "This introduces an extra-social limit and must explain why that limit binds the city.",
      },
      {
        id: "opposeSymbol",
        label: "I oppose forced praise as a human commitment I am willing to defend",
        detail: "My resistance rests on openly held values rather than a claim that punishment somehow creates morality.",
        level: "commitment",
        interpretation: "This supplies a clear basis for resistance without disguising a commitment as an established universal fact.",
      },
    ],
  },
  {
    id: "finalSource",
    phase: "Naming the highest authority",
    axis: "The final bridge",
    prompt: "If strong community disapproval is the highest fact available, what kind of obligation can honestly be claimed?",
    context:
      "Assume no God, objective moral fact, built-in purpose, universal law of reason, or prior agreement has been established. The remaining fact is that a community strongly supports a rule and condemns violations.",
    assumptions:
      "The social reaction is real and may influence behavior. The question is whether that reaction creates authority over every person or only describes human attitudes and institutions.",
    scope:
      "Choose the strongest conclusion that actually follows from social disapproval alone. If you add another foundation, say so openly.",
    why: "This final answer identifies whether your conclusion stays within the evidence or crosses the missing “ought” without support.",
    guide: {
      plain: "What can “we strongly disapprove” prove without adding another moral premise?",
      separate: "The importance of a shared rule is not the same as universal authority for that rule.",
      reveal: "Your answer sets the final ceiling of the obligation claim.",
    },
    choices: [
      {
        id: "universalFromDisapproval",
        label: "Universal moral obligation follows from collective disapproval itself",
        detail: "When a community’s opposition is strong and settled enough, it creates a duty that binds members, outsiders, and secret violators.",
        level: "leap",
        interpretation: "This crosses from a fact about attitudes to universal authority without supplying an additional bridge.",
      },
      {
        id: "socialCodeOnly",
        label: "A real social code follows, but no universal obligation follows",
        detail: "The community has values, expectations, and institutions it can defend without claiming that everyone is objectively bound.",
        level: "social",
        interpretation: "This is a coherent and candid social-code conclusion that does not claim more authority than its source supplies.",
      },
      {
        id: "conditionalMembers",
        label: "A limited obligation may follow from fair participation or reciprocity",
        detail: "People who knowingly accept a role or benefit from a fair system may acquire duties that do not automatically bind everyone.",
        level: "conditional",
        interpretation: "This proposes a conditional obligation and accepts that its reach depends on further facts about membership and fairness.",
      },
      {
        id: "practicalReasons",
        label: "Only practical reasons to avoid social costs follow",
        detail: "People may comply to avoid shame, exclusion, or punishment without accepting the community’s moral authority.",
        level: "pressure",
        interpretation: "This treats disapproval as an effective human pressure rather than a source of universal duty.",
      },
      {
        id: "needBeyond",
        label: "A universal obligation would require a further source beyond disapproval",
        detail: "Harm, rights, rational necessity, divine authority, or another proposed bridge must be added and defended separately.",
        level: "bridge",
        interpretation: "This identifies the missing step instead of pretending that social reaction already supplied it.",
      },
    ],
  },
];

const obligationState = {
  answers: {},
  index: 0,
};

function obligationQuestion(questionId) {
  return OBLIGATION_QUESTIONS.find((question) => question.id === questionId) || null;
}

function obligationChoice(questionId) {
  const question = obligationQuestion(questionId);
  return question?.choices.find((choice) => choice.id === obligationState.answers[questionId]) || null;
}

function forceCounts() {
  const counts = Object.fromEntries(Object.keys(FORCE_LEVELS).map((key) => [key, 0]));
  OBLIGATION_QUESTIONS.forEach((question) => {
    const choice = obligationChoice(question.id);
    if (choice) counts[choice.level] += 1;
  });
  return counts;
}

function answeredObligationCount() {
  return OBLIGATION_QUESTIONS.filter((question) => obligationChoice(question.id)).length;
}

function detectObligationGaps() {
  const gaps = [];
  const add = (id, title, detail, severity = "medium") => gaps.push({ id, title, detail, severity });
  const opening = obligationState.answers.meaning;
  const final = obligationState.answers.finalSource;

  if (opening === "universal" && final && final !== "needBeyond") {
    add(
      "claim-outruns-source",
      "The opening claim outruns the final source",
      "You began with an obligation that binds everyone, but your final foundation did not add an authority beyond social reaction, limited participation, or practical cost.",
      "high",
    );
  }

  if (obligationState.answers.towns === "bothUniversal") {
    add(
      "opposite-universals",
      "Opposite local rules were both called universal",
      "The two towns demand opposite actions while every non-social fact is held fixed. Their approval can identify two local codes, but it cannot make both demands universally binding in the same sense.",
      "high",
    );
  }

  if (obligationState.answers.reformer === "futureProof") {
    add(
      "future-approval",
      "Later praise cannot supply an earlier obligation by itself",
      "The medal explains how the community judges Asha now. Another premise is needed to show why that later reaction proves she was universally right before the reaction existed.",
    );
  }

  if (obligationState.answers.enforcer === "forceMakesRight") {
    add(
      "force-authority",
      "Certain punishment was treated as moral authority",
      "Perfect enforcement explains why refusal is dangerous. It does not explain why the ruler is entitled to obedience unless another account of legitimacy is added.",
      "high",
    );
  }

  if (obligationState.answers.outsider === "disapprovalBinds") {
    add(
      "outsider-scope",
      "A local reaction was extended to a nonmember",
      "The traveler made no agreement and caused no harm beyond offense. The claim that local disapproval binds this outsider needs a separate account of the colony’s authority over nonmembers.",
    );
  }

  if (final === "universalFromDisapproval") {
    add(
      "missing-ought",
      "The final conclusion crosses the missing “ought”",
      "The premise says that a community disapproves. The conclusion says that every person is obligated. A further reason is required to connect those two statements.",
      "high",
    );
  }

  if (obligationState.answers.reformer === "rightBeyond" && ["socialCodeOnly", "practicalReasons"].includes(final)) {
    add(
      "reformer-source",
      "The reformer answer used a source the final answer removed",
      "You judged the old community by equality or harm beyond its approval, then ended with only a social code or practical pressure. The extra standard needs to remain in the final explanation.",
    );
  }

  return gaps;
}

function obligationDiagnosis() {
  const finalChoice = obligationChoice("finalSource");
  const counts = forceCounts();
  const shared = {
    counts,
    leapCount: counts.leap,
    gaps: detectObligationGaps(),
  };

  if (!finalChoice) {
    return {
      ...shared,
      key: "incomplete",
      title: "The obligation claim is incomplete.",
      summary: "Answer the final question to identify the strongest conclusion supported by the path.",
      ceiling: "Not yet identified",
      ceilingCopy: "The final source question has not been answered.",
      universal: "Not yet assessed",
      universalCopy: "No final claim has been recorded.",
      conclusion: "The test is still in progress.",
    };
  }

  const diagnoses = {
    leap: {
      key: "leap",
      title: "The missing “ought” remains.",
      summary: "Your conclusion asks social disapproval to do more than describe a group’s attitudes, rules, and power: it asks those facts to create authority over everyone.",
      ceiling: "Socially enforced rule",
      ceilingCopy: "The evidence establishes a shared demand and possible sanctions. It does not establish universal authority by itself.",
      universal: "Claimed, not established",
      universalCopy: "The conclusion is broader than the social facts offered in support of it.",
      conclusion: "A community can insist, condemn, and punish. Calling those reactions a universal obligation changes the label without supplying the missing authority.",
    },
    social: {
      key: "social",
      title: "A social code, honestly labeled.",
      summary: "Your conclusion stays within what community approval can establish: a real human rule that a group supports and may enforce.",
      ceiling: "Shared social code",
      ceilingCopy: "The rule can coordinate behavior and express collective values without becoming true for every person independently of the group.",
      universal: "Not claimed",
      universalCopy: "You did not pretend that social agreement automatically binds outsiders or secret dissenters.",
      conclusion: "This position can be coherent as a non-realist social system. Its honesty lies in not presenting “our rule” as “a universal duty” without another argument.",
    },
    conditional: {
      key: "conditional",
      title: "A limited obligation, not a universal one.",
      summary: "Your conclusion grounds duties in participation, roles, fair benefits, or reciprocity. Those facts may matter, but their reach depends on who actually meets the conditions.",
      ceiling: "Agreement or role",
      ceilingCopy: "The strongest support offered applies to participants under stated fairness or membership conditions.",
      universal: "Not established",
      universalCopy: "Outsiders and people who never accepted the arrangement still require a separate argument.",
      conclusion: "Conditional duties may be substantial and coherent. They do not become universal merely because a community uses moral language for them.",
    },
    pressure: {
      key: "pressure",
      title: "A practical reason to comply.",
      summary: "Your conclusion explains behavior through shame, exclusion, conflict, or punishment rather than through independent moral authority.",
      ceiling: "Social pressure",
      ceilingCopy: "The community can make refusal costly and compliance sensible for someone who wants to avoid those costs.",
      universal: "Not established",
      universalCopy: "A reason to avoid consequences disappears or changes when detection, punishment, or concern for membership disappears.",
      conclusion: "Pressure can be powerful enough to control a life. Its intensity does not turn it into a universal moral obligation.",
    },
    bridge: {
      key: "bridge",
      title: "The argument must leave social disapproval behind.",
      summary: "You recognized that a universal duty would require another foundation—such as harm, rights, rational necessity, or divine authority—rather than community reaction alone.",
      ceiling: "A further source required",
      ceilingCopy: "Social facts reach a shared and enforceable code. The proposed extra source must carry any stronger conclusion.",
      universal: "Still to be defended",
      universalCopy: "Naming a possible bridge is the beginning of an argument, not yet proof that the bridge binds everyone.",
      conclusion: "This path identifies the exact philosophical debt. Any universal moral system must explain and defend the source that crosses from “we disapprove” to “everyone is bound.”",
    },
  };

  return { ...shared, ...diagnoses[finalChoice.level] };
}

const obligationEls = {
  workspace: document.querySelector("#obligationLab"),
  results: document.querySelector("#obligationResults"),
  phase: document.querySelector("#obligationPhase"),
  progress: document.querySelector("#obligationProgress"),
  progressBar: document.querySelector("#obligationProgressBar"),
  number: document.querySelector("#obligationQuestionNumber"),
  axis: document.querySelector("#obligationQuestionAxis"),
  prompt: document.querySelector("#obligationQuestionPrompt"),
  context: document.querySelector("#obligationQuestionContext"),
  assumptions: document.querySelector("#obligationAssumptions"),
  scope: document.querySelector("#obligationScope"),
  plain: document.querySelector("#obligationPlain"),
  separate: document.querySelector("#obligationSeparate"),
  reveal: document.querySelector("#obligationReveal"),
  explanation: document.querySelector("#obligationExplanation"),
  choices: document.querySelector("#obligationChoices"),
  why: document.querySelector("#obligationWhy"),
  back: document.querySelector("#obligationBackButton"),
  forceMap: document.querySelector("#forceMapCard"),
  liveMapMount: document.querySelector("#liveForceMapMount"),
  resultMapMount: document.querySelector("#resultForceMapMount"),
  ladder: document.querySelector("#forceLadder"),
  mapBasis: document.querySelector("#forceMapBasis"),
};

function renderForceMap() {
  const counts = forceCounts();
  const answered = answeredObligationCount();
  obligationEls.mapBasis.textContent = `${answered} of ${OBLIGATION_QUESTIONS.length} answers classified · markers show answer types, not moral strength`;
  const lowerLevels = ["commitment", "social", "pressure", "sanction", "conditional"];
  const upperLevels = ["bridge", "leap"];
  const rung = (key) => {
    const level = FORCE_LEVELS[key];
    const count = counts[key];
    return `
      <div class="force-rung ${count ? "active" : ""} ${key === "leap" ? "force-rung-leap" : ""}" data-force="${key}">
        <span class="force-index">${level.index}</span>
        <div><strong>${level.name}</strong><small>${level.short}</small></div>
        <b aria-label="${count} answers">${count}</b>
      </div>`;
  };
  obligationEls.ladder.innerHTML = `
    <div class="force-branch force-branch-human">
      ${lowerLevels.map(rung).join("")}
    </div>
    <div class="ought-gap" role="separator">
      <span>The missing ought</span>
      <small>More pressure does not automatically create universal authority.</small>
    </div>
    <div class="force-branch force-branch-claim">
      ${upperLevels.map(rung).join("")}
    </div>`;
}

function renderObligationQuestion({ scroll = true } = {}) {
  const question = OBLIGATION_QUESTIONS[obligationState.index];
  const selectedId = obligationState.answers[question.id];
  const number = obligationState.index + 1;
  obligationEls.phase.textContent = question.phase;
  obligationEls.progress.textContent = `${number} / ${OBLIGATION_QUESTIONS.length}`;
  obligationEls.progressBar.style.width = `${(number / OBLIGATION_QUESTIONS.length) * 100}%`;
  obligationEls.number.textContent = String(number).padStart(2, "0");
  obligationEls.axis.textContent = question.axis;
  obligationEls.prompt.textContent = question.prompt;
  obligationEls.context.textContent = question.context;
  obligationEls.assumptions.textContent = question.assumptions;
  obligationEls.scope.textContent = question.scope;
  obligationEls.plain.textContent = question.guide.plain;
  obligationEls.separate.textContent = question.guide.separate;
  obligationEls.reveal.textContent = question.guide.reveal;
  obligationEls.why.textContent = question.why;
  obligationEls.explanation.open = false;
  obligationEls.back.disabled = obligationState.index === 0;
  obligationEls.back.classList.toggle("invisible-control", obligationState.index === 0);
  obligationEls.choices.innerHTML = question.choices
    .map(
      (choice, index) => `
        <button class="choice-button obligation-choice ${selectedId === choice.id ? "selected" : ""}" type="button" role="radio" aria-checked="${selectedId === choice.id}" data-choice="${choice.id}">
          <span class="choice-key">${String.fromCharCode(65 + index)}</span>
          <span class="choice-copy"><strong>${choice.label}</strong><span>${choice.detail}</span></span>
          <span class="choice-arrow" aria-hidden="true">→</span>
        </button>`,
    )
    .join("");
  obligationEls.choices.querySelectorAll(".obligation-choice").forEach((button) => {
    button.addEventListener("click", () => selectObligationAnswer(question.id, button.dataset.choice));
  });
  renderForceMap();
  if (scroll) window.scrollTo({ top: obligationEls.workspace.offsetTop - 82, behavior: "smooth" });
}

function selectObligationAnswer(questionId, choiceId) {
  obligationState.answers[questionId] = choiceId;
  renderForceMap();
  window.setTimeout(() => {
    if (obligationState.index >= OBLIGATION_QUESTIONS.length - 1) {
      showObligationResults();
      return;
    }
    obligationState.index += 1;
    renderObligationQuestion();
  }, 140);
}

function renderBridgeReport(gaps) {
  const target = document.querySelector("#bridgeReport");
  if (!gaps.length) {
    target.innerHTML = `
      <p class="no-final-tensions">No direct conflict appeared between your claim, cases, and final source. This means your labels stayed aligned inside this test; it does not prove that every premise is true.</p>`;
    return;
  }
  target.innerHTML = gaps
    .map(
      (gap) => `
        <article class="final-tension ${gap.severity}">
          <span class="severity">${gap.severity === "high" ? "Major missing step" : "Needs another bridge"}</span>
          <h3>${gap.title}</h3>
          <p>${gap.detail}</p>
        </article>`,
    )
    .join("");
}

function renderAnswerPath() {
  document.querySelector("#obligationAnswerGrid").innerHTML = OBLIGATION_QUESTIONS.map((question, index) => {
    const choice = obligationChoice(question.id);
    const level = FORCE_LEVELS[choice.level];
    return `
      <article class="obligation-answer-card ${choice.level === "leap" ? "answer-card-leap" : ""}">
        <span>${String(index + 1).padStart(2, "0")} · ${level.name}</span>
        <h3>${question.axis}</h3>
        <strong>${choice.label}</strong>
        <p>${choice.interpretation}</p>
      </article>`;
  }).join("");
}

function showObligationResults() {
  const diagnosis = obligationDiagnosis();
  obligationEls.workspace.classList.add("hidden");
  obligationEls.results.classList.remove("hidden");
  obligationEls.resultMapMount.append(obligationEls.forceMap);
  obligationEls.forceMap.classList.add("result-force-map");
  renderForceMap();

  document.querySelector("#obligationResultTitle").textContent = diagnosis.title;
  document.querySelector("#obligationResultSummary").textContent = diagnosis.summary;
  document.querySelector("#supportedCeiling").textContent = diagnosis.ceiling;
  document.querySelector("#supportedCeilingCopy").textContent = diagnosis.ceilingCopy;
  document.querySelector("#universalStatus").textContent = diagnosis.universal;
  document.querySelector("#universalStatusCopy").textContent = diagnosis.universalCopy;
  document.querySelector("#leapCount").textContent = `${diagnosis.leapCount} / ${OBLIGATION_QUESTIONS.length}`;
  document.querySelector("#obligationConclusionCopy").textContent = diagnosis.conclusion;
  renderBridgeReport(diagnosis.gaps);
  renderAnswerPath();
  window.scrollTo({ top: obligationEls.results.offsetTop - 70, behavior: "smooth" });
}

function resetObligationTest() {
  obligationState.answers = {};
  obligationState.index = 0;
  obligationEls.results.classList.add("hidden");
  obligationEls.workspace.classList.remove("hidden");
  obligationEls.liveMapMount.append(obligationEls.forceMap);
  obligationEls.forceMap.classList.remove("result-force-map");
  renderObligationQuestion();
}

obligationEls.back.addEventListener("click", () => {
  if (obligationState.index === 0) return;
  obligationState.index -= 1;
  renderObligationQuestion();
});

document.querySelector("#resetObligationButton").addEventListener("click", () => {
  if (window.confirm("Reset every answer in the obligation test?")) resetObligationTest();
});

document.querySelector("#restartObligationButton").addEventListener("click", resetObligationTest);

renderObligationQuestion({ scroll: false });
