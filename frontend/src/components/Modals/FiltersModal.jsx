import { Filters } from "../../server-shared/types";
import { toCapitilize } from "../../utils/capitalize";
import React from "react";
import { useState } from "react";

const initialFilters = () => {
  const filters = {};

  const filterNames = Object.keys(Filters);

  for (let filter of filterNames) {
    if (Filters[filter].type === "range") {
      filters[filter] = {
        min: Filters[filter].min,
        max: Filters[filter].max,
      };
    }
    if (Filters[filter].type === "select") {
      filters[filter] = {
        value: "",
      };
    }
  }

  return filters;
};

const FiltersModal = ({ handleSubmit, handleReset }) => {
  const [filters, setFilters] = useState(initialFilters());
  const filterNames = Object.keys(Filters);

  const handleChangeRange = ({ filter, min = null, max = null }) => {
    let fixedVal;

    if (min !== null) {
      if (parseInt(min) <= Filters[filter].min)
        fixedVal = Filters[filter].min.toString();
      else if (parseInt(min) >= Filters[filter].max)
        fixedVal = Filters[filter].max.toString();
      else if (isNaN(parseInt(min))) {
        fixedVal = Filters[filter].min.toString();
      } else {
        fixedVal = min;
      }
    } else if (max !== null) {
      console.log("max");
      if (parseInt(max) <= Filters[filter].min)
        fixedVal = Filters[filter].min.toString();
      else if (parseInt(max) >= Filters[filter].max)
        fixedVal = Filters[filter].max.toString();
      else if (isNaN(parseInt(max))) {
        fixedVal = Filters[filter].min.toString();
      } else {
        fixedVal = max;
      }
    }

    const nextState = {
      ...filters,
      [filter]: {
        ...filters[filter],
        min: min !== null ? fixedVal : filters[filter].min,
        max: max !== null ? fixedVal : filters[filter].max,
      },
    };

    console.log(nextState);

    setFilters(nextState);
  };

  const handleBlurRange = (filter, e) => {
    if (
      parseInt(filters[filter.name].min) > parseInt(filters[filter.name].max)
    ) {
      setFilters({
        ...filters,
        [filter.name]: {
          ...filters[filter.name],
          min: filters[filter.name].max,
        },
      });
    } else if (
      parseInt(filters[filter.name].max) < parseInt(filters[filter.name].min)
    ) {
      setFilters({
        ...filters,
        [filter.name]: {
          ...filters[filter.name],
          max: filters[filter.name].min,
        },
      });
    }
  };

  const handleChangeRangeMax = (filter, e) => {
    setFilters({
      ...filters,
      [filter.name]: {
        ...filters[filter.name],
        max: (() => {
          //limits
          if (parseInt(e.currentTarget.value) < filter.min)
            return filter.min.toString();
          if (parseInt(e.currentTarget.value) > filter.max)
            return filter.max.toString();
          return parseInt(e.currentTarget.value);
        })(),
      },
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
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
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
                        className="input-group-text fw-bold"
                      >
                        {toCapitilize(filter)}
                      </span>

                      <span className="input-group-text">From</span>
                      <input
                        type="number"
                        value={parseInt(filters[filter].min).toString()}
                        onChange={(e) =>
                          handleChangeRange({
                            filter,
                            min: e.currentTarget.value,
                          })
                        }
                        aria-label="First name"
                        className="form-control"
                      />
                      <span className="input-group-text">To</span>
                      <input
                        value={parseInt(filters[filter].max).toString()}
                        onChange={(e) =>
                          handleChangeRange({
                            filter,
                            max: e.currentTarget.value,
                          })
                        }
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
                        className="input-group-text fw-bold"
                      >
                        {toCapitilize(filter)}
                      </span>

                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>All</option>
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
              onClick={() => handleSubmit(filters)}
              type="button"
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
