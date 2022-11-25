/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signIn } from 'next-auth/react'
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


// images
import imagesicon from '../../../../../../public/images/products/NoImage.png'
import bubble from '../../../../../../public/images/Background/history/bubble2.png'

// loading
import { loading } from '../../../../../../src/store/actions'

import SearchNotFound from '../../../../utils/SearchNotFound'
import Scrollbar from '../../../../utils/Scrollbar'
import ListHead from '../../../../utils/ListHead'
import ListToolbar from '../../../../utils/ListToolbar'
import DateRangPicker from './DateRangPicker'

const TABLE_HEAD = [
  { id: 'pdh_timestamp', label: 'เวลา', alignRight: false },
  { id: 'pdh_channel', label: 'ช่องทาง', alignRight: true },
  { id: 'pdh_reference', label: 'เลขอ้างอิง', alignRight: true },
  { id: 'pdh_old_number', label: 'เก่า', alignRight: true },
  { id: 'pdh_change_number', label: 'ปรับ', alignRight: true },
  { id: 'pdh_new_number', label: 'ใหม่', alignRight: true },
  { id: 'pdh_make_list', label: 'ผู้ทำรายการ', alignRight: true },
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
        _user.pdh_channel.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.pdh_reference.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.pdh_make_list.toLocaleString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }

  return stabilizedThis.map(el => el[0])
}

export default function Component({ isProductHistory, onClickSeleteChannel }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isDateSelect, setDateSelect] = useState(['', ''])

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
    setFilterName(event.target.value)
  }

  const newProductHistoryList =
    isDateSelect[0] !== '' && isDateSelect[1] !== ''
      ? isProductHistory.filter(
          item =>
            dayjs(item.pdh_timestamp).format('YYYY-MM-DD HH:mm') >= dayjs(isDateSelect[0]).format('YYYY-MM-DD HH:mm') &&
            dayjs(item.pdh_timestamp).format('YYYY-MM-DD HH:mm') <= dayjs(isDateSelect[1]).format('YYYY-MM-DD HH:mm')
        )
      : isProductHistory

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newProductHistoryList.length) : 0
  const filteredList = applySortFilter(newProductHistoryList, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredList.length === 0

  const statusObj = {
    'ขาย (ธรรมดา)': { color: 'warning' },
    ปรับสต๊อก: { color: 'warning' },
    ปรับต้นทุน: { color: 'info' },
    ปรับราคา: { color: 'success' }
  }

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h6' gutterBottom>
          <div>ประวัติการทำรายการ</div>
        </Typography>
      </Stack>

      {/* <ProductCreate showDrawerCreate={showDrawerCreate} setDrawerCreate={setDrawerCreate} /> */}
      <Card
        sx={{
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundImage: `url(${bubble.src})`
        }}
      >
        <Button variant='contained' color='warning' sx={{ m: 1 }} onClick={() => onClickSeleteChannel('stock')}>
          สต๊อก
        </Button>
        <Button variant='contained' color='info' sx={{ m: 1 }} onClick={() => onClickSeleteChannel('cost')}>
          ต้นทุน
        </Button>
        <Button variant='contained' color='success' sx={{ m: 1 }} onClick={() => onClickSeleteChannel('price')}>
          ราคา
        </Button>
        <Button variant='contained' sx={{ m: 1 }} onClick={() => onClickSeleteChannel('all')}>
          ทั้งหมด
        </Button>

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
                rowCount={isProductHistory.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  const {
                    _id,
                    pdh_timestamp,
                    pdh_channel,
                    pdh_reference,
                    pdh_old_number,
                    pdh_change_number,
                    pdh_new_number,
                    pdh_make_list
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
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell />

                      <TableCell>
                        {dayjs(pdh_timestamp).add(543, 'year').locale('th').format('DD MMM YY HH:mm น.')}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.pdh_channel}
                          color={statusObj[row.pdh_channel].color}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }}
                        />
                      </TableCell>
                      <TableCell>{pdh_reference}</TableCell>
                      <TableCell align='center'>{numeral(pdh_old_number).format('0,0')}</TableCell>
                      <TableCell align='center'>
                        {pdh_change_number > 0 ? (
                          <a>+{numeral(pdh_change_number).format('0,0')}</a>
                        ) : (
                          <a style={{ color: 'red' }}>{numeral(pdh_change_number).format('0,0')}</a>
                        )}
                      </TableCell>
                      {/* <TableCell align='center'>{numeral(pdh_change_number).format('0,0')}</TableCell> */}
                      <TableCell align='center'>{numeral(pdh_new_number).format('0,0')}</TableCell>
                      <TableCell>{pdh_make_list}</TableCell>
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
