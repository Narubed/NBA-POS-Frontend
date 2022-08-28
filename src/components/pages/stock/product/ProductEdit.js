/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
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
import { styled } from '@mui/material/styles'
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

function ProductEdit({ showDrawerEdit, setDrawerEdit, isProducts }) {
  const { data: session } = useSession()
  const router = useRouter()
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    product_id: isProducts.product_id,
    product_name: isProducts.product_name,
    product_type: isProducts.product_type,
    product_cost: isProducts.product_cost,
    product_price: isProducts.product_price,
    product_unit_store: isProducts.product_unit_store,
    product_pay_tax: isProducts.product_pay_tax,
    product_status: isProducts.product_status,
    product_image: isProducts.product_image
  })

  const [imgSrc, setImgSrc] = useState(null)
  const [file, setfile] = useState([])

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

  const headleSubmit = async () => {
    const isBranch = localStorage.getItem('branch')
    const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/branch/${isBranch}`)
    if (getProducts || getProducts.data.data) {
      const findByID = getProducts.data.data.find(
        item =>
          item._id !== localStorage.getItem('product_id').toLocaleString() && item.product_id === values.product_id
      )
      if (findByID) {
        setDrawerEdit(false)
        Swal.fire({
          icon: 'error',
          title: 'ไอดีซ้ำ',
          text: 'กรุณาตรวจสอบไอดีสินค้าของท่านอีกครั้ง!',
          confirmButtonText: 'ตกลง'
        })
      } else {
        setDrawerEdit(false)
        if (file.length !== 0) {
          const formData = new FormData()
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
            title: 'ยืนยันการแก้ไข?',
            text: 'คุณต้องการแก้ไขสินค้านี้หรือไม่ !',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
          }).then(async result => {
            if (result.isConfirmed) {
              dispatch(loading(true))
              await checkProductHistory()
              await axios.put(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/${isProducts._id}`, formData)
              await axios.delete(`${process.env.NEXT_PUBLIC_POS_BACKEND}/delete_image/${isProducts.product_image}`)
              dispatch(loading(false))
              Swal.fire({
                icon: 'success',
                title: 'คุณได้ทำการแก้ไขเรียบร้อยแล้ว',
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(() => {
                router.replace('/')
              }, 1500)
            }
          })
        } else {
          const data = {
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
            title: 'ยืนยันการแก้ไข?',
            text: 'คุณต้องการแก้ไขสินค้านี้หรือไม่ !',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
          }).then(async result => {
            if (result.isConfirmed) {
              dispatch(loading(true))
              await checkProductHistory()
              await axios.put(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/${isProducts._id}`, data)
              dispatch(loading(false))
              Swal.fire({
                icon: 'success',
                title: 'คุณได้ทำการแก้ไขเรียบร้อยแล้ว',
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

  const checkProductHistory = async () => {
    if (parseFloat(values.product_unit_store) !== parseFloat(isProducts.product_unit_store)) {
      const getReference = await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history/reference_stock`, {
        branch: isProducts.product_branch_id,
        date: dayjs(Date.now()).format()
      })

      const editStockProductHistory = {
        pdh_branch_id: isProducts.product_branch_id,
        pdh_product_id: isProducts._id,
        pdh_type: 'stock',
        pdh_channel: 'ปรับสต๊อก',
        pdh_type_number: 'บวก',
        pdh_reference: `${getReference.data.reference}`,
        pdh_old_number: isProducts.product_unit_store,
        pdh_change_number: parseFloat(values.product_unit_store) - parseFloat(isProducts.product_unit_store),
        pdh_new_number: values.product_unit_store,
        pdh_make_list: session.user.name,
        pdh_timestamp: dayjs(Date.now()).format()
      }
      await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history`, editStockProductHistory)
    }
    if (parseFloat(values.product_cost) !== parseFloat(isProducts.product_cost)) {
      const getReference = await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history/reference_cost`, {
        branch: isProducts.product_branch_id,
        date: dayjs(Date.now()).format()
      })

      const editStockProductHistory = {
        pdh_branch_id: isProducts.product_branch_id,
        pdh_product_id: isProducts._id,
        pdh_type: 'cost',
        pdh_channel: 'ปรับต้นทุน',
        pdh_type_number: 'บวก',
        pdh_reference: `${getReference.data.reference}`,
        pdh_old_number: isProducts.product_cost,
        pdh_change_number: parseFloat(values.product_cost) - parseFloat(isProducts.product_cost),
        pdh_new_number: values.product_cost,
        pdh_make_list: session.user.name,
        pdh_timestamp: dayjs(Date.now()).format()
      }
      await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history`, editStockProductHistory)
    }
    if (parseFloat(values.product_price) !== parseFloat(isProducts.product_price)) {
      const getReference = await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history/reference_price`, {
        branch: isProducts.product_branch_id,
        date: dayjs(Date.now()).format()
      })

      const editStockProductHistory = {
        pdh_branch_id: isProducts.product_branch_id,
        pdh_product_id: isProducts._id,
        pdh_type: 'price',
        pdh_channel: 'ปรับราคา',
        pdh_type_number: 'บวก',
        pdh_reference: `${getReference.data.reference}`,
        pdh_old_number: isProducts.product_price,
        pdh_change_number: parseFloat(values.product_price) - parseFloat(isProducts.product_price),
        pdh_new_number: values.product_price,
        pdh_make_list: session.user.name,
        pdh_timestamp: dayjs(Date.now()).format()
      }
      await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history`, editStockProductHistory)
    }
  }

  return (
    <div>
      <Dialog anchor='right' open={showDrawerEdit} onClose={() => setDrawerEdit(false)}>
        <DialogTitle>
          <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
            <Typography variant='h4' gutterBottom sx={{ m: 3 }}>
              รายละเอียดสินค้า
            </Typography>
            <IconButton product_cost-label='delete' sx={{ m: 3 }} onClick={() => setDrawerEdit(false)}>
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
                  {/* <ImgStyled src={imgSrc} alt='Profile Pic' /> */}
                  {file.length === 0 ? (
                    values.product_image === 'ไม่มี' ? (
                      <ImgStyled
                        src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}1skPG9BiQsyMkacMmNVnCZfeZ2-x_yK_c`}
                        alt='Profile Pic'
                      />
                    ) : (
                      <ImgStyled
                        src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${values.product_image}`}
                        alt='Profile Pic'
                      />
                    )
                  ) : (
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                  )}

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

                    <Typography variant='body2' sx={{ marginTop: 5 }}>
                      แนะนำให้เป็นไฟล์ png หรือ jpeg ขนาดไม่เกิน 800K.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

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
                        ? 'สินค้าที่ได้รับการยกเว้นภาษีมูลค้าเพิ่ม'
                        : 'สินค้าที่คิดภาษีมูลค้าเพิ่มแล้ว'
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
                      ยืนยันการแก้ไขข้อมูล
                    </Button>
                  </FormControl>
                </ListItem>
              </List>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => setDrawerEdit(false)}>
            ออก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProductEdit
