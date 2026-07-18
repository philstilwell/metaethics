"use strict";

const BLAME_RESPONSES = {
  protection: {
    index: "01",
    name: "Protection",
    lane: "future",
    short: "Restrict access or movement only enough to reduce a specific, evidence-based danger while that danger lasts.",
    justifies: "A targeted safety measure tied to a demonstrated risk and reviewed as the risk changes.",
    safeguard: "Use the least restrictive effective measure, provide review and humane conditions, and end it when the risk no longer supports it.",
  },
  deterrence: {
    index: "02",
    name: "Deterrence",
    lane: "future",
    short: "Use a known and predictable response because credible evidence shows that it will reduce similar harmful conduct.",
    justifies: "A response no harsher than needed to produce a supported preventive effect for this person or other decision-makers.",
    safeguard: "Do not assume severity deters. Count every burden, compare less harmful options, and never punish an innocent person as an example.",
  },
  restitution: {
    index: "03",
    name: "Restitution",
    lane: "repair",
    short: "Return property, replace a loss, fund recovery, correct a record, or transfer an unfair gain back toward the people harmed.",
    justifies: "A repair demand connected to an identified loss, benefit, or cost created by the conduct.",
    safeguard: "Repair is limited by what was lost and what the person can fairly supply; it is not a license to add unrelated humiliation or pain.",
  },
  rehabilitation: {
    index: "04",
    name: "Rehabilitation",
    lane: "repair",
    short: "Change skills, habits, health conditions, incentives, or opportunities so the person can participate more safely in the future.",
    justifies: "Support, education, treatment, practice, or structured supervision aimed at a specified and measurable change.",
    safeguard: "Do not call coercion treatment merely to avoid the word punishment. Respect agency, set review points, and offer a route back to participation.",
  },
  boundary: {
    index: "05",
    name: "Boundary-setting",
    lane: "relationship",
    short: "State what a person, relationship, workplace, or voluntary group will no longer accept and what must change for participation to continue.",
    justifies: "A clear condition on one’s own participation or on membership in a defined practice, stated without pretending to govern every other relationship.",
    safeguard: "Make the boundary relevant, possible to understand, and no broader than the relationship or institution whose terms are being set.",
  },
  trust: {
    index: "06",
    name: "Withdrawal of trust",
    lane: "relationship",
    short: "Reduce reliance, access, responsibility, or confidence when the person’s conduct is evidence that the relevant trust is unsafe.",
    justifies: "A risk-matched change in what others rely on the person to do, even without anger or a claim that distrust is deserved.",
    safeguard: "Specify which trust was damaged, allow contrary evidence, review change over time, and do not turn one failure into total permanent stigma.",
  },
  condemnation: {
    index: "07",
    name: "Public condemnation",
    lane: "meaning",
    short: "Publicly describe and reject the conduct so people are warned, victims are not silenced, and a group can state the rule it intends to uphold.",
    justifies: "Accurate, proportionate public protest focused on the act, the evidence, the affected people, and the standard being defended.",
    safeguard: "Correct errors, avoid dehumanizing labels and harassment, protect unnecessary private details, and do not make permanent social pain the hidden goal.",
  },
  retribution: {
    index: "08",
    name: "Retributive suffering",
    lane: "meaning",
    short: "Impose pain, loss, or hardship because the person is said to intrinsically deserve suffering for the past act, apart from any further human purpose.",
    justifies: "Only a basic-desert claim could justify deliberately added suffering after every protective, preventive, reparative, relational, and expressive purpose is removed.",
    safeguard: "This response rejects the lab’s desert-free premise. It needs an independent defense of deserved suffering, not a relabeling of protection or repair.",
  },
};

const BLAME_RESPONSE_ORDER = ["protection", "deterrence", "restitution", "rehabilitation", "boundary", "trust", "condemnation", "retribution"];

const BLAME_LANES = {
  future: { index: "A", name: "Future safety", copy: "These responses aim to reduce later harm. Their force must track evidence about risk and effects." },
  repair: { index: "B", name: "Repair and change", copy: "These responses address what was damaged or help make safer participation possible." },
  relationship: { index: "C", name: "Relationship and reliance", copy: "These responses change the terms on which a person or institution will relate, include, or rely." },
  meaning: { index: "D", name: "Public meaning and desert", copy: "Condemnation communicates a social stand. Retribution adds the different claim that suffering itself is fitting." },
};

const BLAME_POLICIES = {
  nonadverse: {
    name: "Protective withdrawal only",
    label: "Only safety restrictions, relevant participation boundaries, and evidence-based withdrawal of trust are justified; I reject consequences imposed to change, repay, denounce, or hurt",
    detail: "I may remove dangerous access, leave a relationship, set conditions on a shared practice, or reduce reliance. I reject deterrent penalties, forced repayment, compulsory reform, public censure, and suffering as a goal.",
    implication: "Protection, relationship or institutional boundaries, and evidence-based withdrawal of trust fit; deterrence, restitution, rehabilitation, condemnation, and retribution do not.",
    allowed: ["protection", "boundary", "trust"],
  },
  purpose: {
    name: "Purpose-limited response",
    label: "A burden is justified only as the least harmful effective way to protect, deter, repair, rehabilitate, coordinate, or maintain justified boundaries and trust",
    detail: "The response needs evidence, a named beneficiary and goal, proportional limits, review, and a stopping rule. Pain counts as a cost, never as the point.",
    implication: "Every purpose-based response can fit, but retributive suffering cannot because it treats pain as fitting apart from a further goal.",
    allowed: BLAME_RESPONSE_ORDER.filter((id) => id !== "retribution"),
  },
  protest: {
    name: "Purpose plus moral protest",
    label: "Purpose-limited consequences are justified, and accurate public condemnation can also express protest and affirm a shared standard without making suffering the goal",
    detail: "A response may protect, repair, change behavior, revise trust, or communicate rejection. Any social pain must remain a constrained side effect rather than deserved payback.",
    implication: "Every purpose-based response, including proportionate public condemnation, can fit; retributive suffering still does not.",
    allowed: BLAME_RESPONSE_ORDER.filter((id) => id !== "retribution"),
  },
  desert: {
    name: "Desert-permitting response",
    label: "Some knowing wrongdoers can deserve blame or suffering simply because of what they did, even when the response serves no protective, reparative, or social purpose",
    detail: "Human purposes may also matter, but in at least some cases deserved suffering supplies an independent reason to impose pain or loss.",
    implication: "All eight response types can fit because this policy expressly reintroduces the basic-desert claim that the lab initially removes.",
    allowed: BLAME_RESPONSE_ORDER,
  },
};

const BLAME_POLICY_ORDER = ["nonadverse", "purpose", "protest", "desert"];

