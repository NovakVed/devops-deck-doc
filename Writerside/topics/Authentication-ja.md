# 認証

<tldr>
    <p><b>場所</b>: アカウントパネルの <b>+</b> ボタン、または Pull Requests ツールウィンドウのサインイン画面。</p>
    <p><b>必要なもの</b>: Personal Access Token、または OAuth 用の Microsoft Entra ID アカウント。<a anchor="on-prem">Azure DevOps Server</a> は PAT のみです。</p>
</tldr>

このプラグインのサインイン方法は 2 つあります。

- **個人用アクセス トークン (Personal Access Token, PAT)**
- **Microsoft Entra ID (OAuth)**
- どちらの場合も、資格情報は IDE のシステムバックエンドのキーチェーンに保存されます。

## どちらの方法を使うべきか

| 使うケース                | 状況                                                                                                         |
|---------------------------|--------------------------------------------------------------------------------------------------------------|
| **Personal Access Token** | オンプレミスの Azure DevOps Server を含め、どこでも動作します。トークン自体は MFA を再度要求しません。       |
| **Microsoft (OAuth)**     | クラウドの `dev.azure.com` のみ。サインインのたびに組織の SSO/MFA を尊重し、トークンは自動的に更新されます。 |

どちらもアカウントパネルの **`+`** ボタンからすべてのサインインに到達でき、小さなポップアップが開きます。

![アカウント追加ポップアップ: Log In with Token と Log In via Microsoft](add-account-menu.png){ width="420" border-effect="line" }

