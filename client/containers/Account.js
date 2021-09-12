import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getLoggedInUserId } from '../lib/auth.js'


export default function MyAccount() {

  const [username, setUsername] = useState('')
  const loggedInUserId = getLoggedInUserId()
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {
      if (loggedInUserId) {
        try {
          const { data } = await axios.get(`/api/users/${loggedInUserId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (data.errors) {
            console.log(data.errors)
          } else {
            setUsername(data.first_name)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [])

  return <>
    <Navbar />
    <h2>Account</h2>
    <p>Welcome back, {username}!</p>
    <button>My Saved Items</button>
    <button>My Orders</button>
    <button>Update my details</button>
    <Footer />
  </>

}