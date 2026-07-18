"use strict";

const AFTER_POLICIES = {
  abolish: {
    index: "01",
    name: "Retire literal moral claims",
    theory: "Moral abolitionism",
    group: "retire",
    level: "classic",
    resultPhrase: "retiring literal moral claims",
    short: "Stop asserting that actions have objective moral properties. Speak directly about harms, rules, aims, commitments, and opposition.",
    note: "Abolitionism removes ordinary literal moral assertions from serious thought and talk. It does not require giving up care, values, criticism, laws, or efforts to change behavior.",
    interpretation: "You chose to remove the literal moral claim and say directly which facts, aims, rules, or commitments support the response.",
  },
  fiction: {
    index: "02",
    name: "Deliberate moral fiction",
    theory: "Revolutionary moral fictionalism",
    group: "preserve",
    level: "classic",
    resultPhrase: "keeping moral language as conscious make-believe",
    short: "Continue familiar moral talk while knowingly treating its apparent moral facts as a useful fiction.",
    note: "Revolutionary fictionalism deliberately keeps moral talk after rejecting its literal surface story. It must explain when the fiction helps, when listeners should know, and when the pretense should stop.",
    interpretation: "You chose familiar moral wording as a conscious practical fiction, not as a sincere report of an objective moral property.",
  },
  conserve: {
    index: "03",
    name: "Continue ordinary moral practice",
    theory: "Moral conservationism",
    group: "preserve",
    level: "classic",
    resultPhrase: "continuing ordinary moral belief and practice",
    short: "Keep forming and using ordinary moral beliefs in daily life even while careful reflection says those beliefs are false.",
    note: "Conservationism is stronger than merely keeping familiar words: ordinary moral belief and practice continue. It therefore must explain the gap between what a person concludes after careful thought and what that person believes in daily life.",
    interpretation: "You chose to continue the ordinary moral judgment in daily thought and speech instead of marking it as fiction or giving it a new meaning.",
  },
  express: {
    index: "04",
    name: "Open commitment and coordination",
    theory: "Expressivist revision",
    group: "revise",
    level: "replacement",
    resultPhrase: "recasting moral claims as commitments and plans",
    short: "Keep moral terms but openly use them mainly to express commitments, accept norms, and coordinate action.",
    note: "This is a broad replacement strategy inspired by revolutionary expressivism. The speaker sincerely takes a practical stand; the speaker is not pretending that an objective moral fact exists.",
    interpretation: "You chose to use moral language openly as a way to take a stand, accept a norm, and invite coordinated action.",
  },
  construct: {
    index: "05",
    name: "Defensible procedure or agreement",
    theory: "Constructivist revision",
    group: "revise",
    level: "replacement",
    resultPhrase: "tying verdicts to named procedures or agreements",
    short: "Treat a verdict as the result of a named decision procedure or agreement rather than a discovered objective fact.",
    note: "This lab uses a broad procedural replacement, not every theory called constructivist. Many constructivists accept moral truths. Here, the procedure, its participants, and the reason its result should guide anyone must be stated and defended.",
    interpretation: "You chose to ground the verdict in a stated agreement or decision procedure rather than an objective moral property.",
  },
  pragmatic: {
    index: "06",
    name: "Lightweight practical shorthand",
    theory: "Ordinary-language pragmatism",
    group: "loosen",
    level: "replacement",
    resultPhrase: "keeping moral words as flexible everyday shorthand",
    short: "Keep familiar words without treating them as reports of an extra moral fact, and unpack them into harms, expectations, relationships, or rules when needed.",
    note: "“Ordinary-language pragmatism” is this project’s label for a broad practical strategy, not one established doctrine. It works only if speakers can unpack the shorthand when precision matters.",
    interpretation: "You chose familiar moral words as practical shorthand and remained ready to spell out the concrete reasons behind them.",
  },
};

const AFTER_POLICY_ORDER = ["abolish", "fiction", "conserve", "express", "construct", "pragmatic"];

const AFTER_CASE_IDS = ["promise", "parenting", "friendship", "blame", "law", "reform", "persuasion"];
const AFTER_POLICY_CHECK_IDS = ["opening", "final"];

const AFTER_GROUPS = [
  { id: "classic", name: "Classic post-error responses", families: ["abolish", "fiction", "conserve"] },
  { id: "replacement", name: "Replacement and reinterpretation strategies", families: ["express", "construct", "pragmatic"] },
];

function afterChoices(values) {
  return AFTER_POLICY_ORDER.map((policy) => {
    const value = values[policy];
    return {
      id: policy,
      policy,
      label: value.label,
      detail: value.detail,
      interpretation: `${value.detail} ${AFTER_POLICIES[policy].interpretation}`,
    };
  });
}

