import api from "../../../api";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ productId }) => {
  const handleClose = () => setIsShown(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    /*     setIsLoading(true);
     */ api.Product.deleteProduct(productId)
      .then((res) => {
        toast.success("product deleted 😎 ");
        /*         setIsLoading(false);
         */
      })
      .catch((err) => {
        toast.error("new product failed to delete 😎 ");
        console.log(err);
        /*         setIsLoading(false);
         */
      });
    handleClose();
    navigate("/");
  };

  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Logout
            </h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn-close"
              aria-label="Close"
            ></button>
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
              onClick={handleDelete}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
