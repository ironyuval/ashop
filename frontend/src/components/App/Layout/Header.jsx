import { Permissions } from "../../../server-shared/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderItems = {
  Start: [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/about",
      title: "About",
    },
    {
      path: "/browse",
      title: "Browse",
      icon: "bi bi-search",
    },
    {
      path: "/wishlist",
      title: "Wishlist",
      icon: "bi bi-heart",
      permission: [Permissions.Registered],
    },
  ],
  End: [],
};

function Header() {
  const user = useSelector((state) => state.core.user);

  const navigate = useNavigate();
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
            {HeaderItems.Start.map((item, index) => {
              if (
                (!user && item.permission) ||
                (item.permission &&
                  user.permission !== Permissions.Master &&
                  !item.permission.includes(user.permission))
              )
                return null;
              return (
                <li key={index} className="nav-item">
                  <a
                    className={`nav-link ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon && <i className={`${item.icon} me-1`}></i>}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>

          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                    className={`nav-link ${
                      location.pathname === "/register" ? "active" : ""
                    }`}
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
                      location.pathname === "/cart" ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    <i className="bi bi-cart3 me-1"></i>
                    Cart
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#profileModal"
                    className={`nav-link ${
                      location.pathname === "/profile" ? "active" : ""
                    }`}
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {user.name}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#logoutModal"
                    className="nav-link"
                  >
                    <i className="bi bi-box-arrow-left me-1"></i>
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
