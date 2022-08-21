import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import './App.css';
import Home from './components/Home';
import Cart from './components/Cart'
import Checkout from "./components/Checkout";
import Success from "./components/Success"
import Orders from "./components/Orders"
import itemsData from "./data/items-data";

const App = () => {
  const [products, setProducts] = useState(itemsData)
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
    subTotal: 0
  })



  const navigate = useNavigate()

  useEffect(() => {
    // TO-DO:
    // Make API call to database to set Items,
    // Use dummy date in the meantime
  }, [])

  // localStorage.removeItem("cart")
  //  localStorage.setItem("cart", JSON.stringify([]))

  // TO-DO: Check local storage and check if "cart exists"
  // If so, set cart state, otherwise create "cart"

  // // On mount check if a local cart exists and set cart state if so
  // useEffect(() => {

  //   const getLocalCart = () => {
  //     let localCart = []

  //     if (JSON.parse(localStorage.getItem("cart"))) {
  //       localCart = JSON.parse(localStorage.getItem("cart"))
  //       console.log("Local cart got");
  //     }
  //     return localCart
  //   }

  //   if (cart.items.length === 0) {
  //     const localCart = getLocalCart()
  //     setCart(localCart)
  //   }
  // }, [])

  // Adds item to cart with the current counter quantity
  const addToCart = (product, quantity) => {

    // Create Boolean to check if item is in cart
    const inCart = (product) => cart.items.find((item) => item.item_id === product.item_id)

    let items

    // If product is not available don't add to cart
    if (!product.active) return

    // If nothing in cart or product not in cart
    if (!cart.items.length || !inCart(product)) {

      // create items array with product added into array
      items = [...cart.items, { ...product, cartQuantity: quantity }]
    } else {

      // Otherwise increment the product amount by the quantity parameter
      items = cart.items.map((item) => {
        if (product.item_id !== item.item_id) return item
        return { ...item, cartQuantity: item.cartQuantity + quantity }
      })
    }

    // Update totals values in cart object to reflect above changes
    const totals = items.reduce((obj, item) => {

      // Total quantity of all items in cart
      obj.totalQuantity += item.cartQuantity

      // Subtotal of all items in cart
      obj.subTotal += item.price * item.cartQuantity
      return obj

      // Add into totals object
    }, { totalQuantity: 0, subTotal: 0 })

    // Spread totals key:values into cart object and set as new cart
    localStorage.setItem("cart", JSON.stringify({ items, ...totals }))
    setCart({ items, ...totals })
  }

  // Deletes the item pass in from the cart and resets the quantity and subTotal
  const removeFromCart = (item) => {
    const newCartItems = cart.items.filter((product) => product.item_id !== item.item_id)

    // Updates the totals values, removing the deleted item
    const totals = newCartItems.reduce((obj, item) => {
      obj.totalQuantity += item.cartQuantity
      obj.subTotal += item.price * item.cartQuantity
      return obj
      // Spreads those updated values into the newCartItems object
    }, { totalQuantity: 0, subTotal: 0 })

    // Sets the cart state with the new updated array
    localStorage.setItem("cart", JSON.stringify({ items: newCartItems, ...totals }))
    setCart({ items: newCartItems, ...totals })
  }

  // Take form from checkout and append items to orders state
  const handleCheckoutSubmit = (form) => {
    console.log(form)
    const newOrders = [...orders]
    newOrders.push({
      items: [...cart.items],
      name: form.name,
      contact: form.telephone
    })

    // TO-DO: Add new order to database

    // Set new orders state and empty cart
    setOrders(newOrders)
    setCart({
      items: [],
      totalQuantity: 0,
      subTotal: 0
    })
    console.log("Order added, cart cleared");
    navigate("/success")
  }

  return (
    <div className="App">
      <Routes>

        <Route path="/" element={products && <Home
          products={products}
          addToCart={addToCart}
          cart={cart}
        />}
        />

        <Route path="/cart" element={<Cart
          cart={cart}
          removeFromCart={removeFromCart}
        />} />

        <Route path="/checkout" element={<Checkout cart={cart} handleCheckoutSubmit={handleCheckoutSubmit} />} />

        <Route path="/success" element={<Success cart={cart} />} />

        <Route path="/orders" element={<Orders orders={orders} />} />

      </Routes>
    </div>
  );
}

export default App;
