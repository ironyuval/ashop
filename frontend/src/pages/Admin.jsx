import { getBasename } from "../utils";
import { getStorageToken } from "../redux/slice";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
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
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${getStorageToken()}` },
      };
      const { data } = await axios.get(`${getBasename()}/api/user`, config);
      setUsers(data.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
      <Link to={"/product"}>Create product</Link>
      <div style={{ marginTop: 10 }}>
        {users.map((user, index) => {
          return <div key={user._id}>{`${index}. ${user.name}`}</div>;
        })}
      </div>
    </div>
  );
}

export default Admin;
