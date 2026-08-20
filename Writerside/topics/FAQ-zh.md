# 常见问题

关于是否以及如何使用 %product%
的决策类问题。对于"它出问题了，我该如何修复？"这类问题，请参阅[](Troubleshooting-zh.md)。

## 适用范围 {id="compatibility"}

### 该插件支持 Azure DevOps Server（本地部署）吗？

支持。在创建账户时添加服务器的 URL。Azure DevOps Server 2019+ 和 Azure DevOps Services（云端）均受支持。

云端产品使用 `dev.azure.com/<org>`。本地部署既接受集合 URL（`https://tfs.contoso.com:8080/tfs/my-collection`），也接受仓库 URL（`
…/my-collection/my-project/_git/my-repo`）——两者会解析为同一个账户。PAT 身份验证对两种产品都有效；通过 Microsoft Entra 的
OAuth **仅限云端**，因此在已解析出的本地部署服务器上， **Log In via Microsoft…** 按钮会以变灰并附带说明的形式显示，而不是被隐藏。

完整的操作步骤请参阅 [Azure DevOps Server（本地部署）](Authentication-zh.md#on-prem)。

### 它支持 Azure Pipelines 吗？

支持。专用的 **Pipelines** 工具窗口让你可以浏览管道和运行、观看交互式阶段图、阅读彩色编码的步骤日志，以及审批或拒绝手动审批门——全部都在
IDE 内完成。当拉取请求的 CI 检查指向某个 Azure 构建时，点击 **Details…** 会在 IDE 内而不是浏览器中打开该运行。

![带有运行导航栏和定义列表的 Pipelines 工具窗口](pipelines-tool-window.png){ width="720" border-effect="line" thumbnail="true" }

管道始终开启：无需先手动开启，也没有关闭它的开关。只要仓库映射到 Azure DevOps 远程，工具窗口就会出现。如果不想被它打扰，请在 <ui-path>Settings | Tools | DevOps Lens | Pipelines</ui-path> 下取消勾选 **Refresh pipeline runs in the background**
：轮询、气泡通知和条纹徽标会一起停止，而窗口仍留在那里供你随时使用。请参阅[](Pipelines-zh.md)。

### 它能与传统的 TFVC（非 Git）仓库一起使用吗？

不能。该插件仅适用于以 Git 为后端的 Azure Repos。 **TFVC**（Team Foundation Version Control，微软在 Azure DevOps 中先于 Git
的集中式版本控制系统）不受支持。

### 我可以在没有 Azure DevOps 账户的情况下使用它吗？ {id="can-i-use-this-without-an-azure-devops-account"}

不能——该插件专用于 Azure DevOps。

### 它支持 Azure Repos Wiki 吗？

不支持。该插件的范围限定于拉取请求。如需编辑 wiki，请使用 Azure DevOps 的 Web UI。

## 登录 {id="signing-in"}

### OAuth 还是 PAT——我该选哪个？

| 你应该使用… | 何时                                                                                                        |
|-------------|-------------------------------------------------------------------------------------------------------------|
| **OAuth**   | 你使用的是云端产品（`dev.azure.com`），你的组织不禁止 OAuth，并且你希望内联的 MFA 提示。                    |
| **PAT**     | 你使用的是 Azure DevOps Server（本地部署），你的组织策略强制要求使用 PAT，或者你遇到了 OAuth 处理程序问题。 |

OAuth 令牌会自动刷新；PAT 会在你创建时设定的日期到期。PAT 在设计上会绕过 MFA——生成一个 PAT 要求用户已经完成身份验证，但令牌本身不会再次提示。

### 我该如何创建 PAT？

<procedure title="创建 Personal Access Token">
    <step>在浏览器中登录你的 Azure DevOps 组织。</step>
    <step>点击你的头像 → <ui-path>User settings | Personal access tokens</ui-path>。</step>
    <step>点击 <b>New Token</b>，为它设置名称、过期日期，以及插件所需的作用域（最简单的做法：<b>Full access</b>）。</step>
    <step>点击 <b>Create</b> 并复制令牌——它只会显示一次。</step>
</procedure>

请像对待密码一样对待你的
PAT——绝不要分享它或把它提交到源代码管理中。各功能所需的作用域请参阅[](Authentication-zh.md)。

### 为什么"Mark file as viewed"会以 401 失败？

这是 Azure DevOps 的限制：即便其他所有功能都能用作用域受限的令牌正常工作，"已查看"状态的 API 也只接受 **完全访问**的令牌。

- **PAT 用户：** 用 **Full access** 重新生成令牌并重新登录。
- **OAuth 用户：** 重新登录，并在权限选择界面选择 **Full access**（推荐选项）。

### 插件无法存储或读取我的令牌，怎么办？

令牌保存在由操作系统钥匙串支撑的 IDE 密码存储中。如果本机凭据存储被禁用或已损坏，请打开 <ui-path>Settings | Appearance
&amp; Behavior | System Settings | Passwords</ui-path>，切换到 KeePass
文件或清除现有密码，然后重新登录。至于令牌过期、缺少作用域等其他登录错误，请参阅[](Troubleshooting-zh.md)。

## 隐私与 AI {id="privacy-and-ai"}

### 我的代码会被发送到 Azure DevOps 以外的任何地方吗？ {id="is-my-code-sent-anywhere-other-than-azure-devops"}

除非你已明确启用 AI 功能并配置了提供程序，否则不会。完整的按功能数据流请参阅[](Privacy-and-Data-zh.md)。

如果 AI 已禁用（总开关关闭），则插件本身除了你的 Azure DevOps 组织之外不会发出任何出站调用。

另有一点需要单独了解：如果你把 AI 代理连接到 IDE 内置的 MCP 服务器，该代理可以通过你的连接读取拉取请求和流水线内容，并将其传给它自己的模型。
这是代理的流量，而不是插件的，并且只有在你自己配置了这样的代理时才会发生。参见[](MCP-Tools-zh.md)。

### 我如何在不进行任何 AI 调用的情况下使用该插件？

取消勾选 <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> 顶部的 **Enable AI assistance**。所有
AI 功能都会从菜单和工具栏中消失，并且不会进行任何 AI 调用。

你也可以保持 AI 开启，并将每项功能路由到本地的 **Ollama** 实例，以实现完全在设备上进行的推理。

如果你还希望没有任何 AI 代理通过 IDE 读取 Azure DevOps，请禁用捆绑的 **MCP Server**
插件（<ui-path>Settings | Plugins</ui-path>）——这样 Azure DevOps 工具根本不会注册。

### 使用 MCP 工具会让插件的 AI 评审更聪明吗？

不会——两者互不相干，这是常见的误解。插件自身的 AI 功能（摘要、评审、提交信息）一次性生成文本，无法调用工具。MCP
工具的方向正好相反：它让*你*连接的代理（Claude Code、Codex CLI、Copilot CLI）能够通过 IDE 读取你的 Azure DevOps
数据。参见[](MCP-Tools-zh.md)。

### 该插件会匿名上传任何内容吗？遥测？

永远不会有使用情况分析——没有任何东西记录你使用了哪些功能或点击了什么，也不会在后台上传任何内容。出站调用只会发往你的 Azure
DevOps 组织，以及（如果启用了 AI）你配置的 AI 提供程序。（你通过 MCP 连接的 AI 代理会按其自身条款发出自己的调用；插件同样不会为这些调用添加任何遥测。）

唯一的例外是 **由你自己发送的崩溃报告**：当插件遇到意外错误时，IDE 的错误对话框会提供一个 **Report to DevOps Lens**
按钮。除非你按下它，否则不会传输任何内容；凭据和可识别身份的名称会先在你的机器上被剥离；你的代码绝不会被包含在内；而且它发往的是一个私有的错误追踪服务，而不是公开仓库。请参阅[崩溃报告](Privacy-and-Data-zh.md#crash-reports)。

## 使用插件 {id="using-the-plugin"}

### 我在哪里查看 PR 指标？

[](Statistics-zh.md)选项卡显示 KPI 和图表——合并耗时、审查速度、投票分布等等——这些都是根据缓存数据在本地计算的。它是一个只读仪表板；如需可导出的、组织范围的报告，请使用
Azure DevOps Analytics。

### 为什么 IDE 重启后我的 PR 选项卡没有重新打开？

因为 %product% 是有意关闭它们的。时间线、单文件差异、统计以及管道运行这些选项卡是仅限当前会话的视图——磁盘上没有任何东西可供
IDE 恢复，如果放任不管，下次启动时只会为每个选项卡产生一条错误。

你不会丢失任何东西：像第一次那样从工具窗口（或用 <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>）重新打开 PR
即可。普通的源文件选项卡不受影响。

## 获取帮助 {id="getting-help"}

### 我该在哪里提交缺陷或功能请求？

公开的问题追踪仓库：[%tracker_url%](%tracker_url%)。有问题请用[缺陷表单](%new_bug_url%)
，缺少功能请用[功能请求表单](%new_feature_url%)，拿不准属于哪一类就用 [Discussions](%discussions_url%)。

最快的方式是点击 <ui-path>Settings | Tools | DevOps Lens</ui-path> 页面底部的 **Report a bug**，表单会带着你的
IDE 版本号、插件版本和操作系统一起打开。需要提供哪些信息、大致会得到怎样的回应，见[](Support-zh.md)。

安全问题请私下发送到供应商邮箱，不要公开提 issue。

### 这个插件是如何维护的？

这是一个由一位开发者独立构建和维护的个人项目。如果它帮到了你，在 JetBrains Marketplace 上留下评价就是最好的支持——非常感谢每一条评价。
