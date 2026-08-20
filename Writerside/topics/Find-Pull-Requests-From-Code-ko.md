# 코드에서 풀 리퀘스트 찾기

<tldr>
    <p><b>위치</b>: 줄에서 오른쪽 클릭 → <b>Open In</b> → <b>Find Pull Request</b>. 파일 전체는 줄 번호 여백(gutter)에서 오른쪽 클릭 → <a anchor="annotate">Annotate with Pull Requests</a>.</p>
</tldr>

코드 리뷰는 "이 변경을 반영해도 될까?"에 답합니다. 6개월이 지나면 질문은 정반대가 됩니다. **이 줄은 왜 이렇게 되어 있을까?** %product%은 (는) 편집기에서 바로 답을 줍니다 - 해당 줄을
blame하고, 그 줄을 가져온 풀 리퀘스트를 찾고, 파일을 벗어나지 않고 그 PR의 토론 전체를 엽니다.

들어가는 방법은 세 가지이며, 모두 동일한 조회를 기반으로 합니다:

| 원하는 것                    | 사용할 액션                        | 위치                                     |
|------------------------------|------------------------------------|------------------------------------------|
| **이 한 줄** 뒤의 PR         | **Find Pull Request**              | 오른쪽 클릭 → **Open In**                |
| 어딘가에 붙여넣을 그 **URL** | **Copy Pull Request URL for Line** | 오른쪽 클릭 → **Copy / Paste Special**   |
| **모든 줄**의 PR을 한 번에   | **Annotate with Pull Requests**    | **줄 번호 여백(gutter)**에서 오른쪽 클릭 |

