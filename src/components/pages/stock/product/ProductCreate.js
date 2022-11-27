import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Swal from 'sweetalert2'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// images
import imagesicon from '../../../../../public/images/products/NoImage.png'

// loading
import { loading } from '../../../../store/actions'

const ImgStyled = styled('img')(({ theme }) => ({
  width: '30%',
  height: '30%',
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

function ProductCreate({ showDrawerCreate, setDrawerCreate, fetcherData }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const [values, setValues] = React.useState({
    product_id: '',
    product_name: '',
    product_type: '',
    product_cost: 0,
    product_price: 0,
    product_unit_store: 0,
    product_pay_tax: false,
    product_image: '',
    product_status: true
  })

  const [imgSrc, setImgSrc] = useState(imagesicon.src)
  const [file, setfile] = useState([])
  const [isAlert, setAlert] = useState(false)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': `Bearer ${localStorage.getItem('token')}`
    }
  }

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
    setImgSrc(imagesicon.src)
  }

  const headleSubmit = async () => {
    if (!values.product_id || !values.product_name || !values.product_type) {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 2000)
    } else {
      const isBranch = localStorage.getItem('branch')
      const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/branch/${isBranch}`, config)
      if (getProducts || getProducts.data.data) {
        const findByID = getProducts.data.data.find(item => item.product_id === values.product_id)
        if (findByID) {
          setDrawerCreate(false)
          Swal.fire({
            icon: 'error',
            title: 'ไอดีซ้ำ',
            text: 'กรุณาตรวจสอบไอดีสินค้าของท่านอีกครั้ง!',
            confirmButtonText: 'ตกลง'
          })
        } else {
          setDrawerCreate(false)
          if (file.length !== 0) {
            const formData = new FormData()
            formData.append('product_branch_id', isBranch)
            formData.append('product_id', values.product_id)
            formData.append('product_name', values.product_name)
            formData.append('product_cost', values.product_cost)
            formData.append('product_price', values.product_price)
            formData.append('product_image', file)
            formData.append('product_unit_store', values.product_unit_store)
            formData.append('product_type', values.product_type)
            formData.append('product_pay_tax', values.product_pay_tax)
            formData.append('product_status', values.product_status)
            Swal.fire({
              title: 'ยืนยันการเพิ่ม?',
              text: 'คุณต้องการเพิ่มสินค้านี้หรือไม่ !',
              icon: 'warning',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              confirmButtonText: 'ตกลง',
              cancelButtonText: 'ยกเลิก'
            }).then(async result => {
              if (result.isConfirmed) {
                dispatch(loading(true))
                await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products`, formData, config)
                dispatch(loading(false))
                Swal.fire({
                  icon: 'success',
                  title: 'คุณได้ทำการเพิ่มเรียบร้อยแล้ว',
                  showConfirmButton: false,
                  timer: 1500
                })
                setTimeout(() => {
                  fetcherData()
                }, 1500)
              }
            })
          } else {
            const data = {
              product_branch_id: isBranch,
              product_id: values.product_id,
              product_name: values.product_name,
              product_cost: values.product_cost,
              product_price: values.product_price,
              product_unit_store: values.product_unit_store,
              product_type: values.product_type,
              product_pay_tax: values.product_pay_tax,
              product_status: values.product_status
            }
            Swal.fire({
              title: 'ยืนยันการเพิ่ม?',
              text: 'คุณต้องการเพิ่มสินค้านี้หรือไม่ !',
              icon: 'warning',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              confirmButtonText: 'ตกลง',
              cancelButtonText: 'ยกเลิก'
            }).then(async result => {
              if (result.isConfirmed) {
                dispatch(loading(true))
                await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products`, data, config)
                dispatch(loading(false))
                Swal.fire({
                  icon: 'success',
                  title: 'คุณได้ทำการเพิ่มเรียบร้อยแล้ว',
                  showConfirmButton: false,
                  timer: 1500
                })
                setTimeout(() => {
                  router.replace('/')
                }, 1500)
              }
            })
          }
        }
      }
    }
  }

  return (
    <div>
      {' '}
      <Dialog anchor='right' open={showDrawerCreate} onClose={() => setDrawerCreate(false)}>
        <DialogTitle>
          <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
            <Typography variant='h4' gutterBottom sx={{ m: 3 }}>
              รายละเอียดสินค้า
            </Typography>
            <IconButton product_cost-label='delete' sx={{ m: 3 }} onClick={() => setDrawerCreate(false)}>
              <Icon icon='icomoon-free:exit' />
            </IconButton>
          </Stack>
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
              <Grid item xs={12} sx={{ marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled src={imgSrc} alt='Profile Pic' />

                  <Box>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      เปลี่ยนรูปภาพที่แสดง
                      <input
                        hidden
                        type='file'
                        onChange={onChange}
                        accept='image/png, image/jpeg'
                        id='account-settings-upload-image'
                      />
                    </ButtonStyled>

                    <ResetButtonStyled color='error' variant='outlined' onClick={() => resetImage()}>
                      Reset
                    </ResetButtonStyled>

                    <Typography variant='body2' sx={{ marginTop: 5 }}>
                      แนะนำให้เป็นไฟล์ png หรือ jpeg ขนาดไม่เกิน 800K.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              {isAlert && (
                <Alert severity='warning'>
                  <AlertTitle>Warning</AlertTitle>
                  กรุณาตรวจสอบข้อมูลที่ท่านกรอกอีกครั้ง — <strong>check detail products!</strong>
                </Alert>
              )}
              <List sx={{ p: '0px 20px' }}>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='product_id'>
                      ไอดีสินค้า <a style={{ color: 'red' }}>*ห้ามซ้ำ</a>
                    </InputLabel>
                    <Input
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
                    control={<Switch />}
                    checked={values.product_pay_tax}
                    color='secondary'
                    onChange={e => setValues({ ...values, product_pay_tax: e.target.checked })}
                    label={
                      values.product_pay_tax
                        ? 'สินค้าที่ได้รับการยกเว้นภาษีมูลค้าเพิ่ม (ไม่คิดภาษี)'
                        : 'สินค้าที่คิดภาษีมูลค้าเพิ่มแล้ว (คิดภาษี)'
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch />}
                    checked={values.product_status}
                    color='secondary'
                    onChange={e => setValues({ ...values, product_status: e.target.checked })}
                    label={values.product_status ? 'สถานะพร้อมจำหน่าย' : 'สถานะไม่พร้อมจำหน่าย'}
                  />
                </FormGroup>
                <ListItem disablePadding>
                  <FormControl fullWidth variant='standard' sx={{ m: 1 }}>
                    <Button
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
                      ยืนยันการเพิ่มข้อมูล
                    </Button>
                  </FormControl>
                </ListItem>
              </List>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => setDrawerCreate(false)}>
            ออก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProductCreate
