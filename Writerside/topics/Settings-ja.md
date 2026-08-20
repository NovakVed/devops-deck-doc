# 設定

<tldr>
    <p><b>場所</b>: <ui-path>Settings | Tools | DevOps Lens</ui-path> - <shortcut>⌘,</shortcut> / <shortcut>Ctrl+Alt+S</shortcut> で Settings を開きます。</p>
    <p><b>サブページ</b>: <b>Navigation</b>、<b>Pull Requests</b>、<b>Pipelines</b>、<b>AI Settings</b>、<b>Experimental</b>。</p>
    <p><b>スコープ</b>: アプリケーションレベル。ただし既定のアカウント、PR リストのフィルター、およびプロジェクトごとに保存されるいくつかのその場のトグルは除きます。</p>
</tldr>

プラグインが公開するすべての設定のリファレンスです。

**DevOps Lens は 6 つのページからなるツリーです。** 最初に開くページには、サーバーへの接続に必要なものだけ
（アカウントと、その背後にある Azure CLI のパス）があります。接続後に調整する項目は、更新の頻度や通知の内容も含めて、
それぞれの機能のサブページ - **Navigation**、 **Pull Requests**、 **Pipelines**、 **AI Settings**、 **Experimental** -
にまとまっています。

## Tools → DevOps Lens

ルートページです。上部には **accounts** パネル（追加 **+**、編集 ✏、削除
✕、プロジェクトごとの既定）があります。[](Authentication-ja.md)を参照してください。

![DevOps Lens 設定ページの accounts パネル](accounts-panel-ja.png){ width="700" border-effect="line" }

- **Azure CLI executable** - *Azure CLI でサインイン* が使う `az` のパスです。**既定は空**（自動検出）。空のままなら `PATH`
  または既定のインストール場所から探します。隣の **Detect** ボタンはその検索をその場で実行し、結果をフィールドに書き込むので、
  適用する前に何が見つかったかを確認できます。

## Tools → DevOps Lens → Navigation {id="page-navigation"}

IDE の中から Azure DevOps 上のものを *探す* 方法を設定します。機能ごとのセクションではなく 1 つのページなのは、
メインのスイッチが両方の **Go to** アクションにまたがるためです。

| 設定                                                                 | 既定 |
|----------------------------------------------------------------------|------|
| **Show Go to Pull Requests and Go to Pipeline in Search Everywhere** | オフ |
| **Find the pull request behind a line of code**                      | オン |

1 つ目は **Go to Pull Requests**（<shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>）と
**Go to Pipeline**（<shortcut>⌥⇧P</shortcut> / <shortcut>Alt+Shift+P</shortcut>）の開き方を制御します。オフ（既定）の間は、
どちらのアクションもプラグイン自身のクイックピックダイアログを開きます。 **Pull Requests** タブと **Pipelines** タブを備えた
1 つのウィンドウで、押したショートカットに対応するタブが最初に表示されます。オンにすると、両方のアクションは代わりに
Search Everywhere を開き、Files / Symbols / Actions の隣に **Pull Requests** タブと **Pipelines** タブが並びます。1
つのスイッチで両方のアクションをまとめるのは意図的です。ダイアログは 1 つのウィンドウなので、「Search Everywhere
かダイアログか」も 1 つの判断だからです。

2 つ目は、エディターの **Open In** メニューに **Find Pull Request** を、 **Copy / Paste Special** に **Copy Pull Request
URL for Line** を、行番号ガターの右クリックメニューに **Annotate with Pull Requests**
を追加します。[](Find-Pull-Requests-From-Code-ja.md)を参照してください。

