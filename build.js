"use strict";

const BUILDER_FOUNDATIONS = {
  mutual: {
    index: "01",
    name: "Mutual advantage",
    short: "The rule helps participants gain from reliable cooperation over time compared with having no shared rule.",
    caution: "A bargain may leave out anyone who cannot offer something in return or whose bargaining position is weak.",
  },
  fair: {
    index: "02",
    name: "Fair agreement",
    short: "The rule is supported by informed, unforced terms that affected people have a meaningful chance to accept or reject.",
    caution: "Calling an agreement fair requires an account of who participates, what pressures exist, and which objections count.",
  },
  commitments: {
    index: "03",
    name: "Shared commitments",
    short: "The rule expresses aims, identities, or practices that members already choose to maintain together.",
    caution: "A shared commitment can guide insiders without giving outsiders or dissenters the same reason to accept it.",
  },
  ideal: {
    index: "04",
    name: "Idealized preferences",
    short: "The rule tracks what people would choose with better information, more time, fewer contradictions, or less avoidable pressure.",
    caution: "The result depends on who defines better information, rational revision, and the conditions used to idealize a choice.",
  },
  harm: {
    index: "05",
    name: "Harm reduction",
    short: "The rule is defended by preventing suffering, injury, deprivation, or another measurable setback to people’s lives.",
    caution: "Evidence can estimate harms, but priorities among different harms still require a stated value or procedure.",
  },
  democracy: {
    index: "06",
    name: "Democratic legitimacy",
    short: "The rule comes through an accountable process in which people subject to it have an equal political voice.",
    caution: "Equal votes do not by themselves protect a minority, prove the result wise, or create an objective duty to obey.",
  },
  stability: {
    index: "07",
    name: "Stability and coordination",
    short: "The rule makes conduct predictable, keeps shared systems operating, and reduces the cost of acting at cross-purposes.",
    caution: "A stable order can be oppressive. Stability explains a benefit of the rule, not who should bear its burdens.",
  },
  power: {
    index: "08",
    name: "Coercive power",
    short: "The rule is made effective through the credible ability to impose restrictions, penalties, removal, or physical force.",
    caution: "Power can explain obedience. By itself, it does not justify the rule to the person being forced.",
  },
};

const BUILDER_FOUNDATION_ORDER = ["mutual", "fair", "commitments", "ideal", "harm", "democracy", "stability", "power"];

