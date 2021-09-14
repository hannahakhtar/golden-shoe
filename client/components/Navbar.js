import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth.js'

export default function Navbar({ history }) {

  const [loggedIn, updateLoggedIn] = useState(false)
  const [isActive, setisActive] = useState(false)
  
  const loggedInUserId = getLoggedInUserId()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchData()
  }, [loggedIn])

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

  function logOut() {
    localStorage.removeItem('token')
    updateLoggedIn(false)
    history.push('/')
  }

  return <div className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="http://localhost:8001/">
        <img src="https://res.cloudinary.com/da3rlixzz/image/upload/v1631614445/Screenshot_2021-09-09_at_14.54.36_yiklnr.png" width="112" height="28" />
      </a>
      <a role="button" className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" onClick={() => { 
        setisActive(!isActive) 
      }}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
      <div className="navbar-end">
        <div className="navGroupingOne">
          <Link className='button navbar-item' to='/products'>Products</Link>
          <Link className='button navbar-item' to='/faqs'>FAQs</Link>
          <Link className='button navbar-item' to='/returns'>Returns</Link>
        </div>
        {loggedIn ?
          <div className="navGroupingTwo">
            <Link className='button navbar-item' to='/my-account'>My Account</Link>
            <Link className='button navbar-item' to='/my-basket'>Basket</Link>
            <Link className='button navbar-item' onClick={logOut}>Log Out</Link>
          </div>
          :
          <div className="navGroupingThree">
            <Link className='button navbar-item' to='/register'>Register</Link>
            <Link className='button navbar-item' to='/login'>Login</Link>
          </div>
        }
      </div>
    </div>
  </div>





}


