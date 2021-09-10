import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
// import axios from 'axios'
import Home from './containers/Home'


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/home" component={Home} />
    </Switch>
  </BrowserRouter>
)


export default App