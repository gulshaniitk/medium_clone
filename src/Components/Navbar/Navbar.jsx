import { Link } from "react-router-dom";
import "./Navbar.css";
import { Outlet } from "react-router-dom";

const Navbar = ({user,authorization}) => {
 
  console.log(authorization);
  return (
    <div>
      <div className="navbar">
        <h2>Medium</h2>
        <div>
          <Link to={"/"} className="btn">Home</Link>
          {!authorization && <Link to={"/signin"} className="btn">Sign In</Link>}
          {!authorization && <Link to={"/signup"} className="btn">Sign Up</Link>}
          {authorization && <Link to={"/profile"} className="btn">My Profile</Link>}
          {authorization && <Link to={"/mypost"} className="btn">My Post</Link>}
          {authorization && <Link to={"/signout"} className="btn">Sign Out</Link>}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
