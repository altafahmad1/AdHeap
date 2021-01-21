import React from "react";

function AdComponent(props){
    return (
        <div className="ad-workspace-wrapper">
        <div className="ad-wrapper-content">
            <div className="ad-workspace-image">
                <img
                src={props.image}
                ></img>
            </div>
            <div className="ad-workspace-details">
                <h5>Title: {props.adTitle}</h5>
                <h5>Category: {props.adCategory}</h5>
                <h5>Country: {props.adCountry}</h5>
                <h5>Time-left: {props.leftDays} Days</h5>
            </div>
        </div>
    </div>
    )
}

export default AdComponent;