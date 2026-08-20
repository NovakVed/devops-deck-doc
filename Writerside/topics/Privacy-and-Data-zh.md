# 隐私与数据

<tldr>
    <p><b>数据去往何处</b>：你的 Azure DevOps 组织，以及（仅当你启用 AI 时）你配置的提供商。</p>
    <p><b>凭据</b>：IDE 的 <code>PasswordSafe</code>，底层是系统钥匙串。</p>
    <p><b>遥测</b>：无——没有使用分析，也没有后台 ping。<a anchor="crash-reports">崩溃报告</a>会在你的机器上进行最小化和脱敏，且仅在你按下按钮时才发送。</p>
</tldr>

使用 %product% 时哪些数据会离开你的机器、去往何处，以及如何将一切保持在本地。

> 本页是技术层面的数据流参考。正式法律文件目前仅提供英文版：
> [Privacy Policy](%docs_url%privacy-policy.html) 和
> [Developer EULA](%docs_url%terms-of-service.html)。
> {style="note"}

## 凭据

| 凭据               | 存储位置                                                                                                    |
|--------------------|-------------------------------------------------------------------------------------------------------------|
| Azure DevOps PAT   | IDE 的 `PasswordSafe` → 系统钥匙串（macOS Keychain、Windows Credential Manager、GNOME Keyring / KWallet）。 |
| OAuth 刷新令牌     | 同上——`PasswordSafe`。绝不会在磁盘上使用明文。                                                              |
| AI 提供商 API 密钥 | 同上——`PasswordSafe`，每种提供商类型一个密钥槽位（OpenAI、Claude 等）。                                     |

有关各操作系统的钥匙串细节以及如何轮换或吊销 PAT，请参阅 [](Authentication-zh.md)。

## 发送到 Azure DevOps 的内容

本插件是 Azure DevOps REST API 之上的一个轻量客户端。每次调用都直接发往你配置的组织（`dev.azure.com/<org>` 或你的本地部署
Azure DevOps Server）。任何内容都不会经过第三方服务器中转。

在以下情况下会发起调用：

- 你打开 PR 工具窗口时（首次列表获取）。
- 60 秒后台同步触发时。
- 你打开某个拉取请求时（时间线 + 差异获取）。
- 你发表评论、投票、标记为已查看、完成或放弃时。
- 你为某个 Azure DevOps 远程仓库生成 `git fetch` / `git push` 凭据移交时。
- 你连接到 IDE 的 AI 代理调用某个 Azure DevOps MCP 工具时 - 参见下文。

## 发送到 AI 提供商的内容 {id="whats-sent-to-ai-providers"}

仅当 AI 处于 **启用**状态且已配置某个提供商时才会发送。插件仅针对你触发的操作发起出站调用。

> 当你添加或编辑 AI 提供商时，插件会使用其 API 密钥向该提供商发起一次经过身份验证的 **模型列表**请求（例如
> `GET /v1/models`），用于填充模型下拉列表。这是唯一在配置阶段而非你触发的操作时发起的 AI 请求。不会发送任何 PR
> 代码、差异或提示词——只发送模型列表调用——并且结果会缓存约 30 分钟。本地提供商（位于 localhost 地址的 Ollama）会将其保留在你的机器上。
> {style="note"}

### 各功能的数据流

| 功能                    | 提供商所看到的内容                                                      |
|-------------------------|-------------------------------------------------------------------------|
| **Summarize PR**        | PR 标题 + 描述 + 差异（截断至 **Max diff size**，默认 200 KB）。        |
| **AI review pass**      | 每个已更改文件的完整逐文件差异。大于 **Max diff size** 的文件会被跳过。 |
| **Explain code**        | 所选文件的内容（整个文件，而不仅是可见范围）。                          |
| **Commit message**      | 你的暂存差异（即 `git diff --cached` 会产生的内容）。                   |
| **Title & description** | 分支名 + 提交消息 + 差异（按上文所述截断）。                            |

差异在离开 IDE 之前会经过预过滤：锁定文件、压缩和自动生成的文件、二进制文件以及构建输出文件夹会被剔除；重命名的文件只包含其实际编辑内容，已删除的文件只包含一行说明（路径和删除的行数）而不是其内容。

每个 AI 请求还会附带插件为该功能构建的系统提示词。你可以在 <ui-path>Settings | Tools | DevOps Lens | AI
Settings | Configure Prompts</ui-path> 中覆盖这些提示词。

### 提供商数据流矩阵

| 提供商                 | 请求去往何处                                                                                 |
|------------------------|----------------------------------------------------------------------------------------------|
| **Claude (Anthropic)** | `api.anthropic.com`（或你自定义的基础 URL）。                                                |
| **OpenAI**             | 默认为 `api.openai.com`，或你配置的任何基础 URL（Azure OpenAI、vLLM、自托管）。              |
| **Gemini (Google)**    | Google 的 AI Studio / Vertex AI 端点。                                                       |
| **Ollama**             | 你设置的端点，通常是 `http://localhost:11434`。当它是 localhost 地址时**没有网络出口流量**。 |
| **Claude Code CLI**    | `claude` 二进制程序负责身份验证与路由——数据流由 Anthropic 的 CLI 条款控制。                  |
| **OpenAI Codex CLI**   | `codex` 二进制程序的身份验证与路由。                                                         |
| **GitHub Copilot CLI** | `copilot` 二进制程序使用你的 Copilot 订阅——数据流受 GitHub Copilot 的条款约束。              |

插件不会在这些请求之上添加任何标头、遥测或分析数据。上游提供商所看到的内容，正是插件所发送的内容。

## MCP 代理能看到什么 {id="what-an-mcp-agent-can-see"}

如果你把 AI 代理（Claude Code、Codex CLI、Copilot CLI 等）连接到 IDE 内置的 MCP 服务器，插件会向它提供 Azure DevOps
工具。这与上面所有内容的方向相反：*插件*不会向任何 AI 提供商发送数据。代理发出请求，插件用**你**已有的连接查询**你**的 Azure DevOps
组织，并把结果返回给代理；之后如何处理取决于代理自身的模型和条款。

- **令牌绝不会被共享。** 工具在 IDE 内使用已认证的客户端运行。代理收到的是结果，而不是凭据。
- **没有新的目的地。** 这些调用发往与本页其他请求相同的 Azure DevOps 组织。
- **代理可以读取的内容**：所连接仓库的拉取请求详情、评论讨论串、变更文件、差异本身、合并检查、流水线、运行记录、失败与步骤日志，以及测试结果。
  代理读取到的内容可能会被传给它自己的模型。
- **未经允许不能做的事**：评论、投票、解决讨论串、运行和取消流水线以及重试阶段，在你于
  <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> 勾选 **Let AI agents change Azure DevOps** 之前均处于关闭状态。
- **永远不能做的事**：完成或放弃拉取请求，或裁决流水线审批门控。

如果你没有把代理连接到 IDE 的 MCP 服务器，则以上内容都不适用。参见[](MCP-Tools-zh.md)。

## 缓存 AI 响应 {id="caching-ai-responses"}

当某个功能返回结果时，插件会以下列内容为键进行缓存：

- PR ID。
- 请求发起时的差异 SHA。
- 一个单调递增的 `cacheGeneration` 计数器——当你编辑提示词、更换提供商，或在摘要卡片的齿轮弹出菜单中点击 **Clear cached AI
  responses** 时递增。

缓存命中会立即返回，不发起任何出站调用。缓存的响应存于 IDE 本地状态中，并在卸载插件时清除。

## 遥测

插件 **不收集任何使用分析数据**。没有任何东西跟踪你使用了哪些功能、多久打开一次拉取请求，或者你点击了什么。没有“回传”ping，除了上文列出的
Azure DevOps 与 AI 提供商请求之外，也没有任何调用会在后台离开你的机器。

唯一的例外是崩溃报告，而且它绝不会在你没有按下按钮的情况下发生。

## 崩溃报告 {id="crash-reports"}

### 为什么会有这个功能 {id="why-crash-reporting-exists"}

当插件遇到缺陷时，真正有用的证据——堆栈跟踪——会落在一个日志文件里，你得先找到它、把它打开、读一遍并清理干净，然后才能粘贴进
issue。几乎没有人会这么做，于是大多数报告最终变成“差异有时候是空白的”，而这种描述通常无法修复。

崩溃报告把这一切缩短为一次点击，从而让真正的修复成为可能。它是一条诊断通道，而不是跟踪通道：它 **只**
在插件确实抛出意外错误时才会触发，而且只在你选择发送时才会发送。

### 何时触发

当插件抛出未处理的异常时，IDE 会显示它标准的错误对话框（状态栏中的红色图标）。该对话框带有一个 **Report to DevOps
Lens** 按钮。在你按下它之前不会传输任何内容——关闭对话框不会发送任何东西，也没有后台重试或队列。

预期内的失败绝不会走到这条路径上。处于离线状态、令牌过期、403 或文件缺失都会被处理并记录在本地；它们不是缺陷，因此绝不会产生崩溃报告。

### 会发送哪些内容

| 包含内容          | 详情                                                                                                                                                |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 已脱敏的堆栈跟踪  | 类名、方法名、文件名、行号——也就是出错的代码路径                                                                                                    |
| 插件版本          | 例如 `1.4.2`                                                                                                                                        |
| IDE 名称与构建号  | 例如 `IntelliJ IDEA 2026.2 (Ultimate Edition), build IU-262.9437.185`                                                                               |
| 操作系统          | 名称、版本、架构                                                                                                                                    |
| Java 运行时       | IDE 的引导 JVM 构建与供应商，例如 `21.0.5+8-b631.28 (JetBrains s.r.o.)`——有若干渲染与图标缺陷其实是 JetBrains Runtime 的 bug，仅凭 IDE 版本无法区分 |
| Azure DevOps 类型 | `cloud`、`on-prem`、`cloud + on-prem` 或 `no accounts` 这几个词之一——绝不包含服务器地址                                                             |
| 你的描述          | 仅限你在对话框的评论框中输入的文本（如果你输入了的话）                                                                                              |

