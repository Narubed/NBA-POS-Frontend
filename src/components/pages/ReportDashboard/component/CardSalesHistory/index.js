/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { styled, useTheme } from '@mui/material/styles'
import dayjs from 'dayjs'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'

import {
  Divider,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField
} from '@mui/material'
import axios from 'axios'
import { now } from 'next-auth/client/_utils'
import numeral from 'numeral'

import ChartDateIncome from './ChartDateIncome'
import ChartTypePrice from './ChartTypePrice'
import ChartTopPriceProduct from './ChartTopPriceProduct'

const TypographyHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  lineHeight: 'normal',
  letterSpacing: '0.21px',
  textTransform: 'uppercase',
  color: theme.palette.text.disabled,
  fontWeight: theme.typography.fontWeightMedium
}))




export default function index() {
  const { data: session } = useSession()
  const [isReports, setReports] = useState([])
  const [isReportsDateNow, setReportsDateNow] = useState([])
  const [isDateSelect, setDateSelect] = useState(Date.now())
  const [isSummary, setSummary] = useState(0)
  const [isTopProducts, setTopProducts] = useState([])

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': 'Bearer ' + localStorage.getItem('token')
    }
  }

  useEffect(() => {
    funcGetReport()
    fetchProductHistory()
  }, [])

  async function funcGetReport() {
    let getReport = []
    const isBranch = localStorage.getItem('branch')
    await axios(`${process.env.NEXT_PUBLIC_POS_BACKEND}/report/branch/${isBranch}`, config).then(
      res => (getReport = res.data.data)
    )
    if (getReport.length !== 0) {
      setReports(getReport)

      const filterDateNow = getReport.filter(
        item => dayjs(item.report_timestamp).format('DD MM YYYY') === dayjs(isDateSelect).format('DD MM YYYY')
      )
      let summary = 0
      filterDateNow.forEach(element => {
        summary +=
          element.report_detail.reduce(
            (sum, item) => sum + ((item.product_price - item.product_cost) * item.amount - item.product_discount),
            0
          ) - element.report_discount
      })
      setSummary(summary)
      setReportsDateNow(filterDateNow)
    }
  }

  const onChangeDateSelect = props => {
    setDateSelect(props)

    const filterDateNow = isReports.filter(
      item => dayjs(item.report_timestamp).format('DD MM YYYY') === dayjs(props).format('DD MM YYYY')
    )
    let summary = 0
    filterDateNow.forEach(element => {
      summary =
        element.report_detail.reduce(
          (sum, item) => sum + ((item.product_price - item.product_cost) * item.amount - item.product_discount),
          0
        ) - element.report_discount
    })
    setSummary(summary)
    setReportsDateNow(filterDateNow)
  }

  const fetchProductHistory = async () => {
    const isBranch = localStorage.getItem('branch')
    const fetchHistory = await axios(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history/branch/${isBranch}`, config)
    const fetchProducts = await axios(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/branch/${isBranch}`, config)

    const { data } = fetchHistory.data

    const filterStatusPrice = data.filter(item => item.pdh_channel === 'ขาย (ธรรมดา)')
    const newArrayHistory = []
    filterStatusPrice.forEach(element => {
      const idx = newArrayHistory.findIndex(item => item.pdh_product_id === element.pdh_product_id)
      if (idx === -1) {
        newArrayHistory.push(element)
      } else {
        newArrayHistory[idx].pdh_change_number += element.pdh_change_number
      }
    })
    newArrayHistory.sort((a, b) => a.pdh_change_number - b.pdh_change_number)
    const sliceHistory = newArrayHistory.slice(0, 5)
    const findProductName = []
    sliceHistory.forEach(element => {
      const findData = fetchProducts.data.data.find(item => item._id === element.pdh_product_id)
      if (findData) {
        findProductName.push({ ...element, product_name: findData.product_name })
      }
    })
    setTopProducts(findProductName)
  }

  return (
    <div>
      {' '}
      <Divider
        textAlign='left'
        sx={{
          m: 0,
          width: '100%',
          lineHeight: 'normal',
          textTransform: 'uppercase',
          '&:before, &:after': { top: 16, transform: 'none' },
          '& .MuiDivider-wrapper': { px: 2.5, fontSize: '0.75rem', letterSpacing: '0.21px' }
        }}
      >
        <TypographyHeaderText noWrap>ยอดขายวันนี้</TypographyHeaderText>
      </Divider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <MobileDatePicker
            label='วันที่ต้องการดูยอดขาย'
            value={isDateSelect}
            onChange={newValue => {
              onChangeDateSelect(newValue)
            }}
            renderInput={params => <TextField variant='standard' {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <Grid container spacing={4} sx={{ textAlign: 'center', mt: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  ยอดรวม
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                  {numeral(isReportsDateNow.reduce((sum, item) => sum + item.report_grand_total, 0)).format('0,0.00')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  จำนวนบิล/วัน
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                  {isReportsDateNow.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  เฉลี่ย/บิล
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                  {numeral(
                    isReportsDateNow.reduce((sum, item) => sum + item.report_grand_total, 0) / isReportsDateNow.length
                  ).format('0,0.00')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  กำไรสุทธิ
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                  {numeral(isSummary).format('0,0.00')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ChartDateIncome isReportsDateNow={isReportsDateNow} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <ChartTypePrice isReports={isReports} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <ChartTopPriceProduct isTopProducts={isTopProducts} />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
