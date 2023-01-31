import ListItem from "./ListItem";
import { Roles } from "../../server-shared/types";

import {
  toggleWishlist as toggleWishlistProduct,
  toggleCart as toggleCartProduct,
} from "../../redux/slice";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./List.css";

function List({ products }) {
  const user = useSelector((state) => state.core.user);

  const wishlist = user && user.wishlist;
  const cart = user && user.cart;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const isProductFavorite = (productId) => {
    return wishlist && wishlist.includes(productId);
  };

  const isProductInCart = (productId) => {
    return cart && cart.includes(productId);
  };

  const toggleWishlist = async (productId) => {
    try {
      await api.User.toggleWishlist(productId);
      dispatch(toggleWishlistProduct(productId));
    } catch (e) {
      console.log(e);
    }
  };

  const toggleCart = async (productId) => {
    try {
      await api.User.toggleCart(productId);
      dispatch(toggleCartProduct(productId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-fluid list-container m-auto">
      <div className="row justify-content-center">
        {products.length ? (
          products.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-xxl-2 my-4">
              <ListItem
                item={product}
                isFavorite={isProductFavorite(product._id)}
                isInCart={isProductInCart(product._id)}
                toggleWishlist={toggleWishlist}
                toggleCart={toggleCart}
                handleClick={() => handleClick(product)}
                showEdit={
                  user.role === Roles.Master ||
                  (user.role === Roles.Admin &&
                    product.createdBy._id === user.id)
                }
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
