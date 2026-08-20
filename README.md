# DevOps Lens - Documentation

User-facing documentation for **DevOps Lens**, a JetBrains IDE plugin for Azure DevOps.

- **Live site**: <https://novakved.github.io/devops-lens-doc/>
- **Plugin (Marketplace)**: <https://plugins.jetbrains.com/plugin/com.vednovak.devops>
- **Plugin source**: lives in a separate repository.

## What's in this repo

- [`Writerside/`](Writerside/) - Writerside source for the published documentation site.
- [`Writerside/README.md`](Writerside/README.md) - the authoring guide (folder layout, build instructions, contribution tips).
- [`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml) - builds the site with JetBrains' Writerside Docker action and publishes to GitHub Pages on every push to `main` that touches `Writerside/**`.

## Filing issues

- **Documentation bugs** (typos, missing pages, unclear instructions, broken links) - file them here.
- **Plugin bugs** (crashes, wrong behavior, feature requests for the plugin itself) - file them on the plugin's public issue tracker: <https://github.com/NovakVed/devops-lens-issues>.

## Editing

See [`Writerside/README.md`](Writerside/README.md). The short version: install the [Writerside plugin](https://plugins.jetbrains.com/plugin/20158-writerside) in IntelliJ, open [`Writerside/writerside.cfg`](Writerside/writerside.cfg), edit any `.md` file under `topics/`, and the preview panel updates live.

Pushes to `main` rebuild and republish automatically.

## License

Documentation © Vedran Novak. All rights reserved. See the [Proprietary License Notice](LICENSE.md). The Plugin itself
is governed by its [End User License Agreement and Terms of Use](Writerside/topics/Terms-of-Service.md).
