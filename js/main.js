const yearEl = document.querySelector("[data-current-year]");
const revealItems = document.querySelectorAll("[data-reveal]");
const contactForm = document.querySelector("[data-contact-form]");

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
