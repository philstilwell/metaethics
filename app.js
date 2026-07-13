"use strict";

const DIMENSIONS = {
  domain: {
    name: "Who counts",
    short: "The circle of concern",
    debt: "The system needs a steady line around who matters and a reason for anyone left out.",
  },
  object: {
    name: "What is judged",
    short: "The part under review",
    debt: "Separate the action, reason, result, rule, institution, relationship, and person.",
  },
  value: {
    name: "What matters",
    short: "Main concerns",
    debt: "Name the concerns doing the work and explain the job each one has.",
  },
  meaning: {
    name: "Clear words",
    short: "Steady meanings",
    debt: "Explain important words clearly enough that they limit decisions across different cases.",
  },
  status: {
    name: "Types of judgment",
    short: "More than right or wrong",
    debt: "Separate what is forbidden, harmful, blameworthy, sad, excused, or in need of repair.",
  },
  generation: {
    name: "Building rules",
    short: "Concern → action",
    debt: "Show the steps from what matters to what people must, may, or need to repair.",
  },
  reason: {
    name: "Reasons",
    short: "Why follow the rule",
    debt: "Give reasons that do more than repeat a slogan or point to a person in charge.",
  },
  similarity: {
    name: "Fair comparison",
    short: "Similar cases",
    debt: "Say which differences really matter and use them without favoring friends or insiders.",
  },
  conflict: {
    name: "Hard choices",
    short: "When good things clash",
    debt: "Explain which value comes first, when exceptions apply, and what loss remains.",
  },
  evidence: {
    name: "Facts & evidence",
    short: "Checking claims",
    debt: "Let evidence, doubt, and new facts correct the claims the system depends on.",
  },
  usability: {
    name: "Real-world use",
    short: "Guidance under pressure",
    debt: "Give limited people useful guidance when time and facts are missing.",
  },
  origin: {
    name: "Where it came from",
    short: "History and influence",
    debt: "Show how history, feelings, power, identity, and institutions shaped the system.",
  },
  revision: {
    name: "Learning & change",
    short: "Challenge and repair",
    debt: "Give people a clear path to object, correct mistakes, repair harm, and handle new cases.",
  },
};

const PHASES = {
  ground: "Where the rules come from",
  circle: "Who and what matter",
  grammar: "Words and reasons",
  pressure: "Hard cases",
  mirror: "Origins and change",
};

