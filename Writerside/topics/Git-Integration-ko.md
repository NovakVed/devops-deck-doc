# Git 통합

<tldr>
    <p><b>위치</b>: IDE의 클론 대화 상자, 메인 툴바와 상태 표시줄의 브랜치 위젯, 그리고 IDE 안에서 실행되는 모든 <code>git fetch</code> / <code>push</code>.</p>
    <p><b>동작 조건</b>: Git 원격이 Azure DevOps(클라우드, 레거시, SSH 또는 구성된 온프레미스 서버)와 일치할 때.</p>
</tldr>

이 플러그인은 IDE에 번들로 포함된 Git 플러그인과 함께 작동하여 Azure DevOps 원격을 감지하고, 현재 브랜치를 해당 PR과 매칭하며, HTTPS 자격 증명을 전달하여 `git fetch`와
`git push`가 바로 작동하도록 합니다.

## 리포지토리 감지

프로젝트를 열면 플러그인이 모든 Git 원격에서 다음 패턴을 검색합니다.

- `https://dev.azure.com/<org>/<project>/_git/<repo>`
- `https://<org>.visualstudio.com/<project>/_git/<repo>` (레거시)
- `git@ssh.dev.azure.com:v3/<org>/<project>/<repo>` (SSH)
- 계정에 등록된 자체 호스팅 Azure DevOps Server URL

일치하는 원격이 있으면 **Pull Requests** 도구 창이 나타나고 백그라운드 동기화가 시작됩니다. 일치하는 것이 없으면 플러그인은 방해가 되지 않도록 물러나 있습니다.

## 리포지토리 클론 {id="clone-a-repository"}

IDE를 벗어나지 않고 Azure DevOps에서 클론할 수 있습니다.

1. 시작 화면에서 **Clone Repository**를 선택하고 (프로젝트가 열려 있다면 **File | New | Project from Version Control**), 왼쪽 목록에서 **Azure
   DevOps**를 선택합니다.
2. 아직 로그인하지 않았다면 로그인합니다 - 플러그인의 다른 곳과 동일한 Microsoft 또는 토큰 로그인입니다.
3. 입력하여 `project/repository` 목록을 검색하고, 리포지토리를 선택한 뒤 필요하면 대상 디렉터리를 조정합니다.
4. **Clone**을 클릭하면 IDE가 HTTPS로 클론하고 프로젝트를 엽니다. 자격 증명은 아래 "HTTPS 인증"에 설명된 대로 로그인된 계정에서 제공됩니다.

### 리포지토리 목록이 로드되지 않는다면 {collapsible="true"}

목록은 계정마다 한 번만 가져오며 대화 상자가 열려 있는 동안 유지되므로, 첫 로드 이후에는 계정을 전환해도 비용이 들지 않습니다.

| 목록에 표시되는 내용                                | 의미                                                                                 |
|-----------------------------------------------------|--------------------------------------------------------------------------------------|
| **Loading repositories…**                           | 조직 전체 목록을 아직 페이지 단위로 가져오는 중입니다.                               |
| **No repositories in this organization**            | 계정이 조직에는 접근하지만 그 안에서 리포지토리를 찾지 못했습니다.                   |
| **No matching repositories**                        | 검색어가 목록을 가리고 있을 뿐입니다 - 필드를 지우세요.                              |
| **Couldn't load repositories** + **Retry**          | 호출이 실패했습니다 - 보통 오프라인이거나 일시적인 오류입니다.                       |
| **Couldn't access &lt;account&gt; - sign in again** | 해당 계정의 토큰이 더 이상 유효하지 않습니다. 링크가 로그인 대화 상자를 다시 엽니다. |

## 현재 브랜치 → PR {id="current-branch-pr"}

플러그인은 체크아웃된 브랜치를 감시하여 (원본 브랜치 이름으로) 매칭되는 열린 PR로 확인합니다. 매칭되는 것을 찾으면 두 개의 위젯이 켜집니다.

### 메인 툴바 브랜치 위젯

**main toolbar**의 Git 브랜치 위젯에 Azure DevOps 배지가 추가됩니다 - `!1234 on feature/login`. 클릭하면 해당 PR의 작업을 볼 수 있습니다.

- **Show Pull Request in the Tool Window** - PR의 상세 보기를 엽니다.
- **Update to Enable Review Mode…** - 로컬 브랜치가 PR head에서 갈라졌을 때 나타납니다 (*Update Project*를 실행합니다).
- **Review Mode** - 에디터 내 리뷰 오버레이를 토글합니다. [에디터에서 리뷰하기](Review-in-Editor-ko.md)를 참조하세요.

