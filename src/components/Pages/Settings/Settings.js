import React from "react";
import "../Settings/Settings.css";
import { FaUserCog } from "react-icons/fa";
import { Link, Route } from "react-router-dom";

function Settings() {
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
        <td><button className="delete-btn" >Delete Account</button></td>
		</tr>
	</tbody>
</table>




      </div>
    </div>
  );
}

export default Settings;
