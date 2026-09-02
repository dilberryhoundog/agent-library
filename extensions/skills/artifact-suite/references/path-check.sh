#!/usr/bin/env bash
# Path check for one artifact-suite page: bash path-check.sh <page>
# Prints OK, or one line per failing reference. Run by verify.py's S6; runnable by hand from anywhere.
# For every data-path: resolve the dev/branches/ mirror when data-branch is set, confirm the file
# exists, and confirm the end of data-lines lies within its line count; a data-branch reference
# with no mirror is checked with git cat-file -e <branch>:<path>; every data-url must start https://.
set -u
[ $# -eq 1 ] || { echo "usage: path-check.sh <page>" >&2; exit 2; }
PAGE="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
cd "$ROOT" || exit 2
python3 - "$PAGE" <<'PY'
import re, subprocess, sys, os
page = open(sys.argv[1], encoding="utf-8").read()
page = re.sub(r"<script\b(?! type=\"application/json\")[^>]*>.*?</script>", "", page, flags=re.S)
bad = []
for tag in re.findall(r"<(?:details|a)\b[^>]*\bclass=\"[^\"]*\bref(?:-link)?\b[^\"]*\"[^>]*>", page):
    a = dict(re.findall(r"data-(path|url|lines|branch)=\"([^\"]*)\"", tag))
    if "url" in a:
        if not a["url"].startswith("https://"): bad.append("not https: " + a["url"])
        continue
    p = a.get("path", "")
    if not p or p.startswith(("/", "./")) or ".." in p.split("/"): bad.append("malformed data-path: " + repr(p)); continue
    disk = "dev/branches/%s/%s" % (a["branch"], p[len("dev/workspace/"):]) if "branch" in a and p.startswith("dev/workspace/") else (None if "branch" in a else p)
    if disk is None:
        if subprocess.run(["git", "cat-file", "-e", a["branch"] + ":" + p], capture_output=True).returncode: bad.append("missing on branch %s: %s" % (a["branch"], p))
        continue
    if not os.path.isfile(disk): bad.append("missing: " + disk); continue
    m = re.fullmatch(r"(\d+)(?:-(\d+))?", a.get("lines", "")) if "lines" in a else None
    if m:
        end = int(m.group(2) or m.group(1)); n = sum(1 for _ in open(disk, encoding="utf-8", errors="replace"))
        if end > n: bad.append("line %d past end (%d): %s" % (end, n, disk))
print("\n".join(bad) if bad else "OK")
sys.exit(1 if bad else 0)
PY
