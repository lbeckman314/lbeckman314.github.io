#!/bin/sh
# Mirror just the Alpine packages the playground needs into
# public/try-unkernel/apk/, next to Alpine's own signed indexes (unmodified, so
# the guest's apk verifies them as usual). The guest reads them as
# http://pkgs.local/, which the page answers with fetch().
#
# usage: scripts/unkernel-apk/build.sh      (needs curl and python3)
#
# installed.txt lists what the Alpine image already has (`apk info` in the
# guest); update it, ALPINE and the image together when upgrading unkernel.
set -eu
ALPINE=v3.24
ARCH=aarch64
MIRROR=https://dl-cdn.alpinelinux.org/alpine
here=$(cd "$(dirname "$0")" && pwd)
out="$here/../../public/try-unkernel/apk"
idx=$(mktemp -d)
trap 'rm -rf "$idx"' EXIT

rm -rf "$out"
for repo in main community; do
  mkdir -p "$out/$ALPINE/$repo/$ARCH" "$idx/$repo"
  curl -sSfo "$out/$ALPINE/$repo/$ARCH/APKINDEX.tar.gz" "$MIRROR/$ALPINE/$repo/$ARCH/APKINDEX.tar.gz"
  tar xzf "$out/$ALPINE/$repo/$ARCH/APKINDEX.tar.gz" -C "$idx/$repo" APKINDEX
done

pkgs=$(grep -v '^#' "$here/packages.txt")
# shellcheck disable=SC2086
python3 -I "$here/resolve.py" "$idx" "$here/installed.txt" $pkgs | while read -r repo name ver _size; do
  curl -sSfo "$out/$ALPINE/$repo/$ARCH/$name-$ver.apk" "$MIRROR/$ALPINE/$repo/$ARCH/$name-$ver.apk"
done
echo "$(find "$out" -name '*.apk' | wc -l) packages, $(du -sh "$out" | cut -f1) in $out"
