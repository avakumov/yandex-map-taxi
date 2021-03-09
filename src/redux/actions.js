import { api } from "../api"
import { order, SET_MAP_API } from "./constants"

function getOrder(ord, history) {
  return (dispatch) => {
    dispatch(request())
    api.order(ord).then(
      (res) => {
        dispatch(success(res.data))
        history.push("/order")
      },
      (error) => dispatch(failure(error))
    )
  }

  function request() {
    return { type: order.ORDER_REQUEST }
  }
  function success(payload) {
    return { type: order.ORDER_SUCCESS, payload }
  }
  function failure(payload) {
    return { type: order.ORDER_FAILURE, payload }
  }
}

function setMapApi(api) {
  return { type: SET_MAP_API, payload: api }
}

export const taxiActions = {
  getOrder,
  setMapApi,
}
