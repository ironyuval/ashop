import { FiveStars } from "./../FiveStars";
import Diagonal from "./Diagonal";
import { toCapitilize } from "../../utils/capitalize";

const MAX_LETTERS = 35;

const ListItem = ({
  item: product,
  isFavorite,
  isInCart,
  toggleWishlist,
  toggleCart,
  handleClick,
  userPermission,
}) => {
  return (
    <div key={product._id} className="card m-auto text-center h-100">
      <div className="m-auto border-bottom border-3">
        {product.title.substring(0, MAX_LETTERS).trim()}
        {product.title.length > MAX_LETTERS ? "..." : null}
      </div>

      <div className="row">
        <div className="col">{toCapitilize(product.genre)}</div>
        <div className="col">
          <FiveStars size={12} rating={product.rating} />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "black",
          backgroundImage: `url(${product.images[0].url})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "250px",
          backgroundSize: "100%",
          position: "relative",
          overflow: "hidden",
        }}
        src={product.images[0].url}
        alt="image"
      >
        <Diagonal text={"test"} />
      </div>

      <div className="btn-group">
        <button
          onClick={handleClick}
          type="button"
          className="btn btn color-dark-blue rounded-0"
        >
          <i className="bi bi-pen"></i>
        </button>
        <button
          onClick={() => toggleCart(product._id)}
          type="button"
          className="btn btn fs-5"
        >
          <i className={`bi bi-cart${isInCart ? "-check-fill" : ""}`}></i>
          {`${product.price}.00$`}
        </button>
        <button
          onClick={() => toggleWishlist(product._id)}
          type="button"
          className="btn btn  color-dark-red rounded-0"
        >
          <i className={`bi bi-heart${isFavorite ? "-fill" : ""}`}></i>
        </button>
      </div>
      <div className="row">
        <div className="col text-center">
          <span>
            {`${new Date(product.createdAt).toLocaleDateString("he-IL")}`}
          </span>
        </div>
        <div className="col text-center">
          <i className="bi bi-person-fill" />
          <span>{`${product.createdBy?.name || "Unknown"}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
