/* eslint-disable react/no-unknown-property */
import List from "../components/GridList/List";
import Logo from "../assets/logo.png";
import CaptainVideo from "../assets/captain.mp4";
import StanLeeVideo from "../assets/stanlee.mp4";
import api from "../api";
import { LoadingModal } from "../components/Modals/LoadingModal";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const searchRef = useRef();

  const getData = async () => {
    try {
      setIsLoading(true);
      const topRatedQueryParams = {
        page: 1,
        perPage: 6,
        sort: "rating",
      };

      const latestQueryParams = {
        page: 1,
        perPage: 6,
        sort: "createdAt",
      };
      const { data: topRated } = await api.Product.getProducts(
        topRatedQueryParams
      );
      const { data: latest } = await api.Product.getProducts(latestQueryParams);

      setTopRated(topRated.products);
      setLatest(latest.products);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const value = searchRef.current.value;
    if (value) {
      navigate("/browse", { state: { search: value } });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="d-flex flex-column overflow-hidden bg-grey h-100">
      <div className="d-flex flex-column flex-lg-row align-items-center flex-wrap container-fluid bg-blue">
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
              onClick={handleSearch}
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
          className="d-flex flex-column"
          style={{
            overflowY: "scroll",
          }}
        >
          <div className="d-flex flex-column mt-2 mb-2 w-100 justify-content-center align-items-center">
            <p className="ms-5">
              Discover a world of endless adventure with our online comic book
              shop
            </p>
            <div className="d-flex justify-content-center overflow-hidden w-75">
              <video height="180" loop muted autoPlay controls="">
                <source src={CaptainVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video height="180" loop muted autoPlay controls="">
                <source src={StanLeeVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <p className="ms-5">Top rated</p>
          <List products={topRated} />
          <p className="ms-5">Latest</p>
          <List products={latest} />
        </div>
      )}
    </div>
  );
}

export default Home;
