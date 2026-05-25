import {useState} from 'react'
import {FaStar} from 'react-icons/fa'

import './index.css'

const FoodItems = props => {
  const {foodDetails} = props

  const [count, setCount] = useState(0)

  const increment = () => {
    const updatedCount = count + 1
    setCount(updatedCount)

    const cartData =
      JSON.parse(
        localStorage.getItem('cartData'),
      ) || []

    const existingItem = cartData.find(
      each => each.id === foodDetails.id,
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartData.push({
        id: foodDetails.id,
        name: foodDetails.name,
        imageUrl: foodDetails.image_url,
        cost: foodDetails.cost,
        quantity: 1,
      })
    }

    localStorage.setItem(
      'cartData',
      JSON.stringify(cartData),
    )
  }

  const decrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1)
    }
  }

  return (
    <li
      testid="foodItem"
      className="food-item"
    >
      <img
        src={foodDetails.image_url}
        alt={foodDetails.name}
      />

      <div className="food-info">
        <h1 className="food-name">
          {foodDetails.name}
        </h1>

        <p className="food-price">
          ₹ {foodDetails.cost}
        </p>

        <div className="food-rating">
          <FaStar className="star" />

          <p>{foodDetails.rating}</p>
        </div>

        <div className="counter-container">
          <button
            type="button"
            testid="decrement-count"
            onClick={decrement}
          >
            -
          </button>

          <p testid="active-count">
            {count}
          </p>

          <button
            type="button"
            testid="increment-count"
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>
    </li>
  )
}

export default FoodItems