"use strict";

const DECODER_LAYERS = {
  surface: {
    index: "00",
    name: "Surface clash only",
    short: "The two verdicts conflict, but the source of the conflict is still unknown.",
    zone: "diagnose",
    method: "Ask before assuming",
  },
  scope: {
    index: "01",
    name: "Definitions or framing",
    short: "The speakers are using a key phrase for different policies, cases, or boundaries.",
    zone: "clarify",
    method: "Define the same case",
  },
  evidence: {
    index: "02",
    name: "Empirical predictions",
    short: "The speakers expect different observable effects from the same policy.",
    zone: "evidence",
    method: "Compare evidence",
  },
  interests: {
    index: "03",
    name: "Whose interests matter",
    short: "The speakers disagree about whose interests must be included before any included interests are weighed.",
    zone: "deliberate",
    method: "Map everyone affected",
  },
  priority: {
    index: "04",
    name: "Priority among shared values",
    short: "The speakers share important values but rank them differently when those values conflict.",
    zone: "deliberate",
    method: "Explain and negotiate priorities",
  },
  attitude: {
    index: "05",
    name: "Personal attitudes and commitments",
    short: "The speakers take opposing practical stances even after accurately reporting each other’s stance.",
    zone: "commitment",
    method: "Persuade, compromise, or acknowledge the clash",
  },
  coordination: {
    index: "06",
    name: "Rules for social coordination",
    short: "A group needs one workable public rule even though its members do not share one moral outlook.",
    zone: "design",
    method: "Design a common rule",
  },
  procedure: {
    index: "07",
    name: "Procedure for reaching a decision",
    short: "The speakers dispute who may decide, how reasons are heard, and how a decision can be challenged.",
    zone: "procedure",
    method: "Choose and defend a process",
  },
  moral: {
    index: "08",
    name: "Alleged moral facts",
    short: "The speakers make opposing claims about an objective moral status that approval does not create.",
    zone: "metaethical",
    method: "Make the metaethical case",
  },
  mixed: {
    index: "M",
    name: "Several layers at once",
    short: "One exchange contains more than one independently stated source of disagreement.",
    zone: "diagnose",
    method: "Name every stated layer",
  },
};

const DECODER_LAYER_ORDER = ["scope", "evidence", "interests", "priority", "attitude", "coordination", "procedure", "moral"];
const DECODER_CHECK_ORDER = ["surface", ...DECODER_LAYER_ORDER, "mixed"];

const DECODER_ZONES = [
  {
    id: "evidence",
    name: "Evidence-responsive",
    layers: ["evidence"],
    action: "Define the outcome, compare genuinely similar cases, check base rates, and ask what result would change each prediction.",
    limit: "Evidence may fully resolve some claims and only narrow others. It does not, by itself, set an acceptable level of risk.",
  },
  {
    id: "clarify",
    name: "Clarify first",
    layers: ["scope"],
    action: "Define the act, policy, population, and disputed words before comparing verdicts about one shared subject.",
    limit: "Clear wording can remove confusion. But people may also have a substantive dispute about which definition or frame should guide public discussion.",
  },
  {
    id: "deliberate",
    name: "Deliberative / sometimes negotiable",
    layers: ["interests", "priority"],
    action: "Map affected parties, expose exclusions, compare tradeoffs, and look for revised priorities or compromise.",
    limit: "Facts inform this work, but no dataset automatically grants standing or assigns weight. Deliberation may end in agreement, compromise, or a clearly stated impasse.",
  },
  {
    id: "commitment",
    name: "Commitment-dependent",
    layers: ["attitude"],
    action: "Use honest persuasion, changed experience, compromise, or explicit recognition that the practical stances remain opposed.",
    limit: "A true report about each person’s attitude does not make the attitudes jointly satisfiable or identify an objective winner. A moral dispute may also contain belief disagreements at the same time.",
  },
  {
    id: "design",
    name: "Institutional design",
    layers: ["coordination"],
    action: "Build a public rule with clear scope, safeguards, exceptions, records, and ways to revise it.",
    limit: "A workable rule can coordinate action without proving that everyone’s moral verdict has become true or false.",
  },
  {
    id: "procedure",
    name: "Procedure-dependent",
    layers: ["procedure"],
    action: "Decide who participates, what reasons count, how a decision is made, and when it is reviewed.",
    limit: "A procedure can settle what a group will do while leaving disagreement about the procedure—and about morality—alive. The process’s authority must itself be defended.",
  },
  {
    id: "metaethical",
    name: "Metaethical residual",
    layers: ["moral"],
    action: "Ask what an objective moral claim means, what could make it true, and how anyone could know that it is true.",
    limit: "Calling a disagreement ‘moral’ does not establish that objective moral facts exist; denying such facts does not end the practical conflict.",
  },
];

const DECODER_SKILL_GROUPS = [
  {
    id: "framing",
    name: "Restraint and integration",
    checks: ["surface", "mixed"],
    note: "Do not guess a hidden dispute from slogans; when several layers are stated, name all of them.",
  },
  {
    id: "factual",
    name: "Words and checkable claims",
    checks: ["scope", "evidence"],
    note: "Separate a shared subject from predictions that evidence can support, weaken, or sometimes settle.",
  },
  {
    id: "practical",
    name: "Standing, priorities, and plans",
    checks: ["interests", "priority", "attitude"],
    note: "Keep who receives standing, how competing values are ranked, and what each person favors as three different questions.",
  },
  {
    id: "institutional",
    name: "Rules and decision processes",
    checks: ["coordination", "procedure"],
    note: "Separate the public rule a group will follow from the process and authority used to choose that rule.",
  },
  {
    id: "metaethical",
    name: "Objective moral claims",
    checks: ["moral"],
    note: "Reserve this layer for an actual claim about moral truth that is not created by approval, law, or procedure.",
  },
];

