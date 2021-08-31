import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <a href="/" className="small-heading">
          {" "}
          <i className="fas fa-book-open header-icon"></i>Diaryapp-v2
        </a>
        <ul className="social-icons">
          <h5>Made By Oluwatobiloba</h5>
          <li>
            <a
              href="https://twitter.com/oluwa_toobi"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter footer-icons"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/teb111"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github footer-icons"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/_t.e_b/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram footer-icons"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
