import Navbar from "./Navbar"
import Header from "./Header"
import Footer from "./Footer"
import CartList from './CartList'

const Cart = ({ cart }) => {

  return (
    <div className="cart">
      <Navbar cart={cart} />
      <Header />
      {cart.items.length ? <CartList /> : <h3>There's nothing in your cart</h3>}
      <Footer />
    </div>
  )
}

export default Cart
