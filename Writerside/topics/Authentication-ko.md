# 인증

<tldr>
    <p><b>위치</b>: 계정 패널의 <b>+</b> 버튼, 또는 Pull Requests 도구 창의 로그인 화면.</p>
    <p><b>필요한 것</b>: Personal Access Token, 또는 OAuth를 사용하려면 Microsoft Entra ID 계정. <a anchor="on-prem">Azure DevOps Server</a>는 PAT 전용입니다.</p>
</tldr>

이 플러그인은 두 가지 방식으로 로그인합니다.

- **Personal Access Token (PAT)**
- **Microsoft Entra ID (OAuth)**
- 어느 방식이든 자격 증명은 IDE의 시스템 기반 키체인에 저장됩니다.

## 어떤 방법을 사용해야 하나요?

| 사용 대상…                | 사용 시점                                                                                                   |
|---------------------------|-------------------------------------------------------------------------------------------------------------|
| **Personal Access Token** | 온프레미스 Azure DevOps Server를 포함해 어디서나 작동합니다. 토큰 자체는 MFA를 다시 요구하지 않습니다.      |
| **Microsoft(OAuth)**      | 클라우드 `dev.azure.com` 전용입니다. 로그인할 때마다 조직의 SSO/MFA를 준수하며, 토큰이 자동으로 갱신됩니다. |

두 방식 모두 계정 패널의 **`+`** 버튼을 통해 로그인에 접근하며, 이 버튼은 작은 팝업을 엽니다:

![계정 추가 팝업: Log In with Token 및 Log In via Microsoft](add-account-menu-ko.png){ width="420" border-effect="line" }

