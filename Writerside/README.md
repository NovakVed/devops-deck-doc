# DevOps Lens - Documentation

This folder contains the user-facing documentation, authored with [Writerside](https://www.jetbrains.com/writerside/).
On every push to `main`, GitHub Actions builds the site and publishes it to GitHub Pages.

## Folder layout

```
Writerside/
├── writerside.cfg          Project manifest (registers all four instances)
├── azd.tree                Table of contents, English (instance: "azd")
├── azd-zh.tree             TOC, 简体中文 (topics suffixed -zh)
├── azd-ja.tree             TOC, 日本語 (topics suffixed -ja)
├── azd-ko.tree             TOC, 한국어 (topics suffixed -ko)
├── v.list                  Variables (product name, repo URL, etc.)
├── c.list                  Categories
├── SCREENSHOTS.md          Shot list for replacing the placeholder images
├── topics/                 Markdown content - one .md per page and language
├── images/                 Logo + screenshots referenced from topics
└── cfg/
    ├── buildprofiles.xml   Theme color, web root, footer links
    └── build-groups.xml    "languages" build group → GitHub Pages paths
```

Every English topic has `-zh`, `-ja`, and `-ko` siblings, and each language has its own `.tree` — adding a page means 4
topic files plus 4 tree entries.

## Author locally with IntelliJ

1. Install the [Writerside plugin](https://plugins.jetbrains.com/plugin/20158-writerside) in IntelliJ IDEA (or open the
   project in [Writerside](https://www.jetbrains.com/writerside/) standalone).
2. Open this repo and double-click `Writerside/writerside.cfg`.
3. Edit any `.md` file under `topics/` - the preview panel updates live.
4. The plugin checks broken links, missing topics, and snippet references as you type.

## Author with any text editor

The topics are plain Markdown - you can edit them in any editor. Writerside-specific extensions used:

| Extension   | Syntax                                                |
|-------------|-------------------------------------------------------|
| Admonitions | `> ...\n> {style="note"}` (also `tip`, `warning`)     |
| Procedures  | `<procedure title="..."><step>...</step></procedure>` |
| Tabs        | `<tabs><tab title="...">...</tab></tabs>`             |
| Keyboard    | `<shortcut>⌘⇧M</shortcut>`                            |
| UI path     | `<ui-path>Settings \| Plugins</ui-path>`              |
| Variables   | `%product%`, `%repo_url%` (defined in `v.list`)       |
| Anchors     | `## Heading {id="custom-anchor"}`                     |

Full reference: [Writerside Markdown syntax](https://www.jetbrains.com/help/writerside/markdown.html).

## Add a new page

1. Create `topics/Your-Page.md` — plus `Your-Page-zh.md`, `Your-Page-ja.md`, and
   `Your-Page-ko.md` for the translated instances.
2. Add an entry to `azd.tree` (and the matching suffixed entry to each of
   `azd-zh.tree`, `azd-ja.tree`, `azd-ko.tree`):
   ```xml
   <toc-element topic="Your-Page.md"/>
   ```
3. Reference it from another page: `[Your Page](Your-Page.md)`.

## Build locally (without IntelliJ)

The CI workflow runs JetBrains' Docker-based builder against the `languages`
build group (all four instances). To reproduce a single-language build locally (Linux or Intel macOS):

```bash
docker run --rm \
  -v "$(pwd):/opt/sources" \
  jetbrains/writerside-builder:2026.06.8817 \
  /bin/bash -c '
    /opt/builder/bin/idea.sh helpbuilderinspect \
      -source-dir /opt/sources \
      -product Writerside/azd \
      -runner-output-dir /opt/sources/output \
      -output-dir /opt/sources/output
  '
```

The static site appears at `output/`.

> **Apple Silicon caveat**: the `jetbrains/writerside-builder` image only ships an `linux/amd64` build, and the embedded
> JCEF (Chrome) browser used by the builder crashes under Rosetta/QEMU emulation on M-series Macs. On Apple Silicon,
> preview locally with the **Writerside IntelliJ plugin** (which runs natively on the JVM) and rely on CI for the final
> build. The CI runners are amd64-native and work fine.

## Deployment

Configured in `.github/workflows/deploy-docs.yml`. Triggers on any push to `main` touching `Writerside/**`. On first
run, set GitHub Pages source to **GitHub Actions** in repo Settings → Pages.

Live site: https://novakved.github.io/devops-lens-doc/ (translations at `/zh`, `/ja`, `/ko`).

## Editing tips

- The first `#` heading in a Markdown file becomes the page title - don't add a separate `title:` frontmatter.
- File names with spaces aren't supported by Writerside - use kebab-case or PascalCase: `Quick-Start.md`,
  `Authentication.md`.
- Cross-page anchors: `[Link](Other-Page.md#section-id)` where the section id is auto-slugified from the heading text
  (override with `{id="custom"}`).
- Variables in `v.list` are referenced as `%var-name%` and resolved at build time.
