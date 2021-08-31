import $ from "jquery";

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-toggle");
  const html = document.querySelector("html");

  if (nav && html) {
    nav.addEventListener("click", (e) => {
      e.preventDefault();
      html.classList.toggle("openNav");
      nav.classList.toggle("active");
    });
  }

  var btn = $("#button");

  $(window).on("scroll", () => {
    if ($(window).scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });
});
