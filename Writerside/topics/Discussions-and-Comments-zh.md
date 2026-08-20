# 讨论与评论

<tldr>
    <p><b>位置</b>：任意线程上的回复框 - 差异中的内联位置、时间线，或编辑器叠加层。</p>
    <p><b>浏览未解决线程</b>：<shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut>，以及<a anchor="review-bar">审查栏</a>的筛选标记。</p>
</tldr>

无需离开 IDE 即可在拉取请求中进行完整的对话：markdown 编辑器、@提及、工作项和拉取请求引用、建议的修改、图片附件、AI
语法润色以及线程解决。

## 线程出现的位置

同一批线程会显示在三个地方：

- **差异中的内联位置** - 锚定到它们所引用的行。参见[](Code-Review-zh.md)。
- **时间线** - 按时间顺序展示每个线程和拉取请求事件的视图。从拉取请求详情视图中的 **View Timeline** 链接打开它。（使用
  **Find in timeline** 进行搜索。）
- **编辑器中** - 当检出拉取请求的分支时，叠加在你正常的编辑器上。参见[](Review-in-Editor-zh.md)。

## 评论编辑器

每个评论编辑器 - 时间线、差异内嵌、内联编辑以及 Create-PR 描述 - 都是同一个编辑器。左上角是 **Write | Preview**
选项卡条，格式化工具栏沿同一条顶部条排布（最右端是 **Polish grammar &amp; spelling with AI**），底部一行的提交按钮左侧依次是
**Markdown is supported** 和 **Add files**。

![带有 Write | Preview 选项卡和顶部格式化工具栏条的评论编辑器，以及底部一行提交按钮旁边的 Add files 链接](comment-editor.png){ width="640" border-effect="line" }

| 分组           | 按钮                                                                        |
|----------------|-----------------------------------------------------------------------------|
| **References** | Mention user (`@`)、Reference work item (`#`)、Reference pull request (`!`) |
| **Formatting** | Heading、Bold、Italic、Inline code、Link                                    |
| **Lists**      | Bulleted、Numbered、Task list                                               |
| **AI**         | **Polish grammar &amp; spelling with AI**                                   |

在差异/编辑器内嵌中，你还会看到 **Insert code suggestion**。键盘快捷键：<shortcut>⌘B</shortcut> 加粗、<shortcut>
⌘I</shortcut> 斜体、<shortcut>⌘E</shortcut> 内联代码、<shortcut>⌘K</shortcut> 链接、<shortcut>⌘↵</shortcut>
提交（或对应的 <shortcut>Ctrl</shortcut> 组合键）。

点击 **Preview** 可将编辑器切换为你的 markdown 的渲染视图 - 与已发布评论所用的渲染相同，因此你预览的内容与你将要发布的内容一致。在显示
Preview 时格式化工具栏会隐藏；点击 **Write** 返回编辑。空白草稿预览为 *Nothing to preview*。

底部一行的 **Markdown is supported** 是一个链接：点击它会在浏览器中打开 Microsoft 的 Azure DevOps markdown
指南。想了解这里实际会渲染什么 - 任务列表、表情符号、指定尺寸的图片、带高亮的代码围栏，以及 Azure DevOps 保留给 wiki
的语法 - 请参阅 [](Markdown-zh.md)。

> **Polish grammar &amp; spelling with AI**
> 会就地将你的草稿（或所选内容）重写为一次可撤销的编辑。它需要[配置 AI 提供程序](AI-Features-zh.md)；当 AI 关闭时，该按钮会被隐藏。
> {style="tip"}

## @提及

点击 **Mention user** 或输入 `@` 可打开你组织中人员的自动完成列表。用方向键选择一个并按 <shortcut>Enter</shortcut>
；被提及的用户会收到 Azure DevOps 通知。

点击已有的 `@mention` 可打开一张小巧的 **作者卡片**，其中包含此人的头像和姓名。当已知其电子邮件时（拉取请求作者或某位审查者），该卡片会提供
**Copy email** 和 **Send email**。

> @提及自动完成需要 **Identity (Read)** 范围（PAT）或 **Full access**（OAuth）。参见[](Authentication-zh.md)。
> {style="note"}

## 工作项引用 {id="work-items"}

点击 **Reference work item** 或输入 `#` 可打开工作项的自动完成列表 - 你最近改动过的 50 个工作项，或最多五个关键词按类型、ID
或标题匹配到的结果。选中其中一个会插入 `#<id>`（例如 `#1234`）。

