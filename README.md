# The Moral Compass

A static collection of five interactive metaethics tools. The central [project hub](index.html) explains how the tools examine different parts of moral thought and uses a nine-module grid with four positions reserved for future additions. The site is designed for GitHub Pages and runs entirely in the browser with no AI calls, analytics, accounts, or backend.

The current tools work together without forming a required sequence:

1. The [Moral Profile](profile.html) maps the kinds of reasons a user selects across difficult choices.
2. [What Do You Mean by Wrong?](wrong.html) examines what a user takes moral claims to mean or do.
3. [The Missing Ought](obligation.html) tests what could give a demand authority beyond social pressure or approval.
4. [After Moral Facts](after.html) asks what should happen to moral language and practice if objective moral facts are held to be absent.
5. [The Disagreement Decoder](decoder.html) separates the factual, verbal, practical, procedural, and metaethical layers hidden inside opposite moral verdicts.

The Moral Profile presents six unusual moral situations involving emergency sacrifice, a dead person’s synthetic voice, loyalty and cheating, animal suffering and extinction, memory erasure, and a conscious digital replica. Each situation asks two separate questions:

1. What should be done in this exact case?
2. Which offered reason is doing the most work in that judgment?

The selected reasons form a profile across eight tendencies:

1. Outcomes and welfare
2. Rules and duties
3. Rights and autonomy
4. Care and relationships
5. Character and integrity
6. Fairness and procedure
7. Loyalty and belonging
8. Authority and tradition

These tendencies are associated with recognizable philosophical families, but the tool does not infer a complete moral theory from one action. It reports each signal as “times chosen / times offered,” since not every reason fits every scenario. A mixed profile is treated as plural or context-sensitive reasoning, not as incoherence by itself.

Potential tensions are deliberately narrow. The tool flags an action when the exact reason selected does not readily support it as described. It also compares a stated identity-neutral rule with an earlier exception explicitly based on loyalty alone. A flag asks for another explanatory bridge; it is not a proof of irrationality.

The final metaethical question—realism, authority-grounded morality, constructivism, relativism, or non-realism—is reported separately. It never raises or lowers a reasoning tendency.

The final diagnostic includes a responsive radar map of the eight associated philosophical families. It also builds a copyable AI interview prompt containing the full scenario facts and fixed assumptions, the user's exact choices and answer meanings, all eight signal rates, the separate metaethical stance, the survey's method and limits, and any narrow tensions detected. The site makes no AI call and sends nothing; the user decides whether to paste the prompt into another service. Users can reset all answers either during the survey or from the results page.

The [Missing Ought obligation lab](obligation.html) is a sister interactive. Seven cases separate personal commitment, shared rules, social pressure, punishment, conditional duties, proposed additional foundations, and approval-independent claims. These are displayed as peer categories rather than a scale. The diagnostic counts only explicit social-fact-to-duty inferences, reports added foundations separately from errors, notes changes between the opening and final scope, and generates a full optional AI interview prompt without sending any data.

The [What Do You Mean by Wrong? meaning lab](wrong.html) is a seven-question branching diagnostic about moral language. The first answer selects one of four deeper routes—fact claims, practical commitments, standards and procedures, or language used as a tool—while every question continues to offer the same six interpretations. Results map robust moral realism, error theory, plan/norm expressivism, standard-relative readings, idealized-procedure constructivism, and revolutionary moral fictionalism; compare the opening and final definitions; report exact answer counts; examine four explicitly selected cross-family combinations; and generate a complete optional AI interview prompt. The tool notes that these are narrow comparison families rather than complete definitions, relativism is not automatically anti-realism, and constructivism’s classification is disputed.

The [After Moral Facts practical lab](after.html) begins by holding moral error theory fixed and asking what should happen next. Nine questions cover a general opening policy, promises, parenting, friendship, blame, criminal law, political reform, public persuasion, and a final general policy. Every question offers the same six response strategies, but the tool does not present them as six theories at one level: abolitionism, revolutionary fictionalism, and conservationism are the classic post-error responses; expressivist revision, constructivist revision, and ordinary-language pragmatism are broader replacements or reinterpretations. The main profile counts only the seven practical cases, while the repeated opening and final general answers are compared separately. Results report exact, non-ordinal counts; explain five selected belief-and-language differences without automatically calling them incoherent; visualize all six strategies; and create a complete optional AI interview prompt containing every full situation, fixed assumption, and question scope.

[The Disagreement Decoder](decoder.html) starts with two opposite claims about assisted dying and then reveals one carefully bounded dispute at a time. Its opening checkpoint teaches that slogans alone underdetermine the source of a disagreement. Eight single-layer checkpoints isolate definitions or framing, empirical predictions, whose interests receive standing, priority among shared values, personal attitudes and commitments, social-coordination rules, decision procedures, and alleged objective moral facts. A tenth integration checkpoint asks users to identify several explicitly stated layers at once without adding familiar but unstated ones. The result separates the eight layer checks from the two restraint/integration checks, groups performance into five transparent skills, and never treats a moral position as correct or incorrect. Its graphical map distinguishes evidence-responsive questions from guaranteed empirical resolution, inclusion from priority, attitudes from beliefs about attitudes, practical settlements from moral agreement, and institutional decisions from objective moral truth. A reusable eight-question checklist and full optional AI prompt transfer the method to another real disagreement.

The [papers page](papers.html) includes the project’s source papers and a curated reading room on expressivism, error theory, abolitionism, fictionalism, evolutionary challenges to realism, and post-error practice. Visitors can also add papers to a private shelf stored only in their browser.

## Run locally

Serve the repository root with any static server, for example:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

Run the measurement-logic audit with:

```sh
node tests/logic-audit.cjs
node tests/obligation-audit.cjs
node tests/meaning-audit.cjs
node tests/after-audit.cjs
node tests/decoder-audit.cjs
node tests/hub-audit.cjs
```

## Sources

- [How to Test a “Moral” System: A Field Guide to Metaethics, Value Disagreement, and the Architecture of Values](https://www.academia.edu/169114427/_How_to_Test_a_Moral_System_A_Field_Guide_to_Metaethics_Value_Disagreement_and_the_Architecture_of_Values)
- [The Parsimonious World of the Moral Non-Realist: Illegitimate Questions, Surviving Values, and Life Without a Moral Realm](https://www.academia.edu/169490990/_The_Parsimonious_World_of_the_Moral_Non_Realist_Illegitimate_Questions_Surviving_Values_and_Life_Without_a_Moral_Realm)
