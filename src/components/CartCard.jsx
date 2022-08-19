const CartCard = ({ item }) => {
  return (
    <div className="cart-card">
      <div className="cart-card-text">
        <div>
          {item.name} ({item.cartQuantity} in cart)
        </div>
        <div>
          ${(item.price * item.cartQuantity).toFixed(2)}
        </div>
      </div>
      <div className="cart-card-delete">
        <button>REMOVE</button>
      </div>
    </div>
  )
}

export default CartCard