const AFTER_QUESTIONS = [
  {
    id: "opening",
    phase: "Starting policy",
    axis: "Begin with the premise",
    prompt: "Suppose there are no objective moral facts. What should we do with moral language?",
    context:
      "For this lab, imagine that careful inquiry has convinced you that actions do not possess objective properties such as moral rightness, wrongness, obligation, or desert. People still care, suffer, cooperate, make demands, and disagree. You must choose a general policy for words such as “right,” “wrong,” “ought,” and “deserves.”",
    assumptions:
      "Treat the no-objective-facts premise as fixed only while taking this lab. Do not argue for or against it here. Ordinary facts about harm, promises, law, trust, feelings, and power remain available.",
    scope:
      "Choose what you would generally do with moral thought and language—not which actions you favor. The later cases let you use a different policy when context matters.",
    why: "This opening choice records your first general policy. The last question will ask again after seven practical cases.",
    guide: {
      plain: "Imagine learning that moral words do not report facts that exist independently of every person and rule. Would you drop the claims, use them as a useful fiction, continue ordinary belief, or replace their old job with expression, a procedure, or shorthand?",
      separate: "Rejecting objective moral facts does not by itself tell you to stop caring, obey laws, break promises, or accept cruelty. It settles a claim about what exists, not the practical language policy that follows.",
      reveal: "Your answer identifies the kind of post-error policy that first seems most workable to you.",
    },
    choices: afterChoices({
      abolish: {
        label: "Stop making literal moral claims and name the practical reasons directly",
        detail: "Replace “That is wrong” with clearer claims such as “That harms someone,” “I oppose that,” or “Our rule forbids that.”",
      },
      fiction: {
        label: "Keep moral language as a useful fiction while knowing its surface claims are untrue",
        detail: "Deliberately speak as if rightness and wrongness existed when that shared pretense usefully guides attention, feeling, or action.",
      },
      conserve: {
        label: "Continue ordinary moral belief and talk in daily life despite the careful conclusion",
        detail: "Let everyday thought continue to treat some acts as really right or wrong, even while philosophical reflection says no such facts exist.",
      },
      express: {
        label: "Keep the words but openly use them to express commitments and coordinate plans",
        detail: "Explain that “That is wrong” mainly means “I reject this, accept a rule against it, and invite others to act with me.”",
      },
      construct: {
        label: "Tie moral verdicts to the result of a named decision procedure or agreement",
        detail: "State who takes part, what information they receive, how the decision is made, and why that procedure—not a discovered moral fact—sets the verdict.",
      },
      pragmatic: {
        label: "Keep familiar moral words as everyday shorthand and unpack them when precision matters",
        detail: "Use “wrong” lightly to summarize harms, expectations, relationships, or rules without claiming a further objective moral property.",
      },
    }),
  },
  {
    id: "promise",
    phase: "Private commitment",
    axis: "Case — the message to Europa",
    prompt: "Mara promised to deliver a message that will cost her a year of travel. With no objective duty and no one able to punish her, how should she think and speak about keeping the promise?",
    context:
      "A dying friend asked Mara to carry an encrypted message to his adult child on Europa. Mara freely promised. After his death, she learns that delivering it requires a lonely one-year detour. Nobody else knows the promise, the child does not expect the message, and breaking it will never be discovered. Mara still values being trustworthy and says, “I ought to keep my promise.”",
    assumptions:
      "The promise was informed and voluntary. The message is harmless. The detour is costly but not dangerous. No law, punishment, reputation effect, divine command, or objective moral duty is available.",
    scope:
      "Choose how Mara should understand and phrase her “ought.” Do not decide whether a year of travel is worth it; every answer may still recommend keeping the promise.",
    why: "A private promise tests whether moral language has a job when enforcement and an audience disappear.",
    guide: {
      plain: "Mara may care deeply about keeping her word without believing that the universe commands it. What kind of thought should guide her?",
      separate: "A reason based on identity, love, trust, or a chosen commitment is not automatically an objective obligation. The issue is how to describe the reason accurately.",
      reveal: "Your answer shows whether you preserve, revise, or replace obligation language in private decision-making.",
    },
    choices: afterChoices({
      abolish: {
        label: "Drop the literal “ought” and decide from the promise, her values, and the cost",
        detail: "Mara should say that she promised, wants to be trustworthy, and chooses whether those reasons outweigh the year she would lose.",
      },
      fiction: {
        label: "Privately use “I must keep it” as a helpful fiction that strengthens resolve",
        detail: "She may knowingly imagine the promise as a binding moral duty if that pretense helps her carry out the commitment she values.",
      },
      conserve: {
        label: "Continue believing in daily life that she really ought to keep the promise",
        detail: "She should think in the ordinary moral way and treat the promise as a genuine duty in daily life, setting aside what careful reflection concluded.",
      },
      express: {
        label: "Use “I ought” to reaffirm the rule and commitment she chooses to stand behind",
        detail: "Her sentence should openly express “I accept a practice of keeping promises, and I commit myself to following it here.”",
      },
      construct: {
        label: "Use a stated agreement-making rule to decide what this promise now requires",
        detail: "Her “ought” should mean that this informed, voluntary promise falls under a rule created by a named process that includes both promiser and recipient.",
      },
      pragmatic: {
        label: "Use “I ought” as shorthand for the special weight she gives a voluntary promise",
        detail: "She may keep the familiar word while being ready to unpack it into trust, personal identity, the friend’s reliance, and the real cost.",
      },
    }),
  },
  {
    id: "parenting",
    phase: "Teaching a child",
    axis: "Case — the child who asks why",
    prompt: "A child asks what “wrong” means after publicly humiliating a classmate. What should the parent teach?",
    context:
      "Twelve-year-old Ivo altered a classmate’s school avatar and displayed it to make the class laugh. The classmate was humiliated and now avoids school. Ivo knows the no-objective-moral-facts premise and asks, “If it was not objectively wrong, why should I say it was wrong?” The parent opposes the act and wants an honest answer the child can use.",
    assumptions:
      "Ivo intended the joke but did not predict how long the distress would last. The facts about harm are clear. The parent may teach empathy, consequences, rules, and repair under every option.",
    scope:
      "Choose what the parent should teach the word “wrong” to mean or do. Do not choose a punishment and do not treat “not objectively wrong” as “harmless.”",
    why: "Parenting tests whether a policy can be honest, understandable, and useful for someone learning moral vocabulary.",
    guide: {
      plain: "The parent needs more than “because I said so,” but cannot appeal to an objective moral fact. What explanation should replace or reinterpret that appeal?",
      separate: "Explaining harm can support a demand for apology without proving a moral fact that is independent of everyone’s standards. The child’s question is about the extra work done by “wrong.”",
      reveal: "Your answer shows how your policy handles moral education, honest explanation, and transparency with a learner.",
    },
    choices: afterChoices({
      abolish: {
        label: "Teach the concrete facts and rules without saying the act was literally morally wrong",
        detail: "The parent should explain the humiliation, school rule, desired repair, and commitment to protect classmates, using those claims instead of objective wrongness.",
      },
      fiction: {
        label: "Teach “That was wrong” as a shared moral story that helps children care and cooperate",
        detail: "The parent should retain the familiar claim as useful make-believe while explaining, at an age-appropriate time, that it is not literally about a moral property.",
      },
      conserve: {
        label: "Teach the ordinary belief that humiliating the classmate really was wrong",
        detail: "The parent should continue normal moral education and encourage Ivo to believe the moral verdict in daily life despite what careful reflection concluded.",
      },
      express: {
        label: "Teach that “wrong” condemns the act and commits the family to a rule against humiliation",
        detail: "The parent should say openly that the word expresses a practical stand: “We oppose this treatment and accept a rule protecting classmates.”",
      },
      construct: {
        label: "Connect “wrong” to a classroom rule-making process the parent can fully explain",
        detail: "The process should give every affected child the facts, a chance to object, and the same stated way to challenge or change the rule against humiliation.",
      },
      pragmatic: {
        label: "Keep “wrong” as simple shorthand, then explain the harm, expectation, and needed repair",
        detail: "The parent may use the familiar word without claiming an extra moral fact, as long as Ivo also receives the concrete explanation that gives it content here.",
      },
    }),
  },
  {
    id: "friendship",
    phase: "Repairing trust",
    axis: "Case — the shared memory key",
    prompt: "A close friend secretly opened a private memory archive and says, “Nothing was objectively wrong.” How should the injured friend answer?",
    context:
      "Leena gave Sol an emergency key to her memory archive for use only if she disappeared. Sol became curious, opened it while she was safe, and read an intimate memory. He admits every fact and says, “I violated your condition, but there are no objective moral facts, so I did nothing objectively wrong.” Leena wants honesty, repair, and a future boundary.",
    assumptions:
      "The access was deliberate, the condition was clear, and Sol caused real distress. No law applies. Both friends accept the lab’s premise and both want the friendship to survive if trust can be repaired.",
    scope:
      "Choose the language Leena should use in the repair conversation. The question is not whether she may be angry or end the friendship; every policy allows those responses.",
    why: "Friendship tests whether a post-error policy can condemn a betrayal without disguising what gives the demand its force.",
    guide: {
      plain: "Sol is right only about the absence of objective wrongness. That does not settle what Leena should say about consent, trust, or the future of the friendship.",
      separate: "“No objective wrongness” does not mean “no broken condition,” “no injury,” or “no reason for Leena to withdraw trust.”",
      reveal: "Your answer shows how your policy supports blame, boundaries, and repair in a personal relationship.",
    },
    choices: afterChoices({
      abolish: {
        label: "Avoid the moral verdict and state the breach, harm, demand, and consequence directly",
        detail: "Leena should say, “You broke the condition, hurt me, and lost my trust; repair requires these steps,” without claiming objective wrongness.",
      },
      fiction: {
        label: "Call the betrayal wrong as a conscious fiction that protects trust and marks its seriousness",
        detail: "Leena may use ordinary moral condemnation as deliberate make-believe if that framing helps both friends understand and repair the breach.",
      },
      conserve: {
        label: "Continue the ordinary judgment that Sol really acted wrongly and owes repair",
        detail: "Leena should speak and believe as she normally would in friendship, even though careful reflection denies the objective fact that judgment appears to assert.",
      },
      express: {
        label: "Use “wrong” openly to condemn the access and commit to a shared boundary",
        detail: "Leena should explain that her moral language expresses rejection of unauthorized access and acceptance of a rule they must follow to rebuild trust.",
      },
      construct: {
        label: "Base the verdict on the voluntary access rule both friends knowingly accepted",
        detail: "Leena should say their informed agreement created the boundary, then use a stated process in which both can propose, reject, and revise the rules for repair.",
      },
      pragmatic: {
        label: "Use “wrong” as shorthand for violated consent and damaged trust, then spell both out",
        detail: "Leena may keep the ordinary word while making clear that its practical content here is the broken condition, distress, and future relationship risk.",
      },
    }),
  },
  {
    id: "blame",
    phase: "Blame without desert",
    axis: "Case — the manufactured temper",
    prompt: "Niko deliberately humiliates a worker, but every part of his character has known causes. How should the community talk about blame?",
    context:
      "Niko publicly humiliates a junior worker for amusement and understands the likely distress. Scientists can trace his temper, tastes, and self-control to genes, training, and past events, just as they can for everyone else. The community needs to respond, protect workers, and decide whether to say, “Niko morally deserves blame.”",
    assumptions:
      "Niko acted intentionally and can respond to incentives and discussion. The worker’s distress is real. Under the premise, there is no objective moral desert—no further fact making suffering or condemnation something he deserves in itself.",
    scope:
      "Choose a policy for blame language. Do not confuse denying objective desert with refusing criticism, protection, restitution, deterrence, or behavior change.",
    why: "Blame tests whether moral language adds useful accountability or an unsupported claim that someone deserves suffering.",
    guide: {
      plain: "The community can still stop Niko and demand repair. The question is whether it should call him blameworthy, and what that word would mean.",
      separate: "Causal explanation does not make the conduct safe or acceptable. It does challenge claims that punishment is deserved independently of future protection, repair, or chosen rules.",
      reveal: "Your answer shows how your policy handles responsibility after objective desert is removed.",
    },
    choices: afterChoices({
      abolish: {
        label: "Drop claims of deserved blame and justify each response by protection, repair, or change",
        detail: "The community should describe what Niko did and impose only responses supported by stated practical aims, without saying he objectively deserves suffering.",
      },
      fiction: {
        label: "Retain blame and desert talk as a controlled fiction if it improves accountability",
        detail: "The community may speak as if Niko deserves blame while knowing that claim is literally false, provided the fiction’s benefits and harms are carefully managed.",
      },
      conserve: {
        label: "Continue the ordinary belief that Niko is blameworthy and deserves condemnation",
        detail: "Daily practice should treat intentional cruelty as genuinely deserving blame even while careful reflection says there is no objective moral desert.",
      },
      express: {
        label: "Use blame to express condemnation and commit the community to protective norms",
        detail: "Calling Niko blameworthy should openly register opposition, demand repair, and reinforce rules—not claim that suffering is objectively owed to him.",
      },
      construct: {
        label: "Use only blame practices produced by a named public accountability process",
        detail: "The process should state who has a voice, what evidence counts, how decisions are made, and how the worker, Niko, and future workers can challenge a result.",
      },
      pragmatic: {
        label: "Use “blameworthy” as shorthand for intentional harm and accountability, not cosmic desert",
        detail: "The community may keep the word while unpacking it into agency, risk, repair, and justified consequences whenever punishment or suffering is at stake.",
      },
    }),
  },
  {
    id: "law",
    phase: "Public authority",
    axis: "Case — the memory-theft sentence",
    prompt: "A court must sentence a person who stole and sold memories. What should its official judgment say after objective guilt and desert are removed?",
    context:
      "A broker knowingly copied thousands of private memories and sold them. The statute clearly forbids this, the trial was fair, and the evidence is certain. Experts know the risks of repetition, the needs of victims, and the likely effects of prison, monitoring, restitution, and treatment. The judge must explain a public sentence.",
    assumptions:
      "Legal guilt under the valid statute is established. The lab’s premise removes objective moral guilt and deserved suffering, not legal authority, safety needs, victims’ interests, or the broker’s ability to respond to reasons.",
    scope:
      "Choose the court’s official language policy. Do not choose the exact sentence. Distinguish legal guilt from moral guilt and forward-looking reasons from punishment for its own sake.",
    why: "Criminal law raises the stakes: vague moral language can affect liberty, suffering, public trust, and claims of desert.",
    guide: {
      plain: "The court must act and give reasons. Should it remove moral claims, use them as fiction, preserve them, reinterpret them, attach them to a named public procedure, or use them as careful shorthand?",
      separate: "A person can be legally guilty because a public rule was proven violated even if there is no objective moral property of guilt or deserved punishment.",
      reveal: "Your answer shows whether your language policy changes when institutions exercise coercive power.",
    },
    choices: afterChoices({
      abolish: {
        label: "Use legal and practical reasons only; remove claims of moral guilt or deserved suffering",
        detail: "The judgment should name the proven violation, harm, risk, restitution, and least harmful effective response without asserting objective moral desert.",
      },
      fiction: {
        label: "Keep moral guilt language as an official fiction if it makes law work better",
        detail: "The court may speak as if the broker is morally guilty or deserves punishment while knowingly treating that story as a tool for compliance and trust.",
      },
      conserve: {
        label: "Continue ordinary legal-moral practice and judge the broker genuinely blameworthy",
        detail: "The court should preserve familiar belief and language about moral guilt and deserved punishment despite what careful reflection concluded.",
      },
      express: {
        label: "Use condemnation openly to express public commitments and reinforce protective rules",
        detail: "The judgment should present moral language as the community’s practical stand against memory theft, not as discovery of objective guilt.",
      },
      construct: {
        label: "Tie condemnation and penalty to a public legal procedure with stated rules",
        detail: "The court should state who shaped the rules, what evidence counts, how victims and accused people are heard, how decisions are made, and how appeals work.",
      },
      pragmatic: {
        label: "Keep terms such as “wrongdoing” as shorthand but define them in legal and practical terms",
        detail: "The court may use familiar language only while making clear that it summarizes the violation, intent, harm, risk, and response—not objective desert.",
      },
    }),
  },
  {
    id: "reform",
    phase: "Changing a society",
    axis: "Case — the auctioned vote",
    prompt: "A city legally lets wealthy residents buy extra votes. How should reformers argue against it without claiming objective injustice?",
    context:
      "For eighty years, the city of Corda has auctioned one-third of its council votes. The system is legal, stable, popular with a majority, and highly profitable. Wealthy buyers fund public services, but poor districts repeatedly lose control over housing and water decisions. Reformers want one equal vote per adult and must explain why.",
    assumptions:
      "Every factual effect is public. No side is confused about the law or outcomes. The reformers sincerely value political equality, but there is no objective property of justice or fairness that exists independently of standards and commitments.",
    scope:
      "Choose how the reform movement should frame its case. Do not decide whether equal voting will win or whether it is objectively required; the issue is the language of political reform.",
    why: "Political reform tests whether a policy can criticize settled law and majority approval without quietly restoring objective moral facts.",
    guide: {
      plain: "Saying “our current rules allow it” cannot end a campaign to change those rules. What language can reformers use to challenge the system honestly?",
      separate: "Current popularity is one fact about a standard, not a proof that nobody may oppose or replace it. Non-realists can have strong political commitments.",
      reveal: "Your answer shows how your policy handles criticism that reaches beyond existing rules.",
    },
    choices: afterChoices({
      abolish: {
        label: "Drop “objectively unjust” and argue directly from power, outcomes, and chosen equality",
        detail: "Reformers should describe who loses control, declare the equal-vote system they seek, and persuade others without asserting a moral property of injustice.",
      },
      fiction: {
        label: "Call vote auctions unjust as a useful fiction that unites and motivates reform",
        detail: "The movement may knowingly use literal-sounding justice language as make-believe when that shared story focuses attention and supports collective action.",
      },
      conserve: {
        label: "Continue believing and saying that the vote auction really is unjust",
        detail: "Reformers should use ordinary moral conviction in politics even while careful reflection says objective injustice does not exist.",
      },
      express: {
        label: "Use “unjust” openly to reject unequal power and organize a commitment to equal votes",
        detail: "The claim should function as a sincere public stand and invitation to joint action, not a report of a property that exists independently of everyone’s standards.",
      },
      construct: {
        label: "Use a public choice process that does not reveal who will later be rich or poor",
        detail: "Ask residents to choose voting rules without knowing their future wealth, then explain why that information rule and the process—not objective justice—set the verdict.",
      },
      pragmatic: {
        label: "Keep “unjust” as shorthand, then unpack it into unequal power and blocked interests",
        detail: "The movement may use familiar language while making its practical meaning clear enough that disagreement can reach the actual priorities and tradeoffs.",
      },
    }),
  },
  {
    id: "persuasion",
    phase: "Public persuasion",
    axis: "Case — the emergency broadcast",
    prompt: "A moral slogan changes behavior more than a direct statement of the danger. How should the city choose and explain its announcement?",
    context:
      "A drought leaves one reservoir for a city and a nearby refugee settlement. The city has twenty seconds of emergency broadcast time. Careful tests show that “Wasting water is morally wrong” cuts use by 30%, while “We oppose waste because it risks thousands of lives” cuts it by 22%. Both figures are reliable. The speaker accepts the no-objective-facts premise.",
    assumptions:
      "There is no time to give the full philosophy during the alert. The moral slogan is understood by most listeners as a literal claim. The 8-point difference is expected to prevent serious illness. Later explanation is possible.",
    scope:
      "Choose what the city should broadcast and how it should understand the wording. Balance effectiveness and honesty within the policy; do not deny the measured outcome.",
    why: "Emergency persuasion tests whether usefulness can justify familiar moral language and what transparency is owed afterward.",
    guide: {
      plain: "One sentence works better but most listeners hear it as a factual claim the speaker rejects. The other states the speaker’s real basis but will probably protect fewer people.",
      separate: "Calling the slogan useful does not yet decide whether it is a fiction, sincere expression, procedural result, everyday belief, or loose shorthand.",
      reveal: "Your answer shows what your policy permits when accuracy and urgent coordination pull apart.",
    },
    choices: afterChoices({
      abolish: {
        label: "Use the precise 22% message and refuse to assert the stronger moral claim",
        detail: "The city should say exactly what it opposes and why, accepting the lower response rather than knowingly making a literal claim it rejects.",
      },
      fiction: {
        label: "Use the 30% moral slogan as an emergency fiction, then explain the policy afterward",
        detail: "The speaker may deliberately use a moral claim the speaker regards as literally false because its measured benefit is large, while treating disclosure and limits as part of the plan.",
      },
      conserve: {
        label: "Use the 30% slogan in the ordinary way and let everyday moral belief guide the emergency",
        detail: "The speaker should continue sincerely thinking and talking as though wasting water really is morally wrong, despite what careful reflection concluded.",
      },
      express: {
        label: "Use moral language but make the commitment visible: “We condemn waste—protect every life”",
        detail: "The city should preserve the force of moral speech while wording it as an open stance and shared plan rather than an objective fact report.",
      },
      construct: {
        label: "Use wording authorized by a stated emergency communication process",
        detail: "The process should state whose risks count, who can review the wording, what evidence permits urgent claims, and when the city must explain or withdraw them.",
      },
      pragmatic: {
        label: "Use “morally wrong” as urgent shorthand, then publicly unpack the harms and policy",
        detail: "The city may treat listeners’ familiar wording lightly rather than as a deliberate fiction, but it should clarify the real reasons once the immediate danger passes.",
      },
    }),
  },
  {
    id: "final",
    phase: "Final policy",
    axis: "Return to the general question",
    prompt: "After the seven cases, which policy should usually govern moral language if there are no objective moral facts?",
    context:
      "You have considered private promises, teaching children, repairing friendship, blaming people, sentencing under law, political reform, and urgent public persuasion. Now choose the policy you would generally recommend. You may still make limited exceptions when you can explain them.",
    assumptions:
      "The original premise remains fixed. All six policies can preserve concern, opposition, rules, and cooperation. None automatically supplies an objective reason that every person must accept.",
    scope:
      "Choose your best general policy, not a prediction about what society will do. The result compares this answer with your opening choice and reports every policy you used in between.",
    why: "This final answer reveals whether practical cases changed your general recommendation.",
    guide: {
      plain: "Which approach now seems most honest and workable across daily life and public institutions?",
      separate: "A mixed result is not automatically confused. Context-sensitive policies become defensible when you can state why a different context changes the rule.",
      reveal: "Your diagnostic will show exact counts, the opening-to-final movement, and selected combinations that need further explanation.",
    },
    choices: afterChoices({
      abolish: {
        label: "Usually retire literal moral claims and give concrete reasons instead",
        detail: "My general policy is to replace objective-sounding moral verdicts with claims about harms, aims, commitments, rules, and opposition.",
      },
      fiction: {
        label: "Usually keep ordinary moral discourse as a deliberate and useful fiction",
        detail: "My general policy is to use familiar moral claims as conscious make-believe when I can defend the practical value and terms of the pretense.",
      },
      conserve: {
        label: "Usually continue ordinary moral belief and practice in everyday life",
        detail: "My general policy is to preserve everyday moral thinking and speech even though careful reflection classifies its apparent claims as false.",
      },
      express: {
        label: "Usually reinterpret moral claims openly as commitments, norms, and plans",
        detail: "My general policy is to use moral language sincerely for taking practical stands and coordinating action without claiming objective properties.",
      },
      construct: {
        label: "Usually tie moral verdicts to named decision procedures or agreements",
        detail: "My general policy is to state who takes part, what rules they use, why the process has authority, and how its result sets the verdict.",
      },
      pragmatic: {
        label: "Usually keep moral vocabulary as lightweight, explainable shorthand",
        detail: "My general policy is to use ordinary words without claiming an extra moral fact and unpack their concrete basis whenever precision matters.",
      },
    }),
  },
];

