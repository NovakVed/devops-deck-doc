# 토론 및 댓글

<tldr>
    <p><b>위치</b>: 모든 스레드의 답글 상자 - diff 내 인라인, 타임라인, 편집기 오버레이.</p>
    <p><b>미해결 스레드 살펴보기</b>: <shortcut>F8</shortcut> / <shortcut>⇧F8</shortcut>, 그리고 <a anchor="review-bar">리뷰 바</a> 필터 칩.</p>
</tldr>

IDE를 벗어나지 않고 풀 리퀘스트에서 완전한 대화를 나눠 보세요. 마크다운 편집기, @멘션, 작업 항목 및 PR 참조, 제안 편집, 이미지 첨부, AI 문법 다듬기, 스레드 해결 기능을 제공합니다.

## 스레드가 표시되는 위치

동일한 스레드가 세 곳에 표시됩니다.

- **diff (변경 내용) 내 인라인** - 참조하는 줄에 고정됩니다. [](Code-Review-ko.md)를 참조하세요.
- **타임라인** - 모든 스레드와 PR 이벤트를 시간순으로 보여 줍니다. PR 세부 정보 보기의 **View Timeline** 링크에서 엽니다. (**Find in timeline**으로 검색할 수 있습니다.)
- **편집기 내** - PR의 브랜치를 체크아웃하면 평소 편집기 위에 겹쳐서 표시됩니다. [](Review-in-Editor-ko.md)를 참조하세요.

## 댓글 편집기

모든 댓글 편집기 - 타임라인, diff 인레이, 인라인 편집, Create-PR 설명 - 는 동일한 작성기입니다. **Write | Preview** 탭 스트립이 왼쪽 상단에 있고, 서식 도구 모음이 같은 상단
스트립에 나란히 있으며 (맨 오른쪽에 **Polish grammar &amp; spelling with AI**), 맨 아래 행에는 제출 버튼 왼쪽으로 **Markdown is supported** 와
**Add files** 가 놓입니다.

![Write | Preview 탭과 상단 서식 도구 모음 스트립, 그리고 제출 버튼 옆 맨 아래 행의 Add files 링크가 있는 댓글 작성기](comment-editor.png){ width="640" border-effect="line" }

| 그룹           | 버튼                                                                        |
|----------------|-----------------------------------------------------------------------------|
| **References** | Mention user (`@`), Reference work item (`#`), Reference pull request (`!`) |
| **Formatting** | Heading, Bold, Italic, Inline code, Link                                    |
| **Lists**      | Bulleted, Numbered, Task list                                               |
| **AI**         | **Polish grammar &amp; spelling with AI**                                   |

diff/편집기 인레이에서는 **Insert code suggestion**도 사용할 수 있습니다. 키보드: <shortcut>⌘B</shortcut> 굵게, <shortcut>⌘I</shortcut>
기울임, <shortcut>⌘E</shortcut> 인라인 코드, <shortcut>⌘K</shortcut> 링크, <shortcut>⌘↵</shortcut> 제출 (또는 <shortcut>
Ctrl</shortcut> 조합).

**Preview**를 클릭하면 편집기가 마크다운의 렌더링된 보기로 바뀝니다 - 게시된 댓글에 사용되는 것과 동일한 렌더링이므로 미리 보는 내용이 게시될 내용과 일치합니다. Preview가 표시되는 동안에는 서식
도구 모음이 숨겨집니다. 편집으로 돌아가려면 **Write**를 클릭하세요. 비어 있는 초안은 *Nothing to preview*로 미리 표시됩니다.

맨 아래 행의 **Markdown is supported**는 링크입니다. 클릭하면 Microsoft의 Azure DevOps 마크다운 지침이 브라우저에서 열립니다. 여기에서 실제로 렌더링되는 것 - 작업 목록,
이모지, 크기를 지정한 이미지, 하이라이트된 코드 펜스, 그리고 Azure DevOps가 wiki 전용으로 두는 것 - 은 [](Markdown-ko.md)를 참고하세요.

> **Polish grammar &amp; spelling with AI**는 초안 (또는 선택 영역)을 하나의 실행 취소 가능한 편집으로 제자리에서 다시
> 씁니다. [AI 공급자 구성](AI-Features-ko.md)이 필요하며, AI가 꺼져 있으면 버튼이 숨겨집니다.
> {style="tip"}

## @멘션

**Mention user**를 클릭하거나 `@`를 입력하면 조직 내 사람들의 자동 완성이 열립니다. 화살표 키와 <shortcut>Enter</shortcut>로 한 명을 선택하세요. 멘션된 사용자는 Azure
DevOps 알림을 받습니다.

