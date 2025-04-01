import { Octokit } from "@octokit/rest"

// GitHub OAuth configuration
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!

// Required OAuth scopes for repository access and webhook creation
export const GITHUB_SCOPES = []

// Create an Octokit instance with an access token
export function createOctokit(accessToken: string) {
  return new Octokit({
    auth: accessToken,
  })
} 