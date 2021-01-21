import React,{useState, useContext} from "react";
import "../Payment/Payment.css";
import ErrorNotice from "./../../misc/ErrorNotice";
import SuccessNotice from "./../../misc/SuccessNotice";
import UserContext from "./../../../context/UserContext";
import {months, years} from "./PaymentData";
import axios from "axios";

function Payment() {

  const {userData} = useContext(UserContext);
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const submitPayment = async (e) => {
    try {
      e.preventDefault();
      if(cvc.length < 3){
        setError("Invalid CVC Code. Please Check Again.");
        return;
      }
      const paymentData = {cardNumber, amount};
      await axios.post("/user/" + userData.user.id_user + "/makePayment" , paymentData)
          .then(response => {
            response.data.msg && setSuccessMsg(response.data.msg);
          });
      setCardNumber("");
      setAmount("");
      setCvc("");
    }
    catch(err){
      err.response.data.msg && setError(err.response.data.msg);
    }
  }
    
  return (
    
<div className="payment-wrapper">

    <div className="Payment-container">
      <div className="Payment-title">Payment form</div>
    <form onSubmit={submitPayment}>
      <div className="input-form">
        <div className="section-1">
          <div className="items card-details-container">
            <div className="card-details">Card Details</div>
            <div className="card-types"><img src="/Images/visa-logo.png"/><img src="/Images/mastercard-logo.png"/></div>
          </div>
          {successMsg && <SuccessNotice message={successMsg} clearMsg={() => setSuccessMsg("")} />}
          {error && <ErrorNotice message={error} clearError={() => setError("")} />}
          <div className="items">
            <label className="label">card number</label>
            <input type="number" required className="input" maxlength="16" 
            placeholder="0000000000000000" value={cardNumber.length > 19 ? cardNumber.slice(0,19): cardNumber} onChange={e => setCardNumber(e.target.value)}></input>
          </div>
        </div>
        <div className="section-2">
          <div className="items">
            <label className="label">card holder</label>
            <input type="text" required className="input" placeholder="Your Name"></input>
          </div>
        </div>
        <div className="section-3">
          <div className="items">
            <label className="label">Expiry date</label>
            <select required>
              <option value="">MM</option>
              {months.map((item, index) => {
                return(
                  <option value={item.value}>{item.value}</option>
                )
              })}
            </select>
            <select required>
              <option value="">YYYY</option>
              {years.map((item, index) => {
                return(
                  <option value={item.value}>{item.value}</option>
                )
              })}
            </select>
            {/* <input type="text" className="input"  placeholder="MM / YY"></input> */}
          </div>
          <div className="items">
            <div className="cvc">
              <label className="label">cvc code</label>
              <div className="tooltip">?
                <div className="cvc-img"><img src="https://i.imgur.com/r8oXtry.png" alt=""></img></div>
              </div>
            </div>
            <input required type="number" className="input" maxLength="4"
             data-mask="0000" value={cvc.length > 4 ? cvc.slice(0,4): cvc} placeholder="0000" onChange={e => setCvc(e.target.value)} />
          </div>
        </div>
        <div className="section-4">
          <div className="items">
            <label className="label">Amount to Transfer ($)</label>
            <input type="number" required className="input" placeholder="0.00" 
            onChange={e => setAmount(e.target.value)}/>
          </div>
        </div>
      </div>

      <input type="submit" value="proceed" className="btn-checkout" />

      </form>
    </div>

</div>


  )
  };

export default Payment;
