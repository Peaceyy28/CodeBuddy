/**
 * CodeBuddy — Challenges Directory Controller
 * Handles filtering and rendering of coding challenges
 */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("challengesContainer");
  const countLabel = document.getElementById("challengesCount");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!container || !window.CHALLENGES_DATA) return;

  let currentFilter = "all";

  function renderChallenges() {
    const filtered = CHALLENGES_DATA.filter(item => {
      if (currentFilter === "all") return true;
      return item.difficulty.toLowerCase() === currentFilter.toLowerCase();
    });

    if (countLabel) {
      countLabel.textContent = `Showing ${filtered.length} of ${CHALLENGES_DATA.length} challenges`;
    }

    container.innerHTML = filtered.map(challenge => `
      <article class="challenge-card" data-difficulty="${challenge.difficulty}">
        <div class="challenge-top">
          <div class="challenge-badges">
            <span class="badge ${challenge.difficulty === 'Beginner' ? 'badge-beginner' : 'badge-intermediate'}">
              ${challenge.difficulty}
            </span>
            <span class="badge badge-topic">${challenge.topic}</span>
          </div>
          <h2 class="challenge-title">${challenge.title}</h2>
          <p class="challenge-summary">${challenge.summary}</p>
        </div>
        <div class="challenge-bottom">
          <span class="challenge-time">&sim; ${challenge.estimatedTime}</span>
          <a href="workspace.html?id=${challenge.id}" class="btn btn-primary" style="padding: 0.45rem 1rem; font-size: 0.82rem;">
            <span>Solve Challenge</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </article>
    `).join("");
  }

  // Filter click handlers
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter || "all";
      renderChallenges();
    });
  });

  // Initial render
  renderChallenges();
});
