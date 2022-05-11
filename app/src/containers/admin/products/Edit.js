import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function useProduct(id, cb = () => {}) {
  const [product, setProduct] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios({
        method: "POST",
        url: `https://react-app-ecomm.herokuapp.com/admin/products/${id}/edit`,
        headers: { Authorization: auth.user },
      });
      setProduct(response.data.product);
      cb(response.data.product);
    };
    getProduct();
  }, [auth.user, id]);
  return product;
}

export const Edit = () => {
  let navigate = useNavigate();

  let { id } = useParams();
  const setDefaultProduct = async (product) => {
    setTitle(product.title);
    setPrice(product.price);
  };
  let product = useProduct(id, setDefaultProduct);

  const auth = useAuth();

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();

  if (!product) {
    return <p>Loading</p>;
  }

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.append("title", title);
    data.append("price", price);
    if (image) {
      data.append("image", image);
    }

    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `https://react-app-ecomm.herokuapp.com/admin/products/${id}/edit`,
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
        <h1 className="subtitle">Edit a Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <input
              className="input"
              // defaultValue={product.title}
              value={title}
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
              // defaultValue={product.price}
              value={price}
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
          <button className="button is-primary">Edit</button>
        </form>
      </div>
    </div>
  );
};
