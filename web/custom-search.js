/* Client-side search over the per-language search-index.json that
 * scripts/build-search-index.py writes at deploy time, fetched lazily on
 * first open.
 *
 * Scoring is substring-based rather than tokenized so CJK queries behave the
 * same as English ones: title > heading > body, AND across whitespace-
 * separated parts.
 */
(function () {
  'use strict';

  var BASE = '/devops-lens-doc';
  var MAX_RESULTS = 20;
  var SNIPPET_RADIUS = 70;

  var langMatch = location.pathname.replace(BASE, '').match(/^\/(zh|ja|ko)(\/|$)/);
  var LANG = langMatch ? langMatch[1] : '';
  var INDEX_URL = BASE + (LANG ? '/' + LANG : '') + '/search-index.json';

  var STRINGS = {
    '': { label: 'Search', placeholder: 'Search documentation…', hint: 'Type to search the documentation',
          none: 'No results for', loading: 'Loading search index…',
          error: 'Could not load the search index - check your connection and try again.',
          nav: 'navigate', open: 'open', close: 'close' },
    ja: { label: '検索', placeholder: 'ドキュメントを検索…', hint: '入力して検索',
          none: '一致する結果はありません:', loading: '検索インデックスを読み込み中…',
          error: '検索インデックスを読み込めませんでした。接続を確認して、もう一度お試しください。',
          nav: '移動', open: '開く', close: '閉じる' },
    ko: { label: '검색', placeholder: '문서 검색…', hint: '검색어를 입력하세요',
          none: '다음에 대한 결과 없음:', loading: '검색 인덱스 로드 중…',
          error: '검색 인덱스를 불러오지 못했습니다. 연결을 확인한 후 다시 시도하세요.',
          nav: '이동', open: '열기', close: '닫기' },
    zh: { label: '搜索', placeholder: '搜索文档…', hint: '输入以搜索文档',
          none: '未找到相关结果:', loading: '正在加载搜索索引…',
          error: '无法加载搜索索引 - 请检查网络连接后重试。',
          nav: '导航', open: '打开', close: '关闭' }
  };
  var T = STRINGS[LANG] || STRINGS[''];
  var IS_MAC = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  var SHORTCUT_LABEL = IS_MAC ? '⌘K' : 'Ctrl K';

  var pages = null;          // loaded index records
  var indexPromise = null;   // in-flight fetch; reset on failure so reopening retries
  var overlay = null;
  var input = null;
  var resultsEl = null;
  var statusEl = null;
  var selectedIndex = -1;
  var debounceTimer = 0;

  /* ---------------------------------------------------------------- index */

  function ensureIndex() {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL, { credentials: 'same-origin' })
        .then(function (response) {
          if (!response.ok) { throw new Error('HTTP ' + response.status); }
          return response.json();
        })
        .then(function (data) {
          pages = (data && data.pages) || [];
          return pages;
        });
      indexPromise.catch(function () { indexPromise = null; });
    }
    return indexPromise;
  }

  function prepared(page) {
    if (!page._prep) {
      page._prep = {
        title: page.title.toLowerCase(),
        headings: (page.headings || []).map(function (h) { return h.t.toLowerCase(); }),
        body: (page.body || '').toLowerCase()
      };
    }
    return page._prep;
  }

  /* -------------------------------------------------------------- scoring */

  function scorePage(page, parts, phrase) {
    var prep = prepared(page);
    var score = 0;
    var headingIndex = -1;
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var matched = false;
      var titleAt = prep.title.indexOf(part);
      if (titleAt !== -1) {
        score += titleAt === 0 ? 120 : 100;
        matched = true;
      }
      for (var h = 0; h < prep.headings.length; h++) {
        if (prep.headings[h].indexOf(part) !== -1) {
          score += 40;
          if (headingIndex === -1) { headingIndex = h; }
          matched = true;
          break;
        }
      }
      if (prep.body.indexOf(part) !== -1) {
        score += 10;
        matched = true;
      }
      if (!matched) { return null; }  // every query part must match somewhere
    }
    if (parts.length > 1) {
      if (prep.title.indexOf(phrase) !== -1) { score += 60; }
      else if (prep.body.indexOf(phrase) !== -1) { score += 15; }
    }
    return { page: page, score: score, headingIndex: headingIndex };
  }

  function search(query) {
    var phrase = query.toLowerCase();
    var parts = phrase.split(/\s+/).filter(Boolean);
    if (!parts.length) { return []; }
    var hits = [];
    for (var i = 0; i < pages.length; i++) {
      var hit = scorePage(pages[i], parts, phrase);
      if (hit) { hits.push(hit); }
    }
    hits.sort(function (a, b) {
      return b.score - a.score || a.page.title.localeCompare(b.page.title);
    });
    return hits.slice(0, MAX_RESULTS);
  }

  function snippetFor(page, parts) {
    var body = page.body || '';
    if (!body) { return ''; }
    var lower = prepared(page).body;
    var at = -1;
    for (var i = 0; i < parts.length; i++) {
      var found = lower.indexOf(parts[i]);
      if (found !== -1 && (at === -1 || found < at)) { at = found; }
    }
    if (at === -1) { return body.slice(0, SNIPPET_RADIUS * 2); }
    var start = Math.max(0, at - SNIPPET_RADIUS);
    var end = Math.min(body.length, at + SNIPPET_RADIUS * 2);
    return (start > 0 ? '…' : '') + body.slice(start, end) + (end < body.length ? '…' : '');
  }

  /* ---------------------------------------------------- safe highlighting */

  // Builds text + <mark> nodes with the DOM API - index content never goes
  // through innerHTML.
  function appendHighlighted(parent, text, parts) {
    var lower = text.toLowerCase();
    var position = 0;
    while (position < text.length) {
      var bestAt = -1;
      var bestLen = 0;
      for (var i = 0; i < parts.length; i++) {
        if (!parts[i]) { continue; }
        var at = lower.indexOf(parts[i], position);
        if (at !== -1 && (bestAt === -1 || at < bestAt)) {
          bestAt = at;
          bestLen = parts[i].length;
        }
      }
      if (bestAt === -1) {
        parent.appendChild(document.createTextNode(text.slice(position)));
        return;
      }
      if (bestAt > position) {
        parent.appendChild(document.createTextNode(text.slice(position, bestAt)));
      }
      var mark = document.createElement('mark');
      mark.textContent = text.slice(bestAt, bestAt + bestLen);
      parent.appendChild(mark);
      position = bestAt + bestLen;
    }
  }

  /* ------------------------------------------------------------ rendering */

  function setStatus(text) {
    statusEl.textContent = text || '';
    statusEl.hidden = !text;
    if (text) { resultsEl.textContent = ''; }
  }

  function renderResults(hits, parts, query) {
    selectedIndex = -1;
    resultsEl.textContent = '';
    if (!hits.length) {
      setStatus(T.none + ' “' + query + '”');
      return;
    }
    setStatus('');
    hits.forEach(function (hit, i) {
      var item = document.createElement('li');
      item.className = 'cs-result';
      var link = document.createElement('a');
      var heading = hit.headingIndex !== -1 ? hit.page.headings[hit.headingIndex] : null;
      link.href = hit.page.url + (heading && heading.id ? '#' + encodeURIComponent(heading.id) : '');

      var title = document.createElement('div');
      title.className = 'cs-result__title';
      appendHighlighted(title, hit.page.title, parts);
      link.appendChild(title);

      if (heading) {
        var crumb = document.createElement('div');
        crumb.className = 'cs-result__heading';
        appendHighlighted(crumb, heading.t, parts);
        link.appendChild(crumb);
      }

      var snippetText = snippetFor(hit.page, parts);
      if (snippetText) {
        var snippet = document.createElement('div');
        snippet.className = 'cs-result__snippet';
        appendHighlighted(snippet, snippetText, parts);
        link.appendChild(snippet);
      }

      item.appendChild(link);
      item.addEventListener('mousemove', function () { select(i); });
      resultsEl.appendChild(item);
    });
    select(0);
  }

  function select(index) {
    var items = resultsEl.children;
    if (!items.length) { selectedIndex = -1; return; }
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      items[selectedIndex].classList.remove('cs-selected');
    }
    selectedIndex = (index + items.length) % items.length;
    items[selectedIndex].classList.add('cs-selected');
    items[selectedIndex].scrollIntoView({ block: 'nearest' });
  }

  function runQuery() {
    var query = input.value.trim();
    if (!query) { setStatus(T.hint); return; }
    if (!pages) {
      setStatus(T.loading);
      ensureIndex().then(runQuery, function () { setStatus(T.error); });
      return;
    }
    var parts = query.toLowerCase().split(/\s+/).filter(Boolean);
    renderResults(search(query), parts, query);
  }

  /* ---------------------------------------------------------------- modal */

  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'cs-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', T.label);
    overlay.hidden = true;

    var modal = document.createElement('div');
    modal.className = 'cs-modal';

    var inputRow = document.createElement('div');
    inputRow.className = 'cs-inputrow';
    inputRow.innerHTML =
      '<svg class="cs-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm9.75 16.5-4.68-4.68"/></svg>';
    input = document.createElement('input');
    input.className = 'cs-input';
    input.type = 'search';
    input.placeholder = T.placeholder;
    input.setAttribute('aria-label', T.label);
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    inputRow.appendChild(input);

    statusEl = document.createElement('div');
    statusEl.className = 'cs-status';

    resultsEl = document.createElement('ul');
    resultsEl.className = 'cs-results';

    var footer = document.createElement('div');
    footer.className = 'cs-footer';
    footer.innerHTML =
      '<span><kbd>↑</kbd><kbd>↓</kbd> ' + T.nav + '</span>' +
      '<span><kbd>Enter</kbd> ' + T.open + '</span>' +
      '<span><kbd>Esc</kbd> ' + T.close + '</span>';

    modal.appendChild(inputRow);
    modal.appendChild(statusEl);
    modal.appendChild(resultsEl);
    modal.appendChild(footer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener('mousedown', function (e) {
      if (e.target === overlay) { closeModal(); }  // click outside dismisses
    });
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runQuery, 60);
    });
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        select(selectedIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        select(selectedIndex - 1);
      } else if (e.key === 'Enter') {
        var items = resultsEl.children;
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          location.href = items[selectedIndex].querySelector('a').href;
        }
      }
    });
  }

  function openModal() {
    if (!overlay) { buildModal(); }
    overlay.hidden = false;
    document.documentElement.classList.add('cs-no-scroll');
    runQuery();
    if (!pages) {
      // First open: start the lazy index fetch right away, not on the first
      // keystroke, and re-run whatever has been typed once it lands.
      ensureIndex().then(
        function () { if (!overlay.hidden) { runQuery(); } },
        function () { if (!overlay.hidden) { setStatus(T.error); } }
      );
    }
    input.focus();
    input.select();
  }

  function closeModal() {
    if (!overlay || overlay.hidden) { return; }
    overlay.hidden = true;
    document.documentElement.classList.remove('cs-no-scroll');
  }

  /* ------------------------------------------------------ header trigger */

  // The webhelp header (.wh-header) is rendered by Writerside's app.js after
  // load, so the trigger is inserted whenever a header without one shows up.
  // The observer stays attached: the app can rebuild the header (for example
  // on the mobile/desktop breakpoint swap), and the trigger must come back.
  function insertTrigger() {
    var header = document.querySelector('.wh-header');
    if (!header || header.querySelector('.cs-trigger')) { return; }
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'cs-trigger';
    button.setAttribute('aria-label', T.label);
    button.title = T.label + ' (' + SHORTCUT_LABEL + ')';
    button.innerHTML =
      '<svg class="cs-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm9.75 16.5-4.68-4.68"/></svg>' +
      '<span class="cs-trigger__hint">' + SHORTCUT_LABEL + '</span>';
    button.addEventListener('click', openModal);
    header.appendChild(button);
  }

  function start() {
    insertTrigger();
    new MutationObserver(insertTrigger)
      .observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (overlay && !overlay.hidden) { closeModal(); } else { openModal(); }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
