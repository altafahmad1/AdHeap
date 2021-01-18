import React, {useContext} from "react";
import UserContext from "./../../../context/UserContext";
import "../Account/Account.css";
import { FaUser } from "react-icons/fa";

function Account() {

	const {userData} = useContext(UserContext);

  return (
    <div className="account-wrapper">
      <div className="top-wrapper">
        <FaUser size="90px" />
      </div>
      <div className="head">
        <h1 className="account-heading">User Account</h1>
      </div>

      <div className="bottom-wrapper">


      <table class="dcf-table dcf-table-responsive dcf-table-bordered dcf-w-100%">
	<thead></thead>
  <tbody>
  <tr>
			<td>Name</td>
			<td>{userData.user.first_name + " " + userData.user.last_name}</td>
		</tr>
		<tr>
			<td>Email</td>
			<td>{userData.user.email}</td>
		</tr>
		{/* <tr>
			<td>Location</td>
			<td>Pakistan</td>
		</tr> */}
		<tr>
			<td>Account-Type</td>
			<td>User</td>
		</tr>
		<tr>
			<td>Balance</td>
			<td>${userData.user.balance}</td>
		</tr>
	</tbody>
</table>




      </div>
    </div>
  );
}

export default Account;
