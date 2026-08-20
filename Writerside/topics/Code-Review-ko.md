# 코드 리뷰

<tldr>
    <p><b>위치</b>: PR을 연 뒤 <b>변경된 파일 트리</b>에서 파일을 클릭하세요.</p>
    <p><b>댓글</b>: diff 여백 (gutter)의 <b>+</b>, 또는 <shortcut>⌃⇧M</shortcut> / <shortcut>Ctrl+Shift+M</shortcut>.</p>
    <p><b>제출</b>: diff의 <b>Review:</b> 도구 모음에 있는 <b>Submit</b> 버튼에 투표 옵션이 있습니다.</p>
</tldr>

IntelliJ의 기본 diff (변경 내용) 뷰어로 풀 리퀘스트를 리뷰합니다. 변경 내용을 읽고, 인라인 댓글과 제안을 남기고, 투표하고, 확인한 파일을 추적합니다.

## 상세 보기

PR을 열면 닫을 수 있는 에디터 탭이 생성됩니다. 하위 탭이 없는 **단일 창**입니다. 위에서 아래로: 제목과 `!`-번호에 딸린 **View Timeline** 링크, 소스 → 대상 브랜치, 상태 체크 (CI,
충돌, 필수 리뷰어와 그들의 투표), **변경된 파일 트리**, 그리고 액션 바 순서입니다.

![변경된 파일 트리, 상태 체크, 액션 바가 있는 단일 창 상세 보기의 풀 리퀘스트](pr-detail-view.png){ width="720" border-effect="line" thumbnail="true" }

