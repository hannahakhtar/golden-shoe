import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { getLoggedInUserId } from '../lib/auth.js'
import ProductCard from '../components/ProductCard'

export default function OrderDetails({ location }) {

  const [error, setError] = useState('')
  const [orderDetails, setOrderDetails] = useState([])
  const token = localStorage.getItem('token')
  const orderId = location.state.orderId
  const loggedInUserId = getLoggedInUserId()

  // /users/<int:user_id>/orders/<int:order_history_id>'

  useEffect(() => {
    getOrderHistory()
  }, [])

  async function getOrderHistory() {
    try {
      const { data } = await axios.get(`/api/users/${loggedInUserId}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.errors) {
        setError(data.errors)
      } else {
        console.log(data[0].products)
        setOrderDetails(data[0].products)
      }
    } catch (err) {
      setError(err)
    }
  }

  return <>
    <Navbar />
    <Header header="Order Details" />
    <div className="mainBody">
      <h3>Order Number <b>{orderId}</b></h3>
      {error &&
        <p>{error}</p>
      }
      <div>
        <div className=" orderDetailsContainer">
          <div className="columns is-multiline is-mobile">
            {orderDetails.map((item, index) => {
              return <div key={index} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                <ProductCard productId={item.id} productImage={item.product_image} productName={item.product_name} productPrice={item.price} />
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
}