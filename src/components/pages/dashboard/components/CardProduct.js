// ** MUI Imports
import React from 'react'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import { CardActionArea } from '@mui/material'

import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import LoadingButton from '@mui/lab/LoadingButton'
import { purple } from '@mui/material/colors'

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
})

const CardImgTop = () => {
  return (
    <>
      <Card sx={{ cursor: 'pointer' }} onClick={() => console.log('detail')}>
        <CardActionArea>
          <CardMedia sx={{ pt: '100%', position: 'relative' }}>
            <ProductImgStyle src={`https://drive.google.com/uc?export=view&id=1JqLW-y0XwO5Wm1FbPG-1XSMpslgEeVP8`} />
          </CardMedia>
          <CardContent>
            <Typography variant='body2'>ชื่อสินค้า</Typography>
            <Typography variant='body2'>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='subtitle2'>
                  &nbsp;
                  <div> 200 บาท</div>
                </Typography>
              </Stack>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default CardImgTop
