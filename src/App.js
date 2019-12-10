import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Index from "./pages/index";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/today" exact component={Index} />
        </Router>
      </div>
    </div>
  );
}

export default App;
