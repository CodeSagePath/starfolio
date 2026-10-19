#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
DEPLOY_DIR="$(cd -- "${DEPLOY_DIR:-$SCRIPT_DIR/..}" && pwd -P)"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-master}"
GIT_REMOTE="${GIT_REMOTE:-origin}"
LIVE_DIST="$DEPLOY_DIR/dist"
BUILD_DIR=""
STAGED_DIST=""
BACKUP_DIST="$DEPLOY_DIR/.deploy-backup-$$"
SUDO=()
DEPLOY_COMPLETED=0
LIVE_DIST_MOVED=0

fail() {
  printf 'Deploy failed: %s\n' "$*" >&2
  exit 1
}

cleanup() {
  local status=$?
  trap - EXIT

  if [[ "$LIVE_DIST_MOVED" -eq 1 && -e "$BACKUP_DIST" && ! -e "$LIVE_DIST" ]]; then
    mv -- "$BACKUP_DIST" "$LIVE_DIST" || true
  fi

  if [[ "$DEPLOY_COMPLETED" -eq 1 && -e "$BACKUP_DIST" ]]; then
    rm -rf -- "$BACKUP_DIST"
  fi
  if [[ -n "$BUILD_DIR" && -d "$BUILD_DIR" ]]; then
    rm -rf -- "$BUILD_DIR"
  fi
  if [[ -n "$STAGED_DIST" && -d "$STAGED_DIST" ]]; then
    rm -rf -- "$STAGED_DIST"
  fi

  exit "$status"
}

trap cleanup EXIT

[[ "$DEPLOY_DIR" != "/" ]] || fail "DEPLOY_DIR cannot be /"
[[ ! -e "$BACKUP_DIST" ]] || fail "Backup path already exists: $BACKUP_DIST"
[[ -f "$DEPLOY_DIR/package.json" ]] || fail "No package.json found in $DEPLOY_DIR"
git -C "$DEPLOY_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1 \
  || fail "$DEPLOY_DIR is not a Git checkout"

command -v flock >/dev/null 2>&1 || fail "Install util-linux (flock is required)"
exec 9>/tmp/codesagepath-deploy.lock
flock -n 9 || fail "Another deployment is already running"

current_branch="$(git -C "$DEPLOY_DIR" branch --show-current)"
[[ "$current_branch" == "$DEPLOY_BRANCH" ]] \
  || fail "Expected branch '$DEPLOY_BRANCH', found '${current_branch:-detached HEAD}'"

if [[ -n "$(git -C "$DEPLOY_DIR" status --porcelain --untracked-files=all)" ]]; then
  fail "Working tree has local changes; commit or move them before deploying"
fi

if [[ "$EUID" -ne 0 ]]; then
  command -v sudo >/dev/null 2>&1 || fail "sudo is required to validate and reload Nginx"
  sudo -v
  SUDO=(sudo)
fi

git -C "$DEPLOY_DIR" fetch --prune "$GIT_REMOTE" "$DEPLOY_BRANCH"
git -C "$DEPLOY_DIR" merge --ff-only FETCH_HEAD

cd "$DEPLOY_DIR"
BUILD_DIR="$(mktemp -d "$DEPLOY_DIR/.deploy-build-XXXXXX")"
STAGED_DIST="$(mktemp -d "$DEPLOY_DIR/.deploy-stage-XXXXXX")"

[[ -f package-lock.json ]] || fail "package-lock.json is required for npm ci"
command -v npm >/dev/null 2>&1 || fail "npm is required to deploy this project"

printf 'Installing dependencies with npm from package-lock.json\n'
npm ci
npm exec astro -- build --outDir "$BUILD_DIR"

[[ -s "$BUILD_DIR/index.html" ]] || fail "Build output is missing index.html"
[[ -s "$BUILD_DIR/sitemap-index.xml" ]] || fail "Build output is missing sitemap-index.xml"
[[ -s "$BUILD_DIR/sitemap.xml" ]] || fail "Build output is missing sitemap.xml"
"${SUDO[@]}" nginx -t

cp -a "$BUILD_DIR/." "$STAGED_DIST/"
chmod 755 "$STAGED_DIST"

had_live_dist=0
if [[ -e "$LIVE_DIST" || -L "$LIVE_DIST" ]]; then
  mv -- "$LIVE_DIST" "$BACKUP_DIST"
  had_live_dist=1
  LIVE_DIST_MOVED=1
fi

if ! mv -- "$STAGED_DIST" "$LIVE_DIST"; then
  if [[ "$had_live_dist" -eq 1 ]]; then
    mv -- "$BACKUP_DIST" "$LIVE_DIST"
    LIVE_DIST_MOVED=0
  fi
  fail "Could not switch the built site into $LIVE_DIST"
fi

if ! "${SUDO[@]}" systemctl reload nginx; then
  if [[ "$had_live_dist" -eq 1 ]]; then
    mv -- "$LIVE_DIST" "$STAGED_DIST"
    mv -- "$BACKUP_DIST" "$LIVE_DIST"
    LIVE_DIST_MOVED=0
    fail "Nginx reload failed; restored the previous site"
  fi
  fail "Nginx reload failed; the new site files are in place, but no previous dist was available to restore"
fi

DEPLOY_COMPLETED=1
printf 'Deployed %s to %s\n' "$(git -C "$DEPLOY_DIR" rev-parse --short HEAD)" "$LIVE_DIST"
