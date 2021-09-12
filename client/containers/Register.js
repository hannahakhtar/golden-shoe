import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'

// ! validate email address - https://ui.dev/validate-email-address-javascript

export default function Register({ history }) {
  const [passwordsDoNotMatch, setpasswordsDoNotMatch] = useState(false)
  const [emailRegistered, setemailRegistered] = useState(false)

  const { handleSubmit, formState: { errors }, register } = useForm()

  async function onSubmit(data) {
    setemailRegistered(false)
    checkUniqueEmail(data.emailAddress)
    setpasswordsDoNotMatch(false)
    const formdata = {
      'email': data.emailAddress,
      'password': data.password,
      'first_name': data.firstName,
      'last_name': data.lastName
    }
    if (data.password !== data.retypePassword) {
      setpasswordsDoNotMatch(true)
    } else {
      try {
        const { data } = await axios.post('/api/signup', formdata,)
        if (data.id) {
          history.push('/login/success')
        } else {
          console.log('Unable to register user. Email address must be unique and password and password confirmation must match.')
        }
      } catch (err) {
        console.log(err.response.data)
      }
    }
  }

  async function checkUniqueEmail(emailAddress) {
    const { data } = await axios.get('/api/users')
    const emailAddresses = []
    data.map((data) => {
      emailAddresses.push(data.email)
    })
    emailAddresses.map((email) => {
      if (email === emailAddress) {
        setemailRegistered(true)
      }
    })
  }

  return <>
    <h1>Register</h1>
    <p>*: required field</p>
    <form onSubmit={handleSubmit(onSubmit)}>
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
      {emailRegistered &&
        <div>
          <p>There is already an account associated with this email address. Either <Link to='/login'>login</Link> or retry.</p>
        </div>
      }
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
      <label>* Password:</label>
      <a>Minumum of 6 characters</a>
      <input
        {...register('password', { required: true, minLength: 6 })}
        name='password'
        placeholder='Password'
        type='password'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      {errors.password?.type === 'required' && 'A password is required'}
      <label>* Confirm password:</label>
      <a>Must match the password above!</a>
      <input
        {...register('retypePassword', { required: true, minLength: 6 })}
        name='retypePassword'
        placeholder='Retype password'
        type='password'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      {errors.retypePassword?.type === 'required' && 'Please confirm your password.'}
      {passwordsDoNotMatch &&
        <div>
          <p>Passwords do not match, please try again.</p>
        </div>
      }
      <input type="submit" value="Register" />
    </form>
  </>

}
