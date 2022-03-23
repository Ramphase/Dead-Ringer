import React,{ useRef, useState, useEffect } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export function Register() {
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    var registerLogin;
    var registerPassword;
    var confirmPassword;
    var firstName;
    var lastName;
    var registerEmail;

    const validEmail = new RegExp(
        '(.+)@((.+){2,})((.+){2,})'
    );

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        var obj = 
        {
            firstName: firstName.value, 
            lastName: lastName.value,
            email: registerEmail.value,
            login:registerLogin.value,
            password:registerPassword.value
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
            const response = await fetch(bp.buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            
            if(res.error !== '')
            {
                setMessage(res.error);
                return;
            }
            
            var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
            localStorage.setItem('user_data', JSON.stringify(user));

            setMessage('');
            window.location.href = '/';

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
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section >
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2 className="mb-3">Register</h2>
                    <form onSubmit={handleSubmit}>
                   <div className="side-by-side">
                  
                   <input 
                       type="text" 
                       id="firstName" 
                       placeholder="First Name"
                       className="mb-3"
                       ref={(c) => firstName = c}/>
                    
                     <input
                       type="text"  
                       id="lastName"  
                       placeholder="Last Name"
                       className="mb-3"
                       ref={(c) => lastName = c}/>
                   
                   </div>
                     
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            className="mb-3"
                            ref={(c) => registerLogin = c}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                     
                        <input
                       type="text"  
                       id="email"  
                       placeholder="Email"
                       className="mb-3"
                       ref={(c) => registerEmail = c}/>
                      

                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="mb-3"
                            ref={(c) => registerPassword = c}
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <input
                            type="password"
                            id="confirm_pwd"
                            placeholder="Confirm password"
                            ref={(c) => confirmPassword = c}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button className="mt-3" disabled={!validName || !validPwd || !validMatch ? true : false} onSubmit={handleSubmit}>Sign Up</button>
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
        </>
    )
}

export default Register