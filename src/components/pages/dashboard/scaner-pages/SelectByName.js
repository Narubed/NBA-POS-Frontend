import React from 'react'
import { TextField, Box, Button, InputAdornment } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import imagesicon from '../../../../../public/images/products/NoImage.png'

export default function SelectByName({ isProducts }) {
  const [isSelectProductName, setSelectProductName] = React.useState(null)

  const onChangeValue = (event, values) => {
    setSelectProductName(values)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Autocomplete
        fullWidth
        id='country-select-demo'
        options={isProducts}
        autoHighlight
        onChange={onChangeValue}
        getOptionLabel={option => option.product_name}
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
        )}
        renderInput={params => (
          <TextField
            variant='standard'
            {...params}
            label='ค้นหาตามชื่อสินค้า'
            inputProps={{
              ...params.inputProps
            }}
          />
        )}
      />
    </div>
  )
}
