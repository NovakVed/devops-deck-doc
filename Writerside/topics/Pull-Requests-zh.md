# 拉取请求

<tldr>
    <p><b>位置</b>：<b>Pull Requests</b> 工具窗口，<shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>。</p>
    <p><b>跳转到某个拉取请求</b>：<b>Go to Pull Requests…</b>，<shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>。</p>
    <p><b>创建</b>：工具窗口工具栏中的 <b>+</b> 按钮。</p>
</tldr>

**Pull Requests** 工具窗口是你的指挥中心：浏览队列、筛选与搜索、打开某个拉取请求，并对其执行操作——完成、还原、比较等等。

## 打开工具窗口

只要打开的项目至少包含一个 Azure DevOps Git 远程，工具窗口就会出现在左侧边栏。（没有 Azure DevOps 远程？它会保持隐藏，以减少杂乱。）

- 按 <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>。
- 或点击边栏中的 **Pull Requests** 条纹图标。
- 或使用 <ui-path>View | Tool Windows | Pull Requests</ui-path>。
- 或运行 *Find Action*（<shortcut>⌘⇧A</shortcut> / <shortcut>Ctrl+Shift+A</shortcut>）并输入 **Pull Requests**。

![在编辑器旁打开的 Pull Requests 工具窗口](pr-tool-window-shortcuts.png){ width="720" border-effect="line" thumbnail="true" }

> 该快捷键是 IDE 标准的 *Activate tool window* 操作，因此可以在 <ui-path>Settings | Keymap</ui-path> 中搜索 **Pull Requests**
> 重新绑定。插件的全部快捷键见[](Keyboard-Shortcuts-zh.md)。
> {style="tip"}

## 查找拉取请求

### 默认视图：全部

未启用任何筛选器时，列表显示各种状态下的 **所有拉取请求**——活动、草稿、已合并和已放弃并列显示。这是你进入时所处的视图，也是 *Clear filters* 将你带回的视图。

![未筛选的列表：活动、草稿、已合并和已放弃的拉取请求同处一个队列](browse-pull-requests.png){ width="720" border-effect="line" thumbnail="true" }

要只看属于你的，请在 **State** 纸片中选择 **Mine**——由你 **创建**、 **分配给你**或 **分配给你所在某个团队**的活动拉取请求，与
Azure DevOps 网页版 **Mine** 标签的集合相同。

> 分配给团队的拉取请求需要正确的[](Permissions-zh.md)。如果你的凭据无法读取团队成员关系，插件会提示你一次——视图的其余部分照常工作。
> {style="note"}

### 快速筛选器

点击纸片行左侧的 **筛选器图标**即可使用一键预设。图标上的徽标会显示当前有多少个筛选器处于活动状态。

![在有三个筛选器处于活动状态时，从筛选器图标下方展开的快速筛选器菜单](quick-filters.png){ width="520" border-effect="line" }

| 预设                    | 显示内容                                                       |
|-------------------------|----------------------------------------------------------------|
| **Active**              | 活动的拉取请求（一个 **State** 预设）                          |
| **Includes my changes** | 你创建的拉取请求                                               |
| **I am a reviewer**     | 审阅者列表中包含你的拉取请求                                   |
| **Waiting for author**  | 你投了 **Waiting for author** 票的拉取请求（一个 **Review** 预设） |
| **I reviewed**          | 你已经投过票的拉取请求                                         |
| **Awaiting my review**  | 你作为审阅者但尚未投票的拉取请求                               |
| **Abandoned**           | 已放弃的拉取请求（一个 **State** 预设）                        |
| **Clear N filter(s)**   | 重置所有活动筛选器——回到默认的全部拉取请求视图                 |

预设是一种 **视图**：选择某个预设会替换当前的筛选器，而不是叠加在其上。两个与“我”有关的预设会在插件知道你是谁之后出现。

### 筛选器纸片

搜索字段下方有一行可滚动的纸片。点击任意纸片即可细化列表：

