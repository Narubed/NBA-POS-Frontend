/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import CardProduct from './components/CardProduct'
import { Grid, Container, Box, Typography, Badge } from '@mui/material'

function dashboard() {
  const renderData = (
    <Grid container spacing={2} sx={{ mb: 10 }}>
      <Grid item xs={12} lg={3}>
        <Box position='sticky' top='100px' pb={{ xs: 2, lg: 6 }}>
          <Typography variant='h3' fontWeight='bold' mb={1}>
            เครื่องคิดเลข
          </Typography>
          <Typography variant='body2' fontWeight='regular' color='secondary' mb={1} pr={2}>
            123
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sx={{ mb: 2 }}>
            <CardProduct />
          </Grid>
          <Grid item xs={12} md={3} sx={{ mb: 2 }}>
            <CardProduct />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <Box component='section' my={6} py={6}>
      {renderData}
    </Box>
  )
}

export default dashboard
