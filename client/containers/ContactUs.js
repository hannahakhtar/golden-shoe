import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ! send messages to admin (https://medium.com/@patienceadajah/how-to-send-emails-from-a-react-application-without-a-backend-server-1dd8718ceedd) - should actually use a database for this

export default function ContactUs() {

  const [messageRecieved, setMessageRecieved] = useState(false)
  const { handleSubmit, formState: { errors }, register } = useForm()

  function onSubmit(data) {
    setMessageRecieved(true)
    console.log(data)
  }
  return <>
      <Navbar /> 
    <h1>Contact Us</h1>
    <p>Please fill in all of the fields below and one of our customer care team will be in touch within two working days.</p>
    <p>*: required field</p>
    {messageRecieved &&
      <div>
        Thanks for your message - one of the team will be in touch soon!
      </div>
    }
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <label>* Email Address:</label>
      <input
        {...register('emailAddress', { required: true })}
        name='emailAddress'
        placeholder='Email Address'
        type='text'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      {errors.emailAddress?.type === 'required' && 'An email address is required'}
      <label>* Phone Number:</label>
      <input
        {...register('phoneNumber', { required: true })}
        name='phoneNumber'
        placeholder='Phone Number'
        type='text'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      {errors.phoneNumber?.type === 'required' && 'A phone number is required'}
      <label>* How can we help you?:</label>
      <input
        {...register('reason', { required: true })}
        name='reason'
        placeholder='Tell us how we can help?'
        type='text'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      {errors.reason?.type === 'required' && 'Please provide as much information as possible so our team can help you.'}
      <input type="submit" value="Submit" />
    </form>
    <Footer />
  </>
}
