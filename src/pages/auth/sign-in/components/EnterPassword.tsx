import React, {useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "/src/pages/auth/style.css"

import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import { storageDelete, storageGet, storagePut } from "../StorageUtils";

const EnterPassword : React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState('');

    //const {phoneOrEmail} = location.state || {};
    const phoneOrEmail = storageGet("phoneOrEmail");

    const initialValues = {
        userPassword: '',
    };

    const validationSchema = Yup.object({
        userPassword: Yup.string().required("Required"),
    });

    const completeLogin = async ( values: typeof initialValues, {setSubmitting} : any) =>{
        let pass = values.userPassword;
        console.log(`logging in as ${phoneOrEmail} with password ${pass}`);

        try{
            const response = await axios.post('https://api.shambabot.com/auth/login', {
                username: phoneOrEmail,
                password: pass
            });


            if( response.data && response.data.data )
            {
                //navigate("/home");
                console.log(`Access token: ${response.data.data.accessToken}`);
                storagePut("access-token", response.data.data);
                storageDelete("phoneOrEmail");
                navigate('/home');
                setError('');
            }else{
                setError("Failed to login. Please retry..");
            }


        }catch( error: any)
        {
            console.error(error);
            setError("Invalid credentials!\nCheck your username and password.");
        }
        finally{
            setSubmitting(false);
        }

    };

    const render = () => {
        return (
            <>
                <div>
                    <div id='sign-up-content-div'>
                        <div id='sign-up-form-div'>
                            <p id='sign-up-form-title'>Login to your account.</p>
                            <p id='sign-up-form-sub-title'>Join the Future of Farming - Easy, Fast and Reliable.</p>

                            <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={completeLogin}
                            >
                                { ( {isSubmitting} ) => (
                                    <Form className='sign-up-form'>
                                        <label className="input-label" htmlFor='password'>Password *</label>
                                        
                                        <div className="text-danger small">
                                            <ErrorMessage name="userPassword"/>
                                        </div>

                                        <Field 
                                        name="userPassword" 
                                        className='input-field' 
                                        type='password' 
                                        id='userPassword' 
                                        autoComplete="true" 
                                        placeholder='enter password here'
                                        />

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

                                        <button 
                                        type='submit' 
                                        name="create-button" 
                                        id="create-account-button" 
                                        value={"Login"}
                                        >
                                            {isSubmitting ? 'Logging in ...' : 'Login'}
                                        </button>

                                    </Form>
                                ) }
                            </Formik>
                            {/* <form action={goToHome}>
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
                                <input type='submit' name="create-button" id="create-account-button" value={"Login"}/>
                            </form> */}

                            <div id='login-div'>
                                <Link to="/">
                                <label id='login-label'>Do not have an account ?  <span id='login-button'>Sign up</span></label>
                                </Link>
                            </div> 
                        </div>
                        <img src='/src/assets/shamba_bot_logo.svg' alt='image here'/>
                    </div>
                </div>
            </>
        );
    };


    return render();
}


export default EnterPassword;