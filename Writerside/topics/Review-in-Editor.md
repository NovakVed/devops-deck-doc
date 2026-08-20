# Review in Editor

<tldr>
    <p><b>Where</b>: your regular editor, whenever the checked-out branch is the source branch of an open PR.</p>
    <p><b>Comment</b>: the <b>+</b> in the gutter, or <shortcut>⌃⇧M</shortcut> / <shortcut>Ctrl+Shift+M</shortcut>.</p>
    <p><b>Toggle</b>: <b>Review Mode</b> in the main-toolbar branch widget's popup.</p>
</tldr>

Read and comment on a PR's changes inside your regular code editor - no diff viewer required. When the branch you have
checked out matches a PR's source branch, the editor itself becomes the review surface.

## When it activates

Review-in-editor turns on automatically when **both** are true:

- Your project has an Azure DevOps remote.
- Your checked-out branch matches the **source branch** of an open PR.

The **Git branch widget in the main toolbar** then shows the PR - e.g. `!1234 on feature/login` - and the editor gains
the review affordances below.

![A PR under review directly in the editor](review-in-editor.png){ width="720" border-effect="line" thumbnail="true" }

## What you see in the editor

Every file with changes in the PR gets:

<deflist>
    <def title="A blue line in the gutter">
        Marks each changed range.
    </def>
    <def title="A + on hover">
        Appears in the gutter - click to comment on that line, or drag across line numbers for a multi-line range.
    </def>
    <def title="A subtle highlight on commented lines">
        Lines that already have a thread are tinted, with the <b>thread inlays</b> anchored there. Click a thread
        header to expand or collapse it.
    </def>
    <def title="A Review: toolbar">
        Sits above the editor, with <b>Prev Comment</b> / <b>Next Comment</b> to jump between threads in the file.
    </def>
</deflist>

Threads anchor to the **PR's** line numbers. If you edit the file locally, the plugin tracks the change and keeps each
thread on the right line.

## Comment and review

<procedure title="Add a comment from the editor">
    <step>Click the <b>+</b> in the gutter (or press <shortcut>⌃⇧M</shortcut> / <shortcut>Ctrl+Shift+M</shortcut> at the caret).</step>
    <step>Type your comment - full Markdown, with the same toolbar, @mentions, suggestions, and image paste as everywhere else.</step>
    <step>Post it immediately, queue it as part of a pending review, or wrap it as a suggested change.</step>
</procedure>

Comments posted from the editor and from the diff viewer are the same comments - both surfaces show the full thread. To
finish a review and vote, use the **Submit (N)** button (it carries the count of any queued comments). You can also
**Mark File as Viewed** (<shortcut>⌘⇧S</shortcut> / <shortcut>Ctrl+Shift+S</shortcut>) here, and viewed files dim in the
changes tree.

## Turn it on or off

You can switch the review overlay off - and back on - at any time, without leaving the branch. Click the **Git branch
widget in the main toolbar** (the one showing `!1234 on feature/login`) and toggle **Review Mode** in its popup:

| Popup action                             | What it does                                                  |
|------------------------------------------|---------------------------------------------------------------|
| **Review Mode**                          | Turn the in-editor review overlay off or back on.             |
| **Show Pull Request in the Tool Window** | Open the PR's detail view.                                    |
| **Update to Enable Review Mode…**        | Appears when your local branch has diverged from the PR head. |

> Don't confuse the two widgets: the **main-toolbar** branch widget shows `!{id} on {branch}` and hosts these actions; a
> separate **status-bar** widget shows `ADO PR !{id}` and simply opens the PR when clicked.
> See [](Git-Integration.md).
> {style="note"}

## Auto-off on branch divergence {collapsible="true"}

If your local branch drifts from the PR's head - typically because you committed locally and haven't pushed -
review-in-editor turns itself off, since it would otherwise anchor threads to stale lines. It re-enables as soon as you
push or reset to the PR head.

## Editor vs diff viewer

Review-in-editor is **additive**, not a replacement. Open the PR's full diff anytime from the changes tree in the detail
view. Use whichever fits the moment:

| Surface         | Best for                                                                        |
|-----------------|---------------------------------------------------------------------------------|
| **Editor**      | Reading code in context, with imports, highlighting, and your usual navigation. |
| **Diff viewer** | Side-by-side comparison and seeing every changed file at once.                  |

Comments stay in sync between the two.
