"use strict";

const MEANING_FAMILIES = {
  realism: {
    index: "01",
    name: "Independent moral fact",
    theory: "Moral realism",
    group: "fact",
    resultPhrase: "a claim about an independent moral fact",
    short: "The sentence describes a moral status that is not created by anyone’s approval or chosen standard.",
    note: "This is the comparison view in a mostly non-realist lab. Realists disagree about whether moral facts are natural, non-natural, or grounded in other facts.",
  },
  error: {
    index: "02",
    name: "Failed fact claim",
    theory: "Moral error theory",
    group: "fact",
    resultPhrase: "a fact-like claim that the world does not make true",
    short: "The sentence tries to report an objective moral status, but no such status exists, so the literal claim fails.",
    note: "Error theorists treat ordinary moral assertions as truth-directed but systematically untrue. They still disagree about what language should replace or preserve them.",
  },
  express: {
    index: "03",
    name: "Commitment or plan",
    theory: "Expressivism",
    group: "stance",
    resultPhrase: "an expression of commitment and a plan for action",
    short: "The sentence primarily condemns, endorses a norm, or expresses a plan rather than detecting a special property.",
    note: "Modern expressivism is more than saying “boo.” It can treat moral judgments as sophisticated commitments, plans, and accepted norms that support reasoning.",
  },
  relative: {
    index: "04",
    name: "Actual standard applied",
    theory: "Standard-relative view",
    group: "standard",
    resultPhrase: "a claim made true or false by an actual standard",
    short: "The sentence says an action violates the standards of a named person or group, so whose standard is used must be specified.",
    note: "Relativism is not automatically anti-realism. A relativist claim can still be treated as an ordinary truth claim about what a specified standard permits.",
  },
  construct: {
    index: "05",
    name: "Reasoned construction",
    theory: "Constructivism",
    group: "standard",
    resultPhrase: "a conclusion produced by a specified process of reasoning",
    short: "The sentence reports what follows from a fair or rational procedure, not merely what people currently approve.",
    note: "Constructivists disagree about the correct procedure and about whether their view counts as realism, anti-realism, or an alternative to that division.",
  },
  fiction: {
    index: "06",
    name: "Useful moral fiction",
    theory: "Moral fictionalism",
    group: "tool",
    resultPhrase: "a useful fiction or practical shorthand",
    short: "The speaker knowingly talks as if moral properties existed because the familiar language serves a practical purpose.",
    note: "Fictionalists must explain when the pretense is useful, whether it can be honest, and what happens when its costs become greater than its benefits.",
  },
};

const MEANING_FAMILY_ORDER = ["realism", "error", "express", "relative", "construct", "fiction"];

const MEANING_GROUPS = [
  { id: "fact", name: "Fact-like readings", families: ["realism", "error"] },
  { id: "stance", name: "Practical stance", families: ["express"] },
  { id: "standard", name: "Standards and procedures", families: ["relative", "construct"] },
  { id: "tool", name: "Deliberate device", families: ["fiction"] },
];

function meaningChoices(values) {
  return MEANING_FAMILY_ORDER.map((family) => ({ id: family, family, ...values[family] }));
}

const OPENING_QUESTION = {
  id: "opening",
  phase: "Starting meaning",
  axis: "Case — the sealed greenhouse",
  prompt: "When Sera says, “What the company is doing is morally wrong,” what do you take her sentence to be doing?",
  context:
    "A company grows short-lived creatures called motes that can feel fear and pain. It uses them in sealed greenhouse trials, deletes every record, and ends each creature after two days. The practice is legal, profitable, and praised by the public. After learning every available fact, Sera says, “What the company is doing is morally wrong.”",
  assumptions:
    "Sera understands the physical facts and speaks sincerely. The question does not ask whether you agree with her verdict. Assume she uses the word “wrong” in the same basic way you normally would.",
  scope:
    "Choose the clearest account of what her sentence means or does. Separate the sentence’s function from the separate question of whether its verdict about the greenhouse is correct.",
  why: "Your opening answer selects a deeper route while every route continues to offer all six interpretations.",
  guide: {
    plain: "If someone asked what Sera added by using the word “wrong,” what would you say she added?",
    separate: "Condemning the practice, reporting a fact, applying a standard, and speaking in useful shorthand can lead to the same outward verdict while meaning different things.",
    reveal: "This answer sets your starting account of moral language. It does not yet prove that the associated philosophical theory is correct.",
  },
  choices: meaningChoices({
    realism: {
      label: "She is stating that the practice has a real moral status that no person or group creates",
      detail: "Her sentence is meant to describe something that can be true even if every person approves of the greenhouse and no society has a rule against it.",
      interpretation: "This treats the sentence as a truth-directed claim about approval-independent moral reality, which is the central realist reading used in this lab.",
    },
    error: {
      label: "She is trying to state that kind of moral fact, but no action actually has such a status",
      detail: "Her sentence aims to report objective wrongness, yet the world contains no property that could make this ordinary moral claim literally true.",
      interpretation: "This accepts the fact-like meaning of ordinary moral language while denying that any positive moral assertion succeeds, the core error-theory combination.",
    },
    express: {
      label: "She is condemning the practice and committing herself to a rule or plan against it",
      detail: "The sentence’s main work is practical: it expresses opposition and supports not doing, allowing, or encouraging this kind of treatment.",
      interpretation: "This treats moral judgment primarily as an expression of a practical attitude, plan, or accepted norm rather than a report of a special moral property.",
    },
    relative: {
      label: "She is saying that the practice violates a particular person’s or group’s actual standards",
      detail: "The sentence can be true relative to Sera’s standards, or another named code, without claiming that the same verdict holds under every possible standard.",
      interpretation: "This gives the sentence truth conditions supplied by an actual standard and therefore requires the speaker to make clear whose standard controls the claim.",
    },
    construct: {
      label: "She is saying that the practice would be rejected by a specified fair process of reasoning",
      detail: "The verdict is fixed by what suitably informed and fairly situated reasoners would choose, not by current popularity or a separate moral realm.",
      interpretation: "This treats the verdict as constructed through a procedure of reasoning or agreement; the procedure and its authority still need to be defended.",
    },
    fiction: {
      label: "She is deliberately speaking as if moral wrongness were real because that language is useful",
      detail: "She does not literally believe in a property of moral wrongness, but familiar moral language may motivate protection and coordinate opposition efficiently.",
      interpretation: "This preserves realist-sounding moral language as a practical fiction while withholding literal belief in the moral properties the sentence appears to mention.",
    },
  }),
};

const VALUE_CHANGE_QUESTION = {
  id: "valueChange",
  phase: "Changing the speaker",
  axis: "Case — the overnight reversal",
  prompt: "A device reverses Sera’s values while every fact about the greenhouse stays the same. What changed between her two moral judgments?",
  context:
    "A neural device safely rewrites Sera’s strongest preferences overnight. Yesterday she opposed the greenhouse and called it morally wrong. Today she remembers every fact and every argument but sincerely approves of it and says it is not morally wrong. No new evidence appeared, and nobody reasoned better or worse during the change.",
  assumptions:
    "Only Sera’s practical attitudes and priorities changed. Her memory, intelligence, factual knowledge, and ability to reason stayed intact. For the standard-relative answer, use Sera’s own current standards.",
  scope:
    "Explain what the attitude reversal does to the meaning, truth, or sincerity of her two sentences. Do not decide which version of Sera has kinder or more attractive values.",
  why: "Changing a speaker’s values while holding facts fixed separates several accounts of truth, expression, standards, and useful practice.",
  guide: {
    plain: "Did Sera discover that an earlier belief was false, change what she stands for, switch the standard that sets the answer, or stop using a useful fiction?",
    separate: "A psychological change can cause a new judgment without automatically counting as evidence that either judgment tracks an independent fact.",
    reveal: "Your answer shows what has to remain stable—or what may change—for a moral sentence to keep the same status.",
  },
  choices: meaningChoices({
    realism: {
      label: "Her opinion changed, but that alone does not change the independent moral status she was describing",
      detail: "At least one judgment may be mistaken because both sentences concern the same moral reality, and a device changing her preferences does not alter that reality.",
      interpretation: "This keeps moral truth independent of Sera’s attitudes and treats the reversal as a change in belief or motivation rather than a change in the truth-maker.",
    },
    error: {
      label: "She exchanged one fact-like moral claim for another, but neither is made true by a moral property",
      detail: "The positive claim of wrongness and any positive claim of moral permission both reach for objective moral status that the world does not contain.",
      interpretation: "This treats the reversal as movement between ordinary moral assertions while retaining the error theorist’s rejection of their supposed moral truth-makers.",
    },
    express: {
      label: "Her practical stance changed from condemnation to approval; no moral discovery occurred merely because of that",
      detail: "Yesterday’s sentence sincerely expressed one plan and today’s sincerely expresses the opposite plan, even though the non-moral information stayed fixed.",
      interpretation: "This reads the contrast primarily as a change in attitudes, commitments, or plans rather than correction of a belief about independent wrongness.",
    },
    relative: {
      label: "The answer changed with Sera’s actual standards: true relative to yesterday’s code and false relative to today’s",
      detail: "Both assessments can accurately apply the standards Sera held at the relevant time, although they cannot both follow from one unchanged standard.",
      interpretation: "This makes the truth of the verdict depend on the actual standard indexed by the sentence and therefore allows truth to change when that standard changes.",
    },
    construct: {
      label: "The device changed her preferences, but the result of the chosen fair reasoning procedure need not change",
      detail: "The moral conclusion depends on what the specified procedure would produce, so a raw preference rewrite matters only if the procedure treats it as relevant.",
      interpretation: "This separates whatever Sera happens to want from a conclusion constructed through fair or rational deliberation under stated conditions.",
    },
    fiction: {
      label: "The literal moral story remained untrue, while Sera changed whether using that story served her purposes",
      detail: "Yesterday she found the fiction of wrongness useful for opposition; today she may abandon it or use a different fiction to support approval.",
      interpretation: "This holds the fictionalist view of literal truth fixed while allowing the usefulness and chosen content of moral discourse to change with practical aims.",
    },
  }),
};

