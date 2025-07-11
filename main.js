document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("contact-toggle");
  const closeBtn = document.getElementById("close-contact");
  const contactBox = document.getElementById("contact-box");
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  toggle.addEventListener("click", () => {
    contactBox.classList.toggle("hidden");
  });

  closeBtn.addEventListener("click", () => {
    contactBox.classList.add("hidden");
  });

  // Theme management functions
  function setTheme(theme) {
    console.log("[Theme] Setting theme to:", theme);
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update toggle button icon
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌓";
      console.log("[Theme] Button icon updated to:", themeToggle.textContent);
    }
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    console.log("[Theme] Saved theme from localStorage:", saved);
    return saved || "light";
  }

  function toggleTheme() {
    console.log("[Theme] Toggle clicked!");
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    console.log("[Theme] Switching from", current, "to", next);
    setTheme(next);
  }

  // Initialize theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    console.log("[Theme] Event listener added to toggle button");

    // Test click handler
    themeToggle.addEventListener("click", () => {
      console.log("[Theme] Button clicked!");
    });
  } else {
    console.error("[Theme] Theme toggle button not found!");
  }

  // Set initial theme from localStorage
  const initialTheme = getPreferredTheme();
  console.log("[Theme] Setting initial theme:", initialTheme);
  setTheme(initialTheme);

  // Contact form functionality
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Contact modal functionality (for services page)
  const contactBtn = document.getElementById("contact-btn");
  const modal = document.getElementById("contact-modal");
  const modalCloseBtn = document.getElementById("close-contact");

  if (contactBtn && modal && modalCloseBtn) {
    contactBtn.addEventListener("click", () => {
      modal.classList.add("show");
    });

    modalCloseBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading animation to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("submit-btn")) {
        return; // Don't add loading to submit buttons
      }

      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  console.log("[Theme] Theme system initialized successfully");
});

// Contact form handler
function handleContactForm(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector(".submit-btn");
  const formData = new FormData(form);

  // Show loading state
  submitBtn.classList.add("loading");

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Reset form
    form.reset();

    // Hide loading state
    submitBtn.classList.remove("loading");

    // Show success message
    showNotification(
      "Thank you! Your message has been sent successfully.",
      "success"
    );
  }, 2000);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "var(--accent)" : "var(--card-bg)"};
    color: ${type === "success" ? "white" : "var(--text-color)"};
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    border: 1px solid var(--border-color);
  `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const notificationCloseBtn = notification.querySelector(
    ".notification-close"
  );
  notificationCloseBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = "#ff4444";

      // Reset border color after 3 seconds
      setTimeout(() => {
        input.style.borderColor = "";
      }, 3000);
    } else {
      input.style.borderColor = "";
    }
  });

  return isValid;
}

// Add form validation to all forms
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!validateForm(form)) {
        e.preventDefault();
        showNotification("Please fill in all required fields.", "error");
      }
    });
  });
});

// Contact form submission prevention
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
  });
}