const afterState = { index: 0, answers: {} };

function afterChoice(questionId) {
  const question = AFTER_QUESTIONS.find((item) => item.id === questionId);
  const selected = afterState.answers[questionId];
  return question?.choices.find((choice) => choice.id === selected) || null;
}

function selectedAfterAnswers() {
  return AFTER_QUESTIONS.map((question) => ({ question, choice: afterChoice(question.id) })).filter((item) => item.choice);
}

function countAfterPolicies(answers, questionIds) {
  return AFTER_POLICY_ORDER.reduce((counts, policy) => {
    counts[policy] = questionIds.filter((questionId) => answers[questionId] === policy).length;
    return counts;
  }, {});
}

function afterAllCounts(answers = afterState.answers) {
  return countAfterPolicies(answers, AFTER_QUESTIONS.map((question) => question.id));
}

function afterCaseCounts(answers = afterState.answers) {
  return countAfterPolicies(answers, AFTER_CASE_IDS);
}

function answeredAfterCount() {
  return selectedAfterAnswers().length;
}

function answeredCaseCount() {
  return AFTER_CASE_IDS.filter((questionId) => afterState.answers[questionId]).length;
}

function afterOpeningFinalComparison(answers = afterState.answers) {
  const opening = answers.opening;
  const final = answers.final;
  if (!opening || !final) return null;
  if (opening === final) {
    return {
      stable: true,
      title: `${AFTER_POLICIES[opening].theory} → same policy`,
      detail: `You began and ended by favoring ${AFTER_POLICIES[opening].resultPhrase}. The seven cases did not change your general recommendation, although your answers may still contain exceptions.`,
    };
  }
  return {
    stable: false,
    title: `${AFTER_POLICIES[opening].theory} → ${AFTER_POLICIES[final].theory}`,
    detail: `You began by favoring ${AFTER_POLICIES[opening].resultPhrase}, then ended by favoring ${AFTER_POLICIES[final].resultPhrase}. This is a revision to explain, not automatic incoherence.`,
  };
}

