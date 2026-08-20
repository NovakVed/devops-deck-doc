# 파이프라인

<tldr>
    <p><b>위치</b>: <b>Pipelines</b> 도구 창, <shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut>.</p>
    <p><b>항상 켜짐</b>: 리포지토리가 Azure DevOps 원격 저장소에 연결되는 순간 도구 창이 나타납니다.</p>
    <p><b>실행 시작</b>: 파이프라인을 오른쪽 클릭 → <b>Run Pipeline…</b>.</p>
</tldr>

IDE를 벗어나지 않고 Azure Pipelines를 탐색하고 실행하고 검토하세요 - 대화형 스테이지 그래프, 적응형 실행 탭, 실시간 작업 로그, IDE 내 승인, 실행 완료 알림을 갖춘 전용
**Pipelines** 도구 창.

> Pipelines는 **항상 켜져 있습니다** - 먼저 켜야 할 것도, 끄는 마스터 스위치도 없습니다. 리포지토리가 Azure DevOps 원격 저장소에 연결되는 순간 도구 창이 나타납니다. 조용히 두고 싶다면 [](Settings-ko.md)에서
> **Refresh pipeline runs in the background**의 체크를 해제하세요. 폴링, 실행 알림, 스트라이프 배지가 함께 멈추고 창은 필요할 때를 위해 남아 있습니다.
> {style="note"}

## 파이프라인 설정

백그라운드 새로 고침 스위치와 관련 옵션은 <ui-path>Settings | Tools | DevOps Lens | Pipelines</ui-path>에 있습니다.
파이프라인은 풀 리퀘스트와 별개로 자체 스위치와 간격으로 폴링하므로, 풀 리퀘스트를 자주 폴링하지 않고도 실행만 자세히
지켜보거나 그 반대로 할 수 있습니다.

| 설정                                                         | 하는 일                                                                                                                                                                                                          |
|--------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Refresh pipeline runs in the background**                  | 실행을 폴링합니다. 알림과 스트라이프 배지가 여기에 의존하므로 끄면 저절로 도착하지 않습니다. 풀 리퀘스트와는 독립적인 자체 간격을 가집니다.                                                                        |
| **Notify when a run of mine finishes**              | 사용자가 트리거한 실행이 종료 상태에 도달하면 풍선 알림을 표시합니다. 백그라운드 새로 고침이 꺼져 있는 동안에는 동작하지 않습니다.                                                                               |
| **Badge the tool-window icon when my runs finish** | 사용자의 실행이 완료되면 창을 열 때까지 Pipelines 스트라이프 아이콘에 색상 점을 추가합니다 - 실패 시 빨간색, 부분 성공 시 황색, 성공 시 파란색. 백그라운드 새로 고침이 꺼져 있는 동안에는 동작하지 않습니다.    |

> **Pipelines** 스트라이프 아이콘은 프로젝트에 **Azure DevOps 원격 저장소**가 있으면 나타납니다. 왼쪽에 **Pull Requests** 아래에 있으며,
> 동일한 계정과 리포지토리를 공유합니다.
> {style="note"}

<shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut>로 창을 열거나 포커스합니다. Windows / Linux에서는 플러그인이 대신 사용 가능한 첫 번째 조합을 선택합니다 - **실제 키를 보려면 스트라이프 아이콘 위에 마우스를 올려두세요**. 이 단축키는 플러그인이 로드되는 즉시 프로젝트별로 설정되므로, 설치나 업데이트 직후에도 바로 동작합니다 - 재시작이 필요 없습니다. [](Keyboard-Shortcuts-ko.md)를 참조하세요.

## Pipelines 도구 창