const CLAIM_ROUTE_QUESTIONS = [
  {
    id: "catalog",
    phase: "Truth-claim route",
    axis: "Case — the complete catalog",
    prompt: "A perfect catalog lists every natural and social fact but has no separate entry for moral wrongness. What does that show about the moral sentence?",
    context:
      "After centuries of research, an archive can answer every question about bodies, minds, intentions, pain, institutions, histories, preferences, and consequences. Its editors find no additional object or force labeled moral wrongness. A researcher concludes that the greenhouse cannot really be wrong because wrongness is absent from the catalog.",
    assumptions:
      "The archive is complete about natural and social facts. It does not settle, by definition, whether moral facts reduce to those facts, follow from them, are constructed from them, or never existed.",
    scope:
      "Decide what the absence of a separate moral entry shows. Do not assume that a realist must believe in a glowing moral object or that every non-realist must stop moral discussion.",
    why: "The catalog tests whether moral meaning requires an extra property, a pattern in ordinary facts, a stance, a standard, a procedure, or a useful pretense.",
    guide: {
      plain: "Would you expect moral wrongness to appear as one more thing in a scientific inventory, or is the sentence doing a different kind of work?",
      separate: "Not finding a separate moral particle is different from showing that no moral fact can be grounded in ordinary facts or reasoning.",
      reveal: "Your answer clarifies what kind of truth-maker, if any, you think a sentence using “wrong” needs.",
    },
    choices: meaningChoices({
      realism: {
        label: "It does not settle the claim; moral facts might be grounded in or identical with facts already in the catalog",
        detail: "A realist need not expect wrongness to appear as an extra object. The moral status could depend on pain, agency, reasons, or relations the archive already records.",
        interpretation: "This preserves a realist truth claim without requiring supernatural furniture, while leaving the proposed connection between ordinary facts and moral status to be argued.",
      },
      error: {
        label: "It fits the view that the sentence asks the world for an objective moral property that is not there",
        detail: "The catalog supplies harms, reactions, and preferences but no categorical property of wrongness capable of making the ordinary fact-like claim true.",
        interpretation: "This treats the missing property as evidence for error theory, though the catalog must still support the claim that no natural or constructed account can do the work.",
      },
      express: {
        label: "It looked for the wrong thing because the sentence’s main job is to express opposition and endorse a norm",
        detail: "The archive can record the attitudes and plans involved, but the meaning of the utterance does not require a further property named wrongness.",
        interpretation: "This explains moral language through practical attitudes and norm acceptance, so the lack of an extra catalog entry is unsurprising rather than destructive.",
      },
      relative: {
        label: "The relevant truth can be found in the recorded standard: the act is wrong relative to a code that forbids it",
        detail: "No additional property is needed once the speaker identifies the person or group whose actual standards supply the condition for the claim.",
        interpretation: "This locates the claim’s truth in ordinary facts about a referenced standard, while limiting the conclusion to the scope of that standard.",
      },
      construct: {
        label: "The archive supplies inputs, but the verdict comes from applying the chosen procedure of fair reasoning",
        detail: "Wrongness need not be a separate item because the conclusion is produced by what informed and suitably placed reasoners would decide.",
        interpretation: "This treats moral truth as the output of a construction using cataloged facts, while making the design and authority of the procedure the central issue.",
      },
      fiction: {
        label: "The missing property confirms the literal story, not the practical usefulness of continuing to speak that way",
        detail: "People may knowingly retain the sentence as a simple and motivating fiction even after accepting that no separate wrongness appears in reality.",
        interpretation: "This rejects the apparent ontology of ordinary moral talk while treating the decision to preserve that talk as a further practical question.",
      },
    }),
  },
  {
    id: "lastMind",
    phase: "Truth-claim route",
    axis: "Case — the last mind",
    prompt: "With no community left to approve or condemn anything, what could “wrong” mean in the caretaker’s case?",
    context:
      "A lone caretaker is the last biological person alive. She runs a protected simulation containing children who can think, fear, and suffer. For amusement, she repeatedly frightens them and wipes their memories. No society, law, audience, tradition, or future observer remains, but the simulated children experience the fear while it occurs.",
    assumptions:
      "The caretaker never agreed to a code and faces no punishment or reputation loss. The children’s experiences are real mental events. The question concerns the meaning of a moral sentence, not whether fear is pleasant.",
    scope:
      "Complete the thought “What she does is morally wrong” by identifying what makes that sentence a fact claim, expression, standard-based verdict, constructed result, or fiction.",
    why: "Removing society tests which accounts depend on actual group standards and which can still operate through facts, personal stances, procedures, or useful language.",
    guide: {
      plain: "If there is no public rule and no audience, what—if anything—does the word “wrong” add to the facts about suffering?",
      separate: "The reality of fear and pain does not by itself tell us whether “wrong” names a fact, expresses opposition, or applies a chosen way of evaluating it.",
      reveal: "Your answer identifies whether moral language needs a community and, if not, what can replace that social setting.",
    },
    choices: meaningChoices({
      realism: {
        label: "It states that her treatment has an independent moral status even in a world with no social code",
        detail: "The children’s suffering and her reasons can ground a truth about wrongness that does not depend on anyone approving, enforcing, or describing it.",
        interpretation: "This is a direct realist reading: the disappearance of communities does not remove the truth conditions of the moral claim.",
      },
      error: {
        label: "It still tries to state an objective moral fact, but even this terrible case contains no such property",
        detail: "Fear, cruelty, and preference are real, yet the further assertion of moral wrongness remains literally untrue on the error-theory account.",
        interpretation: "This preserves a sharp distinction between rejecting moral properties and denying the natural facts that make the case horrifying to many people.",
      },
      express: {
        label: "It expresses the speaker’s rejection of her conduct and commitment to protect minds from treatment like this",
        detail: "No community is required for a speaker to condemn the caretaker and endorse a norm against causing fear for amusement.",
        interpretation: "This makes the sentence a practical expression that can survive social isolation as long as an evaluator has the relevant stance or plan.",
      },
      relative: {
        label: "It is true only relative to a named actual standard, such as mine or the caretaker’s, not to a vanished society",
        detail: "If my standards forbid the conduct, I can call it wrong relative to them; if hers permit it, the same verdict does not follow from her code.",
        interpretation: "This keeps the claim intelligible without a community but requires explicit indexing to an existing person’s standards.",
      },
      construct: {
        label: "It reports that the conduct would be rejected by the specified fair procedure for affected minds",
        detail: "The relevant result might come from informed agreement, equal consideration, or another process that represents both caretaker and children fairly.",
        interpretation: "This grounds the verdict in a procedure rather than actual social approval, while leaving the procedure’s design open to examination.",
      },
      fiction: {
        label: "It is a compact moral story an evaluator may use to organize opposition, despite rejecting literal wrongness",
        detail: "Even in an empty world, someone considering the case can use the familiar fiction to focus attention and guide an imagined response.",
        interpretation: "This treats the language as optional practical equipment whose use depends on whether it helps an evaluator think and act.",
      },
    }),
  },
];

