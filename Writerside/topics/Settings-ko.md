# 설정

<tldr>
    <p><b>위치</b>: <ui-path>Settings | Tools | DevOps Lens</ui-path> - <shortcut>⌘,</shortcut> / <shortcut>Ctrl+Alt+S</shortcut>로 Settings를 엽니다.</p>
    <p><b>하위 페이지</b>: <b>Navigation</b>, <b>Pull Requests</b>, <b>Pipelines</b>, <b>AI Settings</b>, <b>Experimental</b>.</p>
    <p><b>범위</b>: 애플리케이션 수준이며, default account, PR 목록 필터, 그리고 프로젝트별로 저장되는 몇 가지 컨텍스트 내 토글만 예외입니다.</p>
</tldr>

플러그인이 제공하는 모든 설정에 대한 참조입니다.

**DevOps Lens는 여섯 개 페이지로 이루어진 트리입니다.** 처음 열리는 페이지에는 서버에 연결하는 데 필요한 것 - 계정과 그
뒤에 있는 Azure CLI 경로 - 만 있습니다. 연결한 뒤에 조정하는 항목은 새로 고침 주기와 알림까지 포함해 해당 기능의 하위
페이지 - **Navigation**, **Pull Requests**, **Pipelines**, **AI Settings**, **Experimental** - 에 모여 있습니다.

## Tools → DevOps Lens

루트 페이지입니다. 상단에는 **accounts** 패널 (추가 **+**, 편집 ✏, 제거 ✕, 프로젝트별 기본값)이 있습니다 - [](Authentication-ko.md)을 참조하세요.

![DevOps Lens 설정 페이지의 계정 패널](accounts-panel-ko.png){ width="700" border-effect="line" }

- **Azure CLI executable** - *Azure CLI로 로그인*이 사용하는 `az` 경로입니다. **기본값은 비어 있음**(자동 감지). 비워 두면
  `PATH` 또는 기본 설치 위치에서 찾습니다. 옆의 **Detect** 버튼은 그 검색을 즉시 실행해 결과를 필드에 써 넣으므로, 적용하기
  전에 무엇을 찾았는지 확인할 수 있습니다.

## Tools → DevOps Lens → Navigation {id="page-navigation"}

IDE 안에서 Azure DevOps의 무언가를 *찾는* 방법을 다룹니다. 기능마다 섹션을 두지 않고 한 페이지로 묶은 이유는, 주 스위치가
두 **Go to** 액션 모두에 걸쳐 있기 때문입니다.

| 설정                                                                 | 기본값 |
|----------------------------------------------------------------------|--------|
| **Show Go to Pull Requests and Go to Pipeline in Search Everywhere** | 끔     |
| **Find the pull request behind a line of code**                      | 켬     |

첫 번째는 **Go to Pull Requests**(<shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>)와
**Go to Pipeline**(<shortcut>⌥⇧P</shortcut> / <shortcut>Alt+Shift+P</shortcut>)이 열리는 방식을 제어합니다. 끔 - 기본값 -
상태에서는 각 액션이 플러그인 자체의 퀵픽 대화 상자를 엽니다: **Pull Requests** 탭과 **Pipelines** 탭이 있는 하나의 창으로,
누른 단축키에 해당하는 탭에서 시작합니다. 켜면 두 액션 모두 대신 Search Everywhere를 열며, Files / Symbols / Actions 옆에
**Pull Requests** 탭과 **Pipelines** 탭이 나타납니다. 스위치 하나가 두 액션을 모두 다루는 것은 의도적입니다: 대화 상자가
하나의 창이므로 "Search Everywhere냐 대화 상자냐"도 하나의 결정이기 때문입니다.

두 번째는 편집기의 **Open In** 메뉴에 **Find Pull Request**를, **Copy / Paste Special**에 **Copy Pull Request URL for
Line**을, 줄 번호 거터의 오른쪽 클릭 메뉴에 **Annotate with Pull Requests**를
추가합니다. [](Find-Pull-Requests-From-Code-ko.md)를 참조하세요.

