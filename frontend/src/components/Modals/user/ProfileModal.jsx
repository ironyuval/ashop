import { setUser } from "../../../redux/slice";
import api from "../../../api";
import getModalById from "../../../utils/getModalById";
import {
  nameSchema,
  passwordSchema,
} from "../../../validation/register.validation";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { toast } from "react-toastify";

const ProfileModal = () => {
  const user = useSelector((state) => state.core.user);

  const dispatch = useDispatch();

  const [image, setImage] = useState(user ? user.image || "" : "");

  const nameRef = useRef();

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [errors, setErrors] = useState({});

  const isValid = !Object.keys(errors).length;

  const handleError = (errorField, errorMessage) => {
    setErrors((errors) => ({ ...errors, [errorField]: errorMessage }));
  };

  const clearError = (errorField) => {
    const newErrors = { ...errors };
    delete newErrors[errorField];
    setErrors(newErrors);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleClose = () => {
    setName(user.name);
  };

  const handleValidateBySchema = (name, schema) => (e) => {
    const value = e.target.value;

    const validatedValue = schema.validate(value);

    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        const errorMessage = item.message.split('" ')[1];
        handleError(name, errorMessage);
      }
    } else {
      clearError(name);
    }
  };

  const handleSave = async () => {
    const name = nameRef.current.value;
    const data = {
      name,
      image,
      oldPassword: oldPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };

    try {
      console.log(data);
      await api.User.updateData(user._id, data);
      dispatch(setUser({ name, image }));
      const profileModal = getModalById("profileModal");
      profileModal.hide();
    } catch (e) {
      if (e.response.data.message) {
        toast.error(`${e.response.data.message}`);
      } else {
        toast.error(`${e.message}`);
      }
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
              <div className="mb-2">
                {image ? (
                  <img height={200} width={200} src={image} />
                ) : (
                  <i
                    style={{ fontSize: 60 }}
                    className="bi bi-person-circle"
                  ></i>
                )}
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Username</span>

                <input
                  ref={nameRef}
                  defaultValue={user.name}
                  onBlur={handleValidateBySchema("name", nameSchema)}
                  type="text"
                  className={`form-control ${
                    errors["name"] ? "is-invalid" : ""
                  }`}
                  aria-label="name"
                  aria-describedby="basic-addon1"
                />
                <div className="invalid-feedback">{errors["name"]}</div>
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
                  type="password"
                  onBlur={handleValidateBySchema("password", passwordSchema)}
                  className={`form-control ${
                    errors["password"] ? "is-invalid" : ""
                  }`}
                  aria-label="Old password"
                  aria-describedby="basic-addon1"
                />
                <div className="invalid-feedback">{errors["password"]}</div>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">New password</span>

                <input
                  ref={newPasswordRef}
                  type="password"
                  className="form-control"
                  aria-label="New password"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Confirm new password</span>

                <input
                  ref={confirmPasswordRef}
                  type="password"
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
