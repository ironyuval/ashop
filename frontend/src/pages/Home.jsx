/* eslint-disable react/no-unknown-property */
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import Logo from "../assets/logo.png";
import CaptainVideo from "../assets/captain.mp4";
import StanLeeVideo from "../assets/stanlee.mp4";
import api from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);
  const navigate = useNavigate();

  const searchRef = useRef();

  const getData = async () => {
    try {
      const topRatedQueryParams = {
        page: 1,
        perPage: 5,
        sort: "ratings",
      };

      const latestQueryParams = {
        page: 1,
        perPage: 5,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowY: "hidden",
        backgroundColor: "#f5f5f5",
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
        <div className="d-flex ms-md-auto me-md-5 align-items-center space-between mb-md-0 mb-3 ">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              ref={searchRef}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <button
            onClick={handleSearch}
            className="btn btn-outline-success ms-2"
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
        }}
      >
        <div className="mt-2 mb-2 w-100">
          <p className="ms-5">
            Book Depository: Free delivery worldwide on over 20 million books
          </p>
          <div className="d-flex justify-content-center">
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
    </div>
  );
}

export default Home;
