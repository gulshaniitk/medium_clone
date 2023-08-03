import { Link } from "react-router-dom";
import "./Navbar.css";
import { Outlet } from "react-router-dom";

const Navbar = ({ user }) => {
  console.log(user);
  return (
    <div>
      <div className="navbar">
        <h2>Medium</h2>
        <div>
          <Link to={"/"} className="btn">Home</Link>
          {!user && <Link to={"/signin"} className="btn">Sign In</Link>}
          {!user && <Link to={"/signup"} className="btn">Sign Up</Link>}
          {user && <Link to={"profile"} className="btn">My Profile</Link>}
          {user && <Link to={"mypost"} className="btn">My Post</Link>}
          {user && <Link to={"signout"} className="btn">Sign Out</Link>}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
