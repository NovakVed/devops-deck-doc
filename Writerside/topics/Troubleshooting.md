# Troubleshooting

<tldr>
    <p><b>No tool window</b>: the Pull Requests window stays hidden until an Azure DevOps Git remote is detected.</p>
    <p><b>Stale data</b>: force a sync with <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut>.</p>
    <p><b>Report it</b>: <ui-path>Help | Report DevOps Lens Issue…</ui-path>.</p>
</tldr>

Quick fixes for the issues users hit most often. For decision-style questions ("should I use OAuth or PAT?", "does it
support on-prem?"), see [](FAQ.md). If your problem isn't covered here,
see [Reporting a problem](#reporting-a-problem) at the bottom.

## The tool window doesn't appear

The Pull Requests tool window is hidden when no Azure DevOps Git remote is detected. Check:

<procedure>
    <step>Run <code>git remote -v</code> in your project root. At least one remote URL must contain <code>dev.azure.com</code> or <code>visualstudio.com</code> (or your configured self-hosted server).</step>
    <step>Verify the bundled <b>Git</b> plugin (<code>Git4Idea</code>) is enabled in <ui-path>Settings | Plugins | Installed</ui-path>.</step>
    <step>Restart the IDE - the remote scan runs on project open.</step>
</procedure>

## The pull request list is empty {id="empty-pr-list"}

When the list has nothing to show it states *why* in the middle of the panel, and most of those states carry an inline
recovery link. Match the message you see:

| The list says                                                                                                                                                   | What it means                                                                  | What to do                                                                                                         |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **Loading pull requests…**                                                                                                                                      | The first fetch is still in flight.                                            | Wait - it resolves into one of the states below.                                                                   |
| **Nothing to load**                                                                                                                                             | The query succeeded and came back empty (e.g. no open PRs on this repository). | Widen the **State** filter, or check you picked the right repository.                                              |
| **No matches**                                                                                                                                                  | Your filters or search text exclude every PR.                                  | Click **Clear filters**.                                                                                           |
| **No credentials stored for this account** - *"The saved token couldn't be read from the IDE's password safe (it may have been removed from the keychain)."*    | The account is still configured, but its token is gone from the OS keychain.   | Click **Log in again** - see [](Authentication.md).                                                  |
| **This account can't access these pull requests** - *"Your PAT was accepted, but it's either missing a required scope or the account lacks repository access."* | Azure DevOps answered, and returns the same response for both causes.          | Click **Switch account / repository**, then work through [401](#unauthorized-401) and [403](#forbidden-403) below. |
| **Can't load pull requests** - *"You're offline."*                                                                                                              | A network-class failure - the request never reached the server.                | Click **Retry**, or see [The plugin says I'm offline](#offline).                                                   |

## "401 Unauthorized" after signing in {id="unauthorized-401"}

| Likely cause                                                                    | What to do                                                                              |
|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| The PAT may lack required scopes                                                | Easiest fix: regenerate with **Full access** - see [](Authentication.md). |
| The PAT may have expired - tokens expire on the date you set when creating them | Sign in again with a new token.                                                         |
| Your organization may have disabled PATs                                        | In that case use OAuth.                                                                 |

## "403 Forbidden" on specific actions {id="forbidden-403"}

The PAT is valid but your Azure DevOps account doesn't have permission for the action (e.g. you can read PRs but not
vote, or can't merge). Ask your Azure DevOps administrator to grant the required permission on the project or
repository.

## OAuth browser doesn't return to the IDE

OAuth completes via a **local loopback redirect** - the browser is sent back to
`http://127.0.0.1:<port>/azure-oauth/callback`, served by the IDE's built-in web server, which then shows *"Sign-in
complete. You can close this tab."* If that round-trip fails:

- A firewall or security tool may be blocking localhost connections to the IDE's built-in server (port range
  **63342–63352**).
- A blocked pop-up or a non-default browser can stop the redirect - make sure your intended browser is the default.
- The sign-in window has a **5-minute** limit; if it lapsed, start over.

Workaround: use a Personal Access Token instead of OAuth.

## PRs don't show new comments after sync

<procedure>
    <step>Press <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> (or right-click → <b>Refresh List</b>) to force a sync immediately - there is no Reload toolbar button.</step>
    <step>Check the <b>idea.log</b> for sync errors (<a anchor="enabling-debug-logs">enable debug logs</a> for more detail).</step>
    <step>The pull-request refresh interval is 60 s by default. If you've increased it in <a href="Settings.md"/>, expect a longer delay.</step>
</procedure>

## Inline comments don't appear in the diff

- The plugin only renders inline threads on PRs you have **Code (Read)** permission for.
- If you're viewing the diff from your local working tree (not the PR), inline threads won't render - open the PR from
  the tool window so its changes tree and threads load.
- If your local branch has diverged from the PR head, review-in-editor disables itself. Push your changes or check out
  the PR head exactly.

## Git push asks for a password {id="git-push-asks-for-a-password"}

The plugin's HTTPS credential provider only kicks in for Git operations run **inside the IDE** (terminal launched from
within the IDE counts as "inside"). For external terminals, configure a system-level Git credential helper:

