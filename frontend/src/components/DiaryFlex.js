import React from "react";
import { useDispatch } from "react-redux";
import { createBookmark } from "../actions/userActions";
import "./DiaryFlex.css";

import parse from "html-react-parser";

const DiaryFlex = ({
  id,
  user,
  title,
  body,
  image,
  readTime,
  userId,
  userImage,
}) => {
  const dispatch = useDispatch();

  const bookmarkPost = (e) => {
    e.preventDefault();
    dispatch(createBookmark(id));
    console.log("bookmark");
  };

  return (
    <>
      <div className="lc af ld">
        <div className="af">
          <div className="af">
            <div>
              <div className="af">
                <div className="aj dn">
                  <div className="pn po pp pq pr ps pt">
                    <div className="ct ar bv il pu pv pw iz px diary-grid">
                      <div className="ez aj az af">
                        <div className="lb af">
                          <div className="ar bv bc">
                            <a href={`/details/${id}`}>
                              <img
                                alt=""
                                className="hc hf he"
                                src={userImage}
                                width="20"
                                height="20"
                              />
                            </a>
                            <div className="mq ar bv fg">
                              <div className="hi af">
                                <div>
                                  <div className="af">
                                    <a
                                      href={`/user/${userId}`}
                                      className="bd be bf bg bh bi bj bk bl bm bn bo bp bq br"
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
                          href={`/details/${id}`}
                        >
                          <h2 className="title">{title}</h2>
                          <div className="qt af g">
                            <div className="title body">
                              {body.startsWith("<pre>") ? (
                                ""
                              ) : (
                                <>{parse(body.substring(0, 100) + "...")}</>
                              )}
                            </div>
                          </div>
                        </a>
                        <div className="qu qv qw qx qy ar qz il">
                          <div className="az ar bv">
                            <span className="nn">
                              <span className="ca b id cc ie">May 29</span>
                            </span>
                            .&nbsp;
                            <span className="nn reading-time">
                              <span className="ca b id cc ie">{readTime}</span>
                            </span>
                          </div>
                          <div className="ar">
                            <div className="ar bv">
                              <div className="hd af rd">
                                <div className="re">
                                  <div>
                                    <div className="cu">
                                      <button
                                        className="bd be bf bg bh bi bj bk bl bm bn bo bp bq br bookmark"
                                        aria-label="Bookmark Post"
                                        onClick={bookmarkPost}
                                        style={{
                                          cursor: "pointer",
                                          padding: "4px",
                                          background: "none",
                                        }}
                                      >
                                        <div className="bookmark">
                                          <label className="bookmark">
                                            <input type="checkbox" />
                                            <div>
                                              <svg
                                                className="background"
                                                viewBox="0 0 16 24"
                                                stroke="currentColor"
                                              >
                                                <path d="M0.5,23.124911 L6.9318135,16.6008331 C6.93933086,16.5932441 6.93933086,16.5932441 6.94691994,16.5857267 C7.53686305,16.0041267 8.48658644,16.01089 9.0681865,16.6008331 L15.5,23.124911 L15.5,2.02869001 C15.5,1.18283629 14.8268205,0.5 14,0.5 L2,0.5 C1.17317953,0.5 0.5,1.18283629 0.5,2.02869001 L0.5,23.124911 Z"></path>
                                              </svg>
                                              <svg
                                                className="active"
                                                viewBox="0 0 16 24"
                                                fill="currentColor"
                                              >
                                                <path d="M2,0 L14,0 C15.1045695,0 16,0.908275455 16,2.02869001 L16,23.7565572 C16,23.8910069 15.8925483,24 15.76,24 C15.696348,24 15.6353031,23.9743516 15.5902944,23.9286973 L8.71212433,16.9518598 C8.32439096,16.5585644 7.69124204,16.5540555 7.29794663,16.9417889 C7.29456578,16.9451219 7.29120871,16.948479 7.28787567,16.9518598 L0.409705627,23.9286973 C0.315979797,24.0237676 0.164020203,24.0237676 0.0702943725,23.9286973 C0.0252856417,23.8830429 0,23.8211222 0,23.7565572 L0,2.02869001 C0,0.908275455 0.8954305,0 2,0 Z"></path>
                                              </svg>
                                            </div>
                                          </label>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a
                        className="bd be bf bg bh bi bj bk bl bm bn bo bp bq br image-control"
                        rel="noopener"
                        href={`/details/${id}`}
                      >
                        <img
                          className="diary-image"
                          alt={title}
                          src={image}
                          width="250"
                          height="200"
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
