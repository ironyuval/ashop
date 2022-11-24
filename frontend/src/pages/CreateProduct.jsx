import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState("");

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleDescriptionChange = (ev) => {
    setDescription(ev.target.value);
  };
  const handlePriceChange = (ev) => {
    setPrice(ev.target.value);
  };
  const handleCategoryChange = (ev) => {
    setCategory(ev.target.value);
  };
  const handleImageChange = (ev) => {
    setImage(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let dateToSend = {
      Name,
      Description,
      Address,
      Phone,
    };
    if (Image) {
      dateToSend.Image = Image;
    }
    axios
      .post("/cards", dateToSend)
      .then((data) => {
        toast("new card created 😎 ");
      })
      .catch((err) => {
        console.log("something want wrong");
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="NameInput" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="NameInput"
          value={Name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="DescriptionInput" className="form-label">
          Description:
        </label>
        <input
          type="text"
          className="form-control"
          id="DescriptionInput"
          value={Description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="PriceInput" className="form-label">
          Price:
        </label>
        <input
          type="text"
          className="form-control"
          id="PriceInput"
          value={Price}
          onChange={handlePriceChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="CategoryInput" className="form-label">
          Category:
        </label>
        <input
          type="text"
          className="form-control"
          id="CategoryInput"
          value={Category}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="ImageInput" className="form-label">
          Image (url):
        </label>
        <input
          type="text"
          className="form-control"
          id="ImageInput"
          value={Image}
          onChange={handleImageChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CreateProduct;
