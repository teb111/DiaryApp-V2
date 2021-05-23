import React from "react";

const HomeScreen = () => {
  return (
    <header class="top-header">
      <button class="logout-btn">Logout</button>
      <h1>Personal Diary</h1>
      <button class="add-icon">
        <i className="fas fa-plus"></i>
      </button>
    </header>
  );
};

export default HomeScreen;
