import React from "react";
import "../Support/Support.css";

function Support() {
  return (
    <div className="support-wrapper">
      <div class="support-container">
        <form id="contact" action="" method="post">
          <h2 className="Support-Heading">Contact Us Form</h2>
          <fieldset>
            <input
              placeholder="Your name"
              type="text"
              tabindex="1"
              required
              autofocus
            ></input>
          </fieldset>
          <fieldset>
            <input
              placeholder="Your Email Address"
              type="email"
              tabindex="2"
              required
            ></input>
          </fieldset>
          <fieldset>
            <input
              placeholder="Your Phone Number (optional)"
              type="tel"
              tabindex="3"
              required
            ></input>
          </fieldset>
          <fieldset>
            <input
              placeholder="Your Web Site (optional)"
              type="url"
              tabindex="4"
              required
            ></input>
          </fieldset>
          <fieldset>
            <textarea
              placeholder="Type your message here...."
              tabindex="5"
              required
            ></textarea>
          </fieldset>
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
