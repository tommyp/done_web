import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/home";
import Index from "./pages/index";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/today" exact component={Index} />
      </Router>
    </div>
  );
}

export default App;
