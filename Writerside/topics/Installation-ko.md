# 설치

<tldr>
    <p><b>설치</b>: <ui-path>Settings | Plugins | Marketplace</ui-path>에서 <b>DevOps Lens</b>을 검색하고 <b>Install</b>을 클릭하면 됩니다 - 재시작이 필요 없습니다.</p>
    <p><b>필요한 것</b>: JetBrains %min_ide_version% 이상 (빌드 <code>%min_ide_build%.*</code>).</p>
    <p><b>다음 단계</b>: Azure DevOps 원격이 있는 프로젝트를 열고 <a href="Authentication-ko.md">로그인</a>합니다.</p>
</tldr>

%product%은 (는) Azure DevOps의 풀 리퀘스트, 코드 리뷰, 파이프라인을 JetBrains IDE 안으로 가져오는 플러그인입니다. 이 페이지에서 설치 방법을 안내합니다.

## 지원되는 IDE

이 플러그인은 IntelliJ 플랫폼을 대상으로 하며, 해당 플랫폼을 기반으로 하는 모든 IDE에서 실행됩니다.

- IntelliJ IDEA (Ultimate &amp; Community)
- JetBrains Rider
- PyCharm (Professional &amp; Community)
- WebStorm, PhpStorm, GoLand, RubyMine, CLion, DataGrip, RustRover
- Android Studio (작동할 수 있으나 공식적으로 지원되지 않음)

### 최소 빌드

이 플러그인은 모든 JetBrains IDE의 **%min_ide_version%** 이상 릴리스 - 즉 IDE 빌드 `%min_ide_build%.*` 이상 - 을 지원합니다.

> **버전 확인:** IDE 메뉴에서 **About**을 열고 `%min_ide_build%`(으)로 시작하는 빌드 번호를 확인하세요. 더 낮다면 먼저 **Help → Check for Updates**를
> 실행하세요.
> {style="note"}

## 플러그인 설치

<tabs>
    <tab title="IDE 설정에서">
        <procedure title="IDE 설정에서 설치">
            <step><ui-path>Settings | Plugins | Marketplace</ui-path>를 엽니다(macOS에서는 <shortcut>⌘,</shortcut>, Windows/Linux에서는 <shortcut>Ctrl+Alt+S</shortcut>).</step>
            <step><b>DevOps Lens</b>을 검색합니다.</step>
            <step><b>Install</b>을 클릭합니다. 플러그인이 즉시 로드됩니다 - 재시작이 필요 없습니다.</step>
        </procedure>
        <p>설치가 끝나면 플러그인이 <b>Installed</b>의 <b>User-installed</b> 항목에 활성화된 상태로 표시됩니다.</p>
    </tab>
    <tab title="Marketplace 웹페이지에서">
        <procedure title="Marketplace 웹페이지에서 설치">
            <step><a href="%marketplace_url%">%product% Marketplace 페이지</a>를 엽니다.</step>
            <step><b>Install to IDE</b>를 클릭하고 사용할 IDE를 선택합니다.</step>
            <step>IDE에서 설치를 확인합니다. 플러그인이 즉시 로드됩니다 - 재시작이 필요 없습니다.</step>
        </procedure>
    </tab>
</tabs>

### 제대로 설치되었는지 확인

Azure DevOps Git 원격이 있는 프로젝트를 연 다음 확인합니다.

- 왼쪽 도구 창 표시줄에 **Pull Requests** 스트라이프 아이콘이 나타납니다.
- <ui-path>Settings | Tools | DevOps Lens</ui-path>가 존재합니다.

> **도구 창이 보이지 않나요?** 프로젝트에 **Azure DevOps 원격이 없으면** 숨겨집니다. `git remote -v`를 실행하여 URL에 `dev.azure.com` 또는
> `visualstudio.com`이 포함되어 있는지 확인하세요. [](Troubleshooting-ko.md)을 참고하세요.
> {style="note"}

## 시스템 요구 사항

| 구성 요소 | 최소                    | 참고                                  |
|-----------|-------------------------|---------------------------------------|
| IDE 빌드  | %min_ide_build%.*       | JetBrains %min_ide_version% 이상      |
| JDK       | 25                      | IDE에 번들로 제공                     |
| Git       | 2.20+                   | 브랜치 감지 및 HTTPS 인증 전달        |
| OS        | macOS / Windows / Linux | IDE가 지원하는 모든 플랫폼            |
| 네트워크  | Azure DevOps로의 HTTPS  | `dev.azure.com` 또는 자체 호스팅 서버 |

> **프록시 뒤에 있나요?** 이 플러그인은 IDE 자체의 HTTP 프록시를 사용합니다. <ui-path>Settings | Appearance &amp; Behavior | System Settings |
> HTTP Proxy</ui-path>에서 한 번만 설정하면 Azure DevOps와 (HTTP) AI 호출 모두 이를 상속합니다. CLI 기반 AI 제공자는 외부 바이너리이므로 이를 통해 라우팅되지 않습니다.
> {style="note"}

## 필수 번들 플러그인

이 플러그인은 두 개의 IDE 번들 플러그인 (모든 곳에서 기본적으로 활성화됨)에 **의존합니다**. 둘 중 하나라도 비활성화되면 플러그인이 로드되지 않으므로 <ui-path>Settings | Plugins |
Installed</ui-path>에서 다시 활성화하세요.

- **Git** (`Git4Idea`) - 브랜치 감지 및 HTTPS 자격 증명.
- **Markdown** - 댓글 및 설명 편집기를 구동합니다.

하나 더는 **선택 사항**입니다.

- **PDF Viewer** *(선택 사항, Marketplace에서 설치)* - 풀 리퀘스트 diff에서 PDF 파일을 미리 보는 데만 필요합니다. 그 외 모든 기능은 이 플러그인 없이도 작동합니다.

## 업데이트 및 제거

<procedure title="새 버전으로 업데이트">
    <step><ui-path>Settings | Plugins | Installed</ui-path>를 엽니다 - 제공되는 업데이트가 여기에 표시됩니다.</step>
    <step><b>Update</b>를 클릭합니다. 새 버전이 제자리에서 로드되며, 일반적으로 재시작이 필요 없습니다.</step>
</procedure>

제거하려면 기어 아이콘 → **Uninstall**을 사용하세요. 저장된 자격 증명도 키체인에서 제거됩니다.

> **재시작이 필요 없습니다.** %product%은 (는) 동적 플러그인이므로 IDE를 재시작하지 않고도 설치, 업데이트, 제거가 이루어지며, 로드되는 즉시 키보드 단축키가
> 프로젝트별로 연결됩니다. IDE가 여전히 재시작 버튼을 표시하더라도 건너뛰어도 됩니다.
> {style="note"}

> **다음 단계:** 1분 둘러보기는 [](Quick-Start-ko.md)을, 로그인은 [](Authentication-ko.md)을 참고하세요. 요약 및 AI 리뷰를
> 활성화하려면 [](AI-Features-ko.md)을 참고하세요.
> {style="tip"}
