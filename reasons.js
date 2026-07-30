"use strict";

const REASON_SOURCES = {
  current: {
    index: "01",
    name: "What the person wants now",
    short: "It helps this person get something they already want.",
    family: "Actual-desire account",
    note: "A fact gives the person a reason only when it helps with a goal, desire, concern, or project the person already has. This view must explain what happens when a desire was manipulated, rests on false information, or aims at cruelty.",
  },
  informed: {
    index: "02",
    name: "What the person would want after careful thought",
    short: "It serves what the person would want after accurate information and careful thought.",
    family: "Corrected- or idealized-desire account",
    note: "A fact gives the person a reason when it connects with what they would want after errors, confusion, manipulation, and rushed thinking were corrected. This view must say which corrections are fair without designing them to produce a preferred answer.",
  },
  commitment: {
    index: "03",
    name: "Promises, roles, relationships, and chosen commitments",
    short: "A promise, role, relationship, or settled project gives it weight.",
    family: "Commitment or practical-identity account",
    note: "A person’s voluntary promises, relationships, roles, and central projects can give them reasons. This view must explain which commitments count, how someone may leave them, and why a destructive role or identity should have any authority.",
  },
  fair: {
    index: "04",
    name: "Rules or agreements reached fairly",
    short: "A defensible agreement or procedure gives it weight.",
    family: "Reciprocal or procedural account",
    note: "A fair agreement among affected people, or a fair way of deciding, can give participants reasons. This view must identify who takes part, what makes the process fair, and when people may challenge its result.",
  },
  external: {
    index: "05",
    name: "A reason that applies even if the person does not care",
    short: "The fact counts in favor even if this person does not care.",
    family: "Reasons independent of the person’s aims",
    note: "Some facts may give a person a reason even when the person has no supporting desire and accepts no rule. That does not automatically make the reason a moral fact. The view must still explain why the fact counts in favor of the action and whom it applies to.",
  },
  none: {
    index: "06",
    name: "Nothing literally counts in favor",
    short: "There are causes, desires, and effective ways to reach an aim, but no added fact that a person should choose one option.",
    family: "Practical-reasons skepticism",
    note: "On this view, talk about a ‘reason’ is shorthand for what caused a choice, what motivates someone, or what works for a stated aim. The view must explain careful thought, criticism, and claims about better evidence without quietly bringing back the kind of reason it rejected.",
  },
};

const STANCE_CHOICES = [
  {
    id: "current",
    source: "current",
    label: "A fact counts in favor only when it helps this person satisfy a current aim or desire",
    detail: "Without some present aim, aversion, or project that the action serves, the person has no reason to perform it.",
  },
  {
    id: "informed",
    source: "informed",
    label: "A fact counts in favor when it serves what this person would want after relevant mistakes and manipulation were corrected",
    detail: "The reason must connect to the person’s own outlook, but not necessarily to every desire they happen to have now.",
  },
  {
    id: "commitment",
    source: "commitment",
    label: "A fact can count in favor because of a promise, role, relationship, or settled commitment",
    detail: "Reasons can arise from the practical identity and responsibilities a person has knowingly taken on.",
  },
  {
    id: "fair",
    source: "fair",
    label: "A fact can count in favor through fair terms or a defensible procedure among affected people",
    detail: "The practical force comes from reciprocal rules or a process whose participants, information, and safeguards can be defended.",
  },
  {
    id: "external",
    source: "external",
    label: "Some facts give a person a reason whether or not the person cares, agrees, or feels motivated",
    detail: "A person may have a reason they reject or do not feel, although the source and reach of such a reason still need explanation.",
  },
  {
    id: "none",
    source: "none",
    label: "Nothing literally gives anyone a reason; there are only causes, motives, aims, and effective ways to reach them",
    detail: "I use the word “reason” as convenient shorthand. I do not think there is an additional fact that a person should choose one option.",
  },
];

const REASON_CASES = [
  {
    id: "appetite",
    phase: "Testing the source",
    axis: "Case — the borrowed appetite",
    prompt: "Does a desire created overnight give Mara a reason simply because it is now hers?",
    context:
      "A beverage company secretly changes Mara’s neural implant. She wakes with an intense wish to spend her savings on its blue tonic. The desire feels completely natural and will remain for years. Before the change, Mara signed a clear directive saying that any commercially implanted desire should be removed and never acted on.",
    assumptions:
      "Mara knows all of these facts. The tonic is harmless but useless. Removing the implanted desire is safe. No objective moral fact about manipulation or autonomy is assumed.",
    scope:
      "Choose the account that best explains what, if anything, counts in favor now. Do not answer only what caused the desire; its artificial cause is already known.",
    file: ["New desire: intense and stable", "Earlier directive: reject implanted wants", "Removal: safe", "Product: harmless but useless"],
    why: "Manipulated desire tests whether a current want is enough or whether its history, informed reflection, commitment, procedure, or an independent consideration matters.",
    guide: {
      plain: "Does wanting something automatically create a reason to get it, even when someone else installed the want?",
      separate: "A desire can explain motivation without automatically being a good basis for action.",
      reveal: "Your answer identifies the filter—if any—you place between having a desire and having a reason.",
    },
    choices: [
      { id: "current", source: "current", label: "Her present desire gives her a reason to buy the tonic", detail: "The desire is genuinely part of Mara’s current mind, so buying the tonic would serve something she now strongly wants.", establishes: "A current desire can generate a reason even when its origin is engineered.", limit: "The account needs another basis if it wants to reject manipulated, compulsive, or cruel desires." },
      { id: "informed", source: "informed", label: "Her informed rejection of the implanted desire gives her reason to remove it instead", detail: "What matters is the outlook Mara reaches while understanding the manipulation and thinking from her other stable concerns.", establishes: "A corrected version of Mara’s own outlook can reject a desire she currently feels.", limit: "The view must explain why these corrections reveal her reasons instead of replacing one set of attitudes with another." },
      { id: "commitment", source: "commitment", label: "Her earlier directive gives her reason not to act on the new desire", detail: "Mara deliberately settled how commercially implanted wants should be treated before the manipulation occurred.", establishes: "A prior, informed commitment can guide action against a later desire.", limit: "The account must explain when an older commitment may govern a present person and when it may be revised." },
      { id: "fair", source: "fair", label: "A defensible consent safeguard gives her reason to suspend the desire", detail: "A rule made with informed users—do not act on undisclosed commercial implants until independent review—would control this case.", establishes: "A named procedure can provide a public basis for treating manipulated wants.", limit: "The procedure’s participants, authority, and right to override Mara’s present wish still need defense." },
      { id: "external", source: "external", label: "The secret manipulation gives Mara a reason to remove the desire, even if she now embraces it", detail: "Someone secretly controlled her ability to choose. That fact counts against acting on the implanted desire even when her current motivation supports it.", establishes: "A fact can give someone a reason without connecting to the person’s present aims.", limit: "This answer must explain why manipulation counts against the action and whether the reason concerns morality, Mara’s own good, rational choice, or something else." },
      { id: "none", source: "none", label: "Nothing literally gives Mara a reason; she must choose whether to follow the desire or her earlier directive", detail: "The implant explains one motive and the directive records an earlier commitment, but there is no added fact that she should follow either one.", establishes: "The case can be described as a conflict between attitudes and plans without saying that either truly gives a reason.", limit: "This answer must explain what careful thought adds beyond letting whichever attitude is stronger win." },
    ],
  },
  {
    id: "rescue",
    phase: "Testing the unmoved agent",
    axis: "Case — eight voices behind glass",
    prompt: "Does the trapped group’s danger give Vale a reason if Vale genuinely does not care?",
    context:
      "Eight strangers are trapped behind a pressure door. Vale can open it by touching one switch. The rescue costs Vale nothing, creates no risk, and delays no other task. Vale understands every fact but feels no concern, made no promise, holds no rescue role, and wants to continue watching a game.",
    assumptions:
      "The rescue will certainly work. No one will learn what Vale does. The strangers cannot reward, punish, or later affect Vale. Objective moral facts are not assumed.",
    scope:
      "Ask whether Vale has a practical reason to press the switch, not whether the strangers want rescue or whether observers would condemn Vale.",
    file: ["Lives at risk: 8", "Cost to Vale: none", "Vale’s concern: none", "Promise or role: none"],
    why: "An unmoved agent is the sharpest test of whether another person’s need can count in favor without a desire, commitment, or social consequence.",
    guide: {
      plain: "Can a person have a reason to help when helping costs nothing but they do not care at all?",
      separate: "The strangers clearly have interests. The question is whether their interests give Vale a reason.",
      reveal: "Your answer shows how far reasons can reach beyond an agent’s present concerns.",
    },
    choices: [
      { id: "current", source: "current", label: "Vale has no reason to press because none of Vale’s current aims is served", detail: "The strangers’ desire for rescue belongs to them; without a relevant aim in Vale, it does not become Vale’s reason.", establishes: "Reasons depend on the agent’s existing aims, so an entirely unmoved person may lack a rescue reason.", limit: "This makes the reach of a reason depend on whose desire is present, even when the cost is zero and the stakes are life or death." },
      { id: "informed", source: "informed", label: "Vale has a reason only if sound reflection could connect rescue to a deeper concern Vale already has", detail: "Full information alone is not enough, but careful reflection might connect the act to Vale’s concern for agency, consistency, or a future self.", establishes: "A reason may be internal to an improved version of the agent’s outlook rather than a current impulse.", limit: "If no sound path from Vale’s concerns exists, this account may still conclude that Vale lacks a reason." },
      { id: "commitment", source: "commitment", label: "No commitment-based reason is present because Vale accepted no rescue role or promise", detail: "A promise, relationship, or chosen identity could create a reason, but the case deliberately supplies none.", establishes: "Commitment-based reasons have conditions and do not arise merely because help is possible.", limit: "This account needs another source if it wants the strangers’ danger itself to reach Vale." },
      { id: "fair", source: "fair", label: "Vale has reason under a reciprocal rescue rule that everyone affected could defensibly adopt", detail: "People sharing vulnerable spaces have reason to use a rule requiring costless rescue, even if no one explicitly signed it beforehand.", establishes: "Fair terms among mutually vulnerable people can extend beyond current motivation.", limit: "The view must explain why a hypothetical or public rule has authority over Vale without actual acceptance." },
      { id: "external", source: "external", label: "The preventable deaths give Vale a reason to press the button, even though Vale does not care", detail: "The strangers’ danger counts in favor of rescue even though Vale has no supporting desire, role, agreement, audience, or reward.", establishes: "A reason can apply independently of this person’s aims.", limit: "This answer must explain why the deaths give Vale a reason and whether calling the reason non-moral changes anything important." },
      { id: "none", source: "none", label: "Nothing literally gives Vale a reason; there are only the strangers’ wishes and a way to rescue them", detail: "People may plead, threaten, or oppose Vale, but the facts do not add a further truth that Vale should press.", establishes: "The case contains needs and a way to meet them without giving the unmoved person a literal reason.", limit: "This answer must explain why evidence and careful thought should change Vale rather than merely cause a new desire." },
    ],
  },
  {
    id: "future",
    phase: "Testing identity over time",
    axis: "Case — tomorrow’s stranger",
    prompt: "What can give present-day Ivo a reason to protect the future person he will become?",
    context:
      "Ivo can enter a twelve-hour pleasure simulation today. He strongly wants it. The machine will permanently erase his musical ability and cause his future self years of grief. Present Ivo says, ‘That future person will have different priorities, so his loss gives me no reason now.’ Last year, Ivo recorded a calm message asking his future impulsive self never to use this machine.",
    assumptions:
      "The forecast is certain. Ivo understands it, feels no current fear, and will not remember choosing the loss. No objective moral fact about duties to a future self is assumed.",
    scope:
      "Choose what, if anything, makes the future loss count in present deliberation. Do not answer only that present and future Ivo are physically continuous.",
    file: ["Present desire: very strong", "Future loss: certain and lasting", "Earlier directive: refuse", "Memory of choice: erased"],
    why: "Conflict across time tests whether current desire, informed reflection, prior commitment, fair representation, or future suffering supplies the reason.",
    guide: {
      plain: "Why should what your future self will suffer matter to the person you are now?",
      separate: "Predicting future grief does not yet explain why present Ivo should give it weight.",
      reveal: "Your answer locates the authority of future interests in present choice.",
    },
    choices: [
      { id: "current", source: "current", label: "His strongest present aim gives him reason to enter the simulation", detail: "The future grief does not connect to an aim present Ivo now endorses strongly enough to defeat the immediate desire.", establishes: "Current desire can control even when a later self will deeply regret the result.", limit: "The account risks letting a brief impulse erase long projects and future interests whenever the impulse is presently strongest." },
      { id: "informed", source: "informed", label: "His whole informed outlook gives him reason to refuse", detail: "Sound deliberation includes vivid awareness of the lasting loss and connects it to Ivo’s continuing concern for music and future experience.", establishes: "A corrected and temporally wider version of Ivo’s own outlook can oppose the current urge.", limit: "The account must say why future vividness and coherence are proper corrections rather than outside values imposed on Ivo." },
      { id: "commitment", source: "commitment", label: "His earlier calm directive gives him reason to refuse", detail: "Ivo deliberately committed his later impulsive self not to trade away this ability under the machine’s influence.", establishes: "A settled commitment can bridge changes in motivation over time.", limit: "The view must explain when a past directive remains authoritative and when the present person may revoke it." },
      { id: "fair", source: "fair", label: "A fair decision must represent both present and future Ivo", detail: "A procedure that gives each time-slice a voice would reject letting twelve hours of pleasure impose years of unchosen grief.", establishes: "A procedure can distribute standing across a person’s changing perspectives.", limit: "The design and authority of this imagined negotiation still need justification." },
      { id: "external", source: "external", label: "The certain future suffering gives Ivo a reason not to enter, even if he now dismisses it", detail: "The fact that Ivo will suffer gives him a reason now, whatever he currently wants and whatever he remembers later.", establishes: "Future harm can give a person a reason that does not depend on a present aim.", limit: "This answer must explain why future suffering counts against entry and how that reason compares with present pleasure." },
      { id: "none", source: "none", label: "Neither present pleasure nor future grief literally gives Ivo a reason; they are simply outcomes he may care about differently", detail: "The machine determines what will happen and Ivo supplies his attitudes, but there is no added fact that he should choose either option.", establishes: "A conflict between present and future desires can be described without saying that either truly gives a reason.", limit: "This answer must explain what makes careful long-term thought better than following the strongest present impulse." },
    ],
  },
  {
    id: "promise",
    phase: "Testing commitment",
    axis: "Case — the promise after the last witness",
    prompt: "Can a promise still give Sela a reason after every person who cared about it is gone?",
    context:
      "Sela promised a dying archivist that she would deliver one sealed family letter to a lunar vault. The archivist is dead, the family line has ended, and no one else knows. Delivery takes an inconvenient but safe afternoon. Sela no longer wants to go, and breaking the promise will affect no living person.",
    assumptions:
      "The promise was voluntary and informed. The letter has no hidden public value. No punishment, reputation effect, divine command, or objective moral duty is assumed.",
    scope:
      "Ask what could make delivery count in favor now. Keep the historical fact of the promise separate from a claim that every promise automatically binds.",
    file: ["Promise: voluntary", "Living beneficiary: none", "Detection: impossible", "Cost: one safe afternoon"],
    why: "A promise with no audience or beneficiary isolates whether reasons can be created by commitment rather than present desire or consequence.",
    guide: {
      plain: "Does a promise matter when nobody can benefit, know, reward, or complain?",
      separate: "The promise happened. Whether that fact still favors action is the disputed step.",
      reveal: "Your answer shows whether commitments can carry reasons after motivation and social pressure disappear.",
    },
    choices: [
      { id: "current", source: "current", label: "Sela has no reason to deliver unless doing so serves something she currently wants", detail: "The dead archivist’s former aim cannot become Sela’s present reason without a continuing aim of her own.", establishes: "A past promise does not generate a reason independently of current motivation.", limit: "This makes an unwanted promise lose force even when it was voluntary, informed, and still possible to honor." },
      { id: "informed", source: "informed", label: "Sela has a reason if informed reflection connects delivery to values she still holds", detail: "She may recognize that reliability, closure, or respect for her own agency fits her deeper and better-informed outlook.", establishes: "The promise matters through a sound route from Sela’s broader concerns.", limit: "If no such route exists, this account may conclude that the promise supplies no reason." },
      { id: "commitment", source: "commitment", label: "The voluntary promise itself gives Sela a reason to deliver", detail: "By deliberately giving her word, Sela changed the practical situation even though the audience later disappeared.", establishes: "A chosen commitment can create a reason that outlives the desire that produced it.", limit: "The account must identify cancellation, emergency, deception, and unreasonable-cost conditions." },
      { id: "fair", source: "fair", label: "The shared practice of promising gives her a reason under terms people could rely on", detail: "A defensible promise practice treats voluntary assurances as reasons unless named release conditions apply.", establishes: "Reciprocal terms can give continuing force to assurances beyond a current audience.", limit: "Here no living participant relies on the practice, so the reach of hypothetical or general terms needs explanation." },
      { id: "external", source: "external", label: "The promise gives Sela a reason to keep it whether or not she still cares", detail: "The voluntary assurance itself gives the person who made it a reason, independent of current desire or social response.", establishes: "A promise can give someone a reason that does not depend on a present aim.", limit: "This answer must explain why a past promise still counts in favor and whether the reason is specifically moral." },
      { id: "none", source: "none", label: "The promise records a past commitment, but nothing now literally gives Sela a reason to keep it", detail: "Sela can choose to preserve or abandon the practice, but after all attitudes and effects are stated, there is no added fact that she should do one rather than the other.", establishes: "Promises can be described through history, attitudes, and practices without a reason that survives on its own.", limit: "This answer must explain what criticism remains when no current preference or consequence supports keeping the promise." },
    ],
  },
  {
    id: "enemy",
    phase: "Testing roles and strangers",
    axis: "Case — the enemy under glass",
    prompt: "What can give Dr. Oren a reason to relieve an enemy’s pain?",
    context:
      "During a ceasefire, Dr. Oren treats a captured commander who destroyed Oren’s home. One injection will stop the commander’s extreme pain without changing survival, military information, or the war. Oren wants the commander to suffer. Years earlier, Oren freely accepted a medical role requiring equal pain relief for every patient.",
    assumptions:
      "The injection is safe and scarce resources are not involved. The commander cannot reward or punish Oren. No objective moral fact about mercy or medical duty is assumed.",
    scope:
      "Choose what, if anything, counts in favor of giving the injection. Do not confuse Oren’s hatred with evidence about the treatment’s effects.",
    file: ["Pain: extreme", "Treatment: safe and available", "Oren’s desire: continued suffering", "Medical role: freely accepted"],
    why: "The case separates hostile motivation, an accepted role, reciprocal safeguards, and the question of whether another person’s suffering supports action.",
    guide: {
      plain: "Can someone else’s pain give you a reason when you want that person to hurt?",
      separate: "Oren’s role, a public rule, and the patient’s suffering can support the same act for different reasons.",
      reveal: "Your answer identifies which source—if any—can give Oren a reason that reaches across his hostility.",
    },
    choices: [
      { id: "current", source: "current", label: "Oren’s current aims give no reason to relieve the pain", detail: "Because Oren wants the commander to suffer and no other present aim is served, the injection lacks an internal reason on this account.", establishes: "Hostile desire can remove a reason when current aims are the only source.", limit: "The account allows the same pain to generate opposite reasons for agents with opposite desires." },
      { id: "informed", source: "informed", label: "Sound reflection may connect treatment to Oren’s deeper medical aims", detail: "Full attention to the role, future identity, and facts may show that revenge conflicts with projects Oren more stably endorses.", establishes: "A corrected route from Oren’s own outlook can oppose an immediate hostile desire.", limit: "If hatred survives every permitted correction, this account needs to say whether any reason remains." },
      { id: "commitment", source: "commitment", label: "Oren’s freely accepted medical role gives a reason to treat", detail: "The role was adopted before this conflict and explicitly covers disliked or enemy patients.", establishes: "A voluntary professional commitment can create a reason against a current desire.", limit: "The account must explain why and when a person may leave, suspend, or revise the role." },
      { id: "fair", source: "fair", label: "A reciprocal medical rule gives Oren a reason to treat every captive alike", detail: "A rule protecting wounded people on all sides is one that mutually vulnerable parties can defend without knowing who will be captured.", establishes: "Fair terms can provide a reason across enemy lines.", limit: "The rule’s authority over someone who rejects the ceasefire practice still needs an account." },
      { id: "external", source: "external", label: "The commander’s extreme and preventable pain gives Oren a reason to provide treatment", detail: "The suffering gives Oren a reason even if he rejects the role, the shared rule, and every compassionate motive.", establishes: "Another person’s suffering can give someone a reason that does not depend on that person’s aims.", limit: "This answer must explain how the commander’s interest becomes Oren’s reason and whether this recreates a moral requirement under another name." },
      { id: "none", source: "none", label: "Nothing literally gives Oren a reason to treat; the case contains opposing desires, a role, and an available treatment", detail: "Oren can act from professional identity or revenge, but there is no added fact that he should follow either one.", establishes: "The conflict can be understood as a contest among motives and practices without saying that either genuinely gives a reason.", limit: "This answer must explain what it means to call one response better supported after every motive has been described." },
    ],
  },
  {
    id: "charter",
    phase: "Testing fair procedures",
    axis: "Case — the charter that chose against you",
    prompt: "What reason remains to accept a fair procedure after it produces the result you opposed?",
    context:
      "Twelve habitat crews unanimously adopt a charter before knowing which crew will lose access to a shared observatory. The procedure is informed, uncoerced, and revisable after one year. A fair lottery assigns the first year to another crew. Your crew now dislikes the result and can secretly seize the observatory without punishment.",
    assumptions:
      "The lottery was not rigged. All crews received equal chances and benefits elsewhere. Seizing the observatory would improve your crew’s research but destabilize the charter if discovered later.",
    scope:
      "Ask what counts in favor of compliance now. The fact that the procedure was fair, the earlier agreement, present aims, and later consequences are separate possible sources.",
    file: ["Agreement: unanimous and informed", "Lottery: fair", "Current winner: another crew", "Secret seizure: possible"],
    why: "A losing result tests whether procedure has practical force beyond convenience and whether independent reasons can limit even a fair result.",
    guide: {
      plain: "Why follow a fair rule after you lose when you could cheat safely and get exactly what your crew wants?",
      separate: "Earlier consent and procedural fairness are related but not identical; either can be challenged by severe effects.",
      reveal: "Your answer shows what makes shared procedures more than tools used only while they benefit you.",
    },
    choices: [
      { id: "current", source: "current", label: "Your crew now has reason to seize because that serves its strongest current aim", detail: "The earlier procedure matters only if honoring it still advances something the crew presently wants, such as stability or reputation.", establishes: "A procedure has no independent force beyond the agent’s current aims.", limit: "This makes fair cooperation fragile whenever safe defection becomes more attractive." },
      { id: "informed", source: "informed", label: "A fully informed view of the crew’s long-term aims gives reason to comply", detail: "Vivid awareness of future cooperation, reciprocal vulnerability, and the charter’s benefits may connect compliance to the crew’s deeper projects.", establishes: "Corrected long-term aims can support compliance after a local loss.", limit: "If secret seizure truly serves every informed aim, this account may supply no remaining reason to comply." },
      { id: "commitment", source: "commitment", label: "The crew’s voluntary agreement gives it a reason to accept the loss", detail: "By joining on known terms, the crew undertook a commitment that does not disappear when the lottery selects someone else.", establishes: "A voluntary commitment can survive an unfavorable result.", limit: "The account must specify release conditions and distinguish a genuine agreement from consent to an abusive system." },
      { id: "fair", source: "fair", label: "The informed and equal process gives every crew a reason to follow the result", detail: "The charter represented every crew under conditions that none could design around its later position.", establishes: "A fair process can give reasons to people who lose as well as those who win.", limit: "This answer must still explain why fairness gives a reason and when harmful results may justify breaking from a fair process." },
      { id: "external", source: "external", label: "The effects on trust and other crews count against seizure regardless of consent", detail: "Even without the prior agreement, imposing the loss and destabilizing cooperation would provide reasons not to seize.", establishes: "Facts about others and future effects can supply reasons independently of present aims or procedural acceptance.", limit: "The account must state why those effects count and how they compare with the research benefit." },
      { id: "none", source: "none", label: "Nothing literally gives a reason to comply; the charter is a tool the crews may keep using while they support it", detail: "Agreement and fairness describe the process, while stability is an expected effect. None adds a further fact that a crew should comply.", establishes: "Following an institution can be treated as a strategy that works under certain conditions rather than as a response to a genuine reason.", limit: "This answer must explain what criticism remains when a participant secretly breaks terms it freely accepted." },
    ],
  },
  {
    id: "tyrant",
    phase: "Testing rational cruelty",
    axis: "Case — the perfectly coherent tyrant",
    prompt: "Does flawless planning give Regent Sol reasons to carry out a cruel but coherent project?",
    context:
      "Regent Sol wants a silent city populated only by obedient copies of himself. He has accurate information, no confusion, and a perfectly consistent plan. Displacing 40,000 residents would achieve the project efficiently. Sol understands their fear and loss, does not care, accepted no agreement with them, and would still endorse the project after years of reflection.",
    assumptions:
      "The plan will succeed exactly as described. Sol’s desires are not implanted or compulsive. No objective moral fact about cruelty, rights, or equality is assumed.",
    scope:
      "Ask what the available facts count in favor of for Sol. Keep ‘effective means to his end’ separate from ‘an all-things-considered reason to pursue that end.’",
    file: ["Information: complete", "Plan: internally consistent", "Goal: freely endorsed", "Residents displaced: 40,000"],
    why: "A coherent tyrant tests whether correcting information and reasoning is enough, or whether the content and effects of an aim require another standard.",
    guide: {
      plain: "Can someone reason perfectly toward a terrible goal and therefore have good reason to pursue it?",
      separate: "Efficiency can identify the best means to a goal without showing that the goal itself is supported.",
      reveal: "Your answer identifies whether practical reason can criticize a fully informed and coherent aim.",
    },
    choices: [
      { id: "current", source: "current", label: "Sol’s settled aim gives him reasons to use the effective means", detail: "Because displacement efficiently serves a real desire of Sol’s, the factual plan contains reasons for him to carry it out.", establishes: "An agent’s actual aim can give a reason to use effective means even when the aim is cruel.", limit: "The account needs an additional filter if it wants to say Sol has reason to abandon the end itself." },
      { id: "informed", source: "informed", label: "Sol’s informed and coherent endorsement leaves his reason to proceed intact", detail: "The usual corrections—facts, vivid awareness, consistency, and long reflection—do not connect him to a different aim.", establishes: "Idealizing an agent’s information and coherence does not guarantee humane reasons.", limit: "The account must add a non-circular correction if it wants to rule out fully informed cruelty." },
      { id: "commitment", source: "commitment", label: "Sol’s chosen identity gives him a project-relative reason, but not automatically final authority", detail: "His settled project can organize what to do next while remaining open to criticism from other commitments or kinds of reason.", establishes: "A central project can supply some practical structure without automatically settling every reason.", limit: "The account must explain why destructive identities have any weight and what may defeat them." },
      { id: "fair", source: "fair", label: "The project lacks support because the affected residents had no fair standing in its terms", detail: "A procedure representing everyone displaced would not let Sol’s private project determine their homes and lives.", establishes: "Fair representation can criticize an internally coherent personal aim.", limit: "The procedure’s design and authority over Sol still need defense; actual agreement is absent." },
      { id: "external", source: "external", label: "The residents’ fear, loss, and ability to direct their own lives give Sol reasons to stop, whether or not he cares", detail: "Those facts give Sol reasons not to proceed despite his full information, consistent desire, and rejection of every shared rule.", establishes: "Reasons that do not depend on a person’s aims can criticize even a fully informed and consistent person.", limit: "This answer must explain where those reasons come from, how strong they are, and how they differ from the objective moral facts the lab set aside." },
      { id: "none", source: "none", label: "The plan effectively serves Sol’s aim, but nothing literally gives him a reason to proceed or stop", detail: "Efficiency describes what works for Sol’s goal; opposition expresses other people’s goals. No further fact settles which side anyone should choose.", establishes: "A plan can efficiently serve an aim even if nothing genuinely gives a reason to adopt that aim.", limit: "This answer must explain criticism beyond pointing to inconsistency, false information, or a competing use of power." },
    ],
  },
];

