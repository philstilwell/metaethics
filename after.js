"use strict";

const AFTER_POLICIES = {
  abolish: {
    index: "01",
    name: "Retire literal moral claims",
    theory: "Moral abolitionism",
    group: "retire",
    resultPhrase: "retiring literal moral claims",
    short: "Stop asserting that actions have objective moral properties. Speak directly about harms, rules, aims, commitments, and opposition.",
    note: "Abolitionism removes positive moral assertions from serious thought and talk. It does not require giving up care, values, criticism, laws, or efforts to change behavior.",
    interpretation: "You chose to remove the literal moral claim and say directly which facts, aims, rules, or commitments support the response.",
  },
  fiction: {
    index: "02",
    name: "Deliberate moral fiction",
    theory: "Revolutionary moral fictionalism",
    group: "preserve",
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
    resultPhrase: "continuing ordinary moral belief and practice",
    short: "Keep forming and using ordinary moral beliefs in daily life even while reflective theory says those beliefs are false.",
    note: "Conservationism is stronger than merely keeping familiar words: ordinary moral belief and practice continue. It therefore owes an account of the gap between reflective disbelief and everyday belief.",
    interpretation: "You chose to continue the ordinary moral judgment in daily thought and speech instead of marking it as fiction or giving it a new meaning.",
  },
  express: {
    index: "04",
    name: "Open commitment and coordination",
    theory: "Expressivist revision",
    group: "revise",
    resultPhrase: "recasting moral claims as commitments and plans",
    short: "Keep moral terms but openly use them mainly to express commitments, accept norms, and coordinate action.",
    note: "This is a broad revision strategy inspired by expressivism. The speaker sincerely takes a practical stand; the speaker is not pretending that an objective moral fact exists.",
    interpretation: "You chose to use moral language openly as a way to take a stand, accept a norm, and invite coordinated action.",
  },
  construct: {
    index: "05",
    name: "Defensible procedure or agreement",
    theory: "Constructivist revision",
    group: "revise",
    resultPhrase: "tying verdicts to defensible procedures or agreements",
    short: "Treat a verdict as the result of a named fair or rational procedure or agreement rather than a discovered objective fact.",
    note: "This lab uses a broad procedural revision, not every theory called constructivist. The procedure, its participants, and the reason its result should guide anyone must still be defended.",
    interpretation: "You chose to ground the verdict in a stated agreement or decision procedure rather than an objective moral property.",
  },
  pragmatic: {
    index: "06",
    name: "Lightweight practical shorthand",
    theory: "Ordinary-language pragmatism",
    group: "loosen",
    resultPhrase: "keeping moral words as flexible everyday shorthand",
    short: "Keep familiar words while lowering their metaphysical weight and unpacking them into harms, expectations, relationships, or rules when needed.",
    note: "“Ordinary-language pragmatism” is this project’s label for a broad practical strategy, not one established doctrine. It works only if speakers can unpack the shorthand when precision matters.",
    interpretation: "You chose familiar moral words as low-metaphysics shorthand and remained ready to spell out the concrete reasons behind them.",
  },
};

const AFTER_POLICY_ORDER = ["abolish", "fiction", "conserve", "express", "construct", "pragmatic"];

