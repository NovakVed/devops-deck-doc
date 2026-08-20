# 管道

<tldr>
    <p><b>位置</b>：<b>Pipelines</b> 工具窗口，<shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut>。</p>
    <p><b>始终开启</b>：只要仓库映射到 Azure DevOps 远程，工具窗口就会出现。</p>
    <p><b>发起运行</b>：右键单击某条管道 → <b>Run Pipeline…</b>。</p>
</tldr>

无需离开 IDE 即可浏览、运行和审查 Azure Pipelines —— 一个专用的 **Pipelines** 工具窗口，具备交互式阶段图、自适应运行选项卡、实时作业日志、IDE
内审批以及运行完成通知。

> 管道 **始终开启** —— 无需先手动开启，也没有关闭它的主开关。只要仓库映射到 Azure DevOps 远程，工具窗口就会出现。如果希望它安静一些，请在 [Settings](Settings-zh.md) 中取消勾选
> **Refresh pipeline runs in the background**：轮询、运行通知和条纹徽标会一起停止，而窗口仍留在那里供你随时使用。
> {style="note"}

## 管道设置

后台刷新开关及其配套选项位于 <ui-path>Settings | Tools | DevOps Lens | Pipelines</ui-path>。管道用自己的开关和间隔轮询，
独立于拉取请求——因此你可以密切关注运行而不必同样频繁地轮询拉取请求，反之亦然。

| 设置                                                         | 作用                                                                                                                                           |
|--------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| **Refresh pipeline runs in the background**                  | 轮询你的运行，通知和条形图标角标都依赖它。关闭后它们不会自动送达。它有独立于拉取请求的自己的间隔。                                                                        |
| **Notify when a run of mine finishes**              | 当你触发的运行达到终止状态时弹出气泡提示。后台刷新关闭时不起作用。                                                                             |
| **Badge the tool-window icon when my runs finish** | 在 Pipelines 条纹图标上添加一个彩色圆点 —— 失败为红色、部分成功为琥珀色、成功为蓝色 —— 直到你打开该窗口。后台刷新关闭时不起作用。              |

> **Pipelines** 条纹图标会在项目具有 **Azure DevOps remote** 后出现。它位于左侧 **Pull Requests**
> 下方，并共享同一个账户和仓库。
> {style="note"}

用 <shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut> 打开（或聚焦）该窗口。在 Windows / Linux
上，插件会改为选取第一个可用的组合键 —— **将鼠标悬停在条纹图标上以查看实际按键**。该快捷键会在插件加载后立即按项目植入，因此安装或更新后即可直接使用
—— 无需重启。参见 [Keyboard Shortcuts](Keyboard-Shortcuts-zh.md)。

## Pipelines 工具窗口

