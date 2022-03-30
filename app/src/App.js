import "./App.css";
import { Nav } from "./components/Nav";
import { Header } from "./components/Header";
import { Products } from "./containers/Products";
import { Cart } from "./containers/Cart";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import { AdminProducts } from "./containers/admin/products/Products";
import { Signin } from "./containers/admin/auth/Signin";
import { Signup } from "./containers/admin/auth/Signup";
import { Edit } from "./containers/admin/products/Edit";
import { New } from "./containers/admin/products/New";
import { useAuth } from "./hooks/useAuth";

function App() {
  const Protect = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to={"/admin/signin"} />;
  };
  return (
    <div className="App">
      <header>
        <Header />
        <Nav />
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/admin/products"
            element={
              <Protect>
                <AdminProducts />
              </Protect>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <Protect>
                <Edit />
              </Protect>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <Protect>
                <New />
              </Protect>
            }
          />
          <Route path="/admin/signin" element={<Signin />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/signout" element={<Signin />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
