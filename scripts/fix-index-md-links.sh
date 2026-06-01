#!/bin/bash
for file in "$@"; do
    perl -i -pe 's|\(([^)]+)/index\.md\)|($1)|g' "$file"
    git add "$file"
done
