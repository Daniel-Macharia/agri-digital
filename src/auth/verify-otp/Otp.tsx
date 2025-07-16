import { Link, useNavigate } from "react-router-dom";


import "../auth-style.css";
import sendOtpUtil from "../sign-in/utils/SendOtpUtil";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from 'yup';
import axios from 'axios';
import { storageDelete, storageGet, storagePut } from "../../farmer/utils/StorageUtils";

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
                    <div className="row justify-content-center align-items-center">
                        <div className="col-4" >
                            <div className="col-12">
                                <p className="h1-bold primary-text mb-0">
                                    Login to your account.
                                </p>
                                <p className=" body-regular primary-text">
                                    Join the Future of Farming - Easy, Fast and Reliable.
                                </p>
                            </div>
                        
                            <div className="col-12">
                                <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={verifyOtp}
                                >

                                    {({isSubmitting}) => (
                                        <Form className='sign-up-form'>
                                            <label className="" htmlFor='otp' >
                                                One-time Pin(O.T.P)
                                            </label>

                                            <div className="col-12 mb-3">
                                                <Field 
                                                tabIndex={0} 
                                                name="enteredOtp" 
                                                className='form-control body-regular mb-0' 
                                                type='text' 
                                                placeholder='enter OTP here..'
                                                />
                                                <div className="text-danger small my-0" >
                                                    <ErrorMessage name='enteredOtp'/>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12">
                                                <button 
                                                type='submit' 
                                                name="create-button" 
                                                className="col-12"
                                                >
                                                    { isSubmitting ? 'verifrying otp ...' : 'verify'}
                                                </button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
            
                            </div>

                            <div className="col-12">
                                <div
                                className="col-12" 
                                onClick={() => {navigate("/auth/sign-up");}}>
                                    <p className='auth-center-aligned-text'>
                                        Do not have an account ? {" "} 
                                        <span className='login-button'>
                                            Sign up
                                        </span>
                                    </p>
                                </div>
                            </div> 
                        </div>

                        <div className="col-6" >
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
