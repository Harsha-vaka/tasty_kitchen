import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Oval} from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import AllRestaurants from '../AllRestaurants'
import RestaurantsHeader from '../RestaurantsHeader'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const SlickSlider = Slider.default || Slider

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = ({sortByOptions}) => {
  const [offers, setOffers] = useState([])
  const [restaurants, setRestaurants] =
    useState([])

  const [activePage, setActivePage] =
    useState(1)

  const [totalPages, setTotalPages] =
    useState(1)

  const [sortBy, setSortBy] =
    useState('Lowest')

  const [offersStatus, setOffersStatus] =
    useState(
      apiStatusConstants.initial,
    )

  const [
    restaurantsStatus,
    setRestaurantsStatus,
  ] = useState(
    apiStatusConstants.initial,
  )

  useEffect(() => {
    getOffers()
  }, [])

  useEffect(() => {
    getRestaurants()
  }, [activePage, sortBy])

  const getOffers = async () => {
    setOffersStatus(
      apiStatusConstants.inProgress,
    )

    const jwtToken =
      Cookies.get('jwt_token')

    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )

    const data = await response.json()

    if (response.ok) {
      setOffers(data.offers)

      setOffersStatus(
        apiStatusConstants.success,
      )
    } else {
      setOffersStatus(
        apiStatusConstants.failure,
      )
    }
  }

  const getRestaurants = async () => {
    setRestaurantsStatus(
      apiStatusConstants.inProgress,
    )

    const limit = 9

    const offset =
      (activePage - 1) * limit

    const jwtToken =
      Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sortBy}`

    const response = await fetch(
      url,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )

    const data = await response.json()

    if (response.ok) {
      setRestaurants(data.restaurants)

      const totalRestaurants =
        data.total || 0

      const calculatedPages =
        Math.ceil(
          totalRestaurants / 9,
        )

      setTotalPages(calculatedPages)

      setRestaurantsStatus(
        apiStatusConstants.success,
      )
    } else {
      setRestaurantsStatus(
        apiStatusConstants.failure,
      )
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  const renderOffersLoader = () => (
    <div
      testid="restaurants-offers-loader"
      className="loader-container"
    >
      <Oval
        color="gold"
        height={40}
        width={50}
      />
    </div>
  )

  const renderRestaurantsLoader =
    () => (
      <div
        testid="restaurants-list-loader"
        className="loader-container"
      >
        <Oval
          color="gold"
          height={40}
          width={50}
        />
      </div>
    )

  const renderOffersSection = () => {
    switch (offersStatus) {
      case apiStatusConstants.inProgress:
        return renderOffersLoader()

      case apiStatusConstants.success:
        return (
          <SlickSlider {...settings}>
            {offers.map(each => (
              <img
                key={each.id}
                src={each.image_url}
                alt="offer"
                className="offer-image"
              />
            ))}
          </SlickSlider>
        )

      default:
        return null
    }
  }

  const renderRestaurantsSection =
    () => {
      switch (restaurantsStatus) {
        case apiStatusConstants.inProgress:
          return renderRestaurantsLoader()

        case apiStatusConstants.success:
          return (
            <AllRestaurants
              restaurants={
                restaurants
              }
            />
          )

        default:
          return null
      }
    }

  return (
    <>
      <Header />

      <div className="home-container">
        {renderOffersSection()}

        <RestaurantsHeader
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortByOptions={
            sortByOptions
          }
        />

        {renderRestaurantsSection()}

        <div className="pagination-container">
          <button
            type="button"
            testid="pagination-left-button"
            onClick={() =>
              setActivePage(prev =>
                Math.max(
                  prev - 1,
                  1,
                ),
              )
            }
            disabled={
              activePage === 1
            }
            className={
              activePage === 1
                ? 'disabled-btn'
                : ''
            }
          >
            {'<'}
          </button>

          <span testid="active-page-number">
            {activePage} of{' '}
            {totalPages}
          </span>

          <button
            type="button"
            testid="pagination-right-button"
            onClick={() =>
              setActivePage(prev =>
                Math.min(
                  prev + 1,
                  totalPages,
                ),
              )
            }
            disabled={
              activePage ===
              totalPages
            }
            className={
              activePage ===
              totalPages
                ? 'disabled-btn'
                : ''
            }
          >
            {'>'}
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home