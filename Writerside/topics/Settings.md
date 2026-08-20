# Settings

<tldr>
    <p><b>Where</b>: <ui-path>Settings | Tools | DevOps Lens</ui-path> - open Settings with <shortcut>⌘,</shortcut> / <shortcut>Ctrl+Alt+S</shortcut>.</p>
    <p><b>Sub-pages</b>: <b>Navigation</b>, <b>Pull Requests</b>, <b>Pipelines</b>, <b>AI Settings</b>, <b>Experimental</b>.</p>
    <p><b>Scope</b>: application-level, except the default account, your PR-list filters, and a few in-context toggles stored per project.</p>
</tldr>

Reference for every setting the plugin exposes.

**DevOps Lens is a tree of six pages.** The page you land on carries only what connects you to
the server - your accounts and the Azure CLI path behind them. Everything you tune afterwards sits
on the sub-page for the feature it belongs to - **Navigation**, **Pull Requests**, **Pipelines**,
**AI Settings**, and **Experimental** - including how often that feature refreshes and what
it notifies you about.

## Tools → DevOps Lens

The root page. At the top is the **accounts** panel (add **+**, edit ✏, remove ✕, per-project default) -
see [](Authentication.md).

![The DevOps Lens settings page accounts panel](accounts-panel.png){ width="700" border-effect="line" }

| Setting                                                                 | Default             |
|-------------------------------------------------------------------------|---------------------|
| **Azure CLI executable** - path to `az`, used by *Log In via Azure CLI* | empty (auto-detect) |

Leave **Azure CLI executable** empty and the plugin finds `az` on the `PATH` or in its default install location. The
**Detect** button next to the field runs that search on demand and writes the result into the field, so you can see what
it found before applying.

## Tools → DevOps Lens → Navigation {id="page-navigation"}

How you *find* things in Azure DevOps from inside the IDE. It is one page, not a section per feature, because its
main switch spans both **Go to** actions.

| Setting                                                              | Default |
|----------------------------------------------------------------------|---------|
| **Show Go to Pull Requests and Go to Pipeline in Search Everywhere** | Off     |
| **Find the pull request behind a line of code**                      | On      |

The first controls how **Go to Pull Requests** (<shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>) and
**Go to Pipeline** (<shortcut>⌥⇧P</shortcut> / <shortcut>Alt+Shift+P</shortcut>) open. Off - the default - each opens
the plugin's own quick-pick dialog: a single window with a **Pull Requests** tab and a **Pipelines** tab, landing on
the tab matching the shortcut you pressed. Turn it on and both actions open Search Everywhere instead, with
**Pull Requests** and **Pipelines** tabs next to Files / Symbols / Actions. One switch covers both actions on
purpose: the dialog is one window, so "Search Everywhere or the dialog?" is one decision.

The second adds **Find Pull Request** to the editor's **Open In** menu, **Copy Pull Request URL for Line** to **Copy /
Paste Special**, and **Annotate with Pull Requests** to the line-number gutter's right-click menu.
See [](Find-Pull-Requests-From-Code.md).

## Tools → DevOps Lens → Pull Requests {id="page-pull-requests"}

### Review

| Setting                                                    | Default        |
|------------------------------------------------------------|----------------|
| **Mark files as viewed when I open their diff**            | Off            |
| **Show a "files viewed" counter above the changes tree**   | Off            |
| **Show attention markers on pull-request rows**            | Off            |
| **Show the submit shortcut on comment buttons**            | On             |
| **Lines shown above a comment**                            | 3 (range 0–50) |
| **Lines shown below a comment**                            | 3 (range 0–50) |

The shortcut-hint toggle shows the submit shortcut (<shortcut>⌘↵</shortcut> / <shortcut>Ctrl+Enter</shortcut>) just
before a composer's **Comment** / **Reply** / **Save** button label. The shortcut works either way - this only shows the
hint. The two **context lines** spinners control how much code the timeline shows around the commented line(s) in a
review thread's diff snippet; set either to 0 to drop that side.

> **Show unread markers** isn't here - it's a tool-window toggle (gear menu), not a settings checkbox. Drafts are a list
> **filter**, not a setting.
> {style="note"}

