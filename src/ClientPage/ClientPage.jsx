import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clientActions } from "../actions";
import { CarCard } from "../components/CarCard";
import { history } from "../helpers";

export function ClientPage(props) {
  const client = props.location.state.client;
  const clientCarsAndVisits = useSelector(
    (state) => state.clients.clientDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clientActions.getClientInformation(client.id));
  }, []);

  return (
    <div>
      <div>
        <table className="table ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Client Name</th>
              <th scope="col">Date of birth</th>
              <th scope="col">CNP</th>
              <th scope="col">phone number</th>
              <th scope="col">Address</th>
              <th scope="col">History about client</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{client.clientName}</td>
              <td>{client.dateOfBirth}</td>
              <td>{client.cnp}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.address}</td>
              <td>Imi pare rau ca nu pot face mai mult</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", marginLeft: "2rem" }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginBottom: "3rem", marginRight: "3rem" }}
          onClick={() => {
            history.push("/AddCar", {
              clientId: client.id,
              clientName: client.clientName,
            });
          }}
        >
          Add Car
        </button>
        <Link to="/">
          <button className="btn btn-primary">Go to Clients</button>
        </Link>
      </div>

      {clientCarsAndVisits &&
        clientCarsAndVisits.cars.map((car) => (
          <CarCard
            clientId={client.id}
            clientName={client.clientName}
            key={car.id}
            id={car.id}
            brand={car.brand}
            model={car.model}
            dateOfBirthCar={car.dateOfBirthCar}
            fuelType={car.fuelType}
            horsesPower={car.horsesPower}
            visits={clientCarsAndVisits.visits.filter(
              (visit) => visit.carId === car.id
            )}
          />
        ))}
    </div>
  );
}