function formatAfterContexts(answers, policies) {
  const labels = AFTER_QUESTIONS
    .filter((question) => policies.includes(answers[question.id]))
    .map((question) => question.axis.replace(/^Case — /, "").replace("Begin with the premise", "the opening policy").replace("Return to the general question", "the final policy"));
  if (labels.length <= 1) return labels[0] || "no setting";
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
}

function collectAfterCombinations(answers = afterState.answers) {
  const counts = afterAllCounts(answers);
  const has = (policy) => counts[policy] > 0;
  const combinations = [];
  const retainedPolicies = ["fiction", "conserve", "express", "construct", "pragmatic"].filter(has);
  const revisionPolicies = ["express", "construct", "pragmatic"].filter(has);
  if (has("abolish") && retainedPolicies.length) combinations.push({
    id: "retire-retain",
    title: "Retiring the words and keeping them",
    detail: `You retired literal moral claims in ${formatAfterContexts(answers, ["abolish"])}, but kept or repurposed moral wording in ${formatAfterContexts(answers, retainedPolicies)}. State the feature that makes retention useful enough in one setting but not the other.`,
  });
  if (has("conserve") && has("fiction")) combinations.push({
    id: "conserve-fiction",
    title: "Ordinary belief and conscious fiction",
    detail: `You kept ordinary moral belief in ${formatAfterContexts(answers, ["conserve"])}, but treated moral language as make-believe in ${formatAfterContexts(answers, ["fiction"])}. Explain when actual belief is needed and when non-believing acceptance can do the work.`,
  });
  if (has("fiction") && revisionPolicies.length) combinations.push({
    id: "fiction-revision",
    title: "Make-believe and sincere reinterpretation",
    detail: `You used conscious make-believe in ${formatAfterContexts(answers, ["fiction"])}, but gave moral words a sincere replacement meaning in ${formatAfterContexts(answers, revisionPolicies)}. Clarify what listeners are meant to understand in each setting.`,
  });
  if (has("conserve") && revisionPolicies.length) combinations.push({
    id: "conserve-revise",
    title: "Ordinary belief and open revision",
    detail: `You preserved ordinary moral belief in ${formatAfterContexts(answers, ["conserve"])}, but openly changed the words’ job in ${formatAfterContexts(answers, revisionPolicies)}. Explain whether audience, urgency, institution, or another stated feature governs the difference.`,
  });
  const nonProceduralRevision = ["express", "pragmatic"].filter(has);
  if (has("construct") && nonProceduralRevision.length) combinations.push({
    id: "procedure-other-revision",
    title: "Procedure-set verdict and other sincere revisions",
    detail: `A named procedure set the verdict in ${formatAfterContexts(answers, ["construct"])}, while a commitment or practical shorthand did the work in ${formatAfterContexts(answers, nonProceduralRevision)}. Say when a procedure must settle the wording and when a speaker’s stated reasons are enough.`,
  });
  return combinations;
}

