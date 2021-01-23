import React from "react";
import "../WebsiteAd/WebsiteAd.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

function WebsiteAd() {
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

        <div className="website-workspace-wrapper">
          <div className="website-wrapper-content">
            <div className="website-workspace-details">
              <h2>Website 1 </h2>  
              <h3><pre>URL:             altaf1.github.com</pre></h3>
              <h3><pre>Status:         active</pre></h3>
              <h3><pre>API Keys:     **********</pre></h3>
            </div>
          </div>
        </div>
        {/* example wrapper 2 */}

        <div className="website-workspace-wrapper">
          <div className="website-wrapper-content">
            <div className="website-workspace-details">
              <h2>Website 1 </h2>  
              <h3><pre>URL:             altaf1.github.com</pre></h3>
              <h3><pre>Status:         active</pre></h3>
              <h3><pre>API Keys:     **********</pre></h3>
            </div>
          </div>
        </div>
        {/* example wrapper 2 */}

        <div className="website-workspace-wrapper">
          <div className="website-wrapper-content">
            <div className="website-workspace-details">
              <h2>Website 1 </h2>  
              <h3><pre>URL:             altaf1.github.com</pre></h3>
              <h3><pre>Status:         active</pre></h3>
              <h3><pre>API Keys:     **********</pre></h3>
            </div>
          </div>
        </div>
        {/* example wrapper 2 */}

        <div className="website-workspace-wrapper">
          <div className="website-wrapper-content">
            <div className="website-workspace-details">
              <h2>Website 1 </h2>  
              <h3><pre>URL:             altaf1.github.com</pre></h3>
              <h3><pre>Status:         active</pre></h3>
              <h3><pre>API Keys:     **********</pre></h3>
            </div>
          </div>
        </div>
        
      

       

        
      </div>

      <div className="new-website-addition">
        <Link to="/New_Website_add" className="create-website-link">
          <button className="new-website-create-button">
            <FaIcons.FaPlusCircle className="create-icon" />
            Add new Website
          </button>
        </Link>
      </div>
    </div>
  );
}

export default WebsiteAd;
