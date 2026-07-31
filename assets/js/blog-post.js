document.addEventListener("DOMContentLoaded", () => {
  const toc = document.querySelector(".article-toc");
  const nav = document.querySelector(".article-toc nav");
  const content = document.querySelector(".article-copy");

  if (!toc || !nav || !content) {
    console.warn("Article contents navigation could not be initialised.");
    return;
  }

  const createId = (text) =>
    text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const usedIds = new Set();

  const createUniqueId = (text, fallback) => {
    const baseId = createId(text) || fallback;
    let id = baseId;
    let number = 2;

    while (usedIds.has(id) || document.getElementById(id)) {
      id = `${baseId}-${number}`;
      number += 1;
    }

    usedIds.add(id);
    return id;
  };

  nav.innerHTML = "";

  /*
   * Create an anchor for the introductory text that appears
   * before the first Markdown heading.
   */
  let introduction = document.getElementById("introduction");

  if (!introduction) {
    introduction = document.createElement("span");
    introduction.id = "introduction";
    introduction.className = "article-anchor";
    introduction.setAttribute("aria-hidden", "true");
    content.prepend(introduction);
  }

  usedIds.add("introduction");

  const sections = [
    {
      element: introduction,
      label: "Introduction",
      level: 2
    }
  ];

  content.querySelectorAll("h2, h3").forEach((heading, index) => {
    if (!heading.id) {
      heading.id = createUniqueId(
        heading.textContent,
        `section-${index + 1}`
      );
    } else {
      usedIds.add(heading.id);
    }

    sections.push({
      element: heading,
      label: heading.textContent.trim(),
      level: Number(heading.tagName.substring(1))
    });
  });

  if (sections.length <= 1) {
    toc.hidden = true;
    return;
  }

  const links = sections.map(({ element, label, level }, index) => {
    const link = document.createElement("a");

    link.href = `#${element.id}`;
    link.classList.toggle("active", index === 0);
    link.classList.toggle("toc-subitem", level === 3);

    const labelElement = document.createElement("span");
    labelElement.textContent = label;

    const icon = document.createElement("i");
    icon.className = "bi bi-arrow-right";
    icon.setAttribute("aria-hidden", "true");

    link.append(labelElement, icon);
    nav.appendChild(link);

    link.addEventListener("click", (event) => {
      event.preventDefault();

      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.replaceState(null, "", `#${element.id}`);
    });

    return link;
  });

  const updateActiveLink = () => {
    const activationPosition = 190;
    let activeIndex = 0;

    sections.forEach(({ element }, index) => {
      if (element.getBoundingClientRect().top <= activationPosition) {
        activeIndex = index;
      }
    });

    links.forEach((link, index) => {
      link.classList.toggle("active", index === activeIndex);
    });
  };

  window.addEventListener("scroll", updateActiveLink, {
    passive: true
  });

  window.addEventListener("resize", updateActiveLink);

  updateActiveLink();
});