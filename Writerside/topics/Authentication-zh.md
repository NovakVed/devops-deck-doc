# 身份验证

<tldr>
    <p><b>位置</b>：账户面板中的 <b>+</b> 按钮，或 Pull Requests 工具窗口的登录界面。</p>
    <p><b>前提条件</b>：Personal Access Token，或用于 OAuth 的 Microsoft Entra ID 账户。<a anchor="on-prem">Azure DevOps Server</a> 只支持 PAT。</p>
</tldr>

本插件支持两种登录方式：

- **个人访问令牌（Personal Access Token，PAT）**
- **Microsoft Entra ID（OAuth）**
- 无论哪种方式，凭据都会存储在 IDE 由系统提供支持的密钥链中。

## 我应该使用哪种方式？

| 使用…                     | 适用场景                                                                           |
|---------------------------|------------------------------------------------------------------------------------|
| **Personal Access Token** | 适用于任何环境，包括本地部署的 Azure DevOps Server。令牌本身不会再次提示进行 MFA。 |
| **Microsoft（OAuth）**    | 仅限云端 `dev.azure.com`。每次登录都会遵循你所在组织的 SSO/MFA；令牌会自动刷新。   |

两种方式都通过账户面板中的 **`+`** 按钮进入每次登录，它会打开一个小弹窗：

![添加账户弹窗：Log In with Token 和 Log In via Microsoft](add-account-menu.png){ width="420" border-effect="line" }

