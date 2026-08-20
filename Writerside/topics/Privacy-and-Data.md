# Privacy and Data

<tldr>
    <p><b>Where data goes</b>: your Azure DevOps org, and (only if you enable AI) the provider you configured.</p>
    <p><b>Credentials</b>: the IDE's <code>PasswordSafe</code>, backed by your system keychain.</p>
    <p><b>Telemetry</b>: none - no usage analytics, no background pings. <a anchor="crash-reports">Crash reports</a> are minimized and redacted on your machine and sent only when you press the button.</p>
</tldr>

What leaves your machine when you use %product%, where it goes, and how to keep everything local.

> This page is the technical data-flow reference. The formal legal documents are the [](Privacy-Policy.md)
> and the [](Terms-of-Service.md).
> {style="note"}

## Credentials

| Credential           | Where it's stored                                                                                             |
|----------------------|---------------------------------------------------------------------------------------------------------------|
| Azure DevOps PAT     | IDE's `PasswordSafe` → system keychain (macOS Keychain, Windows Credential Manager, GNOME Keyring / KWallet). |
| OAuth refresh tokens | Same - `PasswordSafe`. Plaintext on disk is never used.                                                       |
| AI provider API keys | Same - `PasswordSafe`, one key slot per provider type (OpenAI, Claude, …).                                    |

See [](Authentication.md) for the per-OS keychain details and how to rotate or revoke a PAT.

## What's sent to Azure DevOps

The plugin is a thin client over the Azure DevOps REST API. Every call goes directly to the org you configured
(`dev.azure.com/<org>` or your on-prem Azure DevOps Server). Nothing is routed through third-party servers.

Calls are made when:

- You open the PR tool window (initial list fetch).
- The 60-second background sync ticks.
- You open a PR (timeline + diff fetches).
- You post a comment, vote, mark viewed, complete, or abandon.
- You generate the `git fetch` / `git push` credential handoff for an Azure DevOps remote.
- An AI agent you connected to the IDE calls one of the Azure DevOps MCP tools - see below.

## What's sent to AI providers {id="whats-sent-to-ai-providers"}

Only when AI is **enabled** and a provider is configured. The plugin makes outbound calls only for the action you
triggered.

> When you add or edit an AI provider, the plugin makes one authenticated **model-list** request (e.g. `GET /v1/models`)
> to that provider using its API key, to populate the model dropdowns. This is the only AI request that fires at setup
> time rather than on an action you triggered. No PR code, diff, or prompt is sent - just the models-list call - and the
> result is cached for about 30 minutes. Local providers (Ollama at a localhost address) keep this on your machine.
> {style="note"}

### Per-feature data flow

| Feature                 | What the provider sees                                                                         |
|-------------------------|------------------------------------------------------------------------------------------------|
| **Summarize PR**        | PR title + description + the diff (truncated to **Max diff size**, default 200 KB).            |
| **AI review pass**      | The full per-file diff for each changed file. Files larger than **Max diff size** are skipped. |
| **Explain code**        | The selected file's contents (the whole file, not just the visible range).                     |
| **Commit message**      | Your staged diff (whatever `git diff --cached` would produce).                                 |
| **Title & description** | Branch name + commit messages + diff (truncated as above).                                     |

Diffs are pre-filtered before they leave the IDE: lockfiles, minified and generated files, binaries, and build-output
folders are stripped; a renamed file contributes only its actual edits; a deleted file contributes a one-line note (its
path and removed line count) instead of its contents.

Each AI request also carries the system prompt the plugin builds for that feature. You can override these prompts in <ui-path>Settings | Tools | DevOps Lens | AI Settings | Configure Prompts</ui-path>.

### Provider data-flow matrix

| Provider               | Where requests go                                                                                                 |
|------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Claude (Anthropic)** | `api.anthropic.com` (or your custom base URL).                                                                    |
| **OpenAI**             | `api.openai.com` by default, or whatever base URL you configure (Azure OpenAI, vLLM, self-hosted).                |
| **Gemini (Google)**    | Google's AI Studio / Vertex AI endpoints.                                                                         |
| **Ollama**             | The endpoint you set, typically `http://localhost:11434`. **No network egress** when this is a localhost address. |
| **Claude Code CLI**    | The `claude` binary handles auth and routing - data flow is controlled by Anthropic's CLI terms.                  |
| **OpenAI Codex CLI**   | The `codex` binary's auth and routing.                                                                            |
| **GitHub Copilot CLI** | The `copilot` binary uses your Copilot subscription - data flow is governed by GitHub Copilot's terms.            |

