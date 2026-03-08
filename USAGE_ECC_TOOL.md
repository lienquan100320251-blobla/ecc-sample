# ECC Tool — Quick Start & Sample Usage

This file explains how to use ECC Tools to generate a SKILL.md and an analysis PR for your repository.

## Requirements
- Plan: Free tier includes 3 analyses/month. Consider Pro for teams or more runs.
- Permissions: The ECC integration needs:
  - Repository read access (to read git history)
  - Repository write access (to create PRs)
- Availability: Generally available as a GitHub App or integration.

## Install
1. Install ECC Tools on your GitHub repository (via the GitHub Marketplace or the app installation link provided by ECC).
2. When installing, grant:
   - Read access to code (git history)
   - Write access to create pull requests

## How to run / trigger an analysis
You trigger ECC by commenting on any GitHub Issue in the repository (or letting auto-triggers fire).

Examples (exact comments to post inside an issue):

- Analyze the default branch:
  /skill-creator analyze

- Analyze a specific branch:
  /skill-creator analyze --branch feature-x

Notes:
- Place the comment in any issue (new or existing). The ECC bot will read the repository and create a PR with the generated output (including SKILL.md).
- If your repository has a branch named `feature-x`, the `--branch` flag tells ECC to analyze that branch instead of default.

## Auto-triggers (things that may cause ECC to run automatically)
- Push 5+ commits to the repository default branch — auto-triggers analysis
- Open a PR with 50+ additions — auto-triggers pattern detection
- Or manually comment on an issue (recommended for explicit control)

## What to expect
- ECC will create a Pull Request containing a generated `SKILL.md` (and possibly other files) that outline recommended prompts, patterns, and code examples learned from your repo.
- PR title and body typically indicate it is an ECC analysis and will include a summary and the `SKILL.md` file contents.

## Review checklist for the generated PR
- Confirm the `SKILL.md` content matches your repository conventions.
- Update or remove any example prompts that leak sensitive data.
- Test prompts locally if you use the outputs with Claude/other tools.
- Merge the PR to enable the tool to "learn" your patterns (if you want ECC to keep the changes).

## Troubleshooting
- Not seeing the bot create a PR?
  - Verify the ECC app is installed on `lienquan100320251-blobla/ecc-sample`.
  - Confirm the app has read and write access to the repository.
  - Check plan limits (Free tier: 3 analyses/month).
  - Check repository default branch settings and branch names used in `--branch`.
- Bot reports errors in logs:
  - Look at the PR comment or the app logs (if available) for details.
  - Ensure there are commits and code to analyze (very small repos may have limited output).

## Example workflow
1. Install ECC Tools on the repo.
2. Create/open an issue titled "Run ECC analysis".
3. Post the comment "/skill-creator analyze" in the issue.
4. Wait for ECC to open a generated PR (review SKILL.md).
5. Review and merge the PR to enable learning and apply recommended changes.
