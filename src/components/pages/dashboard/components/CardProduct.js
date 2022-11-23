/* eslint-disable react-hooks/rules-of-hooks */
// ** MUI Imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import { CardActionArea } from '@mui/material'
import numeral from 'numeral'
import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import DialogButtonAmount from '../lib/DialogButtonAmount'

// images
import imagesicon from '../../../../../public/images/products/NoImage.png'

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
})

const CardImgTop = ({ item, checkOrder, deleteProduct, changeAmountOrder }) => {
  const valueListProduct = useSelector(state => state.list)
  const [openButtonAmount, setButtonAmount] = React.useState(false)

  const onClickCard = async () => {
    await checkOrder({ item })
  }

  const onClickDeleteProduct = async event => {
    event.stopPropagation()
    await deleteProduct({ item })
  }

  const addAmountProduct = async event => {
    event.stopPropagation()
    setButtonAmount(true)
  }

  const setChangeAmount = async value => {
    const newAmount = 0
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      await deleteProduct({ item })
    } else {
      newAmount = parseFloat(value)
      const newItem = { ...item, amount: parseFloat(newAmount) }
      changeAmountOrder(newItem)
    }
  }

  const newvalue =
    valueListProduct?.length !== undefined &&
    valueListProduct.length !== 0 &&
    valueListProduct.find(row => row._id === item._id)

  return (
    <>
      <DialogButtonAmount
        openButtonAmount={openButtonAmount}
        setButtonAmount={setButtonAmount}
        setChangeAmount={setChangeAmount}
      />
      <Card sx={{ cursor: 'pointer', position: 'relative', border: '1px solid purple' }}>
        <CardActionArea onClick={onClickCard}>
          <CardMedia sx={{ pt: '100%', position: 'relative' }}>
            <>
              {newvalue && (
                <Box
                  position='absolute'
                  top={4}
                  left={8}
                  zIndex={1}
                  p={0}
                  sx={{
                    bgcolor: 'white',
                    m: 'auto',
                    borderRadius: '10px'
                  }}
                >
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='span'
                    sx={{ m: 1, p: 0 }}
                    onClick={addAmountProduct}
                  >
                    {newvalue.amount <= 9 ? `0${newvalue.amount}` : newvalue.amount}
                  </IconButton>
                  <br />
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='span'
                    sx={{ m: 1, p: 0 }}
                    onClick={onClickDeleteProduct}
                  >
                    <Icon icon='icon-park-solid:delete-five' />
                  </IconButton>
                </Box>
              )}
              {item.product_image === 'ไม่มี' ? (
                <ProductImgStyle src={imagesicon.src} />
              ) : (
                <ProductImgStyle src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${item.product_image}`} />
              )}
              {item.product_unit_store <= 0 && (
                <Box
                  position='absolute'
                  top={4}
                  right={8}
                  zIndex={1}
                  p={0}
                  sx={{
                    bgcolor: 'red',
                    m: 'auto',
                    borderRadius: '10px'
                  }}
                >
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='span'
                    sx={{ m: 1, p: 0, fontSize: '12px' }}
                  >
                    หมด
                    {/* <Icon icon='icon-park-solid:delete-five' /> */}
                  </IconButton>
                </Box>
              )}
            </>
          </CardMedia>
          <CardContent>
            <Typography variant='body2'>ชื่อสินค้า: {item.product_name}</Typography>
            <Typography variant='body2'>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='subtitle2'>ราคา : {numeral(item.product_price).format('0,0')} บาท</Typography>
              </Stack>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default CardImgTop
