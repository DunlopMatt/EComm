import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config";

export const Signin = () => {
  const auth = useAuth();

  let navigate = useNavigate();
  const [formValue, setformValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/signin",
        data: {
          email: formValue.email,
          password: formValue.password,
        },
        headers: { "Content-Type": "application/json" },
      });
      let userId = response.data?.user?.id;
      let errorsObj = response.data?.errors;
      if (userId) {
        auth.login(userId);
        navigate("/admin/products");
      }

      if (errorsObj) {
        alert("Email or Password not valid");
      }
      return userId;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-one-quarter">
          <form onSubmit={handleSubmit}>
            <h1 className="title">Sign in</h1>
            <div className="field">
              <label className="label">Email</label>
              <input
                required
                className="input"
                placeholder="Email"
                value={formValue.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input
                required
                className="input"
                placeholder="Password"
                value={formValue.password}
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="button is-primary">
              Submit
            </button>
          </form>
          <Link to="/admin/signup">Need an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
