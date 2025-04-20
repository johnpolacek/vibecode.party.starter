#!/bin/bash

# --- Configuration ---
# Set this to the main branch name you prefer (usually main or master)
MAIN_BRANCH_NAME="main"
# Set to 'true' if you want to automatically confirm Vercel deployments
AUTO_CONFIRM_VERCEL="true"

# --- Error Handling ---
# Exit immediately if a command exits with a non-zero status.
set -e

# Keep track of errors
ERRORS=()

# Function to report errors and exit
handle_error() {
    local command="$1"
    local message="$2"
    ERRORS+=("Error running command: $command")
    ERRORS+=("Details: $message")
    echo "-----------------------------------------------------" >&2
    echo "❌ FATAL ERROR during setup process ❌" >&2
    echo "Command failed: $command" >&2
    echo "Error details: $message" >&2
    echo "Setup process aborted." >&2
    echo "-----------------------------------------------------" >&2
    if [ ${#ERRORS[@]} -gt 0 ]; then
        echo "Summary of errors:" >&2
        for error in "${ERRORS[@]}"; do
            echo "- $error" >&2
        done
    fi
    exit 1
}

# Function to open URL in browser based on OS
open_url() {
    local url=$1
    case "$OSTYPE" in
        "darwin"*) # macOS
            open "$url"
            ;;
        "linux"*) # Linux
            if command -v xdg-open > /dev/null; then
                xdg-open "$url"
            elif command -v gnome-open > /dev/null; then
                gnome-open "$url"
            else
                echo "Could not detect the web browser to use."
            fi
            ;;
        *) # Other OS
            echo "Could not detect the web browser to use."
            ;;
    esac
}

# Function to read value from .env file
get_env_value() {
    local key=$1
    local value=""
    if [ -f ".env" ]; then
        value=$(grep "^${key}=" .env | cut -d '=' -f2)
    fi
    echo "$value"
}

# Function to add or update value in .env file
update_env_file() {
    local key=$1
    local value=$2
    local env_file=".env"
    
    # Create .env if it doesn't exist
    if [ ! -f "$env_file" ]; then
        touch "$env_file"
    fi
    
    # Check if key exists and replace, otherwise add
    if grep -q "^${key}=" "$env_file"; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|^${key}=.*|${key}=${value}|" "$env_file"
        else
            sed -i "s|^${key}=.*|${key}=${value}|" "$env_file"
        fi
    else
        echo "${key}=${value}" >> "$env_file"
    fi
}

