import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import "./script.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import CreateScreen from "./screens/CreateScreen";
import DiaryScreen from "./screens/DiaryScreen";
import BookmarkScreen from "./screens/BookmarkScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import FallBackScreen from "./screens/FallBackScreen";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/signup" component={SignupScreen} exact />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} />
          <Route path="/search" component={HomeScreen} />

          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route path="/edit/:id" component={CreateScreen} exact />
          <Route path="/details/:id" component={DiaryScreen} exact />
          <Route path="/bookmarks" component={BookmarkScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/user/:id" component={UserProfileScreen} exact />
          <Route component={FallBackScreen} exact />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
