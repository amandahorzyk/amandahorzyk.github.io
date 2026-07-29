document.addEventListener("DOMContentLoaded", () => {
  const cvSection = document.querySelector("#cv");

  if (!cvSection) {
    return;
  }

  const filterButtons = [
    ...cvSection.querySelectorAll(".cv-filter")
  ];

  const entries = [
    ...cvSection.querySelectorAll(".cv-entry")
  ];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((candidate) => {
        const isSelected = candidate === button;

        candidate.classList.toggle("is-active", isSelected);
        candidate.setAttribute(
          "aria-pressed",
          String(isSelected)
        );
      });

      entries.forEach((entry) => {
        const categories = (
          entry.dataset.categories || ""
        ).split(/\s+/);

        const shouldShow =
          selectedFilter === "all" ||
          categories.includes(selectedFilter);

        entry.hidden = !shouldShow;
      });
    });
  });

  const summaries = cvSection.querySelectorAll(
    ".cv-entry-summary"
  );

  summaries.forEach((summary) => {
    summary.addEventListener("click", () => {
      const entry = summary.closest(".cv-entry");
      const details = entry.querySelector(".cv-entry-details");

      if (!details) {
        return;
      }

      const isOpen =
        summary.getAttribute("aria-expanded") === "true";

      summary.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      details.hidden = isOpen;
    });
  });
});