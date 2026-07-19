# Cover and Visual System

## Concept

The cover treats the book as an expedition through a maze of plausible moral constructions. Multiple routes enter, fork, overlap, and continue past one another. The quiet central chamber remains open: the promised objective foundation is not waiting there. The image communicates inquiry and lucidity rather than collapse. It deliberately avoids scales, gavels, religious emblems, and other stock moral imagery.

The abstract artwork was generated in Google Gemini for this project. Production typography, borders, color fields, and the final cover composition are controlled in LaTeX so the title remains exact and sharp. The source artwork contains no generated title text.

## Palette

| Role | Hex | Use |
|---|---:|---|
| Graphite | `#646665` | Supporting lines, tertiary headings, table rules |
| Ink | `#1E1E22` | Body text, major titles, dark fields |
| Olive | `#424739` | Section headings, table heads, contemplative emphasis |
| Vermilion | `#B92F1F` | Challenges, page numbers, bullets, accent rules |
| Ochre | `#DB9733` | Wayfinding, chapter dividers, running-head rules |
| Paper | `#F2EFE7` | Cover ground and reverse text |

Ink, olive, vermilion, and graphite are used for text on white. Ochre is reserved primarily for rules, highlights, and large fields because it does not provide sufficient contrast for small text on white.

## Typography and rules

- Libertinus Sans Bold: cover title, chapter titles, navigation, table heads, and labels.
- Libertinus Serif Display: subtitle, part titles, and the more reflective layer of the hierarchy.
- Libertinus Serif: long-form body text.
- Chapter endings use an ochre rule followed by a fine vermilion rule.
- Part dividers reverse paper-colored display type out of ink, with ochre and vermilion route markers.
- Table heads reverse out of olive; body rows alternate white and a restrained ochre tint.
- The cover and title pages use an ink border or field to frame the expedition without implying closure.

## Production boundary

`cover.tex` produces a trim-size 7 by 10 inch front cover. It is suitable as the ebook cover and as the approved front-cover component for a print wrap. A final printer-ready wrap cannot be responsibly fixed until paper stock, binding, bleed, printer template, and exact spine width are known. At that stage, place this front-cover design into the printer template, extend the background through the bleed, and build the spine and back cover without rescaling the front typography.

Run `book/production/build-book.sh` from any location inside the repository to rebuild the front cover, print interior, companion workbook, and EPUB.
