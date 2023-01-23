import React from "react";
import { useSelector } from "react-redux";

const FiltersModal = () => {
  const isShown = useSelector((state) => state.modals.isFiltersModalShown);

  console.log(isShown);

  /*   if (!isShown) return null;
   */ return (
    <div className="modal fade" id="filtersModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Filters
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="input-group">
              <span className="input-group-text fw-bold">Price</span>

              <span className="input-group-text">From</span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
              />
              <span className="input-group-text">To</span>
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
              />
            </div>
            <div className="input-group mt-3">
              <span className="input-group-text fw-bold">Rating</span>

              <span className="input-group-text">From</span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
              />
              <span className="input-group-text">To</span>
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
              />
            </div>
          </div>
          <div className="input-group px-3">
            <span className="input-group-text fw-bold">Genre</span>

            <select className="form-select" aria-label="Default select example">
              <option selected>Open thisu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
