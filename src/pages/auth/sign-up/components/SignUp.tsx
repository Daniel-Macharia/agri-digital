import '/src/pages/auth/style.css';
import { Link, useNavigate } from 'react-router-dom';

function App(){
  //const state[count, setCount] = useState(0);
  let state = {count:20};

  let navigate = useNavigate();

  function createUserAccount(data:FormData):void{

    let d = {
      "Full name": data.get("full-name"),
      "Phone": data.get("phone-number"),
      "Email": data.get("email"),
      "Role": data.get("user-role")
    };

    alert(`Collected data: \n\n ${d}`);

    navigate("/create-password", {state : d});

  }

  let render = ()=>{
    return (
      <>
        <div>
          <div id='sign-up-content-div'>
            <div id='sign-up-form-div'>
              <p id='sign-up-form-title'>Create your account.</p>
              <p id='sign-up-form-sub-title'>Join the Future of Farming - Easy, Fast and Reliable.</p>
              <form className='sign-up-form' action={createUserAccount}>
                <label className="input-label" htmlFor='full-name'>Full Name</label>
                <input required name='full-name' className='input-field' type='text' id='full-name' placeholder='Kelvin Mutuku' />
                <label className="input-label" htmlFor='email'>Email</label>
                <input required name='email' className='input-field' type='email' id='email' placeholder='example@gmail.com' />
                <label className="input-label" htmlFor='phone-number'>Phone number</label>
                <input required name='phone-number' className='input-field' type='telephone' id='phone-number' placeholder='+254712345678' />
                <label className="input-label" htmlFor='user-role'>Role *</label>
                <select required className='input-field' name='user-role' id='user-role' >
                  <option id='select-place-holder' value={""}>I am a ..</option>
                  <option value={"farmer"}>Farmer</option>
                  <option value={"visitor"}>Visitor</option>
                </select>
                
                {/* <Link id='create-account-button-container' to={'/create-password'}> */}
                  <input type='submit' name="create-button" id="create-account-button" value={"Continue"}/>
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

export default App;
