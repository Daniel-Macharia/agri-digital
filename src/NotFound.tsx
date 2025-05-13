import { Component } from "react";
import { Link } from "react-router-dom";


export default class NotFound extends Component
{
    public state = {};

    render()
    {
        return (
            <>
                <div>
                    <h1>
                        404 Page Not Found.
                    </h1>

                    <Link to={'/login'}>
                        <button>Go back Home</button>
                    </Link>
                </div>
            </>
        );
    }
}

