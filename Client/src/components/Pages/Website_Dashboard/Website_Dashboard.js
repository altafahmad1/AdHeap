import React, {useContext, useEffect, useState} from "react";
import "./Website_Dashboard.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import WebsiteComponent from "./WebsiteComponent";
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

  function moveToElement(e){
      console.log(e.target.id);
  }
  


  return (
    <div className="Website-ad-wrapper">
      <div className="Welcome">
        <div className="Welcome-Text">
          <h1 className="Welcome-Heading">
            Welcome to your Websites Workspace
          </h1>
        </div>
      </div>
      {/* workspace heading */}
      <div className="website-workspace-head">
        <div className="website-workspace-heading">
          <h1>Recent Activity</h1>
        </div>
      </div>

      {/* ad workspace functions */}
      <div className="website-workspace-container">
        {/* example wrapper 1 */}
    
            {websiteData.map((item, index) => {
                return (
                   <WebsiteComponent
                    //    moveToElement={moveToElement}
                       websiteUrl={item.url}
                       websiteTitle={item.website_name}
                       websiteCategory={item.category}
                       apiKeys={item.api_key}
                       websiteStatus={item.status}
                       websiteId={item.website_id}
                   />

                 );
               })}
       
      </div>

      <div className="new-website-addition">
        <Link to={"/user/" + userData.user.id_user + "/Submit_Website"} className="create-website-link">
          <button className="new-website-create-button">
            <FaIcons.FaPlusCircle className="create-icon" />
            Add new Website
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Website_Dashboard;

