import React,{ useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export function Forgot(){

    const doReset = async e => {
        e.preventDefault();

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

                <input type="email" id="email" placeholder="Enter Email" onChange= { e => this.email = e.target.value} className="mb-3 mt-4"/>
                <input type="text" id="login" placeholder="Enter Username" onChange= { e => this.email = e.target.value} className="mb-3"/>  
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