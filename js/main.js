const yearEl = document.querySelector("[data-current-year]");
const revealItems = document.querySelectorAll("[data-reveal]");
const contactForm = document.querySelector("[data-contact-form]");
const menuButton = document.querySelector("[data-menu-button]");
const responsiveNavigation = document.querySelector("[data-responsive-navigation]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (revealItems.length) {
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
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}

if (menuButton && responsiveNavigation) {
  const menuLinks = responsiveNavigation.querySelectorAll("[data-menu-link]");
  const openIcon = menuButton.querySelector("[data-menu-open-icon]");
  const closeIcon = menuButton.querySelector("[data-menu-close-icon]");
  const desktopNavigationQuery = window.matchMedia("(min-width: 80rem)");

  const setMenuOpen = (isOpen, returnFocus = false) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    responsiveNavigation.hidden = !isOpen;

    if (openIcon) {
      openIcon.hidden = isOpen;
    }

    if (closeIcon) {
      closeIcon.hidden = !isOpen;
    }

    if (!isOpen && returnFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });

  desktopNavigationQuery.addEventListener("change", (event) => {
    if (event.matches) {
      setMenuOpen(false);
    }
  });
}

if (contactForm) {
  const submitButton = contactForm.querySelector("[data-submit-button]");
  const submitLabel = contactForm.querySelector("[data-submit-label]");
  const statusEl = contactForm.querySelector("[data-form-status]");
  const statusMessage = contactForm.querySelector("[data-form-status-message]");
  const statusEmail = contactForm.querySelector("[data-form-status-email]");
  const idleButtonLabel = submitLabel?.textContent.trim() || "Request a Free Mockup";
  let isSubmitting = false;

  const setFormState = (state, message = "") => {
    contactForm.dataset.state = state;
    contactForm.setAttribute("aria-busy", state === "submitting" ? "true" : "false");

    if (!statusEl || !statusMessage || !statusEmail) {
      return;
    }

    statusEl.dataset.state = state;
    statusEl.setAttribute("role", state === "failure" ? "alert" : "status");
    statusEl.setAttribute("aria-live", state === "failure" ? "assertive" : "polite");
    statusMessage.textContent = message;
    statusEmail.hidden = state !== "failure";
    statusEl.hidden = state === "idle";
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting || !submitButton || !submitLabel) {
      return;
    }

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    submitLabel.textContent = "Sending…";
    setFormState("submitting", "Sending your request…");

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      contactForm.reset();
      setFormState("success", "Thanks — your request was sent successfully.");
    } catch {
      setFormState("failure", "Your request could not be sent. Please try again, or ");
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitLabel.textContent = idleButtonLabel;
    }
  });
}
