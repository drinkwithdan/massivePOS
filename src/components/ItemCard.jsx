import { useState, useEffect } from "react"

const ItemCard = ({ item, cart, addToCart }) => {

  // Counter state for each Item card
  const [counter, setCounter] = useState(0)

  // Current amount of items in cart
  const [cartCount, setCartCount] = useState(0)

  // Triggers an update of cartCount state when cart is altered
  useEffect(() => {

    // Updates local cartCount state
    const changeCartCount = () => {
      const cartItem = cart.items.find((product) => product.id === item.id)
      const newCartCount = cartItem.cartQuantity
      console.log(newCartCount);
      setCartCount(newCartCount)
    }
    
    // Only fire if there are items in cart
    if (cart.items.length > 0) {
      changeCartCount()
    }
  }, [cart])

  // Handle clicks on counter and add-to-cart buttons
  const handleButtonClick = (event) => {

    // Increment
    if (event.target.name === "plus") {
      setCounter(counter + 1)
     
    // Decrement (if more than 0)
    } else if (event.target.name === "minus" && counter > 0) {
      setCounter(counter - 1)
    
    // Call addToCart function (in App.js), passed through props
    } else if (event.target.name === "add" && counter > 0) {
      addToCart(item, counter)
      setCounter(0)
    }
  }

  return (
    <div className="card-item">

      <div className="card-image">
        <img src={item.imageURL} className="card-image-item" alt="Picture of item" />
      </div>

      <div className="card-body">

        <div className="card-title">

          <div>
            {item.name}
          </div>

          <div>
            ${item.price}
          </div>

        </div>

        <p>{item.description}</p>

        <div className="card-buttons-container">

          <div className="card-counter-buttons">

            <button
              className="counter-button"
              name="minus"
              onClick={handleButtonClick}
            >
              -
            </button>

            <span className="counter-text">{counter}</span>

            <button
              className="counter-button"
              name="plus"
              onClick={handleButtonClick}
            >
              +
            </button>

          </div>
          <button
            className="add-cart-button"
            name="add"
            onClick={handleButtonClick}
          >
            ADD TO CART
          </button>
        </div>
      </div>

    </div>
  )
}

export default ItemCard
