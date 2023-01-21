import { toggleFavorite as toggleFavoriteProduct } from "../redux/slice";
import api from "../api";
import { Permissions } from "../server-shared/types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const MAX_LETTERS = 28;

function List({ products }) {
  const user = useSelector((state) => state.app.user);

  const favorites = user && user.favorites;

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
      await api.User.toggleFavorite(productId);
      dispatch(toggleFavoriteProduct(productId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        border: "1px solid purple",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {products.length ? (
        products.map((product, idx) => (
          <div
            key={product._id}
            className={`card col-4 ${idx && `ms-5`} mt-5`}
            style={{
              width: "180px",
            }}
          >
            <div className="m-auto">
              <h5>
                {product.name.substring(0, MAX_LETTERS).trim()}
                {product.name.length > MAX_LETTERS ? "..." : null}
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
              <span>Price: {product.price}</span>
            </div>
            <div>
              <span>Category: {product.category}</span>
            </div>
            <div>
              <span>Rating: {product.ratings}</span>
            </div>
            <div>
              <span>
                {`Created at: ${new Date(product.createAt).toLocaleDateString(
                  "he-IL"
                )}`}
              </span>
            </div>
            <div>
              <div
                onClick={() => {
                  if (user) toggleFavorite(product._id);
                }}
                disabled={!user}
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
                disabled={!user || user.permission !== Permissions.Admin}
                onClick={() => handleClick(product)}
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
