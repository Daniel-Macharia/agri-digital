import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from 'yup';

import { Formik, Form, Field, ErrorMessage} from "formik";
import sendOtpUtil from "../utils/SendOtpUtil.ts";
import { storagePut } from "../utils/StorageUtils.ts";

import "../../index.css";


const Login: React.FC = () => {
    const initialValues = {
        userEmail:'',
    };

    const validationSchema = Yup.object({
        userEmail: Yup.string().email('Invalid email format!').required('Required'),
    });

    const [ submitType, setSubmitType ] = useState('');

    let navigate = useNavigate();

    const handleLogin = (values: typeof initialValues, {}: any) =>    {
        let phoneOrEmail = values.userEmail;

        console.log(phoneOrEmail);

        let link = "#";

        if( submitType == 'pass' )
        {
            console.log("login with password");
            link = '/auth/enter-password';
        }
        else if( submitType == 'otp' )
        {
            console.log("login with otp");
            sendOtpUtil(phoneOrEmail);
            link = '/auth/enter-otp';
        }
        storagePut("phoneOrEmail", phoneOrEmail);
        navigate(link, {state:{ phoneOrEmail }});
    };

    let render = ()=>{
        //console.log(useAuthData());
        //useData();
        return (
            <>
                {/* <div> */}
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
                                    onSubmit={handleLogin}
                                    >
                                        {
                                            ({}) =>(


                                                <Form className='col-12' >
                                                    <label className="body-regular primary-text mb-0" htmlFor='email'>
                                                        Email address/Phone number *
                                                    </label>
                                                    
                                                    <div className="col-12 mb-2">
                                                        <Field 
                                                        name="userEmail" 
                                                        className='form-control body-regular' 
                                                        type='text' 
                                                        id='email' 
                                                        placeholder='example@gmail.com/+254712345678' />
                                                        <div className="text-danger small my-0">
                                                            <ErrorMessage name="userEmail" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <button 
                                                        type='submit' 
                                                        name="pass"
                                                        className="col-12 mx-0 auth-accept-button"
                                                        onClick={ ()=>{ setSubmitType("pass") } }
                                                        >
                                                            Login with password
                                                        </button>
                                                    </div>

                                                    <div className="col-12 px-0 mx-0 my-3" >
                                                        <div className="row px-0 mx-0 justify-content-center align-items-center">
                                                            <div className="col-4 mx-0 px-0" >
                                                                <hr className="mx-0 col-12" />
                                                            </div>
                                                            <div className="col-1 mx-0 px-0" >
                                                                <p className="mx-0 col-12 auth-center-aligned-text" >
                                                                    or
                                                                </p>
                                                            </div>
                                                            <div className="col-4 mx-0 px-0" >
                                                                <hr className="mx-0 col-12" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <button 
                                                        type="submit"
                                                        name="otp" 
                                                        className="col-12 auth-white-button"
                                                        onClick={ ()=>{setSubmitType("otp")} }
                                                        >
                                                            Login with O.T.P
                                                        </button>
                                                    </div>
                                                </Form>

                                            )
                                        }
                                        
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

                            <div className="col-6" style={{backgroundColor: "purple"}}>
                                <img src='/shamba_bot_logo.svg' alt='logo'
                                style={{width: "100%"}}/>
                            </div>
                        </div>
                    </div>
                {/* </div > */}
            </>
        );
    };

    return render();
}

export default Login;
