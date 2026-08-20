# 빠른 시작

처음부터 첫 PR 리뷰까지 약 1분이면 됩니다. 이 페이지는 이미 플러그인을 [](Installation-ko.md)했다고 가정합니다.

## 1. Azure DevOps에서 호스팅되는 프로젝트 열기

일반적인 방법으로 Azure DevOps 리포지토리를 클론합니다:

```bash
git clone https://dev.azure.com/your-org/your-project/_git/your-repo
cd your-repo
```

IDE에서 해당 폴더를 엽니다. 플러그인은 시작 시 Git 원격을 스캔하며, Azure DevOps 원격(`dev.azure.com`, `*.visualstudio.com` 또는 온프레미스 Azure DevOps Server)을 감지하면 활성화되어 **Pull Requests** 도구 창을 표시합니다.

> **도구 창이 보이지 않나요?** 플러그인은 Azure DevOps 원격이 감지되지 않으면 스스로 숨습니다. `git remote -v`를 실행하여 원격 URL이 `dev.azure.com`, `visualstudio.com` 또는 사용 중인 Azure DevOps Server를 가리키는지 확인하세요.
> {style="note"}

## 2. 로그인

왼쪽 사이드바에서 Pull Requests 도구 창을 엽니다. 로그인 화면에는 두 가지 옵션이 있습니다:

- **Log In with Token…** - Azure DevOps 사용자 설정에서 개인용 액세스 토큰(Personal Access Token)을 붙여넣습니다. 가장 빠른 방법이며, 온프레미스 Azure DevOps Server의 유일한 옵션입니다.
- **Log In via Microsoft…** - Microsoft Entra ID를 통한 브라우저 기반 OAuth 로그인(클라우드 `dev.azure.com` 전용). 먼저 대화 상자에서 **Full access** 또는 **Standard access** 부여 여부를 묻습니다.

![Full access(권장)와 Standard access를 보여주는 Sign in with Microsoft 권한 선택 화면](sign-in-with-microsoft-ko.png){ width="560" border-effect="line" }

토큰을 선택하는 경우 플러그인에는 다음 범위가 필요합니다: **Code (Read &amp; write + Status), User Profile (Read), Identity (Read), Work Items (Read), Project and Team (Read), Security (Manage)**. 로그인 대화 상자에 이 범위들이 나열되어 있으며, **Generate…** 버튼을 누르면 브라우저에서 조직의 토큰 페이지가 열립니다.

![Server와 Token 필드가 있는 Log In to Azure DevOps 대화 상자](sign-in-with-token-ko.png){ width="560" border-effect="line" }

> 전체 로그인 흐름, 범위, 그리고 Full 대 Standard 등급 선택에 대해서는 [Authentication](Authentication-ko.md)을 참조하세요.
> {style="note"}

## 3. 풀 리퀘스트 살펴보기

로그인하면 도구 창에 리포지토리의 풀 리퀘스트 목록이 표시됩니다.

![검색 필드, 필터 칩, 그리고 항목이 채워진 목록이 있는 Pull Requests 도구 창](pr-tool-window-ko.png){ width="720" border-effect="line" thumbnail="true" }

목록을 좁히려면:

- **Quick Filters** - 칩 행 왼쪽의 필터 아이콘을 클릭하면 원클릭 프리셋을 사용할 수 있습니다: **Active**, **Includes my changes**, **I am a reviewer**, **Waiting for author**, **I reviewed**, **Awaiting my review**, **Abandoned**.
- **필터 칩** - **State** (Mine / Active / Completed / Abandoned), **Author**, **Assignee**, **Target branch**, **Tags**, 그리고 **Draft**. 나머지 차원 - **Review**, **Work Items**, **Approved by**, **Source branch** - 은 검색 필드에 입력하는 토큰으로 필터링합니다.
- **Sort** - 마지막 칩: Newest, Oldest, Most/Least commented, Recently/Least recently updated, 또는 Id newest/oldest first.
- **Search** - 칩 위의 필드에 입력하면 PR 제목, 번호, 작성자, 브랜치 이름이 일치하는 항목을 찾습니다.

아무 PR이나 **클릭**하면 에디터 탭에서 상세 보기가 열립니다.

### 풀 리퀘스트가 표시되지 않나요? {collapsible="true"}

| 가능성 있는 원인                        | 해결 방법                                                             |
|-----------------------------------------|-----------------------------------------------------------------------|
| 계정이 이 리포지토리에 액세스할 수 없음 | 먼저 Azure DevOps 웹 UI에서 열어 보세요.                              |
| 프로젝트가 여러 조직을 가리킴           | 도구 창의 톱니바퀴 → **Switch Account / Repository…**로 전환하세요.   |
| 실제로 활성 PR이 없음                   | **State** 칩을 **Completed**로 설정하여 연결이 작동하는지 확인하세요. |

## 4. 코드 리뷰하기

상세 보기는 하위 탭이 없는 **단일 창**입니다. 위에서 아래로: `!`-번호가 붙은 제목과 **View Timeline** 링크, 소스 → 대상 브랜치, 각 리뷰어의 투표가 포함된 상태 체크, 변경된 파일 트리, 그리고 작업 표시줄이 있습니다.

![풀 리퀘스트 리뷰: 도구 창, 타임라인, 리뷰어 사이드바](review-code-ko.png){ width="720" border-effect="line" thumbnail="true" }

- **diff(변경 내용) 읽기** - 변경 트리에서 파일을 클릭하면 diff가 열립니다. 라인의 여백(gutter)을 클릭하면 댓글을 달 수 있습니다.
- **논의 읽기** - **View Timeline**을 클릭하면 전체 댓글 타임라인이 별도 탭에서 열립니다.
- **투표** - 작업 표시줄의 **Approve** 버튼은 분할 버튼입니다. 드롭다운에는 **Approve with suggestions**, **Wait for author**, **Request changes**, 그리고 **Reset feedback**가 있습니다.

![diff의 Review 툴바에 있는 Submit 버튼의 투표 옵션](vote-dropdown-ko.png){ width="700" border-effect="line" }

> **에디터를 벗어나지 않고 리뷰하기:** PR의 브랜치를 체크아웃하면 플러그인이 평소 사용하는 에디터에 바로 댓글을 오버레이합니다. [Review in Editor](Review-in-Editor-ko.md)를 참조하세요.
> {style="tip"}

## 5. 풀 리퀘스트 만들기

**Pull Requests** 도구 창 툴바에서 **+** (Create Pull Request)를 클릭합니다. 폼은 소스 브랜치(현재 브랜치)와 기본 대상 브랜치를 미리 채웁니다. 제목, 설명, 리뷰어를 추가한 다음 만드세요.

![Pull Requests 도구 창 툴바의 + (Create Pull Request) 버튼에 마우스를 올려 툴팁이 표시된 모습](create-pr-button-ko.png){ width="590" border-effect="line" }

![풀 리퀘스트 만들기 양식: 원본 및 대상 브랜치, 변경된 파일 트리, 마크다운 풀 리퀘스트 템플릿이 채워진 설명 편집기, 리뷰어·태그·작업 항목 행](create-pr-ai-ko.png){ width="640" border-effect="line" }

> **AI 지원 제목 &amp; 설명:** [AI 공급자가 구성](AI-Features-ko.md)되어 있으면 폼의 제목과 설명 필드에 브랜치의 diff로부터 둘 다 초안을 작성하는 **Generate** 작업이 추가됩니다.
> {style="tip"}

## 다음으로 갈 곳

- [Pull Requests](Pull-Requests-ko.md) - 필터링, 검색, 작업 표시줄, 그리고 오버플로 메뉴(Complete, Revert, Compare).
- [Code Review](Code-Review-ko.md) - 인라인 diff, 제안, 투표, 그리고 파일 조회 추적.
- [Notifications &amp; Attention](Notifications-and-Attention-ko.md) - PR이 리뷰를 필요로 하거나 @멘션할 때 알림을 받으세요.
- [AI Features](AI-Features-ko.md) - 요약, AI 리뷰, 그리고 문법 다듬기.
