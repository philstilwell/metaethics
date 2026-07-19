#!/usr/bin/env python3
"""Add an accessible text alternative to Pandoc's SVG cover wrapper."""

from __future__ import annotations

import argparse
import os
import re
import tempfile
import zipfile
from pathlib import Path


COVER_PATH = "EPUB/text/cover.xhtml"
COVER_TITLE = "Cover of The Objective Morality Project"


def accessible_cover(source: bytes) -> bytes:
    text = source.decode("utf-8")
    if 'id="cover-title"' in text:
        return source

    match = re.search(r"<svg\b[^>]*>", text)
    if match is None:
        raise ValueError(f"{COVER_PATH} does not contain an SVG cover wrapper")

    opening = match.group(0)
    accessible_opening = opening[:-1] + ' role="img" aria-labelledby="cover-title">'
    replacement = (
        accessible_opening
        + f'\n<title id="cover-title">{COVER_TITLE}</title>'
    )
    return (text[: match.start()] + replacement + text[match.end() :]).encode("utf-8")


def normalize(epub_path: Path) -> None:
    if not epub_path.is_file():
        raise FileNotFoundError(epub_path)

    with zipfile.ZipFile(epub_path, "r") as source:
        infos = source.infolist()
        entries = {info.filename: source.read(info.filename) for info in infos}

    if "mimetype" not in entries or COVER_PATH not in entries:
        raise ValueError("EPUB is missing its mimetype or cover document")

    entries[COVER_PATH] = accessible_cover(entries[COVER_PATH])

    with tempfile.NamedTemporaryFile(
        prefix=epub_path.stem + ".",
        suffix=".epub",
        dir=epub_path.parent,
        delete=False,
    ) as handle:
        temporary_path = Path(handle.name)

    try:
        info_by_name = {info.filename: info for info in infos}
        with zipfile.ZipFile(temporary_path, "w") as destination:
            destination.writestr(
                info_by_name["mimetype"],
                entries["mimetype"],
                compress_type=zipfile.ZIP_STORED,
            )
            for info in infos:
                if info.filename == "mimetype":
                    continue
                destination.writestr(info, entries[info.filename])

        with zipfile.ZipFile(temporary_path, "r") as check:
            first = check.infolist()[0]
            if first.filename != "mimetype" or first.compress_type != zipfile.ZIP_STORED:
                raise ValueError("EPUB mimetype is not first and uncompressed")
            if b'id="cover-title"' not in check.read(COVER_PATH):
                raise ValueError("cover text alternative was not written")

        os.replace(temporary_path, epub_path)
    finally:
        if temporary_path.exists():
            temporary_path.unlink()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("epub", type=Path)
    args = parser.parse_args()
    normalize(args.epub.resolve())


if __name__ == "__main__":
    main()