<tabs>
    <tab title="macOS">
        <code-block lang="bash">
# macOS Keychain
git config --global credential.helper osxkeychain
        </code-block>
    </tab>
    <tab title="Windows">
        <code-block lang="bash">
git config --global credential.helper manager
        </code-block>
    </tab>
    <tab title="Linux">
        <code-block lang="bash">
# libsecret
git config --global credential.helper libsecret
        </code-block>
    </tab>
</tabs>

## AI features are missing or return errors

- Open <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> and confirm **Enable AI assistance**
  is checked and at least one provider is configured and enabled.
- Click **Test connection** on the provider row - if it fails, double-check API key, model name, and endpoint URL.
- For **Ollama**, confirm the daemon is running locally (`ollama serve`) and the model you specified is pulled
  (`ollama list`).
- For **CLI providers** (Claude Code, Codex, Copilot CLI), make sure the binary is on `PATH` and signed in
  (`claude /login`, etc.).
- Provider rate-limit or quota errors come straight from the provider - they're not retried.

## Plugin conflicts {id="plugin-conflicts" collapsible="true"}

The plugin shares the IDE's `collaboration-tools` toolkit with the bundled **GitHub** plugin and the **GitLab** plugin.
It coexists with both - independent tool windows, independent state. Two known interaction points:

- If a project has both an Azure DevOps and a GitHub remote, both tool windows appear; right-click context menus may
  surface actions from each.
- If a third-party plugin overrides the AI extension points (`intellij.vcs.azuredevops.aiSummaryExtension` etc.,
  see [](Privacy-and-Data.md)), the built-in default is bypassed for that feature. If AI features behave
  unexpectedly, check <ui-path>Settings | Plugins</ui-path> for other Azure DevOps or AI plugins that may be hooking the
  EPs.

## The plugin says I'm offline {id="offline"}

