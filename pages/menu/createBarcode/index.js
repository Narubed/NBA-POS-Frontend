/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import { useSession, signIn } from 'next-auth/react'

import Barcode from 'react-barcode'
import Main from '../../../src/components/auth/pages/main'

export default function index() {
  const [values, setValues] = React.useState({
    name: 'test',
    width: 1,
    height: 30,
    fontSize: 20
  })

  const { data: session } = useSession()
  if (!session) return <Main signIn={signIn} />

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  console.log(values)

  return (
    <div>
      <Grid display='flex' xs={12} container spacing={2} mb={8}>
        <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
          <InputLabel htmlFor='standard-adornment-amount'>ใช้เป็นตัวเลข หรือภาษาอังกฤษเท่านั้น</InputLabel>
          <Input
            id='name'
            label='ใช้เป็นตัวเลข หรือภาษาอังกฤษเท่านั้น'
            value={values.name}
            onChange={handleChange('name')}
            startAdornment={
              <InputAdornment position='start'>
                <Icon icon='icon-park-outline:add-print' />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid display='flex' xs={12} container spacing={2}>
        <Grid xs={12} sm={12} md={4}>
          ความกว้าง
          <PrettoSlider
            size='small'
            valueLabelDisplay='auto'
            aria-label='pretto slider'
            defaultValue={values.width}
            min={1}
            max={10}
            onChange={handleChange('width')}
          />
        </Grid>
        <Grid xs={12} sm={12} md={4}>
          ความสูง
          <PrettoSlider
            size='small'
            valueLabelDisplay='auto'
            aria-label='pretto slider'
            defaultValue={values.height}
            min={1}
            max={500}
            onChange={handleChange('height')}
          />
        </Grid>
        <Grid xs={12} sm={12} md={4}>
          ขนาดตัวหนังสือ
          <PrettoSlider
            size='small'
            valueLabelDisplay='auto'
            aria-label='pretto slider'
            defaultValue={values.fontSize}
            min={1}
            max={100}
            onChange={handleChange('fontSize')}
          />
        </Grid>
      </Grid>
      <Grid display='flex' xs={12} spacing={2} justifyContent='center'>
        <Barcode value={values.name} width={values.width} height={values.height} fontSize={values.fontSize} />
      </Grid>
    </div>
  )
}

const PrettoSlider = styled(Slider)({
  height: 8,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52a',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
})
