# 快速入门

从零开始，大约一分钟即可完成你的第一次 PR 审查。本页假设你已经[](Installation-zh.md)了该插件。

## 1. 打开托管在 Azure DevOps 上的项目

按常规方式克隆任意 Azure DevOps 仓库：

```bash
git clone https://dev.azure.com/your-org/your-project/_git/your-repo
cd your-repo
```

在 IDE 中打开该文件夹。插件会在启动时扫描 Git 远程仓库——当它检测到 Azure DevOps 远程仓库（`dev.azure.com`、
`*.visualstudio.com` 或本地部署的 Azure DevOps Server）时便会激活，并显示 **Pull Requests** 工具窗口。

> **看不到工具窗口？** 当未检测到 Azure DevOps 远程仓库时，插件会自行隐藏。运行 `git remote -v` 确认某个远程 URL 指向
> `dev.azure.com`、`visualstudio.com` 或你的 Azure DevOps Server。
> {style="note"}

## 2. 登录

从左侧边栏打开 Pull Requests 工具窗口。在其登录界面上，你有两种选择：

- **Log In with Token…**（使用令牌登录）——粘贴一个来自 Azure DevOps 用户设置的个人访问令牌（Personal Access
  Token）。这是最快的方式，也是本地部署（on-prem）Azure DevOps Server 的唯一选项。
- **Log In via Microsoft…**（通过 Microsoft 登录）——通过 Microsoft Entra ID 进行基于浏览器的 OAuth 登录（仅适用于云端
  `dev.azure.com`）。首先会弹出一个对话框，询问授予 **Full access** 还是 **Standard access**。

![Sign in with Microsoft 权限选择器，显示 Full access（推荐）和 Standard access](sign-in-with-microsoft.png){ width="560" border-effect="line" }

如果你选择令牌，插件需要以下作用域： **Code (Read &amp; write + Status), User Profile (Read), Identity (Read), Work
Items (Read), Project and Team (Read), Security (Manage)**。登录对话框会列出这些作用域，其 **Generate…**
按钮会在浏览器中打开你所在组织的令牌页面。

![带有 Server 和 Token 字段的 Log In to Azure DevOps 对话框](sign-in-with-token.png){ width="560" border-effect="line" }

> 有关完整的登录流程、作用域以及 Full 与 Standard 层级的选择，请参阅[](Authentication-zh.md)。
> {style="note"}

## 3. 浏览拉取请求

登录后，工具窗口会列出该仓库的拉取请求。

![Pull Requests 工具窗口，带有搜索字段、筛选器标签以及已填充的列表](pr-tool-window-zh.png){ width="720" border-effect="line" thumbnail="true" }

要缩小列表范围：

- **Quick Filters**（快速筛选器）——点击标签行左侧的筛选器图标，一键使用预设： **Active**、 **Includes my changes**、
  **I am a reviewer**、 **Waiting for author**、 **I reviewed**、 **Awaiting my review**、 **Abandoned**。
- **Filter chips**（筛选标签）—— **State**（Mine / Active / Completed / Abandoned）、 **Author**、 **Assignee**、
  **Target branch**、 **Tags** 和 **Draft**。更多维度—— **Review**、 **Work Items**、 **Approved by**、 **Source
  branch** ——通过在搜索字段中输入筛选标记来筛选。
- **Sort**（排序）——最后一个标签：Newest、Oldest、Most/Least commented、Recently/Least recently updated，或 Id
  newest/oldest first。
- **Search**（搜索）——在标签上方的字段中输入内容，以匹配 PR 的标题、编号、作者和分支名称。

**点击**任意 PR，即可在编辑器标签页中打开其详情视图。

### 没有显示任何 PR？ {collapsible="true"}

| 可能的原因             | 应对方法                                                         |
|------------------------|------------------------------------------------------------------|
| 你的账户无法访问此仓库 | 先在 Azure DevOps 网页界面中打开它。                             |
| 项目指向了多个组织     | 通过工具窗口的齿轮图标 → **Switch Account / Repository…** 切换。 |
| 确实没有活动的 PR      | 将 **State** 标签设为 **Completed** 以确认连接正常。             |

## 4. 审查代码

详情视图是 **单一面板**——没有子标签页。从上到下依次为：带 `!` 编号的标题和一个 **View Timeline** 链接、源分支 →
目标分支、显示每位审查者投票的状态检查、变更文件树，以及一个操作栏。

![审查拉取请求：工具窗口、时间线与审阅者侧栏](review-code.png){ width="720" border-effect="line" thumbnail="true" }

- **阅读差异**——点击变更树中的任意文件以打开差异。点击某一行的行槽（gutter）即可评论。
- **阅读讨论**——点击 **View Timeline** 可在单独的标签页中打开完整的评论时间线。
- **投票**——操作栏的 **Approve** 按钮是一个拆分按钮。其下拉菜单包含 **Approve with suggestions**、 **Wait for author**、
  **Request changes** 和 **Reset feedback**。

![差异视图 Review 工具栏中 Submit 按钮上的投票选项](vote-dropdown.png){ width="700" border-effect="line" }

> **无需离开编辑器即可审查：** 检出某个 PR
> 的分支，插件便会将其评论直接叠加显示在你的常规编辑器上。请参阅[](Review-in-Editor-zh.md)。
> {style="tip"}

## 5. 创建拉取请求

从 **Pull Requests** 工具窗口的工具栏中，点击 **+**（Create Pull Request）。表单会预填源分支（你当前的分支）和默认目标分支。添加标题、描述和审查者，然后创建它。

![Pull Requests 工具窗口工具栏中的 +（Create Pull Request）按钮，悬停后显示其工具提示](create-pr-button-zh.png){ width="590" border-effect="line" }

![创建拉取请求表单：源分支与目标分支、更改的文件树、已填入 Markdown 拉取请求模板的描述编写器，以及审阅者、标签和工作项行](create-pr-ai-zh.png){ width="640" border-effect="line" }

> **AI 辅助的标题和描述：** 在[已配置 AI 提供程序](AI-Features-zh.md)的情况下，表单的标题和描述字段会新增一个 **Generate**
> 操作，可根据你分支的差异同时起草两者。
> {style="tip"}

## 后续步骤

- [](Pull-Requests-zh.md)——筛选、搜索、操作栏，以及溢出菜单（Complete、Revert、Compare）。
- [](Code-Review-zh.md)——内联差异、建议、投票，以及文件已查看跟踪。
- [](Notifications-and-Attention-zh.md)——当某个 PR 需要你审查或 @提及 你时收到提醒。
- [](AI-Features-zh.md)——摘要、AI 审查和语法润色。
