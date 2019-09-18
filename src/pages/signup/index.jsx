import React from "react";
import { Redirect } from "react-router-dom";
import { makeRequest } from "../../utils/makeRequest";

const SIGNUP_URL = "http://localhost:4000/api/v1/sign_up";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      redirect: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const self = this;
    makeRequest(SIGNUP_URL, "POST", this.state).then(function(data) {
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
        <h1>Signup</h1>
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
          <label htmlFor="password_confirmation">password confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            onChange={this.handleChange}
            value={this.state.password_confirmation}
          />
          <br />
          <button type="submit">Login</button>
        </form>
        {this.state.redirect && <Redirect to="/" />}
      </React.Fragment>
    );
  }
}
