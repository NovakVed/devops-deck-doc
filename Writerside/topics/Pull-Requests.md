# Pull Requests

<tldr>
    <p><b>Where</b>: the <b>Pull Requests</b> tool window, <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>.</p>
    <p><b>Jump to a PR</b>: <b>Go to Pull Requests…</b>, <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>.</p>
    <p><b>Create one</b>: the <b>+</b> button in the tool-window toolbar.</p>
</tldr>

The **Pull Requests** tool window is your command center: browse the queue, filter and search, open a PR, and act on it - complete, revert, compare, and more.

## Open the tool window

The tool window appears in the left sidebar whenever the open project has at least one Azure DevOps Git remote. (No Azure DevOps remote? It stays hidden to reduce clutter.)

- Press <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>.
- Or click the **Pull Requests** stripe icon in the sidebar.
- Or use <ui-path>View | Tool Windows | Pull Requests</ui-path>.
- Or run *Find Action* (<shortcut>⌘⇧A</shortcut> / <shortcut>Ctrl+Shift+A</shortcut>) and type **Pull Requests**.

![The Pull Requests tool window open beside the editor](pr-tool-window-shortcuts.png){ width="720" border-effect="line" thumbnail="true" }

> The keyboard shortcut is the IDE's standard *Activate tool window* action, so you can rebind it in <ui-path>Settings | Keymap</ui-path> - search for **Pull Requests**. Every plugin shortcut is listed in [](Keyboard-Shortcuts.md).
> {style="tip"}

## Find pull requests

### The default view: everything

With no filters active, the list shows **all pull requests** in every state - active, draft, merged, and abandoned side by side. It's the view you land on, and the view *Clear filters* returns you to.

![The unfiltered list: active, draft, merged, and abandoned pull requests in one queue](browse-pull-requests.png){ width="720" border-effect="line" thumbnail="true" }

To see only yours, pick **Mine** in the **State** chip - active PRs you **created**, **assigned to you**, or **assigned to one of your teams**, the same set as the Azure DevOps web **Mine** tab.

> Team-assigned PRs need the right [](Permissions.md). If your credentials can't read team memberships, the plugin tells you once - the rest of the view keeps working.
> {style="note"}

### Quick Filters

Click the **filter icon** on the left of the chip row for one-click presets. A badge on the icon shows how many filters are active.

![The Quick Filters menu open below the filter icon, with three filters active](quick-filters.png){ width="520" border-effect="line" }

| Preset                  | Shows                                                         |
|-------------------------|---------------------------------------------------------------|
| **Active**              | Active pull requests (a **State** preset)                     |
| **Includes my changes** | PRs you authored                                              |
| **I am a reviewer**     | PRs with you on the reviewer list                             |
| **Waiting for author**  | PRs you voted **Waiting for author** on (a **Review** preset) |
| **I reviewed**          | PRs where you've already cast a vote                          |
| **Awaiting my review**  | PRs where you're a reviewer who hasn't voted                  |
| **Abandoned**           | Abandoned pull requests (a **State** preset)                  |
| **Clear N filter(s)**   | Resets every active filter - back to the default all-PRs view |

A preset is a **view**: picking one replaces the current filters rather than adding to them. The two "me" presets
appear once the plugin knows who you are.

### Filter chips

A scrollable row of chips sits below the search field. Click any chip to refine the list:

| Chip              | Options                                                                                           |
|-------------------|---------------------------------------------------------------------------------------------------|
| **State**         | Mine · Active · Completed · Abandoned                                                             |
| **Author**        | Type-ahead search across users                                                                    |
| **Assignee**      | Type-ahead search across users                                                                    |
| **Target branch** | Branches pull requests merge into                                                                 |
| **Tags**          | Azure DevOps PR labels (tags)                                                                     |
| **Draft**         | Yes · No                                                                                          |
| **Sort**          | Newest · Oldest · Most/Least commented · Recently/Least recently updated · Id, newest/oldest first |

Four more dimensions - **Review**, **Work Items**, **Approved by**, and **Source branch** - have no chip of their own
but filter the same list from the search field: type `review:`, `workItem:`, `approvedBy:`, or `sourceBranch:` and
pick a value (see **Search** below). Review state is also what the Quick Filters presets ask about in plainer words.

