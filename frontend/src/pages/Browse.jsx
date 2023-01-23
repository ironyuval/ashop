import List from "../components/GridList/List";
import api from "../api";
import Logo from "../assets/logo.png";
import { setIsFiltersModalShown } from "../redux/slice";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function Browse() {
  const [products, setProducts] = useState([]);

  const [price, setPrice] = useState(100);

  const [rating, setRating] = useState(0);

  const [category, setCategory] = useState();

  const dispatch = useDispatch();

  const searchRef = useRef();

  const state = useLocation().state;
  const search = (state && state.search) || "";

  useEffect(() => {
    getProducts({
      page: 1,
      perPage: 15,
      keyword: search,
    });

    if (search) {
      searchRef.current.value = search;
    }
  }, []);

  const getProducts = async (params) => {
    try {
      const { data } = await api.Product.getProducts(params);
      setProducts(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickReset = () => {
    setCategory(undefined);
    setPrice(100);
    setRating(0);
    searchRef.current.value = "";
    getProducts(`perPage=15`);
  };

  const handleClickFilters = () => {
    dispatch(setIsFiltersModalShown(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <div
          className="ms-md-5"
          style={{
            backgroundImage: `url(${Logo})`,
            height: "100px",
            width: "300px",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="d-flex ms-md-auto me-md-5 align-items-center space-between mb-md-4 mb-3 mt-4">
          <div>
            <button
              onClick={handleClickReset}
              type="button"
              className="btn btn-danger me-3 fw-bold"
            >
              Reset
            </button>
          </div>
          <div>
            <button
              /*               onClick={handleClickFilters}
               */ type="button"
              className="btn btn-warning me-3 fw-bold "
              data-bs-toggle="modal"
              data-bs-target="#filtersModal"
            >
              Filters
            </button>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              ref={searchRef}
              type="search"
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <button
            onClick={handleSubmit}
            className="btn btn-success ms-3 fw-bold"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        <List products={products} />
      </div>
    </div>
  );
}

export default Browse;
