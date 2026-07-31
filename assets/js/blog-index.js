document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#journal-grid");
  const cards = Array.from(
    document.querySelectorAll(".journal-card")
  );
  const filters = Array.from(
    document.querySelectorAll(".journal-filter")
  );
  const sortSelect = document.querySelector("#journal-sort-select");
  const emptyMessage = document.querySelector("#journal-empty");

  if (!grid || cards.length === 0) {
    return;
  }

  let activeFilter = "all";

  const updateVisibility = () => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const tags = (card.dataset.tags || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      const visible =
        activeFilter === "all" ||
        tags.includes(activeFilter);

      card.hidden = !visible;

      if (visible) {
        visibleCount += 1;
      }
    });

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount !== 0;
    }
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";

      filters.forEach((candidate) => {
        const active = candidate === button;

        candidate.classList.toggle("is-active", active);
        candidate.setAttribute(
          "aria-pressed",
          active ? "true" : "false"
        );
      });

      updateVisibility();
    });
  });

  sortSelect?.addEventListener("change", () => {
    const sortedCards = [...cards];

    if (sortSelect.value === "oldest") {
      sortedCards.sort(
        (a, b) => Number(a.dataset.date) - Number(b.dataset.date)
      );
    } else if (sortSelect.value === "title") {
      sortedCards.sort((a, b) =>
        (a.dataset.title || "").localeCompare(
          b.dataset.title || ""
        )
      );
    } else {
      sortedCards.sort(
        (a, b) => Number(b.dataset.date) - Number(a.dataset.date)
      );
    }

    sortedCards.forEach((card) => grid.appendChild(card));
    updateVisibility();
  });

  updateVisibility();
});