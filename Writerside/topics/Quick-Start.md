# Quick Start

From zero to your first PR review in about a minute. This page assumes you've already [installed](Installation.md) the
plugin.

## 1. Open a project hosted on Azure DevOps

If the repository is already on your machine, just open the folder and skip to step 2.

Otherwise, clone it **from inside the IDE** - the plugin adds an **Azure DevOps** entry to the IDE's own clone dialog, so
you pick from a list instead of hunting down a URL first:

<procedure title="Clone from inside the IDE">
    <step>On the Welcome screen choose <b>Clone Repository</b>. With a project already open, use <b>File | New | Project from Version Control…</b> instead.</step>
    <step>Pick <b>Azure DevOps</b> in the list on the left. Your signed-in accounts are named underneath it - or <b>No accounts</b> if you haven't signed in yet.</step>
    <step>Not signed in? Do it right here: <b>Log In via Microsoft…</b> or <b>Log In with Token…</b>. The panel switches to the repository list by itself once the account is added, so you never have to reopen the dialog.</step>
    <step>Pick the repository. The list covers <b>every project in the organization</b> at once, flattened to <code>project/repository</code> - type in the search field to narrow it. With more than one account signed in, an account dropdown appears above the search field.</step>
    <step>Check the <b>Directory</b> field - it follows the repository name until you edit it by hand - then click <b>Clone</b>.</step>
</procedure>

> Prefer the command line? `git clone https://dev.azure.com/your-org/your-project/_git/your-repo` works just as well -
> open the folder afterward and the plugin picks it up. See [Git Integration](Git-Integration.md#clone-a-repository)
> for the full clone reference, including what each repository-list message means.
> {style="tip"}

Either way, the plugin scans Git remotes on startup - when it sees an Azure DevOps remote (`dev.azure.com`,
`*.visualstudio.com`, or your on-prem Azure DevOps Server) it activates and shows the **Pull Requests** tool window.

> **Don't see the tool window?** The plugin hides itself when no Azure DevOps remote is detected. Run `git remote -v` to
> confirm a remote URL points at `dev.azure.com`, `visualstudio.com`, or your Azure DevOps Server.
> {style="note"}

## 2. Sign in

Open the Pull Requests tool window from the left sidebar. On its sign-in screen you have two options:

<tabs>
    <tab title="Log In with Token…">
        <p>Paste a Personal Access Token from your Azure DevOps user settings. The fastest path, and the only option for
        on-prem Azure DevOps Server.</p>
        <p>The plugin needs these scopes: <b>Code (Read &amp; write + Status), User Profile (Read), Identity (Read),
        Work Items (Read), Project and Team (Read), Security (Manage)</b>. The login dialog lists them, and its
        <b>Generate…</b> button opens your org's token page in the browser.</p>
        <img src="sign-in-with-token.png" alt="The Log In to Azure DevOps dialog with the Server and Token fields" width="560" border-effect="line"/>
    </tab>
    <tab title="Log In via Microsoft…">
        <p>A browser-based OAuth sign-in via Microsoft Entra ID (cloud <code>dev.azure.com</code> only). A dialog first
        asks whether to grant <b>Full access</b> or <b>Standard access</b>.</p>
        <img src="sign-in-with-microsoft.png" alt="The Sign in with Microsoft permission picker, showing Full access (recommended) and Standard access" width="560" border-effect="line"/>
    </tab>
</tabs>

> See [](Authentication.md) for the full sign-in flow, scopes, and the Full vs Standard tier choice.
> {style="note"}

## 3. Browse pull requests

After signing in, the tool window lists the repository's pull requests.

![The Pull Requests tool window with the search field, filter chips, and a populated list](pr-tool-window.png){ width="720" border-effect="line" thumbnail="true" }

To narrow the list:

| Control           | Where                             | What it offers                                                                                                                               |
|-------------------|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **Quick Filters** | Filter icon, left of the chip row | One-click presets: **Active**, **Includes my changes**, **I am a reviewer**, **Waiting for author**, **I reviewed**, **Awaiting my review**, **Abandoned**. |
| **Filter chips**  | The chip row                      | **State** (Mine / Active / Completed / Abandoned), **Author**, **Assignee**, **Target branch**, **Tags**, and **Draft**. More dimensions - **Review**, **Work Items**, **Approved by**, **Source branch** - filter from the search field's typed tokens. |
| **Sort**          | The last chip                     | Newest, Oldest, Most/Least commented, Recently/Least recently updated, or Id newest/oldest first.                                            |
| **Search**        | The field above the chips         | Matches PR titles, numbers, authors, and branch names.                                                                                       |

**Click** any PR to open its detail view in an editor tab.

### No pull requests showing up? {collapsible="true"}

| Likely cause                        | What to do                                                               |
|-------------------------------------|--------------------------------------------------------------------------|
| Your account can't access this repo | Open it in the Azure DevOps web UI first.                                |
| The project points at multiple orgs | Switch via the tool-window gear → **Switch Account / Repository…**       |
| There genuinely are no active PRs   | Set the **State** chip to **Completed** to confirm the connection works. |

## 4. Review the code

The detail view is a **single pane** - no sub-tabs. From top to bottom: the title with `!`-number and a **View
Timeline** link, the source → target branches, the status checks with each reviewer's vote, the changed-files tree, and
an action bar.

![Reviewing a pull request: the tool window, the timeline, and the reviewers sidebar](review-code.png){ width="720" border-effect="line" thumbnail="true" }

<deflist>
    <def title="Read the diff">
        Click any file in the changes tree to open the diff. Click a line's gutter to comment.
    </def>
    <def title="Read discussion">
        Click <b>View Timeline</b> to open the full comment timeline in its own tab.
    </def>
    <def title="Vote">
        The action bar's <b>Approve</b> button is a split button. Its dropdown holds <b>Approve with suggestions</b>,
        <b>Wait for author</b>, <b>Request changes</b>, and <b>Reset feedback</b>.
    </def>
</deflist>

![The vote options on the Submit button in the diff's Review toolbar](vote-dropdown.png){ width="700" border-effect="line" }

> **Review without leaving the editor:** check out a PR's branch and the plugin overlays its comments right on your
> normal editor. See [](Review-in-Editor.md).
> {style="tip"}

## 5. Create a pull request

<procedure title="Create a pull request">
    <step>
        <p>On the <b>Pull Requests</b> tool-window toolbar, click <b>+</b> (<b>Create Pull Request</b>).</p>
        <img src="create-pr-button.png" alt="The + (Create Pull Request) button in the Pull Requests tool-window toolbar, hovered to show its tooltip" width="590" border-effect="line"/>
    </step>
    <step>Check the pre-filled branches - the form fills in the source branch (your current branch) and the default target branch.</step>
    <step>Add a title, description, and reviewers, then create it.</step>
</procedure>

![The Create Pull Request form: source and target branches, the changed-files tree, the Write/Preview description composer, and the reviewers, tags, and work-item rows](create-pr-ai.png){ width="640" border-effect="line" }

> **AI-assisted titles &amp; descriptions:** with an [AI provider configured](AI-Features.md), the form's title and
> description fields gain a **Generate** action that drafts both from your branch's diff.
> {style="tip"}

## Where to go next

- [](Pull-Requests.md) - filtering, search, the action bar, and the overflow menu (Complete, Revert,
  Compare).
- [](Code-Review.md) - inline diffs, suggestions, voting, and file-viewed tracking.
- [](Notifications-and-Attention.md) - get pinged when a PR needs your review or @mentions
  you.
- [](AI-Features.md) - summaries, AI review, and grammar polish.
