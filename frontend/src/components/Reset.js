import React,{ useState } from 'react';
import axios from 'axios';

export function Reset(){
    var login;
    var password;
    var confirmPassword;

    const [message, setMessage] = useState('');
    

    const doReset = async e => {
        e.preventDefault();

        var obj = 
        {
            login:login.value,
            password:password.value,
            confirmPassword:confirmPassword.value
        };

        if(obj.password !== obj.confirmPassword)
        {
            setMessage('Passwords do not match');
            return;
        }

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