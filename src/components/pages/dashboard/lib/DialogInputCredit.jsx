import React, { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

function DialogInputCredit(props) {
  const { isInputCredit, setInputCredit, isOpenInputCredit, setOpenInputCredit, setRadioTypePay } = props
  const [isERROR, setERROR] = useState(false)

  const handleClose = () => {
    setRadioTypePay('เงินสด')
    setOpenInputCredit(false)
  }

  const onChangeInputCredit = event => {
    setInputCredit(event.target.value)
  }

  const handleSubmit = () => {
    if (isInputCredit.length < 16) {
      setERROR(true)
      setTimeout(() => {
        setERROR(false)
      }, 2000)
    } else {
      setOpenInputCredit(false)
    }
  }

  return (
    <div>
      <Dialog open={isOpenInputCredit} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>บัตรเครดิต</DialogTitle>
        <DialogContent>
          <DialogContentText>กรุณากรอกเลขบัตรเครดิต ของลูกค้าที่ต้องการชำระผ่านบัตรเครดิต</DialogContentText>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {isERROR && <Alert severity='error'>กรุณาตรวจสอบเลขบัตรอีกครั้ง — check it out!</Alert>}
          </Stack>
          <TextField
            value={isInputCredit}
            onChange={onChangeInputCredit}
            autoFocus
            margin='dense'
            id='name'
            label='เครดิต'
            type='number'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>
            ยกเลิก
          </Button>
          <Button onClick={handleSubmit}>ยืนยัน</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogInputCredit
