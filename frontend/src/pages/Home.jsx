import List from "../components/List";
import SearchBar from "../components/SearchBar";
import Logo from "../assets/logo.png";

function Home({ products }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        /*         border: "15px solid black",
         */ backgroundColor: "#f5f5f5",
      }}
    >
      <nav className="navbar bg  .bg-gradient mt-n20 ">
        <div className="container-fluid bg  .bg-gradient">
          <div
            className="navbar-brand ms-5"
            style={{
              backgroundImage: `url(${Logo})`,
              height: "100px",
              width: "300px",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <form className="d-flex  me-5" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <List products={products} />
    </div>
  );
}

export default Home;
