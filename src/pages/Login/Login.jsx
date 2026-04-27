import React, { useState } from "react";
import "./Login.css";
import {login, signup } from '../../firebase'

const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (signState === "Sign In") {
      await login(email, password)
    } else {
      await signup(name, email, password)
    }
    setLoading(false);
  }
  

  return (
    
      loading ? (<div className="login-spinner">
                  <div className="loading-ring"></div>
      </div>) :
    
    <div className="login">
      <div className="login-logo">FrameFlow</div>
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input value={name} onChange={(e) => {setName(e.target.value)}} type="text" placeholder="Your Name" />
          ) : (
            <></>
          )}

          <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" />
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
          <button onClick={user_auth} type="submit">{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New here? <span onClick={() => {setSignState("Sign Up")}}>Create an account</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={() => {setSignState("Sign In")}}>Sign in instead</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