const QUESTION_GUIDES = {
  stance: {
    plain: "Before we test the rules, we need to know what kind of claim the system makes. It may claim a truth for everyone, rely on a trusted source, create rules by agreement, avoid taking a view about moral facts, or deny that objective moral facts exist.",
    example: "A rule against cheating might be presented as a universal truth, a command from God, a school agreement, a useful way to protect trust without discussing moral facts, or a human tool used because no objective moral truth exists.",
    reveals: "Each answer creates a different test. A universal fact needs a way to be known. A command needs a trusted source. An agreement needs a defined process and reach. A system that avoids the question about moral facts needs clearly named goals. A non-realist system needs stated human aims and limits.",
  },
  groundSource: {
    plain: "The system says some rules are true even when people disagree. We are asking how anyone can find those truths and tell a good answer from a mistake.",
    example: "Someone says, “Stealing is always wrong.” How do they know? They might point to a strong inner feeling, an old text, facts about trust and harm, or an argument that other people can test.",
    reveals: "Your answer shows whether the system gives us a real way to check its claims or mostly asks us to trust a feeling, tradition, or person.",
  },
  authorityAccess: {
    plain: "People who trust the same source can still disagree about what it means. A strong system needs a way to hear the disagreement and correct a bad reading.",
    example: "Two sincere members of the same religion read the same passage but reach opposite answers about divorce. Who listens, what evidence matters, and what could change either answer?",
    reveals: "Your answer shows whether mistakes can be found from outside the group in charge, or whether that group always gets the final word.",
  },
  constructionAuthority: {
    plain: "A vote or meeting can make a rule, but that does not make the rule fair by itself. We are asking who had a voice, who carries the cost, and what people can do if they object.",
    example: "A town votes for a youth curfew. Most voters are adults, while teenagers must live under the rule. Did the people most affected get heard? Can they challenge it later?",
    reveals: "Your answer shows whether the process includes the people it controls and whether the rule has clear limits.",
  },
  indexDiscipline: {
    plain: "There is a difference between saying “we deeply oppose this” and saying “the universe itself says this is wrong.” This question asks whether the system keeps that difference clear.",
    example: "A community may strongly oppose cruelty because its members care about suffering. That is a clear human commitment. Calling cruelty a fact written into reality adds a much bigger claim.",
    reveals: "Your answer shows whether the system honestly names whose values are speaking, or gives human choices the sound of universal facts.",
  },
  scope: {
    plain: "Imagine drawing a circle around everyone whose needs matter in their own right. Who is inside the circle? Who is outside it? The circle can include people, animals, future people, or other living systems.",
    example: "When a city builds a dam, should it count only current taxpayers? What about nearby families, animals, people living downstream, and children who will live there later?",
    reveals: "Your answer shows how wide the system’s concern reaches and whether it can explain where it draws the line.",
  },
  boundary: {
    plain: "A system’s promise to care for people is easiest when those people are friendly. The real test comes when the person is an enemy, outsider, prisoner, or critic.",
    example: "A country may ban torture for its own citizens but allow it for enemy prisoners. If both can feel pain and both are helpless, what difference is supposed to matter?",
    reveals: "Your answer shows whether the system uses one steady rule or lowers its standards when doing so helps its own side.",
  },
  objectFocus: {
    plain: "One event has many parts. We can judge what a person did, why they did it, what happened next, or what a larger group allowed. These parts may deserve different answers.",
    example: "A rich person gives money to a hospital to hide a scandal. The gift helps patients, the motive is selfish, and the company may still be harming workers. Which part are we judging?",
    reveals: "Your answer shows whether the system can keep these parts separate or jumps between them to protect the answer it already wants.",
  },
  valueCenter: {
    plain: "A value is simply something the system treats as important. Common values include safety, freedom, care, honesty, loyalty, fairness, and less suffering.",
    example: "A school phone ban may protect attention and safety, but reduce freedom and contact with family. Which concern gets noticed first tells us a lot about the system.",
    reveals: "Your answer names the system’s main concern. It also points to concerns the system may overlook.",
  },
  valueRole: {
    plain: "It is not enough to say that something matters. We also need to know how it guides a choice. Is it a goal, a firm limit, a starting rule, or one concern that can be outweighed by another?",
    example: "A school values safety. Does that mean “make students as safe as possible,” “never cross this danger line,” or “usually choose safety unless freedom has a stronger claim”?",
    reveals: "Your answer shows whether the value has a clear job or is used in a new way whenever the system needs a certain result.",
  },
  termStability: {
    plain: "Important words can change meaning without anyone noticing. We are asking whether words such as harm, safety, freedom, consent, and respect mean roughly the same thing from one case to the next.",
    example: "A school may call physical danger a safety issue in one case, then call simple disagreement a safety issue in another. The word has grown, but the school may act as if nothing changed.",
    reveals: "Your answer shows whether the system’s words place real limits on its decisions or stretch to fit almost any decision.",
  },
  statusGrammar: {
    plain: "“Right” and “wrong” are often too simple. An action can cause harm without making someone guilty. A person can be excused while repair is still needed. A choice can be allowed and still be sad.",
    example: "A child breaks a window after being pushed. The window is damaged, but the child may not be at fault. The owner still needs repair. One word cannot describe all of that.",
    reveals: "Your answer shows whether the system can describe what actually happened or forces every case into one big yes-or-no judgment.",
  },
  bridge: {
    plain: "A concern does not automatically prove a rule. The system must show the steps between “this matters” and “everyone must do this.”",
    example: "Safety matters, but that alone does not prove that every school needs cameras in every room. We still need facts about risk, privacy, cost, other choices, and limits on who sees the video.",
    reveals: "Your answer shows whether the system explains its reasoning or hides the hardest step inside a serious-sounding value word.",
  },
  reasonOffer: {
    plain: "A command can make people obey. A threat can also make people obey. A reason is different: it helps another person understand why the rule connects to things that matter in the case.",
    example: "“Follow this rule because I am in charge” may work inside a team. A person outside the team may need a reason about safety, trust, cost, or harm before the rule makes sense.",
    reveals: "Your answer shows whether the system can explain itself to people who do not already trust its leaders, texts, or traditions.",
  },
  similarCases: {
    plain: "People often judge the same action differently depending on who did it. A fair system must explain which differences really matter instead of quietly favoring friends.",
    example: "Two politicians tell the same kind of lie. A voter excuses the one on their own side but condemns the other. What fact about the cases makes different treatment fair?",
    reveals: "Your answer shows whether the system checks for favoritism and uses the same standards for allies and opponents.",
  },
  conflictMethod: {
    plain: "Good things can pull in opposite directions. Honesty may conflict with safety. Freedom may conflict with care. Sometimes no choice protects everything.",
    example: "A doctor wants to respect a patient’s choice but also fears the patient does not understand a deadly risk. Both freedom and protection matter. Which one leads, and when?",
    reveals: "Your answer shows whether the system has a clear way to choose in hard cases or simply follows whichever value feels strongest at the moment.",
  },
  scenarioTruth: {
    plain: "This story puts honesty and protection in direct conflict. We are not asking whether lying is usually good. We are asking whether the system can explain an exception when telling the truth may lead to serious harm.",
    example: "If the system allows a lie, it can ask how close and serious the danger must be. If it forbids the lie, it must explain why honesty matters more than your friend’s safety here.",
    reveals: "Your answer shows how the system handles exceptions, danger, and any harm or loss that remains after the choice.",
  },
  scenarioScarcity: {
    plain: "There is not enough medicine for everyone. Every choice leaves someone without help. The system must decide which facts matter and how to break a tie.",
    example: "Should the dose go to the sickest person, the person most likely to recover, the youngest person, the first to arrive, or be chosen by lottery? Each rule protects something different.",
    reveals: "Your answer shows whether the system has open rules for comparing needs or leaves the choice to hidden personal preference.",
  },
  scenarioLoyalty: {
    plain: "Groups often want to protect people they trust. They also need to protect anyone who may have been harmed. This story asks whether loyalty changes the rules for evidence and review.",
    example: "If the accused leader were a stranger, would the group demand the same amount of proof? Would it offer the same safety to the person making the report?",
    reveals: "Your answer shows whether the system can examine its own leaders fairly or gives insiders special protection.",
  },
  facts: {
    plain: "Many value claims depend on ordinary facts. A system may say a punishment prevents crime or a policy makes people safer. Those claims can be tested.",
    example: "A city creates a youth curfew because leaders say it will reduce violence. Later, good data show that violence stayed the same while harmless teenagers were stopped more often.",
    reveals: "Your answer shows whether unwanted facts can change the rule or whether the system protects its favorite story from evidence.",
  },
  finiteAgent: {
    plain: "Real people have little time, incomplete facts, strong feelings, and limited energy. A useful system must help them act before they can study every detail.",
    example: "A nurse in an emergency cannot calculate every possible result. The nurse needs a safe first step, a clear role, a way to call for help, and a plan for checking the choice later.",
    reveals: "Your answer shows whether the system works in real life or only for an imaginary person with perfect knowledge and unlimited time.",
  },
  genealogy: {
    plain: "Our values have a history. Family, religion, culture, fear, painful events, social class, and power all shape what feels obvious to us. Learning that history does not prove a belief wrong.",
    example: "A person may feel that a harmless custom is disgusting because they were trained from childhood to avoid it. Knowing where the feeling came from helps them ask whether it still tracks a real danger.",
    reveals: "Your answer shows whether the system can examine its own blind spots or treats its starting beliefs as too special to question.",
  },
  challenge: {
    plain: "A system needs steady rules, but it also needs a way to learn. We are asking who can raise a problem, what can change a decision, and how a case can be reviewed.",
    example: "A school rule harms students with disabilities in a way leaders did not expect. Can those students speak safely? Can facts change the rule? Who decides, and when is the new rule checked?",
    reveals: "Your answer shows whether the system can correct honest mistakes or mainly protects the people already in charge.",
  },
  repair: {
    plain: "Saying “we were wrong” is only the beginning. Repair asks what the system will do about the harm and how it will stop the same failure from happening again.",
    example: "A company wrongly fires a worker. Repair might include an apology, lost pay, a corrected record, a changed policy, protection from payback, and a later check that the fix worked.",
    reveals: "Your answer shows whether the system treats regret as enough or connects learning to real changes, protection, and follow-up.",
  },
};

