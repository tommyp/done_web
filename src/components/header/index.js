import React from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}
