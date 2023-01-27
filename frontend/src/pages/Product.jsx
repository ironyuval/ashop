import DeleteModal from "../components/Modals/DeleteModal";
import api from "../api";
import { Genres } from "../server-shared/types";
import Diagonal from "../components/GridList/Diagonal";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Product(props) {
  const params = useLocation();

  const product = params.state?.product;
  const isNew = !product;

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [rating, setRatings] = useState(product?.rating || "");
  const [images, setImages] = useState(
    product?.images || [
      {
        url: "",
      },
    ]
  );
  const [genre, setGenre] = useState(product?.genre || "");

  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  const renderGenres = () => {
    const options = [];

    for (const key in Object.keys(Genres)) {
      options.push(
        <option key={key} value={Genres[key]}>
          {key}
        </option>
      );
    }

    return options;
  };

  const handleSubmit = () => {
    const data = {
      title,
      description,
      price,
      rating,
      images,
      genre,
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

  console.log(product);

  return (
    <div
      style={{ overflowY: "scroll" }}
      className="d-flex justify-content-center flex-column align-items-center h-100"
    >
      <div className="mt-2 mb-2 m-lg-auto h-100">
        {!isNew && (
          <DeleteModal
            productId={product._id}
            isShown={isDeleteModalShown}
            setIsShown={setIsDeleteModalShown}
          />
        )}
        <div
          style={{
            maxWidth: "992px",
          }}
          className="row m-auto"
        >
          <div className="col-12 col-lg-6 m-auto">
            <div
              className="text-center m-auto"
              style={{
                backgroundColor: "black",
                backgroundImage: `url(${images[0].url})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                aspectRatio: 2 / 3,
                height: "100%",
                width: "300px",
                position: "relative",
                overflow: "hidden",
                backgroundSize: "cover",
              }}
              src={images[0].url}
              alt="image"
            >
              <Diagonal text={"test"} />
            </div>
          </div>

          <div style={{ width: "300px" }} className="col-12 col-lg-6 m-auto">
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
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
            <div className="row">
              <div className="form-group col-6">
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
              <div className="form-group col-6">
                <label>Rating</label>
                <select
                  value={rating}
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
            </div>

            <div className="form-group">
              <label>Image</label>
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
              <label>Genre</label>
              <select
                value={genre}
                onChange={(event) => {
                  console.log(event.target.value);
                  setGenre(event.target.value);
                }}
                className="form-control"
              >
                <option hidden>Choose Category</option>
                {renderGenres()}
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
      </div>
    </div>
  );
}

export default Product;
