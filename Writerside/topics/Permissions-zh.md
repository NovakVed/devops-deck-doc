# 权限

<tldr>
    <p><b>必需</b>：<b>Code (Read &amp; write)</b>。没有它的令牌会被登录对话框拒绝。</p>
    <p><b>如何更改</b>：作用域在令牌创建时就已固化，因此只能重新进行身份验证，而不是编辑。</p>
</tldr>

%product% 能显示什么，取决于你的凭据被允许读取哪些内容。这里是完整的对照表——一个你无法跳过的权限，以及六个悄悄解锁额外功能的权限。

> **快捷做法：** 创建 PAT 时选择 **Full access**，或者使用 Microsoft 登录时选择 **Full access** 层级——下面的一切都会正常工作。
> {style="tip"}

## 无法跳过的那个

**Code (Read &amp; write)**——作用域代码 `vso.code_write`
——是插件的基础：列出拉取请求、读取差异、发表评论、投票、完成合并。没有它的令牌无法做任何有用的事，因此登录对话框会当场拒绝它，并提示你需要添加哪个作用域。你绝不会最终登录进一个空白、损坏的工具窗口。

![列出令牌必须授予的作用域的 Log In to Azure DevOps 对话框](sign-in-with-token.png){ width="560" border-effect="line" }

## 其余一切都是可选的

它们各自都会丰富使用体验；缺少任何一个只会关闭对应的功能——没有错误，没有损坏的面板。

| 作用域（PAT 界面中）        | 作用域代码            | 解锁                                                                   | 缺少它时                                                       |
|-----------------------------|-----------------------|------------------------------------------------------------------------|----------------------------------------------------------------|
| **Code → Status**           | `vso.code_status`     | **Checks** 面板——PR 上的构建/策略结果。                                | Checks 无法加载；PR 视图的其余部分不受影响。                   |
| **User Profile → Read**     | `vso.profile`         | 各处显示真实的头像照片。                                               | 头像以姓名首字母呈现。                                         |
| **Identity → Read**         | `vso.identity`        | @-提及自动补全、将提及解析为姓名，以及默认视图背后的团队成员身份查询。 | 提及搜索不返回任何结果；分配给团队的 PR 可能从默认列表中消失。 |
| **Project and Team → Read** | `vso.project`         | 默认 PR 列表中 **assigned to my team** 部分所需的团队成员身份。        | 插件回退到 Identity → Read 以获取相同信息。                    |
| **Work Items → Read**       | `vso.work`            | PR 详情上关联的工作项，以及 Work Items 筛选器。                        | 工作项部分保持为空。                                           |
| **Security → Manage**       | `vso.security_manage` | Complete 对话框中的 **Override branch policies** 选项。                | 该选项被隐藏。                                                 |

## 缺少权限时的行为

- **缺少必需权限**——登录被阻止，登录对话框中会指明确切的作用域。
- **缺少可选权限**——该功能会静默降级（用首字母代替照片、部分区域为空），其余一切照常工作。
- **无法获取分配给团队的 PR**——由于这会改变默认 PR
  列表显示的内容，你会收到一次性通知，说明需要添加哪个权限。有关默认的“mine”视图如何工作，请参阅[](Pull-Requests-zh.md)。

## 修复缺少的权限

权限在令牌创建时就已固化——无法从插件中为现有令牌添加权限。

<procedure title="使用更多权限重新进行身份验证">
    <step><b>PAT：</b>创建一个已授予所缺作用域的新令牌，然后 <ui-path>Settings | Tools | DevOps Lens</ui-path> → 铅笔图标 → 粘贴它。</step>
    <step><b>Microsoft (OAuth)：</b>移除该账户并重新登录，在权限选择器中选择 <b>Full access</b>。</step>
</procedure>

有关完整的登录演练，请参阅[](Authentication-zh.md)。
