import List from "../components/List";
import SearchBar from "../components/SearchBar";
import Logo from "../assets/logo.png";
import Image from "react-bootstrap/Image";

function Home({ products }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        border: "15px solid black",
      }}
    >
      <div style={{ border: "1px solid red" }}>
        <Image src={Logo} />
      </div>
      <SearchBar />
      <List products={products} />
    </div>
  );
}

export default Home;
