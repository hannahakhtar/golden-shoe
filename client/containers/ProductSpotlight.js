import React, { useState } from 'react'
import FacebookShareButton from '../components/facebookShare'
import TwitterShareButton from '../components/twitterShare'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function ProductSpotlight({ location }) {

  const [product, setProduct] = useState(location.state.item)
  const productId = product.id
  console.log(product)


  return <>
    <Navbar />
    <h1>Single Product</h1>
    <p>{productId}</p>
    <FacebookShareButton
      productId={productId}
    />
    <TwitterShareButton
      productId={productId}
    />
    <Footer />
  </>
}

