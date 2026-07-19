#!/usr/bin/env python3
"""Normalize Pandoc's generated LaTeX table-header alignment.

Pandoc writes every Markdown table header cell as a bottom-aligned minipage.
That makes a short heading sit on the floor of a row whenever a neighboring
heading wraps to two or more lines.  This production pass changes only header
minipages, between each longtable's top and middle rules, to vertical-center
alignment.  Body content and non-table minipages are deliberately untouched.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


TABLE_PATTERN = re.compile(
    r"(\\begin\{longtable\}.*?\\end\{longtable\})",
    flags=re.DOTALL,
)
HEADER_PATTERN = re.compile(
    r"(\\toprule\\noalign\{\}\s*)(.*?)(?=\\midrule\\noalign\{\})",
    flags=re.DOTALL,
)
BOTTOM_ALIGNED = r"\begin{minipage}[b]{\linewidth}"
CENTER_ALIGNED = r"\begin{minipage}[c]{\linewidth}"


def normalize_table(table_source: str, table_number: int) -> tuple[str, int]:
    header_match = HEADER_PATTERN.search(table_source)
    if header_match is None:
        raise ValueError(f"table {table_number} has no recognizable header block")

    header_source = header_match.group(2)
    replacement_count = header_source.count(BOTTOM_ALIGNED)
    if replacement_count == 0:
        raise ValueError(
            f"table {table_number} has no bottom-aligned Pandoc header cells"
        )

    centered_header = header_source.replace(BOTTOM_ALIGNED, CENTER_ALIGNED)
    start, end = header_match.span(2)
    normalized = table_source[:start] + centered_header + table_source[end:]
    return normalized, replacement_count


def normalize_document(source: str) -> tuple[str, int, int]:
    table_count = 0
    header_cell_count = 0

    def replace_table(match: re.Match[str]) -> str:
        nonlocal table_count, header_cell_count
        table_count += 1
        normalized, replacements = normalize_table(match.group(1), table_count)
        header_cell_count += replacements
        return normalized

    normalized_source = TABLE_PATTERN.sub(replace_table, source)
    if table_count == 0:
        raise ValueError("document contains no longtable environments")
    return normalized_source, table_count, header_cell_count


def normalize_file(path: Path) -> tuple[int, int]:
    source = path.read_text(encoding="utf-8")
    normalized, table_count, header_cell_count = normalize_document(source)
    path.write_text(normalized, encoding="utf-8")
    return table_count, header_cell_count


def main(arguments: list[str]) -> int:
    if not arguments:
        print("usage: normalize-table-tex.py FILE [FILE ...]", file=sys.stderr)
        return 2

    try:
        for argument in arguments:
            path = Path(argument)
            table_count, header_cell_count = normalize_file(path)
            print(
                f"{path}: centered {header_cell_count} header cells "
                f"across {table_count} tables"
            )
    except (OSError, ValueError) as error:
        print(f"normalize-table-tex.py: {error}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
