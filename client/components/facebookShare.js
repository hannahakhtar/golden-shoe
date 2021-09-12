import React from 'react'
import { FacebookShareButton } from 'react-share'

export default function ShareButtonFacebook({ productId }) {
  const shareButtonProps = {
    url: `http://localhost:8001/products/${productId}`,
    network: 'Facebook',
    text: 'Check out this cool listing on Golden Shoe!',
    longtext:
      ''
  }

  return <FacebookShareButton {...shareButtonProps}>
    <img src='https://res.cloudinary.com/da3rlixzz/image/upload/v1631389610/AND%20DIgital/Facebook_vntsbe.png' alt="Facebook Logo"/>
  </FacebookShareButton>

}
