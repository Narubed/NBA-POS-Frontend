import * as React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import THBText from 'thai-baht-text'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import numeral from 'numeral'

const TAX_RATE = 0.07

export default function SpanningTable({ componentToPrintA4, isReport }) {
  return (
    <Grid display={'none'}>
      <div ref={el => (componentToPrintA4.current = el)}>
        <TableContainer component={Paper}>
          {/* <Grid container spacing={2} item xs={12} sx={{ marginTop: 5, p: 5 }}>
            <Grid xs={2}>
              {isReport.report_branch_image !== 'ไม่มี' && (
                <img
                  src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${isReport.report_branch_image}`}
                  alt='Logo'
                  width={'80px'}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />
              )}
            </Grid>
            <Grid xs={8}>
              {isReport && isReport.report_vat_name} <br />
              {isReport && isReport.report_address} <br />
              {isReport &&
                isReport.report_vat_number !== 'ไม่มี' &&
                `เลขประจำตัวผู้เสียภาษี : ${isReport.report_vat_number}`}{' '}
              <br />
              {isReport &&
                isReport.report_vat_name !== 'ไม่มี' &&
                `สาขาที่ออกใบกำกับภาษี : ${isReport.report_branch_name}`}
            </Grid>
          </Grid> */}
          {/* <Grid sx={{ textAlign: 'center' }}>
            ใบเสร็จรับเงิน
            <br />
            TAX INVOICE (ABB.)
          </Grid> */}
          <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={6} sx={{ p: 0 }}>
                  <Grid
                    display='flex'
                    sx={{
                      justifyContent: 'center',
                      justifyItems: 'left',
                      alignItems: 'left',
                      alignContent: 'left',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  >
                    {isReport.report_branch_image !== 'ไม่มี' && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${isReport.report_branch_image}`}
                        alt='Logo'
                        width={'120px'}
                        height={'120px'}
                      />
                    )}
                    {isReport && isReport.report_vat_name} <br />
                    {isReport && isReport.report_address} <br />
                    {isReport &&
                      isReport.report_vat_number !== 'ไม่มี' &&
                      `เลขประจำตัวผู้เสียภาษี : ${isReport.report_vat_number}`}{' '}
                    <br />
                    {isReport &&
                      isReport.report_vat_name !== 'ไม่มี' &&
                      `สาขาที่ออกใบกำกับภาษี : ${isReport.report_branch_name}`}
                  </Grid>
                </TableCell>
              </TableRow>

              <TableRow sx={{ fontSize: '12px' }}>
                <TableCell align='center' colSpan={6} sx={{ p: 0 }}>
                  <Grid sx={{ textAlign: 'center' }}>
                    ใบเสร็จรับเงิน
                    <br />
                    TAX INVOICE (ABB.)
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' colSpan={5} sx={{ p: 0 }}>
                  <Grid style={{ justifyContent: 'space-between', display: 'flex' }} container spacing={1} item xs={12}>
                    <Grid item xs={6} display='flex' sx={{ textAlign: 'left' }}>
                      <Grid xs={6}>
                        นามลูกค้า <br /> Customer Name
                      </Grid>
                      <Grid xs={6} sx={{ textAlign: 'left' }}>
                        {''}
                      </Grid>
                    </Grid>
                    <Grid item xs={6} display='flex' sx={{ textAlign: 'left' }}>
                      <Grid xs={6}>
                        เลขประจำตัวผู้เสียภาษี <br />
                        Tax ID
                      </Grid>
                      <Grid xs={6} sx={{ textAlign: 'left' }}>
                        {''}
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid xs={6} sx={{ textAlign: 'left' }}>
                        ที่อยู่ <br /> Address
                      </Grid>
                      <Grid xs={6} sx={{ textAlign: 'left' }}>
                        {''}
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align='right' sx={{ p: 0 }}>
                  <Grid style={{ justifyContent: 'space-between', display: 'flex' }} container spacing={1} item xs={12}>
                    <a style={{ fontSize: '12px' }}>
                      เลขที่ <br /> No.
                    </a>
                    <a style={{ fontSize: '12px' }}>{isReport.report_tax_invoice_number_shot} </a>
                  </Grid>
                  <Grid style={{ justifyContent: 'space-between', display: 'flex' }} container spacing={1} item xs={12}>
                    <a style={{ fontSize: '12px' }}>
                      วันที่ <br /> Date
                    </a>
                    <a style={{ fontSize: '12px' }}>
                      {isReport && dayjs(isReport.report_timestamp).add(543, 'year').locale('th').format('DD MMM YYYY')}{' '}
                    </a>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow sx={{ p: 0 }}>
                <TableCell sx={{ p: 0 }}>
                  ลำดับที่ <br /> No.
                </TableCell>
                <TableCell align='right' sx={{ p: 0 }}>
                  ชื่อสินค้า/บริการ <br />
                  Description{' '}
                </TableCell>
                <TableCell align='right' sx={{ p: 0 }}>
                  จำนวน <br />
                  Quantity{' '}
                </TableCell>
                <TableCell align='right' sx={{ p: 0 }}>
                  ราคา/หน่วย <br />
                  Unit Price{' '}
                </TableCell>
                <TableCell align='right' sx={{ p: 0 }}>
                  ส่วนลด <br />
                  Discount
                </TableCell>
                <TableCell align='right' sx={{ p: 0 }}>
                  จำนวนเงิน <br />
                  Amount (THB)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ p: 0 }}>
              {isReport &&
                isReport.report_detail &&
                isReport.report_detail.map((item, index) => (
                  <TableRow key={index} sx={{ p: 0 }}>
                    <TableCell sx={{ p: 0 }}>{index + 1}</TableCell>
                    <TableCell align='right' sx={{ p: 0 }}>
                      <a style={{ padding: '0px 0px' }}>{item.product_name}</a>
                    </TableCell>
                    <TableCell align='right' sx={{ p: 0 }}>
                      {item.amount}
                    </TableCell>
                    <TableCell align='right' sx={{ p: 0 }}>
                      {numeral(item.product_price).format('0,0.00')}
                    </TableCell>
                    <TableCell align='right' sx={{ p: 0 }}>
                      {numeral(item.product_discount).format('0,0.00')}
                    </TableCell>
                    <TableCell align='right' sx={{ p: 0 }}>
                      {numeral(item.product_price * item.amount - item.product_discount).format('0,0.00')}
                      {item.product_pay_tax === true && 'N'}
                    </TableCell>
                  </TableRow>
                ))}

              <TableRow>
                <TableCell colSpan={3} align='center' sx={{ p: 0, fontSize: '12px' }}>
                  {isReport &&
                    isReport.report_detail &&
                    THBText(
                      isReport.report_detail.reduce(
                        (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                        0
                      ) - isReport.report_discount
                    )}
                </TableCell>
                <TableCell colSpan={1} sx={{ fontSize: '14px' }}>
                  รวม/Total
                </TableCell>
                <TableCell align='right' colSpan={2}>
                  {isReport && numeral(isReport.report_grand_total + isReport.report_discount).format('0,0.00')}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={1} sx={{ p: 0 }}>
                  <Grid sx={{ p: 0, fontSize: '12px' }}>หมายเหตุ: 1. N = สินค้าที่ได้รับการยกเว้นภาษีมูลค่าเพิ่ม</Grid>
                </TableCell>
                {/* <TableCell rowSpan={5} /> */}
                {/* <TableCell rowSpan={5} /> */}
                <TableCell rowSpan={5} />
                <TableCell rowSpan={5} />
                <TableCell colSpan={2} sx={{ fontSize: '14px' }}>
                  หักส่วนลด/Discount
                </TableCell>
                <TableCell align='right'> {isReport && numeral(isReport.report_discount).format('0,0.00')}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={1} sx={{ p: 0 }}>
                  <Grid sx={{ pl: 15, fontSize: '12px' }}>2. P = สินค้าจัดรายการส่งเสริมการขาย</Grid>
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}> สินค้าไม่เสียภาษี/NON VAT</TableCell>
                <TableCell align='right' colSpan={2} sx={{ p: 0 }}>
                  {isReport &&
                    isReport.report_detail &&
                    numeral(
                      isReport.report_detail
                        .filter(item => item.product_pay_tax === true)
                        .reduce((sum, value) => sum + value.amount * value.product_price - value.product_discount, 0)
                    ).format('0,0.00')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1} sx={{ p: 0 }}>
                  <Grid sx={{ pl: 15, fontSize: '12px' }}>
                    3. NP = สินค้าที่ได้รับการยกเว้นภาษีมูลค่าเพิ่มซึ่งจัดรายการส่งเสริมการขาย
                  </Grid>
                </TableCell>

                {/* <TableCell rowSpan={5} /> */}
                <TableCell colSpan={2}>จำนวนเงินก่อนภาษีมูลค่าเพิ่ม/VAT EXC</TableCell>
                <TableCell align='right'>
                  {' '}
                  {isReport &&
                    isReport.report_detail &&
                    numeral(
                      isReport.report_detail
                        .filter(item => item.product_pay_tax === false)
                        .reduce((sum, value) => sum + value.amount * value.product_price - value.product_discount, 0) -
                        (isReport.report_detail
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

              {/* <TableRow>
                <TableCell colSpan={2}>ภาษีมูลค่าเพิ่ม/VAT 7 %</TableCell>
                <TableCell align='right'> {isReport && numeral(isReport.report_discount).format('0,0.00')}</TableCell>
              </TableRow> */}

              <TableRow>
                <TableCell colSpan={1} sx={{ p: 0 }}>
                  <Grid sx={{ pl: 15, fontSize: '12px' }}>4. MD,MN = สินค้าลดราคาเฉพาะร้านสาขา</Grid>
                </TableCell>

                <TableCell>Tax</TableCell>

                <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align='right'>
                  {isReport &&
                    isReport.report_detail &&
                    numeral(
                      (isReport.report_detail
                        .filter(item => item.product_pay_tax === false)
                        .reduce((sum, value) => sum + value.amount * value.product_price - value.product_discount, 0) *
                        7) /
                        100
                    ).format('0,0.00')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1} sx={{ p: 0 }}>
                  <Grid sx={{ pl: 15, fontSize: '12px' }}>5. WS = สินค้าลดราคาเฉพาะร้านสาขาพิเศษ</Grid>
                </TableCell>
                <TableCell colSpan={2}>จำนวนเงินรวมทั้งสิ้น/Grand Total</TableCell>
                <TableCell align='right'>
                  {isReport &&
                    isReport.report_detail &&
                    numeral(
                      isReport.report_detail.reduce(
                        (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                        0
                      ) - isReport.report_discount
                    ).format('0,0.00')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Grid>
  )
}
