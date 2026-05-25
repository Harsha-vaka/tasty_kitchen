import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/dmbzwerm6/image/upload/v1779540686/Frame_275_txb8gg.png"
        alt="website-footer-logo"
        className="footer-logo"
      />

      <h1 className="footer-heading">
        Tasty Kitchens
      </h1>
    </div>

    <p className="footer-description">
      The only thing we are serious
      about is food.
    </p>

    <p className="contact-text">
      Contact us on
    </p>

    <div className="social-icons">
      <FaPinterestSquare
        testid="pintrest-social-icon"
      />

      <FaInstagram
        testid="instagram-social-icon"
      />

      <FaTwitter
        testid="twitter-social-icon"
      />

      <FaFacebookSquare
        testid="facebook-social-icon"
      />
    </div>
  </footer>
)

export default Footer