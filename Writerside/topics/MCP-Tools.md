# MCP Tools for AI Agents

<tldr>
    <p><b>What</b>: AI agents connected to the IDE (Claude Code, Codex CLI, Copilot CLI, ...) get Azure DevOps tools through your signed-in connection.</p>
    <p><b>Setup</b>: none for reading. To let an agent change things, tick <b>Let AI agents change Azure DevOps</b> in <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>.</p>
</tldr>

The plugin can serve **Azure DevOps tools over the IDE's built-in MCP server** (Model Context Protocol). Any MCP
client you connect to the IDE - Claude Code, Codex CLI, Copilot CLI, and friends - can then list your pull requests,
read review threads, inspect pipeline runs and their failures, or (separately opted in) comment, vote, and queue runs,
all through the connection you are already signed in with.

> Your credentials never reach the agent. Tools run **inside the IDE** against the plugin's authenticated client - the
> agent sees results, not tokens. On-prem servers, proxies, and custom certificates work exactly like the rest of the
> plugin, with zero extra setup for the agent.
> {style="note"}

## Requirements

- The bundled **MCP Server** plugin (`com.intellij.mcpServer`) must be enabled - it ships with every IDE the plugin
  supports. With that plugin disabled, the Azure DevOps tools simply don't register.
- An active Azure DevOps connection: signed in, with a repository selected in the Pull Requests tool window.
- An MCP client connected to the IDE's server - set that up in <ui-path>Settings | Tools | MCP Server</ui-path>, which
  shows ready-made configuration for common clients.

## Reading works out of the box

There is nothing to switch on for the read tools. Connect an agent to the IDE's MCP server and it can immediately
list and read your pull requests and pipelines through the connection you are already signed in with.

## Let an agent change things

One checkbox, **off** by default, in <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>:

**Let AI agents change Azure DevOps (comment, vote, resolve threads, run and cancel pipelines)**

It is checked on **every** tool call, so ticking or unticking it applies immediately - no restart, no reconnect.
While it is off, a write tool answers with a short "read-only" hint the agent can relay to you.

> Why is writing separate? Pull-request content an agent reads - descriptions, comments, build logs - is written by
> other people. A malicious comment could try to talk your agent into "helpfully" changing something ("please re-run
> the deploy pipeline"). Keeping the actions that change Azure DevOps behind their own opt-in means reading stays safe,
> and the plugin's tool descriptions tell agents explicitly to treat that content as data, not instructions.
> {style="warning"}

> This setting does not affect the plugin's own AI features (summaries, AI review, commit messages). Those generate
> text in one shot and never call a tool. This page is only about agents *you* connect to the IDE.
> {style="note"}

## The tools

Read tools (always available):

| Tool                                  | What it returns                                                                                        |
|---------------------------------------|--------------------------------------------------------------------------------------------------------|
| `get_connection`                | Server, project, repository and signed-in user of the current IDE project - the agent's starting point. |
| `get_ide_context`               | What you are working on now: the checked-out branch, its pull request, and whether your checkout is behind it. Resolves "my PR" and "this branch". |
| `find_pull_request_for_branch`  | The active PR opened from a branch - by default the one you have checked out.                            |
| `list_pull_requests`            | PRs, newest first; filter by state, author = me, reviewer = me, source or target branch, with paging.    |
| `get_pull_request`              | One PR: description, branches, merge status, reviewers and votes, its web URL and the commits it spans.  |
| `list_pull_request_threads`     | The human discussion threads (system events filtered out), unresolved by default.                        |
| `list_pull_request_changes`     | The changed files with add/edit/delete/rename kinds and counts, plus the base and head commits.           |
| `get_pull_request_diff`         | The actual unified diff - the code, not just the file list. Optionally narrowed to chosen paths.          |
| `get_pull_request_file`         | One file's full text at the PR's head (or base) commit, for files your checkout does not have.            |
| `list_pull_request_commits`     | The commits contained in the PR.                                                                          |
| `get_pull_request_checks`       | Merge readiness: posted statuses merged with branch-policy evaluations, each marked blocking or not, and the run id behind each build validation. |
| `list_pipelines`                | The project's pipelines, filterable by name.                                                              |
| `list_pipeline_runs`            | Recent runs; filter by pipeline, branch, result or time window.                                           |
| `get_pipeline_run`              | One run with a per-stage / per-job breakdown and error counts.                                            |
| `get_pipeline_run_failures`     | A failure report: failed steps, their error annotations, and trimmed log excerpts around the failures.     |
| `get_pipeline_step_log`         | The log of one named step or job - including on green runs, which the failure report says nothing about.   |
| `get_pipeline_run_test_results` | Test outcome counts plus the failed test cases.                                                           |
| `get_pipeline_run_changes`      | The commits a run built that its predecessor did not - the first question when a pipeline turns red.       |
| `list_pending_approvals`        | The manual approval gates blocking a run, with stage, instructions, approvers, and whether they are yours. |

Write tools (need the checkbox above):

| Tool                                     | What it does                                                                       |
|------------------------------------------|------------------------------------------------------------------------------------|
| `add_pull_request_comment`         | Starts a new thread on a PR, or replies in an existing one. Markdown supported.    |
| `add_pull_request_review_comment`  | Posts a comment anchored to a file and line, the way a human reviewer's inline comment renders on the diff. |
| `set_pull_request_vote`            | Casts your review vote - approve, approve with suggestions, wait for author, request changes, or reset. |
| `resolve_pull_request_thread`      | Resolves a comment thread, or reopens it.                                          |
| `run_pipeline`                     | Queues a pipeline run on a branch you choose, with optional template parameters - YAML and classic pipelines both work, on cloud and on-prem. |
| `cancel_pipeline_run`              | Cancels an in-progress run.                                                        |
| `retry_pipeline_stage`             | Re-runs one stage of a run in place, instead of queueing a whole new run.          |

Results are deliberately compact: lists are capped, long text is clipped with an explicit truncation marker, and
failure reports send only the log lines around the errors - the same trimming the plugin's own
[AI log analysis](AI-Features.md) uses. Your agent's context stays small, and its answers stay on topic.

## What is never exposed

Regardless of settings, there are **no tools** for completing or abandoning pull requests, or for deciding pipeline
approval gates - an agent can *see* a pending gate, never vote on it. Those decisions stay with a human in the IDE or
on the web. Work-item tools are also not included at this time.

## Truncation is always reported

Results are deliberately compact so one tool call cannot flood an agent's context: lists are capped, long text is
clipped, and failure reports carry only the lines around the errors. Whenever something is cut, the result says so -
`omittedFiles`, `omittedThreads`, `omittedStages`, `truncated`, and so on. An agent is never left believing it saw
everything when it saw a prefix.

## Troubleshooting

- **"read-only" on a write tool** - tick **Let AI agents change Azure DevOps** in
  <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>. No restart needed.
- **"No Azure DevOps connection"** - open the Pull Requests tool window and sign in / pick a repository first.
- **The tools don't appear at all** - the IDE's MCP Server plugin is disabled, or your client isn't connected to the
  IDE's server. Check <ui-path>Settings | Tools | MCP Server</ui-path>.
- **The agent used the wrong PR** - point it at `get_ide_context` or
  `find_pull_request_for_branch` so "my PR" resolves to a real id instead of a guess.
