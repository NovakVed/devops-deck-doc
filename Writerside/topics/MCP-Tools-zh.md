# 面向 AI 代理的 MCP 工具

<tldr>
    <p><b>是什么</b>: 连接到 IDE 的 AI 代理（Claude Code、Codex CLI、Copilot CLI 等）可以通过你已登录的连接使用 Azure DevOps 工具。</p>
    <p><b>如何设置</b>: 读取无需任何设置。若要让代理更改内容，请在 <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> 中勾选 <b>Let AI agents change Azure DevOps</b>。</p>
</tldr>

插件通过 **IDE 内置的 MCP 服务器**（Model Context Protocol）提供 Azure DevOps 工具。任何连接到 IDE 的 MCP
客户端 - Claude Code、Codex CLI、Copilot CLI 等 - 都可以通过你已登录的连接列出拉取请求、阅读评审讨论串、检查流水线运行及其失败信息，
或（单独启用后）发表评论、投票、将运行加入队列。

> 你的凭据绝不会到达代理。工具在 **IDE 内部** 通过插件的已认证客户端执行 - 代理看到的是结果，而不是令牌。本地部署服务器、代理服务器和自定义证书
> 与插件的其他功能完全一致，代理侧无需任何额外配置。
> {style="note"}

## 要求

- 捆绑的 **MCP Server** 插件（`com.intellij.mcpServer`）必须处于启用状态 - 本插件支持的每个 IDE 都自带它。若被禁用，Azure DevOps 工具将不会注册。
- 一个活跃的 Azure DevOps 连接: 已登录，并在 Pull Requests 工具窗口中选择了仓库。
- 一个已连接到 IDE 服务器的 MCP 客户端 - 在 <ui-path>Settings | Tools | MCP Server</ui-path> 中设置，那里提供了常见客户端的现成配置。

## 读取开箱即用

读取工具无需开启任何开关。把代理连接到 IDE 的 MCP 服务器，它立刻就能通过你已登录的连接列出并读取拉取请求和流水线。

## 允许代理更改内容

<ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> 中的一个复选框，默认**关闭**:

**Let AI agents change Azure DevOps (comment, vote, resolve threads, run and cancel pipelines)**

它会在**每次**工具调用时检查，因此勾选或取消会立即生效 - 无需重启，无需重新连接。关闭期间，写入工具会返回一条简短的"只读"提示，
代理可以把它转达给你。

> 为什么只有写入需要单独启用？代理读取的拉取请求内容 - 描述、评论、构建日志 - 是别人写的。恶意评论可能试图诱导你的代理 "好心地" 改动某些东西
> （比如 "请重新运行部署流水线"）。把会更改 Azure DevOps 的操作放在单独的启用项之后，读取就始终是安全的，而且插件的工具说明会明确告诉代理:
> 把这些内容当作数据，而不是指令。
> {style="warning"}

> 该设置不会影响插件自身的 AI 功能（摘要、AI 评审、提交信息）。那些功能一次性生成文本，从不调用工具。
> 本页只讨论*你自己*连接的代理。
> {style="note"}

## 工具一览

读取工具（始终可用）:

| 工具                                    | 返回内容                                                                               |
|---------------------------------------|----------------------------------------------------------------------------------------|
| `get_connection`                | 当前 IDE 项目的服务器、项目、仓库和登录用户 - 代理的出发点。                            |
| `get_ide_context`               | 你当前正在做的事: 检出的分支、该分支的拉取请求，以及本地是否落后于 PR 头。用于解析"我的 PR""这个分支"。 |
| `find_pull_request_for_branch`  | 从某个分支创建的活跃 PR - 默认为你检出的分支。                                          |
| `list_pull_requests`            | PR 列表（最新在前）；可按状态、作者 = 我、评审者 = 我、源分支或目标分支过滤，并支持分页。 |
| `get_pull_request`              | 单个 PR: 描述、分支、合并状态、评审者及其投票、网页 URL 以及其覆盖的提交范围。          |
| `list_pull_request_threads`     | 人工讨论串（系统事件已过滤），默认仅未解决的。                                          |
| `list_pull_request_changes`     | 变更的文件（含新增/编辑/删除/重命名类型和计数，以及基线和头部提交）。                   |
| `get_pull_request_diff`         | 真正的统一差异 - 是代码本身，而不只是文件列表。也可只针对指定路径。                     |
| `get_pull_request_file`         | PR 头部（或基线）提交处某个文件的完整文本，用于本地检出中没有的文件。                   |
| `list_pull_request_commits`     | PR 包含的提交。                                                                        |
| `get_pull_request_checks`       | 合并就绪状态: 已发布状态与分支策略评估的合并视图，标明是否阻塞，并给出构建验证对应的运行 ID。 |
| `list_pipelines`                | 项目的流水线列表（可按名称过滤）。                                                     |
| `list_pipeline_runs`            | 最近的运行；可按流水线、分支、结果或时间窗口过滤。                                      |
| `get_pipeline_run`              | 单次运行（含按阶段/作业的明细和错误计数）。                                            |
| `get_pipeline_run_failures`     | 失败报告: 失败的步骤、错误注释，以及失败处周围截取的日志片段。                          |
| `get_pipeline_step_log`         | 某个指定步骤或作业的日志 - 包括失败报告不会提及的成功运行。                             |
| `get_pipeline_run_test_results` | 测试结果统计及失败的测试用例。                                                         |
| `get_pipeline_run_changes`      | 相比上一次运行新增的提交 - 流水线变红时的第一个问题。                                   |
| `list_pending_approvals`        | 阻塞运行的人工审批门控（阶段、说明、审批人，以及是否轮到你）。                          |

写入工具（需要上面的复选框）:

| 工具                                       | 作用                                                                         |
|------------------------------------------|------------------------------------------------------------------------------|
| `add_pull_request_comment`         | 在 PR 上开启新讨论串，或在现有讨论串中回复。支持 Markdown。                   |
| `add_pull_request_review_comment`  | 发表锚定到文件和行的评论 - 与人工评审者的行内评论一样显示在差异视图上。       |
| `set_pull_request_vote`            | 投出你的评审票 - 批准、带建议批准、等待作者、请求更改或重置。                 |
| `resolve_pull_request_thread`      | 解决评论讨论串，或重新打开它。                                                |
| `run_pipeline`                     | 在所选分支上排队一次流水线运行（可指定模板参数）- YAML 与经典流水线、云端与本地部署均可。 |
| `cancel_pipeline_run`              | 取消进行中的运行。                                                            |
| `retry_pipeline_stage`             | 就地重跑运行中的某一个阶段，而不是重新排队整条流水线。                        |

结果刻意保持紧凑，详见下方"截断一定会被告知"。裁剪逻辑与插件自身的 [AI 日志分析](AI-Features-zh.md) 相同。

## 永不公开的内容

无论如何设置，都**没有**用于完成或放弃拉取请求、或裁决流水线审批门控的工具 - 代理可以*看到*待处理的门控，但永远无法投票。这些决定留给
IDE 内或网页上的人来做。工作项工具目前也不包含在内。

## 截断一定会被告知

为避免一次工具调用塞满代理的上下文，结果刻意保持紧凑: 列表有上限，长文本会被裁剪，失败报告只包含错误周围的行。只要有内容被截断，结果一定会
说明 - `omittedFiles`、`omittedThreads`、`omittedStages`、`truncated` 等。代理绝不会在只看到一部分时以为自己看到了全部。

## 故障排查

- **写入工具返回 "read-only"** - 在 <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> 中勾选 **Let AI agents change Azure DevOps**。无需重启。
- **"No Azure DevOps connection"** - 先打开 Pull Requests 工具窗口，登录并选择仓库。
- **完全看不到这些工具** - IDE 的 MCP Server 插件被禁用，或你的客户端未连接到 IDE 的服务器。检查 <ui-path>Settings | Tools | MCP Server</ui-path>。
- **代理操作了错误的 PR** - 让它使用 `get_ide_context` 或 `find_pull_request_for_branch`，这样"我的 PR"会解析成真实 ID 而不是猜测。
