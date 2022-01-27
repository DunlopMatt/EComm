export const Header = () => {
  return (
    <nav className="navbar navbar-top">
      <div className="container navbar-container">
        <div>
          <ul className="social">
            <li>
              <a href="">
                <i className="fa fa-phone"></i>+1 555 987 6543
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-envelope"></i> shop@myshop.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="social">
            <li>
              <a href="">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fab fa-dribbble"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fab fa-google-plus"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
