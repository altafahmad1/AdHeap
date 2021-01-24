import React from "react";
import "../Ad_History/Ad_History.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

function History() {
  return (
    <div className="wrapper">
      {/* workspace heading */}
      <div className="History-head">
        <div className="History-heading">
          <h1>Ad History</h1>
        </div>
      </div>
      {/* History-wrapper */}
      <div className="History-wrapper">
          <table class="dcf-table dcf-table-responsive dcf-table-bordered dcf-w-100%">
            <thead></thead>
            <tbody>
              <tr>
                <td>Title</td>
                <td>Mercury sodium</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>deadly</td>
              </tr>
              
              <tr>
                <td>Start-Date</td>
                <td>12-12-2020</td>
              </tr>
              <tr>
              <td>End-Date</td>
                <td>12-12-2020</td>
              </tr>
              <tr>
              <td>No of Websites</td>
                <td>200</td>
              </tr>
              <tr>
              <td>Status</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default History;
