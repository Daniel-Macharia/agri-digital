import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../auth-style.css';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from "yup";

function SignUp(){
  let navigate = useNavigate();

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    userRole: "I am a ..",

  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("enter your full name"),
    email: Yup.string().required("enter a valid email"),
    phoneNumber: Yup.string().required("enter your phone"),
    userRole: Yup.string().required("select a role")
  });

  const handleSignUp = (data: typeof initialValues, {}: any)=>{

    let d = {
      "Full name": data.fullName,
      "Phone": data.phoneNumber,
      "Email": data.email,
      "Role": data.userRole
    };

    alert(`Collected data: \n\n ${d['Full name']}\n${d['Phone']}\n${d['Email']}\n${d['Role']}\n`);

    navigate("/auth/create-password", {state : d});

  }

  let render = ()=>{
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
                      onSubmit={handleSignUp}
                      >
                        {({setFieldValue}) => (
                          <Form className='sign-up-form' >
                            <div className='col-12'>
                              <label className="input-label" htmlFor='full-name'>
                                Full Name
                              </label>

                              <div className='col-12'>
                                <Field required 
                                name='fullName' 
                                className='form-control body-regular' 
                                type='text' 
                                id='full-name' 
                                placeholder='Kelvin Mutuku' 
                                />
                                <div className='text-danger small my-0'>
                                  <ErrorMessage name='fullName' />
                                </div>
                              </div>
                            </div>

                            <div className='col-12'>
                              <label className="input-label" htmlFor='email'>
                                Email
                              </label>

                              <div className='col-12'>
                                <Field 
                                required 
                                name='email' 
                                className='form-control body-regular' 
                                type='email' 
                                placeholder='example@gmail.com' 
                                />
                                <div className='text-danger small my-0'>
                                  <ErrorMessage name='email' />
                                </div>
                              </div>
                            </div>
                            
                            <div className='col-12'>
                              <label className="input-label" htmlFor='phone-number'>
                                Phone number
                              </label>

                              <div className='col-12'>
                                <Field 
                                required 
                                name='phoneNumber' 
                                className='form-control body-regular' 
                                type='telephone' 
                                placeholder='+254712345678' 
                                />
                                <div className='text-danger small my-0'>
                                  <ErrorMessage name='phoneNumber' />
                                </div>
                              </div>
                            </div>
                            
                            <div className='col-12'>
                              <label className="input-label" htmlFor='user-role'>
                                Role *
                              </label>

                              <div className='col-12'>
                                <select required className='form-control body-regular' name='userRole' 
                                
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                  const value = event.target?.value;
                                  console.log(value);
                                  setFieldValue("userRole", value);
                                }}>
                                  <option id='select-place-holder' value={""}>I am a ..</option>
                                  <option value={"farmer"}>Farmer</option>
                                  <option value={"provider"}>Service Provider</option>
                                  <option value={"donor"}>Donor</option>
                                </select>
                                <div className='text-danger small my-0'>
                                  <ErrorMessage name='userRole' />
                                </div>
                              </div>
                            </div>
                            
                            <div className='col-12'>
                              <button 
                              type='submit' 
                              name="create-button" 
                              className='col-12'
                              >
                                Continue
                              </button>
                            </div>

                          </Form>
                        )}
                      </Formik>
                  
                    </div>

                    <div className="col-12">
                        <div
                        className="col-12" 
                        onClick={() => {navigate("/auth/login");}}>
                            <p className='auth-center-aligned-text'>
                                Already have an account ? {" "} 
                                <span className='login-button'>
                                    Login
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
  }

  return render();
}

export default SignUp;
