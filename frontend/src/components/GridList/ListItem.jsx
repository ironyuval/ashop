import { FiveStars } from "./../FiveStars";
import Diagonal from "./Diagonal";

const MAX_LETTERS = 40;

const ListItem = ({
  item: product,
  isFavorite,
  isInCart,
  toggleWishlist,
  toggleCart,
  handleClick,
  showEdit,
}) => {
  return (
    <div key={product._id} className="card m-auto text-center h-100">
      <div className="m-auto">
        {product.title.substring(0, MAX_LETTERS).trim()}
        {product.title.length > MAX_LETTERS ? "..." : null}
      </div>

      <div className="row mx-auto w-100 border-top border-2">
        <div className="col">{product.genre}</div>
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
          width: "100%",
          aspectRatio: 2 / 3,
          backgroundSize: "cover",
          position: "relative",
          overflow: "hidden",
        }}
        src={product.images[0].url}
        alt="image"
      >
        {/*         <Diagonal text={"test"} />
         */}{" "}
      </div>

      <div className="btn-group">
        <button
          onClick={handleClick}
          type="button"
          className="btn btn color-dark-blue rounded-0"
        >
          <i className={`bi ${showEdit ? "bi-pen" : "bi-info-circle"}`}></i>
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
      <div className="row mx-auto w-100">
        <div className="col text-center p-0">
          <span>
            {`${new Date(product.createdAt).toLocaleDateString("he-IL")}`}
          </span>
        </div>
        <div className="col text-center p-0">
          <i className="bi bi-person-fill" />
          <span>{`${product.createdBy?.name || "Unknown"}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