const COMMITMENT_ROUTE_QUESTIONS = [
  {
    id: "translation",
    phase: "Commitment route",
    axis: "Case — the forbidden word",
    prompt: "A government bans moral vocabulary. Which translation best preserves what “erasing the witnesses is wrong” was doing?",
    context:
      "A government plans to erase the memories of people who saw its secret prison. It also bans the words right, wrong, good, evil, duty, and obligation from public messages. A resistance group must replace its sentence “Erasing the witnesses is morally wrong” with wording that states its intended meaning as clearly as possible.",
    assumptions:
      "Everyone already knows what the erasure will do. The new sentence must be honest and understandable without using moral terms. The question asks for semantic translation, not the slogan most likely to win.",
    scope:
      "Choose the replacement that preserves your account of the original sentence. Do not select an option merely because you personally support the resistance.",
    why: "Removing moral vocabulary forces the hidden fact claim, practical stance, standard, procedure, or fiction into explicit language.",
    guide: {
      plain: "If you could not say “wrong,” what longer sentence would say the same thing you intended?",
      separate: "A translation can describe harm, express opposition, cite a rule, or invoke a procedure; those additions are not interchangeable.",
      reveal: "Your answer shows which underlying content you think ordinary moral language compresses into the single word “wrong.”",
    },
    choices: meaningChoices({
      realism: {
        label: "“The erasure has a condemnable status that is true independently of anyone’s approval or rules”",
        detail: "This awkward translation preserves the idea that the original sentence described an independent feature rather than merely announcing a reaction.",
        interpretation: "This makes the realist commitment explicit, though a complete account would still explain the independent status in clearer non-moral terms if possible.",
      },
      error: {
        label: "No truthful translation preserves the literal claim; instead list the memory loss and say that we oppose it",
        detail: "The original aimed at a moral fact that does not exist, so honest replacement separates the real effects from the resistance group’s practical stance.",
        interpretation: "This is an abolitionist-friendly response to error theory: remove the failed assertion while preserving factual information and human opposition.",
      },
      express: {
        label: "“We oppose the erasure, and we commit ourselves to preventing practices of this kind”",
        detail: "The replacement states both the group’s attitude and the forward-looking plan that the moral sentence expressed in a shorter form.",
        interpretation: "This is the clearest expressivist translation because it preserves condemnation and norm acceptance without pretending merely to report them.",
      },
      relative: {
        label: "“The erasure violates the actual standards that our resistance group accepts”",
        detail: "The replacement identifies the actual code that makes the verdict true relative to this group without claiming that every possible standard agrees.",
        interpretation: "This translates the moral predicate into an explicit relation between the act and a named existing standard used by the group.",
      },
      construct: {
        label: "“The erasure would be rejected by informed people deciding under our stated fair procedure”",
        detail: "The replacement names the decision process whose result supplies the verdict instead of appealing to current votes or an independent property.",
        interpretation: "This makes the constructivist procedure visible and invites questions about information, representation, fairness, and authority.",
      },
      fiction: {
        label: "“For practical purposes, let us treat the erasure as forbidden in the shared story guiding our actions”",
        detail: "The replacement openly marks the moral status as a useful pretense rather than a literally believed property of the act.",
        interpretation: "This is a transparent fictionalist translation, preserving coordination while revealing the stance normally hidden by ordinary moral grammar.",
      },
    }),
  },
  {
    id: "copies",
    phase: "Commitment route",
    axis: "Case — the copied protester",
    prompt: "Two copies share every belief about the facts but take opposite moral positions. What exactly is their disagreement?",
    context:
      "A protester is copied moments before a hearing. The copies remember the same life, know the same evidence, and reason equally well. A random change gives one a strong commitment to protect private memories and the other a strong commitment to public security. One says forced memory searches are wrong; the other says they are morally permitted.",
    assumptions:
      "Neither copy has missed a non-moral fact. Their practical priorities genuinely conflict, and neither is secretly using a different definition of memory search. They must recommend one public policy.",
    scope:
      "Identify the disagreement created by their opposing moral sentences. Do not resolve the policy or assume that sharing facts guarantees agreement about what to do.",
    why: "The copies separate disagreement in belief from conflict in attitudes, standards, procedures, and practical stories.",
    guide: {
      plain: "Are they contradicting each other about a fact, expressing plans that cannot both govern policy, or applying different standards?",
      separate: "People can agree on every prediction while still fighting over which outcome to pursue and which rule to adopt.",
      reveal: "Your answer shows how your account explains genuine moral conflict after factual disagreement has been removed.",
    },
    choices: meaningChoices({
      realism: {
        label: "They hold incompatible beliefs about one moral status, so at least one belief about the searches is mistaken",
        detail: "Their practical attitudes may also clash, but the sentences contradict each other about a truth that does not change with either copy’s priorities.",
        interpretation: "This gives moral disagreement the structure of an ordinary dispute over one subject matter with incompatible truth-directed beliefs.",
      },
      error: {
        label: "Their positive moral assertions both fail to report real moral properties, while their policy attitudes still conflict",
        detail: "The language presents a fact-like dispute, but error theory relocates the actionable conflict to preferences, plans, and non-moral claims.",
        interpretation: "This preserves the practical seriousness of the hearing while denying that either side possesses the objective moral fact it appears to assert.",
      },
      express: {
        label: "Their accepted plans conflict because one cannot both permit and forbid the same searches in the shared policy",
        detail: "The opposition is genuine even without competing moral facts: each copy rejects the practical stance expressed by the other’s sentence.",
        interpretation: "This is the expressivist account of disagreement as a clash of attitudes, plans, or norms that cannot jointly guide the same choice.",
      },
      relative: {
        label: "Each verdict can fit that copy’s actual standard, while they still conflict over which standard will govern policy",
        detail: "The relative claims need not contradict each other until both sides claim authority for one shared code or evaluate from the same standard.",
        interpretation: "This distinguishes truth relative to separate standards from the practical struggle to select one rule for a common institution.",
      },
      construct: {
        label: "They disagree about which procedure, starting commitments, or reasoning constraints should produce the public rule",
        detail: "A constructivist resolution requires a shared method that can represent both priorities rather than simply counting the copies’ current preferences.",
        interpretation: "This locates the deeper dispute in the construction process and asks what makes its inputs and constraints fair or rational.",
      },
      fiction: {
        label: "They are promoting competing rules inside moral stories designed to organize one shared policy",
        detail: "Neither fictional rule describes a literal property, but the incompatible stories can still motivate opposing institutions and behavior.",
        interpretation: "This explains the dispute through rival practical fictions and leaves their comparative usefulness open to evidence and negotiation.",
      },
    }),
  },
];

