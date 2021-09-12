import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './styles/style.scss'
import Home from './containers/Home'
import Register from './containers/register'
import Login from './containers/login'
import Products from './containers/Products'
import NotFound from './containers/NotFound'
import ProductSpotlight from './containers/ProductSpotlight'
import Returns from './containers/Returns'
import FAQs from './containers/FAQs'
import Account from './containers/Account'
import ContactUs from './containers/ContactUs'
import Basket from './containers/Basket'
import Checkout from './containers/Checkout'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/products/:productId" component={ProductSpotlight} />
      <Route exact path="/returns" component={Returns}/>
      <Route exact path="/faqs" component={FAQs}/>
      <Route exact path="/my-account" component={Account}/>
      <Route exact path="/contact-us" component={ContactUs}/>
      <Route exact path="/my-basket" component={Basket}/>
      <Route exact path="/checkout" component={Checkout}/>

      <Redirect to="/not-found"/>
    </Switch>
  </BrowserRouter>
)

export default App  