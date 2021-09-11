import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Footer from '../components/Footer'


export default function Products() {
  const [allProducts, setAllProducts] = useState([])
  const [searchText, setSearchText] = useState([])
  const [categoryToSearch, setCategoryToSearch] = useState('')
  const { handleSubmit, register } = useForm()
  const categories = ['All', 'Sports', 'Evening Wear', 'Casual', 'Slippers', 'Sandals', 'High Heels', 'Pumps']

  useEffect(() => {
    getAllProducts()
  }, [])

  async function getAllProducts() {
    const { data } = await axios.get('/api/products')
    console.log('data:', data)
    setAllProducts(data)
  }

  function onSubmit(data) {
    setSearchText(Object.values(data)[0])
  }

  return <>
    <h1>Products</h1>
    <form id='searchForm' onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('search', { required: true })}
        // name='search'
        placeholder='Search'
        type='text'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      <select id="categoryOptions" name="Categories" form="searchForm" onChange={(event) => setCategoryToSearch(event.target.value)}>
        <option value="All">Categories</option>
        {categories.map((category, index) => {
          return <option key={index} value={category}>{category}</option>
        })}
      </select>
      <input type="submit" value="Search" />
    </form>
    {allProducts.map((item, index) => {
      return <div key={index}>
        <h2>
          {item.product_name}
        </h2>
      </div>
    })}
    <Footer />
  </>
}

