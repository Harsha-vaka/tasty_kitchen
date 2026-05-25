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

const SlickSlider = Slider.default || Slider

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = ({sortByOptions}) => {
  const [offers, setOffers] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [sortBy, setSortBy] = useState('Lowest')
  const [offersStatus, setOffersStatus] = useState(apiStatusConstants.initial)
  const [restaurantsStatus, setRestaurantsStatus] = useState(
    apiStatusConstants.initial,
  )

  useEffect(() => {
    getOffers()
  }, [])

  useEffect(() => {
    getRestaurants()
  }, [activePage, sortBy])

  const getOffers = async () => {
    setOffersStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

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
      setOffersStatus(apiStatusConstants.success)
    }
  }

  const getRestaurants = async () => {
    setRestaurantsStatus(apiStatusConstants.inProgress)

    const limit = 9
    const offset = (activePage - 1) * limit

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sortBy}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })

    const data = await response.json()

    if (response.ok) {
      setRestaurants(data.restaurants)
      setRestaurantsStatus(apiStatusConstants.success)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <>
      <Header />

      <div className="home-container">
        {offersStatus === apiStatusConstants.inProgress ? (
          <div testid="restaurants-offers-loader">
            <Oval color="gold" height={40} width={50} />
          </div>
        ) : (
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
        )}

        <RestaurantsHeader
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortByOptions={sortByOptions}
        />

        {restaurantsStatus === apiStatusConstants.inProgress ? (
          <div testid="restaurants-list-loader">
            <Oval color="gold" height={40} width={50} />
          </div>
        ) : (
          <AllRestaurants restaurants={restaurants} />
        )}

        <div className="pagination-container">
          <button
            testid="pagination-left-button"
            onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}
          >
            {'<'}
          </button>

          <span testid="active-page-number">{activePage}</span>

          <button
            testid="pagination-right-button"
            onClick={() => setActivePage(prev => prev + 1)}
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
