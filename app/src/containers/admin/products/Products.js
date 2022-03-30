import {Link, Navigate} from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useProducts } from "../../../hooks/useProducts";
const axios = require('axios');

export const Product = ({ product, getProducts = () => {} }) => {

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: 'POST',
        url: `http://localhost:4000/admin/products/${product.id}/delete`,
        headers: {Authorization: auth.user}
      })
      console.log(response)
      getProducts();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <tr>
    <td>{product.title}</td>
    <td>{product.price}</td>
    <td>
      <Link to={`/admin/products/${product.id}/edit`}>
        <button className="button is-link">
          Edit
        </button>
      </Link>
    </td>
    <td>
      <form onSubmit={handleSubmit} > 
        <button className="button is-danger">Delete</button>
      </form>
    </td>
  </tr>
  );
};


const ProductListAdmin = ({ products, getProducts }) => {
  return products.map((product) => <Product product={product} getProducts={getProducts} />);
};

export const AdminProducts = () => {

  const auth = useAuth();

  const signOut = () => {
    auth.signOut();
    <Navigate to={'/admin/signin'} />
  }

  const {products, getProducts} = useProducts();
  return (
    <>
    <section>
      <div className="control">
        <h1 className="subtitle">Products</h1>  
        <Link to="/admin/products/new" className="button is-primary">New Product</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <ProductListAdmin  products={products}  getProducts={getProducts} />
        </tbody>
      </table>
      <form onSubmit={signOut}>
          <button className="button is-link" >Sign Out</button>
      </form>
    </section>
    </>
  );
};