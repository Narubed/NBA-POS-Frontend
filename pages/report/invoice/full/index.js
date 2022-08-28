/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signIn } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { filter } from 'lodash'
import numeral from 'numeral'
import dayjs from 'dayjs'
import 'dayjs/locale/th'

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
  IconButton,
  Card,
  TablePagination,
  TextField,
  Box,
  Grid,
  Chip
} from '@mui/material'
import axios from 'axios'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

import Main from '../../../../src/components/auth/pages/main'
import Scrollbar from '../../../../src/components/utils/Scrollbar'
import SearchNotFound from '../../../../src/components/utils/SearchNotFound'
import ListHead from '../../../../src/components/utils/ListHead'

// Component
import ReportListToolbar from '../../../../src/components/pages/InvoiceFull/ReportListToolbar'
import ShowDetailReport from '../../../../src/components/pages/InvoiceFull/ShowDetailReport'

// loading
import { loading } from '../../../../src/store/actions'

const TABLE_HEAD = [
  { id: 'index', label: 'ลำดับ', alignRight: true },
  { id: 'rif_detail', label: 'รายการ', alignRight: false },
  { id: 'rif_tax_invoice_number_full', label: 'ใบเสร็จ', alignRight: true },
  { id: 'rif_make_list', label: 'ผู้ทำรายการ', alignRight: true },
  { id: 'rif_timestamp', label: 'วันที่ทำรายการ', alignRight: false },
  { id: 'rif_discount', label: 'ส่วนลด', alignRight: false },
  { id: 'rif_grand_total', label: 'ผลรวม', alignRight: false },
  { id: 'rif_payment_type', label: 'ประเภทการชำระ', alignRight: true },

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
        _user.rif_tax_invoice_number_full.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.rif_make_list.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.rif_discount.toLocaleString().toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.rif_make_list.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.rif_payment_type.toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }

  return stabilizedThis.map(el => el[0])
}

export default function Component() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { data: session } = useSession()
  if (!session) return <Main signIn={signIn} />

  const [isReportList, setReportList] = useState([])
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  // eslint-disable-next-line camelcase
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isDateStart, setDateStart] = React.useState(null)
  const [isDateEnd, setDateEnd] = React.useState(null)

  useEffect(() => {
    getAllReport()
  }, [])

  const getAllReport = async () => {
    dispatch(loading(true))
    const isBranch = localStorage.getItem('branch')

    const getReport = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/report_invoice_full/branch/${isBranch}`)
    if (getReport || getReport.data.data) {
      const reverseReport = getReport.data.data.reverse()
      setReportList(reverseReport)
    }

    dispatch(loading(false))
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = Orderlist.map(n => n._id)

      // const newSelectedsid = Orderlist.map((n) => n.order_id);
      setSelected(newSelecteds)

      // setSelected_id(newSelectedsid);
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
    setFilterName(event.target.value)
  }

  const newReportList =
    isDateStart !== null && isDateEnd !== null
      ? isReportList.filter(
          item =>
            dayjs(item.rif_timestamp).add(-1, 'day').format() >= dayjs(isDateStart).format() &&
            dayjs(item.rif_timestamp).add(-1, 'day').format() <= dayjs(isDateEnd).format()
        )
      : isReportList

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newReportList.length) : 0
  const filteredList = applySortFilter(newReportList, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredList.length === 0

  const statusObj = {
    เงินสด: { color: 'info' },
    โอนจ่าย: { color: 'warning' },
    บัตรเครดิต: { color: 'primary' },
    'อื่น ๆ': { color: 'success' }
  }

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h5' gutterBottom>
          <div>ใบกำกับภาษี (เต็ม)</div>
        </Typography>
      </Stack>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} display='flex'>
        <Grid xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <MobileDatePicker
                label='วันที่เริ่ม'
                value={isDateStart}
                onChange={newValue => {
                  setDateStart(newValue)
                }}
                renderInput={params => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Grid xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <MobileDatePicker
                label='วันสุดท้าย'
                value={isDateEnd}
                onChange={newValue => {
                  setDateEnd(newValue)
                }}
                renderInput={params => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Button
          onClick={() => {
            setDateStart(null)
            setDateEnd(null)
          }}
        >
          รีเซตวัน
        </Button>
      </Grid>
      <Card>
        <ReportListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={isReportList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const {
                    _id,
                    rif_detail,
                    rif_grand_total,
                    rif_discount,
                    rif_make_list,
                    rif_tax_invoice_number_full,
                    rif_payment_type,
                    rif_timestamp
                  } = row
                  const isItemSelected = selected.indexOf(_id) !== -1

                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role='checkbox'
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding='checkbox' />
                      <TableCell align='center'>{index + 1}</TableCell>
                      <TableCell align='left'>{rif_detail.length} รายการ</TableCell>
                      <TableCell align='center'>ใบเสร็จ {rif_tax_invoice_number_full}</TableCell>
                      <TableCell align='center'>{rif_make_list}</TableCell>
                      <TableCell align='left'>
                        {dayjs(rif_timestamp).add(543, 'year').locale('th').format('DD MMM YYYY h:mm A')}
                      </TableCell>
                      <TableCell align='left'>{numeral(rif_discount).format('0,0.00')}</TableCell>
                      <TableCell align='left'>{numeral(rif_grand_total).format('0,0.00')}</TableCell>

                      <TableCell align='center'>
                        <Chip
                          label={row.rif_payment_type}
                          color={statusObj[row.rif_payment_type].color}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }}
                        />
                      </TableCell>

                      <TableCell align='right'>
                        <ShowDetailReport id={_id} isReportList={isReportList} row={row} getAllReport={getAllReport} />
                      </TableCell>
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
