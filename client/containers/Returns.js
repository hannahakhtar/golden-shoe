import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Returns() {

  const { handleSubmit, register } = useForm()
  const [orderNumber, setOrderNumber] = useState()
  const [returns, setReturns] = useState(['returning'])
  const [showRecieved, setShowRecieved] = useState(false)
  const reasonsArray = ['Doesn\'t fit', 'Shoe colour', 'Faulty', 'Quality not as expected', 'Other']

  // ! cannot submit until order number, product ID and reason (value cannot be "") have been selected - error shows if this is issue
  // ! when new input is added, remove all the previous data
  // ! one product minimum

  async function onSubmit(data) {
    console.log('Order number: ', orderNumber)
    console.log('Product IDs and reason for return', data)
    setShowRecieved(true)
  }

  function addProductInput() {
    setReturns([...returns, 'returning'])
  }

  function removeProductInput() {
    const currentArrayOfReturns = [...returns]
    const removeLastIndex = currentArrayOfReturns.pop()
    console.log(removeLastIndex)
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
    <h1>Generate Return</h1>
    <p>Please enter all details on this form and a return label will be generated and sent to your email addrress.</p>
    <p>You have 28 days to return the shoes to us in the same condition for a refund.</p>
    <p>It can take up to two weeks for return of funds.</p>
    <form id="returnsForm" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('orderNumber', { required: true })}
        name='orderNumber'
        placeholder='Order Number'
        type='text'
        defaultValue=''
        onChange={(event) => setOrderNumber(event.target.value)}
      // className={}
      />
      {returns.map((returnedProduct, index) => {
        return <div key={index}>
          <input
            {...register('productId', { required: true })}
            name='productId'
            placeholder='Product ID'
            type='text'
            defaultValue=''
          // className={}
          />
          <select id="reasonsForReturn" name="Reasons" form="returnsForm" >
            <option value="">Reason for return</option>
            {reasonsArray.map((reason, index) => {
              return <option key={index} value={reason}>{reason}</option>
            })}
          </select>
        </div>
      })}

      <input type="submit" value="Submit Return Details" onSubmit={onSubmit} />
    </form>
    <button onClick={addProductInput}>Add another product</button>
    <button onClick={removeProductInput}>Remove last product</button>
    <Footer />
  </>
}

