import {useEffect, useState} from 'react'

import {Link} from 'react-router-dom'

import {
  FaRupeeSign,
  FaCheckCircle,
} from 'react-icons/fa'

import {HiOutlineMinusSm} from 'react-icons/hi'

import {BsPlus} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import CartEmpty from '../CartEmpty'

import './index.css'

const Cart = () => {
  const [cartItems, setCartItems] =
    useState([])

  const [
    paymentSuccess,
    setPaymentSuccess,
  ] = useState(false)

  useEffect(() => {
    const cartData =
      JSON.parse(
        localStorage.getItem('cartData'),
      ) || []

    setCartItems(cartData)
  }, [])

  const incrementQuantity = id => {
    const updatedCart = cartItems.map(
      each => {
        if (each.id === id) {
          return {
            ...each,
            quantity:
              each.quantity + 1,
          }
        }

        return each
      },
    )

    setCartItems(updatedCart)

    localStorage.setItem(
      'cartData',
      JSON.stringify(updatedCart),
    )

    window.dispatchEvent(
      new Event('storage'),
    )
  }

  const decrementQuantity = id => {
    const updatedCart = cartItems
      .map(each => {
        if (each.id === id) {
          return {
            ...each,
            quantity:
              each.quantity - 1,
          }
        }

        return each
      })
      .filter(
        each => each.quantity > 0,
      )

    setCartItems(updatedCart)

    localStorage.setItem(
      'cartData',
      JSON.stringify(updatedCart),
    )

    window.dispatchEvent(
      new Event('storage'),
    )
  }

  const onPlaceOrder = () => {
    setPaymentSuccess(true)

    localStorage.removeItem(
      'cartData',
    )

    window.dispatchEvent(
      new Event('storage'),
    )
  }

  const totalPrice = cartItems.reduce(
    (acc, each) =>
      acc +
      each.cost * each.quantity,
    0,
  )

  const renderPaymentSuccessView =
    () => (
      <div className="payment-success">
        <FaCheckCircle className="success-icon" />

        <h1>Payment Successful</h1>

        <p>
          Thank you for ordering.
          <br />
          Your payment is successfully
          completed.
        </p>

        <Link to="/">
          <button type="button">
            Go To Home Page
          </button>
        </Link>
      </div>
    )

  const renderCartView = () => (
    <div className="cart-container">
      <div className="cart-table">
        <div className="cart-header">
          <p>Item</p>

          <p>Quantity</p>

          <p>Price</p>
        </div>

        <ul>
          {cartItems.map(each => (
            <li
              data-testid="cartItem"
              className="cart-item"
              key={each.id}
            >
              <div className="cart-food-info">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                />

                <p>{each.name}</p>
              </div>

              <div className="quantity-controller">
                <button
                  type="button"
                  data-testid="decrement-quantity"
                  onClick={() =>
                    decrementQuantity(
                      each.id,
                    )
                  }
                >
                  <HiOutlineMinusSm />
                </button>

                <p data-testid="item-quantity">
                  {each.quantity}
                </p>

                <button
                  type="button"
                  data-testid="increment-quantity"
                  onClick={() =>
                    incrementQuantity(
                      each.id,
                    )
                  }
                >
                  <BsPlus />
                </button>
              </div>

              <p className="cart-price">
                <FaRupeeSign />

                {each.cost *
                  each.quantity}
                .00
              </p>
            </li>
          ))}
        </ul>

        <div className="total-section">
          <div className="order-total-container">
            <h1 className="order-total-text">
              Order Total :
            </h1>

            <p
              data-testid="total-price"
              className="total-price"
            >
              ₹{totalPrice}.00
            </p>
          </div>

          <button
            type="button"
            className="place-order-btn"
            onClick={onPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Header />

      {paymentSuccess ? (
        renderPaymentSuccessView()
      ) : cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        renderCartView()
      )}

      <Footer />
    </>
  )
}

export default Cart