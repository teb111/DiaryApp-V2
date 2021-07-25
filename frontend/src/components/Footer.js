import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <h6 className="small-heading">Diary-app v2</h6>
        <ul className="social-icons">
          <h5>Made By Oluwatobiloba</h5>
          <li>
            <a
              href="https://twitter.com/oluwa_toobi"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fab fa-twitter footer-icons"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/teb111"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fab fa-github footer-icons"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/_t.e_b/"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fab fa-instagram footer-icons"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
