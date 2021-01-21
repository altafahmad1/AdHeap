import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "../Seller/Seller.css";

function Seller() {
  return (
    <div className="seller-wrapper">
      <div class="card">
        <div class="image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtJ0AtSAKRRWVNmoiIzO5gMtaSJMgm0EgxJA&usqp=CAU"></img>
        </div>
        <div class="title">
          <h1>DOPAMINE</h1>
        </div>
        <div class="des">
          <p>Hello this a dummy text Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dicta quam vero dolores amet minima architecto  </p>
          <button>Read More...</button>
        </div>
      </div>

      <div class="card">
        <div class="image">
          <img src="https://cdn.pixabay.com/photo/2015/11/07/11/41/lake-1031405_1280.jpg"></img>
        </div>
        <div class="title">
          <h1>Write title Here</h1>
        </div>
        <div class="des">
          <p>You can Add Desccription Here...</p>
          <button>Read More...</button>
        </div>
      </div>
    </div>
  );
}

export default Seller;
