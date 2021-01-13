import React, { useState } from "react";
import "../SignUp_In/SignUp_In.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

function SignUpIn() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -700 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 700, // Register form sliding positions
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          // style={loginBtnProps}
        >
          Login
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          // style={registerBtnProps}
        >
          Register
        </animated.button>
      </div>
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <Link to="/ForgetPass">
          <p>Forgot password?</p>
        </Link>
      </animated.div>
    </div>
  );

  function LoginForm() {
    return (
      <React.Fragment>
        <label for="username">EMAIL</label>
        <input type="text" id="username" />
        <label for="password">PASSWORD</label>
        <input type="password" id="password" />
        <Link to="/Admin" className="btn-link">
          <input type="submit" value="submit" class="submit" />
        </Link>
        <p className="alternate_option">Or Signin With:</p>
        <button className="alternate_facebook">
          <Link>
            <FaFacebookF />
          </Link>
        </button>

        <button className="alternate_google">
          <Link>
            <FaGoogle />
          </Link>
        </button>
      </React.Fragment>
    );
  }

  function RegisterForm() {
    return (
      <React.Fragment>
        <div className="register-wrapper">
          <label for="fullname">full name</label>
          <input type="text" id="fullname" />
          <label for="email">email</label>
          <input type="text" id="email" />
          <label for="password">password</label>
          <input type="password" id="password" />
          <label for="confirmpassword">confirm password</label>
          <input type="password" id="confirmpassword" />

          <Link to="/Admin" className="btn-link">
            <input type="submit" value="submit" class="submit" />
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUpIn;