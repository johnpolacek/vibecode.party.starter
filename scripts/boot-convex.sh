#!/bin/bash

# Install Convex CLI globally
pnpm add -g convex@latest

# Check for CONVEX_DEPLOYMENT in Convex production environment
DEPLOY_KEY=$(npx convex env --prod get CONVEX_DEPLOYMENT 2>&1)

if echo "$DEPLOY_KEY" | grep -q 'not found'; then
  echo "\n\033[0;31m✖ Environment variable 'CONVEX_DEPLOYMENT' not found.\033[0m"
  echo "\nTo deploy with Convex, you need to set your deploy key."
  echo "1. Visit your Convex dashboard: https://dashboard.convex.dev"
  echo "2. Go to your project settings and copy the Deploy Key."
  echo "3. Add it to your environment variables as CONVEX_DEPLOYMENT."
  echo "\nExample (.env):\nCONVEX_DEPLOYMENT=your-deploy-key-here\n"
  # Try to get CONVEX_DEPLOYMENT from local .env
  if [ -f .env ]; then
    LOCAL_KEY=$(grep '^CONVEX_DEPLOYMENT=' .env | cut -d '=' -f2-)
    if [ -n "$LOCAL_KEY" ]; then
      echo "\033[0;34mFound CONVEX_DEPLOYMENT in local .env. Attempting to add to Vercel production env...\033[0m"
      TMPFILE=$(mktemp)
      echo "$LOCAL_KEY" > "$TMPFILE"
      if vercel env add CONVEX_DEPLOYMENT production < "$TMPFILE"; then
        echo "\033[0;32m✓ Successfully added CONVEX_DEPLOYMENT to Vercel production environment.\033[0m"
      else
        echo "\033[0;31m✖ Failed to add CONVEX_DEPLOYMENT to Vercel. Please add it manually.\033[0m"
      fi
      rm "$TMPFILE"
    fi
  fi
else
  echo "\033[0;32m✓ CONVEX_DEPLOYMENT found in Convex production environment.\033[0m"
fi 