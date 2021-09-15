import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function NotFound() {

  return <>
    <Navbar />
    <Header header="Oops!" />
    <div className="mainBody">
      <div>
        <p className="no-search-results"><b>Your page was not found...</b></p>
        <br />
        <Link className="button is-warning" to={'/'}>Back to home</Link>
      </div>
    </div>
    <Footer />
  </>
}