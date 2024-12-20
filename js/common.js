$(document).ready(function() {
  'use strict';

  /* =======================
  // Toggle Menu and Search
  ======================= */
  var $menuOpenButton = $(".menu-button"),
      $menuCloseButton = $(".menu-close"),
      $navMenu = $(".nav-menu"),

      $searchOpenButton = $(".search-button"),
      $searchCloseButton = $(".search-close-button"),
      $search = $(".search");
      
  var $searchInputField = $("#search-input");

  $(window).on("resize", function () {
    var e = $(this);
    if (e.width() >= 991) {
      $navMenu.removeClass("active"); // Remove class - "active" if width window more than 991px
    }
  });

  $menuOpenButton.on("click", function() {
    openMenu();
  });

  $menuCloseButton.on("click", function() {
    closeMenu();
  });

  $searchOpenButton.on("click", function() {
    openSearch();
  });

  $searchCloseButton.on("click", function() {
    closeSearch();
  });

  $searchInputField.on("focus", function() {
    openSearch();
  });

  function openMenu() {
    $navMenu.addClass("active");
  }

  function closeMenu() {
    $navMenu.removeClass("active");
  }

  function openSearch() {
    $search.addClass("active");
    $("#js-search-input").focus();
  }

  function closeSearch() {
    $search.removeClass("active");
  }


  /* =======================
  // Change Language
  ======================= */
  var $langSelect = $("#language-select");

  $langSelect.change(function() {
    var selectedLang = $(this).val();
    var currentPath = window.location.pathname;
    var supportedLangs = ['en', 'it', 'nl']; // Add or remove languages as needed

    // Ensure the selected language is supported
    if (supportedLangs.includes(selectedLang)) {
      // Determine the current language prefix
      var currentLangPrefix = supportedLangs.find(lang => currentPath.startsWith('/' + lang)) || '';
      
      // Replace or add the language prefix
      var newPath = currentPath.replace('/' + currentLangPrefix, '/' + selectedLang);
      
      // If the path does not match any language prefix, prepend the new language prefix
      if (currentLangPrefix === '') {
        newPath = '/' + selectedLang + currentPath;
      }

      // Navigate to the new path
      window.location.href = newPath;
    }
  });

  /* =======================
  // Reveal Image
  ======================= */
  var ww = window.innerWidth,
    wh = window.innerHeight;

  $(window).ready(function () {
    $('body').waitForImages({
      finished: function () {
        setTimeout(function () {
          $('.preloader').addClass('hide');

          setTimeout(function () {
            reveals();
          }, 100);
        }, 500);
      },
      waitForAll: true
    });
  });

  function reveals() {
    $(window).on('scroll', function () {
      $(".article-box, .article-first, .post-image-box, .page-image-box, .post-body img, .page-body img, .recent-header").each(
        function(i) {
          var el_top = $(this).offset().top,
            win_bottom = wh + $(window).scrollTop();

          if (el_top < win_bottom) {
            $(this)
              .delay(i * 100)
              .queue(function() {
                $(this).addClass("reveal-in");
              });
          }
        }
      );
    }).scroll();
  }


  /* =======================
  // Responsive Videos
  ======================= */
  $(".post-content, .page-content").fitVids({
    customSelector: ['iframe[src*="ted.com"]']
  });
  

  /* =======================
  // Instagram Feed
  ======================= */
  // userId and accessToken from Matthew Elsom (https://codepen.io/matthewelsom/pen/zrrrLN) for example, for which he thanks a lot!
  var instagramFeed = new Instafeed({
    get: 'user',
    limit: 6,
    resolution: 'standard_resolution',
    userId: '8987997106',
    accessToken: '8987997106.924f677.8555ecbd52584f41b9b22ec1a16dafb9',
    template:
      '<li class="instagram-item"><a href="{{link}}" aria-label="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}"></a></li>'
  });

  if ($('#instafeed').length) {
    instagramFeed.run();
  }


  /* =======================
  // Scroll Top Button
  ======================= */
  $(".top").click(function () {
    $("html, body")
      .stop()
      .animate({ scrollTop: 0 }, "slow", "swing");
  });

});
