# Pipelines

<tldr>
    <p><b>Where</b>: the <b>Pipelines</b> tool window, <shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut>.</p>
    <p><b>Always on</b>: the tool window appears as soon as a repository maps to an Azure DevOps remote.</p>
    <p><b>Start a run</b>: right-click a pipeline → <b>Run Pipeline…</b>.</p>
</tldr>

Browse, run, and review Azure Pipelines without leaving the IDE - a dedicated **Pipelines** tool window with an
interactive stage graph, adaptive run tabs, live job logs, in-IDE approvals, and run-finished notifications.

> Pipelines is **always on** - there's nothing to switch on first, and no master switch to turn it off. The tool
> window appears as soon as a repository maps to an Azure DevOps remote. If you'd rather it stayed quiet, untick
> **Refresh pipeline runs in the background** in [](Settings.md): polling, run notifications and the stripe badge stop
> together, and the window stays there for when you want it.
> {style="note"}

## Pipelines settings

The background-refresh switch and its companion options live at <ui-path>Settings | Tools | DevOps Lens | Pipelines</ui-path>.
Pipelines poll on their own switch and interval, separate from pull requests - so you can watch runs closely without
polling pull requests as often, or the other way round.

| Setting                                                      | What it does                                                                                                                                                                                                                |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Refresh pipeline runs in the background**                  | Polls your runs, which is what the notifications and the stripe badge ride on. Off, nothing arrives on its own. Has its own interval, independent of the pull-request one.                                                   |
| **Notify when a run of mine finishes**              | Fires a balloon when a run you triggered reaches a terminal state. Inert while background refresh is off.                                                                                                                   |
| **Badge the tool-window icon when my runs finish** | Adds a colored dot to the Pipelines stripe icon - red on failure, amber on partial, blue on success - until you open the window. Inert while background refresh is off.                                                     |

> The **Pipelines** stripe icon appears once the project has an **Azure DevOps remote**. It sits on the left, below
> **Pull Requests**, and shares the same account and repository.
> {style="note"}

Open (or focus) the window with <shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut>. On Windows / Linux the
plugin picks the first free combo instead - **hover the stripe icon to see the actual key**. The shortcut is seeded
per project as soon as the plugin loads, so it works right after installing or updating - no restart needed.
See [](Keyboard-Shortcuts.md).

## The Pipelines tool window

