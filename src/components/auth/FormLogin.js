import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useRouter } from 'next/router'
import { useFormik, Form, FormikProvider } from 'formik'
import * as yup from 'yup'
import { Icon } from '@iconify/react'
import { signIn } from 'next-auth/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'

import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'

const LoginSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email address').required('Email is required'),
  password: yup.string().required('Password is required')
})

const FormLogin = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async values => {
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}`
      })
      if (res?.error) {
        setError(res.error)
      } else {
        setError(null)
      }

      if (res.url) router.push(res.url)
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik

  const handleShowPassword = () => {
    setShowPassword(show => !show)
  }

  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3} sx={{ mb: 3 }}>
            {error ? <Alert severity='error'>email หรือ password ผิด — กรุณาเช็คความถูกต้อง!</Alert> : null}
            <TextField
              fullWidth
              autoComplete='username'
              type='email'
              label='Email'
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete='current-password'
              type={showPassword ? 'text' : 'password'}
              label='Password'
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword} edge='end'>
                      <Icon icon='bxs:show' />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>
          {/*  
          <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label='Remember me'
            />
          </Stack> */}

          <Button fullWidth size='large' type='submit' variant='contained' loading={isSubmitting}>
            เข้าสู่ระบบ
          </Button>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default FormLogin
