import React from "react";
import "../Admin/Admin-Home.css";
import { Link } from "react-router-dom";
import { Button } from '../../Button';

function AdminHome() {
  return (
    <div className="AdminPage_Wrapper">
      <h1>Advertise your product</h1>
      <h3>Reach targeted users</h3>
      <Link to="/Ads-Setup">
        <Button className="adSubmission-btn">Submit Your Ad</Button>
      </Link>
    </div>
  );
}

export default AdminHome;
