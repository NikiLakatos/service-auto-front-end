import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RegisterPage.scss";
import { userActions } from "../actions";

function RegisterPage() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    userRole: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (user.userName && user.password && user.userRole) {
      dispatch(userActions.register(user));
    }
  }

  return (
    <div className={styles.registerPageContent}>
      <div
        className={`${"col-lg-3 offset-sm-0 jumbotron "} ${
          styles.formContentRegister
        }`}
      >
        <h2 style={{ color: "whitesmoke" }}>Register</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Username</label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !user.userName ? " is-invalid" : "")
              }
            />
            {submitted && !user.userName && (
              <div className="invalid-feedback">userName is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !user.password ? " is-invalid" : "")
              }
            />
            {submitted && !user.password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>
              UserRole (e.g must be admin or mechanic)
            </label>
            <input
              type="text"
              name="userRole"
              value={user.userRole}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !user.userRole ? " is-invalid" : "")
              }
            />
            {submitted && !user.userRole && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            <Link
              to="/login"
              className="btn btn-link"
              style={{ color: "whitesmoke" }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export { RegisterPage };