### Background refresh & notifications {id="pr-background-refresh-notifications"}

| Setting                                                     | Default            |
|-------------------------------------------------------------|--------------------|
| **Refresh pull requests in the background**                 | On                 |
| **Refresh every (seconds)**                                 | 60 (range 15–3600) |
| **Notify when I'm asked to review a pull request**          | On                 |
| **Notify when someone @mentions me**                        | On                 |
| **Notify when my pull request is referenced in another one**| On                 |
| **Notify about replies in threads I took part in**          | On                 |
| **Notify when a vote changes on my pull requests**          | On                 |
| **Offer to create a pull request after I push**             | On                 |

Turning off **Refresh pull requests in the background** stops the PR list sync and the open pull request's refresh.
Nothing then contacts Azure DevOps about pull requests unless you do: opening one, refreshing, voting and commenting all
still work. Useful on a metered connection, or on an on-prem server you'd rather not have an idle IDE polling.

**Every notification in this group rides that same loop**, which is why they are greyed out while it's off - a balloon
can only fire if something noticed the change. The one exception is **Offer to create a pull request after I push**: it
fires off your own `git push`, not the polling, so it keeps working either way.

A *reference* is a comment on a different pull request that writes `!` followed by your PR's number.
See [](Notifications-and-Attention.md) for what these drive.