const DECODER_QUESTIONS = [
  {
    id: "surface",
    phase: "Read the slogans",
    axis: "Checkpoint — before the details",
    prompt: "From these two sentences alone, what can you safely conclude about the source of Lina and Marcus’s disagreement?",
    dialogue: [
      { speaker: "Lina", text: "Assisted dying is not morally wrong." },
      { speaker: "Marcus", text: "No. Assisted dying is morally wrong." },
    ],
    context:
      "You have heard only these two lines. Neither person has yet defined assisted dying, described expected outcomes, named the people they are protecting, ranked any values, proposed a public rule, chosen a decision process, or explained what the word “morally” means.",
    assumptions:
      "Treat both statements as sincere. Do not add a legal policy, medical fact, religious view, philosophical theory, or personal history that the speakers have not stated.",
    scope:
      "Choose the strongest conclusion supported by the two slogans alone. The question is about what you know at this point, not which verdict you favor.",
    correct: "surface",
    displayOrder: ["evidence", "attitude", "surface", "moral"],
    why: "Opposite verdicts reveal a clash, but not yet the layer that produced it.",
    guide: {
      plain: "Two people can reach opposite moral sentences for very different reasons. The first task is to avoid guessing which reason is present.",
      separate: "A conflict between sentences is not yet proof of a factual dispute, a clash of values, a clash of attitudes, or a dispute about objective moral truth.",
      reveal: "Your answer shows whether you diagnose the structure before choosing a method for resolving it.",
    },
    choices: [
      {
        id: "surface",
        kind: "surface",
        label: "Their verdicts conflict, but these two lines do not reveal what kind of disagreement caused the conflict",
        detail: "They may differ about facts, wording, interests, priorities, attitudes, rules, procedures, alleged moral facts, or several of these at once. More questions are required.",
      },
      {
        id: "evidence",
        kind: "evidence",
        label: "They must be making different factual predictions about what an assisted-dying policy would cause",
        detail: "This conclusion treats the argument as an empirical dispute even though neither speaker has yet stated a prediction or referred to any observable outcome.",
      },
      {
        id: "attitude",
        kind: "attitude",
        label: "They must have opposite personal feelings, plans, or commitments, and no disagreement about beliefs",
        detail: "This conclusion assumes a clash of practical attitudes even though the slogans alone do not show whether either speaker is expressing an attitude, reporting a belief, or doing both.",
      },
      {
        id: "moral",
        kind: "moral",
        label: "They have directly identified one objective moral fact and are now disagreeing only about its truth",
        detail: "This conclusion assumes that both sentences aim at an approval-independent moral fact before either speaker has said what moral claims mean or what could make one true.",
      },
    ],
  },
  {
    id: "scope",
    phase: "Fix the subject",
    axis: "Layer 1 — definitions and framing",
    prompt: "Before Lina and Marcus compare moral verdicts, what is the most useful next move?",
    dialogue: [
      { speaker: "Lina", text: "I mean the lab’s narrow policy: terminal physical illness, two voluntary requests, two clinical assessments, a prescription, and the patient taking the medication." },
      { speaker: "Marcus", text: "I have been arguing against a wider policy that also includes clinician administration and requests based only on psychiatric suffering." },
    ],
    context:
      "The phrase “assisted dying” has been covering different practices in their conversation. Lina’s verdict concerns one narrow policy. Marcus’s verdict concerns a larger group of policies with different eligibility rules and different ways the medication is administered.",
    assumptions:
      "Both speakers now notice the mismatch and are willing to restate their views. No prediction about safety, benefit, coercion, or public trust has been offered yet.",
    scope:
      "Choose what they must do before treating their opposite verdicts as answers about the same policy. Do not decide which definition is politically better.",
    correct: "scope",
    displayOrder: ["scope", "evidence", "priority", "moral"],
    why: "Verdicts about different policies are not yet cleanly opposed verdicts about one shared subject.",
    guide: {
      plain: "They first need one exact case. Otherwise each person can defeat a position the other person did not take.",
      separate: "Clarifying a term is different from proving a policy safe. After the mismatch is exposed, they may still disagree substantively about which definition should guide public debate.",
      reveal: "Your answer tests whether you repair a scope mismatch before moving to evidence or values.",
    },
    choices: [
      {
        id: "scope",
        kind: "scope",
        label: "Write one exact policy description and have each person give a verdict about that same description",
        detail: "They should fix eligibility, voluntariness, who administers the medication, and what cases are excluded. Only then will their yes and no answers address the same proposal.",
      },
      {
        id: "evidence",
        kind: "evidence",
        label: "Begin comparing statistics about safeguards without first deciding which policy the statistics must describe",
        detail: "Evidence matters later, but data about one eligibility rule or form of administration cannot automatically answer a claim about a materially different policy.",
      },
      {
        id: "priority",
        kind: "priority",
        label: "Ask which person ranks autonomy above protection before checking whether their verdicts concern the same act",
        detail: "Value priorities may matter, but assigning them now would guess at a deeper dispute while leaving the simpler mismatch in policy scope unresolved.",
      },
      {
        id: "moral",
        kind: "moral",
        label: "Ask which verdict describes the objective moral fact before stating exactly what act receives that status",
        detail: "Even a moral realist would need to identify the same act or policy before two claims of objective permission and prohibition could directly contradict each other.",
      },
    ],
  },
  {
    id: "evidence",
    phase: "Test the predictions",
    axis: "Layer 2 — empirical expectations",
    prompt: "Now that the policy is fixed, what kind of disagreement do these new statements contain, and what could directly move it?",
    dialogue: [
      { speaker: "Lina", text: "A careful review will usually detect coercion, and reported errors will remain rare." },
      { speaker: "Marcus", text: "Family pressure and mistakes will often remain hidden, and permission will weaken patient trust." },
    ],
    context:
      "Both speakers now refer to the lab’s narrow policy. They agree that coercion, errors, and trust matter. They make different claims about how often those events will occur after the policy is introduced.",
    assumptions:
      "Neither forecast is declared true. Relevant records may be incomplete, different places may use different safeguards, and future effects may remain uncertain even after careful study.",
    scope:
      "Classify only the stated difference in their predictions. Do not infer that evidence will settle their acceptable level of risk or their final moral verdict.",
    correct: "evidence",
    displayOrder: ["scope", "attitude", "moral", "evidence"],
    why: "Claims about how often observable events will occur are empirical, even when they appear inside a moral argument.",
    guide: {
      plain: "They are predicting different things about the world. Better evidence can make those predictions more or less credible.",
      separate: "Evidence can estimate effects. It cannot, by itself, decide how much risk is acceptable or whether an outcome has an objective moral status.",
      reveal: "Your answer tests whether you identify the part of a moral argument that is genuinely evidence-responsive.",
    },
    choices: [
      {
        id: "evidence",
        kind: "evidence",
        label: "This is an empirical disagreement; compare clear definitions, outcome records, safeguards, and uncertainty",
        detail: "The speakers predict different observable rates of coercion, error, and lost trust. Evidence can test those forecasts, although limited data may leave a range rather than one certain answer.",
      },
      {
        id: "scope",
        kind: "scope",
        label: "This is still only a definition dispute, so no information about real outcomes is relevant to it",
        detail: "The policy is already fixed, and the disagreement concerns what will happen under it. Clarifying terms helps measurement but does not replace the need to examine evidence.",
      },
      {
        id: "attitude",
        kind: "attitude",
        label: "This is only a clash of personal approval and disapproval, because predictions cannot be true or false",
        detail: "The stated forecasts are beliefs about observable events. Lina and Marcus may also have attitudes, but these particular sentences can be supported or weakened by evidence.",
      },
      {
        id: "moral",
        kind: "moral",
        label: "This is already a direct test of objective moral truth, so outcome evidence has no separate role",
        detail: "Whether coercion and errors occur is a non-moral factual question. A later moral claim may use those facts, but the predictions do not become moral facts merely because they matter in debate.",
      },
    ],
  },
  {
    id: "interests",
    phase: "Map who is affected",
    axis: "Layer 3 — the field of concern",
    prompt: "Suppose Lina and Marcus accept the same outcome estimates. What difference is most clearly revealed by these statements?",
    dialogue: [
      { speaker: "Lina", text: "Only the patient’s informed interests and the treating team’s role should receive direct standing. Effects on other people are relevant evidence, not separate stakeholder claims." },
      { speaker: "Marcus", text: "Patients who may feel like burdens, clinicians who refuse, and people whose trust could change are also affected. Their interests should receive standing before we weigh anything." },
    ],
    context:
      "They accept the same predictions about how the policy affects each named group. They disagree about which effects make someone a participant whose interests must enter the public decision, before assigning any final weight.",
    assumptions:
      "Use the same narrow policy and empirical estimates. Lina does not deny that outsiders have reactions; Marcus does not yet say their interests outweigh the competent patient’s. The question is inclusion, not final priority.",
    scope:
      "Identify who each speaker says should receive standing in the decision. Keep that separate from the factual size of an effect and from the later question of which included interest should win.",
    correct: "interests",
    displayOrder: ["evidence", "interests", "priority", "procedure"],
    why: "Before values are ranked, arguments can differ over who and what enters the picture at all.",
    guide: {
      plain: "They disagree about who gets a place at the table before anyone decides whose concern is strongest.",
      separate: "Evidence helps show who is affected. Granting an affected person standing is different from deciding that this person’s interest outweighs every competing interest.",
      reveal: "Your answer tests whether you separate inclusion in the field of concern from the later ranking of included interests.",
    },
    choices: [
      {
        id: "interests",
        kind: "interests",
        label: "They disagree about whose interests receive standing; build one shared list of included and excluded groups before weighing them",
        detail: "They should state why requesting patients, non-requesting patients, families, clinicians, or the wider public do or do not count in this decision. Inclusion does not yet fix anyone’s final weight.",
      },
      {
        id: "evidence",
        kind: "evidence",
        label: "They are still making different numerical predictions, so another dataset alone will identify the missing side",
        detail: "The context holds their estimates fixed. Evidence can describe effects on each group, but the present dispute is whether those effects give each group standing in this decision.",
      },
      {
        id: "priority",
        kind: "priority",
        label: "They have already assigned final weights to every shared value, so stakeholder mapping would add nothing",
        detail: "The speakers have not yet assigned final weights. They first disagree about which interests enter the comparison at all, so priority is a later layer.",
      },
      {
        id: "procedure",
        kind: "procedure",
        label: "They disagree only about whether a legislature, court, or public panel should make the decision",
        detail: "No decision-making body is mentioned. Questions about representation may follow, but these statements first reveal different fields of concern.",
      },
    ],
  },
  {
    id: "priority",
    phase: "Expose the tradeoff",
    axis: "Layer 4 — shared values, different order",
    prompt: "What kind of disagreement remains when both speakers value autonomy and protection but choose differently when the two conflict?",
    dialogue: [
      { speaker: "Lina", text: "Protection matters, but a competent person’s repeated choice should normally control when the safeguards are met." },
      { speaker: "Marcus", text: "Choice matters, but preventing avoidable pressure should control when permission creates even a serious residual risk." },
    ],
    context:
      "Both speakers value personal control and protection from coercion. Both accept the same evidence and include the same stakeholders. They disagree about which shared value should take priority in the difficult cases left after safeguards.",
    assumptions:
      "Do not make the residual risk zero, and do not treat it as certain harm. Each person understands the tradeoff and can accurately state the value named by the other.",
    scope:
      "Classify the stated ordering of shared values. Do not reduce the dispute back to outcome estimates and do not assume one ordering is objectively correct.",
    correct: "priority",
    displayOrder: ["evidence", "priority", "interests", "procedure"],
    why: "Agreement about which values matter can coexist with disagreement about what should lead when they cannot all be fully satisfied.",
    guide: {
      plain: "They own many of the same tools but reach for them in a different order when the case becomes hard.",
      separate: "The size of a risk is an empirical question. The weight given to that risk against competent choice is a priority question.",
      reveal: "Your answer tests whether you can locate a value tradeoff after the facts and stakeholders have been aligned.",
    },
    choices: [
      {
        id: "priority",
        kind: "priority",
        label: "They rank shared values differently; make the tradeoff explicit and test whether reasons or compromise can revise it",
        detail: "The dispute concerns when autonomy should yield to protection, or protection to autonomy. Evidence informs the tradeoff, but it does not mechanically supply the final ordering.",
      },
      {
        id: "evidence",
        kind: "evidence",
        label: "They disagree only about the measured size of the risk, even though the context gives them the same estimate",
        detail: "Their empirical beliefs have been held constant. Repeating the estimate will not by itself explain why they assign different priority to competent choice and residual risk.",
      },
      {
        id: "interests",
        kind: "interests",
        label: "One speaker has not noticed any patients, families, clinicians, or relationships named by the other",
        detail: "The context says both speakers include the same stakeholders. The open question is how they order the competing values attached to those interests.",
      },
      {
        id: "procedure",
        kind: "procedure",
        label: "The dispute is already settled once both people can name a voting or review procedure",
        detail: "A procedure may later produce a public decision, but naming one does not itself remove the speakers’ different ranking of autonomy and protection.",
      },
    ],
  },
  {
    id: "attitude",
    phase: "Find the practical clash",
    axis: "Layer 5 — attitudes and commitments",
    prompt: "Both speakers can now describe the other’s position accurately. What is the remaining opposition in these statements?",
    dialogue: [
      { speaker: "Lina", text: "I understand your reasons. I still endorse allowing this narrow option, and I will work for that permission." },
      { speaker: "Marcus", text: "I understand your reasons. I still reject allowing it, and I will work to prevent that permission." },
    ],
    context:
      "Lina and Marcus are no longer mistaken about what the other believes or wants. Their plans cannot both control the same public rule: one is for permission and the other is against it.",
    assumptions:
      "Do not infer that either person is irrational, selfish, uninformed, or secretly using a different definition. They may still change through persuasion, experience, or compromise, and they may also retain belief disagreements not shown here.",
    scope:
      "Identify the practical opposition stated here. Distinguish disagreement in attitude from a factual disagreement about what attitudes the speakers have. Do not infer that the whole moral dispute is only a clash of attitudes.",
    correct: "attitude",
    displayOrder: ["scope", "evidence", "moral", "attitude"],
    why: "Two accurate reports about opposing commitments can both be true while the commitments themselves remain in conflict.",
    guide: {
      plain: "They understand each other and still pull in opposite directions. Learning another fact about who wants what does not automatically make the plans compatible.",
      separate: "“Lina supports permission” is a factual claim about Lina. Lina’s support and Marcus’s opposition are the practical attitudes that clash.",
      reveal: "Your answer tests whether you can distinguish incompatible stances from incompatible beliefs about those stances without denying that both may occur together.",
    },
    choices: [
      {
        id: "attitude",
        kind: "attitude",
        label: "Their practical attitudes and commitments oppose each other; persuasion or compromise may move them, but a fact lookup may not",
        detail: "Lina is for permission and Marcus is against it. Both can accurately understand that clash while still pursuing plans that cannot jointly set one public policy.",
      },
      {
        id: "evidence",
        kind: "evidence",
        label: "They disagree about the factual question of whether Lina supports permission and Marcus opposes it",
        detail: "Both speakers correctly report their own and each other’s stance. The factual descriptions can agree even though the practical attitudes they describe remain opposed.",
      },
      {
        id: "scope",
        kind: "scope",
        label: "They must still be using the phrase “narrow option” for different policies, despite the fixed definition",
        detail: "Nothing in the statements reopens the policy scope. Assuming a hidden verbal mismatch would avoid the explicit practical clash rather than explain it.",
      },
      {
        id: "moral",
        kind: "moral",
        label: "Opposite commitments by themselves prove that one speaker has detected an objective moral fact incorrectly",
        detail: "The statements express what each person supports and plans to do. Whether an approval-independent moral fact exists is a further question that has not been established here.",
      },
    ],
  },
  {
    id: "coordination",
    phase: "Build a common rule",
    axis: "Layer 6 — social coordination",
    prompt: "A hospital must act consistently next month. What kind of problem is now in front of the group?",
    dialogue: [
      { speaker: "Lina", text: "We need a rule that permits qualified requests, records every review, and lets unwilling clinicians opt out." },
      { speaker: "Marcus", text: "We need a rule that prohibits prescriptions but expands palliative care and records every end-of-life request." },
    ],
    context:
      "Patients and clinicians need to know what the hospital will do. The institution cannot simultaneously prescribe and prohibit prescriptions in the same qualifying case, so it must adopt one rule or a clearly divided set of roles.",
    assumptions:
      "The disagreement in personal attitudes remains. Both proposals can be made more detailed, and neither proposal is declared objectively moral or institutionally successful.",
    scope:
      "Classify the need for a shared, predictable rule. Do not confuse the content of the rule with the separate procedure used to select it.",
    correct: "coordination",
    displayOrder: ["coordination", "priority", "procedure", "evidence"],
    why: "A group needs rules for action even when the people governed by those rules do not share one moral theory.",
    guide: {
      plain: "The hospital cannot leave every case undefined. It needs a plan that people can follow, inspect, and revise.",
      separate: "The rule answers “What will we do?” The procedure answers “Who gets to decide that rule, and how?”",
      reveal: "Your answer tests whether you recognize institutional design as a practical problem in its own right.",
    },
    choices: [
      {
        id: "coordination",
        kind: "coordination",
        label: "This is a social-coordination problem; design one clear rule, its safeguards, exceptions, records, and revision points",
        detail: "The hospital needs predictable action despite unresolved moral disagreement. A workable policy can coordinate conduct without making every participant share its moral description.",
      },
      {
        id: "priority",
        kind: "priority",
        label: "The hospital needs only a private ranking of values from each employee, not any common operating rule",
        detail: "Private priorities help explain views, but patients and staff still need to know which actions the institution permits, requires, records, or assigns elsewhere.",
      },
      {
        id: "procedure",
        kind: "procedure",
        label: "This is only about which voting body chooses a rule, even though no decision process has yet been discussed",
        detail: "A selection procedure matters next. The present statements propose different rule contents, so the immediate layer is what common plan could coordinate action.",
      },
      {
        id: "evidence",
        kind: "evidence",
        label: "A complete dataset would itself write the hospital policy without any choice about aims, safeguards, or authority",
        detail: "Evidence can improve a rule and reveal effects. It does not automatically choose the institution’s aims, assign authority, or convert predicted outcomes into policy text.",
      },
    ],
  },
  {
    id: "procedure",
    phase: "Choose how to decide",
    axis: "Layer 7 — decision procedure",
    prompt: "Lina and Marcus can now state both policy options clearly. What does their next disagreement concern?",
    dialogue: [
      { speaker: "Lina", text: "Use a citizens’ panel with patients, disability advocates, clinicians, and public evidence, followed by a legislative vote and a two-year review." },
      { speaker: "Marcus", text: "A constitutional court should decide first because a temporary majority must not settle a question involving basic protections." },
    ],
    context:
      "The speakers no longer dispute what the two policy options say. They dispute who is authorized to decide, which institution should act first, what reasons receive a hearing, and when a decision may be reviewed.",
    assumptions:
      "Neither process is declared fair, lawful, or successful. Either process could produce Lina’s preferred policy, Marcus’s preferred policy, or a compromise.",
    scope:
      "Classify the disagreement about decision-making authority and process. Do not assume that a legitimate decision would create agreement or objective moral truth.",
    correct: "procedure",
    displayOrder: ["coordination", "interests", "procedure", "moral"],
    why: "A process can settle who decides and what happens next even when it cannot settle every underlying belief or commitment.",
    guide: {
      plain: "They now disagree about the referee and the rules of the decision, not merely about the policy choices on the table.",
      separate: "A procedure can produce a binding legal outcome. That does not mean it has proved an objective moral verdict or changed every participant’s mind.",
      reveal: "Your answer tests whether you separate agreement about how to decide from agreement about what is morally true.",
    },
    choices: [
      {
        id: "procedure",
        kind: "procedure",
        label: "They disagree about the decision procedure: who participates, which body acts, and how the result is reviewed",
        detail: "The next work is to defend a process and its authority. Even an accepted process may settle public action while leaving the original moral and practical disagreement in place.",
      },
      {
        id: "coordination",
        kind: "coordination",
        label: "They still disagree only about the wording of the hospital rule, not about who is allowed to choose it",
        detail: "The two policy contents are already clear. The new statements explicitly shift to the institutions, participants, sequence, and review that will select among them.",
      },
      {
        id: "interests",
        kind: "interests",
        label: "They are merely listing affected people, and questions of legal authority or review have not appeared",
        detail: "Stakeholder inclusion is part of Lina’s proposed procedure, but the dispute now concerns which decision structure has authority, not only whose interests exist.",
      },
      {
        id: "moral",
        kind: "moral",
        label: "Whichever process reaches a decision will thereby discover and prove the objective moral fact",
        detail: "A court, panel, or legislature can issue a decision under a rule of authority. That institutional fact does not by itself establish an approval-independent moral property.",
      },
    ],
  },
  {
    id: "moral",
    phase: "Locate the deepest claim",
    axis: "Layer 8 — alleged moral facts",
    prompt: "Imagine every earlier layer is resolved or deliberately set aside. What further kind of claim are Lina and Marcus now making?",
    dialogue: [
      { speaker: "Lina", text: "Even if every society rejected this narrow permission, it could still be objectively morally allowed." },
      { speaker: "Marcus", text: "Even if every society accepted it, it would still be objectively morally forbidden." },
    ],
    context:
      "Both statements claim a moral status that does not depend on current approval, law, custom, or voting results. They assign incompatible objective statuses to the same narrow policy.",
    assumptions:
      "The lab does not assume that objective moral facts exist or that they do not. It also does not assume that resolving facts, wording, interests, priorities, attitudes, rules, and procedures would resolve this final claim.",
    scope:
      "Identify the metaethical issue created by these approval-independent claims. Do not choose which assisted-dying verdict is correct.",
    correct: "moral",
    displayOrder: ["moral", "evidence", "attitude", "procedure"],
    why: "A claim about what remains morally true regardless of every approval is a claim about objective moral status, not merely a leftover practical dispute.",
    guide: {
      plain: "They are no longer only asking what happened, what people want, or what rule won. They are claiming that one answer is morally true independently of all of that.",
      separate: "An unresolved dispute is not automatically a dispute about moral facts. Here it becomes one because both speakers explicitly make approval-independent truth claims.",
      reveal: "Your answer tests whether you reserve metaethical analysis for an actual claim about the nature and truth of morality.",
    },
    choices: [
      {
        id: "moral",
        kind: "moral",
        label: "They now allege incompatible objective moral facts; ask what those claims mean, what could make one true, and how it could be known",
        detail: "This is the metaethical residual. Realists, relativists, constructivists, expressivists, and error theorists may explain the two sentences differently, so their meaning and truth cannot be assumed.",
      },
      {
        id: "evidence",
        kind: "evidence",
        label: "They are only predicting different measurable outcomes, although neither sentence mentions what will happen",
        detail: "Outcome evidence may still matter to their full arguments, but these statements explicitly concern moral status under imagined universal approval or rejection.",
      },
      {
        id: "attitude",
        kind: "attitude",
        label: "They are only reporting their private feelings, and both reports can settle the issue without further analysis",
        detail: "Some non-cognitivist theories interpret moral conflict through attitudes, but these speakers present their claims as approval-independent. The correct metaethical account remains to be argued.",
      },
      {
        id: "procedure",
        kind: "procedure",
        label: "A vote, court ruling, or citizens’ panel will make one objective moral status true by issuing a result",
        detail: "A procedure can create a legal or institutional result. The speakers explicitly claim a status that remains independent of what every society or process accepts.",
      },
    ],
  },
  {
    id: "mixed",
    phase: "Put the layers together",
    axis: "Final checkpoint — a mixed exchange",
    prompt: "This final exchange states several sources of disagreement at once. Which answer lists every layer that is explicit, without adding an unstated one?",
    dialogue: [
      { speaker: "Lina", text: "Under our shared narrow policy, I predict the reviews will catch almost all pressure. I rank patient choice ahead of the remaining risk. I will campaign for my side. A citizens’ panel should decide." },
      { speaker: "Marcus", text: "Under that same policy, I predict much pressure will stay hidden. I rank protection ahead of choice. I will campaign for my side. A constitutional court should decide." },
    ],
    context:
      "The two speakers explicitly make different predictions, rank the same values differently, announce opposed practical commitments, and name different decision procedures. They use the same policy definition and include the same affected groups. Neither makes an approval-independent moral claim in this exchange.",
    assumptions:
      "Count only the types of statements actually made. Do not add a definition dispute, an excluded stakeholder, a detailed hospital rule, or an objective moral-fact claim merely because one appeared earlier in the lab.",
    scope:
      "Choose the complete set of explicit layers. Count the stated reasons and plans, not the background fact that a public policy will eventually need to be chosen.",
    correct: "mixed",
    displayOrder: ["scope", "mixed", "evidence", "moral"],
    why: "Real moral arguments commonly contain several disputes at once, so a useful decode must name every supported layer and resist adding familiar but unstated ones.",
    guide: {
      plain: "This time there is no single layer to find. Read each sentence separately and keep a checklist of what it actually says.",
      separate: "Several layers can appear together without becoming one blended problem. A missing layer should remain unknown, even if it appeared elsewhere in the debate.",
      reveal: "Your answer tests whether you can combine the earlier distinctions when a realistic exchange moves across several layers quickly.",
    },
    choices: [
      {
        id: "mixed",
        kind: "mixed",
        resultName: "Predictions + priorities + attitudes + procedures",
        label: "Empirical predictions, priority among shared values, practical attitudes, and decision procedures",
        detail: "The exchange contains different forecasts, opposite value rankings, opposed plans to campaign, and different views about who should decide. It does not explicitly reopen definitions, stakeholder standing, or objective moral truth.",
      },
      {
        id: "scope",
        kind: "scope",
        resultName: "Definitions + stakeholder standing + moral facts",
        label: "Definitions or framing, whose interests receive standing, and alleged objective moral facts",
        detail: "Those layers can matter in the wider debate, but this exchange says the policy and included groups are shared and contains no claim that a moral status exists independently of approval.",
      },
      {
        id: "evidence",
        kind: "evidence",
        resultName: "Predictions only",
        label: "Empirical predictions only, because every later sentence is merely another way to state a forecast",
        detail: "The first sentence from each speaker is a prediction, but ranking values, announcing a campaign commitment, and choosing a court or panel are not additional forecasts about observable events.",
      },
      {
        id: "moral",
        kind: "moral",
        resultName: "Public rules + objective moral facts",
        label: "Rules for social coordination and alleged objective moral facts, with no factual or procedural disagreement",
        detail: "The exchange does not design a detailed operating rule or allege an approval-independent moral fact. It explicitly includes conflicting forecasts and different decision procedures.",
      },
    ],
  },
];

