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

import dimension from '../../../../../public/images/Report/dimension.png'

const TAX_RATE = 0.07

export default function SpanningTable({ componentToPrintFullA4, isReport }) {
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
            <div id='logo' style={{ textAlign: 'center' }}>
              {isReport.rif_branch_image !== 'ไม่มี' && (
                <img
                  src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${isReport.rif_branch_image}`}
                  alt='Logo'
                  width='90px'
                />
              )}
            </div>
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
             ใบเสร็จรับเงิน/ใบกำกับภาษี
            </h1>
            <div id='company' className='clearfix' style={{ float: 'right', textAlign: 'right', fontSize: '14px' }}>
              เลขที่ : <a style={{ fontSize: '12px' }}>{isReport.rif_tax_invoice_number_full} </a>
              <br />
              เลขที่ใบกำกับภาษีอย่างย่อ : <a style={{ fontSize: '12px' }}>{isReport.rif_tax_invoice_number_shot} </a>
              <br />
              วันที่ :{' '}
              {isReport && dayjs(isReport.report_timestamp).add(543, 'year').locale('th').format('DD MMM YYYY')}
              <br />
              {isReport && (
                <a>{isReport.rif_vat_name !== 'ไม่มี' ? isReport.rif_vat_name : isReport.rif_branch_name}</a>
              )}{' '}
              <br />
              {isReport && <a>{isReport.rif_address}</a>} <br />
              {isReport && <a>เบอร์โทรศัพท์: {isReport.rif_vat_phone}</a>} <br />
              {isReport &&
                isReport.rif_vat_number !== 'ไม่มี' &&
                `เลขประจำตัวผู้เสียภาษี : ${isReport.rif_vat_number}`}{' '}
              <br />
              {isReport && isReport.rif_vat_name !== 'ไม่มี' && `สาขาที่ออกใบกำกับภาษี : ${isReport.rif_branch_name}`}
              {/* <div>Company Name</div>
              <div>
                455 Foggy Heights,
                <br /> AZ 85004, US
              </div>
              <div>(602) 519-0450</div>
              <div>
                <a href='mailto:company@example.com'>company@example.com</a>
              </div> */}
            </div>
            <div id='project' style={{ float: 'left', fontSize: '14px' }}>
              {isReport && (
                <>
                  <div>
                    <span>นามลูกค้า: {isReport.rif_customer_name}</span>{' '}
                  </div>
                  <div>
                    <span>เลขประจำตัวผู้เสียภาษี : {isReport.rif_customer_number}</span>{' '}
                  </div>
                  <div>
                    <span>ที่อยู่ : {isReport.rif_customer_address}</span>{' '}
                  </div>
                  <div>
                    <span>เบอร์โทรศัพท์ : {isReport.rif_customer_phone}</span>{' '}
                  </div>
                </>
              )}
            </div>
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
                  <th className='desc'>ชื่อรายการ</th>
                  <th>จำนวน </th>
                  <th>ราคาต่อชิ้น </th>
                  <th>ส่วนลด</th>
                  <th>รวม</th>
                </tr>
              </thead>
              <tbody>
                {isReport &&
                  isReport.rif_detail &&
                  isReport.rif_detail.map((item, index) => (
                    <tr
                      key={item._id}
                      style={index % 2 > 0 ? { backgroundColor: '#F8F8FF' } : { backgroundColor: '#FFFFFF' }}
                    >
                      <td className='service' style={{ textAlign: 'center' }}>
                        {index + 1}
                      </td>
                      <td className='desc' style={{ verticalAlign: 'top' }}>
                        {item.product_name}
                      </td>
                      <td className='unit' style={{ textAlign: 'center' }}>
                        {item.amount}
                      </td>
                      <td className='qty' style={{ textAlign: 'center' }}>
                        {numeral(item.product_price).format('0,0.00')}
                      </td>
                      <td className='total' style={{ textAlign: 'center' }}>
                        {numeral(item.product_discount).format('0,0.00')}
                      </td>
                      <td className='total' style={{ textAlign: 'center' }}>
                        {numeral(item.product_price * item.amount - item.product_discount).format('0,0.00')}
                        {item.product_pay_tax === true && 'N'}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan='3' style={{ fontSize: '1em', textAlign: 'center' }}>
                    {isReport &&
                      isReport.rif_detail &&
                      THBText(
                        isReport.rif_detail.reduce(
                          (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                          0
                        ) - isReport.rif_discount
                      )}
                  </td>

                  <td colSpan='2' style={{ textAlign: 'right' }}>
                    {' '}
                    รวม/Total
                  </td>

                  <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                    {isReport && numeral(isReport.rif_grand_total + isReport.rif_discount).format('0,0.00')}
                  </td>
                </tr>

                <tr>
                  <td colSpan='3' />
                  <td colSpan='2' style={{ textAlign: 'right' }}>
                    {' '}
                    หักส่วนลด/Discount
                  </td>

                  <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                    {isReport && numeral(isReport.rif_discount).format('0,0.00')}
                  </td>
                </tr>
                {isReport.rif_vat_name !== 'ไม่มี' && (
                  <>
                    <tr>
                      <td colSpan='3' />
                      <td colSpan='2' style={{ textAlign: 'right' }}>
                        สินค้าไม่เสียภาษี/NON VAT
                      </td>

                      <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                        {isReport &&
                          isReport.rif_detail &&
                          numeral(
                            isReport.rif_detail
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
                      <td colSpan='2' style={{ textAlign: 'right' }}>
                        จำนวนเงินก่อนภาษีมูลค่าเพิ่ม/VAT EXC
                      </td>

                      <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                        {isReport &&
                          isReport.rif_detail &&
                          numeral(
                            ((isReport.rif_detail
                              .filter(item => item.product_pay_tax === false)
                              .reduce(
                                (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                                0
                              ) -
                              isReport.rif_discount) *
                              100) /
                              107
                          ).format('0,0.00')}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='3' />
                      <td colSpan='2' style={{ textAlign: 'right' }}>
                        {`ภาษี ${(TAX_RATE * 100).toFixed(0)} %`}
                      </td>

                      <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                        {isReport &&
                          isReport.rif_detail &&
                          numeral(
                            ((isReport.rif_detail
                              .filter(item => item.product_pay_tax === false)
                              .reduce(
                                (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                                0
                              ) -
                              isReport.rif_discount) *
                              7) /
                              107
                          ).format('0,0.00')}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <td colSpan='3' />
                  <td colSpan='2' style={{ textAlign: 'right' }}>
                    {' '}
                    จำนวนเงินรวมทั้งสิ้น/Grand Total
                  </td>

                  <td className='total' style={{ fontSize: '1em', textAlign: 'center' }}>
                    {isReport &&
                      isReport.rif_detail &&
                      numeral(
                        isReport.rif_detail.reduce(
                          (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                          0
                        ) - isReport.rif_discount
                      ).format('0,0.00')}
                  </td>
                </tr>
              </tbody>
            </table>
            <div id='notices' style={{ color: '#5D6975', fontSize: '1em' }}>
              <div className='notice'>หมายเหตุ: N = สินค้าที่ได้รับการยกเว้นภาศีมูลค่าเพิ่ม.</div>
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
              <Grid display='flex' container sx={{ borderBottom: '2px solid #C1CED9', paddingBottom: '8px' }}>
                <Grid xs={8} sm={8} md={8} lg={8} sx={{ borderRight: '2px solid #C1CED9' }}>
                  <a>
                    ชำระด้วย/PAYMENT BY: <Checkbox sx={{ width: '15px', height: '15px' }} /> เงินโอน/TRANSFER{' '}
                    <Checkbox sx={{ width: '15px', height: '15px' }} /> เงินสด/CASH
                  </a>
                  <br />
                  <a>
                    ชำระด้วย/PAYMENT BY: <Checkbox sx={{ width: '15px', height: '15px' }} /> เช็ค/CHEQUE{' '}
                    <Checkbox sx={{ width: '15px', height: '15px' }} /> บัตรเครดิต/CREDIT CARD
                  </a>
                  <br />
                  ธนาคาร/สาขา _________________________________________________________________
                  <br />
                  เลขที่ __________________________________ วันที่ _________________________________
                  <br />
                  <div style={{ textAlign: 'center' }}>
                    {' '}
                    ( กรณีจ่ายเป็นเช็คใบเสร็จรับเงินจะสมบูรณ์ต่อเมื่อเก็บเงินตามเช็คได้แล้ว)
                  </div>
                  ลงชื่อ ______________________________ ผู้รับเงิน/เช็ค วันที่ ___________________________
                </Grid>
                <Grid xs={4} sm={4} md={4} lg={4} sx={{ textAlign: 'center' }}>
                  <a>{isReport.rif_vat_name !== 'ไม่มี' ? isReport.rif_vat_name : isReport.rif_branch_name}</a>
                  <br />
                  <br />
                  <br />
                  __________________________________ <br />
                  ผู้มีอำนาจ
                  <br />
                  Authorized Signature
                </Grid>
              </Grid>
            </footer>
          </div>
        </div>
      </div>
    </Grid>
  )
}
