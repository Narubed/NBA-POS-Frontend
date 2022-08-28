import * as React from 'react'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import { addItem } from '../../../../store/actions'

export default function DialogNoteProduct({ row }) {
  const dispatch = useDispatch()
  const valueListProduct = useSelector(state => state.list)
  const [openDialog, setDialog] = React.useState(false)
  const [isNote, setNote] = React.useState(row.product_note)
  const [isDiscountProductm, setDiscountProduct] = React.useState(0)

  const handleClose = () => {
    setDialog(false)
  }

  const handleOpen = () => {
    setDialog(true)
  }

  const onChangeDiscound = event => {
    setDiscountProduct(parseFloat(event.target.value))
  }

  const onChangeNote = event => {
    setNote(event.target.value)
  }

  const confirmChangeProduct = () => {
    const newListOrder = []
    valueListProduct.forEach(element => {
      if (element._id === row._id) {
        newListOrder.push({ ...element, product_discount: isDiscountProductm, product_note: isNote })
      } else {
        newListOrder.push(element)
      }
    })
    dispatch(addItem(newListOrder))
    setDialog(false)
  }

  return (
    <>
      <IconButton color='primary' aria-label='upload picture' component='label' onClick={() => handleOpen()}>
        <Icon icon='arcticons:writeilypro' color='purple' />
      </IconButton>
      <Dialog open={openDialog} onClose={handleClose} maxWidth='xs' sx={{ zindex: 1200 }}>
        <DialogTitle>แก้ไขรายส่วนลดสินค้า</DialogTitle>
        <DialogContent>
          <DialogContentText>เพิ่มส่วนลดให้กับสินค้าชิ้นนี้ พร้อมเพิ่มหมายเหตุ</DialogContentText>
          <TextField
            type='number'
            autoFocus
            margin='dense'
            id='name'
            label='ส่วนลดเฉพาะสินค้าชินนี้'
            fullWidth
            variant='standard'
            onChange={e => onChangeDiscound(e)}
            InputProps={{
              startAdornment: <InputAdornment position='start'>-</InputAdornment>
            }}
          />

          <TextField
            margin='dense'
            id='name'
            label='หมายเหตุ'
            fullWidth
            variant='standard'
            defaultValue={row.product_note}
            onChange={e => onChangeNote(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button color='primary' onClick={() => confirmChangeProduct()}>
            ยืนยันการแก้ไข
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
