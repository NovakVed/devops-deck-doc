# インストール

<tldr>
    <p><b>インストール</b>: <ui-path>Settings | Plugins | Marketplace</ui-path> - <b>DevOps Lens</b> を検索して <b>Install</b> をクリックします - 再起動は不要です。</p>
    <p><b>必要なもの</b>: JetBrains %min_ide_version% 以降 (ビルド <code>%min_ide_build%.*</code>)。</p>
    <p><b>次に</b>: Azure DevOps リモートを持つプロジェクトを開いて<a href="Authentication-ja.md">サインイン</a>します。</p>
</tldr>

%product% は、Azure DevOps のプルリクエスト、コードレビュー、パイプラインを JetBrains IDE
に取り込むプラグインです。このページではそのインストール方法を説明します。

## サポート対象の IDE

このプラグインは IntelliJ Platform を対象としており、その上に構築された任意の IDE で動作します。

- IntelliJ IDEA (Ultimate &amp; Community)
- JetBrains Rider
- PyCharm (Professional &amp; Community)
- WebStorm、PhpStorm、GoLand、RubyMine、CLion、DataGrip、RustRover
- Android Studio (動作する場合がありますが、正式にはサポートされていません)

### 最小ビルド

このプラグインは、すべての JetBrains IDE の **%min_ide_version%** 以降のリリース - つまり IDE ビルド `%min_ide_build%.*`
以降 - に対応しています。

> **バージョンの確認:** IDE メニューから **About** を開き、`%min_ide_build%` で始まるビルド番号を探します。それより低い場合は、まず
> **Help → Check for Updates** を実行してください。
> {style="note"}

## プラグインをインストールする

<tabs>
    <tab title="IDE の設定から">
        <procedure title="IDE の設定からインストールする">
            <step><ui-path>Settings | Plugins | Marketplace</ui-path> を開きます (macOS では <shortcut>⌘,</shortcut>、Windows/Linux では <shortcut>Ctrl+Alt+S</shortcut>)。</step>
            <step><b>DevOps Lens</b> を検索します。</step>
            <step><b>Install</b> をクリックします。プラグインはすぐに読み込まれます - 再起動は不要です。</step>
        </procedure>
        <p>インストールが完了すると、プラグインは <b>Installed</b> の <b>User-installed</b> に有効な状態で表示されます。</p>
    </tab>
    <tab title="Marketplace のウェブページから">
        <procedure title="Marketplace のウェブページからインストールする">
            <step><a href="%marketplace_url%">%product% の Marketplace ページ</a>を開きます。</step>
            <step><b>Install to IDE</b> をクリックし、使用する IDE を選択します。</step>
            <step>IDE でインストールを確認します。プラグインはすぐに読み込まれます - 再起動は不要です。</step>
        </procedure>
    </tab>
</tabs>

### 正しく動作したか確認する

Azure DevOps の Git リモートを持つプロジェクトを開き、次を確認します。

- 左側のツールウィンドウバーに **Pull Requests** のストライプアイコンが表示される。
- <ui-path>Settings | Tools | DevOps Lens</ui-path> が存在する。

![Settings | Tools の下の DevOps Lens ページ](version-control-ja.png){ width="720" border-effect="line" thumbnail="true" }

> **ツールウィンドウが表示されない場合は?** プロジェクトに **Azure DevOps リモートがない** 場合は非表示になります。
> `git remote -v` を実行し、URL に `dev.azure.com` または `visualstudio.com`
> が含まれることを確認してください。[](Troubleshooting-ja.md)を参照してください。
> {style="note"}

## システム要件

| コンポーネント | 最小要件                | 備考                                       |
|----------------|-------------------------|--------------------------------------------|
| IDE ビルド     | %min_ide_build%.*       | JetBrains %min_ide_version% 以降           |
| JDK            | 25                      | IDE にバンドル                             |
| Git            | 2.20+                   | ブランチ検出と HTTPS 認証の受け渡し        |
| OS             | macOS / Windows / Linux | IDE がサポートする任意のプラットフォーム   |
| ネットワーク   | Azure DevOps への HTTPS | `dev.azure.com` またはセルフホストサーバー |

> **プロキシの背後にある場合は?** このプラグインは IDE 自身の HTTP プロキシを使用します。<ui-path>Settings | Appearance
> &amp; Behavior | System Settings | HTTP Proxy</ui-path> で一度設定すれば、Azure DevOps と (HTTP) AI 呼び出しの両方がそれを継承します。CLI
> ベースの AI プロバイダーは外部バイナリであり、これを経由しません。
> {style="note"}

## 必須のバンドルプラグイン

このプラグインは、IDE にバンドルされている 2 つのプラグイン (どこでもデフォルトで有効) に **依存**
しています。いずれかが無効になっていると、プラグインは読み込まれません。<ui-path>Settings | Plugins | Installed</ui-path>
で再度有効にしてください。

- **Git** (`Git4Idea`) - ブランチ検出と HTTPS 資格情報。
- **Markdown** - コメントと説明のエディターを支えます。

もう 1 つは **オプション**です。

- **PDF Viewer** *(オプション、Marketplace から入手)* - プルリクエストの差分で PDF
  ファイルをプレビューする場合にのみ必要です。それ以外の機能はなくても動作します。

## 更新とアンインストール

<procedure title="新しいバージョンへ更新する">
    <step><ui-path>Settings | Plugins | Installed</ui-path> を開きます - 提供中の更新はここに表示されます。</step>
    <step><b>Update</b> をクリックします。新しいバージョンはその場で読み込まれます - 通常、再起動は不要です。</step>
</procedure>

アンインストールするには、歯車アイコン → **Uninstall** を使用します。保存されている資格情報もキーチェーンから削除されます。

> **再起動は不要です。** %product% は動的プラグインです - IDE を再起動することなくインストール、更新、アンインストールでき、
> キーボードショートカットも読み込みと同時にプロジェクトごとに設定されます。IDE が再起動ボタンを表示しても、スキップして構いません。
> {style="note"}

> **次のステップ:** 1 分間のツアーには[](Quick-Start-ja.md)、サインインには[](Authentication-ja.md)
> を参照してください。要約と AI レビューを有効にするには、[](AI-Features-ja.md)を参照してください。
> {style="tip"}
