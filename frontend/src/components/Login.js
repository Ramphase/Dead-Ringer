import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export function Login(){
   
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var loginName;
    var loginPassword;
    const [message, setMessage] = useState('');

    const doLogin = async event => {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('login'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            if (res.error) 
            {
                setMessage('User/Password combination incorrect');
            }
            else 
            {
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');

                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                    
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = "/Switches";
            }

        })
        .catch(function (error) 
        {
            console.log(error);
        }); 
    }
    return (
        <section>
            <h2 class="small-title">Dead Ringer</h2>

            <form onSubmit={doLogin}>
                <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} className="mb-3"/> 
                <input type="password" id="password" placeholder="Password" ref={(c) => loginPassword = c} />
                <span id="loginResult">{message}</span>

                <button className="mt-3" onSubmit={doLogin}>Sign In</button>
            </form>

                <p>
                    <span className="link text-center">
                    <Link to="/Register" variant = "body2">
                    <span style={{color :"black", fontSize: 15}}>
                        Don't have an account?
                    </span>    
                    <span span style={{color :'#4e4187', fontSize: 15}}>
                        &nbsp;Sign up
                    </span>
                        </Link>
                    </span>
                </p>
        </section>
    );
};

export default Login;