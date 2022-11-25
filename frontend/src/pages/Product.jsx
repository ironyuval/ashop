import { getBasename } from "../utils";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
/* name;
description;
price;
ratings;
images;
category;
createdBy;
createAt; */
function Product(props) {
  const params = useLocation();
  console.log(params);

  const product = params.state?.product;
  const isNew = !product;
  /*   const productId = product._id;

  useEffect(() => {
    if (productId) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setRatings(product.ratings);
      setImages(product.images);
      setCategory(product.category);
    }
  }, [productId]); */

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

  const handleSubmit = () => {
    const data = {
      name,
      description,
      price,
      ratings,
      images,
      category,
    };

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    isNew
      ? axios
          .post(`${getBasename()}/api/product/new`, data, config)
          .then((res) => {
            toast.success("new product created 😎 ");
          })
          .catch((err) => {
            toast.error("new product failed to created 😎 ");
            console.log("something went wrong");
            console.log(err);
          })
      : axios
          .put(`${getBasename()}/api/product/${product._id}`, data, config)
          .then((res) => {
            toast.success("exist product updated 😎 ");
          })
          .catch((err) => {
            toast.error("exist product failed to update 😎 ");
            console.log("something went wrong");
            console.log(err);
          });
  };

  const handleDelete = () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .delete(`${getBasename()}/api/product/${product._id}`, config)
      .then((res) => {
        toast.success("product deleted 😎 ");
      })
      .catch((err) => {
        toast.error("new product failed to delete 😎 ");
        console.log(err);
      });
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
              setCategory(event.target.value);
            }}
            className="form-control"
          >
            <option hidden>Choose Category</option>

            <option>Action</option>
            <option>Horror</option>
            <option>Comedy</option>
            <option>Sports</option>
            <option>Sci-Fi</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
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
