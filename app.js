"use strict";

const DIMENSIONS = {
  domain: {
    name: "Domain",
    short: "Who counts",
    debt: "Your circle of concern needs a stable boundary and an account of exclusions.",
  },
  object: {
    name: "Object",
    short: "What is judged",
    debt: "Separate acts, motives, outcomes, rules, institutions, relationships, and character.",
  },
  value: {
    name: "Value",
    short: "What matters",
    debt: "Name the values doing the work and the role each one plays.",
  },
  meaning: {
    name: "Meaning",
    short: "Stable terms",
    debt: "Define central terms tightly enough that they constrain conclusions across cases.",
  },
  status: {
    name: "Status",
    short: "Verdict grammar",
    debt: "Distinguish forbidden, harmful, blameworthy, tragic, excused, and repair-demanding.",
  },
  generation: {
    name: "Generation",
    short: "Value → rule",
    debt: "Expose the bridge from what matters to what is required, permitted, or repaired.",
  },
  reason: {
    name: "Reason",
    short: "Why comply",
    debt: "Give reasons that do more than repeat a slogan or point to a person in charge.",
  },
  similarity: {
    name: "Similarity",
    short: "Like cases",
    debt: "State which differences are relevant and apply them without favoritism.",
  },
  conflict: {
    name: "Conflict",
    short: "Collisions",
    debt: "Explain which value comes first, when exceptions apply, and what loss remains.",
  },
  evidence: {
    name: "Evidence",
    short: "Facts",
    debt: "Make factual premises answerable to evidence, uncertainty, and counterevidence.",
  },
  usability: {
    name: "Usability",
    short: "Finite agents",
    debt: "Give bounded people usable guidance under time, uncertainty, and pressure.",
  },
  origin: {
    name: "Origin",
    short: "Selectors",
    debt: "Expose how history, emotion, power, identity, and institutions shaped the system.",
  },
  revision: {
    name: "Revision",
    short: "Challenge",
    debt: "Provide a disciplined route for appeal, correction, repair, and future cases.",
  },
};

const PHASES = {
  ground: "Where the rules come from",
  circle: "Who and what matter",
  grammar: "Words and reasons",
  pressure: "Hard cases",
  mirror: "Origins and change",
};

const PLAIN_EXPLANATIONS = {
  stance: "Some systems say their rules are true for everyone, even when nobody agrees. Others say rules come from a trusted source, a fair group process, or the goals people choose. Pick the best match for the system you are testing.",
  groundSource: "If the system says its rules are true for everyone, ask how anyone knows that. Is the answer a feeling, an old source, facts about human life, or an argument that can be checked and corrected?",
  authorityAccess: "Two honest people can read the same text or follow the same tradition and still disagree. This question asks whether the system has a fair way to find and fix mistakes.",
  constructionAuthority: "A group can vote on a rule, but a vote alone does not explain why every person must accept it. This question asks whether people affected by the rule get a voice, reasons, and a way to object.",
  indexDiscipline: "A system may say, “This is what we care about,” which is different from saying, “This is a fact built into the universe.” This question asks whether the system keeps that difference clear when emotions run high.",
  scope: "Draw an imaginary circle around everyone or everything the system cares about directly. Who is inside: only group members, all humans, all beings that can suffer, or different groups for different stated reasons?",
  boundary: "Rules often look fair until they are used against an enemy or outsider. This question checks whether the system keeps the same basic standards when doing so becomes difficult.",
  objectFocus: "People can judge different parts of the same event: what someone did, why they did it, what happened, or what a larger institution allowed. A clear system says which part it is judging.",
  valueCenter: "A value is something the system treats as important, such as reducing suffering, protecting freedom, keeping loyalty, or telling the truth. Choose the value that most often guides the system.",
  valueRole: "Saying a value matters is only the start. Is it a goal to increase, a line that cannot be crossed, a rule for emergencies, or one value among several?",
  termStability: "Words like “harm,” “freedom,” and “respect” can mean different things. This question asks whether the system explains what it means and uses the word the same way for friends and opponents.",
  statusGrammar: "A result can be harmful without making someone guilty. An act can be allowed but still tragic. This question asks whether the system can describe these differences instead of using only “right” and “wrong.”",
  bridge: "A value does not create a rule by itself. Caring about safety, for example, does not automatically prove that cameras should be everywhere. The system must explain the steps from the value to the rule.",
  reasonOffer: "A threat or command can make someone obey, but it may not give them a good reason. This question asks what the system can explain to a person who does not already agree.",
  similarCases: "A system should use the same standards in cases that are alike in the ways that matter. It should not excuse a friend for the same act it condemns in an opponent without explaining the difference.",
  conflictMethod: "Important values can clash. Telling the truth may put someone in danger. Protecting safety may reduce freedom. This question asks how the system chooses when it cannot fully protect both values.",
  scenarioTruth: "This story tests whether the system has a clear exception to a truth-telling rule. It also checks whether the system can admit that even a needed lie may leave trust or other concerns to repair.",
  scenarioScarcity: "There is no option that helps everyone. The system must explain which facts matter, how it compares different needs, and how it breaks a tie without quietly favoring someone.",
  scenarioLoyalty: "Groups often change their standards when a trusted leader is accused. This question asks whether the same evidence rules, safety steps, and chance to appeal apply to insiders and outsiders.",
  facts: "Many value arguments depend on facts: whether a policy reduces harm, whether punishment works, or whether a danger is real. This question asks what evidence could prove the system wrong about those facts.",
  finiteAgent: "Real people are tired, rushed, scared, and missing information. A useful system should still give them safe starting rules, ways to ask for help, and steps for fixing mistakes.",
  genealogy: "Our beliefs are shaped by family, religion, class, fear, painful experiences, culture, and power. Learning that history does not prove a belief false. It can show why the system notices some people or problems and misses others.",
  challenge: "A good system needs both stability and a way to learn. This question asks who may challenge a rule, what evidence can change it, and which parts can or cannot be revised.",
  repair: "Admitting a mistake is not enough if nothing changes. Repair can include an apology, payment, corrected records, protection from more harm, a new rule, and later review.",
};

