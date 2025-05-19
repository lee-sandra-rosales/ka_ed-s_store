// DOM Elements
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");
const menuToggle = document.getElementById("menu-toggle");
const menuDropdown = document.getElementById("menu-dropdown");

// Hamburger toggle
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
  hamburger.setAttribute("aria-expanded", !expanded);
  hamburger.classList.toggle("active");
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("sidebar-active");
  sidebar.setAttribute("aria-hidden", expanded);
});

// Close sidebar on sidebar link/button click (better UX on mobile)
sidebar.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("click", () => {
    sidebar.classList.remove("active");
    mainContent.classList.remove("sidebar-active");
    hamburger.setAttribute("aria-expanded", false);
    hamburger.classList.remove("active");
    sidebar.setAttribute("aria-hidden", true);
  });
});

// Dropdown toggle
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
  menuToggle.setAttribute("aria-expanded", !expanded);
  menuDropdown.classList.toggle("open");
});

// Close dropdown if clicking outside
document.addEventListener("click", (e) => {
  if (!menuDropdown.contains(e.target) && menuDropdown.classList.contains("open")) {
    menuDropdown.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", false);
  }
});

// Keyboard accessibility for dropdown (close on Escape)
menuToggle.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    menuDropdown.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", false);
    menuToggle.focus();
  }
});
