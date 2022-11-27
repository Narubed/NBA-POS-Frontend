import React from 'react'
import { Icon } from '@iconify/react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import numeral from 'numeral'

import {
  Grid,
  Container,
  Box,
  Typography,
  Badge,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton
} from '@mui/material'

import imagesicon from '../../../../../public/images/products/NoImage.png'
import DialogCalculator from '../lib/DialogCalculator'
import DialogButtonNumbers from '../lib/DialogButtonNumbers'
import DialogNoteProduct from '../lib/DialogNoteProduct'

import { addItem } from '../../../../store/actions'

function ListProduct({
  deleteProduct,
  confirmOrder,
  isDiscount,
  setDiscount,
  isRadioTypePay,
  handleSetRadioType,
  currency,
  setCurrency,
  isReport
}) {
  const dispatch = useDispatch()
  const valueListProduct = useSelector(state => state.list)

  const [, forceRerender] = React.useReducer(x => x + 1, 0)
  const [openCalculator, setCalculator] = React.useState(false)
  const [openButtonNumbers, setButtonNumbers] = React.useState(false)

  const handleChange = event => {
    setCurrency(event.target.value)
  }

  const onClickDeleteProduct = row => {
    const item = row
    deleteProduct({ item })
  }

  const setDiscountValue = value => {
    if (currency === 'บาท') {
      if (isNaN(parseFloat(value))) {
        setDiscount(0)
        localStorage.setItem('discount', 0)
        forceRerender()
      } else {
        setDiscount(parseFloat(value))
        localStorage.setItem('discount', parseFloat(value))
        forceRerender()
      }
    } else {
      const newSummary =
        valueListProduct.length !== undefined &&
        valueListProduct.length !== 0 &&
        valueListProduct.reduce((sum, item) => sum + item.product_price * item.amount - item.product_discount, 0)
      const newDiscount = (newSummary * parseFloat(value)) / 100
      if (isNaN(newDiscount)) {
        setDiscount(0)
        localStorage.setItem('discount', 0)
        forceRerender()
      } else {
        forceRerender()
        setDiscount(newDiscount)
        localStorage.setItem('discount', newDiscount)
      }
    }
  }

  return (
    <div>
      <DialogButtonNumbers
        openButtonNumbers={openButtonNumbers}
        setButtonNumbers={setButtonNumbers}
        setDiscountValue={setDiscountValue}
      />

      <DialogCalculator
        isReport={isReport}
        isRadioTypePay={isRadioTypePay}
        handleSetRadioType={handleSetRadioType}
        openCalculator={openCalculator}
        setCalculator={setCalculator}
        isDiscount={isDiscount}
        setDiscount={setDiscount}
        confirmOrder={confirmOrder}
      />

      <Grid item display={'flex'} sx={{ mb: 5 }}>
        <Grid xs={9} sm={9} md={9} lg={9}>
          <TextField
            disabled
            InputProps={{
              readOnly: true
            }}
            onClick={() => setButtonNumbers(true)}
            sx={{ width: '100%' }}
            id='standard-helperText'
            label={numeral(isDiscount).format('0,0.00')}
            helperText='จำนวนที่ลด'
            variant='standard'
            type='number'

            // onChange={setDiscountValue2}
          />
        </Grid>
        <Grid xs={3} sm={3} md={3} lg={3}>
          <TextField
            id='standard-select-currency-native'
            select
            label='ประเภท'
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant='standard'

            // helperText='Select reduction type'
          >
            <option key={'%'} value={'%'}>
              %
            </option>
            <option key={'บาท'} value={'บาท'}>
              บาท
            </option>
          </TextField>
        </Grid>
      </Grid>
      <Grid item display={'flex'}>
        <TextField
          label={
            isDiscount && isDiscount !== 0 ? (
              <a style={{ color: 'red' }}>- {numeral(isDiscount).format('0,0.00')} บาท</a>
            ) : null
          }
          InputProps={{
            readOnly: true
          }}
          sx={{ width: '100%' }}
          id='standard-helperText'
          helperText='ผลรวมทั้งหมด'
          variant='standard'
          value={numeral(
            valueListProduct?.length !== undefined && valueListProduct.length !== 0
              ? valueListProduct?.reduce(
                  (sum, item) => sum + item.product_price * item.amount - item.product_discount,
                  0
                ) - isDiscount
              : 0
          ).format('0,0.00')}
        />
        {isDiscount && isDiscount !== 0 ? (
          <a style={{ textDecoration: 'line-through', color: 'red', fontSize: '80%', marginRight: 5 }}>
            {valueListProduct.length !== undefined && valueListProduct.length !== 0
              ? numeral(
                  valueListProduct.reduce(
                    (sum, item) => sum + item.product_price * item.amount - item.product_discount,
                    0
                  )
                ).format('0,0.00')
              : null}
          </a>
        ) : null}

        {/* valueListProduct.length !== undefined &&
              valueListProduct.length !== 0 &&
              valueListProduct.reduce((sum, item) => sum + item.product_price * item.amount, 0) */}
      </Grid>
      <Grid sx={{ mt: 8 }}>
        {valueListProduct?.length !== undefined && valueListProduct.length !== 0 && (
          <Button variant='contained' disableElevation sx={{ width: '100%' }} onClick={() => setCalculator(true)}>
            ชำระเงิน
          </Button>
        )}
      </Grid>

      <PerfectScrollbar style={{ maxHeight: '380px' }} options key={1}>
        {valueListProduct?.length !== undefined &&
          valueListProduct.length !== 0 &&
          valueListProduct.map(row => (
            <>
              {/* <DialogNoteProduct
                openNoteProduct={openNoteProduct}
                setNoteProduct={setNoteProduct}
                row={row}
                confirmNote={confirmNote}
              /> */}
              <Card
                key={row._id}
                sx={{
                  width: '100%',
                  mt: 1
                }}
              >
                <CardContent sx={{ p: '4px' }}>
                  <Grid container spacing={1} sx={{ position: 'relative', mb: -2 }}>
                    <Grid item xs={4} sm={2} md={2} lg={2} sx={{ mt: 1 }}>
                      <Box
                        sx={{
                          overflow: 'hidden',
                          transform: 'perspective(999px) rotateX(0deg) translate3d(0, 0, 0)',
                          transformOrigin: '50% 0',
                          backfaceVisibility: 'hidden',
                          willChange: 'transform, box-shadow',
                          transition: 'transform 200ms ease-out',

                          '&:hover': {
                            transform: 'perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)'
                          }
                        }}
                      >
                        <Box
                          component='img'
                          src={
                            row.product_image === 'ไม่มี'
                              ? imagesicon.src
                              : `${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${row.product_image}`
                          }
                          width='100%'
                          my='auto'
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} lg={4}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{row.product_name}</div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>x{row.amount}</div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {row.product_discount > 0 ? (
                          <>
                            <a
                              style={{ textDecoration: 'line-through', color: 'red', fontSize: '80%', marginRight: 5 }}
                            >
                              {numeral(row.product_price * row.amount).format('0,0')}
                            </a>
                            <a>{numeral(row.product_price * row.amount - row.product_discount).format('0,0')}</a>
                          </>
                        ) : (
                          numeral(row.product_price * row.amount).format('0,0')
                        )}
                      </div>
                      {row.product_note !== 'ไม่มี' && (
                        <a style={{ fontSize: '10px', color: 'purple' }}> *{row.product_note}</a>
                      )}
                    </Grid>
                    <IconButton
                      color='error'
                      aria-label='upload picture'
                      component='label'
                      sx={{ position: 'absolute', top: '0px', right: '0px' }}
                      onClick={() => onClickDeleteProduct(row)}
                    >
                      <Icon icon='ic:baseline-delete-sweep' width='24' height='24' />
                    </IconButton>
                    <DialogNoteProduct row={row} />
                  </Grid>
                </CardContent>
              </Card>
            </>
          ))}
      </PerfectScrollbar>
      {/* <Typography variant='h5' fontWeight='bold' mb={1}>
        เครื่องคิดเลข
      </Typography>
      <Typography variant='body2' fontWeight='regular' color='secondary' mb={1} pr={2}>
        043213213000000000000000asd asd asd asd s
      </Typography> */}
    </div>
  )
}

export default ListProduct