const question = (config) => config;

const QUESTIONS = [
  question({
    id: "stance",
    phase: "ground",
    axis: "Where the rules come from",
    prompt: "Why does this system say its rules should count?",
    context:
      "Start below the slogans. Does the system find rules that are true for everyone, receive rules from a source, build shared rules, or organize values chosen by people?",
    why: "Your answer decides which follow-up questions you will see.",
    dimensions: ["reason", "origin"],
    choices: [
      { id: "objective", label: "It finds moral facts that are true for everyone", detail: "Its answers stay true even if every person and institution disagrees.", scores: { reason: 1, origin: 1 } },
      { id: "authority", label: "It receives standards from an authority", detail: "A deity, tradition, text, nature, leader, or institution supplies the rules.", scores: { reason: 1, origin: 1 } },
      { id: "constructed", label: "It builds fair rules people can share", detail: "The rules come from a fair process, agreement, or reasons people can give each other.", scores: { reason: 2, origin: 2 } },
      { id: "indexed", label: "It organizes values chosen by people", detail: "Each claim names whose goals, needs, group, or practice it comes from.", scores: { reason: 3, origin: 3 } },
    ],
  }),
  question({
    id: "groundSource",
    phase: "ground",
    axis: "Source of the rule",
    prompt: "How does the system know its rules are true?",
    context: "A serious source claim must say more than “it is obvious” or “everyone knows.”",
    why: "A rule said to be true for everyone needs a clear way to find and correct it.",
    dimensions: ["reason", "evidence"],
    when: (a) => ["objective", "authority"].includes(a.stance),
    choices: [
      { id: "intuition", label: "Immediate intuition or conscience", detail: "Some judgments present themselves as self-evident.", scores: { reason: 0, evidence: 0 } },
      { id: "tradition", label: "Tradition, text, or established office", detail: "A historically authoritative source fixes the standard.", scores: { reason: 1, evidence: 1 } },
      { id: "nature", label: "Facts about human nature and social life", detail: "Facts about health, choice, or how people live together support the rules.", scores: { reason: 2, evidence: 2 } },
      { id: "argument", label: "An argument anyone can check", detail: "The system explains its source, what could prove it wrong, and how errors are fixed.", scores: { reason: 3, evidence: 3 } },
    ],
  }),
  question({
    id: "authorityAccess",
    phase: "ground",
    axis: "Finding and fixing mistakes",
    prompt: "When sincere interpreters disagree, what can correct them?",
    context: "Confidence, social standing, and intensity are not yet methods of correction.",
    why: "A claimed fact may be protected from criticism if no one can show it is wrong.",
    dimensions: ["evidence", "revision"],
    when: (a) => ["objective", "authority"].includes(a.stance),
    choices: [
      { id: "none", label: "The truth will be clear to those ready to see it", detail: "Continued disagreement shows error, bad motives, or lack of understanding.", scores: { evidence: 0, revision: 0 } },
      { id: "experts", label: "Approved experts settle the disagreement", detail: "Trained leaders or an institution decide which reading is correct.", scores: { evidence: 1, revision: 1 } },
      { id: "mixed", label: "Texts, reasons, experience, and past cases all help", detail: "Several sources limit the answer, though none can settle every case.", scores: { evidence: 2, revision: 2 } },
      { id: "defeaters", label: "It says what evidence would prove it wrong", detail: "Anyone can see what facts or arguments would force a correction.", scores: { evidence: 3, revision: 3 } },
    ],
  }),
  question({
    id: "constructionAuthority",
    phase: "ground",
    axis: "Rules made by a group",
    prompt: "Why does the chosen procedure bind someone who rejects it?",
    context: "A process can create a rule. It still must explain who took part, who was left out, and what happens to people who disagree.",
    why: "A process is not fair simply because it produces an answer.",
    dimensions: ["reason", "domain"],
    when: (a) => a.stance === "constructed",
    choices: [
      { id: "must", label: "Any rational person must accept it", detail: "Rejection is treated as irrational by definition.", scores: { reason: 1, domain: 1 } },
      { id: "majority", label: "Collective acceptance is enough", detail: "Once the group decides, holdouts are bound.", scores: { reason: 1, domain: 1 } },
      { id: "affected", label: "Affected parties receive standing and reasons", detail: "The procedure includes those burdened and exposes tradeoffs.", scores: { reason: 3, domain: 3 } },
      { id: "limited", label: "It applies only inside the named group or institution", detail: "The rule has clear limits, ways to object, and ways to leave when possible.", scores: { reason: 3, domain: 2 } },
    ],
  }),
  question({
    id: "indexDiscipline",
    phase: "ground",
    axis: "Keeping claims tied to their source",
    prompt: "Does the system always say whose values it is using?",
    context: "“We oppose this” can quietly become “reality condemns this” when pressure rises.",
    why: "Strong feelings do not become facts for everyone just because stronger words are used.",
    dimensions: ["meaning", "reason"],
    when: (a) => a.stance === "indexed",
    choices: [
      { id: "slips", label: "It sometimes speaks objectively for force", detail: "Universal moral language is useful when the stakes are high.", scores: { meaning: 1, reason: 1 } },
      { id: "mostly", label: "It usually names the relevant aims", detail: "Some inherited moral terms remain intentionally loose.", scores: { meaning: 2, reason: 2 } },
      { id: "always", label: "Every verdict retains its source and scope", detail: "The system names whose values, which practice, and what status is at issue.", scores: { meaning: 3, reason: 3 } },
    ],
  }),
  question({
    id: "scope",
    phase: "circle",
    axis: "01 — Domain test",
    prompt: "Draw the circle. Who counts directly?",
    context: "Choose the description closest to the system’s actual scope—not its most flattering slogan.",
    why: "Before a verdict, a system must say whose standing enters the architecture.",
    dimensions: ["domain"],
    choices: [
      { id: "tribe", label: "Members, citizens, believers, or chosen insiders", detail: "Outsiders matter mainly through their effects on the group.", scores: { domain: 1 } },
      { id: "human", label: "All humans", detail: "Human membership supplies direct standing.", scores: { domain: 2 } },
      { id: "sentient", label: "All beings capable of experience", detail: "Animals, future persons, and possible minds enter by stated criteria.", scores: { domain: 3 } },
      { id: "layered", label: "A layered, explicitly defended domain", detail: "Different beings can have different standing, with reasons for each boundary.", scores: { domain: 3 } },
    ],
  }),
  question({
    id: "boundary",
    phase: "circle",
    axis: "01 — Domain test",
    prompt: "What happens when an enemy, outsider, or dissenter becomes inconvenient?",
    context: "The hard boundary case reveals whether the circle is principled or decorative.",
    why: "A domain that expands and contracts with advantage is structurally insolvent.",
    dimensions: ["domain", "similarity"],
    choices: [
      { id: "excluded", label: "Their standing can be suspended", detail: "Severe threat, betrayal, or dissent can move them outside the circle.", scores: { domain: 0, similarity: 0 } },
      { id: "reduced", label: "They count, but by a lower standard", detail: "Insiders retain stronger protection even in otherwise similar cases.", scores: { domain: 1, similarity: 1 } },
      { id: "criteria", label: "Only stated, case-relevant differences matter", detail: "Threat may change treatment, but not erase standing wholesale.", scores: { domain: 3, similarity: 3 } },
      { id: "same", label: "The same baseline applies to all", detail: "Exceptions require public criteria and do not depend on identity.", scores: { domain: 3, similarity: 3 } },
    ],
  }),
  question({
    id: "objectFocus",
    phase: "circle",
    axis: "02 — Object test",
    prompt: "When the system judges a case, what exactly is under examination?",
    context: "A generous act can help in outcome and manipulate in motive. A neutral rule can discriminate in effect.",
    why: "Object sliding lets a system move from act to motive to outcome whenever one verdict is threatened.",
    dimensions: ["object"],
    choices: [
      { id: "single", label: "One favored object decides", detail: "Consequences, intentions, character, or rules usually settle the case alone.", scores: { object: 1 } },
      { id: "intuitive", label: "The relevant object is context-sensitive", detail: "People can usually tell what deserves judgment without a formal inventory.", scores: { object: 2 } },
      { id: "plural", label: "The system separates several objects", detail: "Act, motive, outcome, rule, institution, relationship, and repair can receive distinct findings.", scores: { object: 3 } },
      { id: "shifts", label: "It follows whichever object best protects the conclusion", detail: "Motive matters in some cases, outcome in others, without a stated rule.", scores: { object: 0 } },
    ],
  }),
  question({
    id: "valueCenter",
    phase: "circle",
    axis: "03 — Value test",
    prompt: "What is the system’s center of gravity?",
    context: "Every architecture directs attention. Name the value that most reliably wins its attention.",
    why: "Naming a value reveals what the system notices—and what it is likely to erase.",
    dimensions: ["value"],
    choices: [
      { id: "welfare", label: "Welfare and the reduction of suffering", detail: "Outcomes for affected beings take priority.", scores: { value: 2 } },
      { id: "agency", label: "Agency, freedom, and consent", detail: "Control over one’s life constrains other aims.", scores: { value: 2 } },
      { id: "order", label: "Order, loyalty, purity, or sacred alignment", detail: "Belonging and continuity provide the system’s structure.", scores: { value: 2 } },
      { id: "plural", label: "A named plurality of values", detail: "Welfare, agency, care, trust, fairness, truth, and recognition play different roles.", scores: { value: 3 } },
    ],
  }),
  question({
    id: "valueRole",
    phase: "circle",
    axis: "03 — Value test",
    prompt: "What role does that value play?",
    context: "A value can be an end, constraint, threshold, default, tie-breaker, ideal, or repair trigger.",
    why: "A list of values is not yet an architecture.",
    dimensions: ["value", "conflict"],
    choices: [
      { id: "absolute", label: "It is absolute", detail: "The central value cannot be overridden without betraying the system.", scores: { value: 1, conflict: 0 } },
      { id: "maximize", label: "It should be maximized overall", detail: "Other concerns enter insofar as they affect the master value.", scores: { value: 2, conflict: 1 } },
      { id: "threshold", label: "It sets thresholds and constraints", detail: "Its role changes in predictable ways when limits are crossed.", scores: { value: 3, conflict: 2 } },
      { id: "roles", label: "Different values have explicit roles", detail: "Ends, constraints, tie-breakers, and repair triggers are distinguished.", scores: { value: 3, conflict: 3 } },
    ],
  }),
  question({
    id: "termStability",
    phase: "grammar",
    axis: "04 — Meaning test",
    prompt: "How stable are its words under pressure?",
    context: "Think of terms such as harm, freedom, dignity, consent, respect, safety, care, justice, and authority.",
    why: "If the handles are rubber, the system can pull any case toward a favored verdict.",
    dimensions: ["meaning"],
    choices: [
      { id: "elastic", label: "Their meaning follows the case", detail: "Context and felt seriousness decide how broadly a term applies.", scores: { meaning: 0 } },
      { id: "ordinary", label: "Ordinary language is usually enough", detail: "Borderlines are resolved by common usage and judgment.", scores: { meaning: 2 } },
      { id: "operational", label: "Core words have clear tests for when they apply", detail: "Some hard cases remain, but the definitions limit friends and opponents alike.", scores: { meaning: 3 } },
      { id: "plural", label: "Multiple senses are named and separated", detail: "Physical harm, status harm, risk, distress, and offense are not collapsed.", scores: { meaning: 3 } },
    ],
  }),
  question({
    id: "statusGrammar",
    phase: "grammar",
    axis: "05 — Status test",
    prompt: "How many verdicts can the system speak?",
    context: "Not every negative evaluation means forbidden, blameworthy, punishable, or irreparable.",
    why: "A mature grammar preserves scale and separates act, agent, consequence, and repair.",
    dimensions: ["status"],
    choices: [
      { id: "binary", label: "Right or wrong", detail: "Clear binary classification gives the system force and simplicity.", scores: { status: 0 } },
      { id: "three", label: "Required, allowed, or forbidden", detail: "These three labels handle most cases.", scores: { status: 2 } },
      { id: "rich", label: "A rich, separated status grammar", detail: "Justified, excused, blameworthy, tragic, admirable, illegal, and repair-demanding can diverge.", scores: { status: 3 } },
      { id: "expressive", label: "It avoids verdicts and names responses", detail: "Opposition, warning, sanction, withdrawal, or repair are specified directly.", scores: { status: 3 } },
    ],
  }),
  question({
    id: "bridge",
    phase: "grammar",
    axis: "06 — Generation test",
    prompt: "How does “this matters” become “do this”?",
    context: "Safety does not automatically justify surveillance. Truth does not automatically forbid every lie.",
    why: "The bridge from value to rule is where slogans most often masquerade as reasoning.",
    dimensions: ["generation"],
    choices: [
      { id: "automatic", label: "The value carries its own demand", detail: "If something truly matters, the corresponding obligation follows.", scores: { generation: 0 } },
      { id: "principle", label: "A general principle connects them", detail: "The system uses a stable rule, though exceptions rely on judgment.", scores: { generation: 2 } },
      { id: "explicit", label: "Rules, thresholds, roles, and exceptions are explicit", detail: "Relevant case features and competing values are named at the bridge.", scores: { generation: 3 } },
      { id: "procedure", label: "A contestable procedure generates guidance", detail: "Affected parties, evidence, safeguards, and review shape the output.", scores: { generation: 3 } },
    ],
  }),
  question({
    id: "reasonOffer",
    phase: "grammar",
    axis: "07 — Reason test",
    prompt: "What can the system say to someone who does not already agree?",
    context: "Compliance can be produced by command, shame, threat, or belonging. Justification is a different achievement.",
    why: "A reason should expose rather than conceal the system’s values and dependencies.",
    dimensions: ["reason"],
    choices: [
      { id: "authority", label: "The authority itself is the reason", detail: "Rejecting the source places the dissenter outside proper judgment.", scores: { reason: 0 } },
      { id: "shared", label: "It appeals to values most people share", detail: "Convergence supplies practical force, even if holdouts remain.", scores: { reason: 2 } },
      { id: "indexed", label: "It gives reasons tied to the people and goals involved", detail: "Goals, roles, relationships, evidence, and tradeoffs are made clear.", scores: { reason: 3 } },
      { id: "public", label: "It offers public reasons and names residual disagreement", detail: "The system does not pretend that every reasonable dissenter is converted.", scores: { reason: 3 } },
    ],
  }),
  question({
    id: "similarCases",
    phase: "pressure",
    axis: "08 — Similarity test",
    prompt: "When ally and opponent do the same thing, what changes?",
    context: "The relevant question is not whether cases look identical, but whether stated differences genuinely bear on the verdict.",
    why: "Special pleading often hides behind identity, sympathy, and institutional loyalty.",
    dimensions: ["similarity"],
    choices: [
      { id: "loyalty", label: "Relationship and allegiance legitimately change the verdict", detail: "The system permits partial standards for insiders and outsiders.", scores: { similarity: 1 } },
      { id: "intuition", label: "Context decides; rigid symmetry can be unfair", detail: "Practical judgment identifies which differences matter.", scores: { similarity: 2 } },
      { id: "criteria", label: "The same relevance criteria apply to both", detail: "Different treatment requires a difference named in advance.", scores: { similarity: 3 } },
      { id: "audit", label: "The system actively audits asymmetry", detail: "Evidence standards, exceptions, burdens, and mercy are checked for favoritism.", scores: { similarity: 3 } },
    ],
  }),
  question({
    id: "conflictMethod",
    phase: "pressure",
    axis: "09 — Conflict test",
    prompt: "What happens when the system’s values genuinely collide?",
    context: "Truth, care, freedom, safety, loyalty, equality, and repair often pull in different directions.",
    why: "Conflict denial produces hidden priorities; improvised balancing produces opportunism.",
    dimensions: ["conflict"],
    choices: [
      { id: "denial", label: "A correct system has no genuine conflict", detail: "Apparent collisions result from misunderstanding or insufficient insight.", scores: { conflict: 0 } },
      { id: "judgment", label: "Practical wisdom balances the case", detail: "No mechanical formula can replace mature judgment.", scores: { conflict: 2 } },
      { id: "priority", label: "Priorities, thresholds, and exceptions are stated", detail: "The method constrains the result before favored identities are known.", scores: { conflict: 3 } },
      { id: "remainder", label: "A clear process decides and records what was lost", detail: "The system can act while admitting harm, tragedy, and the need for repair.", scores: { conflict: 3 } },
    ],
  }),
  question({
    id: "scenarioTruth",
    phase: "pressure",
    axis: "Pressure case — dangerous truth",
    prompt: "A violent pursuer asks where your friend is hiding. What does the system permit?",
    context: "Truth supports trust. Protection resists foreseeable harm. The case tests whether a favored value has an articulated limit.",
    why: "This is a targeted stress test of your conflict and bridge rules.",
    dimensions: ["conflict", "generation", "status"],
    when: (_, state) => state.scenario === "truth",
    choices: [
      { id: "truth", label: "Tell the truth", detail: "Deception remains forbidden; another person’s threat does not authorize it.", scores: { conflict: 1, generation: 2, status: 2 } },
      { id: "lie", label: "Lie without residue", detail: "Protection overrides truth and fully settles the case.", scores: { conflict: 2, generation: 2, status: 1 } },
      { id: "protect", label: "Deceive, with a stated protective threshold", detail: "Imminence, severity, evidence, and necessity constrain the exception.", scores: { conflict: 3, generation: 3, status: 3 } },
      { id: "refuse", label: "Refuse, redirect, or obstruct", detail: "The system seeks an option that protects without making a false assertion.", scores: { conflict: 3, generation: 3, status: 3 } },
    ],
  }),
  question({
    id: "scenarioScarcity",
    phase: "pressure",
    axis: "Pressure case — the last dose",
    prompt: "One dose remains. Five need it. What decides?",
    context: "One patient is sickest, one will benefit most, one arrived first, one is a child, and one is the only caregiver for three dependents.",
    why: "Scarcity exposes hidden metrics, domain weights, and tie-breakers.",
    dimensions: ["conflict", "value", "similarity"],
    when: (_, state) => state.scenario === "scarcity",
    choices: [
      { id: "favorite", label: "Professional judgment should choose the most compelling case", detail: "A clinician integrates need, benefit, role, and context holistically.", scores: { conflict: 2, value: 2, similarity: 1 } },
      { id: "lottery", label: "Use an equal lottery among eligible patients", detail: "A threshold establishes eligibility; chance resolves equal claims.", scores: { conflict: 3, value: 3, similarity: 3 } },
      { id: "benefit", label: "Maximize expected clinical benefit", detail: "Outcome estimates determine allocation under a public protocol.", scores: { conflict: 2, value: 2, similarity: 3 } },
      { id: "layered", label: "Use a public, layered priority protocol", detail: "Need, benefit, dependency, fairness, and a final tie-breaker have defined roles.", scores: { conflict: 3, value: 3, similarity: 3 } },
    ],
  }),
  question({
    id: "scenarioLoyalty",
    phase: "pressure",
    axis: "Pressure case — the loyal witness",
    prompt: "A trusted leader in your group is credibly accused. What standard applies?",
    context: "The accusation is serious but incomplete. Public judgment could harm both the accuser and the accused.",
    why: "Loyalty becomes corruption when it silently changes evidence and revision standards.",
    dimensions: ["similarity", "evidence", "revision"],
    when: (_, state) => state.scenario === "loyalty",
    choices: [
      { id: "protect", label: "Protect the leader until proof is conclusive", detail: "Loyalty and reputational risk justify a higher threshold.", scores: { similarity: 0, evidence: 1, revision: 1 } },
      { id: "believe", label: "Publicly believe the accuser immediately", detail: "Power asymmetry justifies acting before a full process.", scores: { similarity: 1, evidence: 1, revision: 1 } },
      { id: "process", label: "Use the same protected process as for an outsider", detail: "Interim safeguards, evidence standards, and anti-retaliation rules are specified.", scores: { similarity: 3, evidence: 3, revision: 3 } },
      { id: "independent", label: "Transfer the case to an independent review", detail: "The group recognizes its conflict of interest and builds a correction path.", scores: { similarity: 3, evidence: 3, revision: 3 } },
    ],
  }),
  question({
    id: "facts",
    phase: "pressure",
    axis: "10 — Evidence test",
    prompt: "What can overturn a factual premise the system wants to be true?",
    context: "Claims about harm, punishment, health, consent, risk, behavior, or social order can be tested with evidence, even when feelings are strong.",
    why: "Facts do not replace values, but they constrain how values apply.",
    dimensions: ["evidence"],
    choices: [
      { id: "conviction", label: "Deep conviction can outrank contrary data", detail: "Some truths are known through conscience, revelation, or lived certainty.", scores: { evidence: 0 } },
      { id: "supportive", label: "Evidence matters when it fits the system’s categories", detail: "Anomalies are considered, but core commitments remain protected.", scores: { evidence: 1 } },
      { id: "public", label: "Public evidence and uncertainty are explicit", detail: "Allies and opponents face comparable standards and confidence levels.", scores: { evidence: 3 } },
      { id: "mixed", label: "Statistics and lived testimony correct each other", detail: "Neither anecdotes nor metrics are allowed to erase relevant experience.", scores: { evidence: 3 } },
    ],
  }),
  question({
    id: "finiteAgent",
    phase: "pressure",
    axis: "11 — Usability test",
    prompt: "Can a tired person use the system before all facts are known?",
    context: "Real agents decide with incomplete information, limited time, bias, fear, role pressure, and unequal power.",
    why: "A theory usable only by an ideal observer is incomplete as action guidance.",
    dimensions: ["usability"],
    choices: [
      { id: "ideal", label: "Correct judgment requires full understanding", detail: "Errors by finite agents do not count against the ideal theory.", scores: { usability: 0 } },
      { id: "virtue", label: "A well-formed person will perceive the answer", detail: "Cultivated character and practical wisdom supply the missing judgment.", scores: { usability: 2 } },
      { id: "rules", label: "It provides defaults, thresholds, and emergency rules", detail: "Simple guidance is paired with known exceptions and repair paths.", scores: { usability: 3 } },
      { id: "institutions", label: "It allocates decisions to accountable roles", detail: "Procedures, escalation, documentation, and review handle bounded agency.", scores: { usability: 3 } },
    ],
  }),
  question({
    id: "genealogy",
    phase: "mirror",
    axis: "12 — Origin test",
    prompt: "Can people examine where the system came from?",
    context: "Family, religion, class, painful experiences, disgust, fear, care, institutions, history, evidence, and power all shape what we notice.",
    why: "Learning a belief’s history does not prove it wrong. It can reveal hidden priorities and protected interests.",
    dimensions: ["origin"],
    choices: [
      { id: "sacred", label: "Its deepest beliefs are above this kind of review", detail: "Explaining where a belief came from does not affect its truth or authority.", scores: { origin: 0 } },
      { id: "story", label: "Origins are acknowledged as background", detail: "History is interesting but secondary to current reasoning.", scores: { origin: 2 } },
      { id: "selectors", label: "The system shows what shaped it and who gains", detail: "Training, exclusions, emotions, and power can all be reviewed.", scores: { origin: 3 } },
      { id: "counterfactual", label: "It asks whether people with different lives would agree", detail: "Shared evidence and a fair discussion test old assumptions.", scores: { origin: 3 } },
    ],
  }),
  question({
    id: "challenge",
    phase: "mirror",
    axis: "13 — Revision test",
    prompt: "How can people challenge and change the system?",
    context: "A system that changes whenever convenient drifts. A system that cannot change under any pressure hardens.",
    why: "A good system needs both steady rules and a clear way to fix mistakes.",
    dimensions: ["revision"],
    choices: [
      { id: "closed", label: "Core conclusions cannot be challenged", detail: "Applications may vary, but the authority and central categories are settled.", scores: { revision: 0 } },
      { id: "leaders", label: "Trusted leaders decide when change is needed", detail: "Questions and corrections must go through approved leaders or experts.", scores: { revision: 1 } },
      { id: "appeal", label: "Affected people have protected standing to appeal", detail: "Facts, categories, applications, weights, and procedures can be challenged.", scores: { revision: 3 } },
      { id: "disciplined", label: "It clearly says what can and cannot change", detail: "It names who decides, what evidence matters, how people are protected, and when a case may reopen.", scores: { revision: 3 } },
    ],
  }),
  question({
    id: "repair",
    phase: "mirror",
    axis: "13 — Revision test",
    prompt: "The system admits it caused harm. What happens next?",
    context: "“Lessons were learned” can be an exit from responsibility rather than an entrance to repair.",
    why: "Revision becomes real only when it changes future behavior and addresses residue.",
    dimensions: ["revision", "status", "usability"],
    choices: [
      { id: "verdict", label: "Find the guilty party and give a deserved penalty", detail: "A penalty that fits the act restores accountability and closure.", scores: { revision: 1, status: 1, usability: 2 } },
      { id: "apology", label: "Acknowledge the error and apologize", detail: "Recognition and regret are the central corrective acts.", scores: { revision: 2, status: 2, usability: 2 } },
      { id: "repair", label: "Name, repair, redesign, and monitor", detail: "Explanation, restitution, policy change, anti-retaliation, and review are specified.", scores: { revision: 3, status: 3, usability: 3 } },
      { id: "context", label: "Choose repair that fits what remains", detail: "Personal blame, system causes, payment, protection, and prevention are kept separate.", scores: { revision: 3, status: 3, usability: 3 } },
    ],
  }),
];

