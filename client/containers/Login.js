import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

// * add some text under password to say how many characters it should be - also look into where you do this validation?
// * validate email address - https://ui.dev/validate-email-address-javascript/

export default function Login({ history }) {
  const { handleSubmit, register } = useForm()

  async function onSubmit(data) {
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
        console.log('Unable to login - email and/or password are not correct.')
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <>
    <h1>Login</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('emailAddress', { required: true })}
        name='emailAddress'
        placeholder='Email Address'
        type='text'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      <input
        {...register('password', { required: true })}
        name='password'
        placeholder='Password'
        type='password'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      <input type="submit" value="Login"/>
    </form>
  </>

}