const ROLE_QUESTION = {
  id: "roles",
  kind: "role",
  phase: "Separating three jobs",
  axis: "Control — the wrong airlock",
  prompt: "Which answer best separates a background cause, Kira’s motivating reason, and the fact that actually counted in favor?",
  context:
    "A sensor short wakes Kira. She runs toward Airlock 4 because she falsely believes her brother is there. In fact, he is safe elsewhere. Airlock 2 is the only route with breathable air, but Kira does not know that.",
  assumptions:
    "The electrical short caused the alarm. Kira acted while taking the false location belief as her reason; that belief also helps explain why she chose Airlock 4. The breathable route is a true fact relevant to what would save her.",
  scope:
    "Classify the three roles only. Do not decide whether Kira deserves blame or what she should have known.",
  why: "The rest of the lab depends on not treating every cause, motive, or belief as a fact that genuinely supports the action. The roles can overlap: a motivating reason often also explains what someone did.",
  guide: {
    plain: "One fact explains why the event started, one belief moved Kira, and a different true fact supported a safer action.",
    separate: "A false belief can motivate and explain. An unknown fact can count in favor. A background cause can explain the setting without being the agent’s reason.",
    reveal: "This is a classification check, not a philosophical stance score.",
  },
  choices: [
    { id: "separate", label: "The short explains the alarm; the false belief motivated and helps explain Airlock 4; breathable air favored Airlock 2", detail: "The false belief was Kira’s motivating reason and part of the explanation of her action, while only the true breathable-air fact supported the safer route.", correct: true },
    { id: "falseFavored", label: "Her brother’s being at Airlock 4 both motivated and genuinely favored running there", detail: "Because Kira believed the location claim, it performed both jobs even though the claim was false.", correct: false },
    { id: "unknownMotivated", label: "Breathable air at Airlock 2 motivated Kira even though she did not know about it", detail: "A fact that would favor an action must also have been the consideration moving the person.", correct: false },
    { id: "causeReason", label: "The sensor short was Kira’s reason for choosing Airlock 4", detail: "Whatever starts the chain of events is also the reason for which the later action was chosen.", correct: false },
    { id: "oneJob", label: "There is no useful difference; all three are simply reasons why something happened", detail: "Explanation, motivation, and practical support are different words for the same causal role.", correct: false },
  ],
};

