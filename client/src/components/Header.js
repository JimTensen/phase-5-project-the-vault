import { Link } from "react-router-dom";

function Header({ user, onLogout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <header>
      <h1>
        <Link to="/">Go Home</Link>
      </h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <Link to="/extrapage">Enter the Vault</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Click Here to Login</Link>
      )}
    </header>
  );
}

export default Header;
