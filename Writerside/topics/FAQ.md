# FAQ

Decision-style questions about whether and how to use %product%. For "it's broken, how do I fix it?" questions,
see [](Troubleshooting.md).

## What it works with {id="compatibility"}

### Does the plugin support Azure DevOps Server (on-prem)?

Yes. Add the server's URL when creating an account. Both Azure DevOps Server 2019+ and Azure DevOps Services (cloud) are
supported.

<tabs>
    <tab title="Azure DevOps Services (cloud)">
        <p>The cloud product uses <code>dev.azure.com/&lt;org&gt;</code>.</p>
        <p>Both sign-in methods work: PAT, and OAuth via Microsoft Entra.</p>
    </tab>
    <tab title="Azure DevOps Server (on-prem)">
        <p>On-prem takes either a collection URL (<code>https://tfs.contoso.com:8080/tfs/my-collection</code>) or a
            repository URL (<code>…/my-collection/my-project/_git/my-repo</code>) - both resolve to the same
            account.</p>
        <p>PAT auth only: OAuth via Microsoft Entra is <b>cloud-only</b>, so on a resolved on-prem server the
            <b>Log In via Microsoft…</b> button is shown greyed out with an explanation rather than hidden.</p>
    </tab>
</tabs>

See [Azure DevOps Server (on-prem)](Authentication.md#on-prem) for the full walkthrough.

### Does it support Azure Pipelines?

Yes. A dedicated **Pipelines** tool window lets you browse pipelines and runs, watch the interactive stage graph, read
color-coded step logs, and approve or reject manual-approval gates - all inside the IDE. When a pull-request CI check
points at an Azure build, clicking **Details…** opens that run in the IDE instead of the browser.

![The Pipelines tool window with the runs navigation bar and definitions list](pipelines-tool-window.png){ width="720" border-effect="line" thumbnail="true" }

Pipelines is always on - there's nothing to switch on first, and no switch to turn it off. The tool window appears as
soon as a repository maps to an Azure DevOps remote. If you'd rather not be interrupted by it, untick **Refresh pipeline
runs in the background** under <ui-path>Settings | Tools | DevOps Lens | Pipelines</ui-path>: that stops the polling,
the balloons and the stripe badge, and leaves the window there for when you want it. See [](Pipelines.md).

### Does it work with classic TFVC (non-Git) repositories?

No. The plugin is for Git-backed Azure Repos only. **TFVC** (Team Foundation Version Control, Microsoft's centralized
VCS predecessor to Git in Azure DevOps) is not supported.

### Can I use this without an Azure DevOps account?

No - the plugin is exclusively for Azure DevOps.

### Does it support Azure Repos Wiki?

No. The plugin is scoped to Pull Requests. For wiki editing, use Azure DevOps' web UI.

## Signing in {id="signing-in"}

### OAuth or PAT - which should I pick?

| You should use… | When                                                                                                          |
|-----------------|---------------------------------------------------------------------------------------------------------------|
| **OAuth**       | You're on the cloud product (`dev.azure.com`), your org doesn't ban OAuth, and you want MFA prompts inline.   |
| **PAT**         | You're on Azure DevOps Server (on-prem), your org's policy mandates PATs, or you've hit OAuth handler issues. |

OAuth tokens refresh automatically; PATs expire on the date you set when creating them. PATs bypass MFA by design -
generating one requires the user to already be authenticated, but the token itself doesn't re-prompt.

### How do I create a PAT?

<procedure title="Create a Personal Access Token">
    <step>Sign in to your Azure DevOps organization in the browser.</step>
    <step>Click your profile picture → <ui-path>User settings | Personal access tokens</ui-path>.</step>
    <step>Click <b>New Token</b>, give it a name, an expiration date, and the scopes the plugin needs (easiest: <b>Full access</b>).</step>
    <step>Click <b>Create</b> and copy the token - it's shown only once.</step>
</procedure>

Treat your PAT like a password - never share it or commit it to source control. See [](Authentication.md)
for the scopes each feature needs.

### Why does "Mark file as viewed" fail with a 401?

An Azure DevOps limitation: the viewed-state API only accepts **full-access** tokens, even when everything else works
with scoped ones.

- **PAT users:** regenerate the token with **Full access** and sign in again.
- **OAuth users:** sign in again and pick **Full access** in the permissions chooser (it's the recommended option).

### The plugin can't store or read my token - what now?

The token lives in the IDE's password store, backed by your OS keychain. If native credential storage is disabled or
corrupted, open <ui-path>Settings | Appearance &amp; Behavior | System Settings | Passwords</ui-path> and either switch
to a KeePass file or clear the existing passwords, then log in again. For expired tokens, missing scopes, and other
sign-in errors, see [](Troubleshooting.md).

## Privacy and AI {id="privacy-and-ai"}

### Is my code sent anywhere other than Azure DevOps?

Not unless you've explicitly enabled AI features and configured a provider. See [](Privacy-and-Data.md)
for the full per-feature data flow.

If AI is disabled (the master switch is off), the plugin itself makes zero outbound calls beyond your Azure DevOps org.

One thing to know separately: if you connect an AI agent to the IDE's built-in MCP server, that agent can read pull
request and pipeline content through your connection and pass it to its own model. That is the agent's traffic, not
the plugin's, and it only happens if you set such an agent up. See [](MCP-Tools.md).

### How can I use the plugin without any AI calls?

Uncheck **Enable AI assistance** at the top of <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>. Every AI affordance disappears from menus and toolbars, and no AI calls are made.

You can also leave AI on and route every feature to a local **Ollama** instance for fully on-device inference.

If you additionally want no AI agent reading Azure DevOps through the IDE, disable the bundled **MCP Server** plugin
(<ui-path>Settings | Plugins</ui-path>) - the Azure DevOps tools then never register at all.

### Do the MCP tools make the plugin's AI review smarter?

No - they are unrelated, and it's a common mix-up. The plugin's own AI features (summaries, review, commit messages)
generate text in one shot and cannot call tools. The MCP tools point the other way: they let an agent *you* connect -
Claude Code, Codex CLI, Copilot CLI - read your Azure DevOps data through the IDE. See [](MCP-Tools.md).

### Does the plugin upload anything anonymously? Telemetry?

No usage analytics, ever - nothing records which features you use or what you click, and nothing is uploaded in the
background. Outbound calls go only to your Azure DevOps org and, if AI is enabled, your configured AI provider. (An AI
agent you connect over MCP makes its own calls under its own terms - the plugin adds no telemetry to those either.)

The one exception is a **crash report**: when the plugin hits an unexpected error, the IDE's error dialog offers a
**Report to the Third-Party Plugin** button, and the IDE sends the report through JetBrains Marketplace to the plugin
developer. Your code is never in it, it doesn't go to the public repository, and closing the dialog sends nothing -
unless you have turned on the IDE's automatic exception reporting. The plugin doesn't build that report and can't redact
it, so an error message in it can name an organization or repository. See
[Crash reports](Privacy-and-Data.md#crash-reports).

## Using the plugin {id="using-the-plugin"}

### Where do I see PR metrics?

The [](Statistics.md) tab shows KPIs and charts - time-to-merge, review velocity, vote distribution, and
more - computed locally from cached data. It's a view-only dashboard; for exportable, org-wide reporting use Azure
DevOps Analytics.

### Why don't my PR tabs reopen after an IDE restart?

Because %product% closes them on purpose. The timeline, per-file diff, statistics, and pipeline-run tabs are
session-only views - there is nothing on disk for the IDE to restore, so leaving them open would only produce an error
per tab on the next launch.

Nothing is lost: reopen a PR from the tool window (or with <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>)
exactly as you did the first time. Regular source-file tabs are untouched.

## Getting help {id="getting-help"}

### Where do I report a bug or ask for a feature?

The public tracker: [%tracker_url%](%tracker_url%). Use
[the bug form](%new_bug_url%) for something broken, [the feature form](%new_feature_url%)
for something missing, and [Discussions](%discussions_url%) if you're not sure which it is.

The fastest route is **Report a bug** at the bottom of
<ui-path>Settings | Tools | DevOps Lens</ui-path> - it opens the form with
your IDE build, plugin version, and OS already filled in. See [](Support.md) for
what to include and what to expect back.

Security issues go privately to the vendor email instead - never to a public issue.

### How is the plugin supported?

It's a solo project, built and maintained by one developer. If it helps you, a review on the JetBrains Marketplace is
the best way to support it - reviews are greatly appreciated.
