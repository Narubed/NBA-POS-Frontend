/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import CardProduct from './components/CardProduct'
import axios from 'axios'
import { Icon } from '@iconify/react'

import { Grid, Container, Box, Typography, Badge, Card, TextField, OutlinedInput, InputAdornment } from '@mui/material'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

import { filter } from 'lodash'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import CreditCardScan from 'mdi-material-ui/CreditCardScan'
import CashRegister from 'mdi-material-ui/CashRegister'

import 'react-datepicker/dist/react-datepicker.css'

import { addItem, loading } from '../../../store/actions'
import ListProduct from './components/ListProduct'
import DialogSelectPrint from './lib/DialogSelectPrint'
import ScanerPages from './scaner-pages'
import ButtonType from './components/ButtonType'

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 360,
  marginBottom: 20,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 480, boxShadow: '15px' },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}))

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })
  if (query) {
    return filter(
      array,
      _user =>
        _user.product_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.product_type.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.product_id.toLocaleString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }

  return stabilizedThis.map(el => el[0])
}

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

function dashboard() {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const valueListProduct = useSelector(state => state.list)
  const [isProducts, setProducts] = useState([])
  const [isOrders, setOrders] = useState([])
  const [, forceRerender] = useReducer(x => x + 1, 0)
  const [isDiscount, setDiscount] = React.useState(0)
  const [isReport, setReport] = React.useState([])
  const [isSelectPrint, setSelectPrint] = React.useState(false)
  const [isRadioTypePay, setRadioTypePay] = React.useState('เงินสด')
  const [currency, setCurrency] = React.useState('บาท')

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [isFilterType, setFilterType] = useState(null)

  useEffect(async () => {
    allProduct()
  }, [dispatch])

  const allProduct = async () => {
    const isBranch = localStorage.getItem('branch')
    const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/branch/${isBranch}`)
    if (getProducts || getProducts.data.data) {
      const filterStatussProduct = getProducts.data.data.filter(item => item.product_status === true)
      setProducts(filterStatussProduct.reverse())
    }
  }

  const checkOrder = order => {
    const newOrder = order.item
    const idx = isOrders.findIndex(item => item._id === newOrder._id)
    if (idx === -1) {
      isOrders.push({ ...newOrder, amount: 1 })
      forceRerender()
    } else {
      isOrders[idx].amount += 1
      forceRerender()
    }
    setOrders(isOrders)
    dispatch(addItem(isOrders))
  }

  const changeAmountOrder = value => {
    const idx = valueListProduct.findIndex(item => item._id === value._id)
    if (idx !== -1) {
      valueListProduct[idx].amount = value.amount
      setOrders(valueListProduct)
      dispatch(addItem(valueListProduct))
      forceRerender()
    }
  }

  const deleteProduct = order => {
    forceRerender()
    const newData = []
    valueListProduct.forEach(element => {
      if (element._id !== order.item._id) {
        newData.push({ ...element })
      }
    })
    setOrders(newData)
    dispatch(addItem(newData))
  }

  const [value, setValue] = useState('select')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const confirmOrder = async props => {
    dispatch(loading(true))
    const isBranch = localStorage.getItem('branch')

    const isNewBranch = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/branch/${isBranch}`)

    const isReport = await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/report/invoice_shot`, {
      date: dayjs(Date.now()).format(),
      branch: isBranch
    })
    if (isNewBranch || isNewBranch.data) {
      const { invoice_shot } = isReport.data

      const totalValue =
        valueListProduct.length !== undefined &&
        valueListProduct.length !== 0 &&
        valueListProduct.reduce((sum, item) => sum + item.product_price * item.amount - item.product_discount, 0) -
          isDiscount

      const dataReport = {
        report_detail: valueListProduct,
        report_grand_total: totalValue,
        report_discount: isDiscount,
        report_branch_id: isBranch,
        report_branch_name: isNewBranch.data.data.branch_name,
        report_vat_name: isNewBranch.data.data.branch_vat_name,
        report_branch_image: isNewBranch.data.data.branch_image,
        report_vat_number: isNewBranch.data.data.branch_vat_number,
        report_address: isNewBranch.data.data.branch_vat_address,
        report_make_list: session.user.name,
        report_tax_invoice_number_shot: `${dayjs(Date.now()).format('YYYYMM')}${invoice_shot}`,
        report_money: parseFloat(props),
        report_payment_type: isRadioTypePay,
        report_timestamp: dayjs(Date.now()).format()
      }

      const responseReport = []
      await axios
        .post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/report`, dataReport)
        .then(res => (responseReport = res.data.report))
      await setReport(responseReport)
      valueListProduct.forEach(async element => {
        const newUnitStore = element.product_unit_store - element.amount

        const postProductHistory = {
          pdh_branch_id: isBranch,
          pdh_product_id: element._id,
          pdh_type: 'stock',
          pdh_channel: 'ขาย (ธรรมดา)',
          pdh_type_number: 'ลบ',
          pdh_reference: responseReport.report_tax_invoice_number_shot,
          pdh_old_number: element.product_unit_store,
          pdh_change_number: element.amount - element.amount * 2,
          pdh_new_number: newUnitStore,
          pdh_make_list: session.user.name,
          pdh_timestamp: dayjs(Date.now()).format()
        }
        await axios.post(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history`, postProductHistory)
        await axios.put(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/${element._id}`, {
          product_unit_store: newUnitStore
        })
      })
      forceRerender()
      setOrders([])
      dispatch(addItem([]))
      allProduct()
      dispatch(loading(false))
      setSelectPrint(true)
    }
  }

  const handleFilterByName = event => {
    setFilterName(event.target.value)
  }

  const handleFilterType = event => {
    setFilterType(event)
  }

  const newProducts = isFilterType ? isProducts.filter(item => item.product_type === isFilterType) : isProducts
  const filteredList = applySortFilter(newProducts, getComparator(order, orderBy), filterName)

  const renderData = (
    <Grid container spacing={1} sx={{ mb: 10 }}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Box position='sticky' top='100px' pb={{ xs: 1, lg: 6 }}>
          <ListProduct
            isReport={isReport}
            isRadioTypePay={isRadioTypePay}
            setRadioTypePay={setRadioTypePay}
            deleteProduct={deleteProduct}
            confirmOrder={confirmOrder}
            isDiscount={isDiscount}
            setDiscount={setDiscount}
            currency={currency}
            setCurrency={setCurrency}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SearchStyle
            value={filterName}
            onChange={handleFilterByName}
            placeholder='ค้นหา..'
            startAdornment={
              <InputAdornment position='start'>
                <Icon icon='bx:search-alt' width='28' height='28' />
              </InputAdornment>
            }
          />

          <ButtonType isProducts={isProducts} handleFilterType={handleFilterType} />
        </div>
        <Grid container spacing={2}>
          {filteredList.map(item => (
            <Grid item xs={12} sm={6} md={3} sx={{ mb: 2 }} key={item._id}>
              <CardProduct
                item={item}
                checkOrder={checkOrder}
                isOrders={isOrders}
                setOrders={setOrders}
                deleteProduct={deleteProduct}
                forceRerender={forceRerender}
                changeAmountOrder={changeAmountOrder}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <Box component='section' my={1} py={1}>
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='select'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CashRegister />
                  <TabName>หน้าร้านแบบธรรมดา</TabName>
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardScan />
                  <TabName>หน้าร้านแบบแสกนสินค้า</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 4 }} value='select'>
            {renderData}
          </TabPanel>
          <TabPanel sx={{ p: 4 }} value='security'>
            <ScanerPages
              isProducts={isProducts}
              deleteProduct={deleteProduct}
              changeAmountOrder={changeAmountOrder}
              currency={currency}
              setCurrency={setCurrency}
              isDiscount={isDiscount}
              setDiscount={setDiscount}
              isRadioTypePay={isRadioTypePay}
              setRadioTypePay={setRadioTypePay}
              confirmOrder={confirmOrder}
            />
          </TabPanel>
        </TabContext>
      </Card>
      <DialogSelectPrint isReport={isReport} isSelectPrint={isSelectPrint} setSelectPrint={setSelectPrint} />
    </Box>
  )
}

export default dashboard
