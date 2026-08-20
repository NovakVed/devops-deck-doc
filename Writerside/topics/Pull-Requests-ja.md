# プルリクエスト

<tldr>
    <p><b>場所</b>: <b>Pull Requests</b> ツールウィンドウ、<shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>。</p>
    <p><b>PR にジャンプする</b>: <b>Go to Pull Requests…</b>、<shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>。</p>
    <p><b>作成する</b>: ツールウィンドウのツールバーにある <b>+</b> ボタン。</p>
</tldr>

**Pull Requests** ツールウィンドウは、あなたの司令塔です。キューを閲覧し、フィルタリングと検索を行い、PR
を開いて操作します（完了、取り消し、比較など）。

## ツールウィンドウを開く

ツールウィンドウは、開いているプロジェクトに Azure DevOps の Git リモートが 1 つ以上ある場合に、左サイドバーに表示されます。（Azure
DevOps リモートがない場合は、煩雑さを避けるために非表示のままになります。）

- <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut> を押します。
- またはサイドバーの **Pull Requests** ストライプアイコンをクリックします。
- または <ui-path>View | Tool Windows | Pull Requests</ui-path> を使用します。
- または *Find Action*（<shortcut>⌘⇧A</shortcut> / <shortcut>Ctrl+Shift+A</shortcut>）を実行して **Pull Requests** と入力します。

![エディターの横に開いた Pull Requests ツールウィンドウ](pr-tool-window-shortcuts-ja.png){ width="720" border-effect="line" thumbnail="true" }

> このショートカットは IDE 標準の *Activate tool window* アクションなので、<ui-path>Settings | Keymap</ui-path> で
> **Pull Requests** を検索して再割り当てできます。プラグインのショートカットの一覧は[](Keyboard-Shortcuts-ja.md)にあります。
> {style="tip"}

## プルリクエストを探す

### デフォルトビュー: すべて

フィルターが有効になっていない状態では、リストにはあらゆる状態の **すべてのプルリクエスト**（アクティブ、ドラフト、マージ済み、破棄済み）が並びます。これは最初に表示されるビューであり、
*Clear filters* で戻ってくるビューです。

![アクティブ、ドラフト、マージ済み、破棄済みの PR が 1 つのキューに並ぶ、フィルターなしのリスト](browse-pull-requests-ja.png){ width="720" border-effect="line" thumbnail="true" }

自分のものだけを見るには、 **State** チップで **Mine** を選択します。あなたが **作成した**、 **あなたに割り当てられた**、または
**あなたのチームのいずれかに割り当てられた**アクティブな PR、つまり Azure DevOps Web の **Mine** タブと同じセットです。

> チームに割り当てられた PR には適切な[](Permissions-ja.md)
> が必要です。資格情報でチームメンバーシップを読み取れない場合、プラグインは一度だけ通知します。ビューの残りの部分は引き続き動作します。
> {style="note"}

### Quick Filters

チップ行の左にある **フィルターアイコン**をクリックすると、ワンクリックのプリセットが表示されます。アイコン上のバッジは、有効なフィルターの数を示します。

![3 つのフィルターが有効な状態で、フィルターアイコンの下に開いた Quick Filters メニュー](quick-filters-ja.png){ width="520" border-effect="line" }

| プリセット              | 表示内容                                                                  |
|-------------------------|---------------------------------------------------------------------------|
| **Active**              | アクティブなプルリクエスト（ **State** のプリセット）                     |
| **Includes my changes** | あなたが作成した PR                                                       |
| **I am a reviewer**     | あなたがレビュアー一覧に入っている PR                                     |
| **Waiting for author**  | あなたが **Waiting for author** に投票した PR（ **Review** のプリセット） |
| **I reviewed**          | あなたがすでに投票を済ませた PR                                           |
| **Awaiting my review**  | あなたがレビュアーであり、まだ投票していない PR                           |
| **Abandoned**           | 破棄されたプルリクエスト（ **State** のプリセット）                       |
| **Clear N filter(s)**   | 有効なすべてのフィルターをリセット - デフォルトの全 PR ビューに戻る       |

プリセットは **ビュー**です。選ぶと、現在のフィルターに追加されるのではなく置き換えられます。「自分」を条件にする 2
つのプリセットは、プラグインがあなたが誰かを把握した時点で表示されます。

