# クイックスタート

ゼロから最初のプルリクエストのレビューまで、およそ1分で完了します。このページでは、プラグインを既に[](Installation-ja.md)
していることを前提としています。

## 1. Azure DevOps でホストされているプロジェクトを開く

リポジトリがすでにローカルにある場合は、そのフォルダーを開いて手順 2 に進んでください。

まだの場合は **IDE の中から** クローンできます。プラグインが IDE のクローンダイアログに **Azure DevOps**
の項目を追加するので、URL を探してくる必要はなく、一覧から選ぶだけです:

1. ようこそ画面で **Clone Repository**（リポジトリのクローン）を選択します。プロジェクトを開いている場合は
   **File | New | Project from Version Control…**（ファイル | 新規 | バージョン管理からプロジェクト…）を使います。
2. 左側の一覧から **Azure DevOps** を選びます。その下にサインイン済みのアカウントが表示されます。まだサインイン
   していない場合は **No accounts**（アカウントなし）と表示されます。
3. サインインしていない場合は、この場で実行できます。**Log In via Microsoft…** または **Log In with Token…**
   を選ぶだけです。アカウントが追加されると、パネルは自動的にリポジトリ一覧へ切り替わります。ダイアログを開き直す
   必要はありません。
4. リポジトリを選びます。一覧には **組織内のすべてのプロジェクト** が `project/repository`
   の形にフラット化されて並びます。検索フィールドに入力して絞り込んでください。複数のアカウントにサインインして
   いる場合は、検索フィールドの上にアカウントのドロップダウンが表示されます。
5. **ディレクトリ** フィールドを確認し（手動で編集するまではリポジトリ名に追従します）、**クローン**
   をクリックします。

> コマンドラインの方がよければ `git clone https://dev.azure.com/your-org/your-project/_git/your-repo`
> でも構いません。あとでそのフォルダーを開けばプラグインが認識します。リポジトリ一覧の各メッセージの意味を含む
> クローンの詳細は [Git 統合](Git-Integration-ja.md) を参照してください。
> {style="tip"}

いずれの方法でも、プラグインは起動時に Git リモートをスキャンし、Azure DevOps のリモート (`dev.azure.com`、
`*.visualstudio.com`、またはオンプレミスの Azure DevOps Server) を検出すると有効化され、 **Pull Requests** ツールウィンドウを表示します。

> **ツールウィンドウが表示されない場合** プラグインは Azure DevOps のリモートが検出されないときは自身を非表示にします。
> `git remote -v` を実行して、リモート URL が `dev.azure.com`、`visualstudio.com`、またはお使いの Azure DevOps Server
> を指していることを確認してください。
> {style="note"}

## 2. サインインする

左サイドバーから Pull Requests ツールウィンドウを開きます。そのサインイン画面には2つの選択肢があります:

- **Log In with Token…**（トークンでログイン） Azure DevOps のユーザー設定から取得した個人用アクセス
  トークンを貼り付けます。最も速い方法であり、オンプレミスの Azure DevOps Server では唯一の選択肢です。
- **Log In via Microsoft…**（Microsoft 経由でログイン） Microsoft Entra ID を介したブラウザーベースの OAuth サインインです（クラウドの
  `dev.azure.com` のみ）。最初にダイアログで **Full access** と **Standard access** のどちらを付与するかを尋ねられます。

![Full access（推奨）と Standard access を示す、Sign in with Microsoft の権限選択画面](sign-in-with-microsoft.png){ width="560" border-effect="line" }

トークンを選択する場合、プラグインには次のスコープが必要です: **Code (Read &amp; write + Status), User Profile (Read),
Identity (Read), Work Items (Read), Project and Team (Read), Security (Manage)**。ログイン ダイアログにこれらが一覧表示され、その
**Generate…** ボタンを押すと、組織のトークン ページがブラウザーで開きます。

> サインインの完全なフロー、スコープ、Full と Standard のティア選択については、[](Authentication-ja.md)を参照してください。
> {style="note"}

## 3. プルリクエストを閲覧する

サインインすると、ツールウィンドウにリポジトリのプルリクエストが一覧表示されます。

![検索フィールド、フィルターチップ、および入力済みのリストを備えた Pull Requests ツールウィンドウ](pr-tool-window-ja.png){ width="720" border-effect="line" thumbnail="true" }

リストを絞り込むには:

- **Quick Filters**（クイックフィルター）
  チップ行の左にあるフィルターアイコンをクリックすると、ワンクリックのプリセットが使えます: **Active**、
  **Includes my changes**、 **I am a reviewer**、 **Waiting for author**、 **I reviewed**、 **Awaiting my review**、
  **Abandoned**。
- **フィルターチップ** **State**（Mine / Active / Completed / Abandoned）、 **Author**、 **Assignee**、 **Target
  branch**、 **Tags**、 **Draft**。さらに **Review**、 **Work Items**、 **Approved by**、 **Source branch**
  のディメンションは、検索フィールドに入力するトークンで絞り込めます。
- **Sort**（並べ替え） 最後のチップ: Newest、Oldest、Most/Least commented、Recently/Least recently updated、または Id
  newest/oldest first。
- **Search**（検索） チップの上のフィールドに入力すると、PR のタイトル、番号、作成者、ブランチ名に一致します。

任意の PR を **クリック**すると、エディタータブでその詳細ビューが開きます。

### PR が表示されない場合 {collapsible="true"}

| 考えられる原因                               | 対処                                                                              |
|----------------------------------------------|-----------------------------------------------------------------------------------|
| アカウントがこのリポジトリにアクセスできない | まず Azure DevOps の Web UI で開いてください。                                    |
| プロジェクトが複数の組織を指している         | ツールウィンドウの歯車 → **Switch Account / Repository…** で切り替えます。        |
| 実際にアクティブな PR が存在しない           | **State** チップを **Completed** に設定して、接続が機能していることを確認します。 |

## 4. コードをレビューする

詳細ビューは **単一のペイン**で、サブタブはありません。上から下へ: `!` 番号付きのタイトルと **View Timeline**
リンク、ソース → ターゲットのブランチ、各レビュアーの投票を含むステータスチェック、変更されたファイルのツリー、そしてアクションバー。

![プルリクエストのレビュー: ツールウィンドウ、タイムライン、レビュアーサイドバー](review-code.png){ width="720" border-effect="line" thumbnail="true" }

- **差分を読む** 変更ツリー内の任意のファイルをクリックすると差分が開きます。行のガター（余白）をクリックするとコメントできます。
- **ディスカッションを読む** **View Timeline** をクリックすると、コメントの全タイムラインが専用のタブで開きます。
- **投票する** アクションバーの **Approve** ボタンは分割ボタンです。そのドロップダウンには **Approve with suggestions**、
  **Wait for author**、 **Request changes**、 **Reset feedback** が含まれます。

![差分の Review ツールバーにある Submit ボタンの投票オプション](vote-dropdown.png){ width="700" border-effect="line" }

> **エディターを離れずにレビューする:** PR
> のブランチをチェックアウトすると、プラグインが通常のエディター上にそのコメントを直接オーバーレイ表示します。[エディター内レビュー](Review-in-Editor-ja.md)
> を参照してください。
> {style="tip"}

## 5. プルリクエストを作成する

**Pull Requests** ツールウィンドウのツールバーから **+**（Create Pull
Request）をクリックします。フォームには、ソースブランチ（現在のブランチ）とデフォルトのターゲットブランチが事前入力されます。タイトル、説明、レビュアーを追加してから作成します。

![Pull Requests ツールウィンドウのツールバーにある + （Create Pull Request）ボタン。ホバーしてツールチップを表示したところ](create-pr-button-ja.png){ width="590" border-effect="line" }

![プルリクエストの作成フォーム: 変更元と変更先のブランチ、変更ファイルのツリー、Markdown のプルリクエストテンプレートが入力された説明欄、レビュアー・タグ・作業項目の行](create-pr-ai-ja.png){ width="640" border-effect="line" }

> **AI によるタイトルと説明の支援:** [AI プロバイダーを構成](AI-Features-ja.md)しておくと、フォームのタイトルと説明フィールドに
> **Generate** アクションが追加され、ブランチの差分から両方を下書きします。
> {style="tip"}

## 次に見るべきページ

- [](Pull-Requests-ja.md) フィルタリング、検索、アクションバー、オーバーフローメニュー（Complete、Revert、Compare）。
- [](Code-Review-ja.md) インライン差分、提案、投票、ファイル閲覧状態の追跡。
- [通知とアテンション](Notifications-and-Attention-ja.md) PR が自分のレビューを必要とするときや @メンションされたときに通知を受け取ります。
- [](AI-Features-ja.md) 要約、AI レビュー、文法の校正。
