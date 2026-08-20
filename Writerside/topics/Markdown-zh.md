# Markdown

<tldr>
    <p><b>位置</b>：每一个编辑器 - 评论、回复、拉取请求描述以及 Create-PR 表单。</p>
    <p><b>语法参考</b>：编辑器底部一行的 <b>Markdown is supported</b> 链接会打开 Microsoft 的 Azure DevOps markdown
       指南。</p>
</tldr>

你在插件中写下的一切都是 **Azure DevOps 风格的 markdown**，而你读到的一切都由插件自己渲染 - 已发布的评论、讨论串回复、 **Preview** 选项卡和拉取请求描述走的是同一条管线，因此预览到的就是最终发布的样子。

## 每个编辑器上的语法链接

编辑器底部一行、 **Add files** 左侧有一个低调的 **Markdown is supported** 链接：

<deflist>
    <def title="它打开的是 Microsoft 的指南，而不是 GitHub 的">
        点击后会在浏览器中打开
        <a href="https://learn.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops">Syntax
        guidance for basic Markdown usage</a> - 这才是真正适用于你正在输入内容的参考。两种风格在关键处并不相同：Azure DevOps
        有自己的图片尺寸扩展、自己的表情符号集合，还有一批保留给 wiki 的语法（见<a anchor="wiki-only">下文</a>）。
    </def>
    <def title="Write 和 Preview 下都会保留">
        它描述的是这个输入框而不是当前模式，而 Preview 恰恰是你查看渲染效果的地方。
    </def>
    <def title="它最先让出宽度">
        编辑器的底部一行是自适应的。在狭窄的位置 - 左右并排差异的一半、被压窄的工具窗口 - 这个链接会先缩成图标，然后完全消失，都在
        <b>Add files</b> 放弃自己的标签之前。提交按钮从不缩小，因此在任何宽度下 <b>Comment</b> / <b>Reply</b>
        都可以点击。链接消失也不会损失什么：它只是通往文档的快捷方式，同一个页面在浏览器里一点即达。
    </def>
</deflist>

## 会被渲染的语法

