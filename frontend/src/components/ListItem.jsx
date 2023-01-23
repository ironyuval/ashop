import { FiveStars } from "./FiveStars";
import { toCapitilize } from "../utils/capitalize";

const MAX_LETTERS = 28;

const ListItem = ({
  item: product,
  isFavorite,
  toggleFavorite,
  handleClick,
  userPermission,
}) => {
  return (
    <div key={product._id} className="card m-auto text-center">
      <div style={{ height: "50px" }} className="d-flex">
        <div className="m-auto">
          {product.title.substring(0, MAX_LETTERS).trim()}
          {product.title.length > MAX_LETTERS ? "..." : null}
        </div>
      </div>

      <div className="row">
        <div className="col">{toCapitilize(product.genre)}</div>
        <div className="col">
          <FiveStars size={12} rating={product.rating} />
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${product.images[0].url})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "300px",
          backgroundSize: "cover",
        }}
        src={product.images[0].url}
        alt="..."
      />

      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">
          <i className="bi bi-pen"></i>
        </button>
        <button type="button" className="btn btn-secondary">
          <i className="bi bi-cart3"></i> {`${product.price}.00$`}
        </button>
        <button type="button" className="btn btn-secondary">
          <i className="bi bi-heart"></i>
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
          <span>{`${product.createdBy.name}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
