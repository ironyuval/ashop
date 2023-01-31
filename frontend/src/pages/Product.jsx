import DeleteModal from "../components/Modals/product/DeleteModal";
import api from "../api";
import { Genres, Roles } from "../server-shared/types";
import Diagonal from "../components/GridList/Diagonal";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Product(props) {
  const params = useLocation();

  const product = params.state?.product;
  const isNew = !product;

  const user = useSelector((state) => state.core.user);

  const showEdit =
    user.role === Roles.Master ||
    (user.role === Roles.Admin && product.createdBy._id === user.id);

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [rating, setRating] = useState(product?.rating || 0);
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

    for (const key of Object.keys(Genres)) {
      options.push(
        <option key={key} value={key}>
          {Genres[key]}
        </option>
      );
    }

    return options;
  };

  const handleSubmit = async () => {
    try {
      const data = {
        title,
        description,
        price,
        rating,
        images,
        genre,
      };

      console.log(data);

      if (isNew) {
        await api.Product.createProduct(data);
        toast.success("Product created successfully");
      } else {
        await api.Product.updateProduct(product._id, data);
        toast.success("Product updated successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalShown(true);
  };

  return (
    <div
      className="d-block d-lg-flex align-items-center h-100 fs-5"
      style={{ position: "relative", overflowY: "scroll" }}
    >
      <div
        style={{
          backgroundImage: `url(${images[0].url})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
          filter: "blur(50px)",
        }}
      />
      <div className="mt-2 mb-2 m-auto">
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
            height: "600px",
          }}
          className="row m-auto"
        >
          <div className="col-12 col-lg-6 m-auto">
            <div
              className="m-auto"
              style={{
                backgroundColor: "black",
                backgroundImage: `url(${images[0].url})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "400px",
                aspectRatio: 2 / 3,
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

          <div
            style={{ width: "400px", backgroundColor: "rgba(0,0,0,0.3)" }}
            className="rounded-3 col-12 col-lg-6 m-auto d-flex flex-column h-100 justify-content-between text-white"
          >
            <div className="form-group">
              <label>Title</label>
              <input
                disabled={!showEdit}
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                className="form-control"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                disabled={!showEdit}
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
                  disabled={!showEdit}
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
                  disabled={!showEdit}
                  value={rating}
                  onChange={(event) => {
                    setRating(parseInt(event.target.value));
                  }}
                  className="form-control"
                >
                  <option value={0}>Choose Rating</option>
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                disabled={!showEdit}
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
                disabled={!showEdit}
                value={genre}
                onChange={(event) => {
                  console.log(event.target.value);
                  setGenre(event.target.value);
                }}
                className="form-control"
              >
                <option hidden>Choose Genre</option>
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