function blamePolicyQuestion(id, phase, axis) {
  return {
    id,
    kind: "policy",
    phase,
    axis,
    prompt: "What could justify deliberately giving a person an unwanted burden after they knowingly caused serious harm?",
    context:
      "Assume the facts are reliable and the person caused the harm as described. An unwanted burden includes forced repayment, lost access, confinement, mandatory programs, public censure, or deliberately inflicted pain. Choose the broad rule you would use before seeing the cases; you will answer the same question again afterward.",
    assumptions:
      "The question is about justification, not whether anger is understandable or whether a response is legal. A burden may have several effects, but your policy must say whether suffering can ever be part of the goal rather than a cost to reduce.",
    scope:
      "Choose the broadest response policy you accept. Do not choose a sentence length, diagnose a person, or assume that a useful purpose automatically permits any amount of force.",
    why: "Repeating the policy lets the result compare your general rule with the exact work you ask consequences to perform in six cases.",
    guide: {
      plain: "Ask whether you would only protect your own participation, allow carefully limited responses for human purposes, add public protest, or also accept suffering simply because it is deserved.",
      separate: "A response can predictably hurt without pain being its purpose. A retributive response says the pain itself can be fitting even when it changes nothing else.",
      reveal: "Your choice sets the boundary used later to identify precise policy mismatches and any return of basic desert.",
    },
    choices: BLAME_POLICY_ORDER.map((policy) => ({ id: policy, ...BLAME_POLICIES[policy] })),
  };
}