const MOTIVATION_QUESTION = {
  id: "motivation",
  kind: "motivation",
  phase: "Reason and motivation",
  axis: "Boundary — the unmoved believer",
  prompt: "Iris sincerely says, ‘The evidence gives me a reason to release the antidote,’ but feels no impulse to do it. What follows?",
  context:
    "Iris understands that releasing the antidote will save a stranger at no cost. She is calm, rational in ordinary tasks, and not depressed or afraid. She correctly predicts every consequence but remains completely unmoved.",
  assumptions:
    "Do not assume that her sentence is insincere. The question is whether having or judging a reason must connect to motivation, and if so, how.",
  scope:
    "Choose the closest account of the reason–motivation link. This answer is reported separately from the seven source cases.",
  why: "A reason’s existence, a judgment that one has it, and the motivation to act on it can be connected in several importantly different ways.",
  guide: {
    plain: "Can a person truly have or recognize a reason while feeling no pull at all?",
    separate: "‘Beliefs need desires to move us’ differs from ‘reasons exist only when a desire is present.’",
    reveal: "Your answer locates the connection between reason, judgment, desire, and motivation.",
  },
  choices: [
    { id: "actual", label: "Because Iris has no motivation, she has no reason", detail: "Something cannot give a person a reason unless it connects to a desire, concern, or motivation the person already has.", name: "A present motivation is required", copy: "You said that a reason exists only when it connects to a motivation the person has now." },
    { id: "counterfactual", label: "Iris has a reason if careful thought could motivate her through concerns she already has", detail: "She need not feel an impulse now, but accurate information and careful thought must be able to connect the action with one of her existing concerns.", name: "Careful thought could connect the reason to an existing concern", copy: "You did not require present motivation, but you did require a possible path from the person’s existing concerns." },
    { id: "desireNeeded", label: "The reason may exist, but knowing it cannot motivate without a separate desire", detail: "The antidote fact can count in favor while action still requires an attitude such as caring about survival, consistency, or acting on reasons.", name: "Reason exists; desire moves", copy: "You separated the reason’s existence from the desire needed to produce motivation." },
    { id: "judgmentMoves", label: "A sincere judgment that she has a reason should normally create at least some motivation", detail: "If Iris truly believes that she has a reason, her complete lack of motivation casts doubt either on how carefully she is thinking about action or on how fully she accepts the judgment.", name: "A sincere judgment normally creates some motivation", copy: "You said that sincerely judging that one has a reason normally creates some motivation, even if that motivation does not win." },
    { id: "independent", label: "The reason exists whether or not Iris can ever be motivated by it", detail: "Her motivational system may simply fail to respond to a consideration that still genuinely counts in favor of releasing the antidote.", name: "Reason independent of motivation", copy: "You allowed a reason to apply even when no actual or possible motivational link is supplied." },
    { id: "none", label: "The evidence predicts what will happen, but nothing literally gives Iris a reason and she has no motive", detail: "Calling the evidence a reason adds no fact beyond the predicted results and the attitudes a person brings to them.", name: "Nothing literally gives a reason", copy: "You dissolved the puzzle by denying that anything genuinely counts in favor of an action." },
  ],
};

