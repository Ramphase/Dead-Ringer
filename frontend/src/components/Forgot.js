import React,{ useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export function Forgot(){
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var userToken = storage.retrieveToken();
    var userID = JSON.parse(localStorage.getItem("user_data"));

    var email;
    var login;

    const doReset = async e => {
        e.preventDefault();

        var obj = 
        {   
            userId: userID.id,
            login:login.value,
            email: email.value,
            jwtToken: userToken,
        };
        var js = JSON.stringify(obj);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('forgotPassword'),
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
            <h2 class="small-title">Forgot Password</h2>

                <input type="email" id="email" placeholder="Enter Email" ref={(c) => login = c} className="mb-3 mt-4"/>
                <input type="text" id="login" placeholder="Enter Username" ref={(c) => email = c} className="mb-3"/>  
                <button className="mt-4 mb-3" onSubmit={doReset}>Submit</button>

                <span className="link text-center">
                    <Link to="/" variant = "body2">
                    <span span style={{color :'white', fontSize: 15}}>
                        Back to Login
                    </span>
                        </Link>
                </span>

        </section>
    );
};

export default Forgot; 