- **변경된 파일**은 트리에 있습니다. 파일을 클릭하면 diff가 열립니다.
- **Discussion**은 **View Timeline** 링크를 통해 자체 탭에서 열립니다. [](Discussions-and-Comments-ko.md)을 참조하세요.
- **투표와 액션**은 액션 바와 오버플로 메뉴에 있습니다. [풀 리퀘스트](Pull-Requests-ko.md#open-and-act-on-a-pr)를 참조하세요.

## diff 읽기

파일을 클릭하면 PR당 하나의 탭에서 diff가 열립니다. 다른 파일을 클릭하면 같은 자리에서 교체되므로, <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut>로 PR 전체의
모든 변경 범위를 하나씩 넘어갈 수 있습니다. diff 탭에는 **Refresh**, **Submit review**, **Previous / Next Comment**가 있는 **Review:** 도구 모음이 함께
표시됩니다.

| 이동                  | macOS                                              | Windows / Linux                                         |
|-----------------------|----------------------------------------------------|---------------------------------------------------------|
| 다음 / 이전 변경 범위 | <shortcut>F7</shortcut> / <shortcut>⇧F7</shortcut> | <shortcut>F7</shortcut> / <shortcut>Shift+F7</shortcut> |
| 다음 / 이전 댓글      | *Review: 도구 모음*                                | *Review: 도구 모음*                                     |

### 이미지, PDF 및 기타 바이너리 {collapsible="true"}

PR이 건드린 바이너리 파일도 같은 diff 탭에서 열리지만, 무엇이 렌더링되는지는 형식에 따라 다릅니다:

- **이미지**(`png`, `jpg`, `gif`, …)는 IDE의 진짜 나란히 보기 이미지 diff로 열립니다 - 두 리비전 모두 바이트 그대로 가져오므로 전달 과정에서 손상되는 것이 없습니다.
- **PDF와 그 밖의 불투명한 바이너리**에는 diff 렌더러가 아예 없습니다. 플랫폼의 죽은 *"Cannot show file"* 패널 대신, 플러그인은 카드를 표시합니다 - *"This is a binary
  file - the IDE has no editor that can preview it."* - 여기에는 PR의 리비전을 OS 기본 앱 (Preview, Acrobat, …)에 넘기는 **Open in
  System Viewer** 버튼, base 쪽을 여는 **Open previous version** 링크, 그리고 PDF의 경우 **Install the PDF Viewer plugin to preview
  PDFs inside the IDE**가 있습니다. 그 플러그인을 설치하면 diff 탭을 포함해 IDE 안에서 PDF가 렌더링됩니다. PR이 *삭제한* 파일의 경우 버튼은 **Open Previous
  Version**으로 표시됩니다 - 보여 줄 head 쪽이 없기 때문입니다.

변경 트리에서 파일을 오른쪽 클릭 → **Open Repository Version**을 선택하면 트리에서 같은 일을 할 수 있습니다. PR의 리비전을 일반 편집기 탭에서 열고, 해당 형식을 처리할 편집기가 설치되어
있지 않으면 시스템 뷰어로 대체합니다. PR이 건드린 바이너리를 실제로 볼 수 있는 유일한 방법입니다.

### 스레드 표시 또는 숨기기

diff의 여백 (gutter) 오른쪽 클릭 메뉴에서 - **Toggle Diff Aligning Mode** 바로 위에 있는 - **Review Discussions** 메뉴는 어떤 인라인 스레드를 렌더링할지
제어합니다: **Show all discussions**, **Show only unresolved**, 또는 **Don't show**.

## 한 줄에 댓글 달기

<procedure title="인라인 댓글 추가하기">
    <step>변경된 줄의 여백에 마우스를 올리면 <b>+</b>가 나타납니다. 이를 클릭하세요(또는 줄 번호를 가로질러 드래그하면 범위를 지정할 수 있습니다). 캐럿 위치에서 <shortcut>⌃⇧M</shortcut> / <shortcut>Ctrl+Shift+M</shortcut>을 눌러도 됩니다.</step>
    <step>댓글을 입력하세요. 편집기(composer)는 PR 토론과 동일한 것입니다. 상단에 서식 도구 모음이 있는 <b>Write</b> / <b>Preview</b> 탭 스트립과 @멘션, 이미지 붙여넣기를 지원합니다. 편집기 전체에 대한 내용은 <a href="Discussions-and-Comments-ko.md"/>을 참조하세요.</step>
    <step>분할 제출 버튼으로 게시하세요. 기본 액션은 <b>Start Review</b>로, 댓글을 보류 중인 리뷰의 일부로 대기열에 넣습니다. 드롭다운에는 <b>Add Single Comment</b>(즉시 게시)와 <b>Suggest change</b>(선택 영역을 작성자가 적용할 수 있는 제안된 변경으로 감싸기)가 있습니다.</step>
</procedure>

![diff 뷰어에 나란히 놓인 새 인라인 댓글과 기존 스레드](inline-diff-comment.png){ width="720" border-effect="line" thumbnail="true" }

> **보류 중인 리뷰.** 대기열에 넣은 댓글은 투표와 함께 제출할 때까지 초안 상태로 유지됩니다 (**Submit (N)** 버튼에 개수가 표시됨). **Review:** 도구 모음이나 오버플로 메뉴의
> **Submit Pending Comments**에서 제출하세요.
> {style="note"}

### 코드 링크 복사

줄을 마우스 오른쪽 버튼으로 클릭하고 **Copy / Paste Special → Copy Link to Code**를 선택하면 해당 코드 (파일, 줄, 열 범위)에 대한 Azure DevOps 웹 딥링크가
복사됩니다. 이는 웹 UI의 **Copy link**가 생성하는 것과 동일한 링크입니다. 텍스트를 선택한 상태에서는 항목이 **Copy Link to Selected Code**로 표시되어 정확한 문자 범위를
링크하고, 선택하지 않은 상태에서는 캐럿 위치의 줄 전체 링크를 복사합니다. 단축키는 <shortcut>⌘⇧L</shortcut> / <shortcut>Ctrl+Shift+L</shortcut>입니다.

리뷰 중일 때뿐만 아니라 연결된 리포지토리 어디에서나 사용할 수 있습니다:

- **PR 리뷰 중**(diff 뷰어 또는 에디터 리뷰 화면)에는 링크가 풀 리퀘스트의 **Files** 탭을 가리킵니다.
- **일반 에디터**(연결된 리포지토리의 아무 파일)에서는 링크가 현재 브랜치의 해당 파일을 가리킵니다.

> Azure DevOps 리모트가 있는 리포지토리 밖의 파일에서는 이 항목이 숨겨지므로, 무관한 프로젝트에서 메뉴를 어지럽히지 않습니다.
> {style="note"}

## 투표

액션 바의 **Approve** 버튼은 분할 버튼입니다. 드롭다운에는 **Approve with suggestions**, **Wait for author**, **Request changes**, **Reset
feedback**가 있습니다.

투표하려고 diff를 떠날 필요는 없습니다. diff의 **Review:** 도구 모음에 있는 **Submit** 버튼에도 같은 목록이 있으므로, 마지막으로 읽던 파일에서 그대로 리뷰를 마칠 수 있습니다.

![diff의 Review 도구 모음에 있는 Submit 버튼의 투표 메뉴](vote-dropdown.png){ width="700" border-effect="line" }

병합 전략을 포함한 PR 완료 또는 취소는 [풀 리퀘스트](Pull-Requests-ko.md#complete-a-pull-request)에서 다룹니다.

## 확인한 파일 추적

대규모 PR의 경우 진행하면서 각 파일을 **viewed**로 표시하세요. 확인한 파일은 변경 트리에서 흐리게 표시됩니다.

- <shortcut>⌘⇧S</shortcut> / <shortcut>Ctrl+Shift+S</shortcut>를 누르거나, 마우스 오른쪽 버튼 클릭 → **Mark File as Viewed**를 선택하세요.
- 여러 파일을 선택한 상태에서 마우스 오른쪽 버튼을 클릭하면 **Mark All as Viewed**를 사용할 수 있습니다.
- 폴더에도 체크박스가 있습니다 (마우스를 올리면 표시됩니다). 한 번 클릭하면 하위의 모든 파일이 viewed로 표시되고, 모두 체크된 폴더를 클릭하면 일괄 해제됩니다. 사각형 (중간 상태) 표시는 하위 파일 중
  일부만 확인했다는 뜻입니다.

![변경 트리에서 viewed로 체크된 두 개의 파일](files-viewed.png){ width="720" border-effect="line" thumbnail="true" }

> 파일을 열 때 자동으로 viewed로 표시되게 하고 싶으신가요? [](Settings-ko.md)에서 **Mark files as viewed when I open their diff**를 켜세요
> (기본값은 꺼짐).
> {style="tip"}

## 업데이트 이후 변경된 내용만 리뷰 {id="compare"}

작성자가 새 커밋을 푸시하면 PR 전체를 다시 읽을 필요가 없습니다. 변경 트리를 좁히는 컨트롤은 두 가지이며, 좁히는 단위가 서로 다릅니다:

| 컨트롤                     | 위치                                 | 좁히는 단위                                                                                                            |
|----------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Review Changes Since…**  | 액션 바의 **⋮**(More) 메뉴           | 선택한 **업데이트**(소스 브랜치로의 푸시 한 번) 이후에 들어온 모든 것. 그 사이에 병합된 대상 브랜치 커밋은 걸러집니다. |
| **Changes from N commits** | 도구 창에서 변경 트리 위에 있는 링크 | 한 번에 **커밋** 하나씩, 그 부모와 비교해 표시됩니다. 옆의 위 / 아래 화살표로 PR의 커밋을 차례로 넘어갑니다.           |

동료의 최신 푸시를 다시 리뷰하려면 **업데이트**를, 변경 하나만 따로 읽으려면 **커밋**을 고르세요. 둘은 서로에 대한 필터가 아닙니다 - 커밋을 고르면 업데이트 범위가 해제되고, 그 반대도 마찬가지입니다.

### 업데이트로 범위 좁히기

투표 버튼 옆의 **⋮**(More) 메뉴를 엽니다. 이 액션은 PR에 업데이트가 두 개 이상 있을 때 나타납니다.

![풀 리퀘스트 액션 바에서 투표 버튼 옆에 있는 More 메뉴 버튼](review-since-update-1.png){ width="380" border-effect="line" }

**Review Changes Since…**를 선택합니다.

![Review Changes Since…가 선택된 상태로 열린 More 메뉴](review-since-update-2.png){ width="520" border-effect="line" }

비교할 업데이트를 고릅니다. 현재 범위에는 ✓ 표시가 붙고, 최근 업데이트 위에 고정된 **All changes (N)**로 전체 풀 리퀘스트로 돌아갈 수 있습니다.

![검색 필드, 맨 위의 All changes, 그 아래의 최근 업데이트가 있는 업데이트 선택기](review-since-update-3.png){ width="440" border-effect="line" }

업데이트가 범위인 동안에는 트리 위에 *"Reviewing only what changed since update N"* 배너가 표시됩니다. **Show all changes**를 클릭하면 전체 PR로 돌아갑니다.

### 커밋 하나로 범위 좁히기

변경 트리 위의 **Changes from N commits**를 클릭해 커밋을 고르면, 트리와 거기서 여는 모든 diff가 그 커밋만 부모와 비교해 보여 줍니다. 링크 옆의 **위 / 아래** 화살표는 PR의 커밋을
순서대로 오가며, 첫 커밋에서 더 뒤로 가면 전체 diff로 돌아갑니다 - **All commits**를 골라도 마찬가지입니다.

> 어느 쪽이든 댓글은 그대로입니다. 범위를 좁히면 보이는 파일과 줄이 달라질 뿐, 존재하는 스레드가 바뀌지는 않습니다.
> {style="note"}

## 에디터에서 리뷰하기

PR의 소스 브랜치가 체크아웃되어 있으면, diff 탭 없이 일반 에디터에서 변경된 줄에 바로 댓글을 달 수 있습니다. [에디터에서 리뷰](Review-in-Editor-ko.md)를 참조하세요.
