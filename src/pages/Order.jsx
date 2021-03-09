import { useHistory, Link } from "react-router-dom"
function Order() {
  const history = useHistory()
  const order = history.location.state.data
  console.log(order)
  return order ? (
    <div className="mt-10 text-lg">
      <div className="text-xl">Ваш заказ принят. </div>
      <div>Номер заказа: {order.order_id}</div>
      <div>На адрес: {order.order_req.addresses[0].address}</div>
      <Link className="text-blue-600" to="/">
        Вернуться на главную
      </Link>
    </div>
  ) : (
    <div>
      Заказ не принят.
      <Link className="text-blue-600" to="/">
        Вернуться на главную
      </Link>
    </div>
  )
}

export default Order
