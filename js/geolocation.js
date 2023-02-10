var redirected = false;

fetch("https://ipapi.co/json/")
  .then(response => response.json())
  .then(data => {
    if (!redirected) {
      var countryCode = data.country_code;

      // Check if the user is located in Slovakia (SK) or Czech Republic (CZ)
      if (countryCode === "SK" || countryCode === "CZ") {
        // Show the Slovak or Czech version of the website
        window.location.replace("index.html");
      } else {
        // Show the English version of the website
        window.location.replace("en.html");
      }

      // Set the redirected flag to true to avoid infinite loop
      redirected = true;
    }
  });