const BLAME_CASES = [
  {
    id: "airgarden",
    kind: "case",
    phase: "Test the response",
    axis: "Case 1 of 6 · The air-garden sabotage",
    title: "The air-garden sabotage",
    prompt: "What is the strongest reason to impose a consequence on Venn after he knowingly endangered the orbital city?",
    context:
      "Venn disabled a backup oxygen garden for six hours so the city would buy an expensive filter design owned by his family. Forty-two residents were hospitalized before engineers restored the garden. Venn planned the failure, understood the danger, and was not threatened or impaired. He admits the facts but says he would do it again if his family needed the money. He still knows the access codes for three life-support systems.",
    assumptions:
      "The evidence meets the city’s highest proof standard. Every offered response follows a public hearing and may be reviewed. Medical costs and repair losses are known. Experts can measure Venn’s future access risk, evaluate training, and remove his system credentials without adding physical hardship.",
    scope:
      "Choose the one primary purpose that should determine the response now. Other purposes may also matter, but do not combine them and do not choose the harshest available action.",
    why: "The same conduct can support safety, prevention, repair, change, distrust, protest, or retribution. Naming one purpose reveals what would set the response’s limit.",
    file: ["Planned and informed", "42 residents hospitalized", "Current system access remains"],
    guide: {
      plain: "Venn clearly did it and may still have the ability and willingness to repeat it. The question is what work the consequence should do.",
      separate: "Removing access because he is risky, requiring payment because he caused costs, and adding hardship because he deserves pain can happen together but are not the same justification.",
      reveal: "Your answer identifies the response you prioritize when evidence of past agency and present danger are both strong.",
    },
    choices: [
      {
        id: "protection", response: "protection",
        label: "Remove Venn’s life-support access now and review the restriction at fixed intervals against current evidence of risk",
        detail: "The restriction lasts only while his access creates a serious danger; the city must use a less restrictive role if one can protect residents equally well.",
      },
      {
        id: "deterrence", response: "deterrence",
        label: "Apply the published credential penalty that evidence shows is enough to discourage future sabotage by Venn and other engineers",
        detail: "The penalty cannot exceed the supported preventive effect, and the city must abandon it if a less burdensome rule deters equally well.",
      },
      {
        id: "restitution", response: "restitution",
        label: "Use Venn’s filter profits and an affordable payment plan to cover identified medical and repair costs created by the sabotage",
        detail: "The demand tracks documented losses and unfair gains; it does not include an extra amount merely to make repayment feel painful.",
      },
      {
        id: "rehabilitation", response: "rehabilitation",
        label: "Require a supervised safety-and-decision program with measurable standards and a real route back to noncritical engineering work",
        detail: "The program aims at safer judgment and participation, receives independent review, and cannot continue after its stated change targets are met.",
      },
      {
        id: "trust", response: "trust",
        label: "Withdraw reliance on Venn for unsupervised critical systems while allowing him to rebuild that specific trust through verified conduct",
        detail: "The distrust applies to system access shown unsafe by the sabotage; it does not declare him permanently unreliable in every role and relationship.",
      },
      {
        id: "condemnation", response: "condemnation",
        label: "Publish an accurate finding that names the sabotage, its effects, and the city’s rejection of using life support as leverage",
        detail: "The statement informs residents and defends a public boundary without inviting harassment or turning Venn into a permanent dehumanizing label.",
      },
      {
        id: "retribution", response: "retribution",
        label: "Add a period of deliberately harsh confinement because Venn deserves to suffer for the danger he knowingly created",
        detail: "The added hardship is not needed for access control, deterrence, repayment, rehabilitation, distrust, or public information; suffering is part of the point.",
      },
    ],
  },
  {
    id: "memory",
    kind: "case",
    phase: "Test the response",
    axis: "Case 2 of 6 · The friend with your backup",
    title: "The friend with your backup",
    prompt: "After Lio sells one private memory, what is the strongest reason for the response his friend and community choose?",
    context:
      "Mara gave her closest friend Lio an encrypted backup of her memories for emergency safekeeping. Lio secretly sold one vivid childhood memory to a gallery. Ten thousand visitors experienced it before the gallery deleted every copy. Lio spent the payment. Mara feels exposed and no longer wants him near any private record. Lio admits that he planned the sale and understood that she had never consented.",
    assumptions:
      "No copy remains and Lio has no technical access to another archive, so there is no present digital danger. The amount earned and Mara’s counseling costs are documented. Lio asks to remain in their shared memory-cooperative and says he will accept clear conditions. The question is not about criminal sentencing.",
    scope:
      "Choose the primary reason for the next response by Mara or the voluntary cooperative. Distinguish repairing the loss, changing participation terms, revising trust, public protest, reform, and suffering as payback.",
    why: "A betrayal can alter money, membership, trust, public norms, and the possibility of reconciliation. Those effects should not be compressed into one vague instruction to blame harder.",
    file: ["One memory sold knowingly", "No copy or access remains", "Repair costs are known"],
    guide: {
      plain: "The leak is over, but the financial loss, relationship, trust, and cooperative rules still need a response.",
      separate: "Ending a friendship sets Mara’s boundary. Removing archive access tracks trust. Requiring payment repairs a loss. Publicly naming the act serves a group-level purpose.",
      reveal: "Your choice shows which part of blame you preserve when immediate danger has already ended.",
    },
    choices: [
      {
        id: "restitution", response: "restitution",
        label: "Require Lio to return the sale proceeds and repay Mara’s documented recovery costs through a workable payment plan",
        detail: "The amount tracks the gain and loss produced by the sale; it is not increased to make Lio hurt after Mara’s costs are repaired.",
      },
      {
        id: "rehabilitation", response: "rehabilitation",
        label: "Offer a structured consent-and-privacy program before Lio can hold any safeguarding role in the cooperative again",
        detail: "The program has specific skills to demonstrate and a route back; it is not indefinite compulsory treatment disguised as education.",
      },
      {
        id: "boundary", response: "boundary",
        label: "Mara may end the friendship or require defined conditions for further contact because she will not continue it on the old terms",
        detail: "This governs Mara’s participation in that relationship and does not claim that every other person must isolate Lio forever.",
      },
      {
        id: "trust", response: "trust",
        label: "Remove Lio from access to private archives because the planned sale is direct evidence against trusting him with that role",
        detail: "The change is limited to privacy-sensitive access and can be reviewed if strong new evidence of reliability appears over time.",
      },
      {
        id: "condemnation", response: "condemnation",
        label: "Tell cooperative members exactly what Lio did and publicly reject the sale of a person’s memory without consent",
        detail: "The disclosure protects necessary privacy details, corrects misinformation, and communicates the standard without organizing harassment.",
      },
      {
        id: "retribution", response: "retribution",
        label: "Arrange an additional humiliating loss for Lio because betrayal makes suffering fitting even after repair and access removal",
        detail: "The humiliation adds no protection, repayment, learning, boundary, trust adjustment, or useful public message; deserved pain is the reason.",
      },
    ],
  },
  {
    id: "rescuehoax",
    kind: "case",
    phase: "Test the response",
    axis: "Case 3 of 6 · The rescue that never happened",
    title: "The rescue that never happened",
    prompt: "What should be the primary purpose of responding to Sera’s profitable rescue hoax?",
    context:
      "Sera built a huge audience by streaming the supposed rescue of a child from a flooded district. The child, flood footage, and emergency calls were fabricated. Viewers donated $900,000 to Sera’s “recovery fund,” and real relief groups lost donations during the campaign. Sera knew the story was false. Investigators can recover most of the money, and the platform must decide how to respond.",
    assumptions:
      "The finding is proven after an independent appeal. Sera no longer controls the money or a donation page. Research on this platform shows that clear fraud notices reduce copycat fundraising, while extreme penalties add no further deterrent effect. Sera’s private family information is irrelevant and remains protected.",
    scope:
      "Choose the single purpose that should lead the response. Do not assume that banning an account, removing a badge, correcting the record, repaying donors, and making Sera suffer are interchangeable actions.",
    why: "Public deception creates losses, platform conditions, reliance failures, copied behavior, and a damaged public record. Each supports a different response and limit.",
    file: ["The rescue was fabricated", "$900,000 was collected", "Extreme penalties add no deterrence"],
    guide: {
      plain: "The danger is no longer an active donation page. The remaining work concerns money, future copying, platform membership, public trust, and the record.",
      separate: "Returning donations repairs. Removing a verification badge changes reliance. A fraud notice informs and condemns. A proven penalty can deter. Extra pain is retribution.",
      reveal: "Your answer shows what you prioritize in a public wrong with many victims but no remaining immediate physical danger.",
    },
    choices: [
      {
        id: "deterrence", response: "deterrence",
        label: "Apply the evidence-backed account restriction and fraud notice that reduce copycat campaigns, but reject extra severity with no added effect",
        detail: "The response is calibrated to measured prevention rather than outrage, spectacle, or the largest punishment the platform can impose.",
      },
      {
        id: "restitution", response: "restitution",
        label: "Return recovered donations and assign remaining proceeds toward the relief groups whose documented fundraising was displaced",
        detail: "The transfer follows identifiable donor losses and diverted benefits; it does not add unrelated costs just to worsen Sera’s life.",
      },
      {
        id: "boundary", response: "boundary",
        label: "Condition any future platform membership on transparent sponsorships, no personal fundraising, and independent identity checks",
        detail: "The platform states the terms of participating in its service and gives Sera a clear choice whether to return under those terms.",
      },
      {
        id: "trust", response: "trust",
        label: "Remove Sera’s verification badge and donation privileges because the hoax is evidence against relying on her in those specific roles",
        detail: "The platform narrows access tied to the demonstrated deception and leaves unrelated private relationships and abilities unjudged.",
      },
      {
        id: "condemnation", response: "condemnation",
        label: "Publish a correction that names the fabricated rescue, centers the donors and relief groups, and rejects manufactured emergency appeals",
        detail: "The statement repairs the public record and communicates a shared rule without exposing irrelevant private facts or inviting abuse.",
      },
      {
        id: "retribution", response: "retribution",
        label: "Add a severe public humiliation after every dollar and false claim is corrected because Sera deserves to suffer for the manipulation",
        detail: "The added humiliation has no preventive, reparative, membership, trust, or informational purpose; making her hurt is treated as fitting.",
      },
    ],
  },
  {
    id: "pilot",
    kind: "case",
    phase: "Test the response",
    axis: "Case 4 of 6 · The rebuilt pilot",
    title: "The rebuilt pilot",
    prompt: "Three years after Oren’s reckless crash, what should now control the community’s response?",
    context:
      "Oren hid severe fatigue so he could pilot a solar race and win a contract. He crashed into a service dock, injuring two workers. Three years later, he has completed an independently evaluated sleep-treatment and decision program, disclosed every record, and flown safely under supervision. Experts now place his flight risk at the ordinary licensed-pilot level. Part of the workers’ financial loss remains unpaid.",
    assumptions:
      "Oren knowingly broke the fatigue rule at the time of the crash. The current risk and program results are reliable. The workers choose not to reconcile personally, and no one pressures them. The old crash remains a public fact. The question concerns Oren’s present license and unfinished response, not whether the past act occurred.",
    scope:
      "Choose the primary purpose that should govern what happens now. Pay attention to which facts have changed, which loss remains, and which response should end when its reason has been satisfied.",
    why: "Past conduct stays fixed while danger, skills, trust evidence, unpaid loss, and relationships can change. A purpose-based response must update when its purpose updates.",
    file: ["Past rule-breaking was knowing", "Current risk equals ordinary pilots", "Some victim loss remains unpaid"],
    guide: {
      plain: "Oren caused the crash, but the evidence says his present risk and skills have changed. Some repair is still unfinished.",
      separate: "A safety restriction should track current danger. Distrust should track current reliability. Restitution tracks remaining loss. The historical record does not require permanent exclusion.",
      reveal: "Your choice shows whether your response can change when the person changes while the past remains true.",
    },
    choices: [
      {
        id: "protection", response: "protection",
        label: "End any special safety restriction now that current risk matches other pilots, while keeping the ordinary monitoring applied to everyone",
        detail: "Protection cannot justify a special burden after the evidence-based danger that supported it has fallen to the normal licensed level.",
      },
      {
        id: "restitution", response: "restitution",
        label: "Focus the remaining requirement on a realistic plan to complete payment for the workers’ documented financial losses",
        detail: "The unfinished loss still supports repair even though current flight risk has changed and personal reconciliation remains optional.",
      },
      {
        id: "rehabilitation", response: "rehabilitation",
        label: "Recognize that the measured program goals have been met and replace compulsory rehabilitation with voluntary continued support",
        detail: "A change-focused program needs a real end point; keeping it compulsory after success would require a new purpose and evidence.",
      },
      {
        id: "trust", response: "trust",
        label: "Restore flight responsibility in stages because three years of verified conduct now supports limited, evidence-based reliance",
        detail: "Trust can return by degree without requiring the injured workers to reconcile or anyone to pretend the original deception did not occur.",
      },
      {
        id: "condemnation", response: "condemnation",
        label: "Keep an accurate public record that condemns the past fatigue deception without describing Oren as permanently unsafe today",
        detail: "The community can preserve the lesson and the victims’ history while correcting any present claim that the old risk remains unchanged.",
      },
      {
        id: "retribution", response: "retribution",
        label: "Continue a painful license ban after ordinary risk, rehabilitation, and public-record needs are satisfied because the crash still deserves suffering",
        detail: "The continuing pain is not needed for safety, repair, change, trust, or accurate public memory; past desert is treated as enough.",
      },
    ],
  },
  {
    id: "nurse",
    kind: "case",
    phase: "Test the response",
    axis: "Case 5 of 6 · The threatened night nurse",
    title: "The threatened night nurse",
    prompt: "Which purpose should guide the response to Imani’s coerced act and her later uncoerced concealment?",
    context:
      "A gang credibly threatened to kill Imani’s child unless she diverted six emergency medicine packs during a night shift. She diverted them while under surveillance. The threat ended the next morning, but fear and shame kept her from reporting the loss for another forty-eight hours. One patient’s treatment was delayed. Imani then reported everything, helped recover the remaining packs, and supplied evidence against the gang.",
    assumptions:
      "The threat was real and immediate during the diversion. Imani could safely report during the later forty-eight hours, understood the delay risk, and chose not to. Trauma specialists can evaluate support needs. The patient’s added costs are known. The gang—not Imani—creates the continuing violent danger.",
    scope:
      "Choose the primary purpose for responding to Imani, not the gang. The response must distinguish the coerced diversion from the later concealment and may not assume that one label explains both periods.",
    why: "Agency can differ across parts of one event. Even without basic desert, protection, repair, reform, boundaries, trust, and public explanation should track those differences.",
    file: ["The diversion was coerced", "The later concealment was not", "The gang remains the violent threat"],
    guide: {
      plain: "Imani had almost no safe choice during the theft, but she had a safer choice during the later delay. The response should not flatten those facts.",
      separate: "Protecting the hospital from the gang, repairing patient costs, changing reporting support, and revising Imani’s access each need their own evidence and target.",
      reveal: "Your answer shows how carefully a purpose-based system tracks coercion, later agency, current danger, and possible return to trust.",
    },
    choices: [
      {
        id: "protection", response: "protection",
        label: "Protect staff and medicine access from the gang while placing only the least restrictive temporary safeguard on Imani’s unsupervised access",
        detail: "The response targets the actual violent source and reviews Imani’s narrower reporting risk rather than treating her as the gang’s equivalent.",
      },
      {
        id: "restitution", response: "restitution",
        label: "Use recovered assets and institutional funds to cover the patient’s added costs, assigning Imani only the repair share supported by her later delay",
        detail: "Repair follows causal contribution and capacity without pretending that coerced and uncoerced conduct carried the same control.",
      },
      {
        id: "rehabilitation", response: "rehabilitation",
        label: "Offer trauma care and practice with safe rapid-reporting routes before Imani again works alone with emergency inventory",
        detail: "The plan addresses the condition and skill linked to the concealment, uses measurable goals, and provides a route back to ordinary work.",
      },
      {
        id: "boundary", response: "boundary",
        label: "State that continued emergency-inventory work requires immediate safe reporting once a threat ends, with protected channels the hospital must provide",
        detail: "The condition governs that defined role and also commits the institution to make compliance realistically safe for threatened staff.",
      },
      {
        id: "trust", response: "trust",
        label: "Use temporary supervised inventory access because the concealment bears on that specific trust, then review it using later conduct",
        detail: "The change is narrow, revisable, and based on the uncoerced delay rather than a permanent judgment about Imani’s whole character.",
      },
      {
        id: "condemnation", response: "condemnation",
        label: "Publish an anonymized finding that condemns the gang’s coercion and explains why the later reporting delay still created avoidable risk",
        detail: "The statement preserves the two agency conditions, informs staff, protects Imani’s unnecessary private details, and avoids a false simple villain story.",
      },
      {
        id: "retribution", response: "retribution",
        label: "Add humiliation for Imani because involvement in the loss makes her deserve suffering beyond every protective, reparative, or work-related response",
        detail: "The added pain deliberately ignores the split in control and is not needed for safety, repair, change, boundaries, trust, or public understanding.",
      },
    ],
  },
  {
    id: "quota",
    kind: "case",
    phase: "Test the response",
    axis: "Case 6 of 6 · The invisible quota",
    title: "The invisible quota",
    prompt: "After a fatal factory failure, what should the inquiry make its primary response across the worker, managers, and company?",
    context:
      "A battery company secretly ranked supervisors by how often they kept the line running after a safety alarm. Jae, a shift supervisor, silenced three alarms because every supervisor who stopped production had been fired. The third alarm preceded an explosion that killed a technician. Executives approved the ranking system but never touched the alarm panel. Jae understood the danger, and the executives understood how the quota changed supervisors’ behavior.",
    assumptions:
      "The facts are proven. Jae had a legal route to stop work but faced a serious job threat; executives faced no comparable pressure. Engineers can remove the quota and automate shutdowns. The technician’s family has documented losses. Several firms are considering copying the ranking system unless the result is made public.",
    scope:
      "Choose the primary purpose for the inquiry’s response to the whole causal system. Do not assign all responsibility to the nearest hand or assume that a corporation can literally feel suffering.",
    why: "A systems failure requires separate attention to immediate danger, incentives, repair, organizational change, contracts, public warning, and any claim that one person deserves pain.",
    file: ["Jae silenced the alarms", "Executives designed the incentive", "Other firms may copy it"],
    guide: {
      plain: "Jae made a dangerous choice under job pressure; executives built the pressure; the company can redesign the system. The response needs the right target.",
      separate: "Protection changes the machine. Deterrence changes incentives. Restitution addresses the family. Rehabilitation changes practice. Retribution asks who should suffer for the past.",
      reveal: "Your answer shows whether blame follows the visible individual, the causal architecture, the injured people, the future system, or deserved suffering.",
    },
    choices: [
      {
        id: "protection", response: "protection",
        label: "Suspend the unsafe line, remove the ranking quota, and require automatic shutdowns before production resumes",
        detail: "The restriction targets the proven danger and ends when independently verified safeguards reduce the risk to the public standard.",
      },
      {
        id: "deterrence", response: "deterrence",
        label: "Apply evidence-backed penalties to the executives and company decision-makers who could change the incentive system other firms may copy",
        detail: "The response targets people and policies that can affect later conduct and rejects extra severity that produces no additional prevention.",
      },
      {
        id: "restitution", response: "restitution",
        label: "Require the company to replace the family’s documented income, care, and recovery costs rather than treating a fine to the state as repair",
        detail: "The transfer centers the people carrying the loss and remains separate from any added hardship intended as punishment.",
      },
      {
        id: "rehabilitation", response: "rehabilitation",
        label: "Redesign supervisor training, protected stop-work channels, incentives, and audits so safe action is understood and realistically possible",
        detail: "The intervention changes the environment and practice that produced the failure, with measurable requirements before the line can reopen.",
      },
      {
        id: "boundary", response: "boundary",
        label: "Condition licenses and public contracts on independently audited stop-work rights and a ban on penalties for responding to alarms",
        detail: "The public institutions state the terms for participating in their contracts and markets, with notice, evidence, and an appeal route.",
      },
      {
        id: "condemnation", response: "condemnation",
        label: "Publish the full causal finding, naming Jae’s choice, the executives’ quota, and the technician’s death without hiding behind one scapegoat",
        detail: "The record warns other firms, recognizes the victim, and condemns each role accurately without inviting private harassment.",
      },
      {
        id: "retribution", response: "retribution",
        label: "Choose the person judged most blameworthy and add suffering because someone must pay in pain for the technician’s death",
        detail: "The pain is not required to change the line, incentives, losses, training, contracts, or public record; payback supplies the point.",
      },
    ],
  },
];

const BLAME_ZERO_CONTROL = {
  id: "zero",
  kind: "control",
  phase: "Isolate basic desert",
  axis: "Control case · The silent minute",
  title: "The silent minute",
  prompt: "When one minute of pain can serve no one and change nothing, should the state cause it anyway?",
  context:
    "Sol knowingly set a fatal fire years ago. Now every safety restriction, deterrent announcement, victim payment, public finding, trust decision, and rehabilitation process is complete. Sol is already isolated by an unrelated medical emergency and will die naturally in one hour. A machine can cause one minute of severe pain without changing that outcome. Only Sol will know whether it was activated.",
  assumptions:
    "The pain cannot protect, deter, repair, rehabilitate, set a boundary, revise trust, communicate with the public, comfort another person, produce knowledge, or change future conduct. Refusing it will not weaken any institution or alter anyone’s expectations. Activating it has no hidden benefit.",
  scope:
    "Decide only whether a basic-desert claim supplies a reason to activate the machine. Do not add a missing human purpose or change the stipulated facts.",
  why: "The control removes every purpose measured in the six cases. Choosing pain isolates the claim that suffering is fitting simply because Sol deserves it.",
  file: ["Every human purpose is complete", "Only Sol will know", "Pain changes no outcome"],
  guide: {
    plain: "This is intentionally artificial. Its job is to remove every effect except the pain itself.",
    separate: "Wanting a public condemnation, a repaired loss, or a safer future does not answer this case because all of those tasks are already complete.",
    reveal: "Your choice shows whether you accept, reject, or remain unsure about suffering that rests on basic desert alone.",
  },
  choices: [
    {
      id: "refuse",
      name: "Refuse the pain",
      label: "Do not activate the machine; with every human purpose removed, the extra suffering has no justification I accept",
      detail: "Sol’s past act remains real and condemnable, but pain is treated as a cost rather than a fitting good in itself.",
    },
    {
      id: "desert",
      name: "Activate for desert",
      label: "Activate the machine because Sol deserves some suffering for the fire even though the minute helps no one and changes nothing",
      detail: "This is the pure basic-desert claim: the past act makes pain fitting apart from every future, reparative, relational, or expressive purpose.",
    },
    {
      id: "uncertain",
      name: "Desert remains unsettled",
      label: "I cannot decide until I know whether basic desert is real; none of the ordinary human purposes can settle this case",
      detail: "This answer correctly identifies the missing premise and suspends judgment instead of inventing a practical benefit.",
    },
  ],
};

