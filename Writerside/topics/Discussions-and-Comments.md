# Discussions & Comments

<tldr>
    <p><b>Where</b>: the reply box on any thread - inline in the diff, in the timeline, or in the editor overlay.</p>
    <p><b>Walk unresolved threads</b>: <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut>, plus the <a anchor="review-bar">review bar</a> filter chips.</p>
</tldr>

Have full conversations in pull requests without leaving the IDE: a Markdown editor, @mentions, work-item and PR
references, suggested edits, image attachments, AI grammar polish, and thread resolution.

## Where threads appear

The same threads show up in three places:

<deflist>
    <def title="Inline in the diff">
        Anchored to the line they reference. See <a href="Code-Review.md"/>.
    </def>
    <def title="The timeline">
        A chronological view of every thread and PR event. Open it from the <b>View Timeline</b> link in the PR detail
        view. (Use <b>Find in timeline</b> to search it.)
    </def>
    <def title="In the editor">
        Overlaid on your normal editor when the PR's branch is checked out. See
        <a href="Review-in-Editor.md"/>.
    </def>
</deflist>

## The comment editor

Every comment editor - timeline, diff inlay, inline edit, and the Create-PR description - is the same composer. A
**Write | Preview** tab strip sits at the top-left, the formatting toolbar runs along the same top strip (with **Polish
grammar &amp; spelling with AI** at its far right), and the bottom row carries **Markdown is supported** and **Add
files**, left of the submit buttons.

![The comment composer: tabs, formatting toolbar, and submit buttons](comment-editor.png){ width="640" border-effect="line" }

| Group          | Buttons                                                                     |
|----------------|-----------------------------------------------------------------------------|
| **References** | Mention user (`@`), Reference work item (`#`), Reference pull request (`!`) |
| **Formatting** | Heading, Bold, Italic, Inline code, Link                                    |
| **Lists**      | Bulleted, Numbered, Task list                                               |
| **AI**         | **Polish grammar &amp; spelling with AI**                                   |

In the diff/editor inlays you also get **Insert code suggestion**. Keyboard: <shortcut>⌘B</shortcut> bold, <shortcut>
⌘I</shortcut> italic, <shortcut>⌘E</shortcut> inline code, <shortcut>⌘K</shortcut> link, <shortcut>⌘↵</shortcut> submit
(or <shortcut>Ctrl</shortcut> equivalents).

Click **Preview** to swap the editor for a rendered view of your Markdown - the same rendering a posted comment uses, so
what you preview matches what you'll post. The formatting toolbar hides while Preview is showing; click **Write** to
return to editing. An empty draft previews as *Nothing to preview*.

**Markdown is supported** on the bottom row is a link: it opens Microsoft's Azure DevOps Markdown guidance in your
browser. For what actually renders here - task lists, emoji, sized images, highlighted code fences, and what Azure
DevOps keeps for wikis - see [](Markdown.md).

> **Polish grammar &amp; spelling with AI** rewrites your draft (or selection) in place as one undoable edit. It needs
> an [AI provider configured](AI-Features.md); when AI is off, the button is hidden.
> {style="tip"}

## @mentions

Click **Mention user** or type `@` to open an autocomplete of people in your organization. Pick one with the arrow keys
and <shortcut>Enter</shortcut>; mentioned users get an Azure DevOps notification.

Click an existing `@mention` to open a small **author card** with the person's avatar and name. When their email is
known (the PR author or a reviewer), the card offers **Copy email** and **Send email**.

> @-mention autocomplete needs the **Identity (Read)** scope (PAT) or **Full access** (OAuth).
> See [](Authentication.md).
> {style="note"}

## Work-item references {id="work-items"}

Click **Reference work item** or type `#` to open an autocomplete of work items — the 50 you most recently touched, or
the results of up to five keywords matching a type, ID, or title. Picking one inserts `#<id>` (for example `#1234`).

