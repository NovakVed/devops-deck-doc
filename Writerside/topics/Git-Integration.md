# Git Integration

<tldr>
    <p><b>Where</b>: the IDE's Clone dialog, the main-toolbar and status-bar branch widgets, and any in-IDE <code>git fetch</code> / <code>push</code>.</p>
    <p><b>Works when</b>: a Git remote matches Azure DevOps - cloud, legacy, SSH, or a configured on-prem server.</p>
</tldr>

The plugin works with the IDE's bundled Git plugin to detect Azure DevOps remotes, match your current branch to its PR,
and hand off HTTPS credentials so `git fetch` and `git push` just work.

## Repository detection

When you open a project, the plugin scans every Git remote for these patterns:

| Remote URL pattern                                      | Kind         |
|---------------------------------------------------------|--------------|
| `https://dev.azure.com/<org>/<project>/_git/<repo>`     | Cloud HTTPS  |
| `https://<org>.visualstudio.com/<project>/_git/<repo>`  | Legacy cloud |
| `git@ssh.dev.azure.com:v3/<org>/<project>/<repo>`       | SSH          |
| Self-hosted Azure DevOps Server URLs from your accounts | On-prem      |

If any remote matches, the **Pull Requests** tool window appears and background sync starts. Otherwise, the plugin stays
out of your way.

## Clone a repository

The IDE's own **Clone Repository** dialog gets an **Azure DevOps** entry, so you can start from a list of repositories
instead of a URL you have to go and find first.

<procedure title="Clone from the repository list">
    <step>On the Welcome screen choose <b>Clone Repository</b> (or <b>File | New | Project from Version Control</b> in
    an open project) and pick <b>Azure DevOps</b> in the list on the left. Your signed-in accounts are named underneath
    it.</step>
    <step>Sign in if you haven't yet - the panel offers the same <b>Log In via Microsoft…</b> and <b>Log In with
    Token…</b> as everywhere else, and switches to the repository list the moment an account is added.</step>
    <step>Pick the repository. The list covers <b>every project in the organization</b> at once, flattened to
    <code>project/repository</code> - type in the search field to narrow it. With more than one account signed in, an
    account dropdown appears above the search field.</step>
    <step>Check the <b>Directory</b> field - it follows the repository name until you edit it by hand - then click
    <b>Clone</b>. The IDE clones over HTTPS and opens the project; credentials come from the signed-in account, as
    described under <i>HTTPS authentication</i> below.</step>
</procedure>

### If the repository list doesn't load {collapsible="true"}

The list is fetched once per account and kept for as long as the dialog is open, so switching between accounts costs
nothing after the first load.

| What the list says                                  | What it means                                                             |
|-----------------------------------------------------|---------------------------------------------------------------------------|
| **Loading repositories…**                           | The organization-wide listing is still paging in.                         |
| **No repositories in this organization**            | The account reaches the organization but finds no repositories in it.     |
| **No matching repositories**                        | Only the search text is hiding them - clear the field.                    |
| **Couldn't load repositories** + **Retry**          | The call failed, usually offline or a transient error.                    |
| **Couldn't access &lt;account&gt; - sign in again** | That account's token no longer works; the link re-opens the login dialog. |

## Current branch → PR

The plugin watches your checked-out branch and resolves it to the matching open PR (by source-branch name). When it
finds one, two widgets light up.

### Main-toolbar branch widget

The Git branch widget in the **main toolbar** gains an Azure DevOps badge - `!1234 on feature/login`. Click it for the
PR's actions:

| Action                                   | What it does                                                                          |
|------------------------------------------|---------------------------------------------------------------------------------------|
| **Show Pull Request in the Tool Window** | Opens the PR's detail view.                                                           |
| **Update to Enable Review Mode…**        | Appears when your local branch has diverged from the PR head (runs *Update Project*). |
| **Review Mode**                          | Toggles the in-editor review overlay. See [](Review-in-Editor.md).    |

### Status-bar widget

A separate widget in the **status bar** shows `ADO PR !1234`. Click it to open that PR in the tool window. (Hide or show
it via the status-bar widget chooser - its name is *Azure DevOps PR (current branch)*.)

When you switch branches, both widgets update - and disappear when the new branch has no PR.

## Find the pull request behind a line {id="find-pull-request"}

Ever stare at a line and wonder *why* it looks like that? The plugin can blame the line locally and tell you which pull
request introduced it - as a one-off lookup, or as a permanent column beside your line numbers.

That's a feature in its own right: see [](Find-Pull-Requests-From-Code.md).

## HTTPS authentication

When Git needs HTTPS credentials for an Azure DevOps remote, the plugin supplies the stored token automatically:

<procedure title="How HTTPS auth handoff works">
    <step>You run <code>git fetch</code> or <code>git push</code> from inside the IDE (Update Project, the Git tool window, or the embedded terminal).</step>
    <step>Git asks the IDE for credentials.</step>
    <step>The plugin matches the remote to a signed-in account and supplies its token.</step>
    <step>Git proceeds - no password prompt.</step>
</procedure>

If several signed-in accounts match the same URL, the project's **default account** is used
(see [](Settings.md)).

> Git commands run from a **system shell** outside the IDE won't see this provider. Configure a system-wide Git
> credential helper if you mostly work in an external terminal -
> see [Troubleshooting](Troubleshooting.md#git-push-asks-for-a-password).
> {style="note"}

## Push → Create PR

After you push a branch with no PR yet, the plugin can offer to **Create a pull request** in a balloon - a faster path
than the toolbar. Toggle it with **Offer to create a pull request after I push** in [](Settings.md).
Other Git-driven notifications (review requests, vote changes, replies) are covered
in [](Notifications-and-Attention.md).

### Work items in commit messages {id="commit-refs"}

Azure DevOps links a commit to a work item when the commit message carries a `#ID` reference — commit
`#35 Catch null exception`, push it, and the server creates the **Commit** link on work item 35. That linking happens
**server-side, on push**: the plugin neither adds these references nor rewrites them, and nothing has to be configured
in the IDE for it to work. Write the reference in your commit message however you normally write one.

The same is true of the AI commit-message generator ([](AI-Features.md)): it preserves a `#ID` you have already written
but never invents one, since it cannot know which work item you meant.

For the `#ID` reference in comments and PR descriptions — which the plugin *does* render as a link — see
[](Markdown.md#hash).

## Multi-repo and self-hosted

- **Multiple repositories** in one project are each detected independently; use the tool-window **Switch Account /
  Repository…** to focus on one.
- **Azure DevOps Server (on-prem)** works just like the cloud product - add the server URL when signing in, with a token
  generated from that server.
