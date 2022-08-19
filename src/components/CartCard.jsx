const CartCard = ({ item }) => {
  return (
    <div className="cart-card">
      <p>{item.name}, {item.cartQuantity}</p>
      <p>${(item.price * item.cartQuantity).toFixed(2)}</p>
    </div>
  )
}

export default CartCard