### 상태 표시줄 위젯

**status bar**에 있는 별도의 위젯은 `ADO PR !1234`를 표시합니다. 이를 클릭하면 도구 창에서 해당 PR이 열립니다. (상태 표시줄 위젯 선택기를 통해 숨기거나 표시할 수 있습니다 - 이름은 *
Azure DevOps PR (current branch)*입니다.)

브랜치를 전환하면 두 위젯 모두 업데이트되며, 새 브랜치에 PR이 없으면 사라집니다.

## 코드 한 줄 뒤의 풀 리퀘스트 찾기 {id="find-pull-request"}

어떤 줄을 바라보며 *왜* 저렇게 되어 있는지 궁금했던 적이 있나요? 플러그인은 해당 줄을 로컬에서 blame하여 어떤 풀 리퀘스트가 그 줄을 가져왔는지 알려줄 수 있습니다 - 일회성 조회로도, 줄 번호 옆의 상시
열로도 가능합니다.

이는 그 자체로 하나의 기능입니다: [](Find-Pull-Requests-From-Code-ko.md)를 참조하세요.

## HTTPS 인증

Git이 Azure DevOps 원격에 대한 HTTPS 자격 증명을 필요로 할 때, 플러그인이 저장된 토큰을 자동으로 제공합니다.

<procedure title="HTTPS 인증 전달이 작동하는 방식">
    <step>IDE 내부에서(Update Project, Git 도구 창, 또는 내장 터미널) <code>git fetch</code> 또는 <code>git push</code>를 실행합니다.</step>
    <step>Git이 IDE에 자격 증명을 요청합니다.</step>
    <step>플러그인이 원격을 로그인된 계정과 매칭하고 해당 토큰을 제공합니다.</step>
    <step>Git이 진행됩니다 - 비밀번호 프롬프트가 없습니다.</step>
</procedure>

로그인된 여러 계정이 동일한 URL과 매칭되면 프로젝트의 **default account**가 사용됩니다 ([](Settings-ko.md) 참조).

> IDE 외부의 **system shell**에서 실행되는 Git 명령은 이 제공자를 볼 수 없습니다. 주로 외부 터미널에서 작업한다면 시스템 전체 Git 자격 증명 헬퍼를
> 구성하세요 - [문제 해결](Troubleshooting-ko.md#git-push-asks-for-a-password)을 참조하세요.
> {style="note"}

## 푸시 → PR 생성 {id="push-create-pr"}

아직 PR이 없는 브랜치를 푸시하면, 플러그인이 풍선 알림으로 **Create a pull request**를 제안할 수 있습니다 - 툴바보다 더 빠른 경로입니다. [](Settings-ko.md)의
**Offer to create a pull request after I push**로 토글하세요. 기타 Git 기반 알림 (리뷰 요청, 투표 변경, 답글)
은 [알림 및 주의](Notifications-and-Attention-ko.md)에서 다룹니다.

### 커밋 메시지의 작업 항목 {id="commit-refs"}

커밋 메시지에 `#ID` 참조가 담겨 있으면 Azure DevOps가 그 커밋을 작업 항목에 연결합니다 - `#35 Catch null exception`으로 커밋하고 푸시하면 서버가 작업 항목 35에
**Commit** 링크를 만듭니다. 이 연결은 **서버 측에서, 푸시할 때** 일어납니다. 플러그인은 이런 참조를 추가하지도, 고쳐 쓰지도 않으며, 이를 위해 IDE에서 구성할 것도 없습니다. 참조는
평소 커밋 메시지를 쓰던 방식 그대로 쓰면 됩니다.

AI 커밋 메시지 생성기 ([](AI-Features-ko.md))도 마찬가지입니다. 이미 써 둔 `#ID`는 보존하지만, 어떤 작업 항목을 뜻하는지 알 수 없으므로 없던 것을 지어내지는 않습니다.

플러그인이 *실제로* 링크로 렌더링하는 쪽 - 댓글과 PR 설명의 `#ID` 참조 - 은 [](Markdown-ko.md#hash)를 참고하세요.

## 다중 리포지토리 및 자체 호스팅

- 한 프로젝트에 있는 **여러 리포지토리**는 각각 독립적으로 감지됩니다. 도구 창의 **Switch Account / Repository…**를 사용하여 하나에 집중하세요.
- **Azure DevOps Server (온프레미스)**는 클라우드 제품과 똑같이 작동합니다 - 로그인할 때 서버 URL을 추가하고, 해당 서버에서 생성한 토큰을 사용하세요.
