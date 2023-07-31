/* ===================================================================
 *
 * ------------------------------------------------------------------- */

(function ($) {
  "use strict";

  var cfg = {
      scrollDuration: 800, // smoothscroll duration
      mailChimpURL:
        "https://gmail.us21.list-manage.com/subscribe/post?u=df8d958378567c051e904638e&amp;id=d1deaaf8aa&amp;f_id=001ed9e6f0", // mailchimp url
    },
    $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);

  /* Preloader
   * -------------------------------------------------- */
  var ssPreloader = function () {
    $("html").addClass("ss-preload");

    $WIN.on("load", function () {
      //force page scroll position to top at page refresh
      $("html, body").animate({ scrollTop: 0 }, "normal");

      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });

      // for hero content animations
      $("html").removeClass("ss-preload");
      $("html").addClass("ss-loaded");
    });
  };

  /* Menu on ScrollDown
   * ------------------------------------------------------ */
  var ssMenuOnScrollDown = function () {
    var hdr = $(".s-header"),
      hdrTop = $(".s-header").offset().top;

    $WIN.on("scroll", function () {
      if ($WIN.scrollTop() > hdrTop) {
        hdr.addClass("sticky");
      } else {
        hdr.removeClass("sticky");
      }
    });
  };

  /* Mobile Menu
   * ---------------------------------------------------- */
  var ssMobileMenu = function () {
    var toggleButton = $(".header-menu-toggle"),
      nav = $(".header-nav-wrap");

    toggleButton.on("click", function (event) {
      event.preventDefault();

      toggleButton.toggleClass("is-clicked");
      nav.slideToggle();
    });

    if (toggleButton.is(":visible")) nav.addClass("mobile");

    $WIN.on("resize", function () {
      if (toggleButton.is(":visible")) nav.addClass("mobile");
      else nav.removeClass("mobile");
    });

    nav.find("a").on("click", function () {
      if (nav.hasClass("mobile")) {
        toggleButton.toggleClass("is-clicked");
        nav.slideToggle();
      }
    });
  };

  /* Highlight the current section in the navigation bar
   * ------------------------------------------------------ */
  var ssWaypoints = function () {
    var sections = $(".target-section"),
      navigation_links = $(".header-nav-wrap li a");

    sections.waypoint({
      handler: function (direction) {
        var active_section;

        active_section = $("section#" + this.element.id);

        if (direction === "up")
          active_section = active_section.prevAll(".target-section").first();

        var active_link = $(
          '.header-nav-wrap li a[href="#' + active_section.attr("id") + '"]'
        );

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
      },

      offset: "25%",
    });
  };

  /* slick slider
   * ------------------------------------------------------ */
  var ssSlickSlider = function () {
    $(".about-desc__slider").slick({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      pauseOnFocus: false,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 1401,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1101,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 701,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    $(".testimonials__slider").slick({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      pauseOnFocus: false,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 1001,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var ssSmoothScroll = function () {
    $(".smoothscroll").on("click", function (e) {
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration,
          "swing"
        )
        .promise()
        .done(function () {
          // check if menu is open
          // if ($('body').hasClass('menu-is-open')) {
          //     $('.header-menu-toggle').trigger('click');
          // }

          window.location.hash = target;
        });
    });
  };

  /* Alert Boxes
   * ------------------------------------------------------ */
  var ssAlertBoxes = function () {
    $(".alert-box").on("click", ".alert-box__close", function () {
      $(this).parent().fadeOut(500);
    });
  };

  /* Animate On Scroll
   * ------------------------------------------------------ */
  var ssAOS = function () {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 300,
      once: true,
      disable: "mobile",
    });
  };

  /* Back to Top
   * ------------------------------------------------------ */
  var ssBackToTop = function () {
    var pxShow = 500,
      goTopButton = $(".go-top");

    // Show or hide the button
    if ($(window).scrollTop() >= pxShow)
      goTopButton.addClass("link-is-visible");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= pxShow) {
        if (!goTopButton.hasClass("link-is-visible"))
          goTopButton.addClass("link-is-visible");
      } else {
        goTopButton.removeClass("link-is-visible");
      }
    });
  };

  /* AjaxChimp
   * ------------------------------------------------------ */
  var ssAjaxChimp = function () {
    $("#mc-form").ajaxChimp({
      url: cfg.mailChimpURL,
      language: "es",
      callback: function (resp) {
        console.log({ resp });
        if (resp.result === "success") {
          // if the subscription was successful, reset your form
          $("#mc-form").trigger("reset");
        }
      },
    });

    // Define the e-mail validation error messages in Spanish
    $.ajaxChimp.translations.es = {
      submit: "Submitting...",
      0: '<i class="fas fa-check"></i> Thank you for registering! We\'re excited to have you join our community.',
      1: '<i class="fas fa-exclamation-triangle"></i> You must enter a valid e-mail address.',
      2: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
      3: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
      4: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
      5: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
    };
  };

  /* Initialize
   * ------------------------------------------------------ */
  (function clInit() {
    ssPreloader();
    ssMenuOnScrollDown();
    ssMobileMenu();
    ssWaypoints();
    ssSlickSlider();
    ssSmoothScroll();
    ssAlertBoxes();
    ssAOS();
    ssBackToTop();
    ssAjaxChimp();
  })();
})(jQuery);
