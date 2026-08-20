# Notifications & Attention

<tldr>
    <p><b>What</b>: balloons, a tool-window badge, and row chips for PRs that need your review or @mention you.</p>
    <p><b>Tune it</b>: <ui-path>Settings | Tools | DevOps Lens | Pull Requests</ui-path>.</p>
</tldr>

The plugin watches for pull requests that need *you* - ones awaiting your review or where someone @mentioned you - and
surfaces them three ways: **balloons**, the **tool-window badge**, and **row chips**.

## Notification balloons

When something needs your attention, a balloon appears in the lower-right with a one-click action:

![A notification balloon for a PR that needs you](notification-balloon.png){ width="720" border-effect="line" thumbnail="true" }

You can be notified about:

| What happened                                                                                             | The balloon's action                          |
|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| A PR where you're **asked to review**                                                                     | **Open pull request**                         |
| A **reviewer vote change** on a PR you authored                                                           | **Open pull request**                         |
| A comment that **@mentions you**                                                                          | **View comment** (lands on the exact comment) |
| A **reply** in a thread you took part in                                                                  | **View comment** (lands on the exact comment) |
| A comment on another PR that **references one of yours** - someone wrote `!` followed by your PR's number | **View comment** (lands on the exact comment) |
| You just pushed a branch that has no PR yet                                                               | **Create a PR**                               |

Several events at once coalesce into one balloon (*"N pull requests need your review"*, *"N pull requests reference
yours"*) whose **Show pull requests** action opens the tool window. Balloons dismiss themselves once you act or after a
moment - there's no button to click to clear them.

## The tool-window badge

The **Pull Requests** stripe icon shows a badge dot while something awaits your review, so you notice without the window
open. (The dot recolors to stay visible when the stripe button is selected.)

## Attention chips on rows

Turn on **attention chips** to see *why* a PR wants you, right in the list:

![Attention chips on pull-request rows](attention-row-chips.png){ width="640" border-effect="line" }

| Chip                 | Meaning                                    |
|----------------------|--------------------------------------------|
| **Review requested** | You're a reviewer who hasn't voted yet.    |
| **Mentions you**     | A comment @mentions you.                   |
| **Replied**          | New activity in a thread you took part in. |

Chips are **off by default**.

<procedure title="Turn on attention chips">
    <step>Open <ui-path>Settings | Tools | DevOps Lens | Pull Requests</ui-path> - see <a href="Settings.md"/>.</step>
    <step>Switch on <b>Show attention markers on pull-request rows</b>.</step>
    <step>Back in the list, hover a chip for the <i>"Why this pull request wants your attention"</i> tooltip.</step>
</procedure>

> **Unread markers** are separate: a blue dot marks PRs with new commits *or* new comment activity, and clears the
> moment you open the PR. Toggle it from the tool-window gear → **Show unread markers**.
> {style="note"}

## Tune what you're notified about

Open <ui-path>Settings | Tools | DevOps Lens | Pull Requests</ui-path>:

| Setting                                                     | Default |
|-------------------------------------------------------------|---------|
| **Notify when I'm asked to review a pull request**          | On      |
| **Notify when someone @mentions me**                        | On      |
| **Notify when my pull request is referenced in another one**| On      |
| **Notify about replies in threads I took part in**          | On      |
| **Notify when a vote changes on my pull requests**          | On      |
| **Offer to create a pull request after I push**             | On      |

![The Azure DevOps settings page: signed-in accounts on top, the notification switches below](version-control.png){ width="720" border-effect="line" thumbnail="true" }

Every switch is per-IDE, not per-project, and takes effect on the next sync - there's nothing to restart.

You can also route the plugin's notification groups (popup / tool window / log-only) in <ui-path>Settings | Appearance
&amp; Behavior | Notifications</ui-path> - see [Settings](Settings.md#notifications).