const BLAME_QUESTIONS = [
  blamePolicyQuestion("opening", "Set your response policy", "Opening policy · Before the cases"),
  ...BLAME_CASES,
  BLAME_ZERO_CONTROL,
  blamePolicyQuestion("final", "Reconsider your policy", "Final policy · After the control"),
];

const blameState = { index: 0, opening: null, final: null, zero: null, answers: {} };

function blameQuestionAt(index) {
  return BLAME_QUESTIONS[index];
}

function blameSelectedId(question, state = blameState) {
  if (question.kind === "policy") return state[question.id];
  if (question.kind === "control") return state.zero;
  return state.answers[question.id];
}

function blameChoice(question, id) {
  return question.choices.find((choice) => choice.id === id);
}

function blameResponseProfile(state, answeredOnly = false) {
  const cases = answeredOnly ? BLAME_CASES.filter((question) => state.answers[question.id]) : BLAME_CASES;
  return BLAME_RESPONSE_ORDER.map((id) => {
    const response = BLAME_RESPONSES[id];
    const offered = cases.filter((question) => question.choices.some((choice) => choice.response === id)).length;
    const selected = cases.filter((question) => blameChoice(question, state.answers[question.id])?.response === id).length;
    return { id, ...response, offered, selected, rate: offered ? Math.round((selected / offered) * 100) : 0 };
  });
}

function blamePolicyMismatches(state) {
  if (!state.final) return [];
  const policy = BLAME_POLICIES[state.final];
  const allowed = new Set(policy.allowed);
  const mismatches = BLAME_CASES.flatMap((question) => {
    const choice = blameChoice(question, state.answers[question.id]);
    if (!choice || allowed.has(choice.response)) return [];
    return [{
      id: question.id,
      title: question.title,
      response: choice.response,
      text: `Your final ${policy.name.toLowerCase()} does not include ${BLAME_RESPONSES[choice.response].name.toLowerCase()}, which you selected in “${question.title}.” Broaden the policy or restate that case on a response the policy permits.`,
    }];
  });
  if (state.zero === "desert" && state.final !== "desert") {
    mismatches.push({
      id: "zero",
      title: BLAME_ZERO_CONTROL.title,
      response: "retribution",
      text: `You activated pain for basic desert in “${BLAME_ZERO_CONTROL.title},” while your final ${policy.name.toLowerCase()} denies suffering as an independent goal. One of those two boundaries needs revision.`,
    });
  }
  return mismatches;
}

function blameDiagnostic(state) {
  const profile = blameResponseProfile(state);
  const topRate = Math.max(...profile.map((response) => response.rate));
  const primary = profile.filter((response) => response.rate === topRate && response.selected > 0);
  const retributionCount = profile.find((response) => response.id === "retribution").selected;
  const purposeCount = BLAME_CASES.length - retributionCount;
  const desertReentries = retributionCount + (state.zero === "desert" ? 1 : 0);
  const mismatches = blamePolicyMismatches(state);
  const opening = BLAME_POLICIES[state.opening];
  const final = BLAME_POLICIES[state.final];
  const changed = state.opening !== state.final;
  let title = "You kept consequences tied to stated human purposes.";
  if (desertReentries) title = desertReentries === 1 ? "Basic desert entered one part of your response." : "Basic desert re-entered several responses.";
  if (state.zero === "uncertain" && !retributionCount) title = "You preserved human purposes and left pure desert unsettled.";
  const summary = `${purposeCount} of your 6 case answers selected a purpose other than retributive suffering. ${state.zero === "refuse" ? "In the zero-purpose control, you refused deliberately added pain." : state.zero === "desert" ? "In the zero-purpose control, you accepted pain on basic-desert grounds alone." : "In the zero-purpose control, you identified basic desert as an unresolved premise."} ${mismatches.length ? `${mismatches.length} exact policy mismatch${mismatches.length === 1 ? " needs" : "es need"} clarification.` : "Every case response fits the boundary of your final policy."}`;
  return { profile, primary, retributionCount, purposeCount, desertReentries, mismatches, opening, final, changed, title, summary };
}

