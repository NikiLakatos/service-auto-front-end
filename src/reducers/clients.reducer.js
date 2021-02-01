import { clientConstants } from "../constants";

export function clients(state = {}, action) {
  switch (action.type) {
    case clientConstants.FILTER_DISPLAY_CLIENT_LIST:
      return {
        ...state,
        displayedClients: action.newDisplayClientList,
      };

    // GET CLIENTS FOR USER
    case clientConstants.GET_CLIENTS_FOR_USER_REQUEST:
      return {
        loading: true,
      };
    case clientConstants.GET_CLIENTS_FOR_USER_SUCCESS:
      return {
        items: action.clients[0].clients,
        displayedClients: action.clients[0].clients,
      };

    case clientConstants.GET_CLIENTS_FOR_USER_FAILURE:
      return {
        items: [...state.items],
        error: action.error,
      };

    // ADD CLIENT
    case clientConstants.ADD_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.ADD_CLIENT_SUCCESS:
      return {
        ...state,
      };
    case clientConstants.ADD_CLIENT_FAILURE:
      return {
        error: action.error,
      };

    // UPDATE CLIENT
    case clientConstants.UPDATE_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
      };
    case clientConstants.UPDATE_CLIENT_FAILURE:
      return {
        error: action.error,
      };

    // ADD CAR
    case clientConstants.ADD_CLIENT_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.ADD_CLIENT_CAR_SUCCESS:
      return {
        ...state,
      };
    case clientConstants.ADD_CLIENT_CAR_FAILURE:
      return {
        error: action.error,
      };

    // UPDATE CAR
    case clientConstants.UPDATE_CLIENT_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.UPDATE_CLIENT_CAR_SUCCESS:
      return {
        ...state,
      };
    case clientConstants.UPDATE_CLIENT_CAR_FAILURE:
      return {
        error: action.error,
      };

    // DELETE CAR
    case clientConstants.DELETE_CLIENT_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.DELETE_CLIENT_CAR_SUCCESS:
      const newCarsArrayDeletedCar = [...state.clientDetails.cars].filter(
        (car) => car.id !== action.carId
      );
      return {
        ...state,
        clientDetails: {
          ...state.clientDetails,
          cars: newCarsArrayDeletedCar,
        },
      };
    case clientConstants.DELETE_CLIENT_CAR_FAILURE:
      return {
        error: action.error,
      };

    // DELETE CLIENT
    case clientConstants.DELETE_CLIENT_CAR_FAILURE:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.DELETE_CLIENT_SUCCESS:
      const newItemsDeleteClient = [...state.items].filter(
        (item) => item.id !== action.clientId
      );
      console.log("CCCCCCCCCCCCCCCCCCCC", newItemsDeleteClient);
      return {
        items: newItemsDeleteClient,
      };
    case clientConstants.DELETE_CLIENT_FAILURE:
      return {
        error: action.error,
      };

    // GET CLIENT INFORMATION
    case clientConstants.GET_CLIENT_INFORMATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.GET_CLIENT_INFORMATION_SUCCESS:
      const clientInformation = action.clientId[0];
      const newStateClientUpdate = state;
      delete newStateClientUpdate.loading;
      return {
        ...newStateClientUpdate,
        clientDetails: {
          cars: clientInformation.cars,
          visits: clientInformation.visits,
        },
      };
    case clientConstants.GET_CLIENT_INFORMATION_FAILURE:
      return {
        error: action.error,
      };

    // ADD VISIT
    case clientConstants.ADD_CLIENT_CAR_VISIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.ADD_CLIENT_CAR_VISIT_SUCCESS:
      return {
        ...state,
      };
    case clientConstants.ADD_CLIENT_CAR_VISIT_FAILURE:
      return {
        error: action.error,
      };

    // UPDATE VISIT
    case clientConstants.UPDATE_CLIENT_VISIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.UPDATE_CLIENT_VISIT_SUCCESS:
      const updatedVisits = [...state.clientDetails.visits];
      console.log;
      const updatedVisit = updatedVisits.find(
        (visit) => visit.id === action.updatedVisit.id
      );
      updatedVisit.cost = action.updatedVisit.cost;
      updatedVisit.dateOfVisit = action.updatedVisit.dateOfVisit;
      updatedVisit.issues = action.updatedVisit.issues;
      return {
        ...state,
        clientDetails: {
          ...state.clientDetails,
          visits: updatedVisits,
        },
      };
    case clientConstants.UPDATE_CLIENT_VISIT_FAILURE:
      return {
        error: action.error,
      };

    // DELETE VISIT
    case clientConstants.DELETE_CLIENT_VISIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.DELETE_CLIENT_VISIT_SUCCESS:
      const newVisitsArrayDeletedVisit = [...state.clientDetails.visits].filter(
        (visit) => visit.id !== action.visitId
      );
      return {
        ...state,
        clientDetails: {
          ...state.clientDetails,
          visits: newVisitsArrayDeletedVisit,
        },
      };
    case clientConstants.DELETE_CLIENT_VISIT_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}
