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
import Checkbox from '@mui/material/Checkbox'
import numeral from 'numeral'

import dimension from '../../../../public/images/Report/dimension.png'

const TAX_RATE = 0.07

export default function SpanningTable({ componentToPrintFullA4, isReport, isDateStart, isDateEnd }) {
  console.log(isReport)

  const dateEnd = dayjs(isDateStart).format('DDMMYYYY') !== dayjs(isDateEnd).format('DDMMYYYY')
    ? `- ${dayjs(isDateEnd).locale('th').add(543, 'year').format('DD MMM YYYY')}`
    : ` `
  const date = `${dayjs(isDateStart).locale('th').add(543, 'year').format('DD MMM YYYY')} ${dateEnd}`
  console.log(date)

  return (
    <Grid display='none'>
      <div ref={el => (componentToPrintFullA4.current = el)}>
        <div
          className='body'
          style={{
            position: 'relative',
            width: '21cm',
            height: '29.7cm',
            matgin: '0 auto',
            fontSize: '12px',
            color: 'black'
          }}
        >
          <div
            className='header'
            style={{
              padding: '5px 0',
              marginBotton: '5px'
            }}
          >
            {/* <div id='logo' style={{ textAlign: 'center' }}>
              {isReport.rif_branch_image !== 'ไม่มี' && (
                <img
                  src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${isReport.rif_branch_image}`}
                  alt='Logo'
                  width='90px'
                />
              )}
            </div> */}
            <h1
              style={{
                borderTop: '1px solid #5D6975',
                borderBottom: '1px solid #5D6975',
                color: '#5D6975',
                fontSize: '2.4em',
                lineHeight: '1.4em',
                fontWeight: 'normal',
                textAlign: 'center',
                margin: '0 0 20px 0',
                background: `url(${dimension.src})`
              }}
            >
              รายการขายสินค้า {date}
            </h1>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                vorderSpacing: '0',
                marginBotton: '20px',
                marginTop: '20px'
              }}
            >
              <thead style={{ borderTop: '3px solid #3D6975', backgroundColor: '#F0F8FF' }}>
                <tr>
                  <th className='service' style={{ textAlign: 'center' }}>
                    ลำดับ
                  </th>
                  <th className='desc'>ประเภทสินค้า</th>
                  <th className='desc'>ชื่อรายการ</th>
                  <th>ต้นทุน/ชิ้น</th>

                  <th>ราคาขาย/ชิ้น</th>

                  <th>ส่วนลดรวม</th>
                  <th>จำนวน</th>
                  <th>รวม </th>

                </tr>
              </thead>
              <tbody>
                {
                  isReport.map((item, index) => (
                    <tr
                      key={item._id}
                      style={index % 2 > 0 ? { backgroundColor: '#F8F8FF' } : { backgroundColor: '#FFFFFF' }}
                    >
                      <td className='service' style={{ textAlign: 'center' }}>
                        {index + 1}
                      </td>
                      <td className='desc' style={{ verticalAlign: 'top' }}>
                        {item.product_type}
                      </td>
                      <td className='unit' style={{ textAlign: 'center' }}>
                        {item.product_name}
                      </td>
                      <td className='qty' style={{ textAlign: 'center' }}>
                        {numeral(item.product_cost).format('0,0.00')}
                      </td>
                      <td className='qty' style={{ textAlign: 'center' }}>
                        {numeral(item.product_price).format('0,0.00')}
                      </td>
                      <td className='total' style={{ textAlign: 'center' }}>
                        {numeral(item.product_discount).format('0,0.00')}
                      </td>
                      <td className='total' style={{ textAlign: 'center' }}>
                        {numeral(item.amount).format('0,0.00')}
                      </td>
                      <td className='total' style={{ textAlign: 'center' }}>
                        {numeral((item.amount * item.product_price) - item.product_discount).format('0,0.00')}{item.product_pay_tax === true && 'N'}
                      </td>

                      {/* <td className='total' style={{ textAlign: 'center' }}>
                        {numeral(item.product_price * item.amount - item.product_discount).format('0,0.00')}
                        {item.product_pay_tax === true && 'N'}
                      </td> */}
                    </tr>
                  ))}
                <tr>
                  <td colSpan='3' style={{ fontSize: '1em', textAlign: 'center' }}>
                    {isReport &&
                      THBText(
                        isReport.reduce(
                          (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                          0
                        )
                      )}
                  </td>
                  <td colSpan='4' style={{ textAlign: 'right' }}>
                    {' '}
                    รวม/Total
                  </td>

                  <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                    {numeral(isReport.reduce(
                      (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                      0
                    )).format('0,0.00')}
                  </td>
                </tr>

                {/* <tr>
                  <td colSpan='3' />
                  <td colSpan='4' style={{ textAlign: 'right' }}>
                    {' '}
                    หักส่วนลด/Discount
                  </td>

                  <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                    {isReport && numeral(isReport.rif_discount).format('0,0.00')}
                  </td>
                </tr> */}
                {/* {isReport.rif_vat_name !== 'ไม่มี' && ( */}
                <>
                  <tr>
                    <td colSpan='3' />
                    <td colSpan='4' style={{ textAlign: 'right' }}>
                      สินค้าไม่เสียภาษี/NON VAT
                    </td>

                    <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                      {isReport &&
                        numeral(
                          isReport
                            .filter(item => item.product_pay_tax === true)
                            .reduce(
                              (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                              0
                            )
                        ).format('0,0.00')}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan='3' />
                    <td colSpan='4' style={{ textAlign: 'right' }}>
                      จำนวนเงินก่อนภาษีมูลค่าเพิ่ม/VAT EXC
                    </td>

                    <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                      {isReport &&
                        numeral(
                          ((isReport
                            .filter(item => item.product_pay_tax === false)
                            .reduce(
                              (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                              0
                            )) *
                            100) /
                          107
                        ).format('0,0.00')}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='3' />
                    <td colSpan='4' style={{ textAlign: 'right' }}>
                      {`ภาษี ${(TAX_RATE * 100).toFixed(0)} %`}
                    </td>

                    <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                      {isReport &&
                        numeral(
                          (isReport
                            .filter(item => item.product_pay_tax === false)
                            .reduce(
                              (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                              0
                            ) *
                            7) /
                          107
                        ).format('0,0.00')}
                    </td>
                  </tr>
                </>
                <tr>
                  <td colSpan='3' />
                  <td colSpan='4' style={{ textAlign: 'right' }}>
                    {' '}
                    จำนวนเงินรวมทั้งสิ้น/Grand Total
                  </td>

                  <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                    {numeral(isReport.reduce(
                      (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                      0
                    )).format('0,0.00')}
                  </td>
                </tr>
              </tbody>
            </table>
            <div id='notices' style={{ color: '#5D6975', fontSize: '1em', paddingLeft: 8 }}>
              <div className='notice'>หมายเหตุ: N = สินค้าที่ได้รับการยกเว้นภาษีมูลค่าเพิ่ม.</div>
            </div>
            <footer
              style={{
                color: '#5D6975',
                width: '100%',
                height: '30px',
                position: 'absolete',
                bottom: 0,
                borderTop: '2px solid #C1CED9',

                padding: '8px 0'

                // textAlign: 'center'
              }}
            >
            </footer>
          </div>
        </div>
      </div>
    </Grid>
  )
}
