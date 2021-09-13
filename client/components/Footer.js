import React from 'react'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth.js'


export default function Footer() {

  const loggedInUserId = getLoggedInUserId()

  return <div className="footerContainer">
    <footer className="footer">
      <div className="footerLinks">
        <Link to='/'><p>Home</p></Link>
        {loggedInUserId ?
          <Link to='/my-account'><p>My Account</p></Link>
          :
          <div>
            <Link to='/register'><p>Register</p></Link>
            <Link to='/login'><p>Login</p></Link>
          </div>
        }
        <Link to='/faqs'><p>FAQs</p></Link>
        <Link to='/contact-us'><p>Contact Us</p></Link>
      </div>
      <div className="storeAddress">
        <p><b>Golden Shoe Store</b></p>
        <p>123 Oxford Street</p>
        <p>London</p>
        <p>W1D 1NX</p>
        <p>Opening times: 9am - 6pm daily</p>
      </div>
      <div className="socialMedia">
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><img src='https://res.cloudinary.com/da3rlixzz/image/upload/v1631389610/AND%20DIgital/Facebook_vntsbe.png' alt="Facebook Logo" /></a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img src='https://res.cloudinary.com/da3rlixzz/image/upload/v1631389625/AND%20DIgital/Instagram_oopboi.png' alt="Instagram Logo" /></a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer"><img src='https://res.cloudinary.com/da3rlixzz/image/upload/v1631389618/AND%20DIgital/Twitter_nxohqf.png' alt="Twitter Logo" /></a>
      </div>
    </footer>
  </div>

}