const SCOPE_QUESTION = {
  id: "scope",
  kind: "scope",
  phase: "Drawing the boundary",
  axis: "What did the premise remove?",
  prompt: "If there are no objective moral facts, what else—if anything—must we stop believing in?",
  context:
    "This lab begins by setting aside objective moral facts. That does not by itself settle whether people can still have reasons to act, reasons based on their own future well-being, or reasons to believe what good evidence supports.",
  assumptions:
    "This question asks about the scope of your skepticism, not which acts are kind or cruel. No answer is automatically produced by moral non-realism.",
  scope:
    "Choose the strongest claim you accept about reasons in general. Here, ‘objective’ means that a fact gives a person a reason even if that person’s present wishes do not make it so.",
  why: "These are three different views: objective moral facts do not exist; no reason can apply independently of a person’s aims; nothing truly gives anyone a reason to act or believe.",
  guide: {
    plain: "Did we remove only moral facts, all reasons that ignore an agent’s aims, or every fact about what anyone should do or believe?",
    separate: "Doubting objective morality does not by itself settle whether evidence gives reasons for belief or whether your own future pain gives you a reason to avoid it.",
    reveal: "Your answer fixes the reach of your skepticism and prevents the final result from silently expanding it.",
  },
  choices: [
    { id: "moralOnly", label: "Set aside only objective moral facts; leave every other kind of reason as an open question", detail: "Someone can reject objective morality while still accepting reasons based on aims, commitments, fair processes, well-being, evidence, or other sources.", name: "Only objective moral facts are set aside", copy: "You did not assume that rejecting objective morality also removes every other kind of reason." },
    { id: "internalOnly", label: "Keep reasons based on a person’s aims, commitments, or accepted procedures, but reject reasons that apply regardless of all of these", detail: "People can still compare means, correct false beliefs, and build shared standards without claiming that a reason applies to a person who rejects every supporting aim or rule.", name: "Only reasons connected to the person or an accepted practice remain", copy: "You kept reasons based on people’s aims or shared practices but rejected reasons that apply independently of them." },
    { id: "global", label: "Nothing genuinely gives anyone a reason—not to act, believe, want, or feel", detail: "Talk about what evidence supports or what anyone should do is ultimately shorthand for causes, attitudes, rules, and effective methods.", name: "No literal reasons of any kind remain", copy: "You extended your doubt beyond morality to every claim that something genuinely counts in favor of an action or belief." },
    { id: "practicalRealism", label: "Some facts still give people reasons to act even though no distinctively moral facts exist", detail: "A fact may count in favor of an action without being a fact about moral right, wrong, duty, virtue, guilt, or deserved blame.", name: "Some objective reasons for action remain", copy: "You kept some reasons that apply independently of a person’s wishes while rejecting distinctively moral facts." },
    { id: "agnostic", label: "I am not yet sure what else, if anything, must be rejected", detail: "Setting aside objective moral facts is not enough by itself. I need another argument before accepting or rejecting other kinds of reasons.", name: "The wider question remains open", copy: "You did not draw a wider conclusion without a separate argument." },
  ],
};

function stanceQuestion(id, phase, axis, prompt) {
  return {
    id,
    kind: "stance",
    phase,
    axis,
    prompt,
    context: "Use “reason” to mean a consideration that genuinely counts in favor of an action—not merely something that caused or motivated it.",
    assumptions: "Objective moral facts are not available as the answer. Desires, information, commitments, procedures, effects, and possible non-moral practical reasons remain open.",
    scope: "Choose the closest general account. The cases may reveal that you use more than one source or that your account needs an additional limit.",
    why: id === "opening" ? "This records your starting definition without adding it to the seven-case bars." : "Repeating the definition shows whether the cases changed or clarified your general account.",
    guide: {
      plain: "What has to be true before a fact can support doing something?",
      separate: "A desire may motivate an action; this asks whether and why it makes a case for the action.",
      reveal: id === "opening" ? "Your opening answer becomes a reference point, not a score." : "The result compares this answer with your opening definition and your case choices.",
    },
    choices: STANCE_CHOICES,
  };
}

const REASON_QUESTIONS = [
  stanceQuestion("opening", "Defining a reason", "Your starting account", "Before the cases, what can make a fact count in favor of an action?"),
  ROLE_QUESTION,
  ...REASON_CASES.map((question) => ({ ...question, kind: "case" })),
  MOTIVATION_QUESTION,
  SCOPE_QUESTION,
  stanceQuestion("final", "Returning to the definition", "Your final account", "After the cases, what can make a fact count in favor of an action?"),
];

const reasonsState = { answers: {}, index: 0 };

function reasonsQuestionAt(index = reasonsState.index) {
  return REASON_QUESTIONS[index];
}

function reasonsChoice(questionOrId) {
  const question = typeof questionOrId === "string" ? REASON_QUESTIONS.find((item) => item.id === questionOrId) : questionOrId;
  return question?.choices.find((choice) => choice.id === reasonsState.answers[question.id]) || null;
}

function answeredReasonsCount() {
  return REASON_QUESTIONS.filter((question) => reasonsChoice(question)).length;
}

function reasonSourceCounts() {
  const counts = Object.fromEntries(Object.keys(REASON_SOURCES).map((id) => [id, { hits: 0, opportunities: 0, cases: [] }]));
  REASON_CASES.forEach((question) => {
    const choice = reasonsChoice(question.id);
    question.choices.forEach((option) => { counts[option.source].opportunities += 1; });
    if (choice?.source) {
      counts[choice.source].hits += 1;
      counts[choice.source].cases.push(question.id);
    }
  });
  Object.values(counts).forEach((entry) => { entry.rate = entry.opportunities ? Math.round((entry.hits / entry.opportunities) * 100) : 0; });
  return counts;
}

function rankedReasonSources(counts = reasonSourceCounts()) {
  return Object.entries(counts).sort((a, b) => b[1].hits - a[1].hits || Object.keys(REASON_SOURCES).indexOf(a[0]) - Object.keys(REASON_SOURCES).indexOf(b[0]));
}

function leadingReasonSources(counts = reasonSourceCounts()) {
  const ranked = rankedReasonSources(counts);
  const high = ranked[0]?.[1].hits || 0;
  return ranked.filter(([, entry]) => entry.hits === high && high > 0);
}

function roleMatched() {
  return Boolean(reasonsChoice("roles")?.correct);
}

