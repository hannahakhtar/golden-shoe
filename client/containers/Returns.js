import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Returns() {

  const { handleSubmit, register } = useForm()
  const [orderNumber, setOrderNumber] = useState()
  const [returns, setReturns] = useState(['returning'])
  const [showRecieved, setShowRecieved] = useState(false)
  const reasonsArray = ['Other', 'Doesn\'t fit', 'Shoe colour', 'Faulty', 'Quality not as expected']

  async function onSubmit(data) {
    setShowRecieved(true)
  }

  function addProductInput() {
    setReturns([...returns, 'returning'])
  }

  function removeProductInput() {
    const currentArrayOfReturns = [...returns]
    const removeLastIndex = currentArrayOfReturns.pop()
    setReturns(currentArrayOfReturns)
  }

  if (showRecieved) {
    return <div>
      <p>Thanks for your return. You will recieve an email shortly with details of how to print your label.</p>
      <Link to={'/'}>Home</Link>
    </div>
  }

  return <>
    <Navbar />
    <Header header="Returns Form" />
    <div className="mainBody">
      <div className="preFormText">
        <p>Please enter all details on this form and a return label will be generated and sent to your email addrress.</p>
        <p>You have 28 days to return the shoes to us in the same condition for a refund.</p>
        <p>It can take up to two weeks for return of funds.</p>
      </div>
      <form id="returnsForm" onSubmit={handleSubmit(onSubmit)}>
        <label className="label">Order Number</label>
        <input
          {...register('orderNumber', { required: true })}
          name='orderNumber'
          placeholder='Order Number'
          type='text'
          defaultValue=''
          onChange={(event) => setOrderNumber(event.target.value)}
          className="input"
        // className={}
        />
        {returns.map((returnedProduct, index) => {
          return <div key={index}>
            <label className="label">Product ID</label>
            <input
              {...register('productId', { required: true })}
              name='productId'
              placeholder='Product ID'
              type='text'
              defaultValue=''
              className="input"
            // className={}
            />
            <label className="label">Reason for return:</label>
            <select className="select" id="reasonsForReturn" name="Reasons" form="returnsForm" >
              {reasonsArray.map((reason, index) => {
                return <option key={index} value={reason}>{reason}</option>
              })}
            </select>
          </div>
        })}
        <div className="returnButtons">
          <button className="button is-warning" onClick={addProductInput}>Add another product</button>
          <button className="button is-warning" onClick={removeProductInput}>Remove last product</button>
          <input className="button is-warning" type="submit" value="Submit Return Details" onSubmit={onSubmit} />
        </div>
      </form>
    </div>
    <Footer />
  </>
}

