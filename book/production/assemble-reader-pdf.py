#!/usr/bin/env python3
"""Replace an interior PDF's title page with the illustrated front cover."""

from __future__ import annotations

import argparse
import os
import tempfile
from pathlib import Path

try:
    from pypdf import PdfReader, PdfWriter
except ModuleNotFoundError as exc:  # pragma: no cover - environment guard
    raise SystemExit(
        "The reader-edition assembly step requires pypdf (python3 -m pip install pypdf)."
    ) from exc


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Create a reader edition by replacing page one of a book PDF with "
            "a one-page cover PDF while preserving metadata and navigation."
        )
    )
    parser.add_argument("cover", type=Path, help="one-page front-cover PDF")
    parser.add_argument("interior", type=Path, help="complete interior PDF")
    parser.add_argument("output", type=Path, help="assembled reader-edition PDF")
    return parser.parse_args()


def media_box_size(reader: PdfReader, page_index: int = 0) -> tuple[float, float]:
    box = reader.pages[page_index].mediabox
    return float(box.width), float(box.height)


def main() -> None:
    args = parse_args()
    cover_path = args.cover.resolve()
    interior_path = args.interior.resolve()
    output_path = args.output.resolve()

    if output_path in {cover_path, interior_path}:
        raise SystemExit("Output must not overwrite either source PDF.")

    cover = PdfReader(cover_path)
    interior = PdfReader(interior_path)

    if len(cover.pages) != 1:
        raise SystemExit(f"Cover must contain exactly one page; found {len(cover.pages)}.")
    if not interior.pages:
        raise SystemExit("Interior PDF contains no pages.")

    cover_size = media_box_size(cover)
    interior_size = media_box_size(interior)
    if any(abs(a - b) > 0.01 for a, b in zip(cover_size, interior_size)):
        raise SystemExit(
            "Cover and interior page sizes differ: "
            f"cover={cover_size[0]:.2f}x{cover_size[1]:.2f} pt, "
            f"interior={interior_size[0]:.2f}x{interior_size[1]:.2f} pt."
        )

    writer = PdfWriter()
    writer.clone_document_from_reader(interior)
    writer.remove_page(0)
    writer.insert_page(cover.pages[0], 0)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(
        prefix=f".{output_path.stem}-", suffix=".pdf", dir=output_path.parent
    )
    os.close(descriptor)
    temporary_path = Path(temporary_name)

    try:
        with temporary_path.open("wb") as output_stream:
            writer.write(output_stream)
        assembled = PdfReader(temporary_path)
        if len(assembled.pages) != len(interior.pages):
            raise RuntimeError("Assembled PDF page count differs from the interior.")
        os.replace(temporary_path, output_path)
        output_path.chmod(0o644)
    finally:
        temporary_path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
