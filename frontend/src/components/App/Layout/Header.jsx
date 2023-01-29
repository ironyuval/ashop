import { Permissions } from "../../../server-shared/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const getHeaderItems = (user) => ({
  Start: [
    {
      path: "/",
      title: "home",
      icon: "bi bi-house",
    },
    {
      path: "/about",
      title: "about",
    },
    {
      path: "/browse",
      title: "browse",
      icon: "bi bi-search",
    },
    {
      path: "/wishlist",
      title: "wishlist",
      icon: "bi bi-heart",
      permission: Permissions.Registered,
    },
  ],
  End: !user
    ? [
        {
          title: "login",
          toggle: "loginModal",
        },
        {
          title: "register",
          toggle: "registerModal",
        },
      ]
    : [
        {
          path: "/cart",
          title: "cart",
          icon: "bi bi-cart3",
        },
        {
          title: user.name,
          icon: "bi bi-person-circle",
          toggle: "profileModal",
        },
        {
          title: "logout",
          icon: "bi bi-box-arrow-left",
          toggle: "logoutModal",
        },
      ],
});

function Header() {
  const user = useSelector((state) => state.core.user);

  const navigate = useNavigate();
  const location = useLocation();

  const HeaderItems = getHeaderItems(user);

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
            {HeaderItems.End.map((item, index) => {
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
                    data-bs-toggle="modal"
                    data-bs-target={`#${item.toggle}`}
                    className={`nav-link ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => item.path && navigate(item.path)}
                  >
                    {item.icon && <i className={`${item.icon} me-1`}></i>}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
