#!/bin/bash

# Exit immediately on error
set -e

# Step 1: Bump patch version in package.json (but don't create a Git tag yet)
new_version=$(npm version patch --no-git-tag-version)
echo "📦 Bumped version to $new_version"

# Step 2: Stage all changes
git add .

# Step 3: Ask for commit message
echo "📝 Enter your commit message:"
read commit_msg

# Step 4: Commit the changes
git commit -m "$commit_msg"

# Step 5: Create Git tag matching the version (e.g., v0.1.5)
git tag "$new_version"
echo "🏷️ Created git tag: $new_version"

# Step 6: Ask where to push
echo "🌿 Where do you want to push?"
echo "1 = main branch"
echo "2 = current branch ($(git rev-parse --abbrev-ref HEAD))"
read choice

if [ "$choice" = "1" ]; then
  branch="main"
else
  branch=$(git rev-parse --abbrev-ref HEAD)
fi

# Step 7: Push the branch (and create it remotely if missing)
git push -u origin "$branch"

# Step 8: Push the version tag as well
git push origin "$new_version"

echo "✅ Done! Changes pushed to '$branch' and tag $new_version created."