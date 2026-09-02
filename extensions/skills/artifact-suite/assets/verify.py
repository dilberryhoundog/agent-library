#!/usr/bin/env python3
"""Static checks S1-S10 for a finished artifact-suite page.

  python3 verify.py <page> --static

Runs on finished pages: a bare shell copy fails S7 on its placeholders by design.
Exits non-zero naming the first failing check.
"""
import json
import os
import re
import subprocess
import sys

ASSETS = os.path.dirname(os.path.abspath(__file__))
MARKERS = ("doc-title", "page-meta", "masthead", "template-style", "content", "sidebar", "template-script")
FONT_HOSTS = ("fonts.googleapis.com", "fonts.gstatic.com")


class Fail(Exception):
    pass


def s1(page):
    if page.splitlines()[0].strip().lower() != "<!doctype html>":
        raise Fail("<!doctype html> is not line 1")
    if "artifact-suite shell v1" not in page:
        raise Fail("shell stamp text absent")


def s2(page):
    for m in MARKERS:
        o, c = ("/* @%s */" % m, "/* @%s:end */" % m) if m == "template-style" else ("<!-- @%s -->" % m, "<!-- @%s:end -->" % m)
        for t in (o, c):
            if page.count(t) != 1:
                raise Fail("marker %s appears %d times" % (t, page.count(t)))


def meta_text(page):
    m = re.search(r'<script type="application/json" id="page-meta">(.*?)</script>', page, re.S)
    return m.group(1) if m else None


def s3(page):
    raw = meta_text(page)
    if raw is None:
        raise Fail("#page-meta block missing")
    try:
        meta = json.loads(raw.replace("<\\/", "</"))
    except ValueError as e:
        raise Fail("#page-meta does not parse: %s" % e)
    for k in ("id", "kind", "rev", "title", "provenance", "prompt", "next"):
        if k not in meta:
            raise Fail("#page-meta lacks %r" % k)
    return meta


def cards(page):
    return list(re.finditer(r'<article\b([^>]*\bclass="[^"]*\bcard\b[^"]*"[^>]*)>(.*?)</article>', page, re.S))


def s4(page):
    seen = set()
    for m in cards(page):
        i = re.search(r'\bid="([^"]*)"', m.group(1))
        if not i or not i.group(1):
            raise Fail("article.card without id")
        cid = i.group(1)
        if cid in seen:
            raise Fail("duplicate card id %r" % cid)
        if re.match(r"^[a-z]?\d+$", cid, re.I):
            raise Fail("ordinal card id %r" % cid)
        seen.add(cid)
    secs = re.findall(r'<section\b[^>]*\bid="([^"]*)"', page)
    for sid in secs:
        if secs.count(sid) != 1:
            raise Fail("duplicate section id %r" % sid)
        if sid in seen:
            raise Fail("section id %r is also a card id" % sid)


def s5(page):
    for m in cards(page):
        attrs, body = m.group(1), m.group(2)
        if 'data-answer="options"' not in attrs:
            continue
        rec = re.search(r'data-recommended="([^"]*)"', attrs)
        if not rec:
            raise Fail("options card without data-recommended")
        checked = re.findall(r'<input\b[^>]*\bchecked\b[^>]*>', body)
        if len(checked) != 1:
            raise Fail("options card %s: %d checked inputs" % (rec.group(1), len(checked)))
        val = re.search(r'value="([^"]*)"', checked[0])
        if not val or val.group(1) != rec.group(1):
            raise Fail("options card: checked value disagrees with data-recommended %r" % rec.group(1))
        labels = re.findall(r'<label class="option recommended">.*?</label>', body, re.S)
        if len(labels) != 1 or checked[0] not in labels[0]:
            raise Fail("options card %s: .recommended label does not carry the checked input" % rec.group(1))
    outside = re.sub(r"<script\b[^>]*>.*?</script>", "", page, flags=re.S)
    outside = re.sub(r'<details\b[^>]*\bclass="[^"]*\bref\b[^"]*"[^>]*>.*?</details>', "", outside, flags=re.S)
    outside = re.sub(r'<a\b[^>]*\bclass="[^"]*\bref-link\b[^"]*"[^>]*>.*?</a>', "", outside, flags=re.S)
    if re.search(r'<\w+\b[^>]*\bclass="[^"]*\bpath\b[^"]*"', outside):
        raise Fail(".path element outside a ref")


def s6(page):
    for m in re.finditer(r'<(?:img|link|script)\b[^>]*\b(?:src|href)="([^"]+)"', page):
        u = m.group(1)
        if u.startswith("data:"):
            continue
        if "://" in u and not any(("://" + h) in u for h in FONT_HOSTS):
            raise Fail("external asset %s" % u)
    markup = re.sub(r'<link\b[^>]*>', "", page)
    if re.search(r'\bhref="[a-z]+://', markup):
        raise Fail("literal absolute href in markup")
    stripped = re.sub(r'<script type="application/json" id="page-meta">.*?</script>', "", page, flags=re.S)
    stripped = re.sub(r'data-url="[^"]*"', "", stripped)
    stripped = re.sub(r'<link\b[^>]*>', "", stripped)
    stripped = re.sub(r'/\*.*?\*/', "", stripped, flags=re.S)
    for m in re.finditer(r'https?://[^\s"\'<>)]+', stripped):
        if not any(h in m.group(0) for h in FONT_HOSTS) and "xmlns=" not in stripped[max(0, m.start() - 12):m.start()] and "w3.org" not in m.group(0):
            raise Fail("absolute URL outside #page-meta or data-url: %s" % m.group(0))
    check = os.path.join(ASSETS, "..", "references", "path-check.sh")
    if not os.path.exists(check):
        raise Fail("path check script missing: %s" % check)
    r = subprocess.run(["bash", check, PAGE], capture_output=True, text=True)
    out = (r.stdout.strip() + ("\n" + r.stderr.strip() if r.stderr.strip() else "")).strip()
    if r.returncode or out != "OK":
        raise Fail("path check: %s" % (out or "no output"))


def s7(page):
    for name, pat in (("<title>", r"<title\b"), ("<h1>", r"<h1\b"), ('id="page-meta"', r'id="page-meta"')):
        n = len(re.findall(pat, page))
        if n != 1:
            raise Fail("%s appears %d times" % (name, n))
    if "Untitled" in page:
        raise Fail("placeholder 'Untitled' survives")
    if ">{}<" in page:
        raise Fail("placeholder '>{}<' survives")


def s8(page):
    n = len(re.findall(r'class="shell(?: rail| board)?"', page))
    if n != 1:
        raise Fail("%d elements carry class shell/shell rail/shell board" % n)
    if re.search(r'class="shell [^"]*"', page) and not re.search(r'class="shell (?:rail|board)"', page):
        raise Fail(".shell carries a class other than rail or board")


def s9(page):
    parts = {
        "style": (r"/\* @style \*/(.*?)/\* @style:end \*/", re.S),
        "script": (r"<!-- @script -->(.*?)<!-- @script:end -->", re.S),
    }
    for root in ("templates", "blocks"):
        d = os.path.join(ASSETS, root)
        if not os.path.isdir(d):
            continue
        for fn in sorted(os.listdir(d)):
            src = open(os.path.join(d, fn), encoding="utf-8").read()
            for part, (pat, flags) in parts.items():
                m = re.search(pat, src, flags)
                if not m:
                    continue
                body = m.group(1)
                # spliced when its ledger line or its longest line is on the page; then the whole part must be
                ledger = "@lifted %s/%s#%s" % (root, fn, part)
                anchor = max(body.splitlines(), key=len) if body.strip() else ""
                if (ledger in page or (anchor.strip() and anchor in page)) and body not in page:
                    raise Fail("%s#%s differs from its source" % (fn, part))


def s10(page):
    spans = [(m.start(), m.end()) for m in re.finditer(r'<section\b[^>]*\bid="[^"]+"[^>]*>.*?</section>', page, re.S)]
    for m in cards(page):
        if not any(a <= m.start() < b for a, b in spans):
            i = re.search(r'\bid="([^"]*)"', m.group(1))
            raise Fail("article.card %r is not inside a section[id]" % (i.group(1) if i else ""))


CHECKS = [("S1", s1), ("S2", s2), ("S3", s3), ("S4", s4), ("S5", s5), ("S6", s6), ("S7", s7), ("S8", s8), ("S9", s9), ("S10", s10)]


def main(argv):
    global PAGE
    if len(argv) != 3 or argv[2] != "--static":
        sys.stderr.write("usage: verify.py <page> --static\n")
        sys.exit(1)
    PAGE = argv[1]
    page = open(PAGE, encoding="utf-8").read()
    for name, fn in CHECKS:
        try:
            fn(page)
        except Fail as e:
            sys.stderr.write("%s failed: %s\n" % (name, e))
            sys.exit(1)
        print("%s ok" % name)


if __name__ == "__main__":
    main(sys.argv)
