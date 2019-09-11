import React from "react";

const SIGNUP_URL = "http://localhost:4000/api/v1/sign_up";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: "",
      password_confirmation: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(SIGNUP_URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(this.state)
    }).then(function(data) {
      debugger;
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
      </React.Fragment>
    );
  }
}
