import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import "./script.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import CreateScreen from "./screens/CreateScreen";

function App() {
  return (
    <Router>
      <Container>
        {/* {(!userGoogle || !userInfo) && <Redirect to="/login" />} */}
        <Switch></Switch>
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/signup" component={SignupScreen} exact />
        <Route path="/" component={HomeScreen} exact />
        <Route path="/create" component={CreateScreen} exact />
        <Switch />
      </Container>
    </Router>
  );
}

export default App;