const AFTER_GROUPS = [
  { id: "retire", name: "Retire literal claims", families: ["abolish"] },
  { id: "preserve", name: "Preserve familiar practice", families: ["fiction", "conserve"] },
  { id: "revise", name: "Revise the practice openly", families: ["express", "construct"] },
  { id: "loosen", name: "Keep the words lightly", families: ["pragmatic"] },
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
      plain: "Imagine learning that moral words do not report facts that exist independently of every person and standard. Would you drop the claims, pretend for a useful purpose, continue ordinary belief, openly reinterpret the words, tie them to a procedure, or use them as loose shorthand?",
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
        label: "Continue ordinary moral belief and talk in daily life despite the reflective conclusion",
        detail: "Let everyday thought continue to treat some acts as really right or wrong, even while philosophical reflection says no such facts exist.",
      },
      express: {
        label: "Keep the words but openly use them to express commitments and coordinate plans",
        detail: "Explain that “That is wrong” mainly means “I reject this, accept a rule against it, and invite others to act with me.”",
      },
      construct: {
        label: "Tie every moral verdict to the result of a named fair procedure or agreement",
        detail: "Use “wrong” for conduct rejected by a defensible process—such as informed agreement among people whose interests are fairly represented.",
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
        detail: "She should deliberate in the ordinary moral way and treat the promise as a genuine duty, setting aside the reflective error-theory conclusion.",
      },
      express: {
        label: "Use “I ought” to reaffirm the rule and commitment she chooses to stand behind",
        detail: "Her sentence should openly express “I accept a practice of keeping promises, and I commit myself to following it here.”",
      },
      construct: {
        label: "Ask what promise rule informed people would agree to under fair conditions",
        detail: "Her “ought” should mean that this promise falls under a rule produced by a stated procedure that represents both promiser and recipient fairly.",
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
      separate: "Explaining harm can support a demand for apology without proving a stance-independent moral property. The child’s question is about the extra work done by “wrong.”",
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
        detail: "The parent should continue normal moral education and encourage Ivo to believe the moral verdict in daily life despite the reflective theory.",
      },
      express: {
        label: "Teach that “wrong” condemns the act and commits the family to a rule against humiliation",
        detail: "The parent should say openly that the word expresses a practical stand: “We oppose this treatment and accept a rule protecting classmates.”",
      },
      construct: {
        label: "Teach that fair rules made with every child represented would reject this treatment",
        detail: "The parent should connect “wrong” to a clear procedure in which Ivo could not design school rules without giving equal weight to the humiliated child.",
      },
      pragmatic: {
        label: "Keep “wrong” as simple shorthand, then explain the harm, expectation, and needed repair",
        detail: "The parent may use the familiar word without metaphysical claims as long as Ivo also receives the concrete explanation that gives it content here.",
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
        detail: "Leena should speak and believe as she normally would in friendship, even though her reflective theory denies the objective fact that judgment appears to assert.",
      },
      express: {
        label: "Use “wrong” openly to condemn the access and commit to a shared boundary",
        detail: "Leena should explain that her moral language expresses rejection of unauthorized access and acceptance of a rule they must follow to rebuild trust.",
      },
      construct: {
        label: "Base the verdict on the voluntary access rule both friends accepted",
        detail: "Leena should say the act violated a rule justified by their informed agreement and revise that agreement through a fair repair process.",
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
        detail: "Daily practice should treat intentional cruelty as genuinely deserving blame even while reflective inquiry denies objective moral desert.",
      },
      express: {
        label: "Use blame to express condemnation and commit the community to protective norms",
        detail: "Calling Niko blameworthy should openly register opposition, demand repair, and reinforce rules—not claim that suffering is objectively owed to him.",
      },
      construct: {
        label: "Use only blame practices that affected people would accept under a fair procedure",
        detail: "The label and response should follow transparent rules designed with the worker, Niko, and future vulnerable people fairly represented.",
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
      plain: "The court must act and give reasons. Should it remove moral claims, use them as fiction, preserve them, reinterpret them, attach them to a fair procedure, or use them as careful shorthand?",
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
        detail: "The court should preserve familiar belief and language about moral guilt and deserved punishment despite the reflective error-theory premise.",
      },
      express: {
        label: "Use condemnation openly to express public commitments and reinforce protective rules",
        detail: "The judgment should present moral language as the community’s practical stand against memory theft, not as discovery of objective guilt.",
      },
      construct: {
        label: "Tie condemnation and penalty to rules people would accept under a fair legal procedure",
        detail: "The court should justify its vocabulary and response through transparent procedures that fairly represent victims, accused people, and the public.",
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
        detail: "Reformers should use ordinary moral conviction in politics even while their reflective theory says objective injustice does not exist.",
      },
      express: {
        label: "Use “unjust” openly to reject unequal power and organize a commitment to equal votes",
        detail: "The claim should function as a sincere public stand and invitation to joint action, not a report of a stance-independent property.",
      },
      construct: {
        label: "Show that the auction fails a fair procedure in which each resident has equal standing",
        detail: "Reformers should define and defend the decision process whose result supports equal voting rather than presenting that result as discovered moral truth.",
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
    axis: "Case — the last reservoir",
    prompt: "A false-sounding moral slogan saves more water than a precise message. Which announcement should the city use?",
    context:
      "A drought leaves one reservoir for a city and a nearby refugee settlement. The city has twenty seconds of emergency broadcast time. Careful tests show that “Wasting water is morally wrong” cuts use by 30%, while “We oppose waste because it risks thousands of lives” cuts it by 22%. Both figures are reliable. The speaker accepts the no-objective-facts premise.",
    assumptions:
      "There is no time to give the full philosophy during the alert. The moral slogan is understood by most listeners as a literal claim. The 8-point difference is expected to prevent serious illness. Later explanation is possible.",
    scope:
      "Choose what the city should broadcast and how it should understand the wording. Balance effectiveness and honesty within the policy; do not deny the measured outcome.",
    why: "Emergency persuasion tests whether usefulness can justify familiar moral language and what transparency is owed afterward.",
    guide: {
      plain: "One sentence works better but encourages a belief the speaker rejects. The other is clearer about its basis but will probably protect fewer people.",
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
        detail: "The speaker may deliberately use the false-surfaced moral claim because its measured benefit is large, while treating disclosure and limits as part of the plan.",
      },
      conserve: {
        label: "Use the 30% slogan in the ordinary way and let everyday moral belief guide the emergency",
        detail: "The speaker should continue sincerely thinking and talking as though wasting water really is morally wrong, despite the reflective premise.",
      },
      express: {
        label: "Use moral language but make the commitment visible: “We condemn waste—protect every life”",
        detail: "The city should preserve the force of moral speech while wording it as an open stance and shared plan rather than an objective fact report.",
      },
      construct: {
        label: "Use the verdict only if it comes from an emergency rule accepted through a fair process",
        detail: "The broadcast should invoke a publicly defensible allocation rule that represents both the city and refugee settlement, even if the wording must be brief.",
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
        detail: "My general policy is to preserve everyday moral thinking and speech even though reflective inquiry classifies its apparent claims as false.",
      },
      express: {
        label: "Usually reinterpret moral claims openly as commitments, norms, and plans",
        detail: "My general policy is to use moral language sincerely for taking practical stands and coordinating action without claiming objective properties.",
      },
      construct: {
        label: "Usually tie moral verdicts to defensible procedures or agreements",
        detail: "My general policy is to make the relevant construction explicit and let its fair, informed result set the verdict.",
      },
      pragmatic: {
        label: "Usually keep moral vocabulary as lightweight, explainable shorthand",
        detail: "My general policy is to use ordinary words without heavy metaphysical meaning and unpack their concrete basis whenever precision matters.",
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

function afterCounts(answers = afterState.answers) {
  return AFTER_POLICY_ORDER.reduce((counts, policy) => {
    counts[policy] = Object.values(answers).filter((answer) => answer === policy).length;
    return counts;
  }, {});
}

function answeredAfterCount() {
  return selectedAfterAnswers().length;
}

function afterOpeningFinalComparison(answers = afterState.answers) {
  const opening = answers.opening;
  const final = answers.final;
  if (!opening || !final) return null;
  if (opening === final) {
    return {
      stable: true,
      title: `${AFTER_POLICIES[opening].theory} → same policy`,
      detail: `You began and ended with ${AFTER_POLICIES[opening].name.toLowerCase()}. The seven cases did not change your general recommendation, although your answers may still contain exceptions.`,
    };
  }
  return {
    stable: false,
    title: `${AFTER_POLICIES[opening].theory} → ${AFTER_POLICIES[final].theory}`,
    detail: `You began by favoring ${AFTER_POLICIES[opening].resultPhrase}, then ended by favoring ${AFTER_POLICIES[final].resultPhrase}. This is a revision to explain, not automatic incoherence.`,
  };
}

function collectAfterCombinations(counts = afterCounts()) {
  const has = (policy) => counts[policy] > 0;
  const combinations = [];
  if (has("abolish") && has("conserve")) combinations.push({
    id: "abolish-conserve",
    title: "Retirement and ordinary belief",
    detail: "Some answers remove literal moral claims while others continue ordinary moral belief. Explain which feature of the setting makes reflective accuracy govern one case but not the other.",
  });
  if (has("abolish") && has("fiction")) combinations.push({
    id: "abolish-fiction",
    title: "Retirement and conscious pretense",
    detail: "Some answers reject literal moral speech while others keep it as make-believe. State when the fiction’s benefit is large enough, who should know, and when direct language becomes required.",
  });
  if (has("fiction") && has("express")) combinations.push({
    id: "fiction-express",
    title: "Make-believe and sincere reinterpretation",
    detail: "A fictionalist use pretends that the surface story is true; an expressivist revision sincerely gives the sentence a practical role. Clarify which interpretation listeners are meant to understand in each case.",
  });
  if (has("conserve") && (has("express") || has("construct") || has("pragmatic"))) combinations.push({
    id: "conserve-revise",
    title: "Ordinary belief and open revision",
    detail: "Some answers preserve ordinary moral belief while others openly change what the words mean or how they are justified. Explain whether the difference is audience, urgency, institution, or another stated rule.",
  });
  if (has("construct") && has("pragmatic")) combinations.push({
    id: "construct-pragmatic",
    title: "Procedure-defined verdict and flexible shorthand",
    detail: "One policy gives a stated procedure authority to set the verdict; the other uses flexible shorthand for several practical facts. Say when a definite procedure is necessary and when looser wording is accurate enough.",
  });
  return combinations;
}

function afterDiagnostic(answers = afterState.answers) {
  const counts = afterCounts(answers);
  const max = Math.max(...AFTER_POLICY_ORDER.map((policy) => counts[policy]));
  const leaders = AFTER_POLICY_ORDER.filter((policy) => counts[policy] === max);
  const used = AFTER_POLICY_ORDER.filter((policy) => counts[policy] > 0);
  const primary = leaders.length === 1 ? AFTER_POLICIES[leaders[0]].theory : `${leaders.length}-way tie`;
  const title = leaders.length === 1
    ? `Your most-used policy favors ${AFTER_POLICIES[leaders[0]].resultPhrase}.`
    : "Your answers do not settle on one most-used policy.";
  const pattern = leaders.length === 1 ? `${max} of 9` : `${leaders.length}-way tie at ${max} of 9`;
  const primaryCopy = leaders.length === 1
    ? `${AFTER_POLICIES[leaders[0]].name} appears in ${max} of your nine answers. This is an exact count, not a strength or certainty score.`
    : `${leaders.map((policy) => AFTER_POLICIES[policy].theory).join(", ")} each appear ${max} times. No tie-break rule has been added.`;
  const patternCopy = used.length === 1
    ? "You used one policy in every setting. That consistency does not by itself show that the policy is true or workable."
    : `You used ${used.length} of the six policies. A mixed pattern may reflect context, uncertainty, or a distinction you should make explicit.`;
  return {
    counts,
    max,
    leaders,
    used,
    primary,
    title,
    pattern,
    primaryCopy,
    patternCopy,
    summary: `Your nine answers used ${used.length} of six post-error policies. The display reports exact selections and selected contrasts; it does not diagnose your character or prove incoherence.`,
    comparison: afterOpeningFinalComparison(answers),
    combinations: collectAfterCombinations(counts),
  };
}

function buildAfterAIProbePrompt(answers = afterState.answers) {
  const diagnosis = afterDiagnostic(answers);
  const answerLines = AFTER_QUESTIONS.map((question, index) => {
    const choice = question.choices.find((item) => item.id === answers[question.id]);
    return choice
      ? `${index + 1}. ${question.axis}\nQuestion: ${question.prompt}\nFixed facts: ${question.assumptions}\nMy answer: ${choice.label}\nWhat I chose: ${choice.detail}\nPolicy family: ${AFTER_POLICIES[choice.policy].theory}`
      : `${index + 1}. ${question.axis}: unanswered`;
  }).join("\n\n");
  const countLines = AFTER_POLICY_ORDER.map((policy) => `- ${AFTER_POLICIES[policy].theory}: ${diagnosis.counts[policy]} of 9`).join("\n");
  const combinationLines = diagnosis.combinations.length
    ? diagnosis.combinations.map((item) => `- ${item.title}: ${item.detail}`).join("\n")
    : "- None of the lab’s five selected policy combinations appeared. Do not treat this as proof that the view has no tension.";
  const comparison = diagnosis.comparison
    ? `${diagnosis.comparison.title}. ${diagnosis.comparison.detail}`
    : "Opening-to-final comparison unavailable.";
  return `Act as a patient philosophical interviewer. Use clear language suitable for a curious high-school student, but do not simplify away important distinctions.

WORKING PREMISE
For this interview only, assume there are no objective moral facts: no action has a stance-independent property of moral rightness, wrongness, obligation, permission, or desert. Do not spend the interview trying to prove or disprove that premise. Ordinary facts about harm, agreements, laws, feelings, power, and consequences remain real.

TASK
Help me decide what to do with moral thought and language after accepting that premise. The six policy families in this lab are:
- Moral abolitionism: retire literal moral claims and state practical facts, aims, rules, and commitments directly.
- Revolutionary moral fictionalism: knowingly retain moral language as a useful fiction.
- Moral conservationism: continue ordinary moral belief and practice in daily life despite reflective error theory.
- Expressivist revision: openly use moral claims to express commitments, accept norms, and coordinate plans.
- Constructivist revision: tie verdicts to a named defensible procedure or agreement rather than discovered moral truth.
- Ordinary-language pragmatism: keep moral vocabulary as lightweight shorthand and unpack it when precision matters. This is a broad project label, not one established doctrine.

MY EXACT COUNTS
${countLines}

OPENING TO FINAL
${comparison}

FIVE SELECTED COMPARISONS CHECKED BY THE LAB
The lab checks only: abolitionism with conservationism; abolitionism with fictionalism; fictionalism with expressivist revision; conservationism with any open revision; and constructivist revision with ordinary-language pragmatism.
${combinationLines}

MY NINE ANSWERS
${answerLines}

INTERVIEW RULES
1. Ask one focused question at a time and wait for my answer.
2. Begin by asking me to defend the most important rule that explains why I changed policies across settings—or why one policy should govern them all.
3. Distinguish belief from words, and both from the practical action being recommended.
4. Do not infer that “no objective moral facts” means “nothing matters,” “all choices are equal,” “laws disappear,” or “cruelty must be accepted.”
5. Do not call a mixed pattern incoherent merely because more than one policy appears. Test whether I can state a non-circular context rule that predicts the difference.
6. Press fictionalism on transparency, audience understanding, usefulness, and exit conditions.
7. Press conservationism on how ordinary moral belief can be retained while reflective inquiry says it is false.
8. Press abolitionism on expressive force, speed, education, and coordination costs.
9. Press expressivist revision on whether listeners understand the revised meaning and how deep disagreement is handled.
10. Press constructivist revision on who chooses the procedure, who is represented, why its result has authority, and how dissent is handled.
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
  const counts = afterCounts();
  const answered = answeredAfterCount();
  afterEls.mapKicker.textContent = answered === 9 ? "Your nine answers" : "Your answers so far";
  afterEls.mapNote.textContent = answered === 9
    ? "This final chart counts the policy selected in each of the nine questions."
    : "Each completed question adds one count to the policy you selected.";
  afterEls.mapBasis.textContent = `${answered} of 9 answers classified`;
  afterEls.map.setAttribute(
    "aria-label",
    answered
      ? AFTER_POLICY_ORDER.map((policy) => `${AFTER_POLICIES[policy].name}: ${counts[policy]}`).join("; ")
      : "No language policies classified yet",
  );
  afterEls.map.innerHTML = AFTER_GROUPS.map((group) => `
    <section class="meaning-map-group">
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
              <span class="meaning-meter" aria-hidden="true"><i style="width: ${(count / 9) * 100}%"></i></span>
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
  if (scroll) scrollToAfterElement(afterEls.workspace, 82);
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
    <p class="meaning-combination-intro">This lab checks five selected differences: retirement versus ordinary belief; retirement versus conscious fiction; conscious fiction versus sincere expression; ordinary belief versus open revision; and a procedure-defined verdict versus flexible shorthand. A combination is a question to explain, not an automatic contradiction.</p>
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
      <div><span>${policy.index}</span><b>${count} / 9 uses</b></div>
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
