import React from 'react'
import { Icon } from '@iconify/react'
import { TextField, Box, Button, InputAdornment } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

export default function SelectByScaner({ handleSubmitScaner, isProducts, isSelectProduct, setSelectProduct }) {
  return (
    <div>
      <form onSubmit={handleSubmitScaner}>
        <TextField
          fullWidth
          type='text'
          id='first'
          name='first'
          label='สำหรับแสกนบาร์โค้ต'
          value={isSelectProduct}
          onChange={event => setSelectProduct(event.target.value)}
          autoComplete='off'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon icon='bi:upc-scan' width='24' />
              </InputAdornment>
            )
          }}
          variant='standard'
        />
      </form>
    </div>
  )
}
