import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth.js'

export default function Navbar({ history }) {

  // ! add in logo to Navbar

  const [loggedIn, updateLoggedIn] = useState(false)
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
            updateLoggedIn(true)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [loggedIn])

  function logOut() {
    localStorage.removeItem('token')
    updateLoggedIn(false)
    history.push('/')
  }
  
  return <>
    {loggedIn ?
      <div>
        <Link className='button' to='/register'>My Account</Link>
        <a onClick={logOut}>Log Out</a>
      </div>
      :
      <div>
        <Link className='button' to='/register'>Register</Link>
        <Link className='button' to='/login'>Login</Link>
      </div>
    }
    <Link className='button' to='/products'>Products</Link>
    <Link className='button' to='faqs'>FAQs</Link>
  </>
}