| 语法              | 你输入的内容                                        | 说明                                                                                      |
|-------------------|-----------------------------------------------------|-------------------------------------------------------------------------------------------|
| **标题**          | `# H1` … `###### H6`                                | `#` 后面的空格可省略 - `#Heading` 同样有效。参见[下方的说明](#hash)。                     |
| **强调**          | `**bold**`、`_italic_`、`~~strikethrough~~`         | 删除线内嵌套的强调也会保留。                                                              |
| **列表**          | `-` / `*` / `1.`，缩进即嵌套                        |                                                                                             |
| **任务列表**      | `- [ ] open`、`- [x] done`                          | 渲染为 ☐ / ☑ 字形。它们表示状态，不是可点击的复选框。                                      |
| **表格**          | 用竖线分隔单元格，加上 `---` 分隔行                 | 带真实的单元格边框。                                                                       |
| **链接**          | `[text](url)`、裸 URL、`[text](#anchor)`            | 只有 `http`、`https` 和 `mailto` 会被打开；其他协议会被忽略而不是启动。                    |
| **图片**          | `![alt](url)`、`![alt](url =500x250)`               | 接受 Azure 的 `=WxH` 后缀；无论哪种写法，图片都会缩放到列宽。                              |
| **代码**          | `` `inline` `` 和 ``` ``` ``` 围栏                  | 围栏代码块会获得真正的 IDE 高亮 - 见[下文](#code-blocks)。                                 |
| **引用**          | `> quoted`                                          | **Quote reply** 为你插入的正是这种格式。                                                   |
| **分隔线**        | `---`                                               |                                                                                             |
| **表情符号**      | `:tada:`、`:+1:`、`:rocket:`                        | 约 270 个常见短代码。无法识别的保持原样，`\:tada:` 可转义。                                |
| **转义**          | `\*not italic\*`                                    |                                                                                             |

> `$a^2 + b^2$` 这样的数学公式会显示为 **代码片段** 而不是排版后的公式。Azure DevOps 使用浏览器端的数学引擎渲染它，而 IDE
> 的渲染面板没有对应的能力 - 因此公式以源码形式呈现，而不是悄悄混进正文里。
> {style="note"}

## 对人和工作项的引用

以下三种引用形式是 Azure DevOps 特有的，而且三者都会在你输入时自动补全：

| 类型 | 插入的内容 | 渲染为                                               |
|------|------------|------------------------------------------------------|
| `@`  | `@<user>`  | 其显示名称，点击可打开作者卡片。                     |
| `#`  | `#1234`    | 指向该工作项的链接，在浏览器的 Azure Boards 中打开。 |
| `!`  | `!567`     | 指向该拉取请求的链接，在 IDE 内打开。                |

它们背后的选择器见 [](Discussions-and-Comments-zh.md#work-items)。

### `#1234` 工作项引用 {id="hash"}

`#` 后跟一个工作项 ID 就是
[Azure DevOps 自己的工作项引用](https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/add-link?view=azure-devops)，
与 `#` 选择器插入的是同一个标记，也正是 Azure DevOps 网页 UI 在拉取请求描述中所理解的那一个。在评论或描述中写下
`Fixes #1234`，`#1234` 就会渲染为一个链接，点击后在 Azure Boards 中打开该工作项。

> **行首的 `#1234` 是引用，而不是标题。** 即使在行首，`#` 后跟数字也会被读作工作项引用，因此 `#404 Not found`
> 会链接到工作项 404。若要写一个文字以数字开头的标题，请使用标准的带空格写法 - `# 404 Not found`。以字母开头的紧凑标题
> （`#Overview`）不受影响。
> {style="note"}

有两件事它 **不会** 做，都值得了解：

- **渲染一个引用不等于关联该工作项。** 拉取请求侧边栏 **Work items** 行中的关联（以及 Create 表单上的 **Work items**
  字段）才会建立 Azure Boards 所跟踪的那种关联关系。在描述中输入 `#1234` 只会得到一个可点击的引用，它不会从 IDE 填充那一行。
- **提交信息归服务端管。** 当你*推送*一条信息中包含 `#1234` 的提交时，Azure DevOps 会创建工作项链接 -
  参见 [](Git-Integration-zh.md#commit-refs)。插件既不会添加也不会改写这些引用。

## 代码块 {id="code-blocks"}

给围栏标注语言，该代码块就会用 **IDE 自己的语法高亮** 渲染 - 与该文件类型在编辑器中的配色完全一致：

````
```kotlin
fun greet(name: String) = "Hello, $name"
```
````

渲染后的代码块采用原生 IDE 代码块外观，右上角带一个小徽标：平时显示语言名称，指针位于代码块任意位置时变为 **Copy code** 按钮。在编辑器中，围栏代码块在你 **输入的同时**
就会高亮，无需切到 Preview。

还有一种带任务的代码块： ```` ```suggestion ```` 会渲染成作者可以一键应用的 **Suggested change**
卡片。参见[建议的修改](Discussions-and-Comments-zh.md#suggested-edits)。

## 输入时的自动补全

编辑器会内联补全五类内容。在空格后输入触发字符，继续输入以缩小范围，然后用方向键和 <shortcut>Enter</shortcut> 选择：

| 触发字符      | 补全内容                                                                                               |
|---------------|--------------------------------------------------------------------------------------------------------|
| `@`           | 组织内的人。                                                                                            |
| `#`           | 工作项。插入 `#<id>`，它会渲染为一个 [Boards 链接](#hash)。                                             |
| `!`           | 拉取请求。                                                                                              |
| `:`           | 表情符号短代码。插入的是短代码（`:tada:`），这正是 Azure DevOps 存储的形式。                            |
| ```` ``` ```` | 代码围栏语言，来自你的 IDE 中实际存在的文件类型，每一行都带有对应的图标。                               |

> 单独一个 `:` 或者像 `10:30` 这样的时间不会打开表情符号列表；单独的 ```（通常是*结束*围栏）也不会打开语言列表。
> {style="tip"}

## Azure DevOps 保留给 wiki 的语法 {id="wiki-only"}

Microsoft 的指南在同一个页面里覆盖了 wiki、PR 评论和其他位置，并标明了哪种语法在哪里可用。以下这些是 **wiki 专用** 的 - Azure DevOps
自己在拉取请求评论中也不渲染它们，插件同样不渲染：

- `[[_TOC_]]` 目录
- Mermaid 图表
- `:::` 可折叠区块
- 嵌入视频
- Azure Boards 查询结果
- 原始 HTML 标签

## markdown 出现的位置

<deflist>
    <def title="评论与回复">
        差异中、时间线中，以及编辑器覆盖层中。参见 <a href="Discussions-and-Comments-zh.md"/>。
    </def>
    <def title="拉取请求描述">
        Create-PR 表单的描述框也是同一个编辑器，因此仓库的 markdown 拉取请求模板会带着完整格式加载。参见
        <a href="Pull-Requests-zh.md"/>。
    </def>
    <def title="AI 生成的文本">
        AI 摘要、审阅和生成的拉取请求描述同样是 markdown，走的也是同一条渲染管线。参见 <a href="AI-Features-zh.md"/>。
    </def>
    <def title="流水线摘要">
        由流水线扩展发布的 markdown（例如 SonarQube 质量门）会渲染在运行的 <b>Extensions</b> 选项卡上。参见
        <a href="Pipelines-zh.md"/>。
    </def>
</deflist>