窗口在一个 **Pipelines** 列表选项卡上打开。标题操作（右上角）： **New Pipeline…**（参见[创建管道](#create-a-pipeline)）和
**Refresh**；齿轮菜单还提供 **Switch Account / Repository…**。运行从某个定义的右键菜单或其运行页面发起 ——
参见[运行管道](#run-a-pipeline)。

![带有运行导航栏和定义列表的 Pipelines 工具窗口](pipelines-tool-window.png){ width="720" border-effect="line" thumbnail="true" }

### 浏览运行

顶部横贯一个搜索栏，与 Pull Requests 窗口相呼应：

- 一个 **自由文本搜索字段**，匹配名称、分支、构建编号以及请求该运行的人。
- 一个 **View** 标签，具有三种范围 —— **Recent**、 **All** 和 **Runs**（默认 **Recent**）。
- 一个 **Status** 标签，按最近一次运行的结果筛选： **Succeeded**、 **Partially succeeded**、 **Failed**、 **Running**、
  **Canceled**。
- 一个 **Filter** 快捷菜单（带有实时指示徽标），标题为 **Quick filters**： **All pipelines**、 **Recently run**、 **All
  runs**、 **Failed only**，以及在任意筛选处于活动状态时出现的 **Clear filters**。

每种 **View** 范围显示不同的主体：

| 范围       | 显示内容                                                                                                 | 打开                                                                                                                         |
|------------|----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **Recent** | 一个扁平的管道**定义**列表，每项带有其最近一次运行的状态图标以及 `folder · last run <relative>` 副标题。 | 双击 / <shortcut>Enter ↵</shortcut> 打开该管道的**运行页面**；右键单击 → **Run Pipeline…**。                                 |
| **All**    | 以可折叠的**文件夹树**（`\Team\SubTeam`）形式呈现的管道定义，带有后代计数。                              | 双击 / <shortcut>Enter ↵</shortcut> 叶节点打开其**运行页面**；在文件夹上则切换展开状态；右键单击叶节点 → **Run Pipeline…**。 |
| **Runs**   | 一个扁平、可滚动的近期**运行**列表。                                                                     | 双击 / <shortcut>Enter ↵</shortcut> 打开该运行。                                                                             |

打开一条管道会 **就地**下钻进入其运行页面，与 Azure 网页一致。面包屑栏可返回管道列表，右上角有 **View** 和 **Run
Pipeline…** 两个链接，下方的运行行与 **Runs** 范围中的打开方式完全相同。

**View** 会在编辑器标签页中打开该管道的 YAML 定义。如果该管道构建的正是你当前项目检出的仓库，则会直接打开本地工作区中的文件；否则会按管道的默认分支获取
YAML，并以只读快照的形式打开，顶部带有一个 **Open in Browser** 横幅。经典（设计器）管道没有 YAML 文件 ——
会弹出气泡说明，并转而提供该管道的浏览器页面。

### 跟踪一次运行的作业

打开一次运行会添加一个可关闭的 `#<n>` 选项卡 —— 一个纯粹的导航器，没有日志。它的标题是运行状态字形加上管道名称，以及一个可点击的
`#<run number>`，用于在浏览器中打开该运行。下方是 **作业导航条**：一个 **Summary** 链接、一个 **All jobs** 标题，然后是
**分组在可折叠阶段标题下**的作业。

点击 **Summary** 打开运行概览编辑器，点击某个 **作业**打开该作业步骤日志的编辑器，点击某个 **阶段标题**
打开该阶段的[信息面板](#stage-information)；只有阶段的 **折叠箭头**才会折叠该分组。<shortcut>Enter ↵</shortcut> 与点击效果一致。

> 过长的模板化构建编号在选项卡标题中会做中间省略 —— 将鼠标悬停在选项卡上即可查看完整的运行标签。
> {style="tip"}

### 条纹徽标

当 **你触发的**某次运行完成而你尚未打开该窗口时，Pipelines 条纹图标会出现一个彩色圆点 ——
**失败为红色、部分成功为琥珀色、成功为蓝色**
。它会在你打开或聚焦窗口的那一刻清除，并在切换账户或组织时被抹去。用 [Settings](Settings-zh.md) 中的 **Badge the
tool-window icon when my runs finish** 控制它。参见 [Notifications &amp; Attention](Notifications-and-Attention-zh.md)。

## 打开一次运行的概览

点击 **Summary**（或某个作业）会将 **运行概览**作为一个主编辑器选项卡打开，标题为运行标签（例如 `#20260101.1`
）。重新打开同一次运行会聚焦已有的选项卡。

![一次管道运行概览：标题、选项卡和交互式阶段图](pipeline-run-overview.png){ width="720" border-effect="line" thumbnail="true" }

标题显示运行状态图标、管道名称和运行编号，以及一行灰显的元信息（`status • branch • requestedFor • duration`）。右对齐的操作有
**Cancel**（运行中时）、 **Re-run**（终止后，在同一源分支上重新排队），以及一个 **Open in Browser** 链接。如果某个阶段正在等待你处理，标题正下方会有一条
**审批门控**条带 —— 参见 [IDE 内审批](#approvals)。

### 交互式阶段图

**Summary** 选项卡打开时会显示一个 **Stages** 标题以及一个可缩放、可平移的阶段卡片 DAG。当服务器省略 `dependsOn`
时，该图回退为作业卡片或顺序链，且互不相连的流程被排布到各自独立的垂直条带中。

![阶段图：按依赖关系连接的各阶段，分别显示状态与作业数](pipeline-stage-graph.png){ width="700" border-effect="line" }

- 缩放工具栏（右上角）具有 **Zoom out**、 **Zoom in**、 **Fit to view** 和 **Keyboard shortcuts**（打开 `?` 速查表）。
- 在任意处 **拖动**可平移； **滚轮**围绕光标缩放（适应视图从不会缩放超过 1.0×）。
- 点击某个阶段即可将其选中 —— 卡片会带上 IDE 强调色边框，编辑器也随之跟进。卡片之间由**圆点与连桥**式连接线相连：在边线接入之处，卡片轮廓会向外鼓出一个半圆插槽，槽中嵌着一个灰色圆点，两个插槽之间由一条细线连桥相接。
- 每张卡片的 **折叠箭头**会将其展开，列出其作业以及一个 **Rerun stage** 按钮。
- 点击某个作业（或某个阶段）会将编辑器导航至该作业的步骤日志。

> 使用 <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut>
> 放大、缩小和适应该图，用 <shortcut>?</shortcut> 弹出 **Pipeline run shortcuts** 速查表。
> {style="tip"}

## 运行选项卡

始终存在的选项卡只有 **Summary**。其余选项卡都是在 **运行结束后、且该次运行确实拥有相应数据时**才会添加 ——
缺少某个选项卡，就说明该次运行没有发布那类数据。无论出现哪几个，Summary 之后的顺序始终是
**Tests、Extensions、Environments、Code coverage**。

| 选项卡            | 出现条件                   | 显示内容                                                                                                                               |
|-------------------|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Summary**       | 始终显示                   | 阶段图，加上一个 **Repositories** 卡片（列为 **Resource Name、Repository、Branch/Tag、Version、Related**），前提是该运行具有仓库资源。 |
| **Tests**         | 已结束的运行报告了测试结果 | 一个圆环摘要以及关联的测试用例（见下文）。                                                                                             |
| **Extensions**    | 已结束的运行发布了扩展摘要 | 扩展发布的 markdown 摘要（例如一个 SonarQube 质量门），以圆角卡片形式呈现。                                                            |
| **Environments**  | 已结束的运行部署到了环境   | 一个 **Environment、Last stage、Result、Finished** 表格 —— 仅列出**本次运行的部署**，而非项目范围内按环境显示最新状态的视图。          |
| **Code coverage** | 已结束的运行发布了覆盖率   | 逐指标行，每行带有一个圆环（绿色 ≥80%、琥珀色 ≥50%、低于则为红色）以及一个 `X / Y covered` 数字。                                      |

当某次已结束的运行有产物时，底部会有一条 **Artifacts:** 条带，链接每一个产物（在浏览器中打开下载
URL）。在你离线时无法加载的部分会如实说明，并在你重新连接时加载。

### Tests 选项卡

![Tests 选项卡：结果圆环、统计块和可筛选的结果表](pipeline-tests.png){ width="720" border-effect="line" thumbnail="true" }

一个 **圆环**（绿色 **Passed**、红色 **Failed**、灰色 **Others**）位于统计块旁边 —— **Total tests**、 **Pass percentage**、
**Run duration** 和 **Tests not reported**。其下方， **Test results** 卡片带有一个筛选栏：

- 一个搜索框（ **Filter by test or run name**）；<shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> 在 Tests
  选项卡显示时聚焦它，<shortcut>Esc</shortcut> 清除它。
- 分面标签 —— **Test file** 和 **Owner**（各自仅在有两个或更多不同值时显示），加上一个 **Outcome** 标签。结果分桶为
  **Failed、Aborted、Passed、Not Impacted、Others**，默认筛选为 **Failed + Aborted**。

表格列会根据数据自适应 —— **Test**、 **Owner**（如有）、 **Duration**（如有）、 **Outcome** —— 并被限制在 300
行。当某个筛选隐藏了全部内容时，一个 **Show all tests** 链接会清除所有筛选。

## 查看作业日志

点击某个作业（从作业导航条或某张阶段卡片）会打开 **可折叠步骤区块**：每个标题是一个折叠箭头、状态图标、步骤名称和时长；将其展开会显示以编辑器字体渲染的带编号、按颜色编码的日志（
`##[error]` 红色、`##[warning]` 琥珀色、`##[section]` 加粗、`##[command]` 蓝色、`##[debug]`
弱化色）。失败的步骤会自动展开，且在运行处于实时状态时日志会就地流式传输。

在某个步骤的日志内部，任务输出的 `##[group]` … `##[endgroup]` 标记会成为各自独立的 **嵌套可折叠分组** ——
分组标题会获得一个可点击的折叠箭头，且无论分组处于展开还是折叠状态，行号都保持稳定。

![一个作业的可折叠步骤日志，带有按颜色编码的输出](pipeline-logs.png){ width="720" border-effect="line" thumbnail="true" }

日志上方有一条纤细的标题栏，带有一个 **← Summary** 返回链接（工具提示“Back to the run overview (L)”），然后是作业的状态图标、名称和元信息。

> **搜索日志：** 在某个作业的日志内按 <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> 打开 IDE 查找栏（带有匹配计数器以及
> Case / Words / Regex 切换）。<shortcut>Enter ↵</shortcut> 和 <shortcut>⇧↵</shortcut> 在匹配项之间移动 ——
> 展开折叠的步骤并将每个命中项滚动到视野中 —— 而 <shortcut>Esc</shortcut> 隐藏该栏。
> {style="tip"}

### 用 AI 分析日志 {id="analyze-logs-with-ai"}

当一次运行 **结束**后，作业日志标题栏的右端会出现一个 **Analyze logs with AI** 灯泡按钮。点击它会在 Pipelines 工具窗口中打开一个
**AI: #&lt;n&gt;** 选项卡，由你配置的 AI 服务商流式输出对这次运行的分析：失败的运行会给出根本原因、日志中的证据以及修复建议；成功的运行则给出一段简短的运行摘要。

只有日志的相关部分会被发送 —— 是失败步骤的错误及其上下文，而不是整个日志文件。结果按运行保留，因此关闭并重新打开该选项卡不会产生新的
AI 调用；选项卡中的 **⟳** 按钮会显式地重新运行一次全新的分析。

这需要先配置 AI 服务商 —— 参见 [](AI-Features-zh.md)。未配置时，按钮会将你引导至 AI 设置。

## 阶段信息面板 {id="stage-information"}

点击作业导航条中的某个 **阶段标题**会打开该阶段的 **信息面板** —— 即 Azure 网页“ *&lt;stage&gt;* information”视图的 IDE
版本。它是一个日志风格的页面（编辑器字体、带编号的行号槽），其各个部分都是 **可折叠分组**：

- **Timing** —— 排队 / 开始 / 完成时间戳以及阶段时长。对于 **正在运行**的阶段，时长行会实时跳动。
- **Triggered by**、 **Commits** 和 **Variables** —— 运行级上下文，在该次运行的详情加载完成后显示。

各行沿用与作业日志相同的语义着色（错误红色、警告琥珀色），且在你折叠和展开分组时行号保持稳定。 **← Summary** 返回链接可回到运行概览。

## IDE 内审批 {id="approvals"}

当某个阶段被门控在一个指派给你的手动审批上时，运行标题下方会出现一条审批条带 —— **每个待处理门控一张说明卡片**。

![带有评论字段和 Approve / Reject 按钮的审批门控卡片](pipeline-approval.png){ width="720" border-effect="line" thumbnail="true" }

每张卡片显示 **Approval needed — &lt;Stage&gt;**、一行 `N of M approved · in sequence · waiting since <time>`
元信息、该检查的说明，以及逐审批人行及其状态（ **Approved**、 **Rejected**、 **Reassigned**、 **Pending**）。操作行有一个可选评论字段（
**Add an optional comment…**）以及右对齐的 **Reject** 和 **Approve** 按钮，其中 **Approve** 位于主要位置。

> 如果不允许运行的请求者审批他们自己的运行，按钮会被替换为一段解释和一个 **Review in browser**
> 链接。权限和离线问题会就地显示在卡片上，而不是无声地失败。
> {style="note"}

## 运行管道 {id="run-a-pipeline"}

从某个定义的右键菜单（或某条管道运行页面右上角的链接）中选择 **Run Pipeline…**，以打开 **Run Pipeline** 对话框。对于 **YAML
管道**，它是一个 **两页向导**，与 Azure 网页的 Run 面板相呼应； **经典（设计器）管道**则只占单独一页，其主按钮从一开始就显示为
**Run**。

![Run Pipeline 对话框：管道和分支选择器、参数和变量](run-pipeline-dialog.png){ width="560" border-effect="line" }

**第 1 页 —— Parameters：**

- **Pipeline** 和 **Branch** 选择器 —— 可搜索的组合框。管道行显示名称和文件夹副标题；分支行显示短分支名称，加上一个 **Enter
  a branch or ref…** 出口，用于自定义 ref（例如 `main` 或 `refs/tags/v1.0`）。默认分支固定在最前，其余分支按最新提交在前排序。仅对
  Azure Repos 管道枚举分支。当你从某条特定管道启动该对话框时，管道选择器会被省略。
- **Parameters** 部分将 YAML 声明的 `parameters:` 渲染为一个带类型的表单 —— 对 `values:` 用下拉框，对布尔值用复选框，对对象用等宽
  YAML 区域，其余用文本字段；必填参数标有 `*`。

主按钮显示为 **Next: Resources**； **Back: Parameters** 可返回。

**第 2 页 —— Resources：**

- **Variables** 部分公开可在排队时设置的定义变量（密钥保持空白以保留已存储的值）。
- **Stages to run** 以及资源选择器（当管道声明了它们时）。
- 两个复选框： **Enable system diagnostics**（添加 `system.debug=true`）和 **Preview only (render final YAML, don't
  queue)**。

真实的一次运行会刷新列表并打开新运行的详情。 **Preview only** 则改为打开一个只读的 **Pipeline Preview — final YAML** 对话框。

> **已暂停或已禁用**的管道会在对话框中显示一条警告横幅，且在 Azure DevOps 中将其重新启用之前无法排队。
> {style="note"}

## 创建管道 {id="create-a-pipeline"}

**New Pipeline…**（工具窗口标题栏中的 **+**）无需离开 IDE 即可注册一条管道。对话框收集以下内容：

| 字段                        | 说明                                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Repository** / **Branch** | 管道定义所在的位置。                                                                                                                 |
| **Type**                    | **YAML file in the repository** 或 **Classic — empty designer pipeline**。经典管道创建后为空 —— 请在 Azure DevOps 设计器中添加任务。 |
| **YAML file**               | 要注册的 `.yml` 文件（仅 YAML 类型）。                                                                                               |
| **Agent pool**              | 新运行排队所用的代理池。                                                                                                             |
| **Name** / **Folder**       | 显示名称和可选的管道文件夹，例如 `\Team\CI`。                                                                                        |

OK 按钮显示为 **Create**。成功后会弹出气泡确认新管道，并提供 **Run pipeline** 以排队其第一次运行。对 Azure DevOps Services
和本地部署的 Azure DevOps Server 都有效（较旧的服务器会被自动处理）。

## YAML 补全与验证

管道 YAML 在编辑器中直接获得完整的架构支持：`azure-pipelines.yml` 及其 `azure-pipelines-*` 变体、`.azuredevops/` 或
`.azure-pipelines/` 文件夹下的任何 YAML，以及项目中某条管道所指向的任何 YAML 文件 ——
自定义名称也包括在内。登录时使用你所在组织自己的架构，因此补全能准确了解该组织安装的任务；未登录时则改用 Microsoft 公开的
Azure Pipelines 架构。无论后台刷新开关处于何种状态，它都照常工作。

- 输入时对阶段、作业、步骤、任务及其属性的 **代码补全**。
- 高亮未知键、位置错误的节以及无效值的 **验证**。
- 悬停查看管道关键字的 **快速文档**。

## 运行完成通知

当 **你触发的**某次运行达到终止状态时，会出现一个气泡，标题为 `<pipeline> <run#> <verb>`（succeeded / partially succeeded /
failed / was canceled），正文中带有分支，并有一个 **Open run** 操作，用于在 IDE 中打开运行详情。它按运行和结果去重，并同时受
**Refresh pipeline runs in the background** 和 **Notify when a run of mine finishes**
门控。参见 [Notifications &amp; Attention](Notifications-and-Attention-zh.md)。

![带有 Open run 操作的运行完成通知气泡](run-finished-notification.png){ width="720" border-effect="line" thumbnail="true" }

## 在 IDE 中打开某个 PR 的管道检查

点击拉取请求的管道 CI 检查上的 **Details…** 会 **在 IDE 内**打开该次运行，直接跳转到相关作业的日志 ——
如果 URL 指明了某个作业则为该深链作业，否则为第一个失败或正在运行的作业。进行中的检查会绘制 Pipelines
蓝色“waiting”圆盘。如果某个检查的详情链接不是 Azure Pipelines 运行，则会像任何其他状态一样在浏览器中打开。

## 键盘快捷键 {collapsible="true"}

运行概览有自己的视图内按键，在它处于聚焦状态时激活。按 <shortcut>?</shortcut>（或阶段图工具栏上的 **?** 按钮）可查看同一列表。它们不在
Keymap 中，无法重新绑定。

| 操作                         | 快捷键                                                                   |
|------------------------------|--------------------------------------------------------------------------|
| **查看日志 / 返回**阶段图    | <shortcut>L</shortcut>                                                   |
| **上一个 / 下一个选项卡**    | <shortcut>[</shortcut> / <shortcut>]</shortcut>                          |
| **放大 / 缩小 / 适应**阶段图 | <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut> |
| **在浏览器中打开此次运行**   | <shortcut>B</shortcut>                                                   |
| **筛选测试**（Tests 选项卡） | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>                    |
| **显示此列表**               | <shortcut>?</shortcut>                                                   |

> 在某个作业的 **日志**内，<shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>
> 会改为打开日志搜索栏。完整的插件快捷键参考见 [Keyboard Shortcuts](Keyboard-Shortcuts-zh.md)。
> {style="note"}

> **下一步：** 在 [Notifications &amp; Attention](Notifications-and-Attention-zh.md)
> 中调整触发内容，或在 [Settings](Settings-zh.md) 中查看每一项插件设置。
> {style="tip"}
