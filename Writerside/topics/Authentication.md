# Authentication

<tldr>
    <p><b>Where</b>: the <b>+</b> button in the accounts panel, or the Pull Requests tool window's sign-in screen.</p>
    <p><b>Requires</b>: a Personal Access Token, or a Microsoft Entra ID account for OAuth. <a anchor="on-prem">Azure DevOps Server</a> is PAT only.</p>
</tldr>

The plugin signs in two ways:

<deflist>
    <def title="Personal Access Token (PAT)">
        A token you generate in Azure DevOps and paste into the plugin. Works everywhere, including on-prem Azure DevOps
        Server.
    </def>
    <def title="Microsoft Entra ID (OAuth)">
        A browser-based sign-in that honors your organization's SSO and MFA. Cloud <code>dev.azure.com</code> only.
    </def>
</deflist>

Either way, credentials are stored in the IDE's system-backed keychain.

## Which method should I use?

| Use…                      | When                                                                                                  |
|---------------------------|-------------------------------------------------------------------------------------------------------|
| **Personal Access Token** | Works everywhere, including on-prem Azure DevOps Server. The token itself doesn't re-prompt for MFA.  |
| **Microsoft (OAuth)**     | Cloud `dev.azure.com` only. Honors your org's SSO/MFA on every sign-in; tokens refresh automatically. |

Both reach every sign-in through the **`+`** button in the accounts panel, which opens a small popup:

![The add-account popup: Log In with Token and Log In via Microsoft](add-account-menu.png){ width="420" border-effect="line" }

> On on-prem Azure DevOps Server, Microsoft sign-in can't complete - see [Azure DevOps Server (on-prem)](#on-prem) for
> what you'll see instead and which URLs the Server field takes.
> {style="note"}

## Sign in with a Personal Access Token

### 1. Generate a token

You can let the plugin take you there: the login dialog's **Generate…** button opens your organization's Personal Access
Tokens page in the browser. Or do it by hand:

<procedure title="Generate a token in Azure DevOps">
    <step>Open Azure DevOps, click your avatar (top right) → <b>Personal access tokens</b>.</step>
    <step>Click <b>+ New Token</b>, set a name, organization, and expiry.</step>
    <step>Grant the scopes below (or just pick <b>Full access</b>).</step>
    <step>Click <b>Create</b> and copy the token - Azure DevOps shows it only once.</step>
</procedure>

> **Quick recipe:** if you just want everything to work, pick **Full access**. The granular scopes below are for
> stricter security policies - [](Permissions.md) explains exactly what turns off without each one.
> {style="tip"}

#### Scopes the plugin uses {id="pat-scopes" collapsible="true"}

The login dialog lists them too:

| Scope (in the PAT UI)                  | Powers                                                                                                                                                         |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Code** → *Read &amp; write + Status* | Reading PRs and diffs, commenting, voting, completing/abandoning, and branch-policy/status checks. **Required** - the login dialog refuses a token without it. |
| **User Profile** → *Read*              | Your profile and reviewer avatars.                                                                                                                             |
| **Identity** → *Read*                  | @-mention autocomplete and the team-membership lookup behind the default PR list.                                                                              |
| **Work Items** → *Read*                | Linked work items on a PR and the Work Items filter.                                                                                                           |
| **Project and Team** → *Read*          | Team memberships for the **assigned to my team** part of the default PR list.                                                                                  |
| **Security** → *Manage*                | The permission check that enables the **Override branch policies** option in the Complete dialog.                                                              |

### 2. Add it to the plugin

