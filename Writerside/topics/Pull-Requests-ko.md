# 풀 리퀘스트

<tldr>
    <p><b>위치</b>: <b>Pull Requests</b> 도구 창, <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>.</p>
    <p><b>PR로 바로 이동</b>: <b>Go to Pull Requests…</b>, <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>.</p>
    <p><b>만들기</b>: 도구 창 툴바의 <b>+</b> 버튼.</p>
</tldr>

**Pull Requests** 도구 창은 여러분의 명령 센터입니다. 대기열을 탐색하고, 필터링 및 검색하고, PR을 열고, 그에 대해 작업할 수 있습니다 - 완료, 되돌리기, 비교 등.

## 도구 창 열기

도구 창은 열린 프로젝트에 Azure DevOps Git 원격이 하나 이상 있을 때마다 왼쪽 사이드바에 나타납니다. (Azure DevOps 원격이 없나요? 어수선함을 줄이기 위해 숨겨진 상태로 유지됩니다.)

- <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>를 누릅니다.
- 또는 사이드바에서 **Pull Requests** 스트라이프 아이콘을 클릭합니다.
- 또는 <ui-path>View | Tool Windows | Pull Requests</ui-path>를 사용합니다.
- 또는 *Find Action*(<shortcut>⌘⇧A</shortcut> / <shortcut>Ctrl+Shift+A</shortcut>)을 실행하고 **Pull Requests**를 입력합니다.

![에디터 옆에 열린 Pull Requests 도구 창](pr-tool-window-shortcuts-ko.png){ width="720" border-effect="line" thumbnail="true" }

> 이 단축키는 IDE 표준 *Activate tool window* 작업이므로 <ui-path>Settings | Keymap</ui-path>에서 **Pull Requests**를 검색해 다시 지정할 수 있습니다.
> 플러그인의 모든 단축키는 [](Keyboard-Shortcuts-ko.md)에 정리되어 있습니다.
> {style="tip"}

## 풀 리퀘스트 찾기

### 기본 보기: 전체

활성 필터가 없으면 목록에는 모든 상태의 **모든 풀 리퀘스트** - 활성, 초안, 병합됨, 중단됨 - 가 나란히 표시됩니다. 이것은 여러분이 처음 도착하는 보기이며, *Clear filters*가 여러분을 되돌려 보내는 보기입니다.

![활성, 초안, 병합됨, 중단된 풀 리퀘스트가 한 대기열에 모인 필터 없는 목록](browse-pull-requests-ko.png){ width="720" border-effect="line" thumbnail="true" }

나의 것만 보려면 **State** 칩에서 **Mine**을 선택하세요 - 여러분이 **생성**했거나, **여러분에게 할당**되었거나, **여러분의 팀 중 하나에 할당**된 활성 PR로, Azure DevOps 웹의
**Mine** 탭과 동일한 집합입니다.

> 팀에 할당된 PR에는 올바른 [](Permissions-ko.md)이 필요합니다. 여러분의 자격 증명이 팀 멤버십을 읽을 수 없는 경우, 플러그인이 한 번 알려줍니다 - 보기의 나머지 부분은 계속 작동합니다.
> {style="note"}

### Quick Filters

칩 행의 왼쪽에 있는 **필터 아이콘**을 클릭하면 원클릭 프리셋을 사용할 수 있습니다. 아이콘의 배지는 활성 필터가 몇 개인지 보여줍니다.

![필터 세 개가 활성인 상태로 필터 아이콘 아래에 열린 Quick Filters 메뉴](quick-filters-ko.png){ width="520" border-effect="line" }

| 프리셋                  | 표시 내용                                                       |
|-------------------------|-----------------------------------------------------------------|
| **Active**              | 활성 풀 리퀘스트(**State** 프리셋)                              |
| **Includes my changes** | 여러분이 작성한 PR                                              |
| **I am a reviewer**     | 여러분이 리뷰어 목록에 있는 PR                                  |
| **Waiting for author**  | 여러분이 **Waiting for author**로 투표한 PR(**Review** 프리셋)  |
| **I reviewed**          | 여러분이 이미 투표를 마친 PR                                    |
| **Awaiting my review**  | 여러분이 아직 투표하지 않은 리뷰어로 지정된 PR                  |
| **Abandoned**           | 중단된 풀 리퀘스트(**State** 프리셋)                            |
| **Clear N filter(s)**   | 모든 활성 필터를 재설정 - 기본 전체 PR 보기로 복귀              |