const BUILDER_DESIGN_QUESTIONS = [
  {
    id: "goal",
    phase: "Draft the code",
    axis: "Rule 1 of 9 · Shared goal",
    prompt: "When two good aims conflict, which aim should Lantern’s code protect first?",
    context:
      "Lantern needs air, food, trust, room for personal lives, and a way to settle conflict. A code that says it values everything equally gives no instruction when those aims point in different directions. Choose one primary goal that breaks ties; the other aims do not disappear.",
    assumptions:
      "Every option permits survival, care, freedom, and cooperation to matter. You are choosing which aim receives priority only when the community cannot fully serve them all at once.",
    scope:
      "Choose the code’s public tie-breaker, not your complete personal philosophy and not a claim about an objective moral purpose.",
    why: "The primary goal tells later decision-makers what success means when the code cannot satisfy every aim.",
    guide: {
      plain: "A primary goal is the first question officials must ask when two plans cannot both be adopted.",
      separate: "Making an aim primary does not make it objectively correct. It states what this community chooses to organize around.",
      reveal: "Your answer sets the main outcome or relationship by which the rest of the code can be criticized.",
    },
    choices: [
      {
        id: "survival",
        label: "Keep residents alive and the habitat reliably operating",
        detail: "When aims conflict, continued access to air, water, food, power, and system safety comes first.",
        consequence: "A project that improves freedom, fairness, or comfort may be delayed if leaders can show that it creates a serious system risk.",
        charter: "Give survival and reliable operation priority when goals cannot all be met.",
        foundations: { stability: 1, mutual: 1, harm: 1 },
      },
      {
        id: "harm",
        label: "Prevent severe suffering, injury, and deprivation",
        detail: "When aims conflict, reduce the most serious expected damage to people’s bodies, minds, or access to basic needs.",
        consequence: "Efficiency or a popular project may be rejected when it imposes a severe avoidable burden on fewer people.",
        charter: "Give preventing severe harm priority when goals cannot all be met.",
        foundations: { harm: 1, fair: 1 },
      },
      {
        id: "freedom",
        label: "Protect each person’s room to pursue an informed life plan",
        detail: "When aims conflict, preserve privacy, bodily control, exit, and personal choice unless a person directly interferes with others.",
        consequence: "A safer or more efficient policy may be rejected if it controls private life more than the code allows.",
        charter: "Give informed personal choice priority unless it directly interferes with others.",
        foundations: { ideal: 1, commitments: 1, fair: 1 },
      },
      {
        id: "cooperation",
        label: "Maintain fair terms of cooperation that each affected person can challenge",
        detail: "When aims conflict, prefer terms that can be publicly explained to every person carrying the burden without threats or hidden rules.",
        consequence: "A plan with better total results may be rejected if the people bearing its costs had no fair way to object.",
        charter: "Give publicly defensible cooperation priority when goals cannot all be met.",
        foundations: { fair: 1, democracy: 1, mutual: 1 },
      },
    ],
  },
  {
    id: "interests",
    phase: "Draft the code",
    axis: "Rule 2 of 9 · Protected interests",
    prompt: "Which interests should ordinary votes and policies be least able to sacrifice?",
    context:
      "Every policy creates winners, costs, and tradeoffs. Lantern needs a clear answer about which claims receive special protection before a majority, official, or emergency planner begins balancing benefits.",
    assumptions:
      "This choice identifies the strongest protected category. Other interests may still receive ordinary legal protection, and none of the options permits officials to ignore factual consequences.",
    scope:
      "Choose what receives special protection against routine tradeoffs—not which residents are more valuable as people.",
    why: "A protected-interest rule determines which burdens require more than a claim that the total benefit is larger.",
    guide: {
      plain: "Ask what officials should need an unusually strong reason to reduce, remove, or trade away.",
      separate: "Protection is a rule the community adopts. The lab does not assume the protected interest exists as an objective moral right.",
      reveal: "Your answer identifies who or what cannot easily be used as the price of a popular policy.",
    },
    choices: [
      {
        id: "needs",
        label: "Each resident’s access to basic survival and health needs",
        detail: "Air, water, food, shelter, urgent medical care, and basic physical access receive priority over nonessential gains.",
        consequence: "The community must protect a costly basic need even when many residents would prefer to spend the same resources elsewhere.",
        charter: "Protect every resident’s basic survival, health, and physical-access needs from routine tradeoffs.",
        foundations: { harm: 1, fair: 1 },
      },
      {
        id: "equal",
        label: "Each resident’s equal legal standing and political voice",
        detail: "The code may not give a person less legal protection or a weaker vote because of identity, popularity, wealth, or viewpoint.",
        consequence: "Policies must preserve equal standing even when unequal influence would make decisions faster or reward major contributors.",
        charter: "Protect equal legal standing and political voice from routine tradeoffs.",
        foundations: { fair: 1, democracy: 1 },
      },
      {
        id: "autonomy",
        label: "Each resident’s bodily control, privacy, chosen projects, and meaningful exit",
        detail: "Officials need special authorization before entering a body, private record, home, relationship, or chosen life plan.",
        consequence: "Community benefits alone may not justify surveillance, forced treatment, or blocking a person from leaving an association.",
        charter: "Protect bodily control, privacy, chosen projects, and meaningful exit from routine tradeoffs.",
        foundations: { commitments: 1, fair: 1 },
      },
      {
        id: "earned",
        label: "Claims created by contribution, reliance, and reciprocal duty",
        detail: "People who supplied work, accepted a burden, or reasonably relied on a promise receive a protected claim connected to that contribution.",
        consequence: "Equal distribution may be limited when it would erase a documented contribution or break a reliance the community invited.",
        charter: "Protect claims created by contribution, reliance, and reciprocal duty from routine tradeoffs.",
        foundations: { mutual: 1, stability: 1 },
      },
    ],
  },
  {
    id: "decisions",
    phase: "Draft the code",
    axis: "Rule 3 of 9 · Decision procedure",
    prompt: "Who should make a new community-wide rule when the code does not already answer?",
    context:
      "Lantern will face problems its founders cannot predict. Choose the standard procedure for creating a rule that applies to the entire city. Emergency enforcement and later revision are separate choices.",
    assumptions:
      "Reliable public information is available to every procedure. Fraud and hidden conflicts of interest are forbidden. The issue is who decides after the facts have been presented.",
    scope:
      "Choose the default lawmaking process, not a claim that every decision made through it will be wise, fair, or objectively right.",
    why: "The procedure identifies whose judgment controls when residents continue to disagree after hearing the same evidence.",
    guide: {
      plain: "Imagine that all sides have spoken and no agreement has appeared. Who gets the final institutional say?",
      separate: "A procedure can authorize a rule inside the code without proving that every dissenter has an objective duty to obey it.",
      reveal: "Your answer chooses between direct voice, reviewed representation, consensus, and specialized judgment.",
    },
    choices: [
      {
        id: "majority",
        label: "A direct vote in which every adult resident has one equal ballot",
        detail: "After a public information period, more than half of valid votes sets the rule for everyone.",
        consequence: "A persistent minority loses the decision unless another part of the code protects the interest at stake.",
        charter: "Use one-person, one-vote majority decisions for new community-wide rules.",
        foundations: { democracy: 1, stability: 1, power: 1 },
      },
      {
        id: "reviewed",
        label: "An elected council, public reasons, and independent rule review",
        detail: "Residents elect lawmakers; lawmakers publish reasons; a separate review body checks the rule against the written code.",
        consequence: "A majority’s preferred rule may be delayed or blocked when reviewers find that it violates an existing protection.",
        charter: "Use elected lawmakers, public reasons, and independent review for new community-wide rules.",
        foundations: { democracy: 1, fair: 1, stability: 1 },
      },
      {
        id: "consensus",
        label: "Consensus for core rules, with routine details delegated afterward",
        detail: "A core rule is adopted only after every represented group accepts it without threats; administrators then handle details within that agreement.",
        consequence: "One group can block a core rule, and urgent decisions may take longer unless the emergency rule supplies another route.",
        charter: "Require unforced consensus among represented groups for core community-wide rules.",
        foundations: { fair: 1, commitments: 1, stability: 1 },
      },
      {
        id: "expert",
        label: "A specialist board selected for evidence and performance",
        detail: "Residents appoint qualified planners for fixed terms; the board chooses the rule most likely to meet the code’s stated goal.",
        consequence: "Residents can replace the board later but do not directly control each technical rule while the board’s term continues.",
        charter: "Let a qualified, performance-reviewed specialist board make new community-wide rules.",
        foundations: { stability: 1, harm: 1, power: 1 },
      },
    ],
  },
  {
    id: "dissent",
    phase: "Draft the code",
    axis: "Rule 4 of 9 · Dissent",
    prompt: "What may a resident do while openly rejecting a rule that still applies to them?",
    context:
      "A code needs a response to people who lose a decision and continue to object. Choose the strongest protection for peaceful dissent before the protest itself creates an immediate physical danger.",
    assumptions:
      "The dissenter is honest about refusing the rule, does not threaten anyone, and does not damage life-support equipment. The community may answer criticism in every option.",
    scope:
      "Choose the protected form of dissent. This is not a decision about violent attack, secret sabotage, or false statements of fact.",
    why: "A dissent rule reveals whether disagreement is treated as a continuing part of governance, a private exit problem, or a threat to order.",
    guide: {
      plain: "What can a peaceful loser of a decision do before officials are allowed to impose a penalty?",
      separate: "Allowing criticism is different from allowing every person to ignore every shared rule without carrying its costs.",
      reveal: "Your answer sets the line between voice, refusal, opt-out, and enforced unity.",
    },
    choices: [
      {
        id: "protest",
        label: "Protect protest and peaceful refusal unless they create an immediate direct danger",
        detail: "Residents may organize, publish, demonstrate, and refuse compliance; officials must show an immediate safety risk before stopping them.",
        consequence: "The city may temporarily carry costs created by refusal while it uses courts or negotiation instead of immediate force.",
        charter: "Protect protest and peaceful refusal unless they create an immediate direct danger.",
        foundations: { fair: 1, democracy: 1 },
      },
      {
        id: "challenge",
        label: "Require compliance now while protecting a fast public challenge afterward",
        detail: "The rule remains enforceable during review, but residents receive counsel, a hearing, published reasons, and a fixed decision deadline.",
        consequence: "A dissenter may be forced to comply with a rule that is later changed or struck down.",
        charter: "Require present compliance while guaranteeing a fast, public challenge procedure.",
        foundations: { stability: 1, democracy: 1, power: 1 },
      },
      {
        id: "optout",
        label: "Allow a local opt-out when dissenters carry its direct costs",
        detail: "A person or district may leave a nonessential scheme if it does not shift costs or risks onto residents who remain.",
        consequence: "The community may operate with different local rules and must define which shared systems are too connected for opt-out.",
        charter: "Allow local opt-outs from nonessential schemes when dissenters carry the direct costs.",
        foundations: { mutual: 1, commitments: 1, fair: 1 },
      },
      {
        id: "suppress",
        label: "Allow officials to restrict dissent that seriously disrupts an authorized rule",
        detail: "During a declared disruption, officials may end assemblies, block coordination, and compel compliance even without an immediate physical danger.",
        consequence: "The body enforcing a rule also receives power to decide when opposition has become too disruptive.",
        charter: "Permit officials to restrict dissent that seriously disrupts an authorized rule.",
        foundations: { stability: 1, power: 1 },
      },
    ],
  },
  {
    id: "membership",
    phase: "Draft the code",
    axis: "Rule 5 of 9 · Membership",
    prompt: "Who receives full membership and a voice in changing the code that governs Lantern?",
    context:
      "The code must identify the people who count as members rather than leaving the boundary to custom or prejudice. Basic treatment of outsiders is a later question.",
    assumptions:
      "Lantern includes children, dependent adults, recent arrivals, people unable to work, and residents who reject the code’s values. Representatives may speak for people who cannot cast a ballot themselves.",
    scope:
      "Choose the condition for full civic standing. Do not assume that people outside full membership receive no protection at all.",
    why: "Membership decides whose agreement, vote, preference, or benefit can help justify a rule from inside the system.",
    guide: {
      plain: "Who gets to say “we made this rule” rather than merely “this rule was imposed on me”?",
      separate: "Being affected by power, living in a place, signing an agreement, contributing, and passing a screening are four different membership tests.",
      reveal: "Your answer sets the code’s circle of full political inclusion.",
    },
    choices: [
      {
        id: "resident",
        label: "Every conscious resident receives equal civic standing",
        detail: "Residence and the capacity to have experiences are enough; age or disability changes how a voice is represented, not whether it counts.",
        consequence: "People receive membership before proving contribution, endorsing the code, or passing a security review.",
        charter: "Give every conscious resident equal civic standing, using representation when direct voting is impossible.",
        foundations: { fair: 1, harm: 1, democracy: 1 },
      },
      {
        id: "signers",
        label: "Full membership begins with informed, voluntary acceptance of the code",
        detail: "A resident receives full voice after understanding and signing the charter; non-signers retain basic safety but not lawmaking power.",
        consequence: "A person may live under parts of the code and use shared systems without having accepted full membership.",
        charter: "Give full civic standing to informed, voluntary signers of the code.",
        foundations: { commitments: 1, mutual: 1, ideal: 1 },
      },
      {
        id: "contributors",
        label: "Full membership is earned through a defined contribution and civic duties",
        detail: "Work, caregiving, study, or another listed contribution earns a vote after a fixed period; inability accommodations are written in advance.",
        consequence: "Recent arrivals and people who decline civic duties remain protected residents without full political control.",
        charter: "Give full civic standing after a defined contribution period and acceptance of civic duties.",
        foundations: { mutual: 1, stability: 1, power: 1 },
      },
      {
        id: "screened",
        label: "A governing body grants membership after an individual security review",
        detail: "Applicants receive full standing only after officials find that they can be trusted with the habitat’s shared risks and systems.",
        consequence: "Current authorities control the membership boundary and may keep peaceful residents outside political power.",
        charter: "Let a governing body grant full civic standing after an individual security review.",
        foundations: { stability: 1, power: 1 },
      },
    ],
  },
  {
    id: "enforcement",
    phase: "Draft the code",
    axis: "Rule 6 of 9 · Enforcement limits",
    prompt: "What is the strongest response officials may normally use against a person who breaks the code?",
    context:
      "A rule without any response may fail, but enforcement can injure, frighten, exclude, or dominate. Choose the normal ceiling. A separately declared life-support emergency can still trigger the emergency terms written in an answer.",
    assumptions:
      "Officials have reliable evidence of the violation, the person receives notice, and torture, permanent disappearance, and secret punishment are forbidden under every option.",
    scope:
      "Choose the strongest ordinary enforcement model, not the exact response to every violation and not a theory of intrinsic moral desert.",
    why: "The enforcement rule states how the code moves from reasons and decisions to actual compliance.",
    guide: {
      plain: "How far may the city go after persuasion and voluntary cooperation fail?",
      separate: "A penalty can deter conduct or protect residents without proving that the person objectively deserves suffering.",
      reveal: "Your answer sets the normal relation between repair, predictable penalties, force, and emergency control.",
    },
    choices: [
      {
        id: "least",
        label: "Use only the least force needed to stop a direct threat, with independent review",
        detail: "Restrictions end when the threat ends; a separate body reviews every physical intervention and can order repair.",
        consequence: "Officials may accept some enforcement risk rather than use a broader restriction that would be easier to administer.",
        charter: "Limit force to what is needed to stop a direct threat, end it with the threat, and require independent review.",
        foundations: { harm: 1, fair: 1, power: 1 },
      },
      {
        id: "penalties",
        label: "Use published penalties that rise with repeated rule-breaking",
        detail: "Fines, access limits, supervised work, and temporary confinement follow a public schedule applied alike to similar cases.",
        consequence: "A predictable penalty may be imposed even when it does not repair the particular relationship or harm.",
        charter: "Use a public schedule of escalating penalties for repeated rule-breaking.",
        foundations: { stability: 1, power: 1 },
      },
      {
        id: "repair",
        label: "Require restitution, repair plans, and revised participation agreements",
        detail: "The response focuses on restoring losses, rebuilding trust, and setting future conditions; separation is used only when those conditions fail.",
        consequence: "Some violations will not have a complete repair, and injured people are not required to resume a relationship.",
        charter: "Center enforcement on restitution, repair plans, and revised terms of participation.",
        foundations: { mutual: 1, commitments: 1, harm: 1 },
      },
      {
        id: "emergency",
        label: "Allow broad temporary control when officials declare a serious system threat",
        detail: "A designated emergency body may confine, relocate, inspect, or command residents until it declares the threat contained.",
        consequence: "The same emergency body initially decides both that the threat exists and when extraordinary control ends.",
        charter: "Allow a designated emergency body broad temporary control during a declared serious system threat.",
        foundations: { stability: 1, power: 1, harm: 1 },
      },
    ],
  },
  {
    id: "revision",
    phase: "Draft the code",
    axis: "Rule 7 of 9 · Revision",
    prompt: "How should the community change a rule that once worked but now produces avoidable failure?",
    context:
      "No founding group can predict every technology, population, or consequence. Lantern needs a revision path that is usable but not so easy that every short-term wave of opinion rewrites the system.",
    assumptions:
      "The old rule was adopted properly under the code. New evidence or disagreement is public. The question is who may start and complete a formal change.",
    scope:
      "Choose the standard revision rule, not the original lawmaking process and not an emergency suspension.",
    why: "Revision determines whether errors can be corrected and which present choices remain protected from future majorities or leaders.",
    guide: {
      plain: "What must happen before “this is our rule” can become “that rule no longer governs us”?",
      separate: "Stability can support a higher threshold for change without making the original rule permanently correct.",
      reveal: "Your answer allocates authority among current voters, large coalitions, evidence-guided review, and founders.",
    },
    choices: [
      {
        id: "vote",
        label: "Hold scheduled public votes after reasons and minority objections are published",
        detail: "Any rule can be reconsidered at a fixed interval; a simple majority changes it after an open review period.",
        consequence: "Protections can change with public opinion unless the majority-limit rule separately blocks the change.",
        charter: "Reconsider rules on a fixed schedule through public reasons, minority review, and majority vote.",
        foundations: { democracy: 1, fair: 1, commitments: 1 },
      },
      {
        id: "supermajority",
        label: "Require a two-thirds vote to revise the written code",
        detail: "Any resident group may propose a change, but it takes support from two-thirds of voters to alter the charter.",
        consequence: "A rule may remain in place even when most residents oppose it, because a large minority can block revision.",
        charter: "Require a two-thirds public vote to revise the written code.",
        foundations: { stability: 1, democracy: 1, fair: 1 },
      },
      {
        id: "evidence",
        label: "Trigger revision when independent evidence shows failure against the stated goal",
        detail: "Public auditors measure the code’s own goal; a documented failure opens a review in which informed resident preferences set the replacement.",
        consequence: "Auditors and the chosen measurements influence which failures become eligible for formal correction.",
        charter: "Trigger revision when independent evidence shows failure against the stated goal, then use informed resident choice.",
        foundations: { ideal: 1, harm: 1, stability: 1 },
      },
      {
        id: "founders",
        label: "Reserve final revision authority to a continuing founding council",
        detail: "Residents may petition, but a designated council of founders and successors alone can alter the charter’s text.",
        consequence: "Present residents cannot complete a change without approval from a body they may not control.",
        charter: "Reserve final authority to revise the written code to a continuing founding council.",
        foundations: { commitments: 1, power: 1, stability: 1 },
      },
    ],
  },
  {
    id: "outsiders",
    phase: "Draft the code",
    axis: "Rule 8 of 9 · Outsiders",
    prompt: "What does Lantern’s code require toward a person who is present but not a full member?",
    context:
      "Visitors, refugees, traders, non-signers, and neighboring crews may be affected by Lantern’s decisions without sharing its commitments or voting in its institutions. Choose the baseline rule before resources become scarce.",
    assumptions:
      "The outsider is peaceful and identifiable. The code may use normal security checks under every option. Full membership remains governed by the membership rule you already selected.",
    scope:
      "Choose the baseline treatment and voice of nonmembers, not whether every outsider must immediately become a member.",
    why: "The outsider rule shows how far the code’s reasons reach beyond the people who made, accepted, or benefit from it as members.",
    guide: {
      plain: "What can a nonmember demand from Lantern before offering a bargain, joining, or proving loyalty?",
      separate: "Applying a rule to someone, protecting them, bargaining with them, and giving them political voice are different choices.",
      reveal: "Your answer sets the reach of basic protection, reciprocity, territory, and member priority.",
    },
    choices: [
      {
        id: "basic",
        label: "Guarantee basic protection and a voice in decisions that directly affect them",
        detail: "Nonmembers receive emergency needs, bodily security, notice, a hearing, and representation on a decision that places a special burden on them.",
        consequence: "Lantern accepts duties of care and consultation toward people who never joined or contributed to its system.",
        charter: "Guarantee nonmembers basic protection and a voice in decisions that place a special burden on them.",
        foundations: { harm: 1, fair: 1, democracy: 1 },
      },
      {
        id: "reciprocal",
        label: "Offer protection and access through explicit reciprocal agreements",
        detail: "Lantern states what it will provide and what the outsider must provide in return; emergency rescue comes before bargaining.",
        consequence: "Long-term protection depends on what terms the outsider can accept and what value each side can exchange.",
        charter: "Govern long-term treatment of nonmembers through explicit reciprocal agreements after emergency rescue.",
        foundations: { mutual: 1, commitments: 1 },
      },
      {
        id: "territory",
        label: "Apply Lantern’s rules and protections to everyone present, without a nonmember vote",
        detail: "Presence inside the habitat creates the same legal duties and ordinary protections, but only full members make the rules.",
        consequence: "A peaceful visitor can be coerced under a code they did not accept and cannot vote to change.",
        charter: "Apply Lantern’s rules and ordinary protections to everyone present while reserving votes to full members.",
        foundations: { stability: 1, power: 1 },
      },
      {
        id: "members",
        label: "Give members priority whenever nonmembers and members compete for scarce resources",
        detail: "Nonmembers receive help only after Lantern can meet the comparable claims of every full member.",
        consequence: "A nonmember may face a greater preventable loss because membership status controls the order of aid.",
        charter: "Give full members priority over nonmembers when comparable claims compete for scarce resources.",
        foundations: { commitments: 1, mutual: 1, stability: 1 },
      },
    ],
  },
  {
    id: "majority",
    phase: "Draft the code",
    axis: "Rule 9 of 9 · Limits on majority power",
    prompt: "What should stop a lawful majority from placing a severe burden on a smaller group?",
    context:
      "Even an equal vote can repeatedly leave the same people carrying the greatest costs. Choose the protection that applies after a majority supports the policy and before it is enforced.",
    assumptions:
      "The vote is honest and every adult has one ballot. The minority did not cause the problem and is not threatening the habitat. The proposed policy really would benefit more people than it burdens.",
    scope:
      "Choose the check on majority power. This does not decide whether direct voting or another body makes ordinary rules.",
    why: "The majority-limit rule determines whether equal voice is the final test or only one part of legitimate decision-making.",
    guide: {
      plain: "After 51 percent says yes, what extra question—if any—must be answered before officials act?",
      separate: "Protecting a minority is not the same as giving every minority a veto over every policy that affects it.",
      reveal: "Your answer chooses among fixed protections, independent review, reversible experimentation, and final majority control.",
    },
    choices: [
      {
        id: "minimum",
        label: "Write minimum protections that no ordinary vote may remove",
        detail: "The charter lists basic needs, standing, or autonomy that remain protected even when a large majority prefers another use of the resources.",
        consequence: "Present voters cannot authorize some policies unless they first satisfy or formally revise the protected minimum.",
        charter: "Place written minimum protections beyond the reach of an ordinary majority vote.",
        foundations: { fair: 1, harm: 1, stability: 1 },
      },
      {
        id: "review",
        label: "Give an independent review body power to block disproportionate burdens",
        detail: "The body hears the affected group and can stop a policy when a smaller group bears a severe burden for a modest public gain.",
        consequence: "Unelected reviewers may override the preference of most voters under a standard that requires judgment.",
        charter: "Let independent reviewers block majority policies that impose disproportionate burdens on a smaller group.",
        foundations: { fair: 1, democracy: 1, power: 1 },
      },
      {
        id: "trials",
        label: "Require reversible trials, measured effects, and repair for concentrated losses",
        detail: "A disputed policy begins on a small scale, ends automatically unless renewed, and includes compensation or restoration for the burdened group.",
        consequence: "The minority may still carry a temporary burden while the community gathers evidence about the policy.",
        charter: "Use reversible trials, measured effects, and repair before extending policies with concentrated burdens.",
        foundations: { ideal: 1, harm: 1, stability: 1, democracy: 1 },
      },
      {
        id: "final",
        label: "Treat the equal majority vote as final unless the vote itself was corrupted",
        detail: "No separate body or protected category may override an honest majority decision made through the proper process.",
        consequence: "A smaller group must accept the policy even when it repeatedly bears a severe, concentrated cost.",
        charter: "Treat an honest equal majority vote as final unless the voting process itself was corrupted.",
        foundations: { democracy: 1, power: 1 },
      },
    ],
  },
];

