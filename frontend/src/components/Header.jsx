import { setIsLogoutModalShown } from "../redux/slice";
import { UserType } from "../utils/types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();

  const isLoggedIn = Boolean(user?.token);

  return (
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
        <Link to="/browse">Browse</Link>
      </div>
      {!isLoggedIn && (
        <>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </>
      )}
      {isLoggedIn && (
        <div>
          {user.type === UserType.Admin ? (
            <div>
              <Link to="/admin">Admin</Link>
            </div>
          ) : undefined}
          <Link
            onClick={() => {
              dispatch(setIsLogoutModalShown(true));
            }}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
