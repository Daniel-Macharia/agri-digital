
import { Link } from "react-router-dom";


const NotFound : React.FC = ()=>{
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

export default NotFound;