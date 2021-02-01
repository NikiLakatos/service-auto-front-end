import React, { useState } from "react";
import styles from "./AddCar.scss";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../actions";
import { Link } from "react-router-dom";

export function AddCar(props) {
  const clientName = props.location.state.clientName;
  const clientId = props.location.state.clientId;
  const [car, setCar] = useState({
    brand: "",
    model: "",
    dateOfBirthCar: "",
    fuelType: "",
    horsesPower: 0,
    clientId: clientId,
  });

  const user = useSelector((state) => state.authentication.user);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setCar((car) => ({ ...car, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      car.brand &&
      car.model &&
      car.dateOfBirthCar &&
      car.fuelType &&
      car.horsesPower &&
      car.clientId
    ) {
      dispatch(
        clientActions.addCar(
          car.brand,
          car.model,
          car.dateOfBirthCar,
          car.fuelType,
          car.horsesPower,
          car.clientId,
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
        <h2 style={{ color: "whitesmoke" }}>Add new car for {clientName}</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Car brand</label>
            <input
              type="text"
              name="brand"
              value={car.brand}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !car.brad ? " is-invalid" : "")
              }
            />
            {submitted && !car.brand && (
              <div className="invalid-feedback">car brand is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>model</label>
            <input
              type="text"
              name="model"
              value={car.model}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !car.model ? " is-invalid" : "")
              }
            />
            {submitted && !car.model && (
              <div className="invalid-feedback">car model is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>dateOfBirthCar</label>
            <input
              type="date"
              name="dateOfBirthCar"
              value={car.dateOfBirthCar}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !car.dateOfBirthCar ? " is-invalid" : "")
              }
            />
            {submitted && !car.dateOfBirthCar && (
              <div className="invalid-feedback">dateOfBirthCar is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>fuelType</label>
            <input
              type="text"
              name="fuelType"
              value={car.fuelType}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !car.fuelType ? " is-invalid" : "")
              }
            />
            {submitted && !car.fuelType && (
              <div className="invalid-feedback">fuelType is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>horsesPower</label>
            <input
              type="text"
              name="horsesPower"
              value={car.horsesPower}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !car.horsesPower ? " is-invalid" : "")
              }
            />
            {submitted && !car.horsesPower && (
              <div className="invalid-feedback">Address is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Add Car</button>
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
