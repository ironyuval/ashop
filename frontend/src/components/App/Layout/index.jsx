import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100vh",
        /*           border: "2px solid green",
         */
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "scroll",
          /*           border: "2px solid green",
           */
        }}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
