(function () {
  function getStoredTheme() {
    return localStorage.getItem("darkMode") === "true";
  }

  function setAssetTheme(isDarkMode) {
    var themedAssets = document.querySelectorAll("[data-light-src][data-dark-src]");

    themedAssets.forEach(function (asset) {
      asset.src = isDarkMode ? asset.dataset.darkSrc : asset.dataset.lightSrc;
    });
  }

  function syncToggleState(isDarkMode) {
    var toggles = document.querySelectorAll("[data-theme-toggle]");

    toggles.forEach(function (toggle) {
      toggle.checked = isDarkMode;
    });
  }

  function applyTheme(isDarkMode) {
    if (!document.body) {
      return;
    }

    document.body.classList.toggle("dark-mode", isDarkMode);
    setAssetTheme(isDarkMode);
    syncToggleState(isDarkMode);
  }

  function persistTheme(isDarkMode) {
    localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
  }

  function handleToggle(event) {
    var isDarkMode = Boolean(event.target.checked);
    persistTheme(isDarkMode);
    applyTheme(isDarkMode);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var isDarkMode = getStoredTheme();
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    var currentYear = document.getElementById("currentYear");

    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener("change", handleToggle);
    });

    applyTheme(isDarkMode);
  });
})();
