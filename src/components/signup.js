import React, { Component } from "react";
import CustomModal from "./feedbackModal";

// Styles
import "../styles/login-signup.css";

// store
import configureStore from "../store/configureStore";
import { userAdded, selectUser } from "../store/users";
import { selectAuth } from "../store/auth";

const store = configureStore();

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formEmail: "",
      formPassword: "",
      formConfirmPassword: "",
      formError: "",
      showModal: false,
    };

    let authUser = selectAuth(store.getState());
    console.log(authUser);
    if (authUser !== "") {
      this.props.history.push("/home");
    }

    this.registerUser = this.registerUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  showRegistrationError = (formError) => {
    this.setState({ formError: formError });
    console.log(this.state);
  };

  registerUser = (event) => {
    event.preventDefault();
    console.log(store);
    let formError = "Password doesn't match";

    if (this.state.formPassword === this.state.formConfirmPassword) {
      if (selectUser(store.getState(), this.state.formEmail).length === 0) {
        store.dispatch(
          userAdded(this.state.formEmail, this.state.formPassword)
        );
        this.setState({ formError: "", showModal: true });
      } else {
        formError = "Email already taken";
        this.showRegistrationError(formError);
      }
    } else {
      this.showRegistrationError(formError);
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
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
          <form onSubmit={this.registerUser}>
            <h3>Signup</h3>
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
            <div className="form-group">
              <label htmlFor="inputConfirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                placeholder="Password"
                value={users.formConfirmPassword}
                name="formConfirmPassword"
                onChange={this.handleInputChange}
              />
              {users.formError && (
                <div className="alert alert-danger">{users.formError}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <CustomModal show={users.showModal} closeModal={this.closeModal} />
        </div>
      </React.Fragment>
    );
  }
}
