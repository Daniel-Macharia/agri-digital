import { Component, useState } from "react";
import { Link } from "react-router-dom";


export default function NotFound()
{
    let state = useState();

    let render = ()=>{
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

    return render();
}

