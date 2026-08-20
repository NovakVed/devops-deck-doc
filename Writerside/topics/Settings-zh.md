# 设置

<tldr>
    <p><b>位置</b>：<ui-path>Settings | Tools | DevOps Lens</ui-path> —— 使用 <shortcut>⌘,</shortcut> / <shortcut>Ctrl+Alt+S</shortcut> 打开 Settings。</p>
    <p><b>子页面</b>：<b>Navigation</b>、<b>Pull Requests</b>、<b>Pipelines</b>、<b>AI Settings</b>、<b>Experimental</b>。</p>
    <p><b>作用范围</b>：应用程序级别，默认账户、你的 PR 列表筛选器，以及少数在使用处切换、按项目存储的开关除外。</p>
</tldr>

插件提供的每一项设置的参考。

**DevOps Lens 是一棵包含六个页面的树。** 你首先打开的页面只承载连接服务器所需的内容——账户，以及它背后的 Azure CLI
路径。连接之后要调整的一切都归到它所属功能的子页面上—— **Navigation**、 **Pull Requests**、 **Pipelines**、
**AI Settings** 和 **Experimental** ——包括该功能多久刷新一次、以及它通知你什么。

## Tools → DevOps Lens

根页面。顶部是 **accounts** 面板（添加 **+**、编辑 ✏、移除 ✕、按项目设置默认值）——参见[](Authentication-zh.md)。

![DevOps Lens 设置页面的账户面板](accounts-panel.png){ width="700" border-effect="line" }

- **Azure CLI executable** —— *通过 Azure CLI 登录* 所使用的 `az` 路径。**默认为空**（自动检测）。留空时会在 `PATH`
  或默认安装位置中查找。旁边的 **Detect** 按钮会立即执行这次查找并把结果写入字段，因此你可以在应用之前先看到它找到了什么。

## Tools → DevOps Lens → Navigation {id="page-navigation"}

这一页关乎你如何从 IDE 内部在 Azure DevOps 中*查找*内容。它是独立的一个页面，而不是分散在各功能下的小节，因为它的主开关同时管辖两个
**Go to** 操作。

| 设置                                                                 | 默认值 |
|----------------------------------------------------------------------|--------|
| **Show Go to Pull Requests and Go to Pipeline in Search Everywhere** | 关闭   |
| **Find the pull request behind a line of code**                      | 开启   |

第一项控制 **Go to Pull Requests**（<shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>）和
**Go to Pipeline**（<shortcut>⌥⇧P</shortcut> / <shortcut>Alt+Shift+P</shortcut>）的打开方式。关闭（默认值）时，二者各自打开插件
自己的快速选择对话框：同一个窗口带有 **Pull Requests** 和 **Pipelines** 两个选项卡，落在与你按下的快捷键对应的那个上。开启后，
两个操作都改为打开 Search Everywhere，在 Files / Symbols / Actions 旁增加 **Pull Requests** 和 **Pipelines**
选项卡。一个开关同时覆盖两个操作是刻意为之：对话框本就是同一个窗口，所以“用 Search Everywhere 还是用对话框？”只需要决定一次。

第二项会在编辑器的 **Open In** 菜单中添加 **Find Pull Request**，在 **Copy / Paste Special** 中添加 **Copy Pull Request
URL for Line**，并在行号装订线的右键菜单中添加 **Annotate with Pull
Requests**。参见[](Find-Pull-Requests-From-Code-zh.md)。

