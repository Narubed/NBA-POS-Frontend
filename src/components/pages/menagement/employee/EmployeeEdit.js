/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
import NativeSelect from '@mui/material/NativeSelect'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

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

function ProductEdit({ showDrawerEdit, setDrawerEdit, row, findEmployees }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    employee_name: row.employee_name,
    employee_email: row.employee_email,
    employee_password: '',
    employee_phone: row.employee_phone,
    employee_type: row.employee_type,
    employee_branch_id: row.employee_branch_id,
    employee_image: row.employee_image,
    employee_status: row.employee_status
  })

  const [imgSrc, setImgSrc] = useState(null)
  const [file, setfile] = useState([])
  const [isShowPassword, setShowPassword] = useState(false)
  const [isAlert, setAlert] = useState(false)

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
    if (
      !values.employee_name ||
      !values.employee_email ||
      (isShowPassword && !values.employee_password) ||
      !values.employee_phone
    ) {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 2000)
    } else {
      setDrawerEdit(false)
      if (file.length !== 0) {
        const formData = new FormData()
        formData.append('employee_name', values.employee_name)
        formData.append('employee_email', values.employee_email)
        formData.append('employee_phone', values.employee_phone)
        formData.append('employee_type', values.employee_type)
        formData.append('employee_image', file)
        formData.append('employee_status', values.employee_status)
        if (isShowPassword === true) {
          formData.append('employee_password', values.employee_password)
        }
        Swal.fire({
          title: 'ยืนยันการแก้ไข?',
          text: 'คุณต้องการแก้ไขพนักงานหรือไม่ !',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก'
        }).then(async result => {
          if (result.isConfirmed) {
            dispatch(loading(true))
            await axios.put(`${process.env.NEXT_PUBLIC_POS_BACKEND}/employee/${row._id}`, formData)
            await axios.delete(`${process.env.NEXT_PUBLIC_POS_BACKEND}/delete_image/${row.product_image}`)
            dispatch(loading(false))
            Swal.fire({
              icon: 'success',
              title: 'คุณได้ทำการแก้ไขเรียบร้อยแล้ว',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              findEmployees()
            }, 1500)
          }
        })
      } else {
        let data = {}

        if (isShowPassword === false) {
          data = {
            employee_name: values.employee_name,
            employee_email: values.employee_email,
            employee_phone: values.employee_phone,
            employee_type: values.employee_type,
            employee_branch_id: values.employee_branch_id,
            employee_status: values.employee_status
          }
        } else {
          data = {
            employee_name: values.employee_name,
            employee_email: values.employee_email,
            employee_phone: values.employee_phone,
            employee_password: values.employee_password,
            employee_type: values.employee_type,
            employee_branch_id: values.employee_branch_id,
            employee_status: values.employee_status
          }
        }

        Swal.fire({
          title: 'ยืนยันการแก้ไข?',
          text: 'คุณต้องการแก้ไขพนักงานหรือไม่ !',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก'
        }).then(async result => {
          if (result.isConfirmed) {
            dispatch(loading(true))
            await axios.put(`${process.env.NEXT_PUBLIC_POS_BACKEND}/employee/${row._id}`, data)
            dispatch(loading(false))
            Swal.fire({
              icon: 'success',
              title: 'คุณได้ทำการแก้ไขเรียบร้อยแล้ว',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              findEmployees()
            }, 1500)
          }
        })
      }
    }
  }

  return (
    <div>
      <Dialog anchor='right' open={showDrawerEdit} onClose={() => setDrawerEdit(false)}>
        <DialogTitle>
          <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
            <Typography variant='h4' gutterBottom sx={{ m: 3 }}>
              รายละเอียดพนักงาน
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
                    values.employee_image === 'ไม่มี' ? (
                      <ImgStyled
                        src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}1skPG9BiQsyMkacMmNVnCZfeZ2-x_yK_c`}
                        alt='Profile Pic'
                      />
                    ) : (
                      <ImgStyled
                        src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${values.employee_image}`}
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
              {isAlert && (
                <Alert severity='warning'>
                  <AlertTitle>Warning</AlertTitle>
                  กรุณาตรวจสอบข้อมูลที่ท่านกรอกอีกครั้ง — <strong>check detail products!</strong>
                </Alert>
              )}
              <List sx={{ p: '0px 20px' }}>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='employee_name'>ชื่อพนักงาน</InputLabel>
                    <Input
                      id='employee_name'
                      value={values.employee_name}
                      onChange={handleChange('employee_name')}
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
                    <InputLabel htmlFor='employee_email'>อีเมล(สำหรับเข้าระบบ)</InputLabel>
                    <Input
                      type='email'
                      id='employee_email'
                      value={values.employee_email}
                      onChange={handleChange('employee_email')}
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
                    <InputLabel htmlFor='employee_phone'>เบอร์โทรศัพท์</InputLabel>
                    <Input
                      id='employee_phone'
                      value={values.employee_phone}
                      onChange={handleChange('employee_phone')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon='vscode-icons:file-type-bat' />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
                <ListItem disablePadding>
                  <FormControl fullWidth>
                    <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                      ตำเเหน่ง
                    </InputLabel>
                    <NativeSelect
                      value={values.employee_type}
                      onChange={handleChange('employee_type')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon='mdi:hand-coin' />
                        </InputAdornment>
                      }
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native'
                      }}
                    >
                      <option value={'พนักงานทั่วไป'}>พนักงานทั่วไป</option>
                      <option value={'พนักงานเคาน์เตอร์'}>พนักงานเคาน์เตอร์</option>
                      <option value={'ผู้จัดการ'}>ผู้จัดการ</option>
                    </NativeSelect>
                  </FormControl>
                </ListItem>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch />}
                    checked={isShowPassword}
                    color='secondary'
                    onChange={e => setShowPassword(e.target.checked)}
                    label={isShowPassword ? 'กรุณากรอกรหัสผ่านใหม่ด้วย' : 'แก้ไขรหัสผ่าน'}
                  />
                </FormGroup>
                {isShowPassword && (
                  <ListItem disablePadding>
                    <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                      <InputLabel htmlFor='employee_password'>รหัสผ่าน</InputLabel>
                      <Input
                        id='employee_password'
                        value={values.employee_password}
                        onChange={handleChange('employee_password')}
                        startAdornment={
                          <InputAdornment position='start'>
                            <Icon icon='emojione:locked-with-key' />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>
                )}

                <FormGroup>
                  <FormControlLabel
                    control={<Switch />}
                    checked={values.employee_status}
                    color='secondary'
                    onChange={e => setValues({ ...values, employee_status: e.target.checked })}
                    label={values.employee_status ? 'ออนไลน์' : 'ออฟไลน์'}
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