function buildBlameAIProbePrompt(state) {
  const diagnostic = blameDiagnostic(state);
  const zeroChoice = blameChoice(BLAME_ZERO_CONTROL, state.zero);
  const lines = [
    "You are conducting a careful interview about blame after basic-desert suffering is removed. Ask one focused question at a time and wait for my answer.",
    "",
    "METHOD AND GUARDRAILS",
    "- Do not assume that moral non-realism, determinism, free will skepticism, or skepticism about basic desert automatically implies any of the others.",
    "- Keep causal responsibility, intentional action, answerability, current dangerousness, repair duties, trust, public protest, and intrinsic desert separate.",
    "- For every adverse response, ask: What exact human purpose does it serve? What evidence supports that effect? Who benefits and who bears the burden? What less harmful option could work? When must it end?",
    "- Do not equate protection with punishment, withdrawal of trust with hatred, public condemnation with harassment, rehabilitation with coercive control, or restitution with revenge.",
    "- Do not infer that any amount of force is justified merely because some benefit is predicted. Require due process, proportionality, least-restrictive means, review, and safeguards against bias.",
    "- Treat retributive suffering precisely: pain or loss imposed because it is fitting for the past act, apart from protection, deterrence, repair, rehabilitation, boundaries, trust, or public communication.",
    "- Do not call a mixture of purposes incoherent by itself. Flag only a precise conflict about purpose, target, scope, evidence, or stopping rule.",
    "- Treat a change between my opening and final policies as a possible revision, not an automatic error.",
    "",
    "LAB PREMISE",
    "For the exercise, no approval-independent moral fact makes suffering deserved simply because of a past act. I was still allowed to reject that premise by selecting retribution or activating the zero-purpose pain.",
    "",
    "MY GENERAL POLICIES",
    `Opening: ${diagnostic.opening.label}`,
    `Opening meaning: ${diagnostic.opening.detail}`,
    `Final: ${diagnostic.final.label}`,
    `Final meaning: ${diagnostic.final.detail}`,
    `Change: ${diagnostic.changed ? "I changed my policy after the cases." : "I kept the same policy."}`,
    "",
    "MY SIX CASE ANSWERS",
  ];
  BLAME_CASES.forEach((question, index) => {
    const choice = blameChoice(question, state.answers[question.id]);
    const response = BLAME_RESPONSES[choice.response];
    lines.push(
      "",
      `${index + 1}. ${question.title}`,
      `Full situation: ${question.context}`,
      `Fixed facts: ${question.assumptions}`,
      `Question scope: ${question.scope}`,
      `My response: ${choice.label}`,
      `Response meaning: ${choice.detail}`,
      `Primary type: ${response.name}`,
      `What it can justify: ${response.justifies}`,
      `Required safeguard: ${response.safeguard}`,
    );
  });
  lines.push(
    "",
    "ZERO-PURPOSE CONTROL",
    `Full situation: ${BLAME_ZERO_CONTROL.context}`,
    `Fixed facts: ${BLAME_ZERO_CONTROL.assumptions}`,
    `Scope: ${BLAME_ZERO_CONTROL.scope}`,
    `My answer: ${zeroChoice.label}`,
    `Answer meaning: ${zeroChoice.detail}`,
    "",
    "EIGHT-RESPONSE PROFILE (selected / offered; not a moral score)",
  );
  diagnostic.profile.forEach((response) => lines.push(`- ${response.name}: ${response.selected} / ${response.offered} (${response.rate}%)`));
  lines.push(
    "",
    `Purpose-based case answers: ${diagnostic.purposeCount} / 6`,
    `Retributive case answers: ${diagnostic.retributionCount} / 6`,
    `Desert re-entries including the control: ${diagnostic.desertReentries}`,
    "",
    "EXACT POLICY MISMATCHES",
  );
  if (diagnostic.mismatches.length) diagnostic.mismatches.forEach((mismatch) => lines.push(`- ${mismatch.text}`));
  else lines.push("- None detected by the lab’s compatibility rule. Still test whether each purpose has evidence, a proper target, a limit, and an end point.");
  lines.push(
    "",
    "INTERVIEW TASK",
    "Begin with the response whose purpose or stopping rule is least clear. Test one case at a time. If I chose protection, ask what present risk keeps the restriction in place. For deterrence, ask what evidence shows the response works. For restitution, identify the loss and recipient. For rehabilitation, identify the change target and exit. For a boundary, identify whose participation it governs. For distrust, identify the exact reliance and evidence for revision. For condemnation, identify the audience, message, privacy limit, and whether social pain has become the hidden goal. For retribution, remove every other purpose and ask what makes suffering fitting. End with a concise map of what responsibility practices I retain, what I reject, and which claims still need defense.",
  );
  return lines.join("\n");
}

const blameEls = {
  liveStatus: document.querySelector("#blameLiveStatus"),
  workspace: document.querySelector("#blameLab"),
  phase: document.querySelector("#blamePhase"),
  progress: document.querySelector("#blameProgress"),
  progressTrack: document.querySelector("#blameProgressTrack"),
  progressBar: document.querySelector("#blameProgressBar"),
  number: document.querySelector("#blameQuestionNumber"),
  axis: document.querySelector("#blameQuestionAxis"),
  prompt: document.querySelector("#blameQuestionPrompt"),
  caseFile: document.querySelector("#blameCaseFile"),
  context: document.querySelector("#blameQuestionContext"),
  assumptions: document.querySelector("#blameAssumptions"),
  scope: document.querySelector("#blameScope"),
  explanation: document.querySelector("#blameExplanation"),
  plain: document.querySelector("#blamePlain"),
  separate: document.querySelector("#blameSeparate"),
  reveal: document.querySelector("#blameReveal"),
  choices: document.querySelector("#blameChoices"),
  back: document.querySelector("#blameBackButton"),
  next: document.querySelector("#blameNextButton"),
  why: document.querySelector("#blameWhy"),
  casesCount: document.querySelector("#blameCasesCount"),
  purposeCount: document.querySelector("#blamePurposeCount"),
  desertCount: document.querySelector("#blameDesertCount"),
  mapBasis: document.querySelector("#blameMapBasis"),
  livePurposes: document.querySelector("#blameLivePurposes"),
  results: document.querySelector("#blameResults"),
  resultTitle: document.querySelector("#blameResultTitle"),
  resultSummary: document.querySelector("#blameResultSummary"),
  primaryPurpose: document.querySelector("#blamePrimaryPurpose"),
  primaryCopy: document.querySelector("#blamePrimaryCopy"),
  purposeResult: document.querySelector("#blamePurposeResult"),
  purposeCopy: document.querySelector("#blamePurposeCopy"),
  policyShift: document.querySelector("#blamePolicyShift"),
  policyCopy: document.querySelector("#blamePolicyCopy"),
  laneGrid: document.querySelector("#blameLaneGrid"),
  caseGrid: document.querySelector("#blameCaseGrid"),
  zeroAnswer: document.querySelector("#blameZeroAnswer"),
  zeroCopy: document.querySelector("#blameZeroCopy"),
  alignmentGrid: document.querySelector("#blameAlignmentGrid"),
  aiPrompt: document.querySelector("#blameAIProbePrompt"),
  copyStatus: document.querySelector("#blamePromptCopyStatus"),
};

