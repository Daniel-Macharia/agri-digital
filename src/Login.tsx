import { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import "./App.css";


function Login(){
    let state = useState();

    let navigate = useNavigate();

    function loginUser(data:FormData):void
    {
        let phoneOrEmail = data.get("phone-or-email");
        let password = data.get("password");

        alert(`Phone or Email: ${phoneOrEmail}\nPassword: ${password}`);

        navigate("/home");
    }

    let render = ()=>{
        return (
            <>
                <div>
                    <div id='sign-up-content-div'>
                        <div id='sign-up-form-div'>
                            <p id='sign-up-form-title'>Login to your account.</p>
                            <p id='sign-up-form-sub-title'>Join the Future of Farming - Easy, Fast and Reliable.</p>
                            <form id='sign-up-form' action={loginUser} >
                                <label className="input-label" htmlFor='email'>Email address/Phone number *</label>
                                <input name="phone-or-email" className='input-field' type='text' id='email' placeholder='example@gmail.com/+254712345678' />

                                <label className="input-label" htmlFor='password'>Password *</label>
                                <input name="password" className='input-field' type='password' id='password' autoComplete="true" placeholder='********' />

                                <label className="input-label" id="remember-me-div">
                                    <span>
                                        <input className="check-box-input" type="checkbox" />
                                        Remember me 
                                    </span>

                                    <span>
                                        <Link to="#" className="react-link">
                                            Forgot password ?
                                        </Link>
                                    </span>
                                </label>

                                {/* <Link id='create-account-button-container' to={'/home'}> */}
                                <input type='submit' name="create-button" id="create-account-button" value={"Login"}/>
                                {/* </Link> */}

                            </form>

                            <span id="horizontal-rule-span">
                                <hr className="horizontal-rule"/>
                                <p>or</p>
                                <hr className="horizontal-rule"/>
                            </span>

                            <Link id='login-with-otp-button-container' to={'/login-with-otp'}>
                                <input type='button' name="login-with-otp-button" id="login-with-otp-button" value={"Login with O.T.P"}/>
                            </Link>

                            <div id='login-div'>
                                <Link to="/">
                                <label id='login-label'>Do not have an account ?  <span id='login-button'>Sign up</span></label>
                                </Link>
                            </div> 
                        </div>
                        <img src='vite.svg' alt='image here'/>
                    </div>
                </div>
            </>
        );
    }

    return render();
}

export default Login;
