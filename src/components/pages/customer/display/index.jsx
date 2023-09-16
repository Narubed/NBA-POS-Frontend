import React from 'react'
import { Divider, Grid, Box } from '@mui/material'
import numeral from 'numeral'
import PerfectScrollbar from 'react-perfect-scrollbar'

function index(props) {
  const { isShopping, isScanner, HeightCard,HeightScroll } = props
  console.log(isScanner)
  console.log(isScanner.hasOwnProperty('product_name'))
  console.log(isShopping)

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={9}>
          <Box
            sx={{
              bgcolor: '#000000',
              m: 1,
              p: 4,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '5px'
            }}
          >
            {isShopping.length !== 0 && isScanner && isScanner.hasOwnProperty('product_name') ? (
              <div style={{ textAlign: 'center', alignItems: 'center', margin: '0' }}>
                <div style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold' }}>
                  {isScanner.product_name} 1 ชิ้น
                </div>
                <div
                  style={{
                    color: 'lightgreen',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAlign: 'right',
                    width: '100%'
                  }}
                >
                  ราคาสินค้า {numeral(isScanner.product_price).format('0,0.00')}
                </div>
              </div>
            ) : (
              <div
                style={{
                  color: 'lightgreen',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                ยินดีต้อนรับ
              </div>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            justifyContent: 'center',
            display: 'flex',
            height: '100%',
            alignContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{ p: 4, borderRadius: '10px', height: '100%' }}>
            {' '}
            <img
              src='https://nbadigitalservice.com/static/media/NBA-POS.479f39a7.png'
              alt='https://nbadigitalservice.com/static/media/NBA-POS.479f39a7.png'
              width='120px'
            />
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          color: '#FFFFFF',
          bgcolor: 'black',
          mt: 2,
          ml: 1,
          borderRadius: '1px',
          pl: 7,
          pr: 7,
          pt: 2,
          pb: 4,
          minHeight: HeightCard
        }}
      >
        <PerfectScrollbar style={{ maxHeight: HeightScroll }} options key={1}>
          <table style={{ width: '100%' }}>
            <tr>
              <th align='left'>รายการ</th>
              <th align='center'>จำนวน</th>
              <th align='right'>ราคา</th>
            </tr>
            {isShopping.length !== 0 &&
              isShopping.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    {index + 1}.{item.product_name}
                  </td>
                  <td align='center'>{item.amount}</td>
                  <td align='right'>{numeral(item.product_price * item.amount).format('0,0.00')}</td>
                </tr>
              ))}
          </table>
        </PerfectScrollbar>
      </Box>

      <Box
        sx={{
          color: '#FFFFFF',
          bgcolor: 'black',
          mt: 1,
          ml: 1,
          borderRadius: '1px',
          pl: 7,
          pr: 7,
          pt: 2,
          pb: 4
        }}
      >
        <Grid sx={{ justifyContent: 'space-between', display: 'flex' }}>
          {' '}
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>ยอดรวม:</div>
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>
            {numeral(
              isShopping.reduce((sum, item) => sum + (item.product_price * item.amount - item.product_discount), 0)
            ).format('0,0.00')}
          </div>
        </Grid>
        <Grid sx={{ justifyContent: 'space-between', display: 'flex' }}>
          {' '}
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>ส่วนลด:</div>
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>
            {JSON.parse(localStorage.getItem('discount')) ? JSON.parse(localStorage.getItem('discount')) : 0}
          </div>
        </Grid>
        <Grid sx={{ justifyContent: 'space-between', display: 'flex' }}>
          {' '}
          <div style={{ fontSize: 26, fontWeight: 'bold' }}>ยอดรวมสุทธิ:</div>
          <div style={{ fontSize: 26, fontWeight: 'bold', color: 'blue' }}>
            {' '}
            {numeral(
              isShopping.reduce((sum, item) => sum + (item.product_price * item.amount - item.product_discount), 0) -
                JSON.parse(localStorage.getItem('discount'))
            ).format('0,0.00')}
          </div>
        </Grid>
      </Box>
              
      {/* <Box
        className='upgrade-to-pro-button mui-fixed'
        sx={{ left: theme => theme.spacing(0), bottom: theme => theme.spacing(10), zIndex: 11, position: 'fixed', bgcolor:'red', width: "50%" }}
      >
        123
      </Box> */}
    </div>
  )
}

export default index
