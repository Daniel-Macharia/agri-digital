import React /*, {useState}*/ from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth-style.css"

import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import { storageDelete, storageGet, storagePut } from "../../farmer/utils/StorageUtils";

const EnterPassword : React.FC = () => {
    const navigate = useNavigate();

    //const [ Error, setError] = useState('');

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
                navigate('/farmer');
                //setError('');
            }else{
                //setError("Failed to login. Please retry..");
            }


        }catch( error: any)
        {
            console.error(error);
            //setError("Invalid credentials!\nCheck your username and password.");
        }
        finally{
            setSubmitting(false);
        }

    };

    const render = () => {
        return (
            <>
            <div className="col-12" style={{backgroundColor: "var(--Background, #F5F5F5)"}}>
                <div className="row justify-content-center align-items-center px-4">
                    <div className="col-12 col-md-5" >
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
                                onSubmit={completeLogin}
                                >
                                    { ( {isSubmitting} ) => (
                                        <Form className='col-12'>
                                            <label className="body-regular primary-text col-12 auth-start-aligned-text" htmlFor='password'>
                                                Password *
                                            </label>
                                            
                                            <div className="col-12 mb-3" >
                                            <Field 
                                            name="userPassword" 
                                            className='form-control body-regular mb-0' 
                                            type='password' 
                                            autoComplete="true" 
                                            placeholder='enter password here'
                                            />
                                            <div className="text-danger small my-0">
                                                <ErrorMessage name="userPassword"/>
                                            </div>
                                            </div>

                                            <label className="col-12" id="remember-me-div">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="row">
                                                            <div className="col-1">
                                                                <input type="checkbox" />
                                                            </div>
                                                            <p className="col-10 small-regular primary-text">
                                                            Remember me 
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="row justify-content-end">
                                                        <Link to="#" className="react-link auth-end-aligned-text small-semibold"
                                                        style={{color: "var(--Primary, #457900)"}}>
                                                            Forgot password ?
                                                        </Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </label>

                                            <div className="col-12">
                                                <button 
                                                type='submit' 
                                                className="col-12 auth-accept-button"
                                                value={"Login"}
                                                >
                                                    {isSubmitting ? 'Logging in ...' : 'Login'}
                                                </button>
                                            </div>

                                        </Form>
                                    ) }
                                </Formik>
            
                            </div>

                            <div className="col-12">
                                <div
                                className="col-12" 
                                onClick={() => {navigate("/auth/sign-up");}}>
                                    <p className='auth-center-aligned-text body-regular primary-text'>
                                        Do not have an account ? {" "} 
                                        <span className='body-semibold'
                                        style={{color: "var(--Primary, #457900)"}}>
                                            Sign up
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
    };


    return render();
}


export default EnterPassword;

