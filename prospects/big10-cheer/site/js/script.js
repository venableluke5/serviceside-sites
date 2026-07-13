const menuToggle = document.querySelector("[data-menu-toggle]");
const primaryNav = document.querySelector("[data-primary-nav]");
const header = document.querySelector("[data-header]");

function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  primaryNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const nextOpenState = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(nextOpenState));
    primaryNav.classList.toggle("is-open", nextOpenState);
    document.body.classList.toggle("menu-open", nextOpenState);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) closeMenu();
  });
}

if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealTargets = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));

  window.setTimeout(() => {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }, 1600);
}