const decoderState = {
  index: 0,
  answers: {},
};

function decoderQuestion(id) {
  return DECODER_QUESTIONS.find((question) => question.id === id);
}

function decoderChoice(question, choiceId) {
  return question.choices.find((choice) => choice.id === choiceId);
}

function decoderDisplayChoices(question) {
  return question.displayOrder.map((choiceId) => decoderChoice(question, choiceId));
}

function decoderSelectedAnswers(answers = decoderState.answers) {
  return DECODER_QUESTIONS.filter((question) => answers[question.id]).map((question) => ({
    question,
    choice: decoderChoice(question, answers[question.id]),
    correct: answers[question.id] === question.correct,
  }));
}

function decoderDiagnostic(answers = decoderState.answers) {
  const selected = decoderSelectedAnswers(answers);
  const correctCount = selected.filter((answer) => answer.correct).length;
  const answered = selected.length;
  const layerCorrectCount = DECODER_LAYER_ORDER.filter((id) => answers[id] === decoderQuestion(id).correct).length;
  const framingCorrectCount = ["surface", "mixed"].filter((id) => answers[id] === decoderQuestion(id).correct).length;
  const skills = DECODER_SKILL_GROUPS.map((group) => ({
    ...group,
    correct: group.checks.filter((id) => answers[id] === decoderQuestion(id).correct).length,
    total: group.checks.length,
  }));
  let title = "The argument still has hidden layers.";
  let summary = "Several choices treated one kind of dispute as if it were another. Your map below shows exactly where to slow down and change methods.";
  if (correctCount === 10) {
    title = "You kept all ten checkpoints separate.";
    summary = "You identified the opening uncertainty, all eight single layers, and the final mixed exchange without adding an unstated dispute.";
  } else if (correctCount >= 8) {
    title = "You separated most of the disagreement.";
    summary = "Your classifications preserve most of the important boundaries. The few blended checkpoints below show where a different kind of question would help.";
  } else if (correctCount >= 5) {
    title = "Part of the argument is decoded.";
    summary = "You located several distinct disputes, while other choices still folded facts, values, procedures, or moral claims together.";
  }
  return {
    selected,
    answered,
    correctCount,
    openCount: answered - correctCount,
    layerCorrectCount,
    framingCorrectCount,
    skills,
    title,
    summary,
  };
}

