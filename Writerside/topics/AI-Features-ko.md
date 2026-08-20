# AI 기능

<tldr>
    <p><b>위치</b>: PR 타임라인의 AI 요약 카드, Diff 도구 모음, 모든 댓글 편집기.</p>
    <p><b>켜는 방법</b>: <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>에서 <b>Enable AI assistance</b>를 켠 다음 공급자를 추가하세요.</p>
</tldr>

선택적 AI 도우미: PR 요약, 전체 diff (변경 내용) 리뷰, 코드 설명, 커밋 메시지, PR 제목/설명 초안, 문법 다듬기, 파이프라인 로그 분석. **자신의 공급자를 직접 사용하세요** - OpenAI,
Claude, Gemini, Ollama 또는 GitHub Copilot - 그리고 각 기능을 원하는 곳으로 라우팅하세요. Claude Code 같은 AI 에이전트를 사용하시나요?
플러그인은 Azure DevOps 데이터를 [MCP 도구](MCP-Tools-ko.md)로 에이전트에 제공할 수도 있습니다.

> 모든 AI 호출은 **사용자가 트리거**하며, 공급자를 추가하기 전까지는 아무것도 어디로도 전송될 수 없습니다: 마스터 스위치는 켜진 상태로 제공되지만, 사용 가능한 공급자가 구성되어 있지 않으면 플러그인은
> **외부로 나가는 AI 호출을 전혀 하지 않습니다** - AI 버튼은 그저 설정 페이지로 안내할 뿐입니다. 공급자에게 정확히 무엇이 전송되는지는 [](Privacy-and-Data-ko.md)를
> 참조하세요.
> {style="note"}

> 공급자가 설정되기 전까지 PR 타임라인은 요약 카드 자리에 AI Settings로 바로 연결되는 일회성 **AI 온보딩 카드**를 표시합니다. **✕**로 닫으면 다시는 나타나지 않으며, 공급자를 구성하면
> 실제 [요약 카드](#tune-the-summary)로 바뀝니다.
> {style="tip"}

## 플러그인이 AI로 할 수 있는 일 {id="what-the-plugin-can-do-with-ai"}

| 기능                                      | 하는 일                                                                                                                                       | 위치                                                              |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| **Summarize Pull Request**                | 설명에 넣을 수 있는 diff(변경 내용) 요약 초안을 작성합니다.                                                                                   | 타임라인 카드 / 오버플로 메뉴                                     |
| **Run AI Review**                         | diff(변경 내용)를 살펴보고 인라인 리뷰 댓글을 제안합니다.                                                                                     | Diff 도구 모음 / 변경 내용 트리 메뉴 / 오버플로                   |
| **Explain This File**                     | 파일이나 선택 영역에 대한 쉬운 영어 설명을 스트리밍합니다.                                                                                    | diff(변경 내용)에서 오른쪽 클릭                                   |
| **Generate Commit Message with AI**       | 스테이징된 변경 사항으로 커밋 메시지 초안을 작성합니다.                                                                                       | Commit 도구 창                                                    |
| **Title + Description**                   | 브랜치의 diff(변경 내용)로 Create-PR 양식을 미리 채웁니다.                                                                                    | Create Pull Request 양식                                          |
| **Polish grammar &amp; spelling with AI** | 모든 댓글이나 설명을 제자리에서 정리합니다.                                                                                                   | 모든 댓글 편집기                                                  |
| **Analyze logs with AI**                  | 완료된 파이프라인 실행을 로그로 설명합니다 - 실패라면 근본 원인과 수정안을, 성공이라면 짧은 요약을 제공합니다. 로그의 관련 부분만 전송합니다. | [파이프라인 실행 작업 로그](Pipelines-ko.md#analyze-logs-with-ai) |

![PR 타임라인의 AI 요약 카드](ai-summary-card-ko.png){ width="700" border-effect="line" }

> **Run AI Review**는 diff (변경 내용)에 인라인 제안을 제안합니다. 각 제안은 **Add to review** - AI의 텍스트를 해당 줄의 새 댓글 편집기에 넣어 편집하고 초안으로 대기열에
> 넣을 수 있게 합니다 - 또는 **Discard**를 제공하는데, Discard는 제안을 버려진 풀 (pool)에 보관해 두었다가 **⟲ 복원** 컨트롤로 다시 불러올 수 있게 합니다 (복원은 무료이며 - 절대 유료
> 재실행이 아닙니다). 제안 카드에 포커스가 있는 동안 <shortcut>A</shortcut>는 추가하고 <shortcut>D</shortcut>는 버리며, <shortcut>
> F8</shortcut> / <shortcut>⇧F8</shortcut>은 사람의 댓글, 대기 중인 초안, AI 제안을 하나의 읽기 순서로 이동합니다. **대기 중인 댓글을 제출하기 전까지는 Azure DevOps에
아무것도 게시되지 않습니다.**
> {style="tip"}

> 실패한 실행은 조용히 실패하지 않습니다: 인증, 할당량, 속도 제한, 과부하, 컨텍스트 초과, 네트워크 오류는 각각 원클릭 **Open AI Settings** 이동이 포함된 실행 가능한 자체 메시지를 받으며 -
> CLI 로그인 실패는 수정 명령 (예: `claude /login`)의 복사를 제안합니다.
> {style="note"}

### AI 리뷰가 아직 유효한가요? {id="is-the-ai-review-still-current"}

PR 타임라인의 오른쪽 사이드바에는 **AI review** 섹션이 있습니다 - 마지막 리뷰가 아직 코드와 일치하는지 한눈에 알려 주는 답입니다. 세 가지 상태 중 하나를 표시합니다:

| 상태               | 섹션에 표시되는 내용                                                                                                                                                                                    |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **실행한 적 없음** | *Not run for this pull request yet.* 아래에 **Run AI review** 링크.                                                                                                                                     |
| **최신**           | ✓ *Reviewed 2 hours ago*, 그다음 개수 - *"3 suggestions, inline in the diff."* 또는 *"No suggestions - clean pass."* - 아래에 **View suggestions**와 **Re-run**.                                       |
| **오래됨**         | ⚠ *Review out of date*, 그다음 *"2 new commits since the last review."* - 강제 푸시 이후처럼 개수를 알 수 없을 때는 *"The pull request changed since the last review."* - 아래에 **Re-run AI review**. |

**View suggestions**는 diff (변경 내용)의 첫 번째 제안으로 이동합니다. 실행 결과 제안이 하나 이상 나왔을 때만 표시됩니다. **Re-run**은 다른 곳의 **Run AI Review**와
동일한 경로를 타므로, 버려진 제안을 복원하는 것과 달리 새로운 유료 실행입니다.

이 섹션은 실시간입니다. 폴링, 커밋 로드, 리뷰 완료 때마다 다시 렌더링되므로, 푸시가 들어오는 순간 *Reviewed 2 hours ago* 가 *2 new commits since the last
review.* 로 바뀝니다.

> AI가 꺼져 있거나 공급자가 구성되지 않은 동안에는 이 섹션 전체가 숨겨집니다 - 비어 있는 **AI review** 제목은 죽은 장식일 뿐이고, 구성되지 않은 경우는 이미 온보딩 카드가 다루고 있기 때문입니다.
> {style="note"}

### 요약 조정 {id="tune-the-summary"}

**AI summary** 카드의 오른쪽 상단 모서리에 있는 **Summary settings** 기어를 누르면 요약 생성 방식을 제어하는 팝업이 열립니다:

| 컨트롤                             | 옵션                                                                                                                                                                           |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Generate automatically on open** | 체크박스 - 기본적으로 꺼짐. 켜면 PR이 열리는 즉시 카드가 요약 초안을 작성합니다.                                                                                               |
| **Verbosity**                      | 슬라이더: **Brief** · **Neutral** · **Verbose**.                                                                                                                               |
| **Formality tone**                 | 슬라이더: **Informal** · **Neutral** · **Formal**.                                                                                                                             |
| **Personality**                    | 자유 텍스트 - 선택적 페르소나, 예: "약간 냉소적인 수석 엔지니어".                                                                                                              |
| **Customization prompt**           | 자유 텍스트 - 기본값을 사용하려면 비워 두세요. 이는 AI Settings의 **Configure Prompts → Pull Request summary**와 동일한 재정의이므로 어느 쪽에서 편집하든 동기화가 유지됩니다. |

Save 버튼은 없습니다 - 컨트롤을 편집하고 팝업을 닫으면 적용됩니다.

![AI 요약 카드의 기어에서 나오는 Summary settings 팝업](ai-summary-settings-popup-ko.png){ width="520" border-effect="line" }

## 공급자 구성

<ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>를 열고 **Enable AI assistance**(마스터 스위치)를 켜세요. 그런 다음 **AI Providers** 표에서 공급자를 추가하세요.

![AI Settings 페이지: 공급자 및 기능별 라우팅](configure-providers-ko.png){ width="720" border-effect="line" thumbnail="true" }

각 행은 **Provider**, **Model**, **Enabled** 열이 있는 하나의 공급자 인스턴스입니다. 활성화된 첫 번째 행이 기본값입니다. **Add AI Provider** 대화 상자는 다섯 가지
제품군을 제공합니다:

| 제품군             | 참고                                                                     |
|--------------------|--------------------------------------------------------------------------|
| **OpenAI**         | GPT 모델. OpenAI 호환 base URL(Azure OpenAI, vLLM, …)과 함께 작동합니다. |
| **Claude**         | Anthropic Claude 모델.                                                   |
| **Gemini**         | Google Gemini 모델.                                                      |
| **Ollama**         | 로컬 모델 - 무료, 키 불필요.                                             |
| **GitHub Copilot** | Copilot 구독을 사용합니다(CLI 전용).                                     |

> Add/Edit 대화 상자의 **Model** 드롭다운은 스스로 채워집니다: 번들된 추천 목록을 즉시 표시한 다음, 공급자에 대한 실시간 쿼리 (예: OpenAI 및 Claude의 `/v1/models`)에서
> 새로 고쳐 새로 출시된 모델이 플러그인 업데이트 없이 나타나도록 합니다. 실시간 목록은 약 30분 동안 캐시됩니다. 대화 상자를 열 때마다, 그리고 제품군이나 모드를 변경할 때마다 새로 고쳐지므로 수동 새로 고침
> 버튼은 없습니다. 검색에는 저장된 키가 필요합니다 - 키가 입력될 때까지 드롭다운은 추천 목록으로 대체됩니다. 필드는 계속 편집 가능하므로 언제든지 모델 id를 직접 입력할 수 있습니다.
> {style="note"}

대부분의 제품군은 두 가지 **모드** 중 하나로 실행됩니다:

- **HTTP API (use an API key)** - 키를 붙여 넣으세요. 선택적으로 사용자 지정 엔드포인트를 가리키도록 **API URL**을 설정하세요. 키는 IDE 키체인 (PasswordSafe)에
  저장됩니다.
- **CLI (use the local command-line tool)** - 키 없음. 로컬 바이너리가 자체 인증을 처리합니다. 마찰이 가장 적은 경로이지만 CLI 공급업체의 약관을 감수해야 합니다.

저장하기 전에 공급자가 작동하는지 확인하려면 대화 상자에서 **Test Connection**을 사용하세요.

## 기능을 공급자로 라우팅

**Per-Feature Provider** 패널은 각 기능을 특정 인스턴스에 고정합니다 - 저렴한 기능은 작은 모델로, 무거운 리뷰는 똑똑한 모델로 보내는 데 유용합니다:

```
AI Summary          → [Default ▾]
AI Review           → [Default ▾]
Title + Description → [Default ▾]   (also used by Generate Commit Message)
Explain Code        → [Default ▾]
```

행을 **Default**로 두면 활성화된 첫 번째 공급자가 사용됩니다. **같은 제품군을 두 번 이상** 추가할 수 있으며 (예: 저렴한 모델과 똑똑한 모델의 OpenAI 행 두 개), 각각에 독립적으로 라우팅할
수 있습니다.

### Configure Prompts

**Configure Prompts** 패널을 사용하면 각 기능 뒤에 있는 시스템 프롬프트를 편집할 수 있습니다. 프롬프트를 편집하면 해당 기능에 대한 캐시된 응답이 무효화됩니다.

## 응답 언어 선택 {id="pick-the-response-language"}

**General AI Settings** 그룹에서 마스터 스위치 바로 아래에 있는 두 개의 설정입니다:

| 설정                                                                        | 기본값 |
|-----------------------------------------------------------------------------|--------|
| **AI response language**                                                    | Auto   |
| **Also use this language for PR titles, descriptions, and commit messages** | 끔     |

**AI response language**는 모델이 요약, 코드 설명, 리뷰 노트, 파이프라인 로그 분석을 작성하는 언어입니다. **Auto**는 IDE
언어를 따르며, 직접 작성한 텍스트를 다듬을 때는 항상 그 텍스트를 쓴 언어가 유지됩니다. 아래의 확인란이 별도의 옵트인인
이유는, PR 제목과 설명, 커밋 메시지는 git 히스토리와 풀 리퀘스트에 남는 것이라 IDE 언어보다 팀의 관례가 더 중요하기
때문입니다 - IDE 안에서 읽는 내용은 어느 쪽이든 드롭다운을 따릅니다.

## 캐싱, 비용 및 한도

AI 응답은 **PR별 + 커밋 SHA별**로 캐시됩니다 (토글: **Cache AI responses per commit SHA**, 기본적으로 켜짐). 캐시 적중 시 API 호출 없이 즉시 반환됩니다. 새
커밋이나 편집된 프롬프트는 이를 무효화합니다. **Advanced**의 **Clear AI Response Cache**로 강제 새로 고침을 할 수 있습니다.

사용한 토큰에 대해서는 공급자 요금을 지불합니다. 사용량을 낮게 유지하려면:

- 기능별 라우팅을 통해 저렴한 기능 (커밋 메시지, 제목)을 작은 모델로 라우팅하세요.
- **Advanced**에서 **Max diff size**를 낮춰 큰 diff (변경 내용)를 전송하기 전에 잘라내세요.
- 캐시를 켜 두어 PR을 다시 열 때 요금이 다시 청구되지 않도록 하세요.

일부 절감은 자동으로 이루어집니다: 잠금 파일 (`package-lock.json`, `yarn.lock`, `uv.lock` 등), 압축 (minified)·자동 생성 파일, 바이너리, 빌드 출력 폴더는 전송 전에
모든 AI diff에서 제거됩니다. 이름이 변경된 파일은 실제 편집 내용만 전송하고, 삭제된 파일은 내용 대신 한 줄짜리 메모만 전송합니다.

> 공급자 할당량 및 사용 한도 오류는 공급자에서 직접 옵니다 - 플러그인은 이를 분류하고 조용히 실패하는 대신 명확하고 실행 가능한 문구를 표시합니다. 자체 속도 제한이나 재시도를 추가하지 않습니다.
> {style="note"}

## 모든 것을 로컬에 유지하거나, 끄기

- **로컬 추론:** 모든 기능을 `localhost`의 **Ollama** 인스턴스로 라우팅하세요 - 어떤 코드도 사용자의 컴퓨터를 벗어나지 않습니다.
- **완전히 끄기:** **Enable AI assistance**의 체크를 해제하세요. 모든 AI 기능이 메뉴와 도구 모음에서 사라지고 플러그인은 아웃바운드 AI 호출을 전혀 하지 않습니다.