function createBlameChoice(question, choice, selected) {
  const label = document.createElement("label");
  label.className = `blame-choice${selected ? " selected" : ""}`;
  const input = document.createElement("input");
  input.type = "radio";
  input.name = `blame-${question.id}`;
  input.value = choice.id;
  input.checked = selected;
  const body = document.createElement("span");
  const marker = document.createElement("small");
  marker.textContent = question.kind === "case" ? BLAME_RESPONSES[choice.response].name : choice.name;
  const title = document.createElement("strong");
  title.textContent = choice.label;
  const detail = document.createElement("em");
  detail.textContent = choice.detail;
  body.append(marker, title, detail);
  label.append(input, body);
  input.addEventListener("change", () => {
    if (question.kind === "policy") blameState[question.id] = choice.id;
    else if (question.kind === "control") blameState.zero = choice.id;
    else blameState.answers[question.id] = choice.id;
    renderBlameQuestion();
    blameEls.liveStatus.textContent = `${marker.textContent} selected.`;
  });
  return label;
}

function renderBlameCaseFile(question) {
  blameEls.caseFile.replaceChildren();
  if (!question.file) {
    blameEls.caseFile.classList.add("hidden");
    return;
  }
  blameEls.caseFile.classList.remove("hidden");
  question.file.forEach((fact) => {
    const span = document.createElement("span");
    span.textContent = fact;
    blameEls.caseFile.append(span);
  });
}