const STANDARDS_ROUTE_QUESTIONS = [
  {
    id: "charters",
    phase: "Standards route",
    axis: "Case — the two charters",
    prompt: "The city’s actual charter and its fair-review charter give opposite answers. Which one makes a claim of wrongness true?",
    context:
      "A city’s current charter allows officials to remove one painful memory from every adult after a disaster. Nearly everyone supports the rule. A second charter is produced by an informed review in which nobody knows whether they will become an official, a survivor who wants removal, or a survivor who refuses it. That review forbids forced removal.",
    assumptions:
      "Both charters are internally consistent and based on the same factual evidence. The first records actual public standards. The second results from the stated fair-review procedure. They cannot both govern the same memory removal.",
    scope:
      "Explain what determines the truth or function of “forced removal is wrong.” Keep current acceptance separate from the output of an idealized procedure.",
    why: "Opposite charters expose the difference between actual standards and standards constructed under chosen conditions.",
    guide: {
      plain: "Does the current rule settle the sentence, does the fair procedure settle it, or is neither what gives the word its meaning?",
      separate: "A procedure can be popular without being fair, and a hypothetical fair result can differ from every person’s present preference.",
      reveal: "Your answer identifies whether standards merely record attitudes or gain authority through the way they are formed.",
    },
    choices: meaningChoices({
      realism: {
        label: "Neither charter creates the answer; one may track the independent moral truth about forced removal better",
        detail: "Public acceptance and fair procedure can be evidence or methods, but the act’s moral status does not become true merely because either charter declares it.",
        interpretation: "This treats both charters as possible guides to an independent truth rather than the source that constructs or relativizes that truth.",
      },
      error: {
        label: "Neither charter creates a literal moral property; each only supplies a human rule and its practical effects",
        detail: "The city can choose, enforce, and defend a charter, but saying it makes forced removal objectively wrong adds a fact that does not exist.",
        interpretation: "This keeps institutional rules real while rejecting the further fact-like moral status that ordinary language appears to place behind them.",
      },
      express: {
        label: "The sentence expresses which charter and policy the speaker endorses rather than reporting a separate status",
        detail: "Calling removal wrong commits the speaker to the prohibition and against the permission, regardless of which document is currently official.",
        interpretation: "This makes the utterance a practical alignment with a norm and allows reasoning about which plan the city should adopt.",
      },
      relative: {
        label: "Relative to the city’s actual charter it is permitted; relative to the review charter it is wrong",
        detail: "The sentence has no complete truth condition until the speaker identifies which existing or stipulated standard is being applied.",
        interpretation: "This is the clean standard-relative result: opposite verdicts can each be true under different explicitly indexed codes.",
      },
      construct: {
        label: "The fair-review charter supplies the answer because the specified decision procedure constructs the standard",
        detail: "The actual vote does not settle the verdict when the theory defines the relevant principles by informed reasoning under fair representation.",
        interpretation: "This gives the idealized procedure constitutive force, while opening it to criticism about why these conditions are the correct ones.",
      },
      fiction: {
        label: "Either charter can anchor a moral fiction; choose the one whose use best serves the city’s practical aims",
        detail: "The language of wrongness does not become literally true, but a shared pretense can help residents internalize and coordinate around one charter.",
        interpretation: "This shifts evaluation from which charter creates a moral fact to which moralized practice produces acceptable consequences.",
      },
    }),
  },
  {
    id: "inheritance",
    phase: "Standards route",
    axis: "Case — the inherited command",
    prompt: "Everyone accepts a rule only because their values were secretly engineered. What can “the rule is wrong” mean?",
    context:
      "Centuries ago, a ruler secretly altered the population so that descendants would feel intense loyalty to a hereditary caste system. Today every citizen sincerely accepts the system, reports satisfaction with it, and punishes dissent. An unaltered visitor learns the history and says, “The caste rule is morally wrong.”",
    assumptions:
      "The present approval is real but was deliberately engineered. Citizens know how the system works but not why they value it. Informed people without the alteration would reject the rule under an equal-participation process.",
    scope:
      "State what could make the visitor’s sentence meaningful or true. Do not assume that causal manipulation automatically disproves every value it produces.",
    why: "Engineered agreement tests whether actual acceptance is enough or whether origin, procedure, independent truth, or open commitment does additional work.",
    guide: {
      plain: "Can a fully accepted rule be criticized, and if so, what standard or speech act makes that criticism possible?",
      separate: "Explaining why people value a rule is not yet the same as showing the rule false, harmful, or unacceptable under another test.",
      reveal: "Your answer reveals what permits criticism when the target community supplies no internal dissent.",
    },
    choices: meaningChoices({
      realism: {
        label: "The visitor claims the caste rule has an independent moral status that unanimous engineered approval cannot change",
        detail: "The genealogy may explain the citizens’ mistake, while the truth of the moral verdict depends on reasons or facts beyond that approval.",
        interpretation: "This allows external criticism as a disagreement about objective moral status and treats the engineered attitudes as possible distortion.",
      },
      error: {
        label: "The visitor’s literal moral claim is still untrue, though the manipulation and caste structure are real grounds for opposition",
        detail: "A complete criticism can describe control, hierarchy, suffering, and the visitor’s aims without adding an objective property of wrongness.",
        interpretation: "This separates strong non-moral criticism and commitment from a moral assertion the error theorist thinks cannot be made true.",
      },
      express: {
        label: "The visitor is rejecting the caste rule and inviting others to share a plan that ends engineered hierarchy",
        detail: "The criticism does not need the citizens’ present approval because it expresses the visitor’s stance and seeks to change their future attitudes.",
        interpretation: "This makes reform possible through avowal, persuasion, and planning without treating current acceptance as the meaning of moral truth.",
      },
      relative: {
        label: "The rule is permitted relative to the citizens’ actual standards but wrong relative to the visitor’s standards",
        detail: "The sentence must name or imply the visitor’s code; unanimous local approval prevents the opposite verdict from following from the local code alone.",
        interpretation: "This permits external criticism as a standard-relative claim while acknowledging that it does not reveal one verdict shared by both codes.",
      },
      construct: {
        label: "The rule is wrong because informed and equally represented people would reject it under the specified process",
        detail: "Engineered actual acceptance is not decisive when the relevant standard is constructed through deliberation without the manipulation and caste advantage.",
        interpretation: "This grounds criticism in an idealized procedure and makes the justification of removing those influences a central part of the argument.",
      },
      fiction: {
        label: "The visitor uses a fiction of wrongness to strengthen resistance, while judging that use by its practical effects",
        detail: "The sentence can organize reform without literally describing a moral property, but its honesty and likely consequences still need examination.",
        interpretation: "This makes external criticism a strategic use of moral language rather than a report about what the citizens’ standards contain.",
      },
    }),
  },
];

const TOOL_ROUTE_QUESTIONS = [
  {
    id: "broadcast",
    phase: "Language-as-tool route",
    axis: "Case — the twelve-second broadcast",
    prompt: "A moral sentence saves time during an evacuation. What makes broadcasting it acceptable?",
    context:
      "A station has twelve seconds to stop rescuers from abandoning unconscious children when an ash cloud arrives. Tests show that “Leaving a child behind is morally wrong” produces faster cooperation than a longer explanation of fear, loss, rescue capacity, and shared policy. The announcer rejects the existence of literal moral properties.",
    assumptions:
      "The shorter message reliably saves more children, the announcer knows this, and a complete factual explanation cannot fit. Listeners understand ordinary moral language in varied ways. No authority forces the announcer to use it.",
    scope:
      "Explain what could make this exact utterance sincere, true, useful, or misleading. Do not decide solely from the good outcome; identify the sentence’s function.",
    why: "Emergency persuasion tests whether moral language can be retained without realist belief and what conditions make that retention honest.",
    guide: {
      plain: "Can someone who rejects moral properties still say “wrong” honestly, and why?",
      separate: "A sentence can be effective without being true, and it can express a genuine commitment without pretending to describe an independent property.",
      reveal: "Your answer shows whether practical usefulness changes meaning or merely gives a reason to use a sentence with a meaning fixed elsewhere.",
    },
    choices: meaningChoices({
      realism: {
        label: "The broadcast is straightforwardly acceptable only if the announcer believes the fact-like moral claim is true",
        detail: "Its useful effect is welcome but does not change what the sentence asserts, so privately rejecting that assertion makes the utterance misleading.",
        interpretation: "This keeps truth-directed realist semantics fixed across emergency and ordinary contexts instead of allowing usefulness to rewrite the claim.",
      },
      error: {
        label: "The sentence remains literally untrue; honesty favors a brief non-moral command or factual warning instead",
        detail: "Saving time supplies a reason to communicate forcefully, but it does not make the failed moral assertion true or erase the risk of misleading listeners.",
        interpretation: "This combines error theory with a revisionary or abolitionist response rather than automatically moving from error theory to fictionalism.",
      },
      express: {
        label: "It is sincere because the announcer genuinely condemns abandonment and endorses the rescue plan",
        detail: "The utterance openly performs a practical stance the announcer really has, so no hidden belief in moral properties is needed for sincerity.",
        interpretation: "This explains both motivation and honesty through expressivist function instead of treating the sentence as a useful false assertion.",
      },
      relative: {
        label: "It can be true as an application of the rescuers’ shared rule that children must not be abandoned",
        detail: "The claim accurately invokes an actual emergency standard, provided that listeners understand which code is being applied.",
        interpretation: "This gives the message standard-relative truth and makes the shared rescue code, rather than mere effectiveness, its semantic basis.",
      },
      construct: {
        label: "It reports the rule that informed and fairly represented participants would choose for the evacuation",
        detail: "The emergency wording compresses the result of a defensible procedure even though the announcer cannot explain that procedure in twelve seconds.",
        interpretation: "This treats the sentence as shorthand for a constructed conclusion whose justification exists outside the broadcast.",
      },
      fiction: {
        label: "It is acceptable as a useful pretense if its benefits, audience expectations, and risks of deception are defensible",
        detail: "The announcer knowingly uses realist-sounding language for coordination while rejecting its literal surface claim and accepting responsibility for that choice.",
        interpretation: "This is the central fictionalist option: practical success can justify make-believe moral discourse under conditions that still require scrutiny.",
      },
    }),
  },
  {
    id: "notebook",
    phase: "Language-as-tool route",
    axis: "Case — the private notebook",
    prompt: "A leader rejects moral properties in private but uses moral claims in public. Which explanation could make that practice intellectually honest?",
    context:
      "A reform leader repeatedly says “Selling citizens’ memories is morally wrong.” In a private notebook she writes, “There are no moral properties. This vocabulary helps people protect one another.” Her audience believes she is sincere, but members have never discussed whether her public sentence is literal, expressive, relative, constructed, or fictional.",
    assumptions:
      "She genuinely opposes the sales, accurately understands their harms, and does not seek personal gain. The moral language improves coordination. Listeners would disagree about its meaning if asked.",
    scope:
      "Identify the account that could make her public and private statements fit together. Do not assume good motives automatically remove every concern about meaning or transparency.",
    why: "Private and public uses reveal whether rejecting moral properties requires silence, reinterpretation, explicit standards, or a managed fiction.",
    guide: {
      plain: "Is she contradicting herself, expressing a real commitment, applying a code, reporting a procedure, or knowingly maintaining a useful story?",
      separate: "Rejecting independent moral properties does not by itself tell us whether ordinary moral sentences are false, expressive, relative, or fictional.",
      reveal: "Your answer explains how surface moral grammar relates to the speaker’s private metaethical view.",
    },
    choices: meaningChoices({
      realism: {
        label: "The two statements conflict because her public sentence asserts a moral status she privately denies exists",
        detail: "Practical benefit cannot by itself make the literal assertion honest; she should change either her private belief or her public wording.",
        interpretation: "This applies a stable realist reading to her public grammar and therefore finds a direct belief-to-assertion mismatch.",
      },
      error: {
        label: "She recognizes the error but should avoid asserting it unless she clearly marks quotation, pretense, or revision",
        detail: "Error theory explains her private note; intellectual honesty then requires a separate policy about whether knowingly untrue moral talk is permissible.",
        interpretation: "This keeps error theory distinct from fictionalism by refusing to infer that a useful false discourse should automatically be continued.",
      },
      express: {
        label: "The statements fit because her public sentence sincerely expresses opposition rather than belief in a moral property",
        detail: "Her notebook denies one interpretation of the sentence while preserving the practical commitment that the public utterance actually performs.",
        interpretation: "This gives the leader a unified expressivist account, although audience confusion may still support clearer explanation.",
      },
      relative: {
        label: "The statements fit if “wrong” means that selling memories violates the actual standards she is invoking",
        detail: "She can deny independent properties while truthfully applying her movement’s code, as long as the relevant standard is sufficiently clear.",
        interpretation: "This reconciles the claims through standard-relative truth rather than through fiction, though ambiguity about the referenced code remains.",
      },
      construct: {
        label: "The statements fit if the public verdict reports the result of a fair procedure she can identify and defend",
        detail: "Her denial of independent properties is compatible with treating a constructed principle as true under the procedure that gives it authority.",
        interpretation: "This distinguishes non-realist-sounding metaphysics from constructivist truth and requires the underlying procedure to be more than hidden rhetoric.",
      },
      fiction: {
        label: "The statements fit if she intentionally uses a useful moral fiction and can defend its transparency and effects",
        detail: "Her notebook records the literal disbelief; her public practice retains the familiar story because it motivates protection and coordination.",
        interpretation: "This is a fictionalist reconciliation, but it exposes further questions about informed participation, manipulation, and when the fiction should end.",
      },
    }),
  },
];

