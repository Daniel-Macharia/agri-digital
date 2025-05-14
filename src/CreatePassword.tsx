import { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css"

export default class CreatePassword extends Component
{
    public state = {};

    render(){
        return (
            <>
                <div>
                    <div id='sign-up-content-div'>
                        <div id='sign-up-form-div'>
                        <p id='sign-up-form-title'>Create your account.</p>
                        <p id='sign-up-form-sub-title'>Join the Future of Farming - Easy, Fast and Reliable.</p>
                        <form id='sign-up-form' >
                            <label className="input-label" htmlFor='password'>Password *</label>
                            <input className='input-field' type='password' id='password' placeholder='********' />

                            <p className="input-label" id="password-specs">
                                The password should be atleast 8 characters long
                            </p>

                            <label className="input-label" htmlFor='confirm-password'>Confirm Password *</label>
                            <input className='input-field' type='password' id='confirm-password' placeholder='********' />

                            <label className="input-label" id="agree-to-terms-div">
                                <input className="check-box-input" type="checkbox" />
                                <span>
                                    I agree to the 
                                    <Link to="#" className="react-link" > Terms of Service </Link>
                                    and 
                                    <Link to="#" className="react-link"> Privacy Policy.</Link>
                                </span>
                            </label>

                            <Link id='create-account-button-container' to={'/login'}>
                            <input type='submit' name="create-button" id="create-account-button" value={"Create account"}/>
                            </Link>

                        </form>

                        {/* <div id='login-div'>
                            <Link to="/login">
                            <label htmlFor='login-button' id='login-label'>Already have an account ?  <span id='login-button'>Login</span></label>
                            </Link>
                        </div> */}
                        </div>
                        <img src='vite.svg' alt='image here'/>
                    </div>
                </div>
            </>
        );
    }
}