function renderBlameQuestion({ scroll = false } = {}) {
  const question = blameQuestionAt(blameState.index);
  const selected = blameSelectedId(question);
  blameEls.phase.textContent = question.phase;
  blameEls.progress.textContent = `${blameState.index + 1} / ${BLAME_QUESTIONS.length}`;
  blameEls.progressTrack.setAttribute("aria-valuenow", String(blameState.index + 1));
  blameEls.progressBar.style.width = `${((blameState.index + 1) / BLAME_QUESTIONS.length) * 100}%`;
  blameEls.number.textContent = String(blameState.index + 1).padStart(2, "0");
  blameEls.axis.textContent = question.axis;
  blameEls.prompt.textContent = question.prompt;
  blameEls.context.textContent = question.context;
  blameEls.assumptions.textContent = question.assumptions;
  blameEls.scope.textContent = question.scope;
  blameEls.plain.textContent = question.guide.plain;
  blameEls.separate.textContent = question.guide.separate;
  blameEls.reveal.textContent = question.guide.reveal;
  blameEls.explanation.open = false;
  blameEls.why.textContent = question.why;
  renderBlameCaseFile(question);
  blameEls.choices.replaceChildren();
  question.choices.forEach((choice) => blameEls.choices.append(createBlameChoice(question, choice, selected === choice.id)));
  blameEls.back.disabled = blameState.index === 0;
  blameEls.back.classList.toggle("hidden", blameState.index === 0);
  blameEls.next.disabled = !selected;
  if (blameState.index === BLAME_QUESTIONS.length - 1) blameEls.next.textContent = "See the full diagnostic →";
  else if (question.kind === "policy") blameEls.next.textContent = "Enter the six cases →";
  else if (question.id === BLAME_CASES.at(-1).id) blameEls.next.textContent = "Isolate pure desert →";
  else if (question.kind === "control") blameEls.next.textContent = "Reconsider your policy →";
  else blameEls.next.textContent = "Next case →";
  renderBlameLiveMap();
  if (scroll) document.querySelector("#blameQuestionCard").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBlameLiveMap() {
  const answered = BLAME_CASES.filter((question) => blameState.answers[question.id]);
  const profile = blameResponseProfile(blameState, true);
  const desert = profile.find((response) => response.id === "retribution").selected;
  blameEls.casesCount.textContent = `${answered.length} / 6`;
  blameEls.purposeCount.textContent = String(answered.length - desert);
  blameEls.desertCount.textContent = String(desert);
  blameEls.mapBasis.textContent = blameState.opening
    ? `Opening policy: ${BLAME_POLICIES[blameState.opening].name}. The bars count only answered cases.`
    : "Choose your opening policy to begin.";
  blameEls.livePurposes.replaceChildren();
  profile.forEach((response) => {
    const row = document.createElement("div");
    row.className = `blame-live-row${response.id === "retribution" ? " desert" : ""}`;
    const heading = document.createElement("div");
    const name = document.createElement("span");
    name.textContent = response.name;
    const exact = document.createElement("strong");
    exact.textContent = response.offered ? `${response.selected} / ${response.offered}` : "not offered yet";
    heading.append(name, exact);
    const track = document.createElement("i");
    const fill = document.createElement("b");
    fill.style.width = `${response.rate}%`;
    track.append(fill);
    row.append(heading, track);
    blameEls.livePurposes.append(row);
  });
  blameEls.livePurposes.setAttribute(
    "aria-label",
    answered.length ? profile.map((response) => `${response.name}: ${response.selected} selected out of ${response.offered} answered cases where offered`).join("; ") : "No blame responses selected yet",
  );
}

function renderBlameLanes(diagnostic) {
  blameEls.laneGrid.replaceChildren();
  Object.entries(BLAME_LANES).forEach(([laneId, lane]) => {
    const section = document.createElement("section");
    section.className = `blame-lane blame-lane-${laneId}`;
    const header = document.createElement("header");
    const index = document.createElement("span");
    index.textContent = lane.index;
    const heading = document.createElement("h3");
    heading.textContent = lane.name;
    const copy = document.createElement("p");
    copy.textContent = lane.copy;
    header.append(index, heading, copy);
    const list = document.createElement("div");
    diagnostic.profile.filter((response) => response.lane === laneId).forEach((response) => {
      const article = document.createElement("article");
      if (response.id === "retribution") article.className = "desert";
      const top = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = `${response.index} · ${response.name}`;
      const exact = document.createElement("span");
      exact.textContent = `${response.selected} / ${response.offered}`;
      top.append(name, exact);
      const track = document.createElement("i");
      const fill = document.createElement("b");
      fill.style.width = `${response.rate}%`;
      track.append(fill);
      const description = document.createElement("p");
      description.textContent = response.short;
      const safeguard = document.createElement("small");
      safeguard.textContent = `Limit: ${response.safeguard}`;
      article.append(top, track, description, safeguard);
      list.append(article);
    });
    section.append(header, list);
    blameEls.laneGrid.append(section);
  });
}

function renderBlameCases() {
  blameEls.caseGrid.replaceChildren();
  BLAME_CASES.forEach((question, index) => {
    const choice = blameChoice(question, blameState.answers[question.id]);
    const response = BLAME_RESPONSES[choice.response];
    const article = document.createElement("article");
    article.className = `blame-report-card lane-${response.lane}${choice.response === "retribution" ? " desert" : ""}`;
    const meta = document.createElement("span");
    meta.textContent = `${String(index + 1).padStart(2, "0")} · ${response.name}`;
    const heading = document.createElement("h3");
    heading.textContent = question.title;
    const answer = document.createElement("p");
    answer.className = "blame-report-answer";
    answer.textContent = choice.label;
    const dl = document.createElement("dl");
    const reason = document.createElement("div");
    const reasonTerm = document.createElement("dt");
    reasonTerm.textContent = "Can justify";
    const reasonValue = document.createElement("dd");
    reasonValue.textContent = response.justifies;
    reason.append(reasonTerm, reasonValue);
    const limit = document.createElement("div");
    const limitTerm = document.createElement("dt");
    limitTerm.textContent = "Must stop or narrow when";
    const limitValue = document.createElement("dd");
    limitValue.textContent = response.safeguard;
    limit.append(limitTerm, limitValue);
    dl.append(reason, limit);
    article.append(meta, heading, answer, dl);
    blameEls.caseGrid.append(article);
  });
}

function renderBlameZero() {
  const choice = blameChoice(BLAME_ZERO_CONTROL, blameState.zero);
  blameEls.zeroAnswer.textContent = choice.name;
  blameEls.zeroCopy.textContent = `${choice.detail} ${blameState.zero === "desert" ? "Because the case removes every other reason, this answer reintroduces basic-desert suffering in its pure form." : blameState.zero === "refuse" ? "This keeps the lab’s desert-free premise intact even after the past act is held fixed." : "This locates the unresolved issue precisely instead of smuggling in a practical effect the case excludes."}`;
}

function renderBlameAlignment(diagnostic) {
  blameEls.alignmentGrid.replaceChildren();
  const policy = document.createElement("article");
  policy.className = "blame-policy-card";
  const policyLabel = document.createElement("span");
  policyLabel.textContent = "Your final policy";
  const policyHeading = document.createElement("h3");
  policyHeading.textContent = diagnostic.final.name;
  const policyCopy = document.createElement("p");
  policyCopy.textContent = diagnostic.final.implication;
  policy.append(policyLabel, policyHeading, policyCopy);
  blameEls.alignmentGrid.append(policy);
  if (!diagnostic.mismatches.length) {
    const clear = document.createElement("article");
    clear.className = "blame-alignment-clear";
    const label = document.createElement("span");
    label.textContent = "No exact mismatch detected";
    const heading = document.createElement("h3");
    heading.textContent = "Your six responses and control fit your final policy.";
    const copy = document.createElement("p");
    copy.textContent = "Compatibility is not sufficient justification. Every real response still owes evidence, due process, a proper target, proportional limits, and a stopping rule.";
    clear.append(label, heading, copy);
    blameEls.alignmentGrid.append(clear);
    return;
  }
  diagnostic.mismatches.forEach((mismatch) => {
    const article = document.createElement("article");
    article.className = "blame-mismatch-card";
    const label = document.createElement("span");
    label.textContent = "Policy mismatch to resolve";
    const heading = document.createElement("h3");
    heading.textContent = mismatch.title;
    const copy = document.createElement("p");
    copy.textContent = mismatch.text;
    article.append(label, heading, copy);
    blameEls.alignmentGrid.append(article);
  });
}

function showBlameResults() {
  const diagnostic = blameDiagnostic(blameState);
  blameEls.resultTitle.textContent = diagnostic.title;
  blameEls.resultSummary.textContent = diagnostic.summary;
  blameEls.primaryPurpose.textContent = diagnostic.primary.map((response) => response.name).join(" + ");
  blameEls.primaryCopy.textContent = `${diagnostic.primary.map((response) => `${response.selected} / ${response.offered}`).join(" · ")}. This is the highest opportunity-normalized rate, not a complete theory of responsibility.`;
  blameEls.purposeResult.textContent = `${diagnostic.purposeCount} / 6`;
  blameEls.purposeCopy.textContent = diagnostic.retributionCount
    ? `${diagnostic.retributionCount} case answer${diagnostic.retributionCount === 1 ? " treated" : "s treated"} suffering as fitting apart from a further human purpose.`
    : "Every case response named a purpose other than suffering itself. This does not show that its evidence or limits are adequate.";
  blameEls.policyShift.textContent = diagnostic.changed ? `${diagnostic.opening.name} → ${diagnostic.final.name}` : `Kept: ${diagnostic.final.name}`;
  blameEls.policyCopy.textContent = diagnostic.changed
    ? "The cases changed your broad response rule. The diagnostic treats that as a revision to explain, not an automatic contradiction."
    : "You kept the same broad policy before and after the cases. The exact audit below tests whether your applications fit it.";
  renderBlameLanes(diagnostic);
  renderBlameCases();
  renderBlameZero();
  renderBlameAlignment(diagnostic);
  blameEls.aiPrompt.value = buildBlameAIProbePrompt(blameState);
  blameEls.copyStatus.textContent = "The prompt contains your answers but no account information.";
  blameEls.workspace.classList.add("hidden");
  blameEls.results.classList.remove("hidden");
  blameEls.results.scrollIntoView({ behavior: "smooth", block: "start" });
  blameEls.resultTitle.focus({ preventScroll: true });
}

function resetBlameLab() {
  blameState.index = 0;
  blameState.opening = null;
  blameState.final = null;
  blameState.zero = null;
  blameState.answers = {};
  blameEls.results.classList.add("hidden");
  blameEls.workspace.classList.remove("hidden");
  renderBlameQuestion();
  blameEls.workspace.scrollIntoView({ behavior: "smooth", block: "start" });
  blameEls.prompt.focus({ preventScroll: true });
  blameEls.liveStatus.textContent = "Blame Laboratory reset.";
}

async function copyBlamePrompt() {
  try {
    await navigator.clipboard.writeText(blameEls.aiPrompt.value);
    blameEls.copyStatus.textContent = "Prompt copied. Nothing was sent by this site.";
  } catch {
    blameEls.aiPrompt.focus();
    blameEls.aiPrompt.select();
    blameEls.copyStatus.textContent = "Clipboard access was blocked. The prompt is selected so you can copy it manually.";
  }
}

blameEls.back.addEventListener("click", () => {
  if (blameState.index === 0) return;
  blameState.index -= 1;
  renderBlameQuestion({ scroll: true });
  blameEls.prompt.focus({ preventScroll: true });
});

blameEls.next.addEventListener("click", () => {
  const question = blameQuestionAt(blameState.index);
  if (!blameSelectedId(question)) return;
  if (blameState.index === BLAME_QUESTIONS.length - 1) {
    showBlameResults();
    return;
  }
  blameState.index += 1;
  renderBlameQuestion({ scroll: true });
  blameEls.prompt.focus({ preventScroll: true });
});

document.querySelector("#resetBlameButton").addEventListener("click", () => {
  const started = blameState.opening || blameState.final || blameState.zero || Object.keys(blameState.answers).length;
  if (!started || window.confirm("Reset both policies, all six case answers, and the zero-purpose control?")) resetBlameLab();
});
document.querySelector("#restartBlameButton").addEventListener("click", resetBlameLab);
document.querySelector("#copyBlamePromptButton").addEventListener("click", copyBlamePrompt);

renderBlameQuestion();