| 纸片              | 选项                                                                                               |
|-------------------|----------------------------------------------------------------------------------------------------|
| **State**         | Mine · Active · Completed · Abandoned                                                              |
| **Author**        | 跨用户的即时输入搜索                                                                               |
| **Assignee**      | 跨用户的即时输入搜索                                                                               |
| **Target branch** | 拉取请求要合并进的分支                                                                             |
| **Tags**          | Azure DevOps 拉取请求标签（tags）                                                                  |
| **Draft**         | Yes · No                                                                                           |
| **Sort**          | Newest · Oldest · Most/Least commented · Recently/Least recently updated · Id, newest/oldest first |

另有四个维度—— **Review**、 **Work Items**、 **Approved by** 和 **Source branch** ——没有自己的纸片，但可以从搜索字段筛选同一个列表：输入
`review:`、`workItem:`、`approvedBy:` 或 `sourceBranch:` 并选择一个值（见下方 **搜索**）。快速筛选器的各个预设用更直白的说法询问的，也正是审阅状态。

筛选器 **按项目**在 IDE 重启后持久保存。要清除它们，请使用快速筛选器菜单中的 **Clear N filter (s)**。纸片也可以直接从搜索字段设置——输入
`author:` 这样的筛选键，然后从补全弹窗中选择（见下方 **搜索**）。

> **搜索**——在纸片上方的字段中输入，即可匹配拉取请求的标题、编号、作者和分支名称。输入筛选键——`state:`、`author:`、`tag:`、
> `assignee:`（别名 `reviewer:`）、`approvedBy:`、`review:`、`workItem:`、`sourceBranch:`、`targetBranch:` 或
> `draft:`——会打开一个列出可用值的补全弹窗；选中某个值即可应用对应的筛选器，并把该标记从查询中移除。键本身也会自动补全：输入
> `au` 会提示 `author:`。按 <shortcut>Enter ↵</shortcut> 会把当前搜索（查询和筛选器一起）保存到 **历史记录**中：点击字段的搜索图标（或按
> **Show Search History** 快捷键 <shortcut>⌥↓</shortcut> / <shortcut>Alt+Down</shortcut>）即可重新应用最近的搜索。历史记录按项目保存，最多保留最近
> 5 条。
> {style="tip"}

### 跳转到特定拉取请求 {id="jump-to-a-specific-pr"}

当你已经知道想要哪个拉取请求时，可跳过列表。 **Go to Pull Requests…** 会对每个已缓存的拉取请求进行模糊搜索——按
**id、标题、作者或仓库**——并直接在其时间线上打开。空搜索会列出每个已缓存的拉取请求（未读优先，然后是最新的）。

- 按 <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>。
- 或使用 <ui-path>VCS | Go to Pull Requests…</ui-path>。
- 或运行 *Find Action*（<shortcut>⌘⇧A</shortcut> / <shortcut>Ctrl+Shift+A</shortcut>）并输入 **Go to Pull Requests**。

默认情况下，它会打开插件自己的快速选取弹出窗口——一个旁边带有状态 **漏斗**的搜索字段，以及 <shortcut>Enter ↵</shortcut>
打开 / <shortcut>Esc ⎋</shortcut> 关闭键。同一个窗口还带有一个 **Pipelines** 选项卡，因此 **Go to Pipeline** 也会落在这里。

