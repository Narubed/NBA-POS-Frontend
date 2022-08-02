import { styled } from '@mui/material/styles'
import { Card, Link, Container, Typography } from '@mui/material'

import LoginForm from '../src/components/auth/FormLogin'
import useResponsive from '../src/hooks/useResponsive'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '85%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  backgroundImage: `url(${'https://www.kindpng.com/picc/m/46-469886_liqu-bubble-transparent-background-bubbles-png-png-download.png'})`
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '95vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column'
}))

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm')

  const mdUp = useResponsive('up', 'md')

  return (
    <RootStyle>
      <HeaderStyle>
        <img src='https://api.nbadigitalservice.com/static/images/icons/nbadigital.png' alt='login' width={'60px'} />

        {/* {smUp && (
          <Typography variant='body2' sx={{ mt: { md: -2 } }}>
            Don’t have an account? Get started
          </Typography>
        )} */}
      </HeaderStyle>

      {mdUp && (
        <SectionStyle>
          <img src='https://foodexpress.nbadigitalservice.com/static/illustrations/icon%2001-01.png' alt='login' />
        </SectionStyle>
      )}

      <Container maxWidth='sm'>
        <ContentStyle>
          <Typography variant='h5' gutterBottom>
            คิดคำไม่ออก POS
          </Typography>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
