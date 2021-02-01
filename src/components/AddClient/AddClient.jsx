import React, { useState } from "react";
import styles from "./AddClient.scss";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../actions";
import { Link } from "react-router-dom";

function AddClient() {
  const [client, setClient] = useState({
    clientName: "",
    cnp: 0,
    dateOfBirth: "",
    phoneNumber: 0,
    address: "",
  });

  const user = useSelector((state) => state.authentication.user);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setClient((client) => ({ ...client, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      client.clientName &&
      client.cnp &&
      client.dateOfBirth &&
      client.phoneNumber &&
      client.address
    ) {
      dispatch(
        clientActions.addClient(
          user.id,
          client.clientName,
          client.cnp,
          client.dateOfBirth,
          client.phoneNumber,
          client.address,
          { pathname: "/" }
        )
      );
    }
  };
  return (
    <div className={styles.contentAddClient}>
      <div
        className={`${"col-lg-3 offset-sm-0 jumbotron "} ${
          styles.formAddClientContent
        }`}
      >
        <h2 style={{ color: "whitesmoke" }}>Add new client</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Client name</label>
            <input
              type="text"
              name="clientName"
              value={client.clientName}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !client.clientName ? " is-invalid" : "")
              }
            />
            {submitted && !client.clientName && (
              <div className="invalid-feedback">clientName is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>CNP</label>
            <input
              type="number"
              min="0"
              name="cnp"
              value={client.cnp}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !client.cnp ? " is-invalid" : "")
              }
            />
            {submitted && !client.cnp && (
              <div className="invalid-feedback">CNP is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>DateOfBirth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={client.dateOfBirth}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !client.dateOfBirth ? " is-invalid" : "")
              }
            />
            {submitted && !client.dateOfBirth && (
              <div className="invalid-feedback">DateOfBirth is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={client.phoneNumber}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !client.phoneNumber ? " is-invalid" : "")
              }
            />
            {submitted && !client.phoneNumber && (
              <div className="invalid-feedback">PhoneNumber is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Address</label>
            <input
              type="text"
              name="address"
              value={client.address}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !client.phoneNumber ? " is-invalid" : "")
              }
            />
            {submitted && !client.address && (
              <div className="invalid-feedback">Address is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Add Client</button>
            <Link
              to="/"
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

export { AddClient };
