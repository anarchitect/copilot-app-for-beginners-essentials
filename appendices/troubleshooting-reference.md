# Troubleshooting Reference

Use this reference when you get stuck. Start with the related chapter, then check the symptom and next action.

## Chapter 00: Setup

Related chapter: [00 Setup](../00-setup/)

| Symptom | Likely cause | Try this |
|---|---|---|
| Sign-in fails | Account, network, SSO, or GitHub Enterprise Cloud sign-in issue | Confirm the account, browser sign-in, and network access. If your organization uses `*.ghe.com`, select **Sign in to GitHub Enterprise Cloud** |
| App access is unavailable | Copilot plan, own model provider, or organization policy | Confirm a Copilot plan or a configured model provider. For Business or Enterprise, confirm the **GitHub Copilot app** policy is enabled (it is separate from the Copilot CLI policy) |
| Git is not detected | Git is missing or not on PATH | Install Git and restart the app |
| On Windows, `npm` fails because running scripts is disabled | PowerShell's execution policy blocks `npm.ps1` | Use `npm.cmd` in place of `npm`. For another fix, open the Windows section in [Check your tools in Terminal](../00-setup/README.md#check-your-tools-in-terminal) |
| Repository does not appear | Repository access or picker filter | Check account access, organization membership, repository permissions, and whether to add a local folder, GitHub repo, or URL |
| A chat cannot summarize the repo | Repo not connected or context is too broad | Reconnect the project and ask for a small overview of the course repo |

## Chapter 01: Tour the App

Related chapter: [01 Tour the App](../01-tour-the-app/)

| Symptom | Likely cause | Try this |
|---|---|---|
| Unsure which mode to use | Modes sound like skill levels | Use Chats for exploration, Plan when you want an approach first, Interactive when you want to steer each step, and Autopilot for a clear low-risk task |
| Responses are slow or costly | Model, reasoning effort, or context is larger than needed | Lower reasoning effort for simple tasks and attach only useful context |
| Settings look different from screenshots | App version or platform difference | Check the app version. Labels and layout can vary by version and platform |
| Voice dictation does not work | Microphone permission or local transcription model | Check OS microphone permission, voice settings, downloaded model, shortcut, and language support |
| Keyboard shortcut is missing | Platform or app version difference | Open Help or settings and use the shortcut list for the installed version |

## Chapter 02: Sessions, Worktrees, and Context

Related chapter: [02 Sessions, Worktrees, and Context](../02-sessions-worktrees-context/) and [Git Worktrees](git-worktrees.md)

| Symptom | Likely cause | Try this |
|---|---|---|
| Session edits appear in an unexpected folder | Worktree path or branch confusion | Check the session details, branch name, and worktree path in the app |
| Worktree is missing | Folder was moved or deleted manually | Prefer app cleanup. If already deleted, close the session and recreate the work from the branch or PR if available |
| Two sessions conflict | They edited the same files or shared resources | Pause one session, compare diffs, and decide which branch is the source of truth |
| Web server fails to start | Port already in use | Stop the unused server or run the second session on another port, such as `5174` |
| Session differs from main checkout | Dependencies, branch contents, environment, or generated files differ | Run install and validation commands in the session worktree |
| Context is noisy | Too many files or broad prompts | Use focused `@` file or folder references and smaller tasks |
| Responses include too much unrelated detail | App-wide instructions or context are noisy | Keep **Settings → Sessions** app instructions short and attach only relevant files |
| Branch names are hard to recognize | Branch prefix is not configured | Set a project or app branch prefix that identifies GitHub Copilot app sessions |

## Chapter 03: Canvases

Related chapter: [03 Canvases](../03-canvases/)

| Symptom | Likely cause | Try this |
|---|---|---|
| Canvas does not open | `/create-canvas` missing, or extension syntax, dependency, or reload issue | Retry `/create-canvas`, or keep the same board as markdown in the session |
| Canvas state looks stale | Stored state and visible UI are out of sync | Refresh the canvas or rerun the action that updates state |
| Agent action fails | Capability name or input schema mismatch | Check the action name, required fields, and stored state |
| Canvas contains private content | Shared surface was used like private notes | Remove secrets, private repository details, and customer data from the canvas |

## Chapter 04: Automations

Related chapter: [04 Automations](../04-automations/)

| Symptom | Likely cause | Try this |
|---|---|---|
| Manual automation does not run | App, project, or tool dependency is unavailable | Confirm the app is open, the project exists, and required tools are installed |
| Schedule does not run | Local machine asleep or cloud setting unavailable | Use manual run for beginner exercises or verify cloud automation prerequisites |
| Cloud automation is unavailable | Policy, billing, repository, or permission issue | Treat it as advanced, read the optional section, and continue with local automations |
| Issue trigger fires too often | Trigger is too broad | Narrow the repository, labels, issue query, or tool permissions |
| Practice PR is missing | Wrong repository, closed PR, or missing access | Check the repository picker and GitHub. Setup does not reopen closed PRs |
| CI fails on the stats practice branch | Intentional favorite-count regression | Report the failure; do not weaken tests or merge the regression |
| Report cannot determine merge readiness | Missing check, review, conflict, or branch-rule evidence | Report unknown and inspect the PR on GitHub; passing tests alone are insufficient |

## General rule

If the agent says a task is complete, still inspect the evidence. A good course workflow ends with visible validation: the diff, tests, build, browser preview, PR checks, or review result.
