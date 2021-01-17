import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import "./ForgotPasswordPage.css";
import ErrorNotice from "./../../misc/ErrorNotice";
import SuccessNotice from "./../../misc/SuccessNotice";
import axios from "axios";


export default function SpringModal() {
  const [successMsg, setSuccessMsg] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const submitForgotPassword = async (e) => {
    try {
      e.preventDefault();
      const forgotPasswordEmail = {email};
      await axios.post("/user/requestPassword", forgotPasswordEmail).then(response => {
        response.data.msg && setSuccessMsg(response.data.msg);
      });
      // history.push("/SignUp_In");
    } catch(err){
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
          <div className="forgot-password-wrapper">
            <h2>Forgot Password?</h2>
            <form onSubmit={submitForgotPassword}>
              {successMsg && <SuccessNotice message={successMsg} clearMsg={() => setSuccessMsg("")} />}
              {error && <ErrorNotice message={error} clearError={() => setError("")} />}
              <label htmlFor="email">EMAIL</label>
              <input type="email" required name="email" id="email" onChange={e => setEmail(e.target.value)}/>
              <input type="submit" value="submit" className="submit" />
            </form>
          </div>
  );
}