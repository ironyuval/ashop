import ListItem from "./ListItem";
import { toggleFavorite as toggleFavoriteProduct } from "../../redux/slice";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./List.css";

function List({ products }) {
  const user = useSelector((state) => state.core.user);

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
      await api.User.toggleFavorite(productId);
      dispatch(toggleFavoriteProduct(productId));
    } catch (e) {
      console.log(e);
    }
  };

  console.log(products);

  return (
    <div className="container-fluid list-container">
      <div className="row">
        {products.length ? (
          products.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-xxl-2 my-4">
              <ListItem
                item={product}
                isFavorite={isProductFavorite(product._id)}
                toggleFavorite={toggleFavorite}
                handleClick={handleClick}
              />
            </div>
          ))
        ) : (
          <div>No Results</div>
        )}
      </div>
    </div>
  );
}

export default List;
