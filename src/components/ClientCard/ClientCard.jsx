import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { history } from "../../helpers";
import { clientActions } from "../../actions/client.actions";
import styles from "./ClientCard.scss";

export function ClientCard({
  client: { id, clientName, cnp, dateOfBirth, phoneNumber, address },
  userId,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const [client, setClient] = useState(getInitialClientState());

  function getInitialClientState() {
    return {
      userId,
      id,
      clientName,
      cnp,
      dateOfBirth,
      phoneNumber,
      address,
    };
  }

  const showClientDetails = () => {
    history.push("/client", { client });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((client) => ({ ...client, [name]: value }));
  };

  const editClient = () => {
    setIsEditable(true);
  };

  const cancelUpdateClient = () => {
    setClient(getInitialClientState);
    setIsEditable(false);
  };

  const deleteClient = () => {
    const feedback = confirm("Are you sure you want to delete this client?");
    if (feedback == true) {
      dispatch(clientActions.deleteClient(id));
    }
  };

  const updateClient = () => {
    setSubmitted(true);

    if (
      client.clientName &&
      client.cnp &&
      client.dateOfBirth &&
      client.phoneNumber &&
      client.address
    ) {
      setIsEditable(false);
      dispatch(
        clientActions.updateClient(
          client.userId,
          client.id,
          client.clientName,
          client.cnp,
          client.dateOfBirth,
          client.phoneNumber,
          client.address
        )
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="card" style={{ width: "20rem" }}>
        <div className="container-fluid">
          <EditableClientTitle
            isEditable={isEditable}
            submitted={submitted}
            handleChange={handleChange}
            label={"clientName"}
            value={client.clientName}
          />

          <div className="card-text">
            <EditableClientProperty
              isEditable={isEditable}
              submitted={submitted}
              handleChange={handleChange}
              label={"cnp"}
              value={client.cnp}
            />

            <EditableClientProperty
              isEditable={isEditable}
              submitted={submitted}
              handleChange={handleChange}
              label={"dateOfBirth"}
              value={client.dateOfBirth}
            />

            <EditableClientProperty
              isEditable={isEditable}
              submitted={submitted}
              handleChange={handleChange}
              label={"phoneNumber"}
              value={client.phoneNumber}
            />

            <EditableClientProperty
              isEditable={isEditable}
              submitted={submitted}
              handleChange={handleChange}
              label={"address"}
              value={client.address}
            />
          </div>
          {isEditable ? (
            <div>
              <button
                type="button"
                className="btn btn-outline-success"
                style={{ margin: "2px" }}
                onClick={updateClient}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                style={{ margin: "2px" }}
                onClick={cancelUpdateClient}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                className="btn btn-outline-info"
                style={{ margin: "2px" }}
                onClick={showClientDetails}
              >
                details
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ margin: "2px" }}
                onClick={editClient}
              >
                edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                style={{ margin: "2px" }}
                onClick={deleteClient}
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
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
    <h5 className="card-title">{value}</h5>
  );
}

function EditableClientProperty({
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
