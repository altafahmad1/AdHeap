import React from "react";
import "../Submit_Ad/Submit_Ad.css";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="wrapper">
      <div className="Instruction">
        <div className="Instruction-Text">
          <h1 className="Instruction-Heading">
            Get Your Ad Running in 3 simple steps
          </h1>
          <h3 className="Instruction-Subheading">
            <ol>
              <li>Upload your Ad as jpg file</li>
              <li>Set the timing and other details for ad</li>
              <li>Pay the calculated amount.</li>
            </ol>
          </h3>
        </div>
        <div className="Instruction-action">
          <h4>will insert image here later</h4>
        </div>
      </div>
      {/*for website owners  */}
      <div className="sell-container">
        <script
          class="jsbin"
          src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"
        ></script>
        <div class="file-upload">
          <button
            class="file-upload-btn"
            type="button"
            onclick="$('.file-upload-input').trigger( 'click' )"
          >
            Add Image
          </button>

          <div class="image-upload-wrap">
            <input
              class="file-upload-input"
              type="file"
              onchange="readURL(this);"
              accept="image/*"
            />
            <div class="drag-text">
              <h3>Drag and drop a file or select add Image</h3>
            </div>
          </div>
          <button
            class="file-submit-btn"
            type="button"
            
          >
Submit          </button>

          <div class="file-upload-content">
            <img class="file-upload-image" src="#" alt="your image" />
            <div class="image-title-wrap">
              <button
                type="button"
                onclick="removeUpload()"
                class="remove-image"
              >
                Remove <span class="image-title">Uploaded Image</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
