import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header>
      <div className="header-picture">
        {/* Add your header picture here */}
      </div>
      <div className="nav-links">
        <div className="left-links">
          <Link to="/">Home</Link>
        </div>
        <div className="right-links">
          {user ? (
            <button onClick={handleLogoutClick}>Logout</button>
          ) : (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar