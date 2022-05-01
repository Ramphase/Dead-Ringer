import React,{ useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export function Forgot(){

    var email;
    var login;

    const doReset = async e => {
        e.preventDefault();

        var obj = 
        {
            login:login.value,
            email: email.value
        };

        const data = {

            email: this.email
        };

        axios.post('forgot', data).then(
            res=> {
                console.log(res)
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
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