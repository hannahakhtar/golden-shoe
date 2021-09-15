import React, { useEffect, useState } from 'react'
import FacebookShareButton from '../components/facebookShare'
import TwitterShareButton from '../components/twitterShare'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth.js'


export default function ProductSpotlight({ match }) {

  const productId = match.params.productId
  const loggedInUserId = getLoggedInUserId()
  const [product, setProduct] = useState({})
  const [inWishlist, setIsInWishlist] = useState(false)
  const [wishlistId, setWishlistId] = useState(0)

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchProductData()
    fetchWishlistData()
  }, [productId])

  async function fetchProductData() {
    const { data } = await axios.get(`/api/products/${productId}`)
    setProduct(data)
  }

  async function fetchWishlistData() {
    const { data } = await axios.get(`/api/wishlist/${loggedInUserId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    data.map((item) => {
      if (item.product.id === parseInt(productId)) {
        setIsInWishlist(true)
        setWishlistId(item.id)
      }
    })
  }

  async function addToWishList() {
    try {
      const { data } = await axios.post(`/api/users/${loggedInUserId}/wishlist/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
      setIsInWishlist(true)
      setWishlistId(data.id)
    } catch (err) {
      console.log(err)
    }
  }

  async function removeFromWishlist() {
    try {
      const { data } = await axios.delete(`/api/users/${loggedInUserId}/wishlist/${wishlistId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
      setIsInWishlist(false)
      setWishlistId(0)
    } catch (err) {
      console.log(err)
    }
  }

  let showRemainingStock

  if (product.stock_level < 6 && product.stock_level > 0) {
    showRemainingStock =
      <p className="stockLevels">
        Quick, there are only {product.stock_level} remaining.
      </p>
  }

  if (product.stock_level === 0) {
    showRemainingStock =
      <p className="stockLevels">
        Sorry, this item is out of stock.</p>
  }

  return <>
    <Navbar />
    <Header header={product.product_name} />
    <div className="mainBody">
      <div className="productSpotlightContainer">
        <div>
          <img src={product.product_image} alt={`${product.product_name} image`} />
        </div>
        <div className="productDescription">
          {showRemainingStock}
          <p className="spotlightText">Description: {product.description}</p>
          <p className="spotlightText">Gender: {product.gender}</p>
          <p className="spotlightText">Size: {product.size}</p>
          <p className="spotlightText">Price: £{product.price}</p>
          <p className="spotlightText">Inner Material: {product.inner_material}</p>
          <p className="spotlightText">Outer Material: {product.outer_material}</p>
          <p className="spotlightText">Sole: {product.sole}</p>
          <p className="spotlightText">Shoe Width: {product.shoe_width}</p>
          <div className="socialMediaSharing">
            <p className="spotlightText">Share on social media:</p>
            <FacebookShareButton
              productId={productId}
            />
            <TwitterShareButton
              productId={productId}
            />
          </div>
          <div className="wishListToggle">
            {inWishlist && <button className="button is-warning" onClick={removeFromWishlist}>Remove from Saved Items</button>}
            {!inWishlist && <button className="button is-warning" onClick={addToWishList}>Add to Saved Items</button>}
          </div>
          <div>
            <button className="button is-warning">Add to basket</button>
          </div>
        </div>
      </div>

    </div>
    <Footer />
  </>
}



