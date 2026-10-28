// Off the Leash Pet Grooming Adelaide (redesign): mobile menu, scroll-spy, FAQ accordion, lightbox.
(function () {
  "use strict";

  // Mobile menu (instant toggle, no transition on the dropdown)
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-mobile-menu]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Scroll-spy via IntersectionObserver
  var spyLinks = document.querySelectorAll("[data-spy]");
  var spyMap = {};
  spyLinks.forEach(function (link) { spyMap[link.getAttribute("data-spy")] = link; });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        spyLinks.forEach(function (link) { link.classList.remove("active"); });
        var link = spyMap[entry.target.id];
        if (link) { link.classList.add("active"); }
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  ["services", "process", "gallery", "why", "booking", "faq"].forEach(function (id) {
    var section = document.getElementById(id);
    if (section) { observer.observe(section); }
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var button = item.querySelector(".faq-q");
    button.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // Lightbox
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var closeBtn = document.querySelector(".lightbox-close");
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    lightboxImg.alt = "";
  }
  document.querySelectorAll(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () {
      lightboxImg.src = item.getAttribute("data-full");
      lightboxImg.alt = item.getAttribute("data-alt") || "";
      lightbox.hidden = false;
    });
  });
  if (closeBtn) { closeBtn.addEventListener("click", closeLightbox); }
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) { closeLightbox(); }
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.hidden) { closeLightbox(); }
  });
})();
