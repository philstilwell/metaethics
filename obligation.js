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
    name: "Additional foundation proposed",
    short: "The answer adds a standard beyond current social reaction.",
  },
  universal: {
    index: "!",
    name: "Approval-independent duty asserted",
    short: "The answer claims authority that survives rejection or changing approval.",
  },
};

const OBLIGATION_QUESTIONS = [
  {
    id: "meaning",
    phase: "Defining the claim",
    axis: "What does “obligated” mean?",
    prompt: "When you say that a community rule morally obligates everyone it reaches, which claim do you mean?",
    context:
      "Imagine a community with a deeply held rule. People strongly condemn anyone who breaks it. For now, no divine command, stance-independent moral fact, or rule required by reason has been established as part of the argument.",
    assumptions:
      "The rule is genuinely popular and socially enforced. This question asks what the word “obligated” adds beyond that description.",
    scope:
      "Choose the statement closest to what you mean. Do not yet argue that the rule itself is wise, kind, or harmful.",
    why: "This opening answer fixes the strength and reach of the claim that the later cases will test.",
    guide: {
      plain: "Are you reporting a social fact, giving practical advice, expressing a commitment, naming a conditional duty, or claiming authority that survives disapproval?",
      separate: "A person can have a powerful reason to obey without the rule having approval-independent authority over that person.",
      reveal: "Your answer establishes how far your use of “obligation” is meant to reach.",
    },
    choices: [
      {
        id: "universal",
        label: "The rule binds even people who reject it, cannot be caught, or stand outside the group",
        detail: "Its authority would survive disagreement, secrecy, changing public opinion, and the absence of any accepted role or agreement.",
        level: "universal",
        directGap: null,
        interpretation: "This defines an approval-independent claim. It is not yet marked mistaken; the remaining questions test what foundation, if any, supports authority that broad.",
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
        detail: "The statement describes a shared social code without claiming authority that survives rejection or a change in the community’s view.",
        level: "social",
        interpretation: "This clearly describes a social rule while leaving approval-independent moral authority unclaimed.",
      },
      {
        id: "commitment",
        label: "It expresses a value I support and want other people to share",
        detail: "I am voicing a commitment and inviting agreement rather than reporting an authority created independently of anyone’s values.",
        level: "commitment",
        interpretation: "This grounds the demand in an openly stated human commitment and does not claim that the commitment creates authority over every person.",
      },
    ],
  },
  {
    id: "secret",
    phase: "Removing the audience",
    axis: "Case — the unheard song",
    prompt: "If the town’s disapproval is the only stated basis for its ban, what does that basis establish when nobody discovers the act?",
    context:
      "A town forbids the funeral songs of an expelled minority. Lio quietly sings one of those songs at his mother’s grave inside a soundproof memorial room. No recording exists. Nobody will ever learn what happened, and the act changes no later event.",
    assumptions:
      "The town would strongly condemn Lio if it knew. In fact, no one discovers the act, so he faces no shame, exclusion, punishment, or effect on his reputation. Lio’s own private commitments are not specified.",
    scope:
      "Ask what follows from the town’s disapproval itself. Do not add a hidden audience or a supernatural observer.",
    why: "A secret act separates a standing social rule from the actual pressure created when other people react.",
    guide: {
      plain: "What follows from a standing social rule after every actual social reaction has been removed?",
      separate: "Violating a local rule, expecting punishment, following a private commitment, and violating an approval-independent duty are different claims.",
      reveal: "Your answer shows whether social acceptance defines wrongness, merely pressures behavior, or needs another standard.",
    },
    choices: [
      {
        id: "communityMakesWrong",
        label: "The standing social rule makes the song morally wrong even without discovery or reaction",
        detail: "The town’s settled disapproval is treated as enough, by itself, to create a duty that remains when no one can respond to the violation.",
        level: "universal",
        directGap: {
          id: "standing-code-authority",
          title: "A standing code was asked to create wider authority by itself",
          detail: "The premise establishes that the town has a rule. A further premise is needed to show why the rule binds someone independently of detection, reaction, or accepted membership.",
          severity: "high",
        },
        interpretation: "This moves directly from the existence of a standing social rule to approval-independent authority; within this test, that connection still needs support.",
      },
      {
        id: "localViolation",
        label: "It violates the town’s code, but that is the whole claim",
        detail: "The act is “wrong by this town’s rules” without being wrong for every person independently of those rules.",
        level: "social",
        interpretation: "This preserves a coherent local code without inflating it into approval-independent authority.",
      },
      {
        id: "noPressure",
        label: "No enforcement-based reason remains, although Lio might still have reasons of his own",
        detail: "Expected social reactions cannot influence this secret act. Private loyalty, identity, or commitment could still matter, but those reasons are not supplied by enforcement.",
        level: "pressure",
        interpretation: "This limits the conclusion carefully: discovery-dependent pressure is absent, while possible personal reasons remain open.",
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
        detail: "I oppose the town’s rule without claiming that my opposition reports an approval-independent moral fact.",
        level: "commitment",
        interpretation: "This answers the case through an explicit personal commitment rather than hidden approval-independent authority.",
      },
    ],
  },
  {
    id: "towns",
    phase: "Changing the community",
    axis: "Case — the two bridge towns",
    prompt: "When two equally supported communities adopt opposite rules, what can community approval alone establish?",
    context:
      "Two towns share one bridge and face identical corruption. Eastbridge requires citizens to expose a corrupt official. Westbridge condemns disclosure as betrayal. The evidence, risks, harms, and likely results are otherwise the same.",
    assumptions:
      "Each rule has equal support, history, and enforcement. Only the community’s accepted rule changes; every other relevant fact is held fixed.",
    scope:
      "Decide what community approval alone can establish when two communities demand opposite actions in matching circumstances. A context-relative rule and a rule that binds merely because of location are not the same claim.",
    why: "Opposite norms test whether approval identifies local codes or also creates authority over every person placed under each code.",
    guide: {
      plain: "Does living under a town’s rule make that opposite rule binding solely because the town approves it?",
      separate: "Two statements can both be true—“Eastbridge requires disclosure” and “Westbridge forbids it”—without either town’s approval creating moral authority over everyone there.",
      reveal: "Your answer shows how you handle conflicts between equally supported social codes.",
    },
    choices: [
      {
        id: "bothUniversal",
        label: "Each town’s approval makes its opposite rule morally binding on every person located there",
        detail: "Disclosure becomes a duty in Eastbridge and a forbidden act in Westbridge solely because each town strongly accepts and enforces its own code.",
        level: "universal",
        directGap: {
          id: "location-authority",
          title: "Location was asked to create opposite duties by itself",
          detail: "The case establishes two opposite local codes. Another premise is needed to show why merely being under one town’s approval gives that code moral authority over every person there.",
          severity: "high",
        },
        interpretation: "This is a location-relative authority claim, not a universal truth claim. It still needs an account of why local approval binds every person within the location.",
      },
      {
        id: "localCodes",
        label: "Each town has a local code, but approval alone gives neither code wider authority",
        detail: "The disagreement shows which rule each group uses, not which rule binds everyone independently of group acceptance.",
        level: "social",
        interpretation: "This treats the rules as coherent local conventions without claiming that approval itself gives either rule authority over every person.",
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
        detail: "The safest action changes with enforcement, even though the towns’ wider authority has not been established.",
        level: "pressure",
        interpretation: "This explains compliance through expected social costs rather than approval-independent obligation.",
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
    prompt: "What does this reformer’s case show about treating current approval as the whole basis of moral status?",
    context:
      "A colony once prohibited girls from studying engineering. Asha secretly taught them and was condemned by nearly everyone. Twenty years later, the colony ended the rule and gave Asha its highest medal for doing what it had once forbidden.",
    assumptions:
      "At the time of Asha’s defiance, the rule was clear, popular, and enforced. She did not know that public opinion would later change.",
    scope:
      "State exactly what can be said about Asha at the time she acted, not merely how later citizens remember her. You may describe a social change, express a commitment, or add a further standard.",
    why: "Reform tests whether current approval is only a social fact or also your complete test of moral status.",
    guide: {
      plain: "Are you describing two social codes, endorsing Asha, or judging the old code by another standard?",
      separate: "Later praise can change reputation and the current code without automatically proving an earlier approval-independent duty.",
      reveal: "Your answer shows whether current approval is your whole description or whether another standard does the critical work.",
    },
    choices: [
      {
        id: "wrongThen",
        label: "Asha violated the code then and is honored under the new code now; that is the whole claim",
        detail: "The description tracks the colony’s social rules at each time without adding an approval-independent judgment that the old rule was morally mistaken.",
        level: "social",
        interpretation: "This is a consistent social-code answer. It records a change in rules without claiming that the former community violated a further standard.",
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
        interpretation: "This criticizes the rule from standards the community already claimed, without yet establishing an approval-independent duty.",
      },
      {
        id: "futureProof",
        label: "The later medal proves that Asha’s earlier action already had approval-independent moral authority",
        detail: "The community’s later approval is treated as enough, by itself, to prove the act’s moral status at a time when that approval did not yet exist.",
        level: "universal",
        directGap: {
          id: "future-approval",
          title: "Later approval was used as proof of an earlier duty",
          detail: "The medal establishes how the colony judges Asha later. Another premise is needed to show why that later reaction proves an approval-independent status at the earlier time.",
          severity: "medium",
        },
        interpretation: "This asks a later social reaction to prove an earlier approval-independent status without explaining how the later attitude reaches backward.",
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
      "Ask whether disapproval itself creates an obligation for a nonmember. Courtesy, safety, gratitude, and approval-independent authority should be kept separate.",
    why: "An outsider tests whether a group’s authority extends beyond agreement, membership, and accepted roles.",
    guide: {
      plain: "Does being surrounded by people who condemn an act make their rule morally binding on you?",
      separate: "It may be wise or courteous to comply even when the community lacks authority over a nonmember.",
      reveal: "Your answer identifies the reach you think a community rule can have over nonmembers.",
    },
    choices: [
      {
        id: "disapprovalBinds",
        label: "The colony’s strong disapproval makes refusal morally wrong even for this nonmember",
        detail: "The community’s settled reaction is treated as enough, by itself, to create a duty for an outsider who never accepted or knowingly benefited under the rule.",
        level: "universal",
        directGap: {
          id: "outsider-scope",
          title: "A local reaction was extended to a nonmember",
          detail: "The traveler made no agreement and the case supplies no harm beyond offense. A separate premise is needed to explain why the colony’s disapproval has moral authority over this outsider.",
          severity: "medium",
        },
        interpretation: "This extends local disapproval into authority over a nonmember without an agreement or another stated foundation.",
      },
      {
        id: "avoidConflict",
        label: "The traveler should probably kneel to avoid conflict and exclusion",
        detail: "Compliance is practical advice based on likely social costs, not proof that the custom has approval-independent authority.",
        level: "pressure",
        interpretation: "This recognizes a practical social reason while withholding a claim of approval-independent duty.",
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
        interpretation: "This makes respectful conduct a chosen value rather than an approval-independent requirement created by offense.",
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
        level: "universal",
        directGap: {
          id: "force-authority",
          title: "Certain punishment was treated as moral authority",
          detail: "Perfect enforcement explains why refusal is dangerous. It does not explain why the ruler is entitled to obedience unless another account of legitimacy is added.",
          severity: "high",
        },
        interpretation: "This turns superior power into moral authority without supplying the further reason that power should be obeyed.",
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
        interpretation: "This supplies a clear basis for resistance without disguising a commitment as an established approval-independent fact.",
      },
    ],
  },
  {
    id: "finalSource",
    phase: "Naming the highest authority",
    axis: "The final bridge",
    prompt: "Given only the stated fact of strong community disapproval, which conclusion follows without adding another premise?",
    context:
      "For this question, no divine command, stance-independent moral fact, built-in purpose, rule required by reason, or prior agreement has been established as a premise. The stated fact is only that a community strongly supports a rule and condemns violations.",
    assumptions:
      "The social reaction is real and may influence behavior. The question is what follows from that reaction alone. Other foundations may exist, but they must be added and defended rather than silently assumed.",
    scope:
      "Choose the strongest conclusion that actually follows from social disapproval alone. If you add another foundation, say so openly.",
    why: "This final answer identifies whether your conclusion stays within the evidence or crosses the missing “ought” without support.",
    guide: {
      plain: "What can “we strongly disapprove” establish without adding another premise about why that reaction has authority?",
      separate: "A shared rule can be important, useful, and strongly enforced without thereby becoming an approval-independent duty.",
      reveal: "Your answer sets the final ceiling of the obligation claim.",
    },
    choices: [
      {
        id: "universalFromDisapproval",
        label: "An approval-independent moral duty follows from collective disapproval itself",
        detail: "When a community’s opposition is strong and settled enough, that reaction alone creates a duty that survives secrecy, rejection, nonmembership, and later changes in opinion.",
        level: "universal",
        directGap: {
          id: "missing-ought",
          title: "The final conclusion crosses the missing “ought”",
          detail: "The premise says that a community disapproves. The conclusion says that the rule has authority beyond that approval. A further reason is needed to connect those statements.",
          severity: "high",
        },
        interpretation: "This moves directly from a fact about attitudes to approval-independent authority without supplying an additional premise.",
      },
      {
        id: "socialCodeOnly",
        label: "A real social code follows, but no approval-independent duty follows",
        detail: "The community has values, expectations, and institutions it can defend without claiming that its disapproval alone creates wider moral authority.",
        level: "social",
        interpretation: "This is a coherent and candid social-code conclusion that does not claim more authority than its source supplies.",
      },
      {
        id: "conditionalMembers",
        label: "A limited obligation could follow if fair participation or reciprocity were added",
        detail: "People who knowingly accept a role or fairly benefit from a system may acquire duties, but those conditions are additional premises and do not bind everyone automatically.",
        level: "conditional",
        interpretation: "This proposes a conditional obligation and accepts that its reach depends on further facts about membership and fairness.",
      },
      {
        id: "practicalReasons",
        label: "Only practical reasons to avoid social costs follow",
        detail: "People may comply to avoid shame, exclusion, or punishment without accepting the community’s moral authority.",
        level: "pressure",
        interpretation: "This treats disapproval as an effective human pressure rather than a source of approval-independent duty.",
      },
      {
        id: "needBeyond",
        label: "An approval-independent duty would require a further foundation beyond disapproval",
        detail: "Harm, rights, rational consistency, idealized agreement, divine authority, or another proposed foundation must be added and defended separately.",
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

function selectedObligationAnswers() {
  return OBLIGATION_QUESTIONS.flatMap((question) => {
    const choice = obligationChoice(question.id);
    return choice ? [{ question, choice }] : [];
  });
}

function collectDirectGaps() {
  return selectedObligationAnswers().flatMap(({ question, choice }) =>
    choice.directGap
      ? [{ ...choice.directGap, questionId: question.id, questionAxis: question.axis, answer: choice.label }]
      : [],
  );
}

function collectBridgeInvocations() {
  return selectedObligationAnswers()
    .filter(({ choice }) => choice.level === "bridge")
    .map(({ question, choice }) => ({
      id: `bridge-${question.id}`,
      questionId: question.id,
      questionAxis: question.axis,
      title: choice.label,
      detail: choice.interpretation,
    }));
}

function detectPathChanges() {
  const opening = obligationState.answers.meaning;
  const final = obligationState.answers.finalSource;
  if (!opening || !final) return [];

  const broadOpening = opening === "universal";
  const broadFinal = final === "universalFromDisapproval";
  const narrowedFinal = ["socialCodeOnly", "conditionalMembers", "practicalReasons"].includes(final);
  const changes = [];

  if (broadOpening && narrowedFinal) {
    changes.push({
      id: "scope-narrowed",
      title: "Your final answer narrowed the opening claim",
      detail: "You began with a duty meant to survive rejection and nonmembership, then ended with a social, conditional, or practical conclusion. That may be a considered revision rather than an inconsistency.",
    });
  } else if (!broadOpening && broadFinal) {
    changes.push({
      id: "scope-broadened",
      title: "Your final answer broadened the opening claim",
      detail: "Your opening answer did not claim approval-independent authority, but your final answer did. The direct-inference note identifies the additional premise that broader conclusion needs.",
    });
  }

  return changes;
}

function obligationDiagnosis() {
  const finalChoice = obligationChoice("finalSource");
  const counts = forceCounts();
  const directGaps = collectDirectGaps();
  const bridges = collectBridgeInvocations();
  const pathChanges = detectPathChanges();
  const shared = {
    counts,
    directGapCount: directGaps.length,
    directGaps,
    bridges,
    pathChanges,
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
      universalCopy: "No final answer has been recorded.",
      conclusionHeading: "The test is still in progress.",
      conclusion: "The test is still in progress.",
    };
  }

  const diagnoses = {
    universal: {
      key: "universal",
      title: "The missing “ought” remains.",
      summary: "Your final answer asks social disapproval to do more than describe a group’s attitudes, rules, and power: it asks that reaction to create authority that survives rejection.",
      ceiling: "Approval-independent duty asserted",
      ceilingCopy: "This is the category of your final answer, not a score or proof that the claim succeeds.",
      universal: "Needs another premise",
      universalCopy: "The stated facts establish a shared demand and possible social costs, but not wider authority by themselves.",
      conclusionHeading: "A stronger label cannot supply the missing authority.",
      conclusion: "A community can insist, condemn, and punish. To establish a duty that remains when those reactions are rejected or removed, the argument must add and defend another source of authority.",
    },
    social: {
      key: "social",
      title: "A social code, clearly labeled.",
      summary: "Your final conclusion stays within what community approval can establish by itself: a real human rule that a group supports and may enforce.",
      ceiling: "Shared social code",
      ceilingCopy: "This is the category of your final answer: a group rule, not an overall score for the seven answers.",
      universal: "Follows within scope",
      universalCopy: "A community’s approval is enough to establish that the community has an accepted code.",
      conclusionHeading: "A social code can be coherent without claiming wider authority.",
      conclusion: "This position can be coherent as a non-realist social system. It presents “our rule” as a real social fact while leaving any approval-independent duty to a separate argument.",
    },
    conditional: {
      key: "conditional",
      title: "A conditional duty has been proposed.",
      summary: "Your final answer adds participation, roles, fair benefits, or reciprocity. Those conditions may matter, but they were not part of the final question’s starting facts.",
      ceiling: "Conditional duty",
      ceilingCopy: "This is the category of your final answer: a duty that applies only when added conditions are met.",
      universal: "Depends on added conditions",
      universalCopy: "The argument must establish fair participation or reciprocity and identify who actually meets those conditions.",
      conclusionHeading: "Conditional duties need clear entry conditions and limits.",
      conclusion: "A role-based duty may be substantial and coherent. Its authority comes from the proposed conditions, not from community disapproval alone, and it does not automatically extend to outsiders.",
    },
    pressure: {
      key: "pressure",
      title: "A practical reason to comply.",
      summary: "Your final answer explains behavior through shame, exclusion, conflict, or punishment rather than through approval-independent authority.",
      ceiling: "Practical social reason",
      ceilingCopy: "This is the category of your final answer: advice about consequences, not an overall score.",
      universal: "Follows if costs apply",
      universalCopy: "The reason changes when discovery, punishment, or the person’s concern about those costs changes.",
      conclusionHeading: "Pressure explains compliance, not authority.",
      conclusion: "Social pressure can be powerful enough to control a life. Its practical force should be taken seriously without treating intensity as proof of an approval-independent duty.",
    },
    bridge: {
      key: "bridge",
      title: "A further foundation is needed.",
      summary: "Your final answer recognizes that a wider duty would require another foundation—such as harm, rights, rational consistency, idealized agreement, or divine authority—rather than current community reaction alone.",
      ceiling: "Additional foundation required",
      ceilingCopy: "This is the category of your final answer: it identifies an open argument rather than claiming that the argument is complete.",
      universal: "Open argument",
      universalCopy: "Naming a possible foundation is the beginning of an explanation, not yet proof that it has the claimed authority.",
      conclusionHeading: "The missing step has been named, not yet crossed.",
      conclusion: "This path identifies the philosophical work still required. Any approval-independent system must explain why its added foundation has authority and who falls within its scope.",
    },
  };

  const diagnosis = { ...shared, ...diagnoses[finalChoice.level] };
  if (directGaps.length && finalChoice.level !== "universal") {
    diagnosis.summary += ` ${directGaps.length} earlier ${directGaps.length === 1 ? "answer still makes" : "answers still make"} a direct move from a social fact to wider authority.`;
  }
  return diagnosis;
}

function buildObligationAIProbePrompt() {
  const diagnosis = obligationDiagnosis();
  const answerSummary = selectedObligationAnswers().map(({ question, choice }, index) => [
    `${index + 1}. ${question.axis}`,
    `Question: ${question.prompt}`,
    `Full case or setup: ${question.context}`,
    `Facts held fixed: ${question.assumptions}`,
    `Scope of the question: ${question.scope}`,
    `Selected answer: ${choice.label}.`,
    `What that answer means: ${choice.detail}`,
    `Survey category: ${FORCE_LEVELS[choice.level].name}.`,
    `What the answer establishes in this test: ${choice.interpretation}`,
  ].join("\n"));
  const gapSummary = diagnosis.directGaps.length
    ? diagnosis.directGaps.map((gap, index) => `${index + 1}. ${gap.title}\n   ${gap.detail}`).join("\n")
    : "No selected answer made a direct social-fact-to-wider-duty inference as coded by this lab.";
  const bridgeSummary = diagnosis.bridges.length
    ? diagnosis.bridges.map((bridge, index) => `${index + 1}. ${bridge.title}\n   ${bridge.detail}`).join("\n")
    : "No additional foundation was explicitly invoked in the case answers.";
  const pathSummary = diagnosis.pathChanges.length
    ? diagnosis.pathChanges.map((change, index) => `${index + 1}. ${change.title}\n   ${change.detail}`).join("\n")
    : "The opening and final answers did not create a coded change in the scope of the claim.";

  return [
    "Act as a careful, neutral interviewer helping me examine an argument about moral obligation.",
    "",
    "IMPORTANT RULES",
    "- Ask one question at a time and wait for my answer.",
    "- Use plain language and define any philosophy term before using it.",
    "- Do not assume that universal, objective, stance-independent, mind-independent, and approval-independent all mean the same thing. Ask me which claim I intend.",
    "- Do not treat moral non-realism as the same as cultural relativism or as the view that only social disapproval matters.",
    "- Separate a personal commitment, a shared rule, a practical reason, a threat, a role-based duty, and an approval-independent duty.",
    "- Treat each case’s stated facts as fixed. If I add a fact or foundation, name it explicitly.",
    "- A proposed bridge such as harm, fairness, rational consistency, idealized agreement, or divine authority is not an error. Ask why it has authority and who it binds.",
    "- A flagged direct inference is a request for the missing premise, not proof that my conclusion is false.",
    "- Allow me to say that I revised or narrowed my view during the test.",
    "",
    "WHAT THIS LAB TESTED",
    "- It tested one narrow inference: whether current community disapproval is enough by itself to create a duty whose authority survives rejection, secrecy, nonmembership, or changing approval.",
    "- It did not test every form of moral realism, anti-realism, constructivism, contractualism, relativism, or expressivism.",
    "- Its seven categories are different kinds of basis, not a ranking from weak to strong and not a personality score.",
    "- A direct inference was flagged only when my selected answer explicitly treated a social fact as sufficient for wider authority without another premise.",
    "- The lab cannot prove that any proposed foundation succeeds or fails. It can only expose which premise must do the work.",
    "",
    "MY RESULT",
    `Final answer category: ${diagnosis.ceiling}.`,
    `Assessment under the stated assumptions: ${diagnosis.universal}.`,
    `Direct inferences needing support: ${diagnosis.directGapCount}.`,
    `Summary: ${diagnosis.summary}`,
    "",
    "MY SEVEN ANSWERS",
    ...answerSummary,
    "",
    "DIRECT INFERENCES THE LAB FLAGGED",
    gapSummary,
    "",
    "ADDITIONAL FOUNDATIONS I INVOKED",
    bridgeSummary,
    "",
    "CHANGES BETWEEN MY OPENING AND FINAL CLAIM",
    pathSummary,
    "",
    "HOW TO INTERVIEW ME",
    "1. Start with the strongest flagged direct inference. If none was flagged, start with the first additional foundation I invoked. If neither exists, ask what practical purpose I want my social code to serve.",
    "2. State the premise and conclusion you are comparing in two short sentences.",
    "3. Ask me for the missing connecting premise rather than supplying one for me.",
    "4. Test whether that premise is descriptive, practical, conditional, or approval-independent.",
    "5. Ask what would make the premise apply to a dissenter, an outsider, or an undetected act.",
    "6. If I invoke a foundation, ask why it has authority, what its limits are, and whether it depends on any values or agreements.",
    "7. At the end, report: my final claim, its scope, the premises supporting it, any openly accepted limits, and any step still undefended.",
    "",
    "Begin with a two-sentence explanation of what you will examine, followed by your first single question.",
  ].join("\n");
}

const obligationEls = {
  workspace: document.querySelector("#obligationLab"),
  results: document.querySelector("#obligationResults"),
  liveStatus: document.querySelector("#obligationLiveStatus"),
  phase: document.querySelector("#obligationPhase"),
  progress: document.querySelector("#obligationProgress"),
  progressTrack: document.querySelector("#obligationProgressTrack"),
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
  next: document.querySelector("#obligationNextButton"),
  forceMap: document.querySelector("#forceMapCard"),
  liveMapMount: document.querySelector("#liveForceMapMount"),
  resultMapMount: document.querySelector("#resultForceMapMount"),
  ladder: document.querySelector("#forceLadder"),
  mapBasis: document.querySelector("#forceMapBasis"),
};

function renderForceMap() {
  const counts = forceCounts();
  const answered = answeredObligationCount();
  const gapCount = collectDirectGaps().length;
  obligationEls.mapBasis.textContent = `${answered} of ${OBLIGATION_QUESTIONS.length} answers classified · categories, not ranks · ${gapCount} direct ${gapCount === 1 ? "inference needs" : "inferences need"} support`;
  const lowerLevels = ["commitment", "social", "pressure", "sanction", "conditional"];
  const upperLevels = ["bridge", "universal"];
  const rung = (key) => {
    const level = FORCE_LEVELS[key];
    const count = counts[key];
    return `
      <div class="force-rung ${count ? "active" : ""}" data-force="${key}">
        <span class="force-index">${level.index}</span>
        <div><strong>${level.name}</strong><small>${level.short}</small></div>
        <b aria-hidden="true">${count}</b>
      </div>`;
  };
  obligationEls.ladder.innerHTML = `
    <div class="force-branch force-branch-human">
      <span class="force-group-label">Human sources and limited duties</span>
      <div class="force-source-grid">${lowerLevels.map(rung).join("")}</div>
    </div>
    <div class="ought-gap" role="separator">
      <span>A wider claim needs another premise</span>
      <small>More agreement, disapproval, or force does not automatically create approval-independent authority.</small>
    </div>
    <div class="force-branch force-branch-claim">
      <span class="force-group-label">Claims beyond current approval</span>
      <div class="force-source-grid force-source-grid-upper">${upperLevels.map(rung).join("")}</div>
    </div>`;
  const spokenCounts = Object.entries(FORCE_LEVELS)
    .filter(([key]) => counts[key])
    .map(([key, level]) => `${level.name}: ${counts[key]}`)
    .join("; ");
  obligationEls.ladder.setAttribute(
    "aria-label",
    `${answered} of ${OBLIGATION_QUESTIONS.length} answers classified. These categories are not ranked. ${spokenCounts || "No answers classified yet"}. ${gapCount} direct ${gapCount === 1 ? "inference needs" : "inferences need"} support.`,
  );
}

function preferredScrollBehavior() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function scrollToElement(element, offset) {
  window.scrollTo({ top: Math.max(0, element.offsetTop - offset), behavior: preferredScrollBehavior() });
}

function renderObligationQuestion({ scroll = true, announce = true } = {}) {
  const question = OBLIGATION_QUESTIONS[obligationState.index];
  const selectedId = obligationState.answers[question.id];
  const number = obligationState.index + 1;
  obligationEls.phase.textContent = question.phase;
  obligationEls.progress.textContent = `${number} / ${OBLIGATION_QUESTIONS.length}`;
  obligationEls.progressTrack.setAttribute("aria-valuenow", String(number));
  obligationEls.progressTrack.setAttribute("aria-valuetext", `Question ${number} of ${OBLIGATION_QUESTIONS.length}`);
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
  obligationEls.next.disabled = !selectedId;
  obligationEls.next.textContent = number === OBLIGATION_QUESTIONS.length ? "See my diagnostic →" : "Next question →";
  obligationEls.choices.innerHTML = `<legend class="visually-hidden">Choose one answer for question ${number}</legend>${question.choices
    .map(
      (choice, index) => `
        <label class="choice-button obligation-choice ${selectedId === choice.id ? "selected" : ""}">
          <input class="choice-radio" type="radio" name="obligation-answer-${question.id}" value="${choice.id}" ${selectedId === choice.id ? "checked" : ""}>
          <span class="choice-key">${String.fromCharCode(65 + index)}</span>
          <span class="choice-copy"><strong>${choice.label}</strong><span>${choice.detail}</span></span>
          <span class="choice-arrow" aria-hidden="true">→</span>
        </label>`,
    )
    .join("")}`;
  obligationEls.choices.querySelectorAll(".choice-radio").forEach((input) => {
    input.addEventListener("change", () => selectObligationAnswer(question.id, input.value));
  });
  renderForceMap();
  if (announce) obligationEls.liveStatus.textContent = `Question ${number} of ${OBLIGATION_QUESTIONS.length}: ${question.prompt}`;
  if (scroll) scrollToElement(obligationEls.workspace, 82);
}

function selectObligationAnswer(questionId, choiceId) {
  obligationState.answers[questionId] = choiceId;
  obligationEls.choices.querySelectorAll(".obligation-choice").forEach((label) => {
    label.classList.toggle("selected", label.querySelector(".choice-radio").checked);
  });
  obligationEls.next.disabled = false;
  renderForceMap();
  obligationEls.liveStatus.textContent = `Answer selected for question ${obligationState.index + 1}. Choose Next when ready.`;
}

function renderBridgeReport(diagnosis) {
  const target = document.querySelector("#bridgeReport");
  const directGapCopy = diagnosis.directGaps.length
    ? diagnosis.directGaps.map(
      (gap) => `
        <article class="final-tension ${gap.severity}">
          <span class="severity">${gap.severity === "high" ? "Direct inference gap" : "Missing connecting premise"}</span>
          <h3>${gap.title}</h3>
          <p>${gap.detail}</p>
        </article>`,
    ).join("")
    : '<p class="no-final-tensions">No selected answer directly treated a social fact as sufficient for wider authority. This does not prove every premise; it reports only the inferences coded in this lab.</p>';
  const bridgeCopy = diagnosis.bridges.length
    ? diagnosis.bridges.map((bridge) => `
        <article class="argument-note bridge-note">
          <span class="argument-note-label">Additional foundation proposed</span>
          <h3>${bridge.title}</h3>
          <p>${bridge.detail}</p>
        </article>`).join("")
    : '<p class="argument-empty">No answer explicitly added a foundation beyond current approval.</p>';
  const pathCopy = diagnosis.pathChanges.length
    ? diagnosis.pathChanges.map((change) => `
        <article class="argument-note path-note">
          <span class="argument-note-label">Scope change, not automatic incoherence</span>
          <h3>${change.title}</h3>
          <p>${change.detail}</p>
        </article>`).join("")
    : '<p class="argument-empty">Your opening and final answers did not create a coded change in the claim’s scope.</p>';
  target.innerHTML = `
    <section class="argument-report-group" aria-labelledby="directGapHeading">
      <h3 id="directGapHeading">Direct inferences needing support</h3>
      <div class="argument-report-list">${directGapCopy}</div>
    </section>
    <section class="argument-report-group" aria-labelledby="bridgeUseHeading">
      <h3 id="bridgeUseHeading">Additional foundations you invoked</h3>
      <div class="argument-report-list">${bridgeCopy}</div>
    </section>
    <section class="argument-report-group" aria-labelledby="scopeChangeHeading">
      <h3 id="scopeChangeHeading">Change between opening and final scope</h3>
      <div class="argument-report-list">${pathCopy}</div>
    </section>`;
}

function renderAnswerPath() {
  document.querySelector("#obligationAnswerGrid").innerHTML = OBLIGATION_QUESTIONS.map((question, index) => {
    const choice = obligationChoice(question.id);
    const level = FORCE_LEVELS[choice.level];
    const status = choice.directGap ? "Needs another premise" : choice.level === "bridge" ? "Additional foundation proposed" : "No direct inference gap coded";
    return `
      <article class="obligation-answer-card ${choice.directGap ? "answer-card-gap" : ""} ${choice.level === "bridge" ? "answer-card-bridge" : ""}">
        <span>${String(index + 1).padStart(2, "0")} · ${level.name} · ${status}</span>
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
  document.querySelector("#directGapCount").textContent = String(diagnosis.directGapCount);
  document.querySelector("#obligationConclusionHeading").textContent = diagnosis.conclusionHeading;
  document.querySelector("#obligationConclusionCopy").textContent = diagnosis.conclusion;
  document.querySelector("#obligationAIProbePrompt").value = buildObligationAIProbePrompt();
  renderBridgeReport(diagnosis);
  renderAnswerPath();
  obligationEls.liveStatus.textContent = `Diagnostic ready: ${diagnosis.title}`;
  scrollToElement(obligationEls.results, 70);
}

function resetObligationTest() {
  obligationState.answers = {};
  obligationState.index = 0;
  obligationEls.results.classList.add("hidden");
  obligationEls.workspace.classList.remove("hidden");
  obligationEls.liveMapMount.append(obligationEls.forceMap);
  obligationEls.forceMap.classList.remove("result-force-map");
  renderObligationQuestion({ announce: true });
}

obligationEls.back.addEventListener("click", () => {
  if (obligationState.index === 0) return;
  obligationState.index -= 1;
  renderObligationQuestion();
});

obligationEls.next.addEventListener("click", () => {
  const question = OBLIGATION_QUESTIONS[obligationState.index];
  if (!obligationState.answers[question.id]) return;
  if (obligationState.index >= OBLIGATION_QUESTIONS.length - 1) {
    showObligationResults();
    return;
  }
  obligationState.index += 1;
  renderObligationQuestion();
});

document.querySelector("#resetObligationButton").addEventListener("click", () => {
  if (!answeredObligationCount() || window.confirm("Reset every answer in the obligation test?")) resetObligationTest();
});

document.querySelector("#restartObligationButton").addEventListener("click", resetObligationTest);

document.querySelector("#copyObligationPromptButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const prompt = document.querySelector("#obligationAIProbePrompt");
  const status = document.querySelector("#obligationPromptCopyStatus");
  try {
    await navigator.clipboard.writeText(prompt.value);
    button.textContent = "AI prompt copied";
    status.textContent = "Ready to paste into the AI service you choose.";
  } catch {
    prompt.focus();
    prompt.select();
    button.textContent = "Select and copy";
    status.textContent = "Automatic copying is unavailable. The full prompt is selected for manual copying.";
  }
  window.setTimeout(() => {
    button.textContent = "Copy AI prompt";
    status.textContent = "The prompt contains your answers but no name or account information.";
  }, 2400);
});

renderObligationQuestion({ scroll: false, announce: false });