function afterDiagnostic(answers = afterState.answers) {
  const counts = afterCaseCounts(answers);
  const allCounts = afterAllCounts(answers);
  const max = Math.max(...AFTER_POLICY_ORDER.map((policy) => counts[policy]));
  const leaders = AFTER_POLICY_ORDER.filter((policy) => counts[policy] === max);
  const used = AFTER_POLICY_ORDER.filter((policy) => counts[policy] > 0);
  const primary = leaders.length === 1 ? AFTER_POLICIES[leaders[0]].theory : `${leaders.length}-way tie`;
  const title = leaders.length === 1
    ? `Across the seven cases, you most often favored ${AFTER_POLICIES[leaders[0]].resultPhrase}.`
    : "Your seven practical choices do not have one most-used strategy.";
  const pattern = leaders.length === 1 ? `${max} of 7 cases` : `${leaders.length}-way tie at ${max} of 7`;
  const primaryCopy = leaders.length === 1
    ? `${AFTER_POLICIES[leaders[0]].name} appears in ${max} of the seven practical cases. Your opening and final general answers are reported separately and do not change this count.`
    : `${leaders.map((policy) => AFTER_POLICIES[policy].theory).join(", ")} each appear in ${max} practical cases. No tie-break rule has been added.`;
  const patternCopy = used.length === 1
    ? "You used one strategy in every practical setting. That consistency does not by itself show that the strategy is true or workable."
    : `You used ${used.length} of the six strategies across the seven cases. A mixed pattern may reflect context, uncertainty, or a distinction you should make explicit.`;
  return {
    counts,
    allCounts,
    max,
    leaders,
    used,
    primary,
    title,
    pattern,
    primaryCopy,
    patternCopy,
    summary: `Your seven practical choices used ${used.length} of six response strategies. The opening and final policy checks are compared separately. These are exact selections, not personality scores or proof of incoherence.`,
    comparison: afterOpeningFinalComparison(answers),
    combinations: collectAfterCombinations(answers),
  };
}