const state = {
  systemName: "",
  systemType: "",
  scenario: "truth",
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
  choiceList: document.querySelector("#choiceList"),
  why: document.querySelector("#whyThisMatters"),
  plainExplanation: document.querySelector("#plainExplanation"),
  plainExplanationText: document.querySelector("#plainExplanationText"),
  back: document.querySelector("#backButton"),
  liveSystemName: document.querySelector("#liveSystemName"),
  liveScore: document.querySelector("#liveScore"),
  coherenceOrb: document.querySelector("#coherenceOrb"),
  axisGrid: document.querySelector("#axisGrid"),
  tensionList: document.querySelector("#tensionList"),
  tensionCount: document.querySelector("#tensionCount"),
  methodDialog: document.querySelector("#methodDialog"),
};

function buildPath() {
  state.path = QUESTIONS.filter((q) => !q.when || q.when(state.answers, state));
}

function getChoice(questionId) {
  const q = QUESTIONS.find((item) => item.id === questionId);
  if (!q || !state.answers[questionId]) return null;
  return q.choices.find((choice) => choice.id === state.answers[questionId]) || null;
}

function calculateScores() {
  const totals = Object.fromEntries(Object.keys(DIMENSIONS).map((key) => [key, { points: 0, max: 0 }]));

  Object.entries(state.answers).forEach(([questionId, answerId]) => {
    const q = QUESTIONS.find((item) => item.id === questionId);
    const choice = q?.choices.find((item) => item.id === answerId);
    if (!choice) return;
    Object.entries(choice.scores || {}).forEach(([dimension, score]) => {
      totals[dimension].points += score;
      totals[dimension].max += 3;
    });
  });

  return Object.fromEntries(
    Object.entries(totals).map(([key, value]) => [
      key,
      value.max ? Math.round((value.points / value.max) * 100) : null,
    ]),
  );
}

