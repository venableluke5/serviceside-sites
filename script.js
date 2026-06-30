// Keep the footer year current without requiring manual edits.
document.documentElement.classList.add("js-enabled");

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Keep the Formspree form simple, but add accessible client-side validation.
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const requiredFields = contactForm.querySelectorAll("[required]");

  const setFieldError = (field, message) => {
    const errorId = field.getAttribute("aria-describedby");
    const errorElement = errorId ? document.getElementById(errorId) : null;

    field.setAttribute("aria-invalid", message ? "true" : "false");

    if (errorElement) {
      errorElement.textContent = message;
    }
  };

  const getFieldError = (field) => {
    const label = contactForm.querySelector(`label[for="${field.id}"]`);
    const labelText = label ? label.textContent : "This field";
    const value = field.value.trim();

    if (field.required && !value) {
      return `${labelText} is required.`;
    }

    if (field.type === "email" && value && !field.validity.valid) {
      return "Enter a valid email address.";
    }

    return "";
  };

  requiredFields.forEach((field) => {
    field.setAttribute("aria-invalid", "false");

    field.addEventListener("blur", () => {
      setFieldError(field, getFieldError(field));
    });

    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        setFieldError(field, getFieldError(field));
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    let firstInvalidField = null;

    requiredFields.forEach((field) => {
      const message = getFieldError(field);
      setFieldError(field, message);

      if (message && !firstInvalidField) {
        firstInvalidField = field;
      }
    });

    if (firstInvalidField) {
      event.preventDefault();
      firstInvalidField.focus();
    }
  });
}

// Reveal major sections and cards once as they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (revealElements.length && reduceMotion) {
  revealElements.forEach((element) => {
    element.classList.add("reveal-visible");
  });
}

if (revealElements.length && !reduceMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

if (revealElements.length && !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("reveal-visible");
  });
}
