import { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "/src/pages/auth/style.css";
import "./LoginWithOtp.css";


export default function LoginWithOtp(){
    let state = useState();
    let navigate = useNavigate();

    function loginWithOtp( data: FormData ): void{
        let phoneOrEmail = data.get("phone-or-email");

        alert(`Phone or email: ${phoneOrEmail}`);

        navigate("/enter-otp");
    }

    let render = ()=>{
        return (
            <>
                <div>
                    <div id='sign-up-content-div'>
                        <div id='sign-up-form-div'>
                            <p id='sign-up-form-title'>Login with O.T.P.</p>
                            <p id='sign-up-form-sub-title'>We will send you a one-time password (O.T.P)</p>
                            <form className='sign-up-form' action={loginWithOtp} >
                                <label className="input-label" htmlFor='email'>Email address/Phone number *</label>
                                <input name="phone-or-email" className='input-field' type='text' id='email' placeholder='example@gmail.com/+254712345678' />
                                
                                {/* <Link id='send-otp-button-container' to={'/enter-otp'}> */}
                                <input type='submit' name="create-button" id="send-otp-button" value={"Send OTP"}/>
                                {/* </Link> */}

                            </form>
                            
                            <div id='login-div'>
                                <Link to="/">
                                <label id='login-label'>Do not have an account ?  <span id='login-button'>Sign up</span></label>
                                </Link>
                            </div> 
                        </div>
                        <img src='/src/assets/shamba_bot_logo.png' alt='image here'/>
                    </div>
                </div>
            </>
        );
    }

    return render();
}
