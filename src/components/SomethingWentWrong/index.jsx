
const SomethingWentWrong = () => (
  <div className="failure-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      alt="failure view"
      className="failure-image"
    />

    <h1>Oops! Something Went Wrong</h1>

    <p>We are having some trouble processing your request.</p>

    <button type="button">Retry</button>
  </div>
)

export default SomethingWentWrong
