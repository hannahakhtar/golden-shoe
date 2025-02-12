import React from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'

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
    <Header header="Checkout" />
    <div className="mainBody">
      <div>
        <p>*: required field</p>
        <div className="formContainer">
          <form onSubmit={handleSubmit(onCheckoutSubmit)}>
            <div>
              <h3 className="checkoutText">Shipping</h3>
              <label className="label">* First Name:</label>
              <input
                {...register('firstName', { required: true })}
                name='firstName'
                placeholder='First Name'
                type='text'
                defaultValue=''
                className={`input ${errors.firstName && 'is-danger'}`}
              />
              {errors.firstName?.type === 'required' && 'First name is required'}
              <label className="label">* Last Name:</label>
              <input
                {...register('lastName', { required: true })}
                name='lastName'
                placeholder='Last Name'
                type='text'
                defaultValue=''
                className={`input ${errors.lastName && 'is-danger'}`}
              />
              {errors.lastName?.type === 'required' && 'Last name is required'}
              <label className="label">* Building name/number:</label>
              <input
                {...register('buildingNameNo', { required: true })}
                name='buildingNameNo'
                placeholder='Building name/number'
                type='text'
                defaultValue=''
                className={`input ${errors.buildingNameNo && 'is-danger'}`}
              />
              {errors.buildingNameNo?.type === 'required' && 'Building name/number is required'}

              <label className="label">Street Name:</label>
              <input
                {...register('streetName')}
                name='streetName'
                placeholder='Street Name'
                type='text'
                defaultValue=''
                className={`input ${errors.streetName && 'is-danger'}`}
              />
              <label className="label">* City:</label>
              <input
                {...register('city', { required: true })}
                name='city'
                placeholder='City'
                type='text'
                defaultValue=''
                className={`input ${errors.city && 'is-danger'}`}
              />
              {errors.city?.type === 'required' && 'City is required'}
              <label className="label">* County:</label>
              <input
                {...register('county', { required: true })}
                name='county'
                placeholder='County'
                type='text'
                defaultValue=''
                className={`input ${errors.county && 'is-danger'}`}
              />
              {errors.county?.type === 'required' && 'County is required'}
              <label className="label">* Email Address:</label>
              <input
                {...register('emailAddress', { required: true })}
                name='emailAddress'
                placeholder='Email Address'
                type='text'
                defaultValue=''
                className={`input ${errors.emailAddress && 'is-danger'}`}
              />
              {errors.emailAddress?.type === 'required' && 'An email address is required'}
              <label className="label">* Postal Code:</label>
              <input
                {...register('postCode', { required: true, minLength: 3, maxLength: 4 })}
                name='postCode'
                placeholder='Post Code'
                type='text'
                defaultValue=''
                className={`input ${errors.postCode && 'is-danger'}`}
              />
              {errors.postCode?.type === 'required' && 'A post code is required and needs to be either 3 or 4 digits long'}

              <label className="label">* Phone Number:</label>
              <input
                {...register('phoneNumber', { required: true })}
                name='phoneNumber'
                placeholder='Phone Number'
                type='number'
                defaultValue=''
                className={`input ${errors.phoneNumber && 'is-danger'}`}
              />
              {errors.phoneNumber?.type === 'required' && 'A phone number is required'}
            </div>
            <div className="paymentForm">
              <h3 className="checkoutText">Payment</h3>
              <p>We only take payment by credit/debit card currently.</p>
              <label className="label">* Card Number:</label>
              <input
                {...register('cardNumber', { required: true, minLength: 16, maxLength: 16 })}
                name='cardNumber'
                placeholder='Card Number'
                type='number'
                defaultValue=''
                className={`input ${errors.cardNumber && 'is-danger'}`}
              />
              {errors.cardNumber?.type === 'required' && 'A card number is required and should be 16 digits long'}
              <label className="label">* Expiration Date:</label>
              <input
                {...register('expirationDate', { required: true, minLength: 16, maxLength: 16 })}
                name='expirationDate'
                placeholder='MM/YY'
                type='number'
                defaultValue=''
                className={`input ${errors.expirationDate && 'is-danger'}`}
              />
              {errors.expirationDate?.type === 'required' && 'A expiration date is required'}
              <label className="label">* CVV:</label>
              <input
                {...register('cvv', { required: true, minLength: 3, maxLength: 4 })}
                name='cvv'
                placeholder='CVV'
                type='password'
                defaultValue=''
                className={`input ${errors.cvv && 'is-danger'}`}
              />
              {errors.cvv?.type === 'required' && 'A CVV is required and needs to be either 3 or 4 digits long'}
              <label className="label">* Postal Code:</label>
              <input
                {...register('postCode', { required: true, minLength: 3, maxLength: 4 })}
                name='postCode'
                placeholder='Post Code'
                type='text'
                defaultValue=''
                className={`input ${errors.postCode && 'is-danger'}`}
              />
              {errors.postCode?.type === 'required' && 'A post code is required and needs to be either 3 or 4 digits long'}
            </div>
            {/* <div className="submitButton">
              <input className="button is-warning" type="submit" value="Save" />
            </div> */}
          </form>
        </div>
      </div>
      <div>
        <h3 className="checkoutText">Order summary</h3>
        <p className="checkoutText">Subtotal: </p>
        <p className="checkoutText"> Shipping: £3</p>
        <form onSubmit={handleSubmit(onDiscountSubmit)}>
          <input
            {...register('discountCode')}
            name='discountCode'
            placeholder='Discount Code'
            type='text'
            defaultValue=''
            className="input"
          />
          <div className="submitButton">
            <input className="button is-warning" type="submit" value="Apply" />
          </div>
          <p className="checkoutText">Total: </p>
        </form>
        <button className="button is-warning card-footer">Place Order</button>
      </div>
    </div>
    <Footer />
  </>
}