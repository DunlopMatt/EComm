import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <div className="container navbar-container">
        <div>
          <Link to="/">
            <h3 className="title">EComm Shop</h3>
          </Link>
        </div>
        <div className="navbar-item">
          <div className="navbar-buttons">
            <div className="navbar-item">
              <Link to="/">
                <i className="fa fa-star"></i> Products
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i> Cart
              </Link>
              <div className="navbar-item">
              <Link to="/admin/products">
                <i className="fa fa-star"></i> Admin
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
