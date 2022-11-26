import { getBasename } from "../utils";
import { getStorageToken } from "../redux/slice";
import { toast } from "react-toastify";
import axios from "axios";

export const handleCreateProduct = (data) => {
  const config = {
    headers: { Authorization: `Bearer ${getStorageToken()}` },
  };

  axios
    .post(`${getBasename()}/api/product/new`, data, config)
    .then((res) => {
      toast.success("new product created 😎 ");
    })
    .catch((err) => {
      toast.error("new product failed to created 😎 ");
      console.log("something went wrong");
      console.log(err);
    });
};

export const handleUpdateProduct = (productId, data) => {
  const config = {
    headers: { Authorization: `Bearer ${getStorageToken()}` },
  };
  axios
    .put(`${getBasename()}/api/product/${productId}`, data, config)
    .then((res) => {
      toast.success("exist product updated 😎 ");
    })
    .catch((err) => {
      toast.error("exist product failed to update 😎 ");
      console.log("something went wrong");
      console.log(err);
    });
};
