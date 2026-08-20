# キーボードショートカット

<tldr>
    <p><b>ツールウィンドウ</b>: Pull Requests は <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>、Pipelines は <shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut>。</p>
    <p><b>再割り当て</b>: <ui-path>Settings | Keymap</ui-path> で <code>AzureDevOps</code> を検索します。<a anchor="rebind">再割り当ての方法</a>を参照してください。</p>
    <p><b>ビュー内キー</b>: プルリクエストのタイムラインとパイプラインの実行エディターでは <shortcut>?</shortcut> でそれぞれの一覧が表示されます。</p>
</tldr>

プラグインが使用するすべてのショートカットを一箇所にまとめました。種類は 2 つあります。

- **IDE アクション** - IDE に登録され、メニューに表示され、<ui-path>Settings | Keymap</ui-path> で **再割り当て可能**
  です。それぞれに **Action ID** があります（ほとんどは `AzureDevOps` に一致し、ツールウィンドウのものはウィンドウ名に一致します）。
- **ビュー内キー** - 特定のビュー（コメントコンポーザー、プルリクエストのタイムライン、画像プレビュー、パイプラインの実行エディター、統計ビュー、ツールウィンドウの検索フィールド）に組み込まれており、そのビューにフォーカスがある間のみ有効です。Keymap
  には含まれず、再割り当てできません。

> macOS では、<shortcut>⌘</shortcut> は Command、<shortcut>⌃</shortcut> は **Control** です。ほとんどのアクションは ⌘
> を使いますが、一部は ⌃ を使います。Windows / Linux では <shortcut>Ctrl</shortcut> を使います。
> {style="note"}

## ツールウィンドウ

どこからでもプラグインのツールウィンドウを開く（またはフォーカスする）ことができます。これらは IDE 標準の **Activate tool
window** アクションなので、<ui-path>Settings | Keymap</ui-path> で再割り当てできます（ウィンドウ名で検索してください）。

| アクション                         | macOS                    | Windows / Linux                   | Action ID                              |
|------------------------------------|--------------------------|-----------------------------------|----------------------------------------|
| **Pull Requests** ツールウィンドウ | <shortcut>⌘⇧Y</shortcut> | <shortcut>Ctrl+Shift+Y</shortcut> | `ActivatePullRequestsWindowToolWindow` |
| **Pipelines** ツールウィンドウ     | <shortcut>⌘⇧W</shortcut> | *最初の空き - ツールチップを参照* | `ActivatePipelinesWindowToolWindow`    |

> **Pipelines** のショートカットは、プロジェクトに Azure DevOps のリモートがある場合にのみ機能します。それがツールウィンドウを利用可能にする条件です。それ以外では開くウィンドウがありません。
> {style="note"}

### Pipelines のショートカットがプラットフォームごとに異なる理由 {id="pipelines-shortcut" collapsible="true"}

**macOS** では既定値は <shortcut>⌘⇧W</shortcut> です。これは標準の 2026.2 キーマップでまだ空いている数少ない ⌘⇧
の組み合わせの一つです（最新の IntelliJ はそのほとんどを占有しています。⌘⇧J は Database console、⌘⇧O は Go to File、⌘⇧K は
Push、など）。 **Windows / Linux** ではプラグインが代わりに最初の空きの組み合わせを選ぶため、異なることがあります。
**Pipelines のストライプアイコンにカーソルを合わせると実際のキーが表示されます**。既定値を別の用途で使っている場合は、
<ui-path>Settings | Keymap</ui-path> で Pipelines を再割り当てしてください（ **Pipelines** で検索）。

> ショートカットはプラグインの読み込みと同時に **プロジェクトごとに**シードされ、既存のキーや再割り当て済みのキーは常に尊重されます。
> そのため、インストールや更新の直後からそのまま機能します - 再起動は不要です。再割り当ては即座に反映されますが、ストライプアイコンの
> ホバーツールチップには、プロジェクトを開き直すまで古いキーが表示されることがあります。
> {style="tip"}

