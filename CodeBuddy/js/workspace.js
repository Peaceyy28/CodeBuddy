/**
 * CodeBuddy — Workspace Controller (js/workspace.js)
 * Manages challenge state, code editor buffer, language switching,
 * collapsible panels, and interactive Socratic AI coaching cues.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const titleEl = document.getElementById("challengeTitle");
  const diffEl = document.getElementById("challengeDifficulty");
  const topicEl = document.getElementById("challengeTopic");
  const descEl = document.getElementById("challengeDescription");
  const examplesEl = document.getElementById("challengeExamples");
  const briefBox = document.getElementById("challengeBrief");
  const toggleBriefBtn = document.getElementById("toggleBriefBtn");
  const briefBtnText = document.getElementById("briefBtnText");

  const editor = document.getElementById("codeEditor");
  const gutter = document.getElementById("editorGutter");
  const filenameEl = document.getElementById("editorFilename");
  const langTabs = document.querySelectorAll(".lang-tab");
  const runBtn = document.getElementById("runCodeBtn");
  const submitBtn = document.getElementById("submitCodeBtn");

  const outputContent = document.getElementById("outputContent");
  const toggleOutputBtn = document.getElementById("toggleOutputBtn");
  const outputStatusLine = document.getElementById("outputStatusLine");

  const hintBtn = document.getElementById("hintBtn");
  const explainBtn = document.getElementById("explainBtn");
  const solutionBtn = document.getElementById("solutionBtn");
  const hintCounterSub = document.getElementById("hintCounterSub");

  const responseBadge = document.getElementById("responseBadge");
  const responseHeading = document.getElementById("responseHeading");
  const responseText = document.getElementById("responseText");

  // Determine active challenge
  const urlParams = new URLSearchParams(window.location.search);
  const challengeId = urlParams.get("id") || "count-vowels";
  const challenge = (window.CHALLENGES_DATA && window.CHALLENGES_DATA.find(c => c.id === challengeId)) || (window.CHALLENGES_DATA && window.CHALLENGES_DATA[0]);

  let currentLang = "python";
  let currentHintIndex = 0;

  // Initialize Challenge Brief
  if (challenge) {
    if (titleEl) titleEl.textContent = challenge.title;
    if (diffEl) {
      diffEl.textContent = challenge.difficulty;
      diffEl.className = `badge ${challenge.difficulty === 'Beginner' ? 'badge-beginner' : 'badge-intermediate'}`;
    }
    if (topicEl) topicEl.textContent = challenge.topic;
    if (descEl) descEl.textContent = challenge.description;

    if (examplesEl && challenge.examples) {
      examplesEl.innerHTML = challenge.examples.map((ex, i) => `
        <div class="example-snippet">
          <div class="example-snippet-label">Example ${i + 1}</div>
          <div><strong>Input:</strong> <code>${ex.input}</code></div>
          <div><strong>Output:</strong> <code>${ex.output}</code></div>
          ${ex.explanation ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${ex.explanation}</div>` : ''}
        </div>
      `).join("");
    }
  }

  // Sync line numbers in editor
  function updateLineNumbers() {
    if (!editor || !gutter) return;
    const lineCount = editor.value.split("\n").length;
    let linesHtml = "";
    for (let i = 1; i <= Math.max(lineCount, 12); i++) {
      linesHtml += `<span>${i}</span>`;
    }
    gutter.innerHTML = linesHtml;
  }

  // Load code template
  function loadStarterCode() {
    if (!editor || !challenge) return;
    const code = (challenge.starterCode && challenge.starterCode[currentLang]) || `# Write your solution for ${challenge.title}\n`;
    editor.value = code;
    updateLineNumbers();
  }

  // Language Tabs Switcher
  langTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      langTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      currentLang = tab.dataset.lang || "python";
      if (filenameEl) {
        filenameEl.textContent = currentLang === "python" ? "solution.py" : "solution.js";
      }
      loadStarterCode();
    });
  });

  // Editor Input Listener & Tab Key indentation support
  if (editor) {
    editor.addEventListener("input", updateLineNumbers);
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + "    " + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
        updateLineNumbers();
      }
    });
  }

  // Toggle Problem Brief
  if (toggleBriefBtn && briefBox) {
    toggleBriefBtn.addEventListener("click", () => {
      const isHidden = briefBox.classList.toggle("hidden");
      briefBtnText.textContent = isHidden ? "Show Problem Brief" : "Hide Problem Brief";
      toggleBriefBtn.setAttribute("aria-expanded", String(!isHidden));
    });
  }

  // Toggle Output Panel
  if (toggleOutputBtn && outputContent) {
    toggleOutputBtn.addEventListener("click", () => {
      const isCollapsed = outputContent.classList.toggle("collapsed");
      toggleOutputBtn.textContent = isCollapsed ? "Reveal Output" : "Collapse Output";
    });
  }

  // Run Code Simulation
  if (runBtn) {
    runBtn.addEventListener("click", () => {
      if (outputContent.classList.contains("collapsed")) {
        outputContent.classList.remove("collapsed");
        if (toggleOutputBtn) toggleOutputBtn.textContent = "Collapse Output";
      }

      const langLabel = currentLang === "python" ? "Python 3.11" : "JavaScript (Node)";
      outputStatusLine.innerHTML = `
        <span style="color: #6c5ce7;">&gt; Executing ${langLabel} test runner...</span><br>
        <span style="color: #38d9a9;">&check; Test 1 passed:</span> Sample inputs matched expected output.<br>
        <span style="color: #38d9a9;">&check; Test 2 passed:</span> Edge case assertions validated.<br>
        <span style="color: #94a3b8; font-size: 0.75rem;">(Visual preview: full sandboxed execution connects in Phase 2)</span>
      `;
    });
  }

  // Submit Solution Simulation & Progress recording
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      // Record completed challenge in localStorage
      try {
        const completed = JSON.parse(localStorage.getItem("codebuddy_completed") || "[]");
        if (!completed.includes(challenge.id)) {
          completed.push(challenge.id);
          localStorage.setItem("codebuddy_completed", JSON.stringify(completed));
        }
      } catch (err) {
        // Fallback gracefully
      }

      alert(`Great work! Solution recorded for "${challenge.title}". You can view your updated statistics on the Progress page.`);
    });
  }

  // AI Coaching Actions
  function setCoachResponse(badge, heading, text) {
    if (responseBadge) responseBadge.textContent = badge;
    if (responseHeading) responseHeading.textContent = heading;
    if (responseText) responseText.innerHTML = text;

    // Subtle highlight pulse
    const box = document.getElementById("coachResponse");
    if (box) {
      box.style.borderColor = "var(--primary)";
      box.style.backgroundColor = "var(--primary-subtle)";
      setTimeout(() => {
        box.style.backgroundColor = "var(--bg-surface)";
      }, 350);
    }
  }

  if (hintBtn && challenge && challenge.hints) {
    hintBtn.addEventListener("click", () => {
      const hintNumber = (currentHintIndex % challenge.hints.length) + 1;
      const hintText = challenge.hints[currentHintIndex % challenge.hints.length];

      setCoachResponse(
        `💡 Hint ${hintNumber} of ${challenge.hints.length}`,
        `Progressive Guiding Clue`,
        hintText
      );

      currentHintIndex++;
      const nextHintNum = (currentHintIndex % challenge.hints.length) + 1;
      if (hintCounterSub) {
        hintCounterSub.textContent = `Next clue available: (${nextHintNum} of ${challenge.hints.length})`;
      }
    });
  }

  if (explainBtn && challenge) {
    explainBtn.addEventListener("click", () => {
      setCoachResponse(
        `🔍 Diagnostic Analysis`,
        `Common Misconceptions & Mistakes`,
        challenge.mistakeAnalysis || "Check your boundary conditions and ensure you are handling data types and case sensitivity properly."
      );
    });
  }

  if (solutionBtn && challenge) {
    solutionBtn.addEventListener("click", () => {
      setCoachResponse(
        `🔓 Guided Walkthrough`,
        `Step-by-Step Logic`,
        challenge.solutionWalkthrough || "Follow the algorithm breakdown to reconstruct the solution on your own."
      );
    });
  }

  // Initial code load
  loadStarterCode();
});
