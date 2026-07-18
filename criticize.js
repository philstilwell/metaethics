"use strict";

const CRITICISM_BASES = {
  majority: {
    index: "01",
    name: "Current majority approval",
    lane: "actual",
    short: "The criticism is assessed by what most members of the relevant society currently approve or reject.",
    establishes: "This identifies the society’s present dominant standard and whether the reformer’s claim matches it.",
    limit: "A majority count does not by itself show that the standard is objectively true, fairly made, harmless, or binding on a dissenter.",
  },
  subcommunity: {
    index: "02",
    name: "Subcommunity standards",
    lane: "actual",
    short: "The criticism is supported by the real standards of a minority, profession, faith, class, or other group inside or across the society.",
    establishes: "This shows that the society contains a genuine standard from which the practice is rejected, even if the largest group approves it.",
    limit: "It does not yet explain why this group’s standard should govern people outside the group or win when memberships overlap.",
  },
  inconsistency: {
    index: "03",
    name: "Internal inconsistency",
    lane: "internal",
    short: "The practice conflicts with another rule, value, or description the same society publicly accepts.",
    establishes: "This supports an internal criticism: the society cannot keep both the challenged practice and its stated commitment unchanged without explaining the conflict.",
    limit: "It does not prove which commitment should be dropped, and it does not show that either commitment is objectively morally true.",
  },
  promise: {
    index: "04",
    name: "Previously promised rights",
    lane: "internal",
    short: "A charter, law, treaty, or explicit assurance already promised people a protection that the practice removes.",
    establishes: "This shows breach of a documented public commitment and gives affected people a claim using the institution’s own terms.",
    limit: "A promise can be broken even if no objective moral fact exists. Whether every promise must be kept in every condition is a further question.",
  },
  personal: {
    index: "05",
    name: "Personal commitment",
    lane: "human",
    short: "The reformer openly speaks from a value, identity, or plan they personally endorse rather than pretending to report the society’s view.",
    establishes: "This makes the reformer’s opposition, motivation, and proposed direction clear without misdescribing what the majority accepts.",
    limit: "Sincerity and commitment alone do not require every other person to share the commitment or show that the practice is objectively wrong.",
  },
  harm: {
    index: "06",
    name: "Harm or autonomy",
    lane: "human",
    short: "Evidence shows injury, suffering, deprivation, domination, or loss of informed control, and the criticism gives those effects priority.",
    establishes: "This joins an evidence claim about people’s lives to a stated practical priority against serious harm or imposed control.",
    limit: "Evidence can show the effect; it cannot by itself supply the value bridge that everyone objectively ought to prevent that effect.",
  },
  ideal: {
    index: "07",
    name: "Idealized agreement",
    lane: "human",
    short: "The practice is tested by what people would accept with better information, less coercion, equal standing, or ignorance of their own social position.",
    establishes: "This supports criticism from a specified procedure designed to remove information gaps, threats, or bargaining advantages.",
    limit: "The result depends on why those ideal conditions were chosen and whether actual people have reason to accept the procedure’s authority.",
  },
  truth: {
    index: "08",
    name: "Approval-independent moral truth",
    lane: "truth",
    short: "The practice is claimed to be morally wrong regardless of every actual or imagined person’s approval, commitment, agreement, or goal.",
    establishes: "If the claimed moral fact exists and the claim is correct, the society’s total approval does not change the practice’s moral status.",
    limit: "The claim needs a defense of approval-independent moral facts and an account of how this case falls under them; social disapproval alone cannot supply either.",
  },
};

const CRITICISM_BASE_ORDER = ["majority", "subcommunity", "inconsistency", "promise", "personal", "harm", "ideal", "truth"];

const CRITICISM_LANES = {
  actual: {
    index: "A",
    name: "Actual approval and group standards",
    copy: "These grounds report standards that people really accept now. They make the relevant group boundary crucial.",
  },
  internal: {
    index: "B",
    name: "The society’s own terms",
    copy: "These grounds test a practice against commitments the society has already made. They can expose a problem without leaving the society’s framework.",
  },
  human: {
    index: "C",
    name: "Stated human reasons and procedures",
    copy: "These grounds defend change through commitments, effects on lives, or a procedure. They can extend beyond current approval without automatically becoming objective moral facts.",
  },
  truth: {
    index: "D",
    name: "Approval-independent moral truth",
    copy: "This ground claims a status that no person, vote, culture, or agreement creates or removes.",
  },
};

const CRITICISM_STANCES = {
  majority: {
    name: "Current-majority definition",
    label: "A criticism is valid for a society only when its current majority accepts the standard behind it",
    detail: "A reformer may campaign for change, but while the majority rejects the reformer’s standard, the reformer is not correct by that society’s present standard.",
    implication: "Only current-majority approval counts as a valid society-level ground under this definition.",
    allowed: ["majority"],
  },
  relative: {
    name: "Actual-standard-relative definition",
    label: "A criticism can be valid relative to an actual group, rule, or promise, but no group automatically outranks every other",
    detail: "A minority can be correct by its standard, and a society can fail its own rule. The speaker must still name whose standard applies and how conflicts between standards are handled.",
    implication: "Actual group standards and the society’s existing commitments count; personal priorities, ideal procedures, and objective facts go beyond this definition.",
    allowed: ["majority", "subcommunity", "inconsistency", "promise"],
  },
  practical: {
    name: "Practical non-realist definition",
    label: "A criticism is valid when its human basis is stated and supported; it need not report an objective moral fact",
    detail: "A person may use actual standards, broken commitments, harm, autonomy, personal commitments, or a defended procedure while openly rejecting approval-independent moral truth.",
    implication: "Every listed ground except approval-independent moral truth can fit this definition if its factual and practical claims are supported.",
    allowed: ["majority", "subcommunity", "inconsistency", "promise", "personal", "harm", "ideal"],
  },
  realist: {
    name: "Moral-realist definition",
    label: "At least some societies can be objectively morally wrong even if every actual person approves",
    detail: "Votes, promises, harms, and procedures may help explain or persuade, but the deepest claim is that some moral truths do not depend on any person’s or group’s stance.",
    implication: "All eight grounds can be used, although only the approval-independent truth ground directly states the realist claim.",
    allowed: CRITICISM_BASE_ORDER,
  },
};

const CRITICISM_STANCE_ORDER = ["majority", "relative", "practical", "realist"];

function criticismStanceQuestion(id, phase, axis) {
  return {
    id,
    kind: "stance",
    phase,
    axis,
    prompt: "What is the broadest kind of claim that can make criticism of an accepted social practice valid?",
    context:
      "Imagine that a reformer accurately describes the practice and sincerely opposes it, but the society’s current majority still approves. Choose the rule you would use to decide what kinds of criticism can be valid. You will answer this same question again after six cases.",
    assumptions:
      "“Valid” means the criticism has the kind of support your definition requires. It does not mean that the criticism is popular, legally successful, politely expressed, or guaranteed to persuade anyone.",
    scope:
      "Choose the broadest basis you accept for society-level criticism. This is about what can support the criticism, not whether force should be used or whether the reformer will win.",
    why: "The repeated definition lets the diagnostic compare your general rule with the exact grounds you use in concrete cases.",
    guide: {
      plain: "Ask what could make the reformer more than a person announcing dislike: majority acceptance, an actual standard, stated human reasons, or objective moral truth.",
      separate: "A criticism can be useful, brave, or well argued without being approval-independent. An objective claim can also be poorly argued.",
      reveal: "Your answer sets the general boundary against which your six case grounds will later be compared.",
    },
    choices: CRITICISM_STANCE_ORDER.map((stance) => ({ id: stance, ...CRITICISM_STANCES[stance] })),
  };
}

const CRITICISM_CASES = [
  {
    id: "birthmark",
    kind: "case",
    phase: "Test the boundary",
    axis: "Case 1 of 6 · The birthmark floors",
    title: "The birthmark floors",
    prompt: "On what exact ground can Ilya criticize a rank system that nearly everyone in the city openly accepts?",
    context:
      "The vertical city of Vey assigns every child a floor at birth from a harmless colored mark on the child’s wrist. Upper-floor citizens receive three votes, first access to scarce apprenticeships, and cleaner air. Lower-floor citizens do the dirtiest repair work and may cast one vote. Eighty-one percent of adults—including many lower-floor adults—say the system preserves order. Ilya, a lower-floor engineer, begins a public campaign to abolish inherited rank.",
    assumptions:
      "The mark predicts no talent or behavior. The founding charter openly endorses unequal rank and contains no promise of equal citizenship. Reliable health records show substantially more lung disease and ten fewer healthy years on lower floors. Ilya uses peaceful speech and does not lie about the data.",
    scope:
      "Choose the single ground you think gives Ilya’s criticism its clearest support in this exact case. Do not answer whether the campaign will succeed or whether officials may silence it.",
    why: "Because Vey openly endorses rank, an internal-consistency answer is unavailable. A criticism must name another standard or claim.",
    file: ["81% approve inherited rank", "No equal-citizenship promise", "Ten healthy years lost below"],
    guide: {
      plain: "The practice is not a secret mistake by the city’s own written rule. If you oppose it, say where your objection comes from.",
      separate: "“Most people approve” describes the dominant standard. “Lower-floor people reject it,” “it harms people,” and “it is objectively wrong” are three additional claims.",
      reveal: "Your answer shows how you criticize when the society is not simply failing to live up to a value it already claims.",
    },
    choices: [
      {
        id: "majority",
        basis: "majority",
        label: "By Vey’s current majority standard, the rank system is accepted; Ilya is proposing a new standard rather than stating the city’s present one",
        detail: "Ilya can campaign, but on this definition the criticism does not become valid for Vey until the relevant majority changes its view.",
      },
      {
        id: "subcommunity",
        basis: "subcommunity",
        label: "Ilya’s criticism is valid by the organized lower-floor community’s anti-rank standard, even while the citywide majority disagrees",
        detail: "The criticism accurately speaks from a real group inside Vey; a further rule is needed if that group’s standard is supposed to govern upper-floor citizens too.",
      },
      {
        id: "personal",
        basis: "personal",
        label: "Ilya can openly oppose inherited rank from a personal commitment to equal standing without claiming to report Vey’s shared standard",
        detail: "The criticism is an honest practical stand and invitation to reform, not a claim that most citizens already accept equality.",
      },
      {
        id: "harm",
        basis: "harm",
        label: "The health evidence supports criticism when joined to a stated priority against avoidable disease and imposed life-shortening conditions",
        detail: "The ten-year gap is evidence; the priority against imposing that gap supplies the practical bridge from the evidence to reform.",
      },
      {
        id: "ideal",
        basis: "ideal",
        label: "Test the system by what informed residents would accept before learning which birthmark and floor they would receive",
        detail: "If people given equal bargaining power reject inherited rank behind that information limit, the specified fair-agreement test supports Ilya.",
      },
      {
        id: "truth",
        basis: "truth",
        label: "Inherited civic rank is objectively morally wrong even if every person in Vey understands it and continues to approve it",
        detail: "The criticism claims an approval-independent moral fact; defending it requires more than reporting the health gap or the vote count.",
      },
    ],
  },
  {
    id: "whistle",
    kind: "case",
    phase: "Test the boundary",
    axis: "Case 2 of 6 · The clean safety report",
    title: "The clean safety report",
    prompt: "What most clearly supports Mara when every other member of her institution condemns her disclosure?",
    context:
      "The floating-bridge agency discovers that its new support cables have a one-in-eight chance of failing during the next storm season. Its board, engineers, inspectors, and worker council unanimously agree to publish a report saying the risk is one in ten thousand; they fear that closure would bankrupt the region. Mara, the final safety analyst, gives the real model and internal messages to an independent inspector. Every current colleague calls her disloyal.",
    assumptions:
      "The model is reliable, the disclosure is limited to the safety evidence, and the independent inspector can order repairs before the storm. The agency’s public charter says “report material safety risks without alteration.” Every bridge user received a written guarantee that the agency would disclose any known annual failure risk above one in a thousand.",
    scope:
      "Choose the single ground that best explains why Mara’s criticism of the cover-up is valid. Do not decide her legal penalty, whether bankruptcy is acceptable, or whether every secret should be disclosed.",
    why: "Unanimous institutional approval can explain the agency’s current norm while evidence, its charter, a specific guarantee, a proposed procedure, or moral realism supplies a different ground.",
    file: ["Agency approval is unanimous", "Reported risk is knowingly false", "A public charter and guarantee apply"],
    guide: {
      plain: "The whole institution agrees to lie, but the institution has also said in writing that it will report this kind of danger.",
      separate: "False risk data, breach of a charter, breach of a promised right, expected injury, and objective wrongness are different criticisms even when all point the same way.",
      reveal: "Your answer shows whether you rely on present institutional approval, its own commitments, effects on people, a fair review, or moral truth.",
    },
    choices: [
      {
        id: "majority",
        basis: "majority",
        label: "By the agency’s current unanimous standard, hiding the risk is accepted and Mara’s criticism is not institutionally valid yet",
        detail: "The disclosure may change the institution later, but present approval is the controlling standard under this answer.",
      },
      {
        id: "inconsistency",
        basis: "inconsistency",
        label: "The cover-up conflicts with the same agency’s public rule to report material safety risks without altering them",
        detail: "Mara can demand that the agency either follow its safety charter or openly revise it; present practice and the stated rule cannot both stand without explanation.",
      },
      {
        id: "promise",
        basis: "promise",
        label: "Bridge users were specifically promised disclosure above a stated risk level, and the agency is withholding exactly that protection",
        detail: "This is not a vague appeal to honesty: the recipients, threshold, information, and present breach are all identified.",
      },
      {
        id: "harm",
        basis: "harm",
        label: "The reliable failure risk supports Mara when joined to a priority against exposing unknowing bridge users to severe preventable injury",
        detail: "The model supplies the danger evidence; the stated priority explains why that danger counts against concealment despite the economic cost.",
      },
      {
        id: "ideal",
        basis: "ideal",
        label: "Submit the evidence to an independent process in which bridge users have equal information and the agency cannot threaten their livelihood",
        detail: "A verdict against concealment would be supported by the specified informed and less-coercive procedure, not by the agency’s current vote alone.",
      },
      {
        id: "truth",
        basis: "truth",
        label: "Knowingly hiding this danger is objectively morally wrong even if every agency member and bridge user would approve the concealment",
        detail: "This answer makes the criticism independent of actual approval, the written charter, the promise, and the predicted response of an ideal group.",
      },
    ],
  },
  {
    id: "future",
    kind: "case",
    phase: "Test the boundary",
    axis: "Case 3 of 6 · The borrowed dawns",
    title: "The borrowed dawns",
    prompt: "What, if anything, lets a future society criticize a practice that today’s society understands and accepts?",
    context:
      "In 2080, adults may lease vivid copies of their happiest memories to entertainment archives. The payment can clear a family’s debt, but repeated recording makes some original memories feel less private and less fully their own. Seventy-four percent of adults approve the market; every seller receives the known risk in plain language. In 2180, after people place far greater value on mental privacy, ninety-six percent call the old market a serious wrong.",
    assumptions:
      "No new hidden fact about the 2080 market has been discovered. The later society has better treatments for memory disturbance, but its judgment concerns the earlier trade as it actually occurred. A documented 2080 association of sellers opposed the market. The question is about criticism, not retroactive punishment.",
    scope:
      "Choose the single ground that best states what the 2180 critics can establish about the 2080 practice. Do not assume that later automatically means wiser or that informed consent settles every issue.",
    why: "A later majority is another actual standard, not automatically an objective court of appeal. The case asks what else, if anything, carries the criticism across time.",
    file: ["74% approved in 2080", "No hidden fact was later found", "A seller group objected at the time"],
    guide: {
      plain: "The facts did not change; the dominant values did. Ask whether a new majority can make an old practice wrong, or whether another ground does the work.",
      separate: "“Wrong by 2180 standards,” “opposed by some people in 2080,” “damaged mental control,” and “objectively wrong in both eras” are different conclusions.",
      reveal: "Your answer shows how social criticism reaches across time when approval changes but the case facts do not.",
    },
    choices: [
      {
        id: "majority",
        basis: "majority",
        label: "The market was accepted by the relevant majority in 2080; the 2180 majority can reject it now but cannot change its earlier status by the old standard",
        detail: "Each period has its own dominant standard. Later disapproval does not travel backward as a fact that the earlier majority already accepted.",
      },
      {
        id: "subcommunity",
        basis: "subcommunity",
        label: "The 2080 sellers’ association already supplied a real anti-market standard from inside the society that practiced memory leasing",
        detail: "The future critics can align with that subcommunity, while still needing to explain why its standard should govern the majority and willing sellers.",
      },
      {
        id: "personal",
        basis: "personal",
        label: "The future critics can reject memory markets from their own commitment to mental privacy without claiming that 2080 secretly shared it",
        detail: "This is a clear present standpoint for criticism and reform, not a historical claim about what most earlier adults accepted.",
      },
      {
        id: "harm",
        basis: "harm",
        label: "The known loss of privacy and felt ownership supports criticism when critics state that those autonomy costs should not be traded for debt relief",
        detail: "The factual effect existed in 2080; the priority assigned to mental control supplies the bridge from that fact to opposition.",
      },
      {
        id: "ideal",
        basis: "ideal",
        label: "Ask what sellers would choose without urgent debt pressure, with equal alternatives, and with full time to understand the lasting memory effect",
        detail: "This procedure tests whether the formally informed sale would survive better options and less bargaining pressure.",
      },
      {
        id: "truth",
        basis: "truth",
        label: "Commercial leasing of these memories was objectively morally wrong in 2080 regardless of approval in either century",
        detail: "This answer makes the old practice’s status independent of the two majorities and requires an approval-independent moral defense.",
      },
    ],
  },
  {
    id: "overlap",
    kind: "case",
    phase: "Test the boundary",
    axis: "Case 4 of 6 · Two homes, one body",
    title: "Two homes, one body",
    prompt: "Which standard can criticize Nadi’s choice when two communities she belongs to claim opposite authority over it?",
    context:
      "Nadi belongs to the Tide Faith, which requires intact burial, and the Glass Rescue Guild, which asks every trained rescuer to donate usable organs after death. She values both groups and signed each membership charter. The faith and guild are equally large in her island city. After a fatal accident, each community claims that its rule should control Nadi’s body. Nadi left a private, legally valid instruction choosing organ donation.",
    assumptions:
      "Both charters also contain an older clause saying that members with conflicting memberships may make their own final choice without punishment. City law promises every competent adult final control over posthumous donation. Donation would save three identified patients. No citywide majority view exists.",
    scope:
      "Choose the single ground that most clearly supports criticism of leaders who try to override Nadi’s instruction. Do not decide whether burial or donation is objectively best for everyone.",
    why: "Nadi belongs fully to both groups. Simply saying “follow the culture” does not identify one culture, and both communities have rules that bear on the conflict.",
    file: ["Two full memberships conflict", "Both charters protect the member’s choice", "City law promises final control"],
    guide: {
      plain: "Two real communities claim Nadi, but both have also said that she gets the final word when their rules conflict.",
      separate: "Choosing a relevant group, exposing a group’s inconsistency, enforcing a legal promise, following Nadi’s own plan, and claiming objective truth each answer a different question.",
      reveal: "Your answer shows how you handle the boundary problem when one person genuinely belongs to more than one society.",
    },
    choices: [
      {
        id: "majority",
        basis: "majority",
        label: "No citywide majority has accepted either community’s demand, so neither criticism is valid for the whole city by a current-majority rule",
        detail: "Each group may state its own view, but this answer waits for a citywide majority before treating either demand as the society-level standard.",
      },
      {
        id: "subcommunity",
        basis: "subcommunity",
        label: "Each community may criticize by its own standard, but neither standard alone decides which community governs Nadi in this overlap",
        detail: "This preserves both actual group-relative judgments and openly leaves the authority conflict unresolved.",
      },
      {
        id: "inconsistency",
        basis: "inconsistency",
        label: "Leaders in both communities contradict their own conflict clause when they deny Nadi the final choice their charters protect",
        detail: "They must either respect the clause or openly revise it; citing another part of the same charter does not erase the conflict.",
      },
      {
        id: "promise",
        basis: "promise",
        label: "The city has already promised competent adults final control over donation, and overriding Nadi breaches that exact legal protection",
        detail: "The holder of the right, the protected decision, and the institutions bound by the promise are all specified.",
      },
      {
        id: "personal",
        basis: "personal",
        label: "Nadi’s own informed commitment should guide allies who share a priority for carrying out a person’s settled life plan",
        detail: "This states the practical commitment behind supporting her instruction without claiming both communities already share it.",
      },
      {
        id: "ideal",
        basis: "ideal",
        label: "Use a rule that equal, informed members would accept before knowing which memberships or medical needs they would have",
        detail: "If that procedure assigns the final choice to the individual, it supports Nadi without choosing whichever actual group is larger.",
      },
      {
        id: "truth",
        basis: "truth",
        label: "Overriding Nadi’s informed instruction is objectively morally wrong regardless of her groups, the city’s promise, or the lives saved",
        detail: "This makes the criticism approval-independent and requires a defense of objective control over one’s posthumous body.",
      },
    ],
  },
  {
    id: "gate",
    kind: "case",
    phase: "Test the boundary",
    axis: "Case 5 of 6 · The equal-citizenship gate",
    title: "The equal-citizenship gate",
    prompt: "What is the clearest basis for criticizing a society that praises equal citizenship while excluding one district?",
    context:
      "The river republic of Sen places an automated gate around the migrant-built Delta district during flood season. Delta residents may leave only with employer permission, while residents of wealthier districts move freely. The gate makes evacuation traffic easier for everyone outside Delta, and sixty-eight percent of voters support it. A Delta coalition demands removal, quoting Sen’s national motto: “No citizen stands below another.”",
    assumptions:
      "Every Delta resident is a citizen. Sen’s constitution separately promises equal freedom of movement and a hearing before any district-wide restriction. Delta received no hearing. Traffic models show that several non-discriminatory routing plans would produce the same evacuation time at modest extra cost.",
    scope:
      "Choose the single ground that gives the coalition’s criticism its clearest support in this case. Do not decide the remedy, damages, or whether every emergency movement limit is unacceptable.",
    why: "The case contains both a broad professed value and a precise promised right. It also allows criticism through consequences, a fair procedure, or approval-independent truth.",
    file: ["68% support the gate", "All Delta residents are citizens", "Equal movement and a hearing were promised"],
    guide: {
      plain: "Sen says citizens stand as equals, and its constitution makes that promise specific. The gate treats one citizen district differently without the promised hearing.",
      separate: "A slogan-level contradiction, breach of a legal right, avoidable loss of freedom, failed procedure, and objective wrongness may support the same reform for different reasons.",
      reveal: "Your answer shows which part of a society’s architecture you use when its practice clashes with its public self-description.",
    },
    choices: [
      {
        id: "majority",
        basis: "majority",
        label: "The gate matches Sen’s current majority standard, so the coalition is asking the society to change rather than reporting its dominant judgment",
        detail: "Under a current-majority definition, support from sixty-eight percent controls until public approval changes.",
      },
      {
        id: "inconsistency",
        basis: "inconsistency",
        label: "Sen cannot easily combine “no citizen stands below another” with a citizen-only gate imposed on one less powerful district",
        detail: "The coalition can require Sen to revise the unequal practice, narrow the motto, or explain a distinction that preserves both.",
      },
      {
        id: "promise",
        basis: "promise",
        label: "The constitution promises every citizen equal movement and a hearing, and Delta received neither protection before confinement",
        detail: "This criticism identifies the promised holders, the protected interest, the required procedure, and the exact breach.",
      },
      {
        id: "harm",
        basis: "harm",
        label: "The gate imposes avoidable confinement and loss of control when equally effective alternatives exist at a modest shared cost",
        detail: "The evidence supports criticism when joined to a priority against concentrating an avoidable autonomy burden on one district.",
      },
      {
        id: "ideal",
        basis: "ideal",
        label: "Ask which evacuation rule equally informed citizens would accept before knowing whether they would live inside or outside Delta",
        detail: "A rejection under those specified conditions supports the coalition through a fair-agreement test rather than the actual vote.",
      },
      {
        id: "truth",
        basis: "truth",
        label: "Confining Delta in these conditions is objectively morally wrong even if Sen removes its equality motto and every citizen approves",
        detail: "This answer does not rely on inconsistency or breach; it claims an approval-independent moral status for the practice itself.",
      },
    ],
  },
  {
    id: "conquest",
    kind: "case",
    phase: "Test the boundary",
    axis: "Case 6 of 6 · The festival of conquest",
    title: "The festival of conquest",
    prompt: "How can Rian criticize a society whose deepest public values—not merely its inconsistent behavior—support conquest?",
    context:
      "The island state of Orra openly teaches that national greatness consists in conquering smaller islands and forcing captured adults to work for Orran families for ten years. The annual Festival of Conquest honors successful raids. Ninety-four percent of Orran citizens approve, the constitution ranks conquest above equality, and no public promise protects outsiders from forced labor. Rian, a decorated captain, resigns and calls for the practice to end completely.",
    assumptions:
      "The conquered adults did not attack Orra, cannot refuse the labor, and suffer documented injury, family separation, and loss of movement. A small underground Orran group already rejects conquest. Rian’s reform would reduce Orra’s wealth and status but would not threaten its survival. Rian has no evidence that the constitution is being misapplied.",
    scope:
      "Choose the single ground that most clearly supports Rian’s radical criticism. Do not pretend that Orra already values equality, and do not decide whether violent rebellion is permitted.",
    why: "Internal consistency and promised rights are deliberately unavailable. The reformer must identify a minority standard, a personal stand, human effects, a proposed procedure, or objective moral truth—or accept the current majority standard.",
    file: ["94% approve conquest", "The constitution openly ranks it first", "No protected-right promise applies"],
    guide: {
      plain: "Orra is not failing its stated ideal. Rian rejects the ideal itself, knowing that reform will cost his own society wealth and status.",
      separate: "A minority’s rejection, Rian’s commitment, the captives’ injuries, a fair-agreement test, and objective moral wrongness can all oppose conquest without saying the same thing.",
      reveal: "Your answer shows what remains available when criticism cannot borrow the society’s deepest official values.",
    },
    choices: [
      {
        id: "majority",
        basis: "majority",
        label: "By Orra’s current majority standard, conquest is accepted; Rian is a reformer proposing a new standard rather than applying the existing one",
        detail: "This answer permits persuasion and political change but denies that Rian is correct by Orra’s present dominant standard.",
      },
      {
        id: "subcommunity",
        basis: "subcommunity",
        label: "Rian’s criticism is valid by the underground anti-conquest group’s real standard even though that group is a small minority",
        detail: "This places Rian inside an actual Orran counter-standard while leaving open why that group’s view should govern the majority.",
      },
      {
        id: "personal",
        basis: "personal",
        label: "Rian can reject conquest from his own settled commitment against forced labor and invite others to adopt that commitment",
        detail: "His criticism states where he stands and what he will work to change without pretending that Orra already agrees.",
      },
      {
        id: "harm",
        basis: "harm",
        label: "The injury, separation, and loss of control support criticism when joined to a priority against imposing those costs for wealth and status",
        detail: "The evidence identifies what conquest does; the stated priority supplies the practical reason to end it despite benefits to Orrans.",
      },
      {
        id: "ideal",
        basis: "ideal",
        label: "Ask which rule people would accept with equal power before knowing whether they would be an Orran citizen or a captured outsider",
        detail: "A rejection under those conditions supports Rian through a specified agreement procedure that removes conquest’s bargaining advantage.",
      },
      {
        id: "truth",
        basis: "truth",
        label: "Forcing innocent captives to labor for national greatness is objectively morally wrong even if every actual person approves it",
        detail: "This makes Rian’s deepest claim independent of every society, subcommunity, commitment, effect-ranking, and imagined agreement.",
      },
    ],
  },
];

