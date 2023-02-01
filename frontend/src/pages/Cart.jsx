import List from "../components/GridList/List";
import api from "../api";
import Logo from "../assets/logo.png";
import FiltersModal from "../components/Modals/product/FiltersModal";
import Paging from "../components/GridList/Paging";
import { LoadingModal } from "../components/Modals/LoadingModal";
import { setIsLoading } from "../redux/slice";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const [products, setProducts] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 12,
    total: 0,
  });

  const lastPage = Math.ceil(pagination.total / pagination.perPage);

  const searchRef = useRef();

  const state = useLocation().state;
  const search = (state && state.search) || "";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts({
      page: pagination.page,
      perPage: pagination.perPage,
      keyword: search,
    });

    if (search) {
      searchRef.current.value = search;
    }
  }, []);

  const getProducts = async (params) => {
    try {
      setIsLoading(true);

      const { data } = await api.User.getCart(params);

      console.log(data);
      setProducts(data.data);
      setPagination((pagination) => ({
        ...pagination,
        total: data.totalCount,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickReset = () => {
    setPagination((pagination) => ({ ...pagination, page: 1 }));
    searchRef.current.value = "";
    getProducts({
      page: 1,
      perPage: pagination.perPage,
    });
  };

  const handleQuickSearch = () => {
    setPagination((pagination) => ({ ...pagination, page: 1 }));
    getProducts({
      page: 1,
      perPage: pagination.perPage,
      keyword: searchRef.current.value,
    });
  };

  const handleAdvancedSearch = (filters) => {
    setPagination((pagination) => ({ ...pagination, page: 1 }));
    getProducts({ ...filters, ...pagination });
  };

  const handlePaging = (newPage) => {
    if (newPage <= lastPage) {
      getProducts({
        page: newPage,
        perPage: pagination.perPage,
        keyword: searchRef.current.value,
      });
      setPagination((pagination) => ({ ...pagination, page: newPage }));
    }
  };

  return (
    <div className="d-flex flex-column justify-space-between align-items-center h-100">
      <FiltersModal handleSubmit={handleAdvancedSearch} />

      <div className="d-flex flex-column flex-lg-row align-items-center flex-wrap container-fluid bg-blue .bg-gradient">
        <div
          className="ms-lg-5"
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

      {isLoading ? (
        <LoadingModal />
      ) : (
        <div
          className="d-flex flex-column overflow-auto w-100"
          style={{
            flex: 1,
          }}
        >
          <Paging
            currentPage={pagination.page}
            handleChange={handlePaging}
            lastPage={Math.ceil(pagination.total / pagination.perPage)}
          />
          <List products={products} />
          <Paging
            currentPage={pagination.page}
            handleChange={handlePaging}
            lastPage={Math.ceil(pagination.total / pagination.perPage)}
          />
        </div>
      )}
    </div>
  );
}

export default Cart;
