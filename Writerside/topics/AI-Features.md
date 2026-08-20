# AI Features

<tldr>
    <p><b>Where</b>: the AI summary card on the PR timeline, the diff toolbar, and every comment editor.</p>
    <p><b>Turn it on</b>: <b>Enable AI assistance</b> in <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>, then add a provider.</p>
</tldr>

Optional AI helpers: PR summaries, full-diff reviews, code explanations, commit messages, PR title/description drafts,
grammar polish, and pipeline log analysis. **Bring your own provider** - OpenAI, Claude, Gemini, Ollama, or GitHub
Copilot - and route each feature wherever you like. Using an AI agent like Claude Code instead? The plugin can also
serve your Azure DevOps data to it as [MCP tools](MCP-Tools.md).

> Every AI call is **user-triggered**, and nothing can be sent anywhere until you add a provider: the master switch
> ships enabled, but with no usable provider configured the plugin makes **zero outbound AI calls** - the AI buttons just
> point you at the settings page. For exactly what's sent to a provider, see [](Privacy-and-Data.md).
> {style="note"}

> Until a provider is set up, the PR timeline shows a one-time **AI onboarding card** in the summary card's slot,
> linking straight to AI Settings. Dismiss it with **✕** and it never returns; configure a provider and it melts into the
> real [summary card](#tune-the-summary).
> {style="tip"}

## What the plugin can do with AI

| Feature                                   | What it does                                                                                                                                                     | Where                                                      |
|-------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| **Summarize Pull Request**                | Drafts a summary of the diff you can drop into the description.                                                                                                  | Timeline card / overflow menu                              |
| **Run AI Review**                         | Walks the diff and proposes inline review comments.                                                                                                              | Diff toolbar / changes-tree menu / overflow                |
| **Explain This File**                     | Streams a plain-English explanation of a file or selection.                                                                                                      | Right-click in the diff                                    |
| **Generate Commit Message with AI**       | Drafts a commit message from your staged changes.                                                                                                                | Commit tool window                                         |
| **Title + Description**                   | Pre-fills the Create-PR form from your branch's diff.                                                                                                            | Create Pull Request form                                   |
| **Polish grammar &amp; spelling with AI** | Cleans up any comment or description in place.                                                                                                                   | Every comment editor                                       |
| **Analyze logs with AI**                  | Explains a finished pipeline run from its logs - root cause and fixes for a failure, a short summary for a green run. Sends only the relevant parts of the logs. | [Pipeline run job logs](Pipelines.md#analyze-logs-with-ai) |

![The AI summary card on a PR timeline](ai-summary-card.png){ width="700" border-effect="line" }

> **Run AI Review** proposes inline suggestions in the diff. Each one offers **Add to review** - which drops the AI's
> text into a new-comment editor on that line so you can edit it and queue it as a draft - or **Discard**, which parks it
> in a dismissed pool you can bring back with the **⟲ restore** control. A restore is free - never a paid re-run. While a
> suggestion card has focus, <shortcut>A</shortcut> adds and <shortcut>D</shortcut> discards it, and <shortcut>
> F8</shortcut> / <shortcut>⇧F8</shortcut> walk human comments, pending drafts, and AI suggestions in one reading order.
> **Nothing is posted to Azure DevOps until you submit your pending comments.**
> {style="tip"}

> A failed run doesn't fail silently: auth, quota, rate-limit, overload, context-too-large, and network errors each get
> their own actionable message with a one-click **Open AI Settings** jump - and a CLI sign-in failure offers to copy the
> fix command (for example `claude /login`).
> {style="note"}

### Is the AI review still current?

The PR timeline's right-hand sidebar carries an **AI review** section - the at-a-glance answer to whether the last
review still matches the code. It shows one of three states:

| State           | What the section says                                                                                                                                                                                            |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Never run**   | *Not run for this pull request yet.* over a **Run AI review** link.                                                                                                                                              |
| **Fresh**       | ✓ *Reviewed 2 hours ago*, then the count - *"3 suggestions, inline in the diff."* or *"No suggestions - clean pass."* - over **View suggestions** and **Re-run**.                                               |
| **Out of date** | ⚠ *Review out of date*, then *"2 new commits since the last review."* - or *"The pull request changed since the last review."* when no count can be derived, as after a force-push - over **Re-run AI review**. |

**View suggestions** jumps into the diff at the first suggestion; it appears only when the run produced at least one.
**Re-run** takes the same path as **Run AI Review** anywhere else, so it's a fresh, billable pass - unlike restoring a
discarded suggestion.

The section is live: it re-renders on every poll, commit load, and finished review, so *Reviewed 2 hours ago* flips to
*2 new commits since the last review.* the moment a push lands.

> The whole section is hidden while AI is off or no provider is configured - an empty **AI review** heading would be
> dead chrome, and the onboarding card already covers the unconfigured case.
> {style="note"}

### Tune the summary {id="tune-the-summary" collapsible="true"}

The **Summary settings** gear in the top-right corner of the **AI summary** card opens a popup that controls how the
summary is generated:

| Control                            | Options                                                                                                                                                                     |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Generate automatically on open** | Checkbox - off by default. When on, the card drafts a summary as soon as the PR opens.                                                                                      |
| **Verbosity**                      | Slider: **Brief** · **Neutral** · **Verbose**.                                                                                                                              |
| **Formality tone**                 | Slider: **Informal** · **Neutral** · **Formal**.                                                                                                                            |
| **Personality**                    | Free-text - an optional persona, e.g. "a slightly sarcastic principal engineer".                                                                                            |
| **Customization prompt**           | Free-text - leave blank to use the default. It's the same override as **Configure Prompts → Pull Request summary** in AI Settings, so edits in either surface stay in sync. |

There's no Save button - edit the controls and dismiss the popup to apply.

![The Summary settings popup off the AI summary card's gear](ai-summary-settings-popup.png){ width="520" border-effect="line" }

## Configure providers

![The AI Settings page: providers and per-feature routing](configure-providers.png){ width="720" border-effect="line" thumbnail="true" }

<procedure title="Add an AI provider">
    <step>Open <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> and turn on <b>Enable AI
        assistance</b> (the master switch).</step>
    <step>Add a provider in the <b>AI Providers</b> table. Each row is one provider instance with a <b>Provider</b>,
        <b>Model</b>, and <b>Enabled</b> column; the first enabled row is the default.</step>
    <step>In the <b>Add AI Provider</b> dialog, pick one of the five families (below) and a <b>Model</b>.</step>
    <step>Pick the provider's <b>mode</b> - HTTP API or CLI (below) - and fill in what it asks for.</step>
    <step>Use <b>Test Connection</b> in the dialog to confirm the provider works before saving.</step>
</procedure>

The **Add AI Provider** dialog offers five families:

| Family             | Notes                                                                          |
|--------------------|--------------------------------------------------------------------------------|
| **OpenAI**         | GPT models. Works with any OpenAI-compatible base URL (Azure OpenAI, vLLM, …). |
| **Claude**         | Anthropic Claude models.                                                       |
| **Gemini**         | Google Gemini models.                                                          |
| **Ollama**         | Local models - free, no key.                                                   |
| **GitHub Copilot** | Uses your Copilot subscription (CLI only).                                     |

> The **Model** dropdown in the Add/Edit dialog populates itself: it shows a bundled suggested list instantly, then
> refreshes from a live query to the provider (for example OpenAI and Claude's `/v1/models`) so newly-shipped models
> appear without a plugin update. The live list is cached for about 30 minutes; it refreshes on every dialog open and
> whenever you change the family or mode, so there's no manual refresh button. Discovery needs a saved key - until one is
> entered the dropdown falls back to the suggested list. The field stays editable, so you can always type a model id by
> hand.
> {style="note"}

Most families run in one of two **modes**:

<tabs>
    <tab title="HTTP API (use an API key)">
        <p>Paste a key; optionally set an <b>API URL</b> to point at a custom endpoint. Keys are stored in the IDE
            keychain (PasswordSafe).</p>
    </tab>
    <tab title="CLI (use the local command-line tool)">
        <p>No key; the local binary handles its own auth. The lowest-friction path, but you take on the CLI vendor's
            terms.</p>
    </tab>
</tabs>

## Route features to providers

The **Per-Feature Provider** panel pins each feature to a specific instance - handy for sending cheap features to a
small model and heavy reviews to a smart one:

```
AI Summary          → [Default ▾]
AI Review           → [Default ▾]
Title + Description → [Default ▾]   (also used by Generate Commit Message)
Explain Code        → [Default ▾]
```

Leave a row on **Default** to use the first enabled provider. You can add the **same family more than once** (e.g. two
OpenAI rows, a cheap model and a smart one) and route to each independently.

### Configure Prompts

The **Configure Prompts** panel lets you edit the system prompt behind each feature. Editing a prompt invalidates cached
responses for it.

## Pick the response language

Two settings in the **General AI Settings** group, right under the master switch:

| Setting                                                                     | Default |
|-----------------------------------------------------------------------------|---------|
| **AI response language**                                                    | Auto    |
| **Also use this language for PR titles, descriptions, and commit messages** | Off     |

**AI response language** is the language the model writes summaries, code explanations, review notes, and pipeline log
analysis in. **Auto** follows the IDE language; polishing text you wrote yourself always keeps the language you wrote
it in. The checkbox beneath is a separate opt-in because PR titles, descriptions, and commit messages land in git
history and on the pull request, where your team's convention matters more than your IDE's language - what you read
inside the IDE follows the dropdown either way.

## Caching, cost, and limits

AI responses are cached **per PR + per commit SHA** (toggle: **Cache AI responses per commit SHA**, on by default). A
cache hit returns instantly with no API call; a new commit or an edited prompt invalidates it. Force a refresh with
**Clear AI Response Cache** in **Advanced**.

You pay your provider's bill for the tokens you use. To keep usage down:

- Route cheap features (commit message, title) to a small model via per-feature routing.
- Lower **Max diff size** in **Advanced** to truncate big diffs before they're sent.
- Keep the cache on so re-opening a PR doesn't re-bill you.

Some savings are automatic: lockfiles (`package-lock.json`, `yarn.lock`, `uv.lock`, …), minified and generated files,
binaries, and build-output folders are stripped from every AI diff before it's sent; a renamed file sends only its
actual edits, and a deleted file sends a one-line note instead of its contents.

> Provider quota and usage-limit errors come straight from the provider - the plugin classifies them and shows clear,
> actionable wording rather than failing silently. It doesn't add its own rate limits or retries.
> {style="note"}

## Keep everything local, or off

- **Local inference:** route every feature at an **Ollama** instance on `localhost` - no code leaves your machine.
- **Off entirely:** uncheck **Enable AI assistance**. Every AI affordance disappears from menus and toolbars, and the
  plugin makes zero outbound AI calls.
