import ListItem from "./ListItem";
import { toggleWishlist as toggleWishlistProduct } from "../../redux/slice";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./List.css";

function List({ products }) {
  const user = useSelector((state) => state.core.user);

  const wishlist = user && user.wishlist;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/product", { state: { product } });
  };

  const isProductFavorite = (productId) => {
    return wishlist && wishlist.includes(productId);
  };

  const toggleWishlist = async (productId) => {
    try {
      await api.User.toggleWishlist(productId);
      dispatch(toggleWishlistProduct(productId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-fluid list-container">
      <div className="row justify-content-center">
        {products.length ? (
          products.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-xxl-2 my-4">
              <ListItem
                item={product}
                isFavorite={isProductFavorite(product._id)}
                toggleWishlist={toggleWishlist}
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