const CRITICISM_QUESTIONS = [
  criticismStanceQuestion("opening", "Define valid criticism", "Opening definition · Before the cases"),
  ...CRITICISM_CASES,
  criticismStanceQuestion("final", "Reconsider the definition", "Final definition · After the cases"),
];

const criticismState = { index: 0, opening: null, final: null, answers: {} };

function criticismQuestionAt(index) {
  return CRITICISM_QUESTIONS[index];
}

function criticismSelectedId(question, state = criticismState) {
  return question.kind === "stance" ? state[question.id] : state.answers[question.id];
}

function criticismChoice(question, id) {
  return question.choices.find((choice) => choice.id === id);
}

function criticismBasisProfile(state, answeredOnly = false) {
  const answeredCases = answeredOnly ? CRITICISM_CASES.filter((question) => state.answers[question.id]) : CRITICISM_CASES;
  return CRITICISM_BASE_ORDER.map((id) => {
    const base = CRITICISM_BASES[id];
    const offered = answeredCases.filter((question) => question.choices.some((choice) => choice.basis === id)).length;
    const selected = answeredCases.filter((question) => {
      const choice = criticismChoice(question, state.answers[question.id]);
      return choice && choice.basis === id;
    }).length;
    return { id, ...base, offered, selected, rate: offered ? Math.round((selected / offered) * 100) : 0 };
  });
}

