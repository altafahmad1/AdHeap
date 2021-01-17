import React from "react";
import "../Admin/Admin.css";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminHome from "../Admin/Admin-Home";
import Sidebar from "./Admin_side";

function Admin() {
  return (
    <div>
      <AdminHome />
    </div>
  );
}

export default Admin;
