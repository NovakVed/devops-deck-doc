# Support

Everything about %product% is tracked in the open, in one public repository:
[%tracker_url%](%tracker_url%). It holds no source code - just issue templates and Discussions - so there's a public
place to report a problem while the plugin's own repository stays private.

## Pick the right channel

| Your situation                                                        | Where to go                                                                                  |
|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| "The IDE showed a red error icon / an error dialog about this plugin" | Press **Report to DevOps Lens** in that dialog - see [Crash reports](#crash-reports) |
| "This is broken and I can reproduce it"                               | [Report a bug](%new_bug_url%)                                                                |
| "The plugin should be able to…"                                       | [Request a feature](%new_feature_url%)                                                       |
| "How do I…?" / "Is this supposed to work like this?"                  | [Discussions](%discussions_url%)                                                             |
| "I think I found a security hole"                                     | Email [%support_email%](mailto:%support_email%) - **never** a public issue                   |
| "The docs are wrong or missing something"                             | [File it on the tracker](%issues_url%) anyway; it gets routed                                |
| Azure DevOps itself is broken                                         | [Microsoft Developer Community](https://developercommunity.visualstudio.com/AzureDevOps)     |
| The IDE is broken independently of this plugin                        | [JetBrains YouTrack](https://youtrack.jetbrains.com/issues)                                  |

Questions are welcome in Discussions and won't be closed for not being bugs. If a discussion turns out to be a real
defect, it gets converted into an issue.

## Crash reports {id="crash-reports"}

If the plugin throws an error it didn't expect, your IDE shows its standard error dialog with a **Report to DevOps
Lens** button. That button is the single most useful thing you can press: it sends the stack trace - the part that
actually identifies the bug

- without you having to find, read, and scrub `idea.log` first.

It sends nothing unless you press it, it strips credentials and identifying names on your machine before sending, it
never includes your code, and it goes to a private error tracker rather than the public repository. Add a sentence about
what you were doing in the dialog's comment box if you can; a stack trace plus "I clicked Approve on a PR with
conflicts" is usually enough to fix something.

Crash reports do not include a reply address or an intentionally assigned account identifier, so they can't be replied
to. Sentry may still process network metadata and a report must be treated as potentially containing personal data.
**If you want an answer, file an issue as well** - the two channels complement each other.

Details of exactly what a report contains, and how to report bugs without ever sending
one: [Privacy and Data](Privacy-and-Data.md#crash-reports).

## Reporting a bug

The fastest path starts inside the IDE, because it fills in the fields reporters most often leave out.

<procedure title="From the IDE" id="report-from-ide">
    <step>Choose <ui-path>Help | Report DevOps Lens Issue…</ui-path> - or open
        <ui-path>Settings | Tools | DevOps Lens</ui-path> and click
        <b>Report a bug</b> at the bottom of the page.</step>
    <step>Your browser opens the bug form with your IDE build, plugin version, and
        operating system already filled in. Nothing else is sent, and you can edit or
        clear those fields before submitting.</step>
    <step>For the rest of the environment details, run <ui-path>Help | Copy DevOps Lens
        Diagnostics</ui-path> and paste the redacted snapshot into the issue after reviewing it.</step>
</procedure>

The settings links also sit at the bottom of the <b>AI Settings</b> sub-page, and you can always go straight to
the [tracker](%issues_url%) instead.

### Before you file

<procedure id="before-you-file-steps">
    <step><a href="%issues_url%?q=is%3Aissue">Search open and closed issues</a> - your
        problem may already be tracked, and a comment on the existing issue is more
        useful than a duplicate.</step>
    <step>Skim <a href="Troubleshooting.md"/>. The empty pull request
        list, 401 and 403 errors, the OAuth redirect not returning to the IDE, and
        missing inline comments all have known fixes.</step>
    <step>Update to the latest plugin version (<ui-path>Settings | Plugins |
        Updates</ui-path>) and check whether it still reproduces.</step>
</procedure>

### What the form asks for

A report without these usually needs a round trip before anything can happen:

- **Plugin version** and **IDE + build number** - from <ui-path>Help | About</ui-path>
- **Operating system**
- **Azure DevOps flavor** - Services (cloud, `dev.azure.com`) or Server (on-prem)
- **How you signed in** - PAT or Microsoft Entra ID
- **Exact steps to reproduce**, and what you expected instead
- **A log snippet** - see [Enabling debug logs](Troubleshooting.md#enabling-debug-logs), then reproduce and collect
  `idea.log`
- **A screenshot**, if the problem is something you can see

> **Never paste a Personal Access Token or an OAuth refresh token into a public issue.**
> The plugin redacts tokens in its own log output, but screenshots, HTTP traces, and the
> output of `git remote -v` can still leak one. Scrub before you post - and if a token
> does slip out, revoke it in Azure DevOps immediately.
>
> The same applies to private repository names, internal server URLs, and colleagues'
> email addresses. Redact them; they're almost never needed to reproduce a bug.
> {style="warning"}

## Requesting a feature

Good requests start from the problem rather than the solution - that leaves room for a better answer than either of us
had in mind. The [feature form](%new_feature_url%) asks what you're doing today, where it hurts, and what you've tried
instead.

If you're not sure it's a feature request yet, [start a discussion](%discussions_url%),
and it can be shaped into one.

## Security issues

Report vulnerabilities privately by email to
[%support_email%](mailto:%support_email%) with `[SECURITY]` in the subject - not as a public issue. The full policy,
including what's in and out of scope, is in
[SECURITY.md](%tracker_url%/blob/main/SECURITY.md) on the tracker.

In scope: anything that could expose a credential, send your code or repository data somewhere it shouldn't go, or let a
crafted Azure DevOps response - a pull request title, a comment body, a pipeline log - execute code or reach the
filesystem. See
[](Privacy-and-Data.md) for what the plugin sends whereby design.

## What to expect

%product% is maintained by one person, so triage happens in batches rather than instantly - usually within a week. A
reproducible report with logs always moves faster than one without. Reports that can't be reproduced get a question and
are closed if they go quiet; a closed feature request isn't a rejection of the idea, only of the current scope.
