window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-toggle");
  const html = document.querySelector("html");

  console.log(nav);

  if (nav && html) {
    console.log("Good");
    nav.addEventListener("click", (e) => {
      e.preventDefault();
      html.classList.toggle("openNav");
      nav.classList.toggle("active");
    });
  }
});
