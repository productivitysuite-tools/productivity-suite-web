(() => {
  "use strict";

  const themeStorageKey = "productivity-suite-theme";
  const themeCopy = {
    en: { dark: "Use dark mode", light: "Use light mode" },
    es: { dark: "Usar modo oscuro", light: "Usar modo claro" },
    ca: { dark: "Utilitza el mode fosc", light: "Utilitza el mode clar" },
    fr: { dark: "Utiliser le mode sombre", light: "Utiliser le mode clair" },
    de: { dark: "Dunklen Modus verwenden", light: "Hellen Modus verwenden" },
    it: { dark: "Usa modalità scura", light: "Usa modalità chiara" },
    pt: { dark: "Usar modo escuro", light: "Usar modo claro" },
    nl: { dark: "Donkere modus gebruiken", light: "Lichte modus gebruiken" },
    ja: { dark: "ダークモードを使う", light: "ライトモードを使う" },
    zh_CN: { dark: "使用深色模式", light: "使用浅色模式" },
    zh: { dark: "使用深色模式", light: "使用浅色模式" },
  };

  const browserTheme = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const savedTheme = localStorage.getItem(themeStorageKey);
  const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : browserTheme;

  const language = () => {
    const current = document.documentElement.lang || "en";
    return themeCopy[current] ? current : current.startsWith("zh") ? "zh_CN" : "en";
  };

  const renderTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const nextMode = theme === "dark" ? "light" : "dark";
      const copy = themeCopy[language()] || themeCopy.en;
      button.textContent = theme === "dark" ? "☀" : "☾";
      button.setAttribute("aria-label", copy[nextMode]);
      button.setAttribute("title", copy[nextMode]);
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = theme === "dark" ? "#111827" : "#2b4dd6";
  };

  const setTheme = (theme, persist = true) => {
    renderTheme(theme);
    if (persist) localStorage.setItem(themeStorageKey, theme);
  };

  setTheme(initialTheme, false);

  document.addEventListener("DOMContentLoaded", () => {
    renderTheme(document.documentElement.dataset.theme || initialTheme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
      });
    });
  });

  document.addEventListener("productivitysuite:languagechange", () => {
    renderTheme(document.documentElement.dataset.theme || initialTheme);
  });
})();
