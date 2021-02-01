import { clientConstants } from "../constants";
import { clientService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers";

export const clientActions = {
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
  filterDisplayClients,
};

function addClient(
  userId,
  clientName,
  cnp,
  dateOfBirth,
  phoneNumber,
  address,
  from
) {
  return (dispatch) => {
    dispatch(request({ clientName }));

    clientService
      .addClient(userId, clientName, cnp, dateOfBirth, phoneNumber, address)
      .then(
        (client) => {
          dispatch(success(client));
          history.push(from);
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(clientName) {
    return { type: clientConstants.ADD_CLIENT_REQUEST, clientName };
  }
  function success(clientName) {
    return { type: clientConstants.ADD_CLIENT_SUCCESS, clientName };
  }
  function failure(error) {
    return { type: clientConstants.ADD_CLIENT_FAILURE, error };
  }
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
  return (dispatch) => {
    dispatch(request({ clientName }));

    clientService
      .updateClient(
        userId,
        id,
        clientName,
        cnp,
        dateOfBirth,
        phoneNumber,
        address
      )
      .then(
        (client) => {
          dispatch(success(client));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(clientName) {
    return { type: clientConstants.UPDATE_CLIENT_REQUEST, clientName };
  }
  function success(clientName) {
    return { type: clientConstants.UPDATE_CLIENT_SUCCESS, clientName };
  }
  function failure(error) {
    return { type: clientConstants.UPDATE_CLIENT_FAILURE, error };
  }
}

function deleteClient(clientId) {
  return (dispatch) => {
    dispatch(request({ clientId }));

    clientService.deleteClient(clientId).then(
      (response) => {
        dispatch(success(response, clientId));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(clientId) {
    return { type: clientConstants.DELETE_CLIENT_REQUEST, clientId };
  }
  function success(response, clientId) {
    return { type: clientConstants.DELETE_CLIENT_SUCCESS, response, clientId };
  }
  function failure(error) {
    return { type: clientConstants.DELETE_CLIENT_FAILURE, error };
  }
}

function getClientsForUser(userId) {
  return (dispatch) => {
    dispatch(request());

    clientService.getClientsForUser(userId).then(
      (clients) => dispatch(success(clients)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: clientConstants.GET_CLIENTS_FOR_USER_REQUEST };
  }
  function success(clients) {
    return { type: clientConstants.GET_CLIENTS_FOR_USER_SUCCESS, clients };
  }
  function failure(error) {
    return { type: clientConstants.GET_CLIENTS_FOR_USER_FAILURE, error };
  }
}

function getClientInformation(clientId) {
  return (dispatch) => {
    dispatch(request({ clientId }));

    clientService.getClientInformation(clientId).then(
      (client) => {
        dispatch(success(client));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(clientId) {
    return { type: clientConstants.GET_CLIENT_INFORMATION_REQUEST, clientId };
  }
  function success(clientId) {
    return { type: clientConstants.GET_CLIENT_INFORMATION_SUCCESS, clientId };
  }
  function failure(error) {
    return { type: clientConstants.GET_CLIENT_INFORMATION_FAILURE, error };
  }
}

function addCar(
  brand,
  model,
  dateOfBirthCar,
  fuelType,
  horsesPower,
  clientId,
  from
) {
  return (dispatch) => {
    dispatch(request({ clientId }));

    clientService
      .addCar(brand, model, dateOfBirthCar, fuelType, horsesPower, clientId)
      .then(
        (client) => {
          dispatch(success(client));
          history.push(from);
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(clientId) {
    return { type: clientConstants.ADD_CLIENT_CAR_REQUEST, clientId };
  }
  function success(clientId) {
    return { type: clientConstants.ADD_CLIENT_CAR_SUCCESS, clientId };
  }
  function failure(error) {
    return { type: clientConstants.ADD_CLIENT_CAR_FAILURE, error };
  }
}

function updateCar(id, brand, model, dateOfBirthCar, fuelType, horsesPower) {
  return (dispatch) => {
    dispatch(request({ id }));

    clientService
      .updateCar(id, brand, model, dateOfBirthCar, fuelType, horsesPower)
      .then(
        (response) => {
          dispatch(success(response));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(id) {
    return { type: clientConstants.UPDATE_CLIENT_CAR_REQUEST, id };
  }
  function success(id) {
    return { type: clientConstants.UPDATE_CLIENT_CAR_SUCCESS, id };
  }
  function failure(error) {
    return { type: clientConstants.UPDATE_CLIENT_CAR_FAILURE, error };
  }
}

function deleteCar(carId) {
  return (dispatch) => {
    dispatch(request({ carId }));

    clientService.deleteCar(carId).then(
      (response) => {
        dispatch(success(response, carId));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(carId) {
    return { type: clientConstants.DELETE_CLIENT_CAR_REQUEST, carId };
  }
  function success(response, carId) {
    return { type: clientConstants.DELETE_CLIENT_CAR_SUCCESS, response, carId };
  }
  function failure(error) {
    return { type: clientConstants.DELETE_CLIENT_CAR_FAILURE, error };
  }
}

function updateVisit(carId, id, cost, dateOfVisit, issues) {
  return (dispatch) => {
    dispatch(request({ id }));

    clientService.updateVisit(carId, id, cost, dateOfVisit, issues).then(
      (response) => {
        dispatch(success(carId, id, cost, dateOfVisit, issues));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: clientConstants.UPDATE_CLIENT_VISIT_REQUEST, id };
  }
  function success(carId, id, cost, dateOfVisit, issues) {
    return {
      type: clientConstants.UPDATE_CLIENT_VISIT_SUCCESS,
      updatedVisit: { carId, id, cost, dateOfVisit, issues },
    };
  }
  function failure(error) {
    return { type: clientConstants.UPDATE_CLIENT_VISIT_FAILURE, error };
  }
}

function deleteVisit(visitId) {
  return (dispatch) => {
    dispatch(request({ visitId }));

    clientService.deleteVisit(visitId).then(
      (response) => {
        dispatch(success(response, visitId));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(visitId) {
    return { type: clientConstants.DELETE_CLIENT_VISIT_REQUEST, visitId };
  }
  function success(response, visitId) {
    return {
      type: clientConstants.DELETE_CLIENT_VISIT_SUCCESS,
      response,
      visitId,
    };
  }
  function failure(error) {
    return { type: clientConstants.DELETE_CLIENT_VISIT_FAILURE, error };
  }
}

function addVisit(cost, dateOfVisit, issues, carId, clientId, from) {
  return (dispatch) => {
    dispatch(request({ carId }));

    clientService.addVisit(cost, dateOfVisit, issues, carId, clientId).then(
      (client) => {
        dispatch(success(client));
        history.push(from);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(clientId) {
    return { type: clientConstants.ADD_CLIENT_CAR_VISIT_REQUEST, clientId };
  }
  function success(clientId) {
    return { type: clientConstants.ADD_CLIENT_CAR_VISIT_SUCCESS, clientId };
  }
  function failure(error) {
    return { type: clientConstants.ADD_CLIENT_CAR_VISIT_FAILURE, error };
  }
}

function filterDisplayClients(newDisplayClientList) {
  return (dispatch) => {
    dispatch(success(newDisplayClientList));
  };

  function success(newDisplayClientList) {
    return {
      type: clientConstants.FILTER_DISPLAY_CLIENT_LIST,
      newDisplayClientList,
    };
  }
}
