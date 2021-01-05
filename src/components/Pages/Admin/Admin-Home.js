import React from "react";
import "../Admin/Admin-Home.css";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="wrapper">
      <div className="Adv-container">
        <div className="Adv-Text">
          <h1 className="Adv-Heading">Advertise your products</h1>
          <h3 className="Adv-Subheading">
            Reach targeted audience by using our effiecient Ads distribution
            system and  grow your Business
          </h3>
        </div>
        <div className="Adv-action">
          <button className="Adv-Button">Submit Ad</button>
        </div>
      </div>
{/*for website owners  */}
      <div className="sell-container">
        <div className="sell-Text">
          <h1 className="sell-Heading">Earn Money from your Website</h1>
          <h3 className="sell-Subheading">
            Place our customer's ads on your website and earn money.
            (Easy Passive Income) 
          </h3>
        </div>
        <div className="sell-action">
          <button className="sell-Button">Start Now</button>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
