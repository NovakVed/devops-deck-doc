# Keyboard Shortcuts

<tldr>
    <p><b>Tool windows</b>: <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut> for Pull Requests, <shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut> for Pipelines.</p>
    <p><b>Rebind</b>: <ui-path>Settings | Keymap</ui-path>, search <code>AzureDevOps</code>. See <a anchor="rebind">How to rebind</a>.</p>
    <p><b>In-view keys</b>: the PR timeline and the Pipelines run editor list theirs with <shortcut>?</shortcut>.</p>
</tldr>

Every shortcut the plugin uses, in one place. There are two kinds:

<deflist>
    <def title="IDE actions">
        Registered with the IDE, shown in their menus, and <b>rebindable</b> in <ui-path>Settings | Keymap</ui-path>.
        Each has an <b>Action ID</b> (most match <code>AzureDevOps</code>; the tool-window ones match their window
        name). See <a anchor="rebind">How to rebind</a>.
    </def>
    <def title="In-view keys">
        Built into a specific view (the comment composer, the PR timeline, the image preview, the Pipelines run editor,
        the statistics views, the tool windows' search field) and active only while that view is focused. They aren't in
        Keymap and can't be rebound.
    </def>
</deflist>

> On macOS, <shortcut>⌘</shortcut> is Command and <shortcut>⌃</shortcut> is **Control** - most actions use ⌘, but a few
> use ⌃. Windows / Linux use <shortcut>Ctrl</shortcut>.
> {style="note"}

## Tool windows

Open (or focus) a plugin tool window from anywhere. These are the IDE's standard **Activate tool window** actions, so
they're rebindable in <ui-path>Settings | Keymap</ui-path> (search the window name).

| Action                        | macOS                    | Windows / Linux                   | Action ID                              |
|-------------------------------|--------------------------|-----------------------------------|----------------------------------------|
| **Pull Requests** tool window | <shortcut>⌘⇧Y</shortcut> | <shortcut>Ctrl+Shift+Y</shortcut> | `ActivatePullRequestsWindowToolWindow` |
| **Pipelines** tool window     | <shortcut>⌘⇧W</shortcut> | *first free - see tooltip*        | `ActivatePipelinesWindowToolWindow`    |

> The **Pipelines** shortcut only does anything once the project has an Azure DevOps remote - that is what makes the
> tool window available. Elsewhere there is no window to open.
> {style="note"}

### Why the Pipelines shortcut differs by platform {id="pipelines-shortcut" collapsible="true"}

On **macOS** the default is <shortcut>⌘⇧W</shortcut> - one of the few ⌘⇧ combos still free on a stock 2026.2 keymap
(modern IntelliJ claims most of them: ⌘⇧J is the Database console, ⌘⇧O is Go to File, ⌘⇧K is Push, …). On **Windows / Linux**
the plugin picks the first free combo instead, so it can differ - **hover the Pipelines stripe icon to see the actual
key**. Already use the default for something else? Rebind Pipelines in <ui-path>Settings | Keymap</ui-path> (search
**Pipelines**).

> The shortcut is seeded **per project** as soon as the plugin loads, and an existing or rebound key is always
> respected - so it works right after installing or updating, no restart needed. A rebind takes effect immediately,
> though the stripe icon's hover tooltip may show the old key until the project is reopened.
> {style="tip"}

### Focus the search field {id="focus-search"}

Both tool windows put a search field above their list. While a tool window is focused,
<shortcut>⌘L</shortcut> / <shortcut>Ctrl+L</shortcut> jumps to that field and selects the current query - the key is
also shown in the field's placeholder text. It's an in-view key (built into the tool window, not in Keymap), so coming
from the editor press the window's activation shortcut first - e.g. <shortcut>⌘⇧Y</shortcut>,
then <shortcut>⌘L</shortcut>.

## In the editor (review-in-editor)

| Action                 | macOS                    | Windows / Linux                   | Action ID                                    |
|------------------------|--------------------------|-----------------------------------|----------------------------------------------|
| **Add Review Comment** | <shortcut>⌃⇧M</shortcut> | <shortcut>Ctrl+Shift+M</shortcut> | `AzureDevOps.PullRequest.AddCommentAtCursor` |
| **Copy Link to Code**  | <shortcut>⌘⇧L</shortcut> | <shortcut>Ctrl+Shift+L</shortcut> | `AzureDevOps.PullRequest.CopyCodeLink`       |

**Add Review Comment** only fires when the caret is on a changed line of a file in an open PR -
see [](Review-in-Editor.md). **Copy Link to Code** (right-click → **Copy / Paste Special**) also works
outside a review, in any file of the connected repository - see [](Code-Review.md).

## In the editor (any file)

The [](Find-Pull-Requests-From-Code.md) actions ship without default shortcuts - bind your
own via [Keymap](#rebind):

| Action                             | Where it lives                         | Action ID                                          |
|------------------------------------|----------------------------------------|----------------------------------------------------|
| **Find Pull Request**              | Right-click → **Open In**              | `AzureDevOps.PullRequest.FindForLine`              |
| **Copy Pull Request URL for Line** | Right-click → **Copy / Paste Special** | `AzureDevOps.PullRequest.CopyUrlForLine`           |
| **Annotate with Pull Requests**    | Right-click the **line-number gutter** | `AzureDevOps.PullRequest.AnnotateWithPullRequests` |

## In the diff viewer

| Action                        | macOS                                              | Windows / Linux                                         | Action ID                                    |
|-------------------------------|----------------------------------------------------|---------------------------------------------------------|----------------------------------------------|
| **Mark File as Viewed**       | <shortcut>⌘⇧S</shortcut>                           | <shortcut>Ctrl+Shift+S</shortcut>                       | `AzureDevOps.PullRequest.MarkFileAsViewed`   |
| **Add Review Comment**        | <shortcut>⌃⇧M</shortcut>                           | <shortcut>Ctrl+Shift+M</shortcut>                       | `AzureDevOps.PullRequest.AddCommentAtCursor` |
| **Copy Link to Code**         | <shortcut>⌘⇧L</shortcut>                           | <shortcut>Ctrl+Shift+L</shortcut>                       | `AzureDevOps.PullRequest.CopyCodeLink`       |
| Next / previous changed range | <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut> | <shortcut>F7</shortcut> / <shortcut>Shift+F7</shortcut> | *built-in IntelliJ diff*                     |
| **Next / previous comment**   | <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut> | <shortcut>F8</shortcut> / <shortcut>Shift+F8</shortcut> | *in-view keys*                               |

> <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut> walk **human threads, your pending drafts, and AI suggestions** in one top-to-bottom reading order. There are deliberately no <shortcut>J</shortcut>/<shortcut>K</shortcut> aliases in the diff - those stay free for IdeaVim motion. While an **AI suggestion card** has focus, <shortcut>A</shortcut> adds it to your review and <shortcut>D</shortcut> discards it.
> {style="tip"}

## In the comment composer

These work while a comment, reply, or PR-description editor is focused. They're built into the composer (not in Keymap),
so they're identical on every platform apart from the modifier key.

| Action                              | macOS                    | Windows / Linux                   |
|-------------------------------------|--------------------------|-----------------------------------|
| **Bold**                            | <shortcut>⌘B</shortcut>  | <shortcut>Ctrl+B</shortcut>       |
| **Italic**                          | <shortcut>⌘I</shortcut>  | <shortcut>Ctrl+I</shortcut>       |
| **Inline code**                     | <shortcut>⌘E</shortcut>  | <shortcut>Ctrl+E</shortcut>       |
| **Insert link**                     | <shortcut>⌘K</shortcut>  | <shortcut>Ctrl+K</shortcut>       |
| **Mention user** (`@`)              | <shortcut>⇧⌘M</shortcut> | <shortcut>Ctrl+Shift+M</shortcut> |
| **Bulleted list**                   | <shortcut>⇧⌘8</shortcut> | <shortcut>Ctrl+Shift+8</shortcut> |
| **Numbered list**                   | <shortcut>⇧⌘7</shortcut> | <shortcut>Ctrl+Shift+7</shortcut> |
| **Task list**                       | <shortcut>⇧⌘9</shortcut> | <shortcut>Ctrl+Shift+9</shortcut> |
| **Paste image**                     | <shortcut>⌘V</shortcut>  | <shortcut>Ctrl+V</shortcut>       |
| **Submit** (Comment / Reply / Save) | <shortcut>⌘↵</shortcut>  | <shortcut>Ctrl+Enter</shortcut>   |
| **Cancel / close editor**           | <shortcut>⎋</shortcut>   | <shortcut>Esc</shortcut>          |

> Two similar shortcuts, different jobs: **Mention user** (<shortcut>⇧⌘M</shortcut>) inserts an `@mention` *inside* a
> composer, while **Add Review Comment** (<shortcut>⌃⇧M</shortcut>) *starts* a new comment at the caret in the editor or
> diff.
> {style="note"}

## In the image preview {id="image-preview" collapsible="true"}

Clicking a posted image in a comment opens it in a zoomable viewer. Its keys are built into the dialog, so they're the
same on every platform.

| Action                  | Shortcut                                          |
|-------------------------|---------------------------------------------------|
| **Fit to window**       | <shortcut>F</shortcut> / <shortcut>0</shortcut>   |
| **Actual size** (100 %) | <shortcut>1</shortcut>                            |
| **Zoom in / out**       | <shortcut>+</shortcut> / <shortcut>-</shortcut>   |
| **Pan the image**       | arrow keys                                        |
| **Close**               | <shortcut>⎋</shortcut> / <shortcut>Esc</shortcut> |

> With the mouse: <shortcut>⌘</shortcut> / <shortcut>Ctrl</shortcut> + wheel zooms toward the pointer, a plain wheel
> scrolls, and dragging pans. See [Discussions &amp; Comments](Discussions-and-Comments.md#images-and-attachments).
> {style="tip"}

## In the PR list, timeline, and detail view

![The Pull Requests tool window with its keyboard shortcuts](pr-tool-window-shortcuts.png){ width="720" border-effect="line" thumbnail="true" }

| Action                                   | Shortcut                                                                        | Action ID                                     |
|------------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------|
| **Refresh List**                         | <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> | `AzureDevOps.PullRequest.List.Reload`         |
| **Refresh Timeline**                     | <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> | `AzureDevOps.PullRequest.Timeline.Update`     |
| **Refresh Pull Request**                 | <shortcut>F5</shortcut>                                                         | `AzureDevOps.PullRequest.Details.Reload`      |
| **View Pull Request**                    | <shortcut>Enter ↵</shortcut> / double-click *(in the list)*                     | `AzureDevOps.PullRequest.Show`                |
| **View Pull Request in Browser**         | *no default*                                                                    | `AzureDevOps.PullRequest.Open.Link`           |
| **Copy Pull Request URL**                | *no default*                                                                    | `AzureDevOps.PullRequest.Copy.Link`           |
| **Show Pull Request in the Tool Window** | *no default*                                                                    | `AzureDevOps.Pull.Request.Show.In.Toolwindow` |

> The Pull Requests tool window has no Reload button - refresh is keyboard-only (or right-click → **Refresh List**).
> {style="note"}

## In the Statistics views

The **PR Statistics** and **Pipelines Analytics** editor tabs have no Refresh button either. While one is focused,
<shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> re-fetches its numbers, and
right-click → **Refresh Statistics** does the same. These are in-view keys (built into the view, not in Keymap) -
the refresh shortcut always refreshes the view that has focus, so the same keys reload the PR list, the Pipelines
lists, a statistics tab, or the PR timeline depending on where you are.

## In the PR timeline

These keys drive the **View Timeline** editor and fire while it's focused. Like the composer keys they're built in (not
in Keymap). Press <shortcut>?</shortcut> any time for the same list.

| Action                                  | Shortcut                                              |
|-----------------------------------------|-------------------------------------------------------|
| **Next unresolved thread**              | <shortcut>F8</shortcut> / <shortcut>J</shortcut>      |
| **Previous unresolved thread**          | <shortcut>⇧F8</shortcut> / <shortcut>K</shortcut>     |
| **Resolve / reopen** the focused thread | <shortcut>R</shortcut>                                |
| **Reply** to the focused thread         | <shortcut>A</shortcut>                                |
| **Start a new comment**                 | <shortcut>C</shortcut>                                |
| **Collapse / show resolved** threads    | <shortcut>H</shortcut>                                |
| **View AI review comments**             | <shortcut>I</shortcut>                                |
| **Find in timeline**                    | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> |
| **Show this list**                      | <shortcut>?</shortcut>                                |

> **View AI review comments** (<shortcut>I</shortcut>) jumps into the diff at the first AI suggestion - AI review
> comments render as diff inlays, and the inlay's own arrows step through the rest. It needs an AI review to have run
> first. See [](AI-Features.md).
> {style="tip"}

## In the Pipelines run editor

The run overview (opened from the **Pipelines** tool window) has its own keys, shown any time
with <shortcut>?</shortcut> or the **?** button on the stage-graph toolbar. Built in, not in Keymap.

| Action                                  | Shortcut                                                                 |
|-----------------------------------------|--------------------------------------------------------------------------|
| **View logs / back** to the stage graph | <shortcut>L</shortcut>                                                   |
| **Previous / next tab**                 | <shortcut>[</shortcut> / <shortcut>]</shortcut>                          |
| **Zoom in / out / fit** the stage graph | <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut> |
| **Open this run in the browser**        | <shortcut>B</shortcut>                                                   |
| **Filter tests** (Tests tab)            | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>                    |
| **Show this list**                      | <shortcut>?</shortcut>                                                   |

> Inside a job's **logs**, <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> opens the log search bar instead (find
> across all steps).
> {style="note"}

## Branch widget / VCS menu

| Action                            | Shortcut                                                     | Action ID                                          |
|-----------------------------------|--------------------------------------------------------------|----------------------------------------------------|
| **Open Current Branch PR**        | *no default*                                                 | `AzureDevOps.OpenCurrentBranchPr`                  |
| **Update to Enable Review Mode…** | *no default*                                                 | `AzureDevOps.Pull.Request.Branch.Update`           |
| **Review Mode**                   | *no default*                                                 | `AzureDevOps.Pull.Request.Review.In.Editor.Toggle` |
| **Go to Pull Requests…**          | <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut> | `AzureDevOps.PullRequest.GoTo`                     |
| **Go to Pipeline…**               | <shortcut>⌥⇧P</shortcut> / <shortcut>Alt+Shift+P</shortcut>  | `AzureDevOps.Pipelines.GoTo`                       |
| **Open Commit in Azure DevOps**   | *no default*                                                 | `AzureDevOps.Commit.OpenInBrowser`                 |
| **Copy Azure DevOps Commit Link** | *no default*                                                 | `AzureDevOps.Commit.CopyLink`                      |
| **Find Related Pull Requests**    | *no default*                                                 | `AzureDevOps.Commit.FindPullRequests`              |

> By default both **Go to** actions open the plugin's own quick-pick dialog - one window with a **Pull Requests** tab
> and a **Pipelines** tab, landing on the tab matching the shortcut. Turn on **Show Go to Pull Requests and Go to
> Pipeline in Search Everywhere** on the [Navigation settings page](Settings.md#page-navigation) and they open the
> IDE's *Search Everywhere* instead, where the same tabs also appear after a double **Shift**
> (<shortcut>⇧⇧</shortcut>). See [Pull Requests](Pull-Requests.md#jump-to-a-specific-pr).
> {style="tip"}

## AI actions

| Action                              | Shortcut     | Action ID                              |
|-------------------------------------|--------------|----------------------------------------|
| **Summarize Pull Request**          | *no default* | `AzureDevOps.PullRequest.AI.Summarize` |
| **Run AI Review**                   | *no default* | `AzureDevOps.PullRequest.AI.Review`    |
| **Explain This File**               | *no default* | `AzureDevOps.PullRequest.AI.Explain`   |
| **Generate Commit Message with AI** | *no default* | `AzureDevOps.AI.GenerateCommitMessage` |
| **Analyze Logs with AI**            | *no default* | `AzureDevOps.Pipelines.AI.AnalyzeLogs` |

These need an AI provider configured - see [](AI-Features.md).

## How to rebind {id="rebind"}

Only the **IDE actions** above (the ones with an Action ID) can be rebound - the **in-view keys** (the comment composer,
the PR timeline, the image preview, the Pipelines run editor, the statistics views, and the tool windows' search field)
are fixed.

<procedure title="Bind a shortcut">
    <step>Open <ui-path>Settings | Keymap</ui-path>.</step>
    <step>Type <code>AzureDevOps</code> in the search box to filter to the plugin's actions (it matches action IDs as well as display names).</step>
    <step>Double-click an action → <b>Add Keyboard Shortcut</b>.</step>
    <step>Press the combination. If it collides, IntelliJ warns you and offers to remove the conflict.</step>
    <step>Click <b>OK</b>.</step>
</procedure>

> The two **tool-window** shortcuts are IDE actions too, but their IDs (`ActivatePullRequestsWindowToolWindow` /
> `ActivatePipelinesWindowToolWindow`) don't contain `AzureDevOps` - search **Pull Requests** or **Pipelines** to find and
> rebind them.
> {style="note"}

> Use the **action ID** column when filing a bug - it identifies the exact action across IDE versions where display
> names sometimes differ.
> {style="tip"}
