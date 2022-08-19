import { Link } from "react-router-dom"
// import itemsData from "../data/items-data"
import ItemCard from "./ItemCard"

const ItemList = ({products, cart, addToCart}) => {

  const itemsList = products.map((item) => {
    return <ItemCard 
      key={item.id} 
      id={item.id} 
      item={item}
      cart={cart}
      addToCart={addToCart}
    />
  })

  return (
    <div className="itemlist">
      <div className="card-container">
        <h2>Add items to cart</h2>
        {products && itemsList}
        <button className="goto-cart-button">GO TO CART</button>
      </div>
    </div>
  )
}

export default ItemList
