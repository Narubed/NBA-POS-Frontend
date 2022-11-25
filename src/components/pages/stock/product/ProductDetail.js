import React, { useState, useEffect } from 'react'

import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Swal from 'sweetalert2'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { display } from '@mui/system'

// images
import imagesicon from '../../../../../public/images/products/NoImage.png'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ImgStyled = styled('img')(({ theme }) => ({
  width: '50%',
  height: '50%',
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

export default function AlertDialogSlide({ isOpenDetail, setOpenDetail, item }) {
  const handleClose = () => {
    setOpenDetail(false)
  }
  const [file, setfile] = React.useState([])
  const [filepreview, setfilepreview] = React.useState(null)

  const [isDisabled, setDisabled] = React.useState(false)

  const [values, setValues] = React.useState({
    product_id: item.product_id,
    product_name: item.product_name,
    product_type: item.product_type,
    product_cost: item.product_cost,
    product_price: item.product_price,
    product_unit_store: item.product_unit_store,
    product_pay_tax: item.product_pay_tax,
    product_image: item.product_image,
    product_status: item.product_status
  })

  //   const [values, setValues] = React.useState([])

  const [imgSrc, setImgSrc] = React.useState(
    values.product_image !== 'ไม่มี'
      ? `${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${item.product_image}`
      : imagesicon.src
  )

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      setfile(files[0])
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const resetImage = async () => {
    setfile([])

    // setImgSrc(`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${item.product_image}`)
  }

  return (
    <>
      <Dialog
        fullWidth
        open={isOpenDetail}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          <Grid item sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <Grid>ชื่อสินค้า : {item.product_name}</Grid>
            <Grid>
              {' '}
              {/* <FormGroup>
                <FormControlLabel
                  control={<Switch />}
                  checked={isDisabled}
                  color='secondary'
                  onChange={e => setDisabled(e.target.checked)}
                  label={isDisabled ? 'ปิดการเเก้ไข' : 'เปิดการเเก้ไข'}
                />
              </FormGroup> */}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Box
              sx={{
                // width: 480,
                height: '100%'
              }}
              role='presentation'
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                {/* {filepreview !== null ? <img className='previewimg' src={filepreview} alt='UploadImage' /> : null} */}
                {/* <Box>
                  <ButtonStyled
                    component='label'
                    variant='contained'
                    htmlFor='account-settings-upload-image'
                    disabled={!isDisabled}
                  >
                    เปลี่ยนไฟล์รูปภาพสินค้า
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled
                    color='error'
                    variant='outlined'
                    onClick={() => resetImage()}
                    disabled={!isDisabled}
                  >
                    Reset
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    แนะนำให้เป็นไฟล์ png หรือ jpeg ขนาดไม่เกิน 800K.
                  </Typography>
                </Box> */}
              </Box>

              <List sx={{ p: '0px 20px' }}>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='product_id'>
                      ไอดีสินค้า <a style={{ color: 'red' }}>*ห้ามซ้ำ</a>
                    </InputLabel>
                    <Input
                      disabled={!isDisabled}
                      id='product_id'
                      value={values.product_id}
                      onChange={handleChange('product_id')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon='emojione:locked-with-key' />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='product_name'>ชื่อสินค้า</InputLabel>
                    <Input
                      disabled={!isDisabled}
                      id='product_name'
                      value={values.product_name}
                      onChange={handleChange('product_name')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon='bxs:rename' />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='product_type'>ประเภทสินค้า</InputLabel>
                    <Input
                      disabled={!isDisabled}
                      id='product_type'
                      value={values.product_type}
                      onChange={handleChange('product_type')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon='vscode-icons:file-type-bat' />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='product_cost'>ราคาต้นทุน</InputLabel>
                    <Input
                      disabled={!isDisabled}
                      type='number'
                      id='product_cost'
                      value={values.product_cost}
                      onChange={handleChange('product_cost')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon='mdi:hand-coin' />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='product_price'>ราคาขาย</InputLabel>
                    <Input
                      disabled={!isDisabled}
                      type='number'
                      id='product_price'
                      value={values.product_price}
                      onChange={handleChange('product_price')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon='ri:hand-coin-fill' />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='product_unit_store'>สินค้าคงเหลือในสต๊อก</InputLabel>
                    <Input
                      disabled={!isDisabled}
                      type='number'
                      id='product_unit_store'
                      value={values.product_unit_store}
                      onChange={handleChange('product_unit_store')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon='bxs:coin-stack' />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
                <FormGroup>
                  <FormControlLabel
                    disabled={!isDisabled}
                    control={<Switch />}
                    checked={values.product_pay_tax}
                    color='secondary'
                    onChange={e => setValues({ ...values, product_pay_tax: e.target.checked })}
                    label={
                      values.product_pay_tax
                        ? 'สินค้าที่ได้รับการยกเว้นภาษีมูลค้าเพิ่ม'
                        : 'สินค้าที่คิดภาษีมูลค้าเพิ่มแล้ว'
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    disabled={!isDisabled}
                    control={<Switch />}
                    checked={values.product_status}
                    color='secondary'
                    onChange={e => setValues({ ...values, product_status: e.target.checked })}
                    label={values.product_status ? 'สถานะพร้อมจำหน่าย' : 'สถานะไม่พร้อมจำหน่าย'}
                  />
                </FormGroup>
                {/* <ListItem disablePadding>
                  <FormControl fullWidth variant='standard' sx={{ m: 1 }}>
                    <Button
                      disabled={!isDisabled}
                      onClick={() => headleSubmit()}
                      variant='contained'
                      sx={{
                        transition: '.2s transform ease-in-out',
                        borderRadius: '15px',
                        '&:hover': {
                          // border: '2px solid transparent',

                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      ยืนยันการแก้ไขข้อมูล
                    </Button>
                  </FormControl>
                </ListItem> */}
              </List>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>
            ออก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
