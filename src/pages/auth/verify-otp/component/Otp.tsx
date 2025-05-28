import {Component, useState} from "react";
import { Link, useNavigate } from "react-router-dom";


import "/src/pages/auth/style.css";
import "./Otp.css";

function Otp(){
    let state = useState();
    let navigate = useNavigate();

    function verifyOtp( data: FormData ):void{
        let enteredOtp = data.get("otp");

        alert(`Entered OTP: ${enteredOtp}`);

        navigate("/home");
    }
    let render = () => {
        return (
            <>
            <div>
                    <div id='sign-up-content-div'>
                        <div id='sign-up-form-div'>
                            <p id='sign-up-form-title'>Enter Verification Code</p>
                            <p id='sign-up-form-sub-title'>We've sent you the one-time password (O.T.P)</p>
                            <form id='sign-up-form' action={verifyOtp}>
                                <label className="input-label" htmlFor='otp'>One-time Pin(O.T.P)</label>
                                <input tabIndex={0} name="otp" className='input-field' type='text' id='otp' />
                                
                                {/* <Link id='send-otp-button-container' to={'/home'}> */}
                                <input type='submit' name="create-button" id="send-otp-button" value={"Verify"}/>
                                {/* </Link> */}

                            </form>
                            
                            <div id='login-div'>
                                <Link to="#">
                                <label id='login-label'>Didn't receive the OTP ?  <span id='login-button' >Resend</span></label>
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

export default Otp;
