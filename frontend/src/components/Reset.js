import React,{ useState } from 'react';
import axios from 'axios';

export function Reset(){
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var userToken = storage.retrieveToken();
    var userID = JSON.parse(localStorage.getItem("user_data"));

    const [message, setMessage] = useState('');

    var login;
    var password;
    var confirmPassword;

    const doReset = async e => {
        e.preventDefault();

        var obj = 
        {   
            userId: userID.id,
            login:login.value,
            password: password.value,
            jwtToken: userToken,
        };
        var js = JSON.stringify(obj);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('changePassword'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        const response = await axios(config);
        var res = response.data;
        if (res.error) {
        
            console.log(res.error);
        } 
        else {
            console.log("Success");
            return res.messageId;
    }
     

}
    return (
        <section>
            <h2 class="small-title">Reset Password</h2>

            <form onSubmit={doReset}>
                <input type="text" id="login" placeholder="Enter Username" ref={(c) => login = c} className="mb-3 mt-4"/> 
                <input type="password" id="password" placeholder="Enter New Password" ref={(c) => password = c} className="mb-3"/> 
                <input type="password" id="confirmPassword" placeholder="Confirm Password" ref={(c) => confirmPassword = c} className="mb-3"/> 
                <span id="resetResult">{message}</span>

                <button className="mt-3" onSubmit={doReset}>Submit</button>
            </form>

        </section>
    );
};

export default Reset; 