import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from 'yup';

 import "./Login.css";
 import "/src/components/auth/style.css";

import { Formik, Form, Field, ErrorMessage} from "formik";
import sendOtpUtil from "../utils/SendOtpUtil.ts";
import { storagePut } from "../utils/StorageUtils.ts";


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
                    <div id='sign-up-content-div' >
                        <div id='sign-up-form-div' >
                            <p id='sign-up-form-title'>Login to your account.</p>
                            <p id='sign-up-form-sub-title'>Join the Future of Farming - Easy, Fast and Reliable.</p>

                            <Formik 
                            
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleLogin}
                            >
                                {
                                    ({}) =>(


                                        <Form className='sign-up-form'>
                                            <label className="input-label" htmlFor='email'>Email address/Phone number *</label>
                                            
                                            <div className="text-danger small">
                                                <ErrorMessage name="userEmail" />
                                            </div>
                                            <Field 
                                            name="userEmail" 
                                            className='input-field' 
                                            type='text' 
                                            id='email' 
                                            placeholder='example@gmail.com/+254712345678' />

                                            <button 

                                            type='submit' 
                                            name="pass" 
                                            id="create-account-button" 
                                            value={"pass"}

                                            onClick={ ()=>{ setSubmitType("pass") } }
                                            >
                                                Login with password
                                            </button>

                                            <span id="horizontal-rule-span">
                                                <hr className="horizontal-rule"/>
                                                <p>or</p>
                                                <hr className="horizontal-rule"/>
                                            </span>

                                            <button 

                                            type="submit"
                                            name="otp" 
                                            id="login-with-otp-button" 
                                            value={"otp"}

                                            onClick={ ()=>{setSubmitType("otp")} }
                                            >
                                                Login with O.T.P
                                            </button>
                                        </Form>

                                    )
                                }
                                
                            </Formik>
                            {/* <form id='sign-up-form' >
                                <label className="input-label" htmlFor='email'>Email address/Phone number *</label>
                                <input name="phone-or-email" className='input-field' type='text' id='email' placeholder='example@gmail.com/+254712345678' />

                                <input type='submit' name="create-button" id="create-account-button" value={"Login with password"}/>
                                
                                <span id="horizontal-rule-span">
                                    <hr className="horizontal-rule"/>
                                    <p>or</p>
                                    <hr className="horizontal-rule"/>
                                </span>

                                <input type='submit' name="login-with-otp-button" id="login-with-otp-button" value={"Login with O.T.P"}/>
                            
                            </form> */}

                            <div id='login-div'>
                                <Link to="/auth/sign-up">
                                <label id='login-label'>Do not have an account ?  <span id='login-button'>Sign up</span></label>
                                </Link>
                            </div> 
                        </div>
                        <img src='/shamba_bot_logo.svg' alt='image here'/>
                    </div>
                {/* </div > */}
            </>
        );
    };

    return render();
}

export default Login;
