# Markdown

<tldr>
    <p><b>Where</b>: every composer - comments, replies, PR descriptions, and the Create-PR form.</p>
    <p><b>Syntax reference</b>: the <b>Markdown is supported</b> link on the composer's bottom row opens Microsoft's
       Azure DevOps Markdown guidance.</p>
</tldr>

Everything you write in the plugin is **Azure DevOps-flavored Markdown**, and everything you read is rendered by the
plugin itself - the same pipeline for a posted comment, a thread reply, the **Preview** tab and a PR description, so
what you preview is what gets posted.

## The syntax link on every composer

The composer's bottom row carries a muted **Markdown is supported** link, left of **Add files**:

<deflist>
    <def title="It opens Microsoft's guidance, not GitHub's">
        Clicking it opens
        <a href="https://learn.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops">Syntax
        guidance for basic Markdown usage</a> in your browser - the reference that actually applies to what you are
        typing. The two flavors differ where it matters: Azure DevOps has its own image-sizing extension, its own emoji
        set, and a set of constructs it keeps for wikis (see <a anchor="wiki-only">below</a>).
    </def>
    <def title="It stays in both Write and Preview">
        It describes the field, not the mode - and Preview is exactly where you go to check how something rendered.
    </def>
    <def title="It yields its width first">
        The composer's bottom row is responsive. On a narrow surface - half of a side-by-side diff, a squeezed tool
        window - the link drops to its icon and then disappears entirely, before <b>Add files</b> gives up its own
        label. The submit buttons never shrink, so <b>Comment</b> / <b>Reply</b> stays clickable at any width. Nothing
        is lost when the link goes: it is a shortcut to documentation, and the same page is one click away in your
        browser.
    </def>
</deflist>

## What renders

