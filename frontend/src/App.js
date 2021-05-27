import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
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
  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <Container>
        {/* {(!userGoogle || !userInfo) && <Redirect to="/login" />} */}
        <Switch></Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/signup" component={SignupScreen} exact />
        <Switch />
      </Container>
    </Router>
  );
}

export default App;