> Pipelines poll on their own switch and interval, on [their own page](#page-pipelines). The two are deliberately
> independent: a run list worth watching every 30 seconds sits next to a PR list that is fine at five minutes.
> {style="note"}

## Tools → DevOps Lens → Pipelines {id="page-pipelines"}

Pipelines is always on: the tool window appears as soon as a repository maps to an Azure DevOps remote. What you
tune here is how often runs are polled and what you get told about. See [](Pipelines.md).

### Background refresh & notifications {id="pipeline-background-refresh-notifications"}

| Setting                                                | Default            |
|--------------------------------------------------------|--------------------|
| **Refresh pipeline runs in the background**            | On                 |
| **Refresh every (seconds)**                            | 60 (range 15–3600) |
| **Notify when a run of mine finishes**                 | On                 |
| **Notify when a run waits for my approval**            | On                 |
| **Badge the tool-window icon when my runs finish**     | On                 |

Pipelines have their own background refresh, separate from pull requests, so you can watch runs closely without polling
pull requests as often - or the other way round. The notifications and the stripe badge all ride this loop, so they grey
out while it's off.

### YAML schema

**Extra YAML locations** is independent of everything else on this page: schema completion and validation in pipeline
YAML work whether or not the tool window is shown, and whether or not background refresh is on. Enter semicolon-separated paths relative to the repository root - a
folder gives every YAML file under it schema support, and glob patterns match specific files. These add to the built-in
conventions (`azure-pipelines*` file names; the `.azuredevops`, `.azure-pipelines` and `.pipelines` folders; and files
your connected repository's pipeline definitions build).

## Tools → DevOps Lens → AI Settings {id="page-ai-settings"}

A sub-page configuring the optional AI helpers - see [](AI-Features.md).

![The AI Settings page](ai-settings.png){ width="720" border-effect="line" thumbnail="true" }

<deflist>
    <def title="General AI Settings → Enable AI assistance">
        Master switch. <b>Default on</b>, but inert until you add and enable a provider: with no usable provider the
        plugin makes zero outbound AI calls, and the AI affordances point you at this page instead. Turning the switch
        off hides every AI affordance.
    </def>
    <def title="General AI Settings → AI response language">
        Which language the model writes summaries, code explanations, review notes, and pipeline log analysis in.
        <b>Auto</b> follows the IDE language; polishing text you wrote yourself always keeps the language you wrote it
        in. The checkbox beneath - <b>Also use this language for PR titles, descriptions, and commit messages</b> - is
        a separate opt-in, <b>off by default</b>: those land in git history and on the pull request, where your team's
        convention matters more than your IDE's language. What you read inside the IDE follows the dropdown either way.
    </def>
    <def title="AI Providers">
        One row per provider instance (<b>Provider / Model / Enabled</b>). The first enabled row is the default. Add via
        the <b>Add AI Provider</b> dialog (OpenAI, Claude, Gemini, Ollama, GitHub Copilot; HTTP-API or CLI mode) and
        verify with <b>Test Connection</b> before saving.
    </def>
    <def title="Per-Feature Provider">
        Route <b>AI Summary</b>, <b>AI Review</b>, <b>Title + Description</b>, and <b>Explain Code</b> to specific
        instances, or leave them on <b>Default</b>.
    </def>
    <def title="Configure Prompts">
        Edit the system prompt for each feature.
    </def>
    <def title="AI agents (MCP) → Let AI agents change Azure DevOps">
        <b>Off by default.</b> AI agents you connect to the IDE's built-in MCP server can always <b>read</b> pull
        requests and pipelines through your signed-in connection - that needs no setting. This one adds the actions that
        change something: commenting, voting, resolving threads, running and cancelling pipelines. It governs an
        <i>external</i> agent, so it does <b>not</b> affect the plugin's own AI features - it simply lives on this page
        because this is where you look for anything about AI agents. See <a href="MCP-Tools.md"/>.
    </def>
    <def title="Advanced">
        <b>Cache AI responses per commit SHA</b> (default on), <b>Max diff size</b> (default 200 KB, range 10–2000), and
        <b>Clear AI Response Cache</b>.
    </def>
</deflist>

## Tools → DevOps Lens → Experimental {id="page-experimental"}

Previews that are not finished. Everything on this page is **off by default**, opt-in per user, and can change,
misbehave, or be removed in a future update - the page says so in a banner above the first setting. Turn a preview on
to try it, and off again if something looks wrong; the standard behavior comes straight back.

| Setting                                    | Default |
|--------------------------------------------|---------|
| **Filter pull requests with search chips** | Off     |

**Filter pull requests with search chips** previews a GitLab-style search bar in the pull-request list: each active
filter becomes a chip inside the search field and the filter row beneath it goes away; sorting moves to a dropdown and
a direction button on the right. Off keeps the classic two-row bar. Pull Requests only - the Pipelines tool window is
not covered yet.

## Help links {id="help-links" collapsible="true"}

The root **DevOps Lens** page and **AI Settings** end with the same row: **See Documentation · Report a bug · Request a
feature · Ask a question**. The other sub-pages don't repeat it - they are one click from the root.

- **See Documentation** opens the page of this site matching the settings page you're on.
- **Report a bug** opens the [bug form](%new_bug_url%) on the public tracker with your IDE build, plugin version, and
  operating system already filled in. Nothing else is sent, and you can edit or clear those fields before submitting.
- **Request a feature** opens the [feature form](%new_feature_url%); **Ask a question**
  opens [Discussions](%discussions_url%).

See [](Support.md) for what to include and what to expect back.

## Appearance & Behavior → Notifications {id="notifications" collapsible="true"}

The plugin registers three notification groups you can route (popup / tool window / log-only):

| Group                          | For                                                                                     |
|--------------------------------|-----------------------------------------------------------------------------------------|
| **Azure DevOps** | Review requests, @mentions, references, replies, vote changes, push offers.             |
| **Azure DevOps AI**            | AI summary / review completion balloons (sticky, so their action links don't time out). |
| **Azure DevOps Pipelines**     | Run-finished balloons for pipeline runs you triggered.                                  |

## Keymap

Open <ui-path>Settings | Keymap</ui-path> and search **Azure DevOps** to rebind any action. The full list with action
IDs is in [](Keyboard-Shortcuts.md).

## Per-project vs application-level

| Scope                                                | What it covers                                                                                                                                                                                                                                                          |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Application-level** - every project                | Most settings: accounts, notification preferences, AI providers.                                                                                                                                                                                                         |
| **Per-project** - stored in the project's workspace  | The **default account**, your **PR-list filters**, and a few toggles set in context rather than in Settings: **Review Mode** (Git branch-widget popup), **Collapse resolved** (timeline chip), the changes tree's **grouping**, and **unread markers** (gear menu). |
