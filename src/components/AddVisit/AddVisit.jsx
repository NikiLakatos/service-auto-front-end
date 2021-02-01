import React, { useState } from "react";
import styles from "./AddVisit.scss";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../actions";
import { Link } from "react-router-dom";

export function AddVisit(props) {
  const carId = props.location.state.carId;
  const carBrand = props.location.state.carBrand;
  const clientId = props.location.state.clientId;
  const clientName = props.location.state.clientName;
  const [visit, setVisit] = useState({
    id: "",
    cost: 0,
    dateOfVisit: "",
    issues: "",
    carId,
    clientId,
  });

  const user = useSelector((state) => state.authentication.user);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setVisit((car) => ({ ...car, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (visit.cost && visit.dateOfVisit && visit.issues) {
      dispatch(
        clientActions.addVisit(
          visit.cost,
          visit.dateOfVisit,
          visit.issues,
          visit.carId,
          visit.clientId,
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
        <h2 style={{ color: "whitesmoke" }}>
          Add new visit for {clientName} and car {carBrand}
        </h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>Visit cost</label>
            <input
              type="number"
              name="cost"
              value={visit.cost}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !visit.cost ? " is-invalid" : "")
              }
            />
            {submitted && !visit.cost && (
              <div className="invalid-feedback">visit cost is required</div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>dateOfVisit</label>
            <input
              type="date"
              name="dateOfVisit"
              value={visit.dateOfVisit}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !visit.dateOfVisit ? " is-invalid" : "")
              }
            />
            {submitted && !visit.dateOfVisit && (
              <div className="invalid-feedback">
                visit dateOfVisit is required
              </div>
            )}
          </div>
          <div className="form-group">
            <label style={{ color: "whitesmoke" }}>issues</label>
            <input
              type="text"
              name="issues"
              value={visit.issues}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !visit.issues ? " is-invalid" : "")
              }
            />
            {submitted && !visit.dateOfBirth && (
              <div className="invalid-feedback">issues is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Add Visit</button>
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
