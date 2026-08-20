#!/usr/bin/env bash
# Capture one documentation screenshot from the running runIde sandbox.
#
#   scripts/capture-screenshot.sh [options] <name> [lang]
#
#   name    base image name without extension, e.g. "pr-tool-window". The
#           feature-area subfolder is resolved from the existing file of that
#           name under Writerside/images/, so captures land back where they
#           came from. Filenames are unique across subfolders by rule.
#   lang    ja | ko | zh - writes "<name>-<lang>.png". Omit for English.
#
# Modes (pick one; --window is the default):
#   --window [title]  Grab a whole window by CGWindowID, WITH its drop shadow and
#                     a transparent background - this is how the existing dialog
#                     and popup shots were made, and it reproduces their exact
#                     pixel dimensions (a 557x287 dialog yields 1338x798).
#                     [title] is a substring; omitted means the frontmost
#                     sandbox window. Use for dialogs, popups and menus.
#   --region X,Y,W,H  Grab an explicit screen rectangle in points, then downscale
#                     Retina 2x pixels back to point size. Use for tight panel
#                     crops that are part of a larger window.
#   --delay N         Wait N seconds before grabbing, so a menu or popup that
#                     closes on focus loss stays open. Default 0.
#
# Requires Screen Recording permission for the calling terminal (and
# Accessibility if you also drive the IDE).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGES_DIR="$(cd "$HERE/../Writerside/images" && pwd)"
SANDBOX_OWNER="Main"          # the runIde sandbox app; the real IDE is "IntelliJ IDEA"
WINID_BIN="${TMPDIR:-/tmp}/winid-$(id -u)"

die() { printf 'error: %s\n' "$*" >&2; exit 1; }

mode=window; want_title=""; region=""; delay=0
while [ $# -gt 0 ]; do
  case "$1" in
    --window) mode=window; shift
              case "${1:-}" in -*|"") ;; *) want_title="$1"; shift ;; esac ;;
    --region) mode=region; region="${2:-}"; shift 2 ;;
    --delay)  delay="${2:-0}"; shift 2 ;;
    --) shift; break ;;
    -*) die "unknown option: $1" ;;
    *) break ;;
  esac
done

[ $# -ge 1 ] || die "usage: $(basename "$0") [--window [title]|--region X,Y,W,H] [--delay N] <name> [lang]"
name="${1%.png}"; lang="${2:-}"
case "$lang" in ""|ja|ko|zh) ;; *) die "lang must be ja, ko or zh (got '$lang')" ;; esac

matches="$(find "$IMAGES_DIR" -type f -name "$name.png")"
count="$(printf '%s' "$matches" | grep -c . || true)"
[ "$count" -eq 1 ] || die "expected exactly one $name.png under images/, found $count"
out="$(dirname "$matches")/$name${lang:+-$lang}.png"

[ "$delay" = "0" ] || sleep "$delay"

if [ "$mode" = region ]; then
  printf '%s' "$region" | grep -qE '^-?[0-9]+,-?[0-9]+,[0-9]+,[0-9]+$' || die "--region wants X,Y,W,H"
  w="$(printf '%s' "$region" | cut -d, -f3)"; h="$(printf '%s' "$region" | cut -d, -f4)"
  tmp="$(mktemp -t capture).png"; trap 'rm -f "$tmp"' EXIT
  screencapture -x -R"$region" "$tmp"
  # -R grabs native pixels; downscale so Retina 2x lands back on point size.
  sips --resampleHeightWidth "$h" "$w" "$tmp" --out "$out" >/dev/null
else
  # Compile the window lister once per boot; it needs the same Screen Recording
  # grant as screencapture, which the terminal already has.
  if [ ! -x "$WINID_BIN" ] || [ "$HERE/winid.swift" -nt "$WINID_BIN" ]; then
    swiftc -O -o "$WINID_BIN" "$HERE/winid.swift" || die "could not build winid.swift"
  fi
  if [ -n "$want_title" ]; then
    id="$("$WINID_BIN" "$SANDBOX_OWNER" | awk -F'\t' -v t="$want_title" 'index($4,t){print $1; exit}')"
    [ -n "$id" ] || die "no sandbox window whose title contains '$want_title'"
  else
    id="$("$WINID_BIN" "$SANDBOX_OWNER" | awk -F'\t' 'NR==1{print $1}')"
    [ -n "$id" ] || die "no sandbox windows found - is runIde up?"
  fi
  # No -o: keep the drop shadow, matching the existing dialog/popup shots.
  screencapture -x -l"$id" "$out"
fi

printf '%s  ' "${out#"$IMAGES_DIR"/}"
sips -g pixelWidth -g pixelHeight "$out" | awk '/pixel/{printf "%s ", $2}'; echo
