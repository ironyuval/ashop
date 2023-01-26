import { Filters } from "../../server-shared/types";
import { toCapitilize } from "../../utils/capitalize";
import React from "react";
import { useState } from "react";
import { useRef } from "react";

const initRangeFilters = () => {
  const filters = {};

  const filterNames = Object.keys(Filters);

  for (let filter of filterNames) {
    if (Filters[filter].type === "range") {
      filters[filter] = [Filters[filter].min, Filters[filter].max];
    }
  }

  return filters;
};

const MIN_RANGE_IDX = 0;
const MAX_RANGE_IDX = 1;

const FiltersModal = ({ handleSubmit, handleReset }) => {
  const [filters, setFilters] = useState(initRangeFilters());
  const filterNames = Object.keys(Filters);

  const searchRef = useRef();

  const handleChangeRange =
    ({ filter, min, max }) =>
    (e) => {
      const value = parseInt(e.currentTarget.value);
      let fixedVal;

      if (min) {
        //restrict fixed min
        if (value < Filters[filter].min) fixedVal = Filters[filter].min;
        //restrict fixed max
        else if (value > Filters[filter].max) fixedVal = Filters[filter].max;
        //fixed reset value
        else if (isNaN(value)) {
          fixedVal = Filters[filter].min;
          //no fix needed
        } else {
          fixedVal = value;
        }
      } else if (max) {
        if (value < Filters[filter].min) fixedVal = Filters[filter].min;
        else if (value > Filters[filter].max) fixedVal = Filters[filter].max;
        else if (isNaN(value)) {
          fixedVal = Filters[filter].min;
        } else {
          fixedVal = value;
        }
      }

      const newFilters = {
        ...filters,
        [filter]: [
          min ? fixedVal : filters[filter][MIN_RANGE_IDX],
          max ? fixedVal : filters[filter][MAX_RANGE_IDX],
        ],
      };

      setFilters(newFilters);
    };

  const handleChangeSelect = (filter) => (e) => {
    setFilters({
      ...filters,
      [filter]: e.target.value,
    });
  };

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
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="d-flex mb-3">
              <input
                ref={searchRef}
                type="search"
                className="form-control"
                placeholder="Advanced search"
                aria-label="Advanced search"
              />
            </div>

            {filterNames.map((filter, idx) => {
              switch (Filters[filter].type) {
                case "range": {
                  return (
                    <div
                      key={idx}
                      className={`input-group ${idx === 0 ? "" : "mt-3"} `}
                    >
                      <span
                        style={{ width: "75px" }}
                        className="input-group-text"
                      >
                        {toCapitilize(filter)}
                      </span>

                      <span className="input-group-text">Min</span>
                      <input
                        type="number"
                        value={parseInt(
                          filters[filter][MIN_RANGE_IDX]
                        ).toString()}
                        onChange={handleChangeRange({
                          filter,
                          min: true,
                        })}
                        aria-label="First name"
                        className="form-control"
                      />
                      <span className="input-group-text">Max</span>
                      <input
                        value={parseInt(
                          filters[filter][MAX_RANGE_IDX]
                        ).toString()}
                        onChange={handleChangeRange({
                          filter,
                          max: true,
                        })}
                        type="number"
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
                        className="input-group-text"
                      >
                        {toCapitilize(filter)}
                      </span>

                      <select
                        onChange={handleChangeSelect(filter)}
                        value={filters[filter]}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value={""}>All</option>
                        {Filters[filter].data.map((genre, idx) => (
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
            <button
              onClick={() =>
                handleSubmit({ ...filters, keyword: searchRef.current.value })
              }
              type="button"
              className="btn btn-primary"
            >
              Advanced search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