const DISAGREEMENT_QUESTION = {
  id: "disagreement",
  phase: "Testing disagreement",
  axis: "Case — the museum of two futures",
  prompt: "Two informed cities make opposite moral claims about the same act. What kind of conflict remains after all factual disputes are removed?",
  context:
    "Two future cities are exact copies until one public decision. Both know that a museum can create conscious historical replicas who will suffer briefly and then be deleted. One city says creating them is morally wrong. The other says creating them is morally permissible. Both predict the same suffering, educational benefits, and public reaction.",
  assumptions:
    "The cities use the same non-moral vocabulary, understand one another, and have equal reasoning ability. Their plans cannot both govern a shared museum. No missing empirical fact explains the disagreement.",
  scope:
    "Identify what their opposing moral sentences disagree about. Keep a conflict in belief separate from a clash of plans, standards, procedures, or useful public frameworks.",
  why: "Persistent disagreement is one of the clearest places where rival theories give different accounts of what moral language is doing.",
  guide: {
    plain: "Are the cities contradicting each other about one fact, or are they expressing incompatible ways of evaluating and governing the museum?",
    separate: "A practical conflict can be genuine and serious even if both standard-relative descriptions are true or both objective moral assertions fail.",
    reveal: "Your answer shows what remains to be resolved when more scientific information will not settle the dispute.",
  },
  choices: meaningChoices({
    realism: {
      label: "They make incompatible claims about one independent moral status, so at least one city is mistaken",
      detail: "The shared facts do not guarantee moral knowledge, but “wrong” and “permissible” cannot both correctly describe the same act in the same conditions.",
      interpretation: "This models moral disagreement as a conflict of truth-directed beliefs about one approval-independent subject matter.",
    },
    error: {
      label: "Both cities make positive moral-status claims that fail, although their policies and reactions genuinely conflict",
      detail: "The dispute appears to concern objective properties, but the actionable remainder consists of real plans, preferences, institutions, and consequences.",
      interpretation: "This uses error theory to reject both realist-seeming assertions without denying the need to negotiate or fight over one museum policy.",
    },
    express: {
      label: "They express incompatible plans or accepted norms: create the replicas versus forbid their creation",
      detail: "Their practical attitudes cannot jointly guide the shared museum, so the disagreement remains genuine without requiring a contested moral property.",
      interpretation: "This is the expressivist explanation of moral disagreement as a clash in practical stance rather than only a mismatch in descriptive belief.",
    },
    relative: {
      label: "Each claim may be true relative to its city’s actual standards, while the cities still contest one shared rule",
      detail: "Their sentences do not directly contradict until evaluated under one standard, but their institutions and preferred outcomes remain incompatible.",
      interpretation: "This distinguishes standard-relative truth from practical agreement and reveals the further problem of choosing a common standard.",
    },
    construct: {
      label: "The conflict concerns which fair reasoning procedure, inputs, or constraints should construct the governing principle",
      detail: "If both cities truly use the same procedure correctly, opposite outputs expose an incompleteness or inconsistency in that construction.",
      interpretation: "This relocates the dispute to the procedure that creates the answer and makes procedural convergence a testable part of the view.",
    },
    fiction: {
      label: "They promote incompatible rules inside moral frameworks whose value depends on how those frameworks function",
      detail: "Neither city needs to believe in literal moral properties, but the competing fictions still organize opposed policies and motivations.",
      interpretation: "This treats the dispute as a contest between practical moral stories that can be assessed for usefulness, cost, and stability.",
    },
  }),
};

const CORRECTION_QUESTION = {
  id: "correction",
  phase: "Testing correction",
  axis: "Case — the evidence vault",
  prompt: "What kind of discovery could show that your use of “wrong” was mistaken rather than merely unpopular?",
  context:
    "You call a city’s plan to sell edited memories morally wrong. A vault then gives you unlimited time, perfect factual evidence, flawless translations, and access to every affected person’s experience. Public opinion may still oppose you, and you may still dislike the plan. The vault asks what would count as correcting your moral judgment.",
  assumptions:
    "You cannot answer only “more information” because all ordinary evidence is already available. You may identify a mistake in reasoning, standards, procedure, expression, or practical usefulness.",
  scope:
    "Choose what would make the moral judgment mistaken on your account. Separate changing your mind from learning that your earlier sentence failed by its own intended standard.",
  why: "A theory of moral language should explain not only assertion and disagreement but also what error and improvement would mean.",
  guide: {
    plain: "What would count as a real correction: tracking the fact better, abandoning a failed claim, fixing an inconsistency, applying the right standard, repairing a procedure, or revising a harmful fiction?",
    separate: "Losing an argument, becoming less confident, and discovering that your sentence was false are not automatically the same event.",
    reveal: "Your answer identifies the success condition your moral judgment is trying to meet.",
  },
  choices: meaningChoices({
    realism: {
      label: "Better moral reasoning could show that the plan lacks the independent status I attributed to it",
      detail: "The correction would be a change in a truth-directed belief, even if identifying the reliable method for moral reasoning remains difficult.",
      interpretation: "This treats moral error as failure to represent an independent moral reality and therefore owes an account of evidence and access.",
    },
    error: {
      label: "Recognizing that no moral property can make the literal claim true would correct the entire style of assertion",
      detail: "The repair is not switching to the opposite moral property but replacing or reinterpreting a discourse whose positive claims systematically fail.",
      interpretation: "This makes metaethical recognition, rather than a new first-order verdict, the central correction proposed by error theory.",
    },
    express: {
      label: "I could discover that the judgment conflicts with the broader commitments and plans I sincerely endorse",
      detail: "Correction means making my practical attitudes more informed and consistent, not detecting a property that exists beyond every stance.",
      interpretation: "This allows genuine reasoning and improvement within expressivism through coherence, information, and disciplined revision of commitments.",
    },
    relative: {
      label: "I could learn that I misstated or misapplied the actual standard my sentence was meant to use",
      detail: "If the referenced code permits the sale, calling it wrong relative to that same code is a correctable descriptive or interpretive mistake.",
      interpretation: "This gives standard-relative claims ordinary error conditions while limiting correction to the standard that supplies those conditions.",
    },
    construct: {
      label: "I could find a flaw in the facts, representation, reasoning, or rules of the procedure that produced the verdict",
      detail: "A corrected construction follows the stated method under its proper conditions rather than simply copying current preference or political power.",
      interpretation: "This makes procedural integrity the success condition and invites a further audit of why that procedure deserves authority.",
    },
    fiction: {
      label: "I could learn that treating the plan as morally forbidden makes the shared fiction misleading or practically harmful",
      detail: "Correction means revising or dropping a tool that no longer serves its justified purpose, while its literal moral ontology remains rejected.",
      interpretation: "This evaluates moral discourse by the function of the fiction and therefore requires standards for benefit, harm, honesty, and audience consent.",
    },
  }),
};

