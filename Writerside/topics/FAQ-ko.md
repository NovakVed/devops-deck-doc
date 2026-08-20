# FAQ

%product%을 (를) 사용할지 여부와 사용 방법에 대한 결정 중심의 질문들입니다. "고장 났는데 어떻게 고치나요?" 유형의 질문은 [](Troubleshooting-ko.md)을 참조하세요.

## 무엇을 지원하나요 {id="compatibility"}

### 이 플러그인은 Azure DevOps Server (온프레미스)를 지원하나요?

예. 계정을 만들 때 서버의 URL을 추가하세요. Azure DevOps Server 2019 이상과 Azure DevOps Services (클라우드)를 모두 지원합니다.

클라우드 제품은 `dev.azure.com/<org>`을 사용합니다. 온프레미스는 컬렉션 URL (`https://tfs.contoso.com:8080/tfs/my-collection`) 또는 리포지토리 URL
(`…/my-collection/my-project/_git/my-repo`) 중 어느 쪽이든 받으며, 둘 다 같은 계정으로 확인됩니다. PAT 인증은 두 제품 모두에서 작동하지만, Microsoft Entra를
통한 OAuth는 **클라우드 전용**입니다. 그래서 온프레미스 서버가 확인되면 **Log In via Microsoft…** 버튼은 숨겨지지 않고 설명과 함께 흐리게 표시됩니다.

전체 안내는 [Azure DevOps Server (온프레미스)](Authentication-ko.md#on-prem)를 참조하세요.

### Azure Pipelines를 지원하나요?

예. 전용 **Pipelines** 도구 창에서 파이프라인과 실행을 탐색하고, 대화형 스테이지 그래프를 보고, 색상으로 구분된 단계 로그를 읽고, 수동 승인 게이트를 승인하거나 거부할 수 있습니다. 이 모든 작업을
IDE 안에서 수행할 수 있습니다. 풀 리퀘스트 CI 검사가 Azure 빌드를 가리키는 경우, **Details…**를 클릭하면 해당 실행이 브라우저 대신 IDE에서 열립니다.

Pipelines는 항상 켜져 있습니다. 먼저 켜야 할 것도, 끄는 스위치도 없습니다. 리포지토리가 Azure DevOps 원격 저장소에 연결되는 순간 도구 창이 나타납니다. 방해받고 싶지 않다면 <ui-path>Settings | Tools | DevOps Lens | Pipelines</ui-path>에서 **Refresh pipeline runs in the background**의 체크를 해제하세요. 폴링과
풍선 알림, 스트라이프 배지가 멈추고 창은 필요할 때를 위해 남아 있습니다. [](Pipelines-ko.md)을 참조하세요.

### 클래식 TFVC (비 Git) 리포지토리에서 작동하나요?

아니요. 이 플러그인은 Git 기반 Azure Repos 전용입니다. **TFVC**(Team Foundation Version Control, Azure DevOps에서 Git 이전에 사용된 Microsoft의
중앙 집중식 VCS)는 지원하지 않습니다.

### Azure DevOps 계정 없이도 사용할 수 있나요? {id="can-i-use-this-without-an-azure-devops-account"}

아니요. 이 플러그인은 오직 Azure DevOps 전용입니다.

### Azure Repos Wiki를 지원하나요?

아니요. 이 플러그인의 범위는 풀 리퀘스트로 한정됩니다. 위키 편집은 Azure DevOps의 웹 UI를 사용하세요.

## 로그인 {id="signing-in"}

### OAuth와 PAT 중 어느 것을 선택해야 하나요?

| 사용해야 하는 것… | 언제                                                                                                          |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| **OAuth**         | 클라우드 제품(`dev.azure.com`)을 사용하고, 조직이 OAuth를 금지하지 않으며, MFA 프롬프트를 인라인으로 원할 때. |
| **PAT**           | Azure DevOps Server(온프레미스)를 사용하거나, 조직 정책이 PAT를 의무화하거나, OAuth 핸들러 문제를 겪은 경우.  |

OAuth 토큰은 자동으로 갱신됩니다. PAT는 생성 시 설정한 날짜에 만료됩니다. PAT는 설계상 MFA를 우회합니다. PAT를 생성하려면 사용자가 이미 인증되어 있어야 하지만, 토큰 자체는 다시 인증을 요구하지
않습니다.

### PAT는 어떻게 만드나요?

<procedure title="Personal Access Token 만들기">
    <step>브라우저에서 Azure DevOps 조직에 로그인합니다.</step>
    <step>프로필 사진을 클릭 → <ui-path>User settings | Personal access tokens</ui-path>를 엽니다.</step>
    <step><b>New Token</b>을 클릭하고 이름, 만료 날짜, 플러그인에 필요한 범위를 지정합니다(가장 간단한 방법: <b>Full access</b>).</step>
    <step><b>Create</b>를 클릭하고 토큰을 복사합니다 - 딱 한 번만 표시됩니다.</step>
</procedure>

PAT는 비밀번호처럼 다루세요 - 절대 공유하거나 소스 관리에 커밋하지 마세요. 각 기능에 필요한 범위는 [](Authentication-ko.md)을 참조하세요.

### "Mark file as viewed"가 401로 실패하는 이유는 무엇인가요?

Azure DevOps의 제한 사항입니다. 다른 모든 기능이 범위 지정 토큰으로 작동하더라도, 열람 상태 API는 **전체 액세스** 토큰만 받아들입니다.

- **PAT 사용자:** **Full access**로 토큰을 다시 생성하고 다시 로그인하세요.
- **OAuth 사용자:** 다시 로그인하고 권한 선택 화면에서 **Full access**(권장 옵션)를 선택하세요.

### 플러그인이 토큰을 저장하거나 읽지 못합니다. 어떻게 하나요?

토큰은 OS 키체인이 뒷받침하는 IDE의 비밀번호 저장소에 보관됩니다. 네이티브 자격 증명 저장소가 비활성화되었거나 손상된 경우, <ui-path>Settings | Appearance &amp; Behavior |
System Settings | Passwords</ui-path>를 열어 KeePass 파일로 전환하거나 기존 비밀번호를 지운 다음 다시 로그인하세요. 만료된 토큰, 누락된 범위 등 그 외의 로그인
오류는 [](Troubleshooting-ko.md)을 참조하세요.

## 개인정보 보호와 AI {id="privacy-and-ai"}

### 내 코드가 Azure DevOps 외의 다른 곳으로 전송되나요? {id="is-my-code-sent-anywhere-other-than-azure-devops"}

AI 기능을 명시적으로 활성화하고 공급자를 구성한 경우가 아니라면 전송되지 않습니다. 기능별 전체 데이터 흐름은 [](Privacy-and-Data-ko.md)를 참조하세요.

AI가 비활성화되어 있으면 (마스터 스위치가 꺼져 있으면) 플러그인 자체는 사용자의 Azure DevOps 조직 외부로 어떠한 아웃바운드 호출도 하지 않습니다.

별도로 알아 둘 점: IDE에 내장된 MCP 서버에 AI 에이전트를 연결하면, 그 에이전트는 사용자의 연결을 통해 풀 리퀘스트와 파이프라인 내용을 읽고 자신의 모델에 전달할 수 있습니다. 이는 플러그인이 아니라 에이전트의 트래픽이며, 그런 에이전트를 직접 설정한 경우에만 발생합니다. [](MCP-Tools-ko.md)을 참조하세요.

### AI 호출 없이 플러그인을 사용하려면 어떻게 하나요?

<ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path> 상단에서 **Enable AI assistance**의 체크를 해제하세요. 모든 AI 기능이 메뉴와 툴바에서 사라지고, AI 호출이 전혀 이루어지지 않습니다.

또는 AI를 켜 둔 채 모든 기능을 로컬 **Ollama** 인스턴스로 라우팅하여 완전히 온디바이스 추론을 할 수도 있습니다.

AI 에이전트가 IDE를 통해 Azure DevOps를 읽는 것도 원하지 않는다면, 번들된 **MCP Server** 플러그인을 비활성화하세요 (<ui-path>Settings | Plugins</ui-path>). 그러면 Azure DevOps 도구는 아예 등록되지 않습니다.

### MCP 도구를 쓰면 플러그인의 AI 리뷰가 더 똑똑해지나요?

아니요 - 서로 무관하며 흔한 오해입니다. 플러그인 자체의 AI 기능(요약, 리뷰, 커밋 메시지)은 한 번에 텍스트를 생성할 뿐 도구를 호출할 수 없습니다. MCP 도구는 반대 방향입니다. *사용자가* 연결한 에이전트(Claude Code, Codex CLI, Copilot CLI)가 IDE를 통해 Azure DevOps 데이터를 읽을 수 있게 해 줍니다. [](MCP-Tools-ko.md)을 참조하세요.

### 플러그인이 익명으로 무언가를 업로드하나요? 텔레메트리는요?

사용 분석은 절대 수집하지 않습니다. 어떤 기능을 쓰는지, 무엇을 클릭하는지 기록하는 것은 아무것도 없으며, 백그라운드에서 업로드되는 것도 없습니다. 아웃바운드 호출은 사용자의 Azure DevOps 조직과, AI가
활성화된 경우 구성된 AI 공급자로만 나갑니다. (MCP로 연결한 AI 에이전트는 자체 약관에 따라 스스로 호출하며, 플러그인은 그 호출에도 텔레메트리를 덧붙이지 않습니다.)

유일한 예외는 **사용자가 직접 보내는 크래시 보고서**입니다. 플러그인이 예기치 못한 오류를 만나면 IDE의 오류 대화 상자에 **Report to DevOps Lens** 버튼이 표시됩니다. 이
버튼을 누르지 않는 한 아무것도 전송되지 않고, 자격 증명과 신원을 드러내는 이름은 사용자 컴퓨터에서 먼저 제거되며, 코드는 절대 포함되지 않고, 공개 저장소가 아니라 비공개 오류 트래커로
전송됩니다. [크래시 보고서](Privacy-and-Data-ko.md#crash-reports)를 참조하세요.

## 플러그인 사용 {id="using-the-plugin"}

### PR 지표는 어디에서 볼 수 있나요?

[](Statistics-ko.md) 탭에는 KPI와 차트 (병합까지의 시간, 리뷰 속도, 투표 분포 등)가 캐시된 데이터에서 로컬로 계산되어 표시됩니다. 이는 보기 전용 대시보드입니다. 내보내기가 가능한 조직
전체 보고서가 필요하면 Azure DevOps Analytics를 사용하세요.

### IDE를 다시 시작하면 PR 탭이 왜 다시 열리지 않나요?

%product%이 (가) 의도적으로 닫기 때문입니다. 타임라인, 파일별 diff (변경 내용), 통계, 파이프라인 실행 탭은 세션 전용 보기입니다 - IDE가 복원할 수 있는 것이 디스크에 아무것도 없으므로,
그대로 두면 다음 실행 시 탭마다 오류만 표시될 뿐입니다.

잃어버리는 것은 없습니다. 처음과 똑같이 도구 창에서 (또는 <shortcut>⌘⇧P</shortcut> / <shortcut>Ctrl+Shift+P</shortcut>로) PR을 다시 열면 됩니다. 일반 소스 파일
탭은 건드리지 않습니다.

## 도움 받기 {id="getting-help"}

### 버그 신고나 기능 요청은 어디에 하나요?

공개 트래커인 [%tracker_url%](%tracker_url%)입니다. 고장 난 것은 [버그 양식](%new_bug_url%), 없는 기능은 [기능 요청 양식](%new_feature_url%), 둘 중 어느
쪽인지 확실하지 않다면 [Discussions](%discussions_url%)를 이용하세요.

가장 빠른 경로는 <ui-path>Settings | Tools | DevOps Lens</ui-path> 하단의 **Report a bug**입니다. IDE 빌드, 플러그인 버전, 운영체제가
이미 채워진 상태로 양식이 열립니다. 무엇을 담아야 하고 어떤 답을 받게 되는지는 [](Support-ko.md)을 참고하세요.

보안 문제는 공개 이슈가 아니라 벤더 이메일로 비공개로 알려 주세요.

### 이 플러그인은 어떻게 지원되나요?

한 명의 개발자가 만들고 유지하는 1인 프로젝트입니다. 도움이 되었다면 JetBrains Marketplace에 리뷰를 남기는 것이 가장 큰 응원입니다 - 리뷰는 언제나 큰 힘이 됩니다.
