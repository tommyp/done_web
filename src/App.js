import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from './pages/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Index}/>
      </Router>
    </div>
  );
}

export default App;
