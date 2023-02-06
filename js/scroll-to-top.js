window.addEventListener("load", function() {
    window.onscroll = function () {
        scrollFunction();
    };
      
      function scrollFunction() {
        if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
        ) {
          document.getElementById("back-to-top").style.display = "block";
        } else {
          document.getElementById("back-to-top").style.display = "none";
        }
      }

      document.getElementById("back-to-top").addEventListener("click", function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    });