const FINAL_QUESTION = {
  id: "final",
  phase: "Your final definition",
  axis: "Return to ordinary speech",
  prompt: "When you personally say, “Humiliating a powerless person for fun is morally wrong,” what do you most nearly mean?",
  context:
    "A powerful host privately humiliates a dependent guest solely for amusement. The guest is distressed, cannot safely object, and did nothing to invite the treatment. Imagine saying the sentence in a calm conversation after all the facts are agreed: “Humiliating the guest for fun is morally wrong.”",
  assumptions:
    "The sentence is yours, not a quotation. You may strongly oppose the conduct under every answer. Choose what you intend the moral word itself to contribute beyond the agreed facts.",
  scope:
    "Give your final semantic definition, even if it differs from your opening answer. The result will report a change as a possible revision or context shift, not automatically as incoherence.",
  why: "Returning to a direct first-person use reveals which interpretation survives after the route, disagreement, and correction tests.",
  guide: {
    plain: "Complete the sentence as precisely as you can: “When I call this action wrong, I am really…”",
    separate: "Your strength of feeling does not decide whether the sentence reports a fact, expresses that feeling, applies a standard, or uses a fiction.",
    reveal: "This answer supplies the final definition displayed in your diagnostic and compared with your opening meaning.",
  },
  choices: meaningChoices({
    realism: {
      label: "Claiming that the treatment has a real moral status that is not created by anyone’s approval",
      detail: "I mean that the sentence can be true even if the host, guest, speaker, and every community reject the judgment or use another code.",
      interpretation: "Your final definition is realist: the sentence aims to describe approval-independent moral reality rather than only a stance or standard.",
    },
    error: {
      label: "Using an ordinary fact-like sentence that I now think is literally untrue because moral properties do not exist",
      detail: "I may feel pulled to say it, but strictly speaking I should reject, revise, quote, or consciously fictionalize this familiar form of claim.",
      interpretation: "Your final definition is error-theoretic: ordinary moral grammar aims at truth but systematically lacks the property required for success.",
    },
    express: {
      label: "Condemning the treatment and committing myself to norms and plans that oppose conduct like it",
      detail: "The statement primarily expresses a practical stance I can reason from and invite others to share, rather than reporting an independent property.",
      interpretation: "Your final definition is expressivist: moral judgment functions through commitment, norm acceptance, and practical coordination.",
    },
    relative: {
      label: "Saying that the treatment violates the actual standards I accept or another standard I have clearly named",
      detail: "The verdict is true relative to that code, and I do not mean that it has the same truth under every possible person’s or group’s standard.",
      interpretation: "Your final definition is standard-relative: the sentence’s truth conditions depend on an identified actual code.",
    },
    construct: {
      label: "Reporting that the treatment would be rejected by the fair or rational procedure I take to set the standard",
      detail: "The verdict comes from the result of that process, not from current approval and not from a moral property that exists before all reasoning.",
      interpretation: "Your final definition is constructivist: moral status is fixed through a specified procedure whose design and authority must be defended.",
    },
    fiction: {
      label: "Deliberately using a helpful moral fiction while denying that the treatment literally has a property of wrongness",
      detail: "I retain the sentence because it organizes attention, emotion, and action more effectively than constantly restating the non-moral facts and commitments.",
      interpretation: "Your final definition is fictionalist: familiar moral discourse is consciously preserved for its practical value without literal belief.",
    },
  }),
};

const ROUTES = {
  claim: {
    name: "Truth-claim route",
    reason: "Your opening treated the sentence as a fact-like claim, so these cases test what could make that claim succeed or fail.",
    questions: CLAIM_ROUTE_QUESTIONS,
  },
  commitment: {
    name: "Commitment route",
    reason: "Your opening emphasized a practical stance, so these cases test translation and disagreement without adding hidden moral properties.",
    questions: COMMITMENT_ROUTE_QUESTIONS,
  },
  standards: {
    name: "Standards route",
    reason: "Your opening relied on a standard or procedure, so these cases separate actual acceptance from idealized construction.",
    questions: STANDARDS_ROUTE_QUESTIONS,
  },
  tool: {
    name: "Language-as-tool route",
    reason: "Your opening treated moral language as a useful device, so these cases test effectiveness, sincerity, and transparency.",
    questions: TOOL_ROUTE_QUESTIONS,
  },
};

const ALL_ROUTE_QUESTIONS = Object.values(ROUTES).flatMap((route) => route.questions);

const meaningState = {
  answers: {},
  index: 0,
};

function routeKeyForFamily(family) {
  if (["realism", "error"].includes(family)) return "claim";
  if (family === "express") return "commitment";
  if (["relative", "construct"].includes(family)) return "standards";
  if (family === "fiction") return "tool";
  return "claim";
}

function meaningRouteKey() {
  return routeKeyForFamily(meaningState.answers.opening);
}

function activeMeaningQuestions() {
  return [OPENING_QUESTION, VALUE_CHANGE_QUESTION, ...ROUTES[meaningRouteKey()].questions, DISAGREEMENT_QUESTION, CORRECTION_QUESTION, FINAL_QUESTION];
}

function activeMeaningQuestion() {
  return activeMeaningQuestions()[meaningState.index];
}

function meaningChoice(questionId) {
  const question = activeMeaningQuestions().find((candidate) => candidate.id === questionId);
  return question?.choices.find((choice) => choice.id === meaningState.answers[questionId]) || null;
}

function pruneInactiveMeaningAnswers() {
  const activeIds = new Set(activeMeaningQuestions().map((question) => question.id));
  ALL_ROUTE_QUESTIONS.forEach((question) => {
    if (!activeIds.has(question.id)) delete meaningState.answers[question.id];
  });
}

function selectedMeaningAnswers() {
  return activeMeaningQuestions().map((question) => ({ question, choice: meaningChoice(question.id) })).filter((entry) => entry.choice);
}

function meaningCounts() {
  const counts = Object.fromEntries(MEANING_FAMILY_ORDER.map((family) => [family, 0]));
  selectedMeaningAnswers().forEach(({ choice }) => {
    counts[choice.family] += 1;
  });
  return counts;
}

function answeredMeaningCount() {
  return selectedMeaningAnswers().length;
}

function openingFinalComparison() {
  const opening = meaningState.answers.opening;
  const final = meaningState.answers.final;
  if (!opening || !final) return null;
  if (opening === final) {
    return {
      stable: true,
      title: `${MEANING_FAMILIES[opening].name} → same meaning`,
      detail: "Your opening and final definitions used the same semantic family across two direct first-person-style moral claims.",
    };
  }
  return {
    stable: false,
    title: `${MEANING_FAMILIES[opening].name} → ${MEANING_FAMILIES[final].name}`,
    detail: "Your final definition differs from your opening one. This may be a revision, a response to the intervening cases, or a context shift you should make explicit.",
  };
}

