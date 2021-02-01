import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../actions";
import styles from "./LoginPage.scss";
function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(username, password, from));
    }
  }

  return (
    <div className={styles.loginPageContent}>
      <div
        className={`${"col-lg-3 offset-sm-0 jumbotron"} ${
          styles.formContentlogin
        }`}
      >
        <h2 style={{ color: "whitesmoke" }}>Login</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !username ? " is-invalid" : "")
              }
            />
            {submitted && !username && (
              <div className="invalid-feedback">Username is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !password ? " is-invalid" : "")
              }
            />
            {submitted && !password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            <Link
              to="/register"
              className="btn btn-link"
              style={{ color: "whitesmoke" }}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export { LoginPage };
