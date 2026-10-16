/**
 * CodeBuddy — Progress Controller (js/progress.js)
 * Displays learning metrics, curriculum progress, and challenge completion status.
 */

document.addEventListener("DOMContentLoaded", () => {
  const completedEl = document.getElementById("completedCount");
  const attemptedEl = document.getElementById("attemptedCount");
  const topicsEl = document.getElementById("topicsCount");
  const percentEl = document.getElementById("progressPercentage");
  const fractionEl = document.getElementById("progressFractionText");
  const barFillEl = document.getElementById("progressBarFill");
  const historyListEl = document.getElementById("historyList");

  if (!window.CHALLENGES_DATA) return;

  // Retrieve user completion from localStorage or fallback to default sample state
  let completedIds = ["count-vowels", "max-number", "reverse-string"];
  try {
    const stored = JSON.parse(localStorage.getItem("codebuddy_completed") || "null");
    if (Array.isArray(stored) && stored.length > 0) {
      completedIds = Array.from(new Set([...completedIds, ...stored]));
    }
  } catch (err) {
    // Graceful fallback
  }

  // Attempted sample list
  const inProgressIds = ["palindrome", "sum-evens"];

  const totalChallenges = CHALLENGES_DATA.length;
  const completedCount = completedIds.filter(id => CHALLENGES_DATA.some(c => c.id === id)).length;
  const attemptedCount = Math.min(completedCount + inProgressIds.length, totalChallenges);

  // Calculate unique topics practiced
  const practicedChallenges = CHALLENGES_DATA.filter(c => completedIds.includes(c.id) || inProgressIds.includes(c.id));
  const uniqueTopics = new Set(practicedChallenges.map(c => c.topic.split("&")[0].trim()));

  const percent = Math.round((completedCount / totalChallenges) * 100);

  // Update UI Counters
  if (completedEl) completedEl.textContent = completedCount;
  if (attemptedEl) attemptedEl.textContent = attemptedCount;
  if (topicsEl) topicsEl.textContent = uniqueTopics.size;
  if (percentEl) percentEl.textContent = `${percent}%`;
  if (fractionEl) fractionEl.textContent = `${completedCount} of ${totalChallenges} fundamental challenges completed`;
  if (barFillEl) barFillEl.style.width = `${percent}%`;

  // Render Challenge Status History
  if (historyListEl) {
    historyListEl.innerHTML = CHALLENGES_DATA.map(challenge => {
      let statusBadge = '';
      let actionText = 'Start';
      let actionClass = 'btn-secondary';

      if (completedIds.includes(challenge.id)) {
        statusBadge = `<span class="badge badge-beginner">Completed</span>`;
        actionText = 'Review';
        actionClass = 'btn-subtle';
      } else if (inProgressIds.includes(challenge.id)) {
        statusBadge = `<span class="badge badge-intermediate">In Progress</span>`;
        actionText = 'Continue';
        actionClass = 'btn-primary';
      } else {
        statusBadge = `<span class="badge badge-topic">Not Started</span>`;
        actionText = 'Start';
        actionClass = 'btn-secondary';
      }

      return `
        <div class="history-item">
          <div class="history-info">
            <span class="history-name">${challenge.title}</span>
            <span class="badge badge-topic" style="font-size: 0.7rem;">${challenge.topic}</span>
          </div>
          <div class="history-actions">
            ${statusBadge}
            <a href="workspace.html?id=${challenge.id}" class="btn ${actionClass}" style="padding: 0.35rem 0.8rem; font-size: 0.78rem;">
              <span>${actionText}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      `;
    }).join("");
  }
});