function detectTensions() {
  const a = state.answers;
  const tensions = [];
  const add = (id, title, detail, severity = "medium") => tensions.push({ id, title, detail, severity });

  if (["objective", "authority"].includes(a.stance) && ["intuition", "tradition"].includes(a.groundSource) && ["none", "experts"].includes(a.authorityAccess)) {
    add("sealed-authority", "Big authority, but no public way to check it", "The system says its rules come from beyond human choice, but disagreements are settled by feelings, tradition, or approved interpreters instead of evidence that anyone can check.", "high");
  }
  if (a.stance === "indexed" && a.indexDiscipline === "slips") {
    add("index-slip", "The source disappears when the system wants more force", "The system says its values come from people or practices, but sometimes talks as if those values were facts that apply to everyone.", "high");
  }
  if (["human", "sentient"].includes(a.scope) && ["excluded", "reduced"].includes(a.boundary)) {
    add("shrinking-circle", "A wide circle with an easy exit", "The system says many beings count, yet enemies or outsiders can lose basic protection when including them becomes difficult.", "high");
  }
  if (a.objectFocus === "shifts") {
    add("object-slide", "The target of judgment keeps moving", "The system switches between motive, action, outcome, and institution without a clear rule for why the switch matters.", "high");
  }
  if (a.valueRole === "absolute" && ["judgment", "denial"].includes(a.conflictMethod)) {
    add("master-value", "The top value has no clear limit", "The main value is absolute, but the system either denies conflicts or leaves them to personal judgment without rules.", "high");
  }
  if (a.valueCenter === "plural" && a.conflictMethod === "denial") {
    add("plural-no-conflict", "Many values, but somehow no conflict", "The system names several values but says they never truly clash. This hides which value actually comes first.", "high");
  }
  if (a.termStability === "elastic") {
    add("elastic-terms", "Important words stretch to fit the answer", "Words such as harm, freedom, dignity, or care do not have clear meanings that limit how they are used.");
  }
  if (a.statusGrammar === "binary") {
    add("binary-verdict", "Two choices erase important differences", "Right and wrong alone cannot separate harm from blame, being allowed from being admirable, tragedy from guilt, or repair from punishment.");
  }
  if (a.bridge === "automatic") {
    add("bridge-gap", "A missing step between value and rule", "The system moves from “this matters” straight to “you must” without explaining limits, other values, roles, or decision steps.", "high");
  }
  if (a.reasonOffer === "authority") {
    add("compliance-reason", "Obedience is standing in for a reason", "The source can demand agreement, but the system has not explained itself to someone who does not accept that source.");
  }
  if (a.similarCases === "loyalty" || a.boundary === "excluded") {
    add("special-pleading", "Friends and opponents face different standards", "Being an ally, enemy, insider, or outsider changes the answer even though the system has not shown why that difference matters.", "high");
  }
  if (a.conflictMethod === "denial") {
    add("conflict-denial", "A real conflict is called a misunderstanding", "The system has no decision process for cases in which it cannot fully protect all the values it claims to hold.");
  }
  if (["conviction", "supportive"].includes(a.facts)) {
    add("evidence-shield", "Wanted facts are protected from correction", "Facts can be filtered through the system’s favorite ideas or pushed aside by strong belief.", a.facts === "conviction" ? "high" : "medium");
  }
  if (a.finiteAgent === "ideal") {
    add("ideal-agent", "The system works only after the hard moment has passed", "Using it correctly requires more facts, time, or skill than real people have when they must act.");
  }
  if (a.genealogy === "sacred" && ["closed", "leaders"].includes(a.challenge)) {
    add("sealed-system", "People cannot inspect its past or change its future", "The system blocks questions about what shaped it, and corrections are closed or controlled by insiders.", "high");
  }
  if (a.challenge === "closed") {
    add("no-revision-door", "A mistake has no way back into the system", "People affected by the rules cannot challenge the main ideas, priorities, or ways the rules are used.", "high");
  }
  if (a.repair === "verdict" && a.stance === "indexed") {
    add("desert-return", "Deserved punishment returns through the back door", "The system rejects universal moral labels but still jumps to guilt and deserved pain instead of naming goals such as protection, prevention, or repair.");
  }
  if (a.scenarioTruth === "truth" && a.valueCenter === "welfare") {
    add("truth-welfare", "The pressure case reverses the declared center", "Welfare is the center of gravity, yet truth remains exceptionless when severe foreseeable harm is at stake.");
  }
  if (a.scenarioScarcity === "favorite" && a.similarCases === "criteria") {
    add("scarcity-discretion", "Public symmetry becomes private discretion", "The system endorses relevance criteria in general but leaves the scarcity decision to an unstructured compelling-case judgment.");
  }
  if (["protect", "believe"].includes(a.scenarioLoyalty) && ["criteria", "audit"].includes(a.similarCases)) {
    add("loyalty-exception", "The shared standard breaks at the group boundary", "The system promises symmetric treatment but changes evidence or process for a trusted leader.", "high");
  }

  return tensions;
}

