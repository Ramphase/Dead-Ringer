import React,{ useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export function Forgot(){
    var bp = require('./Path.js');
    const [message, setMessage] = useState('');
    
    var email;
    var login;

    const doForgot = async e => {
        e.preventDefault();

        var obj = 
        {   
            login: login.value,
            email: email.value
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
            setMessage(res.error);
            console.log(res.error);
        } 
        else {
            setMessage("Success");
            return res.messageId;
    }
     

}
    return (
        <section>
            <h2 class="small-title">Forgot Password</h2>

            <form onSubmit={doForgot}>
                <input type="text" id="login" placeholder="Enter Login" ref={(c) => login = c} className="mb-3"/>  
                <input type="email" id="email" placeholder="Enter Email" ref={(c) => email = c} className="mb-3 mt-4"/>
                <button className="mt-4 mb-3" onSubmit={doForgot}>Submit</button>
                <span id="forgotResult" style={{color :'white'}}>{message}</span>
            </form>
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