import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

class App extends Component {
  //const state[count, setCount] = useState(0);
  public state = {count:20};
  render()
  {
    return (
      <>
        <div>
          <h2>Welcome to AgriDigital!</h2>
          <div id='sign-up-content-div'>
            <div id='sign-up-form-div'>
              <p id='sign-up-form-title'>Create Account.</p>
              <form id='sign-up-form'>
                <label className="input-label" htmlFor='full-name'>Full Name:</label>
                <input className='input-field' type='text' id='full-name' placeholder='enter your name here...' />
                <label className="input-label" htmlFor='phone-number'>Phone number:</label>
                <input className='input-field' type='telephone' id='phone-number' placeholder='enter your phone number here...' />
                <label className="input-label" htmlFor='email'>Email:</label>
                <input className='input-field' type='email' id='email' placeholder='enter your email here...' />
                <label className="input-label" htmlFor='password'>Password:</label>
                <input className='input-field' type='password' id='password' placeholder='enter password here...' />
                <label className="input-label" htmlFor='confirm-password'>Confirm Password:</label>
                <input className='input-field' type='password' id='confirm-password' placeholder='re-enter password here...' />
                <input type='submit' name="create-button" id="create-account-button" value={"CREATE"}/>
              </form>
            </div>
            <img src='vite.svg' alt='image here'/>
          </div>
        </div>
      </>
    );
  }
}

export default App;
