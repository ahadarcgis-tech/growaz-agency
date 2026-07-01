#!/bin/bash

# Navigate to the website folder
cd "$(dirname "$0")"

echo "==========================================="
echo "🥄 Syncing Daughter Spoon Website to GitHub"
echo "==========================================="
echo ""

# Check if there are any changes
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to sync! Your website is already up to date."
    echo ""
    echo "Press any key to exit..."
    read -n 1
    exit 0
fi

# Add, commit, and push changes
echo "📦 Packaging your latest changes..."
git add .
git commit -m "Auto-sync update: $(date)"

echo ""
echo "🚀 Pushing changes to the live website..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your live website will update in about 1-2 minutes."
else
    echo ""
    echo "❌ ERROR: Could not sync to GitHub."
    echo "Make sure you are authenticated with GitHub."
fi

echo ""
echo "Press any key to exit..."
read -n 1
