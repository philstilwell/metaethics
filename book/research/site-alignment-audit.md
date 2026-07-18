# Site Alignment Audit

## Baseline

- Site revision audited: `c8db8b8` — *Expand suite with guided non-realist labs*
- Audit date: July 18, 2026
- Book alignment baseline: `70ff53a` — *Align book with expanded metaethics suite*
- Manuscript coverage status: Parts I–VII drafted through Chapter 41; main manuscript complete

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

Chapters 19–24 now implement that epistemic-access sequence. Chapter 19 gives all seven proposed sources of evidential force separate treatment, while Chapters 20–24 preserve the required boundaries among intuition, genealogy, disagreement, empirical selection, practical settlement, uncertainty, and revision. The final access audit explicitly records insulation without calling it confirmation and failed access without inflating it into proof of nonexistence.

Chapters 25–31 now carry the expanded material into direct comparison among the major candidate systems. Consequentialism separates entry, currency, aggregation, distribution, and threshold repairs. Deontology keeps direct standing distinct from the weight and outcome assigned after entry. Virtue and care make context, relationship, formation, and caregiver limits explicit. Received-order views undergo the same access and revision audit applied to other foundations. Constructive procedures distinguish representation, idealization, legitimate settlement, and objective discovery. Local and plural views distinguish indexed standards from approval-independent criticism. The hybrid chapter uses the tradeoff methods as declared ordering rules rather than allowing “balance” or “all things considered” to hide a universal measure.

Inspection Report V confirms alignment at the level of method as well as topic. It compares candidates without a master score, preserves seams rather than automatically reporting contradictions, records bounded conclusions, and retains each theory's practical contribution even where objective authority remains unpaid. The new standing, tradeoff, and evidence material is therefore integrated into the main argument rather than isolated in dedicated chapters. The moral-emotions expansion is carried forward into Chapters 35–36 and the constructive ending.

Chapters 32–37 now implement the remaining pre-constructive alignment commitments. Chapter 32 uses the criticism grounds without converting their non-ordinal categories into a single scale. Chapter 33 implements the community-code decisions and preserves support, compliance, legitimacy, jurisdiction, and objective obligation as non-substitutable. Chapter 34 makes coercion and force explicit while adding the required safeguards and stopping rules. Chapter 35 separates responsibility practices from basic desert. Chapter 36 fully implements the moral-emotions expansion rather than treating it as an appendix to blame. Chapter 37 carries epistemic normativity, standing, comparison, desert, and hybrid ordering into the general grounding audit.

The resulting Part VI conclusion remains within the site's inference discipline: no examined route earns a system that is simultaneously stance-independent, contentful, authoritative for rejecters, accessible, coherent through conflict, and usable without an unsupported selector. The manuscript does not inflate this into a deductive proof that no possible objective moral property exists. Inspection Report VI labels what survives as factual, instrumental, expressive, commitment-based, agreement- or role-based, procedural, enforced, or objectively asserted but unpaid.

Chapters 38–41 now complete the Part VII transition from primitive emotions and values to public policy without reinstating an abstract moral sovereign. Chapter 38 preserves the non-ordinal post-error language options and makes policy choice context-sensitive. Chapter 39 prevents the nihilist inference by inventorying the concrete phenomena that survive. Chapter 40 treats emotions as salience signals whose appraisals require factual testing and whose values require explicit scope and comparison before policy. Chapter 41's Civic Stakes Brief integrates the expanded standing, comparison, evidence, emotion, code-construction, criticism, responsibility, and power material into one reusable institutional procedure.

The final admonition is therefore aligned with both the audited revision and the book's governing promise: stop allocating public compromise among abstract moral systems; begin with lived responses and operational values, test their factual models, represent affected parties, expose unresolved tradeoffs and coercion, add safeguards, and revise against evidence. Partial agreement remains partial. Policies are presented as supported, constructed, enforced, and corrigible rather than objectively certified.

## Future update procedure

For each later site revision:

1. Compare the current site commit with the commit recorded above.
2. Identify new question families, fixed distinctions, cases, inference limits, and cross-lab claims.
3. Map each concept to a manuscript chapter and a support-document rule.
4. Add a chapter only when the concept changes the cumulative argument; otherwise revise an existing chapter.
5. Search the manuscript for interface language such as “lab,” “tool,” “diagnostic,” “score,” and “suite.”
6. Record the new baseline commit and the exact alignment action here.
