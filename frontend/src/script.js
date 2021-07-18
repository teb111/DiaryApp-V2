// window.addEventListener("DOMContentLoaded", () => {
//   const nav = document.querySelector(".nav-toggle");
//   const html = document.querySelector("html");

//   if (nav && html) {
//     nav.addEventListener("click", (e) => {
//       e.preventDefault();
//       html.classList.toggle("openNav");
//       nav.classList.toggle("active");
//     });
//   }
// });

const read = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector(".body");
    const readingTimeSummary = document.querySelector(".reading-time span");
    const avgWordsPerMin = 250;

    setReadingTime();
    function setReadingTime() {
      let count = getWordCount();
      let time = Math.ceil(count / avgWordsPerMin);

      readingTimeSummary.innerText = time + " min read";
    }

    function getWordCount() {
      return body.innerText.match(/\w+/g).length;
    }
  });
};

export { read };
