/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import catImage from '../../../public/images/gif/cat.gif'
import loadingImage from '../../../public/images/gif/loading3.gif'

import { loading } from '../../store/actions'

export default function LoadingPage() {
  const dispatch = useDispatch()
  const valueLoading = useSelector(state => state.loading)

  return (
    <div>
      {/* <Button onClick={() => dispatch(loading(true))}>1231321</Button> */}
      <Dialog
        aria-labelledby='customized-dialog-title'
        open={valueLoading}
        sx={{ backgroundColor: 'transparent' }}
        maxWidth='xs'
      >
        <DialogContent dividers>
          <img src={catImage.src} frameBorder='0' allowFullScreen width='100%' height='100px' />
          <Grid sx={{ alignItems: 'center', justifyContent: 'center', m: 0 }}>
            loading...
            <img src={loadingImage.src} frameBorder='0' allowFullScreen width='100%' height='10px' />
          </Grid>
        </DialogContent>
        {/* <Button onClick={() => dispatch(loading(false))}>1231321</Button> */}
      </Dialog>
    </div>
  )
}
