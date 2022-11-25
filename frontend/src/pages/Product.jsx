import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
/* name;
description;
price;
ratings;
images;
category;
createdBy;
createAt; */
function Product(props) {
  const [name, setName] = useState("Comics Name");
  const [description, setDescription] = useState("Description");
  const [price, setPrice] = useState("25.99");
  const [ratings, setRatings] = useState("4");
  const [images, setImages] = useState(
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQHvmDqFZZzFng0EqOlrYjdh_xKtIjMY-H3vi3SzwAoFTjEZgyt"
  );
  const [category, setCategory] = useState("Action");

  const handleSubmit = () => {
    const data = {
      name,
      description,
      price,
      ratings,
      images,
      category,
    };

    axios
      .post("/product", data)
      .then((res) => {
        toast("new product created 😎 ");
      })
      .catch((err) => {
        console.log("something want wrong");
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
            value={images}
            onChange={(event) => {
              setImages(event.target.value);
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
            <option>Action</option>
            <option>Horror</option>
            <option>Comedy</option>
            <option>Sports</option>
            <option>Sci-Fi</option>
          </select>
        </div>

        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Product;