### 検索フィールドにフォーカス {id="focus-search"}

どちらのツールウィンドウにも、一覧の上に検索フィールドがあります。ツールウィンドウにフォーカスがある間、
<shortcut>⌘L</shortcut> / <shortcut>Ctrl+L</shortcut> でそのフィールドに移動し、現在のクエリが選択されます。このキーは
フィールドのプレースホルダーテキストにも表示されます。これはビュー内キー（ツールウィンドウに組み込まれており、Keymap
にはありません）なので、エディターからはまずウィンドウのアクティブ化ショートカットを押してください。例:
<shortcut>⌘⇧Y</shortcut> の後に <shortcut>⌘L</shortcut>。

## エディター内（review-in-editor）

| アクション             | macOS                    | Windows / Linux                   | Action ID                                    |
|------------------------|--------------------------|-----------------------------------|----------------------------------------------|
| **Add Review Comment** | <shortcut>⌃⇧M</shortcut> | <shortcut>Ctrl+Shift+M</shortcut> | `AzureDevOps.PullRequest.AddCommentAtCursor` |
| **Copy Link to Code**  | <shortcut>⌘⇧L</shortcut> | <shortcut>Ctrl+Shift+L</shortcut> | `AzureDevOps.PullRequest.CopyCodeLink`       |

**Add Review Comment**
は、開いているプルリクエスト内のファイルの変更された行にキャレットがある場合にのみ発動します。[](Review-in-Editor-ja.md)
を参照してください。 **Copy Link to Code**（右クリック → **Copy / Paste Special**
）はレビュー外でも、接続中のリポジトリの任意のファイルで使えます。[](Code-Review-ja.md)を参照してください。

## エディター内（任意のファイル）

