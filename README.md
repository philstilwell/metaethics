# The Moral Compass

A static, scenario-based profile of the kinds of moral reasons a person uses. It is designed for GitHub Pages and runs entirely in the browser with no AI calls, analytics, accounts, or backend.

The survey presents six unusual moral situations involving emergency sacrifice, a dead person’s synthetic voice, loyalty and cheating, animal suffering and extinction, memory erasure, and a conscious digital replica. Each situation asks two separate questions:

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
```

## Sources

- [How to Test a “Moral” System: A Field Guide to Metaethics, Value Disagreement, and the Architecture of Values](https://www.academia.edu/169114427/_How_to_Test_a_Moral_System_A_Field_Guide_to_Metaethics_Value_Disagreement_and_the_Architecture_of_Values)
- [The Parsimonious World of the Moral Non-Realist: Illegitimate Questions, Surviving Values, and Life Without a Moral Realm](https://www.academia.edu/169490990/_The_Parsimonious_World_of_the_Moral_Non_Realist_Illegitimate_Questions_Surviving_Values_and_Life_Without_a_Moral_Realm)
