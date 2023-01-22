const MAX_LETTERS = 28;
import PropTypes from "prop-types";

const ListItem = ({
  item: product,
  isFavorite,
  toggleFavorite,
  handleClick,
  userPermission,
}) => {
  return (
    <div
      key={product._id}
      style={{ minWidth: "200px" }}
      className="card m-auto"
    >
      <div className="m-auto">
        <h5>
          {product.title.substring(0, MAX_LETTERS).trim()}
          {product.title.length > MAX_LETTERS ? "..." : null}
        </h5>
      </div>

      <div
        style={{
          backgroundImage: `url(${product.images[0].url})`,
          backgroundRepeat: "no-repeat",
          height: "200px",
          backgroundSize: "100% auto",
        }}
        src={product.images[0].url}
        className="card-img-top"
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
      <div>
        <span>
          {`Created at: ${new Date(product.createdAt).toLocaleDateString(
            "he-IL"
          )}`}
        </span>
      </div>
      <div>
        <span>{`Created by: ${product.createdBy.name}`}</span>
      </div>
    </div>
  );
};

export default ListItem;