# Function to deploy all env vars to Vercel
deploy_env_to_vercel() {
    local env_file=".env"
    if [ ! -f "$env_file" ]; then
        echo "No .env file found. Skipping environment variable deployment."
        return
    }

    echo "Deploying environment variables to Vercel..."
    
    # Read each line from .env
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip empty lines and comments
        if [ -z "$line" ] || [[ $line == \#* ]]; then
            continue
        fi
        
        # Extract key and value
        if [[ $line =~ ^([^=]+)=(.*)$ ]]; then
            key="${BASH_REMATCH[1]}"
            value="${BASH_REMATCH[2]}"
            
            # Remove any surrounding quotes from the value
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
            
            echo "Setting $key in Vercel..."
            
            # Add to all environments (production, preview, development)
            vercel env add "$key" production "$value" > /dev/null 2>&1
            vercel env add "$key" preview "$value" > /dev/null 2>&1
            vercel env add "$key" development "$value" > /dev/null 2>&1
        fi
    done < "$env_file"
    
    echo "✅ Environment variables deployed to Vercel"
}

# --- Get User Input ---

echo "🚀 Starting Project Initialization 🚀"
echo ""

# Prompt for the GitHub repository name
read -p "Enter the desired GitHub repository name: " REPO_NAME

if [ -z "$REPO_NAME" ]; then
  handle_error "User Input" "No repository name provided."
fi

# Prompt for repository visibility
read -p "Enter repository visibility (public/private): " REPO_VISIBILITY_INPUT

# Validate repository visibility input
REPO_VISIBILITY=$(echo "$REPO_VISIBILITY_INPUT" | tr '[:upper:]' '[:lower:]') # Convert to lowercase
if [[ "$REPO_VISIBILITY" != "public" && "$REPO_VISIBILITY" != "private" ]]; then
  handle_error "User Input" "Invalid visibility '$REPO_VISIBILITY_INPUT'. Please enter 'public' or 'private'."
fi


# Get the GitHub username using the authenticated GH CLI
GITHUB_USERNAME=$(gh api user --jq .login 2>/dev/null) || handle_error "gh api user" "Could not retrieve GitHub username. Is 'gh auth login' complete?"

FULL_REPO_NAME="$GITHUB_USERNAME/$REPO_NAME"
GIT_REMOTE_URL="git@github.com:$FULL_REPO_NAME.git" # Using SSH URL

echo ""
echo "--- Project Details ---"
echo "Local Directory: $(pwd)"
echo "GitHub Repository: $FULL_REPO_NAME ($REPO_VISIBILITY)"
echo "Vercel Linking Git URL: $GIT_REMOTE_URL"
echo "Main Branch: $MAIN_BRANCH_NAME"
echo "-----------------------"
echo ""
read -p "Does this look correct? (y/N): " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Setup cancelled by user."
    exit 1
fi

echo "" # Add space before next section

# --- Step 1: Initialize Git Repository (if not already) ---
echo "--- 1/4: Setting up local Git repository ---"

# Check if .git directory exists. If not, initialize.
if [ ! -d ".git" ]; then
  git init || handle_error "git init" "Failed to initialize Git repository."
  echo "Git repository initialized."
else
  echo "Existing Git repository found."
fi

# Update config.ts with GitHub URL before initial commit if public repo
if [ "$REPO_VISIBILITY" == "public" ]; then
    config_file="lib/config.ts"
    if [ -f "$config_file" ]; then
        # Use sed to update the github field in config.ts
        # The pattern looks for the 'github: ""' line and replaces it with the new URL
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS requires an empty string after -i
            sed -i '' "s|github: \".*\"|github: \"https://github.com/$FULL_REPO_NAME\"|" "$config_file"
        else
            # Linux version
            sed -i "s|github: \".*\"|github: \"https://github.com/$FULL_REPO_NAME\"|" "$config_file"
        fi
        echo "Updated $config_file with GitHub repository URL"
    else
        ERRORS+=("Warning: Could not find $config_file to update GitHub URL")
    fi
fi

# Add all current files and commit
git add . || handle_error "git add ." "Failed to add files to staging."
# Check if there are staged changes before committing
if git diff --cached --quiet; then
    echo "No new changes to commit. Skipping commit step."
else
    git commit -m "Initial commit from init script" || handle_error "git commit" "Failed to create initial commit."
    echo "Initial commit created."
fi


# Ensure the main branch exists and is named correctly
# Use '--force' to rename if it exists with a different case (like master)
if git branch --list | grep -q "\b$MAIN_BRANCH_NAME\b"; then
    echo "Branch '$MAIN_BRANCH_NAME' already exists."
elif git branch --list | grep -q "\bmaster\b" && [ "$MAIN_BRANCH_NAME" == "main" ]; then
    git branch -m $MAIN_BRANCH_NAME || handle_error "git branch -m" "Failed to rename branch from 'master' to '$MAIN_BRANCH_NAME'."
    echo "Renamed 'master' branch to '$MAIN_BRANCH_NAME'."
else
     # Create the branch if it doesn't exist and there's no master to rename
     # This case is less common after git init and commit, but good practice
     # Check if HEAD exists first (implies a commit has been made)
     if git rev-parse --verify HEAD > /dev/null 2>&1; then
        git branch $MAIN_BRANCH_NAME || handle_error "git branch" "Failed to create '$MAIN_BRANCH_NAME' branch."
        git checkout $MAIN_BRANCH_NAME || handle_error "git checkout" "Failed to checkout '$MAIN_BRANCH_NAME' branch."
        echo "Created and checked out '$MAIN_BRANCH_NAME' branch."
     else
         # No commits yet, branch will be created upon first commit/push
         echo "No commits yet, branch '$MAIN_BRANCH_NAME' will be set on push."
     fi
fi
git checkout $MAIN_BRANCH_NAME > /dev/null 2>&1 || handle_error "git checkout" "Failed to ensure checkout of '$MAIN_BRANCH_NAME'."
echo "Ensured checkout of branch '$MAIN_BRANCH_NAME'."


echo "Local Git setup complete."
echo ""

# --- Step 2: Create GitHub Repository and Push ---
echo "--- 2/4: Creating GitHub repository and pushing ---"

# Check if origin remote already exists and points to the correct repo
CURRENT_ORIGIN=$(git remote get-url origin 2>/dev/null)

if [ -n "$CURRENT_ORIGIN" ]; then
    if [[ "$CURRENT_ORIGIN" == *"github.com/$FULL_REPO_NAME"* ]]; then
        echo "Git remote 'origin' already exists and points to $FULL_REPO_NAME."
    else
        echo "Warning: Git remote 'origin' already exists and points to $CURRENT_ORIGIN."
        echo "This script expects no existing 'origin' remote."
        handle_error "Git Remote Conflict" "Existing 'origin' remote found pointing elsewhere. Please resolve manually."
    fi
else
    # Use GH CLI to create the repo. This automatically adds the 'origin' remote.
    echo "Creating GitHub repository '$FULL_REPO_NAME' ($REPO_VISIBILITY)..."
    if [ "$REPO_VISIBILITY" == "private" ]; then
        gh repo create "$FULL_REPO_NAME" --private || handle_error "gh repo create" "Failed to create private GitHub repository '$FULL_REPO_NAME'. Ensure the name is available and GH CLI is authenticated."
    else # REPO_VISIBILITY is "public"
        gh repo create "$FULL_REPO_NAME" --public || handle_error "gh repo create" "Failed to create public GitHub repository '$FULL_REPO_NAME'. Ensure the name is available and GH CLI is authenticated."
    fi
    echo "GitHub repository '$FULL_REPO_NAME' created."
fi

# Push the local main branch to the new origin, set upstream
echo "Pushing '$MAIN_BRANCH_NAME' branch to GitHub..."
# Check if the branch exists locally before pushing
if git rev-parse --verify $MAIN_BRANCH_NAME > /dev/null 2>&1; then
    git push -u origin $MAIN_BRANCH_NAME || handle_error "git push -u origin $MAIN_BRANCH_NAME" "Failed to push '$MAIN_BRANCH_NAME' branch to GitHub. Check your SSH keys or GitHub auth."
    echo "Branch '$MAIN_BRANCH_NAME' pushed to GitHub and upstream set."
else
     echo "Warning: Local branch '$MAIN_BRANCH_NAME' not found. Cannot push."
     echo "Ensure you have created a commit on branch '$MAIN_BRANCH_NAME'."
     ERRORS+=("Warning: Local branch '$MAIN_BRANCH_NAME' not found after commit step.")
fi


echo "GitHub setup and push complete."
echo ""

# --- Step 3: Link Project to Vercel and GitHub ---
echo "--- 3/4: Linking project to Vercel and GitHub ---"

# Check if Vercel project is already linked
if vercel status --connected 2>/dev/null; then
    echo "Vercel project is already linked."
else
    echo "Linking project to Vercel and connecting to GitHub repository..."
    # Use vercel deploy with --git-connect to link during deployment
    VERCEL_DEPLOY_COMMAND="vercel deploy --confirm --prebuilt --git-connect $GIT_REMOTE_URL"
    echo "Running: $VERCEL_DEPLOY_COMMAND"
    $VERCEL_DEPLOY_COMMAND || handle_error "$VERCEL_DEPLOY_COMMAND" "Failed to link and deploy to Vercel. Check your Vercel auth and ensure the repository link is correct."
    echo "Project linked to Vercel and deployment initiated."
fi

# Set up Clerk environment variables if not in .env
echo ""
echo "Setting up Clerk environment variables..."

# Try to get values from .env first
CLERK_PUB_KEY=$(get_env_value "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY")
CLERK_SECRET_KEY=$(get_env_value "CLERK_SECRET_KEY")

# Prompt for any missing values
if [ -z "$CLERK_PUB_KEY" ]; then
    echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY not found in .env"
    read -p "Please enter your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: " CLERK_PUB_KEY
    if [ -n "$CLERK_PUB_KEY" ]; then
        update_env_file "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "$CLERK_PUB_KEY"
    fi
fi

if [ -z "$CLERK_SECRET_KEY" ]; then
    echo "CLERK_SECRET_KEY not found in .env"
    read -p "Please enter your CLERK_SECRET_KEY: " CLERK_SECRET_KEY
    if [ -n "$CLERK_SECRET_KEY" ]; then
        update_env_file "CLERK_SECRET_KEY" "$CLERK_SECRET_KEY"
    fi
fi

# Deploy all environment variables to Vercel
deploy_env_to_vercel

if [ -z "$CLERK_PUB_KEY" ] || [ -z "$CLERK_SECRET_KEY" ]; then
    ERRORS+=("Warning: Clerk environment variables were not set. The application may not function correctly.")
fi

echo "Vercel linking and environment setup complete."
echo ""

# --- Step 4: Final Vercel Deployment (if not already deployed by linking step) ---
echo "--- 4/4: Initiating final Vercel deployment ---"

VERCEL_DEPLOY_COMMAND="vercel deploy"
if [ "$AUTO_CONFIRM_VERCEL" == "true" ]; then
    VERCEL_DEPLOY_COMMAND="vercel deploy --confirm" # Add --confirm if auto-confirming
fi

echo "Running: $VERCEL_DEPLOY_COMMAND"
# Pipe yes to automatically answer prompts like "Link to project?" if needed
# This is a safeguard; --confirm and --git-connect in the previous step should handle most
yes | $VERCEL_DEPLOY_COMMAND || handle_error "$VERCEL_DEPLOY_COMMAND" "Failed to initiate final Vercel deployment."
echo "Vercel deployment initiated."
echo ""


# --- Completion ---
echo "🎉 Project Initialization Complete! 🎉"
echo "Your project is now:"
echo "- Local Git repository initialized and committed."
echo "- GitHub repository created at https://github.com/$FULL_REPO_NAME"
echo "- Code pushed to the '$MAIN_BRANCH_NAME' branch on GitHub."
echo "- Vercel project linked to the GitHub repository."
echo "- Vercel deployment triggered. Visit your Vercel dashboard to see the status."

# Open Vercel project in browser
echo ""
echo "Opening Vercel project in browser..."
VERCEL_PROJECT_URL=$(vercel project ls --json | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -n "$VERCEL_PROJECT_URL" ]; then
    open_url "https://$VERCEL_PROJECT_URL"
else
    echo "Could not determine Vercel project URL."
fi

if [ ${#ERRORS[@]} -gt 0 ]; then
    echo ""
    echo "⚠️ Warnings and Non-Fatal Issues Encountered: ⚠️"
    for error in "${ERRORS[@]}"; do
        # Filter out the fatal error header if it was added by handle_error
        if [[ "$error" != *"FATAL ERROR"* && "$error" != *"Summary of errors:"* && "$error" != *"- Error running command:"* && "$error" != *"- Details:"* ]]; then
            echo "- $error"
        fi
    done
    echo "Please review the output above for details."
fi

exit 0
