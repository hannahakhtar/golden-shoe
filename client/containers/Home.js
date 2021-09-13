import React from 'react'
// import withRouter from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {

  return <>
    <Navbar />
    <div className="mainBody">
      <p>Hello World!</p>
    </div>
    <Footer />
  </>
}

export default Home