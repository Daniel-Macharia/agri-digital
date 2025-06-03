import { Link, useNavigate } from "react-router-dom";


import "/src/pages/auth/style.css";
import "./Otp.css";
import sendOtpUtil from "../../sign-in/SendOtpUtil";
import { Formik, Form, Field, ErrorMessage } from "formik";

import 'bootstrap/dist/css/bootstrap.min.css';

import * as Yup from 'yup';
import axios from 'axios';
import { storageDelete, storageGet, storagePut } from "../../sign-in/StorageUtils";

const Otp : React.FC = () => {
    let navigate = useNavigate();

    const initialValues = {
        enteredOtp: '',
    };

    const validationSchema = Yup.object({
        enteredOtp: Yup.string().required("Required"),
    });

    // {phoneOrEmail} = location.state || {};
    const phoneOrEmail = storageGet("phoneOrEmail");


    const verifyOtp = async ( values: typeof initialValues, {}: any ) => {
        let enteredOtp = values.enteredOtp;

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
                navigate("/dashboard");
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
            <div>
                    <div id='sign-up-content-div'>
                        <div id='sign-up-form-div'>
                            <p id='sign-up-form-title'>Enter Verification Code</p>
                            <p id='sign-up-form-sub-title'>We've sent you the one-time password (O.T.P)</p>

                            <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={verifyOtp}
                            >

                                {({isSubmitting}) => (
                                    <Form className='sign-up-form'>
                                        <label 
                                        className="input-label" 
                                        htmlFor='otp'
                                        >
                                            One-time Pin(O.T.P)
                                        </label>

                                        <div
                                        className="text-danger small"
                                        >
                                            <ErrorMessage 
                                            name='enteredOtp'
                                            />
                                        </div>

                                        <Field 
                                        tabIndex={0} 
                                        name="enteredOtp" 
                                        className='input-field' 
                                        type='text' 
                                        id='otp'
                                        placeholder='enter OTP here..'
                                        />
                                        
                                        {/* <Link id='send-otp-button-container' to={'/home'}> */}
                                        <button 
                                        type='submit' 
                                        name="create-button" 
                                        id="create-account-button"
                                        >
                                            { isSubmitting ? 'verifrying otp ...' : 'verify'}
                                        </button>

                                    </Form>
                                )}
                            </Formik>

                            
                            
                            <div id='resend-div'>
                                <Link to="#">

                                <label 
                                id='resend-label'
                                >
                                    Didn't receive the OTP ?  
                                    <span 
                                    id='resend-button' 
                                    onClick={resendOtp}
                                    >
                                        Resend
                                    </span>
                                </label>

                                </Link>
                            </div> 
                        </div>
                        <img src='/shamba_bot_logo.svg' alt='image here'/>
                    </div>
                </div>
            </>
        );
    };

    return render();
}

export default Otp;
