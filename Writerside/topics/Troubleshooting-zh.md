# 疑难解答

<tldr>
    <p><b>没有工具窗口</b>：在检测到 Azure DevOps Git 远程之前，Pull Requests 窗口会一直隐藏。</p>
    <p><b>数据陈旧</b>：用 <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> 强制同步。</p>
    <p><b>报告问题</b>：<ui-path>Help | Report DevOps Lens Issue…</ui-path>。</p>
</tldr>

针对用户最常遇到的问题的快速修复方法。对于决策类问题（例如“我应该使用 OAuth 还是
PAT？”“它支持本地部署吗？”），请参阅 [](FAQ-zh.md)
。如果此处未涵盖你的问题，请参阅底部的 [报告问题](#reporting-a-problem)。

## 工具窗口没有出现

当未检测到 Azure DevOps Git 远程时，Pull Requests 工具窗口会被隐藏。请检查：

<procedure>
    <step>在项目根目录中运行 <code>git remote -v</code>。至少要有一个远程 URL 包含 <code>dev.azure.com</code> 或 <code>visualstudio.com</code>（或你配置的自托管服务器）。</step>
    <step>确认捆绑的 <b>Git</b> 插件（<code>Git4Idea</code>）已在 <ui-path>Settings | Plugins | Installed</ui-path> 中启用。</step>
    <step>重启 IDE — 远程扫描会在项目打开时运行。</step>
</procedure>

## 拉取请求列表为空 {id="empty-pr-list"}

当列表没有内容可显示时，它会在面板正中说明 *为什么*，而且大多数状态都带有一个内联的恢复链接。请对照你看到的消息：

| 列表显示                                                                                                                                                        | 含义                                                        | 该怎么做                                                                                                     |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| **Loading pull requests…**                                                                                                                                      | 首次获取仍在进行中。                                        | 稍等 — 它会落入下面某个状态。                                                                                |
| **Nothing to load**                                                                                                                                             | 查询成功但返回为空（例如该仓库上没有开放的 PR）。           | 放宽 **State** 筛选器，或确认你选对了仓库。                                                                  |
| **No matches**                                                                                                                                                  | 你的筛选器或搜索文本排除了所有 PR。                         | 点击 **Clear filters**。                                                                                     |
| **No credentials stored for this account** — *"The saved token couldn't be read from the IDE's password safe (it may have been removed from the keychain)."*    | 账户仍然配置着，但它的令牌已从操作系统钥匙串中消失。        | 点击 **Log in again** — 请参阅 [](Authentication-zh.md)。                                            |
| **This account can't access these pull requests** — *"Your PAT was accepted, but it's either missing a required scope or the account lacks repository access."* | Azure DevOps 已作出响应，而这两种原因它返回的是同一个响应。 | 点击 **Switch account / repository**，然后依次排查下文的 [401](#unauthorized-401) 和 [403](#forbidden-403)。 |
| **Can't load pull requests** — *"You're offline."*                                                                                                              | 网络类故障 — 请求根本没有到达服务器。                       | 点击 **Retry**，或参阅 [插件提示我处于离线状态](#offline)。                                                  |

## 登录后出现“401 Unauthorized” {id="unauthorized-401"}

- PAT 可能缺少所需的作用域 — 请参阅 [](Authentication-zh.md)。最简单的修复方法：使用 **Full access** 重新生成。
- PAT 可能已过期。令牌会在你创建时设定的日期过期。
- 你的组织可能已禁用 PAT — 这种情况下请改用 OAuth。

## 特定操作出现“403 Forbidden” {id="forbidden-403"}

PAT 有效，但你的 Azure DevOps 账户没有执行该操作的权限（例如你可以读取拉取请求但不能投票，或无法合并）。请让你的 Azure DevOps
管理员在相应项目或仓库上授予所需权限。

## OAuth 浏览器没有返回到 IDE

OAuth 通过 **本地回环重定向**完成 — 浏览器会被重定向回 `http://127.0.0.1:<port>/azure-oauth/callback`，该地址由 IDE 的内置
Web 服务器提供服务，随后会显示 *“Sign-in complete. You can close this tab.”*。如果这一往返过程失败：

- 防火墙或安全工具可能正在阻止到 IDE 内置服务器的 localhost 连接（端口范围 **63342–63352**）。
- 被拦截的弹出窗口或非默认浏览器可能会中断重定向 — 请确保你想使用的浏览器是默认浏览器。
- 登录窗口有 **5 分钟** 的时限；如果已超时，请重新开始。

变通方法：改用个人访问令牌（Personal Access Token）而非 OAuth。

## 同步后拉取请求不显示新评论

<procedure>
    <step>按 <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut>（或右键单击 → <b>Refresh List</b>）立即强制同步 — 工具栏上没有 Reload 按钮。</step>
    <step>检查 <b>idea.log</b> 中是否有同步错误（<a anchor="enabling-debug-logs">启用调试日志</a> 以获取更多详情）。</step>
    <step>默认的同步间隔为 60 秒。如果你在 <a href="Settings-zh.md"/> 中增大了该间隔，延迟会更长。</step>
</procedure>

## 内联评论没有出现在差异中

- 插件仅在你拥有 **Code (Read)** 权限的拉取请求上渲染内联评论线程。
- 如果你查看的是本地工作树中的差异（而非拉取请求），内联线程不会渲染 — 请从工具窗口打开拉取请求，以便加载其变更树和评论线程。
- 如果你的本地分支与拉取请求头已发生分叉，编辑器内审查会自行禁用。请推送你的更改，或精确检出拉取请求头。

## Git 推送时要求输入密码 {id="git-push-asks-for-a-password"}

插件的 HTTPS 凭据提供程序仅对 **在 IDE 内**运行的 Git 操作生效（从 IDE 内启动的终端也算作“内部”）。对于外部终端，请配置系统级别的
Git 凭据助手：

```bash
# macOS Keychain
git config --global credential.helper osxkeychain

# Windows
git config --global credential.helper manager

# Linux (libsecret)
git config --global credential.helper libsecret
```

## AI 功能缺失或返回错误

- 打开 <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>，确认已勾选 **Enable AI assistance**
  ，并且至少配置并启用了一个提供程序。
- 在提供程序行上单击 **Test connection** — 如果失败，请仔细核对 API 密钥、模型名称和端点 URL。
- 对于 **Ollama**，请确认守护进程正在本地运行（`ollama serve`），并且你指定的模型已拉取（`ollama list`）。
- 对于 **CLI providers**（Claude Code、Codex、Copilot CLI），请确保二进制文件位于 `PATH` 中并已登录（`claude /login` 等）。
- 提供程序的速率限制或配额错误直接来自提供程序 — 它们不会被重试。

## 插件冲突 {id="plugin-conflicts"}

本插件与捆绑的 **GitHub** 插件和 **GitLab** 插件共享 IDE 的 `collaboration-tools` 工具包。它与两者共存 —
各自拥有独立的工具窗口和独立的状态。有两个已知的交互点：

- 如果一个项目同时具有 Azure DevOps 和 GitHub 远程，两个工具窗口都会出现；右键上下文菜单可能会同时显示来自两者的操作。
- 如果第三方插件覆盖了 AI 扩展点（`intellij.vcs.azuredevops.aiSummaryExtension`
  等，参见 [](Privacy-and-Data-zh.md)），则该功能的内置默认实现会被绕过。如果 AI 功能表现异常，请在 <ui-path>
  Settings | Plugins</ui-path> 中检查是否有其他可能挂接这些扩展点的 Azure DevOps 或 AI 插件。

## 插件提示我处于离线状态 {id="offline"}

插件会自行跟踪可达性，并且 **仅**在出现网络类错误时才切换到离线状态 — 也就是请求根本没有到达服务器的那种。令牌过期、403 或
404 都意味着 Azure DevOps 作出了响应，因此它们都不会把你标记为离线；这些情况请参阅 [401](#unauthorized-401)
和 [403](#forbidden-403)。

切换本身是刻意保持安静的 — 一次失败的后台刷新不该朝你弹气泡。你会在尝试 **写操作**时发现它：该操作会被立即拦下，并弹出一个
**You appear to be offline** 气泡，说明你刚才想做什么，例如 *"Couldn't start the run - try again when you reconnect."*。

恢复无需你做任何事。离线期间，插件会按退避策略轮询 Azure DevOps（30 秒，翻倍直至 120 秒），并在第一次探测成功时清除离线状态 —
你自己的任何一次成功请求同样会清除它。已打开的 PR 和管道运行编辑器会在状态清除的那一刻自行重新加载。

> 该探测检查的是 **Azure DevOps 本身**，而不是“我有没有 wifi” — 因此，一个让网络其余部分照常工作的 VPN、代理或 DNS
> 问题，在这里依然会被判定为离线。请检查 <ui-path>Settings | Appearance &amp; Behavior | System Settings | HTTP Proxy</ui-path>。
> {style="note"}

## 网络超时或“request failed”

插件使用 IntelliJ 的 HTTP 代理配置 — 没有单独的代理设置。如果公司网络限制阻止了出站 HTTPS：

- 检查 <ui-path>Settings | Appearance &amp; Behavior | System Settings | HTTP Proxy</ui-path>。插件会遵循你在此处设置的内容，
  **包括代理凭据** — 如果代理需要用户名和密码，必须在此填写，否则每个请求都会返回 `407`。
- 基于 CLI 的 AI 提供方（`claude`、`codex`、`copilot`）是拥有各自网络栈的外部程序，**完全不会**继承 IDE 的代理设置，需要单独配置。
- AI 流式请求的 HTTP 超时时间为 **5 分钟**。超过该时间的都会被视为挂起，并作为通知报告。
- Azure DevOps API 调用的重试行为是“快速失败” — 瞬时错误不会被重试，以免 UI 堆积重复调用。60 秒的后台同步会从失败请求中断处继续。

## 自签名证书与企业 CA 证书 {id="certificates"}

本地部署的 Azure DevOps Server 通常使用企业内部 CA 签发的证书。插件的 TLS 走 IDE 自身的证书存储，因此首次登录这类服务器时，IDE 会弹出
**“是否接受此证书？”** 对话框。接受一次即会保存该决定，之后可在 <ui-path>Settings | Tools | Server Certificates</ui-path> 中查看或撤销。

> 插件**有意不提供“接受不受信任证书”的开关**。通过平台对话框授予的按主机信任可审计、可撤销；而一刀切的绕过两者都做不到，还会削弱插件发出的每一个请求。
> {style="note"}

如果没有出现该对话框，而是直接报 TLS 错误：

- 确认服务器 URL 是 `https://`。`http://` 在登录时会被拒绝——PAT 以 HTTP Basic 形式随每个请求发送，明文传输会导致泄露。
- 在 <ui-path>Settings | Tools | Server Certificates</ui-path> 中导入企业 CA，然后重试。
- 如果网络中有 TLS 检查代理，流量会被它用自己的 CA 重新签名，该 CA 同样需要被信任。

## 插件更新导致某些功能失效 {id="plugin-update-broke-something"}

回滚到先前版本：

<procedure>
    <step>打开 <ui-path>Settings | Plugins | Installed</ui-path>，找到 <b>DevOps Lens</b>。</step>
    <step>单击齿轮图标 → <b>Manage Plugin Versions</b>。</step>
    <step>选择一个较旧的版本并安装。该插件是动态插件，通常无需重启。</step>
</procedure>

## 启用调试日志 {id="enabling-debug-logs"}

若需更深入的疑难解答，请启用跟踪日志记录：

<procedure>
    <step>打开 <ui-path>Help | Diagnostic Tools | Debug Log Settings…</ui-path></step>
    <step>添加以下行：
        <code-block lang="text">
#com.vednovak.devops
#com.vednovak.devops.sync
#com.vednovak.devops.api
        </code-block>
    </step>
    <step>重现该问题。</step>
    <step>打开 <ui-path>Help | Show Log in Explorer/Finder</ui-path> 以找到 <code>idea.log</code>。</step>
</procedure>

日志位于你的 IDE 缓存目录中：

<tabs>
    <tab title="macOS">
        <code>~/Library/Logs/JetBrains/&lt;IDE&gt;&lt;Version&gt;/idea.log</code>
    </tab>
    <tab title="Windows">
        <!-- ignore-vars stops Writerside reading %LOCALAPPDATA% as a variable
             reference. Do not "fix" this to &#37; - the builder re-escapes that
             entity's ampersand and readers see the literal &#37; text. -->
        <code ignore-vars="true">%LOCALAPPDATA%\JetBrains\&lt;IDE&gt;&lt;Version&gt;\log\idea.log</code>
    </tab>
    <tab title="Linux">
        <code>~/.cache/JetBrains/&lt;IDE&gt;&lt;Version&gt;/log/idea.log</code>
    </tab>
</tabs>

## 报告问题 {id="reporting-a-problem"}

插件提供了三种方式来交出所需的信息。具体用哪一种，取决于发生了什么：

| 你看到了什么                                                | 用这个                                                                                                         |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| 状态栏中的红色错误图标，或者一个点名本插件的 IDE 错误对话框 | 该对话框中的 **Report to the Third-Party Plugin** 按钮 — 参见下文的[崩溃报告](#crash-reports)                     |
| 有东西坏了或不对劲，但并没有崩溃                            | <ui-path>Help &#124; Report DevOps Lens Issue…</ui-path> — 打开缺陷表单，其中版本信息已预填            |
| 你已经在写 issue，只想要环境信息                            | <ui-path>Help &#124; Copy DevOps Lens Diagnostics</ui-path> — 把一份快照放到剪贴板上，供你检查后粘贴 |

### 崩溃报告 {id="crash-reports"}

当插件抛出了它没有预料到的错误时，IDE 可能会显示它标准的错误对话框。按下 **Report to the Third-Party Plugin**
会把堆栈跟踪交给 JetBrains Marketplace，再由它转交给插件开发者，这样根本不需要你去翻 `idea.log`，缺陷就能被找出来。

它值得一按的理由：

- **发送它的是 IDE，而不是插件。** 第三方插件的崩溃报告是 JetBrains Marketplace 提供的服务；插件只是注册使用它，不会往报告里添加任何内容。
- **它不会公开。** 报告会进入 Marketplace 上本插件的 Exception Analyzer 页面，而不是公开的问题追踪仓库，也不会对外可见。
- **你可以补上一句话。** 在对话框的评论框里写下你当时在做什么——正是这短短一句话，常常能把一份堆栈跟踪变成一个修复。你输入的内容会原样发送，因此请不要写入代码、凭据或机密名称。
- **关闭对话框就不会发送任何内容** — 除非你打开了 IDE 的自动异常报告，那样 IDE 可能会自行发送。

由于报告是由 IDE 组装的，插件无法对它脱敏：堆栈跟踪和错误消息按原样发送，而错误消息可能包含组织、项目、仓库或服务器主机名。如果你在意这一点，请跳过这个对话框，改用
<ui-path>Help | Copy DevOps Lens Diagnostics</ui-path>——那份快照只有版本和计数，你可以先在剪贴板上读一遍，再决定粘贴到哪里。

一份报告究竟包含哪些内容的完整说明：[隐私与数据](Privacy-and-Data-zh.md#crash-reports)。

> 日常性的失败 — 处于离线状态、令牌过期、403、文件不存在 — 都会被处理并记录在本地。
> 它们绝不会弹出这个对话框，因为它们不是缺陷。遇到这些情况，请改用 Help 菜单里的缺陷表单。
> {style="note"}


### 复制诊断信息

<ui-path>Help &#124; Copy DevOps Lens Diagnostics</ui-path> 会把一份简短的、
快照放到你的剪贴板上：插件版本、IDE 构建号、Java 运行时、操作系统、配置了多少个
账户以及它们是云端还是本地部署、插件当前是否认为自己在线，以及缓存统计信息。不含 URL、
不含组织名称、不含凭据。

它是纯文本，所以你可以在粘贴之前先读一遍。这是把环境信息附到公开 issue 上的推荐做法 — 如果你完全不想发送崩溃报告，这也是反馈缺陷的方式。

## 提交缺陷 {id="filing-a-bug"}

如果你发现了可复现的问题，请提交到公开的问题追踪仓库 [%tracker_url%](%tracker_url%)
。各个渠道的用途、响应时间以及安全问题的报告方式，都整理在[](Support-zh.md)中。

<procedure>
    <step>运行 <ui-path>Help | Diagnostic Tools | Collect Logs and Diagnostic Data</ui-path>。</step>
    <step>选择 <ui-path>Help | Report DevOps Lens Issue…</ui-path> — 或者点击
        <ui-path>Settings | Tools | DevOps Lens</ui-path> 页面底部的
        <b>Report a bug</b>。两者都会打开表单，并已预填你的 IDE 版本号、插件版本和操作系统。
        （也可以直接打开<a href="%new_bug_url%">新的缺陷报告</a>并手动填写。）请包含以下内容：
        <ul>
            <li>你的 IDE 版本（<b>About</b>）</li>
            <li>插件版本</li>
            <li>操作系统与架构</li>
            <li>重现步骤</li>
            <li>预期行为与实际行为</li>
            <li>一段经过脱敏的 <code>idea.log</code> 片段（发布前请移除令牌）</li>
        </ul>
    </step>
</procedure>

> **切勿在公开的 issue 中粘贴 PAT 或 OAuth 刷新令牌**。插件不会把令牌写入自己的日志，但提交前请务必再次检查。
> {style="warning"}
