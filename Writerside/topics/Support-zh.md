# 支持

关于 %product% 的一切反馈都集中在一个公开仓库里：[%tracker_url%](%tracker_url%)。它不 包含源代码，只有 issue 模板和
Discussions —— 这样即使插件本身的仓库保持私有，也有一个 公开的地方可以反馈问题。

## 选择合适的渠道

| 你的情况                                              | 去哪里                                                                                   |
|-------------------------------------------------------|------------------------------------------------------------------------------------------|
| “IDE 弹出了红色错误图标 / 一个点名本插件的错误对话框” | 在该对话框中点击 **Report to DevOps Lens** —— 参见[崩溃报告](#crash-reports)     |
| “有问题，而且我能复现”                                | [提交缺陷](%new_bug_url%)                                                                |
| “希望插件能够……”                                      | [提交功能请求](%new_feature_url%)                                                        |
| “这个要怎么用？”“本来就该是这样吗？”                  | [Discussions](%discussions_url%)                                                         |
| “我可能发现了安全漏洞”                                | 发邮件到 [%support_email%](mailto:%support_email%) —— **不要**公开提 issue               |
| “文档写错了或缺内容”                                  | 仍然[提交到追踪仓库](%issues_url%)，会有人转交                                           |
| Azure DevOps 本身有问题                               | [Microsoft Developer Community](https://developercommunity.visualstudio.com/AzureDevOps) |
| 与本插件无关的 IDE 问题                               | [JetBrains YouTrack](https://youtrack.jetbrains.com/issues)                              |

欢迎在 Discussions 里提问，不会因为“这不是缺陷”而被关闭。如果讨论中发现确实是缺陷，会被 转成 issue。

## 崩溃报告 {id="crash-reports"}

如果插件抛出了它没有预料到的错误，IDE 会显示标准的错误对话框，其中带有一个 **Report to DevOps Lens**
按钮。这个按钮是你能按下的最有用的东西：它会发送堆栈 跟踪 —— 也就是真正能定位缺陷的那部分 —— 而不需要你先去找到、读懂并清理
`idea.log`。

除非你按下它，否则它不会发送任何内容；发送前它会在你的机器上剥离凭据和可识别身份的名称；
它绝不会包含你的代码；而且它发往的是一个私有的错误追踪服务，而不是公开仓库。可以的话，
请在对话框的评论框里写一句你当时在做什么；一份堆栈跟踪加上一句“我在一个有冲突的 PR 上点了 Approve”，通常就足以修好一个问题。

崩溃报告不包含回复地址或有意分配的账户标识符，因此无法对它作出回复。Sentry 仍可能处理连接元数据，不能保证报告完全匿名。 **如果你想要得到答复，请同时提交一个 issue** —— 两者是互补的。

一份报告究竟包含哪些内容，以及如何在完全不发送崩溃报告的前提下反馈缺陷：
[隐私与数据](Privacy-and-Data-zh.md#crash-reports)。

## 提交缺陷

最快的方式是从 IDE 里开始，因为它会自动填好报告者最常遗漏的那些信息。

<procedure title="从 IDE 提交" id="report-from-ide">
    <step>选择 <ui-path>Help | Report DevOps Lens Issue…</ui-path> —— 或者打开
        <ui-path>Settings | Tools | DevOps Lens</ui-path> 并点击页面底部的
        <b>Report a bug</b>。</step>
    <step>浏览器会打开缺陷表单，其中 IDE 版本号、插件版本和操作系统已经填好。除此之外
        不会发送任何内容，提交前你可以随意修改或清空这些字段。</step>
    <step>其余的环境信息，请运行 <ui-path>Help | Copy DevOps Lens
        Diagnostics</ui-path>，检查这份已脱敏的快照后再粘贴到 issue 中。</step>
</procedure>

设置页里的这些链接同样也位于 <b>AI Settings</b> 子页面底部，你也可以直接前往
[追踪仓库](%issues_url%)。

### 提交之前

<procedure id="before-you-file-steps">
    <step><a href="%issues_url%?q=is%3Aissue">搜索已打开和已关闭的 issue</a> —— 你遇到的
        问题可能已经在跟踪中，这时在原有 issue 下留言比新建一个重复条目更有用。</step>
    <step>浏览一遍<a href="Troubleshooting-zh.md">故障排查</a>。拉取请求列表为空、401 和
        403 错误、OAuth 重定向没有回到 IDE、行内评论不显示，这些都有已知的解决方法。</step>
    <step>把插件升级到最新版本（<ui-path>Settings | Plugins | Updates</ui-path>），确认
        问题是否仍然复现。</step>
</procedure>

### 表单会问什么

缺少这些信息的报告，通常要来回问一轮才能开始处理：

- **插件版本**和 **IDE 及构建号** —— 见 <ui-path>Help | About</ui-path>
- **操作系统**
- **Azure DevOps 类型** —— Services（云端，`dev.azure.com`）还是 Server（本地部署）
- **登录方式** —— PAT 还是 Microsoft Entra ID
- **准确的复现步骤**，以及你期望的行为
- **日志片段** —— 参见[启用调试日志](Troubleshooting-zh.md#enabling-debug-logs)，复现后 收集 `idea.log`
- 如果问题肉眼可见，附上 **截图**

> **切勿在公开的 issue 中粘贴 PAT 或 OAuth 刷新令牌。** 插件自身的日志输出会对令牌脱敏，
> 但截图、HTTP 抓包以及 `git remote -v` 的输出仍可能泄露。发布前请务必清理；万一不慎
> 泄露，请立即在 Azure DevOps 中吊销该令牌。
>
> 私有仓库名称、内网服务器地址和同事的邮箱地址同理。复现缺陷几乎从不需要这些信息。
> {style="warning"}

## 提交功能请求

好的功能请求从问题出发，而不是从方案出发 —— 这样才留有余地，得到一个你我都没想到的更好
答案。[功能请求表单](%new_feature_url%)会问你现在是怎么做的、哪里不顺手、又尝试过哪些 替代办法。

如果还不确定这算不算功能请求，可以先[发起一个讨论](%discussions_url%)，再一起把它理清楚。

## 安全问题

请通过邮件私下报告漏洞，发送到 [%support_email%](mailto:%support_email%)，主题中带上
`[SECURITY]`，不要公开提 issue。包含适用范围在内的完整策略见追踪仓库中的
[SECURITY.md](%tracker_url%/blob/main/SECURITY.md)。

适用范围包括：任何可能泄露凭据的问题，任何把你的代码或仓库数据发送到不该去的地方的问题， 以及任何让构造过的 Azure DevOps
响应（拉取请求标题、评论正文、流水线日志）执行代码或触及
文件系统的问题。插件在设计上会把哪些数据发往何处，见[](Privacy-and-Data-zh.md)。

## 处理时效

%product% 由一个人维护，因此问题分类是分批进行的，通常在一周之内。带日志、可复现的报告
总是比没有的推进得快。无法复现的报告会收到追问，若长期没有回应则会关闭；功能请求被关闭 并不代表否定这个想法，只是它不在当前范围内。
