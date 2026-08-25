#!/usr/bin/env python3
"""Fill one marker region of an artifact-suite page. Every write is checked and idempotent.

  splice.py <page> <region> < content            stdin into a marker region
  splice.py <page> <region> <file> <part>        lift @style | @script | @markup from a template or block
  splice.py <page> card <cardId> < article       replace one <article id="..."> span
  splice.py <page> section <sectionId> < html    append before that section's </section>
  splice.py <page> layout rail|board             set the class on .shell (idempotent)
  splice.py <page> show page-meta                print the #page-meta JSON
  splice.py <page> show cards                    print <id>\\t<tag>\\t<h3 text> per article.card

A lift leaves `<!-- @lifted <file>#<part> -->` (or `/* @lifted … */` inside <style>) beside the closing
marker; a second lift of the same part is refused on that ledger line or on the lifted bytes themselves.

Exit 0 on success or an already-present part; 1 on a usage error; 2 when a marker, card or section is missing or duplicated.
"""
import os
import re
import sys

ASSETS = os.path.dirname(os.path.abspath(__file__))
PLACEHOLDER = ("doc-title", "page-meta", "masthead")
EMPTY = ("template-style", "content", "sidebar", "template-script")
RESERVED = ("layout", "card", "section", "show")
PARTS = {
    "style": (r"/\* @style \*/", r"/\* @style:end \*/"),
    "script": (r"<!-- @script -->", r"<!-- @script:end -->"),
    "markup": (r"<!-- @markup -->", r"<!-- @markup:end -->"),
}


def fail(msg, code=2):
    sys.stderr.write("splice.py: " + msg + "\n")
    sys.exit(code)


def markers(name):
    if name == "template-style":
        return "/* @template-style */", "/* @template-style:end */"
    return "<!-- @%s -->" % name, "<!-- @%s:end -->" % name


def once(page, text, what):
    n = page.count(text)
    if n != 1:
        fail("%s appears %d times, expected exactly once" % (what, n))


def lift(path, part):
    if part not in PARTS:
        fail("unknown part %r; use style, script or markup" % part, 1)
    src = open(path, encoding="utf-8").read()
    open_re, close_re = PARTS[part]
    m = re.search(open_re + r"(.*?)" + close_re, src, re.S)
    if not m:
        fail("no @%s part in %s" % (part, path))
    return m.group(1)


def normalised(text):
    return "\n".join(line.rstrip() for line in text.strip().splitlines())


def ledger(region, path, part):
    """The comment a lift leaves beside the closing marker, so a later card splice that splits the lifted bytes cannot defeat the duplicate guard."""
    rel = os.path.relpath(os.path.abspath(path), ASSETS)
    key = (os.path.basename(path) if rel.startswith("..") else rel) + "#" + part
    return ("/* @lifted %s */" if region == "template-style" else "<!-- @lifted %s -->") % key


def fill(page, region, content):
    open_m, close_m = markers(region)
    once(page, open_m, open_m)
    once(page, close_m, close_m)
    if region in PLACEHOLDER:
        start = page.index(open_m) + len(open_m)
        end = page.index(close_m)
        if end < start:
            fail("%s closes before it opens" % open_m)
        return page[:start] + content + page[end:]
    return page.replace(close_m, content + close_m)


def cmd_region(path, page, region, args):
    if region in RESERVED or region not in PLACEHOLDER + EMPTY:
        fail("unknown region %r" % region, 1)
    if len(args) == 2:
        content = lift(args[0], args[1])
        tag = ledger(region, args[0], args[1])
        if tag in page or (normalised(content) and normalised(content) in normalised(page)):
            sys.stderr.write("already present: %s#%s\n" % (args[0], args[1]))
            sys.exit(0)
        content += tag + "\n"
    elif not args:
        content = sys.stdin.read()
    else:
        fail("expected <file> <part> or stdin", 1)
    write(path, fill(page, region, content))


def cmd_card(path, page, card_id):
    pat = re.compile(r'<article\b[^>]*\bid="%s"[^>]*>.*?</article>' % re.escape(card_id), re.S)
    hits = pat.findall(page)
    if len(hits) != 1:
        fail("card %r appears %d times, expected exactly once" % (card_id, len(hits)))
    write(path, pat.sub(lambda m: sys.stdin.read(), page, count=1))


def cmd_section(path, page, section_id):
    open_pat = re.compile(r'<section\b[^>]*\bid="%s"[^>]*>' % re.escape(section_id))
    opens = list(open_pat.finditer(page))
    if len(opens) != 1:
        fail("section %r appears %d times, expected exactly once" % (section_id, len(opens)))
    close = page.find("</section>", opens[0].end())
    if close < 0:
        fail("section %r has no closing tag" % section_id)
    write(path, page[:close] + sys.stdin.read() + page[close:])


def cmd_layout(path, page, name):
    if name not in ("rail", "board"):
        fail("layout must be rail or board", 1)
    pat = re.compile(r'<div class="shell(?: rail| board)?">')
    if len(pat.findall(page)) != 1:
        fail(".shell element appears %d times, expected exactly once" % len(pat.findall(page)))
    write(path, pat.sub('<div class="shell %s">' % name, page, count=1))


def cmd_show(page, what):
    if what == "page-meta":
        m = re.search(r'<script type="application/json" id="page-meta">(.*?)</script>', page, re.S)
        if not m:
            fail("no #page-meta block")
        sys.stdout.write(m.group(1).strip() + "\n")
    elif what == "cards":
        for m in re.finditer(r'<article\b([^>]*\bclass="[^"]*\bcard\b[^"]*"[^>]*)>(.*?)</article>', page, re.S):
            attrs, body = m.group(1), m.group(2)
            cid = re.search(r'\bid="([^"]*)"', attrs)
            tag = re.search(r'\bdata-tag="([^"]*)"', attrs)
            h3 = re.search(r"<h3\b[^>]*>(.*?)</h3>", body, re.S)
            title = re.sub(r"<[^>]+>", "", h3.group(1)).strip() if h3 else ""
            sys.stdout.write("%s\t%s\t%s\n" % (cid.group(1) if cid else "", tag.group(1) if tag else "", " ".join(title.split())))
    else:
        fail("show takes page-meta or cards", 1)


def write(path, page):
    with open(path, "w", encoding="utf-8") as f:
        f.write(page)


def main(argv):
    if len(argv) < 3:
        fail(__doc__.strip(), 1)
    path, verb, rest = argv[1], argv[2], argv[3:]
    page = open(path, encoding="utf-8").read()
    if verb == "show":
        cmd_show(page, rest[0] if rest else "")
    elif verb == "layout":
        cmd_layout(path, page, rest[0] if rest else "")
    elif verb == "card":
        cmd_card(path, page, rest[0] if rest else fail("card needs <cardId>", 1))
    elif verb == "section":
        cmd_section(path, page, rest[0] if rest else fail("section needs <sectionId>", 1))
    else:
        cmd_region(path, page, verb, rest)


if __name__ == "__main__":
    main(sys.argv)