Filters persist **per project** across IDE restarts. To clear them, use the Quick Filters menu's **Clear N filter(s)**. Chips can also be set straight from the search field - type a filter key like `author:` and pick from the completion popup (see **Search** below).

> **Search** - type in the field above the chips to match PR titles, numbers, authors, and branch names. Typing a filter key - `state:`, `author:`, `tag:`, `assignee:` (alias `reviewer:`), `approvedBy:`, `review:`, `workItem:`, `sourceBranch:`, `targetBranch:`, or `draft:` - opens a completion popup with the available values; picking one applies the matching filter and removes the token from the query. Keys complete too: typing `au` offers `author:`. Press <shortcut>Enter ↵</shortcut> to save the current search - query and filters together - to a **history**: click the field's search icon (or press the **Show Search History** shortcut, <shortcut>⌥↓</shortcut> / <shortcut>Alt+Down</shortcut>) to re-apply a recent one. History is per project and keeps the last 5 searches.
> {style="tip"}

### Jump to a specific PR

When you already know which PR you want, skip the list. **Go to Pull Requests…** fuzzy-searches every cached PR - by **id, title, author, or repo** - and opens it straight on its timeline. An empty search lists every cached PR (unread first, then newest).

- Press <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>.
- Or use <ui-path>VCS | Go to Pull Requests…</ui-path>.
- Or run *Find Action* (<shortcut>⌘⇧A</shortcut> / <shortcut>Ctrl+Shift+A</shortcut>) and type **Go to Pull Requests**.

By default, it opens the plugin's own quick-pick popup - a search field with a status **funnel** beside it, and <shortcut>Enter ↵</shortcut> Open / <shortcut>Esc ⎋</shortcut> Close keys. The same window has a **Pipelines** tab, so **Go to Pipeline** lands in it too.

> Prefer the IDE's *Search Everywhere*? Turn **on** **Show Go to Pull Requests and Go to Pipeline in Search Everywhere** on the [Navigation settings page](Settings.md#page-navigation) and the action opens a **Pull Requests** tab there instead, next to Files, Symbols, and Actions; press <shortcut>Enter ↵</shortcut> to open the highlighted PR. Hits are grouped under **Pull Requests**, and a fruitless search leaves a greyed placeholder row rather than a blank tab - **No pull requests cached yet** before you type, **No pull requests match “X”** after.
> {style="tip"}

![The Go to Pull Requests results: the Pull Requests tab in Search Everywhere](go-to-pull-request.png){ width="640" border-effect="line" }

#### What the dedicated dialog tells you {collapsible="true"}

The dialog's field prompts *Search pull requests by id, title, author, or repo*, and its empty state names the reason it came up short:

| You see                                        | Because                                                                                        |
|------------------------------------------------|------------------------------------------------------------------------------------------------|
| **No pull requests**                           | The initial placeholder, before the first pass over the cache                                  |
| **No pull requests cached yet**                | Nothing cached, and you haven't typed a query                                                  |
| **No pull requests for the selected statuses** | The funnel filtered everything out                                                             |
| **No pull requests match “query”**             | Your query matched nothing                                                                     |
| **Couldn't load pull requests - …**            | The background load failed; the tail names the error, or falls back to *check your connection* |

The funnel opens with every status ticked. It's a per-popup choice - narrowing it doesn't stick, and the next time you open the dialog all statuses are back.

## Read a PR row

Each row packs the status at a glance:

![The anatomy of a pull-request row](pr-row-anatomy.png){ width="640" border-effect="line" }

- **Title and `!`-number**, with a **status pill** when relevant: *Draft*, *Merged*, *Abandoned*, or *Has merge conflicts*.
- **Reviewer vote icons** - approved, approved-with-suggestions, waiting, or rejected.
- **An amber discussion badge** with the thread count (and how many are still unresolved).
- **Attention chips** - *Review requested*, *Mentions you*, or *Replied* - when a PR wants your attention. These are off by default; see [](Notifications-and-Attention.md) to turn them on.

Unread PRs can show a blue **unread marker** dot that reacts to new commits *and* new comment activity. Toggle it from the tool-window gear → **Show unread markers**.

## Open and act on a PR

**Click** a PR to open its detail view - the title and branches, the status checks, the changed-files tree, and the action bar. **View Timeline** opens the discussion beside it.

![An open pull request: the detail view with its status checks and action bar, and the discussion timeline alongside](pr-opened.png){ width="720" border-effect="line" thumbnail="true" }

The action bar at the bottom adapts to your role:

| You are…                 | Primary actions                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------|
| **Reviewer**             | **Approve ▾** (split button: Approve with suggestions, Wait for author, Request changes, Reset feedback) |
| **Author, needs review** | **Request review**                                                                                       |
| **Author, reviews in**   | **Complete ▾** (Set auto-complete…, Mark as draft, Abandon)                                              |
| **Author, draft**        | **Publish ▾** (Abandon)                                                                                  |
| **Author, abandoned**    | **Reactivate ▾** (Delete source branch)                                                                  |
| **Not involved**         | **Set myself as reviewer**                                                                               |

> Your vote can be changed at any time; re-voting simply replaces the previous value.
> {style="note"}

Every state also shows a **⋮** (More) menu with the full action set:

![The More menu on the pull request action bar, open on an active PR you authored](pr-more-menu.png){ width="380" border-effect="line" }

| Action                                         | What it does                                                                                                                                                                                 |
|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Share Pull Request…**                        | Email the PR to people (no reviewers added, no comment posted)                                                                                                                               |
| **Submit Pending Comments (N)**                | Post the comments you've queued as a review (only when N > 0)                                                                                                                                |
| **Restart Merge**                              | *(active PRs with conflicts / a failed or policy-rejected merge)* Nudges Azure DevOps into recomputing the merge. There's no progress bar - watch the merge status flip to *Queued* and back |
| **Change Target Branch…**                      | Re-point the PR at a different target branch                                                                                                                                                 |
| **Cherry-Pick…**                               | Create a branch with this PR's commits cherry-picked onto another branch                                                                                                                     |
| **Review Changes Since…**                      | *(PRs with 2+ updates)* Re-scope the diff to what changed since a chosen update - see [Code Review](Code-Review.md#compare)                                                                  |
| **Revert…**                                    | *(completed PRs)* Create a branch that reverts this PR's changes                                                                                                                             |
| **Open on Web** · **Copy Link**                | Jump to / copy the dev.azure.com URL                                                                                                                                                         |
| **Summarize Pull Request** · **Run AI Review** | [AI assists](AI-Features.md)                                                                                                                                                                 |

Right-click any row for quick actions too: **View Pull Request**, **View Pull Request in Browser**, **Copy Pull Request URL**, and **Refresh List**.

## The pull request lifecycle

### Draft → ready

A draft PR carries a **DRAFT** pill and shows **Publish** as its primary action. Publishing flips it to a normal, reviewable PR; the author can send it back with **Mark as draft**. Both are instant - no confirmation dialog - and land in the timeline as *Marked as ready for review* / *Marked as a draft*.

### Complete a pull request

<procedure title="Complete a pull request">
    <step>
        <p>Click <b>Complete</b> to open the <b>Complete Pull Request</b> dialog.</p>
        <img src="complete-pr-dialog.png" alt="The Complete Pull Request dialog with the merge-strategy diagram" width="560" border-effect="line"/>
    </step>
    <step>Pick a <b>Merge type</b> - a live diagram redraws to show the resulting history shape. See the table below.</step>
    <step>Set the post-completion options - complete linked work items, delete the source branch, customize the merge commit message.</step>
    <step>Click <b>Complete</b> in the dialog. Branch policies are honored - see the note below.</step>
</procedure>

**Merge types:**

| Merge type                  | Resulting history                                               |
|-----------------------------|-----------------------------------------------------------------|
| **Merge (no fast forward)** | Nonlinear history preserving all commits                        |
| **Squash commit**           | Linear history with only a single commit on the target          |
| **Rebase and fast-forward** | Rebase source commits onto target and fast-forward              |
| **Semi-linear merge**       | Rebase source commits onto target and create a two-parent merge |

If a branch policy requires a particular strategy, the forbidden ones are greyed out; picking one blocks completion with *This merge type is forbidden by a branch policy*.

**Post-completion options:**

| Option                                           | Default     | What it does                                                                                                                                                                                         |
|--------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Complete associated work items after merging** | -           | Available only when the PR actually has linked work items.                                                                                                                                           |
| **Delete &lt;branch&gt; after merging**          | **Checked** | Removes the source branch at merge time.                                                                                                                                                             |
| **Customize merge commit message**               | Off         | Ticking it reveals a Title and Description pre-filled with `Merged PR <id>: <title>` (a squash also lists the squashed commits). Rebase ignores this and always reuses the existing commit messages. |

> **Branch policies are honored.** When required reviewers or status checks aren't satisfied, the dialog opens with a red **Completion is blocked by:** banner listing each reason. If you hold the bypass permission you also get **Override branch policies and enable merge**, which requires a written reason. Without that permission the checkbox isn't shown at all.
> {style="warning"}

**Set auto-complete…** arms the PR to merge itself once every policy passes. It opens the same dialog in a reduced form - merge type and delete-branch only - and is deliberately usable *while* the PR is still blocked. Once armed, a banner sits above the status checks: *Auto-complete is set — the pull request will be completed automatically once all policies pass*, with a **Cancel auto-complete** link. A muted second line names what was armed: the chosen merge strategy (e.g. *Squash commit*) and whether the source branch will be deleted. In the PR list, an armed PR also carries a small lightning-bolt badge next to the row's other status icons, with the tooltip *Auto-complete is set*.

### Delete or restore the source branch {id="source-branch" collapsible="true"}

After a PR completes, the merged row in its timeline offers a follow-up, and which one you see depends on whether the branch is already gone:

| Timeline says                                        | What clicking it does                              |
|------------------------------------------------------|----------------------------------------------------|
| *You can now **delete** the source branch*           | Deletes the source branch, in place, from the IDE. |
| *The source branch has been deleted. **Restore…** ↗* | **Opens the pull request on the web.**             |

> **Restore is a link out, not an in-IDE action.** The **↗** arrow is the tell: the plugin doesn't restore the branch itself - it takes you to the pull request page on Azure DevOps, where you use Azure's own **Restore branch** button. Restoring means re-creating the ref at the commit the branch pointed to when it was deleted, which Azure tracks server-side; doing it in the browser is what guarantees you get that exact commit back.
> {style="note"}

Two things worth knowing about how this row decides what to show:

- It infers the branch's fate from the PR's own completion options plus what you've done this session - it does **not** re-check the server for the branch. If someone deletes or restores the branch **outside the IDE**, this row won't notice until the PR is reloaded.
- The delete link is offered to anyone viewing the merged PR, not just the author. If your permissions don't allow it, the deletion won't take effect on the server even though the row updates - confirm on the web if it matters.

If you'd rather never think about it, leave **Delete &lt;branch&gt; after merging** ticked in the Complete dialog and the branch is cleaned up at merge time.

> For an **abandoned** PR, **Delete source branch** is a proper action instead - it sits in the **Reactivate ▾** dropdown.
> {style="tip"}

### Abandon and reactivate

**Abandon** asks for confirmation (*Are you sure you want to abandon this pull request?*) and then closes the PR without merging. The timeline records *Pull Request Abandoned*.

An abandoned PR can be brought back at any time with **Reactivate** - no confirmation, and the timeline records *Pull Request Reactivated*.

> An abandoned PR shows an **ABANDONED** pill in the list, while its detail view labels the state **CLOSED** - two names for the same thing.
> {style="note"}

### Cherry-pick and revert

Both live in the **⋮** menu, and both work the same way: you choose a branch to apply the change **onto**, and the plugin creates a **new branch** for the result. Neither one modifies the pull request you started from.

- **Cherry-Pick…** copies this PR's commits onto another branch, defaulting the new branch to `cherry-pick/<source-branch>`.
- **Revert…** (completed PRs only) creates a branch with this PR's changes undone, defaulting to `revert/<source>-<id>` and pre-selecting the PR's target branch.

Azure DevOps performs the operation server-side while a cancellable progress task runs. When it finishes you get a balloon with a **Create Pull Request** action that opens the Create form pre-filled - new branch as source, your chosen branch as target, and a title like `Revert "<original title>"`. **Landing the change still needs that second PR** - the branch alone changes nothing.

## Create a pull request

<procedure title="Create a pull request">
    <step>
        <p>In the <b>Pull Requests</b> tool window, click <b>+</b> (<b>Create Pull Request</b>) - the first icon in the toolbar at the top right of the list tab, left of the split-view, <b>⋮</b>, and hide icons.</p>
        <img src="create-pr-button.png" alt="The + (Create Pull Request) button in the Pull Requests tool-window toolbar, hovered to show its tooltip" width="590" border-effect="line"/>
    </step>
    <step>
        <p>A <b>New PR</b> tab opens beside the list, pre-filled with the source branch (your current branch) and the default target branch.</p>
        <img src="create-pr-ai.png" alt="The Create Pull Request form: the Write/Preview description composer and the reviewers, tags, and work-item rows" width="640" border-effect="line"/>
    </step>
    <step>Write the title and description. The <b>description</b> uses the same composer as PR comments: a <b>Write | Preview</b> tab strip, with the formatting toolbar above the editor. Type <code>@</code>, <code>#</code>, or <code>!</code> for inline autocomplete of people, work items, and PRs.</step>
    <step>Fill in the metadata rows below the description - reviewers, tags, and work items (see the table below). Use the <b>Work items</b> row to actually link a work item: a <code>#1234</code> typed into the description is a <a href="Markdown.md#hash">reference</a> that renders as a link, not an association.</step>
    <step>Press <shortcut>⌘↵</shortcut> / <shortcut>Ctrl+Enter</shortcut> to create.</step>
</procedure>

The metadata block below the description is four inline rows - each with a pencil to edit, and where shown an **X** to clear:

| Row                    | What you set                                                                            |
|------------------------|-----------------------------------------------------------------------------------------|
| **Required reviewers** | People who must review                                                                  |
| **Optional reviewers** | People invited to review                                                                |
| **Tags**               | Azure DevOps PR labels - pick existing ones, or use the **+** to create a brand-new tag |
| **Work items**         | Linked Azure Boards work items                                                          |

The primary button is a split button: **Create Pull Request**, with **Create Draft Pull Request** on its dropdown.

> With [AI enabled](AI-Features.md), the description composer toolbar gains an AI button (tooltip **Generate title &amp; description with AI**) that drafts the title and description from your branch's commits. If no AI provider is set up yet, clicking it offers to open AI Settings.
> {style="tip"}

## Refresh and background sync

The list updates on its own on a sync schedule, but you can refresh on demand:

- Press <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> or <shortcut>F5</shortcut> while the tool window is focused.
- Or right-click a row → **Refresh List**.

> The polling cadence is the **Refresh every (seconds)** in [](Settings.md) (default 60 s). On cold start the list shows its **last-known cached state** while the first sync runs, so you can act immediately instead of waiting on a spinner.
> {style="note"}

### Mute live updates {id="mute-live-updates"}

An open pull request refreshes on that same cadence, which can shuffle the timeline under you mid-read. The **Notifications** section of the timeline sidebar carries one button that stops it:

| Button                  | Tooltip                                                                                |
|-------------------------|----------------------------------------------------------------------------------------|
| **Mute live updates**   | *This pull request refreshes automatically. Mute to stop live updates while you read.* |
| **Resume live updates** | *Live updates are paused. Resume, or use Refresh to check for new activity.*           |

The bell icon picks up a diagonal slash while muted. The toggle is **per pull request** and only pauses the automatic refresh - an explicit **Refresh** still pulls in new activity while you're paused.

While muted, a subtle **This pull request has updates** banner appears at the top of the timeline when the pull request changes on the server - click **Refresh** to pull the changes in, or resume live updates.

## Switch account or repository

For projects bound to multiple orgs or repos, use the tool-window gear → **Switch Account / Repository…**. The current branch's PR is also shown in the Git branch widget and the status bar - see [](Git-Integration.md).

The list tab is named after the Git repository it's scoped to (`my-service`), and reads **All repositories** only when no Azure DevOps remote could be resolved.
