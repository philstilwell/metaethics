# Site Alignment Audit

## Baseline

- Site revision audited: `c8db8b8` — *Expand suite with guided non-realist labs*
- Audit date: July 18, 2026
- Book alignment baseline: `70ff53a` — *Align book with expanded metaethics suite*
- Manuscript coverage status: Parts I–III drafted through Chapter 18

This document records whether conceptual changes to the site are represented in the book. It is an internal maintenance document and may name labs and implementation files. The published manuscript may not.

## New material in the audited revision

| New site material | Central question | Required book treatment | Alignment action |
| --- | --- | --- | --- |
| `evidence-config.js` | Why should evidence guide belief, if at all? | Distinguish truth-indication, belief's constitutive aim, truth-seeking projects, usefulness, inquiry practices, public procedure, and epistemic anti-normativism. Keep moral and epistemic skepticism separate. | Add a dedicated epistemic-normativity chapter and include the issue in the general grounding partition. |
| `standing-config.js` | What makes a being or system count for its own sake? | Treat experience, agency, interests, relationships, membership, objective status, constructed inclusion, and denial separately. Preserve standing/weight/outcome distinctions. | Expand the existing domain chapter and carry uncertainty about standing into institutional safeguards. |
| `tradeoffs-config.js` | How can unlike values be compared without a universal measuring unit? | Test common-scale aggregation, priority, protected boundaries, emergency thresholds, lexical priority, plural judgment, fair procedure, and chosen settlement. | Add a dedicated comparison chapter and connect it to hybrid theories and public policy. |
| `emotions-config.js` | What can guilt, shame, resentment, indignation, gratitude, and pride do without basic desert? | Separate desert, harm recognition, relationship, protest, repair, expression, regulation, and revision. Separate cause, appraisal, function, expression, intensity, and duration. | Add a dedicated post-desert emotions chapter next to responsibility and extend the constructive ending. |
| `method.html` | What may each exercise legitimately conclude? | Fixed facts, narrow questions, visible inferences, bounded conclusions, seams rather than automatic contradictions. | Expand the method document and use a four-part exercise disclosure rule. |
| `find.js` | Where should a reader enter a non-linear conceptual field? | Permit alternate reading routes while preserving the main cumulative construction. | Add optional route notes during full drafting; do not turn routes into reader identities. |

## Coverage conclusions

The original book architecture already contained partial material on standing, value conflict, evidence, and emotion. Partial coverage was insufficient because the new site material identifies distinctions that can change the book's central argument:

- Epistemic normativity prevents the book from simply appealing to evidence while challenging every other normative relation.
- Direct standing precedes aggregation and priority; failing to separate them can hide a value selector inside the domain.
- A practical settlement can be coherent without proving that unlike values share an objective order.
- Moral emotions may survive as recognition, protest, relationship, repair, expression, or regulation even when intrinsic desert does not.

The revised architecture therefore contains forty-one chapters rather than thirty-eight. No new topic changes the book's intended conclusion, but each makes the route to that conclusion more complete and less vulnerable to charges of selective skepticism.

The drafted manuscript now implements the full reasons-and-authority sequence in Chapters 12–18. It preserves the required distinction between causal, motivating, conditional, and aim-independent reasons; keeps social pressure and sanction separate from obligation; and ends with epistemic access still open for Chapter 19 rather than treating practical-reason skepticism as an answer to epistemic normativity.

## Future update procedure

For each later site revision:

1. Compare the current site commit with the commit recorded above.
2. Identify new question families, fixed distinctions, cases, inference limits, and cross-lab claims.
3. Map each concept to a manuscript chapter and a support-document rule.
4. Add a chapter only when the concept changes the cumulative argument; otherwise revise an existing chapter.
5. Search the manuscript for interface language such as “lab,” “tool,” “diagnostic,” “score,” and “suite.”
6. Record the new baseline commit and the exact alignment action here.
