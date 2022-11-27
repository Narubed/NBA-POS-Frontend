/* eslint-disable react-hooks/rules-of-hooks */
// ** Next Import
import React, { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useDispatch } from 'react-redux'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import axios from 'axios'

// ** MUI Components
import { Grid } from '@mui/material'

// ** Layout Import
import Main from '../../../src/components/auth/pages/main'
import BlankLayout from '../../../src/@core/layouts/BlankLayout'
import Display from '../../../src/components/pages/customer/display'

const CustomerDisplay = () => {
  const { data: session } = useSession()
  const [isShopping, setShopping] = useState([])
  const [isScanner, setScanner] = useState({})
  const [isAdvert, setAdvert] = useState([])
  const HeightCard = '470px'
  const HeightScroll = '460px'

  useEffect(() => {
    if (session) {
      function checkUserData() {
        const item = localStorage.getItem('shopping')
        const scanner = localStorage.getItem('scaner')
        if (item) {
          setShopping(JSON.parse(item))
        }
        if (scanner) {
          setScanner(JSON.parse(scanner))
        }
      }
      window.addEventListener('storage', checkUserData)

      return () => {
        window.removeEventListener('storage', checkUserData)
      }
    }
  }, [session])

  useEffect(() => {
    fetchImage()
  }, [])

  const fetchImage = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_POS_ADMIN_BACKEND}/advert`)
      .then(json => setAdvert(json.data.data.advert_images))
  }

  if (!session) return <Main signIn={signIn} />

  return (
    <Grid
      container
      spacing={2}
      sx={{
        background: '#FFFFFF',
        backgroundSize: 'cover',
        height: '100vh',
        padding: 0,
        backgroundPosition: 'top'
      }}
    >
      <Grid item xs={12} md={6.9}>
        <Display isShopping={isShopping} isScanner={isScanner} HeightCard={HeightCard} HeightScroll={HeightScroll} />
      </Grid>
      <Grid item xs={12} md={5.1} mt={0.5} pr={0.5}>
        <Carousel autoPlay infiniteLoop showStatus showThumbs={false}>
          {isAdvert.map(item => (
            <div
              key={item}
              style={{
                backgroundImage: `url('${process.env.NEXT_PUBLIC_POS_ADMIN_BACKEND}/static/advert/${item}')`,
                backgroundSize: 'cover',
                height: '99vh',
                padding: 1,
                backgroundPosition: 'top'
              }}
            ></div>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  )
}
CustomerDisplay.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default CustomerDisplay
