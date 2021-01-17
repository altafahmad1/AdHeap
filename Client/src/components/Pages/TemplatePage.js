import React from "react";
import {useParams} from "react-router-dom";

function TemplatePage() {
    const {userid} = useParams();
    console.log(userid);
    return (
        <h1>Id: {userid}</h1>
    );
}

export default TemplatePage;