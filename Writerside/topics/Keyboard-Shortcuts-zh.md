# 键盘快捷键

<tldr>
    <p><b>工具窗口</b>：Pull Requests 为 <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>，Pipelines 为 <shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut>。</p>
    <p><b>重新绑定</b>：<ui-path>Settings | Keymap</ui-path>，搜索 <code>AzureDevOps</code>。参见<a anchor="rebind">如何重新绑定</a>。</p>
    <p><b>视图内按键</b>：拉取请求时间线和管道运行编辑器可用 <shortcut>?</shortcut> 列出各自的按键。</p>
</tldr>

插件用到的所有快捷键，集中在这里。共有两类：

- **IDE 操作** —— 注册到 IDE 中，显示在其菜单里，可在 <ui-path>Settings | Keymap</ui-path> 中 **重新绑定**。每个都有一个
  **Action ID**（大多数以 `AzureDevOps` 开头；工具窗口的操作则与其窗口名一致）。
- **视图内按键** —— 内置于某个特定视图（评论编辑器、拉取请求时间线、图片预览、管道运行编辑器、统计视图、工具窗口的搜索框），仅在该视图获得焦点时生效。它们不在
  Keymap 中，也无法重新绑定。

> 在 macOS 上，<shortcut>⌘</shortcut> 是 Command，<shortcut>⌃</shortcut> 是 **Control** —— 大多数操作使用 ⌘，但少数使用
> ⌃。Windows / Linux 使用 <shortcut>Ctrl</shortcut>。
> {style="note"}

## 工具窗口

从任意位置打开（或聚焦）插件的工具窗口。这些是 IDE 标准的 **Activate tool window** 操作，因此可在 <ui-path>Settings |
Keymap</ui-path> 中重新绑定（搜索窗口名）。

| 操作                       | macOS                    | Windows / Linux                   | Action ID                              |
|----------------------------|--------------------------|-----------------------------------|----------------------------------------|
| **Pull Requests** 工具窗口 | <shortcut>⌘⇧Y</shortcut> | <shortcut>Ctrl+Shift+Y</shortcut> | `ActivatePullRequestsWindowToolWindow` |
| **Pipelines** 工具窗口     | <shortcut>⌘⇧W</shortcut> | *第一个可用的组合 —— 见工具提示*  | `ActivatePipelinesWindowToolWindow`    |

> **Pipelines** 快捷键只有在项目拥有 Azure DevOps 远程时才起作用——正是它让工具窗口可用。在其他项目中没有可打开的窗口。
> {style="note"}

### 为什么 Pipelines 快捷键因平台而异 {id="pipelines-shortcut" collapsible="true"}

在 **macOS** 上，默认是 <shortcut>⌘⇧W</shortcut> —— 这是在原生 2026.2 键位映射上仍然空闲的少数几个 ⌘⇧ 组合之一（现代
IntelliJ 占用了其中大多数：⌘⇧J 是 Database console，⌘⇧O 是 Go to File，⌘⇧K 是 Push，……）。在 **Windows / Linux**
上，插件改为选取第一个可用的组合，因此可能有所不同 —— **将鼠标悬停在 Pipelines 状态条图标上即可看到实际的按键**
。默认组合已被你用作其他用途？可在 <ui-path>Settings | Keymap</ui-path> 中重新绑定 Pipelines（搜索 **Pipelines**）。

> 该快捷键会在插件加载后立即 **按项目**植入，并且始终尊重已有或重新绑定的按键 —— 因此安装或更新后即可直接使用，无需重启。
> 重新绑定会立即生效，只是条纹图标的悬停工具提示在项目重新打开之前可能仍显示旧按键。
> {style="tip"}

### 聚焦搜索框 {id="focus-search"}

两个工具窗口的列表上方都有一个搜索框。当工具窗口获得焦点时，按 <shortcut>⌘L</shortcut> /
<shortcut>Ctrl+L</shortcut> 即可跳转到该搜索框并选中当前查询 —— 该按键也会显示在搜索框的占位文本中。这是视图内按键
（内置于工具窗口，不在 Keymap 中），因此从编辑器过来时请先按窗口的激活快捷键 —— 例如先按
<shortcut>⌘⇧Y</shortcut>，再按 <shortcut>⌘L</shortcut>。

## 在编辑器中（在编辑器中审查）

