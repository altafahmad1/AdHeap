import React from "react";
import "./App.css";
import Home from "./components/Pages/HomePage/Home";
// import Services from './components/pages/Services/Services';
// import Products from './components/pages/Products/Products';
// import SignUp from './components/pages/SignUp/SignUp';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Pages/Footer/Footer";
import SignUp_In from "./components/Pages/SignUp_In/SignUp_In";
import Admin from "./components/Pages/Admin/Admin";
import Support from "./components/Pages/Support/Support";
import Sidebar from "./components/Pages/Admin/Admin_side";
import SubmitAd from "./components/Pages/Submit_Ad/Submit_Ad";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/SignUp_In" exact component={SignUp_In} />
        <Route path="/Admin" exact component={Admin} />
        <Route path="/Support">
          <Sidebar />
          <Support />
        </Route>
        <Route path="/ContactUs">
          <Support/>
        </Route>
        <Route path="/Submit_Ad">
          <Sidebar/>
          <SubmitAd/>
        </Route>
        
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
