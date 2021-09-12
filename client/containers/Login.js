import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Login({ history }) {

  const [showError, setShowError] = useState(false)
  const { handleSubmit, formState: { errors }, register } = useForm()

  async function onSubmit(data) {
    setShowError(false)
    const formdata = {
      'email': data.emailAddress,
      'password': data.password
    }
    try {
      const { data } = await axios.post('/api/login', formdata,)
      if (localStorage && data.token) {
        localStorage.setItem('token', data.token)
        history.push('/')
      } else {
        setShowError(true)
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <>
    <Navbar />
    <h1>Login</h1>
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
      <label>* Password:</label>
      <input
        {...register('password', { required: true })}
        name='password'
        placeholder='Password'
        type='password'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      {errors.password?.type === 'required' && 'A password is required'}
      {showError &&
        <div>
          Unable to login - email and/or password are incorrect.
        </div>
      }
      <input type="submit" value="Login" />
    </form>
    <Footer />
  </>


}