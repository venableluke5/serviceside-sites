const yearEl = document.querySelector("[data-current-year]");
const revealItems = document.querySelectorAll("[data-reveal]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

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
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);
    const details = [
      ["Name", formData.get("name")],
      ["Business name", formData.get("business")],
      ["Email", formData.get("email")],
      ["Phone", formData.get("phone")],
      ["Current website or social page", formData.get("website")],
      ["Message", formData.get("message")],
    ]
      .map(([label, value]) => `${label}: ${value || "Not provided"}`)
      .join("\n");

    const subject = encodeURIComponent("Free mockup request");
    const body = encodeURIComponent(details);

    if (formStatus) {
      formStatus.textContent = "Opening a prefilled email with your request details.";
    }

    window.location.href = `mailto:info@servicesidesites.com?subject=${subject}&body=${body}`;
  });
}
