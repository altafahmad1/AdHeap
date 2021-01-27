import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import "./../Create_Ad/Create_Ad.css";
import ErrorNotice from "../../misc/ErrorNotice";
import {CategoryData} from "./../Create_Ad/Ad_Form_Data";
import axios from "axios";
import UserContext from "../../../context/UserContext";

function CreateAd() {

  const history = useHistory();
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [websiteCategory, setWebsiteCategory] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  

  const {userData} = useContext(UserContext);

  const [error, setError] = useState("");                                                                  



  const submitWebsite = async (e) => {
    try {
      e.preventDefault();
      const newWebsite = {websiteTitle, websiteCategory, websiteUrl};
      setWebsiteCategory("");
      setWebsiteTitle("");
      setWebsiteUrl("");
      await axios.post("/user/" + userData.user.id_user + "/postWebsite", newWebsite).then(() => {
          history.push("/user/" + userData.user.id_user + "/Website_Dashboard");
      });
    } catch(err){
      err.response.data.msg && setError(err.response.data.msg);
    }
  }

  return (
    <div className="wrapper">
      <div className="Instruction">
        <div className="Instruction-Text">
          <h1 className="Instruction-Heading">
            Earn from your website in 3 simple steps
          </h1>
          <h3 className="Instruction-Subheading">
            <ol>
              <li>Fill in the required info in the following form.</li>
              <li>Add the generated code to your website as instructed.</li>
              <li>Enjoy your earnings.</li>
            </ol>
          </h3>
        </div>
        <div className="Instruction-action">
          <h4>will insert image here later</h4>
        </div>
      </div>

      <div className="ad-details-container">
        <div className="ad-details-form">
        <form className="ad-form" action="" onSubmit={submitWebsite}>
          <h2 className="ad-Heading">Website Detail Form</h2>
          <fieldset>
            <input
              value={websiteTitle}
              placeholder="Website Title"
              type="text"
              tabIndex="1"
              onChange={e => setWebsiteTitle(e.target.value)}
              required
              
              autoFocus
            ></input>
          </fieldset>
          
          <fieldset>
            <select 
                value={websiteCategory}
                type="text"
                tabIndex="2"
                onChange={e => setWebsiteCategory(e.target.value)}
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
            <input
              value={websiteUrl}
              placeholder="Website URL e.g. https://www.example.com"
              required
              type="text"
              tabIndex="2"
              onChange ={e => setWebsiteUrl(e.target.value)}
              
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
                Earnings: $10/month
              </div>
              {error && <ErrorNotice message={error} clearError={() => setError("")}/>}

             
              <input
                className="file-submit-btn"
                type="submit"
              />   

              
            </div>
          </div>
        
        </form>
        </div>
      </div>

      
    </div>
  );
}

export default CreateAd;
