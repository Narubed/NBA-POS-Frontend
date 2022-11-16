import * as React from 'react'
import numeral from 'numeral'
import ReactToPrint from 'react-to-print'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import PrintInvoice from '../components/PrintInvoice'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DialogCalculator({
  openCalculator,
  setCalculator,
  isDiscount,
  setDiscount,
  confirmOrder,
  isRadioTypePay,
  setRadioTypePay,
  isReport
}) {
  const componentToPrint = React.useRef(null)
  const valueListProduct = useSelector(state => state.list)
  const [value, setvalue] = React.useState()
  const [isSummary, setSummary] = React.useState('')
  const [isAlert, setAlert] = React.useState(false)

  const handleClose = () => {
    setSummary('')
    setvalue()
    setCalculator(false)
  }

  const setKeyUp = event => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    const strings = ['Backspace', 'Enter', '.']
    if (event && event.key) {
      const findNumbers = numbers.find(item => event.key === item)
      const findString = strings.find(item => item === event.key)
      if (findNumbers) {
        if (isSummary.length < 11) {
          setSummary(isSummary + findNumbers)
        }
      } else if (findString === 'Backspace') {
        setSummary((isSummary = isSummary.slice(0, -1)))
      } else if (findString === '.') {
        setSummary(isSummary + findString)
      } else if (findString === 'Enter') {
        const newDiscout = numeral(
          valueListProduct.length !== undefined &&
            valueListProduct.length !== 0 &&
            valueListProduct.reduce((sum, item) => sum + item.product_price * item.amount - item.product_discount, 0) -
              isDiscount
        ).format('0.00')
        if (parseFloat(newDiscout) > parseFloat(isSummary) || !isSummary) {
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
          }, 2000)
        } else {
          confirmOrder(isSummary)
          setDiscount(0)
          setSummary('')
          setvalue()
          setCalculator(false)
        }
      }
    }
  }

  const onClickButton = item => {
    if (typeof item === 'number') {
      if (isSummary.length < 11) {
        setSummary(isSummary + item.toLocaleString())
      }
    } else if (item === '.') {
      setSummary(isSummary + item.toLocaleString())
    } else if (item === 'Backspace') {
      setSummary((isSummary = isSummary.slice(0, -1)))
    } else if (item === '1000') {
      const newSum = parseFloat(isSummary) + 1000
      if (isNaN(newSum)) {
        setSummary('1000')
      } else {
        setSummary(newSum.toString())
      }
    } else if (item === '500') {
      const newSum = parseFloat(isSummary) + 500
      if (isNaN(newSum)) {
        setSummary('500')
      } else {
        setSummary(newSum.toString())
      }
    } else if (item === '100') {
      const newSum = parseFloat(isSummary) + 100
      if (isNaN(newSum)) {
        setSummary('100')
      } else {
        setSummary(newSum.toString())
      }
    } else if (item === 'เต็ม') {
      const newDiscout = numeral(
        valueListProduct.length !== undefined &&
          valueListProduct.length !== 0 &&
          valueListProduct.reduce((sum, item) => sum + item.product_price * item.amount - item.product_discount, 0) -
            isDiscount
      ).format('0.00')
      setSummary(newDiscout.toString())
    } else if ('Enter') {
      const newDiscout = numeral(
        valueListProduct.length !== undefined &&
          valueListProduct.length !== 0 &&
          valueListProduct.reduce((sum, item) => sum + item.product_price * item.amount - item.product_discount, 0) -
            isDiscount
      ).format('0.00')
      if (newDiscout > parseFloat(isSummary) || !isSummary) {
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      } else {
        setDiscount(0)
        confirmOrder(isSummary)
        setSummary('')
        setvalue()
        setCalculator(false)
      }
    }
  }

  return (
    <div
      autoFocus
      tabIndex='0'
      onKeyUp={event => {
        setKeyUp(event)
        setvalue({
          keyUp: {
            key: event.key,
            keyCode: event.keyCode,
            keyChar: event.charCode
          }
        })
      }}
      onChange={event => {
        const input = event.target
        if (input.value.length > 1) {
          input.value = input.value.substring(1)
        }
      }}
    >
      <Dialog
        maxWidth='xs'
        fullWidth
        open={openCalculator}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        {isAlert && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity='warning'>ไม่สามารถทำรายการได้ — เนื่่องจากจำนวนค่าน้อยกว่าผลรวมราคาสินค้า !</Alert>
          </Stack>
        )}

        <DialogTitle>
          <FormControl>
            <FormLabel id='demo-row-radio-buttons-group-label'>ประเภทการชำระ</FormLabel>

            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={isRadioTypePay}
              onChange={e => setRadioTypePay(e.target.value)}
            >
              <FormControlLabel value='เงินสด' control={<Radio />} label='เงินสด' />
              <FormControlLabel value='โอนจ่าย' control={<Radio />} label='โอนจ่าย' />
              <FormControlLabel value='บัตรเครดิต' control={<Radio />} label='บัตรเครดิต' />
              <FormControlLabel value='อื่น ๆ' control={<Radio />} label='อื่น ๆ' />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, textAlign: 'right' }} variant='standard'>
            {/* <InputLabel htmlFor='standard-adornment-amount'>{isSummary && numeral(isSummary).format('0,0')}</InputLabel> */}
            <Input
              disabled
              fullWidth
              inputProps={{ min: 0, readOnly: true, style: { textAlign: 'right', fontSize: '28px' } }}
              id='standard-adornment-amount'
              value={isSummary && numeral(isSummary).format('0,0.00')}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </FormControl>
        </DialogTitle>
        {/* {isSummary && isSummary} */}
        {/* {value && value.keyUp && value.keyUp.key} */}
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Grid item xs={12} sx={{ display: 'flex', mb: 5, alignContent: 'center' }} spacing={2}>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(1)}
                >
                  1
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(2)}
                >
                  2
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(3)}
                >
                  3
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  color='success'
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton('1000')}
                >
                  +1000
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', mb: 5 }} spacing={2}>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(4)}
                >
                  4
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(5)}
                >
                  5
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(6)}
                >
                  6
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  color='success'
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton('500')}
                >
                  +500
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', mb: 5 }} spacing={2}>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(7)}
                >
                  7
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(8)}
                >
                  8
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(9)}
                >
                  9
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  color='success'
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton('100')}
                >
                  +100
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', mb: 5 }} spacing={2}>
              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton('.')}
                >
                  .
                </Button>
              </Grid>

              <Grid xs={3}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(0)}
                >
                  0
                </Button>
              </Grid>

              <Grid xs={3}>
                <Button
                  color='error'
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton('Backspace')}
                >
                  delete
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  color='warning'
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton('เต็ม')}
                >
                  เต็ม
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            disableElevation
            sx={{ fontSize: '24px', width: '100%' }}
            onClick={() => onClickButton('Enter')}
          >
            ตกลง
            {/* <ReactToPrint trigger={() => <Button>ตกลง</Button>} content={() => componentToPrint.current} /> */}
          </Button>
        </DialogActions>
      </Dialog>
      {/* <PrintInvoice componentToPrint={componentToPrint} isReport={isReport} /> */}
    </div>
  )
}
