#!/bin/sh
# Put Unboxed's binary assets in place; they are pinned in assets.lock, not
# kept in git:
#
#   public/unboxed/play/alpine.erofs   the Alpine image, from unkernel's release
#   public/unboxed/play/apk/           the package mirror, from this repo's
#                                      tested snapshot (or built fresh)
#
# usage: scripts/unboxed/fetch.sh [--image-only]
# The deploy workflow runs this before building the site; run it once locally
# before `npm run dev`. Needs curl, tar and sha256sum (or shasum).
set -eu
here=$(cd "$(dirname "$0")" && pwd)
play="$here/../../public/unboxed/play"
repo=${GITHUB_REPOSITORY:-lbeckman314/lbeckman314.github.io}
# shellcheck source=/dev/null
. "$here/assets.lock"

sha256() {
  if command -v sha256sum >/dev/null; then sha256sum "$1" | cut -d' ' -f1
  else shasum -a 256 "$1" | cut -d' ' -f1; fi
}

# fetch URL FILE SHA256: download unless FILE already has that checksum
fetch() {
  if [ -f "$2" ] && [ "$(sha256 "$2")" = "$3" ]; then return 0; fi
  echo "fetching $1"
  curl -fsSL --retry 3 -o "$2.part" "$1"
  got=$(sha256 "$2.part")
  if [ "$got" != "$3" ]; then
    rm -f "$2.part"
    echo "checksum mismatch for $1: expected $3, got $got" >&2
    exit 1
  fi
  mv "$2.part" "$2"
}

fetch "https://github.com/pithings/unkernel/releases/download/$UNKERNEL_RELEASE/alpine.erofs" \
  "$play/alpine.erofs" "$IMAGE_SHA256"
[ "${1:-}" = "--image-only" ] && exit 0

if [ -n "$APK_SNAPSHOT" ]; then
  tarball="$play/.apk-$APK_SNAPSHOT.tar.gz"
  fetch "https://github.com/$repo/releases/download/$APK_SNAPSHOT/unboxed-apk.tar.gz" "$tarball" "$APK_SNAPSHOT_SHA256"
  rm -rf "$play/apk"
  tar xzf "$tarball" -C "$play"
  rm -f "$tarball"
  echo "package mirror: snapshot $APK_SNAPSHOT"
else
  echo "package mirror: no snapshot pinned, building from Alpine" >&2
  "$here/build-apk.sh"
fi
