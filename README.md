# The Coherence Engine

A static, branching diagnostic for testing the structural coherence of proposed moral systems. It is designed for GitHub Pages and runs entirely in the browser with no AI calls, analytics, accounts, or backend.

The survey operationalizes thirteen tests drawn from Phil Stilwell’s work:

1. Domain
2. Object
3. Value
4. Meaning
5. Status
6. Generation
7. Reason
8. Similarity
9. Conflict
10. Evidence
11. Usability
12. Origin
13. Revision

The diagnostic uses explicit scoring and cross-answer conflict rules in `app.js`. Three descriptive profile questions—foundation, stated circle, and leading concern—do not reward one philosophical position over another. The thirteen scored parts receive equal weight. The overall result starts with their average, subtracts 4 points per strong cross-answer conflict, 2 per possible conflict, and 5 for each profile definition the user explicitly leaves unspecified, with a floor of 0. It treats coherence as structural clarity and consistency, not as truth, legitimacy, kindness, wisdom, or objective moral authority.

The `papers.html` reading room includes the project’s source papers and a curated set of work on expressivism, error theory, abolitionism, fictionalism, evolutionary challenges to realism, and post-error practice. Visitors can add papers to a private shelf stored in their own browser.

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