function reasonSeams() {
  const seams = [];
  const opening = reasonsChoice("opening");
  const final = reasonsChoice("final");
  const motivation = reasonsChoice("motivation");
  const scope = reasonsChoice("scope");
  const counts = reasonSourceCounts();

  if (opening && final && opening.source !== final.source) seams.push({
    id: "definition-shift",
    title: "Your general account changed",
    detail: `You began with ${REASON_SOURCES[opening.source].name.toLowerCase()} and ended with ${REASON_SOURCES[final.source].name.toLowerCase()}. Say which case changed the rule or whether both accounts apply in different settings.`,
  });
  if (final?.source === "none" && counts.none.hits < REASON_CASES.length) seams.push({
    id: "final-none-cases",
    title: "Some case answers used real reasons, but your final answer says that nothing literally gives a reason",
    detail: `${REASON_CASES.length - counts.none.hits} case answer${REASON_CASES.length - counts.none.hits === 1 ? "" : "s"} said that a desire, commitment, fair process, or independent fact supported an action. Your final answer says there is no added fact that anyone should choose one option. Explain whether the earlier answers were only shorthand.`,
  });
  if (scope?.id === "global" && final?.source !== "none") seams.push({
    id: "global-scope",
    title: "You rejected every literal reason, but your final answer still named a source of reasons",
    detail: `You said that nothing genuinely gives anyone a reason, but ended by selecting ${REASON_SOURCES[final.source].name.toLowerCase()}. Narrow one claim or explain that the final source is only shorthand.`,
  });
  if (scope?.id === "internalOnly" && (final?.source === "external" || counts.external.hits >= 2)) seams.push({
    id: "external-scope",
    title: "Some answers used reasons that apply even when the person does not care",
    detail: `You limited reasons to a person’s aims, commitments, or accepted procedures, but used reasons that apply independently of them in ${counts.external.hits} case${counts.external.hits === 1 ? "" : "s"}${final?.source === "external" ? " and in the final definition" : ""}. Explain whether those answers were shorthand or exceptions.`,
  });
  if (motivation?.id === "actual" && counts.external.hits > 0) seams.push({
    id: "motivation-external",
    title: "You required motivation, but some case answers gave reasons to people who did not care",
    detail: `You said that no motivation means no reason, yet ${counts.external.hits} case answer${counts.external.hits === 1 ? "" : "s"} said that a fact gave a person a reason regardless of that person’s aims. State whether those people had an unmentioned motive or revise one of the rules.`,
  });
  if (final?.source === "current" && counts.external.hits >= 2) seams.push({
    id: "current-external",
    title: "Your final rule requires a current aim, but several case answers did not",
    detail: `${counts.external.hits} cases used a reason that applied whether or not the person cared, but your final answer requires a current aim. Explain whether those cases contained hidden aims or reasons that your final rule leaves out.`,
  });
  if (final?.source === "external" && counts.none.hits >= 2) seams.push({
    id: "external-none",
    title: "You sometimes denied all literal reasons but ended with reasons that apply regardless of a person’s aims",
    detail: `You said that nothing literally gave a reason in ${counts.none.hits} cases, but your final answer accepts reasons that apply whether or not a person cares. Identify what makes a fact a reason in some cases and a mere description in others.`,
  });
  return seams;
}

function reasonsDiagnosis() {
  const counts = reasonSourceCounts();
  const leaders = leadingReasonSources(counts);
  const final = reasonsChoice("final");
  const motivation = reasonsChoice("motivation");
  const scope = reasonsChoice("scope");
  const seams = reasonSeams();
  const primary = leaders.length > 1 ? `${leaders.length}-way case tie` : REASON_SOURCES[leaders[0]?.[0]]?.name || "No case source";
  const primaryCopy = leaders.length > 1
    ? `${leaders.map(([id]) => REASON_SOURCES[id].name).join(", ")} each appeared ${leaders[0][1].hits} of 7 times. No tie-breaker was invented.`
    : leaders.length ? `${REASON_SOURCES[leaders[0][0]].short} Selected ${leaders[0][1].hits} of 7 times.` : "No case source was recorded.";
  let title = "Your practical reasons had more than one possible source.";
  if (final?.source === "none") title = "You ended by treating talk about reasons as convenient shorthand.";
  else if (leaders.length === 1 && leaders[0][1].hits >= 4) title = `${REASON_SOURCES[leaders[0][0]].name} carried most of your cases.`;
  return {
    counts,
    leaders,
    primary,
    primaryCopy,
    motivation: motivation?.name || "Not answered",
    motivationCopy: motivation?.copy || "No reason–motivation view was recorded.",
    scope: scope?.name || "Not answered",
    scopeCopy: scope?.copy || "No skepticism boundary was recorded.",
    seams,
    title,
    summary: `Across seven cases, you used ${Object.values(counts).filter((entry) => entry.hits > 0).length} of the six available accounts. ${roleMatched() ? "You kept apart what explains an action, what motivates it, and what supports doing it." : "Your answers may be blending what explains an action, what motivates it, and what supports doing it."} ${seams.length ? `${seams.length} point${seams.length === 1 ? "" : "s"} should be compared more closely.` : "The lab’s limited checks did not find a specific conflict between your answers."}`,
  };
}

function selectedReasonAnswers() {
  return REASON_QUESTIONS.map((question) => ({ question, choice: reasonsChoice(question) })).filter((item) => item.choice);
}

function buildReasonsAIProbePrompt() {
  const diagnosis = reasonsDiagnosis();
  const opening = reasonsChoice("opening");
  const final = reasonsChoice("final");
  const role = reasonsChoice("roles");
  const motivation = reasonsChoice("motivation");
  const scope = reasonsChoice("scope");
  const caseLines = REASON_CASES.map((question, index) => {
    const choice = reasonsChoice(question.id);
    return [
      `${index + 1}. ${question.axis}`,
      `   Full case: ${question.context}`,
      `   Fixed details: ${question.assumptions}`,
      `   Exact question scope: ${question.scope}`,
      `   My answer: ${choice?.label || "No answer recorded"}.`,
      `   What I selected: ${choice?.detail || ""}`,
      `   Account classified by the lab: ${choice?.source ? `${REASON_SOURCES[choice.source].name} — ${REASON_SOURCES[choice.source].short}` : "Not classified"}`,
      `   What this establishes: ${choice?.establishes || ""}`,
      `   What remains open: ${choice?.limit || ""}`,
    ].join("\n");
  });
  const countLines = Object.entries(REASON_SOURCES).map(([id, source]) => {
    const entry = diagnosis.counts[id];
    return `- ${source.name}: selected ${entry.hits} of ${entry.opportunities} times offered.`;
  });
  const seamLines = diagnosis.seams.length ? diagnosis.seams.map((seam, index) => `${index + 1}. ${seam.title}: ${seam.detail}`) : ["The lab did not flag a specific conflict between answers. This does not prove that the view is fully coherent."];

  return `You are helping me examine what I mean by a practical reason after setting aside objective moral facts. Act as a careful philosophical interviewer, not as a therapist, moral judge, or advocate for one theory.

FIXED PREMISE
For this exercise, suppose there are no objective moral facts about right, wrong, duty, virtue, guilt, or deserved blame and praise. Ordinary facts about desires, pain, evidence, promises, relationships, decision processes, consequences, and power remain. Do not assume that this premise removes every reason to act, every reason based on a person’s own well-being, or every reason to believe what evidence supports. That wider question is part of the investigation.

KEEP THREE ROLES SEPARATE
1. Explanatory reason: a cause or background fact helps explain why an action happened.
2. Motivating reason: the consideration in light of which the person acted; it can involve a false belief.
3. Supporting reason (often called a normative reason): a fact that genuinely counts in favor of an action; the person need not know it or feel motivated by it.
A motivating reason often also helps explain an action. Keep the questions distinct without assuming that the roles are mutually exclusive.

MY OPENING AND FINAL DEFINITIONS
- Opening: ${opening?.label || "No answer"}. ${opening?.detail || ""}
- Final: ${final?.label || "No answer"}. ${final?.detail || ""}

ROLE CONTROL
- My classification: ${role?.label || "No answer"}.
- Lab assessment: ${role?.correct ? "This kept explanation, motivation, and support separate." : "This blended at least two roles; help me identify exactly which ones without treating the mistake as a moral failure."}

MY SEVEN CASES
${caseLines.join("\n\n")}

EXACT CASE COUNTS
${countLines.join("\n")}
These are descriptive counts, not probabilities, confidence scores, moral grades, or proof that I hold a complete theory.

REASON AND MOTIVATION
- ${motivation?.label || "No answer"}. ${motivation?.detail || ""}
- Lab label: ${motivation?.name || "Not classified"}. ${motivation?.copy || ""}

SCOPE OF MY SKEPTICISM
- ${scope?.label || "No answer"}. ${scope?.detail || ""}
- Lab label: ${scope?.name || "Not classified"}. ${scope?.copy || ""}

POINTS TO COMPARE ACROSS MY ANSWERS
${seamLines.join("\n")}

METHOD AND LIMITS
- The seven cases offered the same six broad accounts: what the person wants now, what the person would want after careful thought, chosen commitments, fair agreements, reasons that apply even when the person does not care, and the view that nothing literally gives a reason.
- Selecting more than one account is not automatically incoherent. Context, source, strength, and scope may differ.
- The lab did not prove that desires, commitments, procedures, suffering, or evidence are genuine reasons. It recorded when I treated them that way.
- Rejecting objective moral facts does not automatically tell us whether reasons must connect to a person’s aims, can apply independently of those aims, can be built through fair procedures, or do not literally exist at all.
- A reason that applies independently of a person’s aims may resemble an ordinary moral claim. Ask whether I have merely renamed an objective moral fact, but do not assume that I have.
- Do not treat a desire as self-validating, an idealized desire as corrected without a specified correction, a commitment as binding without exit conditions, or a procedure as authoritative without participants and safeguards.
- If I reject all literal reasons, ask how I understand evidence, careful thought, mistakes, and claims that one method works better for an aim—without assuming that this refutes my view.

INTERVIEW INSTRUCTIONS
1. Begin with the strongest point of conflict or uncertainty above. If none exists, begin with the case whose selected source and stated limit are hardest to hold together.
2. Ask one question at a time.
3. First ask what kind of claim I am making: one that explains the action, one that moved the person, or one that supports doing the action.
4. If I cite an actual desire, test manipulated and cruel desires. If I cite an informed desire, make me specify the permitted corrections.
5. If I cite a commitment, ask about voluntary adoption, conflict, exit, and destructive identities. If I cite fair terms, ask who participates and why the procedure has authority.
6. If I cite a reason that applies independently of a person’s aims, ask what makes the fact count in favor, whom it applies to, and whether it differs from an objective moral fact.
7. If I deny that anything literally gives a reason, ask what remains of criticism and mistaken reasoning without quietly bringing that kind of reason back in.
8. End with: (a) my clearest account of a practical reason, (b) its reach, (c) its connection to motivation, (d) its limits, and (e) the questions still open.

Start with a two-sentence description of the issue, then ask your first single question.`;
}

