#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PRODUCTION_DIR="$PROJECT_ROOT/book/production"
BUILD_DIR="$PROJECT_ROOT/tmp/pdfs/objective-morality-project"
PDF_DIR="$PROJECT_ROOT/output/pdf"
EBOOK_DIR="$PROJECT_ROOT/output/ebook"
COVER_DIR="$PROJECT_ROOT/output/cover"
LATEX_HELPER="/Users/philstilwell/.codex/plugins/cache/openai-bundled/latex/0.2.4/scripts/compile_latex.py"

mkdir -p "$BUILD_DIR/cover-out" "$BUILD_DIR/main-out" "$BUILD_DIR/workbook-out" "$PDF_DIR" "$EBOOK_DIR" "$COVER_DIR"

python3 "$LATEX_HELPER" \
  --compiler=texlive \
  --engine=xelatex \
  --output-directory="$BUILD_DIR/cover-out" \
  "$PRODUCTION_DIR/cover.tex"

cp -f "$BUILD_DIR/cover-out/cover.pdf" "$COVER_DIR/the-objective-morality-project-front-cover.pdf"

pdftoppm \
  -f 1 \
  -singlefile \
  -r 300 \
  -jpeg \
  -jpegopt quality=95 \
  "$COVER_DIR/the-objective-morality-project-front-cover.pdf" \
  "$COVER_DIR/the-objective-morality-project-front-cover"

main_inputs=(
  "$PROJECT_ROOT/book/front-matter/copyright.md"
  "$PRODUCTION_DIR/contents.md"
  "$PROJECT_ROOT/book/front-matter/how-to-use-this-book.md"
  "$PRODUCTION_DIR/mainmatter.md"
  "$PROJECT_ROOT/book/manuscript/00-prologue.md"
  "$PROJECT_ROOT/book/part-dividers/part-01.md"
  "$PROJECT_ROOT/book/manuscript/01-the-promise.md"
  "$PROJECT_ROOT/book/manuscript/02-what-objective-must-mean.md"
  "$PROJECT_ROOT/book/manuscript/03-what-are-you-doing-when-you-say-wrong.md"
  "$PROJECT_ROOT/book/manuscript/04-the-specification-sheet.md"
  "$PROJECT_ROOT/book/manuscript/05-one-argument-eight-disagreements.md"
  "$PROJECT_ROOT/book/part-dividers/part-02.md"
  "$PROJECT_ROOT/book/manuscript/06-draw-the-circle.md"
  "$PROJECT_ROOT/book/manuscript/07-decide-what-receives-a-verdict.md"
  "$PROJECT_ROOT/book/manuscript/08-name-what-matters.md"
  "$PROJECT_ROOT/book/manuscript/09-turn-values-into-guidance.md"
  "$PROJECT_ROOT/book/manuscript/10-choosing-without-a-common-measure.md"
  "$PROJECT_ROOT/book/manuscript/11-like-cases-exceptions-and-identity.md"
  "$PROJECT_ROOT/book/part-dividers/part-03.md"
  "$PROJECT_ROOT/book/manuscript/12-three-different-things-called-a-reason.md"
  "$PROJECT_ROOT/book/manuscript/13-current-aims-and-better-informed-aims.md"
  "$PROJECT_ROOT/book/manuscript/14-commitments-promises-and-roles.md"
  "$PROJECT_ROOT/book/manuscript/15-fair-terms-and-constructed-reasons.md"
  "$PROJECT_ROOT/book/manuscript/16-reasons-that-apply-whether-you-care-or-not.md"
  "$PROJECT_ROOT/book/manuscript/17-from-approval-to-obligation.md"
  "$PROJECT_ROOT/book/manuscript/18-god-nature-and-rational-necessity.md"
  "$PROJECT_ROOT/book/part-dividers/part-04.md"
  "$PROJECT_ROOT/book/manuscript/19-does-evidence-have-authority.md"
  "$PROJECT_ROOT/book/manuscript/20-intuition-and-the-feeling-of-obviousness.md"
  "$PROJECT_ROOT/book/manuscript/21-where-values-come-from.md"
  "$PROJECT_ROOT/book/manuscript/22-disagreement-and-convergence.md"
  "$PROJECT_ROOT/book/manuscript/23-facts-enter-values-select.md"
  "$PROJECT_ROOT/book/manuscript/24-novel-cases-uncertainty-and-correction.md"
  "$PROJECT_ROOT/book/part-dividers/part-05.md"
  "$PROJECT_ROOT/book/manuscript/25-count-the-consequences.md"
  "$PROJECT_ROOT/book/manuscript/26-respect-the-rule-and-the-person.md"
  "$PROJECT_ROOT/book/manuscript/27-character-care-and-belonging.md"
  "$PROJECT_ROOT/book/manuscript/28-receive-the-moral-order.md"
  "$PROJECT_ROOT/book/manuscript/29-build-what-no-one-could-reasonably-reject.md"
  "$PROJECT_ROOT/book/manuscript/30-let-standards-remain-local-or-plural.md"
  "$PROJECT_ROOT/book/manuscript/31-the-hybrid-rescue.md"
  "$PROJECT_ROOT/book/part-dividers/part-06.md"
  "$PROJECT_ROOT/book/manuscript/32-criticize-the-world-you-inherited.md"
  "$PROJECT_ROOT/book/manuscript/33-build-a-public-code-without-the-missing-layer.md"
  "$PROJECT_ROOT/book/manuscript/34-power-dissent-and-the-person-who-still-says-no.md"
  "$PROJECT_ROOT/book/manuscript/35-responsibility-without-cosmic-payback.md"
  "$PROJECT_ROOT/book/manuscript/36-moral-emotions-without-moral-desert.md"
  "$PROJECT_ROOT/book/manuscript/37-no-candidate-returns-intact.md"
  "$PROJECT_ROOT/book/part-dividers/part-07.md"
  "$PROJECT_ROOT/book/manuscript/38-decide-what-to-do-with-moral-language.md"
  "$PROJECT_ROOT/book/manuscript/39-everything-that-did-not-disappear.md"
  "$PROJECT_ROOT/book/manuscript/40-begin-with-the-primitives.md"
  "$PROJECT_ROOT/book/manuscript/41-stop-reconciling-moral-systems.md"
  "$PROJECT_ROOT/book/appendices/A-candidate-system-workbook.md"
  "$PROJECT_ROOT/book/appendices/B-pressure-cases.md"
  "$PROJECT_ROOT/book/appendices/C-common-repairs-and-their-debts.md"
  "$PROJECT_ROOT/book/appendices/D-civic-stakes-brief.md"
  "$PROJECT_ROOT/book/appendices/E-glossary-and-position-map.md"
  "$PROJECT_ROOT/book/appendices/F-limits-of-the-conclusion.md"
  "$PRODUCTION_DIR/backmatter.md"
  "$PROJECT_ROOT/book/back-matter/notes-and-further-reading.md"
  "$PROJECT_ROOT/book/back-matter/bibliography.md"
)

