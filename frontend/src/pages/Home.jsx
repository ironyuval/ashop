import List from "../components/List";
import SearchBar from "../components/SearchBar";

function Home(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        border: "2px solid black",
      }}
    >
      <div style={{ border: "1px solid red" }}>LOGO</div>
      <SearchBar />
      <List />
    </div>
  );
}

export default Home;
