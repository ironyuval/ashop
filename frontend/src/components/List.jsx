import { UserType } from "../utils/types";
import {
  getStorageToken,
  toggleFavorite as toggleFavoriteProduct,
} from "../redux/slice";
import { getBasename } from "../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const MAX_LETTERS = 28;

function List({ products }) {
  const user = useSelector((state) => state.app.user);

  const favorites = user && user.favorites;

  console.log("favorites: ", favorites);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/product", { state: { product } });
  };

  const isProductFavorite = (productId) => {
    return favorites && favorites.includes(productId);
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
      dispatch(toggleFavoriteProduct(productId));
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
              <div
                onClick={() => {
                  if (user) toggleFavorite(product._id);
                }}
                disabled={!user}
                href=""
              >
                <i
                  style={{
                    fontSize: 20,
                    color: "yellow",
                  }}
                  className={`bi bi-star${
                    isProductFavorite(product._id) ? "-fill" : ""
                  }`}
                ></i>
                Add to Favorites
              </div>
              <div
                disabled={!user || user.type !== UserType.Admin}
                onClick={() => handleClick(product)}
                href=""
              >
                Edit
              </div>
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