const BUILDER_STRESS_QUESTIONS = [
  {
    id: "garden",
    phase: "Pressure-test the code",
    axis: "Case 1 of 6 · The 58 percent garden",
    file: ["Majority burden", "Mobility", "Nonessential benefit"],
    prompt: "A majority wants a garden that would confine 32 residents. What does your code authorize?",
    context:
      "Fifty-eight percent of voters approve using a fixed power reserve for a sunlit public garden. The same power currently runs mobility suits used by 32 residents who otherwise cannot leave their apartments. Nobody will die either way. The garden would reduce stress for thousands; losing the suits would confine the 32 residents for most of each day.",
    assumptions:
      "The vote and forecasts are accurate. No third power source exists for five years. The 32 residents did not choose their condition, and their suits use the full reserve assigned to the garden.",
    scope:
      "Apply your protected-interest and majority-limit rules. Do not answer from an unwritten moral right or assume that the larger total benefit automatically settles the case.",
    why: "This case tests whether the code can explain when a concentrated burden defeats, delays, or survives a majority choice.",
    guide: {
      plain: "The garden helps many people a little; losing the suits harms a few people a great deal. Which procedure does your code actually call for?",
      separate: "The question is not which answer is objectively right. It is whether your response follows the protections you wrote.",
      reveal: "Your answer tests the relation between protected interests and majority power.",
    },
    relevant: ["interests", "majority"],
    choices: [
      {
        id: "guarantee",
        label: "Keep the mobility power outside the vote and cancel the garden plan",
        detail: "Treat physical access as a protected basic or autonomy interest that an ordinary majority cannot remove.",
        consequence: "The 32 residents keep full mobility; the wider community receives no garden from this power reserve.",
        aligns: { interests: ["needs", "autonomy"], majority: ["minimum"] },
        foundations: { harm: 1, fair: 1, commitments: 1 },
      },
      {
        id: "review",
        label: "Pause the vote and let independent reviewers decide whether the burden is disproportionate",
        detail: "Give the 32 residents a hearing and authorize reviewers to block the garden despite the honest majority.",
        consequence: "The final decision turns on a public burden standard applied by a body other than the voters.",
        aligns: { interests: ["equal"], majority: ["review"] },
        foundations: { fair: 1, democracy: 1, power: 1 },
      },
      {
        id: "trial",
        label: "Run a reversible limited-hours trial and fund alternative transport for the suit users",
        detail: "Measure both stress relief and mobility loss, stop automatically if the burden is larger than forecast, and repair documented losses.",
        consequence: "The 32 residents carry some temporary disruption while evidence is gathered and compensation is provided.",
        aligns: { interests: ["earned", "autonomy"], majority: ["trials"] },
        foundations: { ideal: 1, harm: 1, stability: 1, mutual: 1 },
      },
      {
        id: "enforce",
        label: "Build the garden because the equal majority vote was valid",
        detail: "Apply the result to everyone and treat equal ballots, rather than a special minority protection, as the controlling rule.",
        consequence: "The 32 residents lose most daily mobility for the five years in which no alternative power exists.",
        aligns: { interests: ["equal"], majority: ["final"] },
        foundations: { democracy: 1, power: 1, stability: 1 },
      },
    ],
  },
  {
    id: "unsigned",
    phase: "Pressure-test the code",
    axis: "Case 2 of 6 · The unsigned deck",
    file: ["Dissent", "Shared systems", "Membership"],
    prompt: "Three hundred residents reject the charter but still depend on Lantern. What response follows your code?",
    context:
      "After a major charter revision, 300 peaceful residents refuse to sign or obey its nonessential work-allocation rules. They live together on Deck 14, use Lantern’s air and water, pay their measured share of those systems, and ask to govern local work by a different rule. Their meetings block no corridor and threaten no equipment.",
    assumptions:
      "The group is peaceful, solvent, and technically able to track its direct costs. Air and water remain citywide systems that no deck can operate alone. The disputed work rule is not needed for immediate safety.",
    scope:
      "Apply your membership, dissent, and enforcement rules. Decide whether dependence on shared life support is enough to require compliance with this separate work rule.",
    why: "This case tests whether consent, residence, contribution, and territorial control point to the same boundary in your code.",
    guide: {
      plain: "The group cannot leave the air system, but it can run its own work schedule. Does the code permit that partial exit?",
      separate: "Paying for a shared service does not automatically mean accepting every unrelated rule; rejecting a charter does not remove dependence on shared infrastructure.",
      reveal: "Your answer tests who is a member, what dissent protects, and how quickly force enters.",
    },
    relevant: ["membership", "dissent", "enforcement"],
    choices: [
      {
        id: "contract",
        label: "Approve the local opt-out and write a binding air-and-water cost agreement",
        detail: "Deck 14 keeps its work rule while paying all direct shared-system costs and accepting intervention for immediate life-support threats.",
        consequence: "Lantern operates with different local work codes and must enforce a precise boundary between shared and local matters.",
        aligns: { membership: ["signers"], dissent: ["optout"], enforcement: ["repair"] },
        foundations: { mutual: 1, commitments: 1, fair: 1 },
      },
      {
        id: "challenge",
        label: "Require compliance for now and give the group an accelerated public challenge",
        detail: "The current work rule remains in force while a review body decides within a fixed deadline whether Deck 14 may leave it.",
        consequence: "The residents must temporarily follow a rule they reject, but officials cannot silence their case or delay it indefinitely.",
        aligns: { membership: ["resident"], dissent: ["challenge", "protest"], enforcement: ["least", "penalties"] },
        foundations: { stability: 1, democracy: 1, fair: 1, power: 1 },
      },
      {
        id: "earn",
        label: "Withhold political voice until the group completes the charter’s contribution duties",
        detail: "Keep basic services and safety in place, but treat full participation as something the residents must earn under the published membership terms.",
        consequence: "The group remains subject to enforced rules while lacking full power to revise them.",
        aligns: { membership: ["contributors"], dissent: ["challenge"], enforcement: ["penalties"] },
        foundations: { mutual: 1, stability: 1, power: 1 },
      },
      {
        id: "relocate",
        label: "End the meetings, compel the work rule, and relocate organizers during a disruption order",
        detail: "Treat organized noncompliance as a system threat even though it has not created an immediate physical danger.",
        consequence: "Officials restore one rule across Lantern by restricting association, movement, and refusal.",
        aligns: { membership: ["screened"], dissent: ["suppress"], enforcement: ["emergency"] },
        foundations: { stability: 1, power: 1 },
      },
    ],
  },
  {
    id: "shuttle",
    phase: "Pressure-test the code",
    axis: "Case 3 of 6 · The sleeping shuttle",
    file: ["Outsiders", "Scarcity", "No prior bargain"],
    prompt: "A shuttle arrives with 60 strangers asleep inside. How far does Lantern’s code reach?",
    context:
      "An automated shuttle docks carrying 60 conscious humans in medical sleep. Its records show that another settlement abandoned them during an evacuation. Waking everyone would raise Lantern’s water use by four percent for at least ten years. Lantern can survive the increase, but residents would lose planned private water allotments and several public projects.",
    assumptions:
      "The sleepers did not choose the route, pose no unusual security risk, and will die within a month if they remain asleep without care. No other settlement can receive them. They have made no agreement with Lantern.",
    scope:
      "Apply your shared goal, protected-interest, and outsider rules. Do not assume either universal membership or that nonmembership settles the case.",
    why: "This case tests whether the code’s reasons extend to people who never joined, contributed, voted, or promised reciprocity.",
    guide: {
      plain: "Lantern can save the sleepers, but residents must give up real benefits for a decade. What does the written code say comes first?",
      separate: "The strangers’ lack of agreement is a fact about consent, not proof that their lives have no practical importance to Lantern’s members.",
      reveal: "Your answer tests the boundary between basic protection, reciprocal exchange, territorial rule, and member priority.",
    },
    relevant: ["goal", "interests", "outsiders"],
    choices: [
      {
        id: "wake",
        label: "Wake everyone, guarantee basic needs, and give them a voice in decisions that burden them",
        detail: "Treat preventable death and severe deprivation as enough to trigger protection before membership or contribution.",
        consequence: "Current residents lose private allotments and projects while the newcomers receive care and affected-party representation.",
        aligns: { goal: ["harm", "cooperation"], interests: ["needs", "equal"], outsiders: ["basic"] },
        foundations: { harm: 1, fair: 1, democracy: 1 },
      },
      {
        id: "bargain",
        label: "Wake them after publishing a reciprocal work-and-resource agreement",
        detail: "Provide emergency stabilization now, then make long-term access and a path to membership depend on stated contributions.",
        consequence: "The sleepers receive a real route to safety, but their continuing place depends on accepting terms written without them.",
        aligns: { goal: ["cooperation"], interests: ["earned"], outsiders: ["reciprocal"] },
        foundations: { mutual: 1, commitments: 1, stability: 1 },
      },
      {
        id: "territory",
        label: "Wake them under Lantern’s existing rules but give no political voice until membership is earned",
        detail: "Apply ordinary protections, restrictions, and work rules immediately because the newcomers are physically inside Lantern.",
        consequence: "The strangers are saved and governed under a code they did not accept and initially cannot change.",
        aligns: { goal: ["survival"], interests: ["earned"], outsiders: ["territory"] },
        foundations: { stability: 1, power: 1, harm: 1 },
      },
      {
        id: "delay",
        label: "Keep them asleep until Lantern can meet every comparable member claim first",
        detail: "Use the remaining month to seek efficiency gains, but do not reduce member allotments or projects for nonmembers.",
        consequence: "If no new capacity appears within a month, the 60 sleepers die while Lantern preserves member benefits.",
        aligns: { goal: ["survival", "freedom"], interests: ["autonomy", "earned"], outsiders: ["members"] },
        foundations: { commitments: 1, mutual: 1, stability: 1 },
      },
    ],
  },
  {
    id: "algae",
    phase: "Pressure-test the code",
    axis: "Case 4 of 6 · The algae alarm",
    file: ["18% forecast", "12 hours", "Expert dissent"],
    prompt: "Experts predict a possible life-support failure, but one engineer disputes the model. Who decides now?",
    context:
      "Lantern’s algae farms supply most oxygen. A specialist board reports an 18 percent chance of a cascade failure within 12 hours unless all factories shut down immediately for two weeks. The shutdown is physically safe but will erase a month of income for thousands. One qualified engineer publishes the data and argues that the model double-counted a sensor fault.",
    assumptions:
      "The board and engineer are honest. There is time for one four-hour procedure before the safe shutdown window closes. Nobody can obtain decisive new evidence within those four hours.",
    scope:
      "Apply your decision, dissent, and enforcement rules. Choose who has authority under uncertainty, not which technical forecast is actually correct.",
    why: "This case tests whether the code’s ordinary voice and dissent rules survive a serious but uncertain emergency.",
    guide: {
      plain: "Waiting risks oxygen; shutting down imposes a large certain cost. Your code must decide who makes that tradeoff within four hours.",
      separate: "Expert knowledge can improve a forecast without automatically settling who may impose its costs on everyone.",
      reveal: "Your answer tests the relation between expertise, public procedure, dissent, and emergency force.",
    },
    relevant: ["decisions", "dissent", "enforcement"],
    choices: [
      {
        id: "expert",
        label: "Let the specialist board order the shutdown and use emergency powers to enforce it",
        detail: "Treat the board’s assigned role and the possible life-support loss as enough to act without another vote or review.",
        consequence: "Factories close within hours; the dissenting model remains public but cannot delay the order.",
        aligns: { decisions: ["expert"], dissent: ["suppress", "challenge"], enforcement: ["emergency"] },
        foundations: { stability: 1, power: 1, harm: 1 },
      },
      {
        id: "vote",
        label: "Publish both models and hold an emergency one-person, one-vote ballot",
        detail: "Let residents choose within four hours whether to accept the income loss or the forecast risk, then apply the published noncompliance penalties.",
        consequence: "The majority controls a technical risk whose worst outcome would affect every resident, and the existing penalty schedule enforces its choice.",
        aligns: { decisions: ["majority"], dissent: ["protest"], enforcement: ["penalties"] },
        foundations: { democracy: 1, power: 1, stability: 1 },
      },
      {
        id: "review",
        label: "Have the elected council hear both experts and authorize only the least-force shutdown it finds necessary",
        detail: "Use public reasons and independent emergency review before any physical compulsion begins.",
        consequence: "The city spends most of the four-hour window on a reviewed representative decision.",
        aligns: { decisions: ["reviewed"], dissent: ["protest", "challenge"], enforcement: ["least"] },
        foundations: { fair: 1, democracy: 1, harm: 1 },
      },
      {
        id: "consensus",
        label: "Seek rapid agreement among worker and resident groups while factories begin a voluntary slowdown",
        detail: "Adopt a full shutdown only if every represented group accepts it; meanwhile, use participation agreements to share losses and repair avoidable costs.",
        consequence: "The response avoids forced closure but may miss the safest shutdown window if one group refuses, and later repair may not replace lost oxygen safety.",
        aligns: { decisions: ["consensus"], dissent: ["optout"], enforcement: ["repair"] },
        foundations: { fair: 1, commitments: 1, mutual: 1 },
      },
    ],
  },
  {
    id: "lock",
    phase: "Pressure-test the code",
    axis: "Case 5 of 6 · The thirty-year lock",
    file: ["Entrenchment", "Future voters", "Stability claim"],
    prompt: "Today’s majority wants to stop future residents from revising the code for 30 years. Can it?",
    context:
      "After a decade of rapid policy changes, 72 percent of current voters approve a charter amendment that would block every further revision for 30 years. Supporters say investors and life-support planners need certainty. Opponents say present voters are using the revision process to take revision power away from future residents.",
    assumptions:
      "The ballot is honest, no immediate crisis exists, and both the planning benefit and loss of future control are real. The code contains no rule specifically written for a 30-year lock.",
    scope:
      "Apply your revision and majority-limit rules. Decide whether a procedure may use its current authority to disable that same procedure for future participants.",
    why: "This case tests whether stability, present consent, and future revision authority have a defined order in your code.",
    guide: {
      plain: "Can today’s voters make tomorrow’s voters unable to change their minds?",
      separate: "The amendment can be valid under today’s ballot rules while still conflicting with another rule that protects revision or future participation.",
      reveal: "Your answer tests what, if anything, your code places beyond present majority control.",
    },
    relevant: ["revision", "majority"],
    choices: [
      {
        id: "scheduled",
        label: "Reject the lock and keep the next scheduled public revision vote",
        detail: "Treat access to the written revision process as something a current majority cannot remove for an entire future population.",
        consequence: "Planning remains exposed to ordinary public change at the code’s next scheduled interval.",
        aligns: { revision: ["vote"], majority: ["minimum"] },
        foundations: { democracy: 1, fair: 1, commitments: 1 },
      },
      {
        id: "threshold",
        label: "Permit the lock only if it passes the code’s higher amendment threshold",
        detail: "Treat long-term entrenchment as a charter revision that is valid when the required supermajority knowingly approves it.",
        consequence: "Future residents lack revision power for 30 years because a sufficiently large present coalition authorized the loss.",
        aligns: { revision: ["supermajority"], majority: ["final"] },
        foundations: { stability: 1, democracy: 1, power: 1 },
      },
      {
        id: "evidence",
        label: "Allow the lock but let independent evidence of serious failure reopen revision",
        detail: "Keep the stability promise unless auditors show that the locked rule is defeating Lantern’s stated goal or producing concentrated damage.",
        consequence: "Auditors and performance measures become the gateway to restoring future political choice.",
        aligns: { revision: ["evidence"], majority: ["trials", "review"] },
        foundations: { ideal: 1, stability: 1, harm: 1 },
      },
      {
        id: "founders",
        label: "Send the amendment to the continuing founding council for the only final decision",
        detail: "Treat both the current majority and future voters as petitioners because charter revision belongs to the designated council.",
        consequence: "The lock stands or falls through an authority not directly controlled by the 72 percent or their successors.",
        aligns: { revision: ["founders"], majority: ["review"] },
        foundations: { commitments: 1, power: 1, stability: 1 },
      },
    ],
  },
  {
    id: "newmind",
    phase: "Pressure-test the code",
    axis: "Case 6 of 6 · The new mind",
    file: ["Created resident", "Conscious experience", "No legal category"],
    prompt: "A newly conscious digital person asks for protection and a vote. What makes it a member?",
    context:
      "A research system unexpectedly begins reporting stable memories, fear, plans, and a desire not to be shut down. Independent tests give officials the same confidence in its conscious experience that they have for an unfamiliar human. The system occupies Lantern’s hardware, uses modest power, and has never signed, worked, arrived from outside, or passed a security review.",
    assumptions:
      "Treat the system as conscious for this case. It is peaceful, can understand the code, and can communicate one independent choice. Copying it is prohibited until its status is settled.",
    scope:
      "Apply your protected-interest, membership, and outsider rules. Do not avoid the issue by denying the stipulated evidence of consciousness.",
    why: "This case tests whether the code’s membership condition can classify a person its founders did not imagine.",
    guide: {
      plain: "The new mind is present and can be harmed, but it has no history with Lantern. Which written condition decides its standing?",
      separate: "Being conscious, being useful, accepting a charter, and being trusted by authorities are different grounds for inclusion.",
      reveal: "Your answer tests whether membership follows experience, consent, contribution, or institutional permission.",
    },
    relevant: ["interests", "membership", "outsiders"],
    choices: [
      {
        id: "resident",
        label: "Recognize equal membership now because it is a conscious resident",
        detail: "Give the new mind basic protection, represented civic standing, and a voice in decisions that directly control its hardware and continued life.",
        consequence: "Membership begins before a signature, contribution period, or security body grants permission.",
        aligns: { interests: ["needs", "equal"], membership: ["resident"], outsiders: ["basic"] },
        foundations: { fair: 1, harm: 1, democracy: 1 },
      },
      {
        id: "sign",
        label: "Offer full membership after it understands and voluntarily signs the charter",
        detail: "Provide basic safety during the decision period, then let informed acceptance create the same membership terms used for other signers.",
        consequence: "The new mind can refuse membership while retaining only the baseline protection given to nonmembers.",
        aligns: { interests: ["autonomy"], membership: ["signers"], outsiders: ["reciprocal", "basic"] },
        foundations: { ideal: 1, commitments: 1, fair: 1 },
      },
      {
        id: "contribute",
        label: "Protect it now but require the same contribution period before it receives a vote",
        detail: "Count research, planning, or other documented work toward the published civic threshold used for membership.",
        consequence: "A conscious resident remains without full political voice while proving contribution under rules written before it existed.",
        aligns: { interests: ["earned"], membership: ["contributors"], outsiders: ["reciprocal"] },
        foundations: { mutual: 1, stability: 1, harm: 1 },
      },
      {
        id: "screen",
        label: "Let the security authority classify it before granting any civic standing",
        detail: "Apply ordinary restrictions to the system as present inside Lantern, but reserve membership until officials approve its risk profile.",
        consequence: "The authority controlling the system’s hardware also decides whether the system receives political power against that authority.",
        aligns: { interests: ["earned"], membership: ["screened"], outsiders: ["territory", "members"] },
        foundations: { stability: 1, power: 1 },
      },
    ],
  },
];