已发布的 `#1234` 会渲染为一个链接，点击后在 **浏览器的 Azure Boards** 中打开该工作项 - IDE 内没有工作项视图，因此它与
`@mention` 不同，不会弹出卡片；也与 `!567` 这样的拉取请求引用不同，不会在 IDE 内打开。请注意一处冲突：在行首，`#`
后跟数字是引用而不是标题。参见[](Markdown-zh.md#hash)。

> 引用不等于关联。[侧边栏](#the-timeline-sidebar)中的 **Work items** 行 - **+** 用于关联，右键点击可取消关联 -
> 才会建立 Azure Boards 所跟踪、并显示在工作项本身上的那种链接。在评论或描述中输入 `#1234` 只会得到一个可点击的引用，仅此而已。
> {style="note"}

## 图片与附件 {id="images-and-attachments"}

附加图片的三种方式：

- **Add files** - 点击底部一行（提交按钮左侧）的 **Add files** 链接，从磁盘选择图片文件。
- **Paste** - 从剪贴板粘贴图片（<shortcut>⌘V</shortcut> / <shortcut>Ctrl+V</shortcut>）。
- **Drag &amp; drop** - 将图片文件拖放到编辑器上。

支持的类型有 `png`、`jpg`、`jpeg`、`gif`、`webp`、`bmp` 和 `svg`。每次上传都会显示一个 *Uploading…* 占位符，然后变为内联
markdown 图片。右键点击已发布的图片可使用 **Copy Image Link** 或 **Download Image…**。

**点击**已发布的图片可在一个可缩放的查看器中打开它，其中提供 **Fit to Window**、 **Actual Size**、 **Zoom In**、 **Zoom
Out**、 **Save Image…**、 **Copy Image** 和 **Open in Browser**。其视图内按键为 <shortcut>F</shortcut> 适应窗口、<shortcut>
1</shortcut> 实际大小，以及 <shortcut>+</shortcut> / <shortcut>-</shortcut> 缩放。

> 评论中的围栏代码块会以 **真正的 IDE 语法高亮**渲染 - 给围栏标注语言（` ```kotlin `、` ```csharp `、` ```dockerfile `
> 等），该代码块就会以该文件类型在编辑器中的方式着色。
> {style="tip"}

## 建议的修改 {id="suggested-edits"}

要提出一处具体的更改而非描述它，请使用 **建议**。在差异/编辑器内嵌中，点击 **Insert code suggestion**（它会预填被评论的行）或输入一个
```` ```suggestion ```` 代码块。

![带有 Apply Locally 操作的建议更改](suggested-edit.png){ width="560" border-effect="line" }

该线程会渲染一张 **Suggested change** 卡片，带有 **Apply Locally**（以及 **Commit…**
，可一步完成应用并提交）。在检出拉取请求分支之前以及在已解决的线程上，Apply 会被禁用。

![线程上的 Suggested change 卡片，带有 Apply Locally 与 Commit…](suggestion-block-zh.png){ width="640" border-effect="line" }

## 回复、解决与管理线程

- **Reply** - 添加一条后续内容。Azure DevOps 线程是扁平的；你的回复会落在线程末尾。
- **Resolve / Reopen** - 在线程完成时关闭它，或将其重新打开。已解决的线程会被弱化显示，并在差异筛选器设为 *Show only
  unresolved* 时被隐藏。
- **👍 Thumbs up** - 位于评论正文下方的反应行中的点赞按钮（在审查线程上与 **Reply** / **Resolve**
  共用一行）。一旦至少有一个赞，它就会显示计数，并在你点赞后变为金色；其工具提示会在 **Thumbs up** 和 **Remove thumbs up**
  之间切换。
- **More actions (⋯)** - 评论标题中的溢出菜单。对任何评论： **Copy link**、 **Copy Markdown** 和 **Quote reply**（将该评论作为
  `>` 块引用插入到此线程的回复编辑器中）。在你自己的评论上，你还会看到 **Edit** 和 **Delete**
  。菜单打开时，每个操作都可用单个按键执行：<shortcut>L</shortcut> Copy link、<shortcut>M</shortcut> Copy
  Markdown、<shortcut>Q</shortcut> Quote reply、<shortcut>E</shortcut> Edit、<shortcut>D</shortcut> Delete。

![打开了回复编辑器的行内讨论线程](reply-to-thread.png){ width="720" border-effect="line" thumbnail="true" }

### 线程状态

除了已解决/未解决之外，线程还带有一个状态标记。点击它（ **Change status**）可在以下状态之间切换：

| 状态          | 含义                       |
|---------------|----------------------------|
| **Active**    | 新线程（不显示标记）。     |
| **Pending**   | 等待作者的修改。           |
| **Resolved**  | 更改已应用。               |
| **Won't fix** | 已知悉，但不会进行该更改。 |
| **Closed**    | 讨论完成，无需操作。       |

### 线程上下文

线程会在被评论行周围显示几行代码。显示多少行由你在[设置](Settings-zh.md)中的 **Lines shown above a comment** 和
**Lines shown below a comment** 设定 - 默认分别为 3 和 3。

## 浏览长对话 {id="review-bar"}

对话区上方是一条 **审查栏** - 时间线的控制条。左侧统计整个讨论（`N conversations · M unresolved`）；右侧则是筛选标记：

| 标记                  | 作用                                                                                                                             |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **All events**        | 一个下拉菜单，把时间线收窄到某一类事件 - 评论、提交与更新、投票、状态变更、审阅者或系统事件。默认为 *All events*，显示全部内容。 |
| **Mine**              | 只显示你参与的线程。                                                                                                             |
| **Needs my reply**    | 球在你这边的未解决线程。                                                                                                         |
| **Participants**      | 按发起线程的人筛选 - 一个实时的多选人员选择器。选定之后，标记会把自己改写为 *Participants: &lt;name&gt; +N*。                    |
| **Collapse resolved** | 把已解决的线程各折叠为一行。会在会话之间记住，和 <shortcut>H</shortcut> 切换的是同一件事。                                       |
| **?**                 | 键盘速查表。                                                                                                                     |

另有两处设计能帮你处理剩下的内容：

- 时间线上方浮着一个 **未解决导航器**：两个箭头加一个 `N of M` 计数器，处理干净后会显示 *No unresolved*。它是 <shortcut>
  F8</shortcut> / <shortcut>⇧F8</shortcut> 的鼠标版。
- 滚动条轨道上每个未解决线程都有一个 **刻度**，就像 IDE 自己的错误条纹。点击某个刻度即可直接跳到该线程。

## 时间线侧边栏 {id="the-timeline-sidebar"}

右侧边栏是拉取请求元数据所在之处 - 而且与 Create 表单不同，它在拉取请求的整个生命周期内都是可编辑的。

| 区块              | 你可以做什么                                                                                                                                                                                                                                                  |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Reviewers**     | 分为 **Required** 和 **Optional** 两个子组，每组都有一个 **+** 用于添加人员。行的溢出菜单提供 **Make optional** / **Make required** 和 **Remove**。由分支策略添加的审查者带有策略图标以及提示 *Reviewers were added by policy*。空的分组显示为 *No reviews*。 |
| **Tags**          | 用 **+** 添加标签；右键点击某个标签可将其移除。                                                                                                                                                                                                               |
| **Work items**    | 用 **+** 关联工作项。                                                                                                                                                                                                                                         |
| **AI review**     | 最近一次 AI 审查是否仍然是最新的 - 参见 [AI 功能](AI-Features-zh.md)。                                                                                                                                                                                        |
| **Notifications** | **Mute live updates** / **Resume live updates** - 参见[拉取请求](Pull-Requests-zh.md#refresh-and-background-sync)。                                                                                                                                           |
| **Participants**  | 对该拉取请求做过操作的每一个人 - 作者、投票的审查者、评论作者，以及给评论点过赞的人 - 已去重，作者排在最前。                                                                                                                                                  |

> 作为审查者添加的团队，其投票会显示为 **Approved via &lt;member&gt;**，指明实际代表该团队投票的人。
> {style="note"}

## 时间线事件

除评论之外，时间线还会记录拉取请求上发生的事情：投票更改、审查者的添加或移除、工作项的关联或取消关联、已完成的状态检查、草稿/就绪的切换，以及完成或放弃。

有两类事件值得特别说明，因为它们的作用比看上去更多：

- **添加提交。** 每次推送都会追加一条 *N commits added* 事件，列出新提交及可点击的短 SHA。
- **更新（迭代）。** 每次更新都渲染为 *updated &lt;branch&gt; from &lt;sha&gt; to &lt;sha&gt;*，并带有一个 **Compare
  changes** 链接。点击它会把变更树重新限定为仅该次更新 - 也就是 ⋮ 菜单中 **Review Changes Since…**
  提供的同一种迭代审查，只是一键可达。参见[代码审查](Code-Review-zh.md#compare)。当源分支顶端实际上并未移动时，该链接会被省略。

### 分组审查

当某人一次性留下多条评论时，时间线会把它们折叠为 **单个审查事件** -
一个带有其投票的标题、可选的摘要，以及可折叠的按文件分行 - 而不是在页面上散落五条独立条目。

![时间线中的分组审查：一个标题，下面是每个文件的可折叠行](grouped-review.png){ width="720" border-effect="line" thumbnail="true" }

通过插件提交的审查会被精确分组。在别处（例如 Azure DevOps 网页 UI）留下的批量评论，当同一作者在几分钟之内接连发布时会被归为一组，并把邻近的投票并入标题。

### 过时的评论

当后续提交改动了某条评论所指向的行时，该线程会获得一个 **Outdated** 标记。这个标记同时也是一个开关：点击它可以看到
*原始差异 - 即这条评论写下时那段代码的样子*，再次点击则返回当前代码。当无法重建代码片段时，该线程会显示 *Diff preview isn't
available for this comment*。