> 이 설정이 다루는 것은 그 세 가지 **줄** 액션뿐입니다. Git 뷰의 커밋 항목 - **Open Commit in Azure DevOps**, **Copy Azure DevOps Commit
> Link**, **Find Related Pull Requests** - 에는 스위치가 없으며, 커밋이 Azure DevOps 리포지토리에 속하기만 하면 표시됩니다. [Git
> 뷰의 커밋 액션](Git-Integration-ko.md#commit-actions)을 참조하세요.
> {style="note"}

## Tools → DevOps Lens → Pull Requests {id="page-pull-requests"}

### Review

| 설정                                                       | 기본값          |
|------------------------------------------------------------|-----------------|
| **Mark files as viewed when I open their diff**            | 끔              |
| **Show a "files viewed" counter above the changes tree**   | 끔              |
| **Show attention markers on pull-request rows**            | 끔              |
| **Show the submit shortcut on comment buttons**            | 켬              |
| **Lines shown above a comment**                            | 3 (범위 0–50)   |
| **Lines shown below a comment**                            | 3 (범위 0–50)   |

단축키 힌트 토글은 작성 영역의 **Comment** / **Reply** / **Save** 버튼 레이블 바로 앞에 제출
단축키(<shortcut>⌘↵</shortcut> / <shortcut>Ctrl+Enter</shortcut>)를 표시합니다. 단축키는 어느 쪽이든 동작하며, 이 옵션은
힌트만 표시합니다. 두 개의 **컨텍스트 줄** 스피너는 검토 스레드의 Diff 스니펫에서 댓글이 달린 줄 주위에 타임라인이 표시하는
코드 양을 조절하며, 0으로 설정하면 해당 방향의 컨텍스트를 표시하지 않습니다.

> **Show unread markers**는 여기에 없습니다. 설정 확인란이 아니라 도구 창 토글(기어 메뉴)입니다. 초안은 설정이 아니라 목록
> **필터**입니다.
> {style="note"}

### Background refresh & notifications {id="pr-background-refresh-notifications"}

| 설정                                                         | 기본값             |
|--------------------------------------------------------------|--------------------|
| **Refresh pull requests in the background**                  | 켬                 |
| **Refresh every (seconds)**                                  | 60 (범위 15–3600)  |
| **Notify when I'm asked to review a pull request**           | 켬                 |
| **Notify when someone @mentions me**                         | 켬                 |
| **Notify when my pull request is referenced in another one** | 켬                 |
| **Notify about replies in threads I took part in**           | 켬                 |
| **Notify when a vote changes on my pull requests**           | 켬                 |
| **Offer to create a pull request after I push**              | 켬                 |

**Refresh pull requests in the background**를 끄면 PR 목록 동기화와 열려 있는 풀 리퀘스트의 새로 고침이 멈춥니다. 그 뒤로는
사용자가 직접 조작할 때만 풀 리퀘스트에 대해 Azure DevOps에 연결합니다. 풀 리퀘스트 열기, 새로 고침, 투표, 댓글 작성은 그대로
동작합니다. 종량제 회선이나 유휴 IDE가 폴링하지 않기를 바라는 온프레미스 서버에서 유용합니다.

**이 그룹의 모든 알림이 같은 폴링에 의존하므로**, 꺼져 있는 동안에는 비활성화됩니다. 변화를 알아차리는 쪽이 없으면 풍선
알림도 뜰 수 없기 때문입니다. 유일한 예외는 **Offer to create a pull request after I push**로, 폴링이 아니라 사용자의
`git push`를 계기로 동작하므로 어느 쪽이든 계속 작동합니다.

*참조*란 다른 풀 리퀘스트의 댓글에 `!` 뒤에 내 PR 번호를 쓰는 것을 말합니다. 이들이 무엇을 유발하는지는
[](Notifications-and-Attention-ko.md)를 참조하세요.

> 파이프라인은 [자체 페이지](#page-pipelines)에서 고유한 스위치와 간격으로 폴링합니다. 둘을 독립시킨 것은 의도적입니다.
> 30초마다 지켜볼 만한 실행 목록과 5분이면 충분한 PR 목록은 서로 다르기 때문입니다.
> {style="note"}

## Tools → DevOps Lens → Pipelines {id="page-pipelines"}

Pipelines는 항상 켜져 있습니다. 리포지토리가 Azure DevOps 원격 저장소에 연결되는 순간 도구 창이 나타납니다. 여기서
조정하는 것은 실행을 얼마나 자주 폴링할지와 무엇을 알릴지입니다. [](Pipelines-ko.md)를 참조하세요.

### Background refresh & notifications {id="pipeline-background-refresh-notifications"}

| 설정                                               | 기본값            |
|----------------------------------------------------|-------------------|
| **Refresh pipeline runs in the background**        | 켬                |
| **Refresh every (seconds)**                        | 60 (범위 15–3600) |
| **Notify when a run of mine finishes**             | 켬                |
| **Notify when a run waits for my approval**        | 켬                |
| **Badge the tool-window icon when my runs finish** | 켬                |

파이프라인은 풀 리퀘스트와 별개로 자체 백그라운드 새로 고침을 가집니다. 덕분에 풀 리퀘스트를 자주 폴링하지 않고도 실행만
자세히 지켜보거나 그 반대로 할 수 있습니다. 알림과 스트라이프 배지가 모두 이 폴링에 의존하므로 꺼져 있는 동안 비활성화됩니다.

### YAML 스키마

**Extra YAML locations**는 이 페이지의 다른 모든 항목과 무관합니다. 파이프라인 YAML의 스키마 자동 완성과 유효성 검사는 도구
창 표시 여부와도, 백그라운드 새로 고침이 켜져 있는지 여부와도 무관하게 동작합니다. 리포지토리 루트 기준 상대 경로를 세미콜론으로 구분해 입력하세요. 폴더를 지정하면 그 아래의
모든 YAML 파일이 대상이 되고, 글로브 패턴은 특정 파일에만 일치합니다. 이는 기본 제공 규칙(`azure-pipelines*` 파일 이름,
`.azuredevops` / `.azure-pipelines` / `.pipelines` 폴더, 연결된 리포지토리의 파이프라인 정의가 빌드하는 파일)에 더해
적용됩니다.

## Tools → DevOps Lens → AI Settings {id="page-ai-settings"}

선택적 AI 도우미를 구성하는 하위 페이지입니다 - [](AI-Features-ko.md)을 참조하세요.

![AI Settings 페이지](ai-settings-ko.png){ width="720" border-effect="line" thumbnail="true" }

- **General AI Settings → Enable AI assistance** - 마스터 스위치입니다. **기본값 on**이지만, 공급자를 추가하고 활성화하기 전까지는 아무 동작도 하지 않습니다: 사용
  가능한 공급자가 없으면 플러그인은 외부로 나가는 AI 호출을 전혀 하지 않으며, AI 요소는 대신 이 페이지로 안내합니다. 스위치를 끄면 모든 AI 요소가 숨겨집니다.
- **General AI Settings → AI response language** - 모델이 요약, 코드 설명, 리뷰 노트, 파이프라인 로그 분석을 어떤 언어로
  작성할지 정합니다. **Auto**는 IDE 언어를 따르며, 직접 작성한 텍스트를 다듬을 때는 항상 그 텍스트를 쓴 언어가 유지됩니다.
  아래의 확인란 - **Also use this language for PR titles, descriptions, and commit messages** - 은 별도의 옵트인으로
  **기본값 off**입니다: 제목, 설명, 커밋 메시지는 git 히스토리와 풀 리퀘스트에 남는 것이라 IDE 언어보다 팀의 관례가 더
  중요하기 때문입니다. IDE 안에서 읽는 내용은 어느 쪽이든 드롭다운을 따릅니다.
- **AI Providers** - 공급자 인스턴스마다 한 행씩 표시됩니다 (**Provider / Model / Enabled**). 활성화된 첫 번째 행이 기본값입니다. **Add AI Provider** 대화
  상자를 통해 추가하고 (OpenAI, Claude, Gemini, Ollama, GitHub Copilot; HTTP-API 또는 CLI 모드), 저장하기 전에 **Test Connection**으로 확인하세요.
- **Per-Feature Provider** - **AI Summary**, **AI Review**, **Title + Description**, **Explain Code**를 특정 인스턴스로 라우팅하거나
  **Default**로 둡니다.
- **Configure Prompts** - 각 기능의 시스템 프롬프트를 편집합니다.
- **AI agents (MCP) → Let AI agents change Azure DevOps** - **기본값 off**. IDE에 내장된 MCP 서버에 연결된 AI 에이전트는
  로그인된 연결을 통해 풀 리퀘스트와 파이프라인을 항상 **읽을** 수 있으며, 여기에는 아무 설정도 필요하지 않습니다. 이
  설정은 무언가를 변경하는 작업(댓글, 투표, 스레드 해결, 파이프라인 실행 및 취소)을 추가합니다. 대상은 *외부* 에이전트이므로
  플러그인 자체의 AI 기능에는 영향을 주지 **않습니다** - AI 에이전트에 관한 설정을 찾을 때 보게 되는 곳이라서 이 페이지에
  있을 뿐입니다. [](MCP-Tools-ko.md)를 참조하세요.
- **Advanced** - **Cache AI responses per commit SHA**(기본 on), **Max diff size**(기본 200 KB, 범위 10–2000), **Clear AI
  Response Cache**.

## Tools → DevOps Lens → Experimental {id="page-experimental"}

아직 완성되지 않은 미리 보기 기능입니다. 이 페이지의 모든 항목은 **기본값 off**이고 사용자별 옵트인이며, 향후 업데이트에서
바뀌거나 오작동하거나 제거될 수 있습니다 - 첫 설정 위의 배너에도 그렇게 적혀 있습니다. 미리 보기를 켜서 사용해 보고, 뭔가
이상해 보이면 다시 끄세요. 표준 동작이 곧바로 돌아옵니다.

| 설정                                       | 기본값 |
|--------------------------------------------|--------|
| **Filter pull requests with search chips** | 끔     |

**Filter pull requests with search chips**는 풀 리퀘스트 목록의 GitLab 스타일 검색 바를 미리 보여 줍니다: 활성 필터마다 검색
필드 안의 칩이 되고 그 아래의 필터 행은 사라지며, 정렬은 오른쪽의 드롭다운과 방향 버튼으로 옮겨집니다. 끄면 기존의 두 줄
바가 유지됩니다. Pull Requests 전용입니다 - Pipelines 도구 창은 아직 다루지 않습니다.

## 도움말 링크 {id="help-links"}

루트 **DevOps Lens** 페이지와 **AI Settings**는 같은 줄로 끝납니다: **See Documentation · Report a bug · Request a feature · Ask a question**.
다른 하위 페이지에는 이 줄이 반복되지 않습니다 - 루트에서 한 번만 클릭하면 되기 때문입니다.

- **See Documentation** — 지금 보고 있는 설정 페이지에 해당하는 이 사이트의 문서를 엽니다.
- **Report a bug** — 공개 트래커의 [버그 양식](%new_bug_url%)을 IDE 빌드, 플러그인 버전, 운영체제가 이미 채워진 상태로 엽니다. 그 외에는 아무것도 전송되지 않으며, 제출 전에
  수정하거나 지울 수 있습니다.
- **Request a feature**는 [기능 요청 양식](%new_feature_url%)을, **Ask a question**은 [Discussions](%discussions_url%)를 엽니다.

무엇을 담아야 하고 어떤 답을 받게 되는지는 [](Support-ko.md)을 참고하세요.

## Appearance & Behavior → Notifications {id="notifications"}

플러그인은 라우팅할 수 있는 세 개의 알림 그룹 (popup / tool window / log-only)을 등록합니다:

| 그룹                           | 대상                                                                                       |
|--------------------------------|--------------------------------------------------------------------------------------------|
| **Azure DevOps** | 리뷰 요청, @멘션, 참조, 답글, 투표 변경, 푸시 제안.                                        |
| **Azure DevOps AI**            | AI 요약 / 리뷰 완료 풍선 알림(작업 링크가 시간 초과로 사라지지 않도록 고정(sticky)됩니다). |
| **Azure DevOps Pipelines**     | 사용자가 트리거한 파이프라인 실행의 실행 완료 풍선 알림.                                   |

## Keymap

<ui-path>Settings | Keymap</ui-path>을 열고 **Azure DevOps**를 검색하여 아무 액션이나 다시 바인딩합니다. 액션 ID가 포함된 전체 목록은 [](Keyboard-Shortcuts-ko.md)에 있습니다.

## Per-project vs application-level

| 범위                                            | 다루는 항목                                                                                                                                                                                       |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **애플리케이션 수준** - 모든 프로젝트           | 대부분의 설정: 계정, 알림 기본 설정, AI 공급자.                                                                                                                                                      |
| **프로젝트별** - 프로젝트의 워크스페이스에 저장 | **default account**, **PR 목록 필터**, 그리고 Settings가 아니라 사용하는 자리에서 설정하는 몇 가지 토글: **Review Mode**(Git 브랜치 위젯 팝업), **Collapse resolved**(타임라인 칩), 변경 트리의 **그룹화**, **읽지 않음 표시**(기어 메뉴). |
