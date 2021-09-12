import React from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Checkout() {

  const { handleSubmit, formState: { errors }, register } = useForm()

  function onCheckoutSubmit(data) {
    console.log(data)
  }

  function onDiscountSubmit(discountCode) {
    console.log('User can enter discount code, then check against validity in DB (once designed) against userID and code sent via marketing email. Once complete, update total order value field', discountCode)
  }

  return <>
    <Navbar />
    <h2>Checkout</h2>
    <div>
      <p>*: required field</p>
      <form onSubmit={handleSubmit(onCheckoutSubmit)}>
        <div>
          <h3>Shipping</h3>
          <label>* First Name:</label>
          <input
            {...register('firstName', { required: true })}
            name='firstName'
            placeholder='First Name'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.firstName?.type === 'required' && 'First name is required'}
          <label>* Last Name:</label>
          <input
            {...register('lastName', { required: true })}
            name='lastName'
            placeholder='Last Name'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.lastName?.type === 'required' && 'Last name is required'}
          <label>* Building name/number:</label>
          <input
            {...register('buildingNameNo', { required: true })}
            name='buildingNameNo'
            placeholder='Building name/number'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.buildingNameNo?.type === 'required' && 'Building name/number is required'}

          <label>Street Name:</label>
          <input
            {...register('streetName')}
            name='streetName'
            placeholder='Street Name'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          <label>* City:</label>
          <input
            {...register('city', { required: true })}
            name='city'
            placeholder='City'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.city?.type === 'required' && 'City is required'}
          <label>* County:</label>
          <input
            {...register('county', { required: true })}
            name='county'
            placeholder='County'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.county?.type === 'required' && 'County is required'}
          <label>* Email Address:</label>
          <input
            {...register('emailAddress', { required: true })}
            name='emailAddress'
            placeholder='Email Address'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          <label>* Postal Code:</label>
          <input
            {...register('postCode', { required: true, minLength: 3, maxLength: 4 })}
            name='postCode'
            placeholder='Post Code'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.postCode?.type === 'required' && 'A post code is required and needs to be either 3 or 4 digits long'}
          {errors.emailAddress?.type === 'required' && 'An email address is required'}
          <label>* Email Address:</label>
          <input
            {...register('phoneNumber', { required: true })}
            name='phoneNumber'
            placeholder='Phone Number'
            type='number'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.phoneNumber?.type === 'required' && 'A phone number is required'}
        </div>
        <div>
          <h3>Payment</h3>
          <p>We only take payment by credit/debit card currently.</p>
          <label>* Card Number:</label>
          <input
            {...register('cardNumber', { required: true, minLength: 16, maxLength: 16 })}
            name='cardNumber'
            placeholder='Card Number'
            type='number'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.cardNumber?.type === 'required' && 'A card number is required and should be 16 digits long'}
          <label>* Expiration Date:</label>
          <input
            {...register('expirationDate', { required: true, minLength: 16, maxLength: 16 })}
            name='expirationDate'
            placeholder='MM/YY'
            type='number'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.expirationDate?.type === 'required' && 'A expiration date is required'}
          <label>* CVV:</label>
          <input
            {...register('cvv', { required: true, minLength: 3, maxLength: 4 })}
            name='cvv'
            placeholder='CVV'
            type='password'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.cvv?.type === 'required' && 'A CVV is required and needs to be either 3 or 4 digits long'}
          <label>* Postal Code:</label>
          <input
            {...register('postCode', { required: true, minLength: 3, maxLength: 4 })}
            name='postCode'
            placeholder='Post Code'
            type='text'
            defaultValue=''
          // className={`input ${errors.username && 'is-danger'}`}
          />
          {errors.postCode?.type === 'required' && 'A post code is required and needs to be either 3 or 4 digits long'}
        </div>
        <input type="submit" value="Place Order" />
      </form>
    </div>
    <div>
      <h3>Order summary</h3>
      <p>Subtotal: </p>
      <p>Shipping: £3</p>
      <form onSubmit={handleSubmit(onDiscountSubmit)}>
        <input
          {...register('discountCode')}
          name='discountCode'
          placeholder='Discount Code'
          type='text'
          defaultValue=''
        // className={`input ${errors.username && 'is-danger'}`}
        />
        <input type="submit" value="Apply" />
        <p>Total: </p>
      </form>
      <button>Place Order</button>
    </div>
    <Footer />
  </>
}