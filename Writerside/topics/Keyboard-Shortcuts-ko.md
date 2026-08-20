# 키보드 단축키

<tldr>
    <p><b>도구 창</b>: Pull Requests는 <shortcut>⌘⇧Y</shortcut> / <shortcut>Ctrl+Shift+Y</shortcut>, Pipelines는 <shortcut>⌘⇧W</shortcut> / <shortcut>Ctrl+Shift+W</shortcut>.</p>
    <p><b>재바인딩</b>: <ui-path>Settings | Keymap</ui-path>에서 <code>AzureDevOps</code>를 검색하세요. <a anchor="rebind">재바인딩 방법</a>을 참조하세요.</p>
    <p><b>뷰 내부 키</b>: PR 타임라인과 파이프라인 실행 편집기에서는 <shortcut>?</shortcut>로 각자의 목록을 볼 수 있습니다.</p>
</tldr>

플러그인이 사용하는 모든 단축키를 한곳에 모았습니다. 두 종류가 있습니다:

- **IDE 액션** - IDE에 등록되어 해당 메뉴에 표시되며 <ui-path>Settings | Keymap</ui-path>에서 **재바인딩 가능**합니다. 각 액션에는 **Action ID**가 있습니다
  (대부분 `AzureDevOps`와 일치하며, 도구 창 관련 액션은 해당 창 이름과 일치합니다).
- **뷰 내부 키** - 특정 뷰 (댓글 작성기, 풀 리퀘스트 타임라인, 이미지 미리 보기, 파이프라인 실행 편집기, 통계 뷰, 도구 창의 검색 필드)에 내장되어 있으며 해당 뷰에 포커스가 있을 때만 활성화됩니다.
  Keymap에 없으며 재바인딩할 수 없습니다.

> macOS에서 <shortcut>⌘</shortcut>는 Command이고 <shortcut>⌃</shortcut>는 **Control**입니다 - 대부분의 액션은 ⌘를 사용하지만 일부는 ⌃를 사용합니다.
> Windows / Linux에서는 <shortcut>Ctrl</shortcut>을 사용합니다.
> {style="note"}

## 도구 창

어디서든 플러그인 도구 창을 열거나 포커스를 옮깁니다. 이들은 IDE의 표준 **Activate tool window** 액션이므로 <ui-path>Settings | Keymap</ui-path>에서 재바인딩할 수
있습니다 (창 이름으로 검색).

| 액션                      | macOS                    | Windows / Linux                     | Action ID                              |
|---------------------------|--------------------------|-------------------------------------|----------------------------------------|
| **Pull Requests** 도구 창 | <shortcut>⌘⇧Y</shortcut> | <shortcut>Ctrl+Shift+Y</shortcut>   | `ActivatePullRequestsWindowToolWindow` |
| **Pipelines** 도구 창     | <shortcut>⌘⇧W</shortcut> | *처음으로 비어 있는 키 - 툴팁 참조* | `ActivatePipelinesWindowToolWindow`    |

> **Pipelines** 단축키는 프로젝트에 Azure DevOps 원격 저장소가 있을 때만 동작합니다. 도구 창을 사용할 수 있게 만드는
조건이 그것이기 때문입니다. 그 밖의 곳에서는 열 도구 창이 없습니다.
> {style="note"}

### Pipelines 단축키가 플랫폼마다 다른 이유 {id="pipelines-shortcut" collapsible="true"}

**macOS**에서 기본값은 <shortcut>⌘⇧W</shortcut>입니다 - 표준 2026.2 키맵에서 아직 비어 있는 몇 안 되는 ⌘⇧ 조합 중 하나입니다 (최신 IntelliJ가 대부분을
차지합니다: ⌘⇧J는 Database 콘솔, ⌘⇧O는 Go to File, ⌘⇧K는 Push 등). **Windows / Linux**에서는 플러그인이 처음으로 비어 있는 조합을 대신 선택하므로 값이 다를 수
있습니다 - **Pipelines 스트라이프 아이콘에 마우스를 올리면 실제 키를 확인할 수 있습니다**. 기본값을 이미 다른 용도로 사용하고 있나요? <ui-path>Settings | Keymap</ui-path>
에서 Pipelines를 재바인딩하세요 (**Pipelines**로 검색).

> 이 단축키는 플러그인이 로드되는 즉시 **프로젝트별로** 시드되며, 기존 키나 재바인딩된 키는 항상 존중됩니다 - 따라서 설치나
> 업데이트 직후에도 재시작 없이 바로 동작합니다. 재바인딩은 즉시 적용되지만, 스트라이프 아이콘의 호버 툴팁에는 프로젝트를
> 다시 열 때까지 이전 키가 표시될 수 있습니다.
> {style="tip"}