창은 **Pipelines** 목록 탭에서 열립니다. 제목 표시줄 작업 (오른쪽 위)은 **New Pipeline…**([파이프라인 만들기](#create-a-pipeline) 참조)과 **Refresh**이며,
톱니바퀴 메뉴에 **Switch Account / Repository…**가 추가됩니다. 실행은 정의의 컨텍스트 메뉴나 해당 파이프라인의 실행 페이지에서
시작합니다 - [파이프라인 실행](#run-a-pipeline)을 참조하세요.

![실행 탐색 막대와 정의 목록이 있는 Pipelines 도구 창](pipelines-tool-window.png){ width="720" border-effect="line" thumbnail="true" }

### 실행 탐색

Pull Requests 창을 반영한 검색 막대가 상단을 가로질러 놓여 있습니다:

- 이름, 브랜치, 빌드 번호, 실행을 요청한 사람을 매칭하는 **자유 텍스트 검색 필드**.
- 세 가지 범위를 가진 **View** 칩 - **Recent**, **All**, **Runs**(기본값 **Recent**).
- 마지막 실행 결과로 필터링하는 **Status** 칩: **Succeeded**, **Partially succeeded**, **Failed**, **Running**, **Canceled**.
- **Quick filters**라는 제목의 **Filter** 빠른 메뉴 (실시간 표시 배지 포함): **All pipelines**, **Recently run**, **All runs**, **Failed
  only**, 그리고 활성화된 필터가 있으면 **Clear filters**.

각 **View** 범위는 서로 다른 본문을 표시합니다:

| 범위       | 표시 내용                                                                                                         | 열기                                                                                                                                                       |
|------------|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Recent** | 파이프라인 **정의**의 평면 목록으로, 각각 최신 실행 상태 아이콘과 `folder · last run <relative>` 부제가 붙습니다. | 더블 클릭 / <shortcut>Enter ↵</shortcut>로 파이프라인의 **실행 페이지**를 엽니다. 오른쪽 클릭 → **Run Pipeline…**.                                         |
| **All**    | 하위 개수를 표시하는 접을 수 있는 **폴더 트리**(`\Team\SubTeam`)로 된 파이프라인 정의.                            | 리프에서 더블 클릭 / <shortcut>Enter ↵</shortcut>로 해당 **실행 페이지**를 엽니다. 폴더에서는 확장을 토글합니다. 리프에서 오른쪽 클릭 → **Run Pipeline…**. |
| **Runs**   | 최근 **실행**의 평면 스크롤 목록.                                                                                 | 더블 클릭 / <shortcut>Enter ↵</shortcut>로 실행을 엽니다.                                                                                                  |

파이프라인을 열면 Azure 웹과 마찬가지로 **제자리에서** 그 실행 페이지로 파고듭니다. 이동 경로 (breadcrumb) 막대로 파이프라인 목록으로 되돌아갈 수 있고, **View**와 **Run
Pipeline…** 링크가 오른쪽 위에 놓이며, 아래의 실행 행은 **Runs** 범위에서와 똑같이 열립니다.

**View**는 파이프라인의 YAML 정의를 에디터 탭으로 엽니다. 파이프라인이 빌드하는 리포지토리가 현재 프로젝트에 체크아웃되어 있다면 로컬 작업 트리의 파일이 그대로 열리고, 그렇지 않으면 파이프라인의 기본
브랜치에서 YAML을 가져와 상단에 **Open in Browser** 배너가 있는 읽기 전용 스냅샷으로 엽니다. 클래식 (디자이너) 파이프라인에는 YAML 파일이 없으므로, 풍선 알림으로 이를 알리고 대신
브라우저의 파이프라인 페이지를 안내합니다.

### 실행의 작업 따라가기

실행을 열면 닫을 수 있는 `#<n>` 탭이 추가됩니다 - 순수한 탐색기이며 로그는 없습니다. 헤더는 실행 상태 글리프에 파이프라인 이름과 실행을 브라우저에서 여는 클릭 가능한 `#<run number>`가
붙습니다. 그 아래에 **작업 레일**이 놓입니다: **Summary** 링크, **All jobs** 제목, 그다음 **접을 수 있는 스테이지 헤더 아래에 그룹화된** 작업들.

**Summary**를 클릭하면 실행 개요 편집기가 열리고, **작업**을 클릭하면 해당 작업의 단계 로그에 편집기가 열리며, **스테이지 헤더**를 클릭하면
스테이지의 [정보 창](#stage-information)이 열립니다. 그룹을 접는 것은 스테이지의 **꺾쇠**뿐입니다. <shortcut>Enter ↵</shortcut>는 클릭을 그대로 따릅니다.

> 긴 템플릿 빌드 번호는 탭 제목에서 가운데가 말줄임표로 줄어듭니다 - 탭 위에 마우스를 올리면 전체 실행 레이블이 표시됩니다.
> {style="tip"}

### 스트라이프 배지

**사용자가 트리거한** 실행이 완료되었는데 창을 열지 않은 경우, Pipelines 스트라이프 아이콘에 색상 점이 붙습니다 - **실패 시 빨간색, 부분 성공 시 황색, 성공 시 파란색**. 창을 열거나 포커스하는
순간 사라지며, 계정이나 조직을 전환하면 지워집니다. [](Settings-ko.md)의 **Badge the tool-window icon when my runs finish**로
제어합니다. [알림 및 주의](Notifications-and-Attention-ko.md)를 참조하세요.

## 실행 개요 열기

**Summary**(또는 작업)를 클릭하면 실행 레이블 (예: `#20260101.1`)을 제목으로 하는 메인 편집기 탭으로 **실행 개요**가 열립니다. 같은 실행을 다시 열면 기존 탭에 포커스됩니다.

![파이프라인 실행 개요: 헤더, 탭, 대화형 스테이지 그래프](pipeline-run-overview.png){ width="720" border-effect="line" thumbnail="true" }

헤더에는 실행 상태 아이콘, 파이프라인 이름과 실행 번호, 흐릿한 메타 줄 (`status • branch • requestedFor • duration`)이 표시됩니다. 오른쪽 정렬 작업은 **Cancel**(실행
중일 때), **Re-run**(종료 시 동일한 소스 브랜치에서 다시 큐에 넣음), 그리고 **Open in Browser** 링크입니다. 스테이지가 사용자를 기다리고 있으면 헤더 바로 아래에 **승인 게이트**
밴드가 놓입니다 - [IDE 내 승인](#approvals)을 참조하세요.

### 대화형 스테이지 그래프

**Summary** 탭은 **Stages** 제목과 확대/이동 가능한 스테이지 카드의 DAG로 열립니다. 서버가 `dependsOn`을 생략하면 그래프는 작업 카드 또는 순차 체인으로 대체되며, 연결되지 않은
흐름은 별도의 세로 밴드로 배치됩니다.

![스테이지 그래프: 의존 관계로 연결된 스테이지와 각각의 상태 및 작업 수](pipeline-stage-graph.png){ width="700" border-effect="line" }

- 확대/축소 도구 모음 (오른쪽 위)에는 **Zoom out**, **Zoom in**, **Fit to view**, **Keyboard shortcuts**(`?` 치트 시트를 엽니다)가 있습니다.
- 아무 곳이나 **드래그**하면 이동하고, **휠**로 커서를 중심으로 확대/축소합니다 (맞춤은 1.0×를 넘어 확대하지 않습니다).
- 스테이지를 클릭하면 선택됩니다 - 카드가 IDE 강조 색 테두리를 두르고 편집기가 선택을 따라갑니다. 카드끼리는 **점과 다리** 커넥터로 연결됩니다. 엣지가 붙는 자리에서는 카드
  윤곽선이 반원 소켓 모양으로 볼록해지고 그 안에 흐린 회색 점이 자리 잡으며, 두 소켓 사이를 가는 다리가 잇습니다.
- 각 카드의 **꺾쇠**를 누르면 확장되어 작업 목록과 **Rerun stage** 버튼이 표시됩니다.
- 작업 (또는 스테이지)을 클릭하면 편집기가 그 작업의 단계 로그로 이동합니다.

> <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut>으로 그래프를 확대, 축소, 맞춤하고, <shortcut>?</shortcut>로 **Pipeline run shortcuts** 치트 시트를 띄웁니다.
> {style="tip"}

## 실행 탭

항상 존재하는 탭은 **Summary**뿐입니다. 나머지 탭은 **실행이 종료되고, 그 실행이 실제로 해당 데이터를 가지고 있을 때만** 추가됩니다 - 탭이 없다는 것은 그 실행이 해당 데이터를 게시하지 않았다는
뜻입니다. 어떤 조합이 나타나든 Summary 뒤의 순서는 항상 **Tests, Extensions, Environments, Code coverage**입니다.

| 탭                | 표시되는 조건                           | 표시 내용                                                                                                                                           |
|-------------------|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Summary**       | 항상 표시                               | 스테이지 그래프, 그리고 실행에 리포지토리 리소스가 있을 때는 **Repositories** 카드(열 **Resource Name, Repository, Branch/Tag, Version, Related**). |
| **Tests**         | 종료된 실행이 테스트 결과를 보고했을 때 | 도넛 요약과 관련 테스트 케이스(아래 참조).                                                                                                          |
| **Extensions**    | 종료된 실행이 확장 요약을 게시했을 때   | 확장이 게시한 마크다운 요약(예: SonarQube 품질 게이트)을 둥근 카드로.                                                                               |
| **Environments**  | 종료된 실행이 환경에 배포했을 때        | **Environment, Last stage, Result, Finished** 테이블 - 프로젝트 전체의 환경별 최신 보기가 아니라 **이 실행의 배포만** 나열합니다.                   |
| **Code coverage** | 종료된 실행이 커버리지를 게시했을 때    | 지표별 행으로, 각각 도넛(초록 ≥80%, 황색 ≥50%, 그 미만은 빨강)과 `X / Y covered` 수치를 표시.                                                       |

종료된 실행에 아티팩트가 있으면 하단의 **Artifacts:** 스트립이 각 항목을 링크합니다 (브라우저에서 다운로드 URL을 엽니다). 오프라인 상태에서 로드할 수 없는 섹션은 그렇다고 표시하며 다시 연결되면
로드됩니다.

### Tests 탭

![Tests 탭: 결과 도넛, 통계 블록, 필터 가능한 결과 테이블](pipeline-tests.png){ width="720" border-effect="line" thumbnail="true" }

**도넛**(초록 **Passed**, 빨강 **Failed**, 회색 **Others**)이 통계 블록 옆에 놓입니다 - **Total tests**, **Pass percentage**, **Run
duration**, **Tests not reported**. 그 아래 **Test results** 카드에는 필터 막대가 있습니다:

- 검색 상자 (**Filter by test or run name**). Tests 탭이 표시되는 동안 <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>로 여기에
  포커스하고, <shortcut>Esc</shortcut>로 지웁니다.
- 패싯 칩 - **Test file**과 **Owner**(각각 서로 다른 값이 둘 이상일 때만 표시), 그리고 **Outcome** 칩. Outcome 버킷은 **Failed, Aborted, Passed,
  Not Impacted, Others**이며, 기본 필터는 **Failed + Aborted**입니다.

테이블 열은 데이터에 맞게 조정됩니다 - **Test**, **Owner**(있는 경우), **Duration**(있는 경우), **Outcome** - 그리고 300행으로 제한됩니다. 필터가 모든 것을 숨기면
**Show all tests** 링크가 모든 필터를 지웁니다.

## 작업 로그 보기

작업 (작업 레일 또는 스테이지 카드에서)을 클릭하면 **접을 수 있는 단계 섹션**이 열립니다: 각 헤더는 꺾쇠, 상태 아이콘, 단계 이름, 소요 시간이며, 확장하면 편집기 글꼴로 렌더링된 번호가 매겨지고 색상으로
구분된 로그가 나타납니다 (`##[error]` 빨강, `##[warning]` 황색, `##[section]` 굵게, `##[command]` 파랑, `##[debug]` 흐리게). 실패한 단계는 자동으로
확장되며, 실행이 진행 중일 때 로그가 그 자리에서 스트리밍됩니다.

단계 로그 안에서는 태스크가 내보내는 `##[group]` … `##[endgroup]` 마커가 자체적인 **중첩된 접을 수 있는 그룹**이 됩니다 - 그룹 헤더에 클릭 가능한 꺾쇠가 붙으며, 그룹이 열려 있든 접혀
있든 줄 번호는 안정적으로 유지됩니다.

![색상으로 구분된 출력이 있는 작업의 접을 수 있는 단계 로그](pipeline-logs.png){ width="720" border-effect="line" thumbnail="true" }

로그 위의 얇은 헤더 막대에는 **← Summary** 뒤로 가기 링크 (툴팁 "Back to the run overview (L)")가 있고, 그다음 작업의 상태 아이콘, 이름, 메타가 있습니다.

> **로그 검색:** 작업의 로그 안에서 <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>를 눌러 IDE 찾기 막대 (일치 카운터 및 Case / Words /
> Regex 토글 포함)를 엽니다. <shortcut>Enter ↵</shortcut>와 <shortcut>⇧↵</shortcut>로 일치 항목을 이동하고 - 접힌 단계를 확장하고 각 히트를 화면으로
> 스크롤합니다 - <shortcut>Esc</shortcut>로 막대를 숨깁니다.
> {style="tip"}

### AI로 로그 분석하기 {id="analyze-logs-with-ai"}

실행이 **완료**되면 작업 로그 헤더 막대의 오른쪽 끝에 **Analyze logs with AI** 전구 버튼이 나타납니다. 클릭하면 Pipelines 도구 창에 **AI: #&lt;n&gt;** 탭이 열리고,
구성된 AI 공급자가 실행 분석을 스트리밍합니다: 실패한 실행이라면 근본 원인, 로그의 근거, 수정 제안을, 성공한 실행이라면 무엇이 실행되었는지에 대한 짧은 요약을 보여 줍니다.

로그의 관련 부분만 전송됩니다 - 전체 로그 파일이 아니라 실패한 단계의 오류와 그 주변 문맥만 보냅니다. 결과는 실행별로 유지되므로 탭을 닫았다가 다시 열어도 새 AI 호출이 발생하지 않으며, 탭의 **⟳**
버튼으로 의도적으로 새 분석을 실행할 수 있습니다.

이 기능에는 AI 공급자 구성이 필요합니다 - [](AI-Features-ko.md)을 참조하세요. 공급자가 없으면 버튼이 AI Settings로 안내합니다.

## 스테이지 정보 창 {id="stage-information"}

작업 레일에서 **스테이지 헤더**를 클릭하면 스테이지의 **정보 창**이 열립니다 - Azure 웹의 "*&lt;stage&gt;* information" 보기의 IDE 버전입니다. 로그 스타일 페이지 (편집기
글꼴, 번호가 매겨진 거터)이며, 섹션들은 **접을 수 있는 그룹**입니다:

- **Timing** - 큐 등록 / 시작 / 완료 타임스탬프와 스테이지 소요 시간. **실행 중인** 스테이지는 소요 시간 줄이 실시간으로 갱신됩니다.
- **Triggered by**, **Commits**, **Variables** - 실행 수준 컨텍스트로, 실행의 상세가 로드되면 표시됩니다.

줄에는 작업 로그와 동일한 의미의 색상이 적용되며 (오류 빨강, 경고 황색), 그룹을 접고 펼쳐도 줄 번호는 안정적으로 유지됩니다. **← Summary** 뒤로 가기 링크는 실행 개요로 돌아갑니다.

## IDE 내 승인 {id="approvals"}

스테이지가 사용자에게 할당된 수동 승인으로 게이트되면 실행 헤더 아래에 승인 밴드가 나타납니다 - **보류 중인 게이트당 하나의 콜아웃 카드**입니다.

![댓글 필드와 Approve / Reject 버튼이 있는 승인 게이트 카드](pipeline-approval.png){ width="720" border-effect="line" thumbnail="true" }

각 카드는 **Approval needed — &lt;Stage&gt;**, `N of M approved · in sequence · waiting since <time>` 메타 줄, 검사 지침, 그리고 승인자별
상태 (**Approved**, **Rejected**, **Reassigned**, **Pending**) 행을 표시합니다. 작업 행에는 선택적 댓글 필드 (**Add an optional comment…**)와
오른쪽 정렬된 **Reject** 및 **Approve** 버튼이 있으며, **Approve**가 기본 슬롯에 있습니다.

> 실행 요청자가 자신의 실행을 승인할 수 없는 경우, 버튼은 설명과 **Review in browser** 링크로 대체됩니다. 권한 및 오프라인 문제는 조용히 실패하는 대신 카드에 인라인으로 표시됩니다.
> {style="note"}

## 파이프라인 실행 {id="run-a-pipeline"}

정의의 오른쪽 클릭 메뉴 (또는 파이프라인 실행 페이지의 오른쪽 위 링크)에서 **Run Pipeline…**를 선택하여 **Run Pipeline** 대화 상자를 엽니다. **YAML 파이프라인**의 경우
Azure 웹의 Run 패널을 반영한 **2페이지 마법사**이고, **클래식 (디자이너) 파이프라인**은 처음부터 기본 버튼이 **Run**인 단일 페이지에 담깁니다.

![Run Pipeline 대화 상자: 파이프라인 및 브랜치 선택기, 매개변수, 변수](run-pipeline-dialog.png){ width="560" border-effect="line" }

**1페이지 - Parameters:**

- **Pipeline**과 **Branch** 선택기 - 검색 가능한 콤보 상자. 파이프라인 행은 이름과 폴더 부제를 표시하고, 브랜치 행은 짧은 브랜치 이름과 사용자 지정 참조 (예: `main` 또는
  `refs/tags/v1.0`)를 위한 **Enter a branch or ref…** 탈출구를 표시합니다. 기본 브랜치가 맨 앞에 고정되고, 그다음 브랜치는 최신 커밋 순으로 정렬됩니다. 브랜치는 Azure
  Repos 파이프라인에 대해서만 열거됩니다. 특정 파이프라인에서 대화 상자를 열면 파이프라인 선택기는 생략됩니다.
- **Parameters** 섹션은 YAML의 선언된 `parameters:`를 타입이 있는 폼으로 렌더링합니다 - `values:`에는 드롭다운, 부울에는 체크박스, 객체에는 고정폭 YAML 영역, 그 외에는
  텍스트 필드이며, 필수 매개변수는 `*`로 표시됩니다.

기본 버튼은 **Next: Resources**로 표시되며, **Back: Parameters**로 돌아갑니다.

**2페이지 - Resources:**

- **Variables** 섹션은 큐 시점에 설정 가능한 정의 변수를 노출합니다 (비밀은 저장된 값을 유지하기 위해 빈 상태로 둡니다).
- 파이프라인이 선언한 경우 **Stages to run**과 리소스 선택기.
- 두 개의 체크박스: **Enable system diagnostics**(`system.debug=true` 추가)와 **Preview only (render final YAML, don't queue)**.

실제 실행은 목록을 새로 고치고 새 실행의 상세를 엽니다. **Preview only**는 대신 읽기 전용 **Pipeline Preview — final YAML** 대화 상자를 엽니다.

> **일시 중지되었거나 비활성화된** 파이프라인은 대화 상자에 경고 배너를 표시하며, Azure DevOps에서 다시 활성화될 때까지 큐에 넣을 수 없습니다.
> {style="note"}

## 파이프라인 만들기 {id="create-a-pipeline"}

**New Pipeline…**(도구 창 제목 표시줄의 **+**)은 IDE를 벗어나지 않고 파이프라인을 등록합니다. 대화 상자는 다음을 수집합니다:

| 필드                        | 참고                                                                                                                                                                  |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Repository** / **Branch** | 파이프라인 정의가 있는 위치.                                                                                                                                          |
| **Type**                    | **YAML file in the repository** 또는 **Classic — empty designer pipeline**. 클래식 파이프라인은 빈 상태로 생성됩니다 - Azure DevOps 디자이너에서 태스크를 추가하세요. |
| **YAML file**               | 등록할 `.yml`(YAML 유형 전용).                                                                                                                                        |
| **Agent pool**              | 새 실행이 큐에 들어가는 풀.                                                                                                                                           |
| **Name** / **Folder**       | 표시 이름과 선택적 파이프라인 폴더, 예: `\Team\CI`.                                                                                                                   |

OK 버튼은 **Create**로 표시됩니다. 성공하면 풍선 알림이 새 파이프라인을 확인해 주고 첫 실행을 큐에 넣는 **Run pipeline**을 제안합니다. Azure DevOps Services와 온프레미스
Azure DevOps Server 모두에서 작동합니다 (구형 서버도 자동으로 처리됩니다).

## YAML 완성 및 검증

파이프라인 YAML은 에디터에서 바로 완전한 스키마 지원을 받습니다. 대상은 `azure-pipelines.yml`과 그 `azure-pipelines-*` 변형, `.azuredevops/` 또는
`.azure-pipelines/` 폴더 아래의 모든 YAML, 그리고 프로젝트의 파이프라인 중 하나가 가리키는 YAML 파일 (사용자 지정 이름 포함)입니다. 로그인 중에는 자신의 조직 스키마가 사용되어 완성
기능이 해당 조직에 설치된 태스크를 정확히 알고, 로그아웃 상태에서는 Microsoft의 공개 Azure Pipelines 스키마가 대신 사용됩니다. 백그라운드 새로 고침 스위치와 무관하게 작동합니다.

- 입력하는 동안 스테이지, 잡, 스텝, 태스크와 그 속성에 대한 **코드 완성**.
- 알 수 없는 키, 잘못된 위치의 섹션, 유효하지 않은 값을 강조하는 **검증**.
- 파이프라인 키워드 위에 마우스를 올리면 표시되는 **빠른 문서**.

## 실행 완료 알림

**사용자가 트리거한** 실행이 종료 상태에 도달하면 `<pipeline> <run#> <verb>`(succeeded / partially succeeded / failed / was canceled)라는 제목의
풍선 알림이 나타나며, 본문에 브랜치가 표시되고 IDE에서 실행 상세를 여는 **Open run** 작업이 있습니다. 실행 및 결과별로 중복이 제거되며, **Refresh pipeline runs in the
background**와 **Notify when a run of mine finishes** 둘 다에 연동됩니다. [알림 및 주의](Notifications-and-Attention-ko.md)를 참조하세요.

![Open run 작업이 있는 실행 완료 알림 풍선](run-finished-notification.png){ width="720" border-effect="line" thumbnail="true" }

## IDE에서 PR의 파이프라인 검사 열기

풀 리퀘스트의 파이프라인 CI 검사에서 **Details…**를 클릭하면 해당 실행이 **IDE 내부에서** 열리며, 관련 작업의 로그로 바로 이동합니다 - URL이 작업을 지정하면 딥링크된 작업으로,
그렇지 않으면 첫 번째 실패 또는 실행 중인 작업으로. 진행 중인 검사는 Pipelines 파란색 "대기 중" 디스크로 그려집니다. 상세 링크가 Azure Pipelines 실행이 아닌 검사는 다른 상태와
마찬가지로 브라우저에서 열립니다.

## 키보드 단축키 {collapsible="true"}

실행 개요에는 포커스된 동안 활성화되는 자체 뷰 내 키가 있습니다. 동일한 목록을 보려면 <shortcut>?</shortcut>(또는 스테이지 그래프 도구 모음의 **?** 버튼)를 누르세요. 이들은 Keymap에
없으며 다시 바인딩할 수 없습니다.

| 작업                                   | 단축키                                                                   |
|----------------------------------------|--------------------------------------------------------------------------|
| 스테이지 그래프로 **로그 보기 / 뒤로** | <shortcut>L</shortcut>                                                   |
| **이전 / 다음 탭**                     | <shortcut>[</shortcut> / <shortcut>]</shortcut>                          |
| 스테이지 그래프 **확대 / 축소 / 맞춤** | <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut> |
| **이 실행을 브라우저에서 열기**        | <shortcut>B</shortcut>                                                   |
| **테스트 필터링**(Tests 탭)            | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>                    |
| **이 목록 표시**                       | <shortcut>?</shortcut>                                                   |

> 작업의 **로그** 안에서는 <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>가 대신 로그 검색 막대를 엽니다. 전체 플러그인 단축키
> 참조는 [](Keyboard-Shortcuts-ko.md)에 있습니다.
> {style="note"}

> **다음:** [알림 및 주의](Notifications-and-Attention-ko.md)에서 무엇이 발생할지 조정하거나, [](Settings-ko.md)에서 모든 플러그인 설정을 검토하세요.
> {style="tip"}
