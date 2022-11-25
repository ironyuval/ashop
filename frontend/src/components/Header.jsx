import { Link } from "react-router-dom";

function Header() {
  const user = { name: "Gal", type: 1 };

  return (
    <nav>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          border: "1px solid black",
        }}
      >
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        <div>
          <Link to="/users">Users</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        {user.type === 1 ? (
          <div>
            <Link to="/admin">Admin</Link>
          </div>
        ) : undefined}
      </div>
    </nav>
  );
}

export default Header;
