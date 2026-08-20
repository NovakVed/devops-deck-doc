# Installation

<tldr>
    <p><b>Install</b>: <ui-path>Settings | Plugins | Marketplace</ui-path> - search <b>DevOps Lens</b> and click <b>Install</b> - no restart needed.</p>
    <p><b>Requires</b>: JetBrains %min_ide_version% or newer (build <code>%min_ide_build%.*</code>).</p>
    <p><b>Then</b>: open a project with an Azure DevOps remote and <a href="Authentication.md">sign in</a>.</p>
</tldr>

%product% brings Azure DevOps pull requests, code review, and pipelines into your JetBrains IDE. This page gets it
installed.

## Supported IDEs

The plugin targets the IntelliJ Platform and runs on any IDE built on it:

- IntelliJ IDEA (Ultimate &amp; Community)
- JetBrains Rider
- PyCharm (Professional &amp; Community)
- WebStorm, PhpStorm, GoLand, RubyMine, CLion, DataGrip, RustRover
- Android Studio (may work; not officially supported)

### Minimum build

The plugin supports **%min_ide_version%** and newer releases of every JetBrains IDE - that is, IDE build
`%min_ide_build%.*` or later.

> **Check your version:** open **About** from the IDE menu and look for a build number starting with `%min_ide_build%`.
> If it's lower, run **Help → Check for Updates** first.
> {style="note"}

## Install the plugin

<tabs>
    <tab title="From IDE Settings">
        <procedure title="Install from IDE Settings">
            <step>Open <ui-path>Settings | Plugins | Marketplace</ui-path> (<shortcut>⌘,</shortcut> on macOS, <shortcut>Ctrl+Alt+S</shortcut> on Windows/Linux).</step>
            <step>Search for <b>DevOps Lens</b>.</step>
            <step>Click <b>Install</b>. The plugin loads right away - no restart needed.</step>
        </procedure>
        <p>Once it's installed, the plugin shows up under <b>Installed</b> as <b>User-installed</b>, enabled:</p>
    </tab>
    <tab title="From Marketplace Webpage">
        <procedure title="Install from the Marketplace webpage">
            <step>Open the <a href="%marketplace_url%">%product% Marketplace page</a>.</step>
            <step>Click <b>Install to IDE</b> and pick your IDE.</step>
            <step>Confirm the installation in the IDE. The plugin loads right away - no restart needed.</step>
        </procedure>
    </tab>
</tabs>

### Verify it worked

Open a project that has an Azure DevOps Git remote, then check:

- The **Pull Requests** stripe icon appears in the left tool-window bar.
- <ui-path>Settings | Tools | DevOps Lens</ui-path> exists.

![The DevOps Lens page under Settings | Tools](version-control.png){ width="720" border-effect="line" thumbnail="true" }

> **Don't see the tool window?** It's hidden when the project has **no Azure DevOps remote**. Run `git remote -v` and
> confirm a URL contains `dev.azure.com` or `visualstudio.com`. See [](Troubleshooting.md).
> {style="note"}

## System requirements {collapsible="true"}

| Component | Minimum                 | Notes                                      |
|-----------|-------------------------|--------------------------------------------|
| IDE build | %min_ide_build%.*       | JetBrains %min_ide_version% or newer       |
| JDK       | 25                      | Bundled with the IDE                       |
| Git       | 2.20+                   | Branch detection and HTTPS auth handoff    |
| OS        | macOS / Windows / Linux | Any platform the IDE supports              |
| Network   | HTTPS to Azure DevOps   | `dev.azure.com` or your self-hosted server |

> **Behind a proxy?** The plugin uses the IDE's own HTTP proxy. Set it once at <ui-path>Settings | Appearance &amp;
> Behavior | System Settings | HTTP Proxy</ui-path> and both Azure DevOps and (HTTP) AI calls inherit it. CLI-based AI
> providers are external binaries and don't route through it.
> {style="note"}

## Required bundled plugins

The plugin **depends on** two IDE-bundled plugins (enabled by default everywhere). If either is disabled, the plugin
won't load - re-enable them in <ui-path>Settings | Plugins | Installed</ui-path>.

<deflist>
    <def title="Git (Git4Idea) - required">
        Branch detection and HTTPS credentials.
    </def>
    <def title="Markdown - required">
        Powers the comment and description editors.
    </def>
    <def title="PDF Viewer - optional, from the Marketplace">
        Only needed to preview PDF files from pull request diffs. Everything else works without it.
    </def>
</deflist>

## Update and uninstall

<procedure title="Update to a newer version">
    <step>Open <ui-path>Settings | Plugins | Installed</ui-path> - offered updates show up there.</step>
    <step>Click <b>Update</b>. The new version loads in place - normally no restart is required.</step>
</procedure>

To uninstall, use the gear icon → **Uninstall**; your stored credentials are removed from the keychain too.

> **No restart required.** %product% is a dynamic plugin - it installs, updates, and uninstalls without an IDE
> restart, and its keyboard shortcuts are wired up per project as soon as it loads. If the IDE still offers a
> restart button, you can skip it.
> {style="note"}

> **Next up:** [](Quick-Start.md) for a one-minute tour, or [](Authentication.md) to sign in.
> To enable summaries and AI review, see [](AI-Features.md).
> {style="tip"}
