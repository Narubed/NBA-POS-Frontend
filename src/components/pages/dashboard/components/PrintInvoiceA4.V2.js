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

import dimension from '../../../../../public/images/Report/dimension.png'

const TAX_RATE = 0.07

export default function SpanningTable({ componentToPrintA4, isReport }) {
  return (
    <Grid display='none'>
      <div ref={el => (componentToPrintA4.current = el)}>
        <div
          className='body'
          style={{
            position: 'relative',
            width: '21cm',
            height: '29.7cm',
            matgin: '0 auto',
            fontSize: '12px'
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
              {isReport.report_branch_image !== 'ไม่มี' && (
                <img
                  src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${isReport.report_branch_image}`}
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
              ใบเสร็จรับเงิน
            </h1>
            <div id='company' className='clearfix' style={{ float: 'right', textAlign: 'right', fontSize: '14px', color: '#5D6975' }}>
              เลขที่ <a style={{ fontSize: '12px' }}>{isReport.report_tax_invoice_number_shot} </a>
              <br />
              วันที่ {isReport && dayjs(isReport.report_timestamp).add(543, 'year').locale('th').format('DD MMM YYYY')}
              <br />
              {isReport && isReport.report_vat_name !== 'ไม่มี'
                ? isReport.report_vat_name
                : isReport.report_branch_name}{' '}
              <br />
              {isReport && isReport.report_address} <br />
              {isReport &&
                isReport.report_vat_number !== 'ไม่มี' &&
                `เลขประจำตัวผู้เสียภาษี : ${isReport.report_vat_number}`}{' '}
              <br />
              {isReport &&
                isReport.report_vat_name !== 'ไม่มี' &&
                `สาขาที่ออกใบกำกับภาษี : ${isReport.report_branch_name}`}
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
            <div id='project' style={{ float: 'left', fontSize: '14px', color: '#5D6975' }}>
              <div>
                <span>นามลูกค้า :</span>{' '}
              </div>
              <div>
                <span>เลขประจำตัวผู้เสียภาษี :</span>{' '}
              </div>
              <div>
                <span>ที่อยู่ :</span>{' '}
              </div>
              <div>
                <span>เบอร์โทรศัพท์ :</span>{' '}
              </div>
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
              <thead style={{ borderTop: '3px solid #3D6975', backgroundColor: '#F0F8FF', color: '#5D6975' }}>
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
                  isReport.report_detail &&
                  isReport.report_detail.map((item, index) => (
                    <tr
                      key={item._id}
                      style={index % 2 > 0 ? { backgroundColor: '#F8F8FF' } : { backgroundColor: '#FFFFFF' }}
                    >
                      <td className='service' style={{ textAlign: 'center', color: '#5D6975' }}>
                        {index + 1}
                      </td>
                      <td className='desc' style={{ verticalAlign: 'top', color: '#5D6975' }}>
                        {item.product_name}
                      </td>
                      <td className='unit' style={{ textAlign: 'center', color: '#5D6975' }}>
                        {item.amount}
                      </td>
                      <td className='qty' style={{ textAlign: 'center', color: '#5D6975' }}>
                        {numeral(item.product_price).format('0,0.00')}
                      </td>
                      <td className='total' style={{ textAlign: 'center', color: '#5D6975' }}>
                        {numeral(item.product_discount).format('0,0.00')}
                      </td>
                      <td className='total' style={{ textAlign: 'center', color: '#5D6975' }}>
                        {numeral(item.product_price * item.amount - item.product_discount).format('0,0.00')}
                        {item.product_pay_tax === true && 'N'}
                      </td>
                    </tr>
                  ))}

                <tr>
                  <td colSpan='3' style={{ fontSize: '1em', textAlign: 'center', color: '#5D6975' }}>
                    {isReport &&
                      isReport.report_detail &&
                      THBText(
                        isReport.report_detail.reduce(
                          (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                          0
                        ) - isReport.report_discount
                      )}
                  </td>

                  <td colSpan='2' style={{ textAlign: 'right', color: '#5D6975' }}>
                    {' '}
                    รวม/Total
                  </td>

                  <td className='total' style={{ fontSize: '1em', textAlign: 'center', color: '#5D6975' }}>
                    {isReport && numeral(isReport.report_grand_total + isReport.report_discount).format('0,0.00')}
                  </td>
                </tr>
                {isReport.report_vat_name !== 'ไม่มี' && (
                  <>
                    <tr>
                      <td colSpan='3' />
                      <td colSpan='2' style={{ textAlign: 'right', color: '#5D6975' }}>
                        {' '}
                        หักส่วนลด/Discount
                      </td>

                      <td className='total' style={{ fontSize: '1em', textAlign: 'center', color: '#5D6975' }}>
                        {isReport && numeral(isReport.report_discount).format('0,0.00')}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='3' />
                      <td colSpan='2' style={{ textAlign: 'right', color: '#5D6975' }}>
                        สินค้าไม่เสียภาษี/NON VAT
                      </td>

                      <td className='total' style={{ fontSize: '1em', textAlign: 'center', color: '#5D6975' }}>
                        {isReport &&
                          isReport.report_detail &&
                          numeral(
                            isReport.report_detail
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
                      <td colSpan='2' style={{ textAlign: 'right', color: '#5D6975' }}>
                        จำนวนเงินก่อนภาษีมูลค่าเพิ่ม/VAT EXC
                      </td>

                      <td className='total' style={{ fontSize: '1em', textAlign: 'center', color: '#5D6975' }}>
                        {isReport &&
                          isReport.report_detail &&
                          numeral(
                            isReport &&
                              isReport.report_detail &&
                              numeral(
                                ((isReport.report_detail
                                  .filter(item => item.product_pay_tax === false)
                                  .reduce(
                                    (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                                    0
                                  ) -
                                  isReport.report_discount) *
                                  100) /
                                  107
                              ).format('0,0.00')
                          ).format('0,0.00')}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='3' />
                      <td colSpan='2' style={{ textAlign: 'right', color: '#5D6975' }}>
                        {`ภาษี ${(TAX_RATE * 100).toFixed(0)} %`}
                      </td>

                      <td className='total' style={{ fontSize: '1em', textAlign: 'center', color: '#5D6975' }}>
                        {isReport &&
                          isReport.report_detail &&
                          numeral(
                            ((isReport.report_detail
                              .filter(item => item.product_pay_tax === false)
                              .reduce(
                                (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                                0
                              ) -
                              isReport.report_discount) *
                              7) /
                              107
                          ).format('0,0.00')}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <td colSpan='3' />
                  <td colSpan='2' style={{ textAlign: 'right', color: '#5D6975' }}>
                    {' '}
                    จำนวนเงินรวมทั้งสิ้น/Grand Total
                  </td>

                  <td className='total' style={{ fontSize: '1em', textAlign: 'center', color: '#5D6975' }}>
                    {isReport &&
                      isReport.report_detail &&
                      numeral(
                        isReport.report_detail.reduce(
                          (sum, value) => sum + value.amount * value.product_price - value.product_discount,
                          0
                        ) - isReport.report_discount
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
                padding: '8px 0',
                textAlign: 'center'
              }}
            >
              Invoice was created on a computer and is valid without the signature and seal.
            </footer>
          </div>
        </div>
      </div>
    </Grid>
  )
}