The window opens on a **Pipelines** list tab. Title actions (top-right): **New Pipeline…**
(see [Create a pipeline](#create-a-pipeline)) and **Refresh**; the gear menu adds **Switch Account / Repository…**. Runs
start from a definition's context menu or its runs page - see [Run a pipeline](#run-a-pipeline).

![The Pipelines tool window with the runs navigation bar and definitions list](pipelines-tool-window.png){ width="720" border-effect="line" thumbnail="true" }

### Navigate runs

A search bar sits across the top, mirroring the Pull Requests window:

| Control               | What it does                                                                                                                                                          |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Search field**      | Free text - matches name, branch, build number, and who requested the run.                                                                                            |
| **View** chip         | Three scopes - **Recent**, **All**, and **Runs** (default **Recent**).                                                                                                |
| **Status** chip       | Filters by last-run result: **Succeeded**, **Partially succeeded**, **Failed**, **Running**, **Canceled**.                                                            |
| **Filter** quick-menu | Titled **Quick filters**, with a live-indicator badge: **All pipelines**, **Recently run**, **All runs**, **Failed only**, and **Clear filters** once any are active. |

Each **View** scope shows a different body:

| Scope      | Shows                                                                                                                        | Open                                                                                                                                                  |
|------------|------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Recent** | A flat list of pipeline **definitions**, each with its latest-run status icon and a `folder · last run <relative>` subtitle. | Double-click / <shortcut>Enter ↵</shortcut> opens the pipeline's **runs page**; right-click → **Run Pipeline…**.                                      |
| **All**    | Pipeline definitions as a collapsible **folder tree** (`\Team\SubTeam`), with descendant counts.                             | Double-click / <shortcut>Enter ↵</shortcut> a leaf opens its **runs page**; on a folder it toggles expansion; right-click a leaf → **Run Pipeline…**. |
| **Runs**   | A flat, scrollable list of recent **runs**.                                                                                  | Double-click / <shortcut>Enter ↵</shortcut> opens the run.                                                                                            |

Opening a pipeline drills **in place** into its runs page, mirroring Azure web. A breadcrumb bar leads back to the
pipelines list, **View** and **Run Pipeline…** links sit top-right, and the run rows open exactly as they do in the
**Runs** scope.

**View** opens the pipeline's YAML definition in an editor tab. If the pipeline builds the repository your project has
checked out, your local working-tree file opens directly; otherwise the YAML is fetched at the pipeline's default branch
and opens as a read-only snapshot topped by an **Open in Browser** banner. Classic (designer) pipelines have no YAML
file - a balloon says so and offers the pipeline's browser page instead.

### Follow a run's jobs

Opening a run adds a closeable `#<n>` tab - a pure navigator, no logs. Its header is the run status glyph, the pipeline
name, and a clickable `#<run number>` that opens the run in the browser. Below sits the **jobs rail**: a **Summary**
link, an **All jobs** heading, then jobs **grouped under collapsible stage headers**.

Click **Summary** to open the run overview editor, click a **job** to open that job's step logs, and click a **stage
header** to open the stage's [information pane](#stage-information); only the stage's **chevron** collapses the
group. <shortcut>Enter ↵</shortcut> mirrors clicks.

> Long templated build numbers are middle-ellipsized in tab titles - hover the tab for the full run label.
> {style="tip"}

### The stripe badge

When a run **you triggered** finishes and you haven't opened the window, the Pipelines stripe icon gets a colored dot -
**red on failure, amber on partial, blue on success**. It clears when you open or focus the window, and is wiped on an
account or org switch. Gate it with **Badge the tool-window icon when my runs finish**
in [](Settings.md). See [](Notifications-and-Attention.md).

## Open a run's overview

Clicking **Summary** (or a job) opens the **run overview** as a main-editor tab titled with the run label (for example
`#20260101.1`). Re-opening the same run focuses the existing tab.

![A pipeline run overview: header, tabs, and the interactive stage graph](pipeline-run-overview.png){ width="720" border-effect="line" thumbnail="true" }

The header shows the run status icon, the pipeline name and run number, and a muted meta line
(`status • branch • requestedFor • duration`). Right-aligned actions are **Cancel** (while running), **Re-run** (when
terminal, re-queuing on the same source branch), and an **Open in Browser** link. If a stage is waiting on you, an
**approval gate** band sits directly under the header - see [In-IDE approvals](#approvals).

### The interactive stage graph

The **Summary** tab opens on a **Stages** heading and a zoomable, pannable DAG of stage cards. When the server omits
`dependsOn` the graph falls back to job cards or a sequential chain, and disconnected flows are laid into separate
vertical bands.

![The stage graph: stages joined by their dependencies, each showing status and job count](pipeline-stage-graph.png){ width="700" border-effect="line" }

- The zoom toolbar (top-right) has **Zoom out**, **Zoom in**, **Fit to view**, and **Keyboard shortcuts** (opens the `?`
  cheat sheet).
- **Drag** anywhere to pan; the **wheel** zooms around the cursor (fit never zooms past 1.0×).
- Clicking a stage selects it - the card takes the IDE accent border and the editor follows the selection. Cards are
  wired by a **dot-and-bridge** connector: wherever an edge attaches the card outline bulges into a half-circle socket
  with a muted dot seated in it, and a hairline bridge runs between the two sockets.
- Each card's **chevron** expands it to list its jobs and a **Rerun stage** button.
- Clicking a job (or a stage) navigates the editor to that job's step logs.

> Use <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut> to zoom in, out, and fit the graph,
> and <shortcut>?</shortcut> to pop the **Pipeline run shortcuts** cheat sheet.
> {style="tip"}

## The run tabs

**Summary** is the only tab that is always there. Every other tab is added **once the run finishes, and only if the run
actually has that data** - a missing tab simply means the run didn't publish it. Whatever subset appears, the order
after Summary is always **Tests, Extensions, Environments, Code coverage**.

| Tab               | Appears when                                   | What it shows                                                                                                                                              |
|-------------------|------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Summary**       | Always                                         | The stage graph, plus a **Repositories** card (columns **Resource Name, Repository, Branch/Tag, Version, Related**) when the run has repository resources. |
| **Tests**         | The finished run reported test results         | A donut summary and the associated test cases (see below).                                                                                                 |
| **Extensions**    | The finished run published extension summaries | Extension-published Markdown summaries (for example a SonarQube quality gate) as rounded cards.                                                            |
| **Environments**  | The finished run deployed to environments      | A table of **Environment, Last stage, Result, Finished** - **this run's deployments only**, not the project-wide latest-per-environment view.              |
| **Code coverage** | The finished run published coverage            | Per-metric rows, each with a donut (green ≥80%, amber ≥50%, red below) and an `X / Y covered` figure.                                                      |

When a finished run has artifacts, an **Artifacts:** strip at the bottom links each one (opens the download URL in the
browser). Sections that can't load while you're offline say so and load when you reconnect.

### The Tests tab

![The Tests tab: outcome donut, stat blocks, and the filterable results table](pipeline-tests.png){ width="720" border-effect="line" thumbnail="true" }

A **donut** (green **Passed**, red **Failed**, gray **Others**) sits beside stat blocks - **Total tests**, **Pass
percentage**, **Run duration**, and **Tests not reported**. Below it, the **Test results** card carries a filter bar:

- A search box (**Filter by test or run name**); <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> focuses it while
  the Tests tab is showing, and <shortcut>Esc</shortcut> clears it.
- Facet chips - **Test file** and **Owner** (each shown only with two or more distinct values), plus an **Outcome**
  chip. Outcome buckets are **Failed, Aborted, Passed, Not Impacted, Others**, and the default filter is **Failed +
  Aborted**.

The table columns adapt to the data - **Test**, **Owner** (if any), **Duration** (if any), **Outcome** - and are capped
at 300 rows. When a filter hides everything, a **Show all tests** link clears every filter.

## View job logs

Clicking a job (from the jobs rail or a stage card) opens **collapsible step sections**: each header is a chevron,
status icon, step name, and duration; expanding it reveals a numbered, color-coded log rendered in the editor font
(`##[error]` red, `##[warning]` amber, `##[section]` bold, `##[command]` blue, `##[debug]` muted). The failed step
auto-expands, and logs stream in place while the run is live.

Inside a step's log, `##[group]` … `##[endgroup]` markers emitted by tasks become **nested collapsible groups** of their
own - the group header gets a clickable chevron, and line numbers stay stable whether a group is open or collapsed.

![A job's collapsible step logs with color-coded output](pipeline-logs.png){ width="720" border-effect="line" thumbnail="true" }

A slim header bar above the logs has a **← Summary** back-link (tooltip "Back to the run overview (L)"), then the job's
status icon, name, and meta.

> **Search the logs:** press <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> inside a job's logs to open the IDE
> find bar (with a match counter and Case / Words / Regex toggles). <shortcut>Enter ↵</shortcut> and <shortcut>
> ⇧↵</shortcut> walk matches - expanding collapsed steps and scrolling each hit into view - and <shortcut>Esc</shortcut>
> hides the bar.
> {style="tip"}

### Analyze logs with AI {id="analyze-logs-with-ai"}

Once a run has **finished**, an **Analyze logs with AI** bulb button appears at the right end of the job-log header bar.
Clicking it opens an **AI: #&lt;n&gt;** tab in the Pipelines tool window, where your configured AI provider streams an
analysis of the run: for a failed run, the root cause, the evidence in the logs, and suggested fixes; for a successful
run, a short summary of what ran.

Only the relevant parts of the logs are sent - the failing steps' errors with their surrounding context, not whole log
files. The result is kept per run, so closing and re-opening the tab shows it again without a new AI call; the **⟳**
button in the tab runs a deliberately fresh analysis.

This needs an AI provider configured - see [](AI-Features.md). Without one, the button points you at the AI
settings.

## The stage information pane {id="stage-information" collapsible="true"}

Clicking a **stage header** in the jobs rail opens the stage's **information pane** - the IDE's version of Azure web's "
*&lt;stage&gt;* information" view. It's a log-styled page (editor font, numbered gutter) whose sections are
**collapsible groups**:

- **Timing** - queued / started / finished timestamps and the stage duration. For a **running** stage the duration line
  ticks live.
- **Triggered by**, **Commits**, and **Variables** - run-level context, shown once the run's details have loaded.

Lines carry the same semantic coloring as job logs (errors red, warnings amber), and line numbers stay stable as you
collapse and expand groups. The **← Summary** back-link returns to the run overview.

## In-IDE approvals {id="approvals"}

When a stage is gated on a manual approval you're assigned to, an approval band appears under the run header - **one
callout card per pending gate**.

![An approval gate card with the comment field and Approve / Reject buttons](pipeline-approval.png){ width="720" border-effect="line" thumbnail="true" }

Each card shows **Approval needed — &lt;Stage&gt;**, a `N of M approved · in sequence · waiting since <time>` meta line,
the check's instructions, and per-approver rows with their state (**Approved**, **Rejected**, **Reassigned**,
**Pending**). The action row has an optional-comment field (**Add an optional comment…**) and right-aligned **Reject**
and **Approve** buttons, with **Approve** in the primary slot.

> If the run's requester isn't allowed to approve their own run, the buttons are replaced by an explanation and a
> **Review in browser** link. Permission and offline problems surface inline on the card rather than failing silently.
> {style="note"}

## Run a pipeline

Choose **Run Pipeline…** from a definition's right-click menu (or the top-right link on a pipeline's runs page) to open
the **Run Pipeline** dialog. For **YAML pipelines** it's a **two-page wizard** mirroring Azure web's Run panel;
**classic (designer) pipelines** fit on a single page whose primary button is **Run** from the start.

![The Run Pipeline dialog: pipeline and branch pickers, parameters, and variables](run-pipeline-dialog.png){ width="560" border-effect="line" }

<procedure title="Queue a run">
    <step>Right-click a pipeline in the tool window → <b>Run Pipeline…</b>, or use the <b>Run Pipeline…</b> link at the
        top-right of its runs page.</step>
    <step><b>Page 1 - Parameters.</b> Set the <b>Pipeline</b> and <b>Branch</b> pickers - searchable combo boxes:
        <ul>
            <li>Pipeline rows show a name and folder subtitle. When you launch the dialog from a specific pipeline, the
                pipeline picker is omitted.</li>
            <li>Branch rows show short branch names plus an <b>Enter a branch or ref…</b> escape for a custom ref (for
                example <code>main</code> or <code>refs/tags/v1.0</code>). The default branch is pinned first, then
                branches sort newest-commit-first. Branches are enumerated only for Azure Repos pipelines.</li>
        </ul>
    </step>
    <step>Fill in the <b>Parameters</b> section, which renders the YAML's declared <code>parameters:</code> as a typed
        form - a dropdown for <code>values:</code>, a checkbox for booleans, a monospace YAML area for objects, and a
        text field otherwise; required parameters are marked <code>*</code>.</step>
    <step>Click <b>Next: Resources</b> - the primary button on page 1. <b>Back: Parameters</b> returns.</step>
    <step><b>Page 2 - Resources.</b> Set what the run needs:
        <ul>
            <li>A <b>Variables</b> section exposes queue-time-settable definition variables (secrets stay blank to keep
                the stored value).</li>
            <li><b>Stages to run</b> and resource pickers, when the pipeline declares them.</li>
            <li>Two checkboxes: <b>Enable system diagnostics</b> (adds <code>system.debug=true</code>) and <b>Preview
                only (render final YAML, don't queue)</b>.</li>
        </ul>
    </step>
    <step>Queue it. A real run refreshes the list and opens the new run's detail. <b>Preview only</b> instead opens a
        read-only <b>Pipeline Preview — final YAML</b> dialog.</step>
</procedure>

> On a **classic (designer) pipeline** the dialog fits on a single page, so there is no **Next: Resources** step - the
> primary button is **Run** from the start.
> {style="tip"}

> A **paused or disabled** pipeline shows a warning banner in the dialog and can't be queued until it's re-enabled in
> Azure DevOps.
> {style="note"}

## Create a pipeline {id="create-a-pipeline"}

**New Pipeline…** (the **+** in the tool-window title bar) registers a pipeline without leaving the IDE. The dialog
collects:

| Field                       | Notes                                                                                                                                                   |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Repository** / **Branch** | Where the pipeline definition lives.                                                                                                                    |
| **Type**                    | **YAML file in the repository** or **Classic — empty designer pipeline**. Classic pipelines are created empty - add tasks in the Azure DevOps designer. |
| **YAML file**               | The `.yml` to register (YAML type only).                                                                                                                |
| **Agent pool**              | The pool new runs queue on.                                                                                                                             |
| **Name** / **Folder**       | Display name and an optional pipeline folder, for example `\Team\CI`.                                                                                   |

The OK button reads **Create**. On success a balloon confirms the new pipeline and offers **Run pipeline** to queue its
first run. Works against both Azure DevOps Services and on-prem Azure DevOps Server (older servers are handled
automatically).

## YAML completion and validation

Pipeline YAML gets full schema support right in the editor: `azure-pipelines.yml` and its `azure-pipelines-*` variants,
any YAML file under a `.azuredevops/` or `.azure-pipelines/` folder, and any YAML file one of your project's pipelines
points at - custom names included. While signed in, the schema comes from your own organization, so completion knows
exactly the tasks installed there; signed out, Microsoft's public Azure Pipelines schema steps in. It works regardless of
the background-refresh switch.

- **Code completion** for stages, jobs, steps, tasks, and their properties as you type.
- **Validation** that highlights unknown keys, misplaced sections, and invalid values.
- **Quick documentation** for pipeline keywords on hover.

## Run-finished notifications

When a run **you triggered** reaches a terminal state, a balloon appears titled `<pipeline> <run#> <verb>` (succeeded /
partially succeeded / failed / was canceled), with the branch in the body. The balloon is deduped per run and outcome,
and gated on both **Refresh pipeline runs in the background** and **Notify when a run of mine finishes**. Its **Open run** action opens
the run detail in the IDE. See [](Notifications-and-Attention.md).

![A run-finished notification balloon with the Open run action](run-finished-notification.png){ width="720" border-effect="line" thumbnail="true" }

## Open a PR's pipeline check in the IDE

Clicking **Details…** on a pull request's pipeline CI check opens that run **inside the IDE**, jumping straight to the
relevant job's logs - the deep-linked job if the URL names one, otherwise the first failed or running job. In-progress
checks paint the Pipelines blue "waiting" disc. A check whose details link isn't an Azure Pipelines run opens in the
browser like any other status.

## Keyboard shortcuts {collapsible="true"}

The run overview has its own in-view keys, active while it's focused. Press <shortcut>?</shortcut> (or the **?** button
on the stage-graph toolbar) for the same list. They aren't in Keymap and can't be rebound.

| Action                                  | Shortcut                                                                 |
|-----------------------------------------|--------------------------------------------------------------------------|
| **View logs / back** to the stage graph | <shortcut>L</shortcut>                                                   |
| **Previous / next tab**                 | <shortcut>[</shortcut> / <shortcut>]</shortcut>                          |
| **Zoom in / out / fit** the stage graph | <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut> |
| **Open this run in the browser**        | <shortcut>B</shortcut>                                                   |
| **Filter tests** (Tests tab)            | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>                    |
| **Show this list**                      | <shortcut>?</shortcut>                                                   |

> Inside a job's **logs**, <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> opens the log search bar instead. The
> full plugin shortcut reference lives in [](Keyboard-Shortcuts.md).
> {style="note"}

> **Next up:** tune what fires in [](Notifications-and-Attention.md), or review every
> plugin setting in [](Settings.md).
> {style="tip"}
