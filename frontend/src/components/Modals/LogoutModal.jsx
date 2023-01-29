import { removeUser } from "../../redux/slice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
  const user = useSelector((state) => state.core.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/");
    toast.error(`Good Bye, ${user.name}!`);
  };

  return (
    <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Logout
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>

          <div className="modal-body">Are you sure?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={handleLogout}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
