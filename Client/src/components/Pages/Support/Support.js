import React, {useContext, useState} from "react";
import SuccessNotice from "./../../misc/SuccessNotice";
import "../Support/Support.css";
import UserContext from "../../../context/UserContext";
import axios from "axios";


function Support() {
  const [successMsg, setSuccessMsg] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewPhoneNumber, setReviewPhoneNumber] = useState("");
  const [reviewWebsite, setReviewWebsite] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const {userData} = useContext(UserContext);


  const submitReview = async (e) => {
    e.preventDefault();
    if(userData.user){
      const review = {reviewMessage}
      axios.post("/user/" + userData.user.id_user + "/postUserReview", review).then((response)=>{
        response.data.msg && setSuccessMsg(response.data.msg);
      });
      setReviewMessage("");
    }
    else {
      const review = {reviewName, reviewEmail, reviewPhoneNumber, reviewWebsite, reviewMessage};
      axios.post("/user/postAnonReview", review).then((response) => {
        response.data.msg && setSuccessMsg(response.data.msg);
      });
      setReviewName("");
      setReviewEmail("");
      setReviewPhoneNumber("");
      setReviewWebsite("");
      setReviewMessage("");
    }
  }

  return (
    <div className="support-wrapper">
      <div class="support-container">
        <form onSubmit={submitReview} id="contact">
          <h2 className="Support-Heading">Contact Us Form</h2>
          {successMsg && <SuccessNotice message={successMsg} clearMsg={() => setSuccessMsg("")} />}
          {userData.user ? 

            <div>
              <fieldset>
                <textarea
                  placeholder="Type your message here...."
                  tabindex="5"
                  onChange={(e) => setReviewMessage(e.target.value)}
                  value={reviewMessage}
                  required
                ></textarea>
              </fieldset>
            </div>

           : 
          
           <div>
            <fieldset>
              <input
                placeholder="Your name"
                type="text"
                tabindex="1"
                onChange={(e) => setReviewName(e.target.value)}
                value={reviewName}
                required
                autofocus
              ></input>
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Email Address"
                type="email"
                tabindex="2"
                onChange={(e) => setReviewEmail(e.target.value)}
                value={reviewEmail}
                required
              ></input>
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Phone Number (optional)"
                type="tel"
                tabindex="3"
                onChange={(e) => setReviewPhoneNumber(e.target.value)}
                value={reviewPhoneNumber}
              ></input>
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Web Site (optional)"
                type="url"
                tabindex="4"
                onChange={(e) => setReviewWebsite(e.target.value)}
                value={reviewWebsite}
              ></input>
            </fieldset>
            <fieldset>
              <textarea
                onChange={(e) => setReviewMessage(e.target.value)}
                value={reviewMessage}
                placeholder="Type your message here...."
                tabindex="5"
                required
              ></textarea>
            </fieldset>
          </div>
          
          }
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Support;
