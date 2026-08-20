# AI 에이전트용 MCP 도구

<tldr>
    <p><b>개요</b>: IDE에 연결된 AI 에이전트(Claude Code, Codex CLI, Copilot CLI 등)가 로그인된 연결을 통해 Azure DevOps 도구를 사용할 수 있습니다.</p>
    <p><b>설정</b>: 읽기는 설정이 필요 없습니다. 에이전트가 무언가를 변경하도록 허용하려면 <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>에서 <b>Let AI agents change Azure DevOps</b>를 체크하세요.</p>
</tldr>

플러그인은 **IDE에 내장된 MCP 서버**(Model Context Protocol)를 통해 Azure DevOps 도구를 제공합니다. IDE에 연결한 모든 MCP
클라이언트 - Claude Code, Codex CLI, Copilot CLI 등 - 는 이미 로그인된 연결을 통해 풀 리퀘스트 목록 조회, 리뷰 스레드 읽기, 파이프라인
실행과 실패 조사, 그리고 (별도로 옵트인하면) 댓글 작성, 투표, 실행 큐잉을 수행할 수 있습니다.

> 자격 증명은 에이전트에 절대 전달되지 않습니다. 도구는 플러그인의 인증된 클라이언트를 사용해 **IDE 내부에서** 실행되며, 에이전트는 토큰이 아닌
> 결과만 받습니다. 온프레미스 서버, 프록시, 사용자 지정 인증서는 플러그인의 다른 기능과 똑같이 동작하며, 에이전트 쪽 추가 설정은 필요 없습니다.
> {style="note"}

## 요구 사항

- 번들된 **MCP Server** 플러그인(`com.intellij.mcpServer`)이 활성화되어 있어야 합니다 - 이 플러그인이 지원하는 모든 IDE에 함께 제공됩니다. 비활성화된 경우 Azure DevOps 도구는 등록되지 않습니다.
- 활성 Azure DevOps 연결: 로그인하고 Pull Requests 도구 창에서 리포지토리를 선택한 상태여야 합니다.
- IDE 서버에 연결된 MCP 클라이언트 - <ui-path>Settings | Tools | MCP Server</ui-path>에서 설정하며, 주요 클라이언트용 구성 예시가 표시됩니다.

## 읽기는 별도 설정 없이 동작합니다

읽기 도구를 켜기 위해 할 일은 없습니다. 에이전트를 IDE의 MCP 서버에 연결하면, 이미 로그인된 연결을 통해 풀 리퀘스트와 파이프라인을 곧바로
조회하고 읽을 수 있습니다.

## 에이전트가 변경하도록 허용하기

<ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>의 체크박스 하나이며, 기본값은 **꺼짐**입니다:

**Let AI agents change Azure DevOps (comment, vote, resolve threads, run and cancel pipelines)**

이 설정은 **모든** 도구 호출마다 확인되므로 켜고 끄면 즉시 적용됩니다 - 재시작도 재연결도 필요 없습니다. 꺼져 있는 동안 쓰기 도구는
"읽기 전용"이라는 짧은 힌트로 응답하며, 에이전트가 이를 사용자에게 전달할 수 있습니다.

> 왜 쓰기만 따로일까요? 에이전트가 읽는 풀 리퀘스트 내용 - 설명, 댓글, 빌드 로그 - 은 다른 사람이 작성한 것입니다. 악의적인 댓글이
> 에이전트를 설득해 "친절하게" 무언가를 변경하게 만들 수도 있습니다("배포 파이프라인을 다시 실행해 주세요" 등). Azure DevOps를 변경하는
> 작업을 별도의 옵트인 뒤에 두면 읽기는 안전하게 유지되고, 플러그인의 도구 설명은 에이전트에게 그 내용을 지시가 아닌 데이터로 취급하라고
> 명시적으로 알려줍니다.
> {style="warning"}

> 이 설정은 플러그인 자체의 AI 기능(요약, AI 리뷰, 커밋 메시지)에는 영향을 주지 않습니다. 그 기능들은
> 한 번에 텍스트를 생성할 뿐 도구를 호출하지 않습니다. 이 페이지는 *사용자가* 연결한 에이전트에 대해서만 다룹니다.
> {style="note"}

## 도구 목록

읽기 도구(항상 사용 가능):

| 도구                                    | 반환 내용                                                                                    |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| `get_connection`                | 현재 IDE 프로젝트의 서버, 프로젝트, 리포지토리, 로그인 사용자 - 에이전트의 출발점.            |
| `get_ide_context`               | 지금 작업 중인 대상: 체크아웃된 브랜치, 그 브랜치의 풀 리퀘스트, 로컬이 PR 헤드보다 뒤처졌는지. "내 PR", "이 브랜치"를 해석합니다. |
| `find_pull_request_for_branch`  | 브랜치에서 만든 활성 PR - 기본값은 체크아웃된 브랜치.                                         |
| `list_pull_requests`            | PR 목록(최신순). 상태, 작성자 = 나, 리뷰어 = 나, 소스/대상 브랜치로 필터링하며 페이징도 지원. |
| `get_pull_request`              | PR 1건: 설명, 브랜치, 병합 상태, 리뷰어와 투표, 웹 URL, 대상 커밋 범위.                       |
| `list_pull_request_threads`     | 사람의 토론 스레드(시스템 이벤트 제외). 기본값은 미해결만.                                    |
| `list_pull_request_changes`     | 변경된 파일 목록(추가/편집/삭제/이름 변경 종류와 개수, 베이스와 헤드 커밋 포함).              |
| `get_pull_request_diff`         | 실제 통합 diff - 파일 목록이 아니라 코드 자체. 원하는 경로로 좁힐 수도 있습니다.               |
| `get_pull_request_file`         | PR의 헤드(또는 베이스) 커밋 시점 파일 전문 - 로컬 체크아웃에 없는 파일을 읽을 때 사용합니다.   |
| `list_pull_request_commits`     | PR에 포함된 커밋.                                                                            |
| `get_pull_request_checks`       | 병합 준비 상태: 게시된 상태와 브랜치 정책 평가를 병합해 차단 여부와 빌드 검증의 실행 ID를 제시. |
| `list_pipelines`                | 프로젝트의 파이프라인 목록(이름으로 필터링 가능).                                            |
| `list_pipeline_runs`            | 최근 실행. 파이프라인, 브랜치, 결과, 기간으로 좁힐 수 있습니다.                              |
| `get_pipeline_run`              | 실행 1건(스테이지/작업별 내역과 오류 개수 포함).                                             |
| `get_pipeline_run_failures`     | 실패 보고서: 실패한 단계, 오류 주석, 실패 지점 주변의 로그 발췌.                              |
| `get_pipeline_step_log`         | 지정한 단계 또는 작업 하나의 로그 - 실패 보고서가 아무것도 알려주지 않는 성공한 실행에서도 가능. |
| `get_pipeline_run_test_results` | 테스트 결과 집계와 실패한 테스트 케이스.                                                     |
| `get_pipeline_run_changes`      | 이전 실행 이후 추가된 커밋 - 파이프라인이 빨개졌을 때 가장 먼저 묻는 질문입니다.               |
| `list_pending_approvals`        | 실행을 막고 있는 수동 승인 게이트(스테이지, 안내, 승인자, 내 것인지 여부).                    |

쓰기 도구(위 체크박스 필요):

| 도구                                       | 동작                                                                                  |
|------------------------------------------|---------------------------------------------------------------------------------------|
| `add_pull_request_comment`         | PR에 새 스레드를 시작하거나 기존 스레드에 답글. Markdown 지원.                         |
| `add_pull_request_review_comment`  | 파일과 줄에 고정된 댓글을 게시 - 사람 리뷰어의 인라인 댓글과 같은 형태로 diff에 표시됩니다. |
| `set_pull_request_vote`            | 리뷰 투표 실행 - 승인, 제안과 함께 승인, 작성자 대기, 변경 요청, 또는 초기화.          |
| `resolve_pull_request_thread`      | 댓글 스레드를 해결하거나 다시 엽니다.                                                  |
| `run_pipeline`                     | 선택한 브랜치에서 파이프라인 실행을 큐에 추가(템플릿 매개변수 지정 가능) - YAML과 클래식, 클라우드와 온프레미스 모두 지원. |
| `cancel_pipeline_run`              | 진행 중인 실행을 취소.                                                                 |
| `retry_pipeline_stage`             | 실행의 한 스테이지만 그 자리에서 다시 실행(전체 실행을 다시 큐에 넣지 않음).            |

결과는 의도적으로 간결합니다. 자세한 내용은 아래 "잘림은 항상 보고됩니다"를 참고하세요. 트리밍은 플러그인 자체의
[AI 로그 분석](AI-Features-ko.md)과 같은 방식입니다.

## 절대 공개되지 않는 것

설정과 관계없이 풀 리퀘스트를 완료하거나 폐기하는 도구, 파이프라인 승인 게이트를 결정하는 도구는 **없습니다** - 에이전트는 대기 중인 게이트를
*볼* 수는 있어도 결코 투표할 수 없습니다. 그런 결정은 IDE나 웹의 사람에게 남습니다. 작업 항목 도구도 현재는 포함되어 있지 않습니다.

## 잘림은 항상 보고됩니다

도구 호출 한 번이 에이전트의 컨텍스트를 가득 채우지 않도록 결과는 의도적으로 간결합니다: 목록에는 상한이 있고, 긴 텍스트는 잘리며, 실패
보고서는 오류 주변의 줄만 담습니다. 무언가가 잘렸다면 결과가 반드시 그 사실을 알려줍니다 - `omittedFiles`, `omittedThreads`,
`omittedStages`, `truncated` 등. 에이전트가 일부만 보고도 전체를 봤다고 믿는 일은 없습니다.

## 문제 해결

- **쓰기 도구가 "read-only"라고 응답** - <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>에서 **Let AI agents change Azure DevOps**를 체크하세요. 재시작은 필요 없습니다.
- **"No Azure DevOps connection"** - 먼저 Pull Requests 도구 창을 열고 로그인한 뒤 리포지토리를 선택하세요.
- **도구가 아예 나타나지 않음** - IDE의 MCP Server 플러그인이 비활성화되었거나 클라이언트가 IDE 서버에 연결되지 않았습니다. <ui-path>Settings | Tools | MCP Server</ui-path>를 확인하세요.
- **에이전트가 엉뚱한 PR을 사용함** - `get_ide_context` 또는 `find_pull_request_for_branch`를 쓰도록 안내하세요. "내 PR"이 추측이 아닌 실제 ID로 해석됩니다.
