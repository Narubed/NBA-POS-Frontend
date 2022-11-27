/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from 'next-auth/react'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { filter } from 'lodash'
import numeral from 'numeral'

// material
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Stack,
  Typography,
  Container,
  Card,
  TablePagination,
  Chip
} from '@mui/material'
import axios from 'axios'


// images

// loading
import { loading } from '../../../../../src/store/actions'

import SearchNotFound from '../../../utils/SearchNotFound'
import Scrollbar from '../../../utils/Scrollbar'
import ListHead from '../../../utils/ListHead'
import ListToolbar from '../../../utils/ListToolbar'
import DateRangPicker from './DateRangPicker'

const TABLE_HEAD = [
  { id: 'timestamp', label: 'เวลา', alignRight: false },
  { id: 'channel', label: 'ช่องทาง', alignRight: false },
  { id: 'ref', label: 'เลขอ้างอิง', alignRight: false },
  { id: 'make_list', label: 'ผู้ทำรายการ', alignRight: false },
  { id: '' }
]
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
        _user.channel.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.ref.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.make_list.toLocaleString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }

  return stabilizedThis.map(el => el[0])
}

export default function Component() {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const router = useRouter()
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': 'Bearer ' + localStorage.getItem('token')
    }
  }

  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isDateSelect, setDateSelect] = useState(['', ''])
  const [isReports, setReports] = useState([])

  useEffect(async () => {
    dispatch(loading(true))
    const isBranch = localStorage.getItem('branch')

    const getProductsHistory = await axios.get(
      `${process.env.NEXT_PUBLIC_POS_BACKEND}/products/history/branch/${isBranch}`,config
    )
    const getReport = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/report/branch/${isBranch}`,config)

    const getInvoiceFull = await axios.get(
      `${process.env.NEXT_PUBLIC_POS_BACKEND}/report_invoice_full/branch/${isBranch}`,config
    )
    console.log(getInvoiceFull)

    if (getProductsHistory || (getProductsHistory.data.data && getReport)) {
      const filterUnPrice = getProductsHistory.data.data.filter(item => item.pdh_channel !== 'ขาย (ธรรมดา)')
      const isNewReport = []
      filterUnPrice.forEach(element => {
        const newData = {
          timestamp: element.pdh_timestamp,
          channel: `${element.pdh_channel}สินค้า`,
          ref: element.pdh_reference,
          make_list: element.pdh_make_list
        }
        isNewReport.push(newData)
      })
      getReport.data.data.forEach(element => {
        const newData = {
          timestamp: element.report_timestamp,
          channel: 'ขายหน้าร้าน',
          ref: element.report_tax_invoice_number_shot,
          make_list: element.report_make_list
        }
        isNewReport.push(newData)
      })

      getInvoiceFull.data.data.forEach(element => {
        const newData = {
          timestamp: element.rif_timestamp,
          channel: 'สร้างใบกำกับภาษี',
          ref: element.rif_tax_invoice_number_full,
          make_list: element.rif_make_list
        }
        isNewReport.push(newData)
      })

      const sortDate = isNewReport.sort(function (a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp)
      })

      setReports(sortDate)
    }

    dispatch(loading(false))
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = Orderlist.map(n => n._id)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = event => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const newProductHistoryList =
    isDateSelect[0] !== '' && isDateSelect[1] !== ''
      ? isReports.filter(
          item =>
            dayjs(item.timestamp).format('YYYY-MM-DD HH:mm') >= dayjs(isDateSelect[0]).format('YYYY-MM-DD HH:mm') &&
            dayjs(item.timestamp).format('YYYY-MM-DD HH:mm') <= dayjs(isDateSelect[1]).format('YYYY-MM-DD HH:mm')
        )
      : isReports

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newProductHistoryList.length) : 0
  const filteredList = applySortFilter(newProductHistoryList, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredList.length === 0

  const statusObj = {
    ขายหน้าร้าน: { color: 'info' },
    ปรับสต๊อกสินค้า: { color: 'warning' },
    ปรับต้นทุนสินค้า: { color: 'primary' },
    ปรับราคาสินค้า: { color: 'success' },
    สร้างใบกำกับภาษี: { color: 'error' }
  }

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={4}>
        <Typography variant='h6' gutterBottom>
          <div>ประวัติการทำรายการ</div>
        </Typography>
      </Stack>

      {/* <ProductCreate showDrawerCreate={showDrawerCreate} setDrawerCreate={setDrawerCreate} /> */}
      <Card>
        <ListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          selected={selected}
        />
        <DateRangPicker setDateSelect={setDateSelect} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 360 }}>
            <Table>
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={isReports.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  const { timestamp, channel, ref, make_list } = row
                  const isItemSelected = selected.indexOf(ref) !== -1

                  return (
                    <TableRow
                      hover
                      key={ref}
                      tabIndex={-1}
                      role='checkbox'
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell />

                      <TableCell>
                        {dayjs(timestamp).add(543, 'year').locale('th').format('DD MMM YY HH:mm น.')}
                      </TableCell>
                      <TableCell align='left'>
                        <Chip
                          label={row.channel}
                          color={statusObj[row.channel].color}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }}
                        />
                      </TableCell>

                      <TableCell>{ref}</TableCell>
                      <TableCell>{make_list}</TableCell>
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  )
}
