import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import "../Settings/Settings.css";
import { FaUserCog } from "react-icons/fa";
import { Link, Route } from "react-router-dom";
import AlertDialog from "./../../misc/AlertDialog";
import UserContext from "./../../../context/UserContext";
import axios from "axios";

function Settings() {
  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

  const confirmDelete = async () => {
    try {
      await axios.delete("/user/" + userData.user.id_user + "/delete");
      setUserData({
        token: undefined,
        user: undefined
      });
      localStorage.setItem("auth-token", "");
      history.push("/");
    } 
    catch (err){
      console.log(err);
    }
  }

  const handleCancel = () => {
    return;
  }

  return (
    <div className="Settings-wrapper">
      <div className="Settings-top-wrapper">
        <FaUserCog size="105px" />
      </div>
      <div className="Settings-head">
        <h1 className="Settings-heading">User Settings</h1>
      </div>

      <div className="Settings-bottom-wrapper">


      <table class="dcf-table dcf-table-responsive dcf-table-bordered dcf-w-100%">
	<thead></thead>
  <tbody>
  <tr>
			<td><Link to="/"><button className="update-btn">Update Information</button></Link></td>
		</tr>
		<tr>
			<td><button className="changepass-btn">Change Password</button></td>
		</tr>
		<tr>
        <td><AlertDialog buttonName="Delete Account" handleOk={confirmDelete} handleCancel={handleCancel} /></td>
		</tr>
	</tbody>
</table>




      </div>
    </div>
  );
}

export default Settings;
