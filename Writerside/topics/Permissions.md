# Permissions

<tldr>
    <p><b>Required</b>: <b>Code (Read &amp; write)</b>. The login dialog refuses a token without it.</p>
    <p><b>Changing them</b>: scopes are baked in at token creation, so you re-authenticate rather than edit.</p>
</tldr>

What %product% can show depends on what your credentials are allowed to read. Here's the whole map - one permission you
can't skip, six that quietly unlock extras.

> **Quick recipe:** pick **Full access** when creating a PAT, or the **Full access** tier when signing in with
> Microsoft - everything below just works.
> {style="tip"}

## The one you can't skip

**Code (Read &amp; write)** - scope code `vso.code_write` - is the plugin's foundation: listing pull requests, reading
diffs, commenting, voting, completing. A token without it can't do anything useful, so the login dialog refuses it on
the spot with a message telling you which scope to add. You'll never end up signed in to an empty, broken tool window.

The dialog spells the full list out under the **Token** field, so you can check a token's scopes against it before you
paste:

![The Log In to Azure DevOps dialog listing the scopes a token must grant](sign-in-with-token.png){ width="560" border-effect="line" }

## Everything else is optional

Each of these enriches the experience; missing ones simply switch their feature off - no errors, no broken panels.

| Scope (in the PAT UI)       | Scope code            | Unlocks                                                                                                      | Without it                                                                             |
|-----------------------------|-----------------------|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| **Code → Status**           | `vso.code_status`     | The **Checks** panel - build/policy results on a PR.                                                         | Checks can't load; the rest of the PR view is unaffected.                              |
| **User Profile → Read**     | `vso.profile`         | Real profile photos everywhere.                                                                              | Avatars render as initials.                                                            |
| **Identity → Read**         | `vso.identity`        | @-mention autocomplete, resolving mentions to names, and the team-membership lookup behind the default view. | Mention search returns nothing; team-assigned PRs may disappear from the default list. |
| **Project and Team → Read** | `vso.project`         | Team memberships for the **assigned to my team** part of the default PR list.                                | The plugin falls back to Identity → Read for the same information.                     |
| **Work Items → Read**       | `vso.work`            | Linked work items on PR details and the Work Items filter.                                                   | The work-items section stays empty.                                                    |
| **Security → Manage**       | `vso.security_manage` | The **Override branch policies** option in the Complete dialog.                                              | The option is hidden.                                                                  |

## How missing permissions behave

<deflist>
    <def title="Required permission missing">
        Sign-in is blocked, with the exact scope named in the login dialog.
    </def>
    <def title="Optional permission missing">
        The feature degrades quietly (initials instead of photos, empty sections) and everything else keeps working.
    </def>
    <def title="Team-assigned PRs unavailable">
        Because this changes what the default PR list shows, you get a one-time notification explaining which permission
        to add. See <a href="Pull-Requests.md"/> for how the default "mine" view works.
    </def>
</deflist>

## Fixing a missing permission

Permissions are baked into the token at creation - they can't be added to an existing one from the plugin.

<tabs>
    <tab title="Personal Access Token">
        <procedure title="Re-authenticate with a new token">
            <step>In Azure DevOps, create a new token with the missing scope granted.</step>
            <step>In <ui-path>Settings | Tools | DevOps Lens</ui-path>, remove the account with <b>−</b>.</step>
            <step>Add it back with <b>+</b> → <b>Log In with Token…</b>.</step>
        </procedure>
    </tab>
    <tab title="Microsoft (OAuth)">
        <procedure title="Re-authenticate with Microsoft">
            <step>Remove the account.</step>
            <step>Sign in again, choosing <b>Full access</b> in the permission picker.</step>
        </procedure>
    </tab>
</tabs>

See [](Authentication.md) for the full sign-in walkthrough.
