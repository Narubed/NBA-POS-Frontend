/* eslint-disable react-hooks/rules-of-hooks */
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { Icon } from '@iconify/react'
import { TextField, Box, Button, InputAdornment, Grid, Stack, Snackbar, Slide } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'

import imagesicon from '../../../../../public/images/products/NoImage.png'
import SelectByName from './SelectByName'
import SelectByScaner from './SelectByScaner'
import SelectByID from './SelectByID'
import CardDetail from './CardDetail'
import SnackBar from './SnackBar'
import DialogButtonNumbers from '../lib/DialogButtonNumbers'
import DialogCalculator from '../lib/DialogCalculator'

import { addItem, loading, enqueueSnackbar } from '../../../../store/actions'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function TransitionUp(props) {
  return <Slide {...props} direction='up' />
}

export default function index({
  isProducts,
  deleteProduct,
  changeAmountOrder,
  currency,
  setCurrency,
  isDiscount,
  setDiscount,
  isRadioTypePay,
  handleSetRadioType,
  confirmOrder
}) {
  const dispatch = useDispatch()
  const valueListProduct = useSelector(state => state.list)
  const [isSelectProduct, setSelectProduct] = React.useState('')
  const [isErorSelect, setErorSelect] = React.useState(false)
  const [, forceRerender] = React.useReducer(x => x + 1, 0)
  const [openButtonNumbers, setButtonNumbers] = React.useState(false)
  const [openCalculator, setCalculator] = React.useState(false)

  const handleSubmitScaner = (event, values) => {
    const findProduct = isProducts.find(item => item.product_id === isSelectProduct)
    if (!findProduct) {
      event.preventDefault()
      setErorSelect(true)
    } else {
      event.preventDefault()

      let newReducerProduct =
        valueListProduct.length !== undefined && valueListProduct.length !== 0 ? valueListProduct : []

      const idx = newReducerProduct.findIndex(item => item._id === findProduct._id)
      if (idx === -1) {
        newReducerProduct.push({ ...findProduct, amount: 1 })
      } else {
        newReducerProduct[idx].amount += 1
      }
      dispatch(addItem(newReducerProduct))

      console.log('form submitted ✅', isSelectProduct)
    }

    setSelectProduct('')
  }

  const handleCloseSelectError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setErorSelect(false)
  }

  const setDiscountValue = value => {
    if (currency === 'บาท') {
      if (isNaN(parseFloat(value))) {
        setDiscount(0)
        forceRerender()
      } else {
        setDiscount(parseFloat(value))
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
        forceRerender()
      } else {
        forceRerender()
        setDiscount(newDiscount)
      }
    }
  }

  return (
    <div>
      <Snackbar
        open={isErorSelect}
        autoHideDuration={1000}
        onClose={handleCloseSelectError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={TransitionUp}
      >
        <Alert onClose={handleCloseSelectError} severity='error' sx={{ width: '100%' }}>
          ไม่สามารถหาสินค้านี้ได้ หรือไม่มีสินค้าชิ้นนี้อยู่ในระบบ!
        </Alert>
      </Snackbar>

      <Grid item display='flex' xs={12} container>
        <DialogButtonNumbers
          openButtonNumbers={openButtonNumbers}
          setButtonNumbers={setButtonNumbers}
          setDiscountValue={setDiscountValue}
        />

        <DialogCalculator
          isRadioTypePay={isRadioTypePay}
          handleSetRadioType={handleSetRadioType}
          openCalculator={openCalculator}
          setCalculator={setCalculator}
          isDiscount={isDiscount}
          setDiscount={setDiscount}
          confirmOrder={confirmOrder}
        />
        <Grid xs={7}>
          <div
            style={{
              weight: '100%',
              background: '#000000',
              paddingRight: '15px',
              paddingTop: '5px',
              paddingLeft: '15px',
              justifyContent: 'space-between',
              display: 'flex'
            }}
          >
            <div style={{ color: '#00FF7F' }}>รวม</div>
            {isDiscount && isDiscount !== 0 ? (
              <a style={{ textDecoration: 'line-through', color: '#FFFFFF', fontSize: '80%', marginRight: 5 }}>
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
          </div>
          <div
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              background: '#000000',
              fontSize: '60%',
              color: '#FFFFFF'
            }}
          >
            <div style={{ paddingLeft: '15px' }}>
              <a>
                {valueListProduct &&
                  valueListProduct.length !== 0 &&
                  valueListProduct.length !== undefined &&
                  valueListProduct.length + ' รายการ'}
              </a>
              <br />
              <a>
                {valueListProduct &&
                  valueListProduct.length !== 0 &&
                  valueListProduct.length !== undefined &&
                  valueListProduct.reduce((sum, item) => sum + item.amount, 0) + ' ชิ้น'}
              </a>
            </div>
            <div
              style={{
                fontFamily: 'Arial',
                color: '#00FF7F',
                fontSize: '150%',
                fontWeight: 'bold',
                paddingRight: '15px'
              }}
            >
              {numeral(
                valueListProduct.length !== undefined &&
                  valueListProduct.length !== 0 &&
                  valueListProduct.reduce(
                    (sum, item) => sum + item.product_price * item.amount - item.product_discount,
                    0
                  ) - isDiscount
              ).format('0,0.00')}
            </div>
          </div>
        </Grid>
        <Grid xs={4} sm={2} direction='row' spacing={2} sx={{ display: 'flex' }}>
          <Grid xs={12} sm={8}>
            <TextField
              disabled
              InputProps={{
                readOnly: true
              }}
              sx={{ width: '100%' }}
              id='standard-helperText'
              label={numeral(isDiscount).format('0,0.00')}
              helperText='จำนวนที่ลด'
              variant='standard'
              type='number'
              onClick={() => setButtonNumbers(true)}

              // onChange={setDiscountValue2}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField
              id='standard-select-currency-native'
              select
              label='ประเภท'
              SelectProps={{
                native: true
              }}
              variant='standard'
              onChange={e => setCurrency(e.target.value)}
              value={currency}
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
        <Grid xs={12} sm={3}>
          {valueListProduct.length !== undefined && valueListProduct.length !== 0 && (
            <Button
              fullWidth
              sx={{ height: '100%', fontWeight: 'bold', fontSize: '100%' }}
              variant='contained'
              onClick={() => setCalculator(true)}
            >
              ชำระเงิน
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid item display='flex' xs={12} container>
        <Grid xs={12} sm={12} md={12}>
          <SelectByScaner
            handleSubmitScaner={handleSubmitScaner}
            isProducts={isProducts}
            isSelectProduct={isSelectProduct}
            setSelectProduct={setSelectProduct}
          />
        </Grid>
        {/* <Grid xs={12} sm={4} md={4}>
          <SelectByID isProducts={isProducts} onChangeAutocompleteId={onChangeAutocompleteId} />
        </Grid>

        <Grid xs={12} sm={4} md={4}>
          <SelectByName isProducts={isProducts} />
        </Grid> */}
      </Grid>
      <Grid item xs={12} container>
        <CardDetail deleteProduct={deleteProduct} changeAmountOrder={changeAmountOrder} />
      </Grid>
    </div>
  )
}

{
  /*  <Autocomplete
          fullWidth
          id='select_id'
          {...defaultProps}
          renderOption={(props, option) => (
            <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              {option.product_image === 'ไม่มี' ? (
                <img loading='lazy' width='40' src={`${imagesicon.src}`} srcSet={`${imagesicon.src}`} alt='' />
              ) : (
                <img
                  loading='lazy'
                  width='40'
                  src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${option.product_image}`}
                  srcSet={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${option.product_image}`}
                  alt=''
                />
              )}
              {option.product_name} ({option.product_price}) +{option.product_type}
            </Box>
          )} */
}
