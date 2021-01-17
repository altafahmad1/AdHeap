import React from "react";
import "./Notice.css";

export default function SuccessNotice(props){
    return (
        <div className="success-notice">
            <span>{props.message}</span>
            <button onClick={props.clearMsg}>X</button>
        </div>
    );
};