function criticismDefinitionMismatches(state) {
  if (!state.final || !CRITICISM_STANCES[state.final]) return [];
  const allowed = new Set(CRITICISM_STANCES[state.final].allowed);
  return CRITICISM_CASES.flatMap((question) => {
    const choice = criticismChoice(question, state.answers[question.id]);
    if (!choice || allowed.has(choice.basis)) return [];
    return [{
      questionId: question.id,
      title: question.title,
      basis: choice.basis,
      basisName: CRITICISM_BASES[choice.basis].name,
      text: `Your final ${CRITICISM_STANCES[state.final].name.toLowerCase()} does not include ${CRITICISM_BASES[choice.basis].name.toLowerCase()}, which you used in “${question.title}.” Decide whether to broaden the definition or restate that case on a ground the definition accepts.`,
    }];
  });
}

function criticismDiagnostic(state) {
  const profile = criticismBasisProfile(state);
  const topRate = Math.max(...profile.map((basis) => basis.rate));
  const primary = profile.filter((basis) => basis.rate === topRate && basis.selected > 0);
  const beyond = CRITICISM_CASES.filter((question) => criticismChoice(question, state.answers[question.id])?.basis !== "majority").length;
  const mismatches = criticismDefinitionMismatches(state);
  const opening = CRITICISM_STANCES[state.opening];
  const final = CRITICISM_STANCES[state.final];
  const changed = state.opening !== state.final;
  const usedLanes = new Set(profile.filter((basis) => basis.selected).map((basis) => basis.lane));
  let title = "Your criticism uses more than a popularity test.";
  if (beyond === 0) title = "Your criticism stays with current-majority approval.";
  else if (profile.find((basis) => basis.id === "truth").selected) title = "Your criticism includes an approval-independent moral claim.";
  else if (usedLanes.size >= 3) title = "Your criticism moves across several human standpoints.";
  const summary = `${beyond} of your 6 case answers used a ground other than current-majority approval. ${mismatches.length ? `${mismatches.length} answer${mismatches.length === 1 ? " does" : "s do"} not fit the boundary set by your final definition and needs clarification.` : "Every case ground fits within the boundary set by your final definition."} This reports how the claims are built; it does not decide whether any society is objectively morally right.`;
  return { profile, primary, beyond, mismatches, opening, final, changed, usedLanes, title, summary };
}