기존 `@mention`을 클릭하면 해당 사람의 아바타와 이름이 담긴 작은 **author card**가 열립니다. 이메일을 알 수 있는 경우 (PR 작성자 또는 리뷰어), 카드에서 **Copy email**과
**Send email**을 제공합니다.

> @멘션 자동 완성에는 **Identity (Read)** 범위 (PAT) 또는 **Full access**(OAuth)가 필요합니다. [](Authentication-ko.md)을 참조하세요.
> {style="note"}

## 작업 항목 참조 {id="work-items"}

**Reference work item**을 클릭하거나 `#`를 입력하면 작업 항목의 자동 완성이 열립니다 - 가장 최근에 다룬 50개, 또는 유형·ID·제목과 일치하는 키워드 다섯 개까지의 검색
결과입니다. 하나를 선택하면 `#<id>`가 삽입됩니다 (예: `#1234`).

게시된 `#1234`는 **브라우저의 Azure Boards**에서 그 작업 항목을 여는 링크로 렌더링됩니다 - IDE 안에는 작업 항목 보기가 없으므로, `@mention`과 달리 카드를 띄우지 않고
`!567` PR 참조와 달리 IDE에서 열리지도 않습니다. 한 가지 충돌에 주의하세요. 줄 맨 앞에서 `#` 뒤에 숫자가 오면 제목이 아니라 참조입니다.
[](Markdown-ko.md#hash)를 참고하세요.

> 참조는 연결 (association)이 아닙니다. Azure Boards가 추적하고 작업 항목 자체에 표시하는 링크를 만드는 것은 [사이드바](#the-timeline-sidebar)의
> **Work items** 행 (**+**로 연결, 오른쪽 클릭으로 연결 해제)입니다. 댓글이나 설명에 `#1234`를 입력하면 클릭할 수 있는 참조가 생길 뿐, 그 이상은 아닙니다.
> {style="note"}

## 이미지 및 첨부 파일 {id="images-and-attachments"}

이미지를 첨부하는 세 가지 방법:

- **Add files** - 맨 아래 행 (제출 버튼 왼쪽)의 **Add files** 링크를 클릭하여 디스크에서 이미지 파일을 선택합니다.
- 클립보드에서 이미지 **붙여넣기**(<shortcut>⌘V</shortcut> / <shortcut>Ctrl+V</shortcut>).
- 이미지 파일을 편집기로 **끌어서 놓기**.

지원되는 형식은 `png`, `jpg`, `jpeg`, `gif`, `webp`, `bmp`, `svg`입니다. 각 업로드는 *Uploading…* 자리 표시자를 표시한 다음 인라인 마크다운 이미지가 됩니다. 게시된
이미지를 마우스 오른쪽 버튼으로 클릭하면 **Copy Image Link** 또는 **Download Image…**를 사용할 수 있습니다.

게시된 이미지를 **클릭**하면 **Fit to Window**, **Actual Size**, **Zoom In**, **Zoom Out**, **Save Image…**, **Copy Image**, **Open
in Browser**를 갖춘 확대/축소 가능한 뷰어가 열립니다. 뷰 내부 키는 <shortcut>F</shortcut> 창에 맞추기, <shortcut>1</shortcut> 실제 크기, 그리고 확대/축소를
위한 <shortcut>+</shortcut> / <shortcut>-</shortcut>입니다.

> 댓글의 펜스 코드 블록은 **실제 IDE 구문 강조**로 렌더링됩니다 - 펜스에 언어를 표시하면 (` ```kotlin `, ` ```csharp `, ` ```dockerfile `, …) 해당 파일 형식이
> 편집기에서 표시되는 방식 그대로 색이 입혀집니다.
> {style="tip"}

## 제안 편집 {id="suggested-edits"}

변경 사항을 설명하는 대신 구체적인 변경을 제안하려면 **suggestion**을 사용하세요. diff/편집기 인레이에서 **Insert code suggestion**을 클릭하거나 (댓글이 달린 줄을 미리
채웁니다) ```` ```suggestion ```` 블록을 입력하세요.

![Apply Locally 작업이 있는 제안된 변경](suggested-edit.png){ width="560" border-effect="line" }

스레드는 **Apply Locally**(그리고 한 단계로 적용하고 커밋하는 **Commit…**)가 있는 **Suggested change** 카드를 렌더링합니다. Apply는 PR 브랜치가 체크아웃되기 전과
해결된 스레드에서는 비활성화됩니다.

![스레드의 Suggested change 카드. Apply Locally와 Commit…이 함께 표시됨](suggestion-block-ko.png){ width="640" border-effect="line" }

## 답글, 해결 및 스레드 관리

- **Reply** - 후속 내용을 추가합니다. Azure DevOps 스레드는 플랫 구조이므로 답글이 스레드 끝에 추가됩니다.
- **Resolve / Reopen** - 완료되면 스레드를 닫거나 다시 엽니다. 해결된 스레드는 강조가 약화되며, diff 필터가 *Show only unresolved*로 설정되면 숨겨집니다.
- **👍 Thumbs up** - 댓글 본문 아래 반응 행에 있는 좋아요 버튼입니다 (리뷰 스레드에서는 **Reply** / **Resolve**와 공유). 좋아요가 하나 이상 있으면 개수를 표시하고, 좋아요를
  누르면 금색으로 바뀝니다. 툴팁은 **Thumbs up**과 **Remove thumbs up** 사이를 전환합니다.
- **More actions (⋯)** - 댓글 헤더의 오버플로 메뉴입니다. 모든 댓글에서: **Copy link**, **Copy Markdown**, **Quote reply**(댓글을 이 스레드의 답글
  편집기에 `>` 블록 인용으로 삽입). 자신의 댓글에서는 **Edit**와 **Delete**도 사용할 수 있습니다. 메뉴가 열려 있는 동안 각 동작은 한 글자 키로 실행됩니다: <shortcut>
  L</shortcut> Copy link, <shortcut>M</shortcut> Copy Markdown, <shortcut>Q</shortcut> Quote reply, <shortcut>
  E</shortcut> Edit, <shortcut>D</shortcut> Delete.

![답글 작성기가 열린 인라인 스레드](reply-to-thread-ko.png){ width="720" border-effect="line" thumbnail="true" }

### 스레드 상태

해결/미해결 외에도 스레드에는 상태 칩이 있습니다. 이를 클릭하여 (**Change status**) 다음 사이를 전환합니다.

| 상태          | 의미                             |
|---------------|----------------------------------|
| **Active**    | 새 스레드(칩이 표시되지 않음).   |
| **Pending**   | 작성자의 변경을 기다리는 중.     |
| **Resolved**  | 변경이 적용됨.                   |
| **Won't fix** | 확인했지만 변경을 반영하지 않음. |
| **Closed**    | 토론 완료, 조치 없음.            |

### 스레드 컨텍스트

스레드는 댓글이 달린 줄 주위로 몇 줄의 코드를 보여줍니다. 몇 줄을 보여줄지는 [](Settings-ko.md)의 **Lines shown above a comment**와 **Lines of
code shown below a comment**로 설정하세요 - 기본값은 각각 3과 3입니다.

## 긴 대화 살펴보기 {id="review-bar"}

대화 위에는 타임라인의 컨트롤 스트립인 **리뷰 바 (review bar)** 가 있습니다. 왼쪽에는 토론 개수 (`N conversations · M unresolved`)가 표시되고, 오른쪽에는 필터 칩이
있습니다:

| 칩                    | 하는 일                                                                                                                                                                   |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **All events**        | 타임라인을 한 종류의 이벤트 - 댓글, 커밋과 업데이트, 투표, 상태 변경, 리뷰어, 시스템 이벤트 - 로 좁히는 드롭다운입니다. 기본값은 *All events*이며 모든 항목을 표시합니다. |
| **Mine**              | 여러분이 참여한 스레드만 표시합니다.                                                                                                                                      |
| **Needs my reply**    | 공이 여러분에게 넘어와 있는 열린 스레드를 표시합니다.                                                                                                                     |
| **Participants**      | 스레드를 시작한 사람으로 필터링합니다 - 실시간 다중 선택 인물 선택기입니다. 선택하고 나면 칩 자체가 *Participants: &lt;name&gt; +N* 으로 이름을 바꿉니다.                 |
| **Collapse resolved** | 해결된 스레드를 각각 한 줄로 접습니다. 세션 간에 기억되며, <shortcut>H</shortcut>가 전환하는 것과 동일합니다.                                                             |
| **?**                 | 키보드 치트 시트.                                                                                                                                                         |

남은 작업을 처리하는 데 도움이 되는 두 가지 기능이 더 있습니다:

- 타임라인 위에 떠 있는 **미해결 내비게이터** - 화살표와 `N of M` 카운터로 구성되며, 모두 처리하면 *No unresolved*로 표시됩니다. <shortcut>
  F8</shortcut> / <shortcut>⇧F8</shortcut>의 마우스 버전입니다.
- 스크롤바 레인에는 IDE 자체의 오류 스트라이프처럼 **미해결 스레드마다 눈금**이 표시됩니다. 눈금을 클릭하면 해당 스레드로 바로 이동합니다.

## 타임라인 사이드바 {id="the-timeline-sidebar"}

오른쪽 사이드바에는 PR의 메타데이터가 있으며, Create 양식과 달리 풀 리퀘스트의 전 생애에 걸쳐 편집할 수 있습니다.

| 섹션              | 할 수 있는 일                                                                                                                                                                                                                                                                                                                |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Reviewers**     | **Required**와 **Optional** 하위 그룹이 있으며, 각각 사람을 추가하는 **+**가 있습니다. 행의 오버플로 메뉴에서 **Make optional** / **Make required**와 **Remove**를 제공합니다. 브랜치 정책으로 추가된 리뷰어에는 정책 아이콘과 *Reviewers were added by policy* 툴팁이 붙습니다. 비어 있는 그룹은 *No reviews*로 표시됩니다. |
| **Tags**          | **+**로 태그를 추가하고, 오른쪽 클릭으로 제거합니다.                                                                                                                                                                                                                                                                         |
| **Work items**    | **+**로 작업 항목을 연결합니다.                                                                                                                                                                                                                                                                                              |
| **AI review**     | 마지막 AI 실행이 아직 유효한지 여부 - [](AI-Features-ko.md)을 참조하세요.                                                                                                                                                                                                                                             |
| **Notifications** | **Mute live updates** / **Resume live updates** - [풀 리퀘스트](Pull-Requests-ko.md#refresh-and-background-sync)를 참조하세요.                                                                                                                                                                                               |
| **Participants**  | PR에 관여한 모든 사람 - 작성자, 투표한 리뷰어, 댓글 작성자, 댓글에 좋아요를 누른 사람 - 중복이 제거되고 작성자가 먼저 표시됩니다.                                                                                                                                                                                            |

> 팀이 리뷰어로 추가된 경우 투표는 **Approved via &lt;member&gt;** 로 표시되어, 팀을 대신해 실제로 투표한 사람을 밝혀 줍니다.
> {style="note"}

## 타임라인 이벤트

타임라인은 댓글과 함께 PR에 일어난 일을 기록합니다. 투표 변경, 리뷰어 추가 또는 제거, 작업 항목 연결 또는 연결 해제, 완료된 상태 검사, 초안/준비 전환, 그리고 완료 또는 중단입니다.

두 종류의 이벤트는 보이는 것보다 더 많은 일을 하므로 짚고 넘어갈 만합니다:

- **커밋 추가.** 푸시할 때마다 새 커밋을 클릭 가능한 짧은 SHA와 함께 나열하는 *N commits added* 이벤트가 추가됩니다.
- **업데이트 (반복, iteration).** 모든 업데이트는 **Compare changes** 링크와 함께 *updated &lt;branch&gt; from &lt;sha&gt; to &lt;sha&gt;*
  로 렌더링됩니다. 이를 클릭하면 변경 트리가 해당 업데이트만으로 다시 범위 지정됩니다 - ⋮ 메뉴의 **Review Changes Since…** 가 제공하는 것과 동일한 반복 리뷰에 한 번의 클릭으로 도달하는
  것입니다. [코드 리뷰](Code-Review-ko.md#compare)를 참조하세요. 소스 tip이 실제로 움직이지 않은 경우에는 링크가 생략됩니다.

### 그룹화된 리뷰

누군가 한 번에 여러 댓글을 남기면, 타임라인은 이를 페이지 아래로 다섯 개의 별개 항목으로 흩뿌리는 대신 **하나의 리뷰 이벤트**로 접습니다 - 투표를 담은 헤더, 선택적 요약, 그리고 접을 수 있는 파일별
행으로 구성됩니다.

![타임라인의 그룹화된 리뷰: 헤더 하나와 파일별 접이식 행](grouped-review.png){ width="720" border-effect="line" thumbnail="true" }

플러그인을 통해 제출된 리뷰는 정확하게 그룹화됩니다. 다른 곳 (예: Azure DevOps 웹 UI)에서 남긴 묶음은 같은 작성자가 몇 분 이내에 연달아 게시한 경우 그룹화되며, 가까운 시점의 투표가 헤더에 함께
표시됩니다.

### 오래된 (outdated) 댓글

이후의 커밋이 댓글이 가리키던 줄을 변경하면 스레드에 **Outdated** 칩이 붙습니다. 이 칩은 토글이기도 합니다. 클릭하면 *원래의 diff - 이 댓글이 작성될 당시의 코드* 를 볼 수 있고, 다시 클릭하면
현재 코드로 돌아옵니다. 스니펫을 재구성할 수 없는 경우 스레드에는 *Diff preview isn't available for this comment* 가 표시됩니다.