### フィルターチップ

検索フィールドの下に、スクロール可能なチップの行があります。いずれかのチップをクリックしてリストを絞り込みます。

| チップ            | オプション                                                                                         |
|-------------------|----------------------------------------------------------------------------------------------------|
| **State**         | Mine · Active · Completed · Abandoned                                                              |
| **Author**        | ユーザー全体を対象とした先行入力検索                                                               |
| **Assignee**      | ユーザー全体を対象とした先行入力検索                                                               |
| **Target branch** | プルリクエストのマージ先ブランチ                                                                   |
| **Tags**          | Azure DevOps PR ラベル（タグ）                                                                     |
| **Draft**         | Yes · No                                                                                           |
| **Sort**          | Newest · Oldest · Most/Least commented · Recently/Least recently updated · Id, newest/oldest first |

さらに 4 つのディメンション - **Review**、 **Work Items**、 **Approved by**、 **Source branch** -
には専用のチップがありませんが、検索フィールドから同じリストを絞り込めます。`review:`、`workItem:`、`approvedBy:`、
`sourceBranch:` と入力して値を選んでください（下記の **検索**を参照）。レビュー状態は、Quick Filters
のプリセットがより平易な言葉で尋ねているものでもあります。

フィルターは、IDE の再起動をまたいで **プロジェクトごとに**保持されます。クリアするには、Quick Filters メニューの **Clear N
filter (s)** を使用します。チップは検索フィールドから直接設定することもできます。`author:`
のようなフィルターキーを入力し、補完ポップアップから選択します（下記の **検索**を参照）。

> **検索** - チップの上にあるフィールドに入力すると、PR のタイトル、番号、作成者、およびブランチ名に一致します。フィルターキー（
> `state:`、`author:`、`tag:`、`assignee:`（別名 `reviewer:`）、`approvedBy:`、`review:`、`workItem:`、`sourceBranch:`、
> `targetBranch:`、`draft:`
>
）を入力すると、利用可能な値の補完ポップアップが開きます。値を選択すると対応するフィルターが適用され、トークンはクエリから取り除かれます。キー自体も補完されます -
> `au` と入力すると `author:` が候補に表示されます。<shortcut>Enter ↵</shortcut> を押すと、現在の検索（クエリとフィルターをまとめたもの）が
> **履歴**に保存されます。フィールドの検索アイコンをクリックする（または **Show Search History** ショートカット <shortcut>
> ⌥↓</shortcut> / <shortcut>Alt+Down</shortcut> を押す）と、最近の検索を再適用できます。履歴はプロジェクトごとに、直近 5
> 件まで保持されます。
> {style="tip"}

### 特定の PR にジャンプする {id="jump-to-a-specific-pr"}

どの PR が必要かすでにわかっている場合は、リストをスキップできます。 **Go to Pull Requests…** は、キャッシュされたすべての
PR を **id、タイトル、作成者、またはリポジトリ**であいまい検索し、そのタイムラインを直接開きます。検索を空にすると、キャッシュされたすべての
PR が一覧表示されます（未読を先に、次に新しい順）。

- <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut> を押します。
- または <ui-path>VCS | Go to Pull Requests…</ui-path> を使用します。
- または *Find Action*（<shortcut>⌘⇧A</shortcut> / <shortcut>Ctrl+Shift+A</shortcut>）を実行して **Go to Pull Requests**
  と入力します。

デフォルトでは、プラグイン独自のクイックピックポップアップが開きます。検索フィールドとその横にステータス
**ファネル**があり、<shortcut>Enter ↵</shortcut> で開く / <shortcut>Esc ⎋</shortcut> で閉じるキーが使えます。同じウィンドウには
**Pipelines** タブもあるため、 **Go to Pipeline** もここに着地します。

