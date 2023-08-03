import { Link } from "react-router-dom";

const Navbar=()=>{

    return (
        <div>
            <h1>Medium</h1>
            <div>
                <Link to={'/signin'}>Sign In</Link>
                <Link to={'/signup'}>Sign Up</Link>
            </div>
        </div>
    )

}

export default Navbar;