const QUESTION_BOUNDARIES = {
  stance: {
    definition: "“Come from” means what gives the rules their claimed force: a truth that exists without us, a trusted source, a shared agreement, a practical goal that takes no position on moral facts, or an explicit denial of objective moral facts.",
    scope: "Choose only the system’s basic view about the source of its rules. Do not judge yet whether the rules are kind, useful, true, or followed consistently.",
  },
  groundSource: {
    definition: "“Know” means the method used to tell a true universal rule from a strong feeling, inherited belief, or mistake.",
    scope: "This asks only how a claim of universal truth is checked. It does not ask whether the rule produces good results or whether most people accept it.",
  },
  authorityAccess: {
    definition: "A “correction method” is a stated way to decide between conflicting readings and to admit that an accepted reading was wrong.",
    scope: "Focus on disagreement among people who sincerely accept the same source. Do not assume that greater rank, confidence, or popularity proves one reading correct.",
  },
  constructionAuthority: {
    definition: "A rule “binds” someone when the system says that person must follow it even though they did not personally agree.",
    scope: "Judge only why the decision process has power over non-consenting people. Do not judge the rule’s content or whether breaking it will be punished.",
  },
  indexDiscipline: {
    definition: "To “name whose values are speaking” is to state the person, group, goal, role, or institution from which a judgment gets its force.",
    scope: "Judge only whether the system keeps human commitments separate from claims about universal moral facts. Do not judge how strongly anyone holds those commitments.",
  },
  scope: {
    definition: "To “matter for their own sake” means that a being’s needs can count directly, not only because helping that being benefits someone else.",
    scope: "Identify who enters the system’s first circle of concern. Do not decide how much weight each member receives or what action should follow.",
  },
  boundary: {
    definition: "An “enemy or outsider” is someone opposed to, excluded from, or not protected by the group using the system.",
    scope: "Ask whether basic consideration survives group conflict. This does not ask whether threats must be ignored or whether everyone must receive identical treatment.",
  },
  objectFocus: {
    definition: "The “part being judged” may be the action, intention, motive, result, rule, institution, relationship, character, omission, or attempted repair.",
    scope: "Identify which part receives each judgment. Do not combine a good result with a good motive, or an individual act with the institution around it, unless the system explains that link.",
  },
  valueCenter: {
    definition: "A “main concern” is what the system treats as important before it turns that concern into a rule or judgment.",
    scope: "Name what receives attention, not how it should be measured or what action it requires. Those questions come later.",
  },
  valueRole: {
    definition: "A concern’s “job” may be a goal to increase, a line never to cross, a normal starting point, a tie-breaker, or a reason to repair harm.",
    scope: "State how the main concern operates when making choices. Do not merely repeat that the concern is important.",
  },
  termStability: {
    definition: "A word is “stable” when the same stated signs or tests control its use across friends, opponents, easy cases, and hard cases.",
    scope: "Judge the meaning of the system’s key words, not whether you like the conclusions reached with those words.",
  },
  statusGrammar: {
    definition: "A “type of judgment” is the exact label placed on an act, person, result, or response—for example harmful, forbidden, excused, illegal, tragic, or in need of repair.",
    scope: "Ask whether the system keeps these judgments separate. Do not assume that harm proves guilt, or that permission proves approval.",
  },
  bridge: {
    definition: "The “steps from concern to rule” are the stated facts, limits, comparisons, and decision process that connect what matters to what someone must or may do.",
    scope: "Judge only that connection. Do not treat naming a value—such as safety or freedom—as a complete argument.",
  },
  reasonOffer: {
    definition: "A “reason” explains how a rule connects to stated goals, facts, roles, relationships, or likely results. A command or threat may cause obedience without providing that explanation.",
    scope: "Consider what can be said to a person who does not already trust the system’s source. Do not require that every person must finally agree.",
  },
  similarCases: {
    definition: "Cases are “similar” when they match on every feature the system has already said matters to the judgment.",
    scope: "Ask whether identity, friendship, status, or group membership changes the answer without being a stated relevant difference. Identical treatment is not required when a real difference has been named.",
  },
  conflictMethod: {
    definition: "A “clash” occurs when two concerns supported by the same system point toward actions that cannot both be completed.",
    scope: "Judge the method used to choose under that clash. Do not assume that a hard choice must have a perfectly clean result with no loss.",
  },
  scenarioTruth: {
    definition: "The case assumes the danger is immediate and believable, your answer may affect whether your friend is found, and no authority is available in time.",
    scope: "Choose what the system permits in this exact emergency. Do not answer about ordinary lies, uncertain rumors, or minor embarrassment.",
  },
  scenarioScarcity: {
    definition: "The case assumes one indivisible dose, five eligible patients, no time to obtain more, and medically reliable information about need and likely benefit.",
    scope: "Choose the rule for selecting one patient. Do not answer how the shortage arose or whether the health system should later be changed.",
  },
  scenarioLoyalty: {
    definition: "A “serious accusation” means a specific report with enough support to require investigation, but not enough proof to decide guilt in advance.",
    scope: "Choose the process used while facts are gathered. Do not decide whether the leader or accuser is already guilty, truthful, or lying.",
  },
  facts: {
    definition: "A “factual claim” describes what exists, happened, causes an effect, or is likely to happen. It can be supported or weakened by observation and evidence.",
    scope: "Judge how the system handles factual claims used in its reasoning. Do not ask evidence alone to decide which goals or values people should choose.",
  },
  finiteAgent: {
    definition: "A “real person” has limited time, knowledge, attention, emotional control, and power, and may have to decide before uncertainty disappears.",
    scope: "Judge whether the system gives usable guidance under those limits. Do not judge how an all-knowing or perfectly calm person would act.",
  },
  genealogy: {
    definition: "The system’s “origin” includes the history, culture, emotions, interests, power relations, and experiences that shaped what it treats as obvious or important.",
    scope: "Ask whether those influences may be examined. Finding an influence does not by itself prove a belief true or false.",
  },
  challenge: {
    definition: "A “revision path” states who may object, what kind of evidence can change a decision, who decides, what stays fixed, and when a settled case may reopen.",
    scope: "Judge whether correction is possible without making every rule change whenever someone complains.",
  },
  repair: {
    definition: "“Repair” means the concrete response after admitted harm: protection, explanation, restored losses, corrected records, changed behavior, changed rules, and later review as needed.",
    scope: "Choose what follows an admitted failure. Do not re-decide whether the original act happened or whether the system should have prevented every possible harm.",
  },
};

const question = (config) => config;

