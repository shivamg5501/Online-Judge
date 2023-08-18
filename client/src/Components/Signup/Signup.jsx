import React, { useState } from "react";

import "./Signup.css";
import { backendUrl } from "../../constants.js";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container mt-5">
        <h1>Register</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <form action="/Signup" method="POST">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" />
                  </div>
                  <button type="submit" className="btn btn-dark center" >Register</button>
                </form>
                </div>  
            </div>
          </div>
          {/* The social sign-up section */}
          {/* <div className="col-sm-4">
            <div className="card social-block">
              <div className="card-body">
                <a className="btn btn-block" href="/auth/google" role="button">
                  <i className="fab fa-google"></i>
                  Sign Up with Google
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
  );
};

export default Signup;
