import { Link, useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();

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
          <button onClick={() => history.push("/")}>Home</button>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        <div>
          <Link to="">Browse</Link>
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
