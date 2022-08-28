import React from 'react'
import { Icon } from '@iconify/react'
import PerfectScrollbar from 'react-perfect-scrollbar'

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
  Paper
} from '@mui/material'
import numeral from 'numeral'

import HeaderCardDetail from './component/HeaderCardDetail'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function ShowDetailReport({ isReportList, row, getAllReport }) {
  const [showDialog, setDialog] = React.useState(false)

  const onClickShowDetail = () => {
    setDialog(true)
  }

  return (
    <div>
      <IconButton color='primary' aria-label='upload picture' component='label' onClick={onClickShowDetail}>
        <Icon icon='bx:comment-detail' />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth='lg'
        open={showDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setDialog(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          <HeaderCardDetail row={row} setDialog={setDialog} getAllReport={getAllReport} />
        </DialogTitle>
        <DialogContent>
          <PerfectScrollbar style={{ maxHeight: '380px' }} options key={1}>
            <DialogContentText id='alert-dialog-slide-description'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' colSpan={6}>
                        รายละเอียดรายการสั่งซื้อ
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>รหัสสินค้า</TableCell>
                      <TableCell align='right'>ชื่อรายการ</TableCell>
                      <TableCell align='right'>จำนวน</TableCell>
                      <TableCell align='right'>ราคาต่อชิ้น</TableCell>
                      <TableCell align='right'>ส่วนลด</TableCell>
                      <TableCell align='right'>รวม</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row &&
                      row.rif_detail &&
                      row.rif_detail.map(item => (
                        <TableRow key={item._id}>
                          <TableCell>{item.product_id}</TableCell>
                          <TableCell align='right'>
                            {item.product_note !== 'ไม่มี' && (
                              <a style={{ color: 'red' }}>
                                {' '}
                                **หมายเหตุ: {''} {item.product_note}{' '}
                              </a>
                            )}
                            {item.product_name}
                          </TableCell>
                          <TableCell align='right'>{item.amount}</TableCell>
                          <TableCell align='right'>{numeral(item.product_price).format('0,0.00')}</TableCell>
                          <TableCell align='right'>{numeral(item.product_discount).format('0,0.00')}</TableCell>
                          <TableCell align='right'>
                            {numeral(item.product_price * item.amount - item.product_discount).format('0,0.00')}
                            {item.product_pay_tax === true && 'N'}
                          </TableCell>
                        </TableRow>
                      ))}

                    <TableRow>
                      <TableCell rowSpan={6} />
                      <TableCell rowSpan={6} />
                      <TableCell rowSpan={6} />
                      <TableCell colSpan={2}>รวม</TableCell>
                      <TableCell align='right'>
                        {numeral(row.rif_grand_total + row.rif_discount).format('0,0.00')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>ส่วนลดท้ายบิล</TableCell>
                      <TableCell align='right'> {numeral(row.rif_discount).format('0,0.00')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>สินค้าไม่เสียภาษี</TableCell>
                      <TableCell align='right'>
                        {numeral(
                          row.rif_detail
                            .filter(item => item.product_pay_tax === true)
                            .reduce(
                              (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                              0
                            )
                        ).format('0,0.00')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>ราคาก่อนคิดภาษีมูลค่าเพิ่ม</TableCell>
                      <TableCell align='right'>
                        {numeral(
                          row.rif_detail
                            .filter(item => item.product_pay_tax === false)
                            .reduce(
                              (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                              0
                            ) -
                            (row.rif_detail
                              .filter(item => item.product_pay_tax === false)
                              .reduce(
                                (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                                0
                              ) *
                              7) /
                              100
                        ).format('0,0.00')}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell align='right'>7 %</TableCell>
                      <TableCell align='right'>
                        {numeral(
                          (row.rif_detail
                            .filter(item => item.product_pay_tax === false)
                            .reduce(
                              (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                              0
                            ) *
                            7) /
                            100
                        ).format('0,0.00')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>จำนวนเงินรวมทั้งสิ้น</TableCell>
                      <TableCell align='right'>
                        {numeral(
                          row.rif_detail.reduce(
                            (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                            0
                          ) - row.rif_discount
                        ).format('0,0.00')}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContentText>
          </PerfectScrollbar>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialog(false)}>ออก</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
