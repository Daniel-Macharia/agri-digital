import { Link, useLocation, useNavigate } from "react-router-dom";

import * as Yup from 'yup';

import "/src/auth/style.css";
import "./CreatePassword.css";
import { Field, Form, Formik } from "formik";

export default function CreatePassword(){
    let state = useLocation().state;
    let navigate = useNavigate();

    const initialValues = {
        password: "",
        confirmPassword: "",
        agree: false
    };

    const validationSchema = Yup.object({
        password: Yup.string().required("Required!"),
        confirmPassword: Yup.string().required("Required!"),
        agree: Yup.boolean().required("Required")
    });

    const completeSignUp = (data: typeof initialValues, {}: any) => {
        let pass, confirm, agree;
        pass = data.password;
        confirm = data.confirmPassword;
        agree = data.agree;

        if( pass !== confirm )
        {
            alert("the password and confirm password do not match!");

        }
        else{
            let userData = state;
            userData.password = pass;
            userData.agree = agree;
            console.log(userData);
            alert(`Data: ${userData} \n\nPassword: ${pass}`);
            navigate("/auth/login");
        }
        
    }

    let render = ()=>{
        return (
            <>
                <div>
                    <div id='sign-up-content-div'>
                        <div id='sign-up-form-div'>
                        <p id='sign-up-form-title'>Create your account.</p>
                        <p id='sign-up-form-sub-title'>Join the Future of Farming - Easy, Fast and Reliable.</p>
                        <Formik 
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={completeSignUp}

                        >
                            <Form className='sign-up-form' >
                                <label className="input-label" htmlFor='password'>Password *</label>
                                <Field 
                                name="password" 
                                className='input-field' 
                                type='password' 
                                id='password' 
                                autoComplete="true" 
                                placeholder='********' 
                                />

                                <p className="input-label" id="password-specs">
                                    The password should be atleast 8 characters long
                                </p>

                                <label className="input-label" htmlFor='confirm-password'>Confirm Password *</label>
                                <Field 
                                name="confirmPassword" 
                                className='input-field' 
                                type='password' 
                                id='confirm-password' 
                                autoComplete="true" 
                                placeholder='********' 
                                />

                                <label className="input-label" id="agree-to-terms-div">
                                    <Field 
                                    id="agree-to-terms-checkbox" 
                                    className="check-box-input" 
                                    type="checkbox" 
                                    name="agree"
                                    />
                                    <span>
                                        I agree to the 
                                        <Link to="#" className="react-link" > Terms of Service </Link>
                                        and 
                                        <Link to="#" className="react-link"> Privacy Policy.</Link>
                                    </span>
                                </label>

                                <button 
                                type='submit' 
                                name="createButton" 
                                id="create-account-button" 
                                >Create Account</button>

                            </Form>
                        </Formik>

                        <div id='login-div'>
                            <Link to="/login">
                            <label id='login-label'>Already have an account ?  <span id='login-button'>Login</span></label>
                            </Link>
                        </div>
                        </div>
                        <img src='/shamba_bot_logo.svg' alt='image here'/>
                    </div>
                </div>
            </>
        );
    }

    return render();
}
