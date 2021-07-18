import React from "react";
import "./DiaryFlex.css";
import { read } from "../script.js";

const DiaryFlex = ({ user, id, title, body }) => {
  console.log(read);
  return (
    <>
      <div className="lc af ld" key={id}>
        <div className="af" key={id}>
          <div className="af">
            <div>
              <div className="af">
                <div className="aj dn">
                  <div className="pn po pp pq pr ps pt">
                    <div className="ct ar bv il pu pv pw iz px">
                      <div className="ez aj az af">
                        <div className="lb af">
                          <div className="ar bv bc">
                            <a href="null">
                              <img
                                alt=""
                                className="hc hf he"
                                src="https://miro.medium.com/fit/c/25/25/1*Vu4RoB0iqeQ7A77HmLBDfA.jpeg"
                                width="20"
                                height="20"
                              />
                            </a>
                            <div className="mq ar bv fg">
                              <div className="hi af">
                                <div>
                                  <div
                                    className="af"
                                    role="tooltip"
                                    aria-hidden="false"
                                    aria-describedby="11"
                                    aria-labelledby="11"
                                  >
                                    <a
                                      href="bb"
                                      className="bd be bf bg bh bi bj bk bl bm bn bo bp bq br"
                                      rel="noopener"
                                    >
                                      <h4 className="ca fw id hw kn mr ms mt mu mv mw cd mx">
                                        {user}
                                      </h4>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a
                          className="bd be bf bg bh bi bj bk bl bm bn bo bp bq br"
                          rel="noopener"
                          href="15"
                        >
                          <h2 className="title">{title}</h2>
                          <div className="qt af g">
                            <h3 className="title body">
                              {body.substring(0, 190)}............
                            </h3>
                          </div>
                        </a>
                        <div className="qu qv qw qx qy ar qz il">
                          <div className="az ar bv">
                            <span className="nn">
                              <span className="ca b id cc ie">May 29</span>
                            </span>
                            <div className="mz ra dn af gy rb">
                              <span className="af">
                                <span className="ca b cb cc ie">·</span>
                              </span>
                            </div>
                            <span className="nn reading-time">
                              <span className="ca b id cc ie">
                                {body ? read() : ""}
                              </span>
                            </span>
                          </div>
                          <div className="ar">
                            <div className="ar bv">
                              <div className="hd af rd">
                                <div className="re">
                                  <div>
                                    <div
                                      className="cu"
                                      role="tooltip"
                                      aria-hidden="false"
                                      aria-describedby="1"
                                      aria-labelledby="1"
                                    >
                                      <button
                                        className="bd be bf bg bh bi bj bk bl bm bn bo bp bq br"
                                        aria-label="Bookmark Post"
                                      >
                                        <svg
                                          width="25"
                                          height="25"
                                          viewBox="0 0 25 25"
                                        >
                                          <path
                                            d="M19 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14.66h.01c.01.1.05.2.12.28a.5.5 0 0 0 .7.03l5.67-4.12 5.66 4.13a.5.5 0 0 0 .71-.03.5.5 0 0 0 .12-.29H19V6zm-6.84 9.97L7 19.64V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v13.64l-5.16-3.67a.49.49 0 0 0-.68 0z"
                                            fillRule="evenodd"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="af bu">
                                <div
                                  className="cu"
                                  aria-hidden="false"
                                  aria-describedby="creatorActionOverflowMenu"
                                  aria-labelledby="creatorActionOverflowMenu"
                                >
                                  <div
                                    className="cu"
                                    aria-hidden="false"
                                    aria-describedby="removeFromPublicationPopover"
                                    aria-labelledby="removeFromPublicationPopover"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a
                        className="bd be bf bg bh bi bj bk bl bm bn bo bp bq br image-control"
                        rel="noopener"
                        href="/predict/this-long-awaited-technology-may-finally-change-the-world-ec3023a30af2?source=explore---------0-49--------------------8fb30b31_4544_4075_bdbd_0ad00c929477-------15"
                      >
                        <img
                          alt="This Long-Awaited Technology May Finally Change the World"
                          src="https://miro.medium.com/fit/c/250/168/1*GlIDBz93SkiY0H9Ib7rObQ.jpeg"
                          width="200"
                          height="134"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiaryFlex;
