import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Home from "./components/Pages/HomePage/Home";
import { BrowserRouter as Router, useHistory ,Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Pages/Footer/Footer";
import SignUpIn from "./components/Pages/SignUp_In/SignUp_In";
import ForgotPasswordPage from "./components/Pages/SignUp_In/ForgotPasswordPage";
import Admin from "./components/Pages/Admin/Admin";
import Support from "./components/Pages/Support/Support";
import Sidebar from "./components/Pages/Admin/Admin_side";
import Submit_Ad from "./components/Pages/Submit_Ad/Submit_Ad";
import Create_Ad from "./components/Pages/Create_Ad/Create_Ad";
import NavbarUser from "./components/Pages/NavbarUser/NavbarUser";
import Account from "./components/Pages/Account/Account";
import Settings from "./components/Pages/Settings/Settings";
import Payment from "./components/Pages/Payment/Payment";
import PrivateRoute from "./components/misc/PrivateRoute";
import userContext from './context/UserContext';
import axios from "axios";


function App() {

  const history = useHistory();

  const [userData, setUserData] = useState({
    isLoggedIn: false,
    isLoading: true,
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async ()=>{
      let token = localStorage.getItem("auth-token");
      if (token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await axios.post("/user/tokenIsValid", null, 
      {headers: {"x-auth-token": token},});
      if(tokenRes.data){
        const userRes = await axios.get("/user", 
        {headers: {"x-auth-token": token},});
        setUserData({
          token,
          user: userRes.data,
          isLoggedIn: true,
          isLoading: false
        });
      } else {
        setUserData({
          isLoading: false
        })
      }
    }
    checkLoggedIn();
  }, []);


  return (
        <Router>
          <userContext.Provider value={{userData, setUserData}}>
          {userData.user ? <div><NavbarUser /><Sidebar /></div> : <Navbar />}  
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Support" component={Support}/>
            <Route path="/ContactUs" component={Support}/>
            <Route exact path="/SignUp_In" component={SignUpIn} />
            <Route path="/forgotPassword" component={ForgotPasswordPage} />
            <PrivateRoute path="/user/:userid/Admin" component={Admin} />
            <PrivateRoute path="/user/:userid/Submit_Ad" component={Submit_Ad} />
            <PrivateRoute path="/user/:userid/Create_Ad" component={Create_Ad} />
            <PrivateRoute path="/user/:userid/account/" component={Account} />
            <PrivateRoute path="/user/:userid/payment" component={Payment} />
            <PrivateRoute path="/user/:userid/settings/" component={Settings} />
          </Switch>
        <Footer />
      </userContext.Provider>
    </Router>
  );

}

export default App;
