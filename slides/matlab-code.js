(() => {
  const splitHighlightedLines = (code) => {
    const lines = [document.createDocumentFragment()];
    const breaks = [];
    const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) textNodes.push(walker.currentNode);

    const appendText = (node, text) => {
      if (!text) return;

      const ancestors = [];
      for (let parent = node.parentElement; parent && parent !== code; parent = parent.parentElement) {
        ancestors.unshift(parent);
      }

      let target = lines[lines.length - 1];
      for (const ancestor of ancestors) {
        const clone = ancestor.cloneNode(false);
        target.append(clone);
        target = clone;
      }
      target.append(document.createTextNode(text));
    };

    for (const node of textNodes) {
      const text = node.data;
      const lineBreak = /\r\n|\n|\r/g;
      let start = 0;
      let match;

      while ((match = lineBreak.exec(text))) {
        appendText(node, text.slice(start, match.index));
        breaks.push(match[0]);
        lines.push(document.createDocumentFragment());
        start = match.index + match[0].length;
      }
      appendText(node, text.slice(start));
    }

    const source = code.textContent;
    const trailingBreak = /(?:\r\n|\n|\r)$/.test(source);
    const visibleLines = trailingBreak ? lines.length - 1 : lines.length;
    const replacement = document.createDocumentFragment();

    for (let index = 0; index < visibleLines; index += 1) {
      const line = document.createElement('span');
      const content = document.createElement('span');
      line.className = 'code-line';
      content.className = 'code-line-text';
      content.append(lines[index]);
      line.append(content);
      replacement.append(line);

      if (index < breaks.length) {
        const separator = document.createElement('span');
        separator.hidden = true;
        separator.textContent = breaks[index];
        replacement.append(separator);
      }
    }

    code.replaceChildren(replacement);
  };

  const fallbackCopy = (panel, text) => {
    const active = document.activeElement;
    const selection = window.getSelection();
    const ranges = selection
      ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange())
      : [];
    const textarea = document.createElement('textarea');

    textarea.value = text;
    textarea.readOnly = true;
    textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    panel.append(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } finally {
      textarea.remove();
      if (active instanceof HTMLElement) {
        try {
          active.focus({ preventScroll: true });
        } catch {
          active.focus();
        }
      }
      if (selection) {
        selection.removeAllRanges();
        for (const range of ranges) selection.addRange(range);
      }
    }

    if (!copied) throw new Error('Copy command failed');
  };

  const copyText = async (panel, text) => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {}
    }
    fallbackCopy(panel, text);
  };

  const enhancePanel = (panel) => {
    if (panel.dataset.codeEnhanced === 'true') return;

    const toolbar = panel.querySelector('p');
    const code = panel.querySelector('pre[is="marp-pre"] > code, marp-pre > code');
    if (!toolbar || !code) return;

    code.parentElement.removeAttribute('data-auto-scaling');

    const language = code.classList.contains('language-matlab') ? 'MATLAB' : 'Python';
    const source = code.textContent.replace(/(?:\r\n|\n|\r)$/, '');
    const button = document.createElement('button');
    let feedbackTimer;
    let copyAttempt = 0;

    toolbar.classList.add('code-toolbar');
    button.type = 'button';
    button.className = 'code-copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', `Copy ${language} code`);
    button.setAttribute('aria-live', 'polite');

    button.addEventListener('click', async (event) => {
      event.stopPropagation();
      const attempt = ++copyAttempt;
      clearTimeout(feedbackTimer);

      try {
        await copyText(panel, source);
        if (attempt === copyAttempt) button.textContent = 'Copied!';
      } catch {
        if (attempt === copyAttempt) button.textContent = 'Copy failed';
      }

      if (attempt === copyAttempt) {
        feedbackTimer = window.setTimeout(() => {
          button.textContent = 'Copy';
        }, 1600);
      }
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') event.stopPropagation();
    });

    splitHighlightedLines(code);
    toolbar.append(button);
    panel.dataset.codeEnhanced = 'true';
  };

  const init = () => document.querySelectorAll('.code-panel').forEach(enhancePanel);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
