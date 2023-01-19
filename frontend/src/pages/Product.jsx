import DeleteModal from "../components/Modals/DeleteModal";
import api from "../api";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Product(props) {
  const params = useLocation();

  const product = params.state?.product;
  const isNew = !product;

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [ratings, setRatings] = useState(product?.ratings || "");
  const [images, setImages] = useState(
    product?.images || [
      {
        url: "",
      },
    ]
  );
  const [category, setCategory] = useState(product?.category || "");

  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  const renderCategoryOptions = () => {
    const options = [];

    for (const key in Category) {
      options.push(
        <option key={key} value={Category[key]}>
          {key}
        </option>
      );
    }

    return options;
  };

  const handleSubmit = () => {
    const data = {
      name,
      description,
      price,
      ratings,
      images,
      category,
    };

    if (isNew) {
      api.Product.createProduct(data);
    } else {
      api.Product.updateProduct(product._id, data);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalShown(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        height: "100%",
        border: "2px solid black",
      }}
    >
      {!isNew && (
        <DeleteModal
          productId={product._id}
          isShown={isDeleteModalShown}
          setIsShown={setIsDeleteModalShown}
        />
      )}
      <div>
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="form-control"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            className="form-control"
            placeholder="Enter description"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            type="number"
            className="form-control"
            placeholder="Enter Price"
          />
        </div>
        <div className="form-group">
          <label>Ratings</label>
          <select
            value={ratings}
            onChange={(event) => {
              setRatings(event.target.value);
            }}
            className="form-control"
          >
            <option hidden>Choose Ratings</option>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </div>
        <div className="form-group">
          <label>Images</label>
          <input
            value={images[0].url}
            onChange={(event) => {
              setImages([{ url: event.target.value }]);
            }}
            className="form-control"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(event) => {
              console.log(event.target.value);
              setCategory(event.target.value);
            }}
            className="form-control"
          >
            <option hidden>Choose Category</option>
            {renderCategoryOptions()}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <button onClick={handleSubmit} className="btn btn-primary">
            {isNew ? `Create` : `Update`}
          </button>
          {!isNew && (
            <button
              onClick={handleDelete}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
