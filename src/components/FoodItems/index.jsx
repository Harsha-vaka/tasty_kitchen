import {useEffect, useState} from 'react'

import {FaStar} from 'react-icons/fa'

import './index.css'

const FoodItems = props => {
  const {foodDetails} = props

  const [count, setCount] = useState(0)

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []

    const existingItem = cartData.find(each => each.id === foodDetails.id)

    if (existingItem) {
      setCount(existingItem.quantity)
    }
  }, [foodDetails.id])

  const updateLocalStorage = updatedCount => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []

    const existingItemIndex = cartData.findIndex(
      each => each.id === foodDetails.id,
    )

    if (updatedCount === 0) {
      const filteredData = cartData.filter(each => each.id !== foodDetails.id)

      localStorage.setItem('cartData', JSON.stringify(filteredData))

      return
    }

    if (existingItemIndex !== -1) {
      cartData[existingItemIndex] = {
        ...cartData[existingItemIndex],
        quantity: updatedCount,
      }
    } else {
      cartData.push({
        id: foodDetails.id,
        name: foodDetails.name,
        imageUrl: foodDetails.image_url,
        cost: foodDetails.cost,
        quantity: updatedCount,
      })
    }

    localStorage.setItem('cartData', JSON.stringify(cartData))
  }

  const onClickAdd = () => {
    const updatedCount = 1

    setCount(updatedCount)

    updateLocalStorage(updatedCount)
  }

  const onIncrement = () => {
    const updatedCount = count + 1

    setCount(updatedCount)

    updateLocalStorage(updatedCount)
  }

  const onDecrement = () => {
    const updatedCount = count - 1

    setCount(updatedCount)

    updateLocalStorage(updatedCount)
  }

  const renderAddButton = () => (
    <button type="button" className="add-btn" onClick={onClickAdd}>
      Add
    </button>
  )

  const renderCounterView = () => (
    <div className="counter-container">
      <button type="button" testid="decrement-count" onClick={onDecrement}>
        -
      </button>

      <p testid="active-count">{count}</p>

      <button type="button" testid="increment-count" onClick={onIncrement}>
        +
      </button>
    </div>
  )

  return (
    <li testid="foodItem" className="food-item">
      <img src={foodDetails.image_url} alt={foodDetails.name} />

      <div className="food-info">
        <h1 className="food-name">{foodDetails.name}</h1>

        <p className="food-price">{foodDetails.cost}</p>

        <div className="food-rating">
          <FaStar className="star" />

          <p>{foodDetails.rating}</p>
        </div>

        {count === 0 ? renderAddButton() : renderCounterView()}
      </div>
    </li>
  )
}

export default FoodItems
