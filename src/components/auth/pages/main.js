/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import { Grid, Container } from '@mui/material'

import bgImage from '../../../assets/images/Background/bgsub.jpg'

const buttonImage1 = 'https://www.nbadigitalservice.com/static/media/web-platform_0.6dc73100.png'
const buttonImage2 = 'https://www.nbadigitalservice.com/static/media/web-jump_0.0323920d.png'

export default function index({ signIn }) {
  console.log(signIn)

  return (
    <>
      <Grid
        sx={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: 'cover',
          height: '100vh',
          padding: 5,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top'
        }}
      >
        {/* <Container> */}
        <Grid container item xs={12} lg={12} sx={{ mx: 'auto' }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              transformOrigin: 'center center',
              transition: 'transform 2s, filter 1.5s ease-in-out',
              filter: 'brightness(100%)',
              '&:hover': {
                filter: 'brightness(100%)',
                transform: 'scale(1.2)'
              }
            }}
          >
            {/* <Link to="/pages/landing-pages/contact"> */}
            <a href='https://nba-platform.nbadigitalservice.com/'>
              {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}> */}
              <input
                className='image-sunmain-rigth'
                type='image'
                id='image'
                src={buttonImage2}
                style={{
                  paddingTop: '10%',
                  display: 'block',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto',
                  width: '65%'
                }}
              />
              {/* </motion.div> */}
            </a>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              transformOrigin: 'center center',
              transition: 'transform 2s, filter 1.5s ease-in-out',
              filter: 'brightness(100%)',
              '&:hover': {
                filter: 'brightness(100%)',
                transform: 'scale(1.2)'
              }
            }}
          >
            {/* <a href='https://www.jumpconnect.net/member/member_regis_info.php?sp_code=27982&qr_code=1'> */}
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}> */}
            <input
              className='image-sunmain-left'
              type='image'
              id='image'
              src={buttonImage1}
              onClick={() => signIn()}
              style={{
                paddingTop: '10%',
                display: 'block',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                width: '65%'
              }}
            />
            {/* </motion.div> */}
            {/* </a> */}
          </Grid>
        </Grid>
        {/* </Container> */}
      </Grid>
    </>
  )
}
