// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Box, Grid } from '@mui/material'

// ** Layout Import
import BlankLayout from '../../../src/@core/layouts/BlankLayout'

// ** Demo Imports
// import FooterIllustrations from '../src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const CustomerDisplay = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        background: '#000000',
        backgroundSize: 'cover',
        height: '100vh',
        padding: 5,
        backgroundPosition: 'top'
      }}
    >
      <Grid item xs={6} md={6}>
        123
      </Grid>
      <Grid item xs={6} md={6}>
        <Box sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <BoxWrapper>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
              ไม่มีหน้าที่ต้องการค้นหา ⚠️
            </Typography>
            <Typography variant='body2'>We couldn&prime;t find the page you are looking for.</Typography>
          </BoxWrapper>
          <Img
            height='400'
            alt='error-illustration'
            src='https://foodexpress.nbadigitalservice.com/static/illustrations/illustration_404.svg'
          />
          <Link passHref href='/'>
            <Button component='a' variant='contained' sx={{ px: 5.5 }}>
              กลับไปสู่หน้าหลัก
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}
CustomerDisplay.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default CustomerDisplay
