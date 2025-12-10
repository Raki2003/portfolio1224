const prefersLight = window.matchMedia("(prefers-color-scheme: light)");
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTop");
const counters = document.querySelectorAll("[data-count]");

function setTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  themeToggle.textContent = mode === "light" ? "☾" : "☀";
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved);
    return;
  }
  setTheme(prefersLight.matches ? "light" : "dark");
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
  localStorage.setItem("theme", next);
}

function handleScroll() {
  if (window.scrollY > 240) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function animateCounters() {
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count, 10);
    const duration = 1200;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      counter.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
}

initTheme();
themeToggle.addEventListener("click", toggleTheme);
scrollTopBtn.addEventListener("click", smoothScrollToTop);
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", animateCounters);

