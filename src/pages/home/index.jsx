import React from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Home</h1>
        <Link to="/login">Login</Link>
      </React.Fragment>
    );
  }
}