| Syntax                | What you type                                       | Notes                                                                                     |
|-----------------------|-----------------------------------------------------|-------------------------------------------------------------------------------------------|
| **Headings**          | `# H1` … `###### H6`                                | The space after the `#` is optional - `#Heading` works too. See the [note below](#hash). |
| **Emphasis**          | `**bold**`, `_italic_`, `~~strikethrough~~`         | Nested emphasis inside a strikethrough is kept.                                            |
| **Lists**             | `-` / `*` / `1.`, indented for nesting              |                                                                                             |
| **Task lists**        | `- [ ] open`, `- [x] done`                          | Rendered as ☐ / ☑ glyphs. They show state; they are not clickable checkboxes.              |
| **Tables**            | Pipe-separated cells, with a `---` separator row    | Drawn with real cell borders.                                                              |
| **Links**             | `[text](url)`, bare URLs, `[text](#anchor)`         | Only `http`, `https`, and `mailto` links open; other schemes are ignored, not launched.    |
| **Images**            | `![alt](url)`, `![alt](url =500x250)`               | Azure's `=WxH` suffix is accepted; the image scales to the column width either way.        |
| **Code**              | `` `inline` `` and ``` ``` ``` fenced blocks        | Fenced blocks get real IDE highlighting - see [below](#code-blocks).                       |
| **Blockquotes**       | `> quoted`                                          | What **Quote reply** inserts for you.                                                       |
| **Horizontal rules**  | `---`                                               |                                                                                             |
| **Emoji**             | `:tada:`, `:+1:`, `:rocket:`                        | Around 270 common shortcodes. Unknown ones stay as typed; `\:tada:` escapes one.            |
| **Escaping**          | `\*not italic\*`                                    |                                                                                             |

> `$a^2 + b^2$` math is shown as a **code span** rather than typeset. Azure DevOps renders it with a browser math
> engine, which the IDE's rendering panes have no equivalent for - so the formula is shown as its source instead of
> being silently dropped into prose.
> {style="note"}

## References to people and work

Three reference forms are Azure DevOps' own, and all three autocomplete as you type:

| Type | Inserts               | Renders as                                                              |
|------|-----------------------|-------------------------------------------------------------------------|
| `@`  | `@<user>`             | Their display name, clickable for an author card.                       |
| `#`  | `#1234`               | A link to that work item, opened in Azure Boards in your browser.       |
| `!`  | `!567`                | A link to that pull request, opened in the IDE.                         |

See [](Discussions-and-Comments.md#work-items) for the pickers behind them.

### `#1234` work-item references {id="hash"}

`#` followed by a work-item ID is
[Azure DevOps' work-item reference](https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/add-link?view=azure-devops)
— the same token the `#` picker inserts, and the same one the Azure DevOps web UI understands in a pull request
description. Write `Fixes #1234` in a comment or description and `#1234` renders as a link that opens the work item in
Azure Boards.

> **A line-leading `#1234` is a reference, not a heading.** `#` followed by digits is read as a work-item reference
> even at the start of a line, so `#404 Not found` links work item 404. To write a heading whose text starts with a
> number, use the standard spaced form — `# 404 Not found`. Letter-initial tight headings (`#Overview`) are unaffected.
> {style="note"}

Two things this does **not** do, both worth knowing:

- **Rendering a reference is not the same as linking the work item.** The link in the **Work items** row of the PR
  sidebar (and the **Work items** field on the Create form) is what creates the association Azure Boards tracks. Typing
  `#1234` into a description gives you a clickable reference; it does not populate that row from the IDE.
- **Commit messages are the server's business.** Azure DevOps creates the work-item link when you *push* a commit whose
  message contains `#1234` — see [](Git-Integration.md#commit-refs). The plugin neither adds nor rewrites those
  references.

## Code blocks {id="code-blocks"}

Tag a fence with a language and the block is rendered with **the IDE's own syntax highlighting** - the same colors that
file type gets in the editor:

````
```kotlin
fun greet(name: String) = "Hello, $name"
```
````

The rendered block sits in native IDE code-block chrome and carries a small badge at its top-right: the language name at
rest, a **Copy code** button while the pointer is anywhere over the block. In the composer, fenced blocks are
highlighted **as you type**, before you ever switch to Preview.

A ```` ```suggestion ```` block is a code block with a job: it renders as a **Suggested change** card the author can
apply in one click. See [Suggested edits](Discussions-and-Comments.md#suggested-edits).

## Autocomplete while you type

The composer completes five things inline. Type the trigger after a space, keep typing to narrow the list, and pick with
the arrow keys and <shortcut>Enter</shortcut>:

| Trigger      | Completes                                                                                              |
|--------------|--------------------------------------------------------------------------------------------------------|
| `@`          | People in your organization.                                                                            |
| `#`          | Work items. Inserts `#<id>`, which renders as a [Boards link](#hash).                                  |
| `!`          | Pull requests.                                                                                          |
| `:`          | Emoji shortcodes. Inserts the shortcode (`:tada:`), which is what Azure DevOps stores.                  |
| ```` ``` ```` | Code-fence languages, drawn from the file types your IDE actually has - each row with its own icon.    |

> A bare `:` or a time like `10:30` never opens the emoji list, and a bare ``` (usually a *closing* fence) never opens
> the language list.
> {style="tip"}

## What Azure DevOps keeps for wikis {id="wiki-only"}

Microsoft's guidance covers wikis, PR comments, and other surfaces in one page, and marks which syntax works where.
These are **wiki-only** - Azure DevOps does not render them in pull-request comments either, so neither does the plugin:

- `[[_TOC_]]` tables of contents
- Mermaid diagrams
- Collapsible `:::` sections
- Embedded video
- Azure Boards query results
- Raw HTML tags

## Where Markdown shows up

<deflist>
    <def title="Comments and replies">
        In the diff, in the timeline, and in the editor overlay. See <a href="Discussions-and-Comments.md"/>.
    </def>
    <def title="Pull request descriptions">
        The Create-PR form's description box is the same composer, so a repository's Markdown PR template loads with its
        formatting intact. See <a href="Pull-Requests.md"/>.
    </def>
    <def title="AI-written text">
        AI summaries, reviews, and generated PR descriptions are Markdown too, and render through the same pipeline. See
        <a href="AI-Features.md"/>.
    </def>
    <def title="Pipeline summaries">
        Markdown published by a pipeline extension (a SonarQube quality gate, for instance) renders on the run's
        <b>Extensions</b> tab. See <a href="Pipelines.md"/>.
    </def>
</deflist>
