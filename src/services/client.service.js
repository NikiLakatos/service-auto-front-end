import config from "config";
import { authHeader } from "../helpers";

export const clientService = {
  addClient,
  getClientsForUser,
  deleteClient,
  updateClient,
  getClientInformation,
  addCar,
  updateCar,
  deleteVisit,
  updateVisit,
  deleteCar,
  addVisit,
};

function addClient(userId, clientName, cnp, dateOfBirth, phoneNumber, address) {
  const cnpNumberType = +cnp;
  const phoneNumberType = +phoneNumber;

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      clientName,
      cnp: cnpNumberType,
      dateOfBirth,
      phoneNumber: phoneNumberType,
      address,
    }),
  };

  return fetch(`${config.apiUrl}/api/clients/addnewclient`, requestOptions)
    .then(handleResponse)
    .then((client) => {
      return client;
    });
}

function addCar(brand, model, dateOfBirthCar, fuelType, horsesPower, clientId) {
  const horsesPowerNumberType = +horsesPower;

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      brand,
      model,
      dateOfBirthCar,
      fuelType,
      horsesPower: horsesPowerNumberType,
      clientId,
    }),
  };

  return fetch(`${config.apiUrl}/api/cars/addnewcar`, requestOptions)
    .then(handleResponse)
    .then((client) => {
      return client;
    });
}

function updateClient(
  userId,
  id,
  clientName,
  cnp,
  dateOfBirth,
  phoneNumber,
  address
) {
  const cnpNumberType = +cnp;
  const phoneNumberType = +phoneNumber;

  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      clientName,
      cnp: cnpNumberType,
      dateOfBirth,
      phoneNumber: phoneNumberType,
      address,
    }),
  };

  console.log("REQUEST OPTIONS", requestOptions);
  console.log("REQUEST client id", id);

  http: return fetch(
    `${config.apiUrl}/api/clients/editclient/${id}`,
    requestOptions
  )
    .then(handleResponse)
    .then((client) => {
      return client;
    });
}

function deleteClient(clientId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `${config.apiUrl}/api/clients/deleteclient/${clientId}`,
    requestOptions
  )
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getClientsForUser(userId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/users/userdetails/${userId}`, requestOptions)
    .then(handleResponse)
    .then((client) => {
      return client;
    });
}

function getClientInformation(clientId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `${config.apiUrl}/api/clients/getclientbyid/${clientId}`,
    requestOptions
  )
    .then(handleResponse)
    .then((client) => {
      return client;
    });
}

function updateCar(id, brand, model, dateOfBirthCar, fuelType, horsesPower) {
  const horsesPowerNumberType = +horsesPower;

  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      brand,
      model,
      dateOfBirthCar,
      fuelType,
      horsesPower: horsesPowerNumberType,
    }),
  };

  return fetch(`${config.apiUrl}/api/cars/editcar/${id}`, requestOptions)
    .then(handleResponse)
    .then((client) => {
      return client;
    });
}

function deleteCar(carId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/api/cars/deletecar/${carId}`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    console.log("Response from getClientsForUser", response);
    console.log("DATA from getClientsForUser", data);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      console.log(error);
      return Promise.reject(error);
    }

    return data;
  });
}

function updateVisit(carId, id, cost, dateOfVisit, issues) {
  const costNumberType = +cost;

  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      carId,
      id,
      dateOfVisit,
      issues,
      cost: costNumberType,
    }),
  };

  return fetch(`${config.apiUrl}/api/visits/editvisit/${id}`, requestOptions)
    .then(handleResponse)
    .then((client) => {
      return client;
    });
}

function deleteVisit(visitId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `${config.apiUrl}/api/visits/deletevisit/${visitId}`,
    requestOptions
  )
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function addVisit(cost, dateOfVisit, issues, carId, clientId) {
  const costStringType = parseInt(cost).toFixed(2);
  const costDecimalType = Number(costStringType);

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      cost: costDecimalType,
      dateOfVisit,
      issues,
      carId,
      clientId,
    }),
  };

  console.log("BODY----->", requestOptions.body);

  return fetch(`${config.apiUrl}/api/visits/addnewvisit`, requestOptions)
    .then(handleResponse)
    .then((client) => {
      return client;
    });
}
