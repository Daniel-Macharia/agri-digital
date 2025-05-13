import { Component } from "react";
import "./Login.css"


class Login extends Component{
    public state = {};

    render()
    {
        return (
            <>
                <div>
                    <h1>
                        Login
                    </h1>
                    <div id="login-content">
                        <p>Enter details to login.</p>
                        <form>
                            <label></label>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
