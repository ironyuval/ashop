import { Link } from "react-router-dom";

/* name;
description;
price;
ratings;
images;
category;
createdBy;
createAt; */
function Admin(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        height: "100%",
        border: "2px solid black",
      }}
    >
      <Link to={"/product"}>Create/Update/Delete product</Link>
    </div>
  );
}

export default Admin;
