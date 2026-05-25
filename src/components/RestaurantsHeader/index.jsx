import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const RestaurantsHeader = props => {
  const {sortBy, setSortBy, sortByOptions} = props

  const onChangeSort = event => {
    setSortBy(event.target.value)
  }

  return (
    <div className="restaurants-header">
      <div>
        <h1>Popular Restaurants</h1>

        <p>
          Select Your favourite restaurant
          special dish and make your day
          happy...
        </p>
      </div>

      <div className="sort-container">
        <BsFilterLeft />

        <p>Sort by</p>

        <select
          value={sortBy}
          onChange={onChangeSort}
        >
          {sortByOptions.map(each => (
            <option
              key={each.id}
              value={each.value}
            >
              {each.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default RestaurantsHeader