<procedure title="Sign in with a token">
    <step>In the Pull Requests tool window (or <ui-path>Settings | Tools | DevOps Lens</ui-path>), click <b>+</b> → <b>Log In with Token…</b>.</step>
    <step>Fill in the two fields:
        <ul>
            <li><b>Server</b> - a full URL (<code>https://dev.azure.com/your-org</code>), a bare org slug (<code>your-org</code>), a legacy <code>visualstudio.com</code> URL, or an on-prem URL (<code>https://tfs.example.com/tfs/your-collection</code>). There is no separate organization field - the org is read from this one.</li>
            <li><b>Token</b> - paste the PAT.</li>
        </ul>
    </step>
    <step>Click <b>Log In</b> (or just press <shortcut>Enter ↵</shortcut>). The plugin validates the token ("Validating credentials…") and your tool window populates.</step>
</procedure>

> The Server field accepts **https URLs only** - a PAT rides on every request as HTTP Basic, so the dialog refuses plain
> `http://` outright. And validation goes beyond "does it sign in": the plugin also test-reads a pull request, so a token
> that authenticates but lacks the **Code** scope is rejected on the spot with a message naming the missing scope.
> {style="note"}

![The Log In to Azure DevOps dialog with the Server and Token fields](sign-in-with-token.png){ width="560" border-effect="line" }

### Rotate or revoke a token {collapsible="true"}

<procedure title="Rotate a token">
    <step>In Azure DevOps, create a new token with the same scopes and copy it.</step>
    <step>In <ui-path>Settings | Tools | DevOps Lens</ui-path>, select the account, click <b>−</b> above the list to remove it, then <b>+</b> → <b>Log In with Token…</b> and paste the new token against the same Server URL.</step>
    <step>Back in Azure DevOps, revoke the old token.</step>
</procedure>

If a token is revoked or expires, the plugin shows **Log in again…** in the tool window - click it to paste a fresh
token. The account row in Settings also turns red with the reason, so you can tell a dead token from a server you simply
can't reach right now.

## Sign in with Microsoft (OAuth)

For cloud organizations that prefer SSO, sign in via Microsoft Entra ID.

<procedure title="Sign in with Microsoft">
    <step>Click <b>+</b> → <b>Log In via Microsoft…</b>.</step>
    <step>In <b>Sign in with Microsoft</b>, choose a permission tier (below) and click <b>Continue</b>.</step>
    <step>Authenticate in the browser (MFA included). The page redirects back to the IDE over a local loopback and shows <b>"Sign-in complete. You can close this tab."</b></step>
</procedure>

![The Sign in with Microsoft permission picker](sign-in-with-microsoft.png){ width="560" border-effect="line" }

Refresh tokens renew automatically (with a 60-second leeway before expiry), so you stay signed in across sessions.

### Permission tiers {id="oauth-permission-tiers"}

| Tier                            | What you get                                                                                                                                        | What you don't                                                                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Full access** *(recommended)* | Pull requests, comments, votes, status checks, **plus** avatars, @-mention search, linked work items, and team memberships for the default PR list. | -                                                                                                                                                            |
| **Standard access**             | Pull requests and comments only.                                                                                                                    | Avatars show as initials; @-mention autocomplete returns nothing; work-item links don't render; PRs assigned to your **teams** drop out of the default list. |

For the full permission-by-permission map, see [](Permissions.md).

> To change tiers later, remove the account and sign in again - the picker reappears on every fresh sign-in.
> {style="tip"}

## Azure DevOps Server (on-prem) {id="on-prem"}

On-prem servers are **PAT-only**. Microsoft sign-in redirects through `login.microsoftonline.com`, which can't reach a
server inside your network, so the plugin steers you to a token instead of letting the flow fail halfway.

You won't lose the button - you'll see it greyed out. Once the repository selector resolves an on-prem server, **Log In
via Microsoft…** stays on screen but disabled, with the tooltip *"Microsoft sign-in is only available for Azure DevOps
Services (dev.azure.com). Use a Personal Access Token for on-prem Azure DevOps Server."* **Log In with Token…** next to
it stays enabled.

![The tool-window sign-in screen on an on-prem collection: Log In via Microsoft greyed out, Log In with Token enabled](oauth-access-scope-dialog.png){ width="720" border-effect="line" thumbnail="true" }

### What to paste into Server {collapsible="true"}

The Server field takes either shape - both resolve to the same account, so paste whichever URL you already have:

| Shape                                | Example                                                                  | Resolves to                                                    |
|--------------------------------------|--------------------------------------------------------------------------|----------------------------------------------------------------|
| **Collection URL**                   | `https://tfs.contoso.com:8080/tfs/my-collection`                         | Server `https://tfs.contoso.com:8080/tfs`, org `my-collection` |
| **Repository (clone / browser) URL** | `https://tfs.contoso.com:8080/tfs/my-collection/my-project/_git/my-repo` | Server `https://tfs.contoso.com:8080/tfs`, org `my-collection` |

The host and port are kept as typed, so a non-standard port like `:8080` is fine. A pasted web-page URL works too -
trailing `_`-prefixed segments (`_build`, `_settings`, `_apis`…) are trimmed back to the collection.

> The **https-only** rule applies here as well: a PAT rides on every request as HTTP Basic, so a plain `http://` server
> URL is refused. Terminate TLS on the server (or its proxy) before signing in.
> {style="warning"}

## Multiple accounts

Sign in to several Azure DevOps organizations at once - cloud and on-prem side by side. Each row in
<ui-path>Settings | Tools | DevOps Lens</ui-path> shows the avatar, display name, and organization URL, plus a
red line naming the problem when that account can't be reached. The toolbar above the list is where the actions live:

| Action             | What it does                                                                   |
|--------------------|--------------------------------------------------------------------------------|
| **+**              | Opens the sign-in popup - **Log In with Token…** or **Log In via Microsoft…**. |
| **−**              | Removes the selected account.                                                  |
| **Set as Default** | Marks the selected account as this project's default (the row goes bold).      |

![The Azure DevOps accounts panel in Settings](multiple-accounts.png){ width="700" border-effect="line" }

Each project remembers its own **default account** (stored in the project's workspace) - the one used for that project's
API calls and Git HTTPS handoff.

## Credential storage {collapsible="true"}

PATs and OAuth refresh tokens live in the IDE's PasswordSafe, backed by the OS keychain:

<tabs>
    <tab title="macOS">Keychain - one entry per signed-in account.</tab>
    <tab title="Windows">Credential Manager (DPAPI-encrypted).</tab>
    <tab title="Linux">KWallet / Secret Service if available, otherwise an encrypted file in the IDE config directory.</tab>
</tabs>

Switch storage modes in <ui-path>Settings | Appearance &amp; Behavior | System Settings | Passwords</ui-path>.

## Sign out

In <ui-path>Settings | Tools | DevOps Lens</ui-path>, select the account, click **−** above the list, and
**Apply**. The token is deleted from the keychain and any cached data for that account is cleared.

## Common sign-in errors {collapsible="true"}

| Message                                                  | Likely cause                                                                                                |
|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Token invalid or expired**                             | Wrong/expired PAT, or missing scopes. Create a new one with at least *Code (Read &amp; write)*.             |
| **This token signs in, but it can't read pull requests** | The PAT authenticates but lacks the **Code** scope - regenerate it with *Code (Read &amp; write + Status)*. |
| **Organisation not found**                               | The Server field's org doesn't exist or you can't access it.                                                |
| **Couldn't reach Azure DevOps**                          | Network/proxy issue - check <ui-path>Settings &#124; System Settings &#124; HTTP Proxy</ui-path>.           |
| **403 Forbidden** on an action                           | Your account lacks the project/repo permission - ask your org admin.                                        |

For more, see [](Troubleshooting.md).
