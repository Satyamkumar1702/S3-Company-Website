(function ($) {
  "use strict";
  var wind = $(window);
  // Var Background image
  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  // Popup Video
  $(".popup-video").magnificPopup({
    disableOn: 320,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  // Header Sticky
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 120) {
      $(".navbar-section").addClass("is-sticky");
    } else {
      $(".navbar-section").removeClass("is-sticky");
    }
  });

  // Mean Menu
  jQuery(".mean-menu").meanmenu({
    meanScreenWidth: "991",
  });

  // Button Hover JS
  $(function () {
    $(".default-btn, .default-btn-one")
      .on("mouseenter", function (e) {
        var parentOffset = $(this).offset(),
          relX = e.pageX - parentOffset.left,
          relY = e.pageY - parentOffset.top;
        $(this).find("span").css({
          top: relY,
          left: relX,
        });
      })
      .on("mouseout", function (e) {
        var parentOffset = $(this).offset(),
          relX = e.pageX - parentOffset.left,
          relY = e.pageY - parentOffset.top;
        $(this).find("span").css({
          top: relY,
          left: relX,
        });
      });
  });

  // Skill Progress
  wind.on("scroll", function () {
    $(".skill-progress .progres").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr("data-value");
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal,
        });
      }
    });
  });

  // Tabs
  (function ($) {
    $(".tab ul.tabs").addClass("active").find("> li:eq(0)").addClass("current");
    $(".tab ul.tabs li a").on("click", function (g) {
      var tab = $(this).closest(".tab"),
        index = $(this).closest("li").index();
      tab.find("ul.tabs > li").removeClass("current");
      $(this).closest("li").addClass("current");
      tab
        .find(".tab_content")
        .find("div.tabs_item")
        .not("div.tabs_item:eq(" + index + ")")
        .slideUp();
      tab
        .find(".tab_content")
        .find("div.tabs_item:eq(" + index + ")")
        .slideDown();
      g.preventDefault();
    });
  })(jQuery);

  // Testimonial Slider
  $(".testimonial-slider").owlCarousel({
    loop: true,
    nav: true,
    dots: true,
    autoplayHoverPause: true,
    autoplay: true,
    smartSpeed: 1000,
    margin: 20,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });

  // Partner Logo
  $("#partner-carousel").owlCarousel({
    margin: 0,
    autoplay: true,
    autoplayTimeout: 1500,
    smartSpeed: 800,
    nav: false,
    dots: false,
    autoplayHoverPause: true,
    loop: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  //  Star Counter
  $(".counter-number").counterUp({
    delay: 15,
    time: 2000,
  });

  // FAQ Accordion
  $(function () {
    $(".accordion")
      .find(".accordion-title")
      .on("click", function () {
        // Adds Active Class
        $(this).toggleClass("active");
        // Expand or Collapse This Panel
        $(this).next().slideToggle("slow");
        // Hide The Other Panels
        $(".accordion-content").not($(this).next()).slideUp("slow");
        // Removes Active Class From Other Titles
        $(".accordion-title").not($(this)).removeClass("active");
      });
  });

  // Go to Top
  $(function () {
    // Scroll Event
    $(window).on("scroll", function () {
      var scrolled = $(window).scrollTop();
      if (scrolled > 600) $(".go-top").addClass("active");
      if (scrolled < 600) $(".go-top").removeClass("active");
    });
    // Click Event
    $(".go-top").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: "0",
        },
        100
      );
    });
  });

  // Count Time
  function makeTimer() {
    var endTime = new Date("July 10, 2027 17:00:00 PDT");
    var endTime = Date.parse(endTime) / 1000;
    var now = new Date();
    var now = Date.parse(now) / 1000;
    var timeLeft = endTime - now;
    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - days * 86400) / 3600);
    var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    var seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    );
    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }
    $("#days").html(days + "<span>Days</span>");
    $("#hours").html(hours + "<span>Hours</span>");
    $("#minutes").html(minutes + "<span>Minutes</span>");
    $("#seconds").html(seconds + "<span>Seconds</span>");
  }
  setInterval(function () {
    makeTimer();
  }, 1000);

  // WOW JS
  $(window).on("load", function () {
    if ($(".wow").length) {
      var wow = new WOW({
        boxClass: "wow", // Animated element css class (default is wow)
        animateClass: "animated", // Animation css class (default is animated)
        offset: 20, // Distance to the element when triggering the animation (default is 0)
        mobile: true, // Trigger animations on mobile devices (default is true)
        live: true, // Act on asynchronously loaded content (default is true)
      });
      wow.init();
    }
  });

  // Preloader JS
  $(window).on("load", function () {
    var preloader = $("#preloader"),
      loader = preloader.find("#preloader-center");
    loader.fadeOut();
    preloader.delay(400).fadeOut("slow");
  });
})(jQuery);
// // s3family-slider
// $(".s3family-slider").owlCarousel({
//   loop: true,
//   nav: false,
//   dots: false,
//   autoplayHoverPause: true,
//   autoplay: true,
//   smartSpeed: 1000,
//   margin: 20,

//   responsive: {
//     0: {
//       items: 1,
//     },
//     768: {
//       items: 2,
//     },
//     1200: {
//       items: 3,
//     },
//   },
// });
$(document).ready(function () {
  $(".s3family-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 600,
    navText: ["&#8592;", "&#8594;"], // Left & Right arrows
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});
// JavaScript to handle smooth scrolling on anchor links (like LinkedIn)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
// When the document is ready
document.addEventListener("DOMContentLoaded", function () {
  // Loop through each progress bar
  const progressBars = document.querySelectorAll(".progres");

  progressBars.forEach((bar) => {
    const value = bar.getAttribute("data-value");
    bar.style.width = value;
  });
});
// submit button form on career page
function validateForm() {
  var email = document.getElementById("email").value;
  var submitBtn = document.getElementById("submitBtn");

  // Simple email validation check
  if (email.trim() !== "" && email.includes("@") && email.includes(".")) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}
// career form
function openForm() {
  document.getElementById("application-form").style.display = "block";
}

function closeForm() {
  document.getElementById("application-form").style.display = "none";
}
// google translator
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}
// contact us form response message
// document
//   .getElementById("contact-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form from actually submitting

//     // Display success message
//     var successAlert = document.getElementById("success-alert");
//     successAlert.style.display = "block";

//     // Fade out the message after 3 seconds
//     setTimeout(function () {
//       successAlert.style.opacity = "0";
//       setTimeout(() => (successAlert.style.display = "none"), 500);
//     }, 3000);

//     // Optionally, reset the form
//     this.reset();
//   });
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "", // Keep this blank to include all languages
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

// Store selected language in local storage to persist across pages
function setLanguage(lang) {
  localStorage.setItem("selectedLanguage", lang);
  var select = document.querySelector(".goog-te-combo");
  if (select) select.value = lang;
}

// Apply stored language when page loads
window.onload = function () {
  var selectedLang = localStorage.getItem("selectedLanguage");
  if (selectedLang && document.querySelector(".goog-te-combo")) {
    document.querySelector(".goog-te-combo").value = selectedLang;
    document.querySelector(".goog-te-combo").dispatchEvent(new Event("change"));
  }
};
