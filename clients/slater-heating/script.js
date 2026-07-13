const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const yearTarget = document.querySelector("[data-current-year]");
const revealItems = document.querySelectorAll("[data-reveal]");
const heroSection = document.querySelector(".hero-section");
const contactSection = document.querySelector(".contact-section");
const siteFooter = document.querySelector(".site-footer");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  const firstNavLink = siteNav.querySelector("a");

  const closeMenu = ({ returnFocus = false } = {}) => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");

    if (returnFocus) {
      menuToggle.focus();
    }
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu({ returnFocus: true });
      return;
    }

    siteNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    firstNavLink?.focus();
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu({ returnFocus: true });
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980) {
      closeMenu();
    }
  });
}

if ("IntersectionObserver" in window && heroSection) {
  let heroIsVisible = true;
  let contactIsVisible = false;
  let footerIsVisible = false;

  const updateMobileCta = () => {
    document.body.classList.toggle(
      "show-mobile-cta",
      !heroIsVisible && !contactIsVisible && !footerIsVisible,
    );
  };

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      heroIsVisible = entry.isIntersecting;
      updateMobileCta();
    },
    { threshold: 0.16 },
  );

  const ctaBlockerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === contactSection) {
          contactIsVisible = entry.isIntersecting;
        }

        if (entry.target === siteFooter) {
          footerIsVisible = entry.isIntersecting;
        }
      });
      updateMobileCta();
    },
    { threshold: 0.01 },
  );

  heroObserver.observe(heroSection);
  if (contactSection) ctaBlockerObserver.observe(contactSection);
  if (siteFooter) ctaBlockerObserver.observe(siteFooter);
}

if (revealItems.length) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    },
  );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }
}
