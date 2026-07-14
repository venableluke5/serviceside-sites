const yearEl = document.querySelector("[data-current-year]");
const revealItems = document.querySelectorAll("[data-reveal]");
const contactForm = document.querySelector("[data-contact-form]");
const menuButton = document.querySelector("[data-menu-button]");
const responsiveNavigation = document.querySelector("[data-responsive-navigation]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (
  revealItems.length &&
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.remove("is-reveal-pending");
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
    if (item.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      item.classList.add("is-visible");
      return;
    }

    item.classList.add("is-reveal-pending");
    revealObserver.observe(item);
    window.requestAnimationFrame(() => {
      item.classList.add("is-reveal-armed");
    });
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
  const requiredFields = Array.from(contactForm.querySelectorAll("[required]"));
  let isSubmitting = false;

  const getFieldError = (field) => {
    if (field.validity.valueMissing) {
      return field.dataset.requiredMessage || "Please complete this field.";
    }

    if (field.validity.typeMismatch && field.type === "email") {
      return "Please enter a valid email address.";
    }

    return "Please check this field.";
  };

  const setFieldValidity = (field) => {
    const errorId = field.getAttribute("aria-describedby");
    const errorEl = errorId ? document.getElementById(errorId) : null;

    if (field.validity.valid) {
      field.removeAttribute("aria-invalid");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.hidden = true;
      }
      return true;
    }

    field.setAttribute("aria-invalid", "true");
    if (errorEl) {
      errorEl.textContent = getFieldError(field);
      errorEl.hidden = false;
    }
    return false;
  };

  const clearFieldValidity = (field) => {
    const errorId = field.getAttribute("aria-describedby");
    const errorEl = errorId ? document.getElementById(errorId) : null;
    field.removeAttribute("aria-invalid");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.hidden = true;
    }
  };

  requiredFields.forEach((field) => {
    field.addEventListener("invalid", (event) => {
      event.preventDefault();
      setFieldValidity(field);
    });

    field.addEventListener("blur", () => {
      if (field.value.trim() || field.hasAttribute("aria-invalid")) {
        setFieldValidity(field);
      }
    });

    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) {
        setFieldValidity(field);
      }
    });
  });

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

    const invalidFields = requiredFields.filter((field) => !setFieldValidity(field));

    if (invalidFields.length) {
      invalidFields[0].focus();
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
      requiredFields.forEach((field) => clearFieldValidity(field));
      setFormState("success", "Thanks — your request was sent successfully.");
      statusEl?.focus();
    } catch {
      setFormState("failure", "Your request could not be sent. Please try again, or ");
      statusEl?.focus();
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitLabel.textContent = idleButtonLabel;
    }
  });
}
