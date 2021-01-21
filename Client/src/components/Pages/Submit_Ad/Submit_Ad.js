import React, {useContext, useEffect, useState} from "react";
import "../Submit_Ad/Submit_Ad.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import AdComponent from "./AdComponent";
import UserContext from "../../../context/UserContext";
import axios from "axios";

function Submit_Ad() {
  const {userData} = useContext(UserContext);
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const getAdData = async() => {
     try {
      await axios.get("/user/getUserAds", 
      {headers: {"x-auth-token": token},}).then(response => {
        setAdData(response.data);
      });

     } 
     catch(err) {

      }
    }

    getAdData();
  }, []);
  
  function datesToDays(adSince, activeTill){
    const date1 = new Date(adSince.slice(0,10));
    const date2 = new Date(activeTill.slice(0,10));
    const days = (date2.getTime() - date1.getTime()) / (3600 * 1000* 24);
    return days;
  }

  return (
    <div className="wrapper">
      <div className="Instruction">
        <div className="Instruction-Text">
          <h1 className="Instruction-Heading">
            Get Your Ad Running in 3 simple steps
          </h1>
          <h3 className="Instruction-Subheading">
            <ol>
              <li>Set the Duration and details for your ad</li>
              <li>Upload your Ad as jpg file( Recommended Aspect ratio 16:9 )</li>
              <li>Pay the calculated amount</li>
            </ol>
          </h3>
        </div>
      </div>
{/* workspace heading */}
      <div className="ad-workspace-head">
        <div className="ad-workspace-heading">
          <h1>Recent Activity</h1>
        </div>
      </div>

      {/* ad workspace functions */}
      <div className="ad-workspace-container">
        {/* example wrapper 1 */}

        {adData.map((item, index) => {
          return (
            <AdComponent
              image={item.ad_image} 
              adTitle={item.ad_title}
              adCategory={item.ad_category}
              adCountry={item.ad_country}
              leftDays={datesToDays(item.ad_since, item.active_till)}
            />
          );
        })}

      </div>

     
      <div className="new-ad-creation">
        <Link to={"/user/" + userData.user.id_user +"/Create_Ad"} className="create-ad-link">
          <button className="new-ad-create-button">
            <FaIcons.FaPlusCircle className="create-icon" />
            Create New Ad
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Submit_Ad;
