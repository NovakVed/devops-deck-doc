# Find Pull Requests from Code

<tldr>
    <p><b>Where</b>: right-click a line → <b>Open In</b> → <b>Find Pull Request</b>; or right-click the line-number gutter → <a anchor="annotate">Annotate with Pull Requests</a> for the whole file.</p>
</tldr>

Code review answers "should this change land?". Six months later the question is the opposite: **why is this line the
way it is?** %product% answers it from the editor - blame the line, find the pull request that brought it in, and open
that PR's whole discussion without leaving your file.

There are three ways in, all built on the same lookup:

| You want                             | Use                                | Where it lives                         |
|--------------------------------------|------------------------------------|----------------------------------------|
| The PR behind **this one line**      | **Find Pull Request**              | Right-click → **Open In**              |
| Its **URL**, to paste somewhere      | **Copy Pull Request URL for Line** | Right-click → **Copy / Paste Special** |
| The PR behind **every line at once** | **Annotate with Pull Requests**    | Right-click the **line-number gutter** |

> All three are gated by **Find the pull request behind a line of code** in [](Settings.md) (on by default).
> They also stay hidden unless an account is signed in and the file lives in a Git repository with an Azure DevOps
> remote - so they never clutter the menu in unrelated projects. None of them ships with a default keyboard shortcut;
> bind
> your own in [Keymap](Keyboard-Shortcuts.md#rebind).
> {style="note"}

## Find Pull Request

Put the caret on a line, then **right-click → Open In → Find Pull Request**.

What happens next depends on what the lookup finds:

| Result                    | What you get                                                                                                                                                |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **One pull request**      | It opens **in the IDE** straight away - detail view plus timeline. No popup, no browser.                                                                    |
| **Several pull requests** | A popup titled *Pull requests containing &lt;short SHA&gt;* lists them, completed PRs first, newest first. A final row offers **Open commit … in browser**. |
| **No pull request**       | The commit itself opens in your browser - the line predates any PR, or arrived by a direct push.                                                            |

## Copy Pull Request URL for Line

Same lookup, but the result lands on your clipboard instead: **right-click → Copy / Paste Special → Copy Pull Request
URL for Line**. You get `…/pullrequest/<id>` and a *Pull request URL copied* confirmation.

Two deliberate differences from **Find Pull Request**:

- When **no** PR introduced the line you get an error hint (*No pull request introduced this line*) - it does **not**
  silently fall back to the commit page, because you asked for a PR URL and there isn't one.
- The multi-result popup omits the *Open commit in browser* row, for the same reason.

> **Not the same as Copy Link to Code.** *Copy Link to Code* (<shortcut>⌘⇧L</shortcut> / <shortcut>
> Ctrl+Shift+L</shortcut>, in the same **Copy / Paste Special** menu) links **to the code you have selected** - in a PR
> you are reviewing, or in any file of the connected repository. *Copy Pull Request URL for Line* answers the opposite
> question - **which PR** brought this line in - and points at the PR itself, with no line anchor.
> See [](Code-Review.md).
> {style="note"}

## Annotate with Pull Requests {id="annotate"}

The whole-file view. **Right-click the line-number gutter → Annotate with Pull Requests** - the same menu that holds
Git's own *Annotate with Git Blame*, and it works the same way: a column appears beside your line numbers, one entry per
line.

The column shows the **pull request id** - `!1234` - and nothing else. Not the author, not the date, not the SHA. It
answers one question per line, so it stays narrow enough to leave on while you work.

- **Hover** a row for a summary card: state, title, who opened it, the branches, and the reviewers (up to five avatars,
  then `+N`).
- **Click** a row to open that pull request in the IDE.
- Lines whose commit belongs to no pull request are **blank** rather than showing a SHA - blank means "no PR brought
  this in", which is the honest answer.
- When a line's commit belongs to several PRs, the column shows the one that most likely explains the line: completed
  first, newest first.

Toggle it off from the same gutter menu (it carries a checkmark while on).

> **It closes itself when you add or delete a line.** The column is keyed by line number, so an edit that shifts lines
> would leave every row pointing at the wrong pull request. Rather than lie, it switches off - re-enable it when you're
> done editing. Typing *within* a line is fine and leaves it open.
> {style="warning"}

Blaming a whole file is one `git blame` plus a batched lookup, so a progress indicator ("Looking up pull requests for
this file…") runs while it loads. The single-line actions are much cheaper and show no progress UI.

## How the lookup works {id="how-it-works" collapsible="true"}

Worth knowing, because it explains every edge case below:

<procedure title="From caret to pull request">
    <step>The plugin runs <b>git blame</b> on the line, locally, to get the commit that last changed it.</step>
    <step>It asks Azure DevOps which pull requests contain that commit - issuing <b>two</b> queries in one request: one for the commit as a PR <b>source commit</b>, one for it as a PR's <b>merge commit</b>.</step>
    <step>Results are de-duplicated and ordered: completed pull requests first, then by newest.</step>
</procedure>

Asking both ways is what makes this reliable across completion strategies. If the PR was **merged**, blame sees one of
its original commits. If it was **squashed**, those commits never reached the target branch and blame can only see the
squash commit. One query would miss half your history; both catch merge, squash, and rebase alike.

Nothing is cached - every invocation re-blames and re-queries, so the answer always reflects the current file and the
current server state.

## Edge cases and messages {collapsible="true"}

Failures appear as **hints at the caret**, never as balloons or dialogs:

| Message                                                                                         | What it means                                                                                                    |
|-------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| **This line has no committed history yet**                                                      | The line is uncommitted - newly typed, or part of an unstaged change. There is no commit to look up.             |
| **No pull request introduced this line**                                                        | The commit exists but no PR contains it (a direct push, or history older than your PR process). *Copy URL* only. |
| **This file isn't in a repository with an Azure DevOps remote**                                 | The file isn't under a Git repo the plugin recognizes.                                                           |
| **This repository belongs to a different Azure DevOps organization than the connected account** | The remote points at another org - sign in to that one, or switch account.                                       |
| **Connect an Azure DevOps account to look up pull requests**                                    | No account is bound yet. See [](Authentication.md).                                                |
| **Couldn't look up pull requests for this line**                                                | The lookup call failed - usually offline or a transient API error. Retry.                                        |
| **This file has no committed history yet** *(gutter)*                                           | The whole file is untracked or brand new.                                                                        |
| **No pull request introduced any line of this file** *(gutter)*                                 | Every line predates your PR process, or arrived by direct push.                                                  |

> **Blame reads the file on disk.** If you have unsaved edits *above* the caret, the line numbers the plugin blames are
> the saved ones, so it can attribute the wrong line. Save first when the answer looks off.
> {style="warning"}

> These actions are unavailable inside a **diff viewer** by design - a diff shows a virtual file with no local Git
> history to blame. Use them in a normal editor.
> {style="note"}

## The same question, from a commit {id="from-commit"}

Everything above starts from a **line**. When you are looking at a **commit** instead - a row in the Git **Log**, an
entry in **File History**, or the blame column's right-click menu - the same lookup is one menu item away: **Find
Related Pull Requests**, beside **Open Commit in Azure DevOps** and **Copy Azure DevOps Commit Link**.

Three differences from the line actions on this page: the outcome arrives as a notification rather than an editor hint,
no setting gates it, and it can also find a pull request that **hasn't merged yet** - which the line lookup cannot. See
[Commit actions in Git views](Git-Integration.md#commit-actions).

## What's next {id="whats-next"}

> **Next up:** [](Code-Review.md) for reading a PR you've found, or [](Git-Integration.md) for
> how branches map to pull requests.
> {style="tip"}
