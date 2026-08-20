#!/usr/bin/env python3
"""Build per-language search-index.json files for the deployed site.

Run from the deploy workflow against the final site/ tree, after URLs are
cleaned, so indexed URLs match pages that exist. Output format is consumed by
web/custom-search.js - keep the two in sync:

    {"v": 1, "lang": "en", "pages": [
        {"url": "quick-start.html",
         "title": "Quick Start",
         "headings": [{"t": "1. Open a project...", "id": "anchor-id"}, ...],
         "body": "whitespace-collapsed visible article text"}, ...]}

Missing English root or an empty index exits non-zero; a missing translation
directory is only a notice, so dropping a language can't break the deploy for
the rest.
"""

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

LANG_DIRS = ["", "ja", "ko", "zh"]  # "" = English at the site root
SKIP_CONTAINER_TAGS = {"script", "style", "noscript", "template", "svg",
                       "nav", "header", "footer", "aside"}
HEADING_TAGS = {"h2", "h3", "h4"}
REDIRECT_MARKER = re.compile(r'http-equiv\s*=\s*["\']?refresh', re.IGNORECASE)


class PageExtractor(HTMLParser):
    """Collects title, headings (with anchor ids) and visible article text."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.doc_title_parts = []
        self.h1_parts = []
        self.headings = []          # [{"t": str, "id": str}]
        self.body_parts = []
        self._article_depth = 0
        self._skip_depth = 0
        self._in_title = False
        self._in_h1 = False
        self._current_heading = None  # {"id": str, "parts": []}

    def handle_starttag(self, tag, attrs):
        if tag in SKIP_CONTAINER_TAGS:
            self._skip_depth += 1
            return
        if self._skip_depth:
            return
        if tag == "article":
            self._article_depth += 1
        elif tag == "title":
            self._in_title = True
        elif self._article_depth:
            if tag == "h1":
                self._in_h1 = True
            elif tag in HEADING_TAGS:
                attr_id = next((v for k, v in attrs if k == "id"), "") or ""
                self._current_heading = {"id": attr_id, "parts": []}

    def handle_endtag(self, tag):
        if tag in SKIP_CONTAINER_TAGS:
            self._skip_depth = max(0, self._skip_depth - 1)
            return
        if tag == "article":
            self._article_depth = max(0, self._article_depth - 1)
        elif tag == "title":
            self._in_title = False
        elif tag == "h1":
            self._in_h1 = False
        elif tag in HEADING_TAGS and self._current_heading is not None:
            text = collapse(" ".join(self._current_heading["parts"]))
            if text:
                self.headings.append({"t": text, "id": self._current_heading["id"]})
            self._current_heading = None

    def handle_data(self, data):
        if self._skip_depth:
            return
        if self._in_title:
            self.doc_title_parts.append(data)
        if not self._article_depth:
            return
        if self._in_h1:
            self.h1_parts.append(data)
        elif self._current_heading is not None:
            self._current_heading["parts"].append(data)
        self.body_parts.append(data)

    def title(self):
        h1 = collapse(" ".join(self.h1_parts))
        if h1:
            return h1
        # "<page title> | <product name>" -> keep only the page title.
        return collapse(" ".join(self.doc_title_parts)).split(" | ")[0]

    def body(self):
        return collapse(" ".join(self.body_parts))


def collapse(text):
    return " ".join(text.split())


def extract_page(html_path):
    """Returns a page record, or None for pages that should not be indexed."""
    html = html_path.read_text(encoding="utf-8", errors="replace")
    if REDIRECT_MARKER.search(html):
        return None  # index.html-style meta-refresh stub
    parser = PageExtractor()
    parser.feed(html)
    parser.close()
    title = parser.title()
    if not title:
        return None
    return {
        "url": html_path.name,
        "title": title,
        "headings": parser.headings,
        "body": parser.body(),
    }


def build_language_index(lang_dir, lang):
    pages = []
    for html_path in sorted(lang_dir.glob("*.html")):
        record = extract_page(html_path)
        if record is not None:
            pages.append(record)
    index = {"v": 1, "lang": lang, "pages": pages}
    out_path = lang_dir / "search-index.json"
    payload = json.dumps(index, ensure_ascii=False, separators=(",", ":"))
    json.loads(payload)  # self-check: never ship an unparseable index
    out_path.write_text(payload, encoding="utf-8")
    print(f"{lang}: {len(pages)} pages -> {out_path} ({len(payload.encode('utf-8'))} bytes)")
    return len(pages)


def main(argv):
    if len(argv) != 2:
        print(f"usage: {argv[0]} <site-root>", file=sys.stderr)
        return 2
    site_root = Path(argv[1])
    if not site_root.is_dir():
        print(f"error: site root {site_root} does not exist", file=sys.stderr)
        return 1

    english_pages = 0
    for lang in LANG_DIRS:
        lang_dir = site_root / lang if lang else site_root
        if not lang_dir.is_dir():
            print(f"notice: language directory {lang_dir} is missing - skipped")
            continue
        count = build_language_index(lang_dir, lang or "en")
        if not lang:
            english_pages = count

    if english_pages == 0:
        print("error: the English site root produced an empty search index",
              file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
