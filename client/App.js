import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './styles/style.scss'
// import axios from 'axios'
import Home from './containers/Home'
import Register from './containers/register'
import Login from './containers/login'
import Products from './containers/Products'
import NotFound from './containers/NotFound'
import ProductSpotlight from './containers/ProductSpotlight'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/products/:productId" component={ProductSpotlight} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)


export default App  