> IDE の *Search Everywhere* のほうがよいですか？ [Navigation 設定ページ](Settings-ja.md#page-navigation)で **Show Go to
> Pull Requests and Go to Pipeline in Search Everywhere** を **オン**にすると、このアクションは代わりに Search Everywhere の
> **Pull Requests** タブを、Files、Symbols、Actions の隣に開きます。<shortcut>Enter ↵</shortcut>
> を押すと、ハイライトされた PR が開きます。ヒットは **Pull Requests**
> の下にグループ化され、検索が空振りしたときも空のタブにはならず、グレーのプレースホルダー行が残ります。入力前は **No pull
> requests cached yet**、入力後は **No pull requests match “X”** です。
> {style="tip"}

![Go to Pull Requests の結果: Search Everywhere 内の Pull Requests タブ](go-to-pull-request-ja.png){ width="640" border-effect="line" }

#### 専用ダイアログが示すメッセージ {collapsible="true"}

このダイアログのフィールドには *Search pull requests by id, title, author, or repo*
というプロンプトが表示され、空の状態では見つからなかった理由が示されます。

| 表示                                           | 理由                                                                                                                   |
|------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **No pull requests**                           | 最初のプレースホルダー。キャッシュを最初に走査する前の状態です                                                         |
| **No pull requests cached yet**                | キャッシュが空で、クエリもまだ入力していません                                                                         |
| **No pull requests for the selected statuses** | ファネルがすべてを除外しました                                                                                         |
| **No pull requests match “query”**             | クエリに一致するものがありませんでした                                                                                 |
| **Couldn't load pull requests - …**            | バックグラウンドの読み込みが失敗しました。末尾にエラー内容が示されるか、*check your connection* にフォールバックします |

ファネルは、すべてのステータスにチェックが入った状態で開きます。これはポップアップごとの選択なので、絞り込んでも保持されず、次にダイアログを開くとすべてのステータスが元に戻ります。

## PR 行を読む {id="read-a-pr-row"}

各行には、ひと目でわかるステータスが詰め込まれています。

![プルリクエスト行の構成](pr-row-anatomy-ja.png){ width="640" border-effect="line" }

- **タイトルと `!` 番号**。関連する場合は **ステータスピル**が付きます: *Draft*、 *Merged*、 *Abandoned*、または *Has merge
  conflicts*。
- **レビュアーの投票アイコン** - 承認、提案付き承認、待機、または却下。
- スレッド数（およびそのうち未解決がいくつあるか）を示す **アンバー色のディスカッションバッジ**。
- **アテンションチップ** - *Review requested*、 *Mentions you*、または *Replied* - PR
  があなたの注意を求めているときに表示されます。これらはデフォルトでオフです。オンにするには [Notifications &amp; Attention](Notifications-and-Attention-ja.md)
  を参照してください。

未読の PR には、新しいコミット *および*新しいコメント活動に反応する青い **未読マーカー**
ドットが表示されることがあります。これはツールウィンドウの歯車 → **Show unread markers** で切り替えられます。

## PR を開いて操作する {id="open-and-act-on-a-pr"}

PR を **クリック**すると詳細ビューが開きます。タイトルとブランチ、ステータスチェック、変更ファイルのツリー、そしてアクションバーです。 **View Timeline**
でその横にディスカッションが開きます。

![開いたプルリクエスト: ステータスチェックとアクションバーを備えた詳細ビューと、その横のディスカッションタイムライン](pr-opened-ja.png){ width="720" border-effect="line" thumbnail="true" }

下部のアクションバーは、あなたの役割に応じて変化します。

| あなたの役割…            | 主なアクション                                                                                          |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| **Reviewer**             | **Approve ▾**（分割ボタン: Approve with suggestions、Wait for author、Request changes、Reset feedback） |
| **Author, needs review** | **Request review**                                                                                      |
| **Author, reviews in**   | **Complete ▾**（Set auto-complete…、Mark as draft、Abandon）                                            |
| **Author, draft**        | **Publish ▾**（Abandon）                                                                                |
| **Author, abandoned**    | **Reactivate ▾**（Delete source branch）                                                                |
| **Not involved**         | **Set myself as reviewer**                                                                              |

> 投票はいつでも変更でき、投票し直すと以前の値が置き換わるだけです。
> {style="note"}

どの状態でも、アクションセット全体を含む **⋮**（More）メニューが表示されます。

![自分が作成したアクティブな PR で開いた、アクションバーの More メニュー](pr-more-menu-ja.png){ width="380" border-effect="line" }

| アクション                                     | 動作                                                                                                                                                                                                    |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Share Pull Request…**                        | PR をメールで人に送る（レビュアーは追加されず、コメントも投稿されません）                                                                                                                               |
| **Submit Pending Comments (N)**                | キューに入れたコメントをレビューとして投稿する（N > 0 のときのみ）                                                                                                                                      |
| **Restart Merge**                              | *（コンフリクト、失敗、またはポリシー却下されたマージを持つアクティブな PR）* Azure DevOps にマージの再計算を促します。進行バーはありません。マージステータスが *Queued* に変わって戻るのを見てください |
| **Change Target Branch…**                      | PR を別のターゲットブランチに向け直す                                                                                                                                                                   |
| **Cherry-Pick…**                               | この PR のコミットを別のブランチにチェリーピックしたブランチを作成する                                                                                                                                  |
| **Review Changes Since…**                      | *（更新が 2 回以上ある PR）* 選択した更新以降に変更された内容に差分を再スコープする - [Code Review](Code-Review-ja.md#compare) を参照                                                                   |
| **Revert…**                                    | *（完了済みの PR）* この PR の変更を取り消すブランチを作成する                                                                                                                                          |
| **Open on Web** · **Copy Link**                | dev.azure.com の URL に移動 / コピーする                                                                                                                                                                |
| **Summarize Pull Request** · **Run AI Review** | [AI アシスト](AI-Features-ja.md)                                                                                                                                                                        |

行を右クリックすると、クイックアクションも使えます: **View Pull Request**、 **View Pull Request in Browser**、 **Copy Pull
Request URL**、および **Refresh List**。

## プルリクエストのライフサイクル

### ドラフト → レビュー可能

ドラフトの PR には **DRAFT** のピルが付き、主アクションとして **Publish** が表示されます。Publish すると通常のレビュー可能な
PR に切り替わり、作成者は **Mark as draft** で元に戻せます。どちらも確認ダイアログなしで即座に反映され、タイムラインには
*Marked as ready for review* / *Marked as a draft* として記録されます。

### プルリクエストを完了する {id="complete-a-pull-request"}

**Complete** をクリックすると、 **Complete Pull Request** ダイアログが開きます。 **Merge type**
を選択すると、結果として得られる履歴の形状を示すライブ図が描き直されます。

![マージ戦略の図が付いた Complete Pull Request ダイアログ](complete-pr-dialog-ja.png){ width="560" border-effect="line" }

| マージタイプ                | 結果として得られる履歴                                             |
|-----------------------------|--------------------------------------------------------------------|
| **Merge (no fast forward)** | すべてのコミットを保持する非線形の履歴                             |
| **Squash commit**           | ターゲットにコミットが 1 つだけ載る線形の履歴                      |
| **Rebase and fast-forward** | source のコミットをターゲットにリベースして fast-forward           |
| **Semi-linear merge**       | source のコミットをターゲットにリベースし、親が 2 つのマージを作成 |

ブランチポリシーが特定の戦略を要求している場合、禁止されている戦略はグレーアウトされます。それを選ぶと *This merge type is
forbidden by a branch policy* とともに完了がブロックされます。

**完了後のオプション:**

- **Complete associated work items after merging** - PR に実際にリンクされた作業項目がある場合にのみ利用できます。
- **Delete &lt;branch&gt; after merging** - **既定でチェック済み**です。
- **Customize merge commit message** - 既定はオフです。チェックすると、`Merged PR <id>: <title>` があらかじめ入力された
  Title と Description が現れます（squash の場合は squash されたコミットも一覧表示されます）。リベースはこれを無視し、常に既存のコミットメッセージを再利用します。

> **ブランチポリシーは尊重されます。** 必須のレビュアーやステータスチェックが満たされていない場合、ダイアログは赤い
> **Completion is blocked by:** バナーとともに開き、それぞれの理由を一覧表示します。バイパス権限を持っている場合は
> **Override branch policies and enable merge** も表示され、文章での理由の入力が必須になります。この権限がない場合、チェックボックスはそもそも表示されません。
> {style="warning"}

**Set auto-complete…** は、すべてのポリシーが通過した時点で PR が自動的にマージされるよう設定します。同じダイアログが簡略化された形（マージタイプとブランチ削除のみ）で開き、PR
がまだブロックされている *最中*
でも意図的に使えるようになっています。設定すると、ステータスチェックの上にバナーが表示されます: *Auto-complete is set —
the pull request will be completed automatically once all policies pass*。 **Cancel auto-complete** リンクも付いています。バナーの
2 行目（グレーの控えめな行）には設定した内容 - 選択したマージ戦略（例: *Squash commit*）とソースブランチを削除するかどうか -
が表示されます。PR リストでは、設定済みの PR の行に、他のステータスアイコンと並んで小さな稲妻バッジが付き、ツールチップに
*Auto-complete is set* と表示されます。

### ソースブランチを削除または復元する {id="source-branch"}

PR が完了すると、そのタイムラインのマージ済み行がフォローアップを提示します。どちらが表示されるかは、ブランチがすでに消えているかどうかで決まります。

| タイムラインの表示                                   | クリックしたときの動作                       |
|------------------------------------------------------|----------------------------------------------|
| *You can now **delete** the source branch*           | IDE からその場でソースブランチを削除します。 |
| *The source branch has been deleted. **Restore…** ↗* | **プルリクエストを Web で開きます。**        |

> **Restore は IDE 内のアクションではなく、外部へのリンクです。** **↗** の矢印がその印です。プラグイン自身がブランチを復元するのではなく、Azure
> DevOps のプルリクエストページへ案内し、そこで Azure 自身の **Restore branch** ボタンを使います。復元とは、ブランチが削除された時点で指していたコミットに
> ref を作り直すことであり、Azure がサーバー側で追跡しています。ブラウザーで行うことが、まさにそのコミットを取り戻せる保証になります。
> {style="note"}

この行の表示内容の決まり方について、知っておくとよいことが 2 つあります。

- ブランチの行方は、PR 自身の完了オプションと、このセッション中にあなたが行った操作から推測されます。サーバーにブランチの有無を問い合わせ直すことは
  **ありません**。誰かが **IDE の外で**ブランチを削除または復元した場合、PR が再読み込みされるまでこの行は気づきません。
- 削除リンクは、作成者だけでなく、マージ済み PR を見ているすべての人に提示されます。権限が足りない場合、行の表示は更新されてもサーバー上では削除が反映されません。重要な場合は
  Web で確認してください。

そもそも気にしたくない場合は、Complete ダイアログで **Delete &lt;branch&gt; after merging**
をチェックしたままにしておけば、マージ時にブランチが片付けられます。

> **取り消された** PR では、 **Delete source branch** が独立したアクションになり、 **Reactivate ▾** のドロップダウンに入ります。
> {style="tip"}

### 取り消しと再アクティブ化

**Abandon** は確認（ *Are you sure you want to abandon this pull request?*）を求めたうえで、マージせずに PR を閉じます。タイムラインには
*Pull Request Abandoned* が記録されます。

取り消された PR は **Reactivate** でいつでも復帰させられます。確認はなく、タイムラインには *Pull Request Reactivated*
が記録されます。

> 取り消された PR は一覧では **ABANDONED** のピルが付きますが、詳細ビューでは状態を **CLOSED** と表示します。同じものに 2
> つの名前があるだけです。
> {style="note"}

### チェリーピックとリバート

どちらも **⋮** メニューにあり、動作も同じです。変更を **適用する先**のブランチを選ぶと、プラグインが結果用の
**新しいブランチ**を作成します。どちらも起点となったプルリクエストを変更することはありません。

- **Cherry-Pick…** はこの PR のコミットを別のブランチにコピーします。新しいブランチの既定名は
  `cherry-pick/<source-branch>` です。
- **Revert…**（完了済みの PR のみ）はこの PR の変更を取り消したブランチを作成します。既定名は `revert/<source>-<id>` で、PR
  のターゲットブランチがあらかじめ選択されます。

処理は Azure DevOps がサーバー側で実行し、その間はキャンセル可能な進行タスクが動きます。完了すると **Create Pull Request**
アクション付きのバルーンが表示され、クリックすると Create フォームが事前入力された状態で開きます。新しいブランチが
source、選んだブランチが target、タイトルは `Revert "<元のタイトル>"` のような形です。 **変更を実際に取り込むには、この 2
つ目の PR が必要です** - ブランチだけでは何も変わりません。

## プルリクエストを作成する

**Pull Requests** ツールウィンドウで **+**（Create Pull Request）をクリックします。リストタブ右上のツールバーの先頭にあるアイコンで、分割表示・**⋮**・非表示の各アイコンの左側です。

![Pull Requests ツールウィンドウのツールバーにある + （Create Pull Request）ボタン。ホバーしてツールチップを表示したところ](create-pr-button-ja.png){ width="590" border-effect="line" }

リストの横に **新しい PR** タブが開き、ソースブランチ（現在のブランチ）とデフォルトのターゲットブランチが事前入力されます。

![プルリクエストの作成フォーム: 変更元と変更先のブランチ、変更ファイルのツリー、Markdown のプルリクエストテンプレートが入力された説明欄、レビュアー・タグ・作業項目の行](create-pr-ai-ja.png){ width="640" border-effect="line" }

**説明**は、PR コメントと同じコンポーザーを使用します。 **Write | Preview** のタブストリップがあり、エディタの上に書式設定ツールバーがあります。
`@`、`#`、または `!` を入力すると、人、作業項目、PR のインライン補完が表示されます。<shortcut>⌘↵</shortcut> / <shortcut>
Ctrl+Enter</shortcut> を押すと作成します。

説明の下にあるメタデータブロックは、4 つのインライン行です。それぞれに編集用の鉛筆があり、表示されている場合はクリア用の
**X** があります。作業項目を実際にリンクするには **Work items** 行を使ってください。説明に入力した `#1234`
は、リンクとしてレンダリングされる[参照](Markdown-ja.md#hash)であって、関連付けではありません。

| 行                     | 設定する内容                                                                              |
|------------------------|-------------------------------------------------------------------------------------------|
| **Required reviewers** | レビューしなければならない人                                                              |
| **Optional reviewers** | レビューに招待された人                                                                    |
| **Tags**               | Azure DevOps PR ラベル - 既存のものを選ぶか、**+** を使ってまったく新しいタグを作成します |
| **Work items**         | リンクされた Azure Boards の作業項目                                                      |

プライマリボタンは分割ボタンです: **Create Pull Request**。ドロップダウンには **Create Draft Pull Request** があります。

> [AI を有効にする](AI-Features-ja.md)と、説明コンポーザーのツールバーに AI ボタン（ツールチップ **Generate title &amp;
description with AI**）が追加され、ブランチのコミットからタイトルと説明を下書きします。AI プロバイダーがまだ設定されていない場合、クリックすると
> AI Settings を開くよう促されます。
> {style="tip"}

## 更新とバックグラウンド同期 {id="refresh-and-background-sync"}

リストは同期スケジュールに従って自動的に更新されますが、オンデマンドで更新することもできます。

- ツールウィンドウにフォーカスがある状態で <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> または <shortcut>
  F5</shortcut> を押します。
- または行を右クリック → **Refresh List**。

> ポーリングの間隔は [Settings](Settings-ja.md) の **Refresh every (seconds)** です（デフォルトは 60
> 秒）。コールドスタート時には、最初の同期が実行される間、リストは **最後に判明したキャッシュ状態**
> を表示するため、スピナーを待つ代わりにすぐに操作できます。
> {style="note"}

### ライブ更新をミュートする {id="mute-live-updates"}

開いているプルリクエストも同じ間隔で更新されるため、読んでいる最中にタイムラインが動いてしまうことがあります。タイムラインサイドバーの
**Notifications** セクションには、それを止めるボタンが 1 つあります。

| ボタン                  | ツールチップ                                                                           |
|-------------------------|----------------------------------------------------------------------------------------|
| **Mute live updates**   | *This pull request refreshes automatically. Mute to stop live updates while you read.* |
| **Resume live updates** | *Live updates are paused. Resume, or use Refresh to check for new activity.*           |

ミュート中はベルのアイコンに斜線が入ります。このトグルは **プルリクエストごと**で、止まるのは自動更新だけです。一時停止中でも、明示的な
**Refresh** は新しいアクティビティを取り込みます。

ミュート中にプルリクエストがサーバー側で変更されると、タイムライン上部に **This pull request has updates**
バナーが控えめに表示されます - **Refresh** で変更を取り込むか、ライブ更新を再開してください。

## アカウントまたはリポジトリを切り替える

複数の組織やリポジトリにバインドされているプロジェクトの場合は、ツールウィンドウの歯車 → **Switch Account / Repository…**
を使用します。現在のブランチの PR は、Git
ブランチウィジェットとステータスバーにも表示されます - [Git Integration](Git-Integration-ja.md) を参照してください。

一覧のタブには、スコープとなっている Git リポジトリの名前（`my-service`）が付きます。 **All repositories** と表示されるのは、Azure
DevOps リモートを解決できなかった場合だけです。
