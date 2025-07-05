document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("contact-toggle");
  const closeBtn = document.getElementById("close-contact");
  const contactBox = document.getElementById("contact-box");
  const themeToggle = document.getElementById("theme-toggle");

  toggle.addEventListener("click", () => {
    contactBox.classList.toggle("hidden");
  });

  closeBtn.addEventListener("click", () => {
    contactBox.classList.add("hidden");
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.getElementById("contact-btn");
  const modal = document.getElementById("contact-modal");
  const closeBtn = document.getElementById("close-contact");

  contactBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".theme-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