> 対象はこの 3 つの**行**アクションだけです。Git ビューのコミット項目 - **Open Commit in Azure DevOps**、**Copy Azure DevOps Commit
> Link**、**Find Related Pull Requests** - に設定はなく、コミットが Azure DevOps リポジトリのものであれば常に表示されます。[Git
> ビューでのコミットアクション](Git-Integration-ja.md#commit-actions)を参照してください。
> {style="note"}

## Tools → DevOps Lens → Pull Requests {id="page-pull-requests"}

### Review

| 設定                                                       | 既定           |
|------------------------------------------------------------|----------------|
| **Mark files as viewed when I open their diff**            | オフ           |
| **Show a "files viewed" counter above the changes tree**   | オフ           |
| **Show attention markers on pull-request rows**            | オフ           |
| **Show the submit shortcut on comment buttons**            | オン           |
| **Lines shown above a comment**                            | 3（範囲 0–50） |
| **Lines shown below a comment**                            | 3（範囲 0–50） |

ショートカットヒントのトグルは、コンポーザーの **Comment** / **Reply** / **Save**
ボタンのラベルのすぐ前に送信ショートカット（<shortcut>⌘↵</shortcut> / <shortcut>Ctrl+Enter</shortcut>
）を表示します。ショートカットはどちらの状態でも機能します。これはヒントを表示するだけです。2 つの **コンテキスト行**
スピナーは、レビュースレッドの差分スニペットにおいて、コメントされた行の周囲にタイムラインが表示するコードの量を制御します。
どちらかを 0 にすると、その側のコンテキストは表示されません。

> **Show unread markers** はここにはありません。設定のチェックボックスではなく、ツールウィンドウのトグル（ギアメニュー）です。ドラフトは設定ではなく、リストの
> **フィルター**です。
> {style="note"}

### Background refresh & notifications {id="pr-background-refresh-notifications"}

| 設定                                                         | 既定               |
|--------------------------------------------------------------|--------------------|
| **Refresh pull requests in the background**                  | オン               |
| **Refresh every (seconds)**                                  | 60（範囲 15–3600） |
| **Notify when I'm asked to review a pull request**           | オン               |
| **Notify when someone @mentions me**                         | オン               |
| **Notify when my pull request is referenced in another one** | オン               |
| **Notify about replies in threads I took part in**           | オン               |
| **Notify when a vote changes on my pull requests**           | オン               |
| **Offer to create a pull request after I push**              | オン               |

**Refresh pull requests in the background** をオフにすると、PR リストの同期と開いているプルリクエストの更新が停止します。
以降、プルリクエストについて自分から操作しない限り Azure DevOps に接続しません。プルリクエストを開く・更新する・投票する・
コメントするといった操作はそのまま使えます。従量課金の回線や、アイドル状態の IDE にポーリングされたくないオンプレミス
サーバーで役立ちます。

**このグループの通知はすべて同じポーリングに依存している** ため、オフの間は無効化されます。変更に気付く仕組みがなければ
バルーンも出せないからです。唯一の例外は **Offer to create a pull request after I push** で、ポーリングではなく自分の
`git push` をきっかけに動くため、どちらの状態でも機能します。

*参照* とは、別のプルリクエストのコメントに `!` に続けてあなたの PR
番号が書かれることを指します。これらが何を制御するかについては、[](Notifications-and-Attention-ja.md)を参照してください。

> パイプラインは[専用のページ](#page-pipelines)で、独自のスイッチと間隔でポーリングします。両者を独立させているのは
> 意図的です。30 秒ごとに見たい実行一覧と、5 分で十分な PR 一覧は別物だからです。
> {style="note"}

## Tools → DevOps Lens → Pipelines {id="page-pipelines"}

Pipelines は常に有効です。リポジトリが Azure DevOps のリモートに対応した時点でツールウィンドウが表示されます。ここで調整
できるのは、実行をどのくらいの頻度でポーリングするかと、何を通知するかです。[](Pipelines-ja.md)を参照してください。

### Background refresh & notifications {id="pipeline-background-refresh-notifications"}

| 設定                                               | 既定               |
|----------------------------------------------------|--------------------|
| **Refresh pipeline runs in the background**        | オン               |
| **Refresh every (seconds)**                        | 60（範囲 15–3600） |
| **Notify when a run of mine finishes**             | オン               |
| **Notify when a run waits for my approval**        | オン               |
| **Badge the tool-window icon when my runs finish** | オン               |

パイプラインはプルリクエストとは別に独自のバックグラウンド更新を持ちます。そのため、プルリクエストの頻度を上げずに実行だけを
細かく監視する（またはその逆）ことができます。通知とストライプのバッジはいずれもこのポーリングに依存しているため、オフの間は
無効化されます。

### YAML スキーマ

**Extra YAML locations** はこのページの他のどの設定からも独立しています。パイプライン YAML
の補完と検証は、ツールウィンドウの表示有無にも、バックグラウンド更新のオン / オフにもかかわらず機能します。リポジトリのルートからの相対パスをセミコロン区切りで指定します。
フォルダーを指定するとその配下のすべての YAML ファイルが対象になり、グロブパターンは特定のファイルにマッチします。これらは組み込みの規則
（`azure-pipelines*` というファイル名、`.azuredevops` / `.azure-pipelines` / `.pipelines`
フォルダー、接続中のリポジトリのパイプライン定義がビルドするファイル）に加えて適用されます。

## Tools → DevOps Lens → AI Settings {id="page-ai-settings"}

オプションの AI ヘルパーを設定するサブページです。[](AI-Features-ja.md)を参照してください。

![AI Settings ページ](ai-settings-ja.png){ width="720" border-effect="line" thumbnail="true" }

- **General AI Settings → Enable AI assistance** - マスタースイッチです。 **既定はオン**
  ですが、プロバイダーを追加して有効化するまでは何も起こりません。使用可能なプロバイダーがない場合、プラグインは外部への AI
  呼び出しを一切行わず、AI の各機能は代わりにこのページへ案内します。スイッチをオフにすると、すべての AI 機能が非表示になります。
- **General AI Settings → AI response language** - モデルが要約、コードの説明、レビューノート、パイプラインログ分析を書く
  言語です。 **Auto** は IDE の言語に従います。自分で書いたテキストの推敲は、常に書いた言語のまま保たれます。その下のチェック
  ボックス **Also use this language for PR titles, descriptions, and commit messages** は独立したオプトインで、 **既定はオフ**
  です。PR のタイトル・説明・コミットメッセージは git の履歴とプルリクエスト上に残るもので、IDE の言語よりチームの慣習が
  重要だからです。IDE 内で読むものは、どちらの場合もドロップダウンに従います。
- **AI Providers** - プロバイダーインスタンスごとに 1 行（ **Provider / Model / Enabled**）。最初に有効になっている行が既定になります。
  **Add AI Provider** ダイアログから追加し（OpenAI、Claude、Gemini、Ollama、GitHub Copilot。HTTP-API または CLI モード）、保存する前に
  **Test Connection** で動作を確認します。
- **Per-Feature Provider** - **AI Summary**、 **AI Review**、 **Title + Description**、 **Explain Code**
  を特定のインスタンスにルーティングするか、 **Default** のままにします。
- **Configure Prompts** - 各機能のシステムプロンプトを編集します。
- **AI agents (MCP) → Let AI agents change Azure DevOps** - **既定はオフ**。IDE 内蔵の MCP
  サーバーに接続した AI エージェントは、サインイン済みの接続を通じてプルリクエストとパイプラインを常に **読み取り**
  できます。そのための設定は不要です。この設定は、変更を伴う操作（コメント、投票、スレッドの解決、パイプラインの実行とキャンセル）
  を追加します。対象は *外部* のエージェントなので、プラグイン自身の AI 機能には影響 **しません**。AI
  エージェントに関する設定を探すならこのページ、という理由でここに置かれています。[](MCP-Tools-ja.md)を参照してください。
- **Advanced** - **Cache AI responses per commit SHA**（既定はオン）、 **Max diff size**（既定は 200 KB、範囲は 10–2000）、
  **Clear AI Response Cache**。

## Tools → DevOps Lens → Experimental {id="page-experimental"}

未完成のプレビュー機能です。このページの項目はすべて **既定でオフ**、ユーザーごとのオプトインで、今後の更新で変更されたり、
誤動作したり、削除されたりする可能性があります。ページ最初の設定の上のバナーにもその旨が書かれています。試すときにプレビューを
オンにし、何かおかしければオフに戻してください。標準の動作がそのまま戻ります。

| 設定                                       | 既定 |
|--------------------------------------------|------|
| **Filter pull requests with search chips** | オフ |

**Filter pull requests with search chips** は、プルリクエスト一覧の GitLab スタイル検索バーをプレビューします。アクティブな
フィルターはそれぞれ検索フィールド内のチップになり、その下のフィルター行はなくなります。並べ替えは右側のドロップダウンと
方向ボタンに移ります。オフの場合は従来の 2 行バーのままです。対象は Pull Requests のみで、Pipelines
ツールウィンドウはまだ対応していません。

## ヘルプリンク {id="help-links"}

ルートの **DevOps Lens** ページと **AI Settings** は同じ行で終わります。 **See Documentation · Report a bug · Request a
feature · Ask a question**。他のサブページには繰り返し表示されません。ルートから 1 クリックで移動できるためです。

- **See Documentation** — 開いている設定ページに対応する、本サイトのページを開きます。
- **Report a bug** — 公開トラッカーの[バグ報告フォーム](%new_bug_url%)を、IDE のビルド、プラグインのバージョン、OS
  が入力済みの状態で開きます。送信されるのはこれだけで、提出前に編集・削除できます。
- **Request a feature** は[機能リクエストフォーム](%new_feature_url%)を、 **Ask a question**
  は [Discussions](%discussions_url%) を開きます。

何を書けばよいか、どのくらいで返ってくるかは[](Support-ja.md)を参照してください。

## Appearance & Behavior → Notifications {id="notifications"}

プラグインは、ルーティング可能な（ポップアップ / ツールウィンドウ / ログのみ）3 つの通知グループを登録します。

| グループ                       | 用途                                                                                                     |
|--------------------------------|----------------------------------------------------------------------------------------------------------|
| **Azure DevOps** | レビュー依頼、@メンション、参照、返信、投票の変更、プッシュの提案。                                      |
| **Azure DevOps AI**            | AI サマリー / レビュー完了のバルーン（スティッキー表示のため、アクションリンクがタイムアウトしません）。 |
| **Azure DevOps Pipelines**     | 自分がトリガーしたパイプライン実行の実行完了バルーン。                                                   |

## Keymap

<ui-path>Settings | Keymap</ui-path> を開いて **Azure DevOps** を検索すると、任意のアクションを再割り当てできます。アクション ID を含む完全な一覧は[](Keyboard-Shortcuts-ja.md)にあります。

## Per-project vs application-level

| スコープ                                                    | 対象                                                                                                                                                                                                                                       |
|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **アプリケーションレベル** - すべてのプロジェクト           | ほとんどの設定。アカウント、通知の設定、AI プロバイダーなど。                                                                                                                                                                              |
| **プロジェクトごと** - プロジェクトのワークスペースに保存   | **既定のアカウント**、 **PR リストのフィルター**、そして Settings ではなくその場で切り替えるいくつかのトグル: **Review Mode**（Git ブランチウィジェットのポップアップ）、 **Collapse resolved**（タイムラインのチップ）、変更ツリーの **グループ化**、 **unread markers**（ギアメニュー）。 |
