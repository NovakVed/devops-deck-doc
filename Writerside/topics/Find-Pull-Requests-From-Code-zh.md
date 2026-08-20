# 从代码中查找拉取请求

<tldr>
    <p><b>位置</b>：右键单击某一行 → <b>Open In</b> → <b>Find Pull Request</b>；若要查看整个文件，右键单击行号边栏 → <a anchor="annotate">Annotate with Pull Requests</a>。</p>
</tldr>

代码审查回答的是“这次改动该不该合入？”。半年之后，问题恰好相反： **这一行为什么会是现在这个样子？** %product%
让你在编辑器中就能回答它——对该行执行 blame、找出把它带进来的那个拉取请求，并且无需离开文件就能打开该 PR 的完整讨论。

共有三条入口，它们都构建在同一次查找之上：

| 你想要                       | 使用                               | 位置                                |
|------------------------------|------------------------------------|-------------------------------------|
| **这一行**背后的 PR          | **Find Pull Request**              | 右键单击 → **Open In**              |
| 它的 **URL**，以便粘贴到别处 | **Copy Pull Request URL for Line** | 右键单击 → **Copy / Paste Special** |
| **每一行**各自背后的 PR      | **Annotate with Pull Requests**    | 右键单击**行号边栏**                |

> 这三项都由[](Settings-zh.md)中的 **Find the pull request behind a line of code** 控制（默认开启）。此外，只有在已登录某个账户、且文件位于带有
> Azure DevOps 远程仓库的 Git
> 仓库中时，它们才会出现——因此绝不会在无关的项目里让菜单变得杂乱。三项都不附带默认键盘快捷键；可在 [Keymap](Keyboard-Shortcuts-zh.md#rebind)
> 中自行绑定。
> {style="note"}

## Find Pull Request

把光标放在某一行上，然后 **右键单击 → Open In → Find Pull Request**。

接下来会发生什么，取决于这次查找的结果：

| 结果             | 你会得到                                                                                                                                         |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **一个拉取请求** | 它会立即**在 IDE 中**打开——详情视图加时间线。没有弹窗，也不会打开浏览器。                                                                        |
| **多个拉取请求** | 一个标题为 *Pull requests containing &lt;短 SHA&gt;* 的弹窗将它们逐一列出，已完成的在前，较新的在前。最后一行提供 **Open commit … in browser**。 |
| **没有拉取请求** | 该提交本身会在你的浏览器中打开——这一行早于任何 PR，或者是通过直接推送进来的。                                                                    |

## Copy Pull Request URL for Line

同样的查找，但结果落在剪贴板上： **右键单击 → Copy / Paste Special → Copy Pull Request URL for Line**。你会得到
`…/pullrequest/<id>`，以及一条 *Pull request URL copied* 的确认提示。

与 **Find Pull Request** 有两处刻意的差异：

- 当 **没有** PR 引入这一行时，你会看到一条错误提示（ *No pull request introduced this line*）——它 **不会**
  悄悄回退到提交页面，因为你要的是一个 PR 的 URL，而它并不存在。
- 出于同样的原因，多结果弹窗中省略了 *Open commit in browser* 那一行。

> **与 Copy Link to Code 不是一回事。** *Copy Link to Code*（<shortcut>⌘⇧L</shortcut> / <shortcut>Ctrl+Shift+L</shortcut>
> ，位于同一个 **Copy / Paste Special** 菜单中）链接到你 **选中的代码**——无论是在正在审查的 PR 中，还是在已连接仓库的任何文件中。而
> *Copy Pull Request URL for Line* 回答的是相反的问题—— **是哪个 PR** 引入了这一行——并指向该 PR
> 本身，不带行锚点。参见[](Code-Review-zh.md)。
> {style="note"}

## Annotate with Pull Requests {id="annotate"}

整个文件的视图。 **右键单击行号边栏 → Annotate with Pull Requests**——就是承载 Git 自带的 *Annotate with Git Blame*
的那个菜单，用法也一样：行号旁会出现一列，每行一个条目。

该列只显示 **拉取请求编号**——`!1234`——别无其他。没有作者，没有日期，也没有 SHA。它每行只回答一个问题，因此足够窄，可以一直开着不影响你工作。

- **悬停**某一行可看到一张摘要卡片：状态、标题、由谁发起、分支，以及审阅者（最多五个头像，其余显示为 `+N`）。
- **单击**某一行可在 IDE 中打开该拉取请求。
- 其提交不属于任何拉取请求的行会 **留空**，而不是显示一个 SHA——留空意味着“没有 PR 引入这一行”，这才是诚实的答案。
- 当某一行的提交属于多个 PR 时，该列会显示最有可能解释这一行的那个：已完成的优先，较新的优先。

从同一个边栏菜单即可关闭它（开启时该菜单项带有勾选标记）。

> **当你新增或删除一行时，它会自行关闭。** 该列以行号为键，因此一处让行位移的编辑会让每一行都指向错误的拉取请求。与其撒谎，它选择直接关闭——编辑完成后重新开启即可。在行
> *内部*输入则没有问题，不会关闭它。
> {style="warning"}

对整个文件执行 blame 相当于一次 `git blame` 加一次批量查找，因此加载期间会有一个进度提示（“Looking up pull requests for
this file…”）。单行操作的开销要小得多，不显示任何进度 UI。

## 查找是如何工作的 {id="how-it-works"}

值得了解，因为它能解释下文的每一种边界情况：

<procedure title="从光标到拉取请求">
    <step>插件在本地对该行运行 <b>git blame</b>，得到最后修改它的那个提交。</step>
    <step>它向 Azure DevOps 询问哪些拉取请求包含该提交——在一次请求中发出<b>两条</b>查询：一条把该提交当作 PR 的<b>源提交</b>，另一条把它当作 PR 的<b>合并提交</b>。</step>
    <step>结果会去重并排序：已完成的拉取请求优先，然后按较新的优先。</step>
</procedure>

正是这种双向询问，让它在各种完成策略下都可靠。如果 PR 是**合并（merge） **的，blame 看到的是它原始提交中的某一个。如果它是**
压缩（squash）**的，那些提交从未进入目标分支，blame 只能看到那个压缩提交。只用一条查询会漏掉一半历史；两条则能同时覆盖
merge、squash 和 rebase。

不做任何缓存——每次调用都会重新 blame、重新查询，因此答案始终反映当前的文件和当前的服务器状态。

## 边界情况与提示消息

失败会以 **光标处的提示**呈现，绝不会用气泡或对话框：

| 消息                                                                                            | 含义                                                                                             |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **This line has no committed history yet**                                                      | 这一行尚未提交——刚刚敲进去的，或属于未暂存的改动。没有可供查找的提交。                           |
| **No pull request introduced this line**                                                        | 提交存在，但没有 PR 包含它（直接推送，或早于你们的 PR 流程的历史）。仅 *Copy URL* 会出现此消息。 |
| **This file isn't in a repository with an Azure DevOps remote**                                 | 该文件不在插件能识别的 Git 仓库下。                                                              |
| **This repository belongs to a different Azure DevOps organization than the connected account** | 远程仓库指向另一个组织——请登录该组织，或切换账户。                                               |
| **Connect an Azure DevOps account to look up pull requests**                                    | 尚未绑定任何账户。参见[](Authentication-zh.md)。                                         |
| **Couldn't look up pull requests for this line**                                                | 查找调用失败——通常是离线或临时性的 API 错误。请重试。                                            |
| **This file has no committed history yet** *（边栏）*                                           | 整个文件未被跟踪，或是全新文件。                                                                 |
| **No pull request introduced any line of this file** *（边栏）*                                 | 每一行都早于你们的 PR 流程，或者都是直接推送进来的。                                             |

> **blame 读取的是磁盘上的文件。** 如果光标 *上方*存在未保存的编辑，插件所 blame 的行号是已保存版本的行号，因此可能归因到错误的行。当答案看起来不对时，请先保存。
> {style="warning"}

> 按设计，这些操作在 **差异查看器**中不可用——差异展示的是一个虚拟文件，没有可供 blame 的本地 Git 历史。请在普通编辑器中使用它们。
> {style="note"}

## 后续步骤 {id="whats-next"}

> **接下来：**[](Code-Review-zh.md)介绍如何阅读你找到的 PR，[](Git-Integration-zh.md)则说明分支如何映射到拉取请求。
> {style="tip"}
