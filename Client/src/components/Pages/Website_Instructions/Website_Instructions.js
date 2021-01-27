import React, {useContext, useEffect, useState} from "react";
import "../Website_Dashboard/Website_Dashboard.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import UserContext from "../../../context/UserContext";
import axios from "axios";

function Website_Dashboard() {
  const {userData} = useContext(UserContext);
  const [websiteData, setWebsiteData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const getWebsiteData = async() => {
     try {
      await axios.get("/user/getUserWebsites", 
      {headers: {"x-auth-token": token},}).then(response => {
        setWebsiteData(response.data);
      });

     } 
     catch(err) {

      }
    }

    getWebsiteData();
  }, []);
  
  return (
    <div className="Website-ad-wrapper">
      <div className="Welcome">
        <div className="Welcome-Text">
          <h1 className="Welcome-Heading">
            Please follow the instructions to make your website actively earning.
          </h1>
        </div>
      </div>
      {/* workspace heading */}
      <div className="website-workspace-head">
        <div className="website-workspace-heading">
          <h1>Instructions</h1>
        </div>
        
      </div>

      {/* ad workspace functions */}
      <div className="website-workspace-container">
        {/* example wrapper 1 */}
        <div className="instructions-container">
            <fieldset className="instructions-fields">
                <label>Copy </label>
                <input />
            </fieldset>
        </div>
      </div>

    </div>
  );
}

export default Website_Dashboard;

