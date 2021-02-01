import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clientActions } from "../../actions/client.actions";

export function VisitCard({ carId, id, cost, dateOfVisit, issues }) {
  console.log("CARRRRRR------>", carId);
  function getInitialVisitState() {
    return {
      id,
      cost,
      dateOfVisit,
      issues,
    };
  }

  const [isEditable, setIsEditable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visit, setVisit] = useState(getInitialVisitState());
  const dispatch = useDispatch();

  const updateVisit = () => {
    setSubmitted(true);

    if (visit.id && visit.cost && visit.dateOfVisit && visit.issues) {
      setIsEditable(false);
      dispatch(
        clientActions.updateVisit(
          carId,
          visit.id,
          visit.cost,
          visit.dateOfVisit,
          visit.issues
        )
      );
    }
  };

  const cancelVisit = () => {
    setVisit(getInitialVisitState);
    setIsEditable(false);
  };
  const editVisit = () => {
    setIsEditable(true);
  };
  const deleteVisit = () => {
    const feedback = confirm("Are you sure you want to delete this visit?");
    if (feedback == true) {
      dispatch(clientActions.deleteVisit(visit.id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisit((visit) => ({ ...visit, [name]: value }));
  };

  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <div className="card-body">
        <h6 className="card-title">
          {isEditable ? (
            <input
              type="text"
              name="dateOfVisit"
              value={visit.dateOfVisit}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !visit.dateOfVisit ? " is-invalid" : "")
              }
            />
          ) : (
            <div>Date of visit: {dateOfVisit}</div>
          )}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">
          {isEditable ? (
            <input
              type="text"
              name="cost"
              value={visit.cost}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !visit.cost ? " is-invalid" : "")
              }
            />
          ) : (
            <div>Const visit: {cost}$</div>
          )}
        </h6>
        <div className="card-text">
          {isEditable ? (
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
          ) : (
            <div>Issues: {issues}</div>
          )}
        </div>
      </div>

      {isEditable ? (
        <div>
          <button
            type="button"
            className="btn btn-outline-success"
            style={{ margin: "2px" }}
            onClick={updateVisit}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ margin: "2px" }}
            onClick={cancelVisit}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ margin: "2px" }}
            onClick={editVisit}
          >
            edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            style={{ margin: "2px" }}
            onClick={deleteVisit}
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
}
