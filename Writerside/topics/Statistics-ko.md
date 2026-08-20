# 통계

<tldr>
    <p><b>위치</b>: 도구 창 툴바의 <b>Pull Request Statistics</b>(차트) 아이콘.</p>
    <p><b>데이터</b>: 이미 동기화된 PR에서 계산 - 추가 API 호출 없이 즉시 열립니다.</p>
</tldr>

PR 기록을 KPI와 차트로 바꿔 주는 전용 편집기 탭입니다. 사용자 지정 Azure DevOps 쿼리도, IDE를 떠날 필요도 없습니다.

![풀 리퀘스트 통계 대시보드](statistics.png){ width="720" border-effect="line" thumbnail="true" }

> **실시간 폴링이 아니라 캐시된 데이터로 계산됩니다.** 통계는 도구 창이 이미 가져온 데이터를 그대로 사용합니다. 패널을 여는 것은 즉시 이루어지며 추가 API 호출을 하지 않습니다. 백그라운드 동기화가 새
> 데이터를 가져오면 숫자가 갱신됩니다.
> {style="note"}

## 열기

도구 창 툴바에서 **Pull Request Statistics**(차트) 아이콘을 클릭하거나 *Find Action* → **Pull Request Statistics**를 실행하세요. 편집기 영역에 탭이 열리며,
**Refresh statistics**로 다시 계산할 수 있습니다.

헤더 아래의 부제는 그 아래 모든 숫자가 공유하는 범위를 알려줍니다 - `128 PRs · Last 30 days`.

## KPI 타일

상단을 가로지르는 대표 숫자 행입니다:

| KPI                                                     | 의미                                                                        |
|---------------------------------------------------------|-----------------------------------------------------------------------------|
| **Created** · **Merged** · **Abandoned** · **Open now** | 해당 기간의 PR 개수                                                         |
| **Merge rate**                                          | 해결된 PR 중 병합된 PR의 비율                                               |
| **Median merge (h)**                                    | 생성부터 완료까지 걸린 일반적인 시간(시), 아래에 **avg N h** 부가 설명 포함 |
| **Approval rate**                                       | 리뷰어 투표 중 Approved(제안 포함)의 비율                                   |
| **First response (h)**                                  | 작성자가 아닌 사람의 첫 댓글까지 걸린 중앙값 시간                           |

> 시간 기반 KPI는 평균이 아니라 **중앙값**을 사용합니다. 일주일씩 걸린 몇몇 이상치가 일반적인 PR 수치를 왜곡해서는 안 되기 때문입니다. 평균이 표시되는 경우에는 별도로 표기됩니다.
> {style="note"}

> **First response는 표본 기반입니다.** PR별 댓글 스레드가 필요한 유일한 KPI이므로, 플러그인은 해당 기간에서 **가장 최근 60개** PR에 대해서만 스레드를 가져와 그로부터 중앙값을
> 도출합니다. 나머지는 모두 전체 PR 목록에서 계산됩니다. 타일 위에 마우스를 올리면 실제로 무엇을 사용했는지 확인할 수 있습니다: *Median hours from PR creation to first
non-author comment. Sampled over the N most recent PRs* - 그리고 여기서 **N**은 표본 PR 중 작성자가 아닌 사람의 댓글이 실제로 달린 것만 세므로, 조용한 기간에는
> 표본 수가 더 작게 보고됩니다.
> {style="warning"}

## 차트

차트는 세 가지 섹션으로 묶여 있습니다:

- **Workload** - *Top creators*, *Top reviewers*, *Top commenters*, *Reviewer × Author* 협업.
- **Process health** - *Vote distribution*, *Time to merge*, *PR status*, *Open PR aging*, *PR cycle time (days)*, *PRs
  merged per week*.
- **Where work goes** - *Target branches*, *Day-of-week activity*, *Daily activity*.

### 차트 읽기

- **막대 위에 마우스를 올리면** 이름과 PR 개수가 표시됩니다. 주간 막대는 버킷 이름 (*Week of Mar 3*)을 알려줍니다. 작성자 차트에서는 아바타 위에 마우스를 올리면 해당 인물의 신원 카드가
  열립니다.
- **도넛 범례**는 조각마다 개수 (그리고 카드가 충분히 넓을 때는 비율)를 한 행씩 나열합니다. 범례가 담을 수 있는 것보다 조각이 많으면 마지막 행이 **+N more**로 표시됩니다 - 숨겨진 조각도 링에
  그대로 있고 집계에도 포함됩니다.
- **도넛의 중앙**은 무엇을 세고 있는지 표시합니다. *Vote distribution*은 `votes`, *PR status*는 `PRs`입니다.

## 필터와 범위

고정된 헤더가 모든 지표의 범위를 한 번에 지정합니다:

- **Window** - 최근 7일, 30일, 90일, 6개월, 1년 또는 전체 기간.
- **Author**, **Reviewer**, **Target branch** - 특정 사람이나 브랜치로 좁힙니다.
- **Clear filters** - 기본값으로 초기화합니다.

## 유의 사항 {collapsible="true"}

> **로컬 보기 전용입니다.** 통계는 사용자 계정이 볼 수 있는 PR만 다룹니다. 접근 권한이 없는 리포지토리는 집계되지 않습니다.
> {style="warning"}

> **상한이 있습니다.** 대시보드는 최대 **2,000개**의 풀 리퀘스트만 읽습니다. 활발한 리포지토리에서는 **전체 기간** 창이 조용히 여기서 잘리므로, 가장 넓은 창이 오히려 가장 불완전합니다. 신뢰할 수
> 있는 수치가 필요하면 기간 창이나 작성자 / 대상 브랜치 필터를 좁히세요.
> {style="warning"}

이 기능은 Azure DevOps Analytics를 대체하지 않습니다. 편집기 안에서 빠르게 확인하는 신호일 뿐입니다. 조직 전체 보고가 필요하면 Azure DevOps의 Analytics 서비스를 직접
사용하세요.
