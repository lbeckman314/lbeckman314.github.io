"""Resolve Alpine packages and their dependencies (recursively, plus install_if
add-ons) from APKINDEX files.  usage: resolve.py INDEXDIR installed.txt pkg...
Prints "repo name version size" for each package the guest would download."""
import sys, re
apkdir, installed_file, wanted = sys.argv[1], sys.argv[2], sys.argv[3:]
pkgs, provides = {}, {}
for repo in ("main", "community"):
    for block in open(f"{apkdir}/{repo}/APKINDEX").read().split("\n\n"):
        f = {}
        for line in block.splitlines():
            if len(line) > 2 and line[1] == ":": f.setdefault(line[0], line[2:])
        if "P" not in f: continue
        p = {"name": f["P"], "ver": f["V"], "size": int(f.get("S", 0)), "repo": repo,
             "deps": f.get("D", "").split(), "prov": f.get("p", "").split(), "prio": int(f.get("k", 0)), "iif": f.get("i", "").split()}
        pkgs.setdefault(p["name"], p)
        for pv in [p["name"]] + p["prov"]:
            provides.setdefault(re.split(r"[=<>~]", pv)[0], []).append(p)
installed = set(open(installed_file).read().split()) if installed_file != "-" else set()
def pick(token):
    name = re.split(r"[=<>~]", token)[0]
    cands = provides.get(name)
    if not cands: raise SystemExit(f"nothing provides {token}")
    for c in cands:
        if c["name"] in installed: return c
    return max(cands, key=lambda c: (c["name"] == name, c["prio"]))
need, stack = {}, list(wanted)
def have(tok):
    name = re.split(r"[=<>~]", tok)[0]
    return any(c["name"] in need or c["name"] in installed for c in provides.get(name, []))
while True:
    while stack:
        tok = stack.pop()
        if tok.startswith("!"): continue
        p = pick(tok)
        if p["name"] in need or p["name"] in installed: continue
        need[p["name"]] = p
        stack += p["deps"]
    # install_if: apk adds a package by itself once everything it names is present
    extra = [p for p in pkgs.values() if p["iif"] and p["name"] not in need and p["name"] not in installed
             and all(have(t) for t in p["iif"])]
    if not extra: break
    stack += [p["name"] for p in extra]
for p in sorted(need.values(), key=lambda p: p["name"]):
    print(p["repo"], p["name"], p["ver"], p["size"])