### 报告被设计为不包含哪些内容

- **凭据。** 个人访问令牌、OAuth 令牌和 AI API 密钥会在发送前被剥离。
- **你的代码。** 不含文件内容、不含差异、不含评论文本，也不含拉取请求的标题或描述。
- **能识别你或你工作内容的名称。** 组织、项目、仓库、服务器主机和用户名会在你的机器上被替换为占位符。
- **你的 Azure DevOps URL。** 云端与本地部署的地址一律被简化为占位符；只有粗粒度的 `cloud` / `on-prem`
  标记会保留下来，因为大多数缺陷正是取决于这一区分。
- **有意分配的用户身份信息。** 插件不会把账户 ID、电子邮件地址、用户资料或永久报告标识符添加到报告载荷中。但 Sentry 或其基础设施仍可能处理 IP 地址等连接元数据。自动脱敏并不保证完全匿名。

### 脱敏在你的机器上完成 {id="anonymization"}

脱敏是在本地运行的， *在*任何内容被传输之前——而不是之后由服务器完成。一段最初长这样的堆栈跟踪：

```text
AzureApiError$Unauthorized: 401 for https://dev.azure.com/contoso-payments/Checkout/_apis/git
  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY
  at com.vednovak.devops.api.PullRequestsApi.list(PullRequestsApi.kt:88)
  reading /Users/jane.doe/dev/checkout/build.gradle.kts
```

传输出去时是这样的：

```text
AzureApiError$Unauthorized: 401 for https://dev.azure.com/[path]
  Authorization: Bearer [REDACTED]
  at com.vednovak.devops.api.PullRequestsApi.list(PullRequestsApi.kt:88)
  reading ~/[path]
```

代码路径完整保留下来——正是这一点让缺陷得以修复——而令牌、组织与项目名称以及你的主目录则不会保留。

> 过度脱敏是刻意为之：插件宁可多抹掉一个词，也不愿泄露一个词。如果某份报告看上去被清理得很激进，那正是这一取舍在按预期发挥作用。
> {style="note"}

### 数据去往何处

报告会发往插件开发者拥有的一个私有 [Sentry](https://sentry.io) 项目，托管在 Sentry 的 **德国数据区域**。它们 **不会**
被发布到公开的问题追踪仓库，也不会公开可见。

这是插件中唯一一处数据会到达开发者所控制的基础设施的地方。其余的一切——拉取请求、代码、凭据、AI——都直接在你的 IDE 与你自己的
Azure DevOps 组织或你自己的 AI 提供商之间流转。正式的法律说明见[英文隐私政策](%docs_url%privacy-policy.html#crash-reports)。

### 如果你宁愿什么都不发送

那就不要按那个按钮——关闭错误对话框，就不会有任何内容离开你的机器。如果你仍希望这个缺陷得到修复，请使用 <ui-path>Help</ui-path> 菜单中的 <b>Copy DevOps Lens Diagnostics</b>
，自己读一遍那段文本，再把它粘贴到[公开 issue](%new_bug_url%)
中。请参阅[报告问题](Troubleshooting-zh.md#reporting-a-problem)。

想为整个团队关闭这条路径的管理员，可以通过其 IDE 部署设置禁用 IDE 的错误报告对话框；没有对话框，也就没有按钮可按。

## 将一切保持在本地

对于有数据驻留要求的组织：

1. **使用本地部署的 Azure DevOps Server**（前身为 TFS）。PR、评论和 API 全部位于你自己的服务器上。
2. **用主开关禁用 AI**，或 **将每一项 AI 功能都路由到运行在 `localhost` 上的 Ollama 实例**。再搭配一个可离线运行的模型（Llama、Mistral
   等），就不会有任何数据离开你的机器。
3. 如果你不想承接第三方 CLI 的条款，请 **避免使用 CLI 类 AI 提供商**——它们虽然方便，但其数据流对插件而言是不透明的。

## 自定义 AI 提供商（企业版） {id="custom-ai-providers"}

%product% 提供了扩展点，使企业内部插件能够替换内置的 AI 实现，并将 AI 调用路由到（比如）内部网关。这些扩展点在 `plugin.xml`
中以命名空间 `intellij.vcs.azuredevops` 声明——实现细节请参阅插件的 GitHub 仓库。

如果注册了优先级更高的扩展，则该功能的插件内置默认实现会被绕过。
