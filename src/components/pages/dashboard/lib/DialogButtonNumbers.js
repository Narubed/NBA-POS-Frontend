import * as React from 'react'
import numeral from 'numeral'
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DialogCalculator({ openButtonNumbers, setButtonNumbers, setDiscountValue }) {
  const [value, setvalue] = React.useState()
  const [isSummary, setSummary] = React.useState('')

  const handleClose = () => {
    setSummary('')
    setvalue()
    setButtonNumbers(false)
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
        setDiscountValue(isSummary)
        setSummary('')
        setvalue()
        setButtonNumbers(false)
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
    } else if ('Enter') {
      setDiscountValue(isSummary)
      setSummary('')
      setvalue()
      setButtonNumbers(false)
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
        sx={{ zindex: '7 !important' }}
        maxWidth='xs'
        fullWidth
        open={openButtonNumbers}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          <FormControl fullWidth sx={{ m: 1, textAlign: 'right' }} variant='standard'>
            {/* <InputLabel htmlFor='standard-adornment-amount'>{isSummary && numeral(isSummary).format('0,0')}</InputLabel> */}
            <Input
              disabled
              fullWidth
              inputProps={{ min: 0, readOnly: true, style: { textAlign: 'right', fontSize: '28px' } }}
              id='standard-adornment-amount'
              value={isSummary && numeral(isSummary).format('0,0.00')}

              // endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </FormControl>
        </DialogTitle>
        {/* {isSummary && isSummary} */}
        {/* {value && value.keyUp && value.keyUp.key} */}
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Grid item xs={12} sx={{ display: 'flex', mb: 5, alignContent: 'center' }} spacing={2}>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(1)}
                >
                  1
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(2)}
                >
                  2
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(3)}
                >
                  3
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', mb: 5 }} spacing={2}>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(4)}
                >
                  4
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(5)}
                >
                  5
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(6)}
                >
                  6
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', mb: 5 }} spacing={2}>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(7)}
                >
                  7
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(8)}
                >
                  8
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(9)}
                >
                  9
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', mb: 5 }} spacing={2}>
              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton('.')}
                >
                  .
                </Button>
              </Grid>

              <Grid xs={4}>
                <Button
                  variant='contained'
                  disableElevation
                  sx={{ width: '95%', height: '100%', fontSize: '20px' }}
                  onClick={() => onClickButton(0)}
                >
                  0
                </Button>
              </Grid>

              <Grid xs={4}>
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
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
