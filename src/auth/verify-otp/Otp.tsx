import { Link, useNavigate } from "react-router-dom";


import "../auth-style.css";
import sendOtpUtil from "../sign-in/utils/SendOtpUtil";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from 'yup';
import axios from 'axios';
import { storageDelete, storageGet, storagePut } from "../../farmer/utils/StorageUtils";
import { useRef, useState } from "react";

const Otp : React.FC = () => {
    const  otpLength = 7;
    let navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    const [otp, setOtp] = useState(new Array(otpLength).fill(''));
    const inputsRef = useRef([]);

    const handleOtpChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, '');

        if( !value )
            return;
        
        const newOtp = [...otp];
        newOtp[index] = value.charAt(0);

        setOtp(newOtp);
        
        if( index <  (otpLength - 1) )
            inputsRef.current[index + 1].focus();

        if( index ===  (otpLength - 1) && newOtp.every( d => (d !== '')))
            handleSubmit(newOtp.join(''));
    };

    const handleKeyDown = (event, index) => {
        if( event.key === "Backspace")
        {
            if(otp[index])
            {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
            else if( index > 0 ){
                inputsRef.current[index -1].focus();
            }
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const pastedData = event.clipboardData().getData('Text').slice(0, otpLength);

        const newOtp = [...otp];

        for( let i = 0; i < otpLength; i++ )
        {
            newOtp[i] = pastedData[i] || '';
        }

        setOtp(newOtp);

        if( newOtp.every((v) => (v !== '')))
        {
            handleSubmit(newOtp.join(''));
        }
    };

    const handleSubmit = (num:string) => {
        setIsVerifying(true);
        console.log(num);

        for( let i = 0; i < 1000; i++ )
        {
            console.log("i");
        }

        setIsVerifying(false);
    };

    // {phoneOrEmail} = location.state || {};
    const phoneOrEmail = storageGet("phoneOrEmail");


    const verifyOtp = async ( phone: string, enteredOtp: string ) => {
        
        try{
            console.log(`Otp sent to: ${phoneOrEmail}`);
            const response = await axios.post(
                "https://api.shambabot.com/auth/password-less-verification",
                {
                    "username": phoneOrEmail,
                    "otp": enteredOtp
                });

            console.log( `Status: ${response.status} message: ${response.data.message}` );

            if( response.status == 200 )//OTP is verified
            {
                console.log(`Verification successful. Access Token: ${response.data.data.accessToken}`);
                storagePut("access-token", response.data.data.accessToken);
                storageDelete("phoneOrEmail");
                navigate("/farmer");
            }
            else
            {
                console.log(`Failed to verify OTP. ${response.status} ${response.data.accessToken}`);
            }
        }catch( error:any )
        {
            console.log(`Failed to verify OTP: ${error.message}`);
        }
    }


    const resendOtp = ()=>{
        sendOtpUtil(phoneOrEmail);
    };

    let render = () => {
        return (
            <>
                <div className="col-12" style={{backgroundColor: "var(--Background, #F5F5F5)"}}>
                    <div className="row justify-content-center align-items-center px-4">
                        <div className="col-12 col-md-5" >
                            <div className="col-12">
                                <p className="h1-bold primary-text mb-0">
                                    Enter Verification Code.
                                </p>
                                <p className=" body-regular primary-text">
                                   We've sent you the One Time Password(OTP)
                                </p>
                            </div>
                        
                            <div className="col-12">
                                <div className='sign-up-form'>
                                    {/* <label className="body-regular primary-text" htmlFor='otp' >
                                        One-time Pin(O.T.P)
                                    </label> */}

                                    <div className="d-flex gap-2 justify-content-center" onPaste={handlePaste}>
                                        {
                                            otp.map((digit, index) => <input 
                                            key={index}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            className="form-control h2-semibold "
                                            value={digit}

                                            ref={(el) => (inputsRef.current[index] = el )}
                                            onChange={(e) => handleOtpChange(e.target, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index) }

                                            style={{color: "var(--Dark-500, #16151C)"}}
                                            />)
                                        }
                                    </div>
                                    
                                    <div className="col-12">
                                        <button 
                                        type='submit' 
                                        name="create-button" 
                                        className="col-12 body-bold auth-accept-button"
                                        disabled={isVerifying}
                                        style={{opacity: ( isVerifying ? "0.8" : "1")}}

                                        onClick={event => handleSubmit(otp.join(''))}
                                        >
                                            { isVerifying ? 'verifrying otp ...' : 'verify'}
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div className="col-12">
                                <div
                                className="col-12" 
                                onClick={() => {navigate("/auth/sign-up");}}>
                                    <p className='auth-center-aligned-text body-regular primary-text'>
                                        Do not have an account ? {" "} 
                                        <span className='body-semibold'
                                        style={{color: " var(--Primary, #457900)"}}>
                                            Sign up
                                        </span>
                                    </p>
                                </div>
                            </div> 
                        </div>

                        <div className="col-0 col-md-6 d-none d-md-flex" >
                            <img src='/shamba_bot_logo.svg' alt='logo'
                            style={{width: "100%"}}/>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return render();
}

export default Otp;
