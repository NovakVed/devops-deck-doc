# トラブルシューティング

<tldr>
    <p><b>ツールウィンドウが表示されない</b>: Azure DevOps の Git リモートが検出されるまで、Pull Requests ウィンドウは非表示のままです。</p>
    <p><b>データが古い</b>: <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> で同期を強制します。</p>
    <p><b>報告する</b>: <ui-path>Help | Report DevOps Lens Issue…</ui-path>。</p>
</tldr>

ユーザーが最もよく遭遇する問題への手早い解決策です。判断が必要な質問（「OAuth と PAT
のどちらを使うべき？」「オンプレミスに対応している？」など）については、[](FAQ-ja.md)
を参照してください。問題がここで扱われていない場合は、末尾の[問題を報告する](#reporting-a-problem)を参照してください。

## ツールウィンドウが表示されない

Azure DevOps の Git リモートが検出されない場合、Pull Requests ツールウィンドウは非表示になります。次を確認してください。

<procedure>
    <step>プロジェクトのルートで <code>git remote -v</code> を実行します。少なくとも 1 つのリモート URL に <code>dev.azure.com</code> または <code>visualstudio.com</code>（あるいは設定済みのセルフホストサーバー）が含まれている必要があります。</step>
    <step>バンドルされた <b>Git</b> プラグイン（<code>Git4Idea</code>）が <ui-path>Settings | Plugins | Installed</ui-path> で有効になっていることを確認します。</step>
    <step>IDE を再起動します。リモートのスキャンはプロジェクトを開いたときに実行されます。</step>
</procedure>

## プルリクエストの一覧が空になる {id="empty-pr-list"}

一覧に表示するものがない場合、パネルの中央に *その理由*が表示され、多くの状態にはインラインの復帰用リンクが付いています。表示されているメッセージと照らし合わせてください。

| 一覧の表示                                                                                                                                                      | 意味                                                                                 | 対処                                                                                                                            |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| **Loading pull requests…**                                                                                                                                      | 最初の取得がまだ実行中です。                                                         | 待ってください。以下のいずれかの状態に落ち着きます。                                                                            |
| **Nothing to load**                                                                                                                                             | クエリは成功しましたが、結果が空でした（例: このリポジトリにオープンな PR がない）。 | **State** フィルターを広げるか、正しいリポジトリを選んでいるか確認してください。                                                |
| **No matches**                                                                                                                                                  | フィルターまたは検索テキストがすべての PR を除外しています。                         | **Clear filters** をクリックします。                                                                                            |
| **No credentials stored for this account** - *"The saved token couldn't be read from the IDE's password safe (it may have been removed from the keychain)."*    | アカウントの設定は残っていますが、そのトークンが OS のキーチェーンから消えています。 | **Log in again** をクリックします。[](Authentication-ja.md)を参照してください。                                             |
| **This account can't access these pull requests** - *"Your PAT was accepted, but it's either missing a required scope or the account lacks repository access."* | Azure DevOps は応答しており、どちらの原因でも同じレスポンスが返ります。              | **Switch account / repository** をクリックし、下記の [401](#unauthorized-401) と [403](#forbidden-403) を順に確認してください。 |
| **Can't load pull requests** - *"You're offline."*                                                                                                              | ネットワーク系の失敗です。リクエストがサーバーに届いていません。                     | **Retry** をクリックするか、[オフラインと表示される](#offline)を参照してください。                                              |

## サインイン後に「401 Unauthorized」と表示される {id="unauthorized-401"}

- PAT に必要なスコープが不足している可能性があります。[](Authentication-ja.md)を参照してください。最も簡単な解決策は
  **Full access** で再生成することです。
- PAT の有効期限が切れている可能性があります。トークンは作成時に設定した日付で失効します。
- 組織が PAT を無効化している可能性があります。その場合は OAuth を使用してください。

## 特定の操作で「403 Forbidden」と表示される {id="forbidden-403"}

PAT は有効ですが、その操作に対する権限が Azure DevOps アカウントにありません（例:
プルリクエストは読めるが投票できない、マージできないなど）。プロジェクトまたはリポジトリに対する必要な権限を付与してもらうよう、Azure
DevOps 管理者に依頼してください。

## OAuth のブラウザーが IDE に戻ってこない

OAuth は **ローカルループバックリダイレクト**を介して完了します。ブラウザーは
`http://127.0.0.1:<port>/azure-oauth/callback` に戻され、IDE の組み込み Web サーバーがこれを処理して *"Sign-in complete.
You can close this tab."* を表示します。この往復が失敗する場合は次を確認してください。

- ファイアウォールやセキュリティツールが、IDE の組み込みサーバー（ポート範囲 **63342–63352**）への localhost
  接続をブロックしている可能性があります。
- ポップアップのブロックや既定でないブラウザーがリダイレクトを妨げることがあります。意図したブラウザーが既定になっていることを確認してください。
- サインインウィンドウには **5 分**の制限があります。期限が切れた場合は最初からやり直してください。

回避策: OAuth の代わりに Personal Access Token を使用します。

## 同期後もプルリクエストに新しいコメントが表示されない

<procedure>
    <step><shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> を押す（または右クリック → <b>Refresh List</b>）ことで、すぐに同期を強制します。Reload ツールバーボタンはありません。</step>
    <step><b>idea.log</b> に同期エラーがないか確認します（詳細については<a anchor="enabling-debug-logs">デバッグログを有効化</a>してください）。</step>
    <step>同期間隔は既定で 60 秒です。<a href="Settings-ja.md">Settings</a> で長く設定している場合は、遅延も長くなります。</step>
</procedure>

## インラインコメントが差分に表示されない

- プラグインは、 **Code (Read)** 権限を持つプルリクエストにのみインラインスレッドを描画します。
- （プルリクエストではなく）ローカルの作業ツリーから差分を表示している場合、インラインスレッドは描画されません。ツールウィンドウからプルリクエストを開き、その変更ツリーとスレッドを読み込んでください。
- ローカルブランチがプルリクエストのヘッドから分岐している場合、エディター内レビューは自動的に無効になります。変更をプッシュするか、プルリクエストのヘッドを正確にチェックアウトしてください。

## Git のプッシュでパスワードを求められる {id="git-push-asks-for-a-password"}

プラグインの HTTPS 資格情報プロバイダーは、 **IDE 内**で実行される Git 操作に対してのみ機能します（IDE
内から起動したターミナルは「内部」とみなされます）。外部ターミナルの場合は、システムレベルの Git 資格情報ヘルパーを設定してください。

```bash
# macOS Keychain
git config --global credential.helper osxkeychain

# Windows
git config --global credential.helper manager

# Linux (libsecret)
git config --global credential.helper libsecret
```

## AI 機能が見つからない、またはエラーを返す

- <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> を開き、**Enable AI assistance** がオンになっており、少なくとも 1 つのプロバイダーが構成され有効になっていることを確認します。
- プロバイダーの行で **Test connection** をクリックします。失敗する場合は、API キー、モデル名、エンドポイント URL
  を再確認してください。
- **Ollama** の場合は、デーモンがローカルで実行されており（`ollama serve`）、指定したモデルがプルされている（`ollama list`
  ）ことを確認します。
- **CLI プロバイダー**（Claude Code、Codex、Copilot CLI）の場合は、バイナリが `PATH` 上にあり、サインイン済み（`claude /login`
  など）であることを確認します。
- プロバイダーのレート制限やクォータのエラーはプロバイダーから直接返されるもので、再試行されません。

## プラグインの競合 {id="plugin-conflicts" collapsible="true"}

このプラグインは、IDE の `collaboration-tools` ツールキットをバンドルされた **GitHub** プラグインおよび **GitLab**
プラグインと共有します。両方と共存します（独立したツールウィンドウ、独立した状態）。既知の相互作用点が 2 つあります。

- プロジェクトに Azure DevOps と GitHub の両方のリモートがある場合、両方のツールウィンドウが表示され、右クリックのコンテキストメニューにそれぞれの操作が現れることがあります。
- サードパーティのプラグインが AI 拡張ポイント（`intellij.vcs.azuredevops.aiSummaryExtension`
  など、[](Privacy-and-Data-ja.md)を参照）をオーバーライドしている場合、その機能について組み込みの既定はバイパスされます。AI
  機能が予期しない動作をする場合は、<ui-path>Settings | Plugins</ui-path> で、拡張ポイントにフックしている可能性のある他の
  Azure DevOps または AI プラグインを確認してください。

## オフラインと表示される {id="offline"}

プラグインは到達性を自前で追跡しており、オフラインに切り替わるのは **ネットワーク系のエラー**、つまりリクエストがサーバーに届かなかった場合
**のみ**です。トークンの期限切れ、403、404 はいずれも Azure DevOps
が応答したことを意味するため、オフライン扱いにはなりません。それらについては [401](#unauthorized-401)
と [403](#forbidden-403) を参照してください。

切り替わり自体は意図的に無言です。バックグラウンドの更新が失敗するたびにバルーンを出すべきではないからです。気づくのは
**書き込み**を試みたときで、その操作は即座に中止され、 **You appear to be offline** のバルーンが何を試みたかを示します（例:
*"Couldn't start the run - try again when you reconnect."*）。

復帰にあなたの操作は不要です。オフラインの間、プラグインはバックオフ（30 秒から始めて最大 120 秒まで倍増）で Azure DevOps
をポーリングし、最初のプローブ成功でオフライン状態を解除します。あなたのリクエストが成功した場合も同様です。開いているプルリクエストやパイプライン実行のエディターは、解除された瞬間に自動で再読み込みされます。

> このプローブが確認するのは「Wi-Fi がつながっているか」ではなく **Azure DevOps に到達できるか**
> です。そのため、ネットワークの他の部分は正常でも、VPN、プロキシ、DNS の問題があればここではオフラインと判定されます。<ui-path>
> Settings | Appearance &amp; Behavior | System Settings | HTTP Proxy</ui-path> を確認してください。
> {style="note"}

## ネットワークのタイムアウトまたは「request failed」

このプラグインは IntelliJ の HTTP プロキシ構成を使用します。専用のプロキシ設定はありません。企業ネットワークの制限で送信
HTTPS がブロックされる場合は次を確認してください。

- <ui-path>Settings | Appearance &amp; Behavior | System Settings | HTTP Proxy</ui-path> を確認します。プラグインはここで設定した内容に従います。
  **プロキシの資格情報も含みます** - 認証が必要なプロキシの場合、ここにユーザー名とパスワードを入力しないと、すべてのリクエストが `407` で失敗します。
- CLI ベースの AI プロバイダー（`claude`、`codex`、`copilot`）は独自のネットワークスタックを持つ外部バイナリです。IDE のプロキシ設定を
  **一切継承しません**。それぞれの方法で設定してください。
- AI ストリーミングリクエストの HTTP タイムアウトは **5 分**です。それより長いものはハングとして扱われ、通知として報告されます。
- Azure DevOps API 呼び出しの再試行動作は「フェイルファスト」です。一時的なエラーは再試行されないため、UI
  に重複した呼び出しが積み上がりません。60 秒ごとのバックグラウンド同期が、失敗したリクエストの続きを引き継ぎます。

## 自己署名証明書と社内 CA 証明書 {id="certificates"}

オンプレミスの Azure DevOps Server は、社内 CA が発行した証明書を使っていることがほとんどです。本プラグインは TLS を IDE 自身の証明書ストア経由で
処理するため、そのようなサーバーに初めてサインインすると IDE の **「この証明書を受け入れますか?」** ダイアログが表示されます。一度受け入れれば設定は保持され、
<ui-path>Settings | Tools | Server Certificates</ui-path> で後から確認・取り消しができます。

> **信頼されていない証明書を受け入れるプラグイン設定は意図的に用意していません**。プラットフォームのダイアログで付与されるホストごとの信頼は監査でき、
> 取り消しもできますが、一括バイパスはどちらもできず、プラグインのすべてのリクエストを弱くしてしまいます。
> {style="note"}

このダイアログではなく TLS エラーが出る場合:

- サーバー URL が `https://` であることを確認してください。`http://` はサインイン時に拒否されます。PAT は毎回 HTTP Basic として送られるため、
  平文では漏えいします。
- <ui-path>Settings | Tools | Server Certificates</ui-path> で社内 CA をインポートしてから再試行してください。
- ネットワークが TLS 検査プロキシを使っている場合、通信は独自 CA で再署名されます。その CA も信頼する必要があります。

## プラグインの更新で何かが壊れた {id="plugin-update-broke-something" collapsible="true"}

以前のバージョンにロールバックします。

<procedure>
    <step><ui-path>Settings | Plugins | Installed</ui-path> を開き、<b>DevOps Lens</b> を見つけます。</step>
    <step>歯車アイコンをクリック → <b>Manage Plugin Versions</b> を選択します。</step>
    <step>古いバージョンを選択してインストールします。動的プラグインなので、通常は再起動は不要です。</step>
</procedure>

## デバッグログの有効化 {id="enabling-debug-logs"}

より詳細なトラブルシューティングのために、トレースログを有効にします。

<procedure>
    <step><ui-path>Help | Diagnostic Tools | Debug Log Settings…</ui-path> を開きます。</step>
    <step>次の行を追加します。
        <code-block lang="text">
#com.vednovak.devops
#com.vednovak.devops.sync
#com.vednovak.devops.api
        </code-block>
    </step>
    <step>問題を再現します。</step>
    <step><ui-path>Help | Show Log in Explorer/Finder</ui-path> を開いて <code>idea.log</code> を見つけます。</step>
</procedure>

ログは IDE のキャッシュディレクトリにあります。

<tabs>
    <tab title="macOS">
        <code>~/Library/Logs/JetBrains/&lt;IDE&gt;&lt;Version&gt;/idea.log</code>
    </tab>
    <tab title="Windows">
        <!-- ignore-vars stops Writerside reading %LOCALAPPDATA% as a variable
             reference. Do not "fix" this to &#37; - the builder re-escapes that
             entity's ampersand and readers see the literal &#37; text. -->
        <code ignore-vars="true">%LOCALAPPDATA%\JetBrains\&lt;IDE&gt;&lt;Version&gt;\log\idea.log</code>
    </tab>
    <tab title="Linux">
        <code>~/.cache/JetBrains/&lt;IDE&gt;&lt;Version&gt;/log/idea.log</code>
    </tab>
</tabs>

## 問題を報告する {id="reporting-a-problem"}

必要な情報を渡す方法をプラグインは 3 通り用意しています。どれを使うかは、何が起きたかに よって決まります。

| 見えたもの                                                                                  | 使うもの                                                                                                                                        |
|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| ステータスバーの赤いエラーアイコン、またはこのプラグイン名が出ている IDE のエラーダイアログ | ダイアログの **Report to the Third-Party Plugin** ボタン。下記の[クラッシュレポート](#crash-reports)を参照                                         |
| 壊れている・おかしいが、クラッシュはしていない                                              | <ui-path>Help &#124; Report DevOps Lens Issue…</ui-path>。バージョン情報が入力済みの状態でバグ報告フォームが開きます                    |
| すでに issue を書いていて、環境の詳細がほしい                                               | <ui-path>Help &#124; Copy DevOps Lens Diagnostics</ui-path>。スナップショットがクリップボードに入るので、確認してから貼り付けてください |

### クラッシュレポート {id="crash-reports"}

プラグインが予期しないエラーをスローすると、IDE が標準のエラーダイアログを表示することがあります。 **Report to the Third-Party Plugin**
を押すと、スタックトレースが JetBrains Marketplace 経由でプラグイン開発者に届くため、あなたが `idea.log` を掘り返さなくてもバグを特定できます。

押す価値があるのは次の理由からです。

- **送信するのはプラグインではなく IDE です。** サードパーティプラグインのクラッシュレポートは JetBrains Marketplace
  のサービスであり、プラグインはそれに登録しているだけで、レポートに何も追加しません。
- **公開されません。** レポートは公開トラッカーではなく Marketplace 上のこのプラグインの Exception Analyzer
  ページに届き、一般には公開されません。
- **一文を添えられます。** ダイアログのコメント欄に、何をしていたかを書き添えられます。その短いメモが、スタックトレースを修正へと変えることがよくあります。入力した内容はそのまま送信されるため、コード、資格情報、機密性のある名称は書かないでください。
- **ダイアログを閉じれば何も送信されません。** ただし IDE の自動例外レポートを有効にしている場合は、IDE
  が自分でレポートを送信することがあります。

レポートを組み立てるのは IDE であるため、プラグインはそれを秘匿処理できません。スタックトレースとエラーメッセージはそのままの形で送信され、エラーメッセージが組織名、プロジェクト名、リポジトリ名、サーバーのホスト名を含むこともあります。それが気になる場合はダイアログを使わず、<ui-path>Help
| Copy DevOps Lens Diagnostics</ui-path> を利用してください。こちらのスナップショットはバージョンとカウンターだけで構成されており、クリップボードで内容を確認してから貼り付け先を決められます。

含まれる内容の詳細は[プライバシーとデータ](Privacy-and-Data-ja.md#crash-reports)を参照してください。

> 日常的な失敗 — オフライン、期限切れのトークン、403、存在しないファイル — は処理され、
> ローカルに記録されます。これらはバグではないため、このダイアログが表示されることは
> ありません。その場合は Help メニューのバグ報告フォームを使用してください。
> {style="note"}


### 診断情報をコピーする {id="copying-diagnostics"}

<ui-path>Help &#124; Copy DevOps Lens Diagnostics</ui-path> は、短い
スナップショットをクリップボードに入れます。内容は、プラグインのバージョン、IDE のビルド、
Java ランタイム、OS、構成済みアカウントの数とそれがクラウドかオンプレミスか、プラグインが
現在オンラインと判断しているか、そしてキャッシュの統計です。URL、組織名、資格情報は
含まれません。

プレーンテキストなので、貼り付ける前に自分で読めます。公開 issue に環境の詳細を添える場合は
この方法が推奨されます。クラッシュレポートを一切送りたくない場合の報告手段でもあります。

## バグの報告 {id="filing-a-bug"}

再現可能な問題を見つけた場合は、公開トラッカー [%tracker_url%](%tracker_url%)
に報告してください。窓口の使い分け、対応の目安、セキュリティ報告の手順は [](Support-ja.md) にまとめてあります。

<procedure>
    <step><ui-path>Help | Diagnostic Tools | Collect Logs and Diagnostic Data</ui-path> を実行します。</step>
    <step><ui-path>Help | Report DevOps Lens Issue…</ui-path> を選択します。または <ui-path>Settings | Tools | DevOps Lens</ui-path> の下部にある <b>Report a bug</b> をクリックします。どちらの場合も、IDE のビルド、プラグインのバージョン、OS があらかじめ入力された状態でフォームが開きます。（<a href="%new_bug_url%">新しいバグ報告</a>を直接開いて手入力しても構いません。）次を含めてください。
        <ul>
            <li>IDE のバージョン（<b>About</b>）</li>
            <li>プラグインのバージョン</li>
            <li>OS とアーキテクチャ</li>
            <li>再現手順</li>
            <li>期待される動作と実際の動作</li>
            <li>整理した <code>idea.log</code> のスニペット（投稿前にトークンを削除してください）</li>
        </ul>
    </step>
</procedure>

> **公開 issue に PAT や OAuth リフレッシュトークンを絶対に貼り付けないでください**
> 。プラグインは自身のログにトークンを残しませんが、送信前に必ず再確認してください。
> {style="warning"}
