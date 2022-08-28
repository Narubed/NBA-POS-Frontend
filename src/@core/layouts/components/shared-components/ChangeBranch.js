import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
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
import { CardActionArea, Grid } from '@mui/material'

import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import MessageOutline from 'mdi-material-ui/MessageOutline'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const styles = {
  py: 2,
  px: 4,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: 'text.primary',
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.375rem',
    color: 'text.secondary'
  }
}

export default function ChangeBranch() {
  const router = useRouter()
  const { data: session } = useSession()
  const valueUsers = session.user

  console.log(valueUsers)
  const [open, setOpen] = React.useState(false)
  const [isBranchs, setBranchs] = React.useState([])

  useEffect(() => {
    getBranchOwner()
  }, [])

  const getBranchOwner = async () => {
    const getBranch = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/branch/owner/${valueUsers._id}`)
    const findOnlineBranch = getBranch.data.data.filter(item => item.branch_status === true)
    setBranchs(findOnlineBranch)
  }

  const onClickBranch = item => {
    localStorage.setItem('branch', item._id)
    if (router.pathname === '/') {
      router.push('/report/dashboard/')
    } else {
      router.push('/')
    }
    setOpen(false)
  }

  return (
    <>
      {' '}
      {valueUsers.type === 'owner' && (
        <MenuItem sx={{ p: 0 }} onClick={() => setOpen(true)}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            สาขา
          </Box>
        </MenuItem>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>สาขาที่คุณมีอยู่</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {isBranchs.map(item => (
              <Card key={item._id}>
                <CardActionArea onClick={() => onClickBranch(item)}>
                  <CardContent>
                    <Grid container>
                      <Grid xs={5} sx={{ textAlign: 'center' }}>
                        <img
                          src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${item.branch_image}`}
                          alt='123'
                          width='50%'
                        />
                      </Grid>
                      <Grid
                        xs={7}
                        sx={{
                          pt: 8,
                          alignItems: 'center',
                          justifyContent: 'center',
                          justifyItems: 'center',
                          alignContent: 'center',
                          textAlign: 'center'
                        }}
                      >
                        <Typography sx={{ fontWeight: 600 }}> {item.branch_name}</Typography>
                        <br />
                        {item.branch_vat_name !== 'ไม่มี' && (
                          <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                            {item.branch_vat_name}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>ออก</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
