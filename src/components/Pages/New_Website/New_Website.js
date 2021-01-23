import React from "react";
import "../New_Website/New_Website.css";
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';

function NewWebsite() {
  return (
    <div className="wrapper">
      
      <div className="website-details-container">
        <div className="website-details-form">
          <form className="ad-form" action="" method="post">
            <h2 className="website-form-Heading">ADD New Website</h2>
            <fieldset>
              <input
                placeholder="URL"
                type="text"
                tabindex="1"
                required
                autofocus
              ></input>
            </fieldset>
            <fieldset>
              <input
                placeholder="Category"
                type="text"
                tabindex="1"
                required
                autofocus
              ></input>
            </fieldset>
        
            <fieldset>
              <input
                placeholder="Details(optional)"
                type="text"
                tabindex="2"
                required
              ></input>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="new-website-addition">
        <Link to="/" className="create-website-link">
          <button className="new-website-create-button">
            <FaIcons.FaCloudUploadAlt className="create-icon" />
            Submit
          </button>
        </Link>
      </div>
     
    </div>
  );
}

export default NewWebsite;
