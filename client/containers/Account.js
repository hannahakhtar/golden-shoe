import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getLoggedInUserId } from '../lib/auth.js'
import { useForm } from 'react-hook-form'
import Header from '../components/Header'


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
          console.log(data)
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
          console.log('saved items', data)
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
          console.log('this', data[0].products)
          setOrderHistory(data[0].products)
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

  return <>
    <Navbar />
    <Header header="My Account" />
    <div className="maiBody"></div>
    <p>Welcome back, {user.first_name}!</p>
    <div>
      {!showSavedItems && <button onClick={() => setShowSavedItems(true)}>My Saved Items</button>}
      {showSavedItems && <button onClick={() => setShowSavedItems(false)}>Hide My Saved Items</button>}
      {!showOrderHistory && <button onClick={() => setShowOrderHistory(true)}>My Orders</button>}
      {showOrderHistory && <button onClick={() => setShowOrderHistory(false)}>Hide My Orders</button>}
      {!showUpdateDetails && <button onClick={() => setShowUpdateDetails(true)}>Update My details</button>}
      {showUpdateDetails && <button onClick={() => setShowUpdateDetails(false)}>Hide My details</button>}
    </div>
    <div>
      {showSavedItems &&
        <div>
          {savedItems.map((item) => {
            return item.product.product_name
          })}
        </div>
      }
    </div>
    <div>
      {showOrderHistory &&
        <div>
          {orderHistory.map((order) => {
            return order.product_name
          })}
        </div>
      }
    </div>
    <div>
      {showUpdateDetails &&
        <div>
          <p>Update your account information here:</p>
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
          <div>
            <button className="button is-danger" onClick={deleteAccount}>Delete Account</button>
            <p>Be careful, your account will be deleted immediately once you click this!</p>
          </div>
        </div>
      }
    </div>
    <Footer />
  </>

}

