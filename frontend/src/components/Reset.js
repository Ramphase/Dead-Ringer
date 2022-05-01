import React,{ useState } from 'react';
import axios from 'axios';

export function Reset(){
   
    const [message, setMessage] = useState('');
    

    const doReset = async e => {
        e.preventDefault();

        const data = {
            token: this.props.match.params.id,
            password: this.password,
            confirmPassword: this.confirmPassword
        };

        axios.post('reset', data).then(
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
            <h2 class="small-title">Reset Password</h2>

            <form onSubmit={doReset}>
                <input type="password" id="password" placeholder="Enter New Password" onChange= { e => this.password = e.target.value} className="mb-3 mt-4"/> 
                

                <input type="password" id="confirmPassword" placeholder="Confirm Password" onChange= { e => this.confirmPassword = e.target.value} className="mb-3"/> 
                <span id="resetResult">{message}</span>

                <button className="mt-3" onSubmit={doReset}>Submit</button>
            </form>

        </section>
    );
};

export default Reset; 