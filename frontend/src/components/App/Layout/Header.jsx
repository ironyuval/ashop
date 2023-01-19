import {
  setIsLogoutModalShown,
  setIsProfileModalShown,
} from "../../../redux/slice";
import { Permissions } from "../../../server-shared/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const user = useSelector((state) => state.app.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoggedIn = Boolean(user);

  return (
    <nav className="navbar navbar-light grad navbar-expand-md bg ">
      <div className="container-fluid ">
        <button
          className="navbar-toggler border-white mt-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <i className="bi bi-list text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                onClick={() => navigate("/")}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                onClick={() => navigate("/about")}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname === "/browse" ? "active" : ""
                }`}
                onClick={() => navigate("/browse")}
              >
                Browse
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname === "/favorites" ? "active" : ""
                }`}
                onClick={() => navigate("/favorites")}
              >
                Favorites
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link`}>{user && user.name}</a>
            </li>
          </ul>

          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      location.pathname === "/register" ? "active" : ""
                    }`}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </a>
                </li>
              </>
            ) : (
              <>
                {user.permission === Permissions.Admin ? (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        location.pathname === "/admin" ? "active" : ""
                      }`}
                      onClick={() => navigate("/admin")}
                    >
                      Admin
                    </a>
                  </li>
                ) : undefined}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      location.pathname === "/profile" ? "active" : ""
                    }`}
                    onClick={() => {
                      dispatch(setIsProfileModalShown(true));
                    }}
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      dispatch(setIsLogoutModalShown(true));
                    }}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
