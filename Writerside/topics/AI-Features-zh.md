# AI 功能

<tldr>
    <p><b>位置</b>：PR 时间线上的 AI 摘要卡片、差异工具栏以及每个评论编辑器。</p>
    <p><b>如何开启</b>：在 <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> 中开启 <b>Enable AI assistance</b>，然后添加服务商。</p>
</tldr>

可选的 AI 助手：PR 摘要、完整差异审查、代码解释、提交消息、PR 标题/描述草稿、语法润色以及管道日志分析。 **自带服务商** -
OpenAI、Claude、Gemini、Ollama 或 GitHub Copilot - 并可将每项功能路由到你喜欢的任意服务商。在使用 Claude Code 这类 AI
代理？插件还可以把你的 Azure DevOps 数据作为 [MCP 工具](MCP-Tools-zh.md) 提供给它。

> 每一次 AI 调用都是 **由用户触发的**，而且在你添加服务商之前，任何内容都不可能被发送到任何地方：总开关出厂即为启用，但只要没有配置可用的服务商，插件就
> **不会发出任何对外的 AI 调用** - AI
> 按钮只会把你引导到设置页面。关于具体发送给服务商的内容，请参阅[](Privacy-and-Data-zh.md)。
> {style="note"}

> 在设置好服务商之前，PR 时间线会在摘要卡片的位置显示一张一次性的 **AI 引导卡片**，直接链接到 AI Settings。用 **✕**
> 关闭后它就再也不会出现；配置好服务商后，它会化作真正的[摘要卡片](#tune-the-summary)。
> {style="tip"}

## 插件能用 AI 做什么

| 功能                                      | 作用                                                                                                        | 位置                                                       |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| **Summarize Pull Request**                | 起草一份差异摘要，可直接放入描述中。                                                                        | 时间线卡片 / 溢出菜单                                      |
| **Run AI Review**                         | 遍历差异并提出内联审查评论。                                                                                | 差异工具栏 / 变更树菜单 / 溢出菜单                         |
| **Explain This File**                     | 流式输出对某个文件或选区的通俗英文解释。                                                                    | 在差异中右键单击                                           |
| **Generate Commit Message with AI**       | 根据你暂存的更改起草一条提交消息。                                                                          | Commit 工具窗口                                            |
| **Title + Description**                   | 根据分支的差异预填 Create-PR 表单。                                                                         | Create Pull Request 表单                                   |
| **Polish grammar &amp; spelling with AI** | 就地清理任意评论或描述。                                                                                    | 每个评论编辑器                                             |
| **Analyze logs with AI**                  | 根据日志解释一次已结束的管道运行 - 失败时给出根本原因与修复建议，成功时给出简短摘要。只发送日志的相关部分。 | [管道运行的作业日志](Pipelines-zh.md#analyze-logs-with-ai) |

![PR 时间线上的 AI 摘要卡片](ai-summary-card-zh.png){ width="700" border-effect="line" }

> **Run AI Review** 会在差异中提出内联建议。每条建议都提供 **Add to review** - 将 AI
> 的文本放入该行的新评论编辑器中，方便你编辑并将其作为草稿排队 - 或 **Discard**，将其放入一个已弃置池，随时可用 **⟲ restore**
> 控件找回（恢复是免费的 - 绝不会触发付费的重新运行）。当某张建议卡片获得焦点时，<shortcut>A</shortcut> 采纳、<shortcut>
> D</shortcut> 丢弃该建议，而 <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut> 会按同一阅读顺序遍历人工评论、待提交草稿和
> AI 建议。 **在你提交待处理评论之前，不会有任何内容发布到 Azure DevOps。**
> {style="tip"}

> 运行失败不会无声无息：鉴权、配额、速率限制、服务过载、上下文过大和网络错误各自都有对应的可操作提示消息，并带有一键跳转的
> **Open AI Settings** - CLI 登录失败还会提供复制修复命令的选项（例如 `claude /login`）。
> {style="note"}

### AI 审查是否仍然是最新的？ {id="is-the-ai-review-still-current"}

PR 时间线的右侧边栏中有一个 **AI review** 区块 - 用于一眼看出上一次审查是否仍与代码相符。它会显示三种状态之一：

| 状态         | 该区块会显示什么                                                                                                                                                                                              |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **从未运行** | *Not run for this pull request yet.*，下方是一个 **Run AI review** 链接。                                                                                                                                     |
| **最新**     | ✓ *Reviewed 2 hours ago*，随后是数量 - *"3 suggestions, inline in the diff."* 或 *"No suggestions - clean pass."* - 下方是 **View suggestions** 和 **Re-run**。                                              |
| **已过时**   | ⚠ *Review out of date*，随后是 *"2 new commits since the last review."* - 或者在无法推算出数量时（例如强制推送之后）显示 *"The pull request changed since the last review."* - 下方是 **Re-run AI review**。 |

**View suggestions** 会跳转到差异中的第一条建议处；只有当这次运行至少产出了一条建议时它才会出现。 **Re-run** 走的路径与其他任何地方的
**Run AI Review** 相同，因此它是一次全新的、会计费的运行 - 这与恢复一条已弃置的建议不同。

该区块是实时的：它会在每次轮询、每次加载提交以及每次审查完成后重新渲染，因此一有推送落地， *Reviewed 2 hours ago* 就会立刻变成
*2 new commits since the last review.*。

> 当 AI 关闭或未配置任何服务商时，整个区块都会隐藏 - 一个空的 **AI review** 标题只是无用的装饰，而未配置的情形已经由引导卡片覆盖了。
> {style="note"}

### 调整摘要 {id="tune-the-summary"}

**AI summary** 卡片右上角的 **Summary settings** 齿轮会打开一个弹窗，用于控制摘要的生成方式：

| 控件                               | 选项                                                                                                                                             |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **Generate automatically on open** | 复选框 - 默认关闭。开启后，PR 一打开卡片就会起草摘要。                                                                                           |
| **Verbosity**                      | 滑块：**Brief** · **Neutral** · **Verbose**。                                                                                                    |
| **Formality tone**                 | 滑块：**Informal** · **Neutral** · **Formal**。                                                                                                  |
| **Personality**                    | 自由文本 - 可选的人设，例如"一位略带讽刺的首席工程师"。                                                                                          |
| **Customization prompt**           | 自由文本 - 留空则使用默认值。它与 AI Settings 中的 **Configure Prompts → Pull Request summary** 是同一个覆盖项，因此在任一处的编辑都会保持同步。 |

没有保存按钮 - 编辑控件后关闭弹窗即可应用。

![从 AI 摘要卡片齿轮弹出的 Summary settings 弹窗](ai-summary-settings-popup-zh.png){ width="520" border-effect="line" }

## 配置服务商

打开 <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> 并开启 **Enable AI assistance**（总开关）。然后在
**AI Providers** 表中添加服务商。

![AI Settings 页面：服务商与按功能路由](configure-providers.png){ width="720" border-effect="line" thumbnail="true" }

每一行代表一个服务商实例，包含 **Provider**、 **Model** 和 **Enabled** 列；第一个启用的行即为默认。 **Add AI Provider**
对话框提供五个系列：

| 系列               | 说明                                                                           |
|--------------------|--------------------------------------------------------------------------------|
| **OpenAI**         | GPT 模型。可与任意兼容 OpenAI 的 base URL 配合使用（Azure OpenAI、vLLM，……）。 |
| **Claude**         | Anthropic Claude 模型。                                                        |
| **Gemini**         | Google Gemini 模型。                                                           |
| **Ollama**         | 本地模型 - 免费，无需密钥。                                                    |
| **GitHub Copilot** | 使用你的 Copilot 订阅（仅限 CLI）。                                            |

> Add/Edit 对话框中的 **Model** 下拉框会自动填充：它会立即显示一份内置的建议列表，然后通过对服务商的实时查询进行刷新（例如
> OpenAI 和 Claude 的 `/v1/models`），这样新发布的模型无需更新插件即可出现。实时列表会缓存约 30
> 分钟；它会在每次打开对话框以及你更改系列或模式时刷新，所以没有手动刷新按钮。发现功能需要一个已保存的密钥 -
> 在输入密钥之前，下拉框会回退到建议列表。该字段始终可编辑，因此你随时可以手动输入模型 id。
> {style="note"}

大多数系列以两种 **模式**之一运行：

- **HTTP API (use an API key)** - 粘贴一个密钥；可选择设置 **API URL** 以指向自定义端点。密钥存储在 IDE
  密钥链（PasswordSafe）中。
- **CLI (use the local command-line tool)** - 无需密钥；本地二进制文件自行处理鉴权。这是阻力最小的路径，但你需要接受 CLI
  供应商的条款。

在对话框中使用 **Test Connection** 以在保存前确认服务商可用。

## 将功能路由到服务商

**Per-Feature Provider** 面板将每项功能固定到特定实例 - 便于将廉价功能发送给小模型，而将繁重的审查发送给智能模型：

```
AI Summary          → [Default ▾]
AI Review           → [Default ▾]
Title + Description → [Default ▾]   (also used by Generate Commit Message)
Explain Code        → [Default ▾]
```

将某一行保留为 **Default** 即可使用第一个启用的服务商。你可以 **多次添加同一系列**（例如两个 OpenAI
行，一个廉价模型和一个智能模型），并分别独立路由。

### Configure Prompts

**Configure Prompts** 面板让你可以编辑每项功能背后的系统提示。编辑某个提示会使其缓存的响应失效。

## 选择响应语言

**General AI Settings** 分组中、主开关正下方的两项设置：

| 设置                                                                        | 默认值 |
|-----------------------------------------------------------------------------|--------|
| **AI response language**                                                    | Auto   |
| **Also use this language for PR titles, descriptions, and commit messages** | 关闭   |

**AI response language** 是模型撰写摘要、代码解释、审查意见和流水线日志分析所用的语言。 **Auto** 跟随 IDE 语言；润色你自己
撰写的文本时，始终保持你所使用的语言。下方的复选框是单独的选择加入项，因为 PR 标题、描述和提交信息会进入 git
历史并出现在拉取请求上，在那里团队的约定比你 IDE 的语言更重要——无论如何，你在 IDE 内阅读的内容都跟随该下拉框。

## 缓存、成本与限制

AI 响应按 **每个 PR + 每个提交 SHA** 缓存（开关： **Cache AI responses per commit SHA**，默认开启）。缓存命中会立即返回且不产生
API 调用；新的提交或编辑过的提示会使其失效。可通过 **Advanced** 中的 **Clear AI Response Cache** 强制刷新。

你为所使用的 token 向服务商付费。为了控制用量：

- 通过按功能路由，将廉价功能（提交消息、标题）路由到小模型。
- 在 **Advanced** 中降低 **Max diff size**，在发送前截断大型差异。
- 保持缓存开启，这样重新打开 PR 不会再次向你计费。

部分节省是自动完成的：锁定文件（`package-lock.json`、`yarn.lock`、`uv.lock` 等）、压缩（minified）和自动生成的文件、二进制文件以及构建输出文件夹会在发送前从每个
AI 差异中剔除；重命名的文件只发送其实际编辑内容，已删除的文件只发送一行说明而不是其内容。

> 服务商配额和用量限制错误直接来自服务商 - 插件会对其分类并显示清晰、可操作的措辞，而不是无声地失败。它不会添加自己的速率限制或重试。
> {style="note"}

## 保持一切本地，或完全关闭

- **本地推理：** 将每项功能都路由到 `localhost` 上的 **Ollama** 实例 - 没有任何代码离开你的机器。
- **完全关闭：** 取消勾选 **Enable AI assistance**。所有 AI 功能都会从菜单和工具栏中消失，插件也不会发出任何对外的 AI 调用。