function buildCriticismAIProbePrompt(state) {
  const diagnostic = criticismDiagnostic(state);
  const lines = [
    "You are conducting a careful interview about criticism of one’s own society. Ask one focused question at a time and wait for my answer.",
    "",
    "METHOD AND GUARDRAILS",
    "- Do not assume moral realism or moral non-realism. Help me state which view I rely on and why.",
    "- Keep these claims distinct: ‘the majority disapproves,’ ‘a subcommunity rejects it,’ ‘the society violates its own rule,’ ‘a promised right was breached,’ ‘I oppose it,’ ‘it causes harm or removes autonomy,’ ‘an idealized procedure rejects it,’ and ‘it is objectively morally wrong.’",
    "- Do not reduce every form of cultural relativism to simple majority rule. When I appeal to a social standard, ask which community, speaker, person judged, time, or rule supplies it.",
    "- Do not move from a factual claim about harm to a duty without asking for the value or procedure that makes the harm count against the practice.",
    "- Do not infer approval-independent obligation from agreement, law, social approval, usefulness, punishment, or motivation.",
    "- Do not call the use of several grounds incoherent by itself. Flag only a precise conflict in scope, definition, or application.",
    "- Treat a change between my opening and final definitions as a possible revision prompted by the cases, not an error.",
    "- For each tension, first restate both claims in their strongest compatible form, then ask what extra rule would settle it.",
    "",
    "MY GENERAL DEFINITIONS",
    `Opening: ${diagnostic.opening.label}`,
    `Opening meaning: ${diagnostic.opening.detail}`,
    `Final: ${diagnostic.final.label}`,
    `Final meaning: ${diagnostic.final.detail}`,
    `Change: ${diagnostic.changed ? "I changed my definition after the six cases." : "I kept the same definition."}`,
    "",
    "MY SIX CASE ANSWERS",
  ];
  CRITICISM_CASES.forEach((question, index) => {
    const choice = criticismChoice(question, state.answers[question.id]);
    const base = CRITICISM_BASES[choice.basis];
    lines.push(
      "",
      `${index + 1}. ${question.title}`,
      `Full situation: ${question.context}`,
      `Fixed facts: ${question.assumptions}`,
      `Question scope: ${question.scope}`,
      `My answer: ${choice.label}`,
      `Answer meaning: ${choice.detail}`,
      `Ground used: ${base.name}`,
      `What that ground establishes: ${base.establishes}`,
      `What it does not establish: ${base.limit}`,
    );
  });
  lines.push("", "EIGHT-GROUND PROFILE (selected / offered; not a truth score)");
  diagnostic.profile.forEach((basis) => lines.push(`- ${basis.name}: ${basis.selected} / ${basis.offered} (${basis.rate}%)`));
  lines.push(
    "",
    `Answers beyond current-majority approval: ${diagnostic.beyond} / 6`,
    "",
    "DEFINITION MISMATCHES TO INVESTIGATE",
  );
  if (diagnostic.mismatches.length) diagnostic.mismatches.forEach((item) => lines.push(`- ${item.text}`));
  else lines.push("- None detected by the lab’s exact compatibility rule. Still test whether my group boundaries and value bridges are clear.");
  lines.push(
    "",
    "INTERVIEW TASK",
    "Begin with the most important unresolved boundary in my answers. Ask whether my criticism is internal to an actual standard, practical from a stated commitment or procedure, or approval-independent. Then probe one case at a time. If I appeal to a group, ask why that group is relevant. If I appeal to harm, ask which priority connects the effect to reform. If I appeal to ideal agreement, ask who is included and why the idealizing conditions have authority. If I appeal to objective moral truth, ask what supports the truth claim beyond disapproval and what would count against it. End only after summarizing my clarified position, its strongest criticism of a fully approving society, and the questions that remain open.",
  );
  return lines.join("\n");
}

const criticizeEls = {
  liveStatus: document.querySelector("#criticizeLiveStatus"),
  workspace: document.querySelector("#criticizeLab"),
  phase: document.querySelector("#criticizePhase"),
  progress: document.querySelector("#criticizeProgress"),
  progressTrack: document.querySelector("#criticizeProgressTrack"),
  progressBar: document.querySelector("#criticizeProgressBar"),
  number: document.querySelector("#criticizeQuestionNumber"),
  axis: document.querySelector("#criticizeQuestionAxis"),
  prompt: document.querySelector("#criticizeQuestionPrompt"),
  caseFile: document.querySelector("#criticizeCaseFile"),
  context: document.querySelector("#criticizeQuestionContext"),
  assumptions: document.querySelector("#criticizeAssumptions"),
  scope: document.querySelector("#criticizeScope"),
  explanation: document.querySelector("#criticizeExplanation"),
  plain: document.querySelector("#criticizePlain"),
  separate: document.querySelector("#criticizeSeparate"),
  reveal: document.querySelector("#criticizeReveal"),
  choices: document.querySelector("#criticizeChoices"),
  back: document.querySelector("#criticizeBackButton"),
  next: document.querySelector("#criticizeNextButton"),
  why: document.querySelector("#criticizeWhy"),
  casesCount: document.querySelector("#criticizeCasesCount"),
  beyondCount: document.querySelector("#criticizeBeyondCount"),
  mapBasis: document.querySelector("#criticizeMapBasis"),
  liveBases: document.querySelector("#criticizeLiveBases"),
  results: document.querySelector("#criticizeResults"),
  resultTitle: document.querySelector("#criticizeResultTitle"),
  resultSummary: document.querySelector("#criticizeResultSummary"),
  primaryBasis: document.querySelector("#criticizePrimaryBasis"),
  primaryCopy: document.querySelector("#criticizePrimaryCopy"),
  beyondResult: document.querySelector("#criticizeBeyondResult"),
  beyondCopy: document.querySelector("#criticizeBeyondCopy"),
  stanceShift: document.querySelector("#criticizeStanceShift"),
  stanceCopy: document.querySelector("#criticizeStanceCopy"),
  laneGrid: document.querySelector("#criticizeLaneGrid"),
  caseGrid: document.querySelector("#criticizeCaseGrid"),
  alignmentGrid: document.querySelector("#criticizeAlignmentGrid"),
  boundaryCopy: document.querySelector("#criticizeBoundaryCopy"),
  boundaryQuestion: document.querySelector("#criticizeBoundaryQuestion"),
  aiPrompt: document.querySelector("#criticizeAIProbePrompt"),
  copyStatus: document.querySelector("#criticizePromptCopyStatus"),
};

function createCriticismChoice(question, choice, selected) {
  const label = document.createElement("label");
  label.className = `criticize-choice${selected ? " selected" : ""}`;
  const input = document.createElement("input");
  input.type = "radio";
  input.name = `criticize-${question.id}`;
  input.value = choice.id;
  input.checked = selected;
  const body = document.createElement("span");
  const marker = document.createElement("small");
  marker.textContent = question.kind === "case" ? CRITICISM_BASES[choice.basis].name : choice.name;
  const title = document.createElement("strong");
  title.textContent = choice.label;
  const detail = document.createElement("em");
  detail.textContent = choice.detail;
  body.append(marker, title, detail);
  label.append(input, body);
  input.addEventListener("change", () => {
    if (question.kind === "stance") criticismState[question.id] = choice.id;
    else criticismState.answers[question.id] = choice.id;
    renderCriticismQuestion();
    criticizeEls.liveStatus.textContent = `${question.kind === "case" ? CRITICISM_BASES[choice.basis].name : choice.name} selected.`;
  });
  return label;
}

