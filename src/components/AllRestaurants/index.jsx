import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const AllRestaurants = props => {
  const {restaurants} = props

  return (
    <ul className="restaurants-list">
      {restaurants.map(each => (
        <li testid="restaurant-item" key={each.id}>
          <Link
            to={`/restaurant/${each.id}`}
            className="restaurant-link"
          >
            <img
              src={each.image_url}
              alt="restaurant"
              className="restaurant-image"
            />

            <div className="restaurant-details">
              <h1 className="restaurant-name">
                {each.name}
              </h1>

              <p className="restaurant-cuisine">
                {each.cuisine}
              </p>

              <div className="rating-container">
                <FaStar className="star" />

                <p className="rating">
                  {each.user_rating.rating}
                </p>

                <p className="total-reviews">
                  ({each.user_rating.total_reviews} ratings)
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default AllRestaurants