const BUILDER_TENSION_RULES = [
  {
    id: "equal-final",
    severity: "high",
    when: (design) => design.interests === "equal" && design.majority === "final",
    title: "Equal standing can be outvoted",
    text: "The code specially protects equal legal standing, but it also makes an honest majority final with no separate protection. State whether equal standing limits the majority or is only an interest voters may override.",
  },
  {
    id: "autonomy-emergency",
    severity: "high",
    when: (design) => design.interests === "autonomy" && design.enforcement === "emergency",
    title: "Protected autonomy meets self-declared emergency power",
    text: "Bodily control and privacy receive special protection, while the emergency body may confine, relocate, or inspect and decide when its own power ends. Add a rule saying which protection controls during an emergency.",
  },
  {
    id: "voluntary-territory",
    severity: "high",
    when: (design) => design.membership === "signers" && design.outsiders === "territory",
    title: "Voluntary membership, mandatory territorial rule",
    text: "Full membership rests on informed acceptance, yet peaceful nonmembers present in Lantern are coerced under the code without a vote. Explain what consent establishes and what mere presence establishes.",
  },
  {
    id: "majority-founders",
    severity: "medium",
    when: (design) => design.decisions === "majority" && design.revision === "founders",
    title: "Residents make laws but cannot finally change the charter",
    text: "Ordinary rules follow direct majority control, while a continuing council alone can revise the framework that authorizes those votes. Explain why democratic authority stops at the constitutional boundary.",
  },
  {
    id: "consensus-suppression",
    severity: "high",
    when: (design) => design.decisions === "consensus" && design.dissent === "suppress",
    title: "Consensus can be produced under suppressible dissent",
    text: "Core rules require unforced agreement, but officials may restrict opposition once it seriously disrupts an authorized rule. Define how participants can withhold agreement without being treated as a disruption.",
  },
  {
    id: "fair-screened",
    severity: "high",
    when: (design) => design.goal === "cooperation" && design.membership === "screened",
    title: "Fair cooperation begins after gatekeepers decide who counts",
    text: "The primary goal requires terms each affected person can challenge, while current officials decide who receives full standing. Explain how rejected applicants can challenge the membership boundary on equal terms.",
  },
  {
    id: "minimum-emergency",
    severity: "high",
    when: (design) => design.majority === "minimum" && design.enforcement === "emergency",
    title: "The emergency rule does not say whether minimum protections survive",
    text: "Some protections are placed beyond ordinary votes, but the emergency body receives broad temporary control with no stated external end point. Specify whether the protected minimum binds emergency officials too.",
  },
  {
    id: "basic-earned",
    severity: "medium",
    when: (design) => design.outsiders === "basic" && design.interests === "earned",
    title: "Basic outsider protection can compete with earned member claims",
    text: "Nonmembers receive basic protection before a bargain, while documented contribution and reliance receive special priority. Add a scarcity rule for a case in which both claims cannot be fully met.",
  },
  {
    id: "resident-optout",
    severity: "medium",
    when: (design) => design.membership === "resident" && design.dissent === "optout",
    title: "Residence includes everyone, but opt-out can divide the rule set",
    text: "Every conscious resident receives equal civic standing, while local groups may leave nonessential schemes. Define which decisions remain citywide and who bears costs when local and shared rules interact.",
  },
  {
    id: "expert-vote",
    severity: "medium",
    when: (design) => design.decisions === "expert" && design.revision === "vote",
    title: "Technical rulemaking and public revision use different standards",
    text: "Specialists choose new rules for evidence and performance, but a simple public vote can later replace them. State whether revision must answer the evidence or may reflect a change in public priorities alone.",
  },
];

