// TODO :

/* Preloader
 * -------------------------------------------------- */
const ssPreloader = function () {
  document.documentElement.classList.add("ss-preload");

  window.addEventListener("load", function () {
    //force page scroll position to top at page refresh
    window.scrollTo({ top: 0, behavior: "auto" });

    // will first fade out the loading animation
    var loader = document.getElementById("loader");
    loader.style.transition = "opacity 0.5s ease-out";
    loader.style.opacity = 0;

    setTimeout(function () {
      // will fade out the whole DIV that covers the website.
      var preloader = document.getElementById("preloader");
      preloader.style.transition = "opacity 0.5s ease-out";
      preloader.style.opacity = 0;
    }, 300);

    // for hero content animations
    document.documentElement.classList.remove("ss-preload");
    document.documentElement.classList.add("ss-loaded");
  });
};

// This function adds a scroll event listener to the window.
// When the window is scrolled, it checks if the scroll position
// (window.scrollY) is greater than the top offset of the header element (hdrTop).
// If so, it adds the 'sticky' class to the header, and if not, it removes it.
// This likely results in some sort of "sticky header" effect, where the header becomes fixed at the top of the screen after a certain scroll position.

/* Menu on ScrollDown
 * ------------------------------------------------------ */
var ssMenuOnScrollDown = function () {
  var hdr = document.querySelector(".s-header"),
    hdrTop = hdr.offsetTop;

  window.addEventListener("scroll", function () {
    if (window.scrollY > hdrTop) {
      hdr.classList.add("sticky");
    } else {
      hdr.classList.remove("sticky");
    }
  });
};

/* Mobile Menu
 * ---------------------------------------------------- */
// This function adds an event listener to the 'click' event
// on the toggleButton which triggers a function that prevents
// the default action of the event and toggles the 'is-clicked'
// class on the button and shows/hides the navigation depending
// on its current state.
var ssMobileMenu = function () {
  var toggleButton = document.querySelector(".header-menu-toggle"),
    nav = document.querySelector(".header-nav-wrap");

  toggleButton.addEventListener("click", function (event) {
    event.preventDefault();

    toggleButton.classList.toggle("is-clicked");
    nav.style.display = nav.style.display === "none" ? "" : "none";
  });

  if (window.getComputedStyle(toggleButton).display !== "none")
    nav.classList.add("mobile");

  window.addEventListener("resize", function () {
    if (window.getComputedStyle(toggleButton).display !== "none")
      nav.classList.add("mobile");
    else nav.classList.remove("mobile");
  });

  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (nav.classList.contains("mobile")) {
        toggleButton.classList.toggle("is-clicked");
        nav.style.display = nav.style.display === "none" ? "" : "none";
      }
    });
  });
};

/* Highlight the current section in the navigation bar
 * ------------------------------------------------------ */
var ssWaypoints = function () {
  var sections = document.querySelectorAll(".target-section");
  var navigation_links = document.querySelectorAll(".header-nav-wrap li a");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var active_section = entry.target;

          var active_link = document.querySelector(
            '.header-nav-wrap li a[href="#' + active_section.id + '"]'
          );

          navigation_links.forEach(function (nav_link) {
            nav_link.parentNode.classList.remove("current");
          });

          active_link.parentNode.classList.add("current");
        }
      });
    },
    { rootMargin: "-25% 0px -75%" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
};
var ssSlickSlider = function () {
  var aboutDescSlider = new Swiper(".about-desc__slider", {
    slidesPerView: 4,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    breakpoints: {
      701: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1101: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1401: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  var testimonialsSlider = new Swiper(".testimonials__slider", {
    slidesPerView: 2,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    breakpoints: {
      1001: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });
};
var ssSmoothScroll = function () {
  var links = document.querySelectorAll(".smoothscroll");

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
      e.preventDefault();

      var target = document.querySelector(this.getAttribute("href"));

      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: target.offsetTop,
      });

      // check if menu is open
      // if (document.body.classList.contains('menu-is-open')) {
      //     document.querySelector('.header-menu-toggle').click();
      // }

      window.location.hash = this.getAttribute("href");
    });
  }
};
var ssAlertBoxes = function () {
  var alertCloseButtons = document.querySelectorAll(".alert-box__close");
  alertCloseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      this.parentElement.style.display = "none";
    });
  });
};
