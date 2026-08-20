# 通知と注目

<tldr>
    <p><b>内容</b>: レビュー待ちや @メンションなど、あなたを必要とする PR を知らせるバルーン、ツールウィンドウのバッジ、行のチップ。</p>
    <p><b>調整</b>: <ui-path>Settings | Tools | DevOps Lens | Pull Requests</ui-path>。</p>
</tldr>

このプラグインは *あなた* を必要とするプルリクエスト（あなたのレビュー待ちのもの、または誰かがあなたを @メンションしたもの）を監視し、
**バルーン**、 **ツールウィンドウのバッジ**、 **行のチップ** という 3 つの方法で表示します。

## 通知バルーン

あなたの対応が必要なことが発生すると、右下にワンクリックで操作できるバルーンが表示されます。

![あなたの対応が必要な PR の通知バルーン](notification-balloon.png){ width="720" border-effect="line" thumbnail="true" }

次のような場合に通知が届きます。

- あなたが **レビューを依頼された** PR。
- あなたを **@メンションした** コメント。
- 別の PR のコメントで **あなたの PR が参照された** とき - 誰かが `!` に続けてあなたの PR 番号を書いた場合です。
- あなたが参加したスレッドへの **返信**。
- あなたが作成した PR での **レビュアーの投票の変更**。
- ブランチをプッシュした直後に **PR を作成する** チャンス。

単一のイベントは、その PR を直接開きます。レビュー依頼や投票の変更では **Open pull request**、メンション、返信、参照では
**View comment**（該当するコメントの位置に移動します）。複数のイベントが同時に発生した場合は 1 つのバルーンにまとめられ（
*「N 件のプルリクエストがあなたのレビューを必要としています」*、 *「N 件のプルリクエストがあなたの PR を参照しています」*）、その
**Show pull requests** アクションでツールウィンドウが開きます。バルーンは、あなたが操作するか、しばらくすると自動的に消えます。クリアするためのボタンはありません。

## ツールウィンドウのバッジ

**Pull Requests**
のストライプアイコンには、あなたのレビュー待ちのものがある間はバッジのドットが表示されるため、ウィンドウを開かなくても気づけます。（ドットは、ストライプボタンが選択されているときも見やすいように色を変えます。）

## 行の注目チップ

**注目チップ** をオンにすると、その PR がなぜあなたを必要としているのかを、リスト内で直接確認できます。

![プルリクエストの行に表示される注目チップ](attention-row-chips-ja.png){ width="640" border-effect="line" }

| チップ               | 意味                                                       |
|----------------------|------------------------------------------------------------|
| **Review requested** | あなたはまだ投票していないレビュアーです。                 |
| **Mentions you**     | コメントがあなたを @メンションしています。                 |
| **Replied**          | あなたが参加したスレッドに新しいアクティビティがあります。 |

チップは **デフォルトではオフ** です。[Settings](Settings-ja.md) の **Show attention markers on pull-request rows**
でオンにできます。チップにマウスカーソルを合わせると、 *「このプルリクエストがあなたの注目を必要としている理由」*
のツールチップが表示されます。

> **未読マーカー** は別のものです。青いドットは新しいコミット *または* 新しいコメントアクティビティがある PR を示し、その
> PR を開いた瞬間にクリアされます。ツールウィンドウの歯車アイコン → **Show unread markers** から切り替えられます。
> {style="note"}

## 通知される内容を調整する

<ui-path>Settings | Tools | DevOps Lens | Pull Requests</ui-path> を開きます。

| 設定                                                        | デフォルト |
|-------------------------------------------------------------|------------|
| **Notify when I'm asked to review a pull request**          | オン       |
| **Notify when someone @mentions me**                        | オン       |
| **Notify when my pull request is referenced in another one**| オン       |
| **Notify about replies in threads I took part in**          | オン       |
| **Notify when a vote changes on my pull requests**          | オン       |
| **Offer to create a pull request after I push**             | オン       |

プラグインの通知グループ（ポップアップ / ツールウィンドウ / ログのみ）は、<ui-path>Settings | Appearance &amp; Behavior |
Notifications</ui-path> で振り分けることもできます。[Settings](Settings-ja.md#notifications) を参照してください。

![Azure DevOps 設定ページ: 上部にサインイン済みアカウント、下部に通知スイッチ](version-control-ja.png){ width="720" border-effect="line" thumbnail="true" }
