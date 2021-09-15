import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getLoggedInUserId } from '../lib/auth.js'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'


export default function MyAccount() {

  const [user, setUser] = useState({})
  const [savedItems, setSavedItems] = useState([])
  const [orderHistory, setOrderHistory] = useState([])
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [showSavedItems, setShowSavedItems] = useState(false)
  const [showUpdateDetails, setShowUpdateDetails] = useState(false)
  const [updateDetailsResponse, setUpdateDetailsResponse] = useState('')
  const loggedInUserId = getLoggedInUserId()
  const token = localStorage.getItem('token')
  const { handleSubmit, register } = useForm()
  const moment = require('moment')

  useEffect(() => {
    fetchData()
    getMySavedItems()
    getMyOrders()
  }, [])

  async function fetchData() {
    if (loggedInUserId) {
      try {
        const { data } = await axios.get(`/api/users/${loggedInUserId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data.errors) {
          console.log(data.errors)
        } else {
          setUser(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function getMySavedItems() {
    if (loggedInUserId) {
      try {
        const { data } = await axios.get(`/api/wishlist/${loggedInUserId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data.errors) {
          console.log(data.errors)
        } else {
          setSavedItems(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function getMyOrders() {
    if (loggedInUserId) {
      try {
        const { data } = await axios.get(`/api/users/${loggedInUserId}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data.errors) {
          console.log(data.errors)
        } else {
          setOrderHistory(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function deleteAccount() {
    if (loggedInUserId) {
      try {
        const { data } = await axios.delete(`/users/${loggedInUserId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data.errors) {
          console.log(data.errors)
        } else {
          localStorage.removeItem('token')
          history.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  function removeFalsyValues(obj) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName]
      }
    }
    return obj
  }

  async function submitUpdateDetails(formSubmission) {
    const formData = removeFalsyValues(formSubmission)
    try {
      const { data } = await axios.put(`/api/users/${loggedInUserId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.errors) {
        setUpdateDetailsResponse('Your account could not be updated - please try again')
      } else {
        setUpdateDetailsResponse('Your details have successfully been updated.')
      }
    } catch (err) {
      console.log(err)
    }
  }


  function toggleSavedItems() {
    if (showSavedItems) {
      setShowOrderHistory(false)
      setShowUpdateDetails(false)
      setShowSavedItems(false)
    } else {
      setShowSavedItems(true)
      setShowOrderHistory(false)
      setShowUpdateDetails(false)
    }
  }

  function toggleOrders() {
    if (showOrderHistory) {
      setShowOrderHistory(false)
      setShowUpdateDetails(false)
      setShowSavedItems(false)
    } else {
      setShowOrderHistory(true)
      setShowUpdateDetails(false)
      setShowSavedItems(false)
    }
  }

  function toggleAccountDetails() {
    if (showUpdateDetails) {
      setShowOrderHistory(false)
      setShowUpdateDetails(false)
      setShowSavedItems(false)
    } else {
      setShowOrderHistory(false)
      setShowUpdateDetails(true)
      setShowSavedItems(false)
    }
  }

  async function removeFromWishlist(WishlistItemId, userId) {
    try {
      const { data } = await axios.delete(`/api/users/${userId}/wishlist/${WishlistItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getMySavedItems()
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <Navbar />
    <Header header="My Account" />
    <div className="mainBody">
      <p className="accountText">Welcome back, {user.first_name}!</p>
      <div className="accountButtons">
        {!showSavedItems && <button className="button is-warning" onClick={toggleSavedItems}>My Saved Items</button>}
        {showSavedItems && <button className="button is-warning" onClick={toggleSavedItems}>Hide My Saved Items</button>}
        {!showOrderHistory && <button className="button is-warning" onClick={toggleOrders}>My Orders</button>}
        {showOrderHistory && <button className="button is-warning" onClick={toggleOrders}>Hide My Orders</button>}
        {!showUpdateDetails && <button className="button is-warning" onClick={toggleAccountDetails}>Update My details</button>}
        {showUpdateDetails && <button className="button is-warning" onClick={toggleAccountDetails}>Hide My details</button>}
      </div>
      <div className="mySavedItemsContainer">
        {showSavedItems &&
          <div>
            <div className="container">
              <div className="columns is-multiline is-mobile">
                {savedItems.map((item, index) => {
                  return <div key={index} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                    <ProductCard
                      key={index}
                      productId={item.product.id}
                      productImage={item.product.product_image}
                      productName={item.product.product_name}
                      productPrice={item.product.price}
                      cardLocation="Saved"
                      removeFromWishlist={removeFromWishlist}
                      userId={loggedInUserId}
                      WishlistItemId={item.id}
                    />
                  </div>
                })}
              </div>
            </div>
          </div>
        }
        {showSavedItems && savedItems.length === 0 &&
          <div>
            <p>You have no saved items.</p>
          </div>
        }
      </div>
      <div className="myOrdersContainer">
        {showOrderHistory &&
          <div className="ordersCardContainer">
            {orderHistory.map((order, index) => {
              return <div key={index} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile orderCard">
                <Link to={{
                  pathname: `/order-details/${order.id}`,
                  state: { orderId: order.id }
                }}>
                  <div className="card">
                    <div className="cardContent">
                      <p><b>Order Number: {order.id}</b></p>
                      <p>Ordered on: {moment(order.created_at).format('LLLL')}</p>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        }
        {showOrderHistory && orderHistory.length === 0 &&
          <div>
            <p>You have no orders to show at the moment.</p>
          </div>
        }
      </div>
      <div className="myAccountContainer">
        {showUpdateDetails &&
          <div className="detailsContainer">
            <p id="updateAccountText">Update your account information here:</p>
            <div className="formContainer">
              <form onSubmit={handleSubmit(submitUpdateDetails)}>
                <label className="label">Email Address:</label>
                <input
                  {...register('email')}
                  name='email'
                  placeholder='Email Address'
                  type='text'
                  defaultValue={user.email}
                  className="input"
                />
                <label className="label">Password:</label>
                <input
                  {...register('password')}
                  name='password'
                  placeholder='Password'
                  type='password'
                  defaultValue=''
                  className="input"
                />
                <label className="label">First Name:</label>
                <input
                  {...register('first_name')}
                  name='first_name'
                  placeholder='First Name'
                  type='text'
                  defaultValue={user.first_name}
                  className="input"
                />
                <label className="label">Last Name:</label>
                <input
                  {...register('last_name')}
                  name='last_name'
                  placeholder='Last Name'
                  type='text'
                  defaultValue={user.last_name}
                  className="input"
                />
                <div className="submitButton">
                  <input className="button is-warning" type="submit" value="Update Details" />
                </div>
              </form>
            </div>
            {updateDetailsResponse}
            <div className="deleteAccount">
              <button className="button is-danger" onClick={deleteAccount}>Delete Account</button>
              <p>Be careful, your account will be deleted immediately once you click this!</p>
            </div>
          </div>
        }
      </div>
    </div>
    <Footer />
  </>

}

