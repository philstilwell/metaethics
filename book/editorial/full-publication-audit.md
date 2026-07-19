# Full Publication Audit

## Disposition

**Passed after correction — July 19, 2026.** The complete manuscript, support apparatus, production sources, print PDFs, illustrated reader PDF, and EPUB were audited as one publication system. Every actionable finding discovered in this pass was implemented and rechecked. No editorial or digital-production recommendation remains open.

The only remaining decisions are external publication choices already listed in the final proof report: imprint and ISBNs, rights and pricing, release date, retailer accounts, paper and binding, author biography and optional photograph, final wraparound cover and spine, and approval of a physical printer proof.

## Scope and standard

The audit asked six questions:

1. **Does the argument say exactly what it has earned?** Every major inference, Inspection Report, and conclusion was checked against the book's stated objective-morality specification and bounded-inference rule.
2. **Can a novice tell where the journey is going and why each stop matters?** Chapter routes, local purpose annotations, exercise instructions, transitions, recurring artifacts, and end-of-part syntheses were checked across the full reading sequence.
3. **Do the reusable materials faithfully encode the prose argument?** The Candidate System Workbook, pressure cases, repair guide, Civic Stakes Brief, glossary and position map, and limits statement were checked for count, terminology, sequence, and cross-reference consistency.
4. **Is the book aligned with the current conceptual site?** The local site was compared through repository revision `e03e844`, and its full automated test suite was run.
5. **Are the publication files readable and internally complete?** Every PDF page was inspected, all wide tables and unusual page transitions received additional attention, and the EPUB package, navigation, metadata, markup, copyright, cover labeling, and internal links were tested.
6. **Can the edition be rebuilt without a machine-specific dependency?** Production scripts, fonts, generated artifacts, checksums, and build logs were checked for portability and regressions.

## Findings implemented

### Argument and reader guidance

- Tightened the final claim so it reports a construction result: no examined route earns the complete stance-independent specification. It does not claim a deductive proof that no possible objective moral fact exists.
- Recast the last movement in terms of the beings and experiences the inquiry can identify and publicly examine, rather than implying that an alternative moral law has been discovered.
- Clarified the Chapter 39 survivor declaration and removed a one-line spill page before Chapter 40.
- Standardized **Debt Ledger** as the name of the recurring reader artifact.
- Shortened an early exercise label whose wording was visually unwieldy while preserving the distinction the exercise tests.
- Expanded the five requested Chapter 3 sections with complete worked translations, paired agreement examples, stable and unstable Semantic Rules, a filled Debt Ledger entry, explicit guardrails, and statements of what each exercise does not establish.
- Added shorter worked entries to the analogous Part I construction and debt sections so readers learn how to complete the recurring artifacts before later chapters increase the pressure.

### Exercises and tables

- Rebuilt the Chapter 24 Access Audit as a self-contained exercise: its caption now identifies the exact prior matrix entries the reader must carry forward.
- Gave the ten-column Access Audit a dedicated width profile so foundational claims remain legible and the completed table fits on one landscape page.
- Added keep-with-content controls for pressure-deck section headings and confirmed that no section title is stranded at a page foot.
- Corrected the remaining compact-table wording that produced an overfull line in Appendix D.

### Digital and production integrity

- Removed machine-specific font-file paths and retained the intended Libertinus families by portable family name.
- Added the complete copyright page to the EPUB.
- Added an explicit accessible title to the EPUB cover image while preserving the required uncompressed-first `mimetype` entry.
- Updated the build to normalize and validate the EPUB after Pandoc creates it.
- Corrected publication metadata and support documents to the final 523-page edition and to approximately 149,600 words. The Markdown build inputs contain 149,582 source words before generated contents entries and title-page typography.

## Verification record

### Source and conceptual checks

- Forty-two narrative files: the prologue plus forty-one numbered chapters.
- Six appendices and forty-one chapter-note entries.
- Nineteen construction worksheets, forty-five pressure cases, eighteen repair entries, and fourteen Civic Stakes Brief sections.
- Forty-two narrative route markers, 102 purpose annotations, and six Inspection Reports.
- No broken local Markdown link or out-of-range internal chapter, appendix, worksheet, card, repair, or Civic Stakes reference.
- No unresolved placeholder, adjacent duplicate word, trailing whitespace, replacement character, or development-interface term in publication-facing text.
- Notes and bibliography entries correspond to cited authors and works at the level required by the claim-and-source audit.
- All twenty automated site tests pass; no conceptual site change occurred after the recorded alignment baseline.

### PDF checks

| Artifact | Final result |
|---|---|
| Main print proof | 523 pages, 7 × 10 inches; 506 portrait pages and 17 intentional landscape table pages |
| Illustrated reader edition | 523 pages, 7 × 10 inches; illustrated cover replaces the interior title page |
| Companion workbook | 68 US-letter pages; 55 portrait pages and 13 intentional landscape table pages |

- The 517-page baseline received a complete page-by-page contact-sheet inspection. After the worked-example revision, every changed or reflowed Part I page and the new blank verso were rendered again; the dense Chapter 3 examples were inspected at full resolution. The recto reset leaves the previously inspected Parts II–VII and appendices unchanged apart from physical page numbering.
- Main-edition outlines contain 58 navigable entries; the workbook outline contains four.
- All fonts are embedded, subset, and Unicode-mapped.
- Final TeX logs contain no error, missing-character warning, undefined control sequence, or alignment overfull box.
- Text extraction contains no replacement glyph or leaked TeX command.
- The seven blank main-edition pages and one blank workbook page are intentional versos, free of folios and running heads.
- Artifact checksums validate against `output/SHA256SUMS`.

### EPUB checks

- EPUB 3 archive integrity and XML/XHTML parsing pass.
- The package contains the title page and 52 content documents, complete navigation, metadata, stylesheet, full copyright notice, and accessible cover labeling.
- All package resources and internal links resolve.
- The `mimetype` file is first in the archive and stored without compression, as EPUB requires.

## Publication boundary

This audit approves the supplied digital artifacts and the source-controlled interior design. It does not substitute for checking an actual bound proof, whose gutter behavior, color reproduction, paper show-through, trimming, and spine width depend on the selected printer and materials. That is a release-stage manufacturing check, not an unresolved manuscript recommendation.
