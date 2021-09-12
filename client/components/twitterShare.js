import React from 'react'
import { TwitterShareButton } from 'react-share'

export default function ShareButtonFacebook({ productId }) {
  const shareButtonProps = {
    url: `http://localhost:8001/products/${productId}`,
    network: 'Twitter',
    text: 'Check out this cool listing on Golden Shoe!',
    longtext:
      ''
  }

  return <TwitterShareButton {...shareButtonProps}>
    <img src='https://res.cloudinary.com/da3rlixzz/image/upload/v1631389618/AND%20DIgital/Twitter_nxohqf.png' alt="Twitter Logo"/>
  </TwitterShareButton>

}