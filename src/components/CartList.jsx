import CartCard from "./CartCard"

const CartList = ({ cart }) => {
  const cartList = cart.map((item) => {
    return <CartCard item={item} />
  })

  return (
    <div className="cart-list">
      <h3>Cart List</h3>
      {cartList}
    </div>
  )
}

export default CartList