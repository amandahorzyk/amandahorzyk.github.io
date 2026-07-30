document.addEventListener("DOMContentLoaded", () => {
  const links = [
    ...document.querySelectorAll(".article-toc a")
  ];

  if (!links.length) {
    return;
  }

  const sections = links
    .map((link) => {
      const target = link.getAttribute("href");

      if (!target || !target.startsWith("#")) {
        return null;
      }

      return document.querySelector(target);
    })
    .filter(Boolean);

  const activateLink = (sectionId) => {
    links.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("active", isActive);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (first, second) =>
            second.intersectionRatio - first.intersectionRatio
        )[0];

      if (visibleEntry) {
        activateLink(visibleEntry.target.id);
      }
    },
    {
      rootMargin: "-22% 0px -62% 0px",
      threshold: [0.05, 0.2, 0.5]
    }
  );

  sections.forEach((section) => observer.observe(section));
});