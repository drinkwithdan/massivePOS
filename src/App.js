import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import './App.css';
import Home from './components/Home';
import Cart from './components/Cart'
import itemsData from "./data/items-data";

const App = () => {
  const [products, setProducts] = useState(itemsData)
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
    subTotal: 0
  })

  useEffect(() => {
    // TO-DO:
    // Make API call to database to set Items,
    // Use dummy date in the meantime
  }, [])

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
    setCart({ items, ...totals })
  }

  // const removeFromCart = (item) => {
  //   const newCartItems = cart.items.filter((product) => product._id !== item._id)

  //   const totals = newCartItems.reduce((obj, item) => {
  //     obj.totalQuantity += item.cartQuantity
  //     obj.subTotal += item.price * item.cartQuantity
  //     return obj
  //   }, { totalQuantity: 0, subTotal: 0 })

  //   setCart({ items: newCartItems, ...totals })
  // }

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
        />} />

      </Routes>
    </div>
  );
}

export default App;
