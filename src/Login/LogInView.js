
import React from "react";
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';

const LogInView = ({ onSubmit }) => {
  
  return (
    <div className="container">
        <div className="form-login">
          <h2 className="titulo">Login</h2>
          <form onSubmit={onSubmit}>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
              <Input type="password" name="password" id="examplePassword" placeholder="Password" />
              <button className="btn btn-success btn-login" type="submit">Submit</button>
          </form>
        </div>
    </div>
    );
};

export default LogInView;