프리셋은 하나의 **보기**입니다. 하나를 선택하면 현재 필터에 더해지는 것이 아니라 현재 필터를 대체합니다. 두 개의 "나"
프리셋은 플러그인이 여러분이 누구인지 알게 되면 나타납니다.

### 필터 칩

검색 필드 아래에 스크롤 가능한 칩 행이 있습니다. 아무 칩이나 클릭하여 목록을 세분화하세요:

| 칩                | 옵션                                                                                               |
|-------------------|----------------------------------------------------------------------------------------------------|
| **State**         | Mine · Active · Completed · Abandoned                                                              |
| **Author**        | 사용자 전체에 대한 타이핑 즉시 검색                                                                |
| **Assignee**      | 사용자 전체에 대한 타이핑 즉시 검색                                                                |
| **Target branch** | 풀 리퀘스트가 병합되어 들어가는 브랜치                                                             |
| **Tags**          | Azure DevOps PR 레이블(태그)                                                                       |
| **Draft**         | Yes · No                                                                                           |
| **Sort**          | Newest · Oldest · Most/Least commented · Recently/Least recently updated · Id, newest/oldest first |

네 가지 차원 - **Review**, **Work Items**, **Approved by**, **Source branch** - 은 자체 칩은 없지만 검색 필드에서 같은
목록을 필터링합니다: `review:`, `workItem:`, `approvedBy:` 또는 `sourceBranch:`를 입력하고 값을 선택하세요 (아래 **검색**
참조). Review 상태는 Quick Filters 프리셋이 더 쉬운 말로 묻는 것이기도 합니다.

필터는 IDE를 다시 시작해도 **프로젝트별로** 유지됩니다. 이를 지우려면 Quick Filters 메뉴의 **Clear N filter (s)**를 사용하세요. 칩은 검색 필드에서 바로 설정할 수도 있습니다.
`author:` 같은 필터 키를 입력하고 자동 완성 팝업에서 선택하세요 (아래 **검색** 참조).

> **검색** - 칩 위의 필드에 입력하여 PR 제목, 번호, 작성자 및 브랜치 이름을 일치시킵니다. 필터 키 (`state:`, `author:`, `tag:`, `assignee:`(별칭
> `reviewer:`), `approvedBy:`, `review:`, `workItem:`, `sourceBranch:`, `targetBranch:`, `draft:`)를 입력하면 사용 가능한 값의 자동 완성 팝업이
> 열립니다. 값을 선택하면 해당 필터가 적용되고 토큰은 쿼리에서 제거됩니다. 키 자체도 자동 완성됩니다 -
> `au`를 입력하면 `author:`가 제안됩니다. <shortcut>Enter ↵</shortcut>를 누르면 현재 검색 (쿼리와 필터를 함께)이 **기록**에 저장됩니다. 필드의 검색 아이콘을 클릭하거나
> **Show Search History** 단축키 (<shortcut>⌥↓</shortcut> / <shortcut>Alt+Down</shortcut>)를 눌러 최근 검색을 다시 적용하세요. 기록은 프로젝트별로 최근
> 5개까지 유지됩니다.
> {style="tip"}

### 특정 PR로 이동 {id="jump-to-a-specific-pr"}

원하는 PR을 이미 알고 있을 때는 목록을 건너뛰세요. **Go to Pull Requests…**는 캐시된 모든 PR을 **id, 제목, 작성자 또는 리포지토리**로 퍼지 검색하여 해당 타임라인에서 바로 엽니다.
빈 검색은 캐시된 모든 PR을 나열합니다 (읽지 않은 것 먼저, 그다음 최신순).

- <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>를 누릅니다.
- 또는 <ui-path>VCS | Go to Pull Requests…</ui-path>를 사용합니다.
- 또는 *Find Action*(<shortcut>⌘⇧A</shortcut> / <shortcut>Ctrl+Shift+A</shortcut>)을 실행하고 **Go to Pull Requests**를 입력합니다.