pandoc "${main_inputs[@]}" \
  --standalone \
  --from=markdown+smart+raw_tex+task_lists+autolink_bare_uris \
  --to=latex \
  --top-level-division=chapter \
  --metadata-file="$PRODUCTION_DIR/book-metadata.yml" \
  --include-in-header="$PRODUCTION_DIR/header.tex" \
  --include-before-body="$PRODUCTION_DIR/title-pages.tex" \
  --lua-filter="$PRODUCTION_DIR/layout.lua" \
  --output="$BUILD_DIR/main.tex"

python3 "$LATEX_HELPER" \
  --compiler=texlive \
  --engine=xelatex \
  --output-directory="$BUILD_DIR/main-out" \
  "$BUILD_DIR/main.tex"

cp -f "$BUILD_DIR/main-out/main.pdf" "$PDF_DIR/the-objective-morality-project.pdf"

python3 "$PRODUCTION_DIR/assemble-reader-pdf.py" \
  "$COVER_DIR/the-objective-morality-project-front-cover.pdf" \
  "$PDF_DIR/the-objective-morality-project.pdf" \
  "$PDF_DIR/the-objective-morality-project-with-cover.pdf"

workbook_inputs=(
  "$PROJECT_ROOT/book/front-matter/copyright.md"
  "$PRODUCTION_DIR/contents.md"
  "$PRODUCTION_DIR/mainmatter.md"
  "$PROJECT_ROOT/book/appendices/A-candidate-system-workbook.md"
  "$PROJECT_ROOT/book/appendices/B-pressure-cases.md"
  "$PROJECT_ROOT/book/appendices/C-common-repairs-and-their-debts.md"
  "$PROJECT_ROOT/book/appendices/D-civic-stakes-brief.md"
)

pandoc "${workbook_inputs[@]}" \
  --standalone \
  --from=markdown+smart+raw_tex+task_lists+autolink_bare_uris \
  --to=latex \
  --top-level-division=chapter \
  --metadata-file="$PRODUCTION_DIR/workbook-metadata.yml" \
  --include-in-header="$PRODUCTION_DIR/header.tex" \
  --include-before-body="$PRODUCTION_DIR/workbook-title.tex" \
  --lua-filter="$PRODUCTION_DIR/layout.lua" \
  --output="$BUILD_DIR/workbook.tex"

python3 "$LATEX_HELPER" \
  --compiler=texlive \
  --engine=xelatex \
  --output-directory="$BUILD_DIR/workbook-out" \
  "$BUILD_DIR/workbook.tex"

cp -f "$BUILD_DIR/workbook-out/workbook.pdf" "$PDF_DIR/the-objective-morality-project-companion-workbook.pdf"

epub_inputs=(
  "${main_inputs[2]}"
  "${main_inputs[@]:4}"
)

pandoc "${epub_inputs[@]}" \
  --standalone \
  --from=markdown+smart+raw_tex+raw_html+task_lists+autolink_bare_uris \
  --to=epub3 \
  --metadata-file="$PRODUCTION_DIR/epub-metadata.yml" \
  --css="$PRODUCTION_DIR/epub.css" \
  --epub-cover-image="$COVER_DIR/the-objective-morality-project-front-cover.jpg" \
  --toc \
  --toc-depth=1 \
  --split-level=1 \
  --output="$EBOOK_DIR/the-objective-morality-project.epub"

unzip -t "$EBOOK_DIR/the-objective-morality-project.epub"

pdfinfo "$PDF_DIR/the-objective-morality-project.pdf" | sed -n '1,20p'
pdfinfo "$PDF_DIR/the-objective-morality-project-with-cover.pdf" | sed -n '1,20p'
pdfinfo "$PDF_DIR/the-objective-morality-project-companion-workbook.pdf" | sed -n '1,20p'
pdfinfo "$COVER_DIR/the-objective-morality-project-front-cover.pdf" | sed -n '1,20p'

(
  cd "$PROJECT_ROOT/output"
  find cover ebook pdf -type f -print | LC_ALL=C sort | while IFS= read -r artifact; do
    shasum -a 256 "$artifact"
  done
) > "$PROJECT_ROOT/output/SHA256SUMS"
