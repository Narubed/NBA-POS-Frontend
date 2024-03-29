import { styled } from '@mui/material/styles'
import { Card, Link, Container, Typography, Box } from '@mui/material'

import LoginForm from '../src/components/auth/FormLogin'
import useResponsive from '../src/hooks/useResponsive'

import bgLogin from '../public/images/Background/bglogin4.png'
import backgroundLogin from '../public/images/Background/bglogin3.png'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // backgroundColor: 'red'
  backgroundImage: `url(${backgroundLogin.src})`,
  backgroundSize: 'cover',
  height: '100vh',
  padding: 5,
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',

  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '99%',
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
  width: '110%',
  maxWidth: 450,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  backgroundImage: `url(${'https://www.kindpng.com/picc/m/46-469886_liqu-bubble-transparent-background-bubbles-png-png-download.png'})`
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 500,
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
        {/* <img src='https://api.nbadigitalservice.com/static/images/icons/nbadigital.png' alt='login' width={'60px'} /> */}
        <div />
        {smUp && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              color: '#FFFFFF',
              alignItems: 'right',
              '& :not(:last-child)': { mr: 4 }
            }}
          >
            <Link target='_blank' href='https://nba-pos-admin.nbadigitalservice.com'>
              <a style={{ color: '#FFFFFF' }}> Admin Web</a>
            </Link>
          </Box>
        )}
      </HeaderStyle>

      {mdUp && (
        <SectionStyle>
          <img src={bgLogin.src} alt='login' style={{ backgroundAttachment: 'fixed' }} />
        </SectionStyle>
      )}

      <Container maxWidth='sm'>
        <ContentStyle>
          <Typography variant='h5' gutterBottom sx={{ color: '#FFFFFF' }}>
            ยินดีต้อนรับสู่ระบบจัดการขายหน้าร้าน (POS)
          </Typography>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
