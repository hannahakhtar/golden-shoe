import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

// * add some text under password to say how many characters it should be - also look into where you do this validation?
// * check password and retype password to see if they match - error if they don't
// * validate email address - https://ui.dev/validate-email-address-javascript
// * errors

export default function Register({ history }) {
  const { handleSubmit, register } = useForm()

  async function onSubmit(data) {
    const formdata = {
      'email': data.emailAddress,
      'password': data.password,
      'first_name': data.firstName,
      'last_name': data.lastName
    }
    try {
      const { data } = await axios.post('/api/signup', formdata,)
      if (data.id) {
        history.push('/login/success')
      } else {
        console.log('Unable to register user. Email address must be unique and password and password confirmatin must match.')
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <>
    <h1>Register</h1>

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
        {...register('firstName', { required: true })}
        name='firstName'
        placeholder='First Name'
        type='text'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />
      <input
        {...register('lastName', { required: true })}
        name='lastName'
        placeholder='Last Name'
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
      <input
        {...register('retypePassword', { required: true })}
        name='retypePassword'
        placeholder='Retype password'
        type='password'
        defaultValue=''
      // className={`input ${errors.username && 'is-danger'}`}
      />

      <input type="submit" value="Register"/>
    </form>
  </>

}