[](Find-Pull-Requests-From-Code-ja.md)
のアクションは、既定のショートカットなしで提供されます。[Keymap](#rebind) で自分で割り当ててください。

| アクション                         | 場所                                  | Action ID                                          |
|------------------------------------|---------------------------------------|----------------------------------------------------|
| **Find Pull Request**              | 右クリック → **Open In**              | `AzureDevOps.PullRequest.FindForLine`              |
| **Copy Pull Request URL for Line** | 右クリック → **Copy / Paste Special** | `AzureDevOps.PullRequest.CopyUrlForLine`           |
| **Annotate with Pull Requests**    | **行番号ガター**を右クリック          | `AzureDevOps.PullRequest.AnnotateWithPullRequests` |

## 差分ビューアー内

| アクション              | macOS                                              | Windows / Linux                                         | Action ID                                    |
|-------------------------|----------------------------------------------------|---------------------------------------------------------|----------------------------------------------|
| **Mark File as Viewed** | <shortcut>⌘⇧S</shortcut>                           | <shortcut>Ctrl+Shift+S</shortcut>                       | `AzureDevOps.PullRequest.MarkFileAsViewed`   |
| **Add Review Comment**  | <shortcut>⌃⇧M</shortcut>                           | <shortcut>Ctrl+Shift+M</shortcut>                       | `AzureDevOps.PullRequest.AddCommentAtCursor` |
| **Copy Link to Code**   | <shortcut>⌘⇧L</shortcut>                           | <shortcut>Ctrl+Shift+L</shortcut>                       | `AzureDevOps.PullRequest.CopyCodeLink`       |
| 次 / 前の変更範囲       | <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut> | <shortcut>F7</shortcut> / <shortcut>Shift+F7</shortcut> | *IntelliJ 組み込みの差分*                    |
| **次 / 前のコメント**   | <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut> | <shortcut>F8</shortcut> / <shortcut>Shift+F8</shortcut> | *ビュー内キー*                               |

> <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut> は、**人間のスレッド、自分の保留中の下書き、AI の提案**を上から下への 1 つの読み順でたどります。差分内に <shortcut>J</shortcut>/<shortcut>K</shortcut> のエイリアスが意図的に用意されていないのは、IdeaVim のモーション用に空けておくためです。**AI 提案カード**にフォーカスがある間は、<shortcut>A</shortcut> でレビューに追加し、<shortcut>D</shortcut> で破棄します。
> {style="tip"}

## コメントコンポーザー内

これらはコメント、返信、またはプルリクエスト説明のエディターにフォーカスがある間に機能します。コンポーザーに組み込まれており（Keymap
にはありません）、修飾キーを除けばすべてのプラットフォームで同一です。

| アクション                           | macOS                    | Windows / Linux                   |
|--------------------------------------|--------------------------|-----------------------------------|
| **Bold**                             | <shortcut>⌘B</shortcut>  | <shortcut>Ctrl+B</shortcut>       |
| **Italic**                           | <shortcut>⌘I</shortcut>  | <shortcut>Ctrl+I</shortcut>       |
| **Inline code**                      | <shortcut>⌘E</shortcut>  | <shortcut>Ctrl+E</shortcut>       |
| **Insert link**                      | <shortcut>⌘K</shortcut>  | <shortcut>Ctrl+K</shortcut>       |
| **Mention user**（`@`）              | <shortcut>⇧⌘M</shortcut> | <shortcut>Ctrl+Shift+M</shortcut> |
| **Bulleted list**                    | <shortcut>⇧⌘8</shortcut> | <shortcut>Ctrl+Shift+8</shortcut> |
| **Numbered list**                    | <shortcut>⇧⌘7</shortcut> | <shortcut>Ctrl+Shift+7</shortcut> |
| **Task list**                        | <shortcut>⇧⌘9</shortcut> | <shortcut>Ctrl+Shift+9</shortcut> |
| **Paste image**                      | <shortcut>⌘V</shortcut>  | <shortcut>Ctrl+V</shortcut>       |
| **Submit**（Comment / Reply / Save） | <shortcut>⌘↵</shortcut>  | <shortcut>Ctrl+Enter</shortcut>   |
| **Cancel / close editor**            | <shortcut>⎋</shortcut>   | <shortcut>Esc</shortcut>          |

> よく似た 2 つのショートカットですが、役割は異なります。 **Mention user**（<shortcut>⇧⌘M</shortcut>）はコンポーザー内に
> `@mention` を *挿入*し、 **Add Review Comment**（<shortcut>⌃⇧M</shortcut>）はエディターまたは差分のキャレット位置で新しいコメントを
> *開始*します。
> {style="note"}

## 画像プレビュー内

コメントに投稿された画像をクリックすると、ズーム可能なビューアーで開きます。そのキーはダイアログに組み込まれているため、どのプラットフォームでも同じです。

| アクション               | ショートカット                                    |
|--------------------------|---------------------------------------------------|
| **ウィンドウに合わせる** | <shortcut>F</shortcut> / <shortcut>0</shortcut>   |
| **実寸表示**（100 %）    | <shortcut>1</shortcut>                            |
| **拡大 / 縮小**          | <shortcut>+</shortcut> / <shortcut>-</shortcut>   |
| **画像をパンする**       | 矢印キー                                          |
| **閉じる**               | <shortcut>⎋</shortcut> / <shortcut>Esc</shortcut> |

> マウス操作では、<shortcut>⌘</shortcut> / <shortcut>Ctrl</shortcut> +
> ホイールでポインターを中心に拡大縮小、ホイールのみでスクロール、ドラッグでパンできます。[ディスカッションとコメント](Discussions-and-Comments-ja.md#images-and-attachments)
> を参照してください。
> {style="tip"}

## プルリクエストの一覧、タイムライン、詳細ビュー内

| アクション                               | ショートカット                                                                  | Action ID                                     |
|------------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------|
| **Refresh List**                         | <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> | `AzureDevOps.PullRequest.List.Reload`         |
| **Refresh Timeline**                     | <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> | `AzureDevOps.PullRequest.Timeline.Update`     |
| **Refresh Pull Request**                 | <shortcut>F5</shortcut>                                                         | `AzureDevOps.PullRequest.Details.Reload`      |
| **View Pull Request**                    | <shortcut>Enter ↵</shortcut> / ダブルクリック *（一覧内）*                      | `AzureDevOps.PullRequest.Show`                |
| **View Pull Request in Browser**         | *既定なし*                                                                      | `AzureDevOps.PullRequest.Open.Link`           |
| **Copy Pull Request URL**                | *既定なし*                                                                      | `AzureDevOps.PullRequest.Copy.Link`           |
| **Show Pull Request in the Tool Window** | *既定なし*                                                                      | `AzureDevOps.Pull.Request.Show.In.Toolwindow` |

> Pull Requests ツールウィンドウには Reload ボタンがありません。更新はキーボードのみ（または右クリック → **Refresh List**
> ）です。
> {style="note"}

## 統計ビュー内

**PR Statistics** と **Pipelines Analytics** のエディタータブにも Refresh ボタンはありません。どちらかにフォーカスがある間、
<shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> でその数値を再取得でき、右クリック →
**Refresh Statistics** でも同じことができます。これらはビュー内キー（ビューに組み込みで、Keymap にはありません）です。
更新ショートカットは常にフォーカスのあるビューを更新するため、同じキーが、今いる場所に応じてプルリクエストの一覧、
パイプラインの一覧、統計タブ、またはプルリクエストのタイムラインを再読み込みします。

## プルリクエストのタイムライン内

これらのキーは **View Timeline** エディターを操作し、そのエディターにフォーカスがある間に発動します。コンポーザーのキーと同様に組み込みで（Keymap
にはありません）。いつでも <shortcut>?</shortcut> を押すと同じ一覧が表示されます。

| アクション                                     | ショートカット                                        |
|------------------------------------------------|-------------------------------------------------------|
| **次の未解決スレッド**                         | <shortcut>F8</shortcut> / <shortcut>J</shortcut>      |
| **前の未解決スレッド**                         | <shortcut>⇧F8</shortcut> / <shortcut>K</shortcut>     |
| フォーカス中のスレッドを **解決 / 再オープン** | <shortcut>R</shortcut>                                |
| フォーカス中のスレッドに **返信**              | <shortcut>A</shortcut>                                |
| **新しいコメントを開始**                       | <shortcut>C</shortcut>                                |
| 解決済みスレッドを **折りたたむ / 表示**       | <shortcut>H</shortcut>                                |
| **AI レビューコメントを表示**                  | <shortcut>I</shortcut>                                |
| **タイムライン内を検索**                       | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> |
| **この一覧を表示**                             | <shortcut>?</shortcut>                                |

> **AI レビューコメントを表示**（<shortcut>I</shortcut>）は、最初の AI 提案の位置で差分にジャンプします。AI
> レビューコメントは差分のインレイとして表示され、インレイ自身の矢印で残りを順に移動できます。事前に AI
> レビューが実行されている必要があります。[](AI-Features-ja.md)を参照してください。
> {style="tip"}

## パイプラインの実行エディター内

実行の概要（ **Pipelines** ツールウィンドウから開きます）には独自のキーがあり、<shortcut>?</shortcut> またはステージグラフのツールバーの
**?** ボタンでいつでも表示できます。組み込みで、Keymap にはありません。

| アクション                                  | ショートカット                                                           |
|---------------------------------------------|--------------------------------------------------------------------------|
| **ログを表示 / ステージグラフに戻る**       | <shortcut>L</shortcut>                                                   |
| **前 / 次のタブ**                           | <shortcut>[</shortcut> / <shortcut>]</shortcut>                          |
| ステージグラフを **拡大 / 縮小 / フィット** | <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut> |
| **この実行をブラウザーで開く**              | <shortcut>B</shortcut>                                                   |
| **テストを絞り込む**（Tests タブ）          | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>                    |
| **この一覧を表示**                          | <shortcut>?</shortcut>                                                   |

> ジョブの **logs** 内では、<shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> は代わりにログ検索バーを開きます（すべてのステップを横断して検索）。
> {style="note"}

## ブランチウィジェット / VCS メニュー

| アクション                        | ショートカット                                               | Action ID                                          |
|-----------------------------------|--------------------------------------------------------------|----------------------------------------------------|
| **Open Current Branch PR**        | *既定なし*                                                   | `AzureDevOps.OpenCurrentBranchPr`                  |
| **Update to Enable Review Mode…** | *既定なし*                                                   | `AzureDevOps.Pull.Request.Branch.Update`           |
| **Review Mode**                   | *既定なし*                                                   | `AzureDevOps.Pull.Request.Review.In.Editor.Toggle` |
| **Go to Pull Requests…**          | <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut> | `AzureDevOps.PullRequest.GoTo`                     |
| **Go to Pipeline…**               | <shortcut>⌥⇧P</shortcut> / <shortcut>Alt+Shift+P</shortcut>  | `AzureDevOps.Pipelines.GoTo`                       |

> 既定では、どちらの **Go to** アクションもプラグイン独自のクイックピックダイアログを開きます。 **Pull Requests** タブと
> **Pipelines** タブを備えた 1 つのウィンドウで、押したショートカットに対応するタブが最初に表示されます。[Navigation
> 設定ページ](Settings-ja.md#page-navigation)で **Show Go to Pull Requests and Go to Pipeline in Search Everywhere**
> をオンにすると、代わりに IDE の *Search Everywhere* が開きます。同じタブは **Shift** を 2 回（<shortcut>⇧⇧</shortcut>）
> 押したときにも表示されます。[プルリクエスト](Pull-Requests-ja.md#jump-to-a-specific-pr)を参照してください。
> {style="tip"}

## AI アクション

| アクション                          | ショートカット | Action ID                              |
|-------------------------------------|----------------|----------------------------------------|
| **Summarize Pull Request**          | *既定なし*     | `AzureDevOps.PullRequest.AI.Summarize` |
| **Run AI Review**                   | *既定なし*     | `AzureDevOps.PullRequest.AI.Review`    |
| **Explain This File**               | *既定なし*     | `AzureDevOps.PullRequest.AI.Explain`   |
| **Generate Commit Message with AI** | *既定なし*     | `AzureDevOps.AI.GenerateCommitMessage` |
| **Analyze Logs with AI**            | *既定なし*     | `AzureDevOps.Pipelines.AI.AnalyzeLogs` |

これらには AI プロバイダーの設定が必要です。[](AI-Features-ja.md)を参照してください。

## 再割り当ての方法 {id="rebind"}

上記のうち **IDE アクション**（Action ID があるもの）のみが再割り当てできます。 **ビュー内キー**
（コメントコンポーザー、プルリクエストのタイムライン、画像プレビュー、パイプラインの実行エディター、統計ビュー、ツールウィンドウの検索フィールド）は固定です。

<procedure title="ショートカットを割り当てる">
    <step><ui-path>Settings | Keymap</ui-path> を開きます。</step>
    <step>検索ボックスに <code>AzureDevOps</code> と入力してプラグインのアクションに絞り込みます（表示名だけでなく action ID にも一致します）。</step>
    <step>アクションをダブルクリック → <b>Add Keyboard Shortcut</b>。</step>
    <step>組み合わせを押します。競合する場合は IntelliJ が警告し、競合を削除するよう提案します。</step>
    <step><b>OK</b> をクリックします。</step>
</procedure>

> 2 つの **ツールウィンドウ** のショートカットも IDE アクションですが、その ID（`ActivatePullRequestsWindowToolWindow` /
> `ActivatePipelinesWindowToolWindow`）には `AzureDevOps` が含まれていません。 **Pull Requests** または **Pipelines**
> で検索して見つけ、再割り当てしてください。
> {style="note"}

> バグを報告する際は **action ID** の列を使用してください。表示名がバージョンによって異なる場合があっても、IDE
> のバージョンを越えて正確なアクションを特定できます。
> {style="tip"}
