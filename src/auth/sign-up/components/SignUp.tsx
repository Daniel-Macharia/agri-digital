import { Field, Form, Formik } from 'formik';
import '/src/auth/style.css';
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
    fullName: Yup.string().required("Required!"),
    email: Yup.string().required("Required!"),
    phoneNumber: Yup.string().required("Required!"),
    userRole: Yup.string().required("Required!")
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
        <div>
          <div id='sign-up-content-div'>
            <div id='sign-up-form-div'>
              <p id='sign-up-form-title'>Create your account.</p>
              <p id='sign-up-form-sub-title'>Join the Future of Farming - Easy, Fast and Reliable.</p>
              <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}
              >
                {({}) => (
                  <Form className='sign-up-form' >
                    <label className="input-label" htmlFor='full-name'>Full Name</label>
                    <Field required 
                    name='fullName' 
                    className='input-field' 
                    type='text' 
                    id='full-name' 
                    placeholder='Kelvin Mutuku' 
                    />

                    <label className="input-label" htmlFor='email'>Email</label>
                    <Field 
                    required 
                    name='email' 
                    className='input-field' 
                    type='email' 
                    id='email' 
                    placeholder='example@gmail.com' 
                    />
                    
                    <label className="input-label" htmlFor='phone-number'>Phone number</label>
                    <Field 
                    required 
                    name='phoneNumber' 
                    className='input-field' 
                    type='telephone' 
                    id='phone-number' 
                    placeholder='+254712345678' 
                    />
                    
                    <label className="input-label" htmlFor='user-role'>Role *</label>
                    <select required className='input-field' name='userRole' id='user-role' >
                      <option id='select-place-holder' value={""}>I am a ..</option>
                      <option value={"farmer"}>Farmer</option>
                      <option value={"provider"}>Service Provider</option>
                      <option value={"donor"}>Donor</option>
                    </select>
                    
                    <button 
                    type='submit' 
                    name="create-button" 
                    id="create-account-button"
                    >
                      Continue
                    </button>

                  </Form>
                )}
              </Formik>

              <div id='login-div'>
                <Link to="/auth/login">
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

export default SignUp;
