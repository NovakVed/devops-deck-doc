# Code Review

<tldr>
    <p><b>Where</b>: open a PR, then click a file in the <b>changed-files tree</b>.</p>
    <p><b>Comment</b>: the <b>+</b> in the diff gutter, or <shortcut>⌃⇧M</shortcut> / <shortcut>Ctrl+Shift+M</shortcut>.</p>
    <p><b>Submit</b>: the <b>Submit</b> button on the diff's <b>Review:</b> toolbar carries the vote options.</p>
</tldr>

Review pull requests with IntelliJ's native diff viewer: read the changes, leave inline comments and suggestions, vote, and track which files you've seen.

## The detail view

Opening a PR creates a closable editor tab - a **single pane**, no sub-tabs. From top to bottom: the title and `!`-number with a **View Timeline** link, the source → target branches, the status checks (CI, conflicts, required reviewers and their votes), the **changed-files tree**, and the action bar.

![A pull request open in the single-pane detail view, with the changed-files tree, status checks, and action bar](pr-detail-view.png){ width="720" border-effect="line" thumbnail="true" }

- **Changed files** live in the tree - click one to open the diff.
- **Discussion** opens in its own tab via the **View Timeline** link - see [](Discussions-and-Comments.md).
- **Votes and actions** live in the action bar and its overflow menu - see [Pull Requests](Pull-Requests.md#open-and-act-on-a-pr).

## Read the diff

Clicking a file opens the diff in a single tab per PR - clicking another file swaps it in place, so <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut> step through every changed range across the whole PR. The diff tab carries a **Review:** toolbar with **Refresh**, **Submit review**, and **Previous / Next Comment**.

| Navigate                      | macOS                                              | Windows / Linux                                         |
|-------------------------------|----------------------------------------------------|---------------------------------------------------------|
| Next / previous changed range | <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut> | <shortcut>F7</shortcut> / <shortcut>Shift+F7</shortcut> |
| Next / previous comment       | *Review: toolbar*                                  | *Review: toolbar*                                       |

![A changed file open in the diff viewer, with the Review: toolbar above it](review-code.png){ width="720" border-effect="line" thumbnail="true" }

### Images, PDFs, and other binaries {collapsible="true"}

Binary files a PR touches open in the same diff tab, but what renders depends on the type:

- **Images** (`png`, `jpg`, `gif`, …) get the IDE's real side-by-side image diff - both revisions are fetched byte-exact, so nothing is mangled on the way in.
- **PDFs and other opaque binaries** have no diff renderer at all. Instead of the platform's dead *"Cannot show file"* panel, the plugin shows a card - *"This is a binary file - the IDE has no editor that can preview it."* - with an **Open in System Viewer** button that hands the PR's revision to your OS default app (Preview, Acrobat, …), an **Open previous version** link for the base side, and, on PDFs, **Install the PDF Viewer plugin to preview PDFs inside the IDE**. Install that plugin and PDFs render in the IDE, diff tab included. For a file the PR *deletes*, the button reads **Open Previous Version** - there is no head side to show.

Right-clicking the file in the changes tree → **Open Repository Version** does the same thing from the tree: it opens the PR's revision in a normal editor tab, falling back to the system viewer when no installed editor handles the type. It's the only way to actually view a binary the PR touches.

### Show or hide threads

In the diff's gutter right-click menu - directly above **Toggle Diff Aligning Mode** - the **Review Discussions** menu controls which inline threads render: **Show all discussions**, **Show only unresolved**, or **Don't show**.

## Comment on a line

<procedure title="Add an inline comment">
    <step>Hover the gutter of a changed line - a <b>+</b> appears. Click it (or drag across line numbers to span a range). You can also press <shortcut>⌃⇧M</shortcut> / <shortcut>Ctrl+Shift+M</shortcut> at the caret.</step>
    <step>Type your comment. The composer is the same one PR discussions use - a <b>Write</b> / <b>Preview</b> tab strip with the formatting toolbar on top, plus @mentions and image paste. See <a href="Discussions-and-Comments.md"/> for the editor in full.</step>
    <step>Post it from the split submit button. The primary action is <b>Start Review</b>, which queues the comment as part of a pending review; its dropdown holds <b>Add Single Comment</b> (post immediately) and <b>Suggest change</b> (wrap the selection as a suggested change the author can apply).</step>
</procedure>

![A new inline comment and an existing thread side by side in the diff viewer](inline-diff-comment.png){ width="720" border-effect="line" thumbnail="true" }

> **Pending review.** Comments you queue stay as drafts (counted on the **Submit (N)** button) until you submit them together with your vote. Submit from the **Review:** toolbar or the overflow menu's **Submit Pending Comments**.
> {style="note"}

### Copy a link to code {collapsible="true"}

Right-click a line and choose **Copy / Paste Special → Copy Link to Code** to copy the Azure DevOps web deep-link to that code (file, line, and column range), the same link the web UI's **Copy link** produces. With text selected, the item reads **Copy Link to Selected Code** and links the exact character span; with no selection it copies a whole-line link at the caret. The shortcut is <shortcut>⌘⇧L</shortcut> / <shortcut>Ctrl+Shift+L</shortcut>.

It works anywhere in the connected repository, not only while reviewing:

- **In a PR review** - the diff viewer or the review-in-editor surface - the link points into the pull request's **Files** tab.
- **In your normal editor** - any file in the connected repository - the link points at the file on your current branch.

> The item stays hidden for files that aren't in a repository with an Azure DevOps remote, so it never clutters the menu in unrelated projects.
> {style="note"}

## Vote

The action bar's **Approve** button is a split button: its dropdown holds **Approve with suggestions**, **Wait for author**, **Request changes**, and **Reset feedback**.

You don't have to leave the diff to vote - the **Submit** button on the diff's **Review:** toolbar carries the same list, so you can finish a review from the last file you read.

![The vote options on the Submit button in the diff's Review toolbar](vote-dropdown.png){ width="700" border-effect="line" }

Completing or abandoning a PR, including merge strategies, is covered in [Pull Requests](Pull-Requests.md#complete-a-pull-request).

## Track files as viewed

For large PRs, mark each file **viewed** as you go - viewed files dim in the changes tree.

- Press <shortcut>⌘⇧S</shortcut> / <shortcut>Ctrl+Shift+S</shortcut>, or right-click → **Mark File as Viewed**.
- Right-click with several files selected to **Mark All as Viewed**.
- Folders have a checkbox too (revealed on hover): one click marks every file underneath as viewed, and clicking a fully checked folder clears them all. A square (indeterminate) mark means only some of the files inside are viewed.

![Two files ticked as viewed in the changes tree](files-viewed.png){ width="720" border-effect="line" thumbnail="true" }

> Want files to mark themselves viewed as you open them? Turn on **Mark files as viewed when I open their diff** in [](Settings.md) (off by default).
> {style="tip"}

## Review only what changed since an update {id="compare"}

When an author pushes new commits, you don't have to re-read the whole PR. Two separate controls narrow the changes tree, and they scope by different things:

| Control                    | Where it is                                         | What it scopes to                                                                                                                            |
|----------------------------|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **Review Changes Since…**  | The **⋮** (More) menu on the action bar             | Everything that arrived since a chosen **update** - one push to the source branch. Target-branch commits merged in between are filtered out. |
| **Changes from N commits** | The link above the changes tree, in the tool window | One **commit** at a time, shown against its own parent. The up / down arrows beside it step through the PR's commits.                        |

Reach for an **update** to re-review a colleague's latest push, and for a **commit** to read one change on its own. Neither is a filter on the other - picking a commit clears the update scope, and vice versa.

### Scope to an update

<procedure title="Review only the changes since an update">
    <step>
        <p>Open the <b>⋮</b> (More) menu beside the vote button. The action appears once the PR has at least two updates.</p>
        <img src="review-since-update-1.png" alt="The More menu button beside the vote button on the pull request action bar" width="380" border-effect="line"/>
    </step>
    <step>
        <p>Choose <b>Review Changes Since…</b>.</p>
        <img src="review-since-update-2.png" alt="The More menu open with Review Changes Since… selected" width="520" border-effect="line"/>
    </step>
    <step>
        <p>Pick the update to compare against. A ✓ marks the scope you're on, and <b>All changes (N)</b> - pinned above the recent updates - takes you back to the full pull request.</p>
        <img src="review-since-update-3.png" alt="The update picker with a search field, All changes on top, and the recent updates below" width="440" border-effect="line"/>
    </step>
</procedure>

While an update is in scope, a banner - *"Reviewing only what changed since update N"* - sits above the tree; click **Show all changes** to return to the full PR.

### Scope to a single commit

Click **Changes from N commits** above the changes tree and pick a commit: the tree and every diff you open then show that commit alone, against its parent. The **up / down** arrows next to the link walk the PR's commits in order, and stepping back past the first one returns you to the full diff - as does picking **All commits**.

> Comments stay put either way. Narrowing the scope changes which files and lines you see, never which threads exist.
> {style="note"}

## Review in the editor instead

When the PR's source branch is checked out, you can comment on changed lines right in your normal editor - no diff tab needed. See [](Review-in-Editor.md).
