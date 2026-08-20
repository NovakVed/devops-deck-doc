# 문제 해결

<tldr>
    <p><b>도구 창이 없음</b>: Azure DevOps Git 원격이 감지될 때까지 Pull Requests 창은 숨겨져 있습니다.</p>
    <p><b>오래된 데이터</b>: <shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut>로 동기화를 강제하세요.</p>
    <p><b>보고하기</b>: <ui-path>Help | Report DevOps Lens Issue…</ui-path>.</p>
</tldr>

사용자가 가장 자주 겪는 문제에 대한 빠른 해결책입니다. 판단이 필요한 질문 ("OAuth를 써야 하나 PAT를 써야 하나?", "온프레미스를 지원하나?")은 [](FAQ-ko.md)를 참고하세요. 여기서
다루지 않는 문제라면 맨 아래의 [문제 보고하기](#reporting-a-problem)를 참고하세요.

## 도구 창이 나타나지 않음

Azure DevOps Git 원격이 감지되지 않으면 Pull Requests 도구 창이 숨겨집니다. 다음을 확인하세요:

<procedure>
    <step>프로젝트 루트에서 <code>git remote -v</code>를 실행하세요. 하나 이상의 원격 URL에 <code>dev.azure.com</code> 또는 <code>visualstudio.com</code>(또는 구성한 자체 호스팅 서버)이 포함되어 있어야 합니다.</step>
    <step>번들 <b>Git</b> 플러그인(<code>Git4Idea</code>)이 <ui-path>Settings | Plugins | Installed</ui-path>에서 활성화되어 있는지 확인하세요.</step>
    <step>IDE를 재시작하세요 - 원격 스캔은 프로젝트를 열 때 실행됩니다.</step>
</procedure>

## 풀 리퀘스트 목록이 비어 있음 {id="empty-pr-list"}

목록에 보여 줄 것이 없으면 패널 한가운데에 *왜* 그런지가 표시되며, 대부분의 상태에는 인라인 복구 링크가 함께 제공됩니다. 표시된 메시지에 맞춰 조치하세요:

| 목록에 표시되는 내용                                                                                                                                            | 의미                                                                        | 조치                                                                                                                      |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| **Loading pull requests…**                                                                                                                                      | 첫 가져오기가 아직 진행 중입니다.                                           | 기다리세요 - 아래 상태 중 하나로 이어집니다.                                                                              |
| **Nothing to load**                                                                                                                                             | 쿼리는 성공했지만 결과가 비어 있습니다(예: 이 리포지토리에 열린 PR이 없음). | **State** 필터를 넓히거나, 올바른 리포지토리를 선택했는지 확인하세요.                                                     |
| **No matches**                                                                                                                                                  | 필터나 검색어가 모든 PR을 제외했습니다.                                     | **Clear filters**를 클릭하세요.                                                                                           |
| **No credentials stored for this account** - *"The saved token couldn't be read from the IDE's password safe (it may have been removed from the keychain)."*    | 계정은 여전히 구성되어 있지만 토큰이 OS 키체인에서 사라졌습니다.            | **Log in again**을 클릭하세요 - [](Authentication-ko.md)을 참고하세요.                                                |
| **This account can't access these pull requests** - *"Your PAT was accepted, but it's either missing a required scope or the account lacks repository access."* | Azure DevOps가 응답했으며, 두 원인 모두에 대해 동일한 응답을 반환합니다.    | **Switch account / repository**를 클릭한 다음, 아래 [401](#unauthorized-401)과 [403](#forbidden-403)을 차례로 확인하세요. |
| **Can't load pull requests** - *"You're offline."*                                                                                                              | 네트워크 계열 실패입니다 - 요청이 서버에 도달하지 못했습니다.               | **Retry**를 클릭하거나 [플러그인이 오프라인이라고 표시함](#offline)을 참고하세요.                                         |

## 로그인 후 "401 Unauthorized" {id="unauthorized-401"}

- PAT에 필요한 범위가 없을 수 있습니다 - [](Authentication-ko.md)을 참고하세요. 가장 쉬운 해결책은 **Full access**로 재발급하는 것입니다.
- PAT가 만료되었을 수 있습니다. 토큰은 생성 시 설정한 날짜에 만료됩니다.
- 조직에서 PAT를 비활성화했을 수 있습니다 - 이 경우 OAuth를 사용하세요.

## 특정 작업에서 "403 Forbidden" {id="forbidden-403"}

PAT는 유효하지만 Azure DevOps 계정에 해당 작업에 대한 권한이 없습니다 (예: 풀 리퀘스트를 읽을 수는 있지만 투표는 못 하거나, 병합할 수 없음). Azure DevOps 관리자에게 프로젝트나
리포지토리에 필요한 권한을 부여해 달라고 요청하세요.

## OAuth 브라우저가 IDE로 돌아오지 않음

OAuth는 **로컬 루프백 리디렉션**을 통해 완료됩니다 - 브라우저가 IDE 내장 웹 서버가 제공하는 `http://127.0.0.1:<port>/azure-oauth/callback`로 다시 전송되고, 그런
다음 *"Sign-in complete. You can close this tab."*가 표시됩니다. 이 왕복이 실패하는 경우:

- 방화벽이나 보안 도구가 IDE 내장 서버 (포트 범위 **63342–63352**)로의 localhost 연결을 차단하고 있을 수 있습니다.
- 차단된 팝업이나 기본이 아닌 브라우저가 리디렉션을 막을 수 있습니다 - 의도한 브라우저가 기본 브라우저인지 확인하세요.
- 로그인 창에는 **5분** 제한이 있습니다. 만료되었다면 처음부터 다시 시작하세요.

해결책: OAuth 대신 개인용 액세스 토큰 (Personal Access Token)을 사용하세요.

## 동기화 후에도 풀 리퀘스트에 새 댓글이 표시되지 않음

<procedure>
    <step><shortcut>⌘R</shortcut> / <shortcut>Ctrl+R</shortcut> / <shortcut>F5</shortcut>를 눌러(또는 마우스 오른쪽 클릭 → <b>Refresh List</b>) 즉시 동기화를 강제하세요 - Reload 도구 모음 버튼은 없습니다.</step>
    <step>동기화 오류가 있는지 <b>idea.log</b>를 확인하세요(자세한 내용은 <a anchor="enabling-debug-logs">디버그 로그 활성화</a>).</step>
    <step>동기화 간격은 기본값이 60초입니다. <a href="Settings-ko.md">Settings</a>에서 이를 늘렸다면 더 긴 지연을 예상하세요.</step>
</procedure>

## diff (변경 내용)에 인라인 댓글이 나타나지 않음

- 플러그인은 **Code (Read)** 권한이 있는 풀 리퀘스트에만 인라인 스레드를 렌더링합니다.
- 풀 리퀘스트가 아닌 로컬 작업 트리에서 diff (변경 내용)를 보고 있다면 인라인 스레드가 렌더링되지 않습니다 - 도구 창에서 풀 리퀘스트를 열어 변경 내용 트리와 스레드를 로드하세요.
- 로컬 브랜치가 풀 리퀘스트 head에서 분기되었다면 편집기 내 리뷰가 자동으로 비활성화됩니다. 변경 사항을 푸시하거나 풀 리퀘스트 head를 정확히 체크아웃하세요.

## Git 푸시가 비밀번호를 요구함 {id="git-push-asks-for-a-password"}

플러그인의 HTTPS 자격 증명 공급자는 **IDE 내부에서** 실행된 Git 작업에만 작동합니다 (IDE 내부에서 실행한 터미널은 "내부"로 간주됩니다). 외부 터미널의 경우 시스템 수준 Git 자격 증명 도우미를
구성하세요:

```bash
# macOS Keychain
git config --global credential.helper osxkeychain

# Windows
git config --global credential.helper manager

# Linux (libsecret)
git config --global credential.helper libsecret
```

## AI 기능이 없거나 오류를 반환함

- <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>를 열고 **Enable AI assistance**가 체크되어 있으며 하나 이상의 공급자가 구성되고 활성화되어 있는지 확인하세요.
- 공급자 행에서 **Test connection**을 클릭하세요 - 실패하면 API 키, 모델 이름, 엔드포인트 URL을 다시 확인하세요.
- **Ollama**의 경우 데몬이 로컬에서 실행 중이고 (`ollama serve`) 지정한 모델을 가져왔는지 (`ollama list`) 확인하세요.
- **CLI 공급자**(Claude Code, Codex, Copilot CLI)의 경우 바이너리가 `PATH`에 있고 로그인되어 있는지 (`claude /login` 등) 확인하세요.
- 공급자의 속도 제한 또는 할당량 오류는 공급자로부터 그대로 전달됩니다 - 재시도되지 않습니다.

## 플러그인 충돌 {id="plugin-conflicts"}

이 플러그인은 IDE의 `collaboration-tools` 툴킷을 번들 **GitHub** 플러그인 및 **GitLab** 플러그인과 공유합니다. 두 플러그인과 공존합니다 - 독립적인 도구 창, 독립적인 상태.
알려진 상호작용 지점이 두 가지 있습니다:

- 프로젝트에 Azure DevOps 원격과 GitHub 원격이 모두 있으면 두 도구 창이 모두 나타나며, 마우스 오른쪽 클릭 컨텍스트 메뉴에 각각의 작업이 표시될 수 있습니다.
- 타사 플러그인이 AI 확장 지점 (`intellij.vcs.azuredevops.aiSummaryExtension` 등, [](Privacy-and-Data-ko.md) 참고)을 재정의하면 해당
  기능에 대해 내장 기본값이 우회됩니다. AI 기능이 예상과 다르게 동작하면 <ui-path>Settings | Plugins</ui-path>에서 EP를 후킹할 수 있는 다른 Azure DevOps 또는 AI
  플러그인을 확인하세요.

## 플러그인이 오프라인이라고 표시함 {id="offline"}

플러그인은 도달 가능 여부를 스스로 추적하며, 요청이 서버에 아예 도달하지 못한 **네트워크 계열 오류**일 때만 오프라인으로 전환합니다. 만료된 토큰, 403, 404는 모두 Azure DevOps가 응답했다는
뜻이므로 그중 어느 것도 오프라인으로 표시하지 않습니다. 그런 경우에는 [401](#unauthorized-401)과 [403](#forbidden-403)을 참고하세요.

전환 자체는 의도적으로 조용합니다 - 실패한 백그라운드 새로 고침이 풍선 알림을 띄워서는 안 되기 때문입니다. **쓰기** 작업을 시도할 때 알게 됩니다. 작업이 즉시 중단되고 **You appear to be
offline** 풍선이 시도한 내용을 알려 줍니다 (예: *"Couldn't start the run - try again when you reconnect."*).

복구에는 아무것도 할 필요가 없습니다. 오프라인 동안 플러그인은 백오프 (30초에서 시작해 최대 120초까지 두 배씩)로 Azure DevOps를 폴링하고, 첫 번째 성공한 프로브에서 오프라인 상태를 해제합니다 -
사용자의 요청이 성공해도 마찬가지입니다. 열려 있는 PR 및 파이프라인 실행 편집기는 상태가 해제되는 즉시 스스로 다시 로드됩니다.

> 이 프로브는 "와이파이가 되는가"가 아니라 **Azure DevOps를 콕 집어** 확인합니다 - 따라서 나머지 네트워크는 멀쩡한데 VPN, 프록시, DNS 문제가 있는 경우에도 여기서는 오프라인으로
> 표시됩니다. <ui-path>Settings | Appearance &amp; Behavior | System Settings | HTTP Proxy</ui-path>를 확인하세요.
> {style="note"}

## 네트워크 시간 초과 또는 "request failed"

이 플러그인은 IntelliJ의 HTTP 프록시 구성을 사용합니다 - 별도의 프록시 설정은 없습니다. 회사 네트워크 제한이 아웃바운드 HTTPS를 차단하는 경우:

- <ui-path>Settings | Appearance &amp; Behavior | System Settings | HTTP Proxy</ui-path>를 확인하세요. 플러그인은 여기서 설정한 것을 그대로 따릅니다.
  **프록시 자격 증명도 포함됩니다** - 인증이 필요한 프록시라면 여기에 사용자 이름과 비밀번호를 입력해야 하며, 그러지 않으면 모든 요청이 `407`로 실패합니다.
- CLI 기반 AI 공급자(`claude`, `codex`, `copilot`)는 자체 네트워크 스택을 가진 외부 바이너리입니다. IDE 프록시 설정을 **전혀 상속하지 않으므로**
  각자 별도로 설정해야 합니다.
- AI 스트리밍 요청의 HTTP 시간 제한은 **5분**입니다. 그보다 오래 걸리면 멈춤으로 표시되어 알림으로 보고됩니다.
- Azure DevOps API 호출의 재시도 동작은 "빠른 실패"입니다 - 일시적인 오류는 재시도되지 않으므로 UI에 중복 호출이 쌓이지 않습니다. 60초 백그라운드 동기화가 실패한 요청이 중단된 지점을
  이어받습니다.

## 자체 서명 인증서 및 사내 CA 인증서 {id="certificates"}

온프레미스 Azure DevOps Server는 대개 사내 CA가 발급한 인증서를 사용합니다. 이 플러그인은 TLS를 IDE 자체 인증서 저장소를 통해 처리하므로,
그런 서버에 처음 로그인하면 IDE의 **"이 인증서를 수락하시겠습니까?"** 대화 상자가 나타납니다. 한 번 수락하면 그 결정이 유지되며,
<ui-path>Settings | Tools | Server Certificates</ui-path>에서 나중에 확인하거나 취소할 수 있습니다.

> **신뢰할 수 없는 인증서를 수락하는 플러그인 설정은 의도적으로 제공하지 않습니다.** 플랫폼 대화 상자로 부여한 호스트별 신뢰는 감사할 수 있고
> 취소할 수도 있지만, 일괄 우회는 둘 다 불가능하며 플러그인의 모든 요청을 약화시킵니다.
> {style="note"}

이 대화 상자 대신 TLS 오류가 발생한다면:

- 서버 URL이 `https://`인지 확인하세요. `http://`는 로그인 시 거부됩니다. PAT는 모든 요청에 HTTP Basic으로 실려 가므로 평문에서는 유출됩니다.
- <ui-path>Settings | Tools | Server Certificates</ui-path>에서 사내 CA를 가져온 뒤 다시 시도하세요.
- 네트워크에 TLS 검사 프록시가 있다면 트래픽이 해당 프록시의 CA로 재서명됩니다. 그 CA도 신뢰해야 합니다.

## 플러그인 업데이트로 무언가가 망가짐 {id="plugin-update-broke-something"}

이전 버전으로 롤백하세요:

<procedure>
    <step><ui-path>Settings | Plugins | Installed</ui-path>를 열고 <b>DevOps Lens</b>를 찾으세요.</step>
    <step>기어 아이콘 → <b>Manage Plugin Versions</b>를 클릭하세요.</step>
    <step>이전 버전을 선택해 설치하세요. 플러그인은 동적으로 로드되므로 일반적으로 재시작이 필요 없습니다.</step>
</procedure>

## 디버그 로그 활성화 {id="enabling-debug-logs"}

더 심층적인 문제 해결을 위해 추적 로깅을 활성화하세요:

<procedure>
    <step><ui-path>Help | Diagnostic Tools | Debug Log Settings…</ui-path>를 여세요.</step>
    <step>다음 줄을 추가하세요:
        <code-block lang="text">
#com.vednovak.devops
#com.vednovak.devops.sync
#com.vednovak.devops.api
        </code-block>
    </step>
    <step>문제를 재현하세요.</step>
    <step><ui-path>Help | Show Log in Explorer/Finder</ui-path>를 열어 <code>idea.log</code>를 찾으세요.</step>
</procedure>

로그는 IDE의 캐시 디렉터리에 있습니다:

<tabs>
    <tab title="macOS">
        <code>~/Library/Logs/JetBrains/&lt;IDE&gt;&lt;Version&gt;/idea.log</code>
    </tab>
    <tab title="Windows">
        <!-- ignore-vars stops Writerside reading %LOCALAPPDATA% as a variable
             reference. Do not "fix" this to &#37; - the builder re-escapes that
             entity's ampersand and readers see the literal &#37; text. -->
        <code ignore-vars="true">%LOCALAPPDATA%\JetBrains\&lt;IDE&gt;&lt;Version&gt;\log\idea.log</code>
    </tab>
    <tab title="Linux">
        <code>~/.cache/JetBrains/&lt;IDE&gt;&lt;Version&gt;/log/idea.log</code>
    </tab>
</tabs>

## 문제 보고하기 {id="reporting-a-problem"}

플러그인은 필요한 정보를 넘겨주는 세 가지 방법을 제공합니다. 무슨 일이 있었는지에 따라 어떤 방법을 쓸지 정하세요:

| 무엇을 보았나요                                                                | 이것을 사용하세요                                                                                                                |
|--------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| 상태 표시줄의 빨간 오류 아이콘, 또는 이 플러그인을 지목하는 IDE 오류 대화 상자 | 대화 상자의 **Report to DevOps Lens** 버튼 - 아래 [크래시 보고서](#crash-reports) 참고                                   |
| 고장 났거나 동작이 잘못됐지만 크래시는 없었음                                  | <ui-path>Help &#124; Report DevOps Lens Issue…</ui-path> - 버전 정보가 미리 채워진 버그 양식이 열립니다                  |
| 이미 이슈를 쓰고 있고 환경 정보가 필요함                                       | <ui-path>Help &#124; Copy DevOps Lens Diagnostics</ui-path> - 마스킹된 스냅샷을 클립보드에 담아 검토 후 붙여 넣을 수 있게 합니다 |

### 크래시 보고서 {id="crash-reports"}

플러그인이 예기치 못한 오류를 던지면 IDE가 표준 오류 대화 상자를 표시합니다. **Report to DevOps Lens**을 누르면 스택 트레이스가 개발자의 비공개 오류 트래커로 바로 전송되므로,
`idea.log`를 뒤질 필요 없이 버그를 찾아낼 수 있습니다.

이 버튼을 누를 만한 이유는 다음과 같습니다:

- **누르지 않으면 아무것도 전송되지 않습니다.** 대화 상자를 닫으면 아무것도 컴퓨터를 떠나지 않습니다. 대기열도 백그라운드 재시도도 없습니다.
- **전송 전에 최소화 및 마스킹됩니다** - 서버가 아니라 사용자 컴퓨터에서 처리됩니다. 토큰은 가려지고, 조직·프로젝트·리포지토리·서버·사용자 이름은 자리 표시자로 대체됩니다. 코드, diff (변경 내용), 댓글은 절대
  포함되지 않습니다.
- **비공개입니다.** 보고서는 공개 트래커가 아니라 독일 데이터 리전으로 설정된 비공개 Sentry 프로젝트로 전송됩니다.
- 대화 상자의 댓글 상자에 무엇을 하고 있었는지 한 문장 적어 둘 수 있습니다. 그 짧은 메모가 스택 트레이스를 수정으로 바꿔 놓는 경우가 많습니다.

보고서에 정확히 무엇이 포함되는지에 대한 전체 내용은
[개인정보 및 데이터](Privacy-and-Data-ko.md#crash-reports)를 참고하세요.

> 오프라인 상태, 만료된 토큰, 403, 존재하지 않는 파일 같은 일상적인 실패는 처리되어
> 로컬에 기록됩니다. 이런 것들은 버그가 아니므로 이 대화 상자를 띄우지 않습니다.
> 그런 경우에는 Help 메뉴의 버그 양식을 사용하세요.
> {style="note"}

### 진단 정보 복사하기 {id="copying-diagnostics"}

<ui-path>Help &#124; Copy DevOps Lens Diagnostics</ui-path>는 짧고 마스킹된
스냅샷을 클립보드에 담습니다. 플러그인 버전, IDE 빌드, Java 런타임, OS, 구성된 계정
수와 각 계정이 클라우드인지 온프레미스인지, 플러그인이 현재 스스로를 온라인으로 보고
있는지, 그리고 캐시 통계가 들어갑니다. URL도, 조직 이름도, 자격 증명도 없습니다.

일반 텍스트이므로 붙여 넣기 전에 직접 읽어 볼 수 있습니다. 공개 이슈에 환경 정보를 첨부하는 권장 방법이며, 크래시 보고서를 전혀 보내고 싶지 않을 때 버그를 신고하는 방법이기도 합니다.

## 버그 신고하기 {id="filing-a-bug"}

재현 가능한 문제를 발견했다면 공개 트래커 [%tracker_url%](%tracker_url%)에 신고하세요. 어떤 창구를 쓸지, 응답에 얼마나 걸리는지, 보안 문제는 어떻게
알리는지는 [](Support-ko.md)에 정리되어 있습니다.

<procedure>
    <step><ui-path>Help | Diagnostic Tools | Collect Logs and Diagnostic Data</ui-path>를 실행하세요.</step>
    <step><ui-path>Help | Report DevOps Lens Issue…</ui-path>를 선택하거나, <ui-path>Settings | Tools | DevOps Lens</ui-path> 페이지 하단의 <b>Report a bug</b>를 클릭하세요. 어느 쪽이든 IDE 빌드, 플러그인 버전, 운영체제가 미리 채워진 상태로 양식이 열립니다. (<a href="%new_bug_url%">새 버그 신고</a>를 직접 열어 손으로 입력해도 됩니다.) 다음을 포함하세요:
        <ul>
            <li>IDE 버전(<b>About</b>)</li>
            <li>플러그인 버전</li>
            <li>OS 및 아키텍처</li>
            <li>재현 단계</li>
            <li>예상 동작과 실제 동작</li>
            <li>정리된 <code>idea.log</code> 스니펫(게시 전 토큰 제거)</li>
        </ul>
    </step>
</procedure>

> **공개 이슈에 PAT나 OAuth 갱신 토큰을 절대 붙여넣지 마세요.** 로그는 기본적으로 편집된 (redacted) 토큰을 캡처하지만, 제출 전에 항상 다시 확인하세요.
> {style="warning"}
