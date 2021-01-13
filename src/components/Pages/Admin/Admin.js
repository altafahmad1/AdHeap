import React from "react";
import "../Admin/Admin.css";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminHome from "../Admin/Admin-Home";
import Sidebar from "./Admin_side";
import NavbarUser from "./../NavbarUser/NavbarUser"

function Admin() {
  return (
    <div>
      <NavbarUser/>

      <Sidebar/>
      <AdminHome />
    </div>
  );
}

export default Admin;
