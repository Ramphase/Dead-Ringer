import React, { useState } from "react";
import validator from 'validator'
  
const Verify = () => {
  
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Enter valid Email!')
    }
  }
  
  return (
    <div style={{
      margin: 'auto',
      marginLeft: '540px',
    }}>
      <pre>
        <h2 class="small-title">Email Confirmation</h2>
        <span>Enter Email: </span><input type="text" id="userEmail" 
        onChange={(e) => validateEmail(e)}></input> <br />
        <span style={{
          fontWeight: 'bold',
          color: 'white',
        }}>{emailError}</span>
      </pre>
      <button className="mt-2">Confirm</button>
    </div>
  );
}
  
export default Verify