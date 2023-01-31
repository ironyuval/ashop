import { Roles } from "../../server-shared/types";
import { useSelector } from "react-redux";
import "./Fab.css";

const Fab = ({ onClick = () => {} }) => {
  const user = useSelector((state) => state.core.user);

  if (!user || user.role === Roles.User) return null;
  return (
    <div onClick={onClick} className="fab-container">
      <div className="button iconbutton">
        <i className="bi bi-plus-lg"></i>
      </div>
    </div>
  );
};

export default Fab;
