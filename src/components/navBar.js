import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Store
import configureStore from "../store/configureStore";
import { userLoggedOut } from "../store/auth";

const store = configureStore();

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    store.dispatch(userLoggedOut());
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Tax Block
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {this.props.userLoggedIn ? (
              <li className="nav-item active">
                <Link className="nav-link" onClick={this.logout} to="/login">
                  Logout
                </Link>
              </li>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
          ;{" "}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { userLoggedIn: state.auth.email_address };
}

export default connect(mapStateToProps)(NavBar);