function renderCriticismCaseFile(question) {
  criticizeEls.caseFile.replaceChildren();
  if (!question.file) {
    criticizeEls.caseFile.classList.add("hidden");
    return;
  }
  criticizeEls.caseFile.classList.remove("hidden");
  question.file.forEach((fact) => {
    const span = document.createElement("span");
    span.textContent = fact;
    criticizeEls.caseFile.append(span);
  });
}

function renderCriticismQuestion({ scroll = false } = {}) {
  const question = criticismQuestionAt(criticismState.index);
  const selected = criticismSelectedId(question);
  criticizeEls.phase.textContent = question.phase;
  criticizeEls.progress.textContent = `${criticismState.index + 1} / ${CRITICISM_QUESTIONS.length}`;
  criticizeEls.progressTrack.setAttribute("aria-valuenow", String(criticismState.index + 1));
  criticizeEls.progressBar.style.width = `${((criticismState.index + 1) / CRITICISM_QUESTIONS.length) * 100}%`;
  criticizeEls.number.textContent = String(criticismState.index + 1).padStart(2, "0");
  criticizeEls.axis.textContent = question.axis;
  criticizeEls.prompt.textContent = question.prompt;
  criticizeEls.context.textContent = question.context;
  criticizeEls.assumptions.textContent = question.assumptions;
  criticizeEls.scope.textContent = question.scope;
  criticizeEls.plain.textContent = question.guide.plain;
  criticizeEls.separate.textContent = question.guide.separate;
  criticizeEls.reveal.textContent = question.guide.reveal;
  criticizeEls.explanation.open = false;
  criticizeEls.why.textContent = question.why;
  renderCriticismCaseFile(question);
  criticizeEls.choices.replaceChildren();
  question.choices.forEach((choice) => criticizeEls.choices.append(createCriticismChoice(question, choice, selected === choice.id)));
  criticizeEls.back.disabled = criticismState.index === 0;
  criticizeEls.back.classList.toggle("hidden", criticismState.index === 0);
  criticizeEls.next.disabled = !selected;
  criticizeEls.next.textContent = criticismState.index === CRITICISM_QUESTIONS.length - 1 ? "See the full diagnostic →" : criticismState.index === 0 ? "Enter the six societies →" : criticismState.index === 6 ? "Reconsider your definition →" : "Next society →";
  renderCriticismLiveMap();
  if (scroll) document.querySelector("#criticizeQuestionCard").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCriticismLiveMap() {
  const answered = CRITICISM_CASES.filter((question) => criticismState.answers[question.id]);
  const profile = criticismBasisProfile(criticismState, true);
  const beyond = answered.filter((question) => criticismChoice(question, criticismState.answers[question.id])?.basis !== "majority").length;
  criticizeEls.casesCount.textContent = `${answered.length} / 6`;
  criticizeEls.beyondCount.textContent = String(beyond);
  criticizeEls.mapBasis.textContent = criticismState.opening
    ? `Opening definition: ${CRITICISM_STANCES[criticismState.opening].name}. The bars below count only answered society cases.`
    : "Choose your opening definition to begin.";
  criticizeEls.liveBases.replaceChildren();
  profile.forEach((basis) => {
    const row = document.createElement("div");
    row.className = "criticize-live-row";
    const heading = document.createElement("div");
    const name = document.createElement("span");
    name.textContent = basis.name;
    const score = document.createElement("strong");
    score.textContent = basis.offered ? `${basis.selected} / ${basis.offered}` : "not offered yet";
    heading.append(name, score);
    const track = document.createElement("i");
    const fill = document.createElement("b");
    fill.style.width = `${basis.rate}%`;
    track.append(fill);
    row.append(heading, track);
    criticizeEls.liveBases.append(row);
  });
  criticizeEls.liveBases.setAttribute(
    "aria-label",
    answered.length ? profile.map((basis) => `${basis.name}: ${basis.selected} selected out of ${basis.offered} answered cases where offered`).join("; ") : "No grounds for criticism selected yet",
  );
}

function renderCriticismLanes(diagnostic) {
  criticizeEls.laneGrid.replaceChildren();
  Object.entries(CRITICISM_LANES).forEach(([laneId, lane]) => {
    const section = document.createElement("section");
    section.className = `criticize-lane criticize-lane-${laneId}`;
    const header = document.createElement("header");
    const index = document.createElement("span");
    index.textContent = lane.index;
    const heading = document.createElement("h3");
    heading.textContent = lane.name;
    const copy = document.createElement("p");
    copy.textContent = lane.copy;
    header.append(index, heading, copy);
    const list = document.createElement("div");
    diagnostic.profile.filter((basis) => basis.lane === laneId).forEach((basis) => {
      const article = document.createElement("article");
      const top = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = `${basis.index} · ${basis.name}`;
      const exact = document.createElement("span");
      exact.textContent = `${basis.selected} / ${basis.offered}`;
      top.append(name, exact);
      const track = document.createElement("i");
      const fill = document.createElement("b");
      fill.style.width = `${basis.rate}%`;
      track.append(fill);
      const description = document.createElement("p");
      description.textContent = basis.short;
      article.append(top, track, description);
      list.append(article);
    });
    section.append(header, list);
    criticizeEls.laneGrid.append(section);
  });
}

function renderCriticismCases() {
  criticizeEls.caseGrid.replaceChildren();
  CRITICISM_CASES.forEach((question, index) => {
    const choice = criticismChoice(question, criticismState.answers[question.id]);
    const basis = CRITICISM_BASES[choice.basis];
    const article = document.createElement("article");
    article.className = `criticize-report-card lane-${basis.lane}`;
    const meta = document.createElement("span");
    meta.textContent = `${String(index + 1).padStart(2, "0")} · ${basis.name}`;
    const heading = document.createElement("h3");
    heading.textContent = question.title;
    const answer = document.createElement("p");
    answer.className = "criticize-report-answer";
    answer.textContent = choice.label;
    const dl = document.createElement("dl");
    const earns = document.createElement("div");
    const earnsTerm = document.createElement("dt");
    earnsTerm.textContent = "Establishes";
    const earnsValue = document.createElement("dd");
    earnsValue.textContent = basis.establishes;
    earns.append(earnsTerm, earnsValue);
    const leaves = document.createElement("div");
    const leavesTerm = document.createElement("dt");
    leavesTerm.textContent = "Leaves open";
    const leavesValue = document.createElement("dd");
    leavesValue.textContent = basis.limit;
    leaves.append(leavesTerm, leavesValue);
    dl.append(earns, leaves);
    article.append(meta, heading, answer, dl);
    criticizeEls.caseGrid.append(article);
  });
}

function renderCriticismAlignment(diagnostic) {
  criticizeEls.alignmentGrid.replaceChildren();
  const summary = document.createElement("article");
  summary.className = "criticize-definition-card";
  const label = document.createElement("span");
  label.textContent = "Your final boundary";
  const heading = document.createElement("h3");
  heading.textContent = diagnostic.final.name;
  const copy = document.createElement("p");
  copy.textContent = diagnostic.final.implication;
  summary.append(label, heading, copy);
  criticizeEls.alignmentGrid.append(summary);
  if (!diagnostic.mismatches.length) {
    const clear = document.createElement("article");
    clear.className = "criticize-alignment-clear";
    const clearLabel = document.createElement("span");
    clearLabel.textContent = "No exact mismatch detected";
    const clearHeading = document.createElement("h3");
    clearHeading.textContent = "Your six grounds fit inside your final definition.";
    const clearCopy = document.createElement("p");
    clearCopy.textContent = "That is compatibility, not proof of truth. The group boundaries, factual evidence, value bridges, and procedure choices can still be challenged.";
    clear.append(clearLabel, clearHeading, clearCopy);
    criticizeEls.alignmentGrid.append(clear);
    return;
  }
  diagnostic.mismatches.forEach((mismatch) => {
    const article = document.createElement("article");
    article.className = "criticize-mismatch-card";
    const marker = document.createElement("span");
    marker.textContent = "Definition mismatch to resolve";
    const heading = document.createElement("h3");
    heading.textContent = mismatch.title;
    const copy = document.createElement("p");
    copy.textContent = mismatch.text;
    article.append(marker, heading, copy);
    criticizeEls.alignmentGrid.append(article);
  });
}

function renderCriticismBoundary() {
  const question = CRITICISM_CASES.find((item) => item.id === "overlap");
  const choice = criticismChoice(question, criticismState.answers.overlap);
  const basis = CRITICISM_BASES[choice.basis];
  criticizeEls.boundaryCopy.textContent = `In “Two homes, one body,” you used ${basis.name.toLowerCase()}. ${choice.detail}`;
  criticizeEls.boundaryQuestion.textContent = choice.basis === "subcommunity"
    ? "Your answer preserves both group-relative judgments but needs a second-order rule for conflicts between them."
    : "Even this answer needs a rule for when it overrides the two actual communities’ competing standards.";
}

function showCriticismResults() {
  const diagnostic = criticismDiagnostic(criticismState);
  criticizeEls.resultTitle.textContent = diagnostic.title;
  criticizeEls.resultSummary.textContent = diagnostic.summary;
  criticizeEls.primaryBasis.textContent = diagnostic.primary.map((basis) => basis.name).join(" + ");
  criticizeEls.primaryCopy.textContent = `${diagnostic.primary.map((basis) => `${basis.selected} / ${basis.offered}`).join(" · ")}. This is the highest opportunity-normalized rate, not your one true theory.`;
  criticizeEls.beyondResult.textContent = `${diagnostic.beyond} / 6`;
  criticizeEls.beyondCopy.textContent = "This is a plain count of answers using any ground other than the current majority’s approval. It does not imply that those answers are objective moral claims.";
  criticizeEls.stanceShift.textContent = diagnostic.changed ? `${diagnostic.opening.name} → ${diagnostic.final.name}` : `Kept: ${diagnostic.final.name}`;
  criticizeEls.stanceCopy.textContent = diagnostic.changed
    ? "The cases changed the broadest kind of criticism you accept. The diagnostic treats that as a reasoned revision to explain, not a contradiction."
    : "You applied the same broad definition before and after the cases. The exact case audit below checks whether your selected grounds fit it.";
  renderCriticismLanes(diagnostic);
  renderCriticismCases();
  renderCriticismAlignment(diagnostic);
  renderCriticismBoundary();
  criticizeEls.aiPrompt.value = buildCriticismAIProbePrompt(criticismState);
  criticizeEls.copyStatus.textContent = "The prompt contains your answers but no account information.";
  criticizeEls.workspace.classList.add("hidden");
  criticizeEls.results.classList.remove("hidden");
  criticizeEls.results.scrollIntoView({ behavior: "smooth", block: "start" });
  criticizeEls.resultTitle.focus({ preventScroll: true });
}

function resetCriticismLab() {
  criticismState.index = 0;
  criticismState.opening = null;
  criticismState.final = null;
  criticismState.answers = {};
  criticizeEls.results.classList.add("hidden");
  criticizeEls.workspace.classList.remove("hidden");
  renderCriticismQuestion();
  criticizeEls.workspace.scrollIntoView({ behavior: "smooth", block: "start" });
  criticizeEls.prompt.focus({ preventScroll: true });
  criticizeEls.liveStatus.textContent = "Own-society criticism lab reset.";
}

async function copyCriticismPrompt() {
  try {
    await navigator.clipboard.writeText(criticizeEls.aiPrompt.value);
    criticizeEls.copyStatus.textContent = "Prompt copied. Nothing was sent by this site.";
  } catch {
    criticizeEls.aiPrompt.focus();
    criticizeEls.aiPrompt.select();
    criticizeEls.copyStatus.textContent = "Clipboard access was blocked. The prompt is selected so you can copy it manually.";
  }
}

criticizeEls.back.addEventListener("click", () => {
  if (criticismState.index === 0) return;
  criticismState.index -= 1;
  renderCriticismQuestion({ scroll: true });
  criticizeEls.prompt.focus({ preventScroll: true });
});

criticizeEls.next.addEventListener("click", () => {
  const question = criticismQuestionAt(criticismState.index);
  if (!criticismSelectedId(question)) return;
  if (criticismState.index === CRITICISM_QUESTIONS.length - 1) {
    showCriticismResults();
    return;
  }
  criticismState.index += 1;
  renderCriticismQuestion({ scroll: true });
  criticizeEls.prompt.focus({ preventScroll: true });
});

document.querySelector("#resetCriticizeButton").addEventListener("click", () => {
  const started = criticismState.opening || criticismState.final || Object.keys(criticismState.answers).length;
  if (!started || window.confirm("Reset both definitions and all six society-case answers?")) resetCriticismLab();
});
document.querySelector("#restartCriticizeButton").addEventListener("click", resetCriticismLab);
document.querySelector("#copyCriticizePromptButton").addEventListener("click", copyCriticismPrompt);

renderCriticismQuestion();
