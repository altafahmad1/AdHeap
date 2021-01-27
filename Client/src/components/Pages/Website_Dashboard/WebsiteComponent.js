import React,{useContext} from "react";
import {useHistory} from "react-router-dom";
import UserContext from "./../../../context/UserContext";

function WebsiteComponent(props){

    const {userData} = useContext(UserContext);
    const history = useHistory();

    return (

    <div className="website-workspace-wrapper">
          <div className="website-wrapper-content">
            <div className="website-workspace-details">
              <h2>{props.websiteTitle} </h2>  
              <h3><pre>URL:            {props.websiteUrl}</pre></h3>
              <h3><pre>Category:     {props.websiteCategory}</pre></h3>
              <h3><pre>Status:         {props.websiteStatus}</pre></h3>
              <h3><pre>API Keys:     {props.apiKeys}</pre></h3>
              <button onClick={(e) => history.push("/user/" + userData.user.id_user + "/website/" + props.websiteId)}>Check Instructions</button>
            </div>
          </div>
        </div>
    )
}

export default WebsiteComponent;