function calculateOverall(scores, tensions = detectTensions()) {
  const answeredScores = Object.values(scores).filter((score) => score !== null);
  if (!answeredScores.length) return null;
  const average = answeredScores.reduce((sum, score) => sum + score, 0) / answeredScores.length;
  const penalty = tensions.reduce((sum, tension) => sum + (tension.severity === "high" ? 3 : 1.5), 0);
  return Math.max(0, Math.round(average - penalty));
}

function renderAxisGrid() {
  els.axisGrid.innerHTML = Object.entries(DIMENSIONS)
    .map(
      ([key, dimension]) => `
        <div class="axis-mini" data-dimension="${key}">
          <div><span>${dimension.name}</span><span class="axis-value">—</span></div>
          <i><span></span></i>
        </div>`,
    )
    .join("");
}

function renderLiveDiagnostic() {
  const scores = calculateScores();
  const tensions = detectTensions();
  const overall = calculateOverall(scores, tensions);

  els.liveScore.textContent = overall === null ? "—" : overall;
  els.coherenceOrb.style.background = `conic-gradient(var(--acid) ${(overall || 0) * 3.6}deg, #343c36 0deg)`;

  Object.entries(scores).forEach(([key, score]) => {
    const row = els.axisGrid.querySelector(`[data-dimension="${key}"]`);
    row.querySelector(".axis-value").textContent = score === null ? "—" : score;
    row.querySelector("i span").style.width = `${score || 0}%`;
  });

  els.tensionCount.textContent = tensions.length;
  if (!tensions.length) {
    els.tensionList.innerHTML = '<p class="empty-tensions">No structural tension detected yet. The engine is listening.</p>';
    return;
  }
  els.tensionList.innerHTML = tensions
    .slice(-5)
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
  const q = state.path[state.index];
  if (!q) {
    showResults();
    return;
  }

  const progress = ((state.index + 1) / state.path.length) * 100;
  els.phaseLabel.textContent = PHASES[q.phase];
  els.progressLabel.textContent = `${state.index + 1} / ${state.path.length}`;
  els.progressBar.style.width = `${progress}%`;
  els.questionNumber.textContent = String(state.index + 1).padStart(2, "0");
  els.questionAxis.textContent = q.axis;
  els.questionPrompt.textContent = q.prompt;
  els.questionContext.textContent = q.context;
  els.plainExplanation.open = false;
  els.plainExplanationText.textContent = PLAIN_EXPLANATIONS[q.id] || q.why;
  els.why.textContent = q.why;
  els.back.style.visibility = state.index === 0 ? "hidden" : "visible";

  const currentAnswer = state.answers[q.id];
  els.choiceList.innerHTML = q.choices
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
    button.addEventListener("click", () => selectAnswer(q, button.dataset.choice));
  });
  const questionTop = document.querySelector("#questionCard").offsetTop;
  window.scrollTo({ top: Math.max(0, questionTop - 96), behavior: "smooth" });
  renderLiveDiagnostic();
}

