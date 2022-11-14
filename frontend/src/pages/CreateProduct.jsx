import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState("");

  const handleBizNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleBizDescriptionChange = (ev) => {
    setDescription(ev.target.value);
  };
  const handleBizAddressChange = (ev) => {
    setPrice(ev.target.value);
  };
  const handleBizPhoneChange = (ev) => {
    setCategory(ev.target.value);
  };
  const handleBizImageChange = (ev) => {
    setImage(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let dateToSend = {
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
    };
    if (bizImage) {
      dateToSend.bizImage = bizImage;
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
        <label htmlFor="bizNameInput" className="form-label">
          Biz Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="bizNameInput"
          value={bizName}
          onChange={handleBizNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bizDescriptionInput" className="form-label">
          Biz Description:
        </label>
        <input
          type="text"
          className="form-control"
          id="bizDescriptionInput"
          value={bizDescription}
          onChange={handleBizDescriptionChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bizAddressInput" className="form-label">
          Biz Address:
        </label>
        <input
          type="text"
          className="form-control"
          id="bizAddressInput"
          value={bizAddress}
          onChange={handleBizAddressChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bizPhoneInput" className="form-label">
          Biz Phone:
        </label>
        <input
          type="text"
          className="form-control"
          id="bizPhoneInput"
          value={bizPhone}
          onChange={handleBizPhoneChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bizImageInput" className="form-label">
          Biz Image (url):
        </label>
        <input
          type="text"
          className="form-control"
          id="bizImageInput"
          value={bizImage}
          onChange={handleBizImageChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CreateProduct;