function collectMeaningCombinations() {
  const counts = meaningCounts();
  const combinations = [];
  const add = (id, families, title, detail) => {
    if (families.every((family) => counts[family] > 0)) combinations.push({ id, families, title, detail });
  };
  add(
    "realism-error",
    ["realism", "error"],
    "The same fact-like grammar received opposite truth verdicts",
    "Some answers treated independent moral claims as capable of truth, while others treated that entire class of claims as systematically untrue. Clarify whether the difference was a revision or a feature of the case.",
  );
  add(
    "realism-express",
    ["realism", "express"],
    "Description and practical expression both appeared",
    "Some answers used “wrong” to describe an independent status and others used it primarily to condemn or plan. Both functions can occur in conversation, but one theory must explain how they relate.",
  );
  add(
    "relative-construct",
    ["relative", "construct"],
    "Actual standards and idealized procedures both set answers",
    "Some answers let an existing person or group supply the standard; others let a fair or rational procedure supply it. Explain when actual acceptance is enough and when it can be overruled.",
  );
  add(
    "error-fiction",
    ["error", "fiction"],
    "Rejecting literal truth led to two different language policies",
    "Some answers favored exposing or replacing failed moral assertions; others favored knowingly retaining them as useful fiction. The difference concerns what to do after accepting the alleged error.",
  );
  return combinations;
}

function meaningDiagnostic() {
  const counts = meaningCounts();
  const maximum = Math.max(...Object.values(counts));
  const leaders = MEANING_FAMILY_ORDER.filter((family) => counts[family] === maximum && maximum > 0);
  const comparison = openingFinalComparison();
  const route = ROUTES[meaningRouteKey()];
  let primary = "Not yet available";
  let primaryCopy = "Complete all seven questions to see the interpretation used most often.";
  let title = "Your meanings are still forming.";

  if (leaders.length === 1) {
    const family = MEANING_FAMILIES[leaders[0]];
    primary = family.name;
    primaryCopy = `${family.theory} is the closest named family: ${maximum} of your 7 answers used this interpretation.`;
    title = `“Wrong” mostly works as ${family.resultPhrase}.`;
  } else if (leaders.length > 1) {
    primary = "Mixed meaning";
    primaryCopy = `${leaders.map((family) => MEANING_FAMILIES[family].name).join(" and ")} are tied at ${maximum} use${maximum === 1 ? "" : "s"} each.`;
    title = "You use “wrong” in more than one way.";
  }

  let pattern = "Distributed";
  let patternCopy = "No single interpretation accounts for most of your seven answers.";
  if (maximum >= 5) {
    pattern = "Mostly stable";
    patternCopy = `One interpretation appears in ${maximum} of 7 answers. The remaining answers show where context or another function enters.`;
  } else if (maximum >= 3) {
    pattern = "Focused but flexible";
    patternCopy = `Your leading interpretation appears ${maximum} times, with other meanings doing work in several cases.`;
  }

  return {
    counts,
    maximum,
    leaders,
    route,
    primary,
    primaryCopy,
    title,
    summary: `Your seven answers followed the ${route.name.toLowerCase()} and used ${Object.values(counts).filter((count) => count > 0).length} of the six available interpretations. Counts describe these cases, not your personality or certainty.`,
    pattern,
    patternCopy,
    comparison,
    combinations: collectMeaningCombinations(),
  };
}

function buildMeaningAIProbePrompt() {
  const diagnosis = meaningDiagnostic();
  const answerSections = selectedMeaningAnswers().map(({ question, choice }, index) => [
    `${index + 1}. ${question.axis}`,
    `Question: ${question.prompt}`,
    `Case: ${question.context}`,
    `Fixed assumptions: ${question.assumptions}`,
    `Scope: ${question.scope}`,
    `My answer: ${choice.label}`,
    `Answer meaning: ${choice.detail}`,
    `Coded family: ${MEANING_FAMILIES[choice.family].theory} — ${MEANING_FAMILIES[choice.family].name}`,
    `What that answer commits to: ${choice.interpretation}`,
  ].join("\n")).join("\n\n");
  const countLines = MEANING_FAMILY_ORDER.map((family) => `- ${MEANING_FAMILIES[family].theory}: ${diagnosis.counts[family]} of 7 answers`).join("\n");
  const combinationLines = diagnosis.combinations.length
    ? diagnosis.combinations.map((item) => `- ${item.title}: ${item.detail}`).join("\n")
    : "- No coded cross-family combination was triggered.";

  return [
    "I completed a seven-question branching lab about what I mean when I use the moral word ‘wrong.’ Interview me to clarify the semantic and metaethical commitments in my answers.",
    "",
    "INTERVIEW RULES",
    "- Ask one focused question at a time and wait for my reply.",
    "- Use plain language first. Define any philosophical term immediately.",
    "- Do not infer a complete theory from the action I favor or from one answer.",
    "- Keep separate: what a moral sentence means, whether it can be true, what makes it true, what motivates the speaker, and whether the language is useful.",
    "- Do not collapse moral non-realism, relativism, constructivism, skepticism, and disagreement into one position.",
    "- Remember that relativism is not automatically anti-realism and that the classification of constructivism is disputed.",
    "- Treat a change in meaning as something to explain, not automatic incoherence.",
    "- Press especially on whether I use ‘wrong’ differently in private reflection, public persuasion, disagreement, and rule-making.",
    "- If I make a truth claim, ask what could make it true and how I could be corrected. If I express a stance, ask how reasoning and disagreement work. If I use a standard or procedure, ask whose and why. If I use a fiction, ask about honesty and practical limits.",
    "",
    "METHOD AND LIMITS",
    "The lab offered six simplified readings in every question: independent moral fact, failed fact claim, commitment or plan, actual standard applied, reasoned construction, and useful moral fiction. These are associations with philosophical families, not diagnoses. Counts show how often I selected each interpretation out of seven; they are not probabilities, rankings, or confidence scores.",
    "",
    `ROUTE: ${diagnosis.route.name}`,
    diagnosis.route.reason,
    "",
    "INTERPRETATION COUNTS",
    countLines,
    "",
    "OPENING TO FINAL",
    diagnosis.comparison ? `${diagnosis.comparison.title}. ${diagnosis.comparison.detail}` : "The final answer is incomplete.",
    "",
    "COMBINATIONS TO EXAMINE",
    combinationLines,
    "",
    "FULL CASES AND ANSWERS",
    answerSections,
    "",
    "Begin by briefly restating the strongest semantic question raised by this exact pattern, then ask me the single best first question.",
  ].join("\n");
}

const meaningEls = {
  liveStatus: document.querySelector("#meaningLiveStatus"),
  workspace: document.querySelector("#meaningLab"),
  results: document.querySelector("#meaningResults"),
  phase: document.querySelector("#meaningPhase"),
  progress: document.querySelector("#meaningProgress"),
  progressTrack: document.querySelector("#meaningProgressTrack"),
  progressBar: document.querySelector("#meaningProgressBar"),
  number: document.querySelector("#meaningQuestionNumber"),
  axis: document.querySelector("#meaningQuestionAxis"),
  prompt: document.querySelector("#meaningQuestionPrompt"),
  context: document.querySelector("#meaningQuestionContext"),
  assumptions: document.querySelector("#meaningAssumptions"),
  scope: document.querySelector("#meaningScope"),
  explanation: document.querySelector("#meaningExplanation"),
  plain: document.querySelector("#meaningPlain"),
  separate: document.querySelector("#meaningSeparate"),
  reveal: document.querySelector("#meaningReveal"),
  choices: document.querySelector("#meaningChoices"),
  why: document.querySelector("#meaningWhy"),
  back: document.querySelector("#meaningBackButton"),
  next: document.querySelector("#meaningNextButton"),
  map: document.querySelector("#meaningMap"),
  mapCard: document.querySelector("#meaningMapCard"),
  routeNote: document.querySelector("#meaningRouteNote"),
  mapBasis: document.querySelector("#meaningMapBasis"),
  liveMapMount: document.querySelector("#liveMeaningMapMount"),
  resultMapMount: document.querySelector("#resultMeaningMapMount"),
};

