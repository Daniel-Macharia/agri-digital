import { Link, useLocation, useNavigate } from "react-router-dom";

import * as Yup from 'yup';

import "../auth-style.css";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function CreatePassword(){
    let state = useLocation().state;
    let navigate = useNavigate();

    const initialValues = {
        password: "",
        confirmPassword: "",
        agree: false
    };

    const validationSchema = Yup.object({
        password: Yup.string().required("password is required"),
        confirmPassword: Yup.string().required("confirm password must match password"),
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
                <div className="col-12" style={{backgroundColor: "var(--Background, #F5F5F5)"}}>
                    <div className="row justify-content-center align-items-center px-4">
                        <div className="col-12 col-md-5" >
                            <div className="col-12">
                                <p className="h1-bold primary-text mb-0">
                                    Create your account.
                                </p>
                                <p className=" body-regular primary-text">
                                    Join the Future of Farming - Easy, Fast and Reliable.
                                </p>
                            </div>
                                          
                            <div className="col-12">
                                <Formik 
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={completeSignUp}

                                >
                                    <Form className='col-12' >
                                        <div className="col-12">
                                            <label className="body-regular primary-text" htmlFor='password'>
                                                Password *
                                            </label>
                                            
                                            <div className="col-12 mb-3">
                                                <Field 
                                                name="password" 
                                                className='form-control body-regular mb-0' 
                                                type='password' 
                                                autoComplete="true" 
                                                placeholder='********' 
                                                />
                                                <div className="text-danger small my-0">
                                                    <ErrorMessage name="password" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <p className="body-regular secondary-text">
                                                The password should be atleast 8 characters long
                                            </p>
                                        </div>

                                        <div className="col-12 mt-3">
                                            <label className="body-regular primary-text" htmlFor='confirm-password'>
                                                Confirm Password *
                                            </label>
                                            <div className="col-12 mb-3">
                                                <Field 
                                                name="confirmPassword" 
                                                className='form-control body-regular mb-0' 
                                                type='password' 
                                                autoComplete="true" 
                                                placeholder='********' 
                                                />
                                                <div className="text-danger small my-0">
                                                    <ErrorMessage name="confirmPassword" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-1">
                                                    <Field 
                                                    className="check-box-input" 
                                                    type="checkbox" 
                                                    name="agree"
                                                    />
                                                </div>
                                                <p className="col-10 small-regular primary-text">
                                                    I agree to the {" "}
                                                    <Link to="#" className="react-link small-semibold" 
                                                    style={{color: "var(--Primary, #457900)"}}>
                                                        Terms of Service {" "}
                                                    </Link>
                                                    and {""}
                                                    <Link to="#" className="react-link small-semibold"
                                                    style={{color: "var(--Primary, #457900)"}}>
                                                        Privacy Policy.
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button 
                                            type='submit' 
                                            className="col-12 body-bold auth-accept-button"
                                            >
                                                Create Account
                                            </button>
                                        </div>

                                    </Form>
                                </Formik>
                              
                            </div>
        
                            <div className="col-12">
                                <div
                                className="col-12" 
                                onClick={() => {navigate("/auth/login");}}>
                                    <p className='auth-center-aligned-text body-regular primary-text'>
                                        Already have an account ? {" "} 
                                        <span className='body-semibold'
                                        style={{color: "var(--Primary, #457900)"}}>
                                            Login
                                        </span>
                                    </p>
                                </div>
                            </div> 
                        </div>
        
                        <div className="col-0 col-md-6 d-none d-md-flex">
                            <img src='/shamba_bot_logo.svg' alt='logo'
                            style={{width: "100%"}}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return render();
}
