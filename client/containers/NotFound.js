import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth.js'

export default function NotFound() {

  const loggedIn = getLoggedInUserId()
  const history = useHistory()

  return <>
    <div className="hero is-fullheight-with-navbar">
      <div>
        <div className="container pt-5 pb-5 px-4 display-no-search-results">
          <h1 className="no-search-results">Oops!</h1>
          <p className="no-search-results">Your page was not found...</p>
          <br />
          {!loggedIn && <Link className="button is-primary" to={'/'}>Register or Login</Link>}
          {loggedIn && <button className="button is-primary" onClick={() => history.goBack()}>Go back</button>}
        </div>
      </div>
    </div>
  </>
}