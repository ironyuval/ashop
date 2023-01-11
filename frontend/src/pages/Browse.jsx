import List from "../components/List";
import { getBasename } from "../utils";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

function Browse() {
  const [products, setProducts] = useState([]);

  const [price, setPrice] = useState(100);

  const [rating, setRating] = useState(0);

  const [category, setCategory] = useState();

  const searchRef = useRef();

  useEffect(() => {
    getProducts(`perPage=15`);
  }, []);

  const getProducts = async (queryString) => {
    try {
      const { data } = await axios.get(
        `${getBasename()}/api/product?${queryString}`
      );
      setProducts(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeRating = (rating) => {
    setRating(rating);
  };

  const handleChangeCategory = (e, category) => {
    e.preventDefault();
    setCategory(category);
  };

  const renderFiveStars = () => {
    const result = [];

    for (let i = 1; i <= 5; i++) {
      result.push(
        <i
          key={i}
          onClick={() => handleChangeRating(i)}
          style={{
            fontSize: 40,
            color: "yellow",
          }}
          className={`bi bi-star${i <= rating ? "-fill" : ""} ms-1`}
        ></i>
      );
    }

    return result;
  };

  const handleClickReset = () => {
    setCategory(undefined);
    setPrice(100);
    setRating(0);
    searchRef.current.value = "";
    getProducts(`perPage=15`);
  };

  const handleSubmit = () => {
    getProducts(buildQueryString());
  };

  const buildQueryString = () => {
    let queryString = ``;
    const searchValue = searchRef.current.value;

    if (searchValue) {
      queryString += `&keyword=${searchValue}`;
    }
    if (rating) {
      queryString += `&ratings=${rating}`;
    }

    return queryString;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center flex-wrap container-fluid bg  .bg-gradient .bg-gradient">
        <div className="border border-2">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {category || "Category"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  onClick={(e) => handleChangeCategory(e, "Action")}
                  className="dropdown-item"
                  href="#"
                >
                  Action
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => handleChangeCategory(e, "Drama")}
                  className="dropdown-item"
                  href="#"
                >
                  Drama
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => handleChangeCategory(e, "Horror")}
                  className="dropdown-item"
                  href="#"
                >
                  Horror
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border border-2">
          <label htmlFor="customRange1" className="form-label">
            Maximum Price {`${price}.00$`}
          </label>
          <input
            value={price}
            onChange={handlePriceChange}
            type="range"
            className="form-range"
            id="customRange1"
          />
        </div>
        <div className="border border-2">{renderFiveStars()}</div>
        <div>
          <button
            onClick={handleClickReset}
            type="button"
            className="btn btn-warning"
          >
            Reset
          </button>
        </div>

        <div className="d-flex ms-md-auto me-md-5 align-items-center space-between mb-md-4 mb-3 mt-4">
          <form role="search">
            <input
              ref={searchRef}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <button
            onClick={handleSubmit}
            className="btn btn-outline-success ms-2"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
      <div className="m-auto">
        <List products={products} />
      </div>
    </div>
  );
}

export default Browse;