function buildAfterAIProbePrompt(answers = afterState.answers) {
  const diagnosis = afterDiagnostic(answers);
  const answerLines = AFTER_QUESTIONS.map((question, index) => {
    const choice = question.choices.find((item) => item.id === answers[question.id]);
    return choice
      ? `${index + 1}. ${question.axis}\nQuestion: ${question.prompt}\nFull situation: ${question.context}\nFacts to hold fixed: ${question.assumptions}\nWhat the question is testing: ${question.scope}\nMy answer: ${choice.label}\nWhat I chose: ${choice.detail}\nResponse strategy: ${AFTER_POLICIES[choice.policy].theory}`
      : `${index + 1}. ${question.axis}: unanswered`;
  }).join("\n\n");
  const countLines = AFTER_POLICY_ORDER.map((policy) => `- ${AFTER_POLICIES[policy].theory}: ${diagnosis.counts[policy]} of 7 practical cases`).join("\n");
  const combinationLines = diagnosis.combinations.length
    ? diagnosis.combinations.map((item) => `- ${item.title}: ${item.detail}`).join("\n")
    : "- None of the lab’s five selected strategy comparisons appeared. Do not treat this as proof that the view has no tension.";
  const comparison = diagnosis.comparison
    ? `${diagnosis.comparison.title}. ${diagnosis.comparison.detail}`
    : "Opening-to-final comparison unavailable.";
  return `Act as a patient philosophical interviewer. Use clear language suitable for a curious high-school student, but do not simplify away important distinctions.

WORKING PREMISE
For this interview only, assume there are no objective moral facts: no action has a moral status that is true independently of every person’s or group’s standards. Do not spend the interview trying to prove or disprove that premise. Ordinary facts about harm, agreements, laws, feelings, power, and consequences remain real.

TASK AND TAXONOMY
Help me decide what to do with moral thought and language after accepting that premise. Do not treat all six labels as theories at the same level.

The three classic post-error responses are:
- Moral abolitionism: retire literal moral claims and state practical facts, aims, rules, and commitments directly.
- Revolutionary moral fictionalism: remove ordinary moral belief but knowingly retain moral language through non-believing acceptance or make-believe.
- Moral conservationism: continue ordinary moral belief and practice in daily life even though careful reflection says those beliefs are false.

The lab also tests three broader replacement or reinterpretation strategies:
- Expressivist revision: openly use moral claims to express commitments, accept norms, and coordinate plans.
- Constructivist revision: tie verdicts to a named procedure or agreement rather than discovered moral truth. This is not every theory called constructivist; many constructivists accept normative truths.
- Ordinary-language pragmatism: keep moral vocabulary as explainable practical shorthand. This is the project’s label, not one established doctrine.

MY EXACT PRACTICAL-CASE COUNTS
${countLines}
The repeated opening and final general-policy answers are not included in those seven-case counts. They are compared next.

OPENING TO FINAL
${comparison}

FIVE SELECTED COMPARISONS CHECKED BY THE LAB
The lab checks only: retiring versus retaining moral words; ordinary belief versus conscious fiction; conscious fiction versus sincere reinterpretation; ordinary belief versus open revision; and procedure-set verdicts versus other sincere revisions.
${combinationLines}

MY NINE ANSWERS
${answerLines}

INTERVIEW RULES
1. Ask one focused question at a time and wait for my answer.
2. Begin by asking me to defend the most important rule that explains why I changed policies across settings—or why one policy should govern them all.
3. Distinguish belief from words, and both from the practical action being recommended. Keep the classic post-error responses separate from the three replacement strategies.
4. Do not infer that “no objective moral facts” means “nothing matters,” “all choices are equal,” “laws disappear,” or “cruelty must be accepted.”
5. Do not call a mixed pattern incoherent merely because more than one policy appears. Test whether I can state a non-circular context rule that predicts the difference.
6. Press fictionalism on transparency, audience understanding, usefulness, and exit conditions.
7. Press conservationism on how ordinary moral belief can be retained while reflective inquiry says it is false.
8. Press abolitionism on expressive force, speed, education, and coordination costs.
9. Press expressivist revision on whether listeners understand the revised meaning and how deep disagreement is handled.
10. Press constructivist revision on who chooses the procedure, who is represented, why its result has authority, how dissent is handled, and whether the procedure quietly assumes the result it is meant to justify.
11. Press ordinary-language pragmatism on ambiguity and the point at which shorthand must be unpacked.
12. Use my actual cases. Offer a difficult counterexample only after I have answered the relevant clarification.
13. At the end, give me: (a) the clearest version of my policy, (b) its context rule, (c) the strongest unresolved tension, (d) one practical wording change, and (e) one question I should keep investigating.

Start with the single question that would most help distinguish a principled mixed policy from an unexplained switch.`;
}