### 검색 필드로 포커스 이동 {id="focus-search"}

두 도구 창 모두 목록 위에 검색 필드가 있습니다. 도구 창에 포커스가 있는 동안 <shortcut>⌘L</shortcut> /
<shortcut>Ctrl+L</shortcut>을 누르면 해당 필드로 이동하고 현재 쿼리가 선택됩니다 - 이 키는 필드의 플레이스홀더
텍스트에도 표시됩니다. 이는 뷰 내부 키(도구 창에 내장되어 있으며 Keymap에 없음)이므로, 편집기에서 올 때는 먼저 창
활성화 단축키를 누르세요 - 예: <shortcut>⌘⇧Y</shortcut> 다음 <shortcut>⌘L</shortcut>.

## 편집기 내부 (편집기에서 리뷰)

| 액션                   | macOS                    | Windows / Linux                   | Action ID                                    |
|------------------------|--------------------------|-----------------------------------|----------------------------------------------|
| **Add Review Comment** | <shortcut>⌃⇧M</shortcut> | <shortcut>Ctrl+Shift+M</shortcut> | `AzureDevOps.PullRequest.AddCommentAtCursor` |
| **Copy Link to Code**  | <shortcut>⌘⇧L</shortcut> | <shortcut>Ctrl+Shift+L</shortcut> | `AzureDevOps.PullRequest.CopyCodeLink`       |

**Add Review Comment**는 캐럿이 열린 PR에 속한 파일의 변경된 줄 위에 있을 때만 동작합니다. [](Review-in-Editor-ko.md)를 참조하세요. **Copy Link
to Code**(마우스 오른쪽 버튼 클릭 → **Copy / Paste Special**)는 리뷰 밖에서도, 연결된 리포지토리의 아무 파일에서나 사용할 수 있습니다. [](Code-Review-ko.md)
를 참조하세요.

## 편집기 내부 (모든 파일)

