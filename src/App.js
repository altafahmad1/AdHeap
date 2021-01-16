import React from "react";
import "./App.css";
import Home from "./components/Pages/HomePage/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Pages/Footer/Footer";
import SignUpIn from "./components/Pages/SignUp_In/SignUp_In";
import Admin from "./components/Pages/Admin/Admin";
import Support from "./components/Pages/Support/Support";
import Sidebar from "./components/Pages/Admin/Admin_side";
import SubmitAd from "./components/Pages/Submit_Ad/Submit_Ad";
import NavbarUser from "./components/Pages/NavbarUser/NavbarUser";
import Account from "./components/Pages/Account/Account";
import Settings from "./components/Pages/Settings/Settings";
import Payment from "./components/Pages/Payment/Payment";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Home />
        </Route>
        <Route exact path="/SignUp_In">
          <Navbar />
          <SignUpIn />
        </Route>
        <Route path="/Admin" exact component={Admin} />
        <Route path="/Support">
          <NavbarUser />

          <Sidebar />
          <Support />
        </Route>
        <Route path="/ContactUs">
          <Navbar />
          <Support />
        </Route>
        <Route path="/Submit_Ad">
          <NavbarUser />
          <Sidebar />
          <SubmitAd />
        </Route>

        <Route path="/Account">
          <NavbarUser />
          <Sidebar />
          <Account />
        </Route>

        <Route path="/Payment">
          <NavbarUser />
          <Sidebar />
          <Payment />
        </Route>

        <Route path="/Settings">
          <NavbarUser />
          <Sidebar />
          <Settings />
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