> オンプレミスの Azure DevOps Server では、Microsoft サインインを完了できません。代わりに何が表示されるか、そして Server
> フィールドがどの URL を受け付けるかについては、[Azure DevOps Server (オンプレミス)](#on-prem) を参照してください。
> {style="note"}

## Personal Access Token でサインインする

### 1. トークンを生成する

プラグインに案内してもらえます。ログインダイアログの **Generate…** ボタンで、組織の Personal Access Tokens
ページがブラウザで開きます。または手動で行います。

<procedure title="Azure DevOps でトークンを生成する">
    <step>Azure DevOps を開き、アバター (右上) をクリック → <b>Personal access tokens</b>。</step>
    <step><b>+ New Token</b> をクリックし、名前、組織、有効期限を設定します。</step>
    <step>以下のスコープを付与します (または単に <b>Full access</b> を選択します)。</step>
    <step><b>Create</b> をクリックしてトークンをコピーします。Azure DevOps はこれを 1 回だけ表示します。</step>
</procedure>

> **手早い方法:** とにかくすべてを動作させたいなら **Full access**
> を選びます。以下の粒度の細かいスコープはより厳格なセキュリティポリシー向けです。[](Permissions-ja.md)
> で、それぞれがない場合に何が無効になるかを正確に説明しています。
> {style="tip"}

#### プラグインが使用するスコープ {id="pat-scopes" collapsible="true"}

ログインダイアログにも一覧表示されます。

| スコープ (PAT UI 上)                   | 有効になる機能                                                                                                                                                              |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Code** → *Read &amp; write + Status* | プルリクエストと差分の読み取り、コメント、投票、完了/破棄、およびブランチポリシー/ステータスチェック。**必須** です。これがないとログインダイアログはトークンを拒否します。 |
| **User Profile** → *Read*              | プロフィールとレビュアーのアバター。                                                                                                                                        |
| **Identity** → *Read*                  | @メンションのオートコンプリートと、既定のプルリクエスト一覧の背後にあるチームメンバーシップの参照。                                                                         |
| **Work Items** → *Read*                | プルリクエストにリンクされた作業項目と Work Items フィルター。                                                                                                              |
| **Project and Team** → *Read*          | 既定のプルリクエスト一覧の **assigned to my team** 部分のためのチームメンバーシップ。                                                                                       |
| **Security** → *Manage*                | Complete ダイアログの **Override branch policies** オプションを有効にする権限チェック。                                                                                     |

### 2. プラグインに追加する

<procedure title="トークンでサインインする">
    <step>Pull Requests ツールウィンドウ (または <ui-path>Settings | Tools | DevOps Lens</ui-path>) で、<b>+</b> → <b>Log In with Token…</b> をクリックします。</step>
    <step>2 つのフィールドを入力します。
        <ul>
            <li><b>Server</b> - 完全な URL (<code>https://dev.azure.com/your-org</code>)、組織スラグのみ (<code>your-org</code>)、レガシーの <code>visualstudio.com</code> URL、またはオンプレミス URL (<code>https://tfs.example.com/tfs/your-collection</code>)。組織用の別フィールドはありません。組織はこの値から読み取られます。</li>
            <li><b>Token</b> - PAT を貼り付けます。</li>
        </ul>
    </step>
    <step><b>Log In</b> をクリックします (または単に <shortcut>Enter ↵</shortcut> を押します)。プラグインがトークンを検証し (「Validating credentials…」)、ツールウィンドウにデータが表示されます。</step>
</procedure>

> Server フィールドが受け付けるのは **https の URL のみ** です。PAT はすべてのリクエストに HTTP Basic として載るため、ダイアログは平文の
> `http://` を最初から拒否します。また、検証は「サインインできるか」だけでは終わりません。プラグインはプルリクエストの読み取りテストも行うため、認証は通るものの
> **Code** スコープを欠くトークンは、不足しているスコープを名指しするメッセージとともにその場で拒否されます。
> {style="note"}

![Server と Token フィールドを備えた Log In to Azure DevOps ダイアログ](sign-in-with-token.png){ width="560" border-effect="line" }

### トークンのローテーションまたは失効

<procedure title="トークンをローテーションする">
    <step>Azure DevOps で、同じスコープの新しいトークンを作成してコピーします。</step>
    <step><ui-path>Settings | Tools | DevOps Lens</ui-path> で、アカウント行の <b>鉛筆</b> アイコンをクリックし、新しいトークンを貼り付けます。(編集中は Server フィールドはロックされ、トークンのみが変更されます。)</step>
    <step>Azure DevOps に戻り、古いトークンを失効させます。</step>
</procedure>

トークンが失効または期限切れになると、プラグインはツールウィンドウに **Log In Again** を表示します。これをクリックして新しいトークンを貼り付けます。

## Microsoft (OAuth) でサインインする

SSO を好むクラウド組織向けに、Microsoft Entra ID 経由でサインインします。

<procedure title="Microsoft でサインインする">
    <step><b>+</b> → <b>Log In via Microsoft…</b> をクリックします。</step>
    <step><b>Sign in with Microsoft</b> で、権限レベル (下記) を選択し、<b>Continue</b> をクリックします。</step>
    <step>ブラウザで認証します (MFA を含む)。ページはローカルループバック経由で IDE にリダイレクトされ、<b>"Sign-in complete. You can close this tab."</b> と表示されます。</step>
</procedure>

![Sign in with Microsoft の権限選択画面](sign-in-with-microsoft.png){ width="560" border-effect="line" }

リフレッシュトークンは自動的に更新される (有効期限の 60 秒前に余裕を持って) ため、セッションをまたいでサインイン状態が維持されます。

### 権限レベル {id="oauth-permission-tiers"}

| レベル                   | 得られるもの                                                                                                                                                             | 得られないもの                                                                                                                                                                                             |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Full access** *(推奨)* | プルリクエスト、コメント、投票、ステータスチェックに **加えて**、アバター、@メンション検索、リンクされた作業項目、既定のプルリクエスト一覧のためのチームメンバーシップ。 | -                                                                                                                                                                                                          |
| **Standard access**      | プルリクエストとコメントのみ。                                                                                                                                           | アバターはイニシャルで表示されます。@メンションのオートコンプリートは何も返しません。作業項目のリンクはレンダリングされません。あなたの **teams** に割り当てられたプルリクエストは既定の一覧から外れます。 |

権限ごとの完全な対応表は、[](Permissions-ja.md) を参照してください。

> 後でレベルを変更するには、アカウントを削除して再度サインインします。新しくサインインするたびに選択画面が再表示されます。
> {style="tip"}

## Azure DevOps Server (オンプレミス) {id="on-prem"}

オンプレミスのサーバーは **PAT のみ** です。Microsoft サインインは `login.microsoftonline.com`
経由でリダイレクトしますが、これはネットワーク内部のサーバーには到達できません。そのためプラグインは、フローが途中で失敗するに任せるのではなく、トークンの使用へ誘導します。

![オンプレミスコレクションのツールウィンドウのサインイン画面: Log In via Microsoft は淡色表示、Log In with Token は有効](oauth-access-scope-dialog.png){ width="720" border-effect="line" thumbnail="true" }

ボタンがなくなるわけではなく、グレーアウトされた状態で表示されます。リポジトリセレクターがオンプレミスのサーバーを解決すると、
**Log In via Microsoft…** は画面に残りつつ無効化され、ツールチップに *"Microsoft sign-in is only available for Azure
DevOps Services (dev.azure.com). Use a Personal Access Token for on-prem Azure DevOps Server."* と表示されます。その隣の
**Log In with Token…** は有効なままです。

### Server に貼り付けるもの

Server フィールドはどちらの形式も受け付けます。どちらも同じアカウントに解決されるので、手元にある URL をそのまま貼り付けてください。

| 形式                                    | 例                                                                       | 解決先                                                               |
|-----------------------------------------|--------------------------------------------------------------------------|----------------------------------------------------------------------|
| **コレクション URL**                    | `https://tfs.contoso.com:8080/tfs/my-collection`                         | Server は `https://tfs.contoso.com:8080/tfs`、組織は `my-collection` |
| **リポジトリ (clone / ブラウザー) URL** | `https://tfs.contoso.com:8080/tfs/my-collection/my-project/_git/my-repo` | Server は `https://tfs.contoso.com:8080/tfs`、組織は `my-collection` |

ホストとポートは入力したとおりに保持されるため、`:8080` のような非標準ポートでも問題ありません。Web ページの URL
を貼り付けても動作します。末尾の `_` で始まるセグメント（`_build`、`_settings`、`_apis` など）はコレクションまで切り詰められます。

> **https のみ**というルールはここでも適用されます。PAT はすべてのリクエストに HTTP Basic として載るため、平文の `http://`
> のサーバー URL は拒否されます。サインインする前に、サーバー（またはそのプロキシ）で TLS を終端してください。
> {style="warning"}

## 複数アカウント

複数の Azure DevOps 組織に同時にサインインできます。<ui-path>Settings | Tools | DevOps Lens</ui-path>
の各行には、アバター、表示名、組織 URL、認証タイプが表示され、行ごとに **鉛筆** (編集) と **✕** (削除) があります。

![Settings の Azure DevOps アカウントパネル](multiple-accounts.png){ width="700" border-effect="line" }

各プロジェクトは独自の **default account** (プロジェクトのワークスペースに保存) を記憶します。これはそのプロジェクトの
API 呼び出しと Git HTTPS の受け渡しに使われるアカウントです。

## 資格情報の保存

PAT と OAuth リフレッシュトークンは、OS のキーチェーンに支えられた IDE の PasswordSafe に保存されます。

<tabs>
    <tab title="macOS">Keychain - サインイン済みアカウントごとに 1 エントリ。</tab>
    <tab title="Windows">Credential Manager (DPAPI で暗号化)。</tab>
    <tab title="Linux">利用可能であれば KWallet / Secret Service、そうでなければ IDE 設定ディレクトリ内の暗号化ファイル。</tab>
</tabs>

保存モードは <ui-path>Settings | Appearance &amp; Behavior | System Settings | Passwords</ui-path> で切り替えます。

## サインアウト

<ui-path>Settings | Tools | DevOps Lens</ui-path> で、アカウント行の **✕** をクリックして **Apply** します。トークンはキーチェーンから削除され、そのアカウントのキャッシュデータもすべてクリアされます。

## よくあるサインインエラー

| メッセージ                                               | 考えられる原因                                                                                                                  |
|----------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| **Token invalid or expired**                             | PAT が誤っているか期限切れ、またはスコープが不足しています。少なくとも *Code (Read &amp; write)* を持つ新しいものを作成します。 |
| **This token signs in, but it can't read pull requests** | PAT の認証は通りますが、**Code** スコープが不足しています。*Code (Read &amp; write + Status)* を付けて再生成してください。      |
| **Organisation not found**                               | Server フィールドの組織が存在しないか、アクセスできません。                                                                     |
| **Couldn't reach Azure DevOps**                          | ネットワーク/プロキシの問題です。<ui-path>Settings &#124; System Settings &#124; HTTP Proxy</ui-path> を確認します。            |
| ある操作での **403 Forbidden**                           | アカウントにそのプロジェクト/リポジトリの権限がありません。組織管理者に相談してください。                                       |

詳細は、[](Troubleshooting-ja.md) を参照してください。
