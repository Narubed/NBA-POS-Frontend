import * as React from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import Box from '@mui/material/Box'
import TableProduct from './component/TableProduct'
import TableProductDetail from './component/TableProductDetail'

function DesignBlocks() {
  const { data: session } = useSession()
  const [isSelectedProduct, setSelectedProduct] = React.useState()
  const [isProductHistory, setProductHistory] = React.useState([])
  const [isProductHistoryAll, setProductHistoryAll] = React.useState([])

  const findProducthistory = async row => {
    setSelectedProduct(row)
    const isBranch = localStorage.getItem('branch')

    const getProductHisrory = await axios.get(
      `${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history/product/${row._id}`
    )
    setProductHistory(getProductHisrory.data.data.reverse())
    setProductHistoryAll(getProductHisrory.data.data.reverse())
  }

  const onClickSeleteChannel = item => {
    if (item !== 'all') {
      const filterChannel = isProductHistoryAll.filter(value => value.pdh_type === item)
      setProductHistory(filterChannel)
    } else {
      setProductHistory(isProductHistoryAll)
    }
  }

  return (
    <Box component='section' my={1} py={1}>
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box position='sticky' top='60px' pb={{ xs: 2, lg: 6 }}>
            <TableProduct findProducthistory={findProducthistory} isSelectedProduct={isSelectedProduct} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Box position='sticky' top='60px' pb={{ xs: 2, lg: 6 }}>
            <TableProductDetail isProductHistory={isProductHistory} onClickSeleteChannel={onClickSeleteChannel} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DesignBlocks