The plugin tracks reachability itself and flips to offline **only** on a network-class error - one where the request
never reached the server. An expired token, a 403, or a 404 all mean Azure DevOps answered, so none of them mark you
offline; see [401](#unauthorized-401) and [403](#forbidden-403) for those.

The flip itself is deliberately silent - a background refresh that fails must not pop balloons at you. You find out when
you attempt a **write**: the action is stopped immediately and a **You appear to be offline** balloon names what you
tried, e.g. *"Couldn't start the run - try again when you reconnect."*

Recovery needs no action from you. While offline the plugin polls Azure DevOps on a backoff (30 s, doubling up to 120 s)
and clears the offline state on the first successful probe - as does any request of yours that succeeds. Open PR and
pipeline-run editors reload themselves the moment it clears.

> The probe checks **Azure DevOps specifically**, not "do I have Wi-Fi" - so a VPN, proxy, or DNS problem that leaves the
> rest of your network working still reads as offline here. Check <ui-path>Settings | Appearance &amp; Behavior | System
> Settings | HTTP Proxy</ui-path>.
> {style="note"}

## Network timeouts or "request failed"

The plugin uses IntelliJ's HTTP proxy configuration - there's no separate proxy setting. If corporate network
restrictions block outbound HTTPS:

- Check <ui-path>Settings | Appearance &amp; Behavior | System Settings | HTTP Proxy</ui-path>. The plugin honors
  whatever you set here, **including proxy credentials** - if your proxy requires a username and password, fill them in
  there or every request comes back `407`.
- CLI-based AI providers (`claude`, `codex`, `copilot`) are external binaries with their own network stack. They
  inherit **nothing** from the IDE proxy settings - configure them on their own terms.
- The HTTP timeout for AI streaming requests is **5 minutes**. Anything longer is surfaced as a hang and reported as a
  notification.
- The retry behavior for Azure DevOps API calls is "fail fast" - transient errors aren't retried so the UI doesn't pile
  up duplicate calls. The 60-second background sync picks up where a failed request left off.

## Self-signed or corporate certificates {id="certificates"}

An on-prem Azure DevOps Server usually presents a certificate issued by an internal CA. The plugin routes TLS through
the IDE's own certificate store, so the first time you sign in against such a server the IDE shows its **"accept this
certificate?"** dialog. Accept it once and the decision sticks - review or revoke it later at <ui-path>Settings | Tools
| Server Certificates</ui-path>.

> There is deliberately **no plugin setting to accept untrusted certificates**. Per-host trust granted through the
> platform dialog is auditable and revocable; a blanket bypass is neither, and it would weaken every request the plugin
> makes.
> {style="note"}

If you get a hard TLS error instead of that dialog:

- Confirm the server URL is `https://`. A plain `http://` URL is refused at sign-in - a PAT travels as HTTP Basic on
  every request, so cleartext would leak it.
- Import the internal CA at <ui-path>Settings | Tools | Server Certificates</ui-path>, then retry.
- If your network runs a TLS-inspecting proxy, it re-signs traffic with its own CA - that CA has to be trusted too.

## Plugin update broke something {id="plugin-update-broke-something" collapsible="true"}

Roll back to a previous version:

<procedure>
    <step>Open <ui-path>Settings | Plugins | Installed</ui-path>, find <b>DevOps Lens</b>.</step>
    <step>Click the gear icon → <b>Manage Plugin Versions</b>.</step>
    <step>Pick an older version and install it. The plugin is dynamic, so normally no restart is required.</step>
</procedure>

## Enabling debug logs {id="enabling-debug-logs" collapsible="true"}

For deeper troubleshooting, enable trace logging:

<procedure>
    <step>Open <ui-path>Help | Diagnostic Tools | Debug Log Settings…</ui-path></step>
    <step>Add lines:
        <code-block lang="text">
#com.vednovak.devops
#com.vednovak.devops.sync
#com.vednovak.devops.api
        </code-block>
    </step>
    <step>Reproduce the issue.</step>
    <step>Open <ui-path>Help | Show Log in Explorer/Finder</ui-path> to find <code>idea.log</code>.</step>
</procedure>

The log lives in your IDE's caches directory:

<tabs>
    <tab title="macOS">
        <code>~/Library/Logs/JetBrains/&lt;IDE&gt;&lt;Version&gt;/idea.log</code>
    </tab>
    <tab title="Windows">
        <!-- ignore-vars stops Writerside reading %LOCALAPPDATA% as a variable
             reference. Do not "fix" this to &#37; - the builder re-escapes that
             entity's ampersand and readers see the literal &#37; text. -->
        <code ignore-vars="true">%LOCALAPPDATA%\JetBrains\&lt;IDE&gt;&lt;Version&gt;\log\idea.log</code>
    </tab>
    <tab title="Linux">
        <code>~/.cache/JetBrains/&lt;IDE&gt;&lt;Version&gt;/log/idea.log</code>
    </tab>
</tabs>

## Reporting a problem {id="reporting-a-problem"}

The plugin gives you three ways to hand over what's needed. Which one you want depends on what happened:

| What you saw                                                                  | Use this                                                                                                                        |
|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| A red error icon in the status bar, or an IDE error dialog naming this plugin | The dialog's **Report to the Third-Party Plugin** button - see [Crash reports](#crash-reports) below                    |
| Something is broken or wrong, but nothing crashed                             | <ui-path>Help &#124; Report DevOps Lens Issue…</ui-path> - opens the bug form with your versions pre-filled             |
| You're already writing an issue and want the environment details              | <ui-path>Help &#124; Copy DevOps Lens Diagnostics</ui-path> - puts a snapshot on your clipboard to review and paste |

### Crash reports {id="crash-reports"}

When the plugin throws an error it didn't expect, the IDE may show its standard error dialog. Pressing **Report to the
Third-Party Plugin** hands the stack trace to JetBrains Marketplace, which passes it to the plugin developer - so the
bug can be found without you digging through `idea.log` at all.

What makes this worth pressing:

- **The IDE sends it, not the plugin.** Crash reporting for third-party plugins is a JetBrains Marketplace service; the
  plugin registers for it and adds nothing to the report.
- **It's not public.** The report goes to the plugin's Exception Analyzer page on Marketplace, not to the public
  tracker, and is not publicly visible.
- **You can add a sentence** about what you were doing in the dialog's comment box - that short note is often what turns
  a stack trace into a fix. It is sent word for word, so keep code, credentials and confidential names out of it.
- **Nothing is sent when you close the dialog** - unless you have turned on your IDE's automatic exception reporting,
  which lets the IDE send reports on its own.

Because the IDE builds the report, the plugin cannot redact it: the stack trace and the error message travel as they
are, and an error message can name an organization, project, repository or server host. If that matters to you, skip the
dialog and use <ui-path>Help | Copy DevOps Lens Diagnostics</ui-path> instead - that snapshot is versions and counters
only, you read it on your clipboard, and you choose where it goes.

Full detail on exactly what's included: [Privacy and Data](Privacy-and-Data.md#crash-reports).

> Everyday failures - being offline, an expired token, a 403, a file that isn't there -
> are handled and logged locally. They never raise this dialog, because they aren't bugs.
> For those, use the Help-menu bug form instead.
> {style="note"}

### Copying diagnostics

<ui-path>Help &#124; Copy DevOps Lens Diagnostics</ui-path> puts a short
snapshot on your clipboard: plugin version, IDE build, Java runtime, OS,
how many accounts are configured and whether they're cloud or on-prem, whether the
plugin currently considers itself online, and cache statistics. No URLs, no
organization names, no credentials.

It's plain text, so you can read it before you paste it. This is the recommended way to attach environment details to a
public issue - and the way to report a bug if you'd rather never send a crash report at all.

## Filing a bug {id="filing-a-bug"}

If you've found a reproducible issue, it goes on the public tracker at
[%tracker_url%](%tracker_url%). See [](Support.md) for the full picture - channels, response times, and the
security-report process.

<procedure>
    <step>Run <ui-path>Help | Diagnostic Tools | Collect Logs and Diagnostic Data</ui-path>.</step>
    <step>Choose <ui-path>Help | Report DevOps Lens Issue…</ui-path> - or click
        <b>Report a bug</b> at the bottom of <ui-path>Settings | Tools |
        Azure DevOps</ui-path>. Either opens the form with your IDE build, plugin version,
        and OS pre-filled. (Or open <a href="%new_bug_url%">a new bug report</a>
        directly and fill them in by hand.) Include:
        <ul>
            <li>Your IDE version (<b>About</b>)</li>
            <li>Plugin version</li>
            <li>OS &amp; architecture</li>
            <li>Steps to reproduce</li>
            <li>Expected vs actual behavior</li>
            <li>A scrubbed <code>idea.log</code> snippet (remove tokens before posting)</li>
        </ul>
    </step>
</procedure>

> **Never paste PATs or OAuth refresh tokens** in a public issue. The plugin keeps tokens out of its own log, but
> always double-check before submitting.
> {style="warning"}
