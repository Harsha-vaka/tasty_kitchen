import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Oval} from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import FoodItems from '../FoodItems'
import SomethingWentWrong from '../SomethingWentWrong'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const RestaurantDetails = () => {
  const [restaurantData, setRestaurantData] =
    useState(null)

  const [apiStatus, setApiStatus] = useState(
    apiStatusConstants.initial,
  )

  const {id} = useParams()

  useEffect(() => {
    getRestaurantDetails()
  }, [])

  const getRestaurantDetails = async () => {
    setApiStatus(
      apiStatusConstants.inProgress,
    )

    const jwtToken =
      Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(
      url,
      options,
    )

    const data = await response.json()

    if (response.ok) {
      setRestaurantData(data)

      setApiStatus(
        apiStatusConstants.success,
      )
    } else {
      setApiStatus(
        apiStatusConstants.failure,
      )
    }
  }

  const renderLoadingView = () => (
    <div
      testid="restaurant-details-loader"
      className="loader-container"
    >
      <Oval
        color="gold"
        height={50}
        width={50}
      />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrong />
  )

  const renderSuccessView = () => (
    <>
      <div className="restaurant-banner-section">
        <img
          src={restaurantData.image_url}
          alt="restaurant"
          className="restaurant-banner"
        />

        <div className="restaurant-content">
          <h1>{restaurantData.name}</h1>

          <p>{restaurantData.cuisine}</p>

          <p>{restaurantData.location}</p>

          <div className="rating-cost-container">
            <div>
              <div className="restaurant-rating">
                <FaStar className="star" />

                <p>
                  {
                    restaurantData.rating
                  }
                </p>
              </div>

              <p>
                {
                  restaurantData.reviews_count
                }{' '}
                Ratings
              </p>
            </div>

            <hr className="vertical-line" />

            <div>
              <h1>
                ₹{' '}
                {
                  restaurantData.cost_for_two
                }
              </h1>

              <p>Cost for two</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="food-items-list">
        {restaurantData.food_items.map(
          each => (
            <FoodItems
              key={each.id}
              foodDetails={each}
            />
          ),
        )}
      </ul>
    </>
  )

  const renderRestaurantDetails =
    () => {
      switch (apiStatus) {
        case apiStatusConstants.success:
          return renderSuccessView()

        case apiStatusConstants.failure:
          return renderFailureView()

        case apiStatusConstants.inProgress:
          return renderLoadingView()

        default:
          return null
      }
    }

  return (
    <>
      <Header />

      <div className="restaurant-details-container">
        {renderRestaurantDetails()}
      </div>

      <Footer />
    </>
  )
}

export default RestaurantDetails