> 它只覆盖这三项按**行**的操作。Git 视图中的提交项——**Open Commit in Azure DevOps**、**Copy Azure DevOps Commit
> Link** 和 **Find Related Pull Requests**——没有任何开关：只要该提交属于某个 Azure DevOps 仓库，它们就会出现。参阅 [Git
> 视图中的提交操作](Git-Integration-zh.md#commit-actions)。
> {style="note"}

## Tools → DevOps Lens → Pull Requests {id="page-pull-requests"}

### Review

| 设置                                                       | 默认值         |
|------------------------------------------------------------|----------------|
| **Mark files as viewed when I open their diff**            | 关闭           |
| **Show a "files viewed" counter above the changes tree**   | 关闭           |
| **Show attention markers on pull-request rows**            | 关闭           |
| **Show the submit shortcut on comment buttons**            | 开启           |
| **Lines shown above a comment**                            | 3（范围 0–50） |
| **Lines shown below a comment**                            | 3（范围 0–50） |

快捷键提示开关会在编写框的 **Comment** / **Reply** / **Save** 按钮标签前显示提交快捷键（<shortcut>⌘↵</shortcut> /
<shortcut>Ctrl+Enter</shortcut>）。无论是否开启，快捷键都有效，此选项仅显示提示。两个**上下文行数**微调框控制时间线在审阅线程的
差异片段中，于被评论行周围显示多少代码；设为 0 则不显示该侧的上下文。

> **Show unread markers** 不在这里——它是工具窗口的开关（齿轮菜单），不是设置里的复选框。草稿是列表**筛选器**，不是设置。
> {style="note"}

### Background refresh & notifications {id="pr-background-refresh-notifications"}

| 设置                                                         | 默认值             |
|--------------------------------------------------------------|--------------------|
| **Refresh pull requests in the background**                  | 开启               |
| **Refresh every (seconds)**                                  | 60（范围 15–3600） |
| **Notify when I'm asked to review a pull request**           | 开启               |
| **Notify when someone @mentions me**                         | 开启               |
| **Notify when my pull request is referenced in another one** | 开启               |
| **Notify about replies in threads I took part in**           | 开启               |
| **Notify when a vote changes on my pull requests**           | 开启               |
| **Offer to create a pull request after I push**              | 开启               |

关闭 **Refresh pull requests in the background** 会停止 PR 列表同步和已打开拉取请求的刷新。之后除非你主动操作，否则不会就
拉取请求连接 Azure DevOps：打开拉取请求、刷新、投票和评论都照常可用。这在按量计费的网络下，或你不希望空闲 IDE
去轮询的本地服务器上很有用。

**本组中的每一项通知都依赖同一个轮询**，因此在它关闭时会变灰——没有东西察觉到变化，气泡通知也就无从谈起。唯一的例外是
**Offer to create a pull request after I push**：它由你自己的 `git push` 触发，而不是轮询，因此始终有效。

*引用*是指在其他拉取请求的评论中写下 `!` 加上你的 PR 编号。它们会触发什么，参见[](Notifications-and-Attention-zh.md)。

> 流水线在[各自的页面](#page-pipelines)上，用自己的开关和间隔轮询。二者刻意保持独立：值得每 30 秒查看一次的运行列表，
> 和 5 分钟一次就足够的 PR 列表并不相同。
> {style="note"}

## Tools → DevOps Lens → Pipelines {id="page-pipelines"}

管道始终开启：只要仓库映射到 Azure DevOps 远程，工具窗口就会出现。你在这里调整的是运行的轮询频率，以及它通知你什么。
参见[](Pipelines-zh.md)。

### Background refresh & notifications {id="pipeline-background-refresh-notifications"}

| 设置                                               | 默认值             |
|----------------------------------------------------|--------------------|
| **Refresh pipeline runs in the background**        | 开启               |
| **Refresh every (seconds)**                        | 60（范围 15–3600） |
| **Notify when a run of mine finishes**             | 开启               |
| **Notify when a run waits for my approval**        | 开启               |
| **Badge the tool-window icon when my runs finish** | 开启               |

流水线拥有独立于拉取请求的后台刷新，因此你可以密切关注运行而不必同样频繁地轮询拉取请求，反之亦然。通知和条形图标角标都依赖
这个轮询，因此它关闭时它们会变灰。

### YAML 架构

**Extra YAML locations** 独立于本页面的其他一切：管道 YAML 的补全和校验无论工具窗口是否显示、后台刷新是否开启都可用。填写相对于仓库根目录的路径，
以分号分隔——文件夹会让其下所有 YAML 文件获得架构支持，glob 模式则匹配特定文件。它们在内置约定（`azure-pipelines*`
文件名；`.azuredevops`、`.azure-pipelines` 和 `.pipelines` 文件夹；以及已连接仓库的管道定义所构建的文件）之外额外生效。

## Tools → DevOps Lens → AI Settings {id="page-ai-settings"}

用于配置可选 AI 助手的子页面——参见 [](AI-Features-zh.md)。

![AI Settings 页面](ai-settings.png){ width="720" border-effect="line" thumbnail="true" }

- **General AI Settings → Enable AI assistance** —— 主开关。 **默认开启**，但在你添加并启用某个提供程序之前不起作用：没有可用的提供程序时，插件不会发出任何外发
  AI 调用，各处的 AI 功能入口只会将你引导到本页面。关闭该开关则会隐藏所有 AI 相关功能。
- **General AI Settings → AI response language** —— 模型用哪种语言撰写摘要、代码解释、审查意见和流水线日志分析。 **Auto**
  跟随 IDE 语言；润色你自己撰写的文本时，始终保持你所使用的语言。下方的复选框—— **Also use this language for PR titles,
  descriptions, and commit messages** ——是单独的选择加入项， **默认关闭**：这些内容会进入 git 历史并出现在拉取请求上，
  在那里团队的约定比你 IDE 的语言更重要。无论如何，你在 IDE 内阅读的内容都跟随该下拉框。
- **AI Providers** —— 每个提供程序实例一行（ **Provider / Model / Enabled**）。第一个启用的行为默认项。通过 **Add AI
  Provider** 对话框添加（OpenAI、Claude、Gemini、Ollama、GitHub Copilot；HTTP-API 或 CLI 模式），并在保存前用 **Test
  Connection** 验证。
- **Per-Feature Provider** —— 将 **AI Summary**、 **AI Review**、 **Title + Description** 和 **Explain Code**
  路由到特定实例，或保持其为 **Default**。
- **Configure Prompts** —— 编辑每项功能的系统提示词。
- **AI agents (MCP) → Let AI agents change Azure DevOps** —— **默认关闭**。连接到 IDE 内置 MCP 服务器的 AI
  代理始终可以通过你已登录的连接**读取**拉取请求和流水线，这不需要任何设置。此项额外允许会更改内容的操作：评论、投票、解决讨论串、
  运行和取消流水线。它管辖的是*外部*代理，因此**不会**影响插件自身的 AI 功能——它放在本页面，只是因为你会在这里寻找与 AI
  代理有关的设置。参见[](MCP-Tools-zh.md)。
- **Advanced** —— **Cache AI responses per commit SHA**（默认开启）、 **Max diff size**（默认 200 KB，范围 10–2000）以及
  **Clear AI Response Cache**。

## Tools → DevOps Lens → Experimental {id="page-experimental"}

尚未完成的预览功能。本页面的所有内容都**默认关闭**、由每位用户自行选择启用，并且可能在未来的更新中发生变化、出现异常或被移除
——页面在第一项设置上方的横幅中也是这样说明的。想试就打开某个预览，发现不对劲再关掉；标准行为会立刻恢复。

| 设置                                       | 默认值 |
|--------------------------------------------|--------|
| **Filter pull requests with search chips** | 关闭   |

**Filter pull requests with search chips** 预览拉取请求列表中 GitLab 风格的搜索栏：每个生效的筛选器都会变成搜索框内的一个
筛选标签（chip），其下方的筛选行随之消失；排序移到右侧的下拉框和方向按钮上。关闭时保留经典的两行式搜索栏。仅覆盖 Pull
Requests——Pipelines 工具窗口尚未支持。

## 帮助链接 {id="help-links"}

根页面 **DevOps Lens** 和 **AI Settings** 都以同一行结尾： **See Documentation · Report a bug · Request a feature ·
Ask a question**。其余子页面不再重复这一行——它们距根页面只有一步之遥。

- **See Documentation** —— 打开本站中与当前设置页面对应的文档。
- **Report a bug** —— 打开公开追踪仓库上的[缺陷表单](%new_bug_url%)，其中 IDE
  版本号、插件版本和操作系统已预先填好。除此之外不会发送任何内容，提交前你可以修改或清空这些字段。
- **Request a feature** 打开[功能请求表单](%new_feature_url%)， **Ask a question** 打开 [Discussions](%discussions_url%)。

需要提供哪些信息、大致会得到怎样的回应，见[](Support-zh.md)。

## Appearance & Behavior → Notifications {id="notifications"}

插件注册了三个可路由的通知组（弹窗 / 工具窗口 / 仅日志）：

| 通知组                         | 用途                                                                 |
|--------------------------------|----------------------------------------------------------------------|
| **Azure DevOps** | 审查请求、@提及、引用、回复、投票变更、推送提示。                    |
| **Azure DevOps AI**            | AI 摘要 / 审查完成气泡（常驻显示，以免其中的操作链接因超时而消失）。 |
| **Azure DevOps Pipelines**     | 你所触发的管道运行的完成气泡。                                       |

## Keymap

打开 <ui-path>Settings | Keymap</ui-path> 并搜索 **Azure DevOps**，即可重新绑定任意操作。包含操作 ID
的完整列表见[](Keyboard-Shortcuts-zh.md)。

## Per-project vs application-level

大多数设置是 **应用程序级别**的（对所有项目生效）：账户、通知偏好、AI 提供程序。以下内容是 **按项目**的（存储在项目工作区中）：
**默认账户**、你的 **PR 列表筛选器**，以及少数在使用处而非设置中切换的开关： **Review Mode**（Git 分支组件弹窗）、
**Collapse resolved**（时间线标签）、变更树的**分组方式**，以及**未读标记**（齿轮菜单）。