const afterEls = {
  liveStatus: document.querySelector("#afterLiveStatus"),
  workspace: document.querySelector("#afterLab"),
  results: document.querySelector("#afterResults"),
  phase: document.querySelector("#afterPhase"),
  progress: document.querySelector("#afterProgress"),
  progressTrack: document.querySelector("#afterProgressTrack"),
  progressBar: document.querySelector("#afterProgressBar"),
  number: document.querySelector("#afterQuestionNumber"),
  axis: document.querySelector("#afterQuestionAxis"),
  prompt: document.querySelector("#afterQuestionPrompt"),
  context: document.querySelector("#afterQuestionContext"),
  assumptions: document.querySelector("#afterAssumptions"),
  scope: document.querySelector("#afterScope"),
  explanation: document.querySelector("#afterExplanation"),
  plain: document.querySelector("#afterPlain"),
  separate: document.querySelector("#afterSeparate"),
  reveal: document.querySelector("#afterReveal"),
  choices: document.querySelector("#afterChoices"),
  why: document.querySelector("#afterWhy"),
  back: document.querySelector("#afterBackButton"),
  next: document.querySelector("#afterNextButton"),
  map: document.querySelector("#afterMap"),
  mapCard: document.querySelector("#afterMapCard"),
  mapKicker: document.querySelector("#afterMapKicker"),
  mapNote: document.querySelector("#afterMapNote"),
  mapBasis: document.querySelector("#afterMapBasis"),
  liveMapMount: document.querySelector("#liveAfterMapMount"),
  resultMapMount: document.querySelector("#resultAfterMapMount"),
};

