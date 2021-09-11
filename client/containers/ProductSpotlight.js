import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProductSpotlight({ match, history }) {

  const [product, setProduct] = useState({})
  const productId = match.params.id

  useEffect(() => {
    fetchSpecificProductInfo()
  }, [])

  async function fetchSpecificProductInfo() {
    const { data } = await axios.get(`/api/products/${productId}`)
    // const { data } = await axios.get('/api/products/1')
    setProduct(data)
  }

  return <>
    <h1>Single Product</h1>
  </>
}