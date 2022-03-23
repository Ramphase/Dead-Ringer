import React,{ useRef, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

export function Login(){
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    var loginName;
    var loginPassword;
  
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        var bp = require('./Path.js');

        try
        {            
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2 className="mb-5">Login</h2>
                    <form onSubmit={handleSubmit}>
                   
                        <input
                            type="text"
                            id="loginName"
                            placeholder="Username"
                            ref={(c) => loginName = c}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className="mb-3"
                        />

                      
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            ref={(c) => loginPassword = c}
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        
                        <button className="mt-3" onSubmit={handleSubmit}>Sign In</button>
                    </form>
                    <p>
                    <span className="link text-center">
                        <Link to="/Register" variant = "body2">
                        <span style={{color :"black", fontSize: 15}}>
                             Don't have an account?
                        </span>
                        
                        <span span style={{color :'#4e4187', fontSize: 15}}>
                             Sign up
                         </span>
                        </Link>
                        </span>

                        <span id="loginResult">{message}</span>
                    </p>
                       
                </section>
            )}
        </>
    )
}

export default Login