import { UserType } from "../utils/types";
import { getStorageToken } from "../redux/slice";
import { getBasename } from "../utils";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function List({ products }) {
  console.log(products);

  const user = useSelector((state) => state.app.user);

  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/product", { state: { product } });
  };

  const toggleFavorite = async (productId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${getStorageToken()}` },
      };
      await axios.post(
        `${getBasename()}/api/user/favorite/${productId}`,
        null,
        config
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        border: "1px solid purple",
        marginTop: 10,
        display: "flex",
        flex: 1,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {products.length ? (
        products.map((product, idx) => (
          <div key={product._id} className="card" style={{ width: "18rem" }}>
            <div
              style={{
                backgroundImage: `url(${product.images[0].url})`,
                width: "200px",
                backgroundSize: "contain",
              }}
              src={product.images[0].url}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{product.category}</li>
              <li className="list-group-item">{product.rating}</li>
            </ul>
            <div className="card-body">
              <a
                onClick={() => toggleFavorite(product._id)}
                disabled={!user.type}
                href="#"
                className="card-link"
              >
                <i
                  style={{
                    fontSize: 20,
                    color: "yellow",
                  }}
                  className="bi bi-star"
                ></i>
                Add to Favorites
              </a>
              <a
                disabled={user.type !== UserType.Admin}
                onClick={() => handleClick(product)}
                href=""
                className="card-link"
              >
                Edit
              </a>
            </div>
          </div>
        ))
      ) : (
        <div>No Results</div>
      )}
    </div>
  );
}

export default List;