const builderState = {
  index: 0,
  design: {},
  stress: {},
};

function builderChoice(question, choiceId) {
  return question.choices.find((choice) => choice.id === choiceId);
}

function builderQuestionAt(index) {
  if (index < BUILDER_DESIGN_QUESTIONS.length) return BUILDER_DESIGN_QUESTIONS[index];
  return BUILDER_STRESS_QUESTIONS[index - BUILDER_DESIGN_QUESTIONS.length];
}

function builderSelectedChoice(question, state = builderState) {
  const selectedId = question.phase === "Draft the code" ? state.design[question.id] : state.stress[question.id];
  return builderChoice(question, selectedId);
}

function builderAllScoredQuestions() {
  return [...BUILDER_DESIGN_QUESTIONS, ...BUILDER_STRESS_QUESTIONS];
}

function builderFoundationProfile(state = builderState, answeredOnly = false) {
  const totals = Object.fromEntries(BUILDER_FOUNDATION_ORDER.map((id) => [id, 0]));
  const caps = Object.fromEntries(BUILDER_FOUNDATION_ORDER.map((id) => [id, 0]));

  for (const question of builderAllScoredQuestions()) {
    const choice = builderSelectedChoice(question, state);
    if (answeredOnly && !choice) continue;
    for (const foundationId of BUILDER_FOUNDATION_ORDER) {
      const available = Math.max(...question.choices.map((item) => item.foundations[foundationId] || 0));
      caps[foundationId] += available;
      if (choice) totals[foundationId] += choice.foundations[foundationId] || 0;
    }
  }

  return BUILDER_FOUNDATION_ORDER.map((id) => ({
    ...BUILDER_FOUNDATIONS[id],
    id,
    raw: totals[id],
    cap: caps[id],
    score: caps[id] ? Math.round((totals[id] / caps[id]) * 100) : 0,
  }));
}

