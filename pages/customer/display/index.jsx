/* eslint-disable react-hooks/rules-of-hooks */
// ** Next Import
import React, { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Box, Grid } from '@mui/material'

// ** Layout Import
import Main from '../../../src/components/auth/pages/main'
import BlankLayout from '../../../src/@core/layouts/BlankLayout'
import { addItem, loading } from '../../../src/store/actions'
import Image from 'next/image'

// ** Demo Imports
// import FooterIllustrations from '../src/views/pages/misc/FooterIllustrations' ../../../store/actions

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: '100%',
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: '100%'
  },
  [theme.breakpoints.down('xs')]: {
    height: '100%'
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const CustomerDisplay = () => {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  if (!session) return <Main signIn={signIn} />

  useEffect(() => {
    if (session) {
      function checkUserData() {
        const item = localStorage.getItem('shopping')
        if (item) {
          console.log(JSON.parse(item))

          // setOrder(JSON.parse(item))
          // dispatch(addItem(JSON.parse(item)))
        }
      }
      window.addEventListener('storage', checkUserData)
      
return () => {
        window.removeEventListener('storage', checkUserData)
      }
    }
  }, [session])

  return (
    <Grid
      container
      spacing={2}
      sx={{
        background: '#000000',
        backgroundSize: 'cover',
        height: '100vh',
        padding: 0,
        backgroundPosition: 'top'
      }}
    >
      <Grid item xs={12} md={6}>
        123
      </Grid>
      <Grid item xs={12} md={6} p={0}>
        <Carousel autoPlay infiniteLoop showStatus showThumbs={false}>
          <div>
            <img src='https://drive.google.com/uc?export=view&id=1LhyBE6Sdt8SqDKfGmro3cs9zBTdofwvh' />
          </div>
          <div>
            <img src='https://drive.google.com/uc?export=view&id=1LhyBE6Sdt8SqDKfGmro3cs9zBTdofwvh' />
          </div>
          <div>
            <img src='https://drive.google.com/uc?export=view&id=1LhyBE6Sdt8SqDKfGmro3cs9zBTdofwvh' />
          </div>
        </Carousel>
      </Grid>
    </Grid>
  )
}
CustomerDisplay.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default CustomerDisplay
