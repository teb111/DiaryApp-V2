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
          class="searchTerm"
          placeholder="What are you looking for?"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
