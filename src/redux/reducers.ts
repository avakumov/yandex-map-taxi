import { order, SET_MAP_API } from "./constants"

type LoginAction = { type: string; payload: any }

const initTaxiState = {
  mapApi: null,
}

export function taxiReducer(state = initTaxiState, action: LoginAction) {
  switch (action.type) {
    case order.ORDER_REQUEST:
      return {
        ...state,
        isLoadingOrder: true,
        errorLoadingOrder: "",
      }
    case order.ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isLoadingOrder: false,
        errorLoadingOrder: "",
      }
    case order.ORDER_FAILURE:
      return {
        ...state,
        isLoadingOrder: false,
        errorLoadingOrder: action.payload,
      }
    case SET_MAP_API:
      return {
        ...state,
        mapApi: action.payload,
      }
    default:
      return state
  }
}
