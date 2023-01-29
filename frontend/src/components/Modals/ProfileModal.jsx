import { setUser } from "../../redux/slice";
import api from "../../api";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

const ProfileModal = () => {
  const user = useSelector((state) => state.core.user);

  const dispatch = useDispatch();

  const [name, setName] = useState(user ? user.name : "");
  const [image, setImage] = useState(user ? user.image || "" : "");

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleClose = () => {
    setName(user.name);
  };

  const handleSave = async () => {
    const data = {
      name,
      image,
      oldPassword: oldPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };

    try {
      await api.User.updateUser(user._id, data);
      dispatch(setUser({ name, image }));
    } catch (e) {
      console.log(e.message);
    }
  };

  if (!user) return null;

  return (
    <div className="modal fade" id="profileModal" tabIndex="-1" role="dialog">
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

          <div className="modal-body">
            <div className="d-flex flex-column align-items-center">
              {image ? (
                <img height={200} width={200} src={image} />
              ) : (
                <i
                  style={{ fontSize: 60 }}
                  className="bi bi-person-circle me-1"
                ></i>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text">Username</span>

                <input
                  value={name}
                  onChange={handleNameChange}
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Profile image</span>

                <input
                  value={image}
                  onChange={handleImageChange}
                  type="text"
                  className="form-control"
                  aria-label="Profile image"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email</span>

                <input
                  value={user.email}
                  disabled
                  type="text"
                  className="form-control"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Old password</span>

                <input
                  ref={oldPasswordRef}
                  type="text"
                  className="form-control"
                  aria-label="Old password"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">New password</span>

                <input
                  ref={newPasswordRef}
                  type="text"
                  className="form-control"
                  aria-label="New password"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Confirm new password</span>

                <input
                  ref={confirmPasswordRef}
                  type="text"
                  className="form-control"
                  aria-label="Confirm new password"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
