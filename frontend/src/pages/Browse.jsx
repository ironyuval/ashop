import List from "../components/GridList/List";
import api from "../api";
import Logo from "../assets/logo.png";
import FiltersModal from "../components/Modals/FiltersModal";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function Browse() {
  const [products, setProducts] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 12,
    total: 0,
  });

  const searchRef = useRef();

  const state = useLocation().state;
  const search = (state && state.search) || "";

  useEffect(() => {
    getProducts({
      page: pagination.page,
      perPage: pagination.perPage,
      keyword: search,
    });

    if (search) {
      searchRef.current.value = search;
    }
  }, [pagination.page]);

  const getProducts = async (params) => {
    try {
      const { data } = await api.Product.getProducts(params);
      setProducts(data.products);
      setPagination((pagination) => ({ ...pagination, total: data.count }));
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

  const handleQuickSearch = (e) => {
    getProducts({
      page: 1,
      perPage: 15,
      keyword: searchRef.current.value,
    });
  };

  const handleAdvancedSearch = (filters) => {
    getProducts(filters);
  };

  const handlePaging = (newPage) =>
    setPagination((pagination) => ({ ...pagination, page: newPage }));

  console.log(pagination);

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
      <FiltersModal handleSubmit={handleAdvancedSearch} />

      <div className="d-flex flex-column flex-lg-row align-items-center flex-wrap container-fluid bg  .bg-gradient .bg-gradient">
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

        <div className="d-flex m-auto flex-column-reverse flex-sm-row ms-lg-auto me-lg-5 align-items-center space-between mb-lg-4 mb-3 sm-mt-4">
          <div className="d-flex mt-3 mt-sm-0">
            <div>
              <button
                onClick={handleClickReset}
                type="button"
                className="btn btn-danger me-3 "
              >
                Reset
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn text-nowrap btn-warning me-3"
                data-bs-toggle="modal"
                data-bs-target="#filtersModal"
              >
                Advanced Search
              </button>
            </div>
          </div>
          <div className="d-flex">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                ref={searchRef}
                type="search"
                className="form-control"
                placeholder="Quick search"
                aria-label="Quick search"
              />
            </form>

            <button
              onClick={handleQuickSearch}
              className="btn btn-success ms-3"
              type="submit"
            >
              Search
            </button>
          </div>
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
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pagination.page === 1 && `disabled`}`}>
              <a
                onClick={() => handlePaging(pagination.page - 1)}
                className="page-link"
                href="#"
                tabIndex="-1"
              >
                Previous
              </a>
            </li>
            <li className="page-item disabled">
              <a className="page-link" href="#">
                {pagination.page}
              </a>
            </li>
            <li className={`page-item`}>
              <a className="page-link" href="#">
                {pagination.page + 1}
              </a>
            </li>
            <li className={`page-item`}>
              <a
                onClick={() => handlePaging(pagination.page + 2)}
                className="page-link"
                href="#"
              >
                {pagination.page + 2}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => handlePaging(pagination.page + 1)}
                href="#"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        <List products={products} />
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Browse;
