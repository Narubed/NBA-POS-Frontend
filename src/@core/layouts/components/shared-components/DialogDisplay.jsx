import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Grid } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
  const { isOpenDisplay, setOpenDisplay } = props
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpenDisplay(false)
  }

  const handleDisplay = url => {
    window.open(`/customer/display/${url}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      <Dialog
        fullWidth
        open={isOpenDisplay}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'เลือกขนาดหน้าจอที่คุณต้องการ ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Grid container spacing={4}>
              {data1.map(item => (
                <Grid item xs={12} sm={4} key={item.name}>
                  <Card onClick={() => handleDisplay(item.nav)}>
                    <CardActionArea sx={{ p: 3, bgcolor: 'primary.dark', textAlign: 'center' }}>
                      <Typography gutterBottom variant='h5' component='div' sx={{ color: '#FFFFFF' }}>
                        <a style={{ fontSize: 15 }}>มาตราฐาน</a>
                        <br />
                        {item.name}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
              {data2.map(item => (
                <Grid item xs={12} sm={3} key={item.name}>
                  <Card onClick={() => handleDisplay(item.nav)}>
                    <CardActionArea sx={{ p: 3, bgcolor: 'primary.main', textAlign: 'center' }}>
                      <Typography gutterBottom variant='body2' component='div' sx={{ color: '#FFFFFF' }}>
                        {item.name}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ออก</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const data1 = [
  {
    name: '4 : 3',
    nav: '4x3'
  },
  {
    name: '16 : 9',
    nav: '16x9'
  },
  {
    name: '16 : 10',
    nav: '16x10'
  }
]

const data2 = [
  {
    name: '800 : 600',
    nav: '800x600'
  },
  {
    name: '1024 : 768',
    nav: '1024x768'
  },
  {
    name: '1152 : 864',
    nav: '1152x864'
  },
  {
    name: '1176 : 664',
    nav: '1176x664'
  },
  {
    name: '1280 : 720',
    nav: '1280x720'
  },
  {
    name: '1280 : 768',
    nav: '1280x768'
  },
  {
    name: '1280 : 800',
    nav: '1280x800'
  },
  {
    name: '1280 : 960',
    nav: '1280x960'
  },
  {
    name: '1280 : 1024',
    nav: '1280x1024'
  },
  {
    name: '1366 : 768',
    nav: '1366x768'
  },
  {
    name: '1440 : 900',
    nav: '1440x900'
  },
  {
    name: '1600 : 900',
    nav: '1600x900'
  },
  {
    name: '1600 : 1024',
    nav: '1600x1024'
  },
  {
    name: '1600 : 1050',
    nav: '1600x1050'
  },
  {
    name: '1768 : 992',
    nav: '1768x992'
  },
  {
    name: '1920 : 1080',
    nav: '1920x1080'
  }
]
