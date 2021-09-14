import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'

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
      setShowError(true)
      console.log(err.response.data)
    }
  }

  return <>
    <Navbar />
    <Header header="Login" />
    <div className="loginBody">
      <p>*: required field</p>
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <label className="label">* Password:</label>
          <input
            {...register('password', { required: true })}
            name='password'
            placeholder='Password'
            type='password'
            defaultValue=''
            className={`input ${errors.password && 'is-danger'}`}
          />
          {errors.password?.type === 'required' && 'A password is required'}
          {showError &&
            <div>
              Unable to login - email and/or password are incorrect.
            </div>
          }
          <div className="submitButton">
            <input className="button is-warning" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </>


}