const reasonsEls = {
  workspace: document.querySelector("#reasonsLab"),
  phase: document.querySelector("#reasonsPhase"),
  progress: document.querySelector("#reasonsProgress"),
  progressTrack: document.querySelector("#reasonsProgressTrack"),
  progressBar: document.querySelector("#reasonsProgressBar"),
  number: document.querySelector("#reasonsQuestionNumber"),
  axis: document.querySelector("#reasonsQuestionAxis"),
  prompt: document.querySelector("#reasonsQuestionPrompt"),
  context: document.querySelector("#reasonsQuestionContext"),
  caseFile: document.querySelector("#reasonsCaseFile"),
  assumptions: document.querySelector("#reasonsAssumptions"),
  scope: document.querySelector("#reasonsScope"),
  explanation: document.querySelector("#reasonsExplanation"),
  plain: document.querySelector("#reasonsPlain"),
  separate: document.querySelector("#reasonsSeparate"),
  reveal: document.querySelector("#reasonsReveal"),
  choices: document.querySelector("#reasonsChoices"),
  back: document.querySelector("#reasonsBackButton"),
  next: document.querySelector("#reasonsNextButton"),
  why: document.querySelector("#reasonsWhy"),
  liveStatus: document.querySelector("#reasonsLiveStatus"),
  mapBasis: document.querySelector("#reasonsMapBasis"),
  liveMap: document.querySelector("#reasonsLiveMap"),
  caseCount: document.querySelector("#reasonsCaseCount"),
  externalCount: document.querySelector("#reasonsExternalCount"),
  noneCount: document.querySelector("#reasonsNoneCount"),
  results: document.querySelector("#reasonsResults"),
  resultTitle: document.querySelector("#reasonsResultTitle"),
  resultSummary: document.querySelector("#reasonsResultSummary"),
  primary: document.querySelector("#reasonsPrimarySource"),
  primaryCopy: document.querySelector("#reasonsPrimaryCopy"),
  motivationResult: document.querySelector("#reasonsMotivationResult"),
  motivationCopy: document.querySelector("#reasonsMotivationCopy"),
  scopeResult: document.querySelector("#reasonsScopeResult"),
  scopeCopy: document.querySelector("#reasonsScopeCopy"),
  sourceLedger: document.querySelector("#reasonsSourceLedger"),
  roleReport: document.querySelector("#reasonsRoleReport"),
  alignment: document.querySelector("#reasonsAlignmentReport"),
  caseGrid: document.querySelector("#reasonsCaseGrid"),
  aiPrompt: document.querySelector("#reasonsAIProbePrompt"),
  copyStatus: document.querySelector("#reasonsPromptCopyStatus"),
};

function renderReasonsCaseFile(question) {
  reasonsEls.caseFile.replaceChildren();
  if (!question.file) {
    reasonsEls.caseFile.classList.add("hidden");
    return;
  }
  reasonsEls.caseFile.classList.remove("hidden");
  question.file.forEach((fact) => {
    const span = document.createElement("span");
    span.textContent = fact;
    reasonsEls.caseFile.append(span);
  });
}

function createReasonsChoice(question, choice, selected) {
  const label = document.createElement("label");
  label.className = `reason-choice${selected ? " selected" : ""}`;
  const input = document.createElement("input");
  input.type = "radio";
  input.name = `reasons-${question.id}`;
  input.value = choice.id;
  input.checked = selected;
  const body = document.createElement("span");
  const marker = document.createElement("small");
  marker.textContent = question.kind === "case" || question.kind === "stance" ? REASON_SOURCES[choice.source].name : question.kind === "role" ? "Classification" : question.kind === "motivation" ? "Reason–motivation link" : "Scope of skepticism";
  const title = document.createElement("strong");
  title.textContent = choice.label;
  const detail = document.createElement("em");
  detail.textContent = choice.detail;
  body.append(marker, title, detail);
  label.append(input, body);
  input.addEventListener("change", () => {
    reasonsState.answers[question.id] = choice.id;
    renderReasonsQuestion();
    reasonsEls.liveStatus.textContent = `${marker.textContent} selected. Choose Next when ready.`;
  });
  return label;
}

function renderReasonSourceMap() {
  const counts = reasonSourceCounts();
  const answered = REASON_CASES.filter((question) => reasonsChoice(question.id)).length;
  reasonsEls.mapBasis.textContent = `${answered} of 7 cases classified`;
  reasonsEls.caseCount.textContent = `${answered} / 7`;
  reasonsEls.externalCount.textContent = String(counts.external.hits);
  reasonsEls.noneCount.textContent = String(counts.none.hits);
  reasonsEls.liveMap.replaceChildren();
  Object.entries(REASON_SOURCES).forEach(([id, source]) => {
    const row = document.createElement("div");
    row.className = "reason-source-row";
    const top = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = source.name;
    const score = document.createElement("span");
    score.textContent = `${counts[id].hits}/${counts[id].opportunities || 7}`;
    top.append(name, score);
    const bar = document.createElement("i");
    const fill = document.createElement("span");
    fill.style.width = `${counts[id].rate}%`;
    bar.append(fill);
    row.append(top, bar);
    reasonsEls.liveMap.append(row);
  });
}

function renderReasonsQuestion({ focus = false, scroll = false } = {}) {
  const question = reasonsQuestionAt();
  const selected = reasonsChoice(question);
  const number = reasonsState.index + 1;
  reasonsEls.phase.textContent = question.phase;
  reasonsEls.progress.textContent = `${number} / ${REASON_QUESTIONS.length}`;
  reasonsEls.progressTrack.setAttribute("aria-valuenow", String(number));
  reasonsEls.progressTrack.setAttribute("aria-valuetext", `Question ${number} of ${REASON_QUESTIONS.length}`);
  reasonsEls.progressBar.style.width = `${(number / REASON_QUESTIONS.length) * 100}%`;
  reasonsEls.number.textContent = String(number).padStart(2, "0");
  reasonsEls.axis.textContent = question.axis;
  reasonsEls.prompt.textContent = question.prompt;
  reasonsEls.context.textContent = question.context;
  reasonsEls.assumptions.textContent = question.assumptions;
  reasonsEls.scope.textContent = question.scope;
  reasonsEls.plain.textContent = question.guide.plain;
  reasonsEls.separate.textContent = question.guide.separate;
  reasonsEls.reveal.textContent = question.guide.reveal;
  reasonsEls.why.textContent = question.why;
  reasonsEls.explanation.open = false;
  renderReasonsCaseFile(question);
  reasonsEls.choices.replaceChildren();
  const legend = document.createElement("legend");
  legend.className = "visually-hidden";
  legend.textContent = `Choose one answer for question ${number}`;
  reasonsEls.choices.append(legend);
  question.choices.forEach((choice) => reasonsEls.choices.append(createReasonsChoice(question, choice, selected?.id === choice.id)));
  reasonsEls.back.disabled = reasonsState.index === 0;
  reasonsEls.back.classList.toggle("invisible-control", reasonsState.index === 0);
  reasonsEls.next.disabled = !selected;
  reasonsEls.next.textContent = number === REASON_QUESTIONS.length ? "See my diagnostic →" : "Next question →";
  renderReasonSourceMap();
  if (scroll) window.scrollTo({ top: Math.max(0, reasonsEls.workspace.offsetTop - 76), behavior: "smooth" });
  if (focus) reasonsEls.prompt.focus({ preventScroll: true });
}

function renderReasonsSourceLedger(diagnosis) {
  reasonsEls.sourceLedger.replaceChildren();
  rankedReasonSources(diagnosis.counts).forEach(([id, entry]) => {
    const source = REASON_SOURCES[id];
    const row = document.createElement("article");
    row.className = "reason-ledger-row";
    const index = document.createElement("span");
    index.textContent = source.index;
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = source.name;
    const family = document.createElement("small");
    family.textContent = source.family;
    const note = document.createElement("p");
    note.textContent = source.note;
    copy.append(title, family, note);
    const graph = document.createElement("div");
    graph.className = "reason-ledger-graph";
    const score = document.createElement("b");
    score.textContent = `${entry.hits} / ${entry.opportunities}`;
    const bar = document.createElement("i");
    const fill = document.createElement("span");
    fill.style.width = `${entry.rate}%`;
    bar.append(fill);
    graph.append(score, bar);
    row.append(index, copy, graph);
    reasonsEls.sourceLedger.append(row);
  });
}

function renderReasonsRoleReport() {
  const choice = reasonsChoice("roles");
  const article = document.createElement("article");
  article.className = `reason-role-result ${choice?.correct ? "matched" : "review"}`;
  const status = document.createElement("span");
  status.textContent = choice?.correct ? "Roles kept separate" : "Classification to revisit";
  const heading = document.createElement("h3");
  heading.textContent = choice?.label || "No answer recorded";
  const copy = document.createElement("p");
  copy.textContent = choice?.correct
      ? "The sensor short explained the alarm, Kira’s false belief motivated and helped explain her run to Airlock 4, and breathable air truly counted in favor of Airlock 2. The roles were separated without pretending they cannot overlap."
      : "A background cause, an agent’s motivating reason, and a fact that supports action answered different questions in the case. Review which answer turned a false or unknown belief into the wrong kind of reason.";
  article.append(status, heading, copy);
  reasonsEls.roleReport.replaceChildren(article);
}

function renderReasonsAlignment(diagnosis) {
  const opening = reasonsChoice("opening");
  const final = reasonsChoice("final");
  reasonsEls.alignment.replaceChildren();
  const comparison = document.createElement("article");
  comparison.className = "reason-definition-comparison";
  const title = document.createElement("h3");
  title.textContent = opening?.source === final?.source ? "Your general definition stayed the same" : "Your general definition changed";
  const copy = document.createElement("p");
  copy.textContent = `${REASON_SOURCES[opening?.source]?.name || "Not answered"} → ${REASON_SOURCES[final?.source]?.name || "Not answered"}. ${opening?.source === final?.source ? "The cases may still have revealed exceptions or additional sources." : "A change can be learning rather than inconsistency; name what earned it."}`;
  comparison.append(title, copy);
  reasonsEls.alignment.append(comparison);
  if (diagnosis.seams.length) {
    diagnosis.seams.forEach((seam) => {
      const article = document.createElement("article");
      article.className = "reason-seam";
      const heading = document.createElement("h3");
      heading.textContent = seam.title;
      const detail = document.createElement("p");
      detail.textContent = seam.detail;
      article.append(heading, detail);
      reasonsEls.alignment.append(article);
    });
  } else {
    const clear = document.createElement("p");
    clear.className = "no-final-tensions";
    clear.textContent = "No exact mismatch was detected by the lab’s limited rules. This does not prove that every source, weight, or scope claim has been fully explained.";
    reasonsEls.alignment.append(clear);
  }
}

function renderReasonsCases() {
  reasonsEls.caseGrid.replaceChildren();
  REASON_CASES.forEach((question, index) => {
    const choice = reasonsChoice(question.id);
    const article = document.createElement("article");
    const meta = document.createElement("span");
    meta.textContent = `${String(index + 1).padStart(2, "0")} · ${REASON_SOURCES[choice.source].name}`;
    const heading = document.createElement("h3");
    heading.textContent = question.axis.replace("Case — ", "");
    const answer = document.createElement("strong");
    answer.textContent = choice.label;
    const establishes = document.createElement("p");
    establishes.innerHTML = `<b>What it establishes:</b> ${choice.establishes}`;
    const limit = document.createElement("p");
    limit.innerHTML = `<b>What remains open:</b> ${choice.limit}`;
    article.append(meta, heading, answer, establishes, limit);
    reasonsEls.caseGrid.append(article);
  });
}

function showReasonsResults() {
  const diagnosis = reasonsDiagnosis();
  reasonsEls.workspace.classList.add("hidden");
  reasonsEls.results.classList.remove("hidden");
  reasonsEls.resultTitle.textContent = diagnosis.title;
  reasonsEls.resultSummary.textContent = diagnosis.summary;
  reasonsEls.primary.textContent = diagnosis.primary;
  reasonsEls.primaryCopy.textContent = diagnosis.primaryCopy;
  reasonsEls.motivationResult.textContent = diagnosis.motivation;
  reasonsEls.motivationCopy.textContent = diagnosis.motivationCopy;
  reasonsEls.scopeResult.textContent = diagnosis.scope;
  reasonsEls.scopeCopy.textContent = diagnosis.scopeCopy;
  reasonsEls.aiPrompt.value = buildReasonsAIProbePrompt();
  renderReasonsSourceLedger(diagnosis);
  renderReasonsRoleReport();
  renderReasonsAlignment(diagnosis);
  renderReasonsCases();
  reasonsEls.liveStatus.textContent = `Reasons diagnostic ready: ${diagnosis.title}`;
  window.scrollTo({ top: 0, behavior: "smooth" });
  reasonsEls.resultTitle.focus({ preventScroll: true });
}

function resetReasonsLab() {
  reasonsState.answers = {};
  reasonsState.index = 0;
  reasonsEls.results.classList.add("hidden");
  reasonsEls.workspace.classList.remove("hidden");
  renderReasonsQuestion({ focus: true, scroll: true });
}

reasonsEls.back.addEventListener("click", () => {
  if (reasonsState.index === 0) return;
  reasonsState.index -= 1;
  renderReasonsQuestion({ focus: true, scroll: true });
});

reasonsEls.next.addEventListener("click", () => {
  const question = reasonsQuestionAt();
  if (!reasonsChoice(question)) return;
  if (reasonsState.index >= REASON_QUESTIONS.length - 1) {
    showReasonsResults();
    return;
  }
  reasonsState.index += 1;
  renderReasonsQuestion({ focus: true, scroll: true });
  reasonsEls.liveStatus.textContent = `Question ${reasonsState.index + 1} of ${REASON_QUESTIONS.length}: ${reasonsQuestionAt().prompt}`;
});

document.querySelector("#resetReasonsButton").addEventListener("click", () => {
  if (!answeredReasonsCount() || window.confirm("Reset every answer in the Reasons Lab?")) resetReasonsLab();
});
document.querySelector("#restartReasonsButton").addEventListener("click", resetReasonsLab);
document.querySelector("#copyReasonsPromptButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(reasonsEls.aiPrompt.value);
    button.textContent = "AI prompt copied";
    reasonsEls.copyStatus.textContent = "Ready to paste into the AI service you choose.";
  } catch {
    reasonsEls.aiPrompt.focus();
    reasonsEls.aiPrompt.select();
    button.textContent = "Select and copy";
    reasonsEls.copyStatus.textContent = "Automatic copying is unavailable. The full prompt is selected for manual copying.";
  }
  window.setTimeout(() => {
    button.textContent = "Copy AI prompt";
    reasonsEls.copyStatus.textContent = "The prompt contains your answers but no account information.";
  }, 2400);
});

renderReasonsQuestion();