> 세 가지 모두 [](Settings-ko.md)의 **Find the pull request behind a line of code**(기본값 켜짐)로 제어됩니다. 또한 계정에 로그인되어 있고 파일이
> Azure DevOps 원격이 있는 Git 리포지토리에 있을 때만 표시되므로, 무관한 프로젝트에서 메뉴를 어지럽히는 일이 없습니다. 셋 중 어느 것도 기본 키보드 단축키와 함께 제공되지
> 않습니다. [Keymap](Keyboard-Shortcuts-ko.md#rebind)에서 직접 바인딩하세요.
> {style="note"}

## Find Pull Request

캐럿을 줄 위에 놓고 **오른쪽 클릭 → Open In → Find Pull Request**를 선택하세요.

그다음에 일어나는 일은 조회 결과에 따라 달라집니다:

| 결과                    | 표시되는 것                                                                                                                                                                   |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **풀 리퀘스트 1개**     | 곧바로 **IDE에서** 열립니다 - 상세 보기와 타임라인. 팝업도, 브라우저도 없습니다.                                                                                              |
| **풀 리퀘스트 여러 개** | *Pull requests containing &lt;short SHA&gt;* 제목의 팝업이 목록을 표시하며, 완료된 PR이 먼저, 그다음 최신순입니다. 마지막 행에서는 **Open commit … in browser**를 제공합니다. |
| **풀 리퀘스트 없음**    | 커밋 자체가 브라우저에서 열립니다 - 해당 줄이 PR 도입 이전 것이거나 직접 푸시로 들어온 경우입니다.                                                                            |

## Copy Pull Request URL for Line

동일한 조회이지만 결과가 클립보드에 담깁니다: **오른쪽 클릭 → Copy / Paste Special → Copy Pull Request URL for Line**. `…/pullrequest/<id>`와
*Pull request URL copied* 확인 메시지를 받습니다.

**Find Pull Request**와 의도적으로 다른 점이 두 가지 있습니다:

- 해당 줄을 가져온 PR이 **없으면** 오류 힌트 (*No pull request introduced this line*)가 표시됩니다 - 커밋 페이지로 조용히 대체되지 **않습니다**. 사용자가 요청한 것은
  PR URL인데 그런 PR이 없기 때문입니다.
- 결과가 여러 개일 때의 팝업에는 같은 이유로 *Open commit in browser* 행이 없습니다.

> **Copy Link to Code와는 다릅니다.** *Copy Link to Code*(<shortcut>⌘⇧L</shortcut> / <shortcut>Ctrl+Shift+L</shortcut>, 같은
> **Copy / Paste Special** 메뉴에 있음)는 **선택한 코드**로 연결합니다 - 리뷰 중인 PR 안에서도, 연결된 리포지토리의 아무 파일에서도 사용할 수 있습니다. *Copy Pull Request
URL for Line*은 반대 질문에 답합니다 - **어떤 PR**이 이 줄을 가져왔는가 - 그리고 줄 앵커 없이 PR 자체를 가리킵니다. [](Code-Review-ko.md)를 참조하세요.
> {style="note"}

## Annotate with Pull Requests {id="annotate"}

파일 전체 보기입니다. **줄 번호 여백 (gutter)에서 오른쪽 클릭 → Annotate with Pull Requests** - Git 자체의 *Annotate with Git Blame*이 들어 있는 바로 그
메뉴이며 작동 방식도 같습니다. 줄 번호 옆에 한 줄당 하나의 항목이 있는 열이 나타납니다.

이 열은 **풀 리퀘스트 id** - `!1234` - 만 표시하고 그 외에는 아무것도 표시하지 않습니다. 작성자도, 날짜도, SHA도 없습니다. 줄마다 하나의 질문에만 답하므로, 작업하는 동안 켜 둘 수 있을 만큼
좁게 유지됩니다.

- 행 위에 **마우스를 올리면** 요약 카드가 나타납니다: 상태, 제목, 개설자, 브랜치, 그리고 리뷰어 (아바타 최대 5개, 그 뒤로 `+N`).
- 행을 **클릭하면** 해당 풀 리퀘스트가 IDE에서 열립니다.
- 커밋이 어떤 풀 리퀘스트에도 속하지 않는 줄은 SHA를 표시하는 대신 **비어 있습니다** - 비어 있다는 것은 "이 줄을 가져온 PR이 없다"는 뜻이며, 그것이 정직한 답입니다.
- 한 줄의 커밋이 여러 PR에 속하는 경우, 열은 그 줄을 가장 잘 설명할 가능성이 높은 PR을 표시합니다. 완료된 것 먼저, 그다음 최신순입니다.

같은 여백 메뉴에서 끌 수 있습니다 (켜져 있는 동안에는 체크 표시가 붙습니다).

> **줄을 추가하거나 삭제하면 스스로 닫힙니다.** 이 열은 줄 번호를 기준으로 하므로, 줄을 밀어내는 편집이 일어나면 모든 행이 엉뚱한 풀 리퀘스트를 가리키게 됩니다. 거짓말을 하는 대신 열이 꺼집니다 - 편집이
> 끝나면 다시 켜세요. 줄 *안에서* 타이핑하는 것은 괜찮으며 열은 그대로 열려 있습니다.
> {style="warning"}

파일 전체를 blame하는 것은 `git blame` 한 번과 일괄 조회 한 번이므로, 로드되는 동안 진행 표시기 ("Looking up pull requests for this file…")가 실행됩니다. 한
줄짜리 액션들은 훨씬 저렴하며 진행 UI를 표시하지 않습니다.

## 조회가 작동하는 방식 {id="how-it-works"}

아래의 모든 엣지 케이스를 설명해 주므로 알아 둘 만합니다:

<procedure title="캐럿에서 풀 리퀘스트까지">
    <step>플러그인이 해당 줄에 대해 로컬에서 <b>git blame</b>을 실행하여 그 줄을 마지막으로 변경한 커밋을 얻습니다.</step>
    <step>Azure DevOps에 그 커밋을 포함하는 풀 리퀘스트를 묻습니다 - 하나의 요청에 <b>두 개</b>의 쿼리를 실어서 보냅니다: 하나는 그 커밋을 PR의 <b>소스 커밋</b>으로, 다른 하나는 PR의 <b>병합 커밋</b>으로 조회합니다.</step>
    <step>결과는 중복이 제거되고 정렬됩니다: 완료된 풀 리퀘스트가 먼저, 그다음 최신순입니다.</step>
</procedure>

양쪽으로 모두 묻는 것이 완료 전략 전반에서 이 기능을 신뢰할 수 있게 만듭니다. PR이 **merge**되었다면 blame은 그 PR의 원래 커밋 중 하나를 봅니다. **squash**되었다면 그 커밋들은 대상
브랜치에 도달한 적이 없고 blame은 squash 커밋만 볼 수 있습니다. 쿼리가 하나뿐이라면 히스토리의 절반을 놓치게 되지만, 둘을 모두 사용하면 merge, squash, rebase를 똑같이 잡아냅니다.

캐시는 전혀 사용하지 않습니다 - 호출할 때마다 다시 blame하고 다시 쿼리하므로, 답은 항상 현재 파일과 현재 서버 상태를 반영합니다.

## 엣지 케이스와 메시지

실패는 풍선 알림이나 대화 상자가 아니라 항상 **캐럿 위치의 힌트**로 표시됩니다:

| 메시지                                                                                          | 의미                                                                                                                            |
|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| **This line has no committed history yet**                                                      | 해당 줄이 커밋되지 않았습니다 - 방금 입력했거나 스테이징되지 않은 변경의 일부입니다. 조회할 커밋이 없습니다.                    |
| **No pull request introduced this line**                                                        | 커밋은 존재하지만 그것을 포함하는 PR이 없습니다(직접 푸시이거나, PR 프로세스보다 오래된 히스토리). *Copy URL*에서만 표시됩니다. |
| **This file isn't in a repository with an Azure DevOps remote**                                 | 파일이 플러그인이 인식하는 Git 리포지토리 아래에 있지 않습니다.                                                                 |
| **This repository belongs to a different Azure DevOps organization than the connected account** | 원격이 다른 조직을 가리킵니다 - 그 조직으로 로그인하거나 계정을 전환하세요.                                                     |
| **Connect an Azure DevOps account to look up pull requests**                                    | 아직 바인딩된 계정이 없습니다. [](Authentication-ko.md)을 참조하세요.                                                       |
| **Couldn't look up pull requests for this line**                                                | 조회 호출이 실패했습니다 - 보통 오프라인이거나 일시적인 API 오류입니다. 다시 시도하세요.                                        |
| **This file has no committed history yet** *(여백)*                                             | 파일 전체가 추적되지 않거나 완전히 새 파일입니다.                                                                               |
| **No pull request introduced any line of this file** *(여백)*                                   | 모든 줄이 PR 프로세스보다 오래되었거나 직접 푸시로 들어왔습니다.                                                                |

> **blame은 디스크의 파일을 읽습니다.** 캐럿 *위쪽*에 저장하지 않은 편집이 있으면 플러그인이 blame하는 줄 번호는 저장된 쪽 기준이므로, 엉뚱한 줄을 가리킬 수 있습니다. 답이 이상해 보이면 먼저
> 저장하세요.
> {style="warning"}

> 이 액션들은 설계상 **diff (변경 내용) 뷰어** 안에서는 사용할 수 없습니다 - diff는 blame할 로컬 Git 히스토리가 없는 가상 파일을 보여 주기 때문입니다. 일반 편집기에서 사용하세요.
> {style="note"}

## 같은 질문을, 커밋에서 {id="from-commit"}

여기까지는 모두 **줄**에서 출발했습니다. 대신 **커밋**을 보고 있을 때 - Git **Log**의 한 행, **File History**의 항목, 또는 blame 열의 오른쪽 클릭 메뉴 - 에도 같은
조회가 메뉴 항목 하나만큼 가까이 있습니다. **Open Commit in Azure DevOps**, **Copy Azure DevOps Commit Link** 옆의 **Find Related Pull
Requests**입니다.

이 페이지의 줄 액션과 다른 점은 세 가지입니다. 결과가 편집기 힌트가 아니라 알림으로 오고, 이를 제어하는 설정이 없으며, 줄 단위 조회로는 찾을 수 없는 **아직 병합되지 않은** 풀 리퀘스트까지 찾아냅니다. [Git
뷰의 커밋 액션](Git-Integration-ko.md#commit-actions)을 참조하세요.

## 다음 단계 {id="whats-next"}

> **다음 단계:** 찾아낸 PR을 읽으려면 [](Code-Review-ko.md)를, 브랜치가 풀 리퀘스트에 어떻게 매핑되는지는 [](Git-Integration-ko.md)을 참조하세요.
> {style="tip"}