function buildDecoderAIProbePrompt(answers = decoderState.answers) {
  const diagnosis = decoderDiagnostic(answers);
  const answerLines = diagnosis.selected.map(({ question, choice, correct }, index) => {
    const intended = DECODER_LAYERS[question.correct];
    const selectedName = choice.resultName || DECODER_LAYERS[choice.kind].name;
    const intendedChoice = decoderChoice(question, question.correct);
    const intendedName = intendedChoice.resultName || intended.name;
    return [
      `${index + 1}. ${question.axis}`,
      `Question: ${question.prompt}`,
      `Full context: ${question.context}`,
      `Fixed details: ${question.assumptions}`,
      `Scope: ${question.scope}`,
      `Dialogue: ${question.dialogue.map((line) => `${line.speaker}: “${line.text}”`).join(" | ")}`,
      `My selected answer: ${choice.label}`,
      `My answer's meaning: ${choice.detail}`,
      `Classification I selected: ${selectedName}`,
      `Best-matched classification in the stated dialogue: ${intendedName}`,
      `Match: ${correct ? "yes" : "no — examine why these layers were blended"}`,
    ].join("\n");
  }).join("\n\n");

  const zoneLines = DECODER_ZONES.map((zone) =>
    `- ${zone.name} (${zone.layers.map((layer) => DECODER_LAYERS[layer].name).join(", ")}): ${zone.action} Limit: ${zone.limit}`,
  ).join("\n");

  const skillLines = diagnosis.skills.map((skill) =>
    `- ${skill.name}: ${skill.correct}/${skill.total}. ${skill.note}`,
  ).join("\n");

  return `You are helping me analyze the structure of a moral disagreement. Act as a careful interviewer, not as a judge deciding assisted dying.

THE CASE USED BY THE LAB
“Assisted dying” normally means this invented, narrow policy: an adult is expected to die from an incurable physical illness within six months; can understand, compare, and communicate the choice; makes two voluntary requests at least fourteen days apart; is independently assessed by two clinicians for eligibility and signs of pressure; receives palliative-care information; and, if approved, personally takes prescribed life-ending medication. A clinician may refuse to participate. The policy excludes clinician administration and eligibility based only on psychiatric suffering unless a checkpoint explicitly discusses that mismatch.

MY DECODER RESULT
I matched ${diagnosis.correctCount} of 10 explicitly stated checkpoints: ${diagnosis.layerCorrectCount} of 8 single-layer checks and ${diagnosis.framingCorrectCount} of 2 restraint/integration checks. This is a classification result, not a score of my moral view, intelligence, or character.

MY FIVE SKILL GROUPS
${skillLines}

MY COMPLETE ANSWER PATH
${answerLines}

THE LAB'S RESOLUTION MAP
${zoneLines}

INTERVIEW INSTRUCTIONS
1. Ask one focused question at a time and wait for my answer.
2. First ask me for a real moral disagreement I want to decode. Require exact quotations or careful paraphrases from both sides before classifying it.
3. Test these layers separately: empirical predictions; definitions or framing; whose interests matter; priority among shared values; personal attitudes or commitments; rules for social coordination; procedures for reaching agreement; and alleged moral facts.
4. Do not infer a hidden layer merely because it would be common in similar debates. Mark it as unknown until the speakers state enough to support it.
5. For every factual prediction, define the measured outcome, identify genuinely comparable cases, check relevant base rates, say what evidence could change each prediction, and state what uncertainty remains. Evidence may settle some factual disputes; do not promise that it must settle every one.
6. For definitions, distinguish a fixable verbal mismatch from a substantive dispute about which framing should guide action.
7. For interests, first use evidence to ask who is affected; then separately ask whose interests each speaker grants standing in the decision. Do not confuse inclusion with the later weight assigned to an included interest.
8. For priorities, identify shared values, the exact tradeoff, and what reasons or compromise might change the ranking. Do not pretend data mechanically assigns weights.
9. Distinguish disagreement in attitude from disagreement about attitudes. Accurate reports of opposed plans can both be true while the plans remain incompatible. Do not infer that a whole moral dispute is only a clash of attitudes; belief disagreement may also be present.
10. Distinguish the content of a coordination rule from the procedure that chooses the rule.
11. Treat a vote, court ruling, agreement, or workable policy as a practical settlement unless a separate argument shows more. Ask why the procedure has authority. A decision procedure does not by itself create objective moral truth.
12. Do not assume that an unresolved conflict concerns objective moral facts. Ask what moral claims mean, what could make them true, and how anyone could know only when that issue is actually raised.
13. Do not assume moral realism or moral non-realism. Show how different metaethical views could interpret any genuine residual moral claim.
14. Expect several layers to occur in one exchange. List each layer supported by the words used, and keep common but unstated layers marked “unknown.”
15. End with a table that lists each layer, the evidence that it is present, the best next move, the likely limit of that move, and what disagreement would remain afterward.

Begin by asking me for the two opposing statements I want to decode.`;
}

