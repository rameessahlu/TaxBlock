import React, { Component } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import "./styles/App.css";

// components
import NavBar from "./components/navBar";
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";

// store
import configureStore from "./store/configureStore";

const store = configureStore();

class App extends Component {
  addSubscribes() {
    store.subscribe(() => {
      console.log("Store changed!", store.getState());
    });
  }

  render() {
    this.addSubscribes();
    return (
      <div className="App">
        <NavBar></NavBar>
        <div className="container-fluid full-height bg-light ">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
