import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Box, Button, InputAdornment } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

import imagesicon from '../../../../../public/images/products/NoImage.png'

import { addItem, loading, enqueueSnackbar } from '../../../../store/actions'

export default function SelectByName({ isProducts }) {
  const dispatch = useDispatch()
  const [isValueSelect, setValueSelect] = React.useState()
  const [, forceRerender] = React.useReducer(x => x + 1, 0)
  const valueListProduct = useSelector(state => state.list)

  const handleSubmit = event => {
    event.preventDefault()
    if (isValueSelect) {
      const findProduct = isProducts.find(item => item._id === isValueSelect._id)

      let newReducerProduct =
        valueListProduct.length !== undefined && valueListProduct.length !== 0 ? valueListProduct : []
      const idx = newReducerProduct.findIndex(item => item._id === findProduct._id)
      if (idx === -1) {
        newReducerProduct.push({ ...findProduct, amount: 1 })
        forceRerender()
      } else {
        newReducerProduct[idx].amount += 1
        forceRerender()
      }

      dispatch(addItem(newReducerProduct))
      setValueSelect()
    }
  }

  const onChangeAutocompleteId = (event, values) => {
    if (values) {
      const findProduct = isProducts.find(item => item._id === values._id)

      let newReducerProduct =
        valueListProduct.length !== undefined && valueListProduct.length !== 0 ? valueListProduct : []
      const idx = newReducerProduct.findIndex(item => item._id === findProduct._id)
      if (idx === -1) {
        newReducerProduct.push({ ...findProduct, amount: 1 })
      } else {
        newReducerProduct[idx].amount += 1
      }
      setSelectProduct('')
      dispatch(addItem(newReducerProduct))
    }
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <Autocomplete
        fullWidth
        id='country-select-demo'
        options={isProducts}
        autoHighlight
        onChange={onChangeAutocompleteId}
        getOptionLabel={option => option.product_id}
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
            onChange={e => setValueSelect(e.target.value)}
            variant='standard'
            {...params}
            label='ค้าหาตามไอดี..'
            inputProps={{
              ...params.inputProps
            }}
          />
        )}
      />
      {/* </form> */}
    </div>
  )
}
