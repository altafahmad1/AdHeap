import React, {useState, useContext} from "react";
import "../Submit_Ad/Submit_Ad.css";
import { Link } from "react-router-dom";
import ErrorNotice from "./../../misc/ErrorNotice";
import {CountryData, CategoryData} from "./Ad_Form_Data";
import axios from "axios";
import UserContext from "./../../../context/UserContext";

function AdminHome() {
  const {userData} = useContext(UserContext);

  const [error, setError] = useState("");                                                                  
  const [amount, setAmount] = useState("0.00");
  const [adTitle, setAdTitle] = useState("");
  const [adDuration, setAdDuration] = useState("");
  const [adCategory, setAdCategory] = useState("");
  const [adCountry, setAdCountry] = useState("");
  const [adDetails, setAdDetails] = useState("");
  const [adImage, setAdImage] = useState(null);

  const submitAd = async (e) => {
    try {
      e.preventDefault();
      console.log(adImage.type);
      if(adImage.type !== "image/jpeg" && adImage.type !== "image/png"){
        setError("File type invalid. Only png and jpeg files are accepted.");
        return;
      }
      if(adImage.size > 1000000){
        setError("Image size too large. Max image size supported: 1 MB.");
        return;
      }
      const newAd = new FormData();
      newAd.append("adTitle", adTitle);
      newAd.append("adDuration", adDuration);
      newAd.append("adCategory", adCategory);
      newAd.append("adCountry", adCountry);
      newAd.append("adDetails", adDetails);
      newAd.append("file", adImage);
      await axios.post("/user/" + userData.user.id_user + "/postAd" , newAd);
    } catch(err){
      err.response.data.msg && setError(err.response.data.msg);
    }
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
              <li>Set the Duration and other details for ad</li>
              <li>Upload your Ad as jpg file</li>
              <li>Pay the calculated amount.</li>
            </ol>
          </h3>
        </div>
        <div className="Instruction-action">
          <h4>will insert image here later</h4>
        </div>
      </div>

      <div className="ad-details-container">
        <div className="ad-details-form">
        <form className="ad-form" action="" onSubmit={submitAd} method="post">
          <h2 className="ad-Heading">AD Detail form</h2>
          <fieldset>
            <input
              placeholder="Ad Title"
              type="text"
              tabIndex="1"
              onChange={e => setAdTitle(e.target.value)}
              required
              
              autoFocus
            ></input>
          </fieldset>
          <fieldset>
            <input
              placeholder="Duration(days)"
              type="number"
              tabIndex="2"
              onChange={e => setAdDuration(e.target.value)}
              onBlur = {() => adDuration==="" ? setAmount("0.00") : setAmount("" + (parseInt(adDuration)*0.5).toFixed(2))}
              required
              min="0"
 
            ></input>
          </fieldset>
          <fieldset>
            <select id="country" name="country" placeholder="Targeted country"
                type="text"
                tabIndex="2"
                onChange={e => setAdCategory(e.target.value)}
                required>
                <option value="">Select Suitable Category</option>
                {CategoryData.map((item, index) => {
                  return (
                  <option key={index} value={item.name}>{item.name}</option>
                  );
                })}
            </select>
         </fieldset>
         <fieldset>
            <select id="country" name="country" placeholder="Targeted country"
              type="text"
              tabIndex="2"
              onChange={e => setAdCountry(e.target.value)}
              required>
                <option value="">Select Target Country</option>
              {CountryData.map((item, index) => {
                return (
                <option key={index} value={item.name}>{item.name}</option>
                );
              })}
            </select>
          </fieldset>
          <fieldset>
            <input
              placeholder="Details(optional)"
              type="text"
              tabIndex="2"
              onChange ={e => setAdDetails(e.target.value)}
              
            ></input>
          </fieldset>

          {/* for image uploading */}
          <div className="image-upload-container">
            <script
              className="jsbin"
              src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"
            ></script>
            <div className="file-upload">
              <div
                className="payment-box"
              >
                Amount: ${amount} 
              </div>
              {error && <ErrorNotice message={error} clearError={() => setError("")}/>}

              <div className="image-upload-wrap">
                <input
                  className="file-upload-input"
                  required type="file" accept="image/*" onChange={e => setAdImage(e.target.files[0])}
                />
                <div className="drag-text">
                  <h3>Drag and drop a file or select add Image</h3>
                </div>
              </div>
              <input
                className="file-submit-btn"
                type="submit"
              />   

              <div className="file-upload-content">
                <img className="file-upload-image" src="#" alt="your image" />
                <div className="image-title-wrap">
                  <button
                    type="button"
                    className="remove-image"
                  >
                    Remove <span className="image-title">Uploaded Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        
        </form>
        </div>
      </div>

      
    </div>
  );
}

export default AdminHome;