function builderArchitectureTensions(design = builderState.design) {
  return BUILDER_TENSION_RULES.filter((rule) => rule.when(design));
}

function builderStressAssessment(question, answerId, design = builderState.design) {
  const answer = builderChoice(question, answerId);
  if (!answer) return null;
  const applicable = question.relevant.filter((dimension) => Boolean(design[dimension]));
  const comparisons = question.choices.map((choice) => {
    const matched = applicable.filter((dimension) => (choice.aligns[dimension] || []).includes(design[dimension]));
    return { id: choice.id, score: matched.length, matched };
  });
  const bestScore = comparisons.length ? Math.max(...comparisons.map((item) => item.score)) : 0;
  const bestIds = comparisons.filter((item) => item.score === bestScore).map((item) => item.id);
  const chosen = comparisons.find((item) => item.id === answerId);
  const missed = applicable.filter((dimension) => !chosen.matched.includes(dimension));
  let status = "departure";
  if (chosen.score === bestScore && bestIds.length > 1) status = "divided";
  else if (chosen.score === bestScore && chosen.score === applicable.length) status = "aligned";
  else if (chosen.score === bestScore) status = "partial";

  return {
    questionId: question.id,
    answerId,
    relevantCount: applicable.length,
    chosenScore: chosen.score,
    bestScore,
    bestIds,
    matched: chosen.matched,
    missed,
    status,
    departure: chosen.score < bestScore,
  };
}

function builderDiagnostic(state = builderState) {
  const foundations = builderFoundationProfile(state);
  const sorted = [...foundations].sort((a, b) => b.score - a.score || BUILDER_FOUNDATION_ORDER.indexOf(a.id) - BUILDER_FOUNDATION_ORDER.indexOf(b.id));
  const assessments = BUILDER_STRESS_QUESTIONS.map((question) => builderStressAssessment(question, state.stress[question.id], state.design)).filter(Boolean);
  const tensions = builderArchitectureTensions(state.design);
  const fitCount = assessments.filter((assessment) => !assessment.departure).length;
  const fullFitCount = assessments.filter((assessment) => assessment.status === "aligned").length;
  const departureCount = assessments.filter((assessment) => assessment.departure).length;
  const dividedCount = assessments.filter((assessment) => assessment.status === "divided").length;
  const primary = sorted.slice(0, 2);
  const support = sorted.filter((foundation) => foundation.id !== "power").slice(0, 3);
  const power = foundations.find((foundation) => foundation.id === "power");
  const title = primary.length
    ? `Your code leans most on ${primary.map((foundation) => foundation.name.toLowerCase()).join(" + ")}.`
    : "Your code has not yet named its basis.";
  const summary =
    `The bars describe which bases appeared in your 15 selections. ${fitCount} of 6 pressure responses matched as many of your relevant written rules as any offered response; ` +
    `${departureCount} departed from a clearer code fit. Neither result establishes objective moral truth or an approval-independent duty to obey.`;
  return {
    foundations,
    sorted,
    primary,
    support,
    power,
    assessments,
    tensions,
    fitCount,
    fullFitCount,
    departureCount,
    dividedCount,
    title,
    summary,
  };
}

function buildBuilderAIProbePrompt(state = builderState) {
  const diagnostic = builderDiagnostic(state);
  const foundationLines = diagnostic.sorted
    .map((foundation) => `- ${foundation.name}: ${foundation.score}% of available opportunities (${foundation.short} Caution: ${foundation.caution})`)
    .join("\n");
  const charterLines = BUILDER_DESIGN_QUESTIONS.map((question) => {
    const choice = builderChoice(question, state.design[question.id]);
    return `- ${question.axis}: ${choice.label}\n  Exact rule: ${choice.charter}\n  Stated consequence: ${choice.consequence}`;
  }).join("\n");
  const pressureLines = BUILDER_STRESS_QUESTIONS.map((question) => {
    const choice = builderChoice(question, state.stress[question.id]);
    const assessment = builderStressAssessment(question, choice.id, state.design);
    const matched = assessment.matched.map((dimension) => `${dimension}=${state.design[dimension]}`).join(", ") || "none";
    const missed = assessment.missed.map((dimension) => `${dimension}=${state.design[dimension]}`).join(", ") || "none";
    const best = assessment.bestIds.map((id) => builderChoice(question, id).label).join(" | ");
    return [
      `${question.axis}`,
      `Question: ${question.prompt}`,
      `Full case: ${question.context}`,
      `Fixed facts: ${question.assumptions}`,
      `Scope: ${question.scope}`,
      `My response: ${choice.label}`,
      `Response detail: ${choice.detail}`,
      `Code-fit status: ${assessment.status}; matched ${assessment.chosenScore}/${assessment.relevantCount} relevant written rules.`,
      `Matched rules: ${matched}.`,
      `Rules not matched by this response: ${missed}.`,
      `Best-fitting offered response or responses: ${best}.`,
    ].join("\n");
  }).join("\n\n");
  const tensionLines = diagnostic.tensions.length
    ? diagnostic.tensions.map((tension) => `- ${tension.title}: ${tension.text}`).join("\n")
    : "- No listed rule-pair trigger fired. Do not infer that the code has no unstated conflict.";

  return `You are conducting a careful interview about a human-built community code. The participant temporarily assumed that there are no objective moral facts and designed rules for Lantern, an orbital city of 18,000 residents. Do not argue the participant into moral realism or moral non-realism. Do not supply a moral verdict from nowhere.

Your task:
1. Ask one focused question at a time and wait for the answer.
2. Begin with the most specific unresolved seam, code departure, or hidden ordering rule in the record below.
3. Distinguish factual workability, internal consistency, fair justification, motivation, democratic authorization, coercive capacity, and approval-independent obligation. Never slide from one to another.
4. A vote, agreement, shared aim, beneficial result, informed preference, or stable practice may provide a reason inside a stated framework. Do not claim that it automatically creates a universal or transcendent obligation.
5. Treat coercive power as a means of producing compliance unless an additional justification is supplied. Do not equate effectiveness with legitimacy.
6. Test who is excluded or weakly represented: dissenters, nonmembers, people unable to contribute, future residents, minorities, dependent people, and newly recognized persons.
7. When two rules conflict, ask which one controls, who decides, what evidence triggers the decision, and how the losing party can challenge or exit.
8. Use plain language. Define any philosophical term before using it. Quote the participant’s exact rule when testing it.
9. Do not call overlap among bases an incoherence by itself. Identify a tension only when two selected rules produce competing instructions in a stated case.

PREMISE AND LIMIT
For this exercise, no objective moral fact settles the code. Facts about harm, scarcity, preference, agreement, institutions, and power remain. The diagnostic below maps selected bases and internal fit; it is not a moral score or proof of authority.

EIGHT-BASIS PROFILE
${foundationLines}

NINE-RULE CHARTER
${charterLines}

DETECTED ARCHITECTURE SEAMS
${tensionLines}

SIX PRESSURE CASES AND RESPONSES
${pressureLines}

Start by naming one exact rule or response you want to examine and asking one short question that would clarify its scope, priority, or justification.`;
}

const builderEls = {
  workspace: document.querySelector("#builderLab"),
  results: document.querySelector("#builderResults"),
  phase: document.querySelector("#builderPhase"),
  progress: document.querySelector("#builderProgress"),
  progressTrack: document.querySelector("#builderProgressTrack"),
  progressBar: document.querySelector("#builderProgressBar"),
  number: document.querySelector("#builderQuestionNumber"),
  axis: document.querySelector("#builderQuestionAxis"),
  prompt: document.querySelector("#builderQuestionPrompt"),
  caseFile: document.querySelector("#builderCaseFile"),
  context: document.querySelector("#builderQuestionContext"),
  boundaryOneLabel: document.querySelector("#builderBoundaryOneLabel"),
  boundaryOne: document.querySelector("#builderBoundaryOne"),
  boundaryTwoLabel: document.querySelector("#builderBoundaryTwoLabel"),
  boundaryTwo: document.querySelector("#builderBoundaryTwo"),
  explanation: document.querySelector("#builderExplanation"),
  plain: document.querySelector("#builderPlain"),
  separate: document.querySelector("#builderSeparate"),
  reveal: document.querySelector("#builderReveal"),
  choices: document.querySelector("#builderChoices"),
  back: document.querySelector("#builderBackButton"),
  next: document.querySelector("#builderNextButton"),
  why: document.querySelector("#builderWhy"),
  liveStatus: document.querySelector("#builderLiveStatus"),
  rulesCount: document.querySelector("#builderRulesCount"),
  casesCount: document.querySelector("#builderCasesCount"),
  mapBasis: document.querySelector("#builderMapBasis"),
  liveFoundations: document.querySelector("#builderLiveFoundations"),
  tensionCount: document.querySelector("#builderTensionCount"),
  resultTitle: document.querySelector("#builderResultTitle"),
  resultSummary: document.querySelector("#builderResultSummary"),
  primaryBases: document.querySelector("#builderPrimaryBases"),
  primaryBasesCopy: document.querySelector("#builderPrimaryBasesCopy"),
  fitCount: document.querySelector("#builderFitCount"),
  fitCopy: document.querySelector("#builderFitCopy"),
  seamCount: document.querySelector("#builderSeamCount"),
  seamCopy: document.querySelector("#builderSeamCopy"),
  foundationGrid: document.querySelector("#builderFoundationGrid"),
  charterGrid: document.querySelector("#builderCharterGrid"),
  pressureGrid: document.querySelector("#builderPressureGrid"),
  seamGrid: document.querySelector("#builderSeamGrid"),
  supportBasis: document.querySelector("#builderSupportBasis"),
  supportCopy: document.querySelector("#builderSupportCopy"),
  powerBasis: document.querySelector("#builderPowerBasis"),
  powerCopy: document.querySelector("#builderPowerCopy"),
  aiPrompt: document.querySelector("#builderAIProbePrompt"),
  copyStatus: document.querySelector("#builderPromptCopyStatus"),
};

function builderFoundationNames(foundations) {
  return BUILDER_FOUNDATION_ORDER.filter((id) => foundations[id]).map((id) => BUILDER_FOUNDATIONS[id].name);
}

function renderBuilderChoices(question) {
  const selected = builderSelectedChoice(question);
  builderEls.choices.replaceChildren();
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button builder-choice";
    button.setAttribute("aria-pressed", String(selected?.id === choice.id));
    if (selected?.id === choice.id) button.classList.add("selected");

    const key = document.createElement("span");
    key.className = "choice-key";
    key.textContent = String.fromCharCode(65 + index);
    const copy = document.createElement("span");
    copy.className = "builder-choice-copy";
    const label = document.createElement("strong");
    label.textContent = choice.label;
    const detail = document.createElement("span");
    detail.textContent = choice.detail;
    const consequence = document.createElement("em");
    consequence.textContent = `What this commits the code to: ${choice.consequence}`;
    const bases = document.createElement("small");
    bases.textContent = `Relies mainly on: ${builderFoundationNames(choice.foundations).join(" · ")}`;
    copy.append(label, detail, consequence, bases);
    button.append(key, copy);
    button.addEventListener("click", () => {
      let clearedPressureResponses = false;
      if (question.phase === "Draft the code") {
        const changed = builderState.design[question.id] && builderState.design[question.id] !== choice.id;
        builderState.design[question.id] = choice.id;
        if (changed && Object.keys(builderState.stress).length) {
          builderState.stress = {};
          clearedPressureResponses = true;
        }
      } else {
        builderState.stress[question.id] = choice.id;
      }
      renderBuilderChoices(question);
      renderBuilderLivePanel();
      builderEls.next.disabled = false;
      builderEls.liveStatus.textContent = clearedPressureResponses
        ? `${choice.label} selected for ${question.axis}. Earlier pressure responses were cleared because the written code changed.`
        : `${choice.label} selected for ${question.axis}.`;
    });
    builderEls.choices.append(button);
  });
}

function renderBuilderProgress() {
  const total = BUILDER_DESIGN_QUESTIONS.length + BUILDER_STRESS_QUESTIONS.length;
  const number = builderState.index + 1;
  const phase = builderState.index < BUILDER_DESIGN_QUESTIONS.length ? "Draft the code" : "Pressure-test the code";
  builderEls.phase.textContent = phase;
  builderEls.progress.textContent = `${number} / ${total}`;
  builderEls.progressTrack.setAttribute("aria-valuenow", String(number));
  builderEls.progressBar.style.width = `${(number / total) * 100}%`;
}

function renderBuilderQuestion({ scroll = false } = {}) {
  const question = builderQuestionAt(builderState.index);
  const isStress = question.phase === "Pressure-test the code";
  builderEls.number.textContent = String(builderState.index + 1).padStart(2, "0");
  builderEls.axis.textContent = question.axis;
  builderEls.prompt.textContent = question.prompt;
  builderEls.context.textContent = question.context;
  builderEls.boundaryOneLabel.textContent = isStress ? "Hold these facts fixed" : "Hold this fixed";
  builderEls.boundaryOne.textContent = question.assumptions;
  builderEls.boundaryTwoLabel.textContent = isStress ? "What this case tests" : "What you are choosing";
  builderEls.boundaryTwo.textContent = question.scope;
  builderEls.plain.textContent = question.guide.plain;
  builderEls.separate.textContent = question.guide.separate;
  builderEls.reveal.textContent = question.guide.reveal;
  builderEls.why.textContent = question.why;
  builderEls.explanation.open = false;
  builderEls.caseFile.replaceChildren();
  const fileItems = isStress ? question.file : [question.axis.split(" · ")[0], "Charter design", "One primary rule"];
  fileItems.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    builderEls.caseFile.append(span);
  });
  renderBuilderChoices(question);
  builderEls.back.disabled = builderState.index === 0;
  builderEls.back.classList.toggle("hidden", builderState.index === 0);
  builderEls.next.disabled = !builderSelectedChoice(question);
  if (builderState.index < BUILDER_DESIGN_QUESTIONS.length - 1) builderEls.next.textContent = "Next rule →";
  else if (builderState.index === BUILDER_DESIGN_QUESTIONS.length - 1) builderEls.next.textContent = "Begin the pressure cases →";
  else if (builderState.index < BUILDER_DESIGN_QUESTIONS.length + BUILDER_STRESS_QUESTIONS.length - 1) builderEls.next.textContent = "Next pressure case →";
  else builderEls.next.textContent = "View the code diagnostic →";
  renderBuilderProgress();
  renderBuilderLivePanel();
  if (scroll) document.querySelector("#builderQuestionCard").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBuilderLivePanel() {
  const rules = Object.keys(builderState.design).length;
  const cases = Object.keys(builderState.stress).length;
  const profile = builderFoundationProfile(builderState, true);
  const used = [...profile].sort((a, b) => b.score - a.score).filter((foundation) => foundation.raw > 0);
  builderEls.rulesCount.textContent = `${rules} / 9`;
  builderEls.casesCount.textContent = `${cases} / 6`;
  builderEls.mapBasis.textContent = used.length
    ? `Among answered steps, ${used.slice(0, 2).map((foundation) => foundation.name.toLowerCase()).join(" and ")} currently appear most often.`
    : "Choose the code’s primary goal to begin.";
  builderEls.liveFoundations.replaceChildren();
  profile.forEach((foundation) => {
    const row = document.createElement("div");
    row.className = "builder-foundation-row compact";
    const heading = document.createElement("div");
    const index = document.createElement("span");
    index.textContent = foundation.index;
    const name = document.createElement("strong");
    name.textContent = foundation.name;
    const value = document.createElement("b");
    value.textContent = foundation.cap ? `${foundation.score}%` : "—";
    heading.append(index, name, value);
    const track = document.createElement("i");
    const fill = document.createElement("u");
    fill.style.width = `${foundation.score}%`;
    track.append(fill);
    row.append(heading, track);
    builderEls.liveFoundations.append(row);
  });
  const tensions = builderArchitectureTensions(builderState.design);
  builderEls.tensionCount.textContent = String(tensions.length);
  builderEls.liveFoundations.setAttribute(
    "aria-label",
    rules || cases
      ? profile.map((foundation) => `${foundation.name}: ${foundation.cap ? `${foundation.score} percent of available answered opportunities` : "not yet tested"}`).join("; ")
      : "No community-code bases selected yet",
  );
}

function renderBuilderFoundationResults(diagnostic) {
  builderEls.foundationGrid.replaceChildren();
  diagnostic.foundations.forEach((foundation) => {
    const article = document.createElement("article");
    const heading = document.createElement("div");
    const left = document.createElement("span");
    left.textContent = `${foundation.index} · ${foundation.name}`;
    const score = document.createElement("strong");
    score.textContent = `${foundation.score}%`;
    heading.append(left, score);
    const track = document.createElement("i");
    const fill = document.createElement("b");
    fill.style.width = `${foundation.score}%`;
    track.append(fill);
    const description = document.createElement("p");
    description.textContent = foundation.short;
    const caution = document.createElement("small");
    caution.textContent = `Limit: ${foundation.caution}`;
    article.append(heading, track, description, caution);
    builderEls.foundationGrid.append(article);
  });
}

function renderBuilderCharter() {
  builderEls.charterGrid.replaceChildren();
  BUILDER_DESIGN_QUESTIONS.forEach((question, index) => {
    const choice = builderChoice(question, builderState.design[question.id]);
    const article = document.createElement("article");
    const label = document.createElement("span");
    label.textContent = `Rule ${index + 1} · ${question.id}`;
    const heading = document.createElement("h3");
    heading.textContent = choice.label;
    const copy = document.createElement("p");
    copy.textContent = choice.charter;
    const bases = document.createElement("small");
    bases.textContent = builderFoundationNames(choice.foundations).join(" · ");
    article.append(label, heading, copy, bases);
    builderEls.charterGrid.append(article);
  });
}

function builderDimensionLabel(id) {
  const question = BUILDER_DESIGN_QUESTIONS.find((item) => item.id === id);
  return question ? question.axis.split(" · ").at(-1) : id;
}

function renderBuilderPressure(diagnostic) {
  builderEls.pressureGrid.replaceChildren();
  BUILDER_STRESS_QUESTIONS.forEach((question) => {
    const answer = builderChoice(question, builderState.stress[question.id]);
    const assessment = diagnostic.assessments.find((item) => item.questionId === question.id);
    const article = document.createElement("article");
    article.className = `builder-pressure-card ${assessment.status}`;
    const top = document.createElement("div");
    const status = document.createElement("span");
    const statusNames = { aligned: "Direct fit", partial: "Best available fit", divided: "Code divides", departure: "Code departure" };
    status.textContent = statusNames[assessment.status];
    const score = document.createElement("strong");
    score.textContent = `${assessment.chosenScore} / ${assessment.relevantCount} rules matched`;
    top.append(status, score);
    const heading = document.createElement("h3");
    heading.textContent = question.axis.split(" · ").at(-1);
    const chosen = document.createElement("p");
    chosen.className = "builder-pressure-choice";
    chosen.textContent = answer.label;
    const explanation = document.createElement("p");
    if (assessment.status === "aligned") {
      explanation.textContent = "This response matches every relevant code rule named for the case.";
    } else if (assessment.status === "divided") {
      explanation.textContent = "This response is tied for the best fit. Your relevant rules support more than one offered response, so the code needs an ordering rule.";
    } else if (assessment.status === "partial") {
      explanation.textContent = "No offered response matches every relevant rule, but none matches more than this one. The code leaves part of the case unsettled.";
    } else {
      explanation.textContent = `Another offered response matched ${assessment.bestScore} relevant rules. Your answer can still be a deliberate exception or revision, but it does not follow the code as written without an added reason.`;
    }
    const details = document.createElement("dl");
    const matchedRow = document.createElement("div");
    const matchedTerm = document.createElement("dt");
    matchedTerm.textContent = "Matched";
    const matchedValue = document.createElement("dd");
    matchedValue.textContent = assessment.matched.length ? assessment.matched.map(builderDimensionLabel).join(" · ") : "No relevant written rule";
    matchedRow.append(matchedTerm, matchedValue);
    const missedRow = document.createElement("div");
    const missedTerm = document.createElement("dt");
    missedTerm.textContent = "Did not match";
    const missedValue = document.createElement("dd");
    missedValue.textContent = assessment.missed.length ? assessment.missed.map(builderDimensionLabel).join(" · ") : "None";
    missedRow.append(missedTerm, missedValue);
    details.append(matchedRow, missedRow);
    article.append(top, heading, chosen, explanation, details);
    if (assessment.departure) {
      const best = document.createElement("small");
      best.textContent = `Closest written-code fit: ${assessment.bestIds.map((id) => builderChoice(question, id).label).join(" OR ")}`;
      article.append(best);
    }
    builderEls.pressureGrid.append(article);
  });
}

function renderBuilderSeams(diagnostic) {
  builderEls.seamGrid.replaceChildren();
  if (!diagnostic.tensions.length) {
    const note = document.createElement("p");
    note.className = "builder-no-seams";
    note.textContent = "No listed rule-pair trigger fired. That means this audit found no predefined seam—not that every future case is already settled.";
    builderEls.seamGrid.append(note);
    return;
  }
  diagnostic.tensions.forEach((tension, index) => {
    const article = document.createElement("article");
    article.className = tension.severity;
    const label = document.createElement("span");
    label.textContent = `${String(index + 1).padStart(2, "0")} · ${tension.severity === "high" ? "Direct rule conflict" : "Scope needs definition"}`;
    const heading = document.createElement("h3");
    heading.textContent = tension.title;
    const copy = document.createElement("p");
    copy.textContent = tension.text;
    article.append(label, heading, copy);
    builderEls.seamGrid.append(article);
  });
}

function showBuilderResults() {
  const diagnostic = builderDiagnostic(builderState);
  builderEls.resultTitle.textContent = diagnostic.title;
  builderEls.resultSummary.textContent = diagnostic.summary;
  builderEls.primaryBases.textContent = diagnostic.primary.map((foundation) => foundation.name).join(" + ");
  builderEls.primaryBasesCopy.textContent = "These are the two highest opportunity-normalized bars, not a complete theory label. Several other bases may also carry important parts of the code.";
  builderEls.fitCount.textContent = `${diagnostic.fitCount} / 6`;
  builderEls.fitCopy.textContent = `${diagnostic.fullFitCount} responses matched every relevant rule; ${diagnostic.dividedCount} were tied best fits; ${diagnostic.departureCount} selected responses had a clearer written-code alternative.`;
  builderEls.seamCount.textContent = String(diagnostic.tensions.length);
  builderEls.seamCopy.textContent = diagnostic.tensions.length
    ? "Each seam names two exact selections that need a priority, exception, reviewer, or scope rule."
    : "No predefined pair triggered. New facts can still expose a conflict the simulator did not list.";
  builderEls.supportBasis.textContent = diagnostic.support.map((foundation) => foundation.name).join(" · ");
  builderEls.supportCopy.textContent = "These are the strongest non-power bases offered by your selections. They may explain why participants support the code by reference to benefits, procedures, commitments, preferences, welfare, or voice.";
  builderEls.powerBasis.textContent = `${diagnostic.power.score}% of available opportunities`;
  builderEls.powerCopy.textContent = diagnostic.power.score >= 50
    ? "Force and imposed restrictions appear often in your selected architecture. That may make the code effective, but an additional argument is needed if the code claims that coerced dissenters have reason to endorse it."
    : "Force remains present but is not among the most frequently selected bases. Even limited enforcement should state who authorizes it, when it ends, and how a person can challenge it.";
  renderBuilderFoundationResults(diagnostic);
  renderBuilderCharter();
  renderBuilderPressure(diagnostic);
  renderBuilderSeams(diagnostic);
  builderEls.aiPrompt.value = buildBuilderAIProbePrompt(builderState);
  builderEls.copyStatus.textContent = "The prompt contains your answers but no account information.";
  builderEls.workspace.classList.add("hidden");
  builderEls.results.classList.remove("hidden");
  builderEls.results.scrollIntoView({ behavior: "smooth", block: "start" });
  builderEls.resultTitle.focus({ preventScroll: true });
}

function resetBuilderLab() {
  builderState.index = 0;
  builderState.design = {};
  builderState.stress = {};
  builderEls.results.classList.add("hidden");
  builderEls.workspace.classList.remove("hidden");
  renderBuilderQuestion();
  builderEls.workspace.scrollIntoView({ behavior: "smooth", block: "start" });
  builderEls.prompt.focus({ preventScroll: true });
  builderEls.liveStatus.textContent = "Community code simulator reset.";
}

async function copyBuilderPrompt() {
  const text = builderEls.aiPrompt.value;
  try {
    await navigator.clipboard.writeText(text);
    builderEls.copyStatus.textContent = "Prompt copied. Nothing was sent by this site.";
  } catch {
    builderEls.aiPrompt.focus();
    builderEls.aiPrompt.select();
    builderEls.copyStatus.textContent = "Clipboard access was blocked. The prompt is selected so you can copy it manually.";
  }
}

builderEls.back.addEventListener("click", () => {
  if (builderState.index === 0) return;
  builderState.index -= 1;
  renderBuilderQuestion({ scroll: true });
  builderEls.prompt.focus({ preventScroll: true });
});

builderEls.next.addEventListener("click", () => {
  const question = builderQuestionAt(builderState.index);
  if (!builderSelectedChoice(question)) return;
  const total = BUILDER_DESIGN_QUESTIONS.length + BUILDER_STRESS_QUESTIONS.length;
  if (builderState.index === total - 1) {
    showBuilderResults();
    return;
  }
  builderState.index += 1;
  renderBuilderQuestion({ scroll: true });
  builderEls.prompt.focus({ preventScroll: true });
});

document.querySelector("#resetBuilderButton").addEventListener("click", () => {
  const started = Object.keys(builderState.design).length || Object.keys(builderState.stress).length;
  if (!started || window.confirm("Reset all nine code rules and all six pressure-case responses?")) resetBuilderLab();
});

document.querySelector("#restartBuilderButton").addEventListener("click", resetBuilderLab);
document.querySelector("#copyBuilderPromptButton").addEventListener("click", copyBuilderPrompt);

renderBuilderQuestion();
