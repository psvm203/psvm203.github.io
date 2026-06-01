#!/bin/sh
# Auto-generate commit message for single post add/modify

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2

# Skip for merges, amends, squashes, etc.
case "$COMMIT_SOURCE" in
  template|merge|squash|commit) exit 0 ;;
esac

# Find staged src/content/posts/*/index.md files (A=added, M=modified)
MATCHING=$(git diff --cached --name-status \
  | awk '$2 ~ /^src\/content\/posts\/[^\/]+\/index\.md$/ && ($1 == "A" || $1 == "M") {print $1, $2}')

[ -z "$MATCHING" ] && exit 0
[ "$(echo "$MATCHING" | wc -l | tr -d ' ')" -ne 1 ] && exit 0

STATUS=$(echo "$MATCHING" | awk '{print $1}')
FILE=$(echo "$MATCHING"  | awk '{print $2}')

# Extract title from YAML frontmatter
TITLE=$(awk '
  /^---/ { if (NR == 1) { in_fm = 1; next } else { exit } }
  in_fm && /^title:/ {
    sub(/^title:[[:space:]]*/, "")
    gsub(/^["'"'"']|["'"'"']$/, "")
    print; exit
  }
' "$FILE")

[ -z "$TITLE" ] && exit 0

if [ "$STATUS" = "A" ]; then
  printf "post: %s\n" "$TITLE" > "$COMMIT_MSG_FILE"
elif [ "$STATUS" = "M" ]; then
  printf "update: %s\n" "$TITLE" > "$COMMIT_MSG_FILE"
fi
