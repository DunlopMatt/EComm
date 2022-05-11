import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

export const New = () => {
  const auth = useAuth();

  let navigate = useNavigate();

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.append("title", title);
    data.append("price", price);
    data.append("image", image);

    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "https://react-app-ecomm.herokuapp.com/admin/products/new",
        data: data,
        headers: {
          Authorization: auth.user,
          "content-type": "multipart/form-data",
        },
      });
      console.log(response);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <h1 className="subtitle">Create a Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <input
              className="input"
              placeholder="Title"
              id="title"
              onChange={(event) => {
                const { value } = event.target;
                setTitle(value);
              }}
            />
          </div>

          <div className="field">
            <label className="label">Price</label>
            <input
              className="input"
              placeholder="Price"
              id="price"
              onChange={(event) => {
                const { value } = event.target;
                setPrice(value);
              }}
            />
          </div>

          <div className="field">
            <label className="label">Image</label>
            <input
              type="file"
              id="image"
              accept=".jpg"
              onChange={(event) => {
                const image = event.target.files[0];
                setImage(image);
              }}
            />
          </div>
          <br />
          <button className="button is-primary">Create</button>
        </form>
      </div>
    </div>
  );
};