기본적으로 플러그인 자체의 빠른 선택 팝업이 열립니다 - 옆에 상태 **깔때기 (funnel)**가 있는 검색 필드와 <shortcut>Enter ↵</shortcut> 열기 /
<shortcut>Esc ⎋</shortcut> 닫기 키를 갖춘 팝업입니다. 같은 창에 **Pipelines** 탭도 있으므로 **Go to Pipeline**도 이 창으로 열립니다.

> IDE의 *Search Everywhere*를 선호하시나요? [Navigation 설정 페이지](Settings-ko.md#page-navigation)에서 **Show Go to Pull Requests and Go to
> Pipeline in Search Everywhere**를 **켜면** 이 액션이 대신 그곳의 **Pull Requests** 탭을 Files, Symbols, Actions 옆에 엽니다.
> <shortcut>Enter ↵</shortcut>를 눌러 강조 표시된 PR을 여세요. 결과는 **Pull Requests** 아래에 묶이며, 아무것도 찾지 못한 검색은 빈 탭 대신 회색 자리 표시자 행을
> 남깁니다 - 입력 전에는 **No pull requests cached yet**, 입력 후에는 **No pull requests match “X”** 입니다.
> {style="tip"}

![Go to Pull Requests 결과: Search Everywhere의 Pull Requests 탭](go-to-pull-request-ko.png){ width="640" border-effect="line" }

#### 전용 대화 상자가 알려주는 것 {collapsible="true"}

이 대화 상자의 필드에는 *Search pull requests by id, title, author, or repo* 라는 안내가 표시되며, 빈 상태는 결과가 나오지 않은 이유를 알려 줍니다:

| 표시되는 내용                                  | 이유                                                                                           |
|------------------------------------------------|------------------------------------------------------------------------------------------------|
| **No pull requests**                           | 캐시를 처음 훑기 전의 초기 자리 표시자                                                         |
| **No pull requests cached yet**                | 캐시된 것이 없고 아직 검색어도 입력하지 않음                                                   |
| **No pull requests for the selected statuses** | 깔때기가 전부 걸러냄                                                                           |
| **No pull requests match “query”**             | 검색어와 일치하는 것이 없음                                                                    |
| **Couldn't load pull requests - …**            | 백그라운드 로드가 실패함. 뒤쪽에 오류가 명시되거나, 없으면 *check your connection* 으로 대체됨 |

깔때기는 모든 상태가 체크된 상태로 열립니다. 이는 팝업마다의 선택이므로 범위를 좁혀도 유지되지 않으며, 다음에 대화 상자를 열면 모든 상태가 다시 돌아옵니다.

## PR 행 읽기 {id="read-a-pr-row"}

각 행에는 상태가 한눈에 보이도록 담겨 있습니다:

![풀 리퀘스트 행의 구조](pr-row-anatomy-ko.png){ width="640" border-effect="line" }

- **제목과 `!`-번호**, 그리고 관련이 있을 때 **상태 알약 (pill)**: *Draft*, *Merged*, *Abandoned* 또는 *Has merge conflicts*.
- **리뷰어 투표 아이콘** - approved, approved-with-suggestions, waiting 또는 rejected.
- **스레드 수 (그리고 아직 미해결인 개수)를 표시하는 호박색 토론 배지**.
- **주의 칩 (Attention chips)** - *Review requested*, *Mentions you* 또는 *Replied* - PR이 여러분의 주의를 원할 때 표시됩니다. 이들은 기본적으로 꺼져
  있습니다. 켜는 방법은 [Notifications &amp; Attention](Notifications-and-Attention-ko.md)을 참조하세요.

읽지 않은 PR에는 새 커밋 *및* 새 댓글 활동에 반응하는 파란색 **읽지 않음 표시** 점이 나타날 수 있습니다. 도구 창의 톱니바퀴 → **Show unread markers**에서 토글하세요.

## PR 열기 및 작업 {id="open-and-act-on-a-pr"}

PR을 **클릭**하면 상세 보기가 열립니다 - 제목과 브랜치, 상태 검사, 변경된 파일 트리, 그리고 작업 표시줄. **View Timeline**을 누르면 그 옆에 토론이 열립니다.

![열린 풀 리퀘스트: 상태 검사와 작업 표시줄이 있는 상세 보기, 그 옆의 토론 타임라인](pr-opened-ko.png){ width="720" border-effect="line" thumbnail="true" }

하단의 작업 표시줄은 여러분의 역할에 맞게 조정됩니다:

| 여러분의 역할…          | 기본 작업                                                                                            |
|-------------------------|------------------------------------------------------------------------------------------------------|
| **리뷰어**              | **Approve ▾**(분할 버튼: Approve with suggestions, Wait for author, Request changes, Reset feedback) |
| **작성자, 리뷰 필요**   | **Request review**                                                                                   |
| **작성자, 리뷰 완료됨** | **Complete ▾**(Set auto-complete…, Mark as draft, Abandon)                                           |
| **작성자, 초안**        | **Publish ▾**(Abandon)                                                                               |
| **작성자, 중단됨**      | **Reactivate ▾**(Delete source branch)                                                               |
| **관여하지 않음**       | **Set myself as reviewer**                                                                           |

> 투표는 언제든 바꿀 수 있으며, 다시 투표하면 이전 값이 그대로 대체됩니다.
> {style="note"}

모든 상태에서는 전체 작업 세트를 갖춘 **⋮**(More) 메뉴도 표시됩니다:

![내가 작성한 활성 PR에서 열린 작업 표시줄의 More 메뉴](pr-more-menu-ko.png){ width="380" border-effect="line" }

| 작업                                           | 하는 일                                                                                                                                                                                            |
|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Share Pull Request…**                        | PR을 사람들에게 이메일로 보냅니다(리뷰어 추가 없음, 댓글 게시 없음)                                                                                                                                |
| **Submit Pending Comments (N)**                | 대기시켜 둔 댓글을 리뷰로 게시합니다(N > 0일 때만)                                                                                                                                                 |
| **Restart Merge**                              | *(충돌이 있거나 병합이 실패했거나 정책에 거부된 활성 PR)* Azure DevOps가 병합을 다시 계산하도록 유도합니다. 진행 표시줄은 없습니다 - 병합 상태가 *Queued* 로 바뀌었다가 되돌아오는 것을 지켜보세요 |
| **Change Target Branch…**                      | PR을 다른 대상 브랜치로 다시 지정합니다                                                                                                                                                            |
| **Cherry-Pick…**                               | 이 PR의 커밋을 다른 브랜치에 체리픽한 브랜치를 만듭니다                                                                                                                                            |
| **Review Changes Since…**                      | *(업데이트가 2개 이상인 PR)* diff(변경 내용)를 선택한 업데이트 이후 변경된 내용으로 다시 범위 지정합니다 - [Code Review](Code-Review-ko.md#compare) 참조                                           |
| **Revert…**                                    | *(완료된 PR)* 이 PR의 변경 내용을 되돌리는 브랜치를 만듭니다                                                                                                                                       |
| **Open on Web** · **Copy Link**                | dev.azure.com URL로 이동 / 복사합니다                                                                                                                                                              |
| **Summarize Pull Request** · **Run AI Review** | [AI 지원](AI-Features-ko.md)                                                                                                                                                                       |

행을 마우스 오른쪽 버튼으로 클릭하면 빠른 작업도 가능합니다: **View Pull Request**, **View Pull Request in Browser**, **Copy Pull Request URL**,
그리고 **Refresh List**.

## 풀 리퀘스트의 생애 주기

### 초안 → 준비 완료

초안 PR에는 **DRAFT** 알약 (pill)이 붙고 기본 작업으로 **Publish**가 표시됩니다. 게시하면 일반적인, 리뷰 가능한 PR로 바뀌며, 작성자는 **Mark as draft**로 다시 되돌릴 수
있습니다. 둘 다 확인 대화 상자 없이 즉시 실행되며, 타임라인에는 *Marked as ready for review* / *Marked as a draft* 로 기록됩니다.

### 풀 리퀘스트 완료 {id="complete-a-pull-request"}

**Complete**를 클릭하면 **Complete Pull Request** 대화 상자가 열립니다. **Merge type**을 선택하세요 - 실시간 다이어그램이 다시 그려지며 결과적으로 만들어지는 히스토리
형태를 보여줍니다:

![병합 전략 다이어그램이 있는 Complete Pull Request 대화 상자](complete-pr-dialog-ko.png){ width="560" border-effect="line" }

| Merge type                  | 결과 히스토리                                                  |
|-----------------------------|----------------------------------------------------------------|
| **Merge (no fast forward)** | 모든 커밋을 보존하는 비선형 히스토리                           |
| **Squash commit**           | 대상에 커밋 하나만 남는 선형 히스토리                          |
| **Rebase and fast-forward** | 소스 커밋을 대상 위로 리베이스하고 fast-forward                |
| **Semi-linear merge**       | 소스 커밋을 대상 위로 리베이스한 뒤 부모가 둘인 병합 커밋 생성 |

브랜치 정책이 특정 전략을 요구하면 금지된 전략들은 흐리게 표시되며, 그중 하나를 고르면 *This merge type is forbidden by a branch policy* 와 함께 완료가 차단됩니다.

**완료 후 옵션:**

- **Complete associated work items after merging** - PR에 실제로 연결된 작업 항목이 있을 때만 사용할 수 있습니다.
- **Delete &lt;branch&gt; after merging** - **기본적으로 체크되어 있습니다**.
- **Customize merge commit message** - 기본적으로 꺼져 있습니다. 체크하면 `Merged PR <id>: <title>` 로 미리 채워진 Title과 Description이 나타납니다
  (squash의 경우 squash된 커밋들도 함께 나열됩니다). Rebase는 이를 무시하고 항상 기존 커밋 메시지를 그대로 재사용합니다.

> **브랜치 정책이 준수됩니다.** 필수 리뷰어나 상태 검사가 충족되지 않으면 대화 상자는 각 사유를 나열하는 빨간색 **Completion is blocked by:** 배너와 함께 열립니다. 우회 권한을
> 보유하고 있다면 **Override branch policies and enable merge**도 함께 제공되며, 여기에는 사유를 직접 작성해야 합니다. 그 권한이 없으면 체크박스 자체가 표시되지 않습니다.
> {style="warning"}

**Set auto-complete…** 는 모든 정책이 통과되는 즉시 PR이 스스로 병합되도록 예약합니다. 같은 대화 상자를 축소된 형태로 - merge type과 브랜치 삭제만 - 열며, PR이 아직 차단된
*동안에도* 의도적으로 사용할 수 있습니다. 예약되고 나면 상태 검사 위에 *Auto-complete is set — the pull request will be completed automatically once
all policies pass* 배너가 **Cancel auto-complete** 링크와 함께 표시됩니다. 배너의 두 번째 줄 (회색의 옅은 줄)에는 예약된 내용 - 선택한 병합 전략 (예: *Squash
commit*)과 소스 브랜치 삭제 여부 - 이 표시됩니다. PR 목록에서는 예약된 PR 행에 다른 상태 아이콘과 나란히 작은 번개 배지가 표시되며, 툴팁으로 *Auto-complete is set* 이 나타납니다.

### 소스 브랜치 삭제 또는 복원 {id="source-branch"}

PR이 완료되면 타임라인의 병합된 행이 후속 작업을 제안하며, 어떤 것이 보이는지는 브랜치가 이미 사라졌는지에 따라 달라집니다:

| 타임라인 표시                                        | 클릭했을 때                                   |
|------------------------------------------------------|-----------------------------------------------|
| *You can now **delete** the source branch*           | IDE에서 그 자리에서 소스 브랜치를 삭제합니다. |
| *The source branch has been deleted. **Restore…** ↗* | **풀 리퀘스트를 웹에서 엽니다.**              |

> **복원은 IDE 내 액션이 아니라 외부 링크입니다.** **↗** 화살표가 그 신호입니다. 플러그인이 직접 브랜치를 복원하지 않고, Azure DevOps의 풀 리퀘스트 페이지로 데려가 그곳의 **Restore
branch** 버튼을 사용하게 합니다. 복원이란 브랜치가 삭제될 당시 가리키던 커밋에 ref를 다시 만드는 것이고, 그 정보는 Azure가 서버 측에서 추적합니다. 브라우저에서 하는 것이 바로 그 커밋을 정확히
> 되찾는 것을 보장합니다.
> {style="note"}

이 행이 무엇을 표시할지 결정하는 방식에 대해 알아 둘 것이 두 가지 있습니다:

- 브랜치의 운명은 PR 자체의 완료 옵션과 이번 세션에서 여러분이 한 일을 근거로 추론하며, 브랜치를 서버에 **다시 확인하지 않습니다**. 누군가 **IDE 밖에서** 브랜치를 삭제하거나 복원하면, PR을 다시
  로드하기 전까지 이 행은 알아채지 못합니다.
- 삭제 링크는 작성자뿐 아니라 병합된 PR을 보는 누구에게나 제공됩니다. 권한이 없다면 행은 갱신되더라도 서버에서는 삭제가 적용되지 않습니다 - 중요하다면 웹에서 확인하세요.

아예 신경 쓰고 싶지 않다면 Complete 대화 상자에서 **Delete &lt;branch&gt; after merging** 을 체크된 채로 두세요. 병합 시점에 브랜치가 정리됩니다.

> **중단된** PR에서는 **Delete source branch** 가 제대로 된 액션으로 제공되며, **Reactivate ▾** 드롭다운 안에 있습니다.
> {style="tip"}

### 중단과 재활성화

**Abandon** 은 확인을 요청한 뒤 (*Are you sure you want to abandon this pull request?*) 병합하지 않고 PR을 닫습니다. 타임라인에는 *Pull Request
Abandoned* 로 기록됩니다.

중단된 PR은 **Reactivate** 로 언제든 되살릴 수 있습니다 - 확인 절차는 없고, 타임라인에는 *Pull Request Reactivated* 로 기록됩니다.

> 중단된 PR은 목록에서 **ABANDONED** 알약 (pill)을 표시하지만, 상세 보기에서는 상태를 **CLOSED** 로 표기합니다 - 같은 것을 부르는 두 이름입니다.
> {style="note"}

### 체리픽과 되돌리기

둘 다 **⋮** 메뉴에 있고 작동 방식도 같습니다. 변경을 **적용할** 브랜치를 고르면 플러그인이 그 결과를 담은 **새 브랜치**를 만듭니다. 어느 쪽도 출발점이 된 풀 리퀘스트를 수정하지 않습니다.

- **Cherry-Pick…** 은 이 PR의 커밋을 다른 브랜치로 복사하며, 새 브랜치 이름은 기본적으로 `cherry-pick/<source-branch>` 입니다.
- **Revert…**(완료된 PR 전용)는 이 PR의 변경을 되돌린 브랜치를 만들며, 기본 이름은 `revert/<source>-<id>` 이고 PR의 대상 브랜치가 미리 선택됩니다.

Azure DevOps가 서버 측에서 작업을 수행하는 동안 취소 가능한 진행 작업이 실행됩니다. 완료되면 Create 양식을 미리 채워 여는 **Create Pull Request** 액션이 담긴 풍선이
나타납니다 - 새 브랜치가 소스, 선택한 브랜치가 대상, 그리고 `Revert "<original title>"` 같은 제목이 채워집니다. **변경을 실제로 반영하려면 그 두 번째 PR이 필요합니다** -
브랜치만으로는 아무것도 바뀌지 않습니다.

## 풀 리퀘스트 만들기

**Pull Requests** 도구 창에서 **+**(Create Pull Request)를 클릭합니다 - 목록 탭 오른쪽 위 툴바의 첫 번째 아이콘으로, 분할 보기·**⋮**·숨기기 아이콘의 왼쪽에 있습니다.

![Pull Requests 도구 창 툴바의 + (Create Pull Request) 버튼에 마우스를 올려 툴팁이 표시된 모습](create-pr-button-ko.png){ width="590" border-effect="line" }

목록 옆에 **새 PR** 탭이 열리고, 소스 브랜치(현재 브랜치)와 기본 대상 브랜치가 미리 채워집니다.

![풀 리퀘스트 만들기 양식: 원본 및 대상 브랜치, 변경된 파일 트리, 마크다운 풀 리퀘스트 템플릿이 채워진 설명 편집기, 리뷰어·태그·작업 항목 행](create-pr-ai-ko.png){ width="640" border-effect="line" }

**설명**은 PR 댓글과 동일한 작성기를 사용합니다: **Write | Preview** 탭 스트립과 에디터 위의 서식 도구 모음. `@`, `#` 또는 `!`를 입력하면 사람, 작업 항목, PR을 인라인 자동
완성할 수 있습니다. <shortcut>⌘↵</shortcut> / <shortcut>Ctrl+Enter</shortcut>를 눌러 만드세요.

설명 아래의 메타데이터 블록은 네 개의 인라인 행입니다 - 각 행에는 편집용 연필이 있고, 표시된 곳에는 지우기용 **X**가 있습니다:

| 행                     | 설정하는 내용                                                                                  |
|------------------------|------------------------------------------------------------------------------------------------|
| **Required reviewers** | 반드시 리뷰해야 하는 사람들                                                                    |
| **Optional reviewers** | 리뷰하도록 초대된 사람들                                                                       |
| **Tags**               | Azure DevOps PR 레이블 - 기존 항목을 선택하거나 **+**를 사용하여 완전히 새로운 태그를 만듭니다 |
| **Work items**         | 연결된 Azure Boards 작업 항목                                                                  |

작업 항목을 실제로 연결하려면 **Work items** 행을 사용하세요. 설명에 입력한 `#1234`는 링크로 렌더링되는 [참조](Markdown-ko.md#hash)일 뿐, 연결
(association)이 아닙니다.

기본 버튼은 분할 버튼입니다: **Create Pull Request**, 그리고 드롭다운에 **Create Draft Pull Request**.

> [AI가 활성화](AI-Features-ko.md)되면 설명 작성기 도구 모음에 여러분 브랜치의 커밋에서 제목과 설명 초안을 작성해 주는 AI 버튼 (툴팁 **Generate title &amp;
description with AI**)이 추가됩니다. 아직 AI 공급자가 설정되지 않은 경우, 클릭하면 AI Settings를 열도록 제안합니다.
> {style="tip"}

## 새로 고침 및 백그라운드 동기화 {id="refresh-and-background-sync"}

목록은 동기화 일정에 따라 자체적으로 업데이트되지만, 필요에 따라 새로 고칠 수 있습니다:

- 도구 창에 포커스가 있는 동안 <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> 또는 <shortcut>F5</shortcut>를 누릅니다.
- 또는 행을 마우스 오른쪽 버튼으로 클릭 → **Refresh List**.

> 폴링 주기는 [Settings](Settings-ko.md)의 **Refresh every (seconds)**입니다 (기본값 60초). 콜드 스타트 시에는 첫 동기화가 실행되는 동안 목록에 **마지막으로 알려진 캐시 상태**가
> 표시되므로, 스피너를 기다리는 대신 즉시 작업할 수 있습니다.
> {style="note"}

### 실시간 업데이트 음소거 {id="mute-live-updates"}

열려 있는 풀 리퀘스트도 같은 주기로 새로 고쳐지므로, 읽는 도중에 타임라인이 흔들릴 수 있습니다. 타임라인 사이드바의 **Notifications** 섹션에는 이를 멈추는 버튼 하나가 있습니다:

| 버튼                    | 툴팁                                                                                   |
|-------------------------|----------------------------------------------------------------------------------------|
| **Mute live updates**   | *This pull request refreshes automatically. Mute to stop live updates while you read.* |
| **Resume live updates** | *Live updates are paused. Resume, or use Refresh to check for new activity.*           |

음소거된 동안에는 종 아이콘에 사선이 그어집니다. 이 토글은 **풀 리퀘스트별**이며 자동 새로 고침만 일시 중지합니다 - 일시 중지 중에도 명시적인 **Refresh** 는 새 활동을 가져옵니다.

음소거된 동안 서버에서 풀 리퀘스트가 변경되면 타임라인 상단에 **This pull request has updates** 배너가 은은하게 나타납니다 - **Refresh** 로 변경 사항을 가져오거나 실시간
업데이트를 다시 시작하세요.

## 계정 또는 리포지토리 전환

여러 조직 또는 리포지토리에 바인딩된 프로젝트의 경우, 도구 창의 톱니바퀴 → **Switch Account / Repository…**를 사용하세요. 현재 브랜치의 PR은 Git 브랜치 위젯과 상태 표시줄에도
표시됩니다 - [Git Integration](Git-Integration-ko.md)을 참조하세요.

목록 탭의 이름은 범위가 지정된 Git 리포지토리를 따르며 (`my-service`), Azure DevOps 원격을 확인할 수 없을 때만 **All repositories** 로 표시됩니다.