function scrollToAfterElement(element, offset = 72) {
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function renderAfterMap() {
  const counts = afterCaseCounts();
  const answered = answeredCaseCount();
  afterEls.mapKicker.textContent = answered === 7 ? "Your seven practical choices" : "Your practical choices so far";
  afterEls.mapNote.textContent = answered === 7
    ? "This final chart counts only the seven practical cases."
    : "Each practical case adds one count. The opening and final general-policy checks are reported separately.";
  afterEls.mapBasis.textContent = `${answered} of 7 practical cases classified`;
  afterEls.map.setAttribute(
    "aria-label",
    answered
      ? AFTER_POLICY_ORDER.map((policy) => `${AFTER_POLICIES[policy].name}: ${counts[policy]}`).join("; ")
      : "No practical cases classified yet",
  );
  afterEls.map.innerHTML = AFTER_GROUPS.map((group) => `
    <section class="meaning-map-group" aria-hidden="true">
      <h3>${group.name}</h3>
      <div class="meaning-map-rows">
        ${group.families.map((policyId) => {
          const policy = AFTER_POLICIES[policyId];
          const count = counts[policyId];
          return `<div class="meaning-map-row ${count ? "active" : ""}">
            <span class="meaning-map-index">${policy.index}</span>
            <div class="meaning-map-copy">
              <strong>${policy.name}</strong>
              <small>${policy.theory}</small>
              <span class="meaning-meter" aria-hidden="true"><i style="width: ${(count / 7) * 100}%"></i></span>
            </div>
            <b>${count}</b>
          </div>`;
        }).join("")}
      </div>
    </section>`).join("");
}

function renderAfterQuestion({ scroll = true, announce = true } = {}) {
  const question = AFTER_QUESTIONS[afterState.index];
  const number = afterState.index + 1;
  const selectedId = afterState.answers[question.id];
  afterEls.phase.textContent = question.phase;
  afterEls.progress.textContent = `${number} / ${AFTER_QUESTIONS.length}`;
  afterEls.progressTrack.setAttribute("aria-valuenow", String(number));
  afterEls.progressBar.style.width = `${(number / AFTER_QUESTIONS.length) * 100}%`;
  afterEls.number.textContent = String(number).padStart(2, "0");
  afterEls.axis.textContent = question.axis;
  afterEls.prompt.textContent = question.prompt;
  afterEls.context.textContent = question.context;
  afterEls.assumptions.textContent = question.assumptions;
  afterEls.scope.textContent = question.scope;
  afterEls.plain.textContent = question.guide.plain;
  afterEls.separate.textContent = question.guide.separate;
  afterEls.reveal.textContent = question.guide.reveal;
  afterEls.why.textContent = question.why;
  afterEls.explanation.open = false;
  afterEls.back.disabled = number === 1;
  afterEls.back.classList.toggle("invisible-control", number === 1);
  afterEls.next.disabled = !selectedId;
  afterEls.next.textContent = number === AFTER_QUESTIONS.length ? "See diagnostic →" : "Next question →";
  afterEls.choices.innerHTML = question.choices.map((choice, index) => `
    <label class="choice-button obligation-choice meaning-choice after-choice ${selectedId === choice.id ? "selected" : ""}" for="after-${question.id}-${choice.id}">
      <input class="choice-radio" type="radio" name="after-${question.id}" id="after-${question.id}-${choice.id}" value="${choice.id}" ${selectedId === choice.id ? "checked" : ""}>
      <span class="choice-key">${String.fromCharCode(65 + index)}</span>
      <span class="choice-copy"><strong>${choice.label}</strong><span>${choice.detail}</span></span>
      <span class="choice-arrow" aria-hidden="true">→</span>
    </label>`).join("");
  afterEls.choices.querySelectorAll(".choice-radio").forEach((input) => {
    input.addEventListener("change", () => selectAfterAnswer(question.id, input.value));
  });
  renderAfterMap();
  if (announce) afterEls.liveStatus.textContent = `Question ${number} of ${AFTER_QUESTIONS.length}: ${question.prompt}`;
  if (scroll) {
    scrollToAfterElement(afterEls.workspace, 82);
    afterEls.prompt.focus({ preventScroll: true });
  }
}

function selectAfterAnswer(questionId, choiceId) {
  afterState.answers[questionId] = choiceId;
  afterEls.choices.querySelectorAll(".after-choice").forEach((label) => {
    label.classList.toggle("selected", label.querySelector(".choice-radio").checked);
  });
  afterEls.next.disabled = false;
  renderAfterMap();
  afterEls.liveStatus.textContent = `Answer selected for question ${afterState.index + 1}. Choose Next when ready.`;
}

function renderAfterShiftReport(diagnosis) {
  const comparison = diagnosis.comparison;
  const comparisonCopy = `<article class="argument-note ${comparison.stable ? "stable-note" : "path-note"}">
    <span class="argument-note-label">Opening and final policy</span>
    <h3>${comparison.title}</h3>
    <p>${comparison.detail}</p>
  </article>`;
  const combinationCopy = diagnosis.combinations.length
    ? diagnosis.combinations.map((item) => `<article class="argument-note meaning-combination-note">
        <span class="argument-note-label">Combination to clarify</span>
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
      </article>`).join("")
    : '<p class="argument-empty">None of these five selected combinations appeared. This is not proof that every part of your policy fits together.</p>';
  document.querySelector("#afterShiftReport").innerHTML = `
    ${comparisonCopy}
    <p class="meaning-combination-intro">This lab checks five selected differences: retiring versus retaining moral words; ordinary belief versus conscious fiction; conscious fiction versus sincere reinterpretation; ordinary belief versus open revision; and procedure-set verdicts versus other sincere revisions. A combination is a question to explain, not an automatic contradiction.</p>
    <div class="meaning-combination-list">${combinationCopy}</div>`;
}

function renderAfterAnswerPath() {
  document.querySelector("#afterAnswerGrid").innerHTML = selectedAfterAnswers().map(({ question, choice }, index) => {
    const policy = AFTER_POLICIES[choice.policy];
    return `<article class="meaning-answer-card">
      <span>${String(index + 1).padStart(2, "0")} · ${policy.theory}</span>
      <h3>${question.axis}</h3>
      <strong>${choice.label}</strong>
      <p>${choice.interpretation}</p>
    </article>`;
  }).join("");
}

function renderAfterPolicyGuide(diagnosis) {
  document.querySelector("#afterFamilyGrid").innerHTML = AFTER_POLICY_ORDER.map((policyId) => {
    const policy = AFTER_POLICIES[policyId];
    const count = diagnosis.counts[policyId];
    return `<article class="meaning-family-card ${count ? "used" : ""}">
      <div><span>${policy.index}</span><b>${count} / 7 cases · ${diagnosis.allCounts[policyId]} / 9 all answers</b></div>
      <h3>${policy.theory}</h3>
      <strong>${policy.name}</strong>
      <p>${policy.note}</p>
    </article>`;
  }).join("");
}

function showAfterResults() {
  const diagnosis = afterDiagnostic();
  afterEls.workspace.classList.add("hidden");
  afterEls.results.classList.remove("hidden");
  afterEls.resultMapMount.append(afterEls.mapCard);
  afterEls.mapCard.classList.add("result-meaning-map");
  renderAfterMap();
  document.querySelector("#afterResultTitle").textContent = diagnosis.title;
  document.querySelector("#afterResultSummary").textContent = diagnosis.summary;
  document.querySelector("#afterPrimary").textContent = diagnosis.primary;
  document.querySelector("#afterPrimaryCopy").textContent = diagnosis.primaryCopy;
  document.querySelector("#afterPattern").textContent = diagnosis.pattern;
  document.querySelector("#afterPatternCopy").textContent = diagnosis.patternCopy;
  document.querySelector("#afterOpeningFinal").textContent = diagnosis.comparison.title;
  document.querySelector("#afterOpeningFinalCopy").textContent = diagnosis.comparison.detail;
  document.querySelector("#afterAIProbePrompt").value = buildAfterAIProbePrompt();
  renderAfterShiftReport(diagnosis);
  renderAfterAnswerPath();
  renderAfterPolicyGuide(diagnosis);
  afterEls.liveStatus.textContent = `After Moral Facts diagnostic ready: ${diagnosis.title}`;
  scrollToAfterElement(afterEls.results, 70);
  document.querySelector("#afterResultTitle").focus({ preventScroll: true });
}

function resetAfterLab() {
  afterState.answers = {};
  afterState.index = 0;
  afterEls.results.classList.add("hidden");
  afterEls.workspace.classList.remove("hidden");
  afterEls.liveMapMount.append(afterEls.mapCard);
  afterEls.mapCard.classList.remove("result-meaning-map");
  renderAfterQuestion({ announce: true });
}

afterEls.back.addEventListener("click", () => {
  if (afterState.index === 0) return;
  afterState.index -= 1;
  renderAfterQuestion();
});

afterEls.next.addEventListener("click", () => {
  const question = AFTER_QUESTIONS[afterState.index];
  if (!afterState.answers[question.id]) return;
  if (afterState.index >= AFTER_QUESTIONS.length - 1) {
    showAfterResults();
    return;
  }
  afterState.index += 1;
  renderAfterQuestion();
});

document.querySelector("#resetAfterButton").addEventListener("click", () => {
  if (!answeredAfterCount() || window.confirm("Reset every answer in the After Moral Facts lab?")) resetAfterLab();
});

document.querySelector("#restartAfterButton").addEventListener("click", resetAfterLab);

document.querySelector("#copyAfterPromptButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const prompt = document.querySelector("#afterAIProbePrompt");
  const status = document.querySelector("#afterPromptCopyStatus");
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

renderAfterQuestion({ scroll: false, announce: false });
