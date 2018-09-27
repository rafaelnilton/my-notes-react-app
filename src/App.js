import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import logo from './logo.svg';

import {db, auth} from './Config/config.js';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

import Home from "./Home";
import LogIn from "./Login";
import SignUp from "./SignUp";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      loading: true,
      authenticated: false,
      user: null
    }
  }

  componentWillMount() {

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });

  }

  render() {

    const { authenticated, loading } = this.state;
    
    if (loading) {
      return <p className="loading text-center">Loading...</p>;
    }

    return (
      <Router>
        <div>
          <PrivateRoute
            exact
            path="/"
            component={Home}
            authenticated={authenticated}
          />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    );

  }
}

export default App;
