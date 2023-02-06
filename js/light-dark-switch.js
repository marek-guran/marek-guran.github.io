window.addEventListener("load", function() {
const toggleDarkModeButton = document.getElementById("dark-mode");

  toggleDarkModeButton.addEventListener("click", function () {
    const currentStyleSheet = document.querySelector('link[href="css/style-dark.css"]');
    const alternateStyleSheet = document.querySelector('link[href="css/style.css"]');

    if (currentStyleSheet.href.endsWith("style.css")) {
      currentStyleSheet.href = "css/style-dark.css";
      alternateStyleSheet.href = "css/style.css";
    } else {
      currentStyleSheet.href = "css/style.css";
      alternateStyleSheet.href = "css/style-dark.css";
    }
    console.log("dark-mode");
});

const toggleLightModeButton = document.getElementById("light-mode");

  toggleLightModeButton.addEventListener("click", function () {
    const currentStyleSheet = document.querySelector('link[href="css/style.css"]');
    const alternateStyleSheet = document.querySelector('link[href="css/style-dark.css"]');

    if (currentStyleSheet.href.endsWith("style-dark.css")) {
      currentStyleSheet.href = "css/style.css";
      alternateStyleSheet.href = "css/style-dark.css";
    } else {
      currentStyleSheet.href = "css/style-dark.css";
      alternateStyleSheet.href = "css/style.css";
    }
    console.log("light-mode");
});
});