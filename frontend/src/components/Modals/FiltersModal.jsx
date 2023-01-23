import { FiltersArray, Genres } from "../../server-shared/types";
import { toCapitilize } from "../../utils/capitalize";
import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const initialFilters = () => {
  const filters = {};

  for (let filter of FiltersArray) {
    if (filter.type === "range") {
      filters[filter.name] = {
        min: filter.min,
        max: filter.max,
      };
    }
    if (filter.type === "select") {
      filters[filter.name] = {
        value: "",
      };
    }
  }

  return filters;
};

const FiltersModal = () => {
  const [filters, setFilters] = useState(initialFilters());

  if (!filters) return;

  console.log(filters);
  return (
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
            {FiltersArray.map((filter, idx) => {
              switch (filter.type) {
                case "range": {
                  console.log(filters[filter.name]);
                  return (
                    <div
                      key={idx}
                      className={`input-group ${idx === 0 ? "" : "mt-3"} `}
                    >
                      <span
                        style={{ width: "75px" }}
                        className="input-group-text fw-bold"
                      >
                        {toCapitilize(filter.name)}
                      </span>

                      <span className="input-group-text">From</span>
                      <input
                        type="number"
                        value={filters[filter.name].min}
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            [filter.name]: e.currentTarget.value,
                          });
                        }}
                        aria-label="First name"
                        className="form-control"
                      />
                      <span className="input-group-text">To</span>
                      <input
                        type="number"
                        value={filters[filter.name].max}
                        aria-label="Last name"
                        className="form-control"
                      />
                    </div>
                  );
                }
                case "select": {
                  return (
                    <div
                      key={idx}
                      className={`input-group ${idx === 0 ? "" : "mt-3"} `}
                    >
                      <span
                        style={{ width: "75px" }}
                        className="input-group-text fw-bold"
                      >
                        {toCapitilize(filter.name)}
                      </span>

                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>All</option>
                        {filter.data.map((genre, idx) => (
                          <option key={idx} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                default:
                  return null;
              }
            })}
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
