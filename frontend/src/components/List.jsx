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

const MAX_LETTERS = 28;

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
        /*         border: "1px solid purple",
         */ display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {products.length ? (
        products.map((product, idx) => (
          <div
            key={product._id}
            className="card ms-5"
            style={{
              width: "180px",
            }}
          >
            <div className="m-auto">
              <h5>
                {product.name
                  .concat("fegagag dagaergeg aeg erasga")
                  .substring(0, MAX_LETTERS)
                  .trim()}
                {product.name.concat("fegagag dagaergeg aeg erasga").length >
                MAX_LETTERS
                  ? "..."
                  : null}
              </h5>
            </div>

            <div
              style={{
                backgroundImage: `url(${product.images[0].url})`,
                backgroundRepeat: "no-repeat",
                height: "200px",
                backgroundSize: "100%",
              }}
              src={product.images[0].url}
              className="card-img-top"
              alt="..."
            />

            <div>
              <span>{product.category}</span>
              <span>{product.ratings}</span>
            </div>
            <div>
              <a
                onClick={() => toggleFavorite(product._id)}
                disabled={!user.type}
                href="#"
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
