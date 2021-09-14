import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function Home() {

  return <>
    <Navbar />
    <div className="homeBody">
      <Link to='/products'><section className="hero is-link is-medium">
        <div className="hero-body">
          <p className="title">
            See our Autumn/Winter Edit
          </p>
          <p className="subtitle">
            Womens boots & Mens leather shoes take centre stage!
          </p>
        </div>
      </section></Link>
      <section className="campaigns">
        <div  className="campaignContainer">
          <p className="campaign">Campaign 1</p>
        </div>
        <div className="campaignContainer">
          <p className="campaign">Campaign 2</p>
        </div>
      </section>
    </div>
    <Footer />
  </>
}

export default Home