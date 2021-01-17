import React from "react";
import "../Payment/Payment.css";

function Payment() {
    
  return (
<div class="payment-wrapper">
  <div class="Payment-container">
    <div class="Payment-title">Payment form</div>

    <div class="input-form">
      <div class="section-1">
        <div class="items">
          <label class="label">card number</label>
          <input type="text" class="input" maxlength="16" placeholder="123456 etc.."></input>
        </div>
      </div>
      <div class="section-2">
        <div class="items">
          <label class="label">card holder</label>
          <input type="text" class="input" placeholder="Your Name"></input>
        </div>
      </div>
      <div class="section-3">
        <div class="items">
          <label class="label">Expire date</label>
          <input type="text" class="input"  placeholder="MM / YY"></input>
        </div>
        <div class="items">
          <div class="cvc">
            <label class="label">cvc code</label>
            <div class="tooltip">?
              <div class="cvc-img"><img src="https://i.imgur.com/r8oXtry.png" alt=""></img></div>
            </div>
          </div>
          <input type="text" class="input" data-mask="0000" placeholder="0000"></input>
        </div>
      </div>
    </div>

    <div class="btn-checkout">proceed</div>

  </div>
</div>


  )
  };

export default Payment;