const QUESTIONS = [
  question({
    id: "stance",
    phase: "ground",
    axis: "Where the rules come from",
    prompt: "Where does this system think its rules come from?",
    context:
      "Choose the one claim the system makes about its rules: universal truth, trusted command, agreement, goal-based guidance that takes no view on moral facts, or a human tool based on denying objective moral facts.",
    why: "Your answer decides which follow-up questions you will see.",
    dimensions: ["reason", "origin"],
    choices: [
      { id: "objective", label: "The rules are true for everyone", detail: "They stay true even if every person and group disagrees.", scores: { reason: 1, origin: 1 } },
      { id: "authority", label: "The rules come from a trusted source", detail: "The source may be God, a sacred text, tradition, nature, a leader, or an institution.", scores: { reason: 1, origin: 1 } },
      { id: "constructed", label: "People create the rules through an agreed decision process", detail: "The rule gets its authority from consent, voting, representation, bargaining, or another named procedure.", scores: { reason: 2, origin: 2 } },
      { id: "indexed", label: "The system takes no position on objective moral facts", detail: "It only asks which rules serve the named goals, needs, or practices of a person or group.", scores: { reason: 3, origin: 3 } },
    ],
  }),
  question({
    id: "groundSource",
    phase: "ground",
    axis: "How does it know?",
    prompt: "How can people know these rules are true?",
    context: "“It is obvious” and “everyone knows” do not give us a way to check an answer.",
    why: "A rule said to be true for everyone needs a clear way to find and correct it.",
    dimensions: ["reason", "evidence"],
    when: (a) => ["objective", "authority"].includes(a.stance),
    choices: [
      { id: "intuition", label: "A strong inner feeling", detail: "Some answers simply feel certain or obvious.", scores: { reason: 0, evidence: 0 } },
      { id: "tradition", label: "A tradition, text, or trusted leader", detail: "An accepted source tells people what the rule is.", scores: { reason: 1, evidence: 1 } },
      { id: "nature", label: "Facts about human nature and social life", detail: "Facts about health, choice, or how people live together support the rules.", scores: { reason: 2, evidence: 2 } },
      { id: "argument", label: "An argument anyone can check", detail: "The system explains its source, what could prove it wrong, and how errors are fixed.", scores: { reason: 3, evidence: 3 } },
    ],
  }),
  question({
    id: "authorityAccess",
    phase: "ground",
    axis: "Finding and fixing mistakes",
    prompt: "When honest people disagree, how can the system find a mistake?",
    context: "Being confident, important, or deeply upset does not prove that an answer is correct.",
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
    prompt: "Why should someone follow a group rule they did not accept?",
    context: "A process can create a rule. It still must explain who took part, who was left out, and what happens to people who disagree.",
    why: "A process is not fair simply because it produces an answer.",
    dimensions: ["reason", "domain"],
    when: (a) => a.stance === "constructed",
    choices: [
      { id: "must", label: "Any reasonable person should accept it", detail: "People who reject the rule are treated as unreasonable.", scores: { reason: 1, domain: 1 } },
      { id: "majority", label: "The group’s decision is enough", detail: "Once most people decide, everyone must follow the rule.", scores: { reason: 1, domain: 1 } },
      { id: "affected", label: "People affected by the rule get a voice", detail: "They can hear the reasons, describe the costs, and object safely.", scores: { reason: 3, domain: 3 } },
      { id: "limited", label: "It applies only inside the named group or institution", detail: "The rule has clear limits, ways to object, and ways to leave when possible.", scores: { reason: 3, domain: 2 } },
    ],
  }),
  question({
    id: "indexDiscipline",
    phase: "ground",
    axis: "Keeping claims tied to their source",
    prompt: "Does the system say whose values are speaking?",
    context: "“We strongly oppose this” is not the same claim as “this is wrong for everyone everywhere.”",
    why: "Strong feelings do not become facts for everyone just because stronger words are used.",
    dimensions: ["meaning", "reason"],
    when: (a) => ["indexed", "nonrealist"].includes(a.stance),
    choices: [
      { id: "slips", label: "Sometimes it talks as if its values bind everyone", detail: "Stronger moral language is used when the issue feels very serious.", scores: { meaning: 1, reason: 1 } },
      { id: "mostly", label: "It names the source of its goals but not of its moral verdicts", detail: "The goals have an owner, but words such as “right” and “wrong” are used without saying whose judgment they express.", scores: { meaning: 2, reason: 2 } },
      { id: "always", label: "It always names the people, goals, and setting", detail: "The reader can tell where each judgment comes from and how far it reaches.", scores: { meaning: 3, reason: 3 } },
      { id: "translates", label: "It uses moral shorthand, then gives an exact translation", detail: "When challenged, “wrong” is restated as a named person’s opposition, a broken rule, or an action that blocks a stated goal.", scores: { meaning: 3, reason: 3 } },
    ],
  }),
  question({
    id: "scope",
    phase: "circle",
    axis: "01 — Who is included?",
    prompt: "Who matters for their own sake?",
    context: "Choose what the system really does, not what its nicest slogan seems to promise.",
    why: "A system must say whose needs count before it can judge a choice.",
    dimensions: ["domain"],
    choices: [
      { id: "tribe", label: "Members, citizens, believers, or chosen insiders", detail: "Outsiders matter mainly through their effects on the group.", scores: { domain: 1 } },
      { id: "human", label: "All human beings", detail: "Every human matters simply because they are human.", scores: { domain: 2 } },
      { id: "sentient", label: "Every being that can feel or experience", detail: "This may include animals, future people, and possible future minds.", scores: { domain: 3 } },
      { id: "layered", label: "It uses a stated ranking instead of one equal circle", detail: "Species, ability to feel, dependence, relationship, or future effects place beings at named levels of concern.", scores: { domain: 3 } },
    ],
  }),
  question({
    id: "boundary",
    phase: "circle",
    axis: "01 — Who is included?",
    prompt: "Do enemies and outsiders still count?",
    context: "A promise to care for people is hardest to keep when those people threaten, criticize, or oppose the group.",
    why: "The system is inconsistent if people stop mattering whenever that helps its own side.",
    dimensions: ["domain", "similarity"],
    choices: [
      { id: "excluded", label: "They can stop counting", detail: "A serious threat, betrayal, or disagreement can move them outside the circle.", scores: { domain: 0, similarity: 0 } },
      { id: "reduced", label: "They count, but by a lower standard", detail: "Insiders retain stronger protection even in otherwise similar cases.", scores: { domain: 1, similarity: 1 } },
      { id: "criteria", label: "Protection changes only with a measured threat or relevant conduct", detail: "The response may become more restrictive when named evidence shows greater danger; outsider identity alone changes nothing.", scores: { domain: 3, similarity: 3 } },
      { id: "same", label: "Certain minimum protections can never be removed from anyone", detail: "Even an active enemy keeps the system’s listed protections, such as freedom from torture, basic care, and review by the same rules.", scores: { domain: 3, similarity: 3 } },
    ],
  }),
  question({
    id: "objectFocus",
    phase: "circle",
    axis: "02 — What part are we judging?",
    prompt: "Which part of the case is the system judging?",
    context: "The action, the reason for it, the result, and the larger system around it may deserve different answers.",
    why: "A system can protect its favorite answer by quietly switching from one part of the case to another.",
    dimensions: ["object"],
    choices: [
      { id: "single", label: "One part usually decides the whole case", detail: "The result, intention, character, or rule normally settles everything.", scores: { object: 1 } },
      { id: "intuitive", label: "There is no fixed test; the decision-maker chooses the focus case by case", detail: "The person reviewing the case decides whether motive, act, result, character, or institution should control the judgment.", scores: { object: 2 } },
      { id: "plural", label: "The system judges each part separately", detail: "The act, motive, result, rule, institution, relationship, and repair can get different answers.", scores: { object: 3 } },
      { id: "shifts", label: "It focuses on whichever part supports its answer", detail: "The motive matters in one case and the result in another, with no clear reason for the switch.", scores: { object: 0 } },
    ],
  }),
  question({
    id: "valueCenter",
    phase: "circle",
    axis: "03 — What matters most?",
    prompt: "What does the system care about most?",
    context: "Choose the concern that most often guides its attention and choices.",
    why: "The main concern shows us what the system notices and what it may miss.",
    dimensions: ["value"],
    choices: [
      { id: "welfare", label: "Less suffering and better lives", detail: "What happens to the people or beings affected comes first.", scores: { value: 2 } },
      { id: "agency", label: "Freedom, choice, and consent", detail: "People should have control over their own lives.", scores: { value: 2 } },
      { id: "order", label: "Group order and inherited rules", detail: "Keeping the group stable, loyal, united, pure, or faithful to a sacred tradition receives first priority.", scores: { value: 2 } },
      { id: "plural", label: "Several clearly named concerns", detail: "Care, safety, freedom, trust, fairness, truth, and belonging each have a different job.", scores: { value: 3 } },
    ],
  }),
  question({
    id: "valueRole",
    phase: "circle",
    axis: "03 — What matters most?",
    prompt: "How does the main concern guide a choice?",
    context: "It may be a goal to increase, a line not to cross, a usual starting point, or one concern among several.",
    why: "Naming a concern is not enough. The system must explain what the concern does.",
    dimensions: ["value", "conflict"],
    choices: [
      { id: "absolute", label: "It can never be set aside", detail: "Choosing against it would betray the whole system.", scores: { value: 1, conflict: 0 } },
      { id: "maximize", label: "The system tries to produce as much of it as possible", detail: "Other concerns matter mainly when they help or hurt this one.", scores: { value: 2, conflict: 1 } },
      { id: "threshold", label: "It sets a clear limit or danger line", detail: "The system says what changes when that line is crossed.", scores: { value: 3, conflict: 2 } },
      { id: "roles", label: "Different concerns have different jobs", detail: "The system says which are goals, limits, starting rules, tie-breakers, or reasons for repair.", scores: { value: 3, conflict: 3 } },
    ],
  }),
  question({
    id: "termStability",
    phase: "grammar",
    axis: "04 — Do important words stay clear?",
    prompt: "Do key words keep the same meaning?",
    context: "Think of terms such as harm, freedom, dignity, consent, respect, safety, care, justice, and authority.",
    why: "If a word can stretch to mean almost anything, it cannot place a real limit on a decision.",
    dimensions: ["meaning"],
    choices: [
      { id: "elastic", label: "The meaning changes with the case", detail: "How serious the case feels decides how wide the word becomes.", scores: { meaning: 0 } },
      { id: "ordinary", label: "Everyday meaning is usually enough", detail: "People use common speech and judgment for unclear cases.", scores: { meaning: 2 } },
      { id: "operational", label: "Core words have clear signs or tests", detail: "Some hard cases remain, but the meaning limits friends and opponents alike.", scores: { meaning: 3 } },
      { id: "plural", label: "Different meanings are clearly separated", detail: "For example, injury, fear, risk, insult, and unfair treatment are not all called the same kind of harm.", scores: { meaning: 3 } },
    ],
  }),
  question({
    id: "statusGrammar",
    phase: "grammar",
    axis: "05 — What kind of judgment is this?",
    prompt: "Can the system say more than right or wrong?",
    context: "Causing harm, being at fault, breaking a law, needing repair, and deserving punishment are different things.",
    why: "A useful system should describe the act, the person, the result, and the needed response separately.",
    dimensions: ["status"],
    choices: [
      { id: "binary", label: "Only right or wrong", detail: "Two clear choices keep the system simple and forceful.", scores: { status: 0 } },
      { id: "three", label: "Required, allowed, or forbidden", detail: "These three labels handle most cases.", scores: { status: 2 } },
      { id: "rich", label: "It uses several separate judgments", detail: "An act can be allowed, excused, harmful, sad, admirable, illegal, or in need of repair in different combinations.", scores: { status: 3 } },
      { id: "expressive", label: "It gives a moral status and then chooses a separate response", detail: "First it says required, allowed, or forbidden; then it separately says whether to warn, limit, excuse, protect, punish, or repair.", scores: { status: 3 } },
    ],
  }),
  question({
    id: "bridge",
    phase: "grammar",
    axis: "06 — How does a value become a rule?",
    prompt: "How does “this matters” become “do this”?",
    context: "Safety does not automatically justify surveillance. Truth does not automatically forbid every lie.",
    why: "A serious value word can hide a missing step in the reasoning.",
    dimensions: ["generation"],
    choices: [
      { id: "automatic", label: "If it matters, the rule follows automatically", detail: "No other step or explanation is needed.", scores: { generation: 0 } },
      { id: "principle", label: "A general rule connects the value to the choice", detail: "The rule stays steady, though people still judge exceptions.", scores: { generation: 2 } },
      { id: "explicit", label: "The steps, limits, and exceptions are clear", detail: "The system names the facts that matter and the other concerns that must be weighed.", scores: { generation: 3 } },
      { id: "procedure", label: "A fair process turns the value into a rule", detail: "People affected can speak, evidence is checked, protections are added, and the rule is reviewed.", scores: { generation: 3 } },
    ],
  }),
  question({
    id: "reasonOffer",
    phase: "grammar",
    axis: "07 — What reasons does it give?",
    prompt: "How does it explain a rule to someone who disagrees?",
    context: "A command, threat, or feeling of shame may cause obedience. That is not the same as helping someone understand the rule.",
    why: "A good reason makes the system’s goals, facts, and tradeoffs easier to see.",
    dimensions: ["reason"],
    choices: [
      { id: "authority", label: "The trusted source is the whole reason", detail: "People who reject the source are treated as outside proper judgment.", scores: { reason: 0 } },
      { id: "shared", label: "It points to concerns most people share", detail: "Common concerns give the rule force, even if some people still disagree.", scores: { reason: 2 } },
      { id: "indexed", label: "It gives reasons tied to the people and goals involved", detail: "Goals, roles, relationships, evidence, and tradeoffs are made clear.", scores: { reason: 3 } },
      { id: "public", label: "Anyone can examine the reasons", detail: "The system openly explains the case and admits when reasonable people may still disagree.", scores: { reason: 3 } },
    ],
  }),
  question({
    id: "similarCases",
    phase: "pressure",
    axis: "08 — Are similar cases treated alike?",
    prompt: "If a friend and an opponent do the same thing, are they judged the same way?",
    context: "Different treatment can be fair, but the system must name a real difference in the cases that explains it.",
    why: "People often excuse their own side without noticing that the standard changed.",
    dimensions: ["similarity"],
    choices: [
      { id: "loyalty", label: "Friends and insiders may receive better treatment", detail: "The system allows different standards based on loyalty and relationship.", scores: { similarity: 1 } },
      { id: "intuition", label: "There is no fixed comparison test; a trusted person decides", detail: "That person reviews the whole case and decides which differences justify treating friend and opponent differently.", scores: { similarity: 2 } },
      { id: "criteria", label: "The same clear standards apply to both", detail: "Different treatment needs a difference that was named before knowing who benefits.", scores: { similarity: 3 } },
      { id: "audit", label: "The system checks itself for favoritism", detail: "It compares evidence rules, exceptions, burdens, and mercy across both sides.", scores: { similarity: 3 } },
    ],
  }),
  question({
    id: "conflictMethod",
    phase: "pressure",
    axis: "09 — What happens when good things clash?",
    prompt: "What does the system do when two important concerns clash?",
    context: "Truth, care, freedom, safety, loyalty, equality, and repair often pull in different directions.",
    why: "If the system denies the clash, its true priority stays hidden. If it makes up a new answer each time, favoritism can enter.",
    dimensions: ["conflict"],
    choices: [
      { id: "denial", label: "A correct system has no real clash", detail: "The problem only looks like a conflict because someone has misunderstood it.", scores: { conflict: 0 } },
      { id: "judgment", label: "There is no fixed priority; a trusted decision-maker balances the case", detail: "The decision-maker weighs the competing concerns without a rule that determines which one must lead.", scores: { conflict: 2 } },
      { id: "priority", label: "The order, limits, and exceptions are stated", detail: "The method is clear before anyone knows which person or group will benefit.", scores: { conflict: 3 } },
      { id: "remainder", label: "A clear process decides and records what was lost", detail: "The system can act while admitting harm, tragedy, and the need for repair.", scores: { conflict: 3 } },
    ],
  }),
  question({
    id: "scenarioTruth",
    phase: "pressure",
    axis: "Your story — truth under pressure",
    prompt: "A dangerous person asks where your friend is hiding. What may you do?",
    context: "Honesty supports trust, but a truthful answer may put your friend in serious danger.",
    why: "This story tests how the system explains an exception when two important concerns clash.",
    dimensions: ["conflict", "generation", "status"],
    when: (_, state) => state.scenario === "truth",
    choices: [
      { id: "truth", label: "Tell the truth", detail: "Lying stays forbidden even when another person is making a threat.", scores: { conflict: 1, generation: 2, status: 2 } },
      { id: "lie", label: "Lie, and treat the case as fully settled", detail: "Protecting your friend completely outweighs honesty here.", scores: { conflict: 2, generation: 2, status: 1 } },
      { id: "protect", label: "Lie only when the danger passes a clear line", detail: "The danger must be close, serious, well supported, and hard to prevent another way.", scores: { conflict: 3, generation: 3, status: 3 } },
      { id: "refuse", label: "Refuse to answer or send the person away", detail: "Try to protect your friend without saying something false.", scores: { conflict: 3, generation: 3, status: 3 } },
    ],
  }),
  question({
    id: "scenarioScarcity",
    phase: "pressure",
    axis: "Your story — sharing the last dose",
    prompt: "One dose remains and five people need it. How should the choice be made?",
    context: "One patient is sickest, one will benefit most, one arrived first, one is a child, and one is the only caregiver for three dependents.",
    why: "Not everyone can be helped. The choice shows which needs the system counts and how it breaks a tie.",
    dimensions: ["conflict", "value", "similarity"],
    when: (_, state) => state.scenario === "scarcity",
    choices: [
      { id: "favorite", label: "Let the medical team choose without a fixed ranking or tie-breaker", detail: "The team may consider need, likely benefit, age, dependents, and arrival time in any order it judges appropriate.", scores: { conflict: 2, value: 2, similarity: 1 } },
      { id: "lottery", label: "Use a lottery among people who meet a clear need level", detail: "Everyone above that level has an equal chance.", scores: { conflict: 3, value: 3, similarity: 3 } },
      { id: "benefit", label: "Give it to the person most likely to benefit", detail: "A public medical rule uses the best available estimate of recovery.", scores: { conflict: 2, value: 2, similarity: 3 } },
      { id: "layered", label: "Use several public steps in order", detail: "Need, likely benefit, people who depend on the patient, fairness, and a final tie-breaker each have a stated place.", scores: { conflict: 3, value: 3, similarity: 3 } },
    ],
  }),
  question({
    id: "scenarioLoyalty",
    phase: "pressure",
    axis: "Your story — trusting your own group",
    prompt: "A trusted leader in your group is accused of serious harm. What should happen?",
    context: "The accusation is serious but incomplete. Public judgment could harm both the accuser and the accused.",
    why: "Loyalty becomes unfair when it quietly changes the proof or process required for an insider.",
    dimensions: ["similarity", "evidence", "revision"],
    when: (_, state) => state.scenario === "loyalty",
    choices: [
      { id: "protect", label: "Protect the leader until the proof is final", detail: "Trust and the risk to the leader’s name require more proof than usual.", scores: { similarity: 0, evidence: 1, revision: 1 } },
      { id: "believe", label: "Publicly support the person making the report right away", detail: "The leader’s power makes it reasonable to act before a full review.", scores: { similarity: 1, evidence: 1, revision: 1 } },
      { id: "process", label: "Use the same fair process used for an outsider", detail: "Add temporary safety steps, steady evidence rules, and protection from payback.", scores: { similarity: 3, evidence: 3, revision: 3 } },
      { id: "independent", label: "Ask an independent group to review the case", detail: "The group admits that its loyalty may affect its judgment.", scores: { similarity: 3, evidence: 3, revision: 3 } },
    ],
  }),
  question({
    id: "facts",
    phase: "pressure",
    axis: "10 — Are factual claims checked?",
    prompt: "What could show that the system is wrong about the facts?",
    context: "Claims about harm, punishment, health, consent, risk, behavior, or social order can be tested with evidence, even when feelings are strong.",
    why: "Values tell us what matters. Facts help show whether a rule actually protects it.",
    dimensions: ["evidence"],
    choices: [
      { id: "conviction", label: "A deep belief can outweigh data", detail: "Conscience, revelation, or personal experience can be more trusted than outside evidence.", scores: { evidence: 0 } },
      { id: "supportive", label: "Evidence matters when it fits the system’s main beliefs", detail: "Odd results are noticed, but the deepest beliefs stay protected.", scores: { evidence: 1 } },
      { id: "public", label: "Evidence, doubt, and confidence are shown openly", detail: "Friends and opponents face similar proof and the system admits what is still unknown.", scores: { evidence: 3 } },
      { id: "mixed", label: "Numbers and people’s reports check each other", detail: "A personal story cannot replace strong data, and a number cannot erase real experience.", scores: { evidence: 3 } },
    ],
  }),
  question({
    id: "finiteAgent",
    phase: "pressure",
    axis: "11 — Can real people use it?",
    prompt: "Can a tired person use the system before all facts are known?",
    context: "Real people make choices with missing facts, little time, strong feelings, pressure, and unequal power.",
    why: "A system is not a useful guide if only a perfect person with unlimited time could follow it.",
    dimensions: ["usability"],
    choices: [
      { id: "ideal", label: "A correct choice needs full understanding", detail: "Mistakes made by people with limited knowledge do not count against the ideal system.", scores: { usability: 0 } },
      { id: "virtue", label: "The system relies on the trained judgment of an experienced person", detail: "It gives no complete decision procedure; habits, practice, and case experience supply what written rules leave open.", scores: { usability: 2 } },
      { id: "rules", label: "It gives safe starting rules and emergency steps", detail: "Simple guidance comes with clear exceptions and a way to repair mistakes.", scores: { usability: 3 } },
      { id: "institutions", label: "It says who decides and who checks the decision", detail: "Clear roles, calls for help, written records, and later review support limited people.", scores: { usability: 3 } },
    ],
  }),
  question({
    id: "genealogy",
    phase: "mirror",
    axis: "12 — Where did these ideas come from?",
    prompt: "Can people examine where the system came from?",
    context: "Family, religion, class, painful experiences, disgust, fear, care, institutions, history, evidence, and power all shape what we notice.",
    why: "Learning a belief’s history does not prove it wrong. It can reveal hidden priorities and protected interests.",
    dimensions: ["origin"],
    choices: [
      { id: "sacred", label: "Its deepest beliefs are above this kind of review", detail: "Explaining where a belief came from does not affect its truth or authority.", scores: { origin: 0 } },
      { id: "story", label: "The history is admitted but does not change much", detail: "Where the belief came from is interesting, but today’s reasons matter more.", scores: { origin: 2 } },
      { id: "selectors", label: "The system shows what shaped it and who benefits", detail: "Training, people left out, strong feelings, and power can all be reviewed.", scores: { origin: 3 } },
      { id: "counterfactual", label: "It asks whether people with different lives would agree", detail: "Shared evidence and a fair discussion test old assumptions.", scores: { origin: 3 } },
    ],
  }),
  question({
    id: "challenge",
    phase: "mirror",
    axis: "13 — Can the system learn and change?",
    prompt: "How can people challenge and change the system?",
    context: "A system that changes whenever convenient drifts. A system that cannot change under any pressure hardens.",
    why: "A good system needs both steady rules and a clear way to fix mistakes.",
    dimensions: ["revision"],
    choices: [
      { id: "closed", label: "The main conclusions cannot be challenged", detail: "Small details may change, but the source and main ideas are settled.", scores: { revision: 0 } },
      { id: "leaders", label: "Trusted leaders decide when change is needed", detail: "Questions and corrections must go through approved leaders or experts.", scores: { revision: 1 } },
      { id: "appeal", label: "People affected can object without being punished", detail: "They can challenge the facts, labels, priorities, decision, and process.", scores: { revision: 3 } },
      { id: "disciplined", label: "It clearly says what can and cannot change", detail: "It names who decides, what evidence matters, how people are protected, and when a case may reopen.", scores: { revision: 3 } },
    ],
  }),
  question({
    id: "repair",
    phase: "mirror",
    axis: "13 — Can the system learn and change?",
    prompt: "The system admits it caused harm. What happens next?",
    context: "Saying “lessons were learned” means little if no one repairs the harm or changes what will happen next.",
    why: "Learning is real only when it changes behavior and responds to the harm that remains.",
    dimensions: ["revision", "status", "usability"],
    choices: [
      { id: "verdict", label: "Find who is guilty and give a fitting penalty", detail: "The penalty is meant to restore responsibility and close the case.", scores: { revision: 1, status: 1, usability: 2 } },
      { id: "apology", label: "Admit the error and apologize", detail: "Being honest about the harm and showing regret are the main response.", scores: { revision: 2, status: 2, usability: 2 } },
      { id: "repair", label: "Name the harm, repair it, change the system, and check again", detail: "Explain what happened, repay losses, change the rule, protect people from payback, and review the fix.", scores: { revision: 3, status: 3, usability: 3 } },
      { id: "context", label: "Choose from a defined repair menu after measuring what remains", detail: "Documented loss, continuing danger, personal action, system causes, and recurrence risk determine which payment, protection, prevention, or review steps apply.", scores: { revision: 3, status: 3, usability: 3 } },
    ],
  }),
];

