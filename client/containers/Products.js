import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RingLoader from 'react-spinners/RingLoader'
import Header from '../components/Header'

// ! clear search button
// ! if no results when searching

export default function Products() {

  const [allProducts, setAllProducts] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState([])
  const [searchText, setSearchText] = useState('')
  const [categoryToSearch, setCategoryToSearch] = useState('All')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register } = useForm()
  const categories = ['All', 'Sports', 'Evening Wear', 'Casual', 'Slippers', 'Sandals', 'High Heels', 'Pumps']

  useEffect(() => {
    getAllProducts()
  }, [])

  async function getAllProducts() {
    const { data } = await axios.get('/api/products')
    setTimeout
    setAllProducts(data)
    setProductsToDisplay(data)
  }

  function onSubmit() {
    setIsLoading(true)
    const resultsToDisplay = []
    productsToDisplay.map((product) => {
      if (product.product_name.toLowerCase().includes(searchText.toLowerCase()) || product.outer_material.toLowerCase().includes(searchText.toLowerCase()) || product.inner_material.toLowerCase().includes(searchText.toLowerCase()) || product.description.toLowerCase().includes(searchText.toLowerCase()) || product.category.toLowerCase().includes(searchText.toLowerCase())) {
        if (categoryToSearch === 'All') {
          resultsToDisplay.push(product)
        } else if (product.category === categoryToSearch) {
          resultsToDisplay.push(product)
        }
      }
    })
    setProductsToDisplay(resultsToDisplay)
    setSearchSubmitted(true)
    setIsLoading(false)
  }

  let displayProducts

  function clearFilters() {
    setProductsToDisplay(allProducts)
  }

  if (productsToDisplay.length > 0) {
    displayProducts =
      <div>
        {productsToDisplay.map((item, index) => {
          return <div key={index}>
            <h2>
              <Link to={{
                pathname: `/products/${item.id}`,
                state: { item }
              }}>{item.product_name}</Link>
            </h2>
          </div>
        })}
      </div>
  } if (searchSubmitted && productsToDisplay.length === 0) {
    displayProducts = <>
      <p className="no-search-results ">Sorry, there are no results matching your search <b>{`${searchText}`}</b>. Try again?</p>
    </>
  } else {
    {
      productsToDisplay.map((item, index) => {
        return <div key={index}>
          <h2>
            <Link to={{
              pathname: `/products/${item.id}`,
              state: { item }
            }}>{item.product_name}</Link>
          </h2>
        </div>
      })
    }
  }

  if (isLoading) {
    return RingLoader
  }

  return <>
    <Navbar />
    <Header header="All Products" />
    <div className="mainBody">

      <form id='searchForm' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('search', { required: true })}
          name='search'
          placeholder='Search'
          type='text'
          defaultValue=''
          onChange={(event) => setSearchText(event.target.value)}
          className="input"
        />
        <select className="select" id="categoryOptions" name="Categories" form="searchForm" onChange={(event) => setCategoryToSearch(event.target.value)}>
          <option value="All">Categories</option>
          <option value="All">All categories</option>
          {categories.map((category, index) => {
            return <option key={index} value={category}>{category}</option>
          })}
        </select>
        <input className="button is-warning" type="submit" value="Search" />
      </form>
      <button className="button is-warning" onClick={clearFilters}>Show all products</button>
      {displayProducts}
    </div>

    <Footer />
  </>
}

