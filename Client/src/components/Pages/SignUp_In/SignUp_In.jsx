import React, { useContext, useState } from "react";
import {useHistory} from "react-router-dom";
import "../SignUp_In/SignUp_In.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import ErrorNotice from "./../../misc/ErrorNotice";


function SignUp_In() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions
  });

  // const loginBtnProps = useSpring({
  //   borderBottom: registrationFormStatus
  //     ? "solid 0px transparent"
  //     : "solid 2px #14FF85",  //Animate bottom border of login button
  // });
  // const registerBtnProps = useSpring({
  //   borderBottom: registrationFormStatus
  //     ? "solid 2px #14FF85"
  //     : "solid 0px transparent", //Animate bottom border of register button
  // });

  const history = useHistory();

  const [regError, setRegError] = useState("");
  const [logError, setLogError] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const {setUserData} = useContext(UserContext);

  const regSubmit = async (e) => {
    try{
      e.preventDefault();
      const newUser = {regName, regEmail, regPassword, regConfirmPassword};
      await axios.post("/user/register", newUser);
      const loginRes = await axios.post("/user/login", {
        logEmail: regEmail,
        logPassword: regPassword
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch(err){
      err.response.data.msg && setRegError(err.response.data.msg);
    }
  };

  const logSubmit = async (e) => {
    try {
      e.preventDefault();
      const loginUser = {logEmail, logPassword};
      const loginRes = await axios.post("/user/login", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch(err){
      err.response.data.msg && setLogError(err.response.data.msg);
    }
  };

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
        <animated.form onSubmit={logSubmit} id="loginform" style={loginProps}>
          <React.Fragment>
            {logError && <ErrorNotice message={logError} clearError={() => setLogError("")}/>}
            <label htmlFor="username">EMAIL</label>
            <input type="email" required name="logEmail" id="username" onChange={e => setLogEmail(e.target.value)}/>
            <label htmlFor="password">PASSWORD</label>
            <input type="password" required name="logPassword" id="password" onChange={e => setLogPassword(e.target.value)} />
            <input type="submit" value="submit" className="submit" />
            <p className="alternate_option">Or Signin With:</p>

            <button className="alternate_facebook">
                  <FaFacebookF />
              </button>

            <button className="alternate_google">
                <FaGoogle />
            </button> 
          </React.Fragment>
        </animated.form>

        <animated.form onSubmit={regSubmit} action="" id="registerform" style={registerProps}>
          <React.Fragment>
            {regError && <ErrorNotice message={regError} clearError={() => setRegError("")}/>}
            <div className="register-wrapper">
              <label htmlFor="fullname">full name</label>
              <input type="text" required id="fullname" onChange={e => setRegName(e.target.value) }/>
              <label htmlFor="regEmail">email</label>
              <input type="email" required id="RegEmail" onChange={(e) => setRegEmail(e.target.value)} />
              <label htmlFor="password">password</label>
              <input type="password" required  id="RegPassword" onChange={(e) => setRegPassword(e.target.value)} />
              <label htmlFor="confirmpassword">confirm password</label>
              <input type="password" required  id="confirmpassword" onChange={(e) => setRegConfirmPassword(e.target.value)} />
              <input type="submit" value="submit" className="submit" />
            </div>
          </React.Fragment>
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <a herf="#">Forgot your password?</a>
      </animated.div>
    </div>
  );

}

export default SignUp_In;