> 在本地部署的 Azure DevOps Server 上，Microsoft 登录无法完成——你会看到什么、以及 Server 字段接受哪些
> URL，请参阅 [Azure DevOps Server（本地部署）](#on-prem)。
> {style="note"}

## 使用 Personal Access Token 登录

### 1. 生成令牌

你可以让插件带你前往：登录对话框中的 **Generate…** 按钮会在浏览器中打开你所在组织的 Personal Access Tokens 页面。或者手动操作：

<procedure title="在 Azure DevOps 中生成令牌">
    <step>打开 Azure DevOps，单击你的头像（右上角）→ <b>Personal access tokens</b>。</step>
    <step>单击 <b>+ New Token</b>，设置名称、组织和有效期。</step>
    <step>授予下列作用域（或直接选择 <b>Full access</b>）。</step>
    <step>单击 <b>Create</b> 并复制令牌——Azure DevOps 只会显示一次。</step>
</procedure>

#### 插件使用的作用域 {id="pat-scopes"}

登录对话框中也会列出这些作用域：

| 作用域（在 PAT 界面中）                | 支持的功能                                                                                                           |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Code** → *Read &amp; write + Status* | 读取拉取请求和差异、发表评论、投票、完成/放弃，以及分支策略/状态检查。**必需**——登录对话框会拒绝缺少该作用域的令牌。 |
| **User Profile** → *Read*              | 你的个人资料和审查者头像。                                                                                           |
| **Identity** → *Read*                  | @提及自动补全，以及默认拉取请求列表背后的团队成员关系查询。                                                          |
| **Work Items** → *Read*                | 拉取请求上关联的工作项以及 Work Items 筛选器。                                                                       |
| **Project and Team** → *Read*          | 用于默认拉取请求列表中 **assigned to my team** 部分的团队成员关系。                                                  |
| **Security** → *Manage*                | 用于启用 Complete 对话框中 **Override branch policies** 选项的权限检查。                                             |

> **快速方案：** 如果你只想让一切都能正常工作，请选择 **Full access**
> 。上面的细粒度作用域适用于更严格的安全策略——[](Permissions-zh.md)详细说明了缺少每个作用域会关闭哪些功能。
> {style="tip"}

### 2. 将其添加到插件

<procedure title="使用令牌登录">
    <step>在 Pull Requests 工具窗口中（或 <ui-path>Settings | Tools | DevOps Lens</ui-path>），单击 <b>+</b> → <b>Log In with Token…</b>。</step>
    <step>填写两个字段：
        <ul>
            <li><b>Server</b>——完整 URL（<code>https://dev.azure.com/your-org</code>）、纯组织短名（<code>your-org</code>）、旧版 <code>visualstudio.com</code> URL，或本地部署 URL（<code>https://tfs.example.com/tfs/your-collection</code>）。没有单独的组织字段——组织信息会从该字段中读取。</li>
            <li><b>Token</b>——粘贴 PAT。</li>
        </ul>
    </step>
    <step>单击 <b>Log In</b>（或直接按 <shortcut>Enter ↵</shortcut>）。插件会验证令牌（"Validating credentials…"），随后你的工具窗口会填充内容。</step>
</procedure>

> Server 字段 **只接受 https URL**——PAT 会以 HTTP Basic 的形式随每个请求一同发送，因此对话框会直接拒绝纯 `http://`
> 。而且验证不止于“能否登录”：插件还会试读一个拉取请求，因此一个能通过身份验证但缺少 **Code** 作用域的令牌会被当场拒绝，并给出指明所缺作用域的消息。
> {style="note"}

![带有 Server 和 Token 字段的 Log In to Azure DevOps 对话框](sign-in-with-token.png){ width="560" border-effect="line" }

### 轮换或吊销令牌

<procedure title="轮换令牌">
    <step>在 Azure DevOps 中，创建一个具有相同作用域的新令牌并复制它。</step>
    <step>在 <ui-path>Settings | Tools | DevOps Lens</ui-path> 中，单击账户行上的 <b>铅笔</b> 图标并粘贴新令牌。（编辑时 Server 字段处于锁定状态——只有令牌会被更改。）</step>
    <step>返回 Azure DevOps，吊销旧令牌。</step>
</procedure>

如果令牌被吊销或过期，插件会在工具窗口中显示 **Log In Again**——单击它即可粘贴新令牌。

## 使用 Microsoft 登录（OAuth）

对于倾向于使用 SSO 的云端组织，可通过 Microsoft Entra ID 登录。

<procedure title="使用 Microsoft 登录">
    <step>单击 <b>+</b> → <b>Log In via Microsoft…</b>。</step>
    <step>在 <b>Sign in with Microsoft</b> 中，选择一个权限层级（见下文）并单击 <b>Continue</b>。</step>
    <step>在浏览器中进行身份验证（包括 MFA）。该页面会通过本地环回地址重定向回 IDE，并显示 <b>"Sign-in complete. You can close this tab."</b></step>
</procedure>

![Sign in with Microsoft 权限选择器](sign-in-with-microsoft.png){ width="560" border-effect="line" }

刷新令牌会自动续期（在过期前留有 60 秒的余量），因此你可以在多个会话之间保持登录状态。

### 权限层级 {id="oauth-permission-tiers"}

| 层级                     | 你将获得                                                                                                        | 你将无法获得                                                                                                             |
|--------------------------|-----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| **Full access** *(推荐)* | 拉取请求、评论、投票、状态检查，**以及**头像、@提及搜索、关联的工作项，还有用于默认拉取请求列表的团队成员关系。 | -                                                                                                                        |
| **Standard access**      | 仅拉取请求和评论。                                                                                              | 头像显示为姓名首字母；@提及自动补全不返回任何内容；工作项链接不会渲染；分配给你 **teams** 的拉取请求会从默认列表中消失。 |

有关逐项权限的完整对照，请参阅[](Permissions-zh.md)。

> 若要稍后更改层级，请移除该账户并重新登录——每次全新登录时都会再次出现该选择器。
> {style="tip"}

## Azure DevOps Server（本地部署） {id="on-prem"}

本地部署的服务器 **只支持 PAT**。Microsoft 登录会经由 `login.microsoftonline.com`
重定向，而它无法访问你网络内部的服务器，因此插件会把你引导到令牌方式，而不是让流程走到一半才失败。

![本地部署集合的工具窗口登录界面：Log In via Microsoft 置灰，Log In with Token 可用](oauth-access-scope-dialog.png){ width="720" border-effect="line" thumbnail="true" }

你不会看不到那个按钮——你会看到它变灰。一旦仓库选择器解析出的是本地部署服务器， **Log In via Microsoft…**
仍会留在界面上但处于禁用状态，并显示提示 *"Microsoft sign-in is only available for Azure DevOps Services (dev.azure.com).
Use a Personal Access Token for on-prem Azure DevOps Server."*。它旁边的 **Log In with Token…** 仍然可用。

### Server 字段该填什么

Server 字段两种形式都接受——两者会解析为同一个账户，所以你手上有哪种 URL 就粘贴哪种：

| 形式                         | 示例                                                                     | 解析为                                                          |
|------------------------------|--------------------------------------------------------------------------|-----------------------------------------------------------------|
| **集合 URL**                 | `https://tfs.contoso.com:8080/tfs/my-collection`                         | 服务器 `https://tfs.contoso.com:8080/tfs`，组织 `my-collection` |
| **仓库（克隆 / 浏览器）URL** | `https://tfs.contoso.com:8080/tfs/my-collection/my-project/_git/my-repo` | 服务器 `https://tfs.contoso.com:8080/tfs`，组织 `my-collection` |

主机和端口会按你输入的原样保留，因此像 `:8080` 这样的非标准端口没有问题。粘贴网页 URL 同样有效——结尾以 `_` 开头的路径段（
`_build`、`_settings`、`_apis` 等）会被裁剪回集合层级。

> **只接受 https** 的规则在这里同样适用：PAT 会以 HTTP Basic 的形式随每个请求一同发送，因此纯 `http://` 的服务器 URL
> 会被拒绝。请先在服务器（或其代理）上终结 TLS，再进行登录。
> {style="warning"}

## 多个账户

可同时登录多个 Azure DevOps 组织。<ui-path>Settings | Tools | DevOps Lens</ui-path> 中的每一行都会显示头像、显示名称、组织
URL 和身份验证类型，每行都带有 **铅笔**（编辑）和 **✕**（移除）。

![Settings 中的 Azure DevOps 账户面板](multiple-accounts.png){ width="700" border-effect="line" }

每个项目都会记住自己的 **默认账户**（存储在项目的工作区中）——用于该项目的 API 调用和 Git HTTPS 交接。

## 凭据存储

PAT 和 OAuth 刷新令牌保存在 IDE 的 PasswordSafe 中，由操作系统的密钥链提供支持：

<tabs>
    <tab title="macOS">Keychain——每个已登录账户对应一个条目。</tab>
    <tab title="Windows">Credential Manager（DPAPI 加密）。</tab>
    <tab title="Linux">如果可用，则使用 KWallet / Secret Service，否则在 IDE 配置目录中使用一个加密文件。</tab>
</tabs>

可在 <ui-path>Settings | Appearance &amp; Behavior | System Settings | Passwords</ui-path> 中切换存储模式。

## 退出登录

在 <ui-path>Settings | Tools | DevOps Lens</ui-path> 中，单击某个账户行上的 **✕**，然后单击 **Apply**
。该令牌将从密钥链中删除，该账户的所有缓存数据也会被清除。

## 常见登录错误

| 消息                                                     | 可能原因                                                                                         |
|----------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Token invalid or expired**                             | PAT 错误/已过期，或缺少作用域。请创建一个至少具有 *Code (Read &amp; write)* 的新令牌。           |
| **This token signs in, but it can't read pull requests** | PAT 能通过身份验证，但缺少 **Code** 作用域——请使用 *Code (Read &amp; write + Status)* 重新生成。 |
| **Organisation not found**                               | Server 字段中的组织不存在，或你无权访问它。                                                      |
| **Couldn't reach Azure DevOps**                          | 网络/代理问题——请检查 <ui-path>Settings &#124; System Settings &#124; HTTP Proxy</ui-path>。     |
| 操作时出现 **403 Forbidden**                             | 你的账户缺少该项目/仓库的权限——请咨询你的组织管理员。                                            |

更多信息，请参阅[](Troubleshooting-zh.md)。