function scrollToMeaningElement(element, offset = 72) {
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function renderMeaningMap() {
  const counts = meaningCounts();
  const answered = answeredMeaningCount();
  const route = ROUTES[meaningRouteKey()];
  meaningEls.routeNote.textContent = meaningState.answers.opening ? `${route.name}: ${route.reason}` : "Your first answer will select a deeper route.";
  meaningEls.mapBasis.textContent = `${answered} of 7 answers classified`;
  meaningEls.map.setAttribute(
    "aria-label",
    answered
      ? MEANING_FAMILY_ORDER.map((family) => `${MEANING_FAMILIES[family].name}: ${counts[family]}`).join("; ")
      : "No uses of the word wrong classified yet",
  );
  meaningEls.map.innerHTML = MEANING_GROUPS.map((group) => `
    <section class="meaning-map-group">
      <h3>${group.name}</h3>
      <div class="meaning-map-rows">
        ${group.families.map((familyId) => {
          const family = MEANING_FAMILIES[familyId];
          const count = counts[familyId];
          return `
            <div class="meaning-map-row ${count ? "active" : ""}">
              <span class="meaning-map-index">${family.index}</span>
              <div class="meaning-map-copy">
                <strong>${family.name}</strong>
                <small>${family.theory}</small>
                <span class="meaning-meter" aria-hidden="true"><i style="width: ${(count / 7) * 100}%"></i></span>
              </div>
              <b>${count}</b>
            </div>`;
        }).join("")}
      </div>
    </section>`).join("");
}

function renderMeaningQuestion({ scroll = true, announce = true } = {}) {
  const questions = activeMeaningQuestions();
  const question = activeMeaningQuestion();
  const number = meaningState.index + 1;
  const selectedId = meaningState.answers[question.id];
  meaningEls.phase.textContent = question.phase;
  meaningEls.progress.textContent = `${number} / ${questions.length}`;
  meaningEls.progressTrack.setAttribute("aria-valuenow", String(number));
  meaningEls.progressBar.style.width = `${(number / questions.length) * 100}%`;
  meaningEls.number.textContent = String(number).padStart(2, "0");
  meaningEls.axis.textContent = question.axis;
  meaningEls.prompt.textContent = question.prompt;
  meaningEls.context.textContent = question.context;
  meaningEls.assumptions.textContent = question.assumptions;
  meaningEls.scope.textContent = question.scope;
  meaningEls.plain.textContent = question.guide.plain;
  meaningEls.separate.textContent = question.guide.separate;
  meaningEls.reveal.textContent = question.guide.reveal;
  meaningEls.why.textContent = question.why;
  meaningEls.explanation.open = false;
  meaningEls.back.disabled = number === 1;
  meaningEls.back.classList.toggle("invisible-control", number === 1);
  meaningEls.next.disabled = !selectedId;
  meaningEls.next.textContent = number === questions.length ? "See diagnostic →" : "Next question →";
  meaningEls.choices.innerHTML = question.choices.map((choice, index) => `
    <label class="choice-button obligation-choice meaning-choice ${selectedId === choice.id ? "selected" : ""}" for="meaning-${question.id}-${choice.id}">
      <input class="choice-radio" type="radio" name="meaning-${question.id}" id="meaning-${question.id}-${choice.id}" value="${choice.id}" ${selectedId === choice.id ? "checked" : ""}>
      <span class="choice-key">${String.fromCharCode(65 + index)}</span>
      <span class="choice-copy"><strong>${choice.label}</strong><span>${choice.detail}</span></span>
      <span class="choice-arrow" aria-hidden="true">→</span>
    </label>`).join("");
  meaningEls.choices.querySelectorAll(".choice-radio").forEach((input) => {
    input.addEventListener("change", () => selectMeaningAnswer(question.id, input.value));
  });
  renderMeaningMap();
  if (announce) meaningEls.liveStatus.textContent = `Question ${number} of ${questions.length}: ${question.prompt}`;
  if (scroll) scrollToMeaningElement(meaningEls.workspace, 82);
}

function selectMeaningAnswer(questionId, choiceId) {
  const oldRoute = meaningRouteKey();
  meaningState.answers[questionId] = choiceId;
  if (questionId === "opening" && oldRoute !== meaningRouteKey()) pruneInactiveMeaningAnswers();
  meaningEls.choices.querySelectorAll(".meaning-choice").forEach((label) => {
    label.classList.toggle("selected", label.querySelector(".choice-radio").checked);
  });
  meaningEls.next.disabled = false;
  renderMeaningMap();
  meaningEls.liveStatus.textContent = `Answer selected for question ${meaningState.index + 1}. Choose Next when ready.`;
}

function renderMeaningShiftReport(diagnosis) {
  const comparison = diagnosis.comparison;
  const comparisonCopy = comparison
    ? `<article class="argument-note ${comparison.stable ? "stable-note" : "path-note"}">
        <span class="argument-note-label">Opening and final definition</span>
        <h3>${comparison.title}</h3>
        <p>${comparison.detail}</p>
      </article>`
    : "";
  const combinationCopy = diagnosis.combinations.length
    ? diagnosis.combinations.map((item) => `<article class="argument-note meaning-combination-note">
        <span class="argument-note-label">Combination to clarify</span>
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
      </article>`).join("")
    : '<p class="argument-empty">No coded cross-family combination appeared. This means the narrow comparisons in this lab were not triggered; it is not proof of a complete theory.</p>';
  document.querySelector("#meaningShiftReport").innerHTML = `
    ${comparisonCopy}
    <article class="argument-note route-note">
      <span class="argument-note-label">Route selected by your opening answer</span>
      <h3>${diagnosis.route.name}</h3>
      <p>${diagnosis.route.reason}</p>
    </article>
    <div class="meaning-combination-list">${combinationCopy}</div>`;
}

function renderMeaningAnswerPath() {
  document.querySelector("#meaningAnswerGrid").innerHTML = selectedMeaningAnswers().map(({ question, choice }, index) => {
    const family = MEANING_FAMILIES[choice.family];
    return `<article class="meaning-answer-card">
      <span>${String(index + 1).padStart(2, "0")} · ${family.theory}</span>
      <h3>${question.axis}</h3>
      <strong>${choice.label}</strong>
      <p>${choice.interpretation}</p>
    </article>`;
  }).join("");
}

function renderMeaningFamilyGuide(diagnosis) {
  document.querySelector("#meaningFamilyGrid").innerHTML = MEANING_FAMILY_ORDER.map((familyId) => {
    const family = MEANING_FAMILIES[familyId];
    const count = diagnosis.counts[familyId];
    return `<article class="meaning-family-card ${count ? "used" : ""}">
      <div><span>${family.index}</span><b>${count} / 7 uses</b></div>
      <h3>${family.theory}</h3>
      <strong>${family.name}</strong>
      <p>${family.note}</p>
    </article>`;
  }).join("");
}

function showMeaningResults() {
  const diagnosis = meaningDiagnostic();
  meaningEls.workspace.classList.add("hidden");
  meaningEls.results.classList.remove("hidden");
  meaningEls.resultMapMount.append(meaningEls.mapCard);
  meaningEls.mapCard.classList.add("result-meaning-map");
  renderMeaningMap();
  document.querySelector("#meaningResultTitle").textContent = diagnosis.title;
  document.querySelector("#meaningResultSummary").textContent = diagnosis.summary;
  document.querySelector("#meaningPrimary").textContent = diagnosis.primary;
  document.querySelector("#meaningPrimaryCopy").textContent = diagnosis.primaryCopy;
  document.querySelector("#meaningPattern").textContent = diagnosis.pattern;
  document.querySelector("#meaningPatternCopy").textContent = diagnosis.patternCopy;
  document.querySelector("#meaningOpeningFinal").textContent = diagnosis.comparison.title;
  document.querySelector("#meaningOpeningFinalCopy").textContent = diagnosis.comparison.detail;
  document.querySelector("#meaningAIProbePrompt").value = buildMeaningAIProbePrompt();
  renderMeaningShiftReport(diagnosis);
  renderMeaningAnswerPath();
  renderMeaningFamilyGuide(diagnosis);
  meaningEls.liveStatus.textContent = `Meaning diagnostic ready: ${diagnosis.title}`;
  scrollToMeaningElement(meaningEls.results, 70);
}

function resetMeaningLab() {
  meaningState.answers = {};
  meaningState.index = 0;
  meaningEls.results.classList.add("hidden");
  meaningEls.workspace.classList.remove("hidden");
  meaningEls.liveMapMount.append(meaningEls.mapCard);
  meaningEls.mapCard.classList.remove("result-meaning-map");
  renderMeaningQuestion({ announce: true });
}

meaningEls.back.addEventListener("click", () => {
  if (meaningState.index === 0) return;
  meaningState.index -= 1;
  renderMeaningQuestion();
});

meaningEls.next.addEventListener("click", () => {
  const question = activeMeaningQuestion();
  if (!meaningState.answers[question.id]) return;
  if (meaningState.index >= activeMeaningQuestions().length - 1) {
    showMeaningResults();
    return;
  }
  meaningState.index += 1;
  renderMeaningQuestion();
});

document.querySelector("#resetMeaningButton").addEventListener("click", () => {
  if (!answeredMeaningCount() || window.confirm("Reset every answer in the meaning lab?")) resetMeaningLab();
});

document.querySelector("#restartMeaningButton").addEventListener("click", resetMeaningLab);

document.querySelector("#copyMeaningPromptButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const prompt = document.querySelector("#meaningAIProbePrompt");
  const status = document.querySelector("#meaningPromptCopyStatus");
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

renderMeaningQuestion({ scroll: false, announce: false });
