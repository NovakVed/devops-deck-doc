# Statistics

<tldr>
    <p><b>Where</b>: the <b>Pull Request Statistics</b> (chart) icon in the tool-window toolbar.</p>
    <p><b>Data</b>: computed from already-synced PRs - opens instantly, no extra API calls.</p>
</tldr>

A dedicated editor tab that turns your PR history into KPIs and charts - no custom Azure DevOps queries, no leaving the
IDE.

![The Pull Request Statistics dashboard](statistics.png){ width="720" border-effect="line" thumbnail="true" }

> **Computed from cached data, not live polling.** Statistics use whatever the tool window has already fetched - opening
> the panel is instant and makes no extra API calls. The numbers update as background sync brings new data in.
> {style="note"}

## Open it

Click the **Pull Request Statistics** (chart) icon in the tool-window toolbar, or run *Find Action* → **Pull Request
Statistics**. The tab opens in the editor area; **Refresh statistics** recomputes it.

A subtitle under the header states the scope every number below it shares - `128 PRs · Last 30 days`.

## KPI tiles

A row of headline numbers across the top:

| KPI                                                     | Meaning                                                                           |
|---------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Created** · **Merged** · **Abandoned** · **Open now** | PR counts in the window                                                           |
| **Merge rate**                                          | Share of resolved PRs that merged                                                 |
| **Median merge (h)**                                    | Typical hours from creation to completion, with an **avg N h** subtext underneath |
| **Approval rate**                                       | Share of reviewer votes that were Approved (incl. with suggestions)               |
| **First response (h)**                                  | Median hours to the first non-author comment                                      |

> Time-based KPIs use the **median**, not the average - a couple of week-long stragglers shouldn't skew the typical-PR
> number. Where an average is shown, it's labeled.
> {style="note"}

> **First response is sampled.** It's the one KPI that needs each PR's comment threads, so the plugin fetches them for
> the **60 most recent** PRs in the window and derives the median from those. Everything else is computed from the full PR
> list. Hover the tile to see what it actually used: *Median hours from PR creation to first non-author comment. Sampled
over the N most recent PRs* - and note that **N** counts only the sampled PRs that got a non-author comment at all, so a
> quiet window reports a smaller sample.
> {style="warning"}

## Charts

The charts are grouped into three sections:

| Section             | Charts                                                                                                            |
|---------------------|-------------------------------------------------------------------------------------------------------------------|
| **Workload**        | *Top creators*, *Top reviewers*, *Top commenters*, *Reviewer × Author* collaboration                              |
| **Process health**  | *Vote distribution*, *Time to merge*, *PR status*, *Open PR aging*, *PR cycle time (days)*, *PRs merged per week* |
| **Where work goes** | *Target branches*, *Day-of-week activity*, *Daily activity*                                                       |

### Reading a chart

<deflist>
    <def title="Hover a bar">
        Shows its name and PR count. Weekly bars name the bucket - <i>Week of Mar 3</i>. On the author charts, hovering
        the avatar opens that person's identity card.
    </def>
    <def title="Donut legends">
        List one row per slice with its count (and its share, when the card is wide enough). When more slices exist than
        the legend has room for, the last row reads <b>+N more</b> - the hidden slices are still in the ring and still
        counted.
    </def>
    <def title="A donut's center">
        Labels what it's counting: <code>votes</code> for <i>Vote distribution</i>, <code>PRs</code> for <i>PR
        status</i>.
    </def>
</deflist>

## Filter and scope

A sticky header scopes every metric at once:

| Control                                     | What it does                                                  |
|---------------------------------------------|---------------------------------------------------------------|
| **Window**                                  | Last 7 days, 30 days, 90 days, 6 months, 1 year, or All time. |
| **Author**, **Reviewer**, **Target branch** | Narrow to specific people or branches.                        |
| **Clear filters**                           | Reset to the defaults.                                        |

## Caveats {collapsible="true"}

> **Local view only.** Statistics cover the PRs your account can see. Repositories you don't have access to aren't
> counted.
> {style="warning"}

> **There's a ceiling.** The dashboard reads at most **2,000** pull requests. On a busy repository an **All time**
> window will quietly stop there, so the widest windows are the least complete. Narrow the window - or the author /
> target-branch filters - when you need numbers you can trust.
> {style="warning"}

This isn't a replacement for Azure DevOps Analytics - it's quick, in-editor signal. For org-wide reporting, use the
Analytics service in Azure DevOps directly.
