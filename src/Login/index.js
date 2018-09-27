import React, { Component } from "react";
import LogInView from "./LogInView";
import { withRouter } from "react-router";
import {db, auth} from '../Config/config.js';

class LogInContainer extends Component {

  constructor(props) {
    super(props);

    this.handleSignUp = this.handleSignUp.bind(this);
  }

  async handleSignUp( event ) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await auth.signInWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <LogInView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(LogInContainer);