# Git 集成

<tldr>
    <p><b>位置</b>：IDE 的克隆对话框、主工具栏和状态栏的分支小组件，以及 IDE 内的任何 <code>git fetch</code> / <code>push</code>。</p>
    <p><b>生效条件</b>：某个 Git 远程仓库匹配 Azure DevOps——云端、旧版、SSH 或已配置的本地部署服务器。</p>
</tldr>

该插件与 IDE 内置的 Git 插件协同工作，用于检测 Azure DevOps 远程仓库、将当前分支匹配到对应的拉取请求，并交接 HTTPS 凭据，从而让
`git fetch` 和 `git push` 顺畅运行。

## 仓库检测

当你打开一个项目时，插件会扫描每个 Git 远程仓库，查找以下模式：

- `https://dev.azure.com/<org>/<project>/_git/<repo>`
- `https://<org>.visualstudio.com/<project>/_git/<repo>`（旧版）
- `git@ssh.dev.azure.com:v3/<org>/<project>/<repo>`（SSH）
- 来自你的账户的自托管 Azure DevOps Server URL

如果任一远程仓库匹配成功， **Pull Requests** 工具窗口就会出现，并开始后台同步。否则插件不会干扰你的工作。

## 克隆仓库

无需离开 IDE 即可从 Azure DevOps 克隆仓库：

1. 在欢迎屏幕上选择 **Clone Repository**（在已打开的项目中选择 **File | New | Project from Version Control**），然后在左侧列表中选择
   **Azure DevOps**。
2. 如果尚未登录，请先登录 - 与插件其他位置相同的 Microsoft 或令牌登录方式。
3. 输入以搜索 `project/repository` 列表，选择一个仓库，并按需调整目标目录。
4. 点击 **Clone** - IDE 会通过 HTTPS 克隆并打开项目。凭据来自你已登录的账户，详见下文的 *HTTPS 身份验证*。

### 如果仓库列表无法加载

列表按账户获取一次，并在对话框打开期间一直保留，因此首次加载之后在账户之间切换没有任何开销。

| 列表显示的内容                                      | 含义                                               |
|-----------------------------------------------------|----------------------------------------------------|
| **Loading repositories…**                           | 覆盖整个组织的列表仍在分页加载中。                 |
| **No repositories in this organization**            | 该账户能访问该组织，但其中没有任何仓库。           |
| **No matching repositories**                        | 只是搜索文本把它们隐藏了——清空搜索框即可。         |
| **Couldn't load repositories** + **Retry**          | 调用失败，通常是离线或临时性错误。                 |
| **Couldn't access &lt;account&gt; - sign in again** | 该账户的令牌已失效；点击链接会重新打开登录对话框。 |

## 当前分支 → 拉取请求

插件会监视你签出的分支，并将其解析为匹配的开放拉取请求（按源分支名称匹配）。找到后，两个小组件会亮起。

### 主工具栏分支小组件

**main toolbar** 中的 Git 分支小组件会显示一个 Azure DevOps 徽章 - `!1234 on feature/login`。点击它可查看该拉取请求的操作：

- **Show Pull Request in the Tool Window** - 打开该拉取请求的详情视图。
- **Update to Enable Review Mode…** - 当你的本地分支与拉取请求头分支产生分歧时出现（运行 *Update Project*）。
- **Review Mode** - 切换编辑器内审查叠加层。参阅 [](Review-in-Editor-zh.md)。

### 状态栏小组件

**status bar** 中另有一个小组件，显示 `ADO PR !1234`
。点击它可在工具窗口中打开该拉取请求。（可通过状态栏小组件选择器隐藏或显示它 - 其名称为 *Azure DevOps PR (current
branch)*。）

当你切换分支时，两个小组件都会更新 - 并在新分支没有拉取请求时消失。

## 找出某一行背后的拉取请求 {id="find-pull-request"}

是否曾盯着一行代码，想知道它 *为什么*会是这个样子？插件可以在本地对该行执行 blame，并告诉你是哪个拉取请求引入了它 -
既可以作为一次性的查找，也可以作为行号旁的一列常驻标注。

这本身就是一项独立的功能：参阅 [](Find-Pull-Requests-From-Code-zh.md)。

## HTTPS 身份验证

当 Git 需要为 Azure DevOps 远程仓库提供 HTTPS 凭据时，插件会自动提供已存储的令牌：

<procedure title="HTTPS 身份验证交接的工作原理">
    <step>你在 IDE 内部运行 <code>git fetch</code> 或 <code>git push</code>（通过 Update Project、Git 工具窗口或内嵌终端）。</step>
    <step>Git 向 IDE 请求凭据。</step>
    <step>插件将远程仓库匹配到已登录的账户，并提供其令牌。</step>
    <step>Git 继续执行 - 无需密码提示。</step>
</procedure>

如果有多个已登录账户匹配同一个 URL，则使用项目的 **default account**（参阅 [](Settings-zh.md)）。

> 从 IDE 之外的 **system shell** 运行的 Git 命令不会看到此凭据提供程序。如果你主要在外部终端中工作，请配置一个系统级的 Git
> 凭据助手 - 参阅 [疑难解答](Troubleshooting-zh.md#git-push-asks-for-a-password)。
> {style="note"}

## 推送 → 创建拉取请求

当你推送一个尚无拉取请求的分支后，插件可以在气泡中提示 **Create a pull request** -
这比使用工具栏更快捷。可通过 [](Settings-zh.md) 中的 **Offer to create a pull request after I push**
来开关此功能。其他由 Git 驱动的通知（审查请求、投票变更、回复）在 [](Notifications-and-Attention-zh.md) 中介绍。

### 提交信息中的工作项 {id="commit-refs"}

当提交信息中带有 `#ID` 引用时，Azure DevOps 会把该提交关联到对应的工作项 - 提交 `#35 Catch null exception`
并推送，服务器就会在工作项 35 上创建 **Commit** 链接。这一关联发生在 **服务端、推送时**：插件既不会添加也不会改写这些引用，而且在
IDE 中无需任何配置即可生效。像平时那样在提交信息里写下引用即可。

AI 提交信息生成器（[](AI-Features-zh.md)）同样如此：它会保留你已经写下的 `#ID`，但绝不会自己编造一个，因为它无从知道你指的是哪个工作项。

至于评论和拉取请求描述中的 `#ID` 引用 - 那是插件*确实*会渲染为链接的 - 参阅 [](Markdown-zh.md#hash)。

## 多仓库与自托管

- **Multiple repositories** 在同一项目中会被各自独立检测；使用工具窗口的 **Switch Account / Repository…** 可聚焦于其中一个。
- **Azure DevOps Server (on-prem)** 的用法与云端产品完全相同 - 登录时添加服务器 URL，并使用从该服务器生成的令牌。
