import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clientActions } from "../../actions/client.actions";
import { VisitCard } from "../VisitCard";
import { history } from "../../helpers";

export function CarCard({
  clientName,
  clientId,
  id,
  brand,
  model,
  dateOfBirthCar,
  fuelType,
  horsesPower,
  visits,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [car, setCar] = useState(getInitialCarState());
  const dispatch = useDispatch();

  function getInitialCarState() {
    return {
      id,
      brand,
      model,
      dateOfBirthCar,
      fuelType,
      horsesPower,
      visits,
    };
  }

  const updateCar = () => {
    setSubmitted(true);

    if (
      car.brand &&
      car.model &&
      car.dateOfBirthCar &&
      car.fuelType &&
      car.horsesPower
    ) {
      setIsEditable(false);
      dispatch(
        clientActions.updateCar(
          car.id,
          car.brand,
          car.model,
          car.dateOfBirthCar,
          car.fuelType,
          car.horsesPower
        )
      );
    }
  };

  const cancelCar = () => {
    setCar(getInitialCarState);
    setIsEditable(false);
  };
  const editCar = () => {
    setIsEditable(true);
  };
  const deleteCar = () => {
    const feedback = confirm("Are you sure you want to delete this car?");
    if (feedback == true) {
      dispatch(clientActions.deleteCar(car.id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((car) => ({ ...car, [name]: value }));
  };

  return (
    <>
      <div className="card" style={{ marginBottom: "20px" }}>
        <EditableClientTitle
          handleChange={handleChange}
          label="brand"
          value={car.brand}
          isEditable={isEditable}
          submitted={submitted}
        />

        <div className="card-body">
          <div className="card-text">
            <EditableProperty
              handleChange={handleChange}
              label="model"
              value={car.model}
              isEditable={isEditable}
              submitted={submitted}
            />
            <EditableProperty
              handleChange={handleChange}
              label="dateOfBirthCar"
              value={car.dateOfBirthCar}
              isEditable={isEditable}
              submitted={submitted}
            />
            <EditableProperty
              handleChange={handleChange}
              label="horsesPower"
              value={car.horsesPower}
              isEditable={isEditable}
              submitted={submitted}
            />
            <EditableProperty
              handleChange={handleChange}
              label="fuelType"
              value={car.fuelType}
              isEditable={isEditable}
              submitted={submitted}
            />

            {isEditable ? (
              <div>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{ margin: "2px" }}
                  onClick={updateCar}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{ margin: "2px" }}
                  onClick={cancelCar}
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
                  onClick={editCar}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  style={{ margin: "2px" }}
                  onClick={deleteCar}
                >
                  delete
                </button>
              </div>
            )}

            <div className="card" style={{ flexDirection: "row" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  history.push("/AddVisit", {
                    carId: car.id,
                    carBrand: car.brand,
                    clientId: clientId,
                    clientName: clientName,
                  });
                }}
              >
                Add Visit
              </button>

              {visits &&
                visits.map((visit) => (
                  <VisitCard
                    key={visit.id}
                    carId={car.id}
                    id={visit.id}
                    cost={visit.cost}
                    dateOfVisit={visit.dateOfVisit}
                    issues={visit.issues}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EditableClientTitle({
  label,
  value,
  isEditable,
  submitted,
  handleChange,
}) {
  return isEditable ? (
    <input
      type="text"
      name={label}
      value={value}
      onChange={handleChange}
      className={"form-control" + (submitted && !value ? " is-invalid" : "")}
    />
  ) : (
    <div className="card-header">Brand: {value}</div>
  );
}

function EditableProperty({
  label,
  value,
  isEditable,
  submitted,
  handleChange,
}) {
  return (
    <div style={{ marginBottom: "5px" }}>
      <div style={{ fontWeight: "bold" }}>{label}</div>
      {isEditable ? (
        <input
          type="text"
          name={label}
          value={value}
          onChange={handleChange}
          className={
            "form-control" + (submitted && !value ? " is-invalid" : "")
          }
        />
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}