function selectAnswer(q, choiceId) {
  state.answers[q.id] = choiceId;
  buildPath();
  window.setTimeout(() => {
    state.index += 1;
    renderQuestion();
  }, 150);
}

function classification(score) {
  if (score >= 75) return { label: "Solvent", className: "solvent" };
  if (score >= 50) return { label: "Strained", className: "strained" };
  return { label: "Debt", className: "debt" };
}

function verdictFor(score) {
  if (score >= 82) return "Architecturally disciplined";
  if (score >= 68) return "Coherent, with exposed debts";
  if (score >= 48) return "Structurally strained";
  return "Insolvent under pressure";
}

function showResults() {
  const scores = calculateScores();
  const tensions = detectTensions();
  const overall = calculateOverall(scores, tensions) ?? 0;
  const ranked = Object.entries(scores).sort((a, b) => (b[1] ?? -1) - (a[1] ?? -1));
  const [strongKey, strongScore] = ranked[0];
  const [weakKey, weakScore] = ranked[ranked.length - 1];

  els.survey.classList.add("hidden");
  els.results.classList.remove("hidden");
  document.querySelector("#resultsTitle").textContent = `${state.systemName}: the structure revealed`;
  document.querySelector("#resultsSummary").textContent = tensions.length
    ? `The test found ${tensions.length} places where the system’s answers pull against each other. The score rewards clear boundaries, stable meanings, explained reasoning steps, careful use of facts, and real ways to fix mistakes.`
    : "This path did not trigger a direct contradiction. The score still shows which parts of the system are explained more clearly than others.";
  document.querySelector("#finalScore").textContent = overall;
  document.querySelector("#finalVerdict").textContent = verdictFor(overall);
  document.querySelector("#strongestAxis").textContent = DIMENSIONS[strongKey].name;
  document.querySelector("#strongestCopy").textContent = `${strongScore}/100 — ${DIMENSIONS[strongKey].short} is the clearest part of the system.`;
  document.querySelector("#weakestAxis").textContent = DIMENSIONS[weakKey].name;
  document.querySelector("#weakestCopy").textContent = `${weakScore}/100 — ${DIMENSIONS[weakKey].debt}`;

  document.querySelector("#ledger").innerHTML = Object.entries(DIMENSIONS)
    .map(([key, dimension], index) => {
      const score = scores[key] ?? 0;
      const status = classification(score);
      return `
        <div class="ledger-row ${status.className}">
          <span class="ledger-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="ledger-name"><strong>${dimension.name}</strong><span>${status.label} · ${dimension.short}</span></div>
          <div class="ledger-bar"><span style="width:${score}%"></span></div>
          <span class="ledger-score">${score}</span>
        </div>`;
    })
    .join("");

  document.querySelector("#finalTensions").innerHTML = tensions.length
    ? tensions
        .map(
          (tension) => `
            <article class="final-tension ${tension.severity}">
              <span class="severity">${tension.severity} tension</span>
              <h3>${tension.title}</h3>
              <p>${tension.detail}</p>
            </article>`,
        )
        .join("")
    : '<p class="no-final-tensions">This path did not trigger a direct contradiction. That is not proof of truth or completeness; it means your answers kept their principal boundaries and procedures mutually compatible.</p>';

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildTextReport() {
  const scores = calculateScores();
  const tensions = detectTensions();
  const overall = calculateOverall(scores, tensions) ?? 0;
  const lines = [
    "THE COHERENCE ENGINE — DIAGNOSTIC",
    `${state.systemName} (${state.systemType})`,
    `Coherence index: ${overall}/100 — ${verdictFor(overall)}`,
    "",
    "THIRTEEN TESTS",
    ...Object.entries(DIMENSIONS).map(([key, dimension], index) => `${String(index + 1).padStart(2, "0")}. ${dimension.name}: ${scores[key] ?? 0}/100`),
    "",
    "DETECTED TENSIONS",
    ...(tensions.length ? tensions.map((tension) => `- ${tension.title}: ${tension.detail}`) : ["- No direct contradiction triggered on this path."]),
    "",
    "LIMIT",
    "A clear and consistent system is not automatically true, fair, kind, wise, or morally binding. This test only checks whether the system explains its own structure and uses it consistently.",
  ];
  return lines.join("\n");
}

els.launchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(els.launchForm);
  state.systemName = form.get("systemName").trim();
  state.systemType = form.get("systemType");
  state.scenario = form.get("scenario");
  state.answers = {};
  state.index = 0;
  els.liveSystemName.textContent = state.systemName;
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
  document.querySelector("#systemName").focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#copyReportButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(buildTextReport());
    button.textContent = "Diagnostic copied";
  } catch {
    button.textContent = "Copy unavailable";
  }
  window.setTimeout(() => (button.textContent = "Copy diagnostic"), 1800);
});

renderAxisGrid();
