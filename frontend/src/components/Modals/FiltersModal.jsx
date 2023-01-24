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

  console.log(filters);

  return filters;
};

const FiltersModal = ({ handleSubmit, handleReset }) => {
  const [filters, setFilters] = useState(initialFilters());
  const filterNames = Object.keys(Filters);

  const handleChangeRange = ({ filter, min, max, value }) => {
    let fixedVal;

    if (min) {
      if (parseInt(e.currentTarget.value) < filters[filter].min)
        fixedVal = filters[filter].min.toString();
      if (parseInt(e.currentTarget.value) > filters[filter].max)
        fixedVal = filters[filter].max.toString();
      fixedVal = parseInt(e.currentTarget.value);
    } else if (max) {
      if (parseInt(e.currentTarget.value) < filter.min)
        fixedVal = filters[filter].min.toString();
      if (parseInt(e.currentTarget.value) > filter.max)
        fixedVal = filters[filter].max.toString();
      fixedVal = parseInt(e.currentTarget.value);
    }

    const nextState = {
      ...filters,
      [filter]: {
        ...filters[filter],
        min: min ? fixedVal : filters[filter].min,
        max: max ? fixedVal : filters[filter].max,
      },
    };

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
                        onChange={(e) => handleChangeRangeMin(filter, e)}
                        aria-label="First name"
                        className="form-control"
                      />
                      <span className="input-group-text">To</span>
                      <input
                        value={parseInt(filters[filter].max).toString()}
                        onChange={(e) => handleChangeRangeMax(filter, e)}
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