> 온프레미스 Azure DevOps Server에서는 Microsoft 로그인을 완료할 수 없습니다 - 대신 무엇이 표시되는지, 그리고 Server 필드가 어떤 URL을
> 받는지는 [Azure DevOps Server (온프레미스)](#on-prem)를 참조하세요.
> {style="note"}

## Personal Access Token으로 로그인하기

### 1. 토큰 생성

플러그인이 해당 페이지로 안내해 줄 수 있습니다. 로그인 대화 상자의 **Generate…** 버튼은 브라우저에서 조직의 Personal Access Tokens 페이지를 엽니다. 또는 직접 생성할 수도 있습니다:

<procedure title="Azure DevOps에서 토큰 생성하기">
    <step>Azure DevOps를 열고 아바타(오른쪽 위)를 클릭한 뒤 → <b>Personal access tokens</b>를 선택합니다.</step>
    <step><b>+ New Token</b>을 클릭하고 이름, 조직, 만료 기간을 설정합니다.</step>
    <step>아래의 스코프를 부여합니다(또는 <b>Full access</b>를 선택하기만 하면 됩니다).</step>
    <step><b>Create</b>를 클릭하고 토큰을 복사합니다 - Azure DevOps는 토큰을 한 번만 표시합니다.</step>
</procedure>

> **간편 레시피:** 그냥 모든 기능이 작동하기를 원한다면 **Full access**를 선택하세요. 아래의 세분화된 스코프는 더 엄격한 보안 정책을 위한 것입니다 - 각 스코프가 없을 때 정확히 무엇이
> 꺼지는지는 [](Permissions-ko.md)에서 설명합니다.
> {style="tip"}

#### 플러그인이 사용하는 스코프 {id="pat-scopes"}

로그인 대화 상자에도 목록이 표시됩니다:

| 스코프(PAT UI에서)                     | 지원 기능                                                                                                                                                   |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Code** → *Read &amp; write + Status* | 풀 리퀘스트 및 diff(변경 내용) 읽기, 댓글 작성, 투표, 완료/중단, 브랜치 정책/상태 검사. **필수** - 이 스코프가 없는 토큰은 로그인 대화 상자에서 거부됩니다. |
| **User Profile** → *Read*              | 사용자 프로필 및 리뷰어 아바타.                                                                                                                             |
| **Identity** → *Read*                  | @-멘션 자동 완성 및 기본 PR 목록 뒤에 있는 팀 멤버십 조회.                                                                                                  |
| **Work Items** → *Read*                | PR에 연결된 작업 항목 및 Work Items 필터.                                                                                                                   |
| **Project and Team** → *Read*          | 기본 PR 목록의 **assigned to my team** 부분을 위한 팀 멤버십.                                                                                               |
| **Security** → *Manage*                | Complete 대화 상자에서 **Override branch policies** 옵션을 활성화하는 권한 검사.                                                                            |

### 2. 플러그인에 추가하기

<procedure title="토큰으로 로그인하기">
    <step>Pull Requests 도구 창(또는 <ui-path>Settings | Tools | DevOps Lens</ui-path>)에서 <b>+</b> → <b>Log In with Token…</b>을 클릭합니다.</step>
    <step>두 개의 필드를 채웁니다:
        <ul>
            <li><b>Server</b> - 전체 URL(<code>https://dev.azure.com/your-org</code>), 조직 슬러그만(<code>your-org</code>), 레거시 <code>visualstudio.com</code> URL, 또는 온프레미스 URL(<code>https://tfs.example.com/tfs/your-collection</code>). 별도의 조직 필드는 없습니다 - 조직은 이 필드에서 읽어옵니다.</li>
            <li><b>Token</b> - PAT를 붙여넣습니다.</li>
        </ul>
    </step>
    <step><b>Log In</b>을 클릭합니다(또는 그냥 <shortcut>Enter ↵</shortcut>를 누르세요). 플러그인이 토큰을 검증하고("Validating credentials…") 도구 창이 채워집니다.</step>
</procedure>

> Server 필드는 **https URL만** 허용합니다 - PAT는 모든 요청에 HTTP Basic으로 실려 가기 때문에, 대화 상자는 일반 `http://`를 처음부터 거부합니다. 그리고 검증은 "로그인이
> 되는가"에서 그치지 않습니다: 플러그인은 풀 리퀘스트도 시험 삼아 읽어 보기 때문에, 인증은 되지만 **Code** 스코프가 없는 토큰은 누락된 스코프를 명시한 메시지와 함께 그 자리에서 거부됩니다.
> {style="note"}

![Server 및 Token 필드가 있는 Log In to Azure DevOps 대화 상자](sign-in-with-token-ko.png){ width="560" border-effect="line" }

### 토큰 교체 또는 취소

<procedure title="토큰 교체하기">
    <step>Azure DevOps에서 동일한 스코프로 새 토큰을 만들고 복사합니다.</step>
    <step><ui-path>Settings | Tools | DevOps Lens</ui-path>에서 계정 행의 <b>연필</b> 아이콘을 클릭하고 새 토큰을 붙여넣습니다. (편집 중에는 Server 필드가 잠기며 - 토큰만 변경됩니다.)</step>
    <step>다시 Azure DevOps로 돌아가 이전 토큰을 취소합니다.</step>
</procedure>

토큰이 취소되거나 만료되면 플러그인은 도구 창에 **Log In Again**을 표시합니다 - 이를 클릭해 새 토큰을 붙여넣으세요.

## Microsoft (OAuth)로 로그인하기

SSO를 선호하는 클라우드 조직의 경우 Microsoft Entra ID를 통해 로그인합니다.

<procedure title="Microsoft로 로그인하기">
    <step><b>+</b> → <b>Log In via Microsoft…</b>를 클릭합니다.</step>
    <step><b>Sign in with Microsoft</b>에서 권한 등급(아래)을 선택하고 <b>Continue</b>를 클릭합니다.</step>
    <step>브라우저에서 인증합니다(MFA 포함). 페이지가 로컬 루프백을 통해 IDE로 다시 리디렉션되며 <b>"Sign-in complete. You can close this tab."</b>가 표시됩니다.</step>
</procedure>

![Sign in with Microsoft 권한 선택기](sign-in-with-microsoft-ko.png){ width="560" border-effect="line" }

새로 고침 토큰은 자동으로 갱신되므로 (만료 60초 전 여유 시간 포함) 세션 간에도 로그인 상태가 유지됩니다.

### 권한 등급 {id="oauth-permission-tiers"}

| 등급                     | 제공되는 것                                                                                                         | 제공되지 않는 것                                                                                                                                                    |
|--------------------------|---------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Full access** *(권장)* | 풀 리퀘스트, 댓글, 투표, 상태 검사에 **더해** 아바타, @-멘션 검색, 연결된 작업 항목, 기본 PR 목록을 위한 팀 멤버십. | -                                                                                                                                                                   |
| **Standard access**      | 풀 리퀘스트와 댓글만.                                                                                               | 아바타는 이니셜로 표시되고, @-멘션 자동 완성은 아무것도 반환하지 않으며, 작업 항목 링크가 렌더링되지 않고, 사용자의 **teams**에 할당된 PR이 기본 목록에서 빠집니다. |

권한별 상세 매핑은 [](Permissions-ko.md)을 참조하세요.

> 나중에 등급을 변경하려면 계정을 제거하고 다시 로그인하세요 - 새로 로그인할 때마다 선택기가 다시 나타납니다.
> {style="tip"}

## Azure DevOps Server (온프레미스) {id="on-prem"}

온프레미스 서버는 **PAT 전용**입니다. Microsoft 로그인은 `login.microsoftonline.com`을 거쳐 리디렉션되는데, 이는 네트워크 내부의 서버에 도달할 수 없습니다. 그래서 플러그인은
흐름이 도중에 실패하도록 두는 대신 토큰 쪽으로 안내합니다.

![온프레미스 컬렉션의 도구 창 로그인 화면: Log In via Microsoft는 비활성, Log In with Token은 활성](oauth-access-scope-dialog.png){ width="720" border-effect="line" thumbnail="true" }

버튼이 사라지지는 않습니다 - 흐리게 비활성화된 상태로 보입니다. 리포지토리 선택기가 온프레미스 서버를 확인하고 나면 **Log In via Microsoft…** 는 화면에 남아 있되 비활성화되며, 다음 툴팁이
표시됩니다: *"Microsoft sign-in is only available for Azure DevOps Services (dev.azure.com). Use a Personal Access Token for
on-prem Azure DevOps Server."* 그 옆의 **Log In with Token…** 은 계속 활성화되어 있습니다.

### Server 필드에 무엇을 붙여넣어야 하나요

Server 필드는 두 가지 형태를 모두 받으며, 둘 다 같은 계정으로 확인되므로 이미 가지고 있는 URL을 그대로 붙여넣으면 됩니다:

| 형태                                | 예시                                                                     | 확인 결과                                                     |
|-------------------------------------|--------------------------------------------------------------------------|---------------------------------------------------------------|
| **컬렉션 URL**                      | `https://tfs.contoso.com:8080/tfs/my-collection`                         | 서버 `https://tfs.contoso.com:8080/tfs`, 조직 `my-collection` |
| **리포지토리(클론 / 브라우저) URL** | `https://tfs.contoso.com:8080/tfs/my-collection/my-project/_git/my-repo` | 서버 `https://tfs.contoso.com:8080/tfs`, 조직 `my-collection` |

호스트와 포트는 입력한 그대로 유지되므로 `:8080` 같은 비표준 포트도 괜찮습니다. 붙여넣은 웹 페이지 URL도 작동합니다 - 뒤에 붙은 `_` 접두사 세그먼트 (`_build`, `_settings`,
`_apis` 등)는 컬렉션까지 잘려 나갑니다.

> **https 전용** 규칙은 여기에도 적용됩니다: PAT는 모든 요청에 HTTP Basic으로 실려 가기 때문에 일반 `http://` 서버 URL은 거부됩니다. 로그인하기 전에 서버 (또는 그 앞의 프록시)
> 에서 TLS를 종료하세요.
> {style="warning"}

## 여러 계정

여러 Azure DevOps 조직에 동시에 로그인할 수 있습니다. <ui-path>Settings | Tools | DevOps Lens</ui-path>의 각 행에는 아바타, 표시 이름, 조직
URL, 인증 유형이 표시되며, 행마다 **연필**(편집) 및 **✕**(제거) 버튼이 있습니다.

![Settings의 Azure DevOps 계정 패널](multiple-accounts-ko.png){ width="700" border-effect="line" }

각 프로젝트는 자체 **기본 계정**을 기억합니다 (프로젝트의 워크스페이스에 저장됨) - 해당 프로젝트의 API 호출과 Git HTTPS 핸드오프에 사용되는 계정입니다.

## 자격 증명 저장소

PAT와 OAuth 새로 고침 토큰은 OS 키체인으로 뒷받침되는 IDE의 PasswordSafe에 저장됩니다:

<tabs>
    <tab title="macOS">Keychain - 로그인된 계정마다 하나의 항목.</tab>
    <tab title="Windows">Credential Manager(DPAPI로 암호화).</tab>
    <tab title="Linux">가능한 경우 KWallet / Secret Service, 그렇지 않으면 IDE 구성 디렉터리의 암호화된 파일.</tab>
</tabs>

<ui-path>Settings | Appearance &amp; Behavior | System Settings | Passwords</ui-path>에서 저장 모드를 전환합니다.

## 로그아웃

<ui-path>Settings | Tools | DevOps Lens</ui-path>에서 계정 행의 **✕**를 클릭하고 **Apply**를 클릭합니다. 토큰이 키체인에서 삭제되고 해당 계정의 캐시된 데이터가 모두 지워집니다.

## 일반적인 로그인 오류

| 메시지                                                   | 예상 원인                                                                                                 |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| **Token invalid or expired**                             | 잘못되었거나 만료된 PAT, 또는 스코프 누락. 최소한 *Code (Read &amp; write)* 를 포함하여 새로 만드세요.    |
| **This token signs in, but it can't read pull requests** | PAT가 인증은 되지만 **Code** 스코프가 없습니다 - *Code (Read &amp; write + Status)* 로 다시 생성하세요.   |
| **Organisation not found**                               | Server 필드의 조직이 존재하지 않거나 접근할 수 없습니다.                                                  |
| **Couldn't reach Azure DevOps**                          | 네트워크/프록시 문제 - <ui-path>Settings &#124; System Settings &#124; HTTP Proxy</ui-path>를 확인하세요. |
| **403 Forbidden** on an action                           | 계정에 프로젝트/리포지토리 권한이 없습니다 - 조직 관리자에게 문의하세요.                                  |

자세한 내용은 [](Troubleshooting-ko.md)을 참조하세요.
