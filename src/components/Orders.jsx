const Order = (order) => {
  return (
    <div className="order">
      <h3>{order.name}</h3>
      <h3>{order.telephone}</h3>
      {order.items}
    </div>
  )
}

const Orders = ({ orders }) => {
  console.log(orders);
  const orderList = orders.map((order) => {
    return order
  })

  return (
    <div className="orders">
      <h1>Orders</h1>
      {orderList}
    </div>
  )
}

export default Orders