> 更喜欢 IDE 的 *Search Everywhere*？在 [Navigation 设置页面](Settings-zh.md#page-navigation)上 **开启**
> **Show Go to Pull Requests and Go to Pipeline in Search Everywhere**，该操作便会改为在那里打开一个 **Pull Requests**
> 标签，与 Files、Symbols 和 Actions 并列；按 <shortcut>Enter ↵</shortcut> 打开高亮的拉取请求。命中结果会归入
> **Pull Requests** 分组之下；而一次没有结果的搜索不会留下空白标签，而是留下一行灰色的占位行——输入之前显示
> **No pull requests cached yet**，输入之后显示 **No pull requests match “X”**。
> {style="tip"}

![Go to Pull Requests 结果：Search Everywhere 中的 Pull Requests 标签](go-to-pull-request.png){ width="640" border-effect="line" }

#### 专用对话框会告诉你什么 {collapsible="true"}

该对话框的输入框提示为 *Search pull requests by id, title, author, or repo*，而它的空状态会直接说明为何没有结果：

| 你看到                                         | 原因                                                           |
|------------------------------------------------|----------------------------------------------------------------|
| **No pull requests**                           | 初始占位文本，出现在首次扫描缓存之前                           |
| **No pull requests cached yet**                | 缓存中没有内容，而你也还没有输入查询                           |
| **No pull requests for the selected statuses** | 漏斗把所有内容都筛掉了                                         |
| **No pull requests match “query”**             | 你的查询没有匹配到任何内容                                     |
| **Couldn't load pull requests - …**            | 后台加载失败；末尾会说明错误，或回退为 *check your connection* |

漏斗打开时默认勾选全部状态。它是 **每次弹窗独立**的选择——收窄范围不会被记住，下次打开对话框时所有状态都会恢复勾选。

## 读懂一行拉取请求 {id="read-a-pr-row"}

每一行都一目了然地呈现状态：

![一行拉取请求的构成剖析](pr-row-anatomy.png){ width="640" border-effect="line" }

- **标题和 `!` 编号**，并在相关时附带 **状态标签**： *Draft*、 *Merged*、 *Abandoned* 或 *Has merge conflicts*。
- **审阅者投票图标**——已批准、已批准并附建议、等待中或已拒绝。
- **琥珀色讨论徽标**，显示线程数量（以及仍有多少未解决）。
- **注意力纸片**—— *Review requested*、 *Mentions you* 或 *Replied*
  ——当某个拉取请求需要你关注时出现。这些默认关闭；参见[通知与注意力](Notifications-and-Attention-zh.md)来开启它们。

未读的拉取请求可显示一个蓝色 **未读标记**圆点，它会对新提交 *以及*新评论活动作出反应。可从工具窗口齿轮 → **Show unread
markers** 切换。

## 打开并操作拉取请求 {id="open-and-act-on-a-pr"}

**点击**某个拉取请求即可打开它的详情视图——标题与分支、状态检查、变更文件树以及操作栏。 **View Timeline** 会在旁边打开讨论。

![打开的拉取请求：带有状态检查和操作栏的详情视图，以及旁边的讨论时间线](pr-opened.png){ width="720" border-effect="line" thumbnail="true" }

底部的操作栏会根据你的角色自适应：

| 你的身份是…          | 主要操作                                                                                              |
|----------------------|-------------------------------------------------------------------------------------------------------|
| **审阅者**           | **Approve ▾**（拆分按钮：Approve with suggestions、Wait for author、Request changes、Reset feedback） |
| **作者，需要审阅**   | **Request review**                                                                                    |
| **作者，审阅进行中** | **Complete ▾**（Set auto-complete…、Mark as draft、Abandon）                                          |
| **作者，草稿**       | **Publish ▾**（Abandon）                                                                              |
| **作者，已放弃**     | **Reactivate ▾**（Delete source branch）                                                              |
| **未参与**           | **Set myself as reviewer**                                                                            |

> 你的投票随时可以更改；再次投票只会替换先前的值。
> {style="note"}

每种状态还会显示一个包含完整操作集的 **⋮**（More）菜单：

![在你创建的活动拉取请求上展开的操作栏 More 菜单](pr-more-menu.png){ width="380" border-effect="line" }

| 操作                                           | 作用                                                                                                                                    |
|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| **Share Pull Request…**                        | 通过电子邮件将拉取请求发送给他人（不会添加审阅者，也不会发布评论）                                                                      |
| **Submit Pending Comments (N)**                | 将你排队的评论作为一次审查发布（仅当 N > 0 时）                                                                                         |
| **Restart Merge**                              | *（存在冲突、合并失败或被策略拒绝的活动拉取请求）* 促使 Azure DevOps 重新计算合并。没有进度条——观察合并状态翻转为 *Queued* 再翻回来即可 |
| **Change Target Branch…**                      | 将拉取请求重新指向另一个目标分支                                                                                                        |
| **Cherry-Pick…**                               | 创建一个分支，将此拉取请求的提交挑选（cherry-pick）到另一个分支上                                                                       |
| **Review Changes Since…**                      | *（至少有 2 次更新的拉取请求）* 将差异重新限定为自所选更新以来的变更——参见[代码审查](Code-Review-zh.md#compare)                         |
| **Revert…**                                    | *（已完成的拉取请求）* 创建一个还原此拉取请求变更的分支                                                                                 |
| **Open on Web** · **Copy Link**                | 跳转到 / 复制 dev.azure.com URL                                                                                                         |
| **Summarize Pull Request** · **Run AI Review** | [AI 辅助](AI-Features-zh.md)                                                                                                            |

也可右键点击任意行以使用快速操作： **View Pull Request**、 **View Pull Request in Browser**、 **Copy Pull Request URL** 和
**Refresh List**。

## 拉取请求的生命周期 {id="the-pull-request-lifecycle"}

### 草稿 → 就绪 {id="draft-to-ready"}

草稿拉取请求带有一个 **DRAFT** 标签，其主要操作显示为 **Publish**。发布会将它变为一个普通的、可审阅的拉取请求；作者也可以用
**Mark as draft** 将它退回。两者都是即时生效的——没有确认对话框——并会在时间线中记为 *Marked as ready for review* / *Marked
as a draft*。

### 完成拉取请求 {id="complete-a-pull-request"}

点击 **Complete** 打开 **Complete Pull Request** 对话框。选择一个 **Merge type**——会有一张实时图示重绘出所得历史的形状：

![带有合并策略图示的 Complete Pull Request 对话框](complete-pr-dialog.png){ width="560" border-effect="line" }

| 合并类型                    | 所得历史                                           |
|-----------------------------|----------------------------------------------------|
| **Merge (no fast forward)** | 保留所有提交的非线性历史                           |
| **Squash commit**           | 线性历史，目标分支上只留下一个提交                 |
| **Rebase and fast-forward** | 将源提交变基到目标分支上并快进                     |
| **Semi-linear merge**       | 将源提交变基到目标分支上，并创建一个双父提交的合并 |

如果某项分支策略要求使用特定策略，被禁止的选项会变灰；选中其中之一会阻止完成，并提示 *This merge type is forbidden by a
branch policy*。

**完成后选项：**

- **Complete associated work items after merging**——仅当该拉取请求确实关联了工作项时才可用。
- **Delete &lt;branch&gt; after merging**—— **默认勾选**。
- **Customize merge commit message**——默认关闭。勾选后会展开 Title 和 Description，预填为 `Merged PR <id>: <title>`（squash
  还会列出被压缩的提交）。Rebase 会忽略此项，始终沿用已有的提交消息。

> **分支策略会被遵守。** 当必需的审阅者或状态检查未满足时，对话框打开时会带有一条红色的 **Completion is blocked by:**
> 横幅，逐条列出原因。如果你持有绕过（bypass）权限，还会额外看到 **Override branch policies and enable merge**
> ，它要求填写书面理由。没有该权限时，这个复选框根本不会显示。
> {style="warning"}

**Set auto-complete…** 会让拉取请求在所有策略通过后自行合并。它打开的是同一个对话框的精简版——只有合并类型和删除分支——并且刻意允许在拉取请求
*仍被阻塞时*使用。一旦启用，状态检查上方会出现一条横幅： *Auto-complete is set — the pull request will be completed
automatically once all policies pass*，并带有一个 **Cancel auto-complete** 链接。横幅的第二行（灰色弱化显示）会列出所启用的内容——所选的合并策略（例如
*Squash commit*）以及是否删除源分支。在拉取请求列表中，已启用自动完成的行会在其他状态图标旁边显示一个小闪电徽标，悬停提示为
*Auto-complete is set*。

### 删除或恢复源分支 {id="source-branch"}

拉取请求完成后，其时间线中的合并行会提供一个后续操作，具体是哪一个取决于该分支是否已经被删除：

| 时间线显示                                           | 点击后会发生什么              |
|------------------------------------------------------|-------------------------------|
| *You can now **delete** the source branch*           | 直接在 IDE 中就地删除源分支。 |
| *The source branch has been deleted. **Restore…** ↗* | **在网页中打开该拉取请求。**  |

> **恢复是一个外链，而不是 IDE 内的操作。** **↗** 箭头就是提示：插件并不会自己恢复分支——它会把你带到 Azure DevOps
> 上的拉取请求页面，在那里使用 Azure 自己的 **Restore branch** 按钮。恢复意味着在该分支被删除时所指向的那个提交上重新创建
> ref，而这由 Azure 在服务端跟踪；在浏览器中操作才能确保你拿回的正是那个提交。
> {style="note"}

关于这一行如何决定显示什么，有两点值得了解：

- 它是根据拉取请求自身的完成选项加上你本次会话中的操作来推断分支的去向——它 **不会**再去服务端核实该分支。如果有人在 **IDE
  之外**删除或恢复了该分支，这一行在拉取请求重新加载之前不会察觉。
- 删除链接会提供给任何查看该已合并拉取请求的人，而不只是作者。如果你的权限不允许，即便这一行更新了，删除在服务端也不会生效——如果这一点很重要，请在网页上确认。

如果你根本不想操心这件事，请在 Complete 对话框中保持勾选 **Delete &lt;branch&gt; after merging**，分支就会在合并时被清理掉。

> 对于 **已放弃**的拉取请求， **Delete source branch** 则是一个正式的操作——它位于 **Reactivate ▾** 下拉菜单中。
> {style="tip"}

### 放弃与重新激活 {id="abandon-and-reactivate"}

**Abandon** 会请求确认（ *Are you sure you want to abandon this pull request?*），随后在不合并的情况下关闭该拉取请求。时间线会记录
*Pull Request Abandoned*。

已放弃的拉取请求随时可以用 **Reactivate** 找回——无需确认，时间线会记录 *Pull Request Reactivated*。

> 已放弃的拉取请求在列表中显示 **ABANDONED** 标签，而它的详情视图则把该状态标为 **CLOSED**——同一件事的两种叫法。
> {style="note"}

### Cherry-pick 与还原 {id="cherry-pick-and-revert"}

两者都位于 **⋮** 菜单中，工作方式也相同：你选择要把改动应用 **到**哪个分支上，插件则为结果创建一个 **新分支**
。两者都不会修改你出发时的那个拉取请求。

- **Cherry-Pick…** 把此拉取请求的提交复制到另一个分支上，新分支默认名为 `cherry-pick/<source-branch>`。
- **Revert…**（仅限已完成的拉取请求）创建一个撤销此拉取请求改动的分支，默认名为 `revert/<source>-<id>`，并预先选中该拉取请求的目标分支。

Azure DevOps 会在服务端执行该操作，期间会运行一个可取消的进度任务。完成后你会收到一个气泡，其中的 **Create Pull Request**
操作会打开预填好的 Create 表单——新分支为源，你选择的分支为目标，标题形如 `Revert "<original title>"`。
**要让改动真正落地，仍然需要这第二个拉取请求**——光有分支什么都不会改变。

## 创建拉取请求

在 **Pull Requests** 工具窗口中点击 **+**（Create Pull Request）——它是列表标签页右上角工具栏中的第一个图标，位于拆分视图、**⋮** 和隐藏图标的左侧。

![Pull Requests 工具窗口工具栏中的 +（Create Pull Request）按钮，悬停后显示其工具提示](create-pr-button-zh.png){ width="590" border-effect="line" }

列表旁边会打开一个 **新建 PR** 标签页，并预填充源分支（你的当前分支）和默认目标分支。

![创建拉取请求表单：源分支与目标分支、更改的文件树、已填入 Markdown 拉取请求模板的描述编写器，以及审阅者、标签和工作项行](create-pr-ai-zh.png){ width="640" border-effect="line" }

**description**（描述）使用与拉取请求评论相同的编写器：一条 **Write | Preview** 标签条，编辑器上方有格式工具栏。输入 `@`、`#`
或 `!` 可对人员、工作项和拉取请求进行内联自动补全。按 <shortcut>⌘↵</shortcut> / <shortcut>Ctrl+Enter</shortcut> 创建。

描述下方的元数据区块是四个内联行——每行都带有一支用于编辑的铅笔，并在显示时带有一个用于清除的 **X**：

| 行                     | 你设置的内容                                                     |
|------------------------|------------------------------------------------------------------|
| **Required reviewers** | 必须审阅的人员                                                   |
| **Optional reviewers** | 受邀审阅的人员                                                   |
| **Tags**               | Azure DevOps 拉取请求标签——选择现有的，或使用 **+** 创建全新标签 |
| **Work items**         | 关联的 Azure Boards 工作项                                       |

使用 **Work items** 行才能真正关联一个工作项：在描述中输入的 `#1234` 只是一个会渲染为链接的[引用](Markdown-zh.md#hash)，而不是关联。

主按钮是一个拆分按钮： **Create Pull Request**，其下拉菜单中有 **Create Draft Pull Request**。

> 在[启用 AI](AI-Features-zh.md) 后，描述编写器工具栏会新增一个 AI 按钮（工具提示 **Generate title &amp; description with
AI**），它会根据你分支的提交起草标题和描述。如果尚未设置任何 AI 提供程序，点击它会提示打开 AI Settings。
> {style="tip"}

## 刷新与后台同步 {id="refresh-and-background-sync"}

列表会按同步计划自行更新，但你也可以按需刷新：

- 在工具窗口获得焦点时按 <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> 或 <shortcut>F5</shortcut>。
- 或右键点击某一行 → **Refresh List**。

> 轮询节奏为[](Settings-zh.md)中的 **Refresh every (seconds)**（默认 60 秒）。冷启动时，列表会在首次同步进行期间显示其
> **最近已知的缓存状态**，因此你可以立即操作，而不必等待加载图标。
> {style="note"}

### 静音实时更新 {id="mute-live-updates"}

已打开的拉取请求会按同样的节奏刷新，这可能在你阅读到一半时把时间线搅乱。时间线侧边栏的 **Notifications** 区块中有一个按钮可以停止它：

| 按钮                    | 工具提示                                                                               |
|-------------------------|----------------------------------------------------------------------------------------|
| **Mute live updates**   | *This pull request refreshes automatically. Mute to stop live updates while you read.* |
| **Resume live updates** | *Live updates are paused. Resume, or use Refresh to check for new activity.*           |

静音期间，铃铛图标上会出现一道斜杠。该开关是 **按拉取请求**生效的，并且只暂停自动刷新——即便在暂停期间，显式的 **Refresh**
仍会拉取新的活动。

静音期间，如果拉取请求在服务器上发生了变化，时间线顶部会出现一条不打扰的 **This pull request has updates** 横幅——点击
**Refresh** 拉取变更，或恢复实时更新。

## 切换账户或仓库

对于绑定到多个组织或仓库的项目，请使用工具窗口齿轮 → **Switch Account / Repository…**。当前分支的拉取请求还会显示在 Git
分支小组件和状态栏中——参见 [](Git-Integration-zh.md)。

列表选项卡以它所限定的那个 Git 仓库命名（`my-service`），只有在无法解析出任何 Azure DevOps 远程仓库时才会显示为 **All
repositories**。
