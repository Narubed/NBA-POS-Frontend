import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import {
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  AuthChangePassword,
  Box,
  AnimateButton,
  TextField
} from '@mui/material'
import numeral from 'numeral'

// third party
import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
import axios from 'axios'
import dayjs from 'dayjs'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DialogCreateInvoice({ row, isOpenDialog, setOpenDialog, getAllReport }) {
  const theme = useTheme()
  const { data: session } = useSession()
  const [isOpenDialogConfirm, setOpenDialogConfirm] = React.useState(false)
  const [isValues, setValues] = React.useState()

  const handleSubmits = async e => {
    setValues(e)
    setOpenDialog(false)
    setOpenDialogConfirm(true)
  }

  const headleConfirm = async () => {
    const isBranch = localStorage.getItem('branch')

    const getBranch = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/branch/${isBranch}`)
    if (getBranch || getBranch.data.data) {
      const newBranch = getBranch.data.data

      const dataInvoice = {
        branch: isBranch,
        date: dayjs(Date.now()).format()
      }

      const getInvoice = await axios.post(
        `${process.env.NEXT_PUBLIC_POS_BACKEND}/report_invoice_full/invoice_full`,
        dataInvoice
      )

      const dataPostInvoice = {
        rif_detail: row.report_detail,
        rif_grand_total: row.report_grand_total,
        rif_discount: row.report_discount,
        rif_branch_id: isBranch,
        rif_branch_name: newBranch.branch_name,
        rif_branch_image: newBranch.branch_image,
        rif_vat_name: newBranch.branch_vat_name,
        rif_vat_number: newBranch.branch_vat_number,
        rif_vat_phone: newBranch.branch_phone,
        rif_address: newBranch.branch_vat_address,
        rif_customer_name: isValues.name,
        rif_customer_number: isValues.number,
        rif_customer_phone: isValues.phone,
        rif_customer_address: isValues.address,
        rif_make_list: session.user.name,
        rif_tax_invoice_number_shot: row.report_tax_invoice_number_shot,
        rif_tax_invoice_number_full: getInvoice.data.invoice_full,
        rif_money: row.report_money,
        rif_payment_type: row.report_payment_type,
        rif_timestamp: dayjs(Date.now()).format()
      }

      await axios.put(`${process.env.NEXT_PUBLIC_POS_BACKEND}/report/${row._id}`, {
        report_tax_invoice_number_full: getInvoice.data.invoice_full
      })
      await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/report_invoice_full`, dataPostInvoice)
      getAllReport()
      setOpenDialogConfirm(false)
    }
  }

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('กรุณากรอกชื่อผู้เสียภาษี'),
    number: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('กรุณากรอกเลขผู้เสียภาษี'),
    phone: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('กรุณากรอกเบอร์โทรศัพท์'),
    address: Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('กรุณากรอกที่อยู่ด้วย')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      phone: '',
      address: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: e => handleSubmits(e)
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <>
      {' '}
      <Dialog
        fullWidth
        open={isOpenDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'กรุณากรอกรายละเอียดของลูกค้า ที่ต้องการออกใบกำกับภาษี!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <FormikProvider value={formik}>
              <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Stack spacing={3} sx={{ mt: 5 }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField
                      fullWidth
                      label='นามลูกค้า'
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      fullWidth
                      label='เลขประจำตัวผู้เสียภาษี'
                      {...getFieldProps('number')}
                      error={Boolean(touched.number && errors.number)}
                      helperText={touched.number && errors.number}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    label='เบอร์โทรศัพท์'
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />

                  <TextField
                    fullWidth
                    label='ที่อยู่'
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 5 }}>
                  <Button fullWidth size='large' type='submit' variant='contained'>
                    ยืนยัน
                  </Button>
                  <Button fullWidth size='large' variant='contained' color='error' onClick={() => setOpenDialog(false)}>
                    ยกเลิก
                  </Button>
                </Stack>
              </Form>
            </FormikProvider>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        open={isOpenDialogConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialogConfirm(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'ยืนยันข้อมูลก่อนยืนยันการออกใบกำกับภาษี'}</DialogTitle>
        <DialogActions>
          <Button fullWidth size='large' variant='contained' onClick={headleConfirm}>
            ยืนยัน
          </Button>
          <Button fullWidth size='large' variant='contained' color='error' onClick={() => setOpenDialogConfirm(false)}>
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
