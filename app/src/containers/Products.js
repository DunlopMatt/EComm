import { Banner } from "../components/Banner";
import { useProducts } from "../hooks/useProducts";

const Product = ({ product }) => {
  return (
    <div className="column is-one-quarter">
      <div className="card product-card">
        <figure>
          <img src={`data:image/png;base64, ${product.image}`} alt="" />
        </figure>
        <div className="card-content">
          <h3 className="subtitle">${product.title}</h3>
          <h5>${product.price}</h5>
        </div>
        <footer className="card-footer">
          <form action="/cart/products" method="POST">
            <input hidden value={product.id} name="productId" />
            <button className="button has-icon is-inverted">
              <i className="fa fa-shopping-cart"></i> Add to cart
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

const ProductList = ({ products }) => {
  return products.map((product) => <Product product={product} />);
};

export const Products = () => {
  const products = useProducts();

  return (
    <>
      <Banner />
      <section>
        <div className="container">
          <div className="columns">
            <div className="column "></div>
            <div className="column is-four-fifths">
              <div>
                <h2 className="title text-center">Featured Items</h2>
                <div className="columns products">
                  <ProductList products={products} />
                </div>
              </div>
            </div>
            <div className="column "></div>
          </div>
        </div>
      </section>
    </>
  );
};
