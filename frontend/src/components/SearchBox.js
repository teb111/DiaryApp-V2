import React, { useState } from "react";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <div>
      <form className="search" onSubmit={submitHandler}>
        <input
          type="text"
          className="searchTerm"
          placeholder="Type out any diary and press ENTER"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="searchButton"
          style={{ marginRight: "2px" }}
        >
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
