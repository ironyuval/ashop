import { getHeaderItems } from "../App/Layout/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const user = useSelector((state) => state.core.user);

  const navigate = useNavigate();

  const HeaderItems = getHeaderItems(user);

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body grad">
        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
          {HeaderItems.Start.map((item, index) => {
            if (!item) return null;
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
          {HeaderItems.End.map((item, index) => {
            if (!item) return null;
            return (
              <li key={index} className="nav-item">
                <a
                  data-bs-toggle={item.toggle && "modal"}
                  data-bs-target={item.toggle && `#${item.toggle}`}
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
  );
};

export default MobileMenu;