const decoderEls = {
  liveStatus: document.querySelector("#decoderLiveStatus"),
  workspace: document.querySelector("#decoderLab"),
  results: document.querySelector("#decoderResults"),
  phase: document.querySelector("#decoderPhase"),
  progress: document.querySelector("#decoderProgress"),
  progressTrack: document.querySelector("#decoderProgressTrack"),
  progressBar: document.querySelector("#decoderProgressBar"),
  number: document.querySelector("#decoderQuestionNumber"),
  axis: document.querySelector("#decoderQuestionAxis"),
  prompt: document.querySelector("#decoderQuestionPrompt"),
  dialogue: document.querySelector("#decoderDialogue"),
  context: document.querySelector("#decoderQuestionContext"),
  assumptions: document.querySelector("#decoderAssumptions"),
  scope: document.querySelector("#decoderScope"),
  explanation: document.querySelector("#decoderExplanation"),
  plain: document.querySelector("#decoderPlain"),
  separate: document.querySelector("#decoderSeparate"),
  reveal: document.querySelector("#decoderReveal"),
  choices: document.querySelector("#decoderChoices"),
  why: document.querySelector("#decoderWhy"),
  back: document.querySelector("#decoderBackButton"),
  next: document.querySelector("#decoderNextButton"),
  mapKicker: document.querySelector("#decoderMapKicker"),
  mapNote: document.querySelector("#decoderMapNote"),
  mapBasis: document.querySelector("#decoderMapBasis"),
  liveMeter: document.querySelector("#decoderLiveMeter"),
  liveMeterBar: document.querySelector("#decoderLiveMeterBar"),
  matchedCount: document.querySelector("#decoderMatchedCount"),
  openCount: document.querySelector("#decoderOpenCount"),
  layerList: document.querySelector("#decoderLayerList"),
};

function scrollToDecoderElement(element, offset = 72) {
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function renderDecoderLiveMap() {
  const diagnosis = decoderDiagnostic();
  const percent = diagnosis.answered ? (diagnosis.correctCount / diagnosis.answered) * 100 : 0;
  decoderEls.mapKicker.textContent = diagnosis.answered === 10 ? "Your completed decoding" : "Your decoding so far";
  decoderEls.mapBasis.textContent = `${diagnosis.answered} of 10 checkpoints classified`;
  decoderEls.liveMeterBar.style.width = `${percent}%`;
  decoderEls.liveMeter.setAttribute(
    "aria-label",
    diagnosis.answered
      ? `${diagnosis.correctCount} of ${diagnosis.answered} classified checkpoints match the explicitly stated layer`
      : "No checkpoints classified yet",
  );
  decoderEls.matchedCount.textContent = String(diagnosis.correctCount);
  decoderEls.openCount.textContent = String(diagnosis.openCount);
  decoderEls.layerList.innerHTML = DECODER_QUESTIONS.map((question) => {
    const answer = decoderState.answers[question.id];
    const status = !answer ? "pending" : answer === question.correct ? "matched" : "revisit";
    return `<span class="decoder-layer-pip ${status}" title="${question.axis}">${question.id === "surface" ? "S" : DECODER_LAYERS[question.id].index}</span>`;
  }).join("");
}

function renderDecoderQuestion({ scroll = false, announce = true } = {}) {
  const question = DECODER_QUESTIONS[decoderState.index];
  const number = decoderState.index + 1;
  const selectedId = decoderState.answers[question.id];
  decoderEls.phase.textContent = question.phase;
  decoderEls.progress.textContent = `${number} / ${DECODER_QUESTIONS.length}`;
  decoderEls.progressTrack.setAttribute("aria-valuenow", String(number));
  decoderEls.progressBar.style.width = `${(number / DECODER_QUESTIONS.length) * 100}%`;
  decoderEls.number.textContent = String(number).padStart(2, "0");
  decoderEls.axis.textContent = question.axis;
  decoderEls.prompt.textContent = question.prompt;
  decoderEls.dialogue.innerHTML = question.dialogue.map((line) => `
    <blockquote><strong>${line.speaker}</strong><p>“${line.text}”</p></blockquote>`).join("");
  decoderEls.context.textContent = question.context;
  decoderEls.assumptions.textContent = question.assumptions;
  decoderEls.scope.textContent = question.scope;
  decoderEls.plain.textContent = question.guide.plain;
  decoderEls.separate.textContent = question.guide.separate;
  decoderEls.reveal.textContent = question.guide.reveal;
  decoderEls.why.textContent = question.why;
  decoderEls.explanation.open = false;
  decoderEls.back.disabled = number === 1;
  decoderEls.back.classList.toggle("invisible-control", number === 1);
  decoderEls.next.disabled = !selectedId;
  decoderEls.next.textContent = number === DECODER_QUESTIONS.length ? "See the full map →" : "Next layer →";
  decoderEls.choices.innerHTML = decoderDisplayChoices(question).map((choice, index) => `
    <label class="choice-button obligation-choice meaning-choice decoder-choice ${selectedId === choice.id ? "selected" : ""}" for="decoder-${question.id}-${choice.id}">
      <input class="choice-radio" type="radio" name="decoder-${question.id}" id="decoder-${question.id}-${choice.id}" value="${choice.id}" ${selectedId === choice.id ? "checked" : ""}>
      <span class="choice-key">${String.fromCharCode(65 + index)}</span>
      <span class="choice-copy"><strong>${choice.label}</strong><span>${choice.detail}</span></span>
      <span class="choice-arrow" aria-hidden="true">→</span>
    </label>`).join("");
  decoderEls.choices.querySelectorAll(".choice-radio").forEach((input) => {
    input.addEventListener("change", () => selectDecoderAnswer(question.id, input.value));
  });
  renderDecoderLiveMap();
  if (announce) decoderEls.liveStatus.textContent = `Question ${number} of ${DECODER_QUESTIONS.length}: ${question.prompt}`;
  if (scroll) scrollToDecoderElement(decoderEls.workspace, 82);
}

function selectDecoderAnswer(questionId, choiceId) {
  decoderState.answers[questionId] = choiceId;
  decoderEls.choices.querySelectorAll(".decoder-choice").forEach((label) => {
    label.classList.toggle("selected", label.querySelector(".choice-radio").checked);
  });
  decoderEls.next.disabled = false;
  renderDecoderLiveMap();
  decoderEls.liveStatus.textContent = `Answer selected for question ${decoderState.index + 1}. Choose Next when ready.`;
}

function renderDecoderFinalMap() {
  document.querySelector("#decoderFinalMap").innerHTML = DECODER_LAYER_ORDER.map((layerId) => {
    const layer = DECODER_LAYERS[layerId];
    const question = decoderQuestion(layerId);
    const choice = decoderChoice(question, decoderState.answers[layerId]);
    const matched = choice.id === question.correct;
    return `<article class="decoder-map-row ${matched ? "matched" : "revisit"}">
      <span class="decoder-map-index">${layer.index}</span>
      <div class="decoder-map-layer">
        <strong>${layer.name}</strong>
        <p>${layer.short}</p>
      </div>
      <div class="decoder-map-method">
        <span>${layer.method}</span>
        <small>${DECODER_ZONES.find((zone) => zone.id === layer.zone).name}</small>
      </div>
      <div class="decoder-map-selection">
        <b>${matched ? "Separated" : "Revisit"}</b>
        <small>You chose: ${DECODER_LAYERS[choice.kind].name}</small>
      </div>
    </article>`;
  }).join("");
}

function renderDecoderSkills(diagnosis) {
  document.querySelector("#decoderSkillGrid").innerHTML = diagnosis.skills.map((skill) => {
    const percent = (skill.correct / skill.total) * 100;
    return `<article class="decoder-skill-card">
      <div><strong>${skill.name}</strong><b>${skill.correct} / ${skill.total}</b></div>
      <span class="decoder-skill-meter" aria-hidden="true"><i style="width: ${percent}%"></i></span>
      <p>${skill.note}</p>
    </article>`;
  }).join("");
  document.querySelector("#decoderSkillGrid").setAttribute(
    "aria-label",
    diagnosis.skills.map((skill) => `${skill.name}: ${skill.correct} of ${skill.total}`).join("; "),
  );
}

function renderDecoderMethods() {
  document.querySelector("#decoderMethodGrid").innerHTML = DECODER_ZONES.map((zone) => `
    <article class="decoder-method-card">
      <span>${zone.layers.map((layer) => DECODER_LAYERS[layer].index).join(" + ")}</span>
      <h3>${zone.name}</h3>
      <strong>${zone.layers.map((layer) => DECODER_LAYERS[layer].name).join(" · ")}</strong>
      <p>${zone.action}</p>
      <small>${zone.limit}</small>
    </article>`).join("");
}

function renderDecoderAnswers(diagnosis) {
  document.querySelector("#decoderAnswerGrid").innerHTML = diagnosis.selected.map(({ question, choice, correct }, index) => {
    const intended = DECODER_LAYERS[question.correct];
    const intendedChoice = decoderChoice(question, question.correct);
    const selectedName = choice.resultName || DECODER_LAYERS[choice.kind].name;
    const intendedName = intendedChoice.resultName || intended.name;
    const successTitle = question.id === "mixed" ? "Combination separated" : "Layer separated";
    return `<article class="meaning-answer-card decoder-answer-card ${correct ? "matched" : "revisit"}">
      <span>${String(index + 1).padStart(2, "0")} · ${question.phase}</span>
      <h3>${correct ? successTitle : "Layers were blended or added"}</h3>
      <strong>You chose: ${selectedName}</strong>
      <p>${choice.detail}</p>
      <div class="decoder-answer-correction">
        <b>Best match: ${intendedName}</b>
        <p>${intended.short} ${correct ? "Your selected method fits this checkpoint." : `The clearer next move is: ${intended.method.toLowerCase()}.`}</p>
      </div>
    </article>`;
  }).join("");
}

function showDecoderResults() {
  const diagnosis = decoderDiagnostic();
  decoderEls.workspace.classList.add("hidden");
  decoderEls.results.classList.remove("hidden");
  document.querySelector("#decoderResultTitle").textContent = diagnosis.title;
  document.querySelector("#decoderResultSummary").textContent = diagnosis.summary;
  document.querySelector("#decoderScore").textContent = `${diagnosis.correctCount} / 10`;
  document.querySelector("#decoderScoreCopy").textContent = "This total combines eight single-layer checks with two checks of restraint and integration. It is not a moral score.";
  document.querySelector("#decoderLayerScore").textContent = `${diagnosis.layerCorrectCount} / 8`;
  document.querySelector("#decoderLayerScoreCopy").textContent = "Each of these exchanges was deliberately written to isolate one requested disagreement layer.";
  document.querySelector("#decoderFrameScore").textContent = `${diagnosis.framingCorrectCount} / 2`;
  document.querySelector("#decoderFrameScoreCopy").textContent = "These checks test whether you avoid guessing from slogans and can identify several explicit layers at once.";
  renderDecoderSkills(diagnosis);
  renderDecoderFinalMap();
  renderDecoderMethods();
  renderDecoderAnswers(diagnosis);
  document.querySelector("#decoderAIProbePrompt").value = buildDecoderAIProbePrompt();
  document.querySelector("#decoderResultTitle").focus({ preventScroll: true });
  scrollToDecoderElement(decoderEls.results, 72);
  decoderEls.liveStatus.textContent = `Diagnostic ready. ${diagnosis.correctCount} of 10 checkpoints were kept separate.`;
}

function resetDecoderLab() {
  decoderState.index = 0;
  decoderState.answers = {};
  decoderEls.results.classList.add("hidden");
  decoderEls.workspace.classList.remove("hidden");
  document.querySelector("#decoderPromptCopyStatus").textContent = "The prompt contains your answers but no name or account information.";
  renderDecoderQuestion({ scroll: true });
  decoderEls.prompt.focus({ preventScroll: true });
  decoderEls.liveStatus.textContent = "The Disagreement Decoder has been reset.";
}

async function copyDecoderPrompt() {
  const prompt = document.querySelector("#decoderAIProbePrompt");
  const status = document.querySelector("#decoderPromptCopyStatus");
  try {
    await navigator.clipboard.writeText(prompt.value);
    status.textContent = "Prompt copied. Nothing was sent by this site.";
  } catch {
    prompt.focus();
    prompt.select();
    status.textContent = "The prompt is selected. Copy it with your browser or keyboard command.";
  }
}

decoderEls.back.addEventListener("click", () => {
  if (decoderState.index === 0) return;
  decoderState.index -= 1;
  renderDecoderQuestion({ scroll: true });
  decoderEls.prompt.focus({ preventScroll: true });
});

decoderEls.next.addEventListener("click", () => {
  if (!decoderState.answers[DECODER_QUESTIONS[decoderState.index].id]) return;
  if (decoderState.index === DECODER_QUESTIONS.length - 1) {
    showDecoderResults();
    return;
  }
  decoderState.index += 1;
  renderDecoderQuestion({ scroll: true });
  decoderEls.prompt.focus({ preventScroll: true });
});

document.querySelector("#resetDecoderButton").addEventListener("click", resetDecoderLab);
document.querySelector("#restartDecoderButton").addEventListener("click", resetDecoderLab);
document.querySelector("#copyDecoderPromptButton").addEventListener("click", copyDecoderPrompt);

renderDecoderQuestion({ announce: false });
