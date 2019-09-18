import React from "react";
import { makeRequest } from "../../utils/makeRequest";

const LOGIN_URL = "http://localhost:4000/api/v1/sign_in";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const self = this;
    makeRequest(LOGIN_URL, "POST", this.state).then(function(data) {
      document.cookie = `token=${data.jwt}`;
      self.setState({ redirect: true });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <br />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </React.Fragment>
    );
  }
}