The plugin does not add headers, telemetry, or analytics on top of these requests. Whatever the upstream provider sees
is exactly what the plugin sent.

## What an MCP agent can see {id="what-an-mcp-agent-can-see"}

If you connect an AI agent to the IDE's built-in MCP server (Claude Code, Codex CLI, Copilot CLI, ...), the plugin
offers it Azure DevOps tools. This is a different direction from everything above: nothing is sent to an AI provider
*by the plugin*. The agent asks, the plugin queries **your** Azure DevOps org with **your** existing connection, and
returns the answer to the agent - which then does whatever its own model and terms dictate.

- **Your token is never shared.** Tools run inside the IDE against the already-authenticated client. The agent
  receives results, never credentials.
- **No new destination.** These calls go to the same Azure DevOps org as every other request on this page.
- **What the agent can read**: pull request details, comment threads, changed files, the diff itself, merge checks,
  pipelines, runs, failure and step logs, and test results - for the repository you have connected. Whatever the
  agent reads, it may pass to its own model.
- **What it cannot do unless you allow it**: commenting, voting, resolving threads, running or cancelling pipelines
  and retrying stages are off until you tick **Let AI agents change Azure DevOps** in
  <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>.
- **What it can never do**: complete or abandon a pull request, or decide a pipeline approval gate.

If you do not connect an agent to the IDE's MCP server, none of this applies. See [](MCP-Tools.md).

## Caching AI responses

When a feature returns a result, the plugin caches it keyed by:

- The PR ID.
- The diff SHA at the time of the request.
- A monotonic `cacheGeneration` counter - bumped when you edit a prompt, change a provider, or click **Clear cached AI
  responses** in the summary card's gear popup.

A cache hit returns instantly with no outbound call. Cached responses live in IDE-local state and are cleared on plugin
uninstall.

## Telemetry

The plugin collects **no usage analytics**. Nothing tracks which features you use, how often you open a pull request, or
what you click. There are no "phone home" pings, and no call leaves your machine in the background beyond the Azure
DevOps and AI-provider requests listed above.

The one exception is crash reporting, and it never happens without you pressing a button.

## Crash reports {id="crash-reports"}

### Why this exists {id="why-crash-reporting-exists" collapsible="true"}

When the plugin hits a bug, the useful evidence - the stack trace - lands in a log file you would have to find, open,
read, and scrub before pasting it into an issue. Almost nobody does that, so most reports arrive as "the diff was blank
sometimes", which usually cannot be fixed.

Crash reporting shortens that to one click, so a real fix becomes possible. It is a diagnostic channel, not a tracking
one: it fires **only** when the plugin actually throws an unexpected error, and only when you choose to send it.

### When it fires

The IDE shows its standard error dialog (a red icon in the status bar) when the plugin throws an unhandled exception.
That dialog carries a **Report to DevOps Lens** button. Nothing is transmitted until you press it - closing the
dialog sends nothing, and there is no background retry or queue.

Expected failures never reach this path. Being offline, an expired token, a 403, or a missing file are all handled and
logged locally; they are not bugs, so they never produce a crash report.

### What is sent

| Included               | Detail                                                                                                                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Redacted stack trace   | Class names, method names, file names, line numbers - the code path that failed                                                                                                             |
| Plugin version         | e.g. `1.4.2`                                                                                                                                                                                |
| IDE name and build     | e.g. `IntelliJ IDEA 2026.2 (Ultimate Edition), build IU-262.9437.185`                                                                                                                       |
| Operating system       | Name, version, architecture                                                                                                                                                                 |
| Java runtime           | The IDE's boot JVM build and vendor, e.g. `21.0.5+8-b631.28 (JetBrains s.r.o.)` - several rendering and icon defects are JetBrains Runtime bugs that the IDE version alone doesn't identify |
| Azure DevOps flavor    | The word `cloud`, `on-prem`, `cloud + on-prem`, or `no accounts` - never a server address                                                                                                   |
| Your description       | Only the text you type into the dialog's comment box, if you type any                                                                                                                       |

### What the report is designed not to include

- **Credentials.** Personal Access Tokens, OAuth tokens, and AI API keys are stripped before sending.
- **Your code.** No file contents, no diffs, no comment text, no pull request titles or descriptions.
- **Names that identify you or your work.** Organization, project, repository, server host, and user names are replaced
  with placeholders on your machine.
- **Your Azure DevOps URL.** Cloud and on-prem addresses alike are reduced to placeholders; only the coarse `cloud` /
  `on-prem` flag survives, because that distinction is what most bugs hinge on.
- **An assigned user identity.** The Plugin does not add an account ID, user profile, persistent report identifier, or
  email address to the payload. Sentry or its infrastructure may still process connection metadata such as an IP address.

These are data-minimization controls, not a promise that a crash report can never contain personal data. An unexpected
future exception message or text you type could bypass a pattern-based scrubber. Do not add code, credentials, names,
or other confidential data to the description. The formal legal treatment is in the
[Privacy Policy](Privacy-Policy.md#crash-reports).

### Redaction happens on your machine {id="anonymization" collapsible="true"}

Redaction runs locally, *before* anything is transmitted - not on a server afterward. A stack trace that starts out
like this:

```text
AzureApiError$Unauthorized: 401 for https://dev.azure.com/contoso-payments/Checkout/_apis/git
  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY
  at com.vednovak.devops.api.PullRequestsApi.list(PullRequestsApi.kt:88)
  reading /Users/jane.doe/dev/checkout/build.gradle.kts
```

is transmitted like this:

```text
AzureApiError$Unauthorized: 401 for https://dev.azure.com/[path]
  Authorization: Bearer [REDACTED]
  at com.vednovak.devops.api.PullRequestsApi.list(PullRequestsApi.kt:88)
  reading ~/[path]
```

The code path survives intact - that is what makes the bug fixable - while the token, the organization and project
names, and your home directory do not.

> Over-redaction is deliberate: the plugin would rather blank out one word too many than leak one. If a report looks
> aggressively scrubbed, that is the trade-off working as intended.
> {style="note"}

### Where it goes

Reports go to a private [Sentry](https://sentry.io) project owned by the plugin developer, configured for Sentry's
**Germany data region**. They are **not** posted to the public issue tracker and are not publicly visible. Sentry is a
US-headquartered processor and may use group companies and subprocessors internationally under the safeguards described
in the [Privacy Policy](Privacy-Policy.md#crash-reports).

This is the one part of the plugin where data reaches infrastructure the developer controls. Everything else - pull
requests, code, credentials, AI - flows directly between your IDE and your own Azure DevOps organization or your own AI
provider. The formal statement is in the [Privacy Policy](Privacy-Policy.md#crash-reports).

### If you would rather not send anything

Simply do not press the button - close the error dialog and nothing leaves your machine. If you would like the bug fixed
anyway, use <b>Copy DevOps Lens Diagnostics</b> from the <ui-path>Help</ui-path> menu, read the text yourself,
and paste it into a [public issue](%new_bug_url%). See [Reporting a problem](Troubleshooting.md#reporting-a-problem).

Administrators who want the path closed for a whole team can disable the IDE's error-reporting dialog through their IDE
deployment settings; with no dialog, there is no button to press.

## Keeping everything local

For organizations with data-residency requirements:

<deflist>
    <def title="Use on-prem Azure DevOps Server (formerly TFS)">
        PRs, comments, and the API all live on your own server.
    </def>
    <def title="Disable AI, or keep it on-device">
        Turn AI off with the master switch, or <b>route every AI feature at an Ollama instance</b> running on
        <code>localhost</code>. Combine with an offline-capable model (Llama, Mistral, etc.) and no data leaves your
        machine.
    </def>
    <def title="Avoid CLI AI providers">
        Skip them if you don't want to inherit a third-party CLI's terms - they're convenient but their data flow is
        opaque to the plugin.
    </def>
</deflist>

## Custom AI providers (enterprise) {id="custom-ai-providers" collapsible="true"}

%product% exposes extension points so an enterprise's internal plugin can replace the built-in AI implementations and
route AI calls through, say, an internal gateway. The extension points are declared in `plugin.xml` under the namespace
`intellij.vcs.azuredevops` - refer to the plugin's GitHub repository for implementation details.

If a higher-priority extension is registered, the plugin's built-in default is bypassed for that feature.
