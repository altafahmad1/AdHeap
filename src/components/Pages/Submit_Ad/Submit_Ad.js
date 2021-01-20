import React from "react";
import "../Submit_Ad/Submit_Ad.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

function Submit_Ad() {
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

        <div className="ad-workspace-wrapper">
          <div className="ad-wrapper-content">
            <div className="ad-workspace-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtJ0AtSAKRRWVNmoiIzO5gMtaSJMgm0EgxJA&usqp=CAU"
                alt=""
                srcset=""
              ></img>
            </div>
            <div className="ad-workspace-details">
              <h5>Title: aluminum</h5>
              <h5>Category: metal</h5>
              <h5>Time-left: 19 hours</h5>
            </div>
          </div>
        </div>
{/* example wrapper 2 */}

        <div className="ad-workspace-wrapper">
          <div className="ad-wrapper-content">
            <div className="ad-workspace-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtJ0AtSAKRRWVNmoiIzO5gMtaSJMgm0EgxJA&usqp=CAU"
                alt=""
                srcset=""
              ></img>
            </div>
            <div className="ad-workspace-details">
              <h5>Title: aluminum</h5>
              <h5>Category: metal</h5>
              <h5>Time-left: 19 hours</h5>
            </div>
          </div>
        </div>
{/* example wrapper 3 */}

        <div className="ad-workspace-wrapper">
          <div className="ad-wrapper-content">
            <div className="ad-workspace-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtJ0AtSAKRRWVNmoiIzO5gMtaSJMgm0EgxJA&usqp=CAU"
                alt=""
                srcset=""
              ></img>
            </div>
            <div className="ad-workspace-details">
              <h5>Title: aluminum</h5>
              <h5>Category: metal</h5>
              <h5>Time-left: 19 hours</h5>
            </div>
          </div>
          
        </div>

        {/* example wrapper 4 */}

        <div className="ad-workspace-wrapper">
          <div className="ad-wrapper-content">
            <div className="ad-workspace-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtJ0AtSAKRRWVNmoiIzO5gMtaSJMgm0EgxJA&usqp=CAU"
                alt=""
                srcset=""
              ></img>
            </div>
            <div className="ad-workspace-details">
              <h5>Title: aluminum</h5>
              <h5>Category: metal</h5>
              <h5>Time-left: 19 hours</h5>
            </div>
          </div>
          
        </div>
         {/* example wrapper 5 */}

         <div className="ad-workspace-wrapper">
          <div className="ad-wrapper-content">
            <div className="ad-workspace-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtJ0AtSAKRRWVNmoiIzO5gMtaSJMgm0EgxJA&usqp=CAU"
                alt=""
                srcset=""
              ></img>
            </div>
            <div className="ad-workspace-details">
              <h5>Title: aluminum</h5>
              <h5>Category: metal</h5>
              <h5>Time-left: 19 hours</h5>
            </div>
          </div>
        </div>
      </div>

     
      <div className="new-ad-creation">
        <Link to="/Create-Ad" className="create-ad-link">
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
