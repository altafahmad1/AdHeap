import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Home from './components/Pages/HomePage/Home';
// import Services from './components/pages/Services/Services';
// import Products from './components/pages/Products/Products';
// import SignUp from './components/pages/SignUp/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Pages/Footer/Footer';
import SignUp_In from './components/Pages/SignUp_In/SignUp_In';
import UserContext from "./context/UserContext";
import userContext from './context/UserContext';
import axios from "axios";


function App() {
  const [userData, setUserData] = useState({
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

      const tokenRes = await axios.post("http://localhost:4000/user/tokenIsValid", null, 
      {headers: {"x-auth-token": token},});
      if(tokenRes.data){
        const userRes = await axios.get("http://localhost:4000/user", 
        {headers: {"x-auth-token": token},});
        setUserData({
          token,
          user: userRes.data
        });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <userContext.Provider value={{userData, setUserData}}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/SignUp_In' exact component={SignUp_In} />
        </Switch>
        <Footer/>
      </userContext.Provider>
    </Router>
  );
}

export default App;