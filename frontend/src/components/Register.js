import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import icon from './images/icon.png'

export function Register() {

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const [message, setMessage] = useState('');

    var registerLogin;
    var registerPassword;
    var confirmPassword;
    var firstName;
    var lastName;
    var registerEmail;

    const validEmail = new RegExp(
        '(.+)@((.+){2,})((.+){2,})'
    );

    const doRegister = async event => {
        event.preventDefault();

        var obj = 
        {
            firstName: firstName.value, 
            lastName: lastName.value,
            email: registerEmail.value,
            login:registerLogin.value,
            password:registerPassword.value,
            confirmPassword:confirmPassword.value
        };

        for(const [key, value] of Object.entries(obj)) 
        {
            obj[key] = value.trim();

            if (obj[key] === "") {
                setMessage(`${key} is empty`);
                return;
            }
        }

        if(obj.password !== obj.confirmPassword)
        {
            setMessage('Passwords do not match');
            return;
        }
        
        if(!validEmail.test(registerEmail.value))
        {
            setMessage('Email is not valid');
            return;
        }
        
        delete obj.confirmPassword;
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('register'),
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
            if (res.error !== '') 
            {
                setMessage(res.error);
                return;
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
                setMessage('Account Created');
                window.location.href = '/';
            }

        })
        .catch(function (error) 
        {
            console.log(error);
        });  
    }

    return (
          <section >
            <h2 class="small-title mb-4">Dead Ringer <img src={icon}></img></h2>
                <form onSubmit={doRegister}>
                    <div className="side-by-side">
                        <input type="text" id="firstName" placeholder="First Name" className="mb-3" ref={(c) => firstName = c}/>
                        <input type="text" id="lastName" placeholder="Last Name" className="mb-3" ref={(c) => lastName = c}/>
                    </div>
                     
                    <input type="text" id="username" placeholder="Username" className="mb-3" ref={(c) => registerLogin = c}/>
                    <input type="text" id="email" placeholder="Email" className="mb-3" ref={(c) => registerEmail = c}/>
                    <input type="password" id="password" placeholder="Password" className="mb-3" ref={(c) => registerPassword = c}/>
                    <input type="password" id="confirm_pwd" placeholder="Confirm password" ref={(c) => confirmPassword = c}/>

                    <span id="registerResult">{message}</span>

                    <button className="mt-3" onSubmit={doRegister}>Sign Up</button>
                </form>
                    <span className="link text-center">
                        <Link to="/" variant = "body2">
                        <span style={{color :"white", fontSize: 15}}>
                             Already have an account?
                        </span>
                       
                        <span span style={{color :'white', fontSize: 15}}>
                            &nbsp;Sign in
                         </span>
                        </Link>
                    </span>
                     
                </section>
    )}

export default Register