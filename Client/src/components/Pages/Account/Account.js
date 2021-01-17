import React from "react";
import "../Account/Account.css";
import { FaUser } from "react-icons/fa";

function Account() {
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
			<td>Altaf Ahmad</td>
		</tr>
		<tr>
			<td>Email</td>
			<td>altaf123@gmail.com</td>
		</tr>
		<tr>
			<td>Location</td>
			<td>Pakistan</td>
		</tr>
		<tr>
			<td>Account-Type</td>
			<td>Admin</td>
		</tr>
		<tr>
			<td>Balance</td>
			<td>95$</td>
		</tr>
	</tbody>
</table>




      </div>
    </div>
  );
}

export default Account;
