# 统计

<tldr>
    <p><b>位置</b>：工具窗口工具栏中的 <b>Pull Request Statistics</b>（图表）图标。</p>
    <p><b>数据</b>：基于已同步的 PR 计算——即开即用，不产生额外的 API 调用。</p>
</tldr>

一个专用的编辑器选项卡，将你的 PR 历史转化为 KPI 和图表——无需自定义 Azure DevOps 查询，也无需离开 IDE。

![拉取请求统计仪表板](statistics.png){ width="720" border-effect="line" thumbnail="true" }

> **基于缓存数据计算，而非实时轮询。** 统计使用工具窗口已经获取的数据——打开面板是即时的，不会产生额外的 API
> 调用。随着后台同步引入新数据，这些数字会随之更新。
> {style="note"}

## 打开它

在工具窗口工具栏中点击 **Pull Request Statistics**（图表）图标，或运行 *Find Action* → **Pull Request Statistics**
。该选项卡会在编辑器区域中打开； **Refresh statistics** 会重新计算它。

标题下方的副标题会说明其下所有数字共享的范围——`128 PRs · Last 30 days`。

## KPI 磁贴

顶部有一行醒目的数字：

| KPI                                                     | 含义                                                  |
|---------------------------------------------------------|-------------------------------------------------------|
| **Created** · **Merged** · **Abandoned** · **Open now** | 时间窗口内的 PR 数量                                  |
| **Merge rate**                                          | 已解决的 PR 中已合并的占比                            |
| **Median merge (h)**                                    | 从创建到完成的典型小时数，下方附有 **avg N h** 副文本 |
| **Approval rate**                                       | 审查者投票中为 Approved（含带建议的批准）的占比       |
| **First response (h)**                                  | 到第一条非作者评论的中位小时数                        |

> 基于时间的 KPI 使用 **中位数**，而非平均值——个别耗时长达一周的滞后项不应扭曲典型 PR 的数字。凡是显示平均值的地方，都会明确标注。
> {style="note"}

> **First response 是抽样得出的。** 它是唯一需要逐个 PR 的评论线程的 KPI，因此插件只为时间窗口内 **最近的 60 个** PR
> 获取线程，并据此推导中位数。其余所有指标都基于完整的 PR 列表计算。将鼠标悬停在该磁贴上可看到它实际使用了什么： *Median hours
from PR creation to first non-author comment. Sampled over the N most recent PRs*——请注意，其中的 **N**
> 只计入那些确实收到过非作者评论的被抽样 PR，因此一个安静的时间窗口会报告出更小的样本量。
> {style="warning"}

## 图表

图表分为三个部分：

- **Workload** - *Top creators*、 *Top reviewers*、 *Top commenters*、 *Reviewer × Author* 协作。
- **Process health** - *Vote distribution*、 *Time to merge*、 *PR status*、 *Open PR aging*、 *PR cycle time (days)*、 *PRs
  merged per week*。
- **Where work goes** - *Target branches*、 *Day-of-week activity*、 *Daily activity*。

### 读懂一张图表

- **悬停某个条形**可看到它的名称和 PR 数量。周度条形会标明所属区间—— *Week of Mar 3*。在按人员统计的图表上，悬停头像会打开该人的身份卡片。
- **环形图图例**为每个扇区列出一行及其数量（当卡片足够宽时还会显示占比）。当扇区数量超过图例容纳能力时，最后一行会显示 **+N
  more**——被隐藏的扇区仍在环上，也仍被计入。
- **环形图的中心**会标明它统计的是什么： *Vote distribution* 为 `votes`， *PR status* 为 `PRs`。

## 筛选与范围

一个固定的标题栏可一次性限定所有指标的范围：

- **Window** - 最近 7 天、30 天、90 天、6 个月、1 年，或全部时间。
- **Author**、 **Reviewer**、 **Target branch** - 缩小到特定的人员或分支。
- **Clear filters** - 重置为默认值。

## 注意事项 {collapsible="true"}

> **仅本地视图。** 统计涵盖你的账户可见的 PR。你无权访问的仓库不会被计入。
> {style="warning"}

> **存在上限。** 仪表板最多读取 **2,000** 个拉取请求。在繁忙的仓库中， **全部时间**
> 窗口会悄悄地在此处截止，因此窗口越宽，数据反而越不完整。需要可信数字时，请缩小时间窗口，或收紧作者 / 目标分支筛选器。
> {style="warning"}

这不是 Azure DevOps Analytics 的替代品——它是快速的、编辑器内的信号。若需组织范围的报告，请直接使用 Azure DevOps 中的
Analytics 服务。