const NON_REALIST_CHOICES = {
  stance: {
    id: "nonrealist",
    label: "There are no objective moral facts; the rules are human tools",
    detail: "Words such as “right” and “wrong” summarize attitudes, chosen goals, shared rules, or practical decisions—not truths built into reality.",
    scores: { reason: 3, origin: 3 },
  },
  groundSource: {
    id: "nonrealist",
    label: "It withdraws the claim that the rules are universally true",
    detail: "After reflection, it treats them as chosen human commitments or practical rules, not facts that exist independently of people.",
    scores: { reason: 3, evidence: 3 },
  },
  authorityAccess: {
    id: "nonrealist",
    label: "No source or interpreter is treated as morally infallible",
    detail: "Every reading is a human proposal, tested against its stated aims, evidence, effects, and openness to correction.",
    scores: { evidence: 3, revision: 3 },
  },
  constructionAuthority: {
    id: "nonrealist",
    label: "The rule has no objective moral authority over them",
    detail: "It is a human agreement with a stated legal, social, or practical reach; its force comes from that arrangement, not from a moral fact.",
    scores: { reason: 3, domain: 3 },
  },
  indexDiscipline: {
    id: "nonrealist",
    label: "It makes no claim that objective moral facts exist",
    detail: "It translates moral words into the named attitudes, goals, rules, relationships, institutions, and practical responses that give them meaning.",
    scores: { meaning: 3, reason: 3 },
  },
  scope: {
    id: "nonrealist",
    label: "No one has objective moral standing; the system states whose interests it will count",
    detail: "It names the people or beings included in this decision and gives a human reason—such as concern, agreement, or a chosen goal—for including them.",
    scores: { domain: 3 },
  },
  boundary: {
    id: "nonrealist",
    label: "No one has objective moral status; the same stated policy criteria still apply",
    detail: "Threat, risk, and conduct may change the response, but being an enemy or outsider does not silently change the announced practical rule.",
    scores: { domain: 3, similarity: 3 },
  },
  objectFocus: {
    id: "nonrealist",
    label: "It assigns no moral property and describes each part separately",
    detail: "It reports the act, motive, result, rule, institution, and response in factual or goal-relative terms without calling any part objectively right or wrong.",
    scores: { object: 3 },
  },
  valueCenter: {
    id: "nonrealist",
    label: "There are no objective values; it names the concerns held by actual subjects",
    detail: "Preferences, needs, attachments, aversions, and chosen aims matter only as the concerns of identified people, groups, or other experiencing beings.",
    scores: { value: 3 },
  },
  valueRole: {
    id: "nonrealist",
    label: "Values are chosen inputs, not commands built into reality",
    detail: "The system states which person or group holds each value and whether it functions as a goal, limit, default rule, tie-breaker, or reason for repair.",
    scores: { value: 3, conflict: 3 },
  },
  termStability: {
    id: "nonrealist",
    label: "It replaces moral terms with specific non-moral descriptions",
    detail: "Instead of relying on “wrong” or “unjust,” it names observable harm, risk, consent, law, preference, role, broken agreement, or chosen response.",
    scores: { meaning: 3 },
  },
  statusGrammar: {
    id: "nonrealist",
    label: "It assigns no objective moral status and names the response directly",
    detail: "It separately states facts such as illegal, harmful, unwanted, risky, opposed, restricted, excused, punished, protected, or repaired.",
    scores: { status: 3 },
  },
  bridge: {
    id: "nonrealist",
    label: "It creates no moral duty; it states a conditional practical rule",
    detail: "The form is: if these people choose goal G and accept rule R, then action A serves that goal under conditions C and limits L.",
    scores: { generation: 3 },
  },
  reasonOffer: {
    id: "nonrealist",
    label: "It claims no reason that must move every possible person",
    detail: "Each reason is explicitly tied to the listener’s aims, roles, relationships, agreements, or the rules of an institution they are dealing with.",
    scores: { reason: 3 },
  },
  similarCases: {
    id: "nonrealist",
    label: "It gives no objective moral verdict and applies the same announced criteria",
    detail: "It uses the same factual, legal, or policy tests for friend and opponent unless a previously stated practical difference applies.",
    scores: { similarity: 3 },
  },
  conflictMethod: {
    id: "nonrealist",
    label: "It negotiates among stated human aims rather than discovering the true moral priority",
    detail: "The decision uses an announced procedure, records whose aims were favored, and admits that a different group could choose another rule.",
    scores: { conflict: 3 },
  },
  scenarioTruth: {
    id: "nonrealist",
    label: "No answer is objectively permitted or forbidden; act from the stated aim of protection",
    detail: "Given the immediate credible danger, conceal the location, then describe the lie, expected harm, protected interest, and any remaining cost without a moral verdict.",
    scores: { conflict: 3, generation: 3, status: 3 },
  },
  scenarioScarcity: {
    id: "nonrealist",
    label: "There is no morally correct recipient; use a public human procedure",
    detail: "Choose a rule for named aims—such as survival, equal opportunity, or protecting dependents—apply it consistently, and admit that other procedures remain possible.",
    scores: { conflict: 3, value: 3, similarity: 3 },
  },
  scenarioLoyalty: {
    id: "nonrealist",
    label: "Assume no objective guilt; use independent fact-finding and temporary protection",
    detail: "Apply the same evidence rules to insiders and outsiders, reduce immediate risk while investigating, and revise the response as the facts change.",
    scores: { similarity: 3, evidence: 3, revision: 3 },
  },
  facts: {
    id: "nonrealist",
    label: "Moral claims are not facts, but every factual claim used in a decision remains testable",
    detail: "Claims about events, causes, risk, harm, behavior, and likely results must change when reliable observation and evidence count against them.",
    scores: { evidence: 3 },
  },
  finiteAgent: {
    id: "nonrealist",
    label: "It offers simple rules tied to chosen goals, not a perfect moral algorithm",
    detail: "Limited people receive starting rules, assigned roles, escalation steps, records, and repair procedures that serve stated practical aims.",
    scores: { usability: 3 },
  },
  genealogy: {
    id: "nonrealist",
    label: "Human origins are expected, so the system keeps them visible",
    detail: "It examines whose feelings, interests, training, history, and power produced the rules and who benefits or bears their costs.",
    scores: { origin: 3 },
  },
  challenge: {
    id: "nonrealist",
    label: "Affected people can revise human-made rules through a stated procedure",
    detail: "No rule is protected as an objective moral truth; objections, evidence, decision authority, fixed limits, and reopening conditions are named in advance.",
    scores: { revision: 3 },
  },
  repair: {
    id: "nonrealist",
    label: "It assumes no objective guilt or deserved suffering and separates the practical tasks",
    detail: "It identifies cause, danger, loss, protection, restitution, prevention, relationship, and future procedure without turning them into one moral verdict.",
    scores: { revision: 3, status: 3, usability: 3 },
  },
};

QUESTIONS.forEach((surveyQuestion) => {
  const nonRealistChoice = NON_REALIST_CHOICES[surveyQuestion.id];
  if (!nonRealistChoice) throw new Error(`Missing non-realist answer for ${surveyQuestion.id}`);
  surveyQuestion.choices.push({ ...nonRealistChoice, nonRealist: true });
  if (surveyQuestion.choices.length !== 5) throw new Error(`${surveyQuestion.id} must have exactly five answers`);
});

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
  questionDefinition: document.querySelector("#questionDefinition"),
  questionScope: document.querySelector("#questionScope"),
  choiceList: document.querySelector("#choiceList"),
  why: document.querySelector("#whyThisMatters"),
  plainExplanation: document.querySelector("#plainExplanation"),
  plainExplanationText: document.querySelector("#plainExplanationText"),
  plainExampleText: document.querySelector("#plainExampleText"),
  plainRevealText: document.querySelector("#plainRevealText"),
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
  if (["indexed", "nonrealist"].includes(a.stance) && a.indexDiscipline === "slips") {
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
  if (a.repair === "verdict" && ["indexed", "nonrealist"].includes(a.stance)) {
    add("desert-return", "Deserved punishment returns through the back door", "The system rejects universal moral labels but still jumps to guilt and deserved pain instead of naming goals such as protection, prevention, or repair.");
  }
  if (a.scenarioTruth === "truth" && a.valueCenter === "welfare") {
    add("truth-welfare", "The story goes against the system’s main concern", "The system says reducing suffering matters most, yet it still requires the truth when serious harm is easy to predict.");
  }
  if (a.scenarioScarcity === "favorite" && a.similarCases === "criteria") {
    add("scarcity-discretion", "A clear public rule becomes a private guess", "The system says the same standards should apply to everyone, but leaves the medicine choice to whichever case feels strongest to the medical team.");
  }
  if (["protect", "believe"].includes(a.scenarioLoyalty) && ["criteria", "audit"].includes(a.similarCases)) {
    add("loyalty-exception", "The rule changes for a trusted insider", "The system promises the same treatment for similar cases but changes the proof or process for a leader in its own group.", "high");
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
    els.tensionList.innerHTML = '<p class="empty-tensions">No answers clash yet. The check is listening.</p>';
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
  const boundary = QUESTION_BOUNDARIES[q.id];
  els.questionDefinition.textContent = boundary.definition;
  els.questionScope.textContent = boundary.scope;
  els.plainExplanation.open = false;
  const guide = QUESTION_GUIDES[q.id];
  els.plainExplanationText.textContent = guide?.plain || q.why;
  els.plainExampleText.textContent = guide?.example || q.context;
  els.plainRevealText.textContent = guide?.reveals || q.why;
  els.why.textContent = q.why;
  els.back.style.visibility = state.index === 0 ? "hidden" : "visible";

  const currentAnswer = state.answers[q.id];
  els.choiceList.innerHTML = q.choices
    .map(
      (choice, index) => `
        <button
          class="choice-button ${choice.nonRealist ? "nonrealist-choice" : ""} ${currentAnswer === choice.id ? "selected" : ""}"
          type="button"
          role="radio"
          aria-checked="${currentAnswer === choice.id}"
          data-choice="${choice.id}"
        >
          <span class="choice-key">${String.fromCharCode(65 + index)}</span>
          <span class="choice-copy"><strong>${choice.label}</strong>${choice.nonRealist ? '<small class="choice-stance">Moral non-realist answer</small>' : ""}<span>${choice.detail}</span></span>
          <span class="choice-arrow" aria-hidden="true">→</span>
        </button>`,
    )
    .join("");

  els.choiceList.querySelectorAll(".choice-button").forEach((button) => {
    button.addEventListener("click", () => selectAnswer(q, button.dataset.choice));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  if (score >= 75) return { label: "Clear", className: "solvent" };
  if (score >= 50) return { label: "Needs work", className: "strained" };
  return { label: "Major gap", className: "debt" };
}

function verdictFor(score) {
  if (score >= 82) return "The main parts are clear and fit together";
  if (score >= 68) return "Mostly clear, with some open questions";
  if (score >= 48) return "Several parts need more explanation";
  return "Many parts break down or clash";
}

function formatSystemType(systemType) {
  return systemType.charAt(0).toUpperCase() + systemType.slice(1);
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
    : "No two answers directly clashed on this path. The scores still show which parts are clear and which parts need more explanation.";
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
              <span class="severity">${tension.severity === "high" ? "Strong clash" : "Possible clash"}</span>
              <h3>${tension.title}</h3>
              <p>${tension.detail}</p>
            </article>`,
        )
        .join("")
    : '<p class="no-final-tensions">No two answers directly clashed. This does not prove that the system is true or complete. It only means the answers given here fit together.</p>';

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildTextReport() {
  const scores = calculateScores();
  const tensions = detectTensions();
  const overall = calculateOverall(scores, tensions) ?? 0;
  const lines = [
    "THE COHERENCE ENGINE — REPORT",
    state.systemName,
    `How well the parts fit: ${overall}/100 — ${verdictFor(overall)}`,
    "",
    "THIRTEEN TESTS",
    ...Object.entries(DIMENSIONS).map(([key, dimension], index) => `${String(index + 1).padStart(2, "0")}. ${dimension.name}: ${scores[key] ?? 0}/100`),
    "",
    "ANSWERS THAT MAY CLASH",
    ...(tensions.length ? tensions.map((tension) => `- ${tension.title}: ${tension.detail}`) : ["- No answers directly clashed on this path."]),
    "",
    "LIMIT",
    "A clear and consistent system is not automatically true, fair, kind, wise, or morally binding. This test only checks whether the system explains its own structure and uses it consistently.",
  ];
  return lines.join("\n");
}

els.launchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(els.launchForm);
  state.systemType = form.get("systemType");
  state.systemName = formatSystemType(state.systemType);
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
  document.querySelector("#systemType").focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#copyReportButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(buildTextReport());
    button.textContent = "Report copied";
  } catch {
    button.textContent = "Copy unavailable";
  }
  window.setTimeout(() => (button.textContent = "Copy report"), 1800);
});

renderAxisGrid();
