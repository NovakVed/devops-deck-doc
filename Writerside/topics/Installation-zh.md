# 安装

<tldr>
    <p><b>安装</b>：在 <ui-path>Settings | Plugins | Marketplace</ui-path> 中搜索 <b>DevOps Lens</b> 并点击 <b>Install</b> - 无需重启。</p>
    <p><b>前提条件</b>：JetBrains %min_ide_version% 或更新版本（构建版本 <code>%min_ide_build%.*</code>）。</p>
    <p><b>下一步</b>：打开一个带有 Azure DevOps 远程仓库的项目并<a href="Authentication-zh.md">登录</a>。</p>
</tldr>

%product% 将 Azure DevOps 的拉取请求、代码审查和流水线带进你的 JetBrains IDE。本页介绍如何安装它。

## 支持的 IDE

该插件面向 IntelliJ 平台，可在任何基于它构建的 IDE 上运行：

- IntelliJ IDEA（Ultimate 和 Community）
- JetBrains Rider
- PyCharm（Professional 和 Community）
- WebStorm、PhpStorm、GoLand、RubyMine、CLion、DataGrip、RustRover
- Android Studio（可能可用；未正式支持）

### 最低构建版本

该插件支持每个 JetBrains IDE 的 **%min_ide_version%** 及更新版本 - 即 IDE 构建版本 `%min_ide_build%.*` 或更高。

> **检查你的版本：** 从 IDE 菜单打开 **About**，查找以 `%min_ide_build%` 开头的构建号。如果版本较低，请先运行 **Help → Check
for Updates**。
> {style="note"}

## 安装插件

<tabs>
    <tab title="从 IDE 设置">
        <procedure title="从 IDE 设置安装">
            <step>打开 <ui-path>Settings | Plugins | Marketplace</ui-path>（macOS 上按 <shortcut>⌘,</shortcut>，Windows/Linux 上按 <shortcut>Ctrl+Alt+S</shortcut>）。</step>
            <step>搜索 <b>DevOps Lens</b>。</step>
            <step>点击 <b>Install</b>。插件会立即加载 - 无需重启。</step>
        </procedure>
        <p>安装完成后，插件会出现在 <b>Installed</b> 下的 <b>User-installed</b> 分组中，并处于启用状态。</p>
    </tab>
    <tab title="从 Marketplace 网页">
        <procedure title="从 Marketplace 网页安装">
            <step>打开 <a href="%marketplace_url%">%product% 的 Marketplace 页面</a>。</step>
            <step>点击 <b>Install to IDE</b> 并选择你的 IDE。</step>
            <step>在 IDE 中确认安装。插件会立即加载 - 无需重启。</step>
        </procedure>
    </tab>
</tabs>

### 验证是否成功

打开一个带有 Azure DevOps Git 远程仓库的项目，然后检查：

- **Pull Requests** 条纹图标出现在左侧工具窗口栏中。
- <ui-path>Settings | Tools | DevOps Lens</ui-path> 已存在。

![Settings | Tools 下的 DevOps Lens 页面](version-control-zh.png){ width="720" border-effect="line" thumbnail="true" }

> **看不到工具窗口？** 当项目 **没有 Azure DevOps 远程仓库**时，它会被隐藏。运行 `git remote -v` 并确认某个 URL 包含
> `dev.azure.com` 或 `visualstudio.com`。参见[故障排除](Troubleshooting-zh.md)。
> {style="note"}

## 系统要求

| 组件         | 最低要求                 | 说明                                   |
|--------------|--------------------------|----------------------------------------|
| IDE 构建版本 | %min_ide_build%.*        | JetBrains %min_ide_version% 或更新版本 |
| JDK          | 25                       | 随 IDE 捆绑                            |
| Git          | 2.20+                    | 分支检测与 HTTPS 认证交接              |
| 操作系统     | macOS / Windows / Linux  | IDE 支持的任何平台                     |
| 网络         | 到 Azure DevOps 的 HTTPS | `dev.azure.com` 或你的自托管服务器     |

> **使用代理？** 该插件使用 IDE 自身的 HTTP 代理。只需在 <ui-path>Settings | Appearance &amp; Behavior | System Settings |
> HTTP Proxy</ui-path> 中设置一次，Azure DevOps 和（HTTP）AI 调用都会继承它。基于 CLI 的 AI 提供程序是外部二进制文件，不会通过它路由。
> {style="note"}

## 必需的捆绑插件

该插件 **依赖于**两个 IDE 捆绑插件（在所有环境中默认启用）。如果其中任一被禁用，插件将无法加载 - 请在 <ui-path>Settings |
Plugins | Installed</ui-path> 中重新启用它们：

- **Git**（`Git4Idea`）- 分支检测与 HTTPS 凭据。
- **Markdown** - 为评论和描述编辑器提供支持。

还有一个是 **可选的**：

- **PDF Viewer** *（可选，来自 Marketplace）* - 仅在需要于拉取请求 diff 中预览 PDF 文件时才需要。其余所有功能都不依赖它。

## 更新与卸载

更新会显示在 <ui-path>Settings | Plugins | Installed</ui-path> 中 - 当有更新时点击 **Update**，新版本会原地加载 -
通常无需重启。要卸载，请使用齿轮图标 → **Uninstall**；你存储的凭据也会从钥匙串中移除。

> **无需重启。** %product% 是一个动态插件 - 安装、更新和卸载都不需要重启 IDE，其键盘快捷键会在插件加载后立即按项目配置就绪。如果
> IDE 仍然显示重启按钮，你可以跳过它。
> {style="note"}

> **下一步：** 阅读[](Quick-Start-zh.md)进行一分钟的快速了解，或阅读[](Authentication-zh.md)进行登录。要启用摘要和
> AI 审查，请参见 [](AI-Features-zh.md)。
> {style="tip"}
