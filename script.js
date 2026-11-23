// 1. Typing effect for roles
const roles = ["Full-Stack Developer", "MERN Stack Developer", "AI Integration Enthusiast"];
const typedEl = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  if (!typedEl) return;
  const word = roles[roleIndex];
  typedEl.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// 2. Fade-in on scroll
const revealItems = document.querySelectorAll(
  ".hero > *, section > h2, .about p, .stat, .group, .card, .job"
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item, i) => {
  item.classList.add("reveal");
  item.style.transitionDelay = (i % 3) * 80 + "ms";
  revealObserver.observe(item);
});

// 3. Highlight the active sidebar link
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((section) => navObserver.observe(section));

// 4. Scroll progress bar
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  if (!progress) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
});

// 5. Light / dark theme toggle
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (!themeToggle) return;
  themeToggle.textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

applyTheme(document.documentElement.getAttribute("data-theme") || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}