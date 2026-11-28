// Follow the site's theme choice (the same localStorage key the rest of
// liambeckman.com uses, default dark) and wire up any .theme-toggle button.
(() => {
  const KEY = "ddb-theme";
  const read = () => { try { return localStorage.getItem(KEY) === "light" ? "light" : "dark"; } catch { return "dark"; } };
  const apply = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    for (const b of document.querySelectorAll(".theme-toggle")) {
      b.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  };
  apply(read());
  document.addEventListener("DOMContentLoaded", () => {
    apply(read());
    for (const b of document.querySelectorAll(".theme-toggle")) {
      b.addEventListener("click", () => {
        const next = read() === "dark" ? "light" : "dark";
        try { localStorage.setItem(KEY, next); } catch {}
        apply(next);
      });
    }
  });
})();
