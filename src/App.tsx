import { Component, useState, type FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Navigate } from 'react-router-dom';

//const navigate = useNavigate();

class App extends Component {
  //const state[count, setCount] = useState(0);
  public state = {count:20};

  private navigate = Navigate;

  private createUserAccount(event:FormEvent):boolean{
    event.stopPropagation();
    console.log("Submiting form");
    alert("submiting form");

    //Navigate("/otp");
  
    return false;
  }
  render()
  {
    return (
      <>
        <div>
          <div id='sign-up-content-div'>
            <div id='sign-up-form-div'>
              <p id='sign-up-form-title'>Create your account.</p>
              <p id='sign-up-form-sub-title'>Join the Future of Farming - Easy, Fast and Reliable.</p>
              <form id='sign-up-form' onSubmit={this.createUserAccount}>
                <label className="input-label" htmlFor='full-name'>Full Name</label>
                <input className='input-field' type='text' id='full-name' placeholder='Kelvin Mutuku' />
                <label className="input-label" htmlFor='email'>Email</label>
                <input className='input-field' type='email' id='email' placeholder='example@gmail.com' />
                <label className="input-label" htmlFor='phone-number'>Phone number</label>
                <input className='input-field' type='telephone' id='phone-number' placeholder='+254712345678' />
                <label className="input-label" htmlFor='user-role'>Role *</label>
                <select className='input-field' id='user-role' value={`["Farmer", "Visitor"]`} />
                
                <Link id='create-account-button-container' to={'/create-password'}>
                  <input type='submit' name="create-button" id="create-account-button" value={"Continue"}/>
                </Link>

              </form>

              <div id='login-div'>
                <Link to="/login">
                  <label htmlFor='login-button' id='login-label'>Already have an account ?  <span id='login-button'>Login</span></label>
                </Link>
              </div>
            </div>
            <img src='vite.svg' alt='image here'/>
          </div>
        </div>
      </>
    );
  }
}

export default App;
