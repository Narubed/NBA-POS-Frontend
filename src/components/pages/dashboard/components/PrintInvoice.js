import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import numeral from 'numeral'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'

export default function PrintInvoice({ componentToPrint, isReport }) {
  React.useEffect(() => {
    // const reducePriceNonvat = dataNonvat.reduce((sum, item) => sum + item.)
  }, [isReport])

  return (
    <Grid display={'none'}>
      <div ref={el => (componentToPrint.current = el)}>
        <div className='ticket' style={{ alignItem: 'center', margin: 'auto', color: '#000000' }}>
          <img
            src='https://foodexpress.nbadigitalservice.com/static/NBA2.png'
            alt='Logo'
            width={'120px'}
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '15px',
              marginBottom: '15px'
            }}
          />

          <div style={{ textAlign: 'center', borderBottom: '1px solid black' }}>
            {isReport && isReport.report_vat_name}
            <br />
            <p className='centered' style={{ fontSize: '12px' }}>
              เลขที่ใบเสร็จ : {isReport && isReport.report_tax_invoice_number_shot}
              <br />
              {isReport && isReport.report_vat_number !== 'ไม่มี' && (
                <a>TAX# : {isReport && isReport.report_vat_number}</a>
              )}
              <br />
              ใบเสร็จรับเงิน/ใบกำกับภาษีอย่างย่อ
              <br />
              (VAT Included)
            </p>
          </div>
          <table style={{ width: '100%' }}>
            {/* <thead style={{ fontSize: '12px' }}>
              <tr>
                <th className='quantity'>จำนวน.</th>
                <th className='description'>รายการ</th>
                <th className='price'>$$</th>
              </tr>
            </thead> */}

            <tbody style={{ fontSize: '10px' }}>
              {isReport &&
                isReport.report_detail &&
                isReport.report_detail.map(item => (
                  <tr key={item._id}>
                    <td className='quantity' style={{ textAlign: 'center' }}>
                      {item.amount}
                    </td>
                    <td className='description'>
                      {item.product_name}{' '}
                      {item.product_discount > 0 && (
                        <>
                          <br />
                          <a style={{ fontWeight: 'bold' }}>ส่วนลด:</a>
                          {item.product_discount}
                        </>
                      )}
                    </td>
                    <td className='description'>@{item.product_price}</td>
                    <td className='price'>
                      {numeral(item.product_price * item.amount - item.product_discount).format('0,0.00')}
                      {item.product_pay_tax === true && 'N'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div
            style={{ justifyContent: 'space-between', borderTop: '1px solid black', display: 'flex', fontSize: '12px' }}
          >
            <div>รวม</div>
            <div>{isReport && numeral(isReport.report_grand_total + isReport.report_discount).format('0,0.00')}</div>
          </div>
          {isReport && isReport.report_discount > 0 && (
            <>
              <div style={{ justifyContent: 'space-between', display: 'flex', fontSize: '12px' }}>
                <div> ส่วนลดท้ายบิล</div>
                <div> - {isReport && numeral(isReport.report_discount).format('0,0.00')}</div>
              </div>
              <div style={{ justifyContent: 'space-between', display: 'flex', fontSize: '12px' }}>
                <div>ยอดรวมส่วนลด</div>
                <div> {isReport && numeral(isReport.report_discount).format('0,0.00')}</div>
              </div>
            </>
          )}
          <div
            style={{ justifyContent: 'space-between', borderTop: '1px solid black', display: 'flex', fontSize: '12px' }}
          >
            <div>NonVAT</div>
            <div>
              {isReport &&
                isReport.report_detail &&
                numeral(
                  isReport.report_detail
                    .filter(item => item.product_pay_tax === true)
                    .reduce((sum, value) => sum + value.amount * value.product_price - value.product_discount, 0)
                ).format('0,0.00')}
            </div>
          </div>
          <div style={{ justifyContent: 'space-between', display: 'flex', fontSize: '12px' }}>
            <div>VATable</div>
            <div>
              {' '}
              {isReport &&
                isReport.report_detail &&
                numeral(
                  isReport.report_detail
                    .filter(item => item.product_pay_tax === false)
                    .reduce((sum, value) => sum + value.amount * value.product_price - value.product_discount, 0) -
                    (isReport.report_detail
                      .filter(item => item.product_pay_tax === false)
                      .reduce((sum, value) => sum + value.amount * value.product_price - value.product_discount, 0) *
                      7) /
                      100
                ).format('0,0.00')}
            </div>
          </div>
          <div style={{ justifyContent: 'space-between', display: 'flex', fontSize: '12px' }}>
            <div>VAT 7 %</div>
            <div>
              {' '}
              {isReport &&
                isReport.report_detail &&
                numeral(
                  (isReport.report_detail
                    .filter(item => item.product_pay_tax === false)
                    .reduce((sum, value) => sum + value.amount * value.product_price - value.product_discount, 0) *
                    7) /
                    100
                ).format('0,0.00')}
            </div>
          </div>
          <div style={{ justifyContent: 'space-between', display: 'flex', fontSize: '12px' }}>
            <div>สุทธิ</div>
            <div>
              {' '}
              {isReport &&
                isReport.report_detail &&
                numeral(
                  isReport.report_detail.reduce(
                    (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                    0
                  ) - isReport.report_discount
                ).format('0,0.00')}
            </div>
          </div>

          <div
            style={{ justifyContent: 'space-between', borderTop: '1px solid black', display: 'flex', fontSize: '12px' }}
          >
            <div>เงินสด</div>
            <div>{isReport && numeral(isReport.report_money).format('0,0.00')}</div>
          </div>
          <div style={{ justifyContent: 'space-between', display: 'flex', fontSize: '12px' }}>
            <div>เงินทอน</div>
            <div>{isReport && numeral(isReport.report_money - isReport.report_grand_total).format('0,0.00')}</div>
          </div>
          <div style={{ justifyContent: 'space-between', display: 'flex', fontSize: '12px' }}>
            <div>ชำระด้วย</div>
            <div>{isReport && isReport.report_payment_type}</div>
          </div>
          <div style={{ textAlign: 'center', borderBottom: '1px solid black' }}>
            <p style={{ fontSize: '10px', margenTop: '20px' }}>N = สินค้าที่ได้รับการยกเว้นภาศีมูลค่าเพิ่ม</p>
            <p className='centered'>
              ขอบคุณที่ใช้บริการ !
              <br />
              **{isReport && dayjs(isReport.report_timestamp).add(543, 'year').locale('th').format('DD MMM YYYY')}**
              <br />
              ลงชื่อ: {isReport && isReport.report_make_list}
            </p>
          </div>
        </div>
      </div>
    </Grid>
  )
}

// display={'none'}
