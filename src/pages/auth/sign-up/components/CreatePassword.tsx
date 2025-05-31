import { Link, useLocation, useNavigate } from "react-router-dom";


import "/src/pages/auth/style.css";
import "./CreatePassword.css";

export default function CreatePassword(){
    let state = useLocation().state;
    let navigate = useNavigate();

    function completeUserCreation(data:FormData):void{
        let pass, confirm;
        pass = data.get("password");
        confirm = data.get("confirm-password");

        if( pass !== confirm )
        {
            alert("the password and confirm password do not match!");

        }
        else{
            let userData = state;
            console.log(userData);
            alert(`Data: ${userData} \n\nPassword: ${pass}`);
            navigate("/login");
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
                        <form className='sign-up-form' action={completeUserCreation}>
                            <label className="input-label" htmlFor='password'>Password *</label>
                            <input name="password" className='input-field' type='password' id='password' autoComplete="true" placeholder='********' />

                            <p className="input-label" id="password-specs">
                                The password should be atleast 8 characters long
                            </p>

                            <label className="input-label" htmlFor='confirm-password'>Confirm Password *</label>
                            <input name="confirm-password" className='input-field' type='password' id='confirm-password' autoComplete="true" placeholder='********' />

                            <label className="input-label" id="agree-to-terms-div">
                                <input id="agree-to-terms-checkbox" className="check-box-input" type="checkbox" />
                                <span>
                                    I agree to the 
                                    <Link to="#" className="react-link" > Terms of Service </Link>
                                    and 
                                    <Link to="#" className="react-link"> Privacy Policy.</Link>
                                </span>
                            </label>

                            {/* <Link id='create-account-button-container' to={'/login'}> */}
                            <input type='submit' name="create-button" id="create-account-button" value={"Create account"}/>
                            {/* </Link> */}

                        </form>

                        <div id='login-div'>
                            <Link to="/login">
                            <label id='login-label'>Already have an account ?  <span id='login-button'>Login</span></label>
                            </Link>
                        </div>
                        </div>
                        <img src='/src/assets/shamba_bot_logo.svg' alt='image here'/>
                    </div>
                </div>
            </>
        );
    }

    return render();
}
