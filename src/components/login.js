import React, { Component } from "react";
//import { useHistory } from "react-router-dom";

// Styles
import "../styles/login-signup.css";

// store
import configureStore from "../store/configureStore";
import { selectUser } from "../store/users";
import { selectAuth } from "../store/auth";
import { userLoggedIn } from "../store/auth";

const store = configureStore();

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { formEmail: "", formPassword: "", formError: "" };

    let authUser = selectAuth(store.getState());
    console.log(authUser);
    if (authUser !== "") {
      this.props.history.push("/home");
    }

    this.loginUser = this.loginUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  loginUser = (event) => {
    event.preventDefault();
    let formError = "Username or password doesn't match";
    let user = selectUser(store.getState(), this.state.formEmail);
    //console.log(user);
    if (user.length === 1) {
      if (user[0].password === this.state.formPassword) {
        this.setState({ formError: "" });
        store.dispatch(userLoggedIn(this.state.formEmail));
        this.props.history.push("/");
      } else {
        this.setState({ formError: formError });
      }
    } else {
      this.setState({ formError: formError });
    }
    //console.log(store);
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const users = this.state;
    return (
      <React.Fragment>
        <div className="row form-pos col-sm-12">
          <form onSubmit={this.loginUser}>
            <h3>Login</h3>
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={users.formEmail}
                name="formEmail"
                onChange={this.handleInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={users.formPassword}
                name="formPassword"
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {users.formError && (
              <div className="alert alert-danger">{users.formError}</div>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}
