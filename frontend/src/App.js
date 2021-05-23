import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";

function App() {
  return (
    <Container>
      <Router>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/signup" component={SignupScreen} exact />
      </Router>
    </Container>
  );
}

export default App;
