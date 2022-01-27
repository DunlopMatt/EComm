export const Nav = () => {
  return (
    <nav>
      <div className="container navbar-container">
        <div>
          <a href="/">
            <h3 className="title">EComm Shop</h3>
          </a>
        </div>
        <div className="navbar-item">
          <div className="navbar-buttons">
            <div className="navbar-item">
              <a href="/">
                <i className="fa fa-star"></i> Products
              </a>
            </div>
            <div className="navbar-item">
              <a href="/cart">
                <i className="fa fa-shopping-cart"></i> Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
