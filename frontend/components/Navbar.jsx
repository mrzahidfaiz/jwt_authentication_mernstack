import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../src/api/internal";
import { resetUser } from "../store/userSlice";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.auth);

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await logout();
    if (response.status === 200) {
      dispatch(resetUser());
    }
  };
  return (
    <nav className="bg-red-600">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      {isAuth ? (
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <>
          {" "}
          <div>
            <NavLink to="/login">Login</NavLink>
          </div>
          <div>
            <NavLink to="/Signup">Signup</NavLink>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
