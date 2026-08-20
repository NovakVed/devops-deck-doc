# 代码审查

<tldr>
    <p><b>位置</b>：打开一个 PR，然后在<b>changed-files 树</b>中点击文件。</p>
    <p><b>评论</b>：差异边栏中的 <b>+</b>，或 <shortcut>⌃⇧M</shortcut> / <shortcut>Ctrl+Shift+M</shortcut>。</p>
    <p><b>提交</b>：差异的 <b>Review:</b> 工具栏上的 <b>Submit</b> 按钮带有投票选项。</p>
</tldr>

使用 IntelliJ 原生的差异查看器审查拉取请求：阅读改动、留下行内评论和建议、投票，并跟踪你已经查看过的文件。

## 详情视图

打开一个 PR 会创建一个可关闭的编辑器选项卡—— **单一面板**，没有子选项卡。从上到下依次为：标题和 `!` 编号（带有 **View
Timeline** 链接）、源 → 目标分支、状态检查（CI、冲突、必需审查者及其投票）、 **changed-files 树**，以及操作栏。

![在单面板详情视图中打开的拉取请求](pr-detail-view.png){ width="720" border-effect="line" thumbnail="true" }

- **改动的文件**位于树中——点击其中一个即可打开差异。
- **讨论**通过 **View Timeline** 链接在其自己的选项卡中打开——参见 [](Discussions-and-Comments-zh.md)。
- **投票和操作**位于操作栏及其溢出菜单中——参见 [拉取请求](Pull-Requests-zh.md#open-and-act-on-a-pr)。

## 阅读差异

点击某个文件会在每个 PR 的单一选项卡中打开差异——点击另一个文件会就地替换它，因此 <shortcut>F7</shortcut> / <shortcut>
⇧F7</shortcut> 可以逐个浏览整个 PR 中所有改动的区域。差异选项卡带有一个 **Review:** 工具栏，包含 **Refresh**、 **Submit
review** 和 **Previous / Next Comment**。

| 导航                    | macOS                                              | Windows / Linux                                         |
|-------------------------|----------------------------------------------------|---------------------------------------------------------|
| 下一个 / 上一个改动区域 | <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut> | <shortcut>F7</shortcut> / <shortcut>Shift+F7</shortcut> |
| 下一个 / 上一个评论     | *Review: 工具栏*                                   | *Review: 工具栏*                                        |

### 图片、PDF 和其他二进制文件

PR 触及的二进制文件会在同一个差异选项卡中打开，但渲染方式取决于文件类型：

- **图片**（`png`、`jpg`、`gif` 等）会使用 IDE 真正的并排图片差异——两个修订版本都按字节精确获取，因此传输过程中不会有任何损坏。
- **PDF 及其他不透明的二进制文件**根本没有差异渲染器。插件不会显示平台那块毫无用处的 *"Cannot show file"* 面板，而是显示一张卡片——
  *"This is a binary file - the IDE has no editor that can preview it."*——其中带有 **Open in System Viewer** 按钮（将 PR
  中的该修订版本交给你的操作系统默认应用，如 Preview、Acrobat 等）、用于查看基线一侧的 **Open previous version** 链接，以及在
  PDF 上额外提供的 **Install the PDF Viewer plugin to preview PDFs inside the IDE**。安装该插件后，PDF 就能在 IDE
  内渲染，包括差异选项卡。对于 PR *删除*的文件，该按钮会显示为 **Open Previous Version**——因为没有可展示的头部一侧。

在改动树中右键点击文件 → **Open Repository Version** 可从树中完成同样的事：它会在普通编辑器选项卡中打开 PR
的该修订版本，当没有已安装的编辑器能处理该类型时则回退为系统查看器。这是查看 PR 所触及的二进制文件的唯一途径。

### 显示或隐藏讨论线程

在差异边栏的右键菜单中——就在 **Toggle Diff Aligning Mode** 的正上方—— **Review Discussions** 菜单控制渲染哪些行内讨论线程：
**Show all discussions**、 **Show only unresolved** 或 **Don't show**。

## 对某一行评论

<procedure title="添加行内评论">
    <step>将鼠标悬停在改动行的边栏上——会出现一个 <b>+</b>。点击它（或在行号上拖动以跨越一个范围）。你也可以在光标处按 <shortcut>⌃⇧M</shortcut> / <shortcut>Ctrl+Shift+M</shortcut>。</step>
    <step>输入你的评论。编辑器与 PR 讨论使用的是同一个——带有格式工具栏的 <b>Write</b> / <b>Preview</b> 选项卡条位于顶部，还支持 @提及 和图片粘贴。完整的编辑器介绍参见 <a href="Discussions-and-Comments-zh.md"/>。</step>
    <step>通过拆分式提交按钮发布评论。主操作是 <b>Start Review</b>，它会将评论作为待处理审查的一部分排队；其下拉菜单包含 <b>Add Single Comment</b>（立即发布）和 <b>Suggest change</b>（将所选内容包装为作者可应用的建议改动）。</step>
</procedure>

![在差异查看器中打开的行内评论](inline-diff-comment.png){ width="720" border-effect="line" thumbnail="true" }

> **待处理审查。** 你排队的评论会保持为草稿状态（计入 **Submit (N)** 按钮），直到你将它们与你的投票一起提交。从 **Review:**
> 工具栏或溢出菜单的 **Submit Pending Comments** 提交。
> {style="note"}

### 复制代码链接

右键点击某一行并选择 **Copy / Paste Special → Copy Link to Code**，即可复制指向该代码的 Azure DevOps Web
深层链接（文件、行和列范围），这与 Web UI 的 **Copy link** 生成的链接相同。选中文本后，该菜单项会显示为 **Copy Link to
Selected Code** 并链接到确切的字符跨度；未选中时，它会复制光标处的整行链接。快捷键是 <shortcut>⌘⇧L</shortcut> / <shortcut>
Ctrl+Shift+L</shortcut>。

它不仅在审查时可用，在已连接仓库的任何位置都可以使用：

- **在 PR 审查中**（差异查看器或在编辑器中审查界面），链接指向拉取请求的 **Files** 标签页。
- **在普通编辑器中**（已连接仓库中的任何文件），链接指向当前分支上的该文件。

> 对于不在带有 Azure DevOps 远程仓库的仓库中的文件，该菜单项保持隐藏，因此它不会在无关项目中弄乱菜单。
> {style="note"}

## 投票

操作栏的 **Approve** 按钮是一个拆分式按钮：其下拉菜单包含 **Approve with suggestions**、 **Wait for author**、 **Request
changes** 和 **Reset feedback**。

![差异视图 Review 工具栏中 Submit 按钮上的投票选项](vote-dropdown.png){ width="700" border-effect="line" }

完成或放弃 PR（包括合并策略）的相关内容在 [拉取请求](Pull-Requests-zh.md#complete-a-pull-request) 中介绍。

## 将文件标记为已查看

对于大型 PR，请随着审查进度将每个文件标记为 **已查看**——已查看的文件会在改动树中变暗。

- 按 <shortcut>⌘⇧S</shortcut> / <shortcut>Ctrl+Shift+S</shortcut>，或右键 → **Mark File as Viewed**。
- 选中多个文件后右键点击可 **Mark All as Viewed**。
- 文件夹也有复选框（悬停时显示）：点击一次即可将其中所有文件标记为已查看，再点击已全部勾选的文件夹则会全部取消。方块（半选）标记表示其中只有部分文件已查看。

![在改动树中的 Mark File as Viewed](files-viewed.png){ width="720" border-effect="line" thumbnail="true" }

> 想让文件在你打开时自动标记为已查看？在 [](Settings-zh.md) 中打开 **Mark files as viewed when I open their diff**
> （默认关闭）。
> {style="tip"}

## 只审查自某次更新以来的改动 {id="compare"}

当作者推送新的提交时，你不必重新阅读整个 PR。有两个独立的控件可以缩小改动树的范围，它们限定的对象并不相同：

| 控件                       | 位置                         | 限定范围                                                                                       |
|----------------------------|------------------------------|------------------------------------------------------------------------------------------------|
| **Review Changes Since…**  | 操作栏上的 **⋮**（更多）菜单 | 自所选**更新**以来到达的全部内容——即对源分支的一次推送。期间合并进来的目标分支提交会被过滤掉。 |
| **Changes from N commits** | 工具窗口中改动树上方的链接   | 一次一个**提交**，与其自身的父提交对比。旁边的上下箭头可在 PR 的各个提交之间移动。             |

要重新审查同事的最新推送，就选择**更新**；想单独阅读某一处改动，就选择**提交**。两者互不叠加——选择提交会清除更新范围，反之亦然。

### 限定到某次更新

打开投票按钮旁的 **⋮**（更多）菜单。当 PR 至少有两次更新后，该操作才会出现。

![拉取请求操作栏上投票按钮旁的“更多”菜单按钮](review-since-update-1.png){ width="380" border-effect="line" }

选择 **Review Changes Since…**。

![打开的“更多”菜单，其中选中了 Review Changes Since…](review-since-update-2.png){ width="520" border-effect="line" }

选取要对比的更新。✓ 标记你当前所处的范围，置顶在近期更新之上的 **All changes (N)** 可返回完整的拉取请求。

![带搜索框的更新选择器，顶部是 All changes，下方是近期更新](review-since-update-3.png){ width="440" border-effect="line" }

当某次更新处于范围内时，树的上方会出现一个横幅—— *“Reviewing only what changed since update N”*——点击 **Show all changes**
可返回完整的 PR。

### 限定到单个提交

点击改动树上方的 **Changes from N commits** 并选取一个提交：此后改动树以及你打开的每个差异都只显示该提交与其父提交的对比。链接旁的**上下**
箭头可按顺序遍历 PR 的提交，从第一个继续向前会回到完整差异——选择 **All commits** 也是如此。

> 无论采用哪种方式，评论都不会移动。缩小范围只改变你看到的文件和行，绝不会改变已经存在的讨论线程。
> {style="note"}

## 改为在编辑器中审查

当 PR
的源分支已检出时，你可以直接在正常编辑器中对改动的行进行评论——无需差异选项卡。参见 [](Review-in-Editor-zh.md)。