[](Find-Pull-Requests-From-Code-ko.md) 액션들은 기본 단축키 없이 제공됩니다 - [Keymap](#rebind)에서 직접 바인딩하세요:

| 액션                               | 위치                                     | Action ID                                          |
|------------------------------------|------------------------------------------|----------------------------------------------------|
| **Find Pull Request**              | 오른쪽 클릭 → **Open In**                | `AzureDevOps.PullRequest.FindForLine`              |
| **Copy Pull Request URL for Line** | 오른쪽 클릭 → **Copy / Paste Special**   | `AzureDevOps.PullRequest.CopyUrlForLine`           |
| **Annotate with Pull Requests**    | **줄 번호 여백(gutter)**에서 오른쪽 클릭 | `AzureDevOps.PullRequest.AnnotateWithPullRequests` |

## diff (변경 내용) 뷰어 내부

| 액션                    | macOS                                              | Windows / Linux                                         | Action ID                                    |
|-------------------------|----------------------------------------------------|---------------------------------------------------------|----------------------------------------------|
| **Mark File as Viewed** | <shortcut>⌘⇧S</shortcut>                           | <shortcut>Ctrl+Shift+S</shortcut>                       | `AzureDevOps.PullRequest.MarkFileAsViewed`   |
| **Add Review Comment**  | <shortcut>⌃⇧M</shortcut>                           | <shortcut>Ctrl+Shift+M</shortcut>                       | `AzureDevOps.PullRequest.AddCommentAtCursor` |
| **Copy Link to Code**   | <shortcut>⌘⇧L</shortcut>                           | <shortcut>Ctrl+Shift+L</shortcut>                       | `AzureDevOps.PullRequest.CopyCodeLink`       |
| 다음 / 이전 변경 범위   | <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut> | <shortcut>F7</shortcut> / <shortcut>Shift+F7</shortcut> | *IntelliJ 내장 diff*                         |
| **다음 / 이전 댓글**    | <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut> | <shortcut>F8</shortcut> / <shortcut>Shift+F8</shortcut> | *뷰 내부 키*                                 |

> <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut>은 **사람의 스레드, 대기 중인 초안, AI 제안**을 위에서 아래로 이어지는 하나의 읽기 순서로 이동합니다. diff에는 의도적으로 <shortcut>J</shortcut>/<shortcut>K</shortcut> 별칭이 없습니다 - IdeaVim 이동을 위해 비워 두었습니다. **AI 제안 카드**에 포커스가 있는 동안 <shortcut>A</shortcut>는 리뷰에 추가하고 <shortcut>D</shortcut>는 버립니다.
> {style="tip"}

## 댓글 작성기 내부

댓글, 답글, PR 설명 편집기에 포커스가 있는 동안 동작합니다. 작성기에 내장되어 있으며 (Keymap에 없음), 수정자 키를 제외하면 모든 플랫폼에서 동일합니다.

| 액션                                | macOS                    | Windows / Linux                   |
|-------------------------------------|--------------------------|-----------------------------------|
| **Bold**                            | <shortcut>⌘B</shortcut>  | <shortcut>Ctrl+B</shortcut>       |
| **Italic**                          | <shortcut>⌘I</shortcut>  | <shortcut>Ctrl+I</shortcut>       |
| **Inline code**                     | <shortcut>⌘E</shortcut>  | <shortcut>Ctrl+E</shortcut>       |
| **Insert link**                     | <shortcut>⌘K</shortcut>  | <shortcut>Ctrl+K</shortcut>       |
| **Mention user** (`@`)              | <shortcut>⇧⌘M</shortcut> | <shortcut>Ctrl+Shift+M</shortcut> |
| **Bulleted list**                   | <shortcut>⇧⌘8</shortcut> | <shortcut>Ctrl+Shift+8</shortcut> |
| **Numbered list**                   | <shortcut>⇧⌘7</shortcut> | <shortcut>Ctrl+Shift+7</shortcut> |
| **Task list**                       | <shortcut>⇧⌘9</shortcut> | <shortcut>Ctrl+Shift+9</shortcut> |
| **Paste image**                     | <shortcut>⌘V</shortcut>  | <shortcut>Ctrl+V</shortcut>       |
| **Submit** (Comment / Reply / Save) | <shortcut>⌘↵</shortcut>  | <shortcut>Ctrl+Enter</shortcut>   |
| **Cancel / close editor**           | <shortcut>⎋</shortcut>   | <shortcut>Esc</shortcut>          |

> 비슷하지만 역할이 다른 두 단축키: **Mention user**(<shortcut>⇧⌘M</shortcut>)는 작성기 *내부*에 `@mention`을 삽입하고, **Add Review Comment**
> (<shortcut>⌃⇧M</shortcut>)는 편집기나 diff에서 캐럿 위치에 새 댓글을 *시작*합니다.
> {style="note"}

## 이미지 미리 보기 내부

댓글에 게시된 이미지를 클릭하면 확대/축소가 가능한 뷰어에서 열립니다. 이 키들은 대화 상자에 내장되어 있어 모든 플랫폼에서 동일합니다.

| 액션                   | 단축키                                            |
|------------------------|---------------------------------------------------|
| **Fit to window**      | <shortcut>F</shortcut> / <shortcut>0</shortcut>   |
| **Actual size**(100 %) | <shortcut>1</shortcut>                            |
| **Zoom in / out**      | <shortcut>+</shortcut> / <shortcut>-</shortcut>   |
| **이미지 이동(pan)**   | 화살표 키                                         |
| **닫기**               | <shortcut>⎋</shortcut> / <shortcut>Esc</shortcut> |

> 마우스로도 가능합니다: <shortcut>⌘</shortcut> / <shortcut>Ctrl</shortcut> + 휠은 포인터 방향으로 확대/축소하고, 일반 휠은 스크롤하며, 드래그하면 이미지가
> 이동합니다. [토론 및 댓글](Discussions-and-Comments-ko.md#images-and-attachments)을 참조하세요.
> {style="tip"}

## PR 목록, 타임라인, 상세 보기 내부 {id="in-the-pr-list-timeline-and-detail-view"}

![키보드 단축키가 표시된 Pull Requests 도구 창](pr-tool-window-shortcuts-ko.png){ width="720" border-effect="line" thumbnail="true" }

| 액션                                     | 단축키                                                                          | Action ID                                     |
|------------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------|
| **Refresh List**                         | <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> | `AzureDevOps.PullRequest.List.Reload`         |
| **Refresh Timeline**                     | <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut> | `AzureDevOps.PullRequest.Timeline.Update`     |
| **Refresh Pull Request**                 | <shortcut>F5</shortcut>                                                         | `AzureDevOps.PullRequest.Details.Reload`      |
| **View Pull Request**                    | <shortcut>Enter ↵</shortcut> / 더블 클릭 *(목록에서)*                           | `AzureDevOps.PullRequest.Show`                |
| **View Pull Request in Browser**         | *기본값 없음*                                                                   | `AzureDevOps.PullRequest.Open.Link`           |
| **Copy Pull Request URL**                | *기본값 없음*                                                                   | `AzureDevOps.PullRequest.Copy.Link`           |
| **Show Pull Request in the Tool Window** | *기본값 없음*                                                                   | `AzureDevOps.Pull.Request.Show.In.Toolwindow` |

> Pull Requests 도구 창에는 Reload 버튼이 없습니다 - 새로 고침은 키보드로만 하거나 (또는 우클릭 → **Refresh List**) 가능합니다.
> {style="note"}

## 통계 뷰 내부 {id="in-the-statistics-views"}

**PR Statistics**와 **Pipelines Analytics** 편집기 탭에도 Refresh 버튼이 없습니다. 둘 중 하나에 포커스가 있는 동안
<shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut>로 수치를 다시 가져오며, 우클릭 →
**Refresh Statistics**도 같은 동작을 합니다. 이는 뷰 내부 키(뷰에 내장되어 있으며 Keymap에 없음)입니다 - 새로 고침
단축키는 항상 포커스가 있는 뷰를 새로 고치므로, 같은 키가 현재 위치에 따라 PR 목록, 파이프라인 목록, 통계 탭 또는 PR
타임라인을 다시 로드합니다.

## PR 타임라인 내부 {id="in-the-pr-timeline"}

이 키들은 **View Timeline** 편집기를 조작하며 해당 편집기에 포커스가 있을 때 동작합니다. 작성기 키처럼 내장되어 있습니다 (Keymap에 없음). 언제든지 <shortcut>?</shortcut>를
누르면 같은 목록이 표시됩니다.

| 액션                                       | 단축키                                                |
|--------------------------------------------|-------------------------------------------------------|
| **Next unresolved thread**                 | <shortcut>F8</shortcut> / <shortcut>J</shortcut>      |
| **Previous unresolved thread**             | <shortcut>⇧F8</shortcut> / <shortcut>K</shortcut>     |
| 포커스된 스레드 **Resolve / reopen**       | <shortcut>R</shortcut>                                |
| 포커스된 스레드에 **Reply**                | <shortcut>A</shortcut>                                |
| **Start a new comment**                    | <shortcut>C</shortcut>                                |
| 해결된 스레드 **Collapse / show resolved** | <shortcut>H</shortcut>                                |
| **View AI review comments**                | <shortcut>I</shortcut>                                |
| **Find in timeline**                       | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut> |
| **Show this list**                         | <shortcut>?</shortcut>                                |

> **View AI review comments**(<shortcut>I</shortcut>)는 diff에서 첫 번째 AI 제안으로 이동합니다 - AI 리뷰 댓글은 diff 인레이로 렌더링되며, 인레이 자체의
> 화살표로 나머지를 단계별로 이동합니다. 먼저 AI 리뷰가 실행되어 있어야 합니다. [](AI-Features-ko.md)을 참조하세요.
> {style="tip"}

## 파이프라인 실행 편집기 내부

실행 개요 (**Pipelines** 도구 창에서 열림)에는 자체 키가 있으며, 언제든지 <shortcut>?</shortcut>를 누르거나 스테이지 그래프 도구 모음의 **?** 버튼으로 표시할 수 있습니다.
내장되어 있으며 Keymap에 없습니다.

| 액션                                    | 단축키                                                                   |
|-----------------------------------------|--------------------------------------------------------------------------|
| **View logs / back** 스테이지 그래프로  | <shortcut>L</shortcut>                                                   |
| **Previous / next tab**                 | <shortcut>[</shortcut> / <shortcut>]</shortcut>                          |
| 스테이지 그래프 **Zoom in / out / fit** | <shortcut>=</shortcut> / <shortcut>-</shortcut> / <shortcut>0</shortcut> |
| **Open this run in the browser**        | <shortcut>B</shortcut>                                                   |
| **Filter tests** (Tests 탭)             | <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>                    |
| **Show this list**                      | <shortcut>?</shortcut>                                                   |

> 작업의 **logs** 안에서는 <shortcut>⌘F</shortcut> / <shortcut>Ctrl+F</shortcut>가 대신 로그 검색 표시줄을 엽니다 (모든 단계에 걸쳐 찾기).
> {style="note"}

## 브랜치 위젯 / VCS 메뉴

| 액션                              | 단축키                                                       | Action ID                                          |
|-----------------------------------|--------------------------------------------------------------|----------------------------------------------------|
| **Open Current Branch PR**        | *기본값 없음*                                                | `AzureDevOps.OpenCurrentBranchPr`                  |
| **Update to Enable Review Mode…** | *기본값 없음*                                                | `AzureDevOps.Pull.Request.Branch.Update`           |
| **Review Mode**                   | *기본값 없음*                                                | `AzureDevOps.Pull.Request.Review.In.Editor.Toggle` |
| **Go to Pull Requests…**          | <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut> | `AzureDevOps.PullRequest.GoTo`                     |
| **Go to Pipeline…**               | <shortcut>⌥⇧P</shortcut> / <shortcut>Alt+Shift+P</shortcut>  | `AzureDevOps.Pipelines.GoTo`                       |
| **Open Commit in Azure DevOps**   | *기본값 없음*                                                | `AzureDevOps.Commit.OpenInBrowser`                 |
| **Copy Azure DevOps Commit Link** | *기본값 없음*                                                | `AzureDevOps.Commit.CopyLink`                      |
| **Find Related Pull Requests**    | *기본값 없음*                                                | `AzureDevOps.Commit.FindPullRequests`              |

> 기본적으로 두 **Go to** 액션은 플러그인 자체의 퀵픽 대화 상자를 엽니다 - **Pull Requests** 탭과 **Pipelines** 탭이 있는
> 하나의 창으로, 누른 단축키에 해당하는 탭에서 시작합니다. [Navigation 설정 페이지](Settings-ko.md#page-navigation)에서
> **Show Go to Pull Requests and Go to Pipeline in Search Everywhere**를 켜면 대신 IDE의 *Search Everywhere*가 열리며, 같은
> 탭은 **Shift**를 두 번 (<shortcut>⇧⇧</shortcut>) 눌러도 나타납니다. [풀 리퀘스트](Pull-Requests-ko.md#jump-to-a-specific-pr)를 참조하세요.
> {style="tip"}

## AI 액션

| 액션                                | 단축키        | Action ID                              |
|-------------------------------------|---------------|----------------------------------------|
| **Summarize Pull Request**          | *기본값 없음* | `AzureDevOps.PullRequest.AI.Summarize` |
| **Run AI Review**                   | *기본값 없음* | `AzureDevOps.PullRequest.AI.Review`    |
| **Explain This File**               | *기본값 없음* | `AzureDevOps.PullRequest.AI.Explain`   |
| **Generate Commit Message with AI** | *기본값 없음* | `AzureDevOps.AI.GenerateCommitMessage` |
| **Analyze Logs with AI**            | *기본값 없음* | `AzureDevOps.Pipelines.AI.AnalyzeLogs` |

이 기능들은 AI 공급자가 구성되어 있어야 합니다 - [](AI-Features-ko.md)을 참조하세요.

## 재바인딩 방법 {id="rebind"}

위의 **IDE 액션**(Action ID가 있는 항목)만 재바인딩할 수 있습니다 - **뷰 내부 키**(댓글 작성기, PR 타임라인, 이미지 미리 보기, 파이프라인 실행 편집기, 통계 뷰, 도구 창의 검색 필드)는 고정되어 있습니다.

<procedure title="단축키 바인딩하기">
    <step><ui-path>Settings | Keymap</ui-path>을 엽니다.</step>
    <step>검색 상자에 <code>AzureDevOps</code>를 입력하여 플러그인 액션으로 필터링합니다(표시 이름뿐 아니라 액션 ID도 일치합니다).</step>
    <step>액션을 더블 클릭 → <b>Add Keyboard Shortcut</b>.</step>
    <step>조합을 누릅니다. 충돌하면 IntelliJ가 경고하고 충돌을 제거할지 제안합니다.</step>
    <step><b>OK</b>를 클릭합니다.</step>
</procedure>

> 두 개의 **도구 창** 단축키도 IDE 액션이지만, 해당 ID (`ActivatePullRequestsWindowToolWindow` / `ActivatePipelinesWindowToolWindow`)에는
> `AzureDevOps`가 포함되어 있지 않습니다 - **Pull Requests** 또는 **Pipelines**로 검색하여 찾고 재바인딩하세요.
> {style="note"}

> 버그를 신고할 때는 **action ID** 열을 사용하세요 - 표시 이름이 다를 수 있는 IDE 버전 전반에서 정확한 액션을 식별해 줍니다.
> {style="tip"}