A posted `#1234` renders as a link that opens the work item in **Azure Boards in your browser** — there is no in-IDE
work-item view, so unlike an `@mention` it pops no card, and unlike a `!567` PR reference it doesn't open in the IDE.
Watch out for one collision: at the start of a line, `#` followed by digits is a reference rather than a heading. See
[](Markdown.md#hash).

> A reference is not an association. The **Work items** row in the [sidebar](#the-timeline-sidebar) — **+** to link, right-click to
> unlink — is what creates the link Azure Boards tracks and shows on the work item itself. Typing `#1234` into a comment
> or a description gives you a clickable reference and nothing more.
> {style="note"}

## Images and attachments {id="images-and-attachments"}

Three ways to attach an image:

- **Add files** - click the **Add files** link on the bottom row (left of the submit buttons) to pick image files from
  disk.
- **Paste** an image from the clipboard (<shortcut>⌘V</shortcut> / <shortcut>Ctrl+V</shortcut>).
- **Drag &amp; drop** image files onto the editor.

Supported types are `png`, `jpg`, `jpeg`, `gif`, `webp`, `bmp`, and `svg`. Each upload shows an *Uploading…*
placeholder, then becomes an inline Markdown image. Right-click a posted image for **Copy Image Link** or **Download
Image…**.

**Click** a posted image to open it in a zoomable viewer with **Fit to Window**, **Actual Size**, **Zoom In**, **Zoom
Out**, **Save Image…**, **Copy Image**, and **Open in Browser**. Its in-view keys are <shortcut>F</shortcut>
fit, <shortcut>1</shortcut> actual size, and <shortcut>+</shortcut> / <shortcut>-</shortcut> to zoom.

> Fenced code blocks in comments are rendered with **real IDE syntax highlighting** - tag the fence with a language
> (` ```kotlin `, ` ```csharp `, ` ```dockerfile `, …) and the block is colored the way that file type would be in the
> editor.
> {style="tip"}

## Suggested edits {id="suggested-edits"}

To propose a concrete change instead of describing it, use a **suggestion**. In a diff/editor inlay, click **Insert code
suggestion** (it pre-fills the commented line) or type a ```` ```suggestion ```` block.

![A suggestion block in the composer, pre-filled with the commented lines](suggested-edit.png){ width="640" border-effect="line" }

The thread renders a **Suggested change** card with **Apply Locally** (and **Commit…** to apply and commit in one step).
Apply is disabled until the PR branch is checked out, and on resolved threads.

![The Suggested change card on a thread, with Apply Locally and Commit…](suggestion-block.png){ width="640" border-effect="line" }

## Reply, resolve, and manage threads

Every thread carries its own reply box and a **Resolve** button - in the diff and in the timeline alike.

![An inline thread with its reply composer open](reply-to-thread.png){ width="720" border-effect="line" thumbnail="true" }

- **Reply** - add a follow-up. Azure DevOps threads are flat; your reply lands at the end of the thread.
- **Resolve / Reopen** - close a thread when it's done, or reopen it. Resolved threads are de-emphasized and hidden when
  the diff filter is set to *Show only unresolved*.
- **👍 Thumbs up** - a like button on the reactions row below the comment body (shared with **Reply** / **Resolve** on
  review threads). It shows a count once there's at least one like and turns gold when you've liked; its tooltip toggles
  between **Thumbs up** and **Remove thumbs up**.
- **More actions (⋯)** - the overflow menu in the comment header. While the menu is open, each action answers to a
  single key:

| Action            | Key                    | Shown on          | What it does                                                     |
|-------------------|------------------------|-------------------|------------------------------------------------------------------|
| **Copy link**     | <shortcut>L</shortcut> | Any comment       | Copies a link to the comment.                                    |
| **Copy Markdown** | <shortcut>M</shortcut> | Any comment       | Copies the comment's Markdown source.                            |
| **Quote reply**   | <shortcut>Q</shortcut> | Any comment       | Inserts it as a `>` block quote into this thread's reply editor. |
| **Edit**          | <shortcut>E</shortcut> | Your own comments | Edits the comment in place.                                      |
| **Delete**        | <shortcut>D</shortcut> | Your own comments | Deletes the comment.                                             |

### Thread status {collapsible="true"}

Beyond resolved/unresolved, a thread carries a status chip. Click it (**Change status**) to switch between:

| Status        | Meaning                                      |
|---------------|----------------------------------------------|
| **Active**    | A new thread (no chip shown).                |
| **Pending**   | Awaiting the author's change.                |
| **Resolved**  | Change applied.                              |
| **Won't fix** | Acknowledged, but the change isn't going in. |
| **Closed**    | Discussion done, no action.                  |

### Thread context

A thread shows a few lines of code around the commented lines. Set how many with **Lines shown above a comment**
and **Lines shown below a comment** in [](Settings.md) - 3 and 3 by default.

## Navigate a long conversation {id="review-bar"}

Above the conversation sits a **review bar** - the timeline's control strip. On the left it counts the discussion
(`N conversations · M unresolved`); on the right it carries filter chips:

| Chip                  | What it does                                                                                                                                                                                    |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **All events**        | A dropdown that narrows the timeline to one kind of event - comments, commits and updates, votes, state changes, reviewers, or system events. *All events* is the default and shows everything. |
| **Mine**              | Show only threads you're in.                                                                                                                                                                    |
| **Needs my reply**    | Open threads where the ball's in your court.                                                                                                                                                    |
| **Participants**      | Filter by who started the thread - a live multi-select people picker. The chip relabels itself to *Participants: &lt;name&gt; +N* once you pick.                                                |
| **Collapse resolved** | Fold resolved threads to one line each. Remembered between sessions, and the same thing <shortcut>H</shortcut> toggles.                                                                         |
| **?**                 | The keyboard cheat sheet.                                                                                                                                                                       |

Two more affordances help you work through what's left:

- A floating **unresolved navigator** sits over the timeline: chevrons plus an `N of M` counter, reading *No unresolved*
  once you're clean. It's the mouse twin of <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut>.
- The scrollbar lane carries a **tick per unresolved thread**, like the IDE's own error stripe. Click a tick to jump
  straight to that thread.

## The timeline sidebar {id="the-timeline-sidebar"}

The right-hand sidebar is where a PR's metadata lives - and, unlike the Create form, it's editable for the whole life of
the pull request.

| Section           | What you can do                                                                                                                                                                                                                                                                                           |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Reviewers**     | **Required** and **Optional** subgroups, each with a **+** to add someone. A row's overflow menu offers **Make optional** / **Make required** and **Remove**. Reviewers added by a branch policy carry a policy icon and the tooltip *Reviewers were added by policy*. An empty group reads *No reviews*. |
| **Tags**          | **+** to add a tag; right-click one to remove it.                                                                                                                                                                                                                                                         |
| **Work items**    | **+** to link a work item.                                                                                                                                                                                                                                                                                |
| **AI review**     | Whether the last AI pass is still current - see [](AI-Features.md).                                                                                                                                                                                                                            |
| **Notifications** | **Mute live updates** / **Resume live updates** - see [Pull Requests](Pull-Requests.md#refresh-and-background-sync).                                                                                                                                                                                      |
| **Participants**  | Everyone who acted on the PR - author, voting reviewers, comment authors, and people who liked a comment - deduplicated, author first.                                                                                                                                                                    |

> A team added as a reviewer shows its vote as **Approved via &lt;member&gt;**, naming the person who actually voted on
> the team's behalf.
> {style="note"}

## Timeline events

Alongside comments, the timeline records what happened to the PR: vote changes, reviewers added or removed, work items
linked or unlinked, completed status checks, draft/ready flips, and completion or abandonment.

Two event kinds are worth calling out because they do more than they look like:

- **Commits added.** Each push appends a *N commits added* event listing the new commits with clickable short SHAs.
- **Updates (iterations).** Every update renders as *updated &lt;branch&gt; from &lt;sha&gt; to &lt;sha&gt;* with a
  **Compare changes** link. Clicking it re-scopes the changes tree to just that update - the same iteration review the ⋮
  menu offers as **Review Changes Since…**, reached in one click. See [Code Review](Code-Review.md#compare). The link is
  omitted when the source tip didn't actually move.

### Grouped reviews

When someone leaves several comments in one sitting, the timeline collapses them into a **single review event** - a
header carrying their vote, an optional summary, and collapsible per-file rows - instead of scattering five separate
entries down the page.

![A grouped review in the timeline: one header, then a collapsible row per file](grouped-review.png){ width="720" border-effect="line" thumbnail="true" }

Reviews submitted through the plugin are grouped exactly. Comment batches left elsewhere (the Azure DevOps web UI, for
instance) are grouped when the same author posts them within a couple of minutes of each other, with a nearby vote
folded into the header.

### Outdated comments {collapsible="true"}

When later commits change the lines a comment referred to, the thread gets an **Outdated** chip. The chip is also a
toggle: click it to see *the original diff - the code as it was when this comment was written*, and click again to
return to the current code. Where no snippet can be reconstructed, the thread says *Diff preview isn't available for
this comment*.
