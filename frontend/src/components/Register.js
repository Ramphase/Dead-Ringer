import React,{ useState } from "react";
import {Link} from 'react-router-dom';
import { decodeToken } from "react-jwt";

export function Register() {
    
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
        var bp = require('./Path.js');

        try
        {            
            const response = await fetch(bp.buildPath('register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            
            if(res.error !== '')
            {
                setMessage(res.error);
                return;
            }
            
            var storage = require('../tokenStorage.js');
            storage.storeToken(res);
            const tokenData = decodeToken(storage.retrieveToken());
            var user = {firstName:tokenData.firstName,lastName:tokenData.lastName,id:tokenData.userId}
            localStorage.setItem('user_data', JSON.stringify(user));

            setMessage('Account Created');
            window.location.href = '/Login';

        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }    
    }

    return (

          <section >
            <h2 className="mb-3">Register</h2>
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
                    
                <p>
                    <span className="link text-center">
                        <Link to="/" variant = "body2">
                        <span style={{color :"black", fontSize: 15}}>
                             Already have an account?
                        </span>
                       
                        <span span style={{color :'#4e4187', fontSize: 15}}>
                             Sign in
                         </span>
                        </Link>
                    </span>
                </p>
                     
                </section>
            )}
    


export default Register