| 操作                   | macOS                    | Windows / Linux                   | Action ID                                    |
|------------------------|--------------------------|-----------------------------------|----------------------------------------------|
| **Add Review Comment** | <shortcut>⌃⇧M</shortcut> | <shortcut>Ctrl+Shift+M</shortcut> | `AzureDevOps.PullRequest.AddCommentAtCursor` |
| **Copy Link to Code**  | <shortcut>⌘⇧L</shortcut> | <shortcut>Ctrl+Shift+L</shortcut> | `AzureDevOps.PullRequest.CopyCodeLink`       |

**Add Review Comment**
只有当光标位于已打开拉取请求中某个文件的已更改行上时才会触发，参见[](Review-in-Editor-zh.md)。 **Copy Link
to Code**（右键 → **Copy / Paste Special**
）在审查之外也可用——已连接仓库中的任何文件都可以，参见[](Code-Review-zh.md)。

## 在编辑器中（任意文件）

[](Find-Pull-Requests-From-Code-zh.md)的这些操作默认不带快捷键 —— 可通过 [Keymap](#rebind) 自行绑定：

| 操作                               | 位置                                | Action ID                                          |
|------------------------------------|-------------------------------------|----------------------------------------------------|
| **Find Pull Request**              | 右键单击 → **Open In**              | `AzureDevOps.PullRequest.FindForLine`              |
| **Copy Pull Request URL for Line** | 右键单击 → **Copy / Paste Special** | `AzureDevOps.PullRequest.CopyUrlForLine`           |
| **Annotate with Pull Requests**    | 右键单击**行号边栏**                | `AzureDevOps.PullRequest.AnnotateWithPullRequests` |

## 在差异查看器中

| 操作                        | macOS                                              | Windows / Linux                                         | Action ID                                    |
|-----------------------------|----------------------------------------------------|---------------------------------------------------------|----------------------------------------------|
| **Mark File as Viewed**     | <shortcut>⌘⇧S</shortcut>                           | <shortcut>Ctrl+Shift+S</shortcut>                       | `AzureDevOps.PullRequest.MarkFileAsViewed`   |
| **Add Review Comment**      | <shortcut>⌃⇧M</shortcut>                           | <shortcut>Ctrl+Shift+M</shortcut>                       | `AzureDevOps.PullRequest.AddCommentAtCursor` |
| **Copy Link to Code**       | <shortcut>⌘⇧L</shortcut>                           | <shortcut>Ctrl+Shift+L</shortcut>                       | `AzureDevOps.PullRequest.CopyCodeLink`       |
| 下一处 / 上一处已更改的范围 | <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut> | <shortcut>F7</shortcut> / <shortcut>Shift+F7</shortcut> | *IntelliJ 内置差异*                          |
| **下一条 / 上一条评论**     | <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut> | <shortcut>F8</shortcut> / <shortcut>Shift+F8</shortcut> | *视图内按键*                                 |

> <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut> 会按同一自上而下的阅读顺序遍历**人工会话、你的待提交草稿和 AI 建议**。差异中特意没有 <shortcut>J</shortcut>/<shortcut>K</shortcut> 别名 —— 这两个键留给 IdeaVim 的移动操作。当某张 **AI 建议卡片**获得焦点时，<shortcut>A</shortcut> 会将其加入你的审查，<shortcut>D</shortcut> 会将其丢弃。
> {style="tip"}

## 在评论编辑器中

这些快捷键在评论、回复或拉取请求描述编辑器获得焦点时生效。它们内置于编辑器中（不在 Keymap 里），因此除修饰键外，在每个平台上都完全相同。

| 操作                                 | macOS                    | Windows / Linux                   |
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

> 两个相似的快捷键，用途不同： **Mention user**（<shortcut>⇧⌘M</shortcut>）在编辑器 *内部*插入一个 `@mention`，而 **Add
Review Comment**（<shortcut>⌃⇧M</shortcut>）则在编辑器或差异中光标处 *开始*一条新评论。
> {style="note"}

## 在图片预览中 {id="image-preview"}

点击评论中已发布的图片会在一个可缩放的查看器中打开它。它的按键内置于对话框中，因此在每个平台上都完全相同。

| 操作                  | 快捷键                                            |
|-----------------------|---------------------------------------------------|
| **适应窗口**          | <shortcut>F</shortcut> / <shortcut>0</shortcut>   |
| **实际大小**（100 %） | <shortcut>1</shortcut>                            |
| **放大 / 缩小**       | <shortcut>+</shortcut> / <shortcut>-</shortcut>   |
| **平移图片**          | 方向键                                            |
| **关闭**              | <shortcut>⎋</shortcut> / <shortcut>Esc</shortcut> |

> 使用鼠标时：<shortcut>⌘</shortcut> / <shortcut>Ctrl</shortcut> +
> 滚轮会朝指针方向缩放，单独滚轮为滚动，拖动则为平移。参见[讨论与评论](Discussions-and-Comments-zh.md#images-and-attachments)。
> {style="tip"}

## 在拉取请求列表、时间线和详情视图中

| 操作                                     | 快捷键                                                                          | Action ID                                     |
|------------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------|
| **Refresh List**                         | <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> | `AzureDevOps.PullRequest.List.Reload`         |
| **Refresh Timeline**                     | <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> | `AzureDevOps.PullRequest.Timeline.Update`     |
| **Refresh Pull Request**                 | <shortcut>F5</shortcut>                                                         | `AzureDevOps.PullRequest.Details.Reload`      |
| **View Pull Request**                    | <shortcut>Enter ↵</shortcut> / 双击 *（在列表中）*                              | `AzureDevOps.PullRequest.Show`                |
| **View Pull Request in Browser**         | *无默认值*                                                                      | `AzureDevOps.PullRequest.Open.Link`           |
| **Copy Pull Request URL**                | *无默认值*                                                                      | `AzureDevOps.PullRequest.Copy.Link`           |
| **Show Pull Request in the Tool Window** | *无默认值*                                                                      | `AzureDevOps.Pull.Request.Show.In.Toolwindow` |

> Pull Requests 工具窗口没有 Reload 按钮 —— 刷新只能通过键盘完成（或右键单击 → **Refresh List**）。
> {style="note"}

## 在统计视图中

**PR Statistics** 和 **Pipelines Analytics** 编辑器标签页同样没有 Refresh 按钮。当其中一个获得焦点时，按
<shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> 可重新获取其数据，右键单击 →
**Refresh Statistics** 效果相同。这些是视图内按键（内置于视图，不在 Keymap 中）—— 刷新快捷键总是刷新当前获得焦点的视图，
因此同一组按键会根据你所在的位置重新加载拉取请求列表、管道列表、统计标签页或拉取请求时间线。

## 在拉取请求时间线中

这些按键驱动 **View Timeline** 编辑器，并在其获得焦点时触发。和编辑器按键一样，它们是内置的（不在 Keymap
里）。随时按 <shortcut>?</shortcut> 可查看同一份列表。

| 操作                          | 快捷键                                                |
|-------------------------------|-------------------------------------------------------|
| **下一个未解决的会话**        | <shortcut>F8</shortcut> / <shortcut>J</shortcut>      |
| **上一个未解决的会话**        | <shortcut>⇧F8</shortcut> / <shortcut>K</shortcut>     |
| **解决 / 重新打开**聚焦的会话 | <shortcut>R</shortcut>                                |
| **回复**聚焦的会话            | <shortcut>A</shortcut>                                |
| **开始一条新评论**            | <shortcut>C</shortcut>                                |
| **折叠 / 显示已解决的**会话   | <shortcut>H</shortcut>                                |
| **查看 AI 审查评论**          | <shortcut>I</shortcut>                                |
| **在时间线中查找**            | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> |
| **显示此列表**                | <shortcut>?</shortcut>                                |

> **查看 AI 审查评论**（<shortcut>I</shortcut>）会跳转到差异中的第一条 AI 建议处 —— AI
> 审查评论以差异内嵌形式呈现，内嵌自身的箭头可逐条浏览其余内容。此功能需要先运行过一次 AI
> 审查。参见 [](AI-Features-zh.md)。
> {style="tip"}

## 在管道运行编辑器中

运行概览（从 **Pipelines** 工具窗口打开）有自己的一套按键，随时可通过 <shortcut>?</shortcut> 或阶段图工具栏上的 **?**
按钮查看。这些按键是内置的，不在 Keymap 里。

| 操作                         | 快捷键                                                                   |
|------------------------------|--------------------------------------------------------------------------|
| **查看日志 / 返回**阶段图    | <shortcut>L</shortcut>                                                   |
| **上一个 / 下一个选项卡**    | <shortcut>[</shortcut> / <shortcut>]</shortcut>                          |
| **放大 / 缩小 / 适应**阶段图 | <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut> |
| **在浏览器中打开此次运行**   | <shortcut>B</shortcut>                                                   |
| **筛选测试**（Tests 选项卡） | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>                    |
| **显示此列表**               | <shortcut>?</shortcut>                                                   |

> 在某个作业的 **日志**内部，<shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> 会改为打开日志搜索栏（跨所有步骤查找）。
> {style="note"}

## 分支小部件 / VCS 菜单

| 操作                              | 快捷键                                                       | Action ID                                          |
|-----------------------------------|--------------------------------------------------------------|----------------------------------------------------|
| **Open Current Branch PR**        | *无默认值*                                                   | `AzureDevOps.OpenCurrentBranchPr`                  |
| **Update to Enable Review Mode…** | *无默认值*                                                   | `AzureDevOps.Pull.Request.Branch.Update`           |
| **Review Mode**                   | *无默认值*                                                   | `AzureDevOps.Pull.Request.Review.In.Editor.Toggle` |
| **Go to Pull Requests…**          | <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut> | `AzureDevOps.PullRequest.GoTo`                     |
| **Go to Pipeline…**               | <shortcut>⌥⇧P</shortcut> / <shortcut>Alt+Shift+P</shortcut>  | `AzureDevOps.Pipelines.GoTo`                       |

> 默认情况下，两个 **Go to** 操作都会打开插件自己的快速选择对话框 —— 同一个窗口带有 **Pull Requests** 和 **Pipelines**
> 两个选项卡，落在与快捷键对应的那个上。在 [Navigation 设置页面](Settings-zh.md#page-navigation)上开启 **Show Go to Pull
> Requests and Go to Pipeline in Search Everywhere** 后，它们会改为打开 IDE 的 *Search Everywhere* —— 双击 **Shift**
> （<shortcut>⇧⇧</shortcut>）后同样的选项卡也会出现在那里。参见[拉取请求](Pull-Requests-zh.md#jump-to-a-specific-pr)。
> {style="tip"}

## AI 操作

| 操作                                | 快捷键     | Action ID                              |
|-------------------------------------|------------|----------------------------------------|
| **Summarize Pull Request**          | *无默认值* | `AzureDevOps.PullRequest.AI.Summarize` |
| **Run AI Review**                   | *无默认值* | `AzureDevOps.PullRequest.AI.Review`    |
| **Explain This File**               | *无默认值* | `AzureDevOps.PullRequest.AI.Explain`   |
| **Generate Commit Message with AI** | *无默认值* | `AzureDevOps.AI.GenerateCommitMessage` |
| **Analyze Logs with AI**            | *无默认值* | `AzureDevOps.Pipelines.AI.AnalyzeLogs` |

这些操作需要配置好一个 AI 提供程序 —— 参见 [](AI-Features-zh.md)。

## 如何重新绑定 {id="rebind"}

只有上面的 **IDE 操作**（带有 Action ID 的那些）才能重新绑定 —— **视图内按键**（评论编辑器、拉取请求时间线、图片预览、管道运行编辑器、统计视图和工具窗口的搜索框）是固定的。

<procedure title="绑定一个快捷键">
    <step>打开 <ui-path>Settings | Keymap</ui-path>。</step>
    <step>在搜索框中键入 <code>AzureDevOps</code>，以筛选出插件的操作（它同时匹配 action ID 和显示名称）。</step>
    <step>双击某个操作 → <b>Add Keyboard Shortcut</b>。</step>
    <step>按下组合键。如果发生冲突，IntelliJ 会警告你并提供移除冲突的选项。</step>
    <step>点击 <b>OK</b>。</step>
</procedure>

> 这两个 **工具窗口**快捷键也是 IDE 操作，但它们的 ID（`ActivatePullRequestsWindowToolWindow` /
> `ActivatePipelinesWindowToolWindow`）不包含 `AzureDevOps` —— 搜索 **Pull Requests** 或 **Pipelines** 即可找到并重新绑定它们。
> {style="note"}

> 提交 bug 时请使用 **action ID** 列 —— 它能在显示名称有时不同的各个 IDE 版本间准确标